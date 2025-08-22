const fs = require('fs');
const path = require('path');

// Função para fazer backup do arquivo
function backupFile(filePath) {
    const backupPath = filePath + '.backup';
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📋 Backup criado: ${backupPath}`);
    }
}

// Função para verificar se uma string contém texto discernível
function hasDiscernibleText(text) {
    return text && text.trim().length > 0;
}

// Função para corrigir problemas de acessibilidade de forma criteriosa
function fixAccessibilityIssues(filePath) {
    try {
        backupFile(filePath);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let modifications = [];

        // 1. Corrigir botões de fechar modal (apenas se não tiverem aria-label)
        content = content.replace(
            /<button([^>]*?)class="btn-close"([^>]*?)>/g,
            (match, before, after) => {
                if (!match.includes('aria-label')) {
                    modifications.push('Botão de fechar modal sem aria-label');
                    return `<button${before}class="btn-close"${after}aria-label="Fechar modal">`;
                }
                return match;
            }
        );

        // 2. Corrigir botões sem texto discernível (apenas se realmente não tiverem texto)
        content = content.replace(
            /<button([^>]*?)onclick="([^"]*?)"([^>]*?)>([^<]*?)<\/button>/g,
            (match, before, onclick, after, text) => {
                if (!hasDiscernibleText(text) && !match.includes('aria-label') && !match.includes('title')) {
                    // Determinar o tipo de ação baseado no onclick
                    let actionType = 'Botão de ação';
                    if (onclick.includes('closeModal')) actionType = 'Fechar modal';
                    else if (onclick.includes('selectPlan')) actionType = 'Selecionar plano';
                    else if (onclick.includes('filter')) actionType = 'Filtrar';
                    else if (onclick.includes('refresh')) actionType = 'Atualizar';
                    else if (onclick.includes('create')) actionType = 'Criar';
                    else if (onclick.includes('view')) actionType = 'Visualizar';
                    else if (onclick.includes('update')) actionType = 'Atualizar';
                    else if (onclick.includes('schedule')) actionType = 'Agendar';
                    
                    modifications.push(`Botão sem texto discernível: ${actionType}`);
                    return `<button${before}onclick="${onclick}"${after}aria-label="${actionType}">${text}</button>`;
                }
                return match;
            }
        );

        // 3. Corrigir selects sem aria-label (apenas se não tiverem label associado)
        content = content.replace(
            /<select([^>]*?)class="form-select"([^>]*?)>/g,
            (match, before, after) => {
                if (!match.includes('aria-label') && !match.includes('id=')) {
                    modifications.push('Select sem aria-label');
                    return `<select${before}class="form-select"${after}aria-label="Seleção">`;
                }
                return match;
            }
        );

        // 4. Corrigir inputs sem aria-label (apenas se não tiverem label ou placeholder)
        content = content.replace(
            /<input([^>]*?)type="text"([^>]*?)>/g,
            (match, before, after) => {
                if (!match.includes('aria-label') && !match.includes('placeholder') && !match.includes('id=')) {
                    modifications.push('Input sem aria-label');
                    return `<input${before}type="text"${after}aria-label="Campo de texto">`;
                }
                return match;
            }
        );

        // 5. Adicionar aria-hidden para ícones FontAwesome (apenas se não tiverem)
        content = content.replace(
            /<i([^>]*?)class="fas[^"]*?"([^>]*?)>/g,
            (match, before, after) => {
                if (!match.includes('aria-hidden')) {
                    modifications.push('Ícone sem aria-hidden');
                    return `<i${before}class="fas${after}"aria-hidden="true">`;
                }
                return match;
            }
        );

        // 6. Adicionar -webkit-backdrop-filter para compatibilidade Safari (apenas se não existir)
        content = content.replace(
            /backdrop-filter:\s*blur\(([^)]+)\);/g,
            (match, blurValue) => {
                if (!content.includes('-webkit-backdrop-filter')) {
                    modifications.push('Adicionado -webkit-backdrop-filter para Safari');
                    return `backdrop-filter: blur(${blurValue});\n            -webkit-backdrop-filter: blur(${blurValue});`;
                }
                return match;
            }
        );

        // 7. Corrigir botões de submit sem aria-label
        content = content.replace(
            /<button([^>]*?)type="submit"([^>]*?)>([^<]*?)<\/button>/g,
            (match, before, after, text) => {
                if (!match.includes('aria-label') && !hasDiscernibleText(text)) {
                    modifications.push('Botão submit sem aria-label');
                    return `<button${before}type="submit"${after}aria-label="Enviar formulário">${text}</button>`;
                }
                return match;
            }
        );

        // 8. Corrigir links sem aria-label (apenas se não tiverem texto)
        content = content.replace(
            /<a([^>]*?)onclick="([^"]*?)"([^>]*?)>([^<]*?)<\/a>/g,
            (match, before, onclick, after, text) => {
                if (!hasDiscernibleText(text) && !match.includes('aria-label')) {
                    let actionType = 'Link de navegação';
                    if (onclick.includes('showTab')) actionType = 'Abrir aba';
                    
                    modifications.push(`Link sem texto discernível: ${actionType}`);
                    return `<a${before}onclick="${onclick}"${after}aria-label="${actionType}">${text}</a>`;
                }
                return match;
            }
        );

        // Salvar arquivo apenas se houve modificações
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Corrigido: ${filePath}`);
            console.log(`   Modificações: ${modifications.join(', ')}`);
            return true;
        }

        return false;
    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error.message);
        return false;
    }
}

// Função para validar se as correções não quebraram o HTML
function validateHtml(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Verificações básicas de integridade
        const issues = [];
        
        // Verificar se todos os botões têm fechamento
        const buttonMatches = content.match(/<button[^>]*>/g) || [];
        const buttonClosings = content.match(/<\/button>/g) || [];
        if (buttonMatches.length !== buttonClosings.length) {
            issues.push('Botões não balanceados');
        }
        
        // Verificar se todos os selects têm fechamento
        const selectMatches = content.match(/<select[^>]*>/g) || [];
        const selectClosings = content.match(/<\/select>/g) || [];
        if (selectMatches.length !== selectClosings.length) {
            issues.push('Selects não balanceados');
        }
        
        // Verificar se há aspas duplas não fechadas
        const quotes = content.match(/"/g) || [];
        if (quotes.length % 2 !== 0) {
            issues.push('Aspas duplas não balanceadas');
        }
        
        if (issues.length > 0) {
            console.error(`⚠️  Problemas detectados em ${filePath}:`, issues);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(`❌ Erro ao validar ${filePath}:`, error.message);
        return false;
    }
}

// Função para processar todos os arquivos HTML
function processHtmlFiles(directory) {
    const files = fs.readdirSync(directory);
    let totalFixed = 0;
    let totalValidated = 0;

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const result = processHtmlFiles(filePath);
            totalFixed += result.fixed;
            totalValidated += result.validated;
        } else if (file.endsWith('.html')) {
            if (fixAccessibilityIssues(filePath)) {
                totalFixed++;
                if (validateHtml(filePath)) {
                    totalValidated++;
                } else {
                    console.error(`❌ Validação falhou para ${filePath}`);
                }
            }
        }
    });

    return { fixed: totalFixed, validated: totalValidated };
}

// Função para restaurar backup se necessário
function restoreBackup(filePath) {
    const backupPath = filePath + '.backup';
    if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, filePath);
        console.log(`🔄 Backup restaurado: ${filePath}`);
        return true;
    }
    return false;
}

// Executar correções
console.log('🔧 Iniciando correção criteriosa de problemas de acessibilidade...');
console.log('📋 Criando backups automáticos...');

const frontendDir = path.join(__dirname, '..', 'frontend', 'public');
const result = processHtmlFiles(frontendDir);

console.log(`\n🎉 Correção concluída!`);
console.log(`   ✅ ${result.fixed} arquivos foram corrigidos`);
console.log(`   ✅ ${result.validated} arquivos foram validados`);
console.log(`   📋 Backups criados para todos os arquivos processados`);

console.log('\n📋 Problemas corrigidos:');
console.log('   ✅ Botões sem texto discernível');
console.log('   ✅ Formulários sem labels acessíveis');
console.log('   ✅ Selects sem nomes acessíveis');
console.log('   ✅ Ícones sem aria-hidden');
console.log('   ✅ Compatibilidade Safari (backdrop-filter)');
console.log('   ✅ Links sem texto discernível');

console.log('\n🛡️  Segurança:');
console.log('   📋 Backups automáticos criados');
console.log('   ✅ Validação de integridade HTML');
console.log('   🔄 Para restaurar: node scripts/restore-backups.js');

// Salvar log das correções
const logPath = path.join(__dirname, 'accessibility-fix.log');
const logContent = `Correção de Acessibilidade - ${new Date().toISOString()}
Arquivos corrigidos: ${result.fixed}
Arquivos validados: ${result.validated}
Timestamp: ${new Date().toISOString()}
`;

fs.writeFileSync(logPath, logContent);
console.log(`📝 Log salvo em: ${logPath}`);
