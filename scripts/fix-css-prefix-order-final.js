const fs = require('fs');
const path = require('path');

// Função para fazer backup seguro
function createSafeBackup(filePath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.css-prefix-backup-${timestamp}`;
    
    try {
        fs.copyFileSync(filePath, backupPath);
        console.log(`🛡️ Backup seguro criado: ${backupPath}`);
        return backupPath;
    } catch (error) {
        console.error(`❌ Erro ao criar backup: ${error.message}`);
        return null;
    }
}

// Função para corrigir CSS prefix order
function fixCssPrefixOrder(filePath) {
    const backupPath = createSafeBackup(filePath);
    if (!backupPath) {
        return { success: false, error: 'Falha ao criar backup' };
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let modifications = [];
        
        // CORRIGIR CSS prefix order - Colocar webkit DEPOIS das propriedades padrão
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
                
                // Primeiro as propriedades padrão
                standardProps.forEach((standardData, standardProp) => {
                    reorderedLines.push(`${standardData.prop}: ${standardData.value}`);
                    
                    // Depois a versão webkit correspondente
                    if (webkitProps.has(standardProp)) {
                        const webkitData = webkitProps.get(standardProp);
                        reorderedLines.push(`${webkitData.prop}: ${webkitData.value}`);
                        modifications.push(`CSS reordenado: -webkit-${standardProp} após ${standardProp}`);
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
        
        // Verificar se houve modificações
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${filePath} - ${modifications.length} correções CSS aplicadas`);
            return {
                success: true,
                file: filePath,
                modifications: modifications.length,
                details: modifications,
                backupPath: backupPath
            };
        } else {
            console.log(`ℹ️ ${filePath} - Nenhuma correção CSS necessária`);
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
            
            const result = fixCssPrefixOrder(filePath);
            
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

// Função principal
function main() {
    console.log('🔧 Iniciando correção FINAL de CSS prefix order...\n');
    console.log('🛡️ PLANO B: Backups automáticos\n');
    
    const frontendDir = path.join(__dirname, '..', 'frontend', 'public');
    
    if (!fs.existsSync(frontendDir)) {
        console.error('❌ Diretório frontend/public não encontrado');
        process.exit(1);
    }
    
    const results = processAllHtmlFiles(frontendDir);
    
    console.log('\n🎉 Correções CSS FINAIS concluídas!');
    console.log(`📊 Resumo:`);
    console.log(`   📁 Arquivos processados: ${results.processed}`);
    console.log(`   ✅ Arquivos modificados: ${results.modified}`);
    console.log(`   ❌ Erros: ${results.errors}`);
    console.log(`   📈 Taxa de sucesso: ${results.processed > 0 ? ((results.modified / results.processed) * 100).toFixed(2) + '%' : '0%'}`);
    
    if (results.modified > 0) {
        console.log('\n📋 Principais correções CSS aplicadas:');
        const allDetails = results.modifications.flatMap(r => r.details);
        const uniqueDetails = [...new Set(allDetails)];
        uniqueDetails.forEach(detail => {
            console.log(`   • ${detail}`);
        });
    }
    
    console.log(`\n🛡️ Backups criados: ${results.backups.length}`);
    
    if (results.errors > 0) {
        console.log('\n⚠️ ATENÇÃO: Alguns arquivos tiveram erros');
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    fixCssPrefixOrder,
    processAllHtmlFiles
};
