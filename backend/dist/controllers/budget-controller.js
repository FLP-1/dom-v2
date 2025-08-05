"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
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
 * Asserções de validação
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error)
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
 */
function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[$], { timestamp }, [$, { level, : .toUpperCase() }], $, { message } `, data || '');
}`);
    }
}
/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
    if (!data)
        return false;
    if (typeof data !== 'object')
        return false;
    return true;
}
// Simulação de banco de dados (simples)
let budgets = [
    {
        id: '1',
        name: 'Orçamento Mensal - Janeiro 2025',
        amount: 5000,
        spent: 3200,
        category: 'Geral',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        status: 'active',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-15')
    },
    {
        id: '2',
        name: 'Orçamento Alimentação',
        amount: 1500,
        spent: 1200,
        category: 'Alimentação',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        status: 'active',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-20')
    },
    {
        id: '3',
        name: 'Orçamento Transporte',
        amount: 800,
        spent: 600,
        category: 'Transporte',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        status: 'active',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-18')
    }
];
class BudgetController {
    // Listar todos os orçamentos
    static getAllBudgets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    success: true,
                    data: budgets,
                    message: 'Orçamentos listados com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar orçamentos',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter orçamento por ID
    static getBudgetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const budget = budgets.find(b => b.id === id);
                if (!budget) {
                    res.status(404).json({
                        success: false,
                        message: 'Orçamento não encontrado'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: budget,
                    message: 'Orçamento encontrado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar novo orçamento
    static createBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budgetData = req.body;
                const newBudget = Object.assign(Object.assign({ id: Date.now().toString() }, budgetData), { spent: 0, status: 'active', createdAt: new Date(), updatedAt: new Date() });
                budgets.push(newBudget);
                res.status(201).json({
                    success: true,
                    data: newBudget,
                    message: 'Orçamento criado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar orçamento
    static updateBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const budgetIndex = budgets.findIndex(b => b.id === id);
                if (budgetIndex === -1) {
                    res.status(404).json({
                        success: false,
                        message: 'Orçamento não encontrado'
                    });
                    return;
                }
                budgets[budgetIndex] = Object.assign(Object.assign(Object.assign({}, budgets[budgetIndex]), updateData), { updatedAt: new Date() });
                res.json({
                    success: true,
                    data: budgets[budgetIndex],
                    message: 'Orçamento atualizado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar orçamento
    static deleteBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const budgetIndex = budgets.findIndex(b => b.id === id);
                if (budgetIndex === -1) {
                    res.status(404).json({
                        success: false,
                        message: 'Orçamento não encontrado'
                    });
                    return;
                }
                budgets.splice(budgetIndex, 1);
                res.json({
                    success: true,
                    message: 'Orçamento deletado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.BudgetController = BudgetController;
/**
 *
/**
 * Alternativas consideradas:
 * - Alternativa A: Descrição e motivo da rejeição
 * - Alternativa B: Descrição e motivo da rejeição
 * - Solução escolhida: Justificativa da escolha atual
 */
Referências;
externas: 
    * -Node.js;
https: //nodejs.org/docs
 
    * -TypeScript;
https: //www.typescriptlang.org/docs
 
    * -Express;
https: //expressjs.com/
 
    * -Prisma;
https: //www.prisma.io/docs
 
    * -React;
https: //react.dev/
 
    * -Jest;
https: //jestjs.io/docs
 
    * -React;
Native: https: //reactnative.dev/
 
    * -Webpack;
https: //webpack.js.org/
 
    * /;
