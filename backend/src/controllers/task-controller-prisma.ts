// Controller Task com Prisma - Controle de Tarefas
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class TaskControllerPrisma {
  // Listar todas as tarefas
  static async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await prisma.task.findMany({
        where: { ativo: true },
        orderBy: { data_criacao: 'desc' }
      });

      res.json({
        success: true,
        data: tasks,
        message: 'Tarefas listadas com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar tarefas',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter tarefa por ID
  static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar tarefa',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Criar nova tarefa
  static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskData = req.body;
      
      const newTask = await prisma.task.create({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar tarefa',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Atualizar tarefa
  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const task = await prisma.task.update({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar tarefa',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Deletar tarefa
  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.task.update({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar tarefa',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Marcar tarefa como concluída
  static async completeTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const task = await prisma.task.update({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao marcar tarefa como concluída',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter tarefas por status
  static async getTasksByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      
      const tasks = await prisma.task.findMany({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar tarefas por status',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 