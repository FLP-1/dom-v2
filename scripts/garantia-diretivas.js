#!/usr/bin/env node

/**
 * 🛡️ SISTEMA DE GARANTIA DAS DIRETIVAS DE PENSAMENTO CRÍTICO
 * Script automatizado para verificar e garantir o cumprimento das diretivas
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GarantiaDiretivas {
    constructor() {
        this.diretivas = {
            stackFixa: {
                react: '18.2.0',
                reactNative: '0.80.1',
                express: 'latest'
            },
            regras: [
                'REGRA DA SIMPLICIDADE EXTREMA',
                'REGRA DA STACK FIXA',
                'REGRA DA VALIDAÇÃO CONTÍNUA',
                'REGRA DO MVP RIGOROSO'
            ],
            proibicoes: [
                'upgrade react 19',
                'upgrade react-native major',
                'remover dependencias funcionais',
                'adicionar complexidade desnecessaria'
            ]
        };
        
        this.violacoes = [];
        this.acoes = [];
    }

    /**
     * Verifica se as diretivas estão sendo seguidas
     */
    verificarDiretivas() {
        console.log('🛡️ VERIFICANDO DIRETIVAS DE PENSAMENTO CRÍTICO...\n');
        
        this.verificarStackFixa();
        this.verificarRegras();
        this.verificarProibicoes();
        this.verificarDocumentacao();
        
        this.gerarRelatorio();
    }

    /**
     * Verifica se a stack fixa está sendo respeitada
     */
    verificarStackFixa() {
        console.log('📋 Verificando Stack Fixa...');
        
        try {
            // Verificar package.json do frontend
            const frontendPackage = JSON.parse(
                fs.readFileSync(path.join(__dirname, '../frontend/package.json'), 'utf8')
            );
            
            const reactVersion = frontendPackage.dependencies.react;
            const reactNativeVersion = frontendPackage.dependencies['react-native'];
            
            if (!reactVersion.includes('18.2.0')) {
                this.violacoes.push({
                    tipo: 'STACK_FIXA',
                    descricao: `React versão ${reactVersion} - deve ser 18.2.0`,
                    severidade: 'CRÍTICA'
                });
            }
            
            if (!reactNativeVersion.includes('0.80.1')) {
                this.violacoes.push({
                    tipo: 'STACK_FIXA',
                    descricao: `React Native versão ${reactNativeVersion} - deve ser 0.80.1`,
                    severidade: 'CRÍTICA'
                });
            }
            
            console.log('✅ Stack fixa verificada');
            
        } catch (error) {
            this.violacoes.push({
                tipo: 'ERRO_VERIFICACAO',
                descricao: `Erro ao verificar stack: ${error.message}`,
                severidade: 'ALTA'
            });
        }
    }

    /**
     * Verifica se as regras estão sendo aplicadas
     */
    verificarRegras() {
        console.log('📋 Verificando Regras do Projeto...');
        
        // Verificar se o sistema de garantia está sendo usado
        const garantiaPath = path.join(__dirname, '../docs/sistema-garantia-diretivas.md');
        const registroPath = path.join(__dirname, '../docs/registro-decisoes-criticas.md');
        
        if (!fs.existsSync(garantiaPath)) {
            this.violacoes.push({
                tipo: 'REGRA_GARANTIA',
                descricao: 'Sistema de garantia não encontrado',
                severidade: 'CRÍTICA'
            });
        }
        
        if (!fs.existsSync(registroPath)) {
            this.violacoes.push({
                tipo: 'REGRA_REGISTRO',
                descricao: 'Registro de decisões críticas não encontrado',
                severidade: 'ALTA'
            });
        }
        
        console.log('✅ Regras verificadas');
    }

    /**
     * Verifica se há violações de proibições
     */
    verificarProibicoes() {
        console.log('📋 Verificando Proibições...');
        
        // Verificar se há commits recentes com upgrades indevidos
        try {
            const gitLog = execSync('git log --oneline -10', { encoding: 'utf8' });
            
            this.diretivas.proibicoes.forEach(proibicao => {
                if (gitLog.toLowerCase().includes(proibicao.toLowerCase())) {
                    this.violacoes.push({
                        tipo: 'PROIBICAO',
                        descricao: `Possível violação: ${proibicao}`,
                        severidade: 'ALTA'
                    });
                }
            });
            
        } catch (error) {
            // Git não disponível, ignorar
        }
        
        console.log('✅ Proibições verificadas');
    }

    /**
     * Verifica se a documentação está atualizada
     */
    verificarDocumentacao() {
        console.log('📋 Verificando Documentação...');
        
        const docsEssenciais = [
            '../docs/sistema-garantia-diretivas.md',
            '../docs/registro-decisoes-criticas.md',
            '../contexto-rapido-novo-chat.md',
            '../docs/status-atual-novo-chat.md'
        ];
        
        docsEssenciais.forEach(doc => {
            const docPath = path.join(__dirname, doc);
            if (!fs.existsSync(docPath)) {
                this.violacoes.push({
                    tipo: 'DOCUMENTACAO',
                    descricao: `Documento essencial não encontrado: ${doc}`,
                    severidade: 'MÉDIA'
                });
            }
        });
        
        console.log('✅ Documentação verificada');
    }

    /**
     * Gera relatório de violações e ações
     */
    gerarRelatorio() {
        console.log('\n📊 RELATÓRIO DE GARANTIA DAS DIRETIVAS\n');
        
        if (this.violacoes.length === 0) {
            console.log('✅ TODAS AS DIRETIVAS ESTÃO SENDO SEGUIDAS!');
            console.log('🎯 Sistema estável e alinhado com as regras do projeto.');
            return;
        }
        
        console.log(`🚨 ${this.violacoes.length} VIOLAÇÃO(ÕES) ENCONTRADA(S):\n`);
        
        this.violacoes.forEach((violacao, index) => {
            console.log(`${index + 1}. [${violacao.severidade}] ${violacao.tipo}:`);
            console.log(`   ${violacao.descricao}\n`);
            
            // Sugerir ações corretivas
            this.sugerirAcao(violacao);
        });
        
        this.salvarRelatorio();
    }

    /**
     * Sugere ações corretivas para violações
     */
    sugerirAcao(violacao) {
        let acao = '';
        
        switch (violacao.tipo) {
            case 'STACK_FIXA':
                acao = 'Reverter para versões estáveis: React 18.2.0, React Native 0.80.1';
                break;
            case 'PROIBICAO':
                acao = 'Revisar commits e reverter se necessário';
                break;
            case 'REGRA_GARANTIA':
                acao = 'Recriar sistema de garantia das diretivas';
                break;
            case 'DOCUMENTACAO':
                acao = 'Atualizar documentação essencial';
                break;
            default:
                acao = 'Aplicar checklist obrigatório antes de prosseguir';
        }
        
        console.log(`   🔧 AÇÃO SUGERIDA: ${acao}\n`);
        this.acoes.push(acao);
    }

    /**
     * Salva relatório em arquivo
     */
    salvarRelatorio() {
        const relatorio = {
            data: new Date().toISOString(),
            violacoes: this.violacoes,
            acoes: this.acoes,
            status: this.violacoes.length === 0 ? 'CONFORME' : 'VIOLAÇÕES'
        };
        
        const relatorioPath = path.join(__dirname, '../logs/garantia-diretivas-report.json');
        
        // Criar diretório se não existir
        const logsDir = path.dirname(relatorioPath);
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
        
        fs.writeFileSync(relatorioPath, JSON.stringify(relatorio, null, 2));
        console.log(`📄 Relatório salvo em: ${relatorioPath}`);
    }

    /**
     * Executa verificação completa
     */
    executar() {
        console.log('🚀 INICIANDO SISTEMA DE GARANTIA DAS DIRETIVAS\n');
        
        this.verificarDiretivas();
        
        if (this.violacoes.length > 0) {
            console.log('\n⚠️  ATENÇÃO: VIOLAÇÕES ENCONTRADAS!');
            console.log('🔧 Aplique as ações sugeridas antes de continuar o desenvolvimento.');
            process.exit(1);
        } else {
            console.log('\n🎉 SISTEMA CONFORME COM AS DIRETIVAS!');
            console.log('✅ Pode prosseguir com o desenvolvimento.');
        }
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    const garantia = new GarantiaDiretivas();
    garantia.executar();
}

module.exports = GarantiaDiretivas; 