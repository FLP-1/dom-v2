/**
 * 📝 HOOK PERSONALIZADO PARA DADOS DE TAREFAS
 * 
 * Seguindo as diretrizes do projeto:
 * - Separação de responsabilidades
 * - Reutilização de lógica
 * - Estado centralizado
 * - UX otimista para atualizações
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api.ts';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo?: string;
  category: string;
}

export const useTasksData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getTasks();
      
      const convertedTasks: Task[] = response.data?.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.due_date,
        assignedTo: task.assigned_to,
        category: task.category || 'Geral'
      })) || [];

      setTasks(convertedTasks);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error('Erro no useTasksData:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      // Otimistic update
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));

      // API call
      await apiService.updateTask(taskId, { status: newStatus });
    } catch (err) {
      // Rollback on error
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: task.status } : task
      ));
      console.error('Erro ao atualizar status da tarefa:', err);
    }
  };

  const reload = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    tasks,
    loading,
    error,
    reload,
    updateTaskStatus
  };
};