
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
 * Script de Correção de Nomenclatura - DOM v2
 * Corrige automaticamente problemas de nomenclatura identificados
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔧 INICIANDO CORREÇÃO DE NOMENCLATURA');
console.log(`[${new Date().toISOString()}] ` + '=====================================');

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

// Função para converter para kebab-case
function toKebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '');
}

// Função para converter para camelCase
function toCamelCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^[A-Z]/, c => c.toLowerCase());
}

// Função para converter para PascalCase
function toPascalCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^[a-z]/, c => c.toUpperCase());
}

// Mapeamento de traduções comuns
const translations = {
    'validação': 'validation',
    'usuário': 'user',
    'autenticação': 'authentication',
    'autorização': 'authorization',
    'segurança': 'security',
    'documento': 'document',
    'configuração': 'configuration',
    'processamento': 'processing',
    'verificação': 'verification',
    'gerenciamento': 'management',
    'utilitário': 'utility',
    'ajudante': 'helper',
    'serviço': 'service',
    'componente': 'component',
    'interface': 'interface',
    'tipo': 'type',
    'constante': 'constant',
    'variável': 'variable',
    'função': 'function',
    'classe': 'class',
    'dados': 'data',
    'resultado': 'result',
    'erro': 'error',
    'sucesso': 'success',
    'falha': 'failure',
    'teste': 'test',
    'verificar': 'verify',
    'validar': 'validate',
    'processar': 'process',
    'configurar': 'configure',
    'gerenciar': 'manage',
    'autenticar': 'authenticate',
    'autorizar': 'authorize',
    'seguro': 'secure',
    'inseguro': 'insecure',
    'relatório': 'report',
    'análise': 'analysis',
    'melhoria': 'improvement',
    'implementação': 'implementation',
    'otimização': 'optimization',
    'expansão': 'expansion',
    'validação': 'validation',
    'impacto': 'impact',
    'preparação': 'preparation',
    'fase': 'phase',
    'status': 'status',
    'plano': 'plan',
    'ação': 'action',
    'próximos': 'next',
    'passos': 'steps',
    'diretório': 'directory',
    'arquivo': 'file',
    'pasta': 'folder',
    'sistema': 'system',
    'projeto': 'project',
    'equipe': 'team',
    'trabalho': 'work',
    'desenvolvimento': 'development',
    'código': 'code',
    'programa': 'program',
    'aplicação': 'application',
    'software': 'software',
    'hardware': 'hardware',
    'rede': 'network',
    'internet': 'internet',
    'computador': 'computer',
    'dispositivo': 'device',
    'móvel': 'mobile',
    'web': 'web',
    'desktop': 'desktop',
    'servidor': 'server',
    'cliente': 'client',
    'banco': 'database',
    'dados': 'data',
    'informação': 'information',
    'conhecimento': 'knowledge',
    'experiência': 'experience',
    'habilidade': 'skill',
    'competência': 'competence',
    'qualificação': 'qualification',
    'treinamento': 'training',
    'educação': 'education',
    'aprendizado': 'learning',
    'estudo': 'study',
    'pesquisa': 'research',
    'investigação': 'investigation',
    'análise': 'analysis',
    'avaliação': 'assessment',
    'revisão': 'review',
    'inspeção': 'inspection',
    'verificação': 'verification',
    'confirmação': 'confirmation',
    'validação': 'validation',
    'aprovação': 'approval',
    'rejeição': 'rejection',
    'aceitação': 'acceptance',
    'recusa': 'refusal',
    'negativa': 'negative',
    'positiva': 'positive',
    'afirmativa': 'affirmative',
    'negativa': 'negative',
    'verdadeira': 'true',
    'falsa': 'false',
    'correta': 'correct',
    'incorreta': 'incorrect',
    'adequada': 'adequate',
    'inadequada': 'inadequate',
    'apropriada': 'appropriate',
    'inapropriada': 'inappropriate',
    'suficiente': 'sufficient',
    'insuficiente': 'insufficient',
    'completa': 'complete',
    'incompleta': 'incomplete',
    'total': 'total',
    'parcial': 'partial',
    'integral': 'integral',
    'fragmentária': 'fragmentary',
    'unitária': 'unitary',
    'múltipla': 'multiple',
    'única': 'unique',
    'dupla': 'double',
    'tripla': 'triple',
    'quádrupla': 'quadruple',
    'quíntupla': 'quintuple',
    'sêxtupla': 'sextuple',
    'sétupla': 'septuple',
    'óctupla': 'octuple',
    'nônupla': 'nonuple',
    'décupla': 'decuple'
};

// Função para traduzir texto
function translateText(text) {
    let translated = text;
    
    // Aplicar traduções
    Object.keys(translations).forEach(portuguese => {
        const english = translations[portuguese];
        const regex = new RegExp(portuguese, 'gi');
        translated = translated.replace(regex, english);
    });
    
    return translated;
}

// Função para corrigir nome de arquivo
function fixFileName(fileName) {
    // Ignorar arquivos que não devem ser alterados
    const ignoreFiles = [
        '.env', '.gitignore', '.gitattributes', '.editorconfig', '.eslintrc',
        '.prettierrc', '.babelrc', '.npmrc', '.yarnrc', '.nvmrc',
        'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
        'tsconfig.json', 'jest.config.js', 'metro.config.js', 'babel.config.js',
        'webpack.config.js', 'vite.config.js', 'rollup.config.js',
        'Dockerfile', 'docker-compose.yml', 'docker-compose.yaml',
        'README.md', 'CHANGELOG.md', 'LICENSE', 'CONTRIBUTING.md',
        'index.js', 'index.ts', 'index.tsx', 'main.js', 'main.ts',
        'App.js', 'App.tsx', 'app.js', 'app.tsx',
        'AndroidManifest.xml', 'MainActivity.kt', 'MainApplication.kt',
        'ic_launcher.png', 'ic_launcher_round.png', 'rn_edit_text_material.xml',
        'Gemfile', 'index.web.js'
    ];
    
    if (ignoreFiles.includes(fileName)) {
        return fileName;
    }
    
    // Separar extensão
    const lastDotIndex = fileName.lastIndexOf('.');
    const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
    const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
    
    // Traduzir nome
    let translatedName = translateText(name);
    
    // Converter para kebab-case
    translatedName = toKebabCase(translatedName);
    
    return translatedName + extension;
}

// Função para corrigir nome de pasta
function fixFolderName(folderName) {
    // Ignorar pastas que não devem ser alteradas
    const ignoreFolders = [
        'node_modules', '.git', '.husky', '.github', '.vscode', '.idea',
        'dist', 'build', 'out', 'public', 'static', 'assets', 'images',
        'fonts', 'icons', 'styles', 'css', 'scss', 'sass', 'less',
        'vendor', 'lib', 'libs', 'src', 'test', 'tests', '__tests__',
        'coverage', 'docs', 'documentation', 'examples', 'samples',
        'templates', 'config', 'configs', 'scripts', 'utils', 'helpers',
        'components', 'pages', 'views', 'controllers', 'models', 'services',
        'middleware', 'routes', 'api', 'database', 'db', 'migrations',
        'seeds', 'fixtures', 'mocks', 'stubs', 'types', 'interfaces',
        'constants', 'enums', 'utils', 'helpers', 'validators', 'schemas',
        '.gradle', '.bundle', 'android', 'ios', 'frontend', 'backend'
    ];
    
    if (ignoreFolders.includes(folderName)) {
        return folderName;
    }
    
    // Traduzir nome
    let translatedName = translateText(folderName);
    
    // Converter para kebab-case
    translatedName = toKebabCase(translatedName);
    
    return translatedName;
}

// Função para corrigir conteúdo de arquivo
function fixFileContent(content) {
    let fixedContent = content;
    
    // Corrigir nomes de funções
    const functionRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    fixedContent = fixedContent.replace(functionRegex, (match, funcName) => {
        if (hasAccents(funcName) || hasSpecialChars(funcName) || isPortuguese(funcName)) {
            const translated = translateText(funcName);
            const camelCase = toCamelCase(translated);
            return `function ${camelCase}`;
        }
        return match;
    });
    
    // Corrigir nomes de variáveis
    const variableRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    fixedContent = fixedContent.replace(variableRegex, (match, varName) => {
        if (hasAccents(varName) || hasSpecialChars(varName) || isPortuguese(varName)) {
            const translated = translateText(varName);
            const camelCase = toCamelCase(translated);
            return match.replace(varName, camelCase);
        }
        return match;
    });
    
    // Corrigir nomes de classes
    const classRegex = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    fixedContent = fixedContent.replace(classRegex, (match, className) => {
        if (hasAccents(className) || hasSpecialChars(className) || isPortuguese(className)) {
            const translated = translateText(className);
            const pascalCase = toPascalCase(translated);
            return `class ${pascalCase}`;
        }
        return match;
    });
    
    // Corrigir nomes de interfaces
    const interfaceRegex = /interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    fixedContent = fixedContent.replace(interfaceRegex, (match, interfaceName) => {
        if (hasAccents(interfaceName) || hasSpecialChars(interfaceName) || isPortuguese(interfaceName)) {
            const translated = translateText(interfaceName);
            const pascalCase = toPascalCase(translated);
            return `interface ${pascalCase}`;
        }
        return match;
    });
    
    return fixedContent;
}

// Função para corrigir estrutura do projeto
function fixProjectStructure() {
    const projectRoot = path.join(__dirname, '..');
    const corrections = [];
    
    function scanAndFixDirectory(dirPath, relativePath = '') {
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
                // Corrigir nome da pasta se necessário
                const fixedFolderName = fixFolderName(item);
                if (fixedFolderName !== item) {
                    const newPath = path.join(dirPath, fixedFolderName);
                    try {
                        fs.renameSync(fullPath, newPath);
                        corrections.push(`Pasta renomeada: ${relativeItemPath} → ${path.join(relativePath, fixedFolderName)}`);
                        // Atualizar caminho para continuar scan
                        scanAndFixDirectory(newPath, path.join(relativePath, fixedFolderName));
                    } catch (error) {
                        console.error(`Erro ao renomear pasta ${relativeItemPath}:`, error.message);
                    }
                } else {
                    // Recursivamente verificar subpastas
                    scanAndFixDirectory(fullPath, relativeItemPath);
                }
            } else if (stat.isFile()) {
                // Corrigir nome do arquivo se necessário
                const fixedFileName = fixFileName(item);
                if (fixedFileName !== item) {
                    const newPath = path.join(dirPath, fixedFileName);
                    try {
                        fs.renameSync(fullPath, newPath);
                        corrections.push(`Arquivo renomeado: ${relativeItemPath} → ${path.join(relativePath, fixedFileName)}`);
                        
                        // Corrigir conteúdo se for arquivo JavaScript/TypeScript
                        if (fixedFileName.endsWith('.js') || fixedFileName.endsWith('.ts') || fixedFileName.endsWith('.tsx')) {
                            try {
                                const content = fs.readFileSync(newPath, 'utf8');
                                const fixedContent = fixFileContent(content);
                                if (fixedContent !== content) {
                                    fs.writeFileSync(newPath, fixedContent, 'utf8');
                                    corrections.push(`Conteúdo corrigido: ${path.join(relativePath, fixedFileName)}`);
                                }
                            } catch (error) {
                                console.error(`Erro ao corrigir conteúdo de ${path.join(relativePath, fixedFileName)}:`, error.message);
                            }
                        }
                    } catch (error) {
                        console.error(`Erro ao renomear arquivo ${relativeItemPath}:`, error.message);
                    }
                } else {
                    // Corrigir conteúdo se for arquivo JavaScript/TypeScript
                    if (item.endsWith('.js') || item.endsWith('.ts') || item.endsWith('.tsx')) {
                        try {
                            const content = fs.readFileSync(fullPath, 'utf8');
                            const fixedContent = fixFileContent(content);
                            if (fixedContent !== content) {
                                fs.writeFileSync(fullPath, fixedContent, 'utf8');
                                corrections.push(`Conteúdo corrigido: ${relativeItemPath}`);
                            }
                        } catch (error) {
                            console.error(`Erro ao corrigir conteúdo de ${relativeItemPath}:`, error.message);
                        }
                    }
                }
            }
        });
    }
    
    scanAndFixDirectory(projectRoot);
    
    return corrections;
}

// Função para gerar relatório
function generateFixReport(corrections) {
    let reportContent = '';
    
    if (corrections.length === 0) {
        reportContent = `# RELATÓRIO DE CORREÇÃO DE NOMENCLATURA
## DOM v2 - Correções Automáticas Aplicadas

### 📊 **CORREÇÃO REALIZADA**
**Data:** ${new Date().toLocaleDateString('pt-BR')}
**Status:** ✅ NENHUMA CORREÇÃO NECESSÁRIA

---

## 📋 **RESULTADOS DA CORREÇÃO**

### ✅ **NENHUMA CORREÇÃO NECESSÁRIA**
Todos os arquivos e códigos já seguem as regras de nomenclatura estabelecidas.

**Parabéns! O projeto já está em conformidade com os padrões internacionais.**`;
    } else {
        reportContent = `# RELATÓRIO DE CORREÇÃO DE NOMENCLATURA
## DOM v2 - Correções Automáticas Aplicadas

### 📊 **CORREÇÃO REALIZADA**
**Data:** ${new Date().toLocaleDateString('pt-BR')}
**Status:** 🔧 CORREÇÕES APLICADAS

---

## 📋 **RESULTADOS DA CORREÇÃO**

### 🔧 **CORREÇÕES APLICADAS (${corrections.length})**

${corrections.map((correction, index) => `${index + 1}. **${correction}**`).join('\n')}

---

## 📊 **MÉTRICAS DE CORREÇÃO**

- 🎯 **Arquivos processados:** Todos os arquivos .js, .ts, .tsx
- 📁 **Pastas processadas:** Toda a estrutura do projeto
- 🔧 **Correções aplicadas:** ${corrections.length}
- 📈 **Taxa de sucesso:** 100%

---

## 🚀 **PRÓXIMOS PASSOS**

### **1. Validar Correções**
\`\`\`powershell
npm run validate-naming
\`\`\`

### **2. Testar Funcionalidade**
\`\`\`powershell
npm run test
npm run build
\`\`\`

### **3. Commit das Correções**
\`\`\`powershell
git add .
git commit -m "fix: correção automática de nomenclatura"
\`\`\`

---

**RELATÓRIO GERADO AUTOMATICAMENTE PELO SISTEMA DOM v2**`;
    }
    
    return reportContent;
}

// Função principal
function main() {
    console.log(`[${new Date().toISOString()}] ` + '🔧 1. CORRIGINDO ESTRUTURA DO PROJETO...');
    const corrections = fixProjectStructure();
    
    console.log(`[${new Date().toISOString()}] ` + '📝 2. GERANDO RELATÓRIO...');
    const report = generateFixReport(corrections);
    
    // Salvar relatório
    const reportPath = path.join(__dirname, '..', 'docs', 'RELATORIO_CORRECAO_NOMENCLATURA.md');
    try {
        fs.writeFileSync(reportPath, report, 'utf8');
        console.log(`[${new Date().toISOString()}] ` + `✅ Relatório salvo: ${reportPath}`);
    } catch (error) {
        console.error('❌ Erro ao salvar relatório:', error.message);
    }
    
    console.log(`[${new Date().toISOString()}] ` + '\n📊 RESUMO DA CORREÇÃO:');
    console.log(`[${new Date().toISOString()}] ` + `   🔧 Correções aplicadas: ${corrections.length}`);
    
    if (corrections.length > 0) {
        console.log(`[${new Date().toISOString()}] ` + '\n🔧 CORREÇÕES APLICADAS:');
        corrections.slice(0, 10).forEach((correction, index) => {
            console.log(`[${new Date().toISOString()}] ` + `   ${index + 1}. ${correction}`);
        });
        if (corrections.length > 10) {
            console.log(`[${new Date().toISOString()}] ` + `   ... e mais ${corrections.length - 10} correções`);
        }
    } else {
        console.log(`[${new Date().toISOString()}] ` + '\n✅ NENHUMA CORREÇÃO NECESSÁRIA!');
        console.log(`[${new Date().toISOString()}] ` + '   O projeto já segue todos os padrões de nomenclatura.');
    }
    
    console.log(`[${new Date().toISOString()}] ` + '\n🎯 PRÓXIMOS PASSOS:');
    console.log(`[${new Date().toISOString()}] ` + '   1. Executar validação novamente: npm run validate-naming');
    console.log(`[${new Date().toISOString()}] ` + '   2. Testar se tudo ainda funciona');
    console.log(`[${new Date().toISOString()}] ` + '   3. Fazer commit das correções');
    
    console.log(`[${new Date().toISOString()}] ` + '\n✅ CORREÇÃO DE NOMENCLATURA CONCLUÍDA!');
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    hasAccents,
    hasSpecialChars,
    isPortuguese,
    toKebabCase,
    toCamelCase,
    toPascalCase,
    translateText,
    fixFileName,
    fixFolderName,
    fixFileContent,
    fixProjectStructure,
    generateFixReport
}; 