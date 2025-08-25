const fs = require('fs');
const path = require('path');

// Função para diagnosticar problemas específicos
function diagnoseIssues(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const issues = [];
        
        // 1. DIAGNOSTICAR select elements sem accessible names
        const selectRegex = /<select([^>]*?)>/g;
        let selectMatch;
        let selectCount = 0;
        
        while ((selectMatch = selectRegex.exec(content)) !== null) {
            selectCount++;
            const attrs = selectMatch[1];
            
            // Verificar se tem atributos de acessibilidade
            if (!attrs.includes('aria-label=') && !attrs.includes('aria-labelledby=') && !attrs.includes('title=')) {
                const idMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/);
                const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/);
                
                issues.push({
                    type: 'axe/forms',
                    element: 'select',
                    line: content.substring(0, selectMatch.index).split('\n').length,
                    description: `Select sem accessible name - ID: ${idMatch ? idMatch[1] : 'N/A'}, Name: ${nameMatch ? nameMatch[1] : 'N/A'}`
                });
            }
        }
        
        // 2. DIAGNOSTICAR form elements sem labels
        const inputRegex = /<input([^>]*?)>/g;
        let inputMatch;
        let inputCount = 0;
        
        while ((inputMatch = inputRegex.exec(content)) !== null) {
            inputCount++;
            const attrs = inputMatch[1];
            
            // Verificar se tem atributos de acessibilidade
            if (!attrs.includes('aria-label=') && !attrs.includes('aria-labelledby=') && !attrs.includes('title=')) {
                const typeMatch = attrs.match(/type\s*=\s*["']([^"']+)["']/);
                const idMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/);
                const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/);
                
                issues.push({
                    type: 'axe/forms',
                    element: 'input',
                    line: content.substring(0, inputMatch.index).split('\n').length,
                    description: `Input sem label - Type: ${typeMatch ? typeMatch[1] : 'N/A'}, ID: ${idMatch ? idMatch[1] : 'N/A'}, Name: ${nameMatch ? nameMatch[1] : 'N/A'}`
                });
            }
        }
        
        // 3. DIAGNOSTICAR CSS prefix order
        const cssBlockRegex = /{([^}]+)}/g;
        let cssMatch;
        let cssIssues = 0;
        
        while ((cssMatch = cssBlockRegex.exec(content)) !== null) {
            const cssContent = cssMatch[1];
            const lines = cssContent.split(';').filter(line => line.trim());
            
            const webkitProps = new Map();
            const standardProps = new Map();
            
            lines.forEach(line => {
                const trimmed = line.trim();
                if (!trimmed) return;
                
                const colonIndex = trimmed.indexOf(':');
                if (colonIndex === -1) return;
                
                const prop = trimmed.substring(0, colonIndex).trim();
                const value = trimmed.substring(colonIndex + 1).trim();
                
                if (prop.startsWith('-webkit-')) {
                    const standardProp = prop.replace('-webkit-', '');
                    webkitProps.set(standardProp, { prop, value });
                } else if (webkitProps.has(prop)) {
                    standardProps.set(prop, { prop, value });
                }
            });
            
            // Verificar se há problemas de ordem
            webkitProps.forEach((webkitData, standardProp) => {
                if (standardProps.has(standardProp)) {
                    cssIssues++;
                    issues.push({
                        type: 'css-prefix-order',
                        element: 'css',
                        line: content.substring(0, cssMatch.index).split('\n').length,
                        description: `CSS prefix order: ${standardProp} deve vir após -webkit-${standardProp}`
                    });
                }
            });
        }
        
        // 4. DIAGNOSTICAR meta theme-color
        const themeColorRegex = /<meta\s+name\s*=\s*["']theme-color["'][^>]*>/gi;
        let themeMatch;
        
        while ((themeMatch = themeColorRegex.exec(content)) !== null) {
            if (!themeMatch[0].includes('data-firefox-compat')) {
                issues.push({
                    type: 'compat-api/html',
                    element: 'meta',
                    line: content.substring(0, themeMatch.index).split('\n').length,
                    description: 'Meta theme-color sem compatibilidade Firefox'
                });
            }
        }
        
        return {
            file: filePath,
            totalIssues: issues.length,
            issues: issues,
            stats: {
                selects: selectCount,
                inputs: inputCount,
                cssIssues: cssIssues
            }
        };
        
    } catch (error) {
        return {
            file: filePath,
            error: error.message,
            totalIssues: 0,
            issues: []
        };
    }
}

// Função para processar todos os arquivos HTML
function processAllHtmlFiles(directory) {
    const files = fs.readdirSync(directory);
    let allResults = [];
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            const subResults = processAllHtmlFiles(filePath);
            allResults = allResults.concat(subResults);
        } else if (file.endsWith('.html')) {
            const result = diagnoseIssues(filePath);
            if (result.totalIssues > 0) {
                allResults.push(result);
            }
        }
    });
    
    return allResults;
}

// Função principal
function main() {
    console.log('🔍 Iniciando diagnóstico de problemas restantes...\n');
    
    const frontendDir = path.join(__dirname, '..', 'frontend', 'public');
    
    if (!fs.existsSync(frontendDir)) {
        console.error('❌ Diretório frontend/public não encontrado');
        process.exit(1);
    }
    
    const results = processAllHtmlFiles(frontendDir);
    
    console.log('📊 RESULTADOS DO DIAGNÓSTICO:\n');
    
    if (results.length === 0) {
        console.log('✅ Nenhum problema encontrado!');
        return;
    }
    
    let totalIssues = 0;
    const issueTypes = new Map();
    
    results.forEach(result => {
        console.log(`📁 ${result.file}:`);
        console.log(`   ❌ ${result.totalIssues} problemas encontrados`);
        
        result.issues.forEach(issue => {
            console.log(`      • ${issue.type}: ${issue.description} (linha ${issue.line})`);
            
            // Contar tipos de problemas
            if (!issueTypes.has(issue.type)) {
                issueTypes.set(issue.type, 0);
            }
            issueTypes.set(issue.type, issueTypes.get(issue.type) + 1);
        });
        
        totalIssues += result.totalIssues;
        console.log('');
    });
    
    console.log('📈 RESUMO GERAL:');
    console.log(`   📁 Arquivos com problemas: ${results.length}`);
    console.log(`   ❌ Total de problemas: ${totalIssues}`);
    console.log('');
    
    console.log('🎯 TIPOS DE PROBLEMAS:');
    issueTypes.forEach((count, type) => {
        console.log(`   • ${type}: ${count} problemas`);
    });
    
    // Salvar relatório
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            filesWithIssues: results.length,
            totalIssues: totalIssues,
            issueTypes: Object.fromEntries(issueTypes)
        },
        details: results
    };
    
    const reportPath = path.join(__dirname, 'diagnosis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Relatório salvo em: ${reportPath}`);
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    diagnoseIssues,
    processAllHtmlFiles
};
