import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useEmployeesData } from '../hooks/useEmployeesData.ts';

/**
 * 👥 RECURSOS HUMANOS SCREEN
 * 
 * Seguindo as diretrizes do Framework de Decisão Arquitetural:
 * - Separação de responsabilidades: UI apenas
 * - Hook customizado para lógica de estado
 * - Fallback robusto para dados offline
 * - UX otimista para atualizações
 * - CRUD completo de funcionários
 */
const HRScreen: React.FC = () => {
  const { 
    employees, 
    loading, 
    error, 
    stats, 
    filters,
    reload, 
    createEmployee,
    updateEmployee,
    deleteEmployee,
    filterEmployees,
    formatCpf,
    formatSalary
  } = useEmployeesData();

  // Estados do modal de cadastro/edição
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    position: '',
    salary: ''
  });

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#ef4444';
      case 'on_leave': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'on_leave': return 'Licença';
      default: return 'Desconhecido';
    }
  };

  const handleOpenModal = (employee?: unknown) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        name: employee.name,
        cpf: employee.cpf,
        position: employee.position,
        salary: employee.salary.toString()
      });
    } else {
      setEditingEmployee(null);
      setFormData({ name: '', cpf: '', position: '', salary: '' });
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingEmployee(null);
    setFormData({ name: '', cpf: '', position: '', salary: '' });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.position || !formData.salary) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const salary = parseFloat(formData.salary);
    if (isNaN(salary) || salary <= 0) {
      alert('Salário deve ser um valor válido');
      return;
    }

    let result;
    if (editingEmployee) {
      // Atualizar funcionário existente
      result = await updateEmployee(editingEmployee.id, {
        name: formData.name,
        position: formData.position,
        salary: salary
      });
    } else {
      // Criar novo funcionário
      if (!formData.cpf) {
        alert('CPF é obrigatório para novos funcionários');
        return;
      }
      result = await createEmployee({
        name: formData.name,
        cpf: formData.cpf,
        position: formData.position,
        salary: salary
      });
    }

    if (result.success) {
      handleCloseModal();
    } else {
      alert(result.error || 'Erro ao salvar funcionário');
    }
  };

  const handleStatusChange = async (employeeId: string, newStatus: string) => {
    const result = await updateEmployee(employeeId, { status: newStatus });
    if (!result.success) {
      alert(result.error || 'Erro ao alterar status');
    }
  };

  const handleDelete = async (employeeId: string, employeeName: string) => {
    if (confirm(`Deseja realmente inativar ${employeeName}?`)) {
      const result = await deleteEmployee(employeeId);
      if (!result.success) {
        alert(result.error || 'Erro ao inativar funcionário');
      }
    }
  };

  const handleSearch = () => {
    filterEmployees({ search: searchTerm, status: statusFilter });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Carregando funcionários...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>👥 Recursos Humanos</Text>
        <Text style={styles.subtitle}>
          {error ? error : 'Gestão completa de funcionários e colaboradores'}
        </Text>
        {error && (
          <TouchableOpacity style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>🔄 Tentar Novamente</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Cards de Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.totalCard]}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={[styles.statCard, styles.activeCard]}>
          <Text style={styles.statNumber}>{stats.active}</Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>
        
        <View style={[styles.statCard, styles.inactiveCard]}>
          <Text style={styles.statNumber}>{stats.inactive}</Text>
          <Text style={styles.statLabel}>Inativos</Text>
        </View>

        <View style={[styles.statCard, styles.salaryCard]}>
          <Text style={styles.statNumber}>{formatSalary(stats.totalSalary)}</Text>
          <Text style={styles.statLabel}>Folha Total</Text>
        </View>
      </View>

      {/* Filtros e Busca */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, CPF ou cargo..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === '' && styles.filterButtonActive]}
            onPress={() => {
              setStatusFilter('');
              filterEmployees({ search: searchTerm, status: '' });
            }}
          >
            <Text style={styles.filterButtonText}>Todos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === 'active' && styles.filterButtonActive]}
            onPress={() => {
              setStatusFilter('active');
              filterEmployees({ search: searchTerm, status: 'active' });
            }}
          >
            <Text style={styles.filterButtonText}>Ativos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === 'inactive' && styles.filterButtonActive]}
            onPress={() => {
              setStatusFilter('inactive');
              filterEmployees({ search: searchTerm, status: 'inactive' });
            }}
          >
            <Text style={styles.filterButtonText}>Inativos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão Novo Funcionário */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.newEmployeeButton} onPress={() => handleOpenModal()}>
          <Text style={styles.newEmployeeButtonText}>+ Novo Funcionário</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Funcionários */}
      <View style={styles.employeesContainer}>
        <Text style={styles.sectionTitle}>📋 Funcionários ({employees.length})</Text>
        
        {employees.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyTitle}>Nenhum funcionário encontrado</Text>
            <Text style={styles.emptyDescription}>
              {filters.search || filters.status 
                ? 'Tente ajustar os filtros de busca'
                : 'Cadastre o primeiro funcionário clicando no botão acima'
              }
            </Text>
          </View>
        ) : (
          employees.map((employee) => (
            <View key={employee.id} style={styles.employeeCard}>
              {/* Header do Funcionário */}
              <View style={styles.employeeHeader}>
                <View style={styles.employeeInfo}>
                  <Text style={styles.employeeName}>{employee.name}</Text>
                  <Text style={styles.employeePosition}>{employee.position}</Text>
                </View>
                
                <View style={styles.employeeStatus}>
                  <View 
                    style={[
                      styles.statusBadge, 
                      { backgroundColor: getStatusColor(employee.status) }
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {getStatusText(employee.status)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Detalhes do Funcionário */}
              <View style={styles.employeeDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>CPF:</Text>
                  <Text style={styles.detailValue}>{formatCpf(employee.cpf)}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Salário:</Text>
                  <Text style={styles.detailValue}>{formatSalary(employee.salary)}</Text>
                </View>
                
                {employee.last_payroll && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Último Pagamento:</Text>
                    <Text style={styles.detailValue}>
                      {formatSalary(employee.last_payroll.net_salary)} 
                      ({employee.last_payroll.month}/{employee.last_payroll.year})
                    </Text>
                  </View>
                )}
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cadastrado:</Text>
                  <Text style={styles.detailValue}>
                    {new Date(employee.created_at).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              </View>

              {/* Ações do Funcionário */}
              <View style={styles.employeeActions}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleOpenModal(employee)}
                >
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>
                
                {employee.status === 'active' ? (
                  <TouchableOpacity 
                    style={styles.deactivateButton}
                    onPress={() => handleStatusChange(employee.id, 'inactive')}
                  >
                    <Text style={styles.deactivateButtonText}>⏸️ Inativar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.activateButton}
                    onPress={() => handleStatusChange(employee.id, 'active')}
                  >
                    <Text style={styles.activateButtonText}>▶️ Ativar</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDelete(employee.id, employee.name)}
                >
                  <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Modal de Cadastro/Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nome completo *"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            />
            
            {!editingEmployee && (
              <TextInput
                style={styles.input}
                placeholder="CPF (apenas números) *"
                value={formData.cpf}
                onChangeText={(text) => setFormData(prev => ({ ...prev, cpf: text.replace(/\D/g, '') }))}
                keyboardType="numeric"
                maxLength={11}
              />
            )}
            
            <TextInput
              style={styles.input}
              placeholder="Cargo/Posição *"
              value={formData.position}
              onChangeText={(text) => setFormData(prev => ({ ...prev, position: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Salário *"
              value={formData.salary}
              onChangeText={(text) => setFormData(prev => ({ ...prev, salary: text }))}
              keyboardType="numeric"
            />
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCloseModal}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>
                  {editingEmployee ? 'Atualizar' : 'Cadastrar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  // Header
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  inactiveCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  salaryCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Filters
  filtersContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  // Actions
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  newEmployeeButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  newEmployeeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Employees
  employeesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 250,
  },

  // Employee Cards
  employeeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  employeeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  employeePosition: {
    fontSize: 14,
    color: '#6b7280',
  },
  employeeStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },

  employeeDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
  },

  employeeActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  activateButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activateButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  deactivateButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deactivateButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default HRScreen;