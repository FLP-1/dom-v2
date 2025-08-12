import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api.ts';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'overdue';
}

interface CreateBudgetData {
  name: string;
  amount: number;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar orçamentos
  const loadBudgets = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.get('/budgets');
      setBudgets(response.data || []);
    } catch (err) {
      setError('Erro ao carregar orçamentos');
      console.error('Erro ao carregar orçamentos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar orçamento
  const addBudget = useCallback(async (budgetData: CreateBudgetData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.post('/budgets', budgetData);
      const newBudget = response.data;
      setBudgets(prev => [...prev, newBudget]);
      return newBudget;
    } catch (err) {
      setError('Erro ao criar orçamento');
      console.error('Erro ao criar orçamento:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar orçamento
  const updateBudget = useCallback(async (id: string, budgetData: Partial<Budget>) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.put(`/budgets/${id}`, budgetData);
      const updatedBudget = response.data;
      setBudgets(prev => prev.map(budget => 
        budget.id === id ? updatedBudget : budget
      ));
      return updatedBudget;
    } catch (err) {
      setError('Erro ao atualizar orçamento');
      console.error('Erro ao atualizar orçamento:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Excluir orçamento
  const deleteBudget = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.delete(`/budgets/${id}`);
      setBudgets(prev => prev.filter(budget => budget.id !== id));
    } catch (err) {
      setError('Erro ao excluir orçamento');
      console.error('Erro ao excluir orçamento:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Calcular progresso do orçamento
  const getBudgetProgress = useCallback((budget: Budget) => {
    return Math.min((budget.spent / budget.amount) * 100, 100);
  }, []);

  // Obter orçamentos por categoria
  const getBudgetsByCategory = useCallback((category: string) => {
    return budgets.filter(budget => budget.category === category);
  }, [budgets]);

  // Obter orçamentos ativos
  const getActiveBudgets = useCallback(() => {
    return budgets.filter(budget => budget.status === 'active');
  }, [budgets]);

  // Obter orçamentos vencidos
  const getOverdueBudgets = useCallback(() => {
    return budgets.filter(budget => budget.status === 'overdue');
  }, [budgets]);

  // Carregar orçamentos na inicialização
  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  return {
    budgets,
    loading,
    error,
    loadBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetProgress,
    getBudgetsByCategory,
    getActiveBudgets,
    getOverdueBudgets,
  };
};


