/**
 * 💰 HOOK PERSONALIZADO PARA DADOS FINANCEIROS
 * 
 * Seguindo as diretrizes do projeto:
 * - Separação de responsabilidades
 * - Reutilização de lógica
 * - Estado centralizado
 * - Error handling robusto
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api.ts';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description?: string;
}

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar dados de orçamento e pagamentos
      const [budgetsResponse, paymentsResponse] = await Promise.all([
        apiService.getBudgets(),
        apiService.getPayments()
      ]);

      // Converter dados para formato de transações
      const budgetTransactions: Transaction[] = budgetsResponse.data?.map((budget: unknown) => ({
        id: `budget-${budget.id}`,
        title: budget.name,
        amount: budget.amount,
        type: 'expense',
        category: budget.category,
        date: budget.created_at,
        description: budget.description
      })) || [];

      const paymentTransactions: Transaction[] = paymentsResponse.data?.map((payment: unknown) => ({
        id: `payment-${payment.id}`,
        title: payment.title,
        amount: payment.amount,
        type: payment.status === 'paid' ? 'expense' : 'income',
        category: payment.category,
        date: payment.due_date,
        description: payment.description
      })) || [];

      setTransactions([...budgetTransactions, ...paymentTransactions]);
    } catch (err) {
      setError('Erro ao carregar dados financeiros');
      console.error('Erro no useFinanceData:', err);
    } finally {
      setLoading(false);
    }
  };

  const reload = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    transactions,
    loading,
    error,
    reload
  };
};