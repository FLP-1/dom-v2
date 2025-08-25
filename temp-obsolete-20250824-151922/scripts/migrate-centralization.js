
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}

/**
 * @fileoverview Script de Migração para Centralizações - DOM v2
 * @description Script para migrar arquivos antigos e atualizar referências
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

/**
 * Script de migração para centralizações implementadas
 * Migra arquivos antigos e atualiza referências
 */

class CentralizationMigrator {
  constructor() {
    this.migrationLog = [];
    this.errors = [];
    this.stats = {
      filesProcessed: 0,
      filesUpdated: 0,
      importsUpdated: 0,
      messagesCentralized: 0,
      componentsRefactored: 0
    };
  }

  /**
   * Executa a migração completa
   */
  async migrate() {
    console.log('🚀 Iniciando migração de centralizações...\n');

    try {
      // 1. Migrar sistema de mensagens
      await this.migrateMessages();

      // 2. Migrar componentes para usar design tokens
      await this.migrateComponents();

      // 3. Migrar telas para usar componentes base
      await this.migrateScreens();

      // 4. Atualizar imports
      await this.updateImports();

      // 5. Gerar relatório
      this.generateReport();

    } catch (error) {
      console.error('❌ Erro durante migração:', error);
      this.errors.push(error.message);
    }
  }

  /**
   * Migra o sistema de mensagens
   */
  async migrateMessages() {
    console.log('📝 Migrando sistema de mensagens...');

    const messageFiles = [
      'frontend/src/utils/messages.ts',
      'frontend/src/utils/messages-system.ts',
      'frontend/src/utils/simple-notifications.ts',
      'frontend/src/utils/intelligent-notifications.ts'
    ];

    for (const filePath of messageFiles) {
      if (fs.existsSync(filePath)) {
        try {
          // Backup do arquivo original
          const backupPath = `${filePath}.backup`;
          fs.copyFileSync(filePath, backupPath);
          
          // Substitui conteúdo por referência ao sistema centralizado
          const newContent = this.generateMessageMigrationContent(filePath);
          fs.writeFileSync(filePath, newContent);
          
          this.stats.filesUpdated++;
          this.migrationLog.push(`✅ Migrado: ${filePath}`);
          
        } catch (error) {
          this.errors.push(`Erro ao migrar ${filePath}: ${error.message}`);
        }
      }
    }
  }

  /**
   * Gera conteúdo de migração para arquivos de mensagens
   */
  generateMessageMigrationContent(filePath) {
    const fileName = path.basename(filePath, '.ts');
    
    return `/**
 * @fileoverview Arquivo migrado - ${fileName}
 * @description Este arquivo foi migrado para o sistema centralizado de mensagens
 * @migrated 2025-01-23
 * @deprecated Use messages-centralized.ts instead
 */

// ⚠️ DEPRECATED: Este arquivo foi migrado para o sistema centralizado
// Use: import { getMessage, Messages } from './messages-centralized';

export { getMessage, Messages, MessagesCentralized } from './messages-centralized';

// Para compatibilidade, mantemos algumas exportações específicas
export const getMessageText = (id: string) => {
  console.warn('getMessageText is deprecated. Use getMessage instead.');
  return getMessage(id);
};

export const getMessageConfig = (id: string) => {
  console.warn('getMessageConfig is deprecated. Use Messages.get instead.');
  return Messages.get(id);
};
`;
  }

  /**
   * Migra componentes para usar design tokens
   */
  async migrateComponents() {
    console.log('🎨 Migrando componentes para design tokens...');

    const componentDirs = [
      'frontend/src/components',
      'frontend/src/components/ui',
      'frontend/src/components/shared'
    ];

    for (const dir of componentDirs) {
      if (fs.existsSync(dir)) {
        await this.migrateComponentsInDirectory(dir);
      }
    }
  }

  /**
   * Migra componentes em um diretório específico
   */
  async migrateComponentsInDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const filePath = path.join(dirPath, file);
        await this.migrateComponentFile(filePath);
      }
    }
  }

  /**
   * Migra um arquivo de componente específico
   */
  async migrateComponentFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;

      // Adiciona import dos design tokens se não existir
      if (!content.includes('design-tokens') && content.includes('StyleSheet.create')) {
        const importStatement = "import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../styles/design-tokens';\n";
        content = importStatement + content;
        updated = true;
      }

      // Substitui cores hardcoded por design tokens
      content = this.replaceHardcodedColors(content);
      
      // Substitui espaçamentos hardcoded
      content = this.replaceHardcodedSpacing(content);

      if (updated) {
        // Backup
        const backupPath = `${filePath}.backup`;
        fs.copyFileSync(filePath, backupPath);
        
        // Salva arquivo atualizado
        fs.writeFileSync(filePath, content);
        
        this.stats.componentsRefactored++;
        this.migrationLog.push(`✅ Componente atualizado: ${filePath}`);
      }

    } catch (error) {
      this.errors.push(`Erro ao migrar componente ${filePath}: ${error.message}`);
    }
  }

  /**
   * Substitui cores hardcoded por design tokens
   */
  replaceHardcodedColors(content) {
    const colorReplacements = {
      '#1e3a8a': 'Colors.primary',
      '#059669': 'Colors.secondary',
      '#f59e0b': 'Colors.accent',
      '#10b981': 'Colors.success',
      '#ef4444': 'Colors.error',
      '#3b82f6': 'Colors.info',
      '#ffffff': 'Colors.background.primary',
      '#f8fafc': 'Colors.background.secondary',
      '#f1f5f9': 'Colors.background.tertiary',
      '#1e293b': 'Colors.text.primary',
      '#475569': 'Colors.text.secondary',
      '#64748b': 'Colors.text.tertiary',
      '#e2e8f0': 'Colors.border.light',
      '#cbd5e1': 'Colors.border.medium',
      '#94a3b8': 'Colors.border.dark'
    };

    for (const [hardcoded, token] of Object.entries(colorReplacements)) {
      const regex = new RegExp(`'${hardcoded}'|"${hardcoded}"`, 'g');
      if (content.match(regex)) {
        content = content.replace(regex, token);
      }
    }

    return content;
  }

  /**
   * Substitui espaçamentos hardcoded por design tokens
   */
  replaceHardcodedSpacing(content) {
    const spacingReplacements = {
      '4': 'Spacing.xs',
      '8': 'Spacing.sm',
      '16': 'Spacing.md',
      '24': 'Spacing.lg',
      '32': 'Spacing.xl',
      '48': 'Spacing.xxl',
      '64': 'Spacing.xxxl'
    };

    for (const [hardcoded, token] of Object.entries(spacingReplacements)) {
      const regex = new RegExp(`\\b${hardcoded}\\b`, 'g');
      if (content.match(regex)) {
        content = content.replace(regex, token);
      }
    }

    return content;
  }

  /**
   * Migra telas para usar componentes base
   */
  async migrateScreens() {
    console.log('📱 Migrando telas para componentes base...');

    const screenDir = 'frontend/src/screens';
    if (!fs.existsSync(screenDir)) return;

    const files = fs.readdirSync(screenDir);
    
    for (const file of files) {
      if (file.endsWith('.tsx') && !file.includes('.test.')) {
        const filePath = path.join(screenDir, file);
        await this.migrateScreenFile(filePath);
      }
    }
  }

  /**
   * Migra um arquivo de tela específico
   */
  async migrateScreenFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;

      // Adiciona import do BaseScreen se não existir
      if (!content.includes('BaseScreen') && content.includes('export default')) {
        const importStatement = "import BaseScreen from '../components/base/BaseScreen';\n";
        content = importStatement + content;
        updated = true;
      }

      // Substitui View principal por BaseScreen
      if (content.includes('<View style={styles.container}>')) {
        content = content.replace(
          /<View style={styles\.container}>/g,
          '<BaseScreen'
        );
        content = content.replace(
          /<\/View>/g,
          '</BaseScreen>'
        );
        updated = true;
      }

      if (updated) {
        // Backup
        const backupPath = `${filePath}.backup`;
        fs.copyFileSync(filePath, backupPath);
        
        // Salva arquivo atualizado
        fs.writeFileSync(filePath, content);
        
        this.stats.filesUpdated++;
        this.migrationLog.push(`✅ Tela migrada: ${filePath}`);
      }

    } catch (error) {
      this.errors.push(`Erro ao migrar tela ${filePath}: ${error.message}`);
    }
  }

  /**
   * Atualiza imports em todo o projeto
   */
  async updateImports() {
    console.log('🔄 Atualizando imports...');

    const directories = [
      'frontend/src/components',
      'frontend/src/screens',
      'frontend/src/hooks',
      'frontend/src/utils'
    ];

    for (const dir of directories) {
      if (fs.existsSync(dir)) {
        await this.updateImportsInDirectory(dir);
      }
    }
  }

  /**
   * Atualiza imports em um diretório específico
   */
  async updateImportsInDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const filePath = path.join(dirPath, file);
        await this.updateImportsInFile(filePath);
      }
    }
  }

  /**
   * Atualiza imports em um arquivo específico
   */
  async updateImportsInFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;

      // Atualiza imports de mensagens
      if (content.includes("from './messages'") || content.includes("from '../messages'")) {
        content = content.replace(
          /from ['"]\.\.?\/messages['"]/g,
          "from './messages-centralized'"
        );
        updated = true;
      }

      // Atualiza imports de design tokens
      if (content.includes("from './design-tokens'") || content.includes("from '../design-tokens'")) {
        content = content.replace(
          /from ['"]\.\.?\/design-tokens['"]/g,
          "from '../../styles/design-tokens'"
        );
        updated = true;
      }

      if (updated) {
        // Backup
        const backupPath = `${filePath}.backup`;
        fs.copyFileSync(filePath, backupPath);
        
        // Salva arquivo atualizado
        fs.writeFileSync(filePath, content);
        
        this.stats.importsUpdated++;
        this.migrationLog.push(`✅ Imports atualizados: ${filePath}`);
      }

    } catch (error) {
      this.errors.push(`Erro ao atualizar imports em ${filePath}: ${error.message}`);
    }
  }

  /**
   * Gera relatório da migração
   */
  generateReport() {
    console.log('\n📊 RELATÓRIO DE MIGRAÇÃO');
    console.log('========================');
    
    console.log(`\n✅ Arquivos processados: ${this.stats.filesProcessed}`);
    console.log(`✅ Arquivos atualizados: ${this.stats.filesUpdated}`);
    console.log(`✅ Imports atualizados: ${this.stats.importsUpdated}`);
    console.log(`✅ Mensagens centralizadas: ${this.stats.messagesCentralized}`);
    console.log(`✅ Componentes refatorados: ${this.stats.componentsRefactored}`);

    if (this.migrationLog.length > 0) {
      console.log('\n📝 Log de migração:');
      this.migrationLog.forEach(log => console.log(`  ${log}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ Erros encontrados:');
      this.errors.forEach(error => console.log(`  ${error}`));
    }

    console.log('\n🎉 Migração concluída!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Teste as funcionalidades migradas');
    console.log('2. Verifique se não há quebras');
    console.log('3. Remova arquivos .backup após validação');
    console.log('4. Atualize documentação se necessário');
  }
}

// Executa a migração se chamado diretamente
if (require.main === module) {
  const migrator = new CentralizationMigrator();
  migrator.migrate().catch(console.error);
}

module.exports = CentralizationMigrator;
