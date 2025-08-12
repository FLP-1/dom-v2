/**
 * @fileoverview Substituição Inteligente de Código JavaScript
 * @description Substitui código JavaScript problemático por equivalentes TypeScript
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

class IntelligentReplacer {
  constructor() {
    this.replacements = {
      // Logging replacements
      'logStructured\\([^)]*\\)': {
        pattern: /logStructured\(([^)]*)\)/g,
        replacement: (match, args) => {
          // Parse arguments to create proper TypeScript call
          const parts = args.split(',').map(p => p.trim());
          const level = parts[0] || "'info'";
          const message = parts[1] || "''";
          const data = parts[2] || '{}';
          const context = parts[3] || 'undefined';
          
          return `logStructured(${level}, ${message}, ${data}, ${context})`;
        },
        import: "import { logStructured } from '../utils/logging';"
      },
      
      // Validation replacements
      'validateType\\([^)]*\\)': {
        pattern: /validateType\(([^)]*)\)/g,
        replacement: (match, args) => {
          const parts = args.split(',').map(p => p.trim());
          const value = parts[0] || 'value';
          const expectedType = parts[1] || "'object'";
          
          return `typeof ${value} === ${expectedType}`;
        }
      },
      
      // Assertion replacements
      'assertCritical\\([^)]*\\)': {
        pattern: /assertCritical\(([^)]*)\)/g,
        replacement: (match, args) => {
          const parts = args.split(',').map(p => p.trim());
          const condition = parts[0] || 'true';
          const message = parts[1] || "'Assertion failed'";
          
          return `if (!${condition}) throw new Error(${message});`;
        }
      },
      
      // Error handling replacements
      'handleError\\([^)]*\\)': {
        pattern: /handleError\(([^)]*)\)/g,
        replacement: (match, args) => {
          const parts = args.split(',').map(p => p.trim());
          const error = parts[0] || 'error';
          const context = parts[1] || "'unknown'";
          
          return `console.error('Error in ${context}:', ${error});`;
        }
      },
      
      // Node.js globals removal
      '__filename': {
        pattern: /__filename/g,
        replacement: "'frontend-component'"
      },
      
      '__dirname': {
        pattern: /__dirname/g,
        replacement: "process.cwd()"
      },
      
      // File system operations (remove from frontend)
      'fs\\.existsSync': {
        pattern: /fs\.existsSync\([^)]*\)/g,
        replacement: 'false' // Frontend doesn't need file system checks
      },
      
      'fs\\.mkdirSync': {
        pattern: /fs\.mkdirSync\([^)]*\)/g,
        replacement: '// File system operation removed for frontend'
      },
      
      'fs\\.appendFileSync': {
        pattern: /fs\.appendFileSync\([^)]*\)/g,
        replacement: '// File system operation removed for frontend'
      },
      
      'path\\.join': {
        pattern: /path\.join\([^)]*\)/g,
        replacement: "'logs/application.log'"
      }
    };
  }

  async processFile(filePath) {
    try {
      console.log(`🔧 Processando: ${filePath}`);
      
      let content = fs.readFileSync(filePath, 'utf8');
      let hasChanges = false;
      
      // Apply replacements
      for (const [key, config] of Object.entries(this.replacements)) {
        if (config.pattern.test(content)) {
          content = content.replace(config.pattern, config.replacement);
          hasChanges = true;
          console.log(`  ✅ Substituído: ${key}`);
        }
      }
      
      // Add imports if needed
      if (content.includes('logStructured(') && !content.includes('import { logStructured }')) {
        const importStatement = "import { logStructured } from '../utils/logging';";
        content = this.addImport(content, importStatement);
        hasChanges = true;
        console.log(`  ✅ Adicionado import: logStructured`);
      }
      
      if (hasChanges) {
        // Create backup
        const backupPath = filePath + '.backup';
        fs.writeFileSync(backupPath, fs.readFileSync(filePath, 'utf8'));
        
        // Write updated content
        fs.writeFileSync(filePath, content);
        console.log(`  💾 Backup criado: ${backupPath}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`❌ Erro ao processar ${filePath}:`, error.message);
      return false;
    }
  }

  addImport(content, importStatement) {
    // Find the last import statement
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, importStatement);
    } else {
      lines.unshift(importStatement);
    }
    
    return lines.join('\n');
  }

  async processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    let processedCount = 0;
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        processedCount += await this.processDirectory(fullPath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        const wasProcessed = await this.processFile(fullPath);
        if (wasProcessed) processedCount++;
      }
    }
    
    return processedCount;
  }
}

// Main execution
async function main() {
  console.log('🚀 Iniciando Substituição Inteligente de Código JavaScript');
  console.log('=' .repeat(60));
  
  const replacer = new IntelligentReplacer();
  const frontendSrcPath = path.join(__dirname, '..', 'frontend', 'src');
  
  if (!fs.existsSync(frontendSrcPath)) {
    console.error('❌ Diretório frontend/src não encontrado!');
    process.exit(1);
  }
  
  try {
    const processedCount = await replacer.processDirectory(frontendSrcPath);
    
    console.log('=' .repeat(60));
    console.log(`✅ Processamento concluído!`);
    console.log(`📊 Arquivos processados: ${processedCount}`);
    console.log('');
    console.log('🎯 Substituições realizadas:');
    console.log('  • logStructured() → utils/logging.ts');
    console.log('  • validateType() → TypeScript typeof');
    console.log('  • assertCritical() → if/throw statements');
    console.log('  • handleError() → console.error');
    console.log('  • __filename/__dirname → Removidos');
    console.log('  • fs/path operations → Removidos (frontend)');
    console.log('');
    console.log('🔍 Verifique se a aplicação compila corretamente agora!');
    
  } catch (error) {
    console.error('❌ Erro durante o processamento:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = IntelligentReplacer;
