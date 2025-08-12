
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
 * @fileoverview Script de Refatoração para IconCards - DOM v2
 * @description Refatora telas substituindo botões por IconCards
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

class ScreenRefactorer {
  constructor() {
    this.screensDir = path.join(__dirname, '../frontend/src/screens');
    this.backupDir = path.join(__dirname, '../frontend/src/screens/backup-icon-cards');
    this.report = {
      processed: 0,
      refactored: 0,
      errors: [],
      details: []
    };
  }

  async refactorScreens() {
    console.log('🎯 Iniciando refatoração de telas para IconCards...');
    
    // Criar backup
    await this.createBackup();
    
    // Obter arquivos de telas
    const screenFiles = await this.getScreenFiles();
    
    // Refatorar cada tela
    for (const filePath of screenFiles) {
      try {
        await this.refactorScreen(filePath);
      } catch (error) {
        this.report.errors.push({
          file: filePath,
          error: error.message
        });
        console.error(`❌ Erro ao refatorar ${filePath}:`, error.message);
      }
    }
    
    // Gerar relatório
    this.generateReport();
    
    console.log('✅ Refatoração concluída!');
  }

  async createBackup() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
    
    const screenFiles = await this.getScreenFiles();
    for (const filePath of screenFiles) {
      const fileName = path.basename(filePath);
      const backupPath = path.join(this.backupDir, fileName);
      fs.copyFileSync(filePath, backupPath);
    }
    
    console.log(`📦 Backup criado em: ${this.backupDir}`);
  }

  async getScreenFiles() {
    const files = [];
    const items = fs.readdirSync(this.screensDir);
    
    for (const item of items) {
      const itemPath = path.join(this.screensDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isFile() && item.endsWith('.tsx') && !item.endsWith('.test.tsx') && !item.endsWith('.backup')) {
        files.push(itemPath);
      }
    }
    
    return files;
  }

  async refactorScreen(filePath) {
    const fileName = path.basename(filePath);
    console.log(`🔄 Refatorando: ${fileName}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Adicionar imports necessários
    content = this.addIconCardImports(content);
    
    // Substituir TouchableOpacity por IconCard
    content = this.replaceTouchableOpacityWithIconCard(content);
    
    // Substituir botões simples por IconCards
    content = this.replaceSimpleButtonsWithIconCard(content);
    
    // Substituir feature cards por IconCards
    content = this.replaceFeatureCardsWithIconCard(content);
    
    // Substituir action buttons por IconCards
    content = this.replaceActionButtonsWithIconCard(content);
    
    // Salvar arquivo refatorado
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      this.report.refactored++;
      this.report.details.push({
        file: fileName,
        changes: 'Refatorado com sucesso'
      });
      console.log(`✅ ${fileName} refatorado`);
    } else {
      this.report.details.push({
        file: fileName,
        changes: 'Nenhuma mudança necessária'
      });
      console.log(`ℹ️ ${fileName} sem mudanças`);
    }
    
    this.report.processed++;
  }

  addIconCardImports(content) {
    const importPattern = /import.*from.*['"]react-native['"];?/;
    const iconCardImport = "import IconCard from '../components/ui/IconCard';\nimport IconCardGrid from '../components/ui/IconCardGrid';";
    
    if (!content.includes('IconCard') && !content.includes('IconCardGrid')) {
      if (importPattern.test(content)) {
        content = content.replace(importPattern, `$&\n${iconCardImport}`);
      } else {
        // Adicionar após imports existentes
        const importEndIndex = content.lastIndexOf('import');
        if (importEndIndex !== -1) {
          const nextLineIndex = content.indexOf('\n', importEndIndex);
          content = content.slice(0, nextLineIndex + 1) + iconCardImport + '\n' + content.slice(nextLineIndex + 1);
        }
      }
    }
    
    return content;
  }

  replaceTouchableOpacityWithIconCard(content) {
    // Padrão para TouchableOpacity com ícone e texto
    const touchablePattern = /<TouchableOpacity\s+style=\{([^}]+)\}\s+onPress=\{([^}]+)\}>[\s\S]*?<Text\s+style=\{([^}]+)\}>([^<]+)<\/Text>[\s\S]*?<\/TouchableOpacity>/g;
    
    return content.replace(touchablePattern, (match, style, onPress, textStyle, text) => {
      // Determinar ícone baseado no texto
      const icon = this.getIconFromText(text);
      const variant = this.getVariantFromStyle(style);
      
      return `<IconCard
        icon="${icon}"
        title="${text.trim()}"
        onPress={${onPress}}
        variant="${variant}"
        size="medium"
      />`;
    });
  }

  replaceSimpleButtonsWithIconCard(content) {
    // Padrão para botões simples
    const buttonPattern = /<TouchableOpacity\s+style=\{([^}]+)\}\s+onPress=\{([^}]+)\}>[\s\S]*?<Text[^>]*>([^<]+)<\/Text>[\s\S]*?<\/TouchableOpacity>/g;
    
    return content.replace(buttonPattern, (match, style, onPress, text) => {
      const icon = this.getIconFromText(text);
      const variant = this.getVariantFromStyle(style);
      
      return `<IconCard
        icon="${icon}"
        title="${text.trim()}"
        onPress={${onPress}}
        variant="${variant}"
        size="small"
      />`;
    });
  }

  replaceFeatureCardsWithIconCard(content) {
    // Padrão para feature cards
    const featurePattern = /<View\s+style=\{([^}]+)\}>[\s\S]*?<Text\s+style=\{([^}]+)\}>([^<]+)<\/Text>[\s\S]*?<Text\s+style=\{([^}]+)\}>([^<]+)<\/Text>[\s\S]*?<\/View>/g;
    
    return content.replace(featurePattern, (match, cardStyle, iconStyle, icon, titleStyle, title) => {
      if (this.isFeatureCard(cardStyle)) {
        const iconText = icon.trim();
        const titleText = title.trim();
        
        return `<IconCard
          icon="${iconText}"
          title="${titleText}"
          variant="primary"
          size="medium"
        />`;
      }
      return match;
    });
  }

  replaceActionButtonsWithIconCard(content) {
    // Padrão para action buttons no header
    const actionPattern = /<TouchableOpacity\s+style=\{([^}]+)\}\s+onPress=\{([^}]+)\}>[\s\S]*?<Text\s+style=\{([^}]+)\}>([^<]+)<\/Text>[\s\S]*?<\/TouchableOpacity>/g;
    
    return content.replace(actionPattern, (match, style, onPress, textStyle, text) => {
      if (this.isActionButton(style)) {
        const icon = this.getIconFromText(text);
        const variant = this.getVariantFromStyle(style);
        
        return `<IconCard
          icon="${icon}"
          title="${text.trim()}"
          onPress={${onPress}}
          variant="${variant}"
          size="small"
        />`;
      }
      return match;
    });
  }

  getIconFromText(text) {
    const iconMap = {
      'dashboard': '📊',
      'usuários': '👥',
      'users': '👥',
      'funcionários': '👷',
      'employees': '👷',
      'financeiro': '💰',
      'finance': '💰',
      'pagamentos': '💳',
      'payments': '💳',
      'folha': '📋',
      'payroll': '📋',
      'tarefas': '✅',
      'tasks': '✅',
      'relatórios': '📈',
      'reports': '📈',
      'notificações': '🔔',
      'notifications': '🔔',
      'configurações': '⚙️',
      'settings': '⚙️',
      'sair': '🚪',
      'logout': '🚪',
      'perfil': '👤',
      'profile': '👤',
      'adicionar': '➕',
      'add': '➕',
      'editar': '✏️',
      'edit': '✏️',
      'excluir': '🗑️',
      'delete': '🗑️',
      'salvar': '💾',
      'save': '💾',
      'cancelar': '❌',
      'cancel': '❌',
      'buscar': '🔍',
      'search': '🔍',
      'filtrar': '🔍',
      'filter': '🔍',
      'exportar': '📤',
      'export': '📤',
      'importar': '📥',
      'import': '📥',
      'download': '⬇️',
      'upload': '⬆️',
      'print': '🖨️',
      'imprimir': '🖨️',
      'refresh': '🔄',
      'atualizar': '🔄',
      'loading': '⏳',
      'carregando': '⏳',
      'error': '⚠️',
      'erro': '⚠️',
      'success': '✅',
      'sucesso': '✅',
      'info': 'ℹ️',
      'informação': 'ℹ️',
      'warning': '⚠️',
      'aviso': '⚠️'
    };
    
    const lowerText = text.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerText.includes(key)) {
        return icon;
      }
    }
    
    // Ícones padrão baseados em emojis no texto
    const emojiMatch = text.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
    if (emojiMatch) {
      return emojiMatch[0];
    }
    
    return '📋'; // Ícone padrão
  }

  getVariantFromStyle(style) {
    const styleStr = style.toString().toLowerCase();
    
    if (styleStr.includes('primary') || styleStr.includes('blue')) return 'primary';
    if (styleStr.includes('secondary') || styleStr.includes('green')) return 'secondary';
    if (styleStr.includes('success') || styleStr.includes('success')) return 'success';
    if (styleStr.includes('warning') || styleStr.includes('orange')) return 'warning';
    if (styleStr.includes('error') || styleStr.includes('red')) return 'error';
    if (styleStr.includes('info') || styleStr.includes('info')) return 'info';
    
    return 'primary';
  }

  isFeatureCard(style) {
    const styleStr = style.toString().toLowerCase();
    return styleStr.includes('feature') || styleStr.includes('card') || styleStr.includes('grid');
  }

  isActionButton(style) {
    const styleStr = style.toString().toLowerCase();
    return styleStr.includes('header') || styleStr.includes('action') || styleStr.includes('button');
  }

  generateReport() {
    const reportPath = path.join(__dirname, '../docs/RELATORIO_REFATORACAO_ICON_CARDS.md');
    
    const reportContent = `# Relatório de Refatoração para IconCards

## Resumo
- **Telas processadas:** ${this.report.processed}
- **Telas refatoradas:** ${this.report.refactored}
- **Erros:** ${this.report.errors.length}

## Detalhes das Mudanças

${this.report.details.map(detail => `### ${detail.file}
- ${detail.changes}`).join('\n\n')}

${this.report.errors.length > 0 ? `
## Erros Encontrados

${this.report.errors.map(error => `### ${error.file}
- ${error.error}`).join('\n\n')}
` : ''}

## Arquivos de Backup
Os arquivos originais foram salvos em: \`frontend/src/screens/backup-icon-cards/\`

## Próximos Passos
1. Testar as telas refatoradas
2. Ajustar estilos conforme necessário
3. Implementar funcionalidades específicas dos IconCards
4. Documentar padrões de uso

---
*Gerado em: ${new Date().toISOString()}*
`;

    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log(`📊 Relatório salvo em: ${reportPath}`);
  }
}

// Executar refatoração
async function main() {
  const refactorer = new ScreenRefactorer();
  await refactorer.refactorScreens();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = ScreenRefactorer;
