import React, { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Modal,
} from 'react-native';

interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  department: 'domestic' | 'maintenance' | 'security' | 'gardening' | 'other';
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'vacation' | 'sick_leave';
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  grossSalary: number;
  deductions: {
    inss: number;
    irrf: number;
    fgts: number;
    other: number;
  };
  netSalary: number;
  status: 'pending' | 'paid' | 'cancelled';
  paymentDate?: string;
  notes?: string;
}

interface TimeRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  entryTime: string;
  exitTime?: string;
  totalHours?: number;
  overtime?: number;
  status: 'present' | 'absent' | 'late' | 'half_day';
  notes?: string;
}

interface HRScreenProps {
  onNavigateBack: () => void;
}

export const HRScreen: React.FC<HRScreenProps> = ({ onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'payroll' | 'timecard'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'employee' | 'payroll' | 'timecard'>('employee');
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Dados mockados para demonstração
  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'Maria Silva',
      cpf: '123.456.789-00',
      position: 'Empregada Doméstica',
      department: 'domestic',
      hireDate: '2023-01-15',
      salary: 2500,
      status: 'active',
      phone: '(11) 99999-9999',
      email: 'maria.silva@email.com',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      emergencyContact: 'João Silva',
      emergencyPhone: '(11) 88888-8888'
    },
    {
      id: '2',
      name: 'José Santos',
      cpf: '987.654.321-00',
      position: 'Jardineiro',
      department: 'gardening',
      hireDate: '2023-03-20',
      salary: 1800,
      status: 'active',
      phone: '(11) 77777-7777',
      email: 'jose.santos@email.com',
      address: 'Av. Principal, 456 - São Paulo/SP',
      emergencyContact: 'Ana Santos',
      emergencyPhone: '(11) 66666-6666'
    }
  ];

  const mockPayroll: Payroll[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Maria Silva',
      month: 'Janeiro',
      year: 2024,
      grossSalary: 2500,
      deductions: {
        inss: 200,
        irrf: 50,
        fgts: 200,
        other: 0
      },
      netSalary: 2250,
      status: 'paid',
      paymentDate: '2024-01-05'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'José Santos',
      month: 'Janeiro',
      year: 2024,
      grossSalary: 1800,
      deductions: {
        inss: 144,
        irrf: 0,
        fgts: 144,
        other: 0
      },
      netSalary: 1656,
      status: 'pending'
    }
  ];

  const mockTimeRecords: TimeRecord[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Maria Silva',
      date: '2024-01-15',
      entryTime: '08:00',
      exitTime: '17:00',
      totalHours: 9,
      overtime: 0,
      status: 'present'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'José Santos',
      date: '2024-01-15',
      entryTime: '07:30',
      exitTime: '16:30',
      totalHours: 9,
      overtime: 0,
      status: 'present'
    }
  ];

  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [payroll, setPayroll] = useState<Payroll[]>(mockPayroll);
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>(mockTimeRecords);

  // Cálculos do RH
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const pendingPayroll = payroll.filter(p => p.status === 'pending').length;
  const totalPayrollAmount = payroll.reduce((sum, p) => sum + p.netSalary, 0);

  const handleAddItem = (type: 'employee' | 'payroll' | 'timecard') => {
    setModalType(type);
    setFormData({});
    setShowAddModal(true);
  };

  const handleSaveItem = () => {
    if (!formData.name && !formData.employeeName) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      ...formData,
      date: formData.date || new Date().toISOString().split('T')[0]
    };

    switch (modalType) {
      case 'employee':
        setEmployees([...employees, newItem as Employee]);
        break;
      case 'payroll':
        // Calcular deduções automaticamente
        const grossSalary = formData.grossSalary || 0;
        const inss = grossSalary * 0.08; // 8% INSS
        const irrf = grossSalary > 1903.98 ? (grossSalary - 1903.98) * 0.075 : 0; // 7.5% IRRF
        const fgts = grossSalary * 0.08; // 8% FGTS
        const netSalary = grossSalary - inss - irrf - fgts - (formData.deductions?.other || 0);
        
        const payrollItem: Payroll = {
          ...newItem,
          deductions: { inss, irrf, fgts, other: formData.deductions?.other || 0 },
          netSalary
        } as Payroll;
        setPayroll([...payroll, payrollItem]);
        break;
      case 'timecard':
        setTimeRecords([...timeRecords, newItem as TimeRecord]);
        break;
    }

    setShowAddModal(false);
    setFormData({});
    Alert.alert('Sucesso', 'Item adicionado com sucesso');
  };

  const getDepartmentLabel = (department: string) => {
    const labels = {
      domestic: '🏠 Doméstico',
      maintenance: '🔧 Manutenção',
      security: '🛡️ Segurança',
      gardening: '🌱 Jardim',
      other: '📦 Outros'
    };
    return labels[department as keyof typeof labels] || department;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#4CAF50',
      inactive: '#9E9E9E',
      vacation: '#2196F3',
      sick_leave: '#FF9800',
      pending: '#FF9800',
      paid: '#4CAF50',
      cancelled: '#F44336',
      present: '#4CAF50',
      absent: '#F44336',
      late: '#FF9800',
      half_day: '#FFC107'
    };
    return colors[status as keyof typeof colors] || '#666';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Ativo',
      inactive: 'Inativo',
      vacation: 'Férias',
      sick_leave: 'Afastado',
      pending: 'Pendente',
      paid: 'Pago',
      cancelled: 'Cancelado',
      present: 'Presente',
      absent: 'Ausente',
      late: 'Atrasado',
      half_day: 'Meio Período'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const renderOverview = () => (
    <View>
      {/* Resumo do RH */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumo do RH</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total de Funcionários</Text>
            <Text style={styles.summaryValue}>{totalEmployees}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Funcionários Ativos</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              {activeEmployees}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Folha Salarial</Text>
            <Text style={styles.summaryValue}>
              R$ {totalSalary.toLocaleString('pt-BR')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Média Salarial</Text>
            <Text style={styles.summaryValue}>
              R$ {totalEmployees > 0 ? (totalSalary / totalEmployees).toLocaleString('pt-BR') : '0'}
            </Text>
          </View>
        </View>
      </View>

      {/* Folha de Pagamento */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Folha de Pagamento</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Pago</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              R$ {totalPayrollAmount.toLocaleString('pt-BR')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pendentes</Text>
            <Text style={[styles.summaryValue, { color: '#FF9800' }]}>
              {pendingPayroll}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Média por Funcionário</Text>
            <Text style={styles.summaryValue}>
              R$ {totalEmployees > 0 ? (totalPayrollAmount / totalEmployees).toLocaleString('pt-BR') : '0'}
            </Text>
          </View>
        </View>
      </View>

      {/* Presença Hoje */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Presença Hoje</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Presentes</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              {timeRecords.filter(t => t.date === new Date().toISOString().split('T')[0] && t.status === 'present').length}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Ausentes</Text>
            <Text style={[styles.summaryValue, { color: '#F44336' }]}>
              {timeRecords.filter(t => t.date === new Date().toISOString().split('T')[0] && t.status === 'absent').length}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Atrasados</Text>
            <Text style={[styles.summaryValue, { color: '#FF9800' }]}>
              {timeRecords.filter(t => t.date === new Date().toISOString().split('T')[0] && t.status === 'late').length}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmployees = () => (
    <View>
      {employees.map((employee) => (
        <View key={employee.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{employee.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(employee.status) }
            ]}>
              <Text style={styles.statusText}>
                {getStatusLabel(employee.status)}
              </Text>
            </View>
          </View>
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemCategory}>
              {getDepartmentLabel(employee.department)}
            </Text>
            <Text style={styles.itemPosition}>
              {employee.position}
            </Text>
          </View>

          <View style={styles.employeeInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CPF:</Text>
              <Text style={styles.infoValue}>{employee.cpf}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Salário:</Text>
              <Text style={styles.infoValue}>
                R$ {employee.salary.toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Admissão:</Text>
              <Text style={styles.infoValue}>
                {new Date(employee.hireDate).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefone:</Text>
              <Text style={styles.infoValue}>{employee.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{employee.email}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPayroll = () => (
    <View>
      {payroll.map((pay) => (
        <View key={pay.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{pay.employeeName}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(pay.status) }
            ]}>
              <Text style={styles.statusText}>
                {getStatusLabel(pay.status)}
              </Text>
            </View>
          </View>
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemPeriod}>
              {pay.month}/{pay.year}
            </Text>
          </View>

          <View style={styles.payrollInfo}>
            <View style={styles.payrollRow}>
              <Text style={styles.payrollLabel}>Salário Bruto:</Text>
              <Text style={styles.payrollValue}>
                R$ {pay.grossSalary.toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={styles.payrollRow}>
              <Text style={styles.payrollLabel}>INSS:</Text>
              <Text style={styles.payrollValue}>
                - R$ {pay.deductions.inss.toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={styles.payrollRow}>
              <Text style={styles.payrollLabel}>IRRF:</Text>
              <Text style={styles.payrollValue}>
                - R$ {pay.deductions.irrf.toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={styles.payrollRow}>
              <Text style={styles.payrollLabel}>FGTS:</Text>
              <Text style={styles.payrollValue}>
                - R$ {pay.deductions.fgts.toLocaleString('pt-BR')}
              </Text>
            </View>
            {pay.deductions.other > 0 && (
              <View style={styles.payrollRow}>
                <Text style={styles.payrollLabel}>Outros:</Text>
                <Text style={styles.payrollValue}>
                  - R$ {pay.deductions.other.toLocaleString('pt-BR')}
                </Text>
              </View>
            )}
            <View style={[styles.payrollRow, styles.netSalaryRow]}>
              <Text style={styles.netSalaryLabel}>Salário Líquido:</Text>
              <Text style={styles.netSalaryValue}>
                R$ {pay.netSalary.toLocaleString('pt-BR')}
              </Text>
            </View>
            {pay.paymentDate && (
              <View style={styles.payrollRow}>
                <Text style={styles.payrollLabel}>Data do Pagamento:</Text>
                <Text style={styles.payrollValue}>
                  {new Date(pay.paymentDate).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderTimeCard = () => (
    <View>
      {timeRecords.map((record) => (
        <View key={record.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{record.employeeName}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(record.status) }
            ]}>
              <Text style={styles.statusText}>
                {getStatusLabel(record.status)}
              </Text>
            </View>
          </View>
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemDate}>
              {new Date(record.date).toLocaleDateString('pt-BR')}
            </Text>
          </View>

          <View style={styles.timeCardInfo}>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Entrada:</Text>
              <Text style={styles.timeValue}>{record.entryTime}</Text>
            </View>
            {record.exitTime && (
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Saída:</Text>
                <Text style={styles.timeValue}>{record.exitTime}</Text>
              </View>
            )}
            {record.totalHours && (
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Total de Horas:</Text>
                <Text style={styles.timeValue}>{record.totalHours}h</Text>
              </View>
            )}
            {record.overtime && record.overtime > 0 && (
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Horas Extras:</Text>
                <Text style={[styles.timeValue, { color: '#FF9800' }]}>
                  +{record.overtime}h
                </Text>
              </View>
            )}
            {record.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Observações:</Text>
                <Text style={styles.notesText}>{record.notes}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Sistema de RH</Text>
        <Pressable 
          style={styles.addButton} 
          onPress={() => handleAddItem(activeTab === 'employees' ? 'employee' : 
                                     activeTab === 'payroll' ? 'payroll' : 'timecard')}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            📊 Resumo
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'employees' && styles.activeTab]}
          onPress={() => setActiveTab('employees')}
        >
          <Text style={[styles.tabText, activeTab === 'employees' && styles.activeTabText]}>
            👥 Funcionários
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'payroll' && styles.activeTab]}
          onPress={() => setActiveTab('payroll')}
        >
          <Text style={[styles.tabText, activeTab === 'payroll' && styles.activeTabText]}>
            💰 Folha de Pagamento
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'timecard' && styles.activeTab]}
          onPress={() => setActiveTab('timecard')}
        >
          <Text style={[styles.tabText, activeTab === 'timecard' && styles.activeTabText]}>
            ⏰ Controle de Ponto
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'employees' && renderEmployees()}
        {activeTab === 'payroll' && renderPayroll()}
        {activeTab === 'timecard' && renderTimeCard()}
      </ScrollView>

      {/* Modal para Adicionar Item */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === 'employee' ? 'Adicionar Funcionário' :
               modalType === 'payroll' ? 'Adicionar Folha de Pagamento' : 'Registrar Ponto'}
            </Text>

            {modalType === 'employee' && (
              <>
                <Text style={styles.inputLabel}>Nome Completo *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name || ''}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Nome do funcionário"
                />

                <Text style={styles.inputLabel}>CPF *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.cpf || ''}
                  onChangeText={(text) => setFormData({ ...formData, cpf: text })}
                  placeholder="000.000.000-00"
                />

                <Text style={styles.inputLabel}>Cargo *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.position || ''}
                  onChangeText={(text) => setFormData({ ...formData, position: text })}
                  placeholder="Ex: Empregada Doméstica"
                />

                <Text style={styles.inputLabel}>Departamento</Text>
                <View style={styles.departmentSelector}>
                  {['domestic', 'maintenance', 'security', 'gardening', 'other'].map((dept) => (
                    <Pressable
                      key={dept}
                      style={[
                        styles.departmentOption,
                        formData.department === dept && styles.departmentOptionSelected
                      ]}
                      onPress={() => setFormData({ ...formData, department: dept })}
                    >
                      <Text style={[
                        styles.departmentOptionText,
                        formData.department === dept && styles.departmentOptionTextSelected
                      ]}>
                        {getDepartmentLabel(dept)}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Salário *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.salary?.toString() || ''}
                  onChangeText={(text) => setFormData({ ...formData, salary: parseFloat(text) || 0 })}
                  placeholder="0,00"
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Data de Admissão</Text>
                <TextInput
                  style={styles.input}
                  value={formData.hireDate || ''}
                  onChangeText={(text) => setFormData({ ...formData, hireDate: text })}
                  placeholder="YYYY-MM-DD"
                />

                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  value={formData.phone || ''}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  placeholder="(11) 99999-9999"
                />

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email || ''}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholder="email@exemplo.com"
                />
              </>
            )}

            {modalType === 'payroll' && (
              <>
                <Text style={styles.inputLabel}>Funcionário *</Text>
                <View style={styles.employeeSelector}>
                  {employees.map((emp) => (
                    <Pressable
                      key={emp.id}
                      style={[
                        styles.employeeOption,
                        formData.employeeId === emp.id && styles.employeeOptionSelected
                      ]}
                      onPress={() => setFormData({ 
                        ...formData, 
                        employeeId: emp.id, 
                        employeeName: emp.name,
                        grossSalary: emp.salary 
                      })}
                    >
                      <Text style={[
                        styles.employeeOptionText,
                        formData.employeeId === emp.id && styles.employeeOptionTextSelected
                      ]}>
                        {emp.name} - {emp.position}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Mês *</Text>
                <View style={styles.monthSelector}>
                  {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((month) => (
                    <Pressable
                      key={month}
                      style={[
                        styles.monthOption,
                        formData.month === month && styles.monthOptionSelected
                      ]}
                      onPress={() => setFormData({ ...formData, month })}
                    >
                      <Text style={[
                        styles.monthOptionText,
                        formData.month === month && styles.monthOptionTextSelected
                      ]}>
                        {month}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Ano *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.year?.toString() || ''}
                  onChangeText={(text) => setFormData({ ...formData, year: parseInt(text) || 2024 })}
                  placeholder="2024"
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Salário Bruto</Text>
                <TextInput
                  style={styles.input}
                  value={formData.grossSalary?.toString() || ''}
                  onChangeText={(text) => setFormData({ ...formData, grossSalary: parseFloat(text) || 0 })}
                  placeholder="0,00"
                  keyboardType="numeric"
                />
              </>
            )}

            {modalType === 'timecard' && (
              <>
                <Text style={styles.inputLabel}>Funcionário *</Text>
                <View style={styles.employeeSelector}>
                  {employees.map((emp) => (
                    <Pressable
                      key={emp.id}
                      style={[
                        styles.employeeOption,
                        formData.employeeId === emp.id && styles.employeeOptionSelected
                      ]}
                      onPress={() => setFormData({ 
                        ...formData, 
                        employeeId: emp.id, 
                        employeeName: emp.name 
                      })}
                    >
                      <Text style={[
                        styles.employeeOptionText,
                        formData.employeeId === emp.id && styles.employeeOptionTextSelected
                      ]}>
                        {emp.name} - {emp.position}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Data</Text>
                <TextInput
                  style={styles.input}
                  value={formData.date || ''}
                  onChangeText={(text) => setFormData({ ...formData, date: text })}
                  placeholder="YYYY-MM-DD"
                />

                <Text style={styles.inputLabel}>Horário de Entrada</Text>
                <TextInput
                  style={styles.input}
                  value={formData.entryTime || ''}
                  onChangeText={(text) => setFormData({ ...formData, entryTime: text })}
                  placeholder="08:00"
                />

                <Text style={styles.inputLabel}>Horário de Saída</Text>
                <TextInput
                  style={styles.input}
                  value={formData.exitTime || ''}
                  onChangeText={(text) => setFormData({ ...formData, exitTime: text })}
                  placeholder="17:00"
                />

                <Text style={styles.inputLabel}>Status</Text>
                <View style={styles.statusSelector}>
                  {['present', 'absent', 'late', 'half_day'].map((status) => (
                    <Pressable
                      key={status}
                      style={[
                        styles.statusOption,
                        formData.status === status && styles.statusOptionSelected
                      ]}
                      onPress={() => setFormData({ ...formData, status })}
                    >
                      <Text style={[
                        styles.statusOptionText,
                        formData.status === status && styles.statusOptionTextSelected
                      ]}>
                        {getStatusLabel(status)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveItem}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  itemDetails: {
    marginBottom: 12,
  },
  itemCategory: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPosition: {
    fontSize: 12,
    color: '#666',
  },
  itemPeriod: {
    fontSize: 12,
    color: '#999',
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  employeeInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
  },
  infoValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  payrollInfo: {
    gap: 8,
  },
  payrollRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payrollLabel: {
    fontSize: 12,
    color: '#666',
  },
  payrollValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  netSalaryRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  netSalaryLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  netSalaryValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  timeCardInfo: {
    gap: 8,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
  },
  timeValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  notesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  notesLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  departmentSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  departmentOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  departmentOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  departmentOptionText: {
    fontSize: 12,
    color: '#666',
  },
  departmentOptionTextSelected: {
    color: '#fff',
  },
  employeeSelector: {
    gap: 8,
    marginTop: 8,
  },
  employeeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  employeeOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  employeeOptionText: {
    fontSize: 14,
    color: '#666',
  },
  employeeOptionTextSelected: {
    color: '#fff',
  },
  monthSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  monthOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  monthOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  monthOptionText: {
    fontSize: 12,
    color: '#666',
  },
  monthOptionTextSelected: {
    color: '#fff',
  },
  statusSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  statusOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  statusOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusOptionText: {
    fontSize: 12,
    color: '#666',
  },
  statusOptionTextSelected: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 