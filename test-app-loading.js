/**
 * @fileoverview Teste específico para verificar carregamento do App.tsx
 * @description Verifica se o React Native Web está renderizando corretamente
 * @created 2024-12-19
 * @author DOM Team v2
 */

const puppeteer = require('puppeteer');

async function testAppLoading() {
  console.log('🧪 TESTE DE CARREGAMENTO DO APP.TSX');
  console.log('=====================================');
  
  try {
    // Iniciar navegador
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Configurar console para capturar erros
    page.on('console', msg => {
      console.log('Console:', msg.text());
    });
    
    page.on('pageerror', error => {
      console.log('Erro na página:', error.message);
    });
    
    // Navegar para a aplicação
    console.log('🌐 Navegando para http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Aguardar um pouco para o React Native Web carregar
    await page.waitForTimeout(5000);
    
    // Verificar se o conteúdo do App.tsx está presente
    const content = await page.evaluate(() => {
      const rootElement = document.getElementById('root');
      const hasReactContent = rootElement && rootElement.children.length > 0;
      const textContent = rootElement ? rootElement.textContent : '';
      
      return {
        hasReactContent,
        textContent,
        rootHTML: rootElement ? rootElement.innerHTML : ''
      };
    });
    
    console.log('📊 Resultado da análise:');
    console.log('- Tem conteúdo React:', content.hasReactContent);
    console.log('- Texto encontrado:', content.textContent);
    console.log('- HTML do root:', content.rootHTML.substring(0, 200) + '...');
    
    if (content.hasReactContent) {
      console.log('✅ App.tsx carregado com sucesso!');
    } else {
      console.log('❌ App.tsx não carregou corretamente');
    }
    
    await browser.close();
    
  } catch (error) {
    console.log('❌ Erro no teste:', error.message);
  }
}

// Executar teste
testAppLoading(); 