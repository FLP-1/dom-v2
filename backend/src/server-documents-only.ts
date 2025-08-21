
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


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
 * @fileoverview Servidor simplificado para testar funcionalidade de documentos
 * @description Servidor focado apenas na API de documentos do DOM v2
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 */

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const app = express();
const prisma = new PrismaClient();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

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

// Middleware de autenticação simplificado
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acesso não fornecido' 
    });
  }

  // Para teste, aceitar qualquer token
      // Usar ID do usuário real da requisição
    const userId = req.headers['user-id'] as string;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'ID do usuário não fornecido' 
      });
    }
    req.user = { id: userId };
  next();
};

// Utility functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

function getFileIcon(fileType: string): string {
  const iconMap: { [key: string]: string } = {
    '.pdf': '📄',
    '.doc': '📝',
    '.docx': '📝',
    '.xls': '📊',
    '.xlsx': '📊',
    '.jpg': '🖼️',
    '.jpeg': '🖼️',
    '.png': '🖼️',
    '.gif': '🖼️',
    '.txt': '📄'
  };
  return iconMap[fileType] || '📄';
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Servidor de documentos DOM v2 funcionando',
    timestamp: new Date().toISOString()
  });
});

// API Routes
const apiRouter = express.Router();

// Listar categorias
apiRouter.get('/documents/categories/list', authenticateToken, async (req, res) => {
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

// Listar documentos
apiRouter.get('/documents', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      page = 1, 
      limit = 20, 
      categoryId, 
      search 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {
      user_id: userId,
      status: 'active'
    };

    if (categoryId) where.category_id = categoryId as string;
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
          category: true
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.document.count({ where })
    ]);

    const formattedDocuments = documents.map(doc => ({
      ...doc,
      file_size_formatted: formatFileSize(doc.file_size),
      file_icon: getFileIcon(getFileExtension(doc.file_name)),
      category_name: doc.category.name
    }));

    res.json({
      success: true,
      data: formattedDocuments,
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

// Upload de documento
apiRouter.post('/documents', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo enviado'
      });
    }

    const { name, description, categoryId, isSensitive } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Nome e categoria são obrigatórios'
      });
    }

    // Verificar se a categoria existe
    const category = await prisma.documentCategory.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Categoria não encontrada'
      });
    }

    // Calcular hash do arquivo
    const fileBuffer = fs.readFileSync(file.path);
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    const document = await prisma.document.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        category_id: categoryId,
        user_id: userId,
        file_name: file.originalname,
        file_path: file.path,
        file_size: file.size,
        file_type: file.mimetype,
        file_hash: fileHash,
        is_sensitive: isSensitive === 'true',
        access_level: 'private'
      },
      include: {
        category: true
      }
    });

    res.json({
      success: true,
      message: 'Documento enviado com sucesso',
      data: {
        ...document,
        file_size_formatted: formatFileSize(document.file_size),
        file_icon: getFileIcon(getFileExtension(document.file_name)),
        category_name: document.category.name
      }
    });
  } catch (error) {
    console.error('Erro ao enviar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Download de documento
apiRouter.get('/documents/:id/download', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.id;

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

    if (!fs.existsSync(document.file_path)) {
      return res.status(404).json({
        success: false,
        message: 'Arquivo não encontrado no servidor'
      });
    }

    res.download(document.file_path, document.file_name);
  } catch (error) {
    console.error('Erro ao baixar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Excluir documento (soft delete)
apiRouter.delete('/documents/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.id;

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

    await prisma.document.update({
      where: { id: documentId },
      data: { status: 'deleted' }
    });

    res.json({
      success: true,
      message: 'Documento excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Estatísticas de documentos
apiRouter.get('/documents/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalDocuments, totalCategories, sensitiveDocuments, totalSize] = await Promise.all([
      prisma.document.count({
        where: { user_id: userId, status: 'active' }
      }),
      prisma.documentCategory.count({
        where: { active: true }
      }),
      prisma.document.count({
        where: { user_id: userId, status: 'active', is_sensitive: true }
      }),
      prisma.document.aggregate({
        where: { user_id: userId, status: 'active' },
        _sum: { file_size: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalDocuments,
        totalCategories,
        sensitiveDocuments,
        totalSize: totalSize._sum.file_size || 0,
        totalSizeFormatted: formatFileSize(totalSize._sum.file_size || 0)
      }
    });
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Montar rotas
app.use('/api', apiRouter);

// Middleware de erro
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// Rota 404
app.use('*', (req: any, res: any) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada'
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor de documentos DOM v2 rodando na porta ${PORT}`);
  console.log(`📄 API disponível em: http://localhost:${PORT}/api/documents`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

// Manter servidor ativo
process.on('SIGINT', async () => {
  console.log('🔄 Encerrando servidor...');
  server.close(async () => {
    console.log('🔌 Desconectando do banco de dados...');
    await prisma.$disconnect();
    console.log('👋 Servidor encerrado');
    process.exit(0);
  });
});

export default app;
