
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
 * @fileoverview Script de teste para validação CPF/CNPJ
 * @directory dom-v2
 * @description Testa a validação de dígito verificador do componente CPFCNPJInput
 * @created 2025-07-23
 * @lastModified 2025-07-23
 * @author DOM Team v2
 */

// Funções de validação extraídas do componente CPFCNPJInput
const cleanDocument = (document) => {
  return document.replace(/\D/g, '');
};

const validateCPF = (cpf) => {
  const cleaned = cleanDocument(cpf);
  
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false; // Todos os dígitos iguais
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

const validateCNPJ = (cnpj) => {
  const cleaned = cleanDocument(cnpj);
  
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleaned)) return false; // Todos os dígitos iguais
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  let weight = 2;
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(cleaned.charAt(12))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  weight = 2;
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(cleaned.charAt(13))) return false;
  
  return true;
};

// Casos de teste
const testCases = {
  cpf: {
    valid: [
      '111.444.777-35', // CPF válido conhecido
      '123.456.789-09', // CPF válido conhecido
      '529.982.247-25'  // CPF válido conhecido
    ],
    invalid: [
      '111.111.111-12', // CPF inválido (todos iguais, mas dígitos errados)
      '123.456.789-10', // CPF inválido
      '000.000.000-00', // CPF inválido
      '111.444.777-34', // CPF inválido (dígito errado)
      '123.456.789-00', // CPF inválido
      'abc.def.ghi-jk', // CPF inválido (letras)
      '123.456.789',    // CPF inválido (incompleto)
      '123.456.789-091', // CPF inválido (muito longo)
      ''                 // CPF vazio
    ]
  },
  cnpj: {
    valid: [
      '11.222.333/0001-81', // CNPJ válido conhecido
      '00.000.000/0001-91', // CNPJ válido conhecido
      '11.444.777/0001-61'  // CNPJ válido conhecido
    ],
    invalid: [
      '11.222.333/0001-82', // CNPJ inválido (dígito errado)
      '00.000.000/0001-92', // CNPJ inválido (dígito errado)
      '11.111.111/1111-12', // CNPJ inválido (todos iguais, mas dígitos errados)
      '123.456.789/0001-00', // CNPJ inválido
      'abc.def.ghi/0001-jk', // CNPJ inválido (letras)
      '11.222.333/0001',     // CNPJ inválido (incompleto)
      '11.222.333/0001-811', // CNPJ inválido (muito longo)
      ''                     // CNPJ vazio
    ]
  }
};

// Função de teste
const runValidationTests = () => {
  console.log('🧪 TESTE DE VALIDAÇÃO CPF/CNPJ - DOM v2\n');
  console.log('=' .repeat(60));
  
  let totalTests = 0;
  let passedTests = 0;
  
  // Testar CPFs válidos
  console.log('\n📋 TESTANDO CPFs VÁLIDOS:');
  testCases.cpf.valid.forEach(cpf => {
    totalTests++;
    const isValid = validateCPF(cpf);
    const status = isValid ? '✅' : '❌';
    console.log(`${status} ${cpf} -> ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
    if (isValid) passedTests++;
  });
  
  // Testar CPFs inválidos
  console.log('\n📋 TESTANDO CPFs INVÁLIDOS:');
  testCases.cpf.invalid.forEach(cpf => {
    totalTests++;
    const isValid = validateCPF(cpf);
    const status = !isValid ? '✅' : '❌';
    console.log(`${status} ${cpf} -> ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
    if (!isValid) passedTests++;
  });
  
  // Testar CNPJs válidos
  console.log('\n📋 TESTANDO CNPJs VÁLIDOS:');
  testCases.cnpj.valid.forEach(cnpj => {
    totalTests++;
    const isValid = validateCNPJ(cnpj);
    const status = isValid ? '✅' : '❌';
    console.log(`${status} ${cnpj} -> ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
    if (isValid) passedTests++;
  });
  
  // Testar CNPJs inválidos
  console.log('\n📋 TESTANDO CNPJs INVÁLIDOS:');
  testCases.cnpj.invalid.forEach(cnpj => {
    totalTests++;
    const isValid = validateCNPJ(cnpj);
    const status = !isValid ? '✅' : '❌';
    console.log(`${status} ${cnpj} -> ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
    if (!isValid) passedTests++;
  });
  
  // Resultados
  console.log('\n' + '=' .repeat(60));
  console.log('📊 RESULTADOS DOS TESTES:');
  console.log(`Total de testes: ${totalTests}`);
  console.log(`Testes aprovados: ${passedTests}`);
  console.log(`Taxa de sucesso: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 TODOS OS TESTES PASSARAM!');
    console.log('✅ A validação de dígito verificador está funcionando corretamente.');
  } else {
    console.log('\n⚠️  ALGUNS TESTES FALHARAM!');
    console.log('❌ Há problemas na validação de dígito verificador.');
  }
  
  console.log('\n🔍 DETALHES DA VALIDAÇÃO:');
  console.log('• CPF: Validação dos 2 dígitos verificadores');
  console.log('• CNPJ: Validação dos 2 dígitos verificadores');
  console.log('• Formatação automática durante digitação');
  console.log('• Feedback visual em tempo real');
  console.log('• Prevenção de dados inválidos no sistema');
};

// Executar testes
runValidationTests(); 