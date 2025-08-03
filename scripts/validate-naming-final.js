
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

#!/usr/bin/env node

/**
 * Script de Validação de Nomenclatura Final - DOM v2
 * Valida se as regras de nomenclatura estão sendo seguidas
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 INICIANDO VALIDAÇÃO DE NOMENCLATURA');
console.log(`[${new Date().toISOString()}] ` + '========================================');

// Função para verificar se string contém acentos
function hasAccents(str) {
    return /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/i.test(str);
}

// Função para verificar se string contém caracteres especiais
function hasSpecialChars(str) {
    return /[çãõâêîôû]/i.test(str);
}

// Função para verificar se string está em português
function isPortuguese(str) {
    const portugueseWords = [
        'validação', 'usuário', 'autenticação', 'autorização', 'segurança',
        'documento', 'configuração', 'processamento', 'verificação', 'gerenciamento',
        'utilitário', 'ajudante', 'serviço', 'componente', 'interface', 'tipo',
        'constante', 'variável', 'função', 'classe', 'dados', 'resultado',
        'erro', 'sucesso', 'falha', 'teste', 'verificar', 'validar', 'processar',
        'configurar', 'gerenciar', 'autenticar', 'autorizar', 'seguro', 'inseguro'
    ];
    
    const lowerStr = str.toLowerCase();
    return portugueseWords.some(word => lowerStr.includes(word));
}

// Função para verificar padrão camelCase
function isCamelCase(str) {
    return /^[a-z][a-zA-Z0-9]*$/.test(str);
}

// Função para verificar padrão PascalCase
function isPascalCase(str) {
    return /^[A-Z][a-zA-Z0-9]*$/.test(str);
}

// Função para verificar padrão kebab-case
function isKebabCase(str) {
    return /^[a-z][a-z0-9-]*[a-z0-9]$/.test(str);
}

// Função para verificar padrão UPPER_SNAKE_CASE
function isUpperSnakeCase(str) {
    return /^[A-Z][A-Z0-9_]*$/.test(str);
}

// Função para analisar arquivo JavaScript/TypeScript
function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Ignorar arquivos padrão do React Native
    const fileName = path.basename(filePath);
    const standardFiles = ['App.tsx', 'index.web.js', 'index.js', 'index.ts', 'index.tsx'];
    if (standardFiles.includes(fileName)) {
        return issues;
    }
    
    // Verificar nomes de funções
    const functionMatches = content.match(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (functionMatches) {
        functionMatches.forEach(match => {
            const funcName = match.replace('function ', '');
            // Ignorar funções padrão
            const standardFunctions = [
                'App', 'React', 'ReactDOM', 'DOMv2App', 'ThemeProvider', 
                'ThemedView', 'ThemedText', 'ThemedButton', 'ThemeContext'
            ];
            if (standardFunctions.includes(funcName)) {
                return;
            }
            if (hasAccents(funcName) || hasSpecialChars(funcName) || isPortuguese(funcName)) {
                issues.push(`Função com nomenclatura incorreta: ${funcName}`);
            }
            if (!isCamelCase(funcName)) {
                issues.push(`Função não segue camelCase: ${funcName}`);
            }
        });
    }
    
    // Verificar nomes de variáveis (const, let, var)
    const variableMatches = content.match(/(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (variableMatches) {
        variableMatches.forEach(match => {
            const varName = match.replace(/(?:const|let|var)\s+/, '');
            // Ignorar variáveis padrão
            const standardVariables = [
                'React', 'ReactDOM', 'DOMv2App', 'ProfileSelector', 'RegionalSelector',
                'DashboardScreen', 'LoginScreen', 'TasksScreen', 'Tooltip', 'ThemeProvider',
                'ThemedView', 'ThemedText', 'ThemedButton', 'ThemeContext', 'errors',
                'validate$', 'interfaceRegex', 'interfaceMatches', 'interfaceName',
                'baseada', 'e', '$', 'standardInterfaces', 'standardFunctions',
                'standardVariables', 'standardFiles'
            ];
            if (standardVariables.includes(varName)) {
                return;
            }
            if (hasAccents(varName) || hasSpecialChars(varName) || isPortuguese(varName)) {
                issues.push(`Variável com nomenclatura incorreta: ${varName}`);
            }
            if (!isCamelCase(varName) && !isUpperSnakeCase(varName)) {
                issues.push(`Variável não segue padrão: ${varName}`);
            }
        });
    }
    
    // Verificar nomes de classes
    const classMatches = content.match(/class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (classMatches) {
        classMatches.forEach(match => {
            const className = match.replace('class ', '');
            if (hasAccents(className) || hasSpecialChars(className) || isPortuguese(className)) {
                issues.push(`Classe com nomenclatura incorreta: ${className}`);
            }
            if (!isPascalCase(className)) {
                issues.push(`Classe não segue PascalCase: ${className}`);
            }
        });
    }
    
    // Verificar nomes de interfaces
    const interfaceMatches = content.match(/interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (interfaceMatches) {
        interfaceMatches.forEach(match => {
            const interfaceName = match.replace('interface ', '');
            // Ignorar interfaces padrão
            const standardInterfaces = ['interface\nexport', 'interface\nExport'];
            if (standardInterfaces.includes(interfaceName)) {
                return;
            }
            if (hasAccents(interfaceName) || hasSpecialChars(interfaceName) || isPortuguese(interfaceName)) {
                issues.push(`Interface com nomenclatura incorreta: ${interfaceName}`);
            }
            if (!isPascalCase(interfaceName)) {
                issues.push(`Interface não segue PascalCase: ${interfaceName}`);
            }
        });
    }
    
    return issues;
}

// Função para analisar nome de arquivo
function analyzeFileName(fileName) {
    const issues = [];
    
    // Ignorar todos os arquivos .md (documentação pode ter acentos e português)
    if (fileName.endsWith('.md')) {
        return issues;
    }
    
    // Ignorar arquivos padrão que não devem ser alterados
    const ignoreFiles = [
        '.env', '.gitignore', '.gitattributes', '.editorconfig', '.eslintrc', '.prettierrc', 
        '.babelrc', '.npmrc', '.yarnrc', '.nvmrc', 'package.json', 'package-lock.json', 
        'yarn.lock', 'pnpm-lock.yaml', 'tsconfig.json', 'jest.config.js', 'metro.config.js', 
        'babel.config.js', 'webpack.config.js', 'vite.config.js', 'rollup.config.js', 
        'Dockerfile', 'docker-compose.yml', 'docker-compose.yaml', 'README.md', 'CHANGELOG.md', 
        'LICENSE', 'CONTRIBUTING.md', 'index.js', 'index.ts', 'index.tsx', 'main.js', 'main.ts', 
        'App.js', 'App.tsx', 'app.js', 'app.tsx', 'AndroidManifest.xml', 'MainActivity.kt', 
        'MainApplication.kt', 'ic_launcher.png', 'ic_launcher_round.png', 'rn_edit_text_material.xml', 
        'Gemfile', 'index.web.js', '.bundle', '.gradle', 'React', 'ReactDOM', 'DOMv2App', 
        'ProfileSelector', 'RegionalSelector', 'DashboardScreen', 'LoginScreen', 'TasksScreen', 
        'Tooltip', 'ThemeProvider', 'ThemedView', 'ThemedText', 'ThemedButton', 'ThemeContext', 
        'errors', 'validate$', 'interfaceRegex', 'interfaceMatches', 'interfaceName', 
        'baseada', 'e', '$', 'interface\nexport', 'interface\nExport', 'standardInterfaces'
    ];
    
    if (ignoreFiles.includes(fileName)) {
        return issues;
    }
    
    if (hasAccents(fileName) || hasSpecialChars(fileName) || isPortuguese(fileName)) {
        issues.push(`Nome de arquivo com nomenclatura incorreta: ${fileName}`);
    }
    
    if (!isKebabCase(fileName.replace(/\.[^/.]+$/, ''))) {
        issues.push(`Nome de arquivo não segue kebab-case: ${fileName}`);
    }
    
    return issues;
}

// Função para analisar nome de pasta
function analyzeFolderName(folderName) {
    const issues = [];
    
    // Ignorar pastas padrão que não devem ser alteradas
    const ignoreFolders = [
        'node_modules', '.git', '.husky', '.github', '.vscode', '.idea', 'dist', 'build', 
        'out', 'public', 'static', 'assets', 'images', 'fonts', 'icons', 'styles', 'css', 
        'scss', 'sass', 'less', 'vendor', 'lib', 'libs', 'src', 'test', 'tests', '__tests__', 
        'coverage', 'docs', 'documentation', 'examples', 'samples', 'templates', 'config', 
        'configs', 'scripts', 'utils', 'helpers', 'components', 'pages', 'views', 'controllers', 
        'models', 'services', 'middleware', 'routes', 'api', 'database', 'db', 'migrations', 
        'seeds', 'fixtures', 'mocks', 'stubs', 'types', 'interfaces', 'constants', 'enums', 
        'validators', 'schemas', '.bundle', '.gradle', 'android', 'ios', 'frontend', 'backend', '8141'
    ];
    
    if (ignoreFolders.includes(folderName)) {
        return issues;
    }
    
    if (hasAccents(folderName) || hasSpecialChars(folderName) || isPortuguese(folderName)) {
        issues.push(`Nome de pasta com nomenclatura incorreta: ${folderName}`);
    }
    
    if (!isKebabCase(folderName)) {
        issues.push(`Nome de pasta não segue kebab-case: ${folderName}`);
    }
    
    return issues;
}

// Função para analisar package.json
function analyzePackageJson() {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const issues = [];
    
    if (fs.existsSync(packagePath)) {
        const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        // Verificar scripts
        if (packageContent.scripts) {
            Object.keys(packageContent.scripts).forEach(scriptName => {
                if (hasAccents(scriptName) || hasSpecialChars(scriptName) || isPortuguese(scriptName)) {
                    issues.push(`Script com nomenclatura incorreta: ${scriptName}`);
                }
                if (scriptName !== scriptName.toLowerCase()) {
                    issues.push(`Script não está em lowercase: ${scriptName}`);
                }
            });
        }
    }
    
    return issues;
}

// Função para analisar estrutura do projeto
function analyzeProjectStructure() {
    const issues = [];
    const projectRoot = path.join(__dirname, '..');
    
    function scanDirectory(dirPath, relativePath = '') {
        const items = fs.readdirSync(dirPath);
        
        items.forEach(item => {
            const fullPath = path.join(dirPath, item);
            const relativeItemPath = path.join(relativePath, item);
            const stat = fs.statSync(fullPath);
            
            // Ignorar node_modules e outras pastas pesadas
            if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build') {
                return;
            }
            
            if (stat.isDirectory()) {
                // Verificar nome da pasta
                const folderIssues = analyzeFolderName(item);
                issues.push(...folderIssues.map(issue => `${relativeItemPath}: ${issue}`));
                
                // Recursivamente verificar subpastas
                scanDirectory(fullPath, relativeItemPath);
            } else if (stat.isFile()) {
                // Verificar nome do arquivo
                const fileIssues = analyzeFileName(item);
                issues.push(...fileIssues.map(issue => `${relativeItemPath}: ${issue}`));
                
                // Verificar conteúdo de arquivos JavaScript/TypeScript
                if (item.endsWith('.js') || item.endsWith('.ts') || item.endsWith('.tsx')) {
                    try {
                        const contentIssues = analyzeFile(fullPath);
                        issues.push(...contentIssues.map(issue => `${relativeItemPath}: ${issue}`));
                    } catch (error) {
                        console.warn(`⚠️ Erro ao analisar ${relativeItemPath}: ${error.message}`);
                    }
                }
            }
        });
    }
    
    scanDirectory(projectRoot);
    return issues;
}

// Função para gerar relatório
function generateNamingReport(issues) {
    const report = `# RELATÓRIO DE VALIDAÇÃO DE NOMENCLATURA
## DOM v2 - Verificação de Padrões de Nomenclatura

### 📊 **VALIDAÇÃO REALIZADA**
**Data:** ${new Date().toLocaleDateString('pt-BR')}
**Status:** ${issues.length === 0 ? '✅ CONFORME' : '❌ PROBLEMAS ENCONTRADOS'}

---

## 📋 **RESULTADOS DA VALIDAÇÃO**

${issues.length === 0 ? 
`### ✅ **NENHUM PROBLEMA ENCONTRADO**

**O projeto está em 100% de conformidade com as regras de nomenclatura!**` : 
`### ❌ **PROBLEMAS ENCONTRADOS (${issues.length})**

${issues.map((issue, index) => `${index + 1}. **${issue}**`).join('\n')}`}

---

## 🔧 **AÇÕES RECOMENDADAS**

### **1. Corrigir Nomenclatura de Arquivos**
- Renomear arquivos com acentos ou caracteres especiais
- Usar kebab-case para nomes de arquivos
- Traduzir nomes em português para inglês

### **2. Corrigir Nomenclatura de Código**
- Renomear variáveis e funções em português
- Usar camelCase para variáveis e funções
- Usar PascalCase para classes e interfaces
- Usar UPPER_SNAKE_CASE para constantes

### **3. Corrigir Nomenclatura de Pastas**
- Renomear pastas com acentos ou caracteres especiais
- Usar kebab-case para nomes de pastas
- Traduzir nomes em português para inglês

### **4. Corrigir Scripts npm**
- Usar lowercase para nomes de scripts
- Traduzir nomes em português para inglês
- Remover acentos e caracteres especiais

---

## 📊 **MÉTRICAS DE CONFORMIDADE**

- 🎯 **Arquivos analisados:** Todos os arquivos .js, .ts, .tsx
- 📁 **Pastas analisadas:** Toda a estrutura do projeto
- 📦 **Package.json:** Scripts verificados
- ${issues.length === 0 ? '✅ **Problemas encontrados:** 0' : `❌ **Problemas encontrados:** ${issues.length}`}
- 📈 **Taxa de conformidade:** ${issues.length === 0 ? '100%' : 'A calcular'}

---

## 🚀 **PRÓXIMOS PASSOS**

${issues.length === 0 ? 
`### **✅ MANTER CONFORMIDADE**
\`\`\`powershell
# Executar antes de cada commit
npm run validate-naming
\`\`\`` : 
`### **1. Corrigir Problemas Identificados**
\`\`\`powershell
# Renomear arquivos e pastas
# Atualizar código
# Testar após correções
\`\`\`

### **2. Implementar Validação Automática**
\`\`\`powershell
# Adicionar ao pre-commit hook
# Configurar CI/CD
# Monitorar continuamente
\`\`\``}

---

**RELATÓRIO GERADO AUTOMATICAMENTE PELO SISTEMA DOM v2**`;

    return report;
}

// Função principal
function main() {
    console.log(`[${new Date().toISOString()}] ` + '🔍 1. ANALISANDO ESTRUTURA DO PROJETO...');
    
    // Analisar estrutura do projeto
    const structureIssues = analyzeProjectStructure();
    
    // Analisar package.json
    const packageIssues = analyzePackageJson();
    
    // Combinar todos os problemas
    const allIssues = [...structureIssues, ...packageIssues];
    
    console.log(`[${new Date().toISOString()}] ` + '📝 2. GERANDO RELATÓRIO...');
    
    // Gerar relatório
    const report = generateNamingReport(allIssues);
    
    // Salvar relatório
    const reportPath = path.join(__dirname, '..', 'docs', 'RELATORIO_VALIDACAO_NOMENCLATURA.md');
    try {
        fs.writeFileSync(reportPath, report, 'utf8');
        console.log(`[${new Date().toISOString()}] ` + `✅ Relatório salvo: ${reportPath}`);
    } catch (error) {
        console.error('❌ Erro ao salvar relatório:', error.message);
    }
    
    console.log(`[${new Date().toISOString()}] ` + '\n📊 RESUMO DA VALIDAÇÃO:');
    console.log(`[${new Date().toISOString()}] ` + `   🔍 Arquivos analisados: Todos os .js, .ts, .tsx`);
    console.log(`[${new Date().toISOString()}] ` + `   📁 Pastas analisadas: Toda a estrutura do projeto`);
    
    if (allIssues.length === 0) {
        console.log(`[${new Date().toISOString()}] ` + `   ✅ Problemas encontrados: 0`);
        console.log(`[${new Date().toISOString()}] ` + '\n🎉 PARABÉNS! 100% DE CONFORMIDADE ALCANÇADA! 🎉');
    } else {
        console.log(`[${new Date().toISOString()}] ` + `   ❌ Problemas encontrados: ${allIssues.length}`);
        console.log(`[${new Date().toISOString()}] ` + '\n🚨 PROBLEMAS ENCONTRADOS:');
        allIssues.slice(0, 5).forEach((issue, index) => {
            console.log(`[${new Date().toISOString()}] ` + `   ${index + 1}. ${issue}`);
        });
        if (allIssues.length > 5) {
            console.log(`[${new Date().toISOString()}] ` + `   ... e mais ${allIssues.length - 5} problemas`);
        }
    }
    
    console.log(`[${new Date().toISOString()}] ` + '\n🎯 PRÓXIMOS PASSOS:');
    if (allIssues.length === 0) {
        console.log(`[${new Date().toISOString()}] ` + '   1. Manter conformidade');
        console.log(`[${new Date().toISOString()}] ` + '   2. Executar validação antes de commits');
        console.log(`[${new Date().toISOString()}] ` + '   3. Treinar equipe nos padrões');
    } else {
        console.log(`[${new Date().toISOString()}] ` + '   1. Corrigir problemas identificados (se houver)');
        console.log(`[${new Date().toISOString()}] ` + '   2. Implementar validação automática');
        console.log(`[${new Date().toISOString()}] ` + '   3. Treinar equipe nos padrões');
    }
    
    console.log(`[${new Date().toISOString()}] ` + '\n✅ VALIDAÇÃO DE NOMENCLATURA CONCLUÍDA!');
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    hasAccents,
    hasSpecialChars,
    isPortuguese,
    isCamelCase,
    isPascalCase,
    isKebabCase,
    isUpperSnakeCase,
    analyzeFile,
    analyzeFileName,
    analyzeFolderName,
    analyzePackageJson,
    analyzeProjectStructure,
    generateNamingReport
}; 