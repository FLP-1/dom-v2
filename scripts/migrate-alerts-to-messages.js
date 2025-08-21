
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
 * @fileoverview Script de Migração de Alerts Hardcoded para Sistema de Mensagens
 * @description Automatiza a migração dos alerts hardcoded para o sistema centralizado
 * @author DOM Team v2
 * @version 1.1.0
 * @created 2025-08-21
 * 
 * CORREÇÕES:
 * - Melhorado padrão regex para detectar alerts/confirms
 * - Adicionado debug para verificar o que está sendo encontrado
 * - Corrigido problema de substituição
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de alerts comuns para IDs do sistema de mensagens
const alertMappings = {
    // Funcionários
    'Funcionário cadastrado com sucesso!': 'employee.create.success',
    'Funcionário deletado com sucesso!': 'employee.delete.success',
    'Erro ao deletar funcionário:': 'employee.delete.error',
    'Erro ao carregar funcionários:': 'employee.load.error',
    'Erro ao cadastrar funcionário:': 'employee.create.error',

    // Orçamento
    'Orçamento criado com sucesso!': 'budget.create.success',
    'Orçamento deletado com sucesso!': 'budget.delete.success',
    'Erro ao deletar orçamento:': 'budget.delete.error',
    'Erro ao carregar orçamentos:': 'budget.load.error',

    // Pagamentos
    'Pagamento criado com sucesso!': 'payment.create.success',
    'Pagamento marcado como pago com sucesso!': 'payment.process.success',
    'Erro ao marcar como pago:': 'payment.process.error',
    'Erro ao criar pagamento:': 'payment.create.error',
    'Erro ao carregar detalhes do pagamento': 'payment.load.error',

    // Controle de Ponto
    'Erro ao registrar entrada:': 'timeclock.entry.error',
    'Erro ao registrar entrada. Tente novamente.': 'timeclock.entry.error',
    'Erro ao registrar saída:': 'timeclock.exit.error',
    'Erro ao registrar saída. Tente novamente.': 'timeclock.exit.error',

    // Notificações
    'Erro ao marcar como lida. Tente novamente.': 'notification.mark.read.error',
    'Erro ao excluir notificação. Tente novamente.': 'notification.delete.error',

    // Configurações
    'Configurações de notificação salvas com sucesso!': 'settings.notification.success',
    'Configurações de aparência salvas com sucesso!': 'settings.appearance.success',
    'Configurações de privacidade salvas com sucesso!': 'settings.privacy.success',
    'Erro ao salvar configurações:': 'settings.save.error',
    'Cache limpo com sucesso!': 'settings.cache.clear.success',

    // Relatórios
    'Relatório financeiro gerado com sucesso!': 'reports.financial.success',
    'Relatório operacional gerado com sucesso!': 'reports.operational.success',
    'Relatório de RH gerado com sucesso!': 'reports.hr.success',
    'Relatório de performance gerado com sucesso!': 'reports.performance.success',
    'Relatório personalizado criado com sucesso!': 'reports.custom.success',
    'Erro ao gerar relatório:': 'reports.generate.error',
    'Por favor, preencha todos os campos obrigatórios!': 'reports.fields.required',

    // Perfil
    'Perfil atualizado com sucesso!': 'profile.update.success',
    'Senha alterada com sucesso!': 'profile.password.success',
    'Erro ao alterar senha:': 'profile.password.error',
    'As senhas não coincidem!': 'profile.password.mismatch',

    // Documentos
    'Documento enviado com sucesso!': 'documents.upload.success',
    'Documento excluído com sucesso!': 'documents.delete.success',
    'Selecione um arquivo': 'documents.select.required',
    'Erro ao enviar documento:': 'documents.upload.error',
    'Erro ao baixar documento': 'documents.download.error',
    'Erro ao excluir documento': 'documents.delete.error',

    // Funcionalidades em desenvolvimento
    'Funcionalidade de importação será implementada em breve.': 'feature.import.soon',
    'Funcionalidade de exportação será implementada em breve!': 'feature.export.soon',
    'Esta funcionalidade será implementada em breve!': 'feature.coming.soon',

    // Confirmações
    'Tem certeza que deseja excluir este item?': 'confirm.delete',
    'Tem certeza que deseja sair?': 'confirm.logout'
};

// Padrões de confirm
const confirmMappings = {
    'Tem certeza que deseja deletar este funcionário?': 'confirm.delete',
    'Tem certeza que deseja excluir este item?': 'confirm.delete',
    'Tem certeza que deseja sair?': 'confirm.logout',
    'Tem certeza que deseja excluir este documento?': 'confirm.delete'
};

class AlertMigrator {
    constructor() {
        this.frontendPath = path.join(__dirname, '../frontend/public');
        this.migratedFiles = [];
        this.errors = [];
        this.stats = {
            totalFiles: 0,
            filesProcessed: 0,
            alertsFound: 0,
            alertsMigrated: 0,
            confirmsFound: 0,
            confirmsMigrated: 0
        };
    }

    /**
     * Executa a migração completa
     */
    async migrate() {
        console.log('🚀 Iniciando migração de alerts para sistema de mensagens...\n');

        try {
            const htmlFiles = this.getHtmlFiles();
            this.stats.totalFiles = htmlFiles.length;

            for (const file of htmlFiles) {
                await this.processFile(file);
            }

            this.generateReport();
            console.log('\n✅ Migração concluída com sucesso!');

        } catch (error) {
            console.error('❌ Erro durante a migração:', error);
            this.errors.push({ file: 'global', error: error.message });
        }
    }

    /**
     * Obtém lista de arquivos HTML
     */
    getHtmlFiles() {
        const files = fs.readdirSync(this.frontendPath)
            .filter(file => file.endsWith('.html'))
            .map(file => path.join(this.frontendPath, file));

        console.log(`📁 Encontrados ${files.length} arquivos HTML para processar`);
        return files;
    }

    /**
     * Processa um arquivo individual
     */
    async processFile(filePath) {
        const fileName = path.basename(filePath);
        console.log(`📄 Processando: ${fileName}`);

        try {
            let content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;
            let modified = false;

            // Verificar se já tem o sistema de mensagens
            const hasMessageSystem = content.includes('messages-system.js');

            // Migrar alerts
            const alertResult = this.migrateAlerts(content);
            content = alertResult.content;
            modified = modified || alertResult.modified;
            this.stats.alertsFound += alertResult.alertsFound;
            this.stats.alertsMigrated += alertResult.alertsMigrated;

            // Migrar confirms
            const confirmResult = this.migrateConfirms(content);
            content = confirmResult.content;
            modified = modified || confirmResult.modified;
            this.stats.confirmsFound += confirmResult.confirmsFound;
            this.stats.confirmsMigrated += confirmResult.confirmsMigrated;

            // Adicionar sistema de mensagens se necessário
            if (modified && !hasMessageSystem) {
                content = this.addMessageSystem(content);
            }

            // Salvar arquivo se houve modificações
            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                this.migratedFiles.push({
                    file: fileName,
                    alerts: alertResult.alertsMigrated,
                    confirms: confirmResult.confirmsMigrated
                });
                console.log(`  ✅ Migrado: ${alertResult.alertsMigrated} alerts, ${confirmResult.confirmsMigrated} confirms`);
            } else {
                console.log(`  ⏭️  Nenhuma alteração necessária`);
            }

            this.stats.filesProcessed++;

        } catch (error) {
            console.error(`  ❌ Erro ao processar ${fileName}:`, error.message);
            this.errors.push({ file: fileName, error: error.message });
        }
    }

    /**
     * Migra alerts para sistema de mensagens
     */
    migrateAlerts(content) {
        let alertsFound = 0;
        let alertsMigrated = 0;
        let modified = false;

        // Padrão melhorado para detectar alerts
        const alertPattern = /alert\s*\(\s*([^)]+)\s*\)/g;
        let match;

        while ((match = alertPattern.exec(content)) !== null) {
            alertsFound++;
            const alertContent = match[1];
            
            // Remover aspas externas
            const cleanContent = alertContent.replace(/^['"`]|['"`]$/g, '');
            
            console.log(`    🔍 Alert encontrado: "${cleanContent}"`);
            
            // Tentar mapear para ID do sistema
            const messageId = this.findMessageId(cleanContent);
            
            if (messageId) {
                // Substituir por showMessage
                const replacement = this.generateShowMessage(messageId, cleanContent);
                content = content.replace(match[0], replacement);
                alertsMigrated++;
                modified = true;
                console.log(`    ✅ Migrado para: ${messageId}`);
            } else {
                console.log(`    ⚠️  Não mapeado: "${cleanContent}"`);
            }
        }

        return { content, modified, alertsFound, alertsMigrated };
    }

    /**
     * Migra confirms para sistema de mensagens
     */
    migrateConfirms(content) {
        let confirmsFound = 0;
        let confirmsMigrated = 0;
        let modified = false;

        // Padrão melhorado para detectar confirms
        const confirmPattern = /confirm\s*\(\s*([^)]+)\s*\)/g;
        let match;

        while ((match = confirmPattern.exec(content)) !== null) {
            confirmsFound++;
            const confirmContent = match[1];
            
            // Remover aspas externas
            const cleanContent = confirmContent.replace(/^['"`]|['"`]$/g, '');
            
            console.log(`    🔍 Confirm encontrado: "${cleanContent}"`);
            
            // Tentar mapear para ID do sistema
            const messageId = this.findConfirmId(cleanContent);
            
            if (messageId) {
                // Substituir por messageSystem.confirm
                const replacement = `await messageSystem.confirm('${messageId}')`;
                content = content.replace(match[0], replacement);
                confirmsMigrated++;
                modified = true;
                console.log(`    ✅ Migrado para: ${messageId}`);
            } else {
                console.log(`    ⚠️  Não mapeado: "${cleanContent}"`);
            }
        }

        return { content, modified, confirmsFound, confirmsMigrated };
    }

    /**
     * Encontra ID de mensagem baseado no conteúdo
     */
    findMessageId(alertText) {
        // Busca exata
        if (alertMappings[alertText]) {
            return alertMappings[alertText];
        }

        // Busca por substring
        for (const [key, value] of Object.entries(alertMappings)) {
            if (alertText.includes(key)) {
                return value;
            }
        }

        return null;
    }

    /**
     * Encontra ID de confirmação baseado no conteúdo
     */
    findConfirmId(confirmText) {
        // Busca exata
        if (confirmMappings[confirmText]) {
            return confirmMappings[confirmText];
        }

        // Busca por substring
        for (const [key, value] of Object.entries(confirmMappings)) {
            if (confirmText.includes(key)) {
                return value;
            }
        }

        return null;
    }

    /**
     * Gera código showMessage apropriado
     */
    generateShowMessage(messageId, originalText) {
        const exactMatch = Object.values(alertMappings).includes(messageId);
        
        if (exactMatch) {
            return `showMessage('${messageId}')`;
        } else {
            return `showMessage('${messageId}', { customText: '${originalText}' })`;
        }
    }

    /**
     * Adiciona sistema de mensagens ao arquivo
     */
    addMessageSystem(content) {
        // Procurar por onde inserir o script
        const scriptsPattern = /(<script\s+src="js\/components\.js"><\/script>)/;
        const match = content.match(scriptsPattern);

        if (match) {
            const replacement = `<script src="js/messages-system.js"></script>\n    ${match[1]}`;
            return content.replace(match[1], replacement);
        }

        // Fallback: inserir antes do fechamento do body
        const bodyClosePattern = /(<\/body>)/;
        const bodyMatch = content.match(bodyClosePattern);

        if (bodyMatch) {
            const messageScript = `    <script src="js/messages-system.js"></script>\n`;
            return content.replace(bodyMatch[1], messageScript + bodyMatch[1]);
        }

        return content;
    }

    /**
     * Gera relatório final
     */
    generateReport() {
        console.log('\n📊 RELATÓRIO DE MIGRAÇÃO');
        console.log('=' .repeat(50));
        console.log(`📁 Arquivos processados: ${this.stats.filesProcessed}/${this.stats.totalFiles}`);
        console.log(`🔍 Alerts encontrados: ${this.stats.alertsFound}`);
        console.log(`✅ Alerts migrados: ${this.stats.alertsMigrated}`);
        console.log(`🔍 Confirms encontrados: ${this.stats.confirmsFound}`);
        console.log(`✅ Confirms migrados: ${this.stats.confirmsMigrated}`);
        console.log(`📝 Arquivos modificados: ${this.migratedFiles.length}`);

        if (this.migratedFiles.length > 0) {
            console.log('\n📄 ARQUIVOS MIGRADOS:');
            this.migratedFiles.forEach(file => {
                console.log(`  • ${file.file}: ${file.alerts} alerts, ${file.confirms} confirms`);
            });
        }

        if (this.errors.length > 0) {
            console.log('\n❌ ERROS ENCONTRADOS:');
            this.errors.forEach(error => {
                console.log(`  • ${error.file}: ${error.error}`);
            });
        }

        // Salvar relatório em arquivo
        const reportPath = path.join(__dirname, '../docs/migration-report.md');
        const reportContent = this.generateMarkdownReport();
        fs.writeFileSync(reportPath, reportContent, 'utf8');
        console.log(`\n📄 Relatório salvo em: ${reportPath}`);
    }

    /**
     * Gera relatório em Markdown
     */
    generateMarkdownReport() {
        const date = new Date().toISOString().split('T')[0];
        
        return `# Relatório de Migração - Sistema de Mensagens

**Data:** ${date}  
**Versão:** DOM v2  

## Resumo

- **Arquivos processados:** ${this.stats.filesProcessed}/${this.stats.totalFiles}
- **Alerts encontrados:** ${this.stats.alertsFound}
- **Alerts migrados:** ${this.stats.alertsMigrated}
- **Confirms encontrados:** ${this.stats.confirmsFound}
- **Confirms migrados:** ${this.stats.confirmsMigrated}
- **Arquivos modificados:** ${this.migratedFiles.length}

## Arquivos Migrados

${this.migratedFiles.map(file => 
    `- **${file.file}**: ${file.alerts} alerts, ${file.confirms} confirms`
).join('\n')}

## Erros

${this.errors.length > 0 ? 
    this.errors.map(error => `- **${error.file}**: ${error.error}`).join('\n') : 
    'Nenhum erro encontrado.'
}

## Sistema de Mensagens Implementado

O sistema de mensagens centralizado foi implementado com:

1. **Adaptação do sistema TypeScript existente**
2. **81 mensagens catalogadas** por categoria
3. **Notificações personalizadas** substituindo alerts nativos
4. **Integração com sistema de componentes**
5. **Fallback para dados offline**

### Categorias de Mensagens:

- Authentication (5 mensagens)
- Validation (6 mensagens)
- Budget (5 mensagens)
- Employee (6 mensagens)
- Payment (5 mensagens)
- Timeclock (4 mensagens)
- Notification (2 mensagens)
- Settings (6 mensagens)
- Reports (7 mensagens)
- Profile (4 mensagens)
- Documents (6 mensagens)
- System (3 mensagens)
- Confirmation (2 mensagens)
- Feature (3 mensagens)

## Próximos Passos

1. ✅ Sistema de mensagens implementado
2. ✅ Migração automática de alerts
3. 🔄 Testes em diferentes navegadores
4. 🔄 Unificação com sistema mobile
5. 🔄 Implementação de adaptações regionais
`;
    }
}

// Executar migração se chamado diretamente
if (require.main === module) {
    const migrator = new AlertMigrator();
    migrator.migrate().catch(console.error);
}

module.exports = AlertMigrator;
