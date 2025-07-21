/**
 * @fileoverview Script de teste para endpoint de dashboard
 * @directory dom-v2
 * @description Testa o endpoint de dashboard do DOM v2
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

const testDashboard = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/dashboard/stats');
    const data = await response.json();

    console.log('Status:', response.status);
    console.log('Dashboard Stats:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('✅ Dashboard funcionando!');
    } else {
      console.log('❌ Erro no dashboard');
    }
  } catch (error) {
    console.log('❌ Erro de conexão:', error.message);
  }
};

testDashboard();
