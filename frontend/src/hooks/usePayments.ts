import { useEffect, useState, useCallback } from 'react';
import { getPayments, createPayment, PaymentDTO } from '../services/api';

type UsePaymentsState = {
  payments: PaymentDTO[];
  loading: boolean;
  error: string | null;
};

export function usePayments() {
  const [{ payments, loading, error }, setState] = useState<UsePaymentsState>({
    payments: [],
    loading: false,
    error: null,
  });

  const fetchPayments = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await getPayments();
      setState({ payments: res.data.payments || [], loading: false, error: null });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: 'Falha ao carregar pagamentos' }));
    }
  }, []);

  const addPayment = useCallback(async (input: { amount: number; description: string }) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await createPayment(input);
      const created = res.data.payment;
      setState((s) => ({ payments: [created, ...s.payments], loading: false, error: null }));
      return created;
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: 'Falha ao criar pagamento' }));
      return null;
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments, loading, error, refresh: fetchPayments, addPayment };
}

export default usePayments;


