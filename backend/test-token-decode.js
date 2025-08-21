const jwt = require('jsonwebtoken');

// Token que estamos usando
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci1pZCIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInByb2ZpbGUiOiJBRE1JTiIsImlhdCI6MTc1NTcwNjIyMiwiZXhwIjoxNzU1NzkyNjIyfQ.0DYK9XLe5yOaWn1nd-loRaFiNw7xW_idIDUCW2aIoWo";

// Secret key
const secret = 'dom-v2-secret-key';

try {
  // Decodificar o token
  const decoded = jwt.verify(token, secret);
  
  console.log('✅ Token decodificado com sucesso:');
  console.log('================================');
  console.log('ID:', decoded.id);
  console.log('Email:', decoded.email);
  console.log('Profile:', decoded.profile);
  console.log('IAT (issued at):', new Date(decoded.iat * 1000));
  console.log('EXP (expires at):', new Date(decoded.exp * 1000));
  console.log('================================');
  
  // Verificar se não expirou
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp < now) {
    console.log('❌ Token expirado!');
  } else {
    console.log('✅ Token ainda válido');
  }
  
} catch (error) {
  console.log('❌ Erro ao decodificar token:', error.message);
}
