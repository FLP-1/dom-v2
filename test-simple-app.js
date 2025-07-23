/**
 * @fileoverview Teste simples para verificar carregamento do App.tsx
 * @description Verifica se o React Native Web está funcionando
 * @created 2024-12-19
 * @author DOM Team v2
 */

const http = require('http');

console.log('🧪 TESTE SIMPLES - CARREGAMENTO DO APP.TSX');
console.log('============================================');

// Testar se o bundle contém o App.tsx
console.log('\n1️⃣ Verificando bundle do React Native Web...');
http.get('http://localhost:8081/index.bundle?platform=web&dev=true', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Verificar se o bundle contém referências ao App
    const hasAppReference = data.includes('App') || data.includes('DOM v2');
    console.log('✅ Bundle carregado - Tamanho:', data.length, 'bytes');
    console.log('✅ Contém referência ao App:', hasAppReference);
    
    // Testar se o servidor web está servindo o HTML correto
    console.log('\n2️⃣ Verificando servidor web...');
    http.get('http://localhost:3000', (res2) => {
      let htmlData = '';
      res2.on('data', (chunk) => htmlData += chunk);
      res2.on('end', () => {
        const hasRootElement = htmlData.includes('id="root"');
        const hasBundleScript = htmlData.includes('index.bundle');
        console.log('✅ HTML carregado - Tamanho:', htmlData.length, 'bytes');
        console.log('✅ Tem elemento root:', hasRootElement);
        console.log('✅ Tem script do bundle:', hasBundleScript);
        
        console.log('\n🎯 DIAGNÓSTICO:');
        if (hasAppReference && hasRootElement && hasBundleScript) {
          console.log('✅ Configuração parece correta');
          console.log('🔍 Verifique o console do navegador para erros JavaScript');
          console.log('🌐 Acesse: http://localhost:3000');
        } else {
          console.log('❌ Problema na configuração detectado');
        }
      });
    }).on('error', (err) => {
      console.log('❌ Erro no servidor web:', err.message);
    });
  });
}).on('error', (err) => {
  console.log('❌ Erro no bundle:', err.message);
}); 