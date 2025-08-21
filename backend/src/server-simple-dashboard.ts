
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
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Implementação de funcionalidade
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

/**
 * Servidor Dashboard Simples - DOM v2
 * Versão simplificada sem Prisma para teste
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares básicos
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware de autenticação
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acesso não fornecido' 
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dom_v2_development_secret_key_2024';
    const decoded = jwt.verify(token, secret) as any;
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      profile: decoded.profile
    };
    
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Token inválido ou expirado' 
    });
  }
};

// Health check global
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DOM v2 Dashboard API funcionando corretamente',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota de autenticação
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt received:', { cpf: req.body?.cpf, hasPassword: !!req.body?.password });
  
  try {
    const { cpf, password } = req.body || {};
    
    if (!cpf || !password) {
      return res.status(400).json({
        success: false,
        message: 'CPF e senha são obrigatórios'
      });
    }
    
    // Dados de teste
    const testUser = {
      cpf: '598.769.137-00',
      password: '123456'
    };
    
    const normalizeCPF = (cpf: string) => cpf.replace(/\D/g, '');
    const normalizedInputCPF = normalizeCPF(cpf);
    const normalizedTestCPF = normalizeCPF(testUser.cpf);
    
    if (normalizedInputCPF === normalizedTestCPF && password === testUser.password) {
      const secret = process.env.JWT_SECRET || 'dom_v2_development_secret_key_2024';
      const token = jwt.sign(
        {
          id: 'test-user-id',
          email: 'teste@domv2.com',
          profile: 'USER'
        },
        secret,
        { expiresIn: '24h' }
      );
      
      res.json({
        success: true,
        data: {
          token: token,
          user: {
            id: 'test-user-id',
            name: 'Usuário Teste',
            email: 'teste@domv2.com',
            profile: 'USER'
          }
        },
        message: 'Login realizado com sucesso'
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'CPF ou senha incorretos'
      });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota de validação de token
app.get('/api/auth/validate', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido'
      });
    }
    
    const secret = process.env.JWT_SECRET || 'dom_v2_development_secret_key_2024';
    const decoded = jwt.verify(token, secret) as any;
    
    res.json({
      success: true,
      data: {
        user: {
          id: decoded.id,
          name: 'Usuário Teste',
          email: decoded.email,
          profile: decoded.profile
        }
      },
      message: 'Token válido'
    });
  } catch (error) {
    console.error('Erro na validação de token:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rotas de documentos SEM autenticação (para teste)
app.get('/api/documents/categories/list', async (req, res) => {
  try {
    // Dados mockados para teste
    const categories = [
      { id: 1, name: 'Contratos', count: 5 },
      { id: 2, name: 'Faturas', count: 12 },
      { id: 3, name: 'Relatórios', count: 8 },
      { id: 4, name: 'Documentos Pessoais', count: 3 }
    ];

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

app.get('/api/documents/stats', async (req, res) => {
  try {
    // Dados mockados para teste
    const stats = {
      totalDocuments: 28,
      pendingDocuments: 7,
      completedDocuments: 21,
      byCategory: [
        { category_id: 1, _count: { id: 5 } },
        { category_id: 2, _count: { id: 12 } },
        { category_id: 3, _count: { id: 8 } },
        { category_id: 4, _count: { id: 3 } }
      ],
      byStatus: [
        { status: 'PENDING', _count: { id: 7 } },
        { status: 'COMPLETED', _count: { id: 21 } }
      ],
      recentUploads: [
        { id: 1, name: 'Contrato_001.pdf', created_at: new Date(), file_size: 1024000 },
        { id: 2, name: 'Fatura_2024_01.pdf', created_at: new Date(), file_size: 512000 }
      ]
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
});

app.get('/api/documents/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Simular teste de conexão
    await new Promise(resolve => setTimeout(resolve, 10));
    
    const responseTime = Date.now() - startTime;
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent = Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100);

    res.json({
      success: true,
      data: {
        status: 'healthy',
        responseTime: responseTime,
        memoryUsage: memoryUsagePercent,
        timestamp: new Date().toISOString(),
        database: 'simulated'
      },
      message: 'Sistema funcionando corretamente'
    });
  } catch (error) {
    console.error('Erro no health check:', error);
    res.status(500).json({
      success: false,
      data: {
        status: 'error',
        responseTime: 0,
        memoryUsage: 0,
        timestamp: new Date().toISOString(),
        database: 'error'
      },
      message: 'Erro no health check'
    });
  }
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Tratamento de erros
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Dashboard Simples DOM v2 rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Iniciado em: ${new Date().toISOString()}`);
  console.log(`✅ Rotas disponíveis:`);
  console.log(`   - GET /api/health`);
  console.log(`   - POST /api/auth/login`);
  console.log(`   - GET /api/auth/validate`);
  console.log(`   - GET /api/documents/categories/list (SEM auth)`);
  console.log(`   - GET /api/documents/stats (SEM auth)`);
  console.log(`   - GET /api/documents/health`);
});
