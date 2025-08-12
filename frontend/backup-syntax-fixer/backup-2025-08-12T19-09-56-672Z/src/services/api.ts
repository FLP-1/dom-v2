/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Serviço de API para comunicação com o backend PostgreSQL
 */

const API_BASE_URL = 'http://localhost:3001/api';

// Interfaces para tipagem
export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: number;
  created_at?: string;
  due_date?: string;
  completed_at?: string;
  creator_id: string;
  responsible_id?: string;
  category?: string;
  tags?: Record<string, unknown>;
  attachments?: Record<string, unknown>;
  comments?: Record<string, unknown>;
  active?: boolean;
  updated_at?: string;
}

export interface Payment {
  id: string;
  amount: number;
  description: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  salary: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = { /* TODO: Implement error handling */ } ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // BUDGETS (Finanças)
  async getBudgets(): Promise<Budget[]> {
    return this.request<Budget[]>('/budgets');
  }

  async createBudget(budget: Omit<Budget, 'id' | 'created_at' | 'updated_at'>): Promise<Budget> {
    return this.request<Budget>('/budgets', {
      method: 'POST',
      body: JSON.stringify(budget),
    });
  }

  async updateBudget(id: string, budget: Partial<Budget>): Promise<Budget> {
    return this.request<Budget>(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(budget),
    });
  }

  async deleteBudget(id: string): Promise<void> {
    return this.request<void>(`/budgets/${id}`, {
      method: 'DELETE',
    });
  }

  // TASKS (Tarefas)
  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>('/tasks');
  }

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  }

  async deleteTask(id: string): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // PAYMENTS (Pagamentos)
  async getPayments(): Promise<Payment[]> {
    return this.request<Payment[]>('/payments');
  }

  async createPayment(payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>): Promise<Payment> {
    return this.request<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }

  async updatePayment(id: string, payment: Partial<Payment>): Promise<Payment> {
    return this.request<Payment>(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payment),
    });
  }

  async deletePayment(id: string): Promise<void> {
    return this.request<void>(`/payments/${id}`, {
      method: 'DELETE',
    });
  }

  // EMPLOYEES (Funcionários)
  async getEmployees(): Promise<Employee[]> {
    return this.request<Employee[]>('/employees');
  }

  async createEmployee(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<Employee> {
    return this.request<Employee>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    return this.request<Employee>(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  }

  async deleteEmployee(id: string): Promise<void> {
    return this.request<void>(`/employees/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default apiService;