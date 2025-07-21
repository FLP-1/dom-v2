#!/usr/bin/env node

/**
 * Script para Corrigir Scripts de Validação - DOM v2
 * Corrige todos os scripts de validação com problemas
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔧 CORRIGINDO SCRIPTS DE VALIDAÇÃO');
console.log(`[${new Date().toISOString()}] ` + '===================================');

// Função para corrigir script de acessibilidade
function fixAccessibilityScript() {
    const content = `#!/usr/bin/env node

/**
 * Validação de Acessibilidade - DOM v2
 * Valida acessibilidade do código
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE ACESSIBILIDADE');
console.log(`[${new Date().toISOString()}] ` + '==========================================');

// Função principal de validação
function validateAccessibility() {
    console.log(`[${new Date().toISOString()}] ` + '📊 Analisando acessibilidade do código...');
    
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
            const componentsDir = path.join(frontendDir, 'src', 'components');
            if (fs.existsSync(componentsDir)) {
                const components = fs.readdirSync(componentsDir);
                
                // Verificar componentes React
                components.forEach(component => {
                    if (component.endsWith('.tsx') || component.endsWith('.jsx')) {
                        const content = fs.readFileSync(path.join(componentsDir, component), 'utf8');
                        
                        // Verificar atributos de acessibilidade
                        if (!content.includes('aria-') && !content.includes('role=')) {
                            results.issues.push(\`Componente \${component} sem atributos de acessibilidade\`);
                        }
                    }
                });
            }
        }
        
        results.recommendations.push('Adicionar atributos ARIA aos componentes');
        results.recommendations.push('Implementar navegação por teclado');
        results.recommendations.push('Adicionar contraste adequado');
        
        // Calcular score baseado nos resultados
        results.score = calculateScore(results);
        
    } catch (error) {
        results.status = 'error';
        results.issues.push(\`Erro durante validação: \${error.message}\`);
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
const result = validateAccessibility();

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

console.log(`[${new Date().toISOString()}] ` + '\\n✅ VALIDAÇÃO DE ACESSIBILIDADE CONCLUÍDA!');

module.exports = {
    validateAccessibility,
    calculateScore
};
`;

    fs.writeFileSync(path.join(__dirname, 'validate-accessibility.js'), content, 'utf8');
    console.log(`[${new Date().toISOString()}] ` + '✅ Script de acessibilidade corrigido');
}

// Função para corrigir script de documentação
function fixDocumentationScript() {
    const content = `#!/usr/bin/env node

/**
 * Validação de Documentação - DOM v2
 * Valida qualidade e completude da documentação
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE DOCUMENTAÇÃO');
console.log(`[${new Date().toISOString()}] ` + '========================================');

// Função principal de validação
function validateDocumentation() {
    console.log(`[${new Date().toISOString()}] ` + '📊 Analisando qualidade e completude da documentação...');
    
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
                    results.issues.push(\`Documentação essencial ausente: \${doc}\`);
                }
            });
            
            // Verificar qualidade da documentação
            docs.forEach(doc => {
                if (doc.endsWith('.md')) {
                    const content = fs.readFileSync(path.join(docsDir, doc), 'utf8');
                    if (content.length < 100) {
                        results.issues.push(\`Documentação insuficiente: \${doc}\`);
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
        results.issues.push(\`Erro durante validação: \${error.message}\`);
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
const result = validateDocumentation();

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

console.log(`[${new Date().toISOString()}] ` + '\\n✅ VALIDAÇÃO DE DOCUMENTAÇÃO CONCLUÍDA!');

module.exports = {
    validateDocumentation,
    calculateScore
};
`;

    fs.writeFileSync(path.join(__dirname, 'validate-documentation.js'), content, 'utf8');
    console.log(`[${new Date().toISOString()}] ` + '✅ Script de documentação corrigido');
}

// Função para corrigir script de testes
function fixTestingScript() {
    const content = `#!/usr/bin/env node

/**
 * Validação de Testes - DOM v2
 * Valida cobertura e qualidade dos testes
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE TESTES');
console.log(`[${new Date().toISOString()}] ` + '==================================');

// Função principal de validação
function validateTesting() {
    console.log(`[${new Date().toISOString()}] ` + '📊 Analisando cobertura e qualidade dos testes...');
    
    const results = {
        status: 'success',
        score: 0,
        issues: [],
        recommendations: [],
        details: {}
    };
    
    try {
        // Validar testes
        const testFiles = [
            'test-dashboard.js',
            'test-login.js',
            'test-tasks.js',
            'test.html'
        ];
        
        testFiles.forEach(testFile => {
            const testPath = path.join(__dirname, '..', testFile);
            if (!fs.existsSync(testPath)) {
                results.issues.push(\`Arquivo de teste ausente: \${testFile}\`);
            }
        });
        
        // Verificar cobertura de testes
        const backendDir = path.join(__dirname, '..', 'backend');
        const frontendDir = path.join(__dirname, '..', 'frontend');
        
        if (fs.existsSync(backendDir)) {
            const backendTests = fs.readdirSync(backendDir).filter(file => file.includes('test'));
            if (backendTests.length < 3) {
                results.issues.push('Cobertura de testes do backend insuficiente');
            }
        }
        
        if (fs.existsSync(frontendDir)) {
            const frontendTests = fs.readdirSync(frontendDir).filter(file => file.includes('test'));
            if (frontendTests.length < 3) {
                results.issues.push('Cobertura de testes do frontend insuficiente');
            }
        }
        
        results.recommendations.push('Aumentar cobertura de testes');
        results.recommendations.push('Adicionar testes de integração');
        results.recommendations.push('Implementar testes automatizados');
        
        // Calcular score baseado nos resultados
        results.score = calculateScore(results);
        
    } catch (error) {
        results.status = 'error';
        results.issues.push(\`Erro durante validação: \${error.message}\`);
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
const result = validateTesting();

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

console.log(`[${new Date().toISOString()}] ` + '\\n✅ VALIDAÇÃO DE TESTES CONCLUÍDA!');

module.exports = {
    validateTesting,
    calculateScore
};
`;

    fs.writeFileSync(path.join(__dirname, 'validate-testing.js'), content, 'utf8');
    console.log(`[${new Date().toISOString()}] ` + '✅ Script de testes corrigido');
}

// Função para corrigir script de estrutura
function fixStructureScript() {
    const content = `#!/usr/bin/env node

/**
 * Validação de Estrutura - DOM v2
 * Valida estrutura e organização do projeto
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE ESTRUTURA');
console.log(`[${new Date().toISOString()}] ` + '=====================================');

// Função principal de validação
function validateStructure() {
    console.log(`[${new Date().toISOString()}] ` + '📊 Analisando estrutura e organização do projeto...');
    
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
                results.issues.push(\`Diretório essencial ausente: \${dir}\`);
            }
        });
        
        // Verificar arquivos essenciais
        const essentialFiles = ['package.json', 'README.md'];
        essentialFiles.forEach(file => {
            if (!fs.existsSync(path.join(__dirname, '..', file))) {
                results.issues.push(\`Arquivo essencial ausente: \${file}\`);
            }
        });
        
        results.recommendations.push('Organizar estrutura de pastas');
        results.recommendations.push('Padronizar nomenclatura');
        results.recommendations.push('Separar responsabilidades');
        
        // Calcular score baseado nos resultados
        results.score = calculateScore(results);
        
    } catch (error) {
        results.status = 'error';
        results.issues.push(\`Erro durante validação: \${error.message}\`);
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
const result = validateStructure();

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

console.log(`[${new Date().toISOString()}] ` + '\\n✅ VALIDAÇÃO DE ESTRUTURA CONCLUÍDA!');

module.exports = {
    validateStructure,
    calculateScore
};
`;

    fs.writeFileSync(path.join(__dirname, 'validate-structure.js'), content, 'utf8');
    console.log(`[${new Date().toISOString()}] ` + '✅ Script de estrutura corrigido');
}

// Função principal
function main() {
    console.log(`[${new Date().toISOString()}] ` + '🔧 Corrigindo scripts de validação...');
    
    fixAccessibilityScript();
    fixDocumentationScript();
    fixTestingScript();
    fixStructureScript();
    
    console.log(`[${new Date().toISOString()}] ` + '\\n✅ TODOS OS SCRIPTS DE VALIDAÇÃO CORRIGIDOS!');
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    fixAccessibilityScript,
    fixDocumentationScript,
    fixTestingScript,
    fixStructureScript
}; 