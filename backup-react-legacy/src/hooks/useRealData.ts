import { useState, useEffect } from 'react';

// ✅ HOOK CENTRALIZADO PARA DADOS REAIS DO POSTGRESQL
// Substitui todos os dados mockados por dados reais do banco

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface UseRealDataOptions {
  endpoint: string;
  params?: Record<string, string | number>;
  dependencies?: unknown[];
  autoFetch?: boolean;
}

export function useRealData<T>(
  { endpoint, params, dependencies = [], autoFetch = true }: UseRealDataOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('dom_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      // Construir URL com parâmetros
      const url = new URL(`http://localhost:3001/api${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }

      const result: ApiResponse<T> = await response.json();
      setData(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao buscar dados:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createData = async (newData: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('dom_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch(`http://localhost:3001/api${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar dados');
      }

      const result: ApiResponse<T> = await response.json();
      setData(result.data);
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao criar dados:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id: string, updates: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('dom_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch(`http://localhost:3001/api${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar dados');
      }

      const result: ApiResponse<T> = await response.json();
      setData(result.data);
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao atualizar dados:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('dom_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch(`http://localhost:3001/api${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar dados');
      }

      // Recarregar dados após deleção
      await fetchData();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao deletar dados:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create: createData,
    update: updateData,
    delete: deleteData,
  };
}

// ✅ HOOKS ESPECÍFICOS PARA CADA ENTIDADE

export function usePayments() {
  const result = useRealData<Payment[]>({ endpoint: '/payments' });
  return {
    ...result,
    payments: result.data,
  };
}

export function useESocialEvents() {
  const result = useRealData<ESocialEvent[]>({ endpoint: '/integrations/esocial/events' });
  return {
    ...result,
    events: result.data,
  };
}

export function useEmployees() {
  const result = useRealData<Employee[]>({ endpoint: '/employees' });
  return {
    ...result,
    employees: result.data,
  };
}

export function useTasks() {
  const result = useRealData<Task[]>({ endpoint: '/tasks' });
  return {
    ...result,
    tasks: result.data,
  };
}

export function useNotifications() {
  const result = useRealData<Notification[]>({ endpoint: '/notifications' });
  return {
    ...result,
    notifications: result.data,
  };
}

export function useBudgets() {
  const result = useRealData<Budget[]>({ endpoint: '/budgets' });
  return {
    ...result,
    budgets: result.data,
  };
}

export function useTimeCardEntries(employeeId?: string, startDate?: string, endDate?: string) {
  const params: Record<string, string> = {};
  if (employeeId) params.employeeId = employeeId;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const result = useRealData<TimeCardEntry[]>({
    endpoint: '/integrations/timecard/entries',
    params,
    dependencies: [employeeId, startDate, endDate],
  });
  return {
    ...result,
    timeEntries: result.data,
  };
}

export function useSPTransRoutes(query?: string) {
  const params: Record<string, string> = {};
  if (query) params.q = query;

  const result = useRealData<SPTransRoute[]>({
    endpoint: '/integrations/sptrans/routes',
    params,
    dependencies: [query],
    autoFetch: !!query,
  });
  return {
    ...result,
    routes: result.data,
  };
}

// Interfaces para tipagem
interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  paymentMethod: 'card' | 'pix' | 'boleto' | 'transfer';
  description: string;
  createdAt: string;
}

interface ESocialEvent {
  id: string;
  type: string;
  employeeId: string;
  employeeName: string;
  eventDate: string;
  status: 'pending' | 'sent' | 'accepted' | 'rejected';
  xmlContent: string;
  protocol?: string;
  errorMessage?: string;
}

interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  salary: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TimeCardEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  entries: TimeEntry[];
  totalHours: number;
  overtime: number;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'vacation' | 'sick_leave';
  notes?: string;
  eSocialEventId?: string;
}

interface TimeEntry {
  id: string;
  type: 'entry' | 'exit' | 'break_start' | 'break_end';
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  method: 'manual' | 'biometric' | 'mobile' | 'web';
}

interface SPTransRoute {
  id: string;
  code: string;
  name: string;
  direction: 'outbound' | 'return';
  stops: SPTransStop[];
}

interface SPTransStop {
  id: string;
  code: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
