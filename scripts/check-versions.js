
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
 * @fileoverview Validador de Versões DOM v2
 * @directory scripts
 * @description Verifica compatibilidades e versões mínimas
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

const fs = require('fs');
const { execSync } = require('child_process');

class VersionChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  // Verificar versão do Node.js
  checkNodeVersion() {
    console.log(`[${new Date().toISOString()}] ` + '🔍 Verificando versão do Node.js...');

    try {
      const nodeVersion = process.version;
      const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

      if (majorVersion < 18) {
        this.errors.push(`❌ Node.js ${nodeVersion} - Versão mínima: 18.x`);
      } else if (majorVersion < 20) {
        this.warnings.push(`⚠️ Node.js ${nodeVersion} - Recomendado: 20.x`);
      } else {
        this.success.push(`✅ Node.js ${nodeVersion} - Versão adequada`);
      }
    } catch (error) {
      this.errors.push('❌ Erro ao verificar versão do Node.js');
    }
  }

  // Verificar versão do npm
  checkNpmVersion() {
    console.log(`[${new Date().toISOString()}] ` + '📦 Verificando versão do npm...');

    try {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      const majorVersion = parseInt(npmVersion.split('.')[0]);

      if (majorVersion < 8) {
        this.errors.push(`❌ npm ${npmVersion} - Versão mínima: 8.x`);
      } else if (majorVersion < 9) {
        this.warnings.push(`⚠️ npm ${npmVersion} - Recomendado: 9.x`);
      } else {
        this.success.push(`✅ npm ${npmVersion} - Versão adequada`);
      }
    } catch (error) {
      this.warnings.push('⚠️ Erro ao verificar versão do npm');
    }
  }

  // Verificar dependências do backend
  checkBackendDependencies() {
    console.log(`[${new Date().toISOString()}] ` + '🔧 Verificando dependências do backend...');

    try {
      const packageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

      const requiredDeps = {
        'express': '^4.18.0',
        'typescript': '^5.0.0',
        'cors': '^2.8.5'
      };

      Object.entries(requiredDeps).forEach(([dep, minVersion]) => {
        const currentVersion = packageJson.dependencies?.[dep];

        if (!currentVersion) {
          this.errors.push(`❌ Dependência ausente: ${dep}`);
        } else if (!this.isVersionCompatible(currentVersion, minVersion)) {
          this.errors.push(`❌ Versão incompatível de ${dep}: ${currentVersion} (mínimo: ${minVersion})`);
        } else {
          this.success.push(`✅ ${dep}: ${currentVersion} - Versão compatível`);
        }
      });

      // Verificar dependências críticas adicionais
      const criticalDeps = ['@types/node', '@types/express', '@types/cors'];
      criticalDeps.forEach(dep => {
        if (!packageJson.devDependencies?.[dep] && !packageJson.dependencies?.[dep]) {
          this.warnings.push(`⚠️ Dependência de tipos ausente: ${dep}`);
        }
      });

      // Verificar se Prisma está configurado
      if (!packageJson.dependencies?.prisma && !packageJson.devDependencies?.prisma) {
        this.warnings.push('⚠️ Prisma não configurado - banco de dados não implementado');
      } else {
        this.success.push('✅ Prisma configurado');
      }

    } catch (error) {
      this.errors.push('❌ Erro ao verificar dependências do backend');
    }
  }

  // Verificar dependências do frontend
  checkFrontendDependencies() {
    console.log(`[${new Date().toISOString()}] ` + '📱 Verificando dependências do frontend...');

    try {
      const packageJson = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));

      const requiredDeps = {
        'react-native': '^0.72.0'
      };

      Object.entries(requiredDeps).forEach(([dep, minVersion]) => {
        const currentVersion = packageJson.dependencies?.[dep];

        if (!currentVersion) {
          this.errors.push(`❌ Dependência ausente: ${dep}`);
        } else if (!this.isVersionCompatible(currentVersion, minVersion)) {
          this.errors.push(`❌ Versão incompatível de ${dep}: ${currentVersion} (mínimo: ${minVersion})`);
        } else {
          this.success.push(`✅ ${dep}: ${currentVersion} - Versão compatível`);
        }
      });

      // Verificar TypeScript nas devDependencies
      const typescriptVersion = packageJson.devDependencies?.['typescript'];
      if (typescriptVersion) {
        this.success.push(`✅ typescript: ${typescriptVersion} - Versão compatível`);
      } else {
        this.warnings.push('⚠️ TypeScript não encontrado nas devDependencies');
      }

      // Verificar dependências críticas do React Native
      const criticalReactDeps = ['@types/react', '@types/react-native'];
      criticalReactDeps.forEach(dep => {
        if (!packageJson.devDependencies?.[dep]) {
          this.warnings.push(`⚠️ Dependência de tipos React ausente: ${dep}`);
        }
      });

      // Verificar dependências de navegação
      if (!packageJson.dependencies?.['@react-navigation/native']) {
        this.warnings.push('⚠️ React Navigation não configurado');
      }

    } catch (error) {
      this.errors.push('❌ Erro ao verificar dependências do frontend');
    }
  }

  // Verificar configuração do TypeScript
  checkTypeScriptConfig() {
    console.log(`[${new Date().toISOString()}] ` + '📝 Verificando configuração do TypeScript...');

    try {
      // Verificar backend TypeScript
      if (fs.existsSync('backend/tsconfig.json')) {
        try {
          const backendConfig = JSON.parse(fs.readFileSync('backend/tsconfig.json', 'utf8'));
          
          // Verificar configurações críticas do backend
          if (backendConfig.compilerOptions?.strict === true) {
            this.success.push('✅ Backend TypeScript: Strict mode ativado');
          } else {
            this.warnings.push('⚠️ Backend TypeScript: Strict mode não ativado');
          }

          // Verificar outras configurações importantes (apenas se strict não estiver ativo)
          if (backendConfig.compilerOptions?.strict !== true) {
            const criticalSettings = {
              'noImplicitAny': true,
              'noImplicitReturns': true,
              'noImplicitThis': true
            };

            Object.entries(criticalSettings).forEach(([setting, value]) => {
              if (backendConfig.compilerOptions?.[setting] !== value) {
                this.warnings.push(`⚠️ Backend TypeScript: ${setting} não configurado como ${value}`);
              }
            });
          }

        } catch (parseError) {
          console.error('Erro ao parsear backend tsconfig:', parseError.message);
          this.errors.push('❌ Backend TypeScript: Arquivo de configuração inválido');
        }
      } else {
        this.errors.push('❌ Backend TypeScript não configurado');
      }

      // Verificar frontend TypeScript
      if (fs.existsSync('frontend/tsconfig.json')) {
        try {
          const frontendConfig = JSON.parse(fs.readFileSync('frontend/tsconfig.json', 'utf8'));
          
          // Frontend usa configuração estendida do React Native
          if (frontendConfig.extends === '@react-native/typescript-config') {
            this.success.push('✅ Frontend TypeScript: Configuração React Native válida');
          } else {
            this.warnings.push('⚠️ Frontend TypeScript: Configuração não estende React Native');
          }
        } catch (parseError) {
          this.warnings.push('⚠️ Frontend TypeScript: Arquivo de configuração com problema');
        }
      } else {
        this.errors.push('❌ Frontend TypeScript não configurado');
      }

      this.success.push('✅ Configurações TypeScript verificadas');

    } catch (error) {
      console.error('Erro detalhado:', error.message);
      this.errors.push('❌ Erro ao verificar configuração do TypeScript');
    }
  }

  // Verificar ferramentas de qualidade
  checkQualityTools() {
    console.log(`[${new Date().toISOString()}] ` + '🛠️ Verificando ferramentas de qualidade...');

    const tools = [
      { name: 'ESLint', file: 'frontend/.eslintrc.js', required: true },
      { name: 'Prettier', file: 'frontend/.prettierrc.js', required: true },
      { name: 'Jest', file: 'frontend/jest.config.js', required: false },
      { name: 'Husky', file: '.husky', required: false }
    ];

    tools.forEach(tool => {
      if (fs.existsSync(tool.file) || fs.existsSync(tool.file.replace('.js', '.json'))) {
        this.success.push(`✅ ${tool.name} configurado`);
      } else if (tool.required) {
        this.warnings.push(`⚠️ ${tool.name} não configurado`);
      } else {
        this.warnings.push(`⚠️ ${tool.name} não configurado (opcional)`);
      }
    });
  }

  // Verificar estrutura de arquivos
  checkFileStructure() {
    console.log(`[${new Date().toISOString()}] ` + '📁 Verificando estrutura de arquivos...');

    const requiredFiles = [
      'backend/src/server.ts',
      'frontend/App.tsx',
      'frontend/src/screens/LoginScreen.tsx',
      'frontend/src/screens/DashboardScreen.tsx',
      'frontend/src/screens/TasksScreen.tsx',
      'docs/REGRAS_PROJETO_DOM_V2.md',
      'scripts/validate-rules.js'
    ];

    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.success.push(`✅ ${file} encontrado`);
      } else {
        this.errors.push(`❌ ${file} não encontrado`);
      }
    });

    // Verificar scripts críticos
    const criticalScripts = [
      'backend/package.json',
      'frontend/package.json',
      'package.json'
    ];

    criticalScripts.forEach(script => {
      if (fs.existsSync(script)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(script, 'utf8'));
          const scripts = packageJson.scripts || {};
          const hasStartScript = scripts.start || scripts.dev || 
                                scripts['dev:backend'] || scripts['dev:frontend'] ||
                                Object.keys(scripts).some(key => key.includes('dev') || key.includes('start'));
          
          if (!hasStartScript) {
            this.warnings.push(`⚠️ Script de inicialização ausente em ${script}`);
          } else {
            this.success.push(`✅ Scripts de inicialização configurados em ${script}`);
          }
        } catch (error) {
          this.warnings.push(`⚠️ ${script} com formato inválido`);
        }
      } else {
        this.errors.push(`❌ ${script} não encontrado`);
      }
    });
  }

  // Utilitários
  isVersionCompatible(current, required) {
    // Implementação simples de comparação de versões
    const currentNum = current.replace(/[^\d.]/g, '');
    const requiredNum = required.replace(/[^\d.]/g, '');

    const currentParts = currentNum.split('.').map(Number);
    const requiredParts = requiredNum.split('.').map(Number);

    for (let i = 0; i < Math.max(currentParts.length, requiredParts.length); i++) {
      const currentPart = currentParts[i] || 0;
      const requiredPart = requiredParts[i] || 0;

      if (currentPart > requiredPart) return true;
      if (currentPart < requiredPart) return false;
    }

    return true;
  }

  // Executar todas as verificações
  runAllChecks() {
    console.log(`[${new Date().toISOString()}] ` + '🚀 Iniciando verificação de versões DOM v2...\n');

    this.checkNodeVersion();
    this.checkNpmVersion();
    this.checkBackendDependencies();
    this.checkFrontendDependencies();
    this.checkTypeScriptConfig();
    this.checkQualityTools();
    this.checkFileStructure();

    this.printResults();
  }

  // Imprimir resultados
  printResults() {
    console.log(`[${new Date().toISOString()}] ` + '\n📊 RESULTADOS DA VERIFICAÇÃO:\n');

    if (this.success.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '✅ SUCESSOS:');
      this.success.forEach(msg => console.log(`[${new Date().toISOString()}] ` + `  ${msg}`));
      console.log(`[${new Date().toISOString()}] ` + '');
    }

    if (this.warnings.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '⚠️ AVISOS:');
      this.warnings.forEach(msg => console.log(`[${new Date().toISOString()}] ` + `  ${msg}`));
      console.log(`[${new Date().toISOString()}] ` + '');
    }

    if (this.errors.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '❌ ERROS:');
      this.errors.forEach(msg => console.log(`[${new Date().toISOString()}] ` + `  ${msg}`));
      console.log(`[${new Date().toISOString()}] ` + '');
    }

    const total = this.success.length + this.warnings.length + this.errors.length;
    console.log(`[${new Date().toISOString()}] ` + `📈 TOTAL: ${total} verificações realizadas`);
    console.log(`[${new Date().toISOString()}] ` + `✅ Sucessos: ${this.success.length}`);
    console.log(`[${new Date().toISOString()}] ` + `⚠️ Avisos: ${this.warnings.length}`);
    console.log(`[${new Date().toISOString()}] ` + `❌ Erros: ${this.errors.length}`);

    if (this.errors.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '\n🚨 VERIFICAÇÃO FALHOU - Corrija os erros antes de continuar!');
      process.exit(1);
    } else if (this.warnings.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '\n⚠️ VERIFICAÇÃO COM AVISOS - Considere corrigir os avisos');
    } else {
      console.log(`[${new Date().toISOString()}] ` + '\n🎉 VERIFICAÇÃO APROVADA - Todas as versões são compatíveis!');
    }
  }
}

// Executar verificação
if (require.main === module) {
  const checker = new VersionChecker();
  checker.runAllChecks();
}

module.exports = VersionChecker;
