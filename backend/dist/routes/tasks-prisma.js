"use strict";
// Rotas Task com Prisma - Controle de Tarefas
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_prisma_1 = require("../controllers/task-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/tasks - Listar todas as tarefas
router.get('/', task_controller_prisma_1.TaskControllerPrisma.getAllTasks);
// GET /api/tasks/status/:status - Obter tarefas por status
router.get('/status/:status', task_controller_prisma_1.TaskControllerPrisma.getTasksByStatus);
// GET /api/tasks/:id - Obter tarefa por ID
router.get('/:id', task_controller_prisma_1.TaskControllerPrisma.getTaskById);
// POST /api/tasks - Criar nova tarefa
router.post('/', task_controller_prisma_1.TaskControllerPrisma.createTask);
// PUT /api/tasks/:id - Atualizar tarefa
router.put('/:id', task_controller_prisma_1.TaskControllerPrisma.updateTask);
// PUT /api/tasks/:id/complete - Marcar como concluída
router.put('/:id/complete', task_controller_prisma_1.TaskControllerPrisma.completeTask);
// DELETE /api/tasks/:id - Deletar tarefa
router.delete('/:id', task_controller_prisma_1.TaskControllerPrisma.deleteTask);
exports.default = router;
