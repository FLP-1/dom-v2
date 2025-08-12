const fs = require('fs');
const path = require('path');

class FinalESLintCleanup {
  constructor() {
    this.frontendPath = path.join(__dirname, '..', 'frontend', 'src');
    this.backupPath = path.join(__dirname, '..', 'frontend', 'backup-final-cleanup');
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

      const fileName = path.basename(filePath);

      // Padrões específicos para cada arquivo
      if (fileName === 'useUserProfile.ts') {
        // Remover parâmetros underscore não utilizados
        content = content.replace(/\(\[_, enabled\]\) => enabled\)/g, '([, enabled]) => enabled)');
        content = content.replace(/\(\[permission, _\]\) => permission\)/g, '([permission]) => permission)');
        modified = true;
      }

      if (fileName === 'ESocialScreen.tsx') {
        // Comentar variáveis não utilizadas
        content = content.replace(/const \[showCertificateModal, setShowCertificateModal\]/g, '// const [showCertificateModal, setShowCertificateModal]');
        content = content.replace(/const \[showConfigModal, setShowConfigModal\]/g, '// const [showConfigModal, setShowConfigModal]');
        content = content.replace(/const handleCreateCertificate = useCallback/g, '// const handleCreateCertificate = useCallback');
        content = content.replace(/const handleUpdateConfig = useCallback/g, '// const handleUpdateConfig = useCallback');
        modified = true;
      }

      if (fileName === 'PayrollScreen.tsx') {
        // Comentar variáveis não utilizadas
        content = content.replace(/const \[selectedPeriod\]/g, '// const [selectedPeriod]');
        content = content.replace(/const \[currentPeriod\]/g, '// const [currentPeriod]');
        modified = true;
      }

      if (fileName === 'ThemeSettingsScreen.tsx') {
        // Comentar variáveis não utilizadas
        content = content.replace(/navigation\?: unknown;/g, '// navigation?: unknown;');
        content = content.replace(/navigation,/g, '// navigation,');
        content = content.replace(/const \[systemTheme\]/g, '// const [systemTheme]');
        content = content.replace(/const \[currentProfile\]/g, '// const [currentProfile]');
        modified = true;
      }

      // Remover linhas vazias duplicadas
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Arquivo ${fileName} limpo`);
      }

      return modified;
    } catch (error) {
      console.error(`  ❌ Erro ao limpar ${filePath}:`, error.message);
      return false;
    }
  }

  async cleanAllFiles() {
    console.log('🧹 Iniciando limpeza final de ESLint...');
    
    const backupDir = await this.createBackup();
    console.log(`📦 Backup criado em: ${backupDir}`);

    const filesToClean = [
      'hooks/useUserProfile.ts',
      'screens/ESocialScreen.tsx',
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
      console.log('\n🎉 Limpeza final concluída com sucesso!');
    } else {
      console.log('\n⚠️  Alguns erros ocorreram durante a limpeza.');
    }
  }
}

// Executar limpeza
const cleaner = new FinalESLintCleanup();
cleaner.cleanAllFiles().catch(console.error);
