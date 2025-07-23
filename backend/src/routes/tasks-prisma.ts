// Rotas Task com Prisma - Controle de Tarefas
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { TaskControllerPrisma } from '../controllers/task-controller-prisma';

const router = Router();

// GET /api/tasks - Listar todas as tarefas
router.get('/', TaskControllerPrisma.getAllTasks);

// GET /api/tasks/status/:status - Obter tarefas por status
router.get('/status/:status', TaskControllerPrisma.getTasksByStatus);

// GET /api/tasks/:id - Obter tarefa por ID
router.get('/:id', TaskControllerPrisma.getTaskById);

// POST /api/tasks - Criar nova tarefa
router.post('/', TaskControllerPrisma.createTask);

// PUT /api/tasks/:id - Atualizar tarefa
router.put('/:id', TaskControllerPrisma.updateTask);

// PUT /api/tasks/:id/complete - Marcar como concluída
router.put('/:id/complete', TaskControllerPrisma.completeTask);

// DELETE /api/tasks/:id - Deletar tarefa
router.delete('/:id', TaskControllerPrisma.deleteTask);

export default router; 