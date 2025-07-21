#!/usr/bin/env node

/**
 * Script para Verificar Problema no user-profiles.ts - DOM v2
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 VERIFICANDO PROBLEMA NO USER-PROFILES.TS');
console.log(`[${new Date().toISOString()}] ` + '===========================================');

const userProfilesPath = path.join(__dirname, '..', 'frontend', 'src', 'utils', 'user-profiles.ts');

if (fs.existsSync(userProfilesPath)) {
    const content = fs.readFileSync(userProfilesPath, 'utf8');
    
    console.log(`[${new Date().toISOString()}] ` + '📄 CONTEÚDO DO ARQUIVO:');
    console.log(`[${new Date().toISOString()}] ` + '========================');
    
    // Procurar por "interface" seguido de "export"
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('interface') && lines[index + 1] && lines[index + 1].includes('export')) {
            console.log(`[${new Date().toISOString()}] ` + `Linha ${index + 1}: ${line.trim()}`);
            console.log(`[${new Date().toISOString()}] ` + `Linha ${index + 2}: ${lines[index + 1].trim()}`);
            console.log(`[${new Date().toISOString()}] ` + '---');
        }
    });
    
    // Procurar por "interface\nexport"
    if (content.includes('interface\nexport')) {
        console.log(`[${new Date().toISOString()}] ` + '❌ PROBLEMA ENCONTRADO: interface\\nexport');
    } else {
        console.log(`[${new Date().toISOString()}] ` + '✅ NENHUM PROBLEMA ENCONTRADO');
    }
    
    // Mostrar todas as interfaces
    console.log(`[${new Date().toISOString()}] ` + '\n📋 TODAS AS INTERFACES ENCONTRADAS:');
    console.log(`[${new Date().toISOString()}] ` + '===================================');
    const interfaceMatches = content.match(/interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (interfaceMatches) {
        interfaceMatches.forEach(match => {
            const interfaceName = match.replace('interface ', '');
            console.log(`[${new Date().toISOString()}] ` + `✅ ${interfaceName}`);
        });
    }
    
} else {
    console.log(`[${new Date().toISOString()}] ` + '❌ ARQUIVO NÃO ENCONTRADO');
} 