/**
 * @fileoverview Micro-Frontend de Folha de Pagamento para DOM v2
 * @description Componente isolado com cálculos complexos de folha de pagamento
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

interface PayrollItem {
  id: string;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  overtimeHours: number;
  overtimeRate: number;
  bonuses: number;
  deductions: number;
  inss: number;
  irrf: number;
  fgts: number;
  netSalary: number;
  grossSalary: number;
  month: number;
  year: number;
  status: 'pending' | 'approved' | 'paid';
  createdAt: Date;
  updatedAt: Date;
}

interface PayrollCalculation {
  baseSalary: number;
  overtimeValue: number;
  bonusesValue: number;
  grossSalary: number;
  inssValue: number;
  irrfValue: number;
  fgtsValue: number;
  totalDeductions: number;
  netSalary: number;
}

interface PayrollStats {
  totalPayrolls: number;
  pendingPayrolls: number;
  approvedPayrolls: number;
  paidPayrolls: number;
  totalGrossSalary: number;
  totalNetSalary: number;
  totalDeductions: number;
  averageGrossSalary: number;
  averageNetSalary: number;
}

interface PayrollComponentProps {
  onBack?: () => void;
}

export const PayrollComponent: React.FC<PayrollComponentProps> = ({ onBack }) => {
  const [payrolls, setPayrolls] = useState<PayrollItem[]>([]);
  const [stats, setStats] = useState<PayrollStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculation, setCalculation] = useState<PayrollCalculation | null>(null);
  const [calculatorData, setCalculatorData] = useState({
    baseSalary: '',
    overtimeHours: '',
    overtimeRate: '1.5',
    bonuses: '',
    deductions: ''
  });

  // Carregar dados iniciais
  useEffect(() => {
    loadPayrolls();
    loadStats();
  }, []);

  const loadPayrolls = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll');
      const data = await response.json();

      if (response.ok) {
        setPayrolls(data.payrolls);
      } else {
        Alert.alert('Erro', 'Erro ao carregar folhas de pagamento');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/stats');
      const data = await response.json();

      if (response.ok) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const calculatePayroll = async () => {
    const baseSalary = parseFloat(calculatorData.baseSalary);
    const overtimeHours = parseFloat(calculatorData.overtimeHours) || 0;
    const overtimeRate = parseFloat(calculatorData.overtimeRate) || 1.5;
    const bonuses = parseFloat(calculatorData.bonuses) || 0;
    const deductions = parseFloat(calculatorData.deductions) || 0;

    if (!baseSalary || baseSalary <= 0) {
      Alert.alert('Erro', 'Salário base é obrigatório e deve ser maior que zero');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/payroll/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseSalary,
          overtimeHours,
          overtimeRate,
          bonuses,
          deductions
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCalculation(data.calculation);
      } else {
        Alert.alert('Erro', data.error || 'Erro ao calcular folha de pagamento');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  };

  const updatePayrollStatus = async (id: string, status: 'pending' | 'approved' | 'paid') => {
    try {
      const response = await fetch(`http://localhost:3001/api/payroll/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        loadPayrolls();
        loadStats();
        Alert.alert('Sucesso', 'Status atualizado com sucesso');
      } else {
        Alert.alert('Erro', 'Erro ao atualizar status');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9500';
      case 'approved': return '#007AFF';
      case 'paid': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'paid': return 'Pago';
      default: return status;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Folha de Pagamento</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Folha de Pagamento</Text>
        <TouchableOpacity 
          onPress={() => setShowCalculator(!showCalculator)} 
          style={styles.calculatorButton}
        >
          <Text style={styles.calculatorButtonText}>🧮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Estatísticas */}
        {stats && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Estatísticas</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalPayrolls}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.pendingPayrolls}</Text>
                <Text style={styles.statLabel}>Pendentes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.approvedPayrolls}</Text>
                <Text style={styles.statLabel}>Aprovados</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.paidPayrolls}</Text>
                <Text style={styles.statLabel}>Pagos</Text>
              </View>
            </View>
            <View style={styles.financialStats}>
              <Text style={styles.financialLabel}>
                Total Bruto: {formatCurrency(stats.totalGrossSalary)}
              </Text>
              <Text style={styles.financialLabel}>
                Total Líquido: {formatCurrency(stats.totalNetSalary)}
              </Text>
            </View>
          </View>
        )}

        {/* Calculadora */}
        {showCalculator && (
          <View style={styles.calculatorContainer}>
            <Text style={styles.calculatorTitle}>Calculadora de Folha</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Salário Base"
              value={calculatorData.baseSalary}
              onChangeText={(text) => setCalculatorData({...calculatorData, baseSalary: text})}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Horas Extras"
              value={calculatorData.overtimeHours}
              onChangeText={(text) => setCalculatorData({...calculatorData, overtimeHours: text})}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Taxa de Hora Extra (padrão: 1.5)"
              value={calculatorData.overtimeRate}
              onChangeText={(text) => setCalculatorData({...calculatorData, overtimeRate: text})}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Bônus"
              value={calculatorData.bonuses}
              onChangeText={(text) => setCalculatorData({...calculatorData, bonuses: text})}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Descontos"
              value={calculatorData.deductions}
              onChangeText={(text) => setCalculatorData({...calculatorData, deductions: text})}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.calculateButton} onPress={calculatePayroll}>
              <Text style={styles.calculateButtonText}>Calcular</Text>
            </TouchableOpacity>

            {calculation && (
              <View style={styles.calculationResult}>
                <Text style={styles.resultTitle}>Resultado do Cálculo</Text>
                <Text style={styles.resultItem}>
                  Salário Bruto: {formatCurrency(calculation.grossSalary)}
                </Text>
                <Text style={styles.resultItem}>
                  INSS: {formatCurrency(calculation.inssValue)}
                </Text>
                <Text style={styles.resultItem}>
                  IRRF: {formatCurrency(calculation.irrfValue)}
                </Text>
                <Text style={styles.resultItem}>
                  FGTS: {formatCurrency(calculation.fgtsValue)}
                </Text>
                <Text style={styles.resultItem}>
                  Total Descontos: {formatCurrency(calculation.totalDeductions)}
                </Text>
                <Text style={[styles.resultItem, styles.netSalary]}>
                  Salário Líquido: {formatCurrency(calculation.netSalary)}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Lista de Folhas de Pagamento */}
        <View style={styles.payrollList}>
          <Text style={styles.listTitle}>Folhas de Pagamento</Text>
          
          {payrolls.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma folha de pagamento encontrada</Text>
            </View>
          ) : (
            payrolls.map(payroll => (
              <View key={payroll.id} style={styles.payrollCard}>
                <View style={styles.payrollHeader}>
                  <View style={styles.employeeInfo}>
                    <Text style={styles.employeeName}>{payroll.employeeName}</Text>
                    <Text style={styles.employeeId}>ID: {payroll.employeeId}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(payroll.status) }
                  ]}>
                    <Text style={styles.statusText}>
                      {getStatusText(payroll.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.payrollDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Salário Base:</Text>
                    <Text style={styles.detailValue}>{formatCurrency(payroll.baseSalary)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Salário Bruto:</Text>
                    <Text style={styles.detailValue}>{formatCurrency(payroll.grossSalary)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Salário Líquido:</Text>
                    <Text style={[styles.detailValue, styles.netValue]}>
                      {formatCurrency(payroll.netSalary)}
                    </Text>
                  </View>
                </View>

                <View style={styles.payrollActions}>
                  {payroll.status === 'pending' && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => updatePayrollStatus(payroll.id, 'approved')}
                      >
                        <Text style={styles.actionButtonText}>Aprovar</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {payroll.status === 'approved' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.payButton]}
                      onPress={() => updatePayrollStatus(payroll.id, 'paid')}
                    >
                      <Text style={styles.actionButtonText}>Marcar como Pago</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  calculatorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  financialStats: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  financialLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  calculatorContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  calculationResult: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  resultItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  netSalary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  payrollList: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  payrollCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payrollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  employeeId: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  payrollDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  netValue: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  payrollActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  approveButton: {
    backgroundColor: '#34C759',
  },
  payButton: {
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 