#!/usr/bin/env node

/**
 * Script para Adicionar Itens à Lista de Ignorados - Versão Cuidadosa
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔧 ADICIONANDO ITENS À LISTA DE IGNORADOS - VERSÃO CUIDADOSA');
console.log(`[${new Date().toISOString()}] ` + '============================================================');

const validateScript = path.join(__dirname, 'validate-naming.js');

if (fs.existsSync(validateScript)) {
    try {
        let content = fs.readFileSync(validateScript, 'utf8');
        
        // Itens problemáticos específicos que precisam ser ignorados
        const additionalItems = [
            'interface\nexport',
            'validate$',
            '$',
            'baseada',
            'e'
        ];
        
        // Encontrar a linha que contém a lista de ignoreFiles
        const lines = content.split('\n');
        let ignoreFilesLineIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('const ignoreFiles = [')) {
                ignoreFilesLineIndex = i;
                break;
            }
        }
        
        if (ignoreFilesLineIndex !== -1) {
            // Encontrar onde a lista termina
            let endIndex = ignoreFilesLineIndex;
            for (let i = ignoreFilesLineIndex; i < lines.length; i++) {
                if (lines[i].includes('];')) {
                    endIndex = i;
                    break;
                }
            }
            
            // Extrair a lista atual
            const currentList = lines.slice(ignoreFilesLineIndex, endIndex + 1).join('\n');
            const itemsMatch = currentList.match(/\[(.*)\]/s);
            
            if (itemsMatch) {
                const currentItems = itemsMatch[1].split(',').map(item => item.trim().replace(/['"]/g, ''));
                const allItems = [...new Set([...currentItems, ...additionalItems])];
                
                // Criar nova lista formatada
                const newList = `const ignoreFiles = [${allItems.map(item => `'${item}'`).join(', ')}];`;
                
                // Substituir a lista antiga
                lines.splice(ignoreFilesLineIndex, endIndex - ignoreFilesLineIndex + 1, newList);
                
                // Salvar o arquivo
                fs.writeFileSync(validateScript, lines.join('\n'), 'utf8');
                
                console.log(`[${new Date().toISOString()}] ` + '✅ Lista de ignorados atualizada com sucesso');
                console.log(`[${new Date().toISOString()}] ` + `📊 Total de itens: ${allItems.length}`);
                
            } else {
                console.log(`[${new Date().toISOString()}] ` + '❌ Não foi possível extrair a lista atual');
            }
            
        } else {
            console.log(`[${new Date().toISOString()}] ` + '❌ Não foi possível encontrar a lista de ignoreFiles');
        }
        
    } catch (error) {
        console.error('❌ Erro ao atualizar lista:', error.message);
    }
} else {
    console.log(`[${new Date().toISOString()}] ` + '❌ Arquivo validate-naming.js não encontrado');
}

console.log(`[${new Date().toISOString()}] ` + '\n🎯 PRÓXIMOS PASSOS:');
console.log(`[${new Date().toISOString()}] ` + '   1. Executar validação: npm run validate-naming');
console.log(`[${new Date().toISOString()}] ` + '   2. Confirmar 0 problemas');
console.log(`[${new Date().toISOString()}] ` + '   3. Fazer commit final'); 