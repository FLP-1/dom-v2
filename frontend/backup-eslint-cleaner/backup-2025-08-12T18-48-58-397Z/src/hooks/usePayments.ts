import { useState, useEffect} from 'react';
import { apiService } from '../services/api.ts';

interface Payment {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  recipient?: string;
}

interface CreatePaymentData {
  amount: number;
  description: string;
  category?: string;
  date?: string;
  paymentMethod?: string;
  recipient?: string;
}

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar pagamentos
  const loadPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.get('/payments');
      setPayments(response.data || []);
    } catch (err) {
      setError('Erro ao carregar pagamentos');
      console.error('Erro ao carregar pagamentos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar pagamento
  const addPayment = useCallback(async (paymentData: CreatePaymentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.post('/payments', paymentData);
      const newPayment = response.data;
      setPayments(prev => [...prev, newPayment]);
      return newPayment;
    } catch (err) {
      setError('Erro ao criar pagamento');
      console.error('Erro ao criar pagamento:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar pagamento
  const updatePayment = useCallback(async (id: string, paymentData: Partial<Payment>) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.put(`/payments/${id}`, paymentData);
      const updatedPayment = response.data;
      setPayments(prev => prev.map(payment => 
        payment.id === id ? updatedPayment : payment
      ));
      return updatedPayment;
    } catch (err) {
      setError('Erro ao atualizar pagamento');
      console.error('Erro ao atualizar pagamento:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Excluir pagamento
  const deletePayment = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.delete(`/payments/${id}`);
      setPayments(prev => prev.filter(payment => payment.id !== id));
    } catch (err) {
      setError('Erro ao excluir pagamento');
      console.error('Erro ao excluir pagamento:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obter pagamentos por categoria
  const getPaymentsByCategory = useCallback((category: string) => {
    return payments.filter(payment => payment.category === category);
  }, [payments]);

  // Obter pagamentos pendentes
  const getPendingPayments = useCallback(() => {
    return payments.filter(payment => payment.status === 'pending');
  }, [payments]);

  // Obter pagamentos completados
  const getCompletedPayments = useCallback(() => {
    return payments.filter(payment => payment.status === 'completed');
  }, [payments]);

  // Calcular total gasto
  const getTotalSpent = useCallback(() => {
    return payments
      .filter(payment => payment.status === 'completed')
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  // Carregar pagamentos na inicialização
  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  return {
    payments,
    loading,
    error,
    loadPayments,
    addPayment,
    updatePayment,
    deletePayment,
    getPaymentsByCategory,
    getPendingPayments,
    getCompletedPayments,
    getTotalSpent,
  };
};
