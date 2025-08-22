import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'), false);
    }
  }
});

// =================== ROTAS DE DOCUMENTOS ===================

// GET /api/documents - Listar documentos
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      user_id, 
      status = 'active',
      limit = 50,
      search 
    } = req.query;

    // Construir filtros
    const whereClause: any = { status: 'active' };

    if (category) {
      whereClause.category_id = category;
    }

    if (user_id) {
      whereClause.user_id = user_id;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Buscar documentos
    const documents = await prisma.document.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        versions: {
          orderBy: { created_at: 'desc' },
          take: 1
        }
      },
      orderBy: [
        { updated_at: 'desc' },
        { created_at: 'desc' }
      ],
      take: parseInt(limit)
    });

    // Calcular estatísticas
    const totalDocuments = documents.length;
    const byCategory = documents.reduce((acc, doc) => {
      const cat = doc.category_id || 'Sem categoria';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    // Calcular tamanho total
    const totalSize = documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0);

    res.json({
      success: true,
      data: {
        documents,
        statistics: {
          total: totalDocuments,
          totalSize,
          byCategory
        }
      }
    });
  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar documentos: ' + error.message
    });
  }
});

// GET /api/documents/:id - Detalhes do documento
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        versions: {
          orderBy: { created_at: 'desc' }
        },
        shares: {
          include: {
            shared_user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Documento não encontrado'
      });
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar documento: ' + error.message
    });
  }
});

// POST /api/documents - Upload de documento
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { 
      name, 
      description, 
      category = 'Geral',
      tags,
      user_id 
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'Arquivo é obrigatório'
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Nome do documento é obrigatório'
      });
    }

    // Verificar se usuário existe
    if (user_id) {
      const user = await prisma.users.findUnique({
        where: { id: user_id }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
    }

    // Criar documento
    const document = await prisma.document.create({
      data: {
        name,
        description: description || null,
        category_id: 'cat_geral', // Categoria padrão
        user_id: user_id || '00000000-0000-0000-0000-000000000000', // Usuário padrão
        file_name: file.originalname,
        file_path: file.path,
        file_size: file.size,
        file_type: file.mimetype,
        file_hash: 'hash_' + Date.now(), // Hash temporário
        tags: tags ? JSON.parse(tags) : [],
        status: 'active'
      }
    });

    // Criar primeira versão
    await prisma.documentVersion.create({
      data: {
        document_id: document.id,
        version: 1,
        file_path: file.path,
        file_name: file.originalname,
        file_size: file.size,
        file_hash: 'hash_' + Date.now(), // Hash temporário
        changes: 'Versão inicial',
        created_by: user_id || '00000000-0000-0000-0000-000000000000' // Usuário padrão
      }
    });

    res.status(201).json({
      success: true,
      data: document,
      message: 'Documento enviado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao enviar documento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao enviar documento: ' + error.message
    });
  }
});

// PUT /api/documents/:id - Atualizar documento
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      description, 
      category, 
      tags,
      active 
    } = req.body;

    // Verificar se documento existe
    const existingDocument = await prisma.document.findUnique({
      where: { id }
    });

    if (!existingDocument) {
      return res.status(404).json({
        success: false,
        error: 'Documento não encontrado'
      });
    }

    // Atualizar documento
    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        name: name || undefined,
        description: description || undefined,
        tags: tags ? JSON.parse(tags) : undefined,
        status: active !== undefined ? (active ? 'active' : 'inactive') : undefined,
        updated_at: new Date()
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
      error: 'Erro ao atualizar documento: ' + error.message
    });
  }
});

// DELETE /api/documents/:id - Excluir documento
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se documento existe
    const existingDocument = await prisma.document.findUnique({
      where: { id }
    });

    if (!existingDocument) {
      return res.status(404).json({
        success: false,
        error: 'Documento não encontrado'
      });
    }

    // Excluir arquivo físico
    if (existingDocument.file_path && fs.existsSync(existingDocument.file_path)) {
      fs.unlinkSync(existingDocument.file_path);
    }

    // Excluir versões
    await prisma.documentVersion.deleteMany({
      where: { document_id: id }
    });

    // Excluir compartilhamentos
    await prisma.documentShare.deleteMany({
      where: { document_id: id }
    });

    // Excluir documento
    await prisma.document.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Documento excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao excluir documento: ' + error.message
    });
  }
});

// =================== COMPARTILHAMENTO DE DOCUMENTOS ===================

// POST /api/documents/:id/share - Compartilhar documento
router.post('/:id/share', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, permissions = 'read' } = req.body;

    // Verificar se documento existe
    const document = await prisma.document.findUnique({
      where: { id }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Documento não encontrado'
      });
    }

    // Verificar se usuário existe
    const user = await prisma.users.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Verificar se já existe compartilhamento
    const existingShare = await prisma.documentShare.findFirst({
      where: {
        document_id: id,
        shared_with: user_id
      }
    });

    if (existingShare) {
      return res.status(400).json({
        success: false,
        error: 'Documento já está compartilhado com este usuário'
      });
    }

    // Criar compartilhamento
    const share = await prisma.documentShare.create({
      data: {
        document_id: id,
        shared_by: document.user_id,
        shared_with: user_id,
        permissions: { type: permissions }
      }
    });

    res.status(201).json({
      success: true,
      data: share,
      message: 'Documento compartilhado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao compartilhar documento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao compartilhar documento: ' + error.message
    });
  }
});

// GET /api/documents/shared - Documentos compartilhados comigo
router.get('/shared/with-me', async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário é obrigatório'
      });
    }

    const sharedDocuments = await prisma.documentShare.findMany({
      where: {
        shared_with: user_id
      },
      include: {
        document: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        sharer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({
      success: true,
      data: sharedDocuments
    });
  } catch (error) {
    console.error('Erro ao buscar documentos compartilhados:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar documentos compartilhados: ' + error.message
    });
  }
});

// =================== RELATÓRIOS DE DOCUMENTOS ===================

// GET /api/documents/reports/dashboard - Dashboard de documentos
router.get('/reports/dashboard', async (req, res) => {
  try {
    const { user_id } = req.query;

    // Construir filtros
    const whereClause: any = { status: 'active' };
    if (user_id) {
      whereClause.user_id = user_id;
    }

    // Buscar documentos
    const documents = await prisma.document.findMany({
      where: whereClause
    });

    // Calcular métricas
    const totalDocuments = documents.length;
    const totalSize = documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0);
    const avgSize = totalDocuments > 0 ? totalSize / totalDocuments : 0;

    // Agrupar por categoria
    const byCategory = documents.reduce((acc, doc) => {
      const cat = doc.category_id || 'Sem categoria';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    // Agrupar por tipo de arquivo
    const byType = documents.reduce((acc, doc) => {
      const ext = path.extname(doc.file_name || '').toLowerCase();
      acc[ext] = (acc[ext] || 0) + 1;
      return acc;
    }, {});

    // Documentos recentes (últimos 7 dias)
    const recentDocuments = documents.filter(doc => 
      doc.created_at && 
      new Date(doc.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    res.json({
      success: true,
      data: {
        summary: {
          totalDocuments,
          totalSize,
          avgSize: Math.round(avgSize),
          recentDocuments
        },
        byCategory,
        byType
      }
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard de documentos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar dashboard de documentos: ' + error.message
    });
  }
});

// GET /api/documents/reports/storage - Relatório de armazenamento
router.get('/reports/storage', async (req, res) => {
  try {
    const { user_id } = req.query;

    // Construir filtros
    const whereClause: any = { status: 'active' };
    if (user_id) {
      whereClause.user_id = user_id;
    }

    // Buscar documentos
    const documents = await prisma.document.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        category_id: true,
        file_size: true,
        created_at: true,
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Calcular estatísticas por usuário
    const byUser = documents.reduce((acc, doc) => {
      const userId = doc.user?.id || 'Sem usuário';
      const userName = doc.user?.name || 'Sem usuário';
      
      if (!acc[userId]) {
        acc[userId] = {
          user_id: userId,
          user_name: userName,
          count: 0,
          total_size: 0,
          documents: []
        };
      }
      
      acc[userId].count++;
      acc[userId].total_size += doc.file_size || 0;
      acc[userId].documents.push(doc);
      
      return acc;
    }, {});

    // Calcular estatísticas por categoria
    const byCategory = documents.reduce((acc, doc) => {
      const cat = doc.category_id || 'Sem categoria';
      
      if (!acc[cat]) {
        acc[cat] = {
          category: cat,
          count: 0,
          total_size: 0,
          avg_size: 0
        };
      }
      
      acc[cat].count++;
      acc[cat].total_size += doc.file_size || 0;
      acc[cat].avg_size = acc[cat].count > 0 ? acc[cat].total_size / acc[cat].count : 0;
      
      return acc;
    }, {});

    const totalSize = documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0);

    res.json({
      success: true,
      data: {
        summary: {
          totalDocuments: documents.length,
          totalSize,
          avgSize: documents.length > 0 ? totalSize / documents.length : 0
        },
        byUser: Object.values(byUser),
        byCategory: Object.values(byCategory)
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório de armazenamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar relatório de armazenamento: ' + error.message
    });
  }
});

// =================== DOWNLOAD DE DOCUMENTOS ===================

// GET /api/documents/:id/download - Download do documento
router.get('/:id/download', async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Documento não encontrado'
      });
    }

    if (!document.file_path || !fs.existsSync(document.file_path)) {
      return res.status(404).json({
        success: false,
        error: 'Arquivo não encontrado'
      });
    }

    // Atualizar contador de downloads (campo não existe no schema, vamos pular)
    // await prisma.document.update({
    //   where: { id },
    //   data: {
    //     download_count: (document.download_count || 0) + 1
    //   }
    // });

    res.download(document.file_path, document.file_name);
  } catch (error) {
    console.error('Erro ao fazer download:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao fazer download: ' + error.message
    });
  }
});

export default router;
