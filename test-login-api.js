/**
 * @fileoverview Teste da API de Login DOM v2
 * @description Testa se a rota de login está funcionando
 * @author DOM Team v2
 */

const testLoginAPI = async () => {
  try {
    console.log('🧪 Testando API de Login...');
    
    // Teste 1: Health Check
    console.log('\n1️⃣ Testando Health Check...');
    const healthResponse = await fetch('http://localhost:3001/health');
    console.log('Status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health Check OK:', healthData);
    } else {
      console.log('❌ Health Check falhou');
      return;
    }
    
    // Teste 2: Login com CPF válido
    console.log('\n2️⃣ Testando Login...');
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf: '12345678901',
        password: '123456'
      }),
    });

    console.log('Status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Resposta:', loginData);

    if (loginResponse.ok) {
      console.log('✅ Login funcionando!');
      console.log('👤 Usuário:', loginData.user);
    } else {
      console.log('❌ Login falhou:', loginData.error);
    }
    
  } catch (error) {
    console.log('❌ Erro de conexão:', error.message);
  }
};

// Executar teste
testLoginAPI(); 