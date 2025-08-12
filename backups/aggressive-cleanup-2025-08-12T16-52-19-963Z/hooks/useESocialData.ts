/**
 * Hook para gerenciar dados eSocial
 * @description Gerencia certificados, configurações, eventos e relatórios eSocial
 */

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api.ts';

export interface ESocialCertificate {
  id: string;
  certificateType: string;
  certificateFile: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  lastValidation?: string;
  validationStatus: 'valid' | 'invalid' | 'expired' | 'pending';
  notes?: string;
  createdAt: string;
}

export interface ESocialConfig {
  id: string;
  employerType: 'individual' | 'company';
  employerCpf?: string;
  employerCnpj?: string;
  employerName: string;
  employerAddress: string;
  employerPhone: string;
  employerEmail: string;
  esocialVersion: string;
  environment: 'production' | 'testing';
  autoSend: boolean;
  retryInterval: number;
  maxRetries: number;
  updatedAt: string;
}

export interface ESocialEvent {
  id: string;
  eventType: string;
  eventStatus: 'pending' | 'sent' | 'accepted' | 'rejected' | 'error';
  eventData: Record<string, any>;
  protocolNumber?: string;
  errorMessage?: string;
  retryCount: number;
  maxRetries: number;
  nextRetry?: string;
  createdAt: string;
  sentAt?: string;
}

export interface ComplianceReport {
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
  pendingEvents: number;
  successRate: number;
  lastSync: string;
  certificateStatus: 'valid' | 'invalid' | 'expired';
  complianceScore: number;
}

export const useESocialData = () => {
  const [certificates, setCertificates] = useState<ESocialCertificate[]>([]);
  const [config, setConfig] = useState<ESocialConfig | null>(null);
  const [events, setEvents] = useState<ESocialEvent[]>([]);
  const [complianceReport, setComplianceReport] = useState<ComplianceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCertificates = async () => {
    try {
      const response = await apiService.getESocialCertificates();
      const convertedCertificates: ESocialCertificate[] = response.data?.map((cert: any) => ({
        id: cert.id,
        certificateType: cert.certificate_type,
        certificateFile: cert.certificate_file,
        validFrom: cert.valid_from,
        validUntil: cert.valid_until,
        isActive: cert.is_active,
        lastValidation: cert.last_validation,
        validationStatus: cert.validation_status || 'pending',
        notes: cert.notes,
        createdAt: cert.created_at
      })) || [];
      setCertificates(convertedCertificates);
    } catch (err) {
      console.error('Erro ao carregar certificados:', err);
    }
  };

  const loadConfig = async () => {
    try {
      const response = await apiService.getESocialConfig();
      if (response.data) {
        const convertedConfig: ESocialConfig = {
          id: response.data.id,
          employerType: response.data.employer_type,
          employerCpf: response.data.employer_cpf,
          employerCnpj: response.data.employer_cnpj,
          employerName: response.data.employer_name,
          employerAddress: response.data.employer_address,
          employerPhone: response.data.employer_phone,
          employerEmail: response.data.employer_email,
          esocialVersion: response.data.esocial_version,
          environment: response.data.environment,
          autoSend: response.data.auto_send,
          retryInterval: response.data.retry_interval,
          maxRetries: response.data.max_retries,
          updatedAt: response.data.updated_at
        };
        setConfig(convertedConfig);
      }
    } catch (err) {
      console.error('Erro ao carregar configuração:', err);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await apiService.getESocialEvents();
      const convertedEvents: ESocialEvent[] = response.data?.map((event: any) => ({
        id: event.id,
        eventType: event.event_type,
        eventStatus: event.event_status || 'pending',
        eventData: event.event_data || {},
        protocolNumber: event.protocol_number,
        errorMessage: event.error_message,
        retryCount: event.retry_count || 0,
        maxRetries: event.max_retries || 3,
        nextRetry: event.next_retry,
        createdAt: event.created_at,
        sentAt: event.sent_at
      })) || [];
      setEvents(convertedEvents);
    } catch (err) {
      console.error('Erro ao carregar eventos:', err);
    }
  };

  const loadComplianceReport = async () => {
    try {
      const response = await apiService.getESocialComplianceReport();
      if (response.data) {
        const convertedReport: ComplianceReport = {
          totalEvents: response.data.total_events || 0,
          successfulEvents: response.data.successful_events || 0,
          failedEvents: response.data.failed_events || 0,
          pendingEvents: response.data.pending_events || 0,
          successRate: response.data.success_rate || 0,
          lastSync: response.data.last_sync,
          certificateStatus: response.data.certificate_status || 'invalid',
          complianceScore: response.data.compliance_score || 0
        };
        setComplianceReport(convertedReport);
      }
    } catch (err) {
      console.error('Erro ao carregar relatório de compliance:', err);
    }
  };

  const createCertificate = async (certificateData: any) => {
    try {
      const response = await apiService.createESocialCertificate(certificateData);
      await loadCertificates();
      return response.data;
    } catch (err) {
      console.error('Erro ao criar certificado:', err);
      throw err;
    }
  };

  const updateConfig = async (configData: Partial<ESocialConfig>) => {
    try {
      const response = await apiService.updateESocialConfig(configData);
      await loadConfig();
      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar configuração:', err);
      throw err;
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      const response = await apiService.createESocialEvent(eventData);
      await loadEvents();
      return response.data;
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      throw err;
    }
  };

  const sendEvent = async (eventId: string) => {
    try {
      const response = await apiService.sendESocialEvent(eventId);
      await loadEvents();
      return response.data;
    } catch (err) {
      console.error('Erro ao enviar evento:', err);
      throw err;
    }
  };

  const retryEvents = async () => {
    try {
      const response = await apiService.retryESocialEvents();
      await loadEvents();
      return response.data;
    } catch (err) {
      console.error('Erro ao tentar novamente eventos:', err);
      throw err;
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all([
        loadCertificates(),
        loadConfig(),
        loadEvents(),
        loadComplianceReport()
      ]);
    } catch (err) {
      setError('Erro ao carregar dados do eSocial');
      console.error('Erro no useESocialData:', err);
    } finally {
      setLoading(false);
    }
  };

  const reload = () => {
    loadData();
  };

  // Funções utilitárias
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      sent: 'Enviado',
      accepted: 'Aceito',
      rejected: 'Rejeitado',
      error: 'Erro',
      valid: 'Válido',
      invalid: 'Inválido',
      expired: 'Expirado'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      sent: '#3b82f6',
      accepted: '#10b981',
      rejected: '#ef4444',
      error: '#dc2626',
      valid: '#10b981',
      invalid: '#ef4444',
      expired: '#f59e0b'
    };
    return colors[status] || '#6b7280';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    certificates,
    config,
    events,
    complianceReport,
    loading,
    error,
    reload,
    createCertificate,
    updateConfig,
    createEvent,
    sendEvent,
    retryEvents,
    getStatusLabel,
    getStatusColor,
    formatDate
  };
};
