// Modelo Budget - Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'overdue';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBudgetRequest {
  name: string;
  amount: number;
  category: string;
  startDate: Date;
  endDate: Date;
}

export interface UpdateBudgetRequest {
  name?: string;
  amount?: number;
  spent?: number;
  category?: string;
  status?: 'active' | 'completed' | 'overdue';
} 