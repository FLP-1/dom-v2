
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
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  
  // Log estruturado para debugging
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  // Salvar log de erro
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  // Re-throw para tratamento superior
  throw error;
}

// Aplicar tratamento de erro
try {
  // código principal aqui
} catch (error) {
  handleError(error, 'main-execution');
}


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

// Servidor de desenvolvimento DOM v2 - TypeScript
// Seguindo as diretrizes do projeto e melhores práticas

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import authEnhancedRoutes from './routes/auth-enhanced';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware básico
app.use(cors());
app.use(express.json());

// Rotas de autenticação melhoradas (baseadas no projeto E:\git-dom)
app.use('/api/auth-enhanced', authEnhancedRoutes);

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📨 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Endpoint de saúde
app.get('/health', (req: Request, res: Response) => {
  console.log('🏥 Health check solicitado');
  res.json({
    status: 'ok',
    version: '2.0.0',
    message: 'DOM v2 - Servidor de Desenvolvimento TypeScript',
    database: 'none',
    features: 'basic'
  });
});

// Endpoint de teste
app.get('/api/test', (req: Request, res: Response) => {
  console.log('🧪 Teste solicitado');
  res.json({
    message: 'API DOM v2 funcionando',
    database: 'none',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de login PREMIUM com LGPD
app.post('/api/auth/login', (req: Request, res: Response) => {
  console.log('🔐 Login Premium solicitado');
  const { 
    cpf, 
    password, 
    rememberMe, 
    biometricUsed, 
    termsAccepted, 
    privacyAccepted, 
    marketingAccepted 
  } = req.body;

  console.log('🔐 Tentativa de login:', { 
    cpf, 
    rememberMe, 
    biometricUsed, 
    termsAccepted, 
    privacyAccepted, 
    marketingAccepted 
  });

  // Validações básicas
  if (!cpf || !password) {
    console.log('❌ Campos obrigatórios faltando');
    return res.status(400).json({
      error: 'CPF e senha são obrigatórios',
      code: 'MISSING_FIELDS'
    });
  }

  // Validação LGPD
  if (!termsAccepted || !privacyAccepted) {
    console.log('❌ Termos de uso não aceitos');
    return res.status(400).json({
      error: 'Você deve aceitar os Termos de Uso e Política de Privacidade',
      code: 'LGPD_REQUIRED'
    });
  }

  // Para MVP: aceitar qualquer CPF válido e senha 123456
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) {
    console.log('❌ CPF inválido:', cpf);
    return res.status(400).json({
      error: 'CPF deve ter 11 dígitos',
      code: 'INVALID_CPF'
    });
  }

  if (password !== '123456') {
    console.log('❌ Senha incorreta');
    return res.status(401).json({
      error: 'Senha incorreta (use: 123456)',
      code: 'INVALID_PASSWORD'
    });
  }

  console.log('✅ Login Premium realizado com sucesso');

  // Determinar perfil baseado no CPF (para teste)
  let profile = 'EMPLOYER'; // padrão
  let name = 'Usuário Desenvolvimento';
  
  // Mapeamento de CPFs para perfis (para teste)
  const profileMapping: { [key: string]: { profile: string; name: string } } = {
    '12345678901': { profile: 'EMPLOYER', name: 'Maria Silva - Empregadora' },
    '12345678902': { profile: 'EMPLOYEE', name: 'João Santos - Funcionário' },
    '12345678903': { profile: 'FAMILY', name: 'Pedro Costa - Familiar' },
    '12345678904': { profile: 'PARTNER', name: 'Ana Oliveira - Parceira' },
    '12345678905': { profile: 'ADMIN', name: 'Carlos Admin - Administrador' },
    '12345678906': { profile: 'OWNER', name: 'Roberto Owner - Proprietário' },
  };

  if (profileMapping[cleanCPF]) {
    profile = profileMapping[cleanCPF].profile;
    name = profileMapping[cleanCPF].name;
  } else {
    // Para CPFs não mapeados, usar baseado no último dígito
    const lastDigit = parseInt(cleanCPF.slice(-1));
    const profiles = ['EMPLOYER', 'EMPLOYEE', 'FAMILY', 'PARTNER', 'ADMIN', 'OWNER'];
    profile = profiles[lastDigit % profiles.length];
    name = `Usuário ${profile} - CPF: ${cleanCPF}`;
  }

  // Log de sucesso para analytics
  const loginLog = {
    timestamp: new Date().toISOString(),
    cpf: cleanCPF,
    success: true,
    profile,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    biometricUsed: biometricUsed || false,
    rememberMe: rememberMe || false,
    termsAccepted,
    privacyAccepted,
    marketingAccepted,
  };

  console.log('📊 Log de login:', loginLog);

  // Retornar dados simulados com perfil correto
  res.json({
    success: true,
    user: {
      id: `dev-user-${cleanCPF}`,
      name: name,
      email: `${cleanCPF}@dev.com`,
      profile: profile,
      cpf: cleanCPF
    },
    organizations: [{
      id: 'dev-org-123',
      name: 'Organização Desenvolvimento',
      type: 'user',
      role: 'user'
    }],
    message: `Login Premium realizado com sucesso - Perfil: ${profile}`,
    preferences: {
      rememberMe,
      biometricEnabled: biometricUsed,
      marketingAccepted
    }
  });
});

// Endpoint para logs de login
app.post('/api/logs/login', (req: Request, res: Response) => {
  const logData = req.body;
  console.log('📊 Log de tentativa de login:', logData);
  
  // Em produção, salvaria no banco de dados
  // Por enquanto, apenas log no console
  
  res.json({
    success: true,
    message: 'Log registrado com sucesso'
  });
});

// Endpoint para recuperação de senha
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  console.log('🔑 Recuperação de senha solicitada para:', email);

  // Simulação de envio de e-mail
  setTimeout(() => {
    console.log('📧 E-mail de recuperação enviado para:', email);
  }, 1000);

  res.json({
    success: true,
    message: 'E-mail de recuperação enviado com sucesso'
  });
});

// Endpoints simulados para desenvolvimento
app.get('/api/budgets', (req: Request, res: Response) => {
  res.json({
    budgets: [
      { id: 1, name: 'Orçamento Teste', amount: 10000 }
    ]
  });
});

app.get('/api/payroll', (req: Request, res: Response) => {
  res.json({
    payroll: [
      { id: 1, employee: 'João Silva', salary: 3000 }
    ]
  });
});

app.get('/api/employees', (req: Request, res: Response) => {
  res.json({
    employees: [
      { id: 1, name: 'João Silva', position: 'Desenvolvedor' }
    ]
  });
});

// Middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Erro no servidor:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR'
  });
});

// Rota 404
app.use('*', (req: Request, res: Response) => {
  console.log('❌ Rota não encontrada:', req.originalUrl);
  res.status(404).json({
    error: 'Rota não encontrada',
    code: 'NOT_FOUND'
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor de desenvolvimento TypeScript rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/login`);
  console.log(`💰 Budget API: http://localhost:${PORT}/api/budgets`);
  console.log(`💼 Payroll API: http://localhost:${PORT}/api/payroll`);
  console.log(`👥 Employees API: http://localhost:${PORT}/api/employees`);
  console.log(`⏹️  Para parar: Ctrl+C`);
});

// Manter servidor ativo
process.on('SIGINT', () => {
  console.log('\n🛑 Parando servidor...');
  server.close(() => {
    console.log('✅ Servidor parado');
    process.exit(0);
  });
});

export default app; 