const fs = require('fs');
const path = require('path');

// Função para fazer backup seguro
function createSafeBackup(filePath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.duplicate-ids-backup-${timestamp}`;
    
    try {
        fs.copyFileSync(filePath, backupPath);
        console.log(`🛡️ Backup seguro criado: ${backupPath}`);
        return backupPath;
    } catch (error) {
        console.error(`❌ Erro ao criar backup: ${error.message}`);
        return null;
    }
}

// Função para corrigir IDs duplicados e problemas de acessibilidade
function fixDuplicateIdsAndAccessibility(filePath) {
    const backupPath = createSafeBackup(filePath);
    if (!backupPath) {
        return { success: false, error: 'Falha ao criar backup' };
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let modifications = [];
        
        // 1. CORRIGIR IDs duplicados em inputs
        const inputWithDuplicateIdRegex = /<input([^>]*?id\s*=\s*["']([^"']+)["'][^>]*?id\s*=\s*["']([^"']+)["'][^>]*?)>/g;
        content = content.replace(inputWithDuplicateIdRegex, (match, attrs, id1, id2) => {
            // Remover o segundo ID duplicado
            const cleanedAttrs = attrs.replace(new RegExp(`id\\s*=\\s*["']${id2}["']`), '');
            modifications.push(`ID duplicado removido: ${id2} do input`);
            return `<input${cleanedAttrs}>`;
        });
        
        // 2. CORRIGIR IDs duplicados em outros elementos
        const elementWithDuplicateIdRegex = /<(\w+)([^>]*?id\s*=\s*["']([^"']+)["'][^>]*?id\s*=\s*["']([^"']+)["'][^>]*?)>/g;
        content = content.replace(elementWithDuplicateIdRegex, (match, tag, attrs, id1, id2) => {
            // Remover o segundo ID duplicado
            const cleanedAttrs = attrs.replace(new RegExp(`id\\s*=\\s*["']${id2}["']`), '');
            modifications.push(`ID duplicado removido: ${id2} do elemento ${tag}`);
            return `<${tag}${cleanedAttrs}>`;
        });
        
        // 3. CORRIGIR espaços ausentes em aria-label
        const ariaLabelSpaceRegex = /aria-label\s*=\s*["']([^"']+)["']/g;
        content = content.replace(ariaLabelSpaceRegex, (match, label) => {
            // Verificar se há espaços ausentes
            if (label.includes('aria-label') || label.includes('aria-labelledby')) {
                const fixedLabel = label.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
                modifications.push(`aria-label corrigido: "${label}" → "${fixedLabel}"`);
                return `aria-label="${fixedLabel}"`;
            }
            return match;
        });
        
        // 4. CORRIGIR espaços ausentes em aria-hidden
        const ariaHiddenSpaceRegex = /aria-hidden\s*=\s*["']([^"']+)["']/g;
        content = content.replace(ariaHiddenSpaceRegex, (match, value) => {
            if (value === 'true' || value === 'false') {
                return match; // Já está correto
            }
            // Corrigir se estiver sem espaço
            const fixedValue = value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
            modifications.push(`aria-hidden corrigido: "${value}" → "${fixedValue}"`);
            return `aria-hidden="${fixedValue}"`;
        });
        
        // 5. CORRIGIR espaços ausentes em data-bs-dismiss
        const dataBsDismissSpaceRegex = /data-bs-dismiss\s*=\s*["']([^"']+)["']/g;
        content = content.replace(dataBsDismissSpaceRegex, (match, value) => {
            if (value === 'modal') {
                return match; // Já está correto
            }
            // Corrigir se estiver sem espaço
            const fixedValue = value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
            modifications.push(`data-bs-dismiss corrigido: "${value}" → "${fixedValue}"`);
            return `data-bs-dismiss="${fixedValue}"`;
        });
        
        // 6. CORRIGIR elementos sem labels adequados
        const inputWithoutLabelRegex = /<input([^>]*?)>/g;
        content = content.replace(inputWithoutLabelRegex, (match, attrs) => {
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
        
        // 7. CORRIGIR selects sem labels adequados
        const selectWithoutLabelRegex = /<select([^>]*?)>/g;
        content = content.replace(selectWithoutLabelRegex, (match, attrs) => {
            // Verificar se já tem atributos de acessibilidade
            if (attrs.includes('aria-label=') || attrs.includes('aria-labelledby=') || attrs.includes('title=')) {
                return match; // Já tem, não modificar
            }
            
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
        return {
            success: false,
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
        'frontend/public/notifications-management.html',
        'frontend/public/recruitment-management.html'
    ];
    
    let totalProcessed = 0;
    let totalModified = 0;
    let totalErrors = 0;
    let allModifications = [];
    let backups = [];
    
    console.log(`🎯 Processando ${filesWithIssues.length} arquivos específicos com problemas...\n`);
    
    filesWithIssues.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            totalProcessed++;
            console.log(`📁 Processando: ${filePath}`);
            
            const result = fixDuplicateIdsAndAccessibility(filePath);
            
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
        } else {
            console.log(`⚠️ Arquivo não encontrado: ${filePath}`);
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
    console.log('🔧 Iniciando correção de IDs duplicados e problemas de acessibilidade...\n');
    console.log('🛡️ PLANO B: Backups automáticos\n');
    
    const results = processSpecificFiles();
    
    console.log('\n🎉 Correções concluídas!');
    console.log(`📊 Resumo:`);
    console.log(`   📁 Arquivos processados: ${results.processed}`);
    console.log(`   ✅ Arquivos modificados: ${results.modified}`);
    console.log(`   ❌ Erros: ${results.errors}`);
    console.log(`   📈 Taxa de sucesso: ${results.processed > 0 ? ((results.modified / results.processed) * 100).toFixed(2) + '%' : '0%'}`);
    
    if (results.modified > 0) {
        console.log('\n📋 Principais correções aplicadas:');
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
    fixDuplicateIdsAndAccessibility,
    processSpecificFiles
};
