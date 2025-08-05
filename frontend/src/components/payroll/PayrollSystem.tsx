







import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { PayrollCalculator } from './PayrollCalculator';
import { PayrollHistory } from './PayrollHistory';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
  // Implementar logging, notificação, etc.
}
import { PayrollDetails } from './PayrollDetails';

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  baseSalary: number;
  admissionDate: string;
  status: 'active' | 'inactive' | 'vacation';
}

export interface PayrollItem {
  id: string;
  employeeId: string;
  employeeName: string;
  month: number;
  year: number;
  baseSalary: number;
  grossSalary: number;
  netSalary: number;
  inss: number;
  irrf: number;
  fgts: number;
  otherDeductions: number;
  otherAdditions: number;
  totalDeductions: number;
  totalAdditions: number;
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
  updatedAt: string;
}

export interface PayrollCalculation {
  grossSalary: number;
  inss: number;
  irrf: number;
  fgts: number;
  netSalary: number;
  totalDeductions: number;
  totalAdditions: number;
}

export const PayrollSystem: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollItems, setPayrollItems] = useState<PayrollItem[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollItem | null>(null);

  // Carregar dados iniciais
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Dados de exemplo
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'Maria Silva',
        cpf: '123.456.789-00',
        position: 'Doméstica',
        baseSalary: 1200,
        admissionDate: '2024-01-15',
        status: 'active',
      },
      {
        id: '2',
        name: 'João Santos',
        cpf: '987.654.321-00',
        position: 'Jardineiro',
        baseSalary: 800,
        admissionDate: '2024-03-20',
        status: 'active',
      },
      {
        id: '3',
        name: 'Ana Costa',
        cpf: '456.789.123-00',
        position: 'Cozinheira',
        baseSalary: 1500,
        admissionDate: '2024-02-10',
        status: 'active',
      },
    ];

    const mockPayrollItems: PayrollItem[] = [
      {
        id: '1',
        employeeId: '1',
        employeeName: 'Maria Silva',
        month: 1,
        year: 2025,
        baseSalary: 1200,
        grossSalary: 1200,
        netSalary: 1080,
        inss: 96,
        irrf: 0,
        fgts: 96,
        otherDeductions: 24,
        otherAdditions: 0,
        totalDeductions: 120,
        totalAdditions: 0,
        status: 'paid',
        createdAt: '2025-01-26T10:00:00Z',
        updatedAt: '2025-01-26T10:00:00Z',
      },
    ];

    setEmployees(mockEmployees);
    setPayrollItems(mockPayrollItems);
  };

  const handleGeneratePayroll = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowCalculator(true);
  };

  const handleViewHistory = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowHistory(true);
  };

  const handleViewDetails = (payroll: PayrollItem) => {
    setSelectedPayroll(payroll);
    setShowDetails(true);
  };

  const handleSavePayroll = (calculation: PayrollCalculation) => {
    if (!selectedEmployee) return;

    const newPayroll: PayrollItem = {
      id: Date.now().toString(),
      employeeId: selectedEmployee.id,
      employeeName: selectedEmployee.name,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      baseSalary: selectedEmployee.baseSalary,
      grossSalary: calculation.grossSalary,
      netSalary: calculation.netSalary,
      inss: calculation.inss,
      irrf: calculation.irrf,
      fgts: calculation.fgts,
      otherDeductions: calculation.totalDeductions,
      otherAdditions: calculation.totalAdditions,
      totalDeductions: calculation.totalDeductions,
      totalAdditions: calculation.totalAdditions,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPayrollItems(prev => [...prev, newPayroll]);
    setShowCalculator(false);
    setSelectedEmployee(null);

    Alert.alert('Sucesso', 'Folha de pagamento gerada com sucesso!');
  };

  const handleApprovePayroll = (payrollId: string) => {
    setPayrollItems(prev =>
      prev.map(item =>
        item.id === payrollId ? { ...item, status: 'approved' as const } : item
      )
    );
    Alert.alert('Sucesso', 'Folha de pagamento aprovada!');
  };

  const handlePayPayroll = (payrollId: string) => {
    setPayrollItems(prev =>
      prev.map(item =>
        item.id === payrollId ? { ...item, status: 'paid' as const } : item
      )
    );
    Alert.alert('Sucesso', 'Pagamento realizado com sucesso!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'approved':
        return '#17a2b8';
      case 'paid':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovada';
      case 'paid':
        return 'Paga';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sistema de Folha de Pagamento</Text>
        <Text style={styles.subtitle}>Gestão completa de remunerações</Text>
      </View>

      {/* Lista de Funcionários  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funcionários</Text>
        {employees.map(employee => (
          <View key={employee.id} style={styles.employeeCard}>
            <View style={styles.employeeInfo}>
              <Text style={styles.employeeName}>{employee.name}</Text>
              <Text style={styles.employeePosition}>{employee.position}</Text>
              <Text style={styles.employeeSalary}>
                R$ {employee.baseSalary.toFixed(2)}
              </Text>
            </View>
            <View style={styles.employeeActions}>
              <TouchableOpacity
                style={[styles.button, styles.generateButton]}
                onPress={() => handleGeneratePayroll(employee)}
              >
                <Text style={styles.buttonText}>Gerar Folha</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.historyButton]}
                onPress={() => handleViewHistory(employee)}
              >
                <Text style={styles.buttonText}>Histórico</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Lista de Folhas de Pagamento  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Folhas de Pagamento</Text>
        {payrollItems.map(payroll => (
          <View key={payroll.id} style={styles.payrollCard}>
            <View style={styles.payrollInfo}>
              <Text style={styles.payrollEmployee}>{payroll.employeeName}</Text>
              <Text style={styles.payrollPeriod}>
                {payroll.month}/{payroll.year}
              </Text>
              <Text style={styles.payrollSalary}>
                R$ {payroll.netSalary.toFixed(2)}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(payroll.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(payroll.status)}
                </Text>
              </View>
            </View>
            <View style={styles.payrollActions}>
              <TouchableOpacity
                style={[styles.button, styles.detailsButton]}
                onPress={() => handleViewDetails(payroll)}
              >
                <Text style={styles.buttonText}>Detalhes</Text>
              </TouchableOpacity>
              {payroll.status === 'pending' && (
                <TouchableOpacity
                  style={[styles.button, styles.approveButton]}
                  onPress={() => handleApprovePayroll(payroll.id)}
                >
                  <Text style={styles.buttonText}>Aprovar</Text>
                </TouchableOpacity>
              )}
              {payroll.status === 'approved' && (
                <TouchableOpacity
                  style={[styles.button, styles.payButton]}
                  onPress={() => handlePayPayroll(payroll.id)}
                >
                  <Text style={styles.buttonText}>Pagar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Modal do Calculador  */}
      <Modal
        visible={showCalculator}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalculator(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEmployee && (
              <PayrollCalculator
                employee={selectedEmployee}
                onSave={handleSavePayroll}
                onCancel={() => setShowCalculator(false)}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Modal do Histórico  */}
      <Modal
        visible={showHistory}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHistory(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEmployee && (
              <PayrollHistory
                employee={selectedEmployee}
                payrollItems={payrollItems.filter(
                  item => item.employeeId === selectedEmployee.id
                )}
                onClose={() => setShowHistory(false)}
                onViewDetails={handleViewDetails}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Modal dos Detalhes  */}
      <Modal
        visible={showDetails}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPayroll && (
              <PayrollDetails
                payroll={selectedPayroll}
                onClose={() => setShowDetails(false)}
              />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  employeeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  employeeInfo: {
    marginBottom: 10,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  employeePosition: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  employeeSalary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
  },
  employeeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payrollCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  payrollInfo: {
    marginBottom: 10,
  },
  payrollEmployee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  payrollPeriod: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  payrollSalary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  payrollActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#007bff',
  },
  historyButton: {
    backgroundColor: '#6c757d',
  },
  detailsButton: {
    backgroundColor: '#17a2b8',
  },
  approveButton: {
    backgroundColor: '#28a745',
  },
  payButton: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
  },
});

export default PayrollSystem; 


Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */