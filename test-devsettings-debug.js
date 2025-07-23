/**
 * @fileoverview Teste específico para investigar problema do DevSettings
 * @description Analisa o bundle para entender o erro
 * @created 2024-12-19
 * @author DOM Team v2
 */

const http = require('http');

console.log('🔍 INVESTIGAÇÃO ESPECÍFICA - ERRO DEVSETTINGS');
console.log('==============================================');

// Teste 1: Verificar se o bundle contém referências problemáticas
console.log('\n1️⃣ Analisando bundle para referências problemáticas...');
http.get('http://localhost:8081/index.bundle?platform=web&dev=true', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const hasTurboModuleRegistry = data.includes('TurboModuleRegistry');
    const hasGetEnforcing = data.includes('getEnforcing');
    const hasDevSettings = data.includes('DevSettings');
    const hasNativeModules = data.includes('NativeModules');
    
    console.log('✅ Bundle analisado - Tamanho:', data.length, 'bytes');
    console.log('✅ Contém TurboModuleRegistry:', hasTurboModuleRegistry);
    console.log('✅ Contém getEnforcing:', hasGetEnforcing);
    console.log('✅ Contém DevSettings:', hasDevSettings);
    console.log('✅ Contém NativeModules:', hasNativeModules);
    
    // Teste 2: Verificar se o problema está na configuração do Metro
    console.log('\n2️⃣ Verificando configuração do Metro...');
    const fs = require('fs');
    const metroConfig = fs.readFileSync('frontend/metro.config.js', 'utf8');
    
    const hasDevSettingsMock = metroConfig.includes('DevSettings');
    const hasNativeModulesMock = metroConfig.includes('NativeModules');
    
    console.log('✅ Metro config tem mock DevSettings:', hasDevSettingsMock);
    console.log('✅ Metro config tem mock NativeModules:', hasNativeModulesMock);
    
    // Teste 3: Verificar se o problema está no contexto de execução
    console.log('\n3️⃣ Analisando contexto de execução...');
    
    if (hasTurboModuleRegistry && hasGetEnforcing && hasDevSettings) {
      console.log('⚠️ PROBLEMA IDENTIFICADO:');
      console.log('   - Bundle contém TurboModuleRegistry.getEnforcing');
      console.log('   - Bundle contém referência a DevSettings');
      console.log('   - Metro config tem mocks, mas não estão sendo aplicados');
      
      console.log('\n🎯 CAUSA RAIZ PROVÁVEL:');
      console.log('   - O bundle está sendo executado em contexto isolado (VM11)');
      console.log('   - Os polyfills não estão acessíveis no contexto do bundle');
      console.log('   - TurboModuleRegistry está sendo chamado antes dos polyfills');
      
      console.log('\n🔧 SOLUÇÃO NECESSÁRIA:');
      console.log('   1. Interceptar TurboModuleRegistry antes da execução do bundle');
      console.log('   2. Garantir que polyfills sejam aplicados globalmente');
      console.log('   3. Mockar TurboModuleRegistry no nível do Metro');
    } else {
      console.log('✅ Bundle parece estar limpo de referências problemáticas');
    }
    
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Implementar interceptação global do TurboModuleRegistry');
    console.log('2. Garantir que polyfills sejam aplicados antes do bundle');
    console.log('3. Testar se o erro é resolvido');
  });
}).on('error', (err) => {
  console.log('❌ Erro ao analisar bundle:', err.message);
}); 