/**
 * @fileoverview Teste final para debug completo
 * @description Verifica todos os componentes do sistema
 * @created 2024-12-19
 * @author DOM Team v2
 */

const http = require('http');

console.log('🔍 TESTE FINAL DE DEBUG - DOM v2');
console.log('==================================');

// Teste 1: Backend
console.log('\n1️⃣ Testando Backend...');
http.get('http://localhost:3001/health', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('✅ Backend funcionando:', JSON.parse(data));
    
    // Teste 2: Metro
    console.log('\n2️⃣ Testando Metro...');
    http.get('http://localhost:8081', (res2) => {
      console.log('✅ Metro funcionando - Status:', res2.statusCode);
      
      // Teste 3: Bundle
      console.log('\n3️⃣ Testando Bundle...');
      http.get('http://localhost:8081/index.bundle?platform=web&dev=true', (res3) => {
        console.log('✅ Bundle funcionando - Status:', res3.statusCode);
        
        // Teste 4: Servidor Web
        console.log('\n4️⃣ Testando Servidor Web...');
        http.get('http://localhost:3000', (res4) => {
          let htmlData = '';
          res4.on('data', (chunk) => htmlData += chunk);
          res4.on('end', () => {
            const hasPolyfills = htmlData.includes('Polyfills carregados');
            const hasDevSettings = htmlData.includes('DevSettings');
            const hasBundle = htmlData.includes('index.bundle');
            
            console.log('✅ Servidor Web funcionando - Status:', res4.statusCode);
            console.log('✅ HTML tem polyfills:', hasPolyfills);
            console.log('✅ HTML tem DevSettings:', hasDevSettings);
            console.log('✅ HTML tem bundle:', hasBundle);
            
            console.log('\n🎯 DIAGNÓSTICO FINAL:');
            if (hasPolyfills && hasDevSettings && hasBundle) {
              console.log('✅ Configuração parece correta!');
              console.log('🌐 Acesse: http://localhost:3000');
              console.log('📱 Abra o console (F12) e verifique:');
              console.log('   - "✅ Polyfills carregados com sucesso"');
              console.log('   - "🛡️ Interceptando erro DevSettings" (se necessário)');
              console.log('   - "✅ Inicialização bem-sucedida"');
            } else {
              console.log('❌ Problema na configuração detectado');
            }
          });
        }).on('error', (err) => {
          console.log('❌ Erro no servidor web:', err.message);
        });
      }).on('error', (err) => {
        console.log('❌ Erro no bundle:', err.message);
      });
    }).on('error', (err) => {
      console.log('❌ Erro no Metro:', err.message);
    });
  });
}).on('error', (err) => {
  console.log('❌ Erro no Backend:', err.message);
}); 