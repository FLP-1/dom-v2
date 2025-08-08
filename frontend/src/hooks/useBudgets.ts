import { useEffect, useState, useCallback } from 'react';
import { getBudgets, createBudget, BudgetDTO } from '../services/api';

type UseBudgetsState = {
  budgets: BudgetDTO[];
  loading: boolean;
  error: string | null;
};

export function useBudgets() {
  const [{ budgets, loading, error }, setState] = useState<UseBudgetsState>({
    budgets: [],
    loading: false,
    error: null,
  });

  const fetchBudgets = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await getBudgets();
      setState({ budgets: res.data.budgets || [], loading: false, error: null });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: 'Falha ao carregar orçamentos' }));
    }
  }, []);

  const addBudget = useCallback(async (input: { name: string; amount: number }) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await createBudget(input);
      const created = res.data.budget;
      setState((s) => ({ budgets: [created, ...s.budgets], loading: false, error: null }));
      return created;
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: 'Falha ao criar orçamento' }));
      return null;
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return { budgets, loading, error, refresh: fetchBudgets, addBudget };
}

export default useBudgets;


