
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

const fs = require('fs');
const path = require('path');

const CONFIG = {
  sharedDir: './frontend/src/micro-frontends/shared',
  sourceDirs: {
    components: './frontend/src/components',
    hooks: './frontend/src/hooks',
    utils: './frontend/src/utils'
  },
  sharedStructure: {
    components: {
      ui: [
        'Button.tsx',
        'Card.tsx',
        'Input.tsx',
        'Modal.tsx',
        'Toast.tsx',
        'Table.tsx',
        'Chart.tsx',
        'CPFCNPJInput.tsx',
        'CEPInput.tsx'
      ],
      layout: [
        'Header.tsx',
        'SideMenu.tsx',
        'SplashScreen.tsx'
      ],
      forms: [
        'profile-selector.tsx',
        'regional-selector.tsx',
        'notification-list.tsx'
      ]
    },
    hooks: [
      'use-profile-adaptation.ts'
    ],
    utils: {
      core: [
        'api-client.ts',
        'config.ts',
        'validation.ts',
        'messages.ts',
        'messages-system.ts'
      ],
      ui: [
        'theme-provider.tsx',
        'simple-notifications.ts',
        'intelligent-notifications.ts'
      ],
      business: [
        'user-profiles.ts',
        'regional-adaptation.ts',
        'device-optimization.ts',
        'critical-thinking-validation.ts'
      ],
      helpers: [
        'generic-functions.ts',
        'async-storage-mock.ts',
        'turbo-module-mock.ts'
      ]
    }
  }
};

// Funções utilitárias
const log = (message) => console.log(`[${new Date().toISOString()}] ${message}`);

const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Diretório criado: ${dirPath}`);
  }
};

const copyFile = (source, destination) => {
  try {
    fs.copyFileSync(source, destination);
    log(`Arquivo copiado: ${source} -> ${destination}`);
    return true;
  } catch (error) {
    log(`Erro ao copiar ${source}: ${error.message}`);
    return false;
  }
};

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    log(`Erro ao ler ${filePath}: ${error.message}`);
    return null;
  }
};

const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);
    log(`Arquivo criado: ${filePath}`);
    return true;
  } catch (error) {
    log(`Erro ao escrever ${filePath}: ${error.message}`);
    return false;
  }
};

const listFiles = (dirPath) => {
  try {
    return fs.readdirSync(dirPath).filter(file => {
      const fullPath = path.join(dirPath, file);
      return fs.statSync(fullPath).isFile();
    });
  } catch (error) {
    log(`Erro ao listar arquivos em ${dirPath}: ${error.message}`);
    return [];
  }
};

// Funções principais
const estruturarShared = {
  createSharedStructure: () => {
    log('Criando estrutura do diretório shared...');
    
    // Criar diretórios principais
    createDirectory(CONFIG.sharedDir);
    createDirectory(path.join(CONFIG.sharedDir, 'components'));
    createDirectory(path.join(CONFIG.sharedDir, 'components/ui'));
    createDirectory(path.join(CONFIG.sharedDir, 'components/layout'));
    createDirectory(path.join(CONFIG.sharedDir, 'components/forms'));
    createDirectory(path.join(CONFIG.sharedDir, 'hooks'));
    createDirectory(path.join(CONFIG.sharedDir, 'utils'));
    createDirectory(path.join(CONFIG.sharedDir, 'utils/core'));
    createDirectory(path.join(CONFIG.sharedDir, 'utils/ui'));
    createDirectory(path.join(CONFIG.sharedDir, 'utils/business'));
    createDirectory(path.join(CONFIG.sharedDir, 'utils/helpers'));
    
    log('Estrutura de diretórios criada');
  },

  copyComponents: () => {
    log('Copiando componentes para shared...');
    let copiedCount = 0;
    
    // Copiar componentes UI
    CONFIG.sharedStructure.components.ui.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.components, 'ui', file);
      const destPath = path.join(CONFIG.sharedDir, 'components/ui', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    // Copiar componentes de layout
    CONFIG.sharedStructure.components.layout.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.components, file);
      const destPath = path.join(CONFIG.sharedDir, 'components/layout', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    // Copiar componentes de formulários
    CONFIG.sharedStructure.components.forms.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.components, file);
      const destPath = path.join(CONFIG.sharedDir, 'components/forms', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    log(`Componentes copiados: ${copiedCount}`);
    return copiedCount;
  },

  copyHooks: () => {
    log('Copiando hooks para shared...');
    let copiedCount = 0;
    
    CONFIG.sharedStructure.hooks.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.hooks, file);
      const destPath = path.join(CONFIG.sharedDir, 'hooks', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    log(`Hooks copiados: ${copiedCount}`);
    return copiedCount;
  },

  copyUtils: () => {
    log('Copiando utilitários para shared...');
    let copiedCount = 0;
    
    // Copiar utils core
    CONFIG.sharedStructure.utils.core.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.utils, file);
      const destPath = path.join(CONFIG.sharedDir, 'utils/core', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    // Copiar utils UI
    CONFIG.sharedStructure.utils.ui.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.utils, file);
      const destPath = path.join(CONFIG.sharedDir, 'utils/ui', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    // Copiar utils business
    CONFIG.sharedStructure.utils.business.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.utils, file);
      const destPath = path.join(CONFIG.sharedDir, 'utils/business', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    // Copiar utils helpers
    CONFIG.sharedStructure.utils.helpers.forEach(file => {
      const sourcePath = path.join(CONFIG.sourceDirs.utils, file);
      const destPath = path.join(CONFIG.sharedDir, 'utils/helpers', file);
      if (fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    });
    
    log(`Utilitários copiados: ${copiedCount}`);
    return copiedCount;
  },

  createIndexFiles: () => {
    log('Criando arquivos index para exportação...');
    
    // Index para componentes
    const componentsIndex = `// Shared Components - DOM-V2
// Auto-generated index file

// UI Components
export { default as Button } from './ui/Button';
export { default as Card } from './ui/Card';
export { default as Input } from './ui/Input';
export { default as Modal } from './ui/Modal';
export { default as Toast } from './ui/Toast';
export { default as Table } from './ui/Table';
export { default as Chart } from './ui/Chart';
export { default as CPFCNPJInput } from './ui/CPFCNPJInput';
export { default as CEPInput } from './ui/CEPInput';

// Layout Components
export { default as Header } from './layout/Header';
export { default as SideMenu } from './layout/SideMenu';
export { default as SplashScreen } from './layout/SplashScreen';

// Form Components
export { default as ProfileSelector } from './forms/profile-selector';
export { default as RegionalSelector } from './forms/regional-selector';
export { default as NotificationList } from './forms/notification-list';
`;
    
    writeFile(path.join(CONFIG.sharedDir, 'components/index.ts'), componentsIndex);
    
    // Index para hooks
    const hooksIndex = `// Shared Hooks - DOM-V2
// Auto-generated index file

export { default as useProfileAdaptation } from './use-profile-adaptation';
`;
    
    writeFile(path.join(CONFIG.sharedDir, 'hooks/index.ts'), hooksIndex);
    
    // Index para utils
    const utilsIndex = `// Shared Utils - DOM-V2
// Auto-generated index file

// Core Utils
export * from './core/api-client';
export * from './core/config';
export * from './core/validation';
export * from './core/messages';
export * from './core/messages-system';

// UI Utils
export * from './ui/theme-provider';
export * from './ui/simple-notifications';
export * from './ui/intelligent-notifications';

// Business Utils
export * from './business/user-profiles';
export * from './business/regional-adaptation';
export * from './business/device-optimization';
export * from './business/critical-thinking-validation';

// Helper Utils
export * from './helpers/generic-functions';
export * from './helpers/async-storage-mock';
export * from './helpers/turbo-module-mock';
`;
    
    writeFile(path.join(CONFIG.sharedDir, 'utils/index.ts'), utilsIndex);
    
    // Index principal
    const mainIndex = `// Shared Library - DOM-V2
// Main entry point for all shared components, hooks and utilities

// Components
export * from './components';

// Hooks
export * from './hooks';

// Utils
export * from './utils';

// Version info
export const SHARED_VERSION = '1.0.0';
export const SHARED_BUILD_DATE = '${new Date().toISOString()}';
`;
    
    writeFile(path.join(CONFIG.sharedDir, 'index.ts'), mainIndex);
    
    log('Arquivos index criados');
  },

  createPackageJson: () => {
    const packageJson = {
      name: "@dom-v2/shared",
      version: "1.0.0",
      description: "Shared components, hooks and utilities for DOM-V2",
      main: "index.ts",
      types: "index.ts",
      scripts: {
        "build": "tsc",
        "test": "jest",
        "lint": "eslint ."
      },
      dependencies: {
        "react": "18.3.1",
        "react-dom": "18.3.1",
        "react-native": "0.80.1",
        "react-native-web": "0.19.10"
      },
      peerDependencies: {
        "react": ">=18.0.0",
        "react-dom": ">=18.0.0",
        "react-native": ">=0.70.0"
      },
      keywords: [
        "dom-v2",
        "shared",
        "components",
        "hooks",
        "utilities"
      ],
      author: "DOM Team v2",
      license: "ISC"
    };
    
    writeFile(
      path.join(CONFIG.sharedDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    log('package.json criado para shared library');
  },

  createREADME: () => {
    const readmeContent = `# Shared Library - DOM-V2

## Overview
This directory contains shared components, hooks, and utilities that can be used across different parts of the DOM-V2 application (web and mobile).

## Structure

### Components
- **UI Components**: Basic UI elements (Button, Card, Input, etc.)
- **Layout Components**: Layout-related components (Header, SideMenu, etc.)
- **Form Components**: Form-related components (ProfileSelector, etc.)

### Hooks
- Custom React hooks for shared functionality

### Utils
- **Core**: Essential utilities (API client, config, validation)
- **UI**: UI-related utilities (theme, notifications)
- **Business**: Business logic utilities (profiles, regional adaptation)
- **Helpers**: Helper functions and mocks

## Usage

\`\`\`typescript
// Import components
import { Button, Card, Input } from '@dom-v2/shared';

// Import hooks
import { useProfileAdaptation } from '@dom-v2/shared';

// Import utilities
import { apiClient, validation } from '@dom-v2/shared';
\`\`\`

## Versioning
This shared library follows semantic versioning. Check the main index.ts file for current version.

## Development
- All components should be platform-agnostic (work on web and mobile)
- Use TypeScript for type safety
- Follow the project's naming conventions
- Add proper documentation and examples

## Build
\`\`\`bash
npm run build
\`\`\`

## Test
\`\`\`bash
npm test
\`\`\`
`;
    
    writeFile(path.join(CONFIG.sharedDir, 'README.md'), readmeContent);
    log('README.md criado para shared library');
  },

  generateReport: (componentsCount, hooksCount, utilsCount) => {
    const report = {
      timestamp: new Date().toISOString(),
      operacao: 'Estruturação do Diretório Shared',
      estatisticas: {
        componentesCopiados: componentsCount,
        hooksCopiados: hooksCount,
        utilitariosCopiados: utilsCount,
        totalArquivos: componentsCount + hooksCount + utilsCount
      },
      estruturaCriada: {
        components: {
          ui: CONFIG.sharedStructure.components.ui,
          layout: CONFIG.sharedStructure.components.layout,
          forms: CONFIG.sharedStructure.components.forms
        },
        hooks: CONFIG.sharedStructure.hooks,
        utils: {
          core: CONFIG.sharedStructure.utils.core,
          ui: CONFIG.sharedStructure.utils.ui,
          business: CONFIG.sharedStructure.utils.business,
          helpers: CONFIG.sharedStructure.utils.helpers
        }
      },
      arquivosGerados: [
        'components/index.ts',
        'hooks/index.ts',
        'utils/index.ts',
        'index.ts',
        'package.json',
        'README.md'
      ],
      observacoes: [
        'Estrutura shared criada com organização por categoria',
        'Arquivos index criados para facilitar importações',
        'package.json configurado para shared library',
        'README.md com documentação de uso',
        'Componentes organizados por tipo (UI, Layout, Forms)',
        'Utilitários organizados por função (Core, UI, Business, Helpers)'
      ]
    };

    const reportPath = path.join(CONFIG.sharedDir, 'structure-report.json');
    writeFile(reportPath, JSON.stringify(report, null, 2));
    log('Relatório de estruturação gerado');
  }
};

// Execução principal
const main = () => {
  log('Iniciando estruturação do diretório shared...');
  
  try {
    estruturarShared.createSharedStructure();
    const componentsCount = estruturarShared.copyComponents();
    const hooksCount = estruturarShared.copyHooks();
    const utilsCount = estruturarShared.copyUtils();
    
    estruturarShared.createIndexFiles();
    estruturarShared.createPackageJson();
    estruturarShared.createREADME();
    estruturarShared.generateReport(componentsCount, hooksCount, utilsCount);
    
    log('✅ Estruturação do shared concluída com sucesso!');
    log(`📊 Resumo: ${componentsCount} componentes, ${hooksCount} hooks, ${utilsCount} utilitários`);
    
  } catch (error) {
    log(`❌ Erro durante a operação: ${error.message}`);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { estruturarShared, CONFIG }; 