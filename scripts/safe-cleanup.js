
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
 * - Dependências específicas do contexto
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

const CodebaseProtector = require('./protect-codebase.js');
const fs = require('fs');
const path = require('path');

/**
 * Script de Limpeza Segura do Codebase
 * 
 * Este script remove código JavaScript problemático de forma segura:
 * 1. Cria backup antes de qualquer modificação
 * 2. Valida sintaxe antes e depois
 * 3. Restaura automaticamente em caso de erro
 * 4. Detecta e reporta problemas
 * 
 * Diretrizes seguidas:
 * - Pensamento Crítico: Prevenir corrupção
 * - Qualidade: Garantir integridade
 * - Arquitetura: Proteção sistêmica
 */

const FRONTEND_SRC = path.join(__dirname, '../frontend/src');

// Padrões de limpeza seguros (apenas remoção de código problemático)
const SAFE_CLEANUP_PATTERNS = [
  // Funções JavaScript problemáticas completas
  {
    pattern: /function\s+logStructured\s*\([^)]*\)\s*\{[\s\S]*?\}/g,
    description: 'Função logStructured problemática'
  },
  {
    pattern: /function\s+validateType\s*\([^)]*\)\s*\{[\s\S]*?\}/g,
    description: 'Função validateType problemática'
  },
  {
    pattern: /function\s+assertCritical\s*\([^)]*\)\s*\{[\s\S]*?\}/g,
    description: 'Função assertCritical problemática'
  },
  {
    pattern: /function\s+handleError\s*\([^)]*\)\s*\{[\s\S]*?\}/g,
    description: 'Função handleError problemática'
  },
  
  // Comentários JSDoc problemáticos
  {
    pattern: /\/\*\*[\s\S]*?@alternatives[\s\S]*?\*\//g,
    description: 'Comentário JSDoc @alternatives'
  },
  {
    pattern: /\/\*\*[\s\S]*?@decision[\s\S]*?\*\//g,
    description: 'Comentário JSDoc @decision'
  },
  {
    pattern: /\/\*\*[\s\S]*?@trade-offs[\s\S]*?\*\//g,
    description: 'Comentário JSDoc @trade-offs'
  },
  {
    pattern: /\/\*\*[\s\S]*?@references[\s\S]*?\*\//g,
    description: 'Comentário JSDoc @references'
  },
  {
    pattern: /\/\*\*[\s\S]*?@considerations[\s\S]*?\*\//g,
    description: 'Comentário JSDoc @considerations'
  },
  
  // Chamadas problemáticas
  {
    pattern: /logStructured\([^)]*\);/g,
    description: 'Chamada logStructured'
  },
  {
    pattern: /validateType\([^)]*\);/g,
    description: 'Chamada validateType'
  },
  {
    pattern: /assertCritical\([^)]*\);/g,
    description: 'Chamada assertCritical'
  },
  {
    pattern: /handleError\([^)]*\);/g,
    description: 'Chamada handleError'
  },
  
  // Referências a variáveis não definidas
  {
    pattern: /if\s*\(\s*!validateInput\(inputData\)\s*\)/g,
    description: 'Validação inputData não definida'
  },
  {
    pattern: /if\s*\(\s*!validateType\(data[^)]*\)\s*\)/g,
    description: 'Validação data não definida'
  },
  {
    pattern: /assertCritical\(data[^)]*\)/g,
    description: 'Asserção data não definida'
  },
  
  // Imports problemáticos
  {
    pattern: /import\s*\{\s*logStructured\s*\}\s*from\s*['"][^'"]*logging['"];?/g,
    description: 'Import logStructured problemático'
  },
];

class SafeCleanup {
  constructor() {
    this.protector = new CodebaseProtector();
    this.cleanedFiles = [];
    this.errors = [];
  }

  /**
   * Limpar arquivo de forma segura
   */
  cleanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let cleanedContent = content;
      let changes = 0;
      const fileChanges = [];

      // Aplicar padrões de limpeza
      SAFE_CLEANUP_PATTERNS.forEach(({ pattern, description }) => {
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
    const basicChecks = [
      // Verificar se há chaves balanceadas
      () => {
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;
        return openBraces === closeBraces;
      },
      
      // Verificar se há parênteses balanceados
      () => {
        const openParens = (content.match(/\(/g) || []).length;
        const closeParens = (content.match(/\)/g) || []).length;
        return openParens === closeParens;
      },
      
      // Verificar se não há imports quebrados
      () => {
        return !content.includes('import {') || content.includes('} from');
      },
      
      // Verificar se não há exports quebrados
      () => {
        return !content.includes('export {') || content.includes('}');
      }
    ];

    return basicChecks.every(check => check());
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
   * Executar limpeza segura
   */
  async execute() {
    return await this.protector.executeSafely(async () => {
      this.protector.log('🧹 Iniciando limpeza segura...');

      const result = this.processDirectory(FRONTEND_SRC);

      this.protector.log(`📊 Resultado da limpeza:`);
      this.protector.log(`   - Arquivos processados: ${result.totalFiles}`);
      this.protector.log(`   - Arquivos modificados: ${result.modifiedFiles}`);
      this.protector.log(`   - Taxa de correção: ${((result.modifiedFiles / result.totalFiles) * 100).toFixed(1)}%`);

      if (this.cleanedFiles.length > 0) {
        this.protector.log(`\n📝 Arquivos limpos:`);
        this.cleanedFiles.forEach(file => {
          this.protector.log(`   - ${file.path} (${file.changes} correções)`);
          file.fileChanges.forEach(change => {
            this.protector.log(`     → ${change.description}: ${change.count}x`);
          });
        });
      }

      if (this.errors.length > 0) {
        this.protector.log(`\n❌ Erros encontrados:`);
        this.errors.forEach(error => {
          this.protector.log(`   - ${error}`);
        });
        throw new Error(`${this.errors.length} erros durante a limpeza`);
      }

      this.protector.log(`\n✅ Limpeza segura concluída!`);
      return result;
    });
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const cleanup = new SafeCleanup();
  cleanup.execute()
    .then(result => {
      console.log('🎉 Limpeza concluída com sucesso!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Erro durante limpeza:', error.message);
      process.exit(1);
    });
}

module.exports = SafeCleanup;
