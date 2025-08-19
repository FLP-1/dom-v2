const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testLogin() {
  try {
    console.log('🧪 Testando endpoint de login...');
    
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf: '59876913700',
        password: '123456'
      })
    });

    console.log('Status:', response.status);

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('✅ Login bem-sucedido!');
      console.log('Token:', data.token ? 'Presente' : 'Ausente');
      console.log('User:', data.user ? 'Presente' : 'Ausente');
    } else {
      console.log('❌ Login falhou');
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

testLogin();
