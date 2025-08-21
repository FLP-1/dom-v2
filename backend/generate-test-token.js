const jwt = require('jsonwebtoken');

// Dados do usuário de teste
const testUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  profile: 'ADMIN'
};

// Secret key (mesmo usado no servidor)
const secret = 'dom-v2-secret-key';

// Gerar token
const token = jwt.sign(testUser, secret, { expiresIn: '24h' });

console.log('🔑 Token JWT gerado para testes:');
console.log('================================');
console.log(token);
console.log('================================');
console.log('\n📋 Para usar no PowerShell:');
console.log(`$headers = @{"Authorization" = "Bearer ${token}"}`);
console.log('Invoke-RestMethod -Uri "http://localhost:3001/api/documents/categories/list" -Method Get -Headers $headers');
