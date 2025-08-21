const jwt = require('jsonwebtoken');

// Dados do usuário de teste
const testUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  profile: 'ADMIN'
};

// Secret key CORRETO baseado nos logs do servidor
const secret = 'dom_v2_development_secret_key_2024';

// Gerar token
const token = jwt.sign(testUser, secret, { expiresIn: '24h' });

console.log('🔑 Token JWT gerado com secret correto:');
console.log('================================');
console.log(token);
console.log('================================');
console.log('\n📋 Para usar no PowerShell:');
console.log(`$headers = @{"Authorization" = "Bearer ${token}"}`);
console.log('Invoke-RestMethod -Uri "http://localhost:3001/api/documents/categories/list" -Method Get -Headers $headers');
