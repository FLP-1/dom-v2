#!/usr/bin/env node

/**
 * @fileoverview Script para testar senhas comuns do PostgreSQL
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

const { exec } = require('child_process');

const senhasComuns = [
  'postgres',
  'admin',
  '123456',
  'password',
  'root',
  'postgresql',
  'pgsql',
  'postgres123',
  'admin123',
  '123456789',
  'qwerty',
  'letmein',
  'welcome',
  'monkey',
  'dragon',
  'master',
  'user',
  'login',
  'abc123',
  '111111'
];

/**
 * Testa uma senha específica
 * @param {string} senha - Senha a ser testada
 * @returns {Promise<boolean>} - True se a senha funcionar
 */
function testarSenha(senha) {
  return new Promise((resolve) => {
    const command = `psql -U postgres -d db_dom -c "SELECT 1;"`;
    
    exec(command, { 
      env: { ...process.env, PGPASSWORD: senha },
      timeout: 5000
    }, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ Senha "${senha}" falhou`);
        resolve(false);
      } else {
        console.log(`✅ Senha "${senha}" funcionou!`);
        resolve(true);
      }
    });
  });
}

/**
 * Testa todas as senhas comuns
 */
async function testarTodasSenhas() {
  console.log('🔐 TESTANDO SENHAS COMUNS DO POSTGRESQL');
  console.log('=======================================');
  console.log(`📅 Data do teste: ${new Date().toLocaleString('pt-BR')}\n`);
  
  for (const senha of senhasComuns) {
    const funcionou = await testarSenha(senha);
    if (funcionou) {
      console.log(`\n🎉 SENHA ENCONTRADA: "${senha}"`);
      console.log('Use esta senha no arquivo .env');
      return senha;
    }
  }
  
  console.log('\n❌ Nenhuma senha comum funcionou.');
  console.log('Você precisará definir a senha manualmente.');
  return null;
}

// Execução principal
if (require.main === module) {
  testarTodasSenhas();
}

module.exports = {
  testarTodasSenhas
};
