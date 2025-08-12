const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Sistema de Proteção do Codebase DOM v2
 * 
 * Este script implementa proteções para evitar corrupção de código:
 * 1. Validação de sintaxe TypeScript antes de qualquer mudança
 * 2. Backup automático antes de modificações
 * 3. Detecção de código JavaScript problemático
 * 4. Rollback automático em caso de erro
 * 
 * Diretrizes seguidas:
 * - Pensamento Crítico: Prevenir problemas antes que aconteçam
 * - Qualidade: Garantir integridade do código
 * - Arquitetura: Proteção sistêmica
 */

const FRONTEND_SRC = path.join(__dirname, '../frontend/src');
const BACKUP_DIR = path.join(__dirname, '../backups');
const LOG_FILE = path.join(__dirname, '../logs/codebase-protection.log');

// Padrões de código problemático
const PROBLEMATIC_PATTERNS = [
  /data is not defined/,
  /inputData is not defined/,
  /logStructured is not defined/,
  /validateType is not defined/,
  /assertCritical is not defined/,
  /handleError is not defined/,
  /__filename/,
  /__dirname/,
  /arguments\.callee/,
  /fs\.existsSync/,
  /path\.join/,
];

// Padrões de sintaxe corrompida
const CORRUPTED_SYNTAX_PATTERNS = [
  /function\s+\w+\([^)]*\)\s*\{[\s\S]*?;\s*$/m, // Função sem fechamento
  /\/\*\*[\s\S]*?@\w+[\s\S]*?\*\//, // Comentários JSDoc problemáticos
  /if\s*\(\s*!validateInput\([^)]*\)\s*\)/, // Validações problemáticas
  /assertCritical\([^)]*\)/, // Asserções problemáticas
];

class CodebaseProtector {
  constructor() {
    this.backupPath = null;
    this.modifiedFiles = new Set();
  }

  /**
   * Criar backup antes de modificações
   */
  createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);
    
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }
      
      execSync(`cp -r "${FRONTEND_SRC}" "${this.backupPath}"`, { stdio: 'pipe' });
      this.log(`✅ Backup criado: ${this.backupPath}`);
      return true;
    } catch (error) {
      this.log(`❌ Erro ao criar backup: ${error.message}`);
      return false;
    }
  }

  /**
   * Validar sintaxe TypeScript
   */
  validateTypeScript() {
    try {
      this.log('🔍 Validando sintaxe TypeScript...');
      execSync('npx tsc --noEmit', { 
        cwd: path.join(__dirname, '../frontend'),
        stdio: 'pipe' 
      });
      this.log('✅ Sintaxe TypeScript válida');
      return true;
    } catch (error) {
      this.log(`❌ Erro de sintaxe TypeScript: ${error.message}`);
      return false;
    }
  }

  /**
   * Detectar código problemático
   */
  detectProblematicCode() {
    const problematicFiles = [];
    
    const scanDirectory = (dir) => {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Verificar padrões problemáticos
          const hasProblematicCode = PROBLEMATIC_PATTERNS.some(pattern => 
            pattern.test(content)
          );
          
          const hasCorruptedSyntax = CORRUPTED_SYNTAX_PATTERNS.some(pattern => 
            pattern.test(content)
          );
          
          if (hasProblematicCode || hasCorruptedSyntax) {
            problematicFiles.push({
              path: filePath,
              hasProblematicCode,
              hasCorruptedSyntax
            });
          }
        }
      });
    };
    
    scanDirectory(FRONTEND_SRC);
    
    if (problematicFiles.length > 0) {
      this.log(`⚠️  ${problematicFiles.length} arquivos com código problemático detectados:`);
      problematicFiles.forEach(file => {
        this.log(`   - ${file.path}`);
        if (file.hasProblematicCode) this.log(`     → Código JavaScript problemático`);
        if (file.hasCorruptedSyntax) this.log(`     → Sintaxe corrompida`);
      });
    } else {
      this.log('✅ Nenhum código problemático detectado');
    }
    
    return problematicFiles;
  }

  /**
   * Restaurar backup em caso de erro
   */
  restoreBackup() {
    if (!this.backupPath || !fs.existsSync(this.backupPath)) {
      this.log('❌ Backup não encontrado para restauração');
      return false;
    }
    
    try {
      // Remover diretório atual
      execSync(`rm -rf "${FRONTEND_SRC}"`, { stdio: 'pipe' });
      
      // Restaurar backup
      execSync(`cp -r "${this.backupPath}" "${FRONTEND_SRC}"`, { stdio: 'pipe' });
      
      this.log(`✅ Backup restaurado: ${this.backupPath}`);
      return true;
    } catch (error) {
      this.log(`❌ Erro ao restaurar backup: ${error.message}`);
      return false;
    }
  }

  /**
   * Executar operação segura
   */
  async executeSafely(operation) {
    this.log('🛡️  Iniciando operação protegida...');
    
    // 1. Criar backup
    if (!this.createBackup()) {
      throw new Error('Falha ao criar backup');
    }
    
    // 2. Validar estado atual
    const problematicFiles = this.detectProblematicCode();
    if (problematicFiles.length > 0) {
      this.log('⚠️  Código problemático detectado antes da operação');
    }
    
    // 3. Executar operação
    try {
      await operation();
      
      // 4. Validar resultado
      if (!this.validateTypeScript()) {
        throw new Error('Sintaxe TypeScript inválida após operação');
      }
      
      const newProblematicFiles = this.detectProblematicCode();
      if (newProblematicFiles.length > problematicFiles.length) {
        throw new Error('Novos problemas introduzidos pela operação');
      }
      
      this.log('✅ Operação concluída com sucesso');
      return true;
      
    } catch (error) {
      this.log(`❌ Erro durante operação: ${error.message}`);
      this.log('🔄 Restaurando backup...');
      
      if (this.restoreBackup()) {
        this.log('✅ Sistema restaurado com sucesso');
      } else {
        this.log('❌ Falha crítica: Sistema pode estar corrompido');
      }
      
      throw error;
    }
  }

  /**
   * Log de operações
   */
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    
    console.log(logMessage);
    
    // Salvar em arquivo
    try {
      if (!fs.existsSync(path.dirname(LOG_FILE))) {
        fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
      }
      fs.appendFileSync(LOG_FILE, logMessage + '\n');
    } catch (error) {
      console.error('Erro ao salvar log:', error.message);
    }
  }

  /**
   * Limpar backups antigos
   */
  cleanupOldBackups() {
    try {
      if (!fs.existsSync(BACKUP_DIR)) return;
      
      const backups = fs.readdirSync(BACKUP_DIR);
      const now = Date.now();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 dias
      
      backups.forEach(backup => {
        const backupPath = path.join(BACKUP_DIR, backup);
        const stat = fs.statSync(backupPath);
        
        if (now - stat.mtime.getTime() > maxAge) {
          fs.rmSync(backupPath, { recursive: true, force: true });
          this.log(`🗑️  Backup antigo removido: ${backup}`);
        }
      });
    } catch (error) {
      this.log(`❌ Erro ao limpar backups: ${error.message}`);
    }
  }
}

// Exportar para uso em outros scripts
module.exports = CodebaseProtector;

// Executar limpeza se chamado diretamente
if (require.main === module) {
  const protector = new CodebaseProtector();
  protector.cleanupOldBackups();
  protector.detectProblematicCode();
}
