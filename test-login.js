/**
 * @fileoverview Script de teste para endpoint de login
 * @directory dom-v2
 * @description Testa o endpoint de login do DOM v2
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf: '59876913700',
        password: '123456'
      }),
    });

    const data = await response.json();

    console.log('Status:', response.status);
    console.log('Response:', data);

    if (response.ok) {
      console.log('✅ Login funcionando!');
    } else {
      console.log('❌ Erro no login');
    }
  } catch (error) {
    console.log('❌ Erro de conexão:', error.message);
  }
};

testLogin();
