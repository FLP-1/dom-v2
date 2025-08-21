
/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Implementação de funcionalidade
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - TypeScript
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Sistema de Enforcement das Regras TypeScript DOM v2
 * 
 * Este script implementa proteções rigorosas para garantir:
 * 1. Nenhum código JavaScript é introduzido
 * 2. Todas as regras do projeto são respeitadas
 * 3. Validação automática antes de commits
 * 4. Prevenção de corrupção de código
 * 
 * Diretrizes seguidas:
 * - Pensamento Crítico: Prevenir violações antes que aconteçam
 * - Qualidade: Garantir conformidade total
 * - Arquitetura: Proteção sistêmica e automática
 */

const FRONTEND_SRC = path.join(__dirname, '../frontend/src');
const BACKUP_DIR = path.join(__dirname, '../backups');
const LOG_FILE = path.join(__dirname, '../logs/enforcement.log');

// Regras rigorosas do projeto
const PROJECT_RULES = {
  // PROIBIDO: Código JavaScript puro
  FORBIDDEN_JS_PATTERNS: [
    /function\s+\w+\([^)]*\)\s*\{[\s\S]*?data\s*is\s*not\s*defined[\s\S]*?\}/g,
    /function\s+\w+\([^)]*\)\s*\{[\s\S]*?inputData\s*is\s*not\s*defined[\s\S]*?\}/g,
    /logStructured\([^)]*\)/g,
    /validateType\([^)]*\)/g,
    /assertCritical\([^)]*\)/g,
    /handleError\([^)]*\)/g,
    /__filename/g,
    /__dirname/g,
    /arguments\.callee/g,
    /fs\.existsSync/g,
    /path\.join/g,
    /require\([^)]*\)/g,
    /module\.exports/g,
    /exports\./g,
  ],

  // OBRIGATÓRIO: TypeScript
  REQUIRED_TS_PATTERNS: [
    /import\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]/g,
    /export\s+(const|function|interface|type|class)/g,
    /:\s*(string|number|boolean|any|void|object|Array|React\.FC)/g,
  ],

  // PROIBIDO: Comentários problemáticos
  FORBIDDEN_COMMENTS: [
    /\/\*\*[\s\S]*?@alternatives[\s\S]*?\*\//g,
    /\/\*\*[\s\S]*?@decision[\s\S]*?\*\//g,
    /\/\*\*[\s\S]*?@trade-offs[\s\S]*?\*\//g,
    /\/\*\*[\s\S]*?@references[\s\S]*?\*\//g,
    /\/\*\*[\s\S]*?@considerations[\s\S]*?\*\//g,
  ],

  // PROIBIDO: Sintaxe corrompida
  FORBIDDEN_SYNTAX: [
    /function\s+\w+\([^)]*\)\s*\{[\s\S]*?;\s*$/m,
    /if\s*\(\s*!validateInput\([^)]*\)\s*\)/g,
    /if\s*\(\s*!validateType\([^)]*\)\s*\)/g,
    /assertCritical\([^)]*\)/g,
  ]
};

class TypeScriptEnforcer {
  constructor() {
    this.violations = [];
    this.fixes = [];
    this.backupPath = null;
  }

  /**
   * Criar backup antes de qualquer operação
   */
  createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupPath = path.join(BACKUP_DIR, `enforcement-backup-${timestamp}`);
    
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }
      
      // Usar comando Windows para copiar
      execSync(`xcopy "${FRONTEND_SRC}" "${this.backupPath}" /E /I /H /Y`, { stdio: 'pipe' });
      this.log(`✅ Backup criado: ${this.backupPath}`);
      return true;
    } catch (error) {
      this.log(`❌ Erro ao criar backup: ${error.message}`);
      return false;
    }
  }

  /**
   * Detectar violações das regras
   */
  detectViolations() {
    this.violations = [];
    
    const scanDirectory = (dir) => {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          this.analyzeFile(filePath);
        }
      });
    };
    
    scanDirectory(FRONTEND_SRC);
    
    if (this.violations.length > 0) {
      this.log(`🚨 ${this.violations.length} violações das regras detectadas:`);
      this.violations.forEach(violation => {
        this.log(`   - ${violation.file}: ${violation.type} (linha ${violation.line})`);
        this.log(`     → ${violation.description}`);
      });
    } else {
      this.log('✅ Nenhuma violação das regras detectada');
    }
    
    return this.violations;
  }

  /**
   * Analisar arquivo individual
   */
  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // Verificar padrões proibidos
      PROJECT_RULES.FORBIDDEN_JS_PATTERNS.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const lineNumber = this.findLineNumber(content, match);
            this.violations.push({
              file: filePath,
              type: 'FORBIDDEN_JS_CODE',
              line: lineNumber,
              description: `Código JavaScript proibido: ${match.substring(0, 50)}...`,
              pattern: pattern.toString(),
              match: match
            });
          });
        }
      });

      // Verificar comentários proibidos
      PROJECT_RULES.FORBIDDEN_COMMENTS.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const lineNumber = this.findLineNumber(content, match);
            this.violations.push({
              file: filePath,
              type: 'FORBIDDEN_COMMENT',
              line: lineNumber,
              description: `Comentário proibido detectado`,
              pattern: pattern.toString(),
              match: match
            });
          });
        }
      });

      // Verificar sintaxe corrompida
      PROJECT_RULES.FORBIDDEN_SYNTAX.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const lineNumber = this.findLineNumber(content, match);
            this.violations.push({
              file: filePath,
              type: 'CORRUPTED_SYNTAX',
              line: lineNumber,
              description: `Sintaxe corrompida detectada`,
              pattern: pattern.toString(),
              match: match
            });
          });
        }
      });

    } catch (error) {
      this.log(`❌ Erro ao analisar ${filePath}: ${error.message}`);
    }
  }

  /**
   * Encontrar número da linha onde está o match
   */
  findLineNumber(content, match) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(match.substring(0, 20))) {
        return i + 1;
      }
    }
    return 1;
  }

  /**
   * Corrigir violações automaticamente
   */
  fixViolations() {
    this.fixes = [];
    
    this.violations.forEach(violation => {
      try {
        const content = fs.readFileSync(violation.file, 'utf8');
        let fixedContent = content;
        let fixed = false;

        // Remover código JavaScript problemático
        if (violation.type === 'FORBIDDEN_JS_CODE') {
          fixedContent = fixedContent.replace(violation.pattern, '');
          fixed = true;
        }

        // Remover comentários problemáticos
        if (violation.type === 'FORBIDDEN_COMMENT') {
          fixedContent = fixedContent.replace(violation.pattern, '');
          fixed = true;
        }

        // Corrigir sintaxe corrompida
        if (violation.type === 'CORRUPTED_SYNTAX') {
          // Remover funções problemáticas completas
          fixedContent = fixedContent.replace(
            /function\s+\w+\([^)]*\)\s*\{[\s\S]*?;\s*$/gm,
            ''
          );
          fixed = true;
        }

        if (fixed && this.isValidTypeScript(fixedContent)) {
          fs.writeFileSync(violation.file, fixedContent, 'utf8');
          this.fixes.push({
            file: violation.file,
            type: violation.type,
            description: `Corrigido: ${violation.description}`
          });
        }

      } catch (error) {
        this.log(`❌ Erro ao corrigir ${violation.file}: ${error.message}`);
      }
    });

    if (this.fixes.length > 0) {
      this.log(`🔧 ${this.fixes.length} violações corrigidas:`);
      this.fixes.forEach(fix => {
        this.log(`   - ${fix.file}: ${fix.description}`);
      });
    }

    return this.fixes;
  }

  /**
   * Validar se o conteúdo é TypeScript válido
   */
  isValidTypeScript(content) {
    // Verificações básicas
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
      }
    ];

    return checks.every(check => check());
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
   * Executar enforcement completo
   */
  async executeEnforcement() {
    this.log('🛡️  Iniciando enforcement das regras TypeScript...');
    
    // 1. Criar backup
    if (!this.createBackup()) {
      throw new Error('Falha ao criar backup');
    }
    
    // 2. Detectar violações
    const violations = this.detectViolations();
    
    if (violations.length === 0) {
      this.log('✅ Nenhuma violação encontrada - sistema em conformidade');
      return { violations: 0, fixes: 0 };
    }
    
    // 3. Corrigir violações
    const fixes = this.fixViolations();
    
    // 4. Validar resultado
    if (!this.validateTypeScript()) {
      this.log('❌ Sintaxe inválida após correções - restaurando backup...');
      this.restoreBackup();
      throw new Error('Correções introduziram erros de sintaxe');
    }
    
    // 5. Verificar se ainda há violações
    const remainingViolations = this.detectViolations();
    
    this.log(`📊 Resultado do enforcement:`);
    this.log(`   - Violações detectadas: ${violations.length}`);
    this.log(`   - Violações corrigidas: ${fixes.length}`);
    this.log(`   - Violações restantes: ${remainingViolations.length}`);
    
    if (remainingViolations.length > 0) {
      this.log('⚠️  Ainda há violações não corrigidas automaticamente');
    }
    
    return {
      violations: violations.length,
      fixes: fixes.length,
      remaining: remainingViolations.length
    };
  }

  /**
   * Restaurar backup
   */
  restoreBackup() {
    if (!this.backupPath || !fs.existsSync(this.backupPath)) {
      this.log('❌ Backup não encontrado para restauração');
      return false;
    }
    
    try {
      // Remover diretório atual
      execSync(`rmdir /S /Q "${FRONTEND_SRC}"`, { stdio: 'pipe' });
      
      // Restaurar backup
      execSync(`xcopy "${this.backupPath}" "${FRONTEND_SRC}" /E /I /H /Y`, { stdio: 'pipe' });
      this.log(`✅ Backup restaurado: ${this.backupPath}`);
      return true;
    } catch (error) {
      this.log(`❌ Erro ao restaurar backup: ${error.message}`);
      return false;
    }
  }

  /**
   * Log de operações
   */
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    
    console.log(logMessage);
    
    try {
      if (!fs.existsSync(path.dirname(LOG_FILE))) {
        fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
      }
      fs.appendFileSync(LOG_FILE, logMessage + '\n');
    } catch (error) {
      console.error('Erro ao salvar log:', error.message);
    }
  }
}

// Exportar para uso em outros scripts
module.exports = TypeScriptEnforcer;

// Executar se chamado diretamente
if (require.main === module) {
  const enforcer = new TypeScriptEnforcer();
  enforcer.executeEnforcement()
    .then(result => {
      console.log('🎉 Enforcement concluído!');
      process.exit(result.remaining > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('💥 Erro durante enforcement:', error.message);
      process.exit(1);
    });
}
