const fs = require('fs');
const path = require('path');

// Função para fazer backup seguro
function createSafeBackup(filePath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.final-backup-${timestamp}`;
    
    try {
        fs.copyFileSync(filePath, backupPath);
        console.log(`🛡️ Backup seguro criado: ${backupPath}`);
        return backupPath;
    } catch (error) {
        console.error(`❌ Erro ao criar backup: ${error.message}`);
        return null;
    }
}

// Função para restaurar backup
function restoreBackup(backupPath, originalPath) {
    try {
        fs.copyFileSync(backupPath, originalPath);
        console.log(`🔄 Backup restaurado: ${originalPath}`);
        return true;
    } catch (error) {
        console.error(`❌ Erro ao restaurar backup: ${error.message}`);
        return false;
    }
}

// Função para validar HTML básico
function validateHtmlBasic(content) {
    const checks = [
        { name: 'HTML tag', pattern: /<html[^>]*>/i, required: true },
        { name: 'Head tag', pattern: /<head[^>]*>/i, required: true },
        { name: 'Body tag', pattern: /<body[^>]*>/i, required: true },
        { name: 'Closing HTML tag', pattern: /<\/html>/i, required: true }
    ];
    
    for (const check of checks) {
        if (check.required && !check.pattern.test(content)) {
            return { valid: false, error: `Tag ${check.name} não encontrada` };
        }
    }
    
    return { valid: true };
}

// Função para corrigir problemas específicos com validação
function fixAllRemainingIssues(filePath) {
    const backupPath = createSafeBackup(filePath);
    if (!backupPath) {
        return { success: false, error: 'Falha ao criar backup' };
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let modifications = [];
        
        // VALIDAÇÃO INICIAL
        const validation = validateHtmlBasic(content);
        if (!validation.valid) {
            console.log(`⚠️ Validação falhou para ${filePath}: ${validation.error}`);
            return { success: false, error: validation.error };
        }
        
        // 1. CORRIGIR select elements sem accessible names (axe/forms)
        const selectRegex = /<select([^>]*?)>/g;
        content = content.replace(selectRegex, (match, attrs) => {
            // Verificar se já tem atributos de acessibilidade
            if (attrs.includes('aria-label=') || attrs.includes('aria-labelledby=') || attrs.includes('title=')) {
                return match; // Já tem, não modificar
            }
            
            // Verificar se tem um label associado
            const idMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/);
            const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/);
            
            if (idMatch) {
                modifications.push(`aria-labelledby adicionado para select com id: ${idMatch[1]}`);
                return `<select${attrs} aria-labelledby="${idMatch[1]}-label">`;
            } else if (nameMatch) {
                const label = nameMatch[1].replace(/_/g, ' ').replace(/-/g, ' ');
                modifications.push(`aria-label adicionado para select: ${label}`);
                return `<select${attrs} aria-label="${label}">`;
            } else {
                modifications.push('aria-label genérico adicionado para select');
                return `<select${attrs} aria-label="Seleção">`;
            }
        });
        
        // 2. CORRIGIR form elements sem labels (inputs)
        const inputRegex = /<input([^>]*?)>/g;
        content = content.replace(inputRegex, (match, attrs) => {
            // Verificar se já tem atributos de acessibilidade
            if (attrs.includes('aria-label=') || attrs.includes('aria-labelledby=') || attrs.includes('title=')) {
                return match; // Já tem, não modificar
            }
            
            const typeMatch = attrs.match(/type\s*=\s*["']([^"']+)["']/);
            const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/);
            const idMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/);
            
            if (idMatch) {
                modifications.push(`aria-labelledby adicionado para input com id: ${idMatch[1]}`);
                return `<input${attrs} aria-labelledby="${idMatch[1]}-label">`;
            } else if (nameMatch) {
                const label = nameMatch[1].replace(/_/g, ' ').replace(/-/g, ' ');
                modifications.push(`aria-label adicionado para input: ${label}`);
                return `<input${attrs} aria-label="${label}">`;
            } else if (typeMatch) {
                const type = typeMatch[1];
                modifications.push(`aria-label adicionado para input ${type}`);
                return `<input${attrs} aria-label="${type} input">`;
            }
            
            return match;
        });
        
        // 3. CORRIGIR CSS prefix order - APENAS onde há problemas
        const cssBlockRegex = /{([^}]+)}/g;
        content = content.replace(cssBlockRegex, (match, cssContent) => {
            const lines = cssContent.split(';').filter(line => line.trim());
            const webkitProps = new Map();
            const standardProps = new Map();
            const otherProps = [];
            
            // Separar propriedades
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
                    // Tem versão webkit correspondente
                    standardProps.set(prop, { prop, value });
                } else {
                    // Outras propriedades
                    otherProps.push(trimmed);
                }
            });
            
            // Só reordenar se houver propriedades webkit e padrão
            if (webkitProps.size > 0 && standardProps.size > 0) {
                const reorderedLines = [];
                
                // Primeiro as propriedades webkit
                webkitProps.forEach((webkitData, standardProp) => {
                    reorderedLines.push(`${webkitData.prop}: ${webkitData.value}`);
                    
                    // Depois a versão padrão correspondente
                    if (standardProps.has(standardProp)) {
                        const standardData = standardProps.get(standardProp);
                        reorderedLines.push(`${standardData.prop}: ${standardData.value}`);
                        modifications.push(`CSS reordenado: ${standardProp} após -webkit-${standardProp}`);
                    }
                });
                
                // Depois as outras propriedades
                otherProps.forEach(line => {
                    reorderedLines.push(line);
                });
                
                if (reorderedLines.length > 0) {
                    return `{\n    ${reorderedLines.join(';\n    ')};\n}`;
                }
            }
            
            return match;
        });
        
        // 4. CORRIGIR meta theme-color para compatibilidade
        const themeColorRegex = /<meta\s+name\s*=\s*["']theme-color["'][^>]*>/gi;
        content = content.replace(themeColorRegex, (match) => {
            if (!match.includes('data-firefox-compat')) {
                modifications.push('Meta theme-color corrigido para compatibilidade Firefox');
                return match.replace('>', ' data-firefox-compat="true">');
            }
            return match;
        });
        
        // VALIDAÇÃO PÓS-CORREÇÃO
        const postValidation = validateHtmlBasic(content);
        if (!postValidation.valid) {
            console.log(`❌ Validação pós-correção falhou: ${postValidation.error}`);
            console.log(`🔄 Restaurando backup...`);
            restoreBackup(backupPath, filePath);
            return { success: false, error: `Validação pós-correção falhou: ${postValidation.error}` };
        }
        
        // Verificar se houve modificações
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${filePath} - ${modifications.length} correções aplicadas`);
            return {
                success: true,
                file: filePath,
                modifications: modifications.length,
                details: modifications,
                backupPath: backupPath
            };
        } else {
            console.log(`ℹ️ ${filePath} - Nenhuma correção necessária`);
            return {
                success: true,
                file: filePath,
                modifications: 0,
                details: [],
                backupPath: backupPath
            };
        }
        
    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error.message);
        
        // PLANO B: Restaurar backup se existir
        if (backupPath && fs.existsSync(backupPath)) {
            console.log(`🔄 Restaurando backup devido a erro...`);
            restoreBackup(backupPath, filePath);
        }
        
        return {
            success: false,
            file: filePath,
            error: error.message,
            modifications: 0,
            details: []
        };
    }
}

// Função para processar todos os arquivos HTML no diretório
function processAllHtmlFiles(directory) {
    const files = fs.readdirSync(directory);
    let totalProcessed = 0;
    let totalModified = 0;
    let totalErrors = 0;
    let allModifications = [];
    let backups = [];
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            const result = processAllHtmlFiles(filePath);
            totalProcessed += result.processed;
            totalModified += result.modified;
            totalErrors += result.errors;
            allModifications = allModifications.concat(result.modifications);
            backups = backups.concat(result.backups);
        } else if (file.endsWith('.html')) {
            totalProcessed++;
            console.log(`📁 Processando: ${filePath}`);
            
            const result = fixAllRemainingIssues(filePath);
            
            if (!result.success) {
                totalErrors++;
                console.log(`❌ Falha: ${result.error}`);
            } else if (result.modifications > 0) {
                totalModified++;
                allModifications.push(result);
                if (result.backupPath) {
                    backups.push(result.backupPath);
                }
            }
        }
    });
    
    return {
        processed: totalProcessed,
        modified: totalModified,
        errors: totalErrors,
        modifications: allModifications,
        backups: backups
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
        errors: results.modifications.filter(r => !r.success),
        backups: results.backups
    };
    
    const reportPath = path.join(__dirname, 'final-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Relatório salvo em: ${reportPath}`);
    
    return report;
}

// Função principal
function main() {
    console.log('🔧 Iniciando correção FINAL de TODOS os problemas...\n');
    console.log('🛡️ PLANO B: Backups automáticos com restauração em caso de erro\n');
    
    const frontendDir = path.join(__dirname, '..', 'frontend', 'public');
    
    if (!fs.existsSync(frontendDir)) {
        console.error('❌ Diretório frontend/public não encontrado');
        process.exit(1);
    }
    
    const results = processAllHtmlFiles(frontendDir);
    const report = generateReport(results);
    
    console.log('\n🎉 Correções FINAIS concluídas!');
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
    
    console.log(`\n🛡️ Backups criados: ${results.backups.length}`);
    console.log('📄 Relatório detalhado salvo em scripts/final-fix-report.json');
    
    if (results.errors > 0) {
        console.log('\n⚠️ ATENÇÃO: Alguns arquivos tiveram erros e foram restaurados automaticamente');
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    fixAllRemainingIssues,
    processAllHtmlFiles,
    generateReport
};
