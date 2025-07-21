#!/usr/bin/env node

/**
 * Validação de Estrutura - DOM v2
 * Valida estrutura e organização do projeto
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE ESTRUTURA');
console.log(`[${new Date().toISOString()}] ` + '========================================');

// Função principal de validação
function validateValidaçãodeEstrutura() {
    console.log(`[${new Date().toISOString()}] ` + '📊 Analisando valida estrutura e organização do projeto...');
    
    const results = {
        status: 'success',
        score: 0,
        issues: [],
        recommendations: [],
        details: {}
    };
    
    try {
        
        // Validar estrutura do projeto
        const projectStructure = {
            backend: fs.existsSync(path.join(__dirname, '..', 'backend')),
            frontend: fs.existsSync(path.join(__dirname, '..', 'frontend')),
            docs: fs.existsSync(path.join(__dirname, '..', 'docs')),
            scripts: fs.existsSync(path.join(__dirname, '..', 'scripts'))
        };
        
        // Verificar estrutura essencial
        Object.entries(projectStructure).forEach(([dir, exists]) => {
            if (!exists) {
                results.issues.push(`Diretório essencial ausente: ${dir}`);
            }
        });
        
        // Verificar arquivos essenciais
        const essentialFiles = ['package.json', 'README.md'];
        essentialFiles.forEach(file => {
            if (!fs.existsSync(path.join(__dirname, '..', file))) {
                results.issues.push(`Arquivo essencial ausente: ${file}`);
            }
        });
        
        results.recommendations.push('Organizar estrutura de pastas');
        results.recommendations.push('Padronizar nomenclatura');
        results.recommendations.push('Separar responsabilidades');
            
        
        // Calcular score baseado nos resultados
        results.score = calculateScore(results);
        
    } catch (error) {
        results.status = 'error';
        results.issues.push(`Erro durante validação: ${error.message}`);
    }
    
    return results;
}

// Função para calcular score
function calculateScore(results) {
    let score = 100;
    
    // Deduzir pontos por cada issue
    score -= results.issues.length * 10;
    
    // Garantir score mínimo
    return Math.max(0, Math.min(100, score));
}


// Executar validação
const result = validateValidaçãodeEstrutura();

console.log(`[${new Date().toISOString()}] ` + '\n📊 RESULTADOS:');
console.log(`[${new Date().toISOString()}] ` + `   Status: ${result.status}`);
console.log(`[${new Date().toISOString()}] ` + `   Score: ${result.score}/100`);

if (result.issues.length > 0) {
    console.log(`[${new Date().toISOString()}] ` + '   Issues encontradas:');
    result.issues.forEach(issue => console.log(`[${new Date().toISOString()}] ` + `     - ${issue}`));
}

if (result.recommendations.length > 0) {
    console.log(`[${new Date().toISOString()}] ` + '   Recomendações:');
    result.recommendations.forEach(rec => console.log(`[${new Date().toISOString()}] ` + `     - ${rec}`));
}

console.log(`[${new Date().toISOString()}] ` + '\n✅ VALIDAÇÃO CONCLUÍDA!');

module.exports = {
    validateValidaçãodeEstrutura,
    calculateScore
};
