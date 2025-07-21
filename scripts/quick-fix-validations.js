#!/usr/bin/env node

/**
 * CORREÇÃO RÁPIDA DE VALIDAÇÕES
 * Corrige todos os scripts de validação com erro
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔧 CORREÇÃO RÁPIDA DE VALIDAÇÕES...\n');

// Template para completar scripts
const template = `
// Executar validação
const result = validateValidação();

console.log(`[${new Date().toISOString()}] ` + '\\n📊 RESULTADOS:');
console.log(`[${new Date().toISOString()}] ` + \`   Status: \${result.status}\`);
console.log(`[${new Date().toISOString()}] ` + \`   Score: \${result.score}/100\`);

if (result.issues.length > 0) {
    console.log(`[${new Date().toISOString()}] ` + '   Issues encontradas:');
    result.issues.forEach(issue => console.log(`[${new Date().toISOString()}] ` + \`     - \${issue}\`));
}

if (result.recommendations.length > 0) {
    console.log(`[${new Date().toISOString()}] ` + '   Recomendações:');
    result.recommendations.forEach(rec => console.log(`[${new Date().toISOString()}] ` + \`     - \${rec}\`));
}

console.log(`[${new Date().toISOString()}] ` + '\\n✅ VALIDAÇÃO CONCLUÍDA!');

module.exports = {
    validateValidação,
    calculateScore
};
`;

// Scripts para corrigir
const scripts = [
    { name: 'validate-accessibility.js', func: 'validateValidaçãodeAcessibilidade' },
    { name: 'validate-documentation.js', func: 'validateValidaçãodeDocumentação' },
    { name: 'validate-testing.js', func: 'validateValidaçãodeTestes' },
    { name: 'validate-structure.js', func: 'validateValidaçãodeEstrutura' }
];

let fixedCount = 0;

scripts.forEach(script => {
    const scriptPath = path.join(__dirname, script.name);
    
    if (fs.existsSync(scriptPath)) {
        try {
            let content = fs.readFileSync(scriptPath, 'utf8');
            
            // Verificar se já tem execução
            if (!content.includes('// Executar validação')) {
                // Adicionar template com função correta
                const customTemplate = template.replace(/validateValidação/g, script.func);
                content += customTemplate;
                
                // Salvar arquivo corrigido
                fs.writeFileSync(scriptPath, content, 'utf8');
                console.log(`[${new Date().toISOString()}] ` + `✅ ${script.name} corrigido`);
                fixedCount++;
            } else {
                console.log(`[${new Date().toISOString()}] ` + `⚠️  ${script.name} já corrigido`);
            }
        } catch (error) {
            console.log(`[${new Date().toISOString()}] ` + `❌ Erro ao corrigir ${script.name}: ${error.message}`);
        }
    } else {
        console.log(`[${new Date().toISOString()}] ` + `⚠️  ${script.name} não encontrado`);
    }
});

console.log(`[${new Date().toISOString()}] ` + `\n📊 RESUMO:`);
console.log(`[${new Date().toISOString()}] ` + `   🔧 Scripts corrigidos: ${fixedCount}`);
console.log(`[${new Date().toISOString()}] ` + `   🎯 Próximo: Testar validações`);

console.log(`[${new Date().toISOString()}] ` + '\n✅ CORREÇÃO RÁPIDA CONCLUÍDA!'); 