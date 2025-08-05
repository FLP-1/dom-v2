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
exports.PaymentControllerPrisma = void 0;
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
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class PaymentControllerPrisma {
    // Listar todos os pagamentos
    static getAllPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield prisma.payment.findMany({
                    orderBy: { createdAt: 'desc' }
                });
                res.json({
                    success: true,
                    data: payments,
                    message: 'Pagamentos listados com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar pagamentos',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter pagamento por ID
    static getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payment = yield prisma.payment.findUnique({
                    where: { id }
                });
                if (!payment) {
                    res.status(404).json({
                        success: false,
                        message: 'Pagamento não encontrado'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: payment,
                    message: 'Pagamento encontrado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar novo pagamento
    static createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentData = req.body;
                const newPayment = yield prisma.payment.create({
                    data: {
                        amount: parseFloat(paymentData.amount),
                        description: paymentData.description,
                        status: paymentData.status || 'pending',
                        dueDate: new Date(paymentData.dueDate)
                    }
                });
                res.status(201).json({
                    success: true,
                    data: newPayment,
                    message: 'Pagamento criado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar pagamento
    static updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const payment = yield prisma.payment.update({
                    where: { id },
                    data: {
                        amount: updateData.amount ? parseFloat(updateData.amount) : undefined,
                        description: updateData.description,
                        status: updateData.status,
                        dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: payment,
                    message: 'Pagamento atualizado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar pagamento
    static deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.payment.delete({
                    where: { id }
                });
                res.json({
                    success: true,
                    message: 'Pagamento deletado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Processar pagamento
    static processPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payment = yield prisma.payment.update({
                    where: { id },
                    data: {
                        status: 'completed',
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: payment,
                    message: 'Pagamento processado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao processar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.PaymentControllerPrisma = PaymentControllerPrisma;
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
