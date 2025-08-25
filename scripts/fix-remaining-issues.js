const fs = require('fs');
const path = require('path');

// Função para fazer backup do arquivo
function backupFile(filePath) {
    const backupPath = filePath + '.remaining-backup';
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📋 Backup criado: ${backupPath}`);
    }
}

// Função para corrigir problemas restantes específicos
function fixRemainingIssues(filePath) {
    try {
        backupFile(filePath);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let modifications = [];

        // 1. CORRIGIR select elements sem accessible names (axe/forms)
        const selectRegex = /<select([^>]*?)(?<!aria-label=)(?<!aria-labelledby=)(?<!title=)([^>]*?)>/g;
        content = content.replace(selectRegex, (match, before, after) => {
            // Verificar se já tem um label associado
            const idMatch = before.match(/id\s*=\s*["']([^"']+)["']/);
            const nameMatch = before.match(/name\s*=\s*["']([^"']+)["']/);
            
            if (idMatch) {
                // Se tem ID, adicionar aria-labelledby
                modifications.push(`aria-labelledby adicionado para select com id: ${idMatch[1]}`);
                return `<select${before} aria-labelledby="${idMatch[1]}-label"${after}>`;
            } else if (nameMatch) {
                // Se tem name, adicionar aria-label baseado no name
                const label = nameMatch[1].replace(/_/g, ' ').replace(/-/g, ' ');
                modifications.push(`aria-label adicionado para select: ${label}`);
                return `<select${before} aria-label="${label}"${after}>`;
            } else {
                // Caso genérico
                modifications.push('aria-label genérico adicionado para select');
                return `<select${before} aria-label="Seleção"${after}>`;
            }
        });

        // 2. CORRIGIR css-prefix-order - Reordenar propriedades CSS
        // Encontrar blocos CSS que têm -webkit- e versão padrão
        const cssBlockRegex = /{([^}]+)}/g;
        content = content.replace(cssBlockRegex, (match, cssContent) => {
            const lines = cssContent.split(';').filter(line => line.trim());
            const properties = [];
            
            // Agrupar propriedades relacionadas
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
                    // Já temos a versão webkit, agora temos a padrão
                    standardProps.set(prop, { prop, value });
                } else {
                    // Propriedade sem versão webkit
                    properties.push({ prop, value, line: trimmed });
                }
            });
            
            // Reordenar: webkit primeiro, depois padrão
            const reorderedLines = [];
            
            // Adicionar propriedades webkit primeiro
            webkitProps.forEach((webkitData, standardProp) => {
                reorderedLines.push(`${webkitData.prop}: ${webkitData.value}`);
                
                // Adicionar versão padrão logo após
                if (standardProps.has(standardProp)) {
                    const standardData = standardProps.get(standardProp);
                    reorderedLines.push(`${standardData.prop}: ${standardData.value}`);
                    modifications.push(`CSS reordenado: ${standardProp} após -webkit-${standardProp}`);
                }
            });
            
            // Adicionar outras propriedades
            properties.forEach(({ line }) => {
                reorderedLines.push(line);
            });
            
            if (reorderedLines.length > 0) {
                return `{\n    ${reorderedLines.join(';\n    ')};\n}`;
            }
            
            return match;
        });

        // 3. CORRIGIR form elements sem labels (inputs que ainda não foram corrigidos)
        const inputRegex = /<input([^>]*?)(?<!aria-label=)(?<!aria-labelledby=)(?<!title=)(?<!for=)([^>]*?)>/g;
        content = content.replace(inputRegex, (match, before, after) => {
            const typeMatch = before.match(/type\s*=\s*["']([^"']+)["']/);
            const nameMatch = before.match(/name\s*=\s*["']([^"']+)["']/);
            const idMatch = before.match(/id\s*=\s*["']([^"']+)["']/);
            
            if (idMatch) {
                modifications.push(`aria-labelledby adicionado para input com id: ${idMatch[1]}`);
                return `<input${before} aria-labelledby="${idMatch[1]}-label"${after}>`;
            } else if (nameMatch) {
                const label = nameMatch[1].replace(/_/g, ' ').replace(/-/g, ' ');
                modifications.push(`aria-label adicionado para input: ${label}`);
                return `<input${before} aria-label="${label}"${after}>`;
            } else if (typeMatch) {
                const type = typeMatch[1];
                modifications.push(`aria-label adicionado para input ${type}`);
                return `<input${before} aria-label="${type} input"${after}>`;
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

// Função para processar arquivos específicos com problemas
function processSpecificFiles() {
    const filesWithIssues = [
        'frontend/public/approvals-management.html',
        'frontend/public/documents-management.html',
        'frontend/public/hr-management.html',
        'frontend/public/notifications-management.html',
        'frontend/public/recruitment-management.html',
        'frontend/public/reports-management.html',
        'frontend/public/task-management.html',
        'frontend/public/users-management.html',
        'frontend/public/communication-management.html',
        'frontend/public/esocial-validation.html'
    ];

    let totalProcessed = 0;
    let totalModified = 0;
    let totalErrors = 0;
    let allModifications = [];

    filesWithIssues.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            totalProcessed++;
            const result = fixRemainingIssues(filePath);
            
            if (result.error) {
                totalErrors++;
            } else if (result.modifications > 0) {
                totalModified++;
                allModifications.push(result);
            }
        } else {
            console.log(`⚠️  Arquivo não encontrado: ${filePath}`);
        }
    });

    return {
        processed: totalProcessed,
        modified: totalModified,
        errors: totalErrors,
        modifications: allModifications
    };
}

// Função para gerar relatório
function generateReport(results) {
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            totalProcessed: results.processed,
            totalModified: results.modified,
            totalErrors: results.errors,
            successRate: results.processed > 0 ? ((results.modified / results.processed) * 100).toFixed(2) + '%' : '0%'
        },
        modifications: results.modifications.filter(r => r.modifications > 0),
        errors: results.modifications.filter(r => r.error)
    };

    const reportPath = path.join(__dirname, 'remaining-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Relatório salvo em: ${reportPath}`);

    return report;
}

// Função principal
function main() {
    console.log('🔧 Iniciando correção de problemas restantes...\n');

    const results = processSpecificFiles();
    const report = generateReport(results);

    console.log('\n🎉 Correções concluídas!');
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

    console.log('\n🛡️ Backups criados com sufixo .remaining-backup');
    console.log('📄 Relatório detalhado salvo em scripts/remaining-fix-report.json');
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    fixRemainingIssues,
    processSpecificFiles,
    generateReport
};
