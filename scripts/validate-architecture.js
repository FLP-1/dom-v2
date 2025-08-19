#!/usr/bin/env node

/**
 * Script de Validação de Arquitetura - DOM v2
 * 
 * Este script valida se o projeto está seguindo a arquitetura HTML nativo
 * conforme definido nas diretrizes do projeto.
 * 
 * @author DOM v2 Team
 * @version 2.0.0
 * @date 2025-08-06
 */

const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
    projectRoot: process.cwd(),
    frontendDir: 'frontend',
    publicDir: 'frontend/public',
    srcDir: 'frontend/src',
    allowedExtensions: ['.html', '.css', '.js'],
    forbiddenExtensions: ['.tsx', '.jsx', '.ts'],
    requiredFiles: [
        'frontend/public/index.html',
        'frontend/public/payments-management.html'
    ],
    documentationFiles: [
        'docs/architecture/ARQUITETURA_FRONTEND_ATUALIZADA.md',
        'docs/directives/diretivas-pensamento-critico.md',
        'docs/migration/PLANO_MIGRACAO_REACT_HTML.md'
    ]
};

// Cores para output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Função para log colorido
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Função para verificar se arquivo existe
function fileExists(filePath) {
    return fs.existsSync(path.join(CONFIG.projectRoot, filePath));
}

// Função para listar arquivos recursivamente
function listFiles(dir, extensions = []) {
    const files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            files.push(...listFiles(fullPath, extensions));
        } else if (stat.isFile()) {
            if (extensions.length === 0 || extensions.some(ext => item.endsWith(ext))) {
                files.push(fullPath);
            }
        }
    }
    
    return files;
}

// Função para validar estrutura de diretórios
function validateDirectoryStructure() {
    log('\n📁 VALIDANDO ESTRUTURA DE DIRETÓRIOS', 'cyan');
    
    const results = {
        publicExists: fileExists(CONFIG.publicDir),
        srcExists: fileExists(CONFIG.srcDir),
        requiredFiles: [],
        documentationFiles: []
    };
    
    // Verificar arquivos obrigatórios
    for (const file of CONFIG.requiredFiles) {
        results.requiredFiles.push({
            file,
            exists: fileExists(file)
        });
    }
    
    // Verificar documentação
    for (const file of CONFIG.documentationFiles) {
        results.documentationFiles.push({
            file,
            exists: fileExists(file)
        });
    }
    
    // Exibir resultados
    log(`✅ Diretório public/ existe: ${results.publicExists ? 'SIM' : 'NÃO'}`, results.publicExists ? 'green' : 'red');
    log(`⚠️  Diretório src/ existe: ${results.srcExists ? 'SIM (LEGADO)' : 'NÃO'}`, results.srcExists ? 'yellow' : 'green');
    
    log('\n📄 ARQUIVOS OBRIGATÓRIOS:', 'cyan');
    for (const item of results.requiredFiles) {
        log(`  ${item.exists ? '✅' : '❌'} ${item.file}`, item.exists ? 'green' : 'red');
    }
    
    log('\n📚 DOCUMENTAÇÃO:', 'cyan');
    for (const item of results.documentationFiles) {
        log(`  ${item.exists ? '✅' : '❌'} ${item.file}`, item.exists ? 'green' : 'red');
    }
    
    return results;
}

// Função para validar arquivos HTML nativo
function validateHtmlNativeFiles() {
    log('\n🎯 VALIDANDO ARQUIVOS HTML NATIVO', 'cyan');
    
    const publicDir = path.join(CONFIG.projectRoot, CONFIG.publicDir);
    const htmlFiles = listFiles(publicDir, ['.html']);
    
    log(`📊 Total de arquivos HTML encontrados: ${htmlFiles.length}`, 'blue');
    
    const results = {
        totalFiles: htmlFiles.length,
        validFiles: [],
        invalidFiles: []
    };
    
    for (const file of htmlFiles) {
        const relativePath = path.relative(CONFIG.projectRoot, file);
        const content = fs.readFileSync(file, 'utf8');
        
        // Validar estrutura básica HTML
        const hasDoctype = content.includes('<!DOCTYPE html>');
        const hasHtmlTag = content.includes('<html');
        const hasHeadTag = content.includes('<head>');
        const hasBodyTag = content.includes('<body>');
        const hasViewport = content.includes('viewport');
        const hasTitle = content.includes('<title>');
        
        const isValid = hasDoctype && hasHtmlTag && hasHeadTag && hasBodyTag && hasViewport && hasTitle;
        
        if (isValid) {
            results.validFiles.push(relativePath);
            log(`  ✅ ${relativePath}`, 'green');
        } else {
            results.invalidFiles.push(relativePath);
            log(`  ❌ ${relativePath}`, 'red');
        }
    }
    
    return results;
}

// Função para detectar arquivos React obsoletos
function detectReactFiles() {
    log('\n⚠️  DETECTANDO ARQUIVOS REACT OBSOLETOS', 'yellow');
    
    const srcDir = path.join(CONFIG.projectRoot, CONFIG.srcDir);
    const reactFiles = listFiles(srcDir, CONFIG.forbiddenExtensions);
    
    log(`📊 Total de arquivos React encontrados: ${reactFiles.length}`, 'yellow');
    
    const results = {
        totalFiles: reactFiles.length,
        files: reactFiles.map(file => path.relative(CONFIG.projectRoot, file))
    };
    
    for (const file of results.files) {
        log(`  ⚠️  ${file} (OBSOLETO)`, 'yellow');
    }
    
    return results;
}

// Função para validar package.json
function validatePackageJson() {
    log('\n📦 VALIDANDO PACKAGE.JSON', 'cyan');
    
    const packagePath = path.join(CONFIG.projectRoot, 'frontend/package.json');
    
    if (!fileExists('frontend/package.json')) {
        log('❌ package.json não encontrado', 'red');
        return { exists: false };
    }
    
    try {
        const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        const dependencies = packageContent.dependencies || {};
        const devDependencies = packageContent.devDependencies || {};
        
        const allDeps = { ...dependencies, ...devDependencies };
        
        // Verificar dependências proibidas
        const forbiddenDeps = [
            'react', 'react-dom', 'react-native', 'react-native-web',
            'vue', 'angular', '@angular', 'next', 'nuxt'
        ];
        
        const foundForbidden = forbiddenDeps.filter(dep => allDeps[dep]);
        
        log(`📊 Total de dependências: ${Object.keys(allDeps).length}`, 'blue');
        
        if (foundForbidden.length > 0) {
            log('❌ Dependências proibidas encontradas:', 'red');
            for (const dep of foundForbidden) {
                log(`  ❌ ${dep}`, 'red');
            }
        } else {
            log('✅ Nenhuma dependência proibida encontrada', 'green');
        }
        
        return {
            exists: true,
            totalDeps: Object.keys(allDeps).length,
            forbiddenDeps: foundForbidden
        };
        
    } catch (error) {
        log(`❌ Erro ao ler package.json: ${error.message}`, 'red');
        return { exists: false, error: error.message };
    }
}

// Função principal
function main() {
    log('🏗️  VALIDAÇÃO DE ARQUITETURA - DOM V2', 'bright');
    log('=====================================', 'bright');
    
    const startTime = Date.now();
    
    // Executar validações
    const dirStructure = validateDirectoryStructure();
    const htmlFiles = validateHtmlNativeFiles();
    const reactFiles = detectReactFiles();
    const packageValidation = validatePackageJson();
    
    // Calcular score
    let score = 0;
    let totalChecks = 0;
    
    // Diretório public existe
    totalChecks++;
    if (dirStructure.publicExists) score++;
    
    // Arquivos obrigatórios
    totalChecks += dirStructure.requiredFiles.length;
    score += dirStructure.requiredFiles.filter(f => f.exists).length;
    
    // Documentação
    totalChecks += dirStructure.documentationFiles.length;
    score += dirStructure.documentationFiles.filter(f => f.exists).length;
    
    // Arquivos HTML válidos
    totalChecks++;
    if (htmlFiles.totalFiles > 0) score++;
    
    // Sem dependências proibidas
    totalChecks++;
    if (packageValidation.exists && packageValidation.forbiddenDeps.length === 0) score++;
    
    const percentage = Math.round((score / totalChecks) * 100);
    
    // Resultado final
    log('\n📊 RESULTADO FINAL', 'bright');
    log('==================', 'bright');
    log(`🎯 Score de Arquitetura: ${score}/${totalChecks} (${percentage}%)`, percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red');
    
    if (percentage >= 80) {
        log('✅ Arquitetura HTML nativo está sendo seguida corretamente!', 'green');
    } else if (percentage >= 60) {
        log('⚠️  Arquitetura precisa de ajustes menores', 'yellow');
    } else {
        log('❌ Arquitetura precisa de correções significativas', 'red');
    }
    
    // Recomendações
    log('\n💡 RECOMENDAÇÕES:', 'cyan');
    
    if (reactFiles.totalFiles > 0) {
        log(`  🔄 Migrar ${reactFiles.totalFiles} arquivos React para HTML nativo`, 'yellow');
    }
    
    if (packageValidation.forbiddenDeps.length > 0) {
        log('  🧹 Remover dependências React do package.json', 'yellow');
    }
    
    if (htmlFiles.invalidFiles.length > 0) {
        log(`  🔧 Corrigir ${htmlFiles.invalidFiles.length} arquivos HTML inválidos`, 'yellow');
    }
    
    const endTime = Date.now();
    log(`\n⏱️  Tempo de execução: ${endTime - startTime}ms`, 'blue');
    
    // Exit code
    process.exit(percentage >= 80 ? 0 : 1);
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    validateDirectoryStructure,
    validateHtmlNativeFiles,
    detectReactFiles,
    validatePackageJson,
    main
};
