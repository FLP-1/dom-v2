/**
 * Hook para gestão de dados de Folha de Pagamento
 * @description Gerencia períodos, cálculos, holerites e configurações de folha
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * Funcionalidades:
 * - Gestão de períodos de folha
 * - Cálculos automáticos de salários
 * - Geração de holerites
 * - Configurações de INSS, IRRF, FGTS
 * - Relatórios e estatísticas
 */

import { useState, useEffect} from 'react';
import { apiService } from '../services/api.ts';

export interface PayrollPeriod {
  id: string;
  month: number;
  year: number;
  status: 'draft' | 'calculated' | 'approved' | 'paid';
  totalGross: number;
  totalNet: number;
  employeeCount: number;
  createdAt: string;
  calculatedAt?: string;
  approvedAt?: string;
}

export interface PayrollConfig {
  id: string;
  inssRate: number;
  irrfBrackets: Array<{
    min: number;
    max?: number;
    rate: number;
    deduction: number;
  }>;
  fgtsRate: number;
  extraHoursRate: number;
  nightHoursRate: number;
  updatedAt: string;
}

export const usePayrollData = () => {
  const [periods, setPeriods] = useState<PayrollPeriod[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<PayrollPeriod | null>(null);
  const [config, setConfig] = useState<PayrollConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPeriods = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getPayrollPeriods();
      
      const convertedPeriods: PayrollPeriod[] = response.data?.map((period: unknown) => ({
        id: period.id,
        month: period.month,
        year: period.year,
        status: period.status || 'draft',
        totalGross: period.total_gross || 0,
        totalNet: period.total_net || 0,
        employeeCount: period.employee_count || 0,
        createdAt: period.created_at,
        calculatedAt: period.calculated_at,
        approvedAt: period.approved_at
      })) || [];

      setPeriods(convertedPeriods);
    } catch (err) {
      setError('Erro ao carregar períodos de folha');
      console.error('Erro no usePayrollData - loadPeriods:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPeriod = async (month: number, year: number) => {
    try {
      const response = await apiService.createPayrollPeriod({ month, year });
      const newPeriod: PayrollPeriod = {
        id: response.data.id,
        month,
        year,
        status: 'draft',
        totalGross: 0,
        totalNet: 0,
        employeeCount: 0,
        createdAt: new Date().toISOString()
      };
      setPeriods(prev => [newPeriod, ...prev]);
      return newPeriod;
    } catch (err) {
      console.error('Erro ao criar período:', err);
      throw err;
    }
  };

  const calculatePayroll = async (periodId: string) => {
    try {
      const response = await apiService.calculatePayrollPeriod(periodId);
      const updatedPeriod = response.data;
      
      setPeriods(prev => prev.map(period => 
        period.id === periodId ? {
          ...period,
          status: 'calculated',
          totalGross: updatedPeriod.total_gross || period.totalGross,
          totalNet: updatedPeriod.total_net || period.totalNet,
          employeeCount: updatedPeriod.employee_count || period.employeeCount,
          calculatedAt: new Date().toISOString()
        } : period
      ));
      
      return updatedPeriod;
    } catch (err) {
      console.error('Erro ao calcular folha:', err);
      throw err;
    }
  };

  const approvePayroll = async (periodId: string) => {
    try {
      const response = await apiService.approvePayrollPeriod(periodId);
      
      setPeriods(prev => prev.map(period => 
        period.id === periodId ? {
          ...period,
          status: 'approved',
          approvedAt: new Date().toISOString()
        } : period
      ));
      
      return response.data;
    } catch (err) {
      console.error('Erro ao aprovar folha:', err);
      throw err;
    }
  };

  const generatePayslips = async (periodId: string) => {
    try {
      const response = await apiService.generatePayslips(periodId);
      return response.data;
    } catch (err) {
      console.error('Erro ao gerar contracheques:', err);
      throw err;
    }
  };

  const getPeriodDetails = async (periodId: string) => {
    try {
      const response = await apiService.getPayrollPeriodDetails(periodId);
      return response.data;
    } catch (err) {
      console.error('Erro ao obter detalhes do período:', err);
      throw err;
    }
  };

  const updateConfig = async (configData: Partial<PayrollConfig>) => {
    try {
      const response = await apiService.updatePayrollConfig(configData);
      setConfig(response.data);
      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar configuração:', err);
      throw err;
    }
  };

  const getConfig = async () => {
    try {
      const response = await apiService.getPayrollConfig();
      setConfig(response.data);
      return response.data;
    } catch (err) {
      console.error('Erro ao obter configuração:', err);
      throw err;
    }
  };

  const reloadPeriods = () => {
    loadPeriods();
  };

  useEffect(() => {
    loadPeriods();
    getConfig();
  }, []);

  return {
    periods,
    currentPeriod,
    config,
    loading,
    error,
    reloadPeriods,
    createPeriod,
    calculatePayroll,
    approvePayroll,
    generatePayslips,
    getPeriodDetails,
    updateConfig,
    getConfig
  };
};
