#!/usr/bin/env node

/**
 * Validação de Acessibilidade - DOM v2
 * Valida acessibilidade do código
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE ACESSIBILIDADE');
console.log(`[${new Date().toISOString()}] ` + '========================================');

// Função principal de validação
function validateValidaçãodeAcessibilidade() {
    console.log(`[${new Date().toISOString()}] ` + '📊 Analisando valida acessibilidade do código...');
    
    const results = {
        status: 'success',
        score: 0,
        issues: [],
        recommendations: [],
        details: {}
    };
    
    try {
        
        // Validar acessibilidade
        const frontendDir = path.join(__dirname, '..', 'frontend');
        
        if (fs.existsSync(frontendDir)) {
            const components = fs.readdirSync(path.join(frontendDir, 'src', 'components'));
            
            // Verificar componentes React
            components.forEach(component => {
                if (component.endsWith('.tsx') || component.endsWith('.jsx')) {
                    const content = fs.readFileSync(path.join(frontendDir, 'src', 'components', component), 'utf8');
                    
                    // Verificar atributos de acessibilidade
                    if (!content.includes('aria-') && !content.includes('role=')) {
                        results.issues.push(`Componente ${component} sem atributos de acessibilidade`);
                    }
                }
            });
        }
        
        results.recommendations.push('Adicionar atributos ARIA aos componentes');
        results.recommendations.push('Implementar navegação por teclado');
        results.recommendations.push('Adicionar contraste adequado');
            
        
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
const result = validateValidaçãodeAcessibilidade();

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
    validateValidaçãodeAcessibilidade,
    calculateScore
};
