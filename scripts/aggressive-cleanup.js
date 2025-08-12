const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script de Limpeza Agressiva - DOM v2
 * 
 * Este script remove COMPLETAMENTE todo código JavaScript problemático:
 * 1. Remove funções problemáticas completas
 * 2. Remove comentários JSDoc problemáticos
 * 3. Remove imports/exports problemáticos
 * 4. Valida sintaxe após limpeza
 * 
 * ⚠️ ATENÇÃO: Este script é AGESSIVO e remove código problemático sem piedade
 */

const FRONTEND_SRC = path.join(__dirname, '../frontend/src');
const BACKUP_DIR = path.join(__dirname, '../backups');

// Padrões de remoção agressiva
const AGGRESSIVE_PATTERNS = [
  // Funções problemáticas completas
  {
    pattern: /function\s+(logStructured|validateType|assertCritical|handleError|validateInput)\s*\([^)]*\)\s*\{[\s\S]*?\}/g,
    description: 'Função problemática completa'
  },
  
  // Comentários JSDoc problemáticos
  {
    pattern: /\/\*\*[\s\S]*?@(alternatives|decision|trade-offs|references|considerations)[\s\S]*?\*\//g,
    description: 'Comentário JSDoc problemático'
  },
  
  // Chamadas problemáticas
  {
    pattern: /(logStructured|validateType|assertCritical|handleError|validateInput)\([^)]*\);/g,
    description: 'Chamada problemática'
  },
  
  // Imports problemáticos
  {
    pattern: /import\s*\{\s*(logStructured|validateType|assertCritical|handleError|validateInput)\s*\}\s*from\s*['"][^'"]*['"];?/g,
    description: 'Import problemático'
  },
  
  // Requires problemáticos
  {
    pattern: /require\([^)]*\);/g,
    description: 'Require problemático'
  },
  
  // Module exports problemáticos
  {
    pattern: /module\.exports\s*=/g,
    description: 'Module exports problemático'
  },
  
  // Exports problemáticos
  {
    pattern: /exports\.\w+\s*=/g,
    description: 'Exports problemático'
  },
  
  // Variáveis globais problemáticas
  {
    pattern: /(__filename|__dirname|arguments\.callee)/g,
    description: 'Variável global problemática'
  },
  
  // Funções Node.js problemáticas (em frontend)
  {
    pattern: /(fs\.existsSync|path\.join)/g,
    description: 'Função Node.js problemática'
  },
  
  // Validações problemáticas
  {
    pattern: /if\s*\(\s*!(validateInput|validateType)\([^)]*\)\s*\)/g,
    description: 'Validação problemática'
  },
  
  // Asserções problemáticas
  {
    pattern: /assertCritical\([^)]*\)/g,
    description: 'Asserção problemática'
  },
  
  // Blocos de código problemáticos
  {
    pattern: /\{\s*\/\*\*[\s\S]*?@\w+[\s\S]*?\*\/[\s\S]*?\}/g,
    description: 'Bloco com comentário problemático'
  }
];

class AggressiveCleanup {
  constructor() {
    this.cleanedFiles = [];
    this.errors = [];
    this.backupPath = null;
  }

  /**
   * Criar backup antes da limpeza
   */
  createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupPath = path.join(BACKUP_DIR, `aggressive-cleanup-${timestamp}`);
    
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }
      
      execSync(`xcopy "${FRONTEND_SRC}" "${this.backupPath}" /E /I /H /Y`, { stdio: 'pipe' });
      console.log(`✅ Backup criado: ${this.backupPath}`);
      return true;
    } catch (error) {
      console.error(`❌ Erro ao criar backup: ${error.message}`);
      return false;
    }
  }

  /**
   * Limpar arquivo agressivamente
   */
  cleanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let cleanedContent = content;
      let changes = 0;
      const fileChanges = [];

      // Aplicar padrões de limpeza agressiva
      AGGRESSIVE_PATTERNS.forEach(({ pattern, description }) => {
        const matches = cleanedContent.match(pattern);
        if (matches) {
          const originalLength = cleanedContent.length;
          cleanedContent = cleanedContent.replace(pattern, '');
          const removedLength = originalLength - cleanedContent.length;
          
          changes += matches.length;
          fileChanges.push({
            description,
            count: matches.length,
            removedBytes: removedLength
          });
        }
      });

      // Remover linhas vazias excessivas
      const originalLength = cleanedContent.length;
      cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
      const whitespaceRemoved = originalLength - cleanedContent.length;

      if (changes > 0 || whitespaceRemoved > 0) {
        // Validar que o arquivo ainda é válido
        if (this.isValidTypeScript(cleanedContent)) {
          fs.writeFileSync(filePath, cleanedContent, 'utf8');
          
          this.cleanedFiles.push({
            path: filePath,
            changes,
            fileChanges,
            whitespaceRemoved
          });
          
          return true;
        } else {
          this.errors.push(`Arquivo ficou inválido após limpeza: ${filePath}`);
          return false;
        }
      }

      return false;
    } catch (error) {
      this.errors.push(`Erro ao processar ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Validar se o conteúdo é TypeScript válido
   */
  isValidTypeScript(content) {
    // Verificações básicas de sintaxe
    const checks = [
      // Chaves balanceadas
      () => {
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;
        return openBraces === closeBraces;
      },
      
      // Parênteses balanceados
      () => {
        const openParens = (content.match(/\(/g) || []).length;
        const closeParens = (content.match(/\)/g) || []).length;
        return openParens === closeParens;
      },
      
      // Imports válidos
      () => {
        return !content.includes('import {') || content.includes('} from');
      },
      
      // Exports válidos
      () => {
        return !content.includes('export {') || content.includes('}');
      },
      
      // Não ter requires
      () => {
        return !content.includes('require(');
      },
      
      // Não ter module.exports
      () => {
        return !content.includes('module.exports');
      }
    ];

    return checks.every(check => check());
  }

  /**
   * Processar diretório recursivamente
   */
  processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    let totalFiles = 0;
    let modifiedFiles = 0;

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const result = this.processDirectory(filePath);
        totalFiles += result.totalFiles;
        modifiedFiles += result.modifiedFiles;
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        totalFiles++;
        if (this.cleanFile(filePath)) {
          modifiedFiles++;
        }
      }
    });

    return { totalFiles, modifiedFiles };
  }

  /**
   * Validar sintaxe TypeScript
   */
  validateTypeScript() {
    try {
      console.log('🔍 Validando sintaxe TypeScript...');
      execSync('npx tsc --noEmit', { 
        cwd: path.join(__dirname, '../frontend'),
        stdio: 'pipe' 
      });
      console.log('✅ Sintaxe TypeScript válida');
      return true;
    } catch (error) {
      console.error(`❌ Erro de sintaxe TypeScript: ${error.message}`);
      return false;
    }
  }

  /**
   * Restaurar backup
   */
  restoreBackup() {
    if (!this.backupPath || !fs.existsSync(this.backupPath)) {
      console.error('❌ Backup não encontrado para restauração');
      return false;
    }
    
    try {
      execSync(`rmdir /S /Q "${FRONTEND_SRC}"`, { stdio: 'pipe' });
      execSync(`xcopy "${this.backupPath}" "${FRONTEND_SRC}" /E /I /H /Y`, { stdio: 'pipe' });
      console.log(`✅ Backup restaurado: ${this.backupPath}`);
      return true;
    } catch (error) {
      console.error(`❌ Erro ao restaurar backup: ${error.message}`);
      return false;
    }
  }

  /**
   * Executar limpeza agressiva
   */
  async execute() {
    console.log('🧹 Iniciando limpeza agressiva...');
    
    // 1. Criar backup
    if (!this.createBackup()) {
      throw new Error('Falha ao criar backup');
    }
    
    // 2. Processar arquivos
    const result = this.processDirectory(FRONTEND_SRC);
    
    console.log(`📊 Resultado da limpeza agressiva:`);
    console.log(`   - Arquivos processados: ${result.totalFiles}`);
    console.log(`   - Arquivos modificados: ${result.modifiedFiles}`);
    console.log(`   - Taxa de correção: ${((result.modifiedFiles / result.totalFiles) * 100).toFixed(1)}%`);

    if (this.cleanedFiles.length > 0) {
      console.log(`\n📝 Arquivos limpos:`);
      this.cleanedFiles.forEach(file => {
        console.log(`   - ${file.path} (${file.changes} correções)`);
        file.fileChanges.forEach(change => {
          console.log(`     → ${change.description}: ${change.count}x`);
        });
      });
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ Erros encontrados:`);
      this.errors.forEach(error => {
        console.log(`   - ${error}`);
      });
      
      console.log('🔄 Restaurando backup devido a erros...');
      this.restoreBackup();
      throw new Error(`${this.errors.length} erros durante a limpeza`);
    }

    // 3. Validar resultado
    if (!this.validateTypeScript()) {
      console.log('❌ Sintaxe inválida após limpeza - restaurando backup...');
      this.restoreBackup();
      throw new Error('Limpeza introduziu erros de sintaxe');
    }

    console.log(`\n✅ Limpeza agressiva concluída com sucesso!`);
    return result;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const cleanup = new AggressiveCleanup();
  cleanup.execute()
    .then(result => {
      console.log('🎉 Limpeza agressiva concluída!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Erro durante limpeza agressiva:', error.message);
      process.exit(1);
    });
}

module.exports = AggressiveCleanup;
