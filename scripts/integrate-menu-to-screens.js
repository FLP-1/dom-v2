
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
 * @fileoverview Script de Integração do Menu - DOM v2
 * @description Script para integrar o menu principal em todas as telas
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

class MenuIntegrator {
  constructor() {
    this.screensDir = path.join(__dirname, '../frontend/src/screens');
    this.processedFiles = [];
    this.updatedFiles = [];
    this.errors = [];
  }

  async integrateMenuToAllScreens() {
    console.log('🚀 Integrando menu em todas as telas...\n');

    try {
      const screenFiles = this.getScreenFiles();
      
      for (const file of screenFiles) {
        await this.integrateMenuToScreen(file);
      }

      this.generateReport();
    } catch (error) {
      console.error('❌ Erro durante integração:', error.message);
    }
  }

  getScreenFiles() {
    const files = [];
    
    const readDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          readDir(fullPath);
        } else if (item.endsWith('.tsx') && !item.includes('.test.')) {
          files.push(fullPath);
        }
      }
    };

    readDir(this.screensDir);
    return files;
  }

  async integrateMenuToScreen(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);
      
      console.log(`📱 Processando: ${fileName}`);
      
      // Verificar se já usa BaseScreen
      if (content.includes('BaseScreen')) {
        console.log(`  ✅ Já usa BaseScreen - Menu integrado automaticamente`);
        this.processedFiles.push(fileName);
        return;
      }

      // Verificar se é um componente React
      if (!content.includes('React') && !content.includes('react')) {
        console.log(`  ⚠️ Não é um componente React - Pulando`);
        return;
      }

      // Criar backup
      const backupPath = filePath + '.backup';
      fs.writeFileSync(backupPath, content);

      // Integrar menu
      const updatedContent = this.addMenuToScreen(content, fileName);
      
      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent);
        this.updatedFiles.push(fileName);
        console.log(`  ✅ Menu integrado com sucesso`);
      } else {
        console.log(`  ℹ️ Nenhuma mudança necessária`);
      }

      this.processedFiles.push(fileName);
    } catch (error) {
      console.log(`  ❌ Erro: ${error.message}`);
      this.errors.push({ file: path.basename(filePath), error: error.message });
    }
  }

  addMenuToScreen(content, fileName) {
    let updatedContent = content;

    // Adicionar imports necessários
    if (!content.includes('useMainMenu')) {
      const importStatement = `
import useMainMenu from '../hooks/useMainMenu';
import MainMenu from '../components/MainMenu';
import MenuButton from '../components/MenuButton';`;
      
      // Encontrar posição para adicionar imports
      const lastImportIndex = this.findLastImportIndex(content);
      if (lastImportIndex !== -1) {
        updatedContent = 
          content.slice(0, lastImportIndex + 1) + 
          importStatement + 
          content.slice(lastImportIndex + 1);
      }
    }

    // Adicionar props do menu
    updatedContent = this.addMenuProps(updatedContent);

    // Adicionar hook do menu
    updatedContent = this.addMenuHook(updatedContent);

    // Adicionar botão do menu no header
    updatedContent = this.addMenuButton(updatedContent);

    // Adicionar componente do menu
    updatedContent = this.addMenuComponent(updatedContent);

    return updatedContent;
  }

  findLastImportIndex(content) {
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      } else if (lines[i].trim() !== '' && !lines[i].trim().startsWith('import ')) {
        break;
      }
    }
    
    return lastImportIndex;
  }

  addMenuProps(content) {
    // Adicionar props do menu na interface do componente
    const propsPattern = /interface\s+\w+Props\s*\{([^}]*)\}/;
    const match = content.match(propsPattern);
    
    if (match) {
      const existingProps = match[1];
      const menuProps = `
  userProfile?: string;
  userPermissions?: string[];
  onNavigate?: (screen: string) => void;`;
      
      if (!existingProps.includes('userProfile')) {
        const newProps = existingProps + menuProps;
        content = content.replace(propsPattern, `interface ${match[0].split('Props')[0]}Props {${newProps}}`);
      }
    }
    
    return content;
  }

  addMenuHook(content) {
    // Adicionar hook do menu no componente
    const componentPattern = /export\s+const\s+\w+\s*:\s*React\.FC<[^>]*>\s*=\s*\([^)]*\)\s*=>\s*\{/;
    const match = content.match(componentPattern);
    
    if (match) {
      const hookCode = `
  const { isMenuVisible, openMenu, closeMenu, handleNavigate } = useMainMenu({
    userProfile,
    userPermissions,
    onNavigate
  });`;
      
      if (!content.includes('useMainMenu')) {
        const insertIndex = content.indexOf('{', content.indexOf(match[0])) + 1;
        content = content.slice(0, insertIndex) + hookCode + content.slice(insertIndex);
      }
    }
    
    return content;
  }

  addMenuButton(content) {
    // Adicionar botão do menu no header
    const headerPattern = /<View[^>]*style\s*=\s*\{[^}]*header[^}]*\}[^>]*>/;
    const match = content.match(headerPattern);
    
    if (match) {
      const menuButton = `
          <MenuButton onPress={openMenu} size="medium" />`;
      
      if (!content.includes('MenuButton')) {
        // Encontrar posição no header para adicionar o botão
        const headerIndex = content.indexOf(match[0]);
        const insertIndex = content.indexOf('>', headerIndex) + 1;
        content = content.slice(0, insertIndex) + menuButton + content.slice(insertIndex);
      }
    }
    
    return content;
  }

  addMenuComponent(content) {
    // Adicionar componente do menu no final do return
    const returnPattern = /return\s*\(([\s\S]*?)\)\s*;/;
    const match = content.match(returnPattern);
    
    if (match) {
      const menuComponent = `
      
      {/* Menu Principal */}
      <MainMenu
        visible={isMenuVisible}
        onClose={closeMenu}
        onNavigate={handleNavigate}
        userProfile={userProfile}
        userPermissions={userPermissions}
      />`;
      
      if (!content.includes('MainMenu')) {
        const returnContent = match[1];
        const lastBracketIndex = returnContent.lastIndexOf('</');
        const insertIndex = content.indexOf(match[0]) + returnContent.lastIndexOf('</') + 2;
        content = content.slice(0, insertIndex) + menuComponent + content.slice(insertIndex);
      }
    }
    
    return content;
  }

  generateReport() {
    console.log('\n📊 RELATÓRIO DE INTEGRAÇÃO DO MENU');
    console.log('====================================');
    
    console.log(`✅ Arquivos processados: ${this.processedFiles.length}`);
    console.log(`✅ Arquivos atualizados: ${this.updatedFiles.length}`);
    console.log(`❌ Erros: ${this.errors.length}`);
    
    if (this.updatedFiles.length > 0) {
      console.log('\n📝 Arquivos atualizados:');
      this.updatedFiles.forEach(file => {
        console.log(`  ✅ ${file}`);
      });
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ Erros encontrados:');
      this.errors.forEach(error => {
        console.log(`  ❌ ${error.file}: ${error.error}`);
      });
    }
    
    console.log('\n🎉 Integração do menu concluída!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Teste as telas atualizadas');
    console.log('2. Verifique se o menu funciona corretamente');
    console.log('3. Ajuste as permissões conforme necessário');
    console.log('4. Remova arquivos .backup após validação');
  }
}

if (require.main === module) {
  const integrator = new MenuIntegrator();
  integrator.integrateMenuToAllScreens().catch(console.error);
}

module.exports = MenuIntegrator;
