const http = require('http');
const jwt = require('jsonwebtoken');

// Configurações
const BASE_URL = 'http://localhost:3001';
const SECRET = 'dom_v2_development_secret_key_2024';

// Gerar token de teste
function generateTestToken() {
  const payload = {
    id: 'test-user-id',
    email: 'test@example.com',
    profile: 'ADMIN'
  };
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
}

// Função para fazer requisições HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
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

    const req = http.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Teste simples
async function testSimple() {
  console.log('🚀 Teste simples da API de documentos...\n');

  const token = generateTestToken();
  console.log('✅ Token gerado com sucesso');

  try {
    // Teste 1: Health check
    console.log('\n1️⃣ Testando health check...');
    const healthResponse = await makeRequest(`${BASE_URL}/health`);
    console.log(`Status: ${healthResponse.status}`);
    console.log('Resposta:', healthResponse.data);

    // Teste 2: Categorias
    console.log('\n2️⃣ Testando categorias...');
    const categoriesResponse = await makeRequest(`${BASE_URL}/api/documents/categories/list`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`Status: ${categoriesResponse.status}`);
    if (categoriesResponse.data.success) {
      console.log(`✅ ${categoriesResponse.data.data.length} categorias encontradas`);
    } else {
      console.log('❌ Erro:', categoriesResponse.data.message);
    }

    // Teste 3: Documentos
    console.log('\n3️⃣ Testando documentos...');
    const documentsResponse = await makeRequest(`${BASE_URL}/api/documents`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`Status: ${documentsResponse.status}`);
    if (documentsResponse.data.success) {
      console.log(`✅ ${documentsResponse.data.data.length} documentos encontrados`);
    } else {
      console.log('❌ Erro:', documentsResponse.data.message);
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

// Executar teste
testSimple();
