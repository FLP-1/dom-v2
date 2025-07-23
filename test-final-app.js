/**
 * @fileoverview Teste final para verificar carregamento do App.tsx
 * @description Verifica se o React Native Web está funcionando após correções
 * @created 2024-12-19
 * @author DOM Team v2
 */

const http = require('http');

console.log('🎯 TESTE FINAL - APP.TSX CARREGANDO');
console.log('====================================');

// Teste 1: Verificar se o HTML foi atualizado
console.log('\n1️⃣ Verificando HTML atualizado...');
http.get('http://localhost:3000', (res) => {
  let htmlData = '';
  res.on('data', (chunk) => htmlData += chunk);
  res.on('end', () => {
    const hasManualInit = htmlData.includes('inicialização manual');
    const hasAppRegistry = htmlData.includes('AppRegistry');
    console.log('✅ HTML atualizado - Tamanho:', htmlData.length, 'bytes');
    console.log('✅ Tem script de inicialização manual:', hasManualInit);
    console.log('✅ Tem referência ao AppRegistry:', hasAppRegistry);
    
    // Teste 2: Verificar bundle
    console.log('\n2️⃣ Verificando bundle...');
    http.get('http://localhost:8081/index.bundle?platform=web&dev=true', (res2) => {
      let bundleData = '';
      res2.on('data', (chunk) => bundleData += chunk);
      res2.on('end', () => {
        const hasAppComponent = bundleData.includes('App.tsx') || bundleData.includes('DOM v2 FUNCIONANDO');
        console.log('✅ Bundle carregado - Tamanho:', bundleData.length, 'bytes');
        console.log('✅ Contém App.tsx:', hasAppComponent);
        
        console.log('\n🎉 RESULTADO FINAL:');
        if (hasManualInit && hasAppRegistry && hasAppComponent) {
          console.log('✅ Configuração completa e correta!');
          console.log('🌐 Acesse: http://localhost:3000');
          console.log('📱 Abra o console do navegador (F12) para ver os logs');
          console.log('🎯 O App.tsx deve carregar automaticamente');
        } else {
          console.log('❌ Ainda há problemas na configuração');
        }
        
        console.log('\n📋 INSTRUÇÕES PARA TESTE:');
        console.log('1. Abra http://localhost:3000 no navegador');
        console.log('2. Pressione F12 para abrir o console');
        console.log('3. Verifique se aparecem os logs do React Native Web');
        console.log('4. A aplicação deve mostrar "🎉 DOM v2 FUNCIONANDO!"');
      });
    }).on('error', (err) => {
      console.log('❌ Erro no bundle:', err.message);
    });
  });
}).on('error', (err) => {
  console.log('❌ Erro no servidor web:', err.message);
}); 