
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
 * @fileoverview Rotas para gestão de documentos
 * @description API RESTful para upload, visualização e gerenciamento de documentos
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
 * - Para upload: Multer, Busboy, Formidable
 * - Para armazenamento: Local, S3, Google Cloud Storage
 * - Para validação: Joi, Yup, Zod
 * 
 * @considerations
 * - Performance: Otimização para upload de arquivos grandes
 * - Segurança: LGPD compliance, validação de tipos de arquivo
 * - Escalabilidade: Suporte a múltiplos formatos
 * - Manutenibilidade: Código limpo e documentado
 */

import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/documents');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'), false);
    }
  }
});

// Tipos TypeScript
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

// Validação de entrada
function validateDocumentData(data: any): data is DocumentCreateData {
  return (
    data &&
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    typeof data.categoryId === 'string' &&
    data.categoryId.trim().length > 0
  );
}

function validateDocumentUpdate(data: any): data is DocumentUpdateData {
  return data && typeof data === 'object';
}

// Rota: Listar documentos do usuário
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    const { 
      page = 1, 
      limit = 20, 
      categoryId, 
      employeeId, 
      status = 'active',
      search 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    // Construir filtros
    const where: any = {
      user_id: userId,
      status: status as string
    };

    if (categoryId) where.category_id = categoryId as string;
    if (employeeId) where.employee_id = employeeId as string;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

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
        take: Number(limit)
      }),
      prisma.document.count({ where })
    ]);

    res.json({
      success: true,
      data: documents,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota: Obter documento específico
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
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

    res.json({
      success: true,
      data: document
    });

  } catch (error) {
    console.error('Erro ao obter documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota: Upload de novo documento
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Arquivo não fornecido' 
      });
    }

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

    res.status(201).json({
      success: true,
      data: document,
      message: 'Documento criado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota: Atualizar documento
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
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

    res.json({
      success: true,
      data: updatedDocument,
      message: 'Documento atualizado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota: Deletar documento (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
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
});

// Rota: Download de documento
router.get('/:id/download', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        user_id: userId,
        status: 'active'
      }
    });

    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: 'Documento não encontrado' 
      });
    }

    // Verificar se o arquivo existe
    if (!fs.existsSync(document.file_path)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Arquivo não encontrado no servidor' 
      });
    }

    // Configurar headers para download
    res.setHeader('Content-Type', document.file_type);
    res.setHeader('Content-Disposition', `attachment; filename="${document.file_name}"`);
    res.setHeader('Content-Length', document.file_size);

    // Enviar arquivo
    const fileStream = fs.createReadStream(document.file_path);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Erro ao fazer download do documento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota: Listar categorias de documentos
router.get('/categories/list', authenticateToken, async (req, res) => {
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
});

export default router;
