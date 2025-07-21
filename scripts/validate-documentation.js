#!/usr/bin/env node

/**
 * Validação de Documentação - DOM v2
 * Valida qualidade e completude da documentação
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE DOCUMENTAÇÃO');
console.log(`[${new Date().toISOString()}] ` + '========================================');

// Função principal de validação
function validateValidaçãodeDocumentação() {
    console.log(`[${new Date().toISOString()}] ` + '📊 Analisando valida qualidade e completude da documentação...');
    
    const results = {
        status: 'success',
        score: 0,
        issues: [],
        recommendations: [],
        details: {}
    };
    
    try {
        
        // Validar documentação
        const docsDir = path.join(__dirname, '..', 'docs');
        
        if (fs.existsSync(docsDir)) {
            const docs = fs.readdirSync(docsDir);
            
            // Verificar documentação essencial
            const essentialDocs = ['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md'];
            essentialDocs.forEach(doc => {
                if (!docs.includes(doc)) {
                    results.issues.push(`Documentação essencial ausente: ${doc}`);
                }
            });
            
            // Verificar qualidade da documentação
            docs.forEach(doc => {
                if (doc.endsWith('.md')) {
                    const content = fs.readFileSync(path.join(docsDir, doc), 'utf8');
                    if (content.length < 100) {
                        results.issues.push(`Documentação insuficiente: ${doc}`);
                    }
                }
            });
        }
        
        results.recommendations.push('Melhorar documentação de API');
        results.recommendations.push('Adicionar exemplos de uso');
        results.recommendations.push('Criar guias de troubleshooting');
            
        
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
const result = validateValidaçãodeDocumentação();

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
    validateValidaçãodeDocumentação,
    calculateScore
};
