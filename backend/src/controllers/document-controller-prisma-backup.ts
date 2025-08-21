
/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: arguments.callee.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });


/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}

/**
 * @fileoverview Controlador para gestão de documentos
 * @description Lógica de negócio para upload, visualização e gerenciamento de documentos
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para validação: Joi, Yup, Zod
 * - Para processamento: Sharp, PDF-lib
 * - Para OCR: Tesseract.js, Google Vision API
 * 
 * @considerations
 * - Performance: Otimização para arquivos grandes
 * - Segurança: Validação rigorosa de entrada
 * - Escalabilidade: Processamento assíncrono
 * - Manutenibilidade: Código limpo e testável
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Tipos TypeScript
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface DocumentCreateData {
  name: string;
  description?: string;
  categoryId: string;
  employeeId?: string;
  tags?: string[];
  metadata?: any;
  expiryDate?: Date;
  isSensitive?: boolean;
  accessLevel?: 'private' | 'shared' | 'public';
}

interface DocumentUpdateData {
  name?: string;
  description?: string;
  categoryId?: string;
  employeeId?: string;
  tags?: string[];
  metadata?: any;
  expiryDate?: Date;
  isSensitive?: boolean;
  accessLevel?: 'private' | 'shared' | 'public';
  status?: 'active' | 'archived' | 'deleted';
}

interface DocumentFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  employeeId?: string;
  status?: string;
  search?: string;
}

// Validação de entrada
function validateDocumentData(data: any): data is DocumentCreateData {
  return (
    data &&
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    data.name.trim().length <= 255 &&
    typeof data.categoryId === 'string' &&
    data.categoryId.trim().length > 0
  );
}

function validateDocumentUpdate(data: any): data is DocumentUpdateData {
  return data && typeof data === 'object';
}

function validateFilters(filters: any): filters is DocumentFilters {
  return filters && typeof filters === 'object';
}

// Função para formatar tamanho de arquivo
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Função para obter extensão do arquivo
function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

// Função para obter ícone baseado no tipo de arquivo
function getFileIcon(fileType: string): string {
  const iconMap: { [key: string]: string } = {
    'application/pdf': '📄',
    'image/jpeg': '🖼️',
    'image/png': '🖼️',
    'image/gif': '🖼️',
    'application/msword': '📝',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
    'application/vnd.ms-excel': '📊',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
    'text/plain': '📄'
  };
  
  return iconMap[fileType] || '📄';
}

// Controlador: Listar documentos
export const listDocuments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    const filters: DocumentFilters = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      categoryId: req.query.categoryId as string,
      employeeId: req.query.employeeId as string,
      status: (req.query.status as string) || 'active',
      search: req.query.search as string
    };

    if (!validateFilters(filters)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Filtros inválidos' 
      });
    }

    const skip = (filters.page! - 1) * filters.limit!;
    
    // Construir filtros para Prisma
    const where: any = {
      user_id: userId,
      status: filters.status
    };

    if (filters.categoryId) where.category_id = filters.categoryId;
    if (filters.employeeId) where.employee_id = filters.employeeId;
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    // Executar consultas em paralelo
    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        include: {
          category: true,
          employee: true,
          versions: {
            orderBy: { version: 'desc' },
            take: 1
          }
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: filters.limit
      }),
      prisma.document.count({ where })
    ]);

    // Formatar dados para resposta
    const formattedDocuments = documents.map(doc => ({
      ...doc,
      file_size_formatted: formatFileSize(doc.file_size),
      file_icon: getFileIcon(doc.file_type),
      file_extension: getFileExtension(doc.file_name),
      is_expired: doc.expiry_date ? new Date() > doc.expiry_date : false
    }));

    res.json({
      success: true,
      data: formattedDocuments,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        pages: Math.ceil(total / filters.limit!)
      }
    });

  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Controlador: Obter documento específico
export const getDocument = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    if (!documentId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID do documento não fornecido' 
      });
    }

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        user_id: userId
      },
      include: {
        category: true,
        employee: true,
        versions: {
          orderBy: { version: 'desc' }
        },
        shares: {
          include: {
            shared_user: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      }
    });

    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: 'Documento não encontrado' 
      });
    }

    // Formatar dados para resposta
    const formattedDocument = {
      ...document,
      file_size_formatted: formatFileSize(document.file_size),
      file_icon: getFileIcon(document.file_type),
      file_extension: getFileExtension(document.file_name),
      is_expired: document.expiry_date ? new Date() > document.expiry_date : false
    };

    res.json({
      success: true,
      data: formattedDocument
    });

  } catch (error) {
    console.error('Erro ao obter documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Controlador: Criar novo documento
export const createDocument = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    // Verificar se há arquivo
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Arquivo não fornecido' 
      });
    }

    // Preparar dados do documento
    const documentData: DocumentCreateData = {
      name: req.body.name || req.file.originalname,
      description: req.body.description,
      categoryId: req.body.categoryId,
      employeeId: req.body.employeeId,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      metadata: req.body.metadata ? JSON.parse(req.body.metadata) : {},
      expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : null,
      isSensitive: req.body.isSensitive === 'true',
      accessLevel: req.body.accessLevel || 'private'
    };

    if (!validateDocumentData(documentData)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados do documento inválidos' 
      });
    }

    // Verificar se a categoria existe
    const category = await prisma.documentCategory.findUnique({
      where: { id: documentData.categoryId }
    });

    if (!category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Categoria não encontrada' 
      });
    }

    // Verificar se o funcionário existe (se fornecido)
    if (documentData.employeeId) {
      const employee = await prisma.employees.findUnique({
        where: { id: documentData.employeeId }
      });

      if (!employee) {
        return res.status(400).json({ 
          success: false, 
          message: 'Funcionário não encontrado' 
        });
      }
    }

    // Calcular hash do arquivo
    const fileBuffer = fs.readFileSync(req.file.path);
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Criar documento
    const document = await prisma.document.create({
      data: {
        name: documentData.name,
        description: documentData.description,
        category_id: documentData.categoryId,
        user_id: userId,
        employee_id: documentData.employeeId,
        file_name: req.file.originalname,
        file_path: req.file.path,
        file_size: req.file.size,
        file_type: req.file.mimetype,
        file_hash: fileHash,
        tags: documentData.tags,
        metadata: documentData.metadata,
        expiry_date: documentData.expiryDate,
        is_sensitive: documentData.isSensitive,
        access_level: documentData.accessLevel
      },
      include: {
        category: true,
        employee: true
      }
    });

    // Criar primeira versão
    await prisma.documentVersion.create({
      data: {
        document_id: document.id,
        version: 1,
        file_name: req.file.originalname,
        file_path: req.file.path,
        file_size: req.file.size,
        file_hash: fileHash,
        changes: 'Versão inicial',
        created_by: userId
      }
    });

    // Formatar dados para resposta
    const formattedDocument = {
      ...document,
      file_size_formatted: formatFileSize(document.file_size),
      file_icon: getFileIcon(document.file_type),
      file_extension: getFileExtension(document.file_name)
    };

    res.status(201).json({
      success: true,
      data: formattedDocument,
      message: 'Documento criado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Controlador: Atualizar documento
export const updateDocument = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    if (!documentId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID do documento não fornecido' 
      });
    }

    const updateData: DocumentUpdateData = req.body;

    if (!validateDocumentUpdate(updateData)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados de atualização inválidos' 
      });
    }

    // Verificar se o documento existe e pertence ao usuário
    const existingDocument = await prisma.document.findFirst({
      where: {
        id: documentId,
        user_id: userId
      }
    });

    if (!existingDocument) {
      return res.status(404).json({ 
        success: false, 
        message: 'Documento não encontrado' 
      });
    }

    // Preparar dados para atualização
    const updatePayload: any = {};
    
    if (updateData.name) updatePayload.name = updateData.name;
    if (updateData.description !== undefined) updatePayload.description = updateData.description;
    if (updateData.categoryId) updatePayload.category_id = updateData.categoryId;
    if (updateData.employeeId !== undefined) updatePayload.employee_id = updateData.employeeId;
    if (updateData.tags) updatePayload.tags = updateData.tags;
    if (updateData.metadata) updatePayload.metadata = updateData.metadata;
    if (updateData.expiryDate) updatePayload.expiry_date = new Date(updateData.expiryDate);
    if (updateData.isSensitive !== undefined) updatePayload.is_sensitive = updateData.isSensitive;
    if (updateData.accessLevel) updatePayload.access_level = updateData.accessLevel;
    if (updateData.status) updatePayload.status = updateData.status;

    updatePayload.updated_at = new Date();

    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: updatePayload,
      include: {
        category: true,
        employee: true
      }
    });

    // Formatar dados para resposta
    const formattedDocument = {
      ...updatedDocument,
      file_size_formatted: formatFileSize(updatedDocument.file_size),
      file_icon: getFileIcon(updatedDocument.file_type),
      file_extension: getFileExtension(updatedDocument.file_name),
      is_expired: updatedDocument.expiry_date ? new Date() > updatedDocument.expiry_date : false
    };

    res.json({
      success: true,
      data: formattedDocument,
      message: 'Documento atualizado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Controlador: Deletar documento
export const deleteDocument = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    if (!documentId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID do documento não fornecido' 
      });
    }

    // Verificar se o documento existe e pertence ao usuário
    const existingDocument = await prisma.document.findFirst({
      where: {
        id: documentId,
        user_id: userId
      }
    });

    if (!existingDocument) {
      return res.status(404).json({ 
        success: false, 
        message: 'Documento não encontrado' 
      });
    }

    // Soft delete - marcar como deletado
    await prisma.document.update({
      where: { id: documentId },
      data: {
        status: 'deleted',
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Documento deletado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao deletar documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Controlador: Listar categorias
export const listCategories = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const categories = await prisma.documentCategory.findMany({
      where: { active: true },
      orderBy: { name: 'asc' }
    });

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Controlador: Estatísticas de documentos
export const getDocumentStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    const [
      totalDocuments,
      totalSize,
      documentsByCategory,
      documentsByType,
      expiredDocuments
    ] = await Promise.all([
      // Total de documentos
      prisma.document.count({
        where: { user_id: userId, status: 'active' }
      }),
      
      // Tamanho total
      prisma.document.aggregate({
        where: { user_id: userId, status: 'active' },
        _sum: { file_size: true }
      }),
      
      // Documentos por categoria
      prisma.document.groupBy({
        by: ['category_id'],
        where: { user_id: userId, status: 'active' },
        _count: { id: true }
      }),
      
      // Documentos por tipo
      prisma.document.groupBy({
        by: ['file_type'],
        where: { user_id: userId, status: 'active' },
        _count: { id: true }
      }),
      
      // Documentos expirados
      prisma.document.count({
        where: {
          user_id: userId,
          status: 'active',
          expiry_date: { lt: new Date() }
        }
      })
    ]);

    // Obter nomes das categorias
    const categoryIds = documentsByCategory.map(item => item.category_id);
    const categories = await prisma.documentCategory.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true }
    });

    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {} as { [key: string]: string });

    const stats = {
      totalDocuments,
      totalSize: totalSize._sum.file_size || 0,
      totalSizeFormatted: formatFileSize(totalSize._sum.file_size || 0),
      documentsByCategory: documentsByCategory.map(item => ({
        categoryId: item.category_id,
        categoryName: categoryMap[item.category_id] || 'Categoria não encontrada',
        count: item._count.id
      })),
      documentsByType: documentsByType.map(item => ({
        type: item.file_type,
        count: item._count.id
      })),
      expiredDocuments
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};
