const fs = require('fs');
const path = require('path');

// Função para fazer backup do arquivo
function backupFile(filePath) {
    const backupPath = filePath + '.advanced-backup';
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📋 Backup avançado criado: ${backupPath}`);
    }
}

// Função para verificar se uma string contém texto discernível
function hasDiscernibleText(text) {
    return text && text.trim().length > 0;
}

// Função para extrair estilos inline e criar classes CSS
function extractInlineStyles(content) {
    const styleMap = new Map();
    let styleCounter = 0;
    
    // Regex para encontrar estilos inline
    const inlineStyleRegex = /style\s*=\s*["']([^"']+)["']/g;
    
    content = content.replace(inlineStyleRegex, (match, styles) => {
        const className = `extracted-style-${++styleCounter}`;
        styleMap.set(className, styles);
        return `class="${className}"`;
    });
    
    return { content, styleMap };
}

// Função para corrigir problemas avançados de acessibilidade e compatibilidade
function fixAdvancedIssues(filePath) {
    try {
        backupFile(filePath);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let modifications = [];

        // 1. CORRIGIR axe/forms - Formulários sem labels adequados
        const formInputRegex = /<input([^>]*?)(?<!aria-label=)(?<!for=)(?<!id=)(?<!name=)(?<!placeholder=)([^>]*?)>/g;
        content = content.replace(formInputRegex, (match, before, after) => {
            const typeMatch = match.match(/type\s*=\s*["']([^"']+)["']/);
            const type = typeMatch ? typeMatch[1] : 'text';
            const idMatch = match.match(/id\s*=\s*["']([^"']+)["']/);
            const id = idMatch ? idMatch[1] : `input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            modifications.push(`Form input sem label: ${type}`);
            
            return `<input${before} id="${id}" aria-label="${type} input"${after}>`;
        });

        // 2. CORRIGIR no-inline-styles - Extrair estilos inline
        const { content: contentWithoutInline, styleMap } = extractInlineStyles(content);
        if (styleMap.size > 0) {
            content = contentWithoutInline;
            
            // Adicionar estilos extraídos ao head
            const headEndRegex = /<\/head>/;
            if (headEndRegex.test(content)) {
                const extractedStyles = Array.from(styleMap.entries())
                    .map(([className, styles]) => `.${className} { ${styles} }`)
                    .join('\n    ');
                
                content = content.replace('</head>', `  <style>\n    ${extractedStyles}\n  </style>\n</head>`);
                modifications.push(`Estilos inline extraídos: ${styleMap.size} classes criadas`);
            }
        }

        // 3. CORRIGIR compat-api/css - Adicionar prefixos de vendor
        const cssProperties = [
            { prop: 'backdrop-filter', prefix: '-webkit-backdrop-filter' },
            { prop: 'user-select', prefix: '-webkit-user-select' },
            { prop: 'appearance', prefix: '-webkit-appearance' },
            { prop: 'transform', prefix: '-webkit-transform' },
            { prop: 'transition', prefix: '-webkit-transition' },
            { prop: 'animation', prefix: '-webkit-animation' }
        ];

        cssProperties.forEach(({ prop, prefix }) => {
            const propRegex = new RegExp(`${prop}\\s*:\\s*([^;]+);`, 'g');
            content = content.replace(propRegex, (match, value) => {
                modifications.push(`Prefixo adicionado: ${prefix}`);
                return `${prefix}: ${value};\n    ${match}`;
            });
        });

        // 4. CORRIGIR compat-api/html - Adicionar atributos de compatibilidade
        const htmlTagRegex = /<html([^>]*)>/;
        if (htmlTagRegex.test(content)) {
            content = content.replace(htmlTagRegex, (match, attrs) => {
                if (!attrs.includes('lang=')) {
                    modifications.push('Atributo lang adicionado ao HTML');
                    return `<html${attrs} lang="pt-BR">`;
                }
                return match;
            });
        }

        // 5. CORRIGIR css-prefix-order - Ordenar propriedades CSS
        const cssBlockRegex = /{([^}]+)}/g;
        content = content.replace(cssBlockRegex, (match, cssContent) => {
            const properties = cssContent.split(';').filter(p => p.trim());
            const sortedProperties = properties.sort((a, b) => {
                const aProp = a.split(':')[0].trim();
                const bProp = b.split(':')[0].trim();
                
                // Ordem preferencial: layout, box model, typography, visual
                const order = {
                    'display': 1, 'position': 2, 'top': 3, 'right': 4, 'bottom': 5, 'left': 6,
                    'width': 7, 'height': 8, 'margin': 9, 'padding': 10, 'border': 11,
                    'font': 12, 'color': 13, 'background': 14, 'transform': 15, 'transition': 16
                };
                
                const aOrder = order[aProp] || 999;
                const bOrder = order[bProp] || 999;
                
                return aOrder - bOrder;
            });
            
            return `{\n    ${sortedProperties.join(';\n    ')};\n}`;
        });

        // 6. CORRIGIR disown-opener - Adicionar rel="noopener noreferrer" para links externos
        const externalLinkRegex = /<a([^>]*?href\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*?)>/g;
        content = content.replace(externalLinkRegex, (match, before, href) => {
            if (!before.includes('rel=')) {
                modifications.push(`rel="noopener noreferrer" adicionado para link externo: ${href}`);
                return `<a${before} rel="noopener noreferrer">`;
            }
            return match;
        });

        // 7. CORRIGIR problemas de acessibilidade avançados
        // Adicionar role para elementos semânticos
        const semanticElements = [
            { tag: 'nav', role: 'navigation' },
            { tag: 'main', role: 'main' },
            { tag: 'aside', role: 'complementary' },
            { tag: 'section', role: 'region' }
        ];

        semanticElements.forEach(({ tag, role }) => {
            const tagRegex = new RegExp(`<${tag}([^>]*?)>`, 'g');
            content = content.replace(tagRegex, (match, attrs) => {
                if (!attrs.includes('role=')) {
                    modifications.push(`Role adicionado: ${tag} -> ${role}`);
                    return `<${tag}${attrs} role="${role}">`;
                }
                return match;
            });
        });

        // 8. CORRIGIR problemas de formulários avançados
        // Adicionar aria-describedby para inputs com descrições
        const inputWithDescriptionRegex = /<input([^>]*?)>([^<]*?)<small([^>]*?)>/g;
        content = content.replace(inputWithDescriptionRegex, (match, inputAttrs, description, smallAttrs) => {
            const idMatch = inputAttrs.match(/id\s*=\s*["']([^"']+)["']/);
            if (idMatch) {
                const inputId = idMatch[1];
                const descriptionId = `${inputId}-description`;
                modifications.push(`aria-describedby adicionado para input: ${inputId}`);
                
                return `<input${inputAttrs} aria-describedby="${descriptionId}">${description}<small${smallAttrs} id="${descriptionId}">`;
            }
            return match;
        });

        // 9. CORRIGIR problemas de navegação por teclado
        // Adicionar tabindex para elementos interativos
        const interactiveElements = ['button', 'a', 'input', 'select', 'textarea'];
        interactiveElements.forEach(tag => {
            const tagRegex = new RegExp(`<${tag}([^>]*?)>`, 'g');
            content = content.replace(tagRegex, (match, attrs) => {
                if (!attrs.includes('tabindex=') && !attrs.includes('disabled')) {
                    modifications.push(`tabindex adicionado para ${tag}`);
                    return `<${tag}${attrs} tabindex="0">`;
                }
                return match;
            });
        });

        // 10. CORRIGIR problemas de contraste e legibilidade
        // Adicionar aria-label para elementos com baixo contraste
        const lowContrastElements = /<span([^>]*?class\s*=\s*["'][^"']*text-muted[^"']*["'][^>]*?)>/g;
        content = content.replace(lowContrastElements, (match, attrs) => {
            if (!attrs.includes('aria-label=')) {
                modifications.push('aria-label adicionado para elemento com baixo contraste');
                return `<span${attrs} aria-label="Texto secundário">`;
            }
            return match;
        });

        // Verificar se houve modificações
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${filePath} - ${modifications.length} correções aplicadas`);
            return {
                file: filePath,
                modifications: modifications.length,
                details: modifications
            };
        } else {
            console.log(`ℹ️  ${filePath} - Nenhuma correção necessária`);
            return {
                file: filePath,
                modifications: 0,
                details: []
            };
        }

    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error.message);
        return {
            file: filePath,
            error: error.message,
            modifications: 0,
            details: []
        };
    }
}

// Função para processar todos os arquivos HTML
function processAllFiles(directory) {
    const files = fs.readdirSync(directory);
    let totalProcessed = 0;
    let totalModified = 0;
    let totalErrors = 0;
    let allModifications = [];

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const result = processAllFiles(filePath);
            totalProcessed += result.processed;
            totalModified += result.modified;
            totalErrors += result.errors;
            allModifications = allModifications.concat(result.modifications);
        } else if (file.endsWith('.html')) {
            totalProcessed++;
            const result = fixAdvancedIssues(filePath);
            
            if (result.error) {
                totalErrors++;
            } else if (result.modifications > 0) {
                totalModified++;
                allModifications.push(result);
            }
        }
    });

    return {
        processed: totalProcessed,
        modified: totalModified,
        errors: totalErrors,
        modifications: allModifications
    };
}

// Função para gerar relatório detalhado
function generateReport(results) {
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            totalProcessed: results.processed,
            totalModified: results.modified,
            totalErrors: results.errors,
            successRate: ((results.modified / results.processed) * 100).toFixed(2) + '%'
        },
        modifications: results.modifications.filter(r => r.modifications > 0),
        errors: results.modifications.filter(r => r.error)
    };

    const reportPath = path.join(__dirname, 'advanced-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Relatório salvo em: ${reportPath}`);

    return report;
}

// Função principal
function main() {
    console.log('🔧 Iniciando correções avançadas de acessibilidade e compatibilidade...\n');

    const frontendDir = path.join(__dirname, '..', 'frontend', 'public');
    
    if (!fs.existsSync(frontendDir)) {
        console.error('❌ Diretório frontend/public não encontrado');
        process.exit(1);
    }

    const results = processAllFiles(frontendDir);
    const report = generateReport(results);

    console.log('\n🎉 Correções avançadas concluídas!');
    console.log(`📊 Resumo:`);
    console.log(`   📁 Arquivos processados: ${results.processed}`);
    console.log(`   ✅ Arquivos modificados: ${results.modified}`);
    console.log(`   ❌ Erros: ${results.errors}`);
    console.log(`   📈 Taxa de sucesso: ${report.summary.successRate}`);

    if (results.modified > 0) {
        console.log('\n📋 Principais correções aplicadas:');
        const allDetails = results.modifications.flatMap(r => r.details);
        const uniqueDetails = [...new Set(allDetails)];
        uniqueDetails.forEach(detail => {
            console.log(`   • ${detail}`);
        });
    }

    console.log('\n🛡️ Backups criados com sufixo .advanced-backup');
    console.log('📄 Relatório detalhado salvo em scripts/advanced-fix-report.json');
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    fixAdvancedIssues,
    processAllFiles,
    generateReport
};
