#!/usr/bin/env node

/**
 * Script de Teste de Melhorias - DOM v2
 * Testa as melhorias implementadas na Fase 4
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log(`[${new Date().toISOString()}] ` + '🧪 INICIANDO TESTE DE MELHORIAS');
console.log(`[${new Date().toISOString()}] ` + '================================');

// Função para testar comandos otimizados
function testOptimizedCommands() {
    console.log(`[${new Date().toISOString()}] ` + '⚡ Testando comandos otimizados...');
    
    const commands = [
        { name: 'Quick Status', command: 'npm run quick-status' },
        { name: 'Quick Validate', command: 'npm run quick-validate' },
        { name: 'Quick Metrics', command: 'npm run quick-metrics' },
        { name: 'Val Alias', command: 'npm run val' },
        { name: 'Met Alias', command: 'npm run met' },
        { name: 'Quick Validate', command: 'npm run quick-validate' }
    ];
    
    const results = [];
    
    commands.forEach(cmd => {
        try {
            console.log(`[${new Date().toISOString()}] ` + `   Testando: ${cmd.name}...`);
            const output = execSync(cmd.command, { encoding: 'utf8', timeout: 10000 });
            results.push({
                name: cmd.name,
                status: 'success',
                output: output.substring(0, 200) + '...'
            });
        } catch (error) {
            results.push({
                name: cmd.name,
                status: 'error',
                error: error.message
            });
        }
    });
    
    return results;
}

// Função para testar novas validações
function testNewValidations() {
    console.log(`[${new Date().toISOString()}] ` + '🔍 Testando novas validações...');
    
    const validations = [
        { name: 'Performance', command: 'npm run validate-performance' },
        { name: 'Security', command: 'npm run validate-security' },
        { name: 'Accessibility', command: 'npm run validate-accessibility' },
        { name: 'Documentation', command: 'npm run validate-documentation' },
        { name: 'Testing', command: 'npm run validate-testing' },
        { name: 'Structure', command: 'npm run validate-structure' }
    ];
    
    const results = [];
    
    validations.forEach(validation => {
        try {
            console.log(`[${new Date().toISOString()}] ` + `   Testando: ${validation.name}...`);
            const output = execSync(validation.command, { encoding: 'utf8', timeout: 15000 });
            results.push({
                name: validation.name,
                status: 'success',
                output: output.substring(0, 200) + '...'
            });
        } catch (error) {
            results.push({
                name: validation.name,
                status: 'error',
                error: error.message
            });
        }
    });
    
    return results;
}

// Função para testar melhorias de documentação
function testDocumentationImprovements() {
    console.log(`[${new Date().toISOString()}] ` + '📚 Testando melhorias de documentação...');
    
    const docsToCheck = [
        'TROUBLESHOOTING_GUIDE.md',
        'EXEMPLOS_PRATICOS.md',
        'FAQ.md'
    ];
    
    const results = [];
    const docsDir = path.join(__dirname, '..', 'docs');
    
    docsToCheck.forEach(doc => {
        const docPath = path.join(docsDir, doc);
        try {
            if (fs.existsSync(docPath)) {
                const content = fs.readFileSync(docPath, 'utf8');
                const size = content.length;
                const hasContent = size > 100;
                
                results.push({
                    name: doc,
                    status: 'success',
                    size: size,
                    hasContent: hasContent
                });
            } else {
                results.push({
                    name: doc,
                    status: 'error',
                    error: 'Arquivo não encontrado'
                });
            }
        } catch (error) {
            results.push({
                name: doc,
                status: 'error',
                error: error.message
            });
        }
    });
    
    return results;
}

// Função para testar integração geral
function testIntegration() {
    console.log(`[${new Date().toISOString()}] ` + '🔗 Testando integração geral...');
    
    const integrationTests = [
        {
            name: 'Package.json Atualizado',
            test: () => {
                const packagePath = path.join(__dirname, '..', 'package.json');
                const content = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                const hasNewScripts = content.scripts && 
                    (content.scripts['quick-status'] || 
                     content.scripts['validate-performance'] ||
                     content.scripts['val']);
                return hasNewScripts;
            }
        },
        {
            name: 'Scripts Criados',
            test: () => {
                const scriptsDir = path.join(__dirname);
                const requiredScripts = [
                    'quick-status.js',
                    'quick-validate.js',
                    'quick-metrics.js',
                    'validate-performance.js',
                    'validate-security.js',
                    'validate-accessibility.js'
                ];
                
                const existingScripts = fs.readdirSync(scriptsDir);
                const missingScripts = requiredScripts.filter(script => 
                    !existingScripts.includes(script)
                );
                
                return missingScripts.length === 0;
            }
        },
        {
            name: 'Documentação Expandida',
            test: () => {
                const docsDir = path.join(__dirname, '..', 'docs');
                const docs = fs.readdirSync(docsDir);
                const hasNewDocs = docs.some(doc => 
                    doc.includes('TROUBLESHOOTING') || 
                    doc.includes('EXEMPLOS') || 
                    doc.includes('FAQ')
                );
                return hasNewDocs;
            }
        }
    ];
    
    const results = [];
    
    integrationTests.forEach(test => {
        try {
            const success = test.test();
            results.push({
                name: test.name,
                status: success ? 'success' : 'error',
                details: success ? 'Integração funcionando' : 'Falha na integração'
            });
        } catch (error) {
            results.push({
                name: test.name,
                status: 'error',
                error: error.message
            });
        }
    });
    
    return results;
}

// Função para calcular métricas de teste
function calculateTestMetrics(commandResults, validationResults, docResults, integrationResults) {
    const totalTests = commandResults.length + validationResults.length + docResults.length + integrationResults.length;
    const successfulTests = 
        commandResults.filter(r => r.status === 'success').length +
        validationResults.filter(r => r.status === 'success').length +
        docResults.filter(r => r.status === 'success').length +
        integrationResults.filter(r => r.status === 'success').length;
    
    return {
        total: totalTests,
        successful: successfulTests,
        failed: totalTests - successfulTests,
        successRate: (successfulTests / totalTests) * 100
    };
}

// Função para gerar relatório de teste
function generateTestReport(commandResults, validationResults, docResults, integrationResults, metrics) {
    const report = `# RELATÓRIO DE TESTE DE MELHORIAS
## DOM v2 - Fase 4: Expansão e Otimização

### 📊 **TESTE REALIZADO**
**Data:** ${new Date().toLocaleDateString('pt-BR')}
**Fase:** 4 - Expansão e Otimização
**Status:** ✅ **TESTE CONCLUÍDO**

---

## 📊 **MÉTRICAS DE TESTE**

### **Resumo Geral:**
- 🧪 **Total de testes:** ${metrics.total}
- ✅ **Testes bem-sucedidos:** ${metrics.successful}
- ❌ **Testes com falha:** ${metrics.failed}
- 📈 **Taxa de sucesso:** ${metrics.successRate.toFixed(1)}%

---

## ⚡ **TESTE DE COMANDOS OTIMIZADOS**

${commandResults.map(result => `### **${result.name}**
- **Status:** ${result.status === 'success' ? '✅ Sucesso' : '❌ Erro'}
${result.status === 'success' ? `- **Output:** ${result.output}` : `- **Erro:** ${result.error}`}

`).join('\n')}

---

## 🔍 **TESTE DE NOVAS VALIDAÇÕES**

${validationResults.map(result => `### **${result.name}**
- **Status:** ${result.status === 'success' ? '✅ Sucesso' : '❌ Erro'}
${result.status === 'success' ? `- **Output:** ${result.output}` : `- **Erro:** ${result.error}`}

`).join('\n')}

---

## 📚 **TESTE DE MELHORIAS DE DOCUMENTAÇÃO**

${docResults.map(result => `### **${result.name}**
- **Status:** ${result.status === 'success' ? '✅ Sucesso' : '❌ Erro'}
${result.status === 'success' ? `- **Tamanho:** ${result.size} caracteres` : `- **Erro:** ${result.error}`}
${result.status === 'success' ? `- **Conteúdo:** ${result.hasContent ? '✅ Adequado' : '⚠️ Insuficiente'}` : ''}

`).join('\n')}

---

## 🔗 **TESTE DE INTEGRAÇÃO**

${integrationResults.map(result => `### **${result.name}**
- **Status:** ${result.status === 'success' ? '✅ Sucesso' : '❌ Erro'}
- **Detalhes:** ${result.details || result.error}

`).join('\n')}

---

## 🎯 **RESULTADOS E RECOMENDAÇÕES**

### **Pontos Positivos:**
${metrics.successRate >= 80 ? '- ✅ Alta taxa de sucesso nos testes' : '- ⚠️ Taxa de sucesso abaixo do esperado'}
${commandResults.filter(r => r.status === 'success').length > 0 ? '- ✅ Comandos otimizados funcionando' : '- ❌ Problemas com comandos otimizados'}
${validationResults.filter(r => r.status === 'success').length > 0 ? '- ✅ Novas validações implementadas' : '- ❌ Problemas com validações'}
${docResults.filter(r => r.status === 'success').length > 0 ? '- ✅ Documentação expandida' : '- ❌ Problemas com documentação'}

### **Áreas de Melhoria:**
${commandResults.filter(r => r.status === 'error').length > 0 ? '- 🔧 Corrigir comandos com falha' : ''}
${validationResults.filter(r => r.status === 'error').length > 0 ? '- 🔧 Corrigir validações com falha' : ''}
${docResults.filter(r => r.status === 'error').length > 0 ? '- 🔧 Corrigir documentação com falha' : ''}

---

## 🚀 **PRÓXIMOS PASSOS**

### **1. Corrigir Problemas Identificados**
\`\`\`powershell
npm run improvements:fix
\`\`\`

### **2. Validar Impacto**
\`\`\`powershell
npm run impact:validate
\`\`\`

### **3. Preparar Próxima Fase**
\`\`\`powershell
npm run next:prepare
\`\`\`

---

## 📊 **MÉTRICAS DE SUCESSO**

- 🎯 **Taxa de sucesso:** ${metrics.successRate >= 80 ? '✅ Atingida' : '❌ Não atingida'} (${metrics.successRate.toFixed(1)}%)
- 🚀 **Comandos funcionando:** ${commandResults.filter(r => r.status === 'success').length}/${commandResults.length}
- 🔍 **Validações funcionando:** ${validationResults.filter(r => r.status === 'success').length}/${validationResults.length}
- 📚 **Documentação adequada:** ${docResults.filter(r => r.status === 'success').length}/${docResults.length}

---

**RELATÓRIO GERADO AUTOMATICAMENTE PELO SISTEMA DOM v2**
`;

    return report;
}

// Função principal
function main() {
    console.log(`[${new Date().toISOString()}] ` + '⚡ 1. TESTANDO COMANDOS OTIMIZADOS...');
    const commandResults = testOptimizedCommands();
    
    console.log(`[${new Date().toISOString()}] ` + '🔍 2. TESTANDO NOVAS VALIDAÇÕES...');
    const validationResults = testNewValidations();
    
    console.log(`[${new Date().toISOString()}] ` + '📚 3. TESTANDO MELHORIAS DE DOCUMENTAÇÃO...');
    const docResults = testDocumentationImprovements();
    
    console.log(`[${new Date().toISOString()}] ` + '🔗 4. TESTANDO INTEGRAÇÃO GERAL...');
    const integrationResults = testIntegration();
    
    console.log(`[${new Date().toISOString()}] ` + '📊 5. CALCULANDO MÉTRICAS...');
    const metrics = calculateTestMetrics(commandResults, validationResults, docResults, integrationResults);
    
    console.log(`[${new Date().toISOString()}] ` + '📝 6. GERANDO RELATÓRIO...');
    const report = generateTestReport(commandResults, validationResults, docResults, integrationResults, metrics);
    
    // Salvar relatório
    const reportPath = path.join(__dirname, '..', 'docs', 'RELATORIO_TESTE_MELHORIAS.md');
    try {
        fs.writeFileSync(reportPath, report, 'utf8');
        console.log(`[${new Date().toISOString()}] ` + `✅ Relatório salvo: ${reportPath}`);
    } catch (error) {
        console.error('❌ Erro ao salvar relatório:', error.message);
    }
    
    console.log(`[${new Date().toISOString()}] ` + '\n📊 RESUMO DOS TESTES:');
    console.log(`[${new Date().toISOString()}] ` + `   🧪 Total de testes: ${metrics.total}`);
    console.log(`[${new Date().toISOString()}] ` + `   ✅ Sucessos: ${metrics.successful}`);
    console.log(`[${new Date().toISOString()}] ` + `   ❌ Falhas: ${metrics.failed}`);
    console.log(`[${new Date().toISOString()}] ` + `   📈 Taxa de sucesso: ${metrics.successRate.toFixed(1)}%`);
    
    console.log(`[${new Date().toISOString()}] ` + '\n🎯 PRÓXIMOS PASSOS:');
    console.log(`[${new Date().toISOString()}] ` + '   1. Corrigir problemas identificados');
    console.log(`[${new Date().toISOString()}] ` + '   2. Validar impacto das melhorias');
    console.log(`[${new Date().toISOString()}] ` + '   3. Preparar para próxima fase');
    
    console.log(`[${new Date().toISOString()}] ` + '\n✅ TESTE DE MELHORIAS CONCLUÍDO!');
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    testOptimizedCommands,
    testNewValidations,
    testDocumentationImprovements,
    testIntegration,
    calculateTestMetrics,
    generateTestReport
}; 