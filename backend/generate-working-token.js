const jwt = require('jsonwebtoken');

// Dados do usuário de teste
const testUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  profile: 'ADMIN'
};

// Secret key CORRETO (mesmo usado no middleware atualizado)
const secret = 'dom_v2_development_secret_key_2024';

// Gerar token
const token = jwt.sign(testUser, secret, { expiresIn: '24h' });

console.log('🔑 Token JWT funcionando:');
console.log('================================');
console.log(token);
console.log('================================');
