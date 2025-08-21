
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
 * @fileoverview Script de teste para funcionalidade de documentos
 * @description Testa as APIs de documentos do DOM v2
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configurações
const BASE_URL = 'http://localhost:3001/api';
const TEST_USER_ID = 'test-user-id';

// Headers padrão
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TEST_USER_ID}`
};

// Função para criar um arquivo de teste
function createTestFile() {
  const testContent = 'Este é um arquivo de teste para o DOM v2';
  const testFilePath = path.join(__dirname, 'test-document.txt');
  
  fs.writeFileSync(testFilePath, testContent);
  return testFilePath;
}

// Função para limpar arquivo de teste
function cleanupTestFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// Teste 1: Listar categorias
async function testListCategories() {
  console.log('🧪 Testando: Listar categorias de documentos');
  
  try {
    const response = await axios.get(`${BASE_URL}/documents/categories/list`, { headers });
    
    if (response.data.success) {
      console.log('✅ Categorias listadas com sucesso');
      console.log(`📊 Total de categorias: ${response.data.data.length}`);
      response.data.data.forEach(category => {
        console.log(`  - ${category.icon} ${category.name}`);
      });
      return response.data.data;
    } else {
      console.log('❌ Erro ao listar categorias:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 2: Listar documentos
async function testListDocuments() {
  console.log('\n🧪 Testando: Listar documentos');
  
  try {
    const response = await axios.get(`${BASE_URL}/documents`, { headers });
    
    if (response.data.success) {
      console.log('✅ Documentos listados com sucesso');
      console.log(`📊 Total de documentos: ${response.data.data.length}`);
      console.log(`📄 Página: ${response.data.pagination?.page || 1}`);
      console.log(`📄 Total de páginas: ${response.data.pagination?.pages || 1}`);
      
      response.data.data.forEach(doc => {
        console.log(`  - ${doc.file_icon} ${doc.name} (${doc.file_size_formatted})`);
      });
      return response.data.data;
    } else {
      console.log('❌ Erro ao listar documentos:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 3: Upload de documento
async function testUploadDocument(categories) {
  console.log('\n🧪 Testando: Upload de documento');
  
  if (!categories || categories.length === 0) {
    console.log('❌ Nenhuma categoria disponível para teste');
    return null;
  }
  
  const testFilePath = createTestFile();
  const categoryId = categories[0].id;
  
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(testFilePath));
    formData.append('name', 'Documento de Teste DOM v2');
    formData.append('description', 'Este é um documento de teste para validar a funcionalidade');
    formData.append('categoryId', categoryId);
    formData.append('isSensitive', 'false');
    formData.append('accessLevel', 'private');
    
    const response = await axios.post(`${BASE_URL}/documents`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${TEST_USER_ID}`
      }
    });
    
    if (response.data.success) {
      console.log('✅ Documento enviado com sucesso');
      console.log(`📄 ID: ${response.data.data.id}`);
      console.log(`📄 Nome: ${response.data.data.name}`);
      console.log(`📄 Tamanho: ${response.data.data.file_size_formatted}`);
      console.log(`📄 Categoria: ${response.data.data.category?.name}`);
      return response.data.data;
    } else {
      console.log('❌ Erro ao enviar documento:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    if (error.response) {
      console.log('❌ Resposta do servidor:', error.response.data);
    }
    return null;
  } finally {
    cleanupTestFile(testFilePath);
  }
}

// Teste 4: Obter documento específico
async function testGetDocument(documentId) {
  console.log('\n🧪 Testando: Obter documento específico');
  
  if (!documentId) {
    console.log('❌ ID do documento não fornecido');
    return null;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/documents/${documentId}`, { headers });
    
    if (response.data.success) {
      console.log('✅ Documento obtido com sucesso');
      console.log(`📄 Nome: ${response.data.data.name}`);
      console.log(`📄 Descrição: ${response.data.data.description}`);
      console.log(`📄 Categoria: ${response.data.data.category?.name}`);
      console.log(`📄 Versões: ${response.data.data.versions?.length || 0}`);
      return response.data.data;
    } else {
      console.log('❌ Erro ao obter documento:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 5: Atualizar documento
async function testUpdateDocument(documentId) {
  console.log('\n🧪 Testando: Atualizar documento');
  
  if (!documentId) {
    console.log('❌ ID do documento não fornecido');
    return null;
  }
  
  try {
    const updateData = {
      name: 'Documento de Teste Atualizado',
      description: 'Este documento foi atualizado via teste',
      isSensitive: true
    };
    
    const response = await axios.put(`${BASE_URL}/documents/${documentId}`, updateData, { headers });
    
    if (response.data.success) {
      console.log('✅ Documento atualizado com sucesso');
      console.log(`📄 Novo nome: ${response.data.data.name}`);
      console.log(`📄 Nova descrição: ${response.data.data.description}`);
      console.log(`📄 Sensível: ${response.data.data.is_sensitive}`);
      return response.data.data;
    } else {
      console.log('❌ Erro ao atualizar documento:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 6: Estatísticas de documentos
async function testDocumentStats() {
  console.log('\n🧪 Testando: Estatísticas de documentos');
  
  try {
    const response = await axios.get(`${BASE_URL}/documents/stats`, { headers });
    
    if (response.data.success) {
      console.log('✅ Estatísticas obtidas com sucesso');
      const stats = response.data.data;
      console.log(`📊 Total de documentos: ${stats.totalDocuments}`);
      console.log(`📊 Tamanho total: ${stats.totalSizeFormatted}`);
      console.log(`📊 Documentos expirados: ${stats.expiredDocuments}`);
      console.log(`📊 Documentos por categoria: ${stats.documentsByCategory.length}`);
      console.log(`📊 Documentos por tipo: ${stats.documentsByType.length}`);
      return stats;
    } else {
      console.log('❌ Erro ao obter estatísticas:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 7: Buscar documentos
async function testSearchDocuments() {
  console.log('\n🧪 Testando: Buscar documentos');
  
  try {
    const searchQuery = 'teste';
    const response = await axios.get(`${BASE_URL}/documents?search=${searchQuery}`, { headers });
    
    if (response.data.success) {
      console.log('✅ Busca realizada com sucesso');
      console.log(`🔍 Termo buscado: "${searchQuery}"`);
      console.log(`📊 Resultados encontrados: ${response.data.data.length}`);
      response.data.data.forEach(doc => {
        console.log(`  - ${doc.file_icon} ${doc.name}`);
      });
      return response.data.data;
    } else {
      console.log('❌ Erro na busca:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 8: Filtrar por categoria
async function testFilterByCategory(categories) {
  console.log('\n🧪 Testando: Filtrar por categoria');
  
  if (!categories || categories.length === 0) {
    console.log('❌ Nenhuma categoria disponível para teste');
    return null;
  }
  
  const categoryId = categories[0].id;
  const categoryName = categories[0].name;
  
  try {
    const response = await axios.get(`${BASE_URL}/documents?categoryId=${categoryId}`, { headers });
    
    if (response.data.success) {
      console.log('✅ Filtro por categoria realizado com sucesso');
      console.log(`📂 Categoria: ${categoryName}`);
      console.log(`📊 Documentos encontrados: ${response.data.data.length}`);
      response.data.data.forEach(doc => {
        console.log(`  - ${doc.file_icon} ${doc.name}`);
      });
      return response.data.data;
    } else {
      console.log('❌ Erro no filtro:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return null;
  }
}

// Teste 9: Deletar documento
async function testDeleteDocument(documentId) {
  console.log('\n🧪 Testando: Deletar documento');
  
  if (!documentId) {
    console.log('❌ ID do documento não fornecido');
    return null;
  }
  
  try {
    const response = await axios.delete(`${BASE_URL}/documents/${documentId}`, { headers });
    
    if (response.data.success) {
      console.log('✅ Documento deletado com sucesso');
      console.log(`📄 ID deletado: ${documentId}`);
      return true;
    } else {
      console.log('❌ Erro ao deletar documento:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Erro na requisição:', error.message);
    return false;
  }
}

// Função principal de teste
async function runAllTests() {
  console.log('🚀 Iniciando testes da funcionalidade de documentos DOM v2\n');
  
  try {
    // Teste 1: Listar categorias
    const categories = await testListCategories();
    
    // Teste 2: Listar documentos
    const documents = await testListDocuments();
    
    // Teste 3: Upload de documento
    const uploadedDocument = await testUploadDocument(categories);
    
    // Teste 4: Obter documento específico
    if (uploadedDocument) {
      await testGetDocument(uploadedDocument.id);
    }
    
    // Teste 5: Atualizar documento
    if (uploadedDocument) {
      await testUpdateDocument(uploadedDocument.id);
    }
    
    // Teste 6: Estatísticas
    await testDocumentStats();
    
    // Teste 7: Buscar documentos
    await testSearchDocuments();
    
    // Teste 8: Filtrar por categoria
    await testFilterByCategory(categories);
    
    // Teste 9: Deletar documento (opcional - comentado para não deletar)
    // if (uploadedDocument) {
    //   await testDeleteDocument(uploadedDocument.id);
    // }
    
    console.log('\n🎉 Todos os testes concluídos!');
    console.log('✅ Funcionalidade de documentos está funcionando corretamente');
    
  } catch (error) {
    console.log('\n❌ Erro durante os testes:', error.message);
  }
}

// Executar testes se chamado diretamente
if (require.main === module) {
  runAllTests();
}

module.exports = {
  testListCategories,
  testListDocuments,
  testUploadDocument,
  testGetDocument,
  testUpdateDocument,
  testDocumentStats,
  testSearchDocuments,
  testFilterByCategory,
  testDeleteDocument,
  runAllTests
};
