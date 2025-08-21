const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

// Configurações
const BASE_URL = 'http://localhost:3001';
const SECRET = 'dom_v2_development_secret_key_2024';

// Gerar token de teste
function generateTestToken(userId = 'test-user-id') {
  const payload = {
    id: userId,
    email: 'test@example.com',
    profile: 'ADMIN'
  };
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
}

// Função para fazer requisições autenticadas
async function makeAuthenticatedRequest(endpoint, options = {}) {
  const token = generateTestToken();
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    console.log(`🔍 Fazendo requisição para: ${url}`);
    const response = await fetch(url, finalOptions);
    const data = await response.json();
    
    console.log(`📊 Status: ${response.status}`);
    console.log(`📄 Resposta:`, JSON.stringify(data, null, 2));
    
    return { status: response.status, data };
  } catch (error) {
    console.error(`❌ Erro na requisição:`, error.message);
    return { status: 'error', error: error.message };
  }
}

// Testes da API de documentos
async function testDocumentsAPI() {
  console.log('🚀 Iniciando testes da API de documentos...\n');

  // 1. Teste: Health check
  console.log('1️⃣ Testando health check...');
  await makeAuthenticatedRequest('/health');
  console.log('');

  // 2. Teste: Listar categorias
  console.log('2️⃣ Testando listar categorias...');
  await makeAuthenticatedRequest('/api/documents/categories/list');
  console.log('');

  // 3. Teste: Listar documentos
  console.log('3️⃣ Testando listar documentos...');
  await makeAuthenticatedRequest('/api/documents');
  console.log('');

  // 4. Teste: Estatísticas
  console.log('4️⃣ Testando estatísticas...');
  await makeAuthenticatedRequest('/api/documents/stats');
  console.log('');

  // 5. Teste: Buscar documentos com filtros
  console.log('5️⃣ Testando busca com filtros...');
  await makeAuthenticatedRequest('/api/documents?search=contrato&page=1&limit=10');
  console.log('');

  // 6. Teste: Documento específico (se existir)
  console.log('6️⃣ Testando documento específico...');
  const listResponse = await makeAuthenticatedRequest('/api/documents');
  if (listResponse.data && listResponse.data.data && listResponse.data.data.length > 0) {
    const firstDocId = listResponse.data.data[0].id;
    await makeAuthenticatedRequest(`/api/documents/${firstDocId}`);
  } else {
    console.log('⚠️ Nenhum documento encontrado para teste');
  }
  console.log('');

  console.log('✅ Testes da API de documentos concluídos!');
}

// Teste de autenticação
async function testAuthentication() {
  console.log('🔐 Testando autenticação...\n');

  // Teste sem token
  console.log('1️⃣ Teste sem token...');
  try {
    const response = await fetch(`${BASE_URL}/api/documents/categories/list`);
    const data = await response.json();
    console.log(`📊 Status: ${response.status}`);
    console.log(`📄 Resposta:`, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`❌ Erro:`, error.message);
  }
  console.log('');

  // Teste com token inválido
  console.log('2️⃣ Teste com token inválido...');
  try {
    const response = await fetch(`${BASE_URL}/api/documents/categories/list`, {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    });
    const data = await response.json();
    console.log(`📊 Status: ${response.status}`);
    console.log(`📄 Resposta:`, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`❌ Erro:`, error.message);
  }
  console.log('');

  // Teste com token válido
  console.log('3️⃣ Teste com token válido...');
  await makeAuthenticatedRequest('/api/documents/categories/list');
  console.log('');
}

// Executar testes
async function runTests() {
  try {
    await testAuthentication();
    await testDocumentsAPI();
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runTests();
}

module.exports = { testDocumentsAPI, testAuthentication, makeAuthenticatedRequest };
