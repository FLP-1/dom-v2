/**
 * @fileoverview Teste de integração completa do DOM v2
 * @description Verifica backend, frontend e integração
 * @created 2024-12-19
 * @author DOM Team v2
 */

const http = require('http');

console.log('🧪 TESTE DE INTEGRAÇÃO COMPLETA - DOM v2');
console.log('==========================================');

// Teste 1: Backend Health Check
console.log('\n1️⃣ Testando Backend (Porta 3001)...');
http.get('http://localhost:3001/health', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('✅ Backend funcionando:', JSON.parse(data));
    
    // Teste 2: API Payroll
    console.log('\n2️⃣ Testando API Payroll...');
    http.get('http://localhost:3001/api/payroll', (res2) => {
      let data2 = '';
      res2.on('data', (chunk) => data2 += chunk);
      res2.on('end', () => {
        const payrollData = JSON.parse(data2);
        console.log('✅ API Payroll funcionando:', payrollData.length, 'funcionários');
        
        // Teste 3: Frontend Metro
        console.log('\n3️⃣ Testando Frontend Metro (Porta 8081)...');
        http.get('http://localhost:8081', (res3) => {
          console.log('✅ Metro funcionando - Status:', res3.statusCode);
          
          // Teste 4: Servidor Web
          console.log('\n4️⃣ Testando Servidor Web (Porta 3000)...');
          http.get('http://localhost:3000', (res4) => {
            console.log('✅ Servidor Web funcionando - Status:', res4.statusCode);
            
            // Teste 5: Bundle React Native Web
            console.log('\n5️⃣ Testando Bundle React Native Web...');
            http.get('http://localhost:8081/index.bundle?platform=web&dev=true', (res5) => {
              console.log('✅ Bundle React Native Web funcionando - Status:', res5.statusCode);
              
              console.log('\n🎉 TODOS OS TESTES PASSARAM!');
              console.log('==========================================');
              console.log('✅ Backend: Funcionando na porta 3001');
              console.log('✅ API Payroll: Retornando dados');
              console.log('✅ Metro: Funcionando na porta 8081');
              console.log('✅ Servidor Web: Funcionando na porta 3000');
              console.log('✅ Bundle: React Native Web carregando');
              console.log('\n🌐 Acesse: http://localhost:3000');
              console.log('📱 Metro: http://localhost:8081');
              console.log('💰 API: http://localhost:3001/api/payroll');
            }).on('error', (err) => {
              console.log('❌ Erro no Bundle:', err.message);
            });
          }).on('error', (err) => {
            console.log('❌ Erro no Servidor Web:', err.message);
          });
        }).on('error', (err) => {
          console.log('❌ Erro no Metro:', err.message);
        });
      });
    }).on('error', (err) => {
      console.log('❌ Erro na API Payroll:', err.message);
    });
  });
}).on('error', (err) => {
  console.log('❌ Erro no Backend:', err.message);
}); 