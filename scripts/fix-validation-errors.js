#!/usr/bin/env node

/**
 * SCRIPT PARA CORRIGIR ERROS DE VALIDAÇÃO
 * Corrige problemas identificados nos scripts de validação
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔧 CORRIGINDO ERROS DE VALIDAÇÃO...\n');

// Lista de scripts com problemas
const scriptsToFix = [
    'validate-performance.js',
    'validate-security.js', 
    'validate-accessibility.js',
    'validate-documentation.js',
    'validate-testing.js',
    'validate-structure.js'
];

let fixedCount = 0;

scriptsToFix.forEach(scriptName => {
    const scriptPath = path.join(__dirname, scriptName);
    
    if (fs.existsSync(scriptPath)) {
        try {
            let content = fs.readFileSync(scriptPath, 'utf8');
            
            // Remover código duplicado (padrão comum nos scripts)
            const lines = content.split('\n');
            const cleanedLines = [];
            let inFunction = false;
            let functionEnded = false;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // Detectar início da função
                if (line.includes('function validate') && !inFunction) {
                    inFunction = true;
                    cleanedLines.push(line);
                    continue;
                }
                
                // Detectar fim da função
                if (inFunction && line.includes('return results;')) {
                    cleanedLines.push(line);
                    functionEnded = true;
                    inFunction = false;
                    continue;
                }
                
                // Pular código duplicado após o fim da função
                if (functionEnded && line.includes('// Validar')) {
                    break;
                }
                
                // Adicionar linha se não estiver duplicada
                if (!inFunction || functionEnded) {
                    cleanedLines.push(line);
                } else {
                    cleanedLines.push(line);
                }
            }
            
            // Reconstruir conteúdo limpo
            const cleanedContent = cleanedLines.join('\n');
            
            // Salvar arquivo corrigido
            fs.writeFileSync(scriptPath, cleanedContent, 'utf8');
            
            console.log(`[${new Date().toISOString()}] ` + `✅ ${scriptName} corrigido`);
            fixedCount++;
            
        } catch (error) {
            console.log(`[${new Date().toISOString()}] ` + `❌ Erro ao corrigir ${scriptName}: ${error.message}`);
        }
    } else {
        console.log(`[${new Date().toISOString()}] ` + `⚠️  ${scriptName} não encontrado`);
    }
});

// Corrigir comando 'qual' no package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        // Verificar se o comando 'qual' existe e corrigir
        if (packageJson.scripts && packageJson.scripts.qual) {
            // Remover comando problemático
            delete packageJson.scripts.qual;
            
            // Salvar package.json corrigido
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
            console.log(`[${new Date().toISOString()}] ` + '✅ Comando "qual" removido do package.json');
            fixedCount++;
        }
    } catch (error) {
        console.log(`[${new Date().toISOString()}] ` + `❌ Erro ao corrigir package.json: ${error.message}`);
    }
}

console.log(`[${new Date().toISOString()}] ` + `\n📊 RESUMO DAS CORREÇÕES:`);
console.log(`[${new Date().toISOString()}] ` + `   🔧 Scripts corrigidos: ${fixedCount}`);
console.log(`[${new Date().toISOString()}] ` + `   🎯 Próximo passo: Testar validações`);

console.log(`[${new Date().toISOString()}] ` + '\n✅ CORREÇÃO DE ERROS CONCLUÍDA!'); 