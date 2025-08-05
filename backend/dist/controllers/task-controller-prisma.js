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
exports.TaskControllerPrisma = void 0;
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
class TaskControllerPrisma {
    // Listar todas as tarefas
    static getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield prisma.task.findMany({
                    where: { ativo: true },
                    orderBy: { data_criacao: 'desc' }
                });
                res.json({
                    success: true,
                    data: tasks,
                    message: 'Tarefas listadas com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar tarefas',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter tarefa por ID
    static getTaskById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const task = yield prisma.task.findUnique({
                    where: { id }
                });
                if (!task) {
                    res.status(404).json({
                        success: false,
                        message: 'Tarefa não encontrada'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: task,
                    message: 'Tarefa encontrada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar tarefa',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar nova tarefa
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskData = req.body;
                const newTask = yield prisma.task.create({
                    data: {
                        titulo: taskData.titulo,
                        descricao: taskData.descricao,
                        status: taskData.status || 'pending',
                        prioridade: taskData.prioridade ? parseInt(taskData.prioridade) : 1,
                        criador_id: taskData.criador_id,
                        responsavel_id: taskData.responsavel_id,
                        categoria: taskData.categoria,
                        data_limite: taskData.data_limite ? new Date(taskData.data_limite) : null,
                        ativo: true,
                        data_criacao: new Date()
                    }
                });
                res.status(201).json({
                    success: true,
                    data: newTask,
                    message: 'Tarefa criada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar tarefa',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar tarefa
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const task = yield prisma.task.update({
                    where: { id },
                    data: {
                        titulo: updateData.titulo,
                        descricao: updateData.descricao,
                        status: updateData.status,
                        prioridade: updateData.prioridade ? parseInt(updateData.prioridade) : undefined,
                        responsavel_id: updateData.responsavel_id,
                        categoria: updateData.categoria,
                        data_limite: updateData.data_limite ? new Date(updateData.data_limite) : undefined,
                        data_atualizacao: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: task,
                    message: 'Tarefa atualizada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar tarefa',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar tarefa
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.task.update({
                    where: { id },
                    data: {
                        ativo: false,
                        data_atualizacao: new Date()
                    }
                });
                res.json({
                    success: true,
                    message: 'Tarefa deletada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar tarefa',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Marcar tarefa como concluída
    static completeTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const task = yield prisma.task.update({
                    where: { id },
                    data: {
                        status: 'completed',
                        data_conclusao: new Date(),
                        data_atualizacao: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: task,
                    message: 'Tarefa marcada como concluída'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao marcar tarefa como concluída',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter tarefas por status
    static getTasksByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.params;
                const tasks = yield prisma.task.findMany({
                    where: {
                        status: status,
                        ativo: true
                    },
                    orderBy: { data_criacao: 'desc' }
                });
                res.json({
                    success: true,
                    data: tasks,
                    count: tasks.length,
                    message: `Tarefas com status '${status}' recuperadas`
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar tarefas por status',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.TaskControllerPrisma = TaskControllerPrisma;
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
