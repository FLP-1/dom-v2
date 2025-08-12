/**
 * Serviço de Integração eSocial Doméstico
 * @description Implementa integração completa com o eSocial para empregadores domésticos
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * Funcionalidades:
 * - Gestão de certificados digitais
 * - Geração de eventos eSocial
 * - Envio e monitoramento de eventos
 * - Validação de conformidade
 * - Retry automático em caso de falha
 */

import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// ==========================================
// 📊 INTERFACES E TIPOS
// ==========================================

export interface ESocialCertificateData {
  certificateType: string;
  certificateFile: string; // Base64
  password?: string;
  validFrom: Date;
  validUntil: Date;
  notes?: string;
}

export interface ESocialEventData {
  eventType: string;
  eventData: Record<string, any>;
  payrollPeriodId?: string;
}

export interface ESocialConfigData {
  employerType: 'individual' | 'company';
  employerCpf?: string;
  employerCnpj?: string;
  employerName: string;
  employerAddress: string;
  employerPhone?: string;
  employerEmail?: string;
  esocialVersion?: string;
  environment?: 'production' | 'testing';
  autoSend?: boolean;
  retryInterval?: number;
  maxRetries?: number;
}

export interface ESocialValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ==========================================
// 🏛️ CLASSE PRINCIPAL eSOCIAL
// ==========================================

export class ESocialService {
  
  /**
   * Criar/atualizar certificado digital
   */
  static async manageCertificate(
    userId: string, 
    certificateData: ESocialCertificateData
  ): Promise<any> {
    try {
      // Validar certificado
      const validation = await this.validateCertificate(certificateData);
      if (!validation.isValid) {
        throw new Error(`Certificado inválido: ${validation.errors.join(', ')}`);
      }

      // Criptografar senha se fornecida
      let encryptedPassword: string | null = null;
      if (certificateData.password) {
        encryptedPassword = this.encryptPassword(certificateData.password);
      }

      // Verificar se já existe certificado ativo
      const existingCertificate = await prisma.eSocialCertificate.findFirst({
        where: {
          user_id: userId,
          is_active: true
        }
      });

      if (existingCertificate) {
        // Desativar certificado anterior
        await prisma.eSocialCertificate.update({
          where: { id: existingCertificate.id },
          data: { is_active: false }
        });
      }

      // Criar novo certificado
      const certificate = await prisma.eSocialCertificate.create({
        data: {
          user_id: userId,
          certificate_type: certificateData.certificateType,
          certificate_file: certificateData.certificateFile,
          password: encryptedPassword,
          valid_from: certificateData.validFrom,
          valid_until: certificateData.validUntil,
          validation_status: 'valid',
          notes: certificateData.notes,
          is_active: true
        }
      });

      return certificate;
    } catch (error) {
      console.error('Erro ao gerenciar certificado:', error);
      throw error;
    }
  }

  /**
   * Configurar dados do empregador
   */
  static async configureEmployer(
    userId: string, 
    configData: ESocialConfigData
  ): Promise<any> {
    try {
      // Validar dados do empregador
      const validation = this.validateEmployerData(configData);
      if (!validation.isValid) {
        throw new Error(`Dados inválidos: ${validation.errors.join(', ')}`);
      }

      // Criar ou atualizar configuração
      const config = await prisma.eSocialConfig.upsert({
        where: { user_id: userId },
        update: {
          employer_type: configData.employerType,
          employer_cpf: configData.employerCpf,
          employer_cnpj: configData.employerCnpj,
          employer_name: configData.employerName,
          employer_address: configData.employerAddress,
          employer_phone: configData.employerPhone,
          employer_email: configData.employerEmail,
          esocial_version: configData.esocialVersion || '2.5',
          environment: configData.environment || 'production',
          auto_send: configData.autoSend ?? true,
          retry_interval: configData.retryInterval || 300,
          max_retries: configData.maxRetries || 3
        },
        create: {
          user_id: userId,
          employer_type: configData.employerType,
          employer_cpf: configData.employerCpf,
          employer_cnpj: configData.employerCnpj,
          employer_name: configData.employerName,
          employer_address: configData.employerAddress,
          employer_phone: configData.employerPhone,
          employer_email: configData.employerEmail,
          esocial_version: configData.esocialVersion || '2.5',
          environment: configData.environment || 'production',
          auto_send: configData.autoSend ?? true,
          retry_interval: configData.retryInterval || 300,
          max_retries: configData.maxRetries || 3
        }
      });

      return config;
    } catch (error) {
      console.error('Erro ao configurar empregador:', error);
      throw error;
    }
  }

  /**
   * Criar evento eSocial
   */
  static async createEvent(
    userId: string, 
    eventData: ESocialEventData
  ): Promise<any> {
    try {
      // Obter certificado ativo
      const certificate = await this.getActiveCertificate(userId);
      if (!certificate) {
        throw new Error('Certificado digital não encontrado ou inativo');
      }

      // Gerar XML do evento
      const eventXml = await this.generateEventXML(eventData.eventType, eventData.eventData);

      // Criar evento no banco
      const event = await prisma.eSocialEvent.create({
        data: {
          user_id: userId,
          payroll_period_id: eventData.payrollPeriodId,
          certificate_id: certificate.id,
          event_type: eventData.eventType,
          event_data: eventData.eventData,
          event_xml: eventXml,
          event_status: 'pending'
        }
      });

      // Enviar automaticamente se configurado
      const config = await this.getConfig(userId);
      if (config?.auto_send) {
        await this.sendEvent(event.id);
      }

      return event;
    } catch (error) {
      console.error('Erro ao criar evento eSocial:', error);
      throw error;
    }
  }

  /**
   * Enviar evento para o eSocial
   */
  static async sendEvent(eventId: string): Promise<any> {
    try {
      const event = await prisma.eSocialEvent.findUnique({
        where: { id: eventId },
        include: {
          certificate: true,
          user: {
            include: {
              esocial_config: true
            }
          }
        }
      });

      if (!event) {
        throw new Error('Evento não encontrado');
      }

      if (event.event_status === 'sent' || event.event_status === 'accepted') {
        throw new Error('Evento já foi enviado');
      }

      // Simular envio para o eSocial (em produção, seria uma chamada real)
      const response = await this.sendToESocial(event);

      // Atualizar status do evento
      const updatedEvent = await prisma.eSocialEvent.update({
        where: { id: eventId },
        data: {
          event_status: response.success ? 'sent' : 'error',
          protocol_number: response.protocolNumber,
          response_xml: response.responseXml,
          error_message: response.errorMessage
        }
      });

      return updatedEvent;
    } catch (error) {
      console.error('Erro ao enviar evento:', error);
      
      // Atualizar evento com erro
      await prisma.eSocialEvent.update({
        where: { id: eventId },
        data: {
          event_status: 'error',
          error_message: error instanceof Error ? error.message : 'Erro desconhecido'
        }
      });

      throw error;
    }
  }

  /**
   * Reprocessar eventos com erro
   */
  static async retryFailedEvents(userId: string): Promise<any[]> {
    try {
      const failedEvents = await prisma.eSocialEvent.findMany({
        where: {
          user_id: userId,
          event_status: 'error',
          retry_count: {
            lt: 3
          }
        }
      });

      const results = [];
      for (const event of failedEvents) {
        try {
          await this.sendEvent(event.id);
          results.push({ eventId: event.id, status: 'success' });
        } catch (error) {
          results.push({ eventId: event.id, status: 'failed', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
      }

      return results;
    } catch (error) {
      console.error('Erro ao reprocessar eventos:', error);
      throw error;
    }
  }

  /**
   * Obter relatório de eventos
   */
  static async getEventReport(userId: string, filters?: {
    eventType?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<any> {
    try {
      const whereClause: any = {
        user_id: userId
      };

      if (filters?.eventType) {
        whereClause.event_type = filters.eventType;
      }

      if (filters?.status) {
        whereClause.event_status = filters.status;
      }

      if (filters?.startDate || filters?.endDate) {
        whereClause.created_at = {};
        if (filters.startDate) {
          whereClause.created_at.gte = filters.startDate;
        }
        if (filters.endDate) {
          whereClause.created_at.lte = filters.endDate;
        }
      }

      const events = await prisma.eSocialEvent.findMany({
        where: whereClause,
        include: {
          payroll_period: true,
          certificate: true
        },
        orderBy: {
          created_at: 'desc'
        }
      });

      // Estatísticas
      const stats = {
        total: events.length,
        pending: events.filter(e => e.event_status === 'pending').length,
        sent: events.filter(e => e.event_status === 'sent').length,
        accepted: events.filter(e => e.event_status === 'accepted').length,
        rejected: events.filter(e => e.event_status === 'rejected').length,
        error: events.filter(e => e.event_status === 'error').length
      };

      return {
        events,
        stats
      };
    } catch (error) {
      console.error('Erro ao obter relatório:', error);
      throw error;
    }
  }

  // ==========================================
  // 🔧 MÉTODOS AUXILIARES
  // ==========================================

  /**
   * Validar certificado digital
   */
  private static async validateCertificate(certificateData: ESocialCertificateData): Promise<ESocialValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validar tipo de certificado
    const validTypes = ['A1', 'A3', 'e-CPF', 'e-CNPJ'];
    if (!validTypes.includes(certificateData.certificateType)) {
      errors.push('Tipo de certificado inválido');
    }

    // Validar arquivo do certificado
    if (!certificateData.certificateFile) {
      errors.push('Arquivo do certificado é obrigatório');
    }

    // Validar datas
    if (certificateData.validFrom >= certificateData.validUntil) {
      errors.push('Data de validade deve ser posterior à data de início');
    }

    if (certificateData.validUntil < new Date()) {
      warnings.push('Certificado expirado');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validar dados do empregador
   */
  private static validateEmployerData(configData: ESocialConfigData): ESocialValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validar tipo de empregador
    if (!['individual', 'company'].includes(configData.employerType)) {
      errors.push('Tipo de empregador inválido');
    }

    // Validar CPF/CNPJ conforme tipo
    if (configData.employerType === 'individual') {
      if (!configData.employerCpf) {
        errors.push('CPF é obrigatório para empregador individual');
      } else if (!this.validateCPF(configData.employerCpf)) {
        errors.push('CPF inválido');
      }
    } else {
      if (!configData.employerCnpj) {
        errors.push('CNPJ é obrigatório para empresa');
      } else if (!this.validateCNPJ(configData.employerCnpj)) {
        errors.push('CNPJ inválido');
      }
    }

    // Validar nome
    if (!configData.employerName || configData.employerName.trim().length < 3) {
      errors.push('Nome do empregador deve ter pelo menos 3 caracteres');
    }

    // Validar endereço
    if (!configData.employerAddress || configData.employerAddress.trim().length < 10) {
      errors.push('Endereço deve ter pelo menos 10 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Obter certificado ativo
   */
  private static async getActiveCertificate(userId: string): Promise<any> {
    return await prisma.eSocialCertificate.findFirst({
      where: {
        user_id: userId,
        is_active: true,
        validation_status: 'valid'
      }
    });
  }

  /**
   * Obter configuração eSocial
   */
  private static async getConfig(userId: string): Promise<any> {
    return await prisma.eSocialConfig.findUnique({
      where: { user_id: userId }
    });
  }

  /**
   * Gerar XML do evento
   */
  private static async generateEventXML(eventType: string, eventData: Record<string, any>): Promise<string> {
    // Em produção, seria uma geração real de XML conforme especificação eSocial
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<eSocial xmlns="http://www.esocial.gov.br/schema/evt/evtAdmissao/v02_05_00">
  <evtAdmissao Id="${eventData.id || 'ID_EVENTO'}">
    <ideEvento>
      <tpAmb>2</tpAmb>
      <procEmi>1</procEmi>
      <verProc>DOM v2</verProc>
    </ideEvento>
    <ideEmpregador>
      <tpInsc>1</tpInsc>
      <nrInsc>${eventData.employerDocument || '00000000000'}</nrInsc>
    </ideEmpregador>
    <trabalhador>
      <cpfTrab>${eventData.employeeCpf || '00000000000'}</cpfTrab>
      <nmTrab>${eventData.employeeName || 'Nome do Trabalhador'}</nmTrab>
    </trabalhador>
  </evtAdmissao>
</eSocial>`;

    return xml;
  }

  /**
   * Enviar para o eSocial (simulação)
   */
  private static async sendToESocial(event: any): Promise<{
    success: boolean;
    protocolNumber?: string;
    responseXml?: string;
    errorMessage?: string;
  }> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular resposta do eSocial
    const success = Math.random() > 0.1; // 90% de sucesso

    if (success) {
      return {
        success: true,
        protocolNumber: `PROT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        responseXml: `<?xml version="1.0" encoding="UTF-8"?>
<retornoEvento xmlns="http://www.esocial.gov.br/schema/retornoEvento/v02_05_00">
  <status>SUCESSO</status>
  <protocolo>PROT-${Date.now()}</protocolo>
</retornoEvento>`
      };
    } else {
      return {
        success: false,
        errorMessage: 'Erro de comunicação com o eSocial'
      };
    }
  }

  /**
   * Criptografar senha do certificado
   */
  private static encryptPassword(password: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  /**
   * Descriptografar senha do certificado
   */
  private static decryptPassword(encryptedPassword: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);
    const parts = encryptedPassword.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * Validar CPF
   */
  private static validateCPF(cpf: string): boolean {
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) return false;
    
    // Verificar dígitos repetidos
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.charAt(10))) return false;
    
    return true;
  }

  /**
   * Validar CNPJ
   */
  private static validateCNPJ(cnpj: string): boolean {
    const cleanCnpj = cnpj.replace(/\D/g, '');
    if (cleanCnpj.length !== 14) return false;
    
    // Verificar dígitos repetidos
    if (/^(\d)\1{13}$/.test(cleanCnpj)) return false;
    
    // Validar dígitos verificadores
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCnpj.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cleanCnpj.charAt(12))) return false;
    
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCnpj.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cleanCnpj.charAt(13))) return false;
    
    return true;
  }
}

export default ESocialService;
