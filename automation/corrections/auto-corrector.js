/**
 * @fileoverview Sistema de Correções Automáticas Avançado - Fase 5
 * @directory automation/corrections
 * @description Sistema inteligente de correção automática de problemas
 * @created 2024-12-19
 * @lastModified 2025-07-21
 * @author DOM v2 Team
 */

const fs = require('fs');
const path = require('path');

class AutoCorrector {
  constructor() {
    this.corrections = [];
    this.metrics = {
      correctionsApplied: 0,
      filesProcessed: 0,
      errorsFixed: 0,
      timeSaved: 0,
      categories: {
        naming: 0,
        structure: 0,
        imports: 0,
        documentation: 0,
        performance: 0,
        security: 0,
        accessibility: 0,
        testing: 0
      }
    };
    this.rules = this.loadAdvancedCorrectionRules();
    this.config = this.loadConfig();
  }

  loadConfig() {
    const configPath = path.join(__dirname, '..', '..', 'phase5-config.json');
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    return {
      automation: {
        enabled: true,
        maxCorrectionsPerFile: 50,
        backupFiles: true,
        dryRun: false
      }
    };
  }

  loadAdvancedCorrectionRules() {
    return {
      naming: {
        patterns: [
          { 
            find: /variavel_errada/g, 
            replace: 'variavelCorreta',
            description: 'Correção de nomenclatura camelCase',
            category: 'naming'
          },
          { 
            find: /funcao_errada/g, 
            replace: 'funcaoCorreta',
            description: 'Correção de nomenclatura de funções',
            category: 'naming'
          },
          { 
            find: /classe_errada/g, 
            replace: 'ClasseCorreta',
            description: 'Correção de nomenclatura de classes',
            category: 'naming'
          },
          {
            find: /const\s+([a-z_]+)\s*=\s*require\(/g,
            replace: 'const $1 = require(',
            description: 'Padronizar declarações const',
            category: 'naming'
          },
          {
            find: /let\s+([A-Z][a-zA-Z]*)\s*=/g,
            replace: 'const $1 =',
            description: 'Converter let para const quando apropriado',
            category: 'naming'
          }
        ]
      },
      structure: {
        patterns: [
          {
            find: /console\.log\(/g,
            replace: 'console.log(`[${new Date().toISOString()}] ` + ',
            description: 'Adicionar timestamp aos logs',
            category: 'structure'
          },
          {
            find: /\/\/ TODO:/g,
            replace: '/** @todo ',
            description: 'Converter TODO para JSDoc',
            category: 'documentation'
          },
          {
            find: /\/\/ FIXME:/g,
            replace: '/** @fixme ',
            description: 'Converter FIXME para JSDoc',
            category: 'documentation'
          },
          {
            find: /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
            replace: 'function $1(',
            description: 'Padronizar declarações de função',
            category: 'structure'
          },
          {
            find: /=>\s*{/g,
            replace: ' => {',
            description: 'Padronizar arrow functions',
            category: 'structure'
          }
        ]
      },
      imports: {
        patterns: [
          {
            find: /import.*from ['"]\.\.\/\.\.\/\.\.\//g,
            replace: (match) => {
              return match.replace(/\.\.\/\.\.\/\.\.\//g, '../../../');
            },
            description: 'Corrigir imports com muitos níveis',
            category: 'imports'
          },
          {
            find: /require\(['"]\.\.\/\.\.\/\.\.\//g,
            replace: (match) => {
              return match.replace(/\.\.\/\.\.\/\.\.\//g, '../../../');
            },
            description: 'Corrigir requires com muitos níveis',
            category: 'imports'
          },
          {
            find: /import\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g,
            replace: (match, imports, module) => {
              const cleanImports = imports.split(',').map(imp => imp.trim()).join(', ');
              return `import { ${cleanImports} } from '${module}'`;
            },
            description: 'Limpar imports desnecessários',
            category: 'imports'
          }
        ]
      },
      documentation: {
        patterns: [
          {
            find: /\/\*\*\s*\n\s*\*\s*@fileoverview\s*([^*]+)/g,
            replace: (match, description) => {
              return `/**\n * @fileoverview ${description.trim()}\n * @directory ${path.dirname(match)}\n * @description ${description.trim()}\n * @created ${new Date().toISOString().split('T')[0]}\n * @lastModified ${new Date().toISOString().split('T')[0]}\n * @author DOM v2 Team\n */`;
            },
            description: 'Padronizar JSDoc fileoverview',
            category: 'documentation'
          },
          {
            find: /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*{/g,
            replace: (match, funcName) => {
              return `/**\n * ${funcName}\n */\n${match}`;
            },
            description: 'Adicionar JSDoc para funções',
            category: 'documentation'
          }
        ]
      },
      performance: {
        patterns: [
          {
            find: /for\s*\(\s*let\s+i\s*=\s*0;\s*i\s*<\s*([^;]+)\.length;\s*i\+\+\)/g,
            replace: 'for (const item of $1)',
            description: 'Otimizar loops for tradicionais',
            category: 'performance'
          },
          {
            find: /\.forEach\s*\(\s*\([^)]*\)\s*=>\s*{/g,
            replace: (match) => {
              return match.replace(/\.forEach/, '.map');
            },
            description: 'Converter forEach para map quando apropriado',
            category: 'performance'
          }
        ]
      },
      security: {
        patterns: [
          {
            find: /eval\s*\(/g,
            replace: '// SECURITY: eval() removed - use safer alternatives',
            description: 'Remover eval() por segurança',
            category: 'security'
          },
          {
            find: /innerHTML\s*=/g,
            replace: 'textContent =',
            description: 'Substituir innerHTML por textContent',
            category: 'security'
          }
        ]
      },
      accessibility: {
        patterns: [
          {
            find: /<div\s+onclick=/g,
            replace: '<button onclick=',
            description: 'Converter divs clicáveis para buttons',
            category: 'accessibility'
          },
          {
            find: /<img\s+src=/g,
            replace: '<img alt="" src=',
            description: 'Adicionar alt vazio para imagens',
            category: 'accessibility'
          }
        ]
      },
      testing: {
        patterns: [
          {
            find: /describe\s*\(\s*['"]([^'"]+)['"]\s*,\s*\(\)\s*=>\s*{/g,
            replace: 'describe(\'$1\', () => {',
            description: 'Padronizar describe blocks',
            category: 'testing'
          },
          {
            find: /it\s*\(\s*['"]([^'"]+)['"]\s*,\s*\(\)\s*=>\s*{/g,
            replace: 'it(\'$1\', () => {',
            description: 'Padronizar it blocks',
            category: 'testing'
          }
        ]
      }
    };
  }

  async scanDirectory(dirPath) {
    console.log(`🔍 Escaneando diretório: ${dirPath}`);
    
    const files = await this.getFilesRecursively(dirPath);
    this.metrics.filesProcessed = files.length;
    
    console.log(`📁 Encontrados ${files.length} arquivos para análise`);
    
    for (const file of files) {
      await this.processFile(file);
    }
    
    return this.metrics;
  }

  async getFilesRecursively(dirPath) {
    const files = [];
    
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist' && item !== 'build') {
          files.push(...await this.getFilesRecursively(fullPath));
        } else if (stat.isFile() && this.isProcessableFile(item)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Erro ao ler diretório ${dirPath}:`, error.message);
    }
    
    return files;
  }

  isProcessableFile(filename) {
    const extensions = ['.js', '.ts', '.tsx', '.jsx', '.json', '.md', '.html', '.css'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  async processFile(filePath) {
    try {
      console.log(`📄 Processando: ${path.basename(filePath)}`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      let modifiedContent = content;
      let correctionsInFile = 0;
      
      // Aplicar correções por categoria
      for (const [category, rules] of Object.entries(this.rules)) {
        for (const rule of rules.patterns) {
          const beforeLength = modifiedContent.length;
          
          if (typeof rule.replace === 'function') {
            modifiedContent = modifiedContent.replace(rule.find, rule.replace);
          } else {
            modifiedContent = modifiedContent.replace(rule.find, rule.replace);
          }
          
          const afterLength = modifiedContent.length;
          const changes = Math.abs(afterLength - beforeLength);
          
          if (changes > 0) {
            correctionsInFile++;
            this.recordCorrection(filePath, rule.description, category, changes);
          }
        }
      }
      
      // Salvar arquivo se houve mudanças
      if (modifiedContent !== content && correctionsInFile > 0) {
        if (this.config.automation.backupFiles) {
          await this.createBackup(filePath);
        }
        
        if (!this.config.automation.dryRun) {
          fs.writeFileSync(filePath, modifiedContent, 'utf8');
          console.log(`✅ ${correctionsInFile} correções aplicadas em ${path.basename(filePath)}`);
        } else {
          console.log(`🔍 ${correctionsInFile} correções identificadas em ${path.basename(filePath)} (dry run)`);
        }
      }
      
    } catch (error) {
      console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    }
  }

  async createBackup(filePath) {
    try {
      const backupPath = `${filePath}.backup.${Date.now()}`;
      fs.copyFileSync(filePath, backupPath);
      console.log(`💾 Backup criado: ${path.basename(backupPath)}`);
    } catch (error) {
      console.warn(`⚠️  Erro ao criar backup:`, error.message);
    }
  }

  recordCorrection(filePath, description, category, count) {
    this.corrections.push({
      file: path.basename(filePath),
      description,
      category,
      count,
      timestamp: new Date().toISOString()
    });
    
    this.metrics.correctionsApplied++;
    this.metrics.categories[category]++;
    this.metrics.errorsFixed += count;
  }

  calculateTimeSaved() {
    // Estimativa: 2 minutos por correção manual
    const timePerCorrection = 2; // minutos
    this.metrics.timeSaved = this.metrics.correctionsApplied * timePerCorrection;
    return this.metrics.timeSaved;
  }

  generateReport() {
    this.calculateTimeSaved();
    
    const report = {
      summary: {
        totalCorrections: this.metrics.correctionsApplied,
        filesProcessed: this.metrics.filesProcessed,
        errorsFixed: this.metrics.errorsFixed,
        timeSaved: this.metrics.timeSaved,
        categories: this.metrics.categories
      },
      corrections: this.corrections,
      recommendations: this.generateRecommendations(),
      timestamp: new Date().toISOString()
    };
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.metrics.categories.naming > 0) {
      recommendations.push('📝 Considerar implementar ESLint para nomenclatura');
    }
    
    if (this.metrics.categories.documentation > 0) {
      recommendations.push('📚 Implementar JSDoc automático');
    }
    
    if (this.metrics.categories.performance > 0) {
      recommendations.push('⚡ Revisar padrões de performance');
    }
    
    if (this.metrics.categories.security > 0) {
      recommendations.push('🔒 Implementar auditoria de segurança');
    }
    
    if (this.metrics.categories.accessibility > 0) {
      recommendations.push('♿ Implementar validação de acessibilidade');
    }
    
    return recommendations;
  }

  getMetrics() {
    return this.metrics;
  }
}

module.exports = AutoCorrector; 
module.exports = AutoCorrector; 