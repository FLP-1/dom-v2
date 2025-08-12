const fs = require('fs');
const path = require('path');

class SyntaxFixer {
  constructor() {
    this.frontendPath = path.join(__dirname, '..', 'frontend', 'src');
    this.backupPath = path.join(__dirname, '..', 'frontend', 'backup-syntax-fixer');
  }

  async createBackup() {
    if (!fs.existsSync(this.backupPath)) {
      fs.mkdirSync(this.backupPath, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(this.backupPath, `backup-${timestamp}`);
    fs.mkdirSync(backupDir, { recursive: true });
    
    console.log(`📦 Criando backup em: ${backupDir}`);
    
    // Copiar arquivos para backup
    const copyRecursive = (src, dest) => {
      if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(file => {
          copyRecursive(path.join(src, file), path.join(dest, file));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };
    
    copyRecursive(this.frontendPath, path.join(backupDir, 'src'));
    return backupDir;
  }

  async fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // 1. Corrigir comentários de chaves de fechamento
      const closingBracePatterns = [
        // Remover comentários de chaves de fechamento
        { pattern: /\/\/ \};/g, replacement: '};' },
        { pattern: /\/\/ \};/g, replacement: '};' },
        
        // Corrigir funções comentadas que deixaram o corpo
        { pattern: /\/\/ const (\w+) = useCallback\(async \(\) => \{/g, replacement: 'const $1 = useCallback(async () => {' },
        { pattern: /\/\/ const (\w+) = \(\) => \{/g, replacement: 'const $1 = () => {' },
        
        // Corrigir imports comentados
        { pattern: /\/\/ import \{ (\w+) \}/g, replacement: 'import { $1 }' },
        
        // Corrigir variáveis comentadas
        { pattern: /\/\/ const \[(\w+)\]/g, replacement: 'const [$1]' },
        { pattern: /\/\/ const \[(\w+), (\w+)\]/g, replacement: 'const [$1, $2]' },
        
        // Corrigir parâmetros comentados
        { pattern: /\/\/ (\w+)\?: unknown;/g, replacement: '$1?: unknown;' },
        { pattern: /\/\/ (\w+),/g, replacement: '$1,' },
        
        // Corrigir chamadas comentadas
        { pattern: /\/\/ (\w+)\(/g, replacement: '$1(' },
        { pattern: /\/\/ (\w+);/g, replacement: '$1;' }
      ];

      closingBracePatterns.forEach(({ pattern, replacement }) => {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          modified = true;
          console.log(`  ✅ Corrigido padrão em ${path.basename(filePath)}`);
        }
      });

      // 2. Remover linhas vazias duplicadas
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

      // 3. Remover imports vazios
      content = content.replace(/import\s+{\s*}\s+from\s+['"][^'"]+['"];?\n/g, '');

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Arquivo ${path.basename(filePath)} corrigido`);
      }

      return modified;
    } catch (error) {
      console.error(`  ❌ Erro ao corrigir ${filePath}:`, error.message);
      return false;
    }
  }

  async fixAllFiles() {
    console.log('🔧 Iniciando correção de erros de sintaxe...');
    
    const backupDir = await this.createBackup();
    console.log(`📦 Backup criado em: ${backupDir}`);

    const filesToFix = [
      'hooks/useESocialData.ts',
      'hooks/usePayrollData.ts', 
      'hooks/useUserProfile.ts',
      'screens/ESocialScreen.tsx',
      'screens/HRScreen.tsx',
      'screens/PayrollScreen.tsx',
      'screens/ThemeSettingsScreen.tsx'
    ];

    let fixedCount = 0;
    let errorCount = 0;

    for (const file of filesToFix) {
      const filePath = path.join(this.frontendPath, file);
      if (fs.existsSync(filePath)) {
        console.log(`\n🔧 Processando: ${file}`);
        const fixed = await this.fixFile(filePath);
        if (fixed) {
          fixedCount++;
        } else {
          errorCount++;
        }
      } else {
        console.log(`⚠️  Arquivo não encontrado: ${file}`);
      }
    }

    console.log(`\n📊 Resumo da correção:`);
    console.log(`  ✅ Arquivos corrigidos: ${fixedCount}`);
    console.log(`  ❌ Erros: ${errorCount}`);
    console.log(`  📦 Backup salvo em: ${backupDir}`);

    if (errorCount === 0) {
      console.log('\n🎉 Correção concluída com sucesso!');
    } else {
      console.log('\n⚠️  Alguns erros ocorreram durante a correção.');
    }
  }
}

// Executar correção
const fixer = new SyntaxFixer();
fixer.fixAllFiles().catch(console.error);
