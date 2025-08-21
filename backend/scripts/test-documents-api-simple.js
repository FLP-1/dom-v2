const http = require('http');
const https = require('https');
const jwt = require('jsonwebtoken');

// Configurações
const BASE_URL = 'http://localhost:3001';
const SECRET = 'dom_v2_development_secret_key_2024';

// Função para fazer requisições HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

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
  
  const requestOptions = {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };
  
  try {
    console.log(`🔍 Fazendo requisição para: ${url}`);
    const response = await makeRequest(url, requestOptions);
    
    console.log(`📊 Status: ${response.status}`);
    console.log(`📄 Resposta:`, JSON.stringify(response.data, null, 2));
    
    return response;
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

  console.log('✅ Testes da API de documentos concluídos!');
}

// Teste de autenticação
async function testAuthentication() {
  console.log('🔐 Testando autenticação...\n');

  // Teste sem token
  console.log('1️⃣ Teste sem token...');
  try {
    const response = await makeRequest(`${BASE_URL}/api/documents/categories/list`);
    console.log(`📊 Status: ${response.status}`);
    console.log(`📄 Resposta:`, JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(`❌ Erro:`, error.message);
  }
  console.log('');

  // Teste com token válido
  console.log('2️⃣ Teste com token válido...');
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
