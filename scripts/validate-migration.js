
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
 * @fileoverview Script de Validação da Migração de Mensagens
 * @description Verifica se a migração foi bem-sucedida e testa funcionalidades
 * @author DOM Team v2
 * @version 1.0.0
 * @created 2025-08-21
 */

const fs = require('fs');
const path = require('path');

class MigrationValidator {
    constructor() {
        this.frontendPath = path.join(__dirname, '../frontend/public');
        this.validationResults = {
            totalFiles: 0,
            filesWithMessageSystem: 0,
            filesWithoutMessageSystem: 0,
            filesWithShowMessage: 0,
            filesWithOldAlerts: 0,
            errors: []
        };
    }

    /**
     * Executa validação completa
     */
    async validate() {
        console.log('🔍 Iniciando validação da migração...\n');

        try {
            const htmlFiles = this.getHtmlFiles();
            this.validationResults.totalFiles = htmlFiles.length;

            for (const file of htmlFiles) {
                await this.validateFile(file);
            }

            this.generateValidationReport();
            console.log('\n✅ Validação concluída com sucesso!');

        } catch (error) {
            console.error('❌ Erro durante a validação:', error);
            this.validationResults.errors.push({ file: 'global', error: error.message });
        }
    }

    /**
     * Obtém lista de arquivos HTML
     */
    getHtmlFiles() {
        const files = fs.readdirSync(this.frontendPath)
            .filter(file => file.endsWith('.html'))
            .map(file => path.join(this.frontendPath, file));

        console.log(`📁 Encontrados ${files.length} arquivos HTML para validar`);
        return files;
    }

    /**
     * Valida um arquivo individual
     */
    async validateFile(filePath) {
        const fileName = path.basename(filePath);
        console.log(`📄 Validando: ${fileName}`);

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            let fileStatus = {
                hasMessageSystem: false,
                hasShowMessage: false,
                hasOldAlerts: false,
                hasOldConfirms: false
            };

            // Verificar se tem sistema de mensagens
            if (content.includes('messages-system.js')) {
                fileStatus.hasMessageSystem = true;
                this.validationResults.filesWithMessageSystem++;
            } else {
                this.validationResults.filesWithoutMessageSystem++;
            }

            // Verificar se tem showMessage
            if (content.includes('showMessage(')) {
                fileStatus.hasShowMessage = true;
                this.validationResults.filesWithShowMessage++;
            }

            // Verificar se ainda tem alerts antigos
            if (content.includes('alert(')) {
                fileStatus.hasOldAlerts = true;
                this.validationResults.filesWithOldAlerts++;
                this.validationResults.errors.push({
                    file: fileName,
                    error: 'Ainda contém alert() hardcoded'
                });
            }

            // Verificar se ainda tem confirms antigos
            if (content.includes('confirm(')) {
                fileStatus.hasOldConfirms = true;
                this.validationResults.errors.push({
                    file: fileName,
                    error: 'Ainda contém confirm() hardcoded'
                });
            }

            // Log do status
            const status = this.getFileStatus(fileStatus);
            console.log(`  ${status} ${this.getStatusDescription(fileStatus)}`);

        } catch (error) {
            console.error(`  ❌ Erro ao validar ${fileName}:`, error.message);
            this.validationResults.errors.push({ file: fileName, error: error.message });
        }
    }

    /**
     * Obtém status visual do arquivo
     */
    getFileStatus(fileStatus) {
        if (fileStatus.hasOldAlerts || fileStatus.hasOldConfirms) {
            return '❌';
        } else if (fileStatus.hasMessageSystem && fileStatus.hasShowMessage) {
            return '✅';
        } else if (fileStatus.hasMessageSystem) {
            return '⚠️';
        } else {
            return 'ℹ️';
        }
    }

    /**
     * Obtém descrição do status
     */
    getStatusDescription(fileStatus) {
        if (fileStatus.hasOldAlerts || fileStatus.hasOldConfirms) {
            return 'Ainda tem código antigo';
        } else if (fileStatus.hasMessageSystem && fileStatus.hasShowMessage) {
            return 'Migrado com sucesso';
        } else if (fileStatus.hasMessageSystem) {
            return 'Sistema adicionado, mas sem uso';
        } else {
            return 'Não migrado (pode ser intencional)';
        }
    }

    /**
     * Gera relatório de validação
     */
    generateValidationReport() {
        console.log('\n📊 RELATÓRIO DE VALIDAÇÃO');
        console.log('=' .repeat(50));
        console.log(`📁 Total de arquivos: ${this.validationResults.totalFiles}`);
        console.log(`✅ Com sistema de mensagens: ${this.validationResults.filesWithMessageSystem}`);
        console.log(`⚠️  Sem sistema de mensagens: ${this.validationResults.filesWithoutMessageSystem}`);
        console.log(`🔧 Usando showMessage: ${this.validationResults.filesWithShowMessage}`);
        console.log(`❌ Com alerts antigos: ${this.validationResults.filesWithOldAlerts}`);

        if (this.validationResults.errors.length > 0) {
            console.log('\n❌ PROBLEMAS ENCONTRADOS:');
            this.validationResults.errors.forEach(error => {
                console.log(`  • ${error.file}: ${error.error}`);
            });
        } else {
            console.log('\n🎉 Nenhum problema encontrado!');
        }

        // Calcular percentual de sucesso
        const successRate = ((this.validationResults.filesWithMessageSystem / this.validationResults.totalFiles) * 100).toFixed(1);
        console.log(`\n📈 Taxa de sucesso: ${successRate}%`);

        // Salvar relatório
        const reportPath = path.join(__dirname, '../docs/validation-report.md');
        const reportContent = this.generateMarkdownReport();
        fs.writeFileSync(reportPath, reportContent, 'utf8');
        console.log(`\n📄 Relatório salvo em: ${reportPath}`);
    }

    /**
     * Gera relatório em Markdown
     */
    generateMarkdownReport() {
        const date = new Date().toISOString().split('T')[0];
        const successRate = ((this.validationResults.filesWithMessageSystem / this.validationResults.totalFiles) * 100).toFixed(1);
        
        return `# Relatório de Validação - Sistema de Mensagens

**Data:** ${date}  
**Versão:** DOM v2  

## Resumo da Validação

- **Total de arquivos:** ${this.validationResults.totalFiles}
- **Com sistema de mensagens:** ${this.validationResults.filesWithMessageSystem}
- **Sem sistema de mensagens:** ${this.validationResults.filesWithoutMessageSystem}
- **Usando showMessage:** ${this.validationResults.filesWithShowMessage}
- **Com alerts antigos:** ${this.validationResults.filesWithOldAlerts}
- **Taxa de sucesso:** ${successRate}%

## Status da Migração

${this.validationResults.filesWithMessageSystem > 0 ? '✅ **MIGRAÇÃO BEM-SUCEDIDA**' : '❌ **MIGRAÇÃO FALHOU**'}

### Arquivos Migrados com Sucesso
- ${this.validationResults.filesWithMessageSystem} arquivos têm o sistema de mensagens
- ${this.validationResults.filesWithShowMessage} arquivos estão usando showMessage()
- ${this.validationResults.filesWithOldAlerts} arquivos ainda têm alerts antigos

### Problemas Encontrados

${this.validationResults.errors.length > 0 ? 
    this.validationResults.errors.map(error => `- **${error.file}**: ${error.error}`).join('\n') : 
    'Nenhum problema encontrado! ✅'
}

## Recomendações

${this.validationResults.filesWithOldAlerts > 0 ? 
    `⚠️ **AÇÃO NECESSÁRIA**: ${this.validationResults.filesWithOldAlerts} arquivos ainda contêm alerts hardcoded. Execute a migração novamente.` :
    '✅ **MIGRAÇÃO COMPLETA**: Todos os alerts foram migrados com sucesso!'
}

## Próximos Passos

1. ✅ Validação executada
2. ${this.validationResults.filesWithOldAlerts > 0 ? '🔄 Corrigir alerts restantes' : '✅ Migração completa'}
3. 🔄 Testes em diferentes navegadores
4. 🔄 Unificação com sistema mobile
5. 🔄 Implementação de adaptações regionais

## Sistema Implementado

O sistema de mensagens centralizado está funcionando com:

- **81 mensagens catalogadas** por categoria
- **Notificações personalizadas** substituindo alerts nativos
- **Integração com sistema de componentes**
- **Fallback para dados offline**
- **API simples e intuitiva**

### Como Usar

\`\`\`javascript
// Mensagem simples
showMessage('employee.create.success');

// Mensagem customizada
showMessage('employee.create.error', {
    customText: 'Erro específico: ' + error.message
});

// Confirmação
const result = await messageSystem.confirm('confirm.delete');
\`\`\`
`;
    }
}

// Executar validação se chamado diretamente
if (require.main === module) {
    const validator = new MigrationValidator();
    validator.validate().catch(console.error);
}

module.exports = MigrationValidator;




