const fs = require('fs');
const path = require('path');

class ESLintCleaner {
  constructor() {
    this.frontendPath = path.join(__dirname, '..', 'frontend', 'src');
    this.backupPath = path.join(__dirname, '..', 'frontend', 'backup-eslint-cleaner');
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

  async cleanFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // 1. Corrigir 'any' types específicos
      const anyPatterns = [
        // useESocialData.ts linha 43
        { 
          pattern: /eventData: Record<string, any>/g, 
          replacement: 'eventData: Record<string, unknown>' 
        },
        // HRScreen.tsx linha 33
        { 
          pattern: /editingEmployee, setEditingEmployee] = useState<any>/g, 
          replacement: 'editingEmployee, setEditingEmployee] = useState<unknown>' 
        }
      ];

      anyPatterns.forEach(({ pattern, replacement }) => {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          modified = true;
          console.log(`  ✅ Corrigido 'any' type em ${path.basename(filePath)}`);
        }
      });

      // 2. Remover variáveis não utilizadas específicas
      const unusedVars = [
        // usePayrollData.ts
        { pattern: /const \[currentPeriod, setCurrentPeriod\]/g, replacement: 'const [currentPeriod]' },
        
        // useUserProfile.ts - remover parâmetros não utilizados
        { pattern: /\(\[_, enabled\]\) => enabled\)/g, replacement: '([, enabled]) => enabled)' },
        { pattern: /\(\[permission, _\]\) => permission\)/g, replacement: '([permission]) => permission)' },
        
        // ESocialScreen.tsx
        { pattern: /const \[showCertificateModal, setShowCertificateModal\]/g, replacement: 'const [showCertificateModal]' },
        { pattern: /const \[showConfigModal, setShowConfigModal\]/g, replacement: 'const [showConfigModal]' },
        { pattern: /const handleCreateCertificate = useCallback/g, replacement: '// const handleCreateCertificate = useCallback' },
        { pattern: /const handleUpdateConfig = useCallback/g, replacement: '// const handleUpdateConfig = useCallback' },
        
        // PayrollScreen.tsx
        { pattern: /const \[selectedPeriod\]/g, replacement: '// const [selectedPeriod]' },
        { pattern: /const \[currentPeriod\]/g, replacement: '// const [currentPeriod]' },
        
        // ThemeSettingsScreen.tsx
        { pattern: /import \{ BaseButton \}/g, replacement: '// import { BaseButton }' },
        { pattern: /navigation\?: unknown;/g, replacement: '// navigation?: unknown;' },
        { pattern: /navigation,/g, replacement: '// navigation,' },
        { pattern: /const \[systemTheme\]/g, replacement: '// const [systemTheme]' },
        { pattern: /const \[currentProfile\]/g, replacement: '// const [currentProfile]' },
        { pattern: /const handleCustomThemePress = \(\) => \{/g, replacement: '// const handleCustomThemePress = () => {' },
        { pattern: /setShowCustomizer\(true\);/g, replacement: '// setShowCustomizer(true);' },
        { pattern: /\};/g, replacement: '// };' }
      ];

      unusedVars.forEach(({ pattern, replacement }) => {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          modified = true;
          console.log(`  ✅ Removido variável não utilizada em ${path.basename(filePath)}`);
        }
      });

      // 3. Corrigir imports comentados
      content = content.replace(/\/\/ import \{ BaseButton \} from '\.\.\/components\/base\/BaseButton\.tsx';/g, '');

      // 4. Remover linhas vazias duplicadas
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Arquivo ${path.basename(filePath)} limpo`);
      }

      return modified;
    } catch (error) {
      console.error(`  ❌ Erro ao limpar ${filePath}:`, error.message);
      return false;
    }
  }

  async cleanAllFiles() {
    console.log('🧹 Iniciando limpeza de ESLint...');
    
    const backupDir = await this.createBackup();
    console.log(`📦 Backup criado em: ${backupDir}`);

    const filesToClean = [
      'hooks/useESocialData.ts',
      'hooks/usePayrollData.ts', 
      'hooks/useUserProfile.ts',
      'screens/ESocialScreen.tsx',
      'screens/HRScreen.tsx',
      'screens/PayrollScreen.tsx',
      'screens/ThemeSettingsScreen.tsx'
    ];

    let cleanedCount = 0;
    let errorCount = 0;

    for (const file of filesToClean) {
      const filePath = path.join(this.frontendPath, file);
      if (fs.existsSync(filePath)) {
        console.log(`\n🔧 Processando: ${file}`);
        const cleaned = await this.cleanFile(filePath);
        if (cleaned) {
          cleanedCount++;
        } else {
          errorCount++;
        }
      } else {
        console.log(`⚠️  Arquivo não encontrado: ${file}`);
      }
    }

    console.log(`\n📊 Resumo da limpeza:`);
    console.log(`  ✅ Arquivos limpos: ${cleanedCount}`);
    console.log(`  ❌ Erros: ${errorCount}`);
    console.log(`  📦 Backup salvo em: ${backupDir}`);

    if (errorCount === 0) {
      console.log('\n🎉 Limpeza concluída com sucesso!');
    } else {
      console.log('\n⚠️  Alguns erros ocorreram durante a limpeza.');
    }
  }
}

// Executar limpeza
const cleaner = new ESLintCleaner();
cleaner.cleanAllFiles().catch(console.error);
