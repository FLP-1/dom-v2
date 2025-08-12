/**
 * Tela de Folha de Pagamento
 * @description Interface completa para gestão de folha de pagamento
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * Funcionalidades:
 * - Listagem de períodos de folha
 * - Criação e cálculo de períodos
 * - Aprovação e geração de holerites
 * - Configurações de cálculo
 * - Relatórios e estatísticas
 */

import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { usePayrollData } from '../hooks/usePayrollData.ts';

const PayrollScreen: React.FC = () => {
  // Estados locais
  const [selectedTab, setSelectedTab] = useState<'periods' | 'config' | 'reports'>('periods');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPeriodMonth, setNewPeriodMonth] = useState(new Date().getMonth() + 1);
  const [newPeriodYear, setNewPeriodYear] = useState(new Date().getFullYear());
  // const [selectedPeriod] = useState<string | null>(null);

  // Hook de dados
  const {
    periods,
    // currentPeriod,
    config,
    stats,
    loading,
    error,
    createPeriod,
    calculatePeriod,
    approvePeriod,
    generatePayslips,
    loadPeriodDetails,
    formatCurrency,
    formatPeriod,
    getStatusLabel,
    getStatusColor
  } = usePayrollData();

  // ==========================================
  // 🎬 HANDLERS
  // ==========================================

  const handleCreatePeriod = useCallback(async () => {
    const success = await createPeriod(newPeriodMonth, newPeriodYear);
    if (success) {
      setShowCreateModal(false);
      Alert.alert('Sucesso', 'Período criado com sucesso!');
    } else {
      Alert.alert('Erro', 'Erro ao criar período');
    }
  }, [createPeriod, newPeriodMonth, newPeriodYear]);

  const handleCalculatePeriod = useCallback(async (periodId: string) => {
    Alert.alert(
      'Confirmar Cálculo',
      'Deseja calcular a folha de pagamento para este período?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Calcular',
          onPress: async () => {
            const success = await calculatePeriod(periodId);
            if (success) {
              Alert.alert('Sucesso', 'Folha calculada com sucesso!');
            } else {
              Alert.alert('Erro', 'Erro ao calcular folha');
            }
          }
        }
      ]
    );
  }, [calculatePeriod]);

  const handleApprovePeriod = useCallback(async (periodId: string) => {
    Alert.alert(
      'Confirmar Aprovação',
      'Deseja aprovar esta folha de pagamento? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aprovar',
          onPress: async () => {
            const success = await approvePeriod(periodId);
            if (success) {
              Alert.alert('Sucesso', 'Folha aprovada com sucesso!');
            } else {
              Alert.alert('Erro', 'Erro ao aprovar folha');
            }
          }
        }
      ]
    );
  }, [approvePeriod]);

  const handleGeneratePayslips = useCallback(async (periodId: string) => {
    const success = await generatePayslips(periodId);
    if (success) {
      Alert.alert('Sucesso', 'Holerites gerados com sucesso!');
    } else {
      Alert.alert('Erro', 'Erro ao gerar holerites');
    }
  }, [generatePayslips]);

  const handleViewDetails = useCallback(async (periodId: string) => {
    await loadPeriodDetails(periodId);
    setSelectedPeriod(periodId);
  }, [loadPeriodDetails]);

  // ==========================================
  // 🎨 RENDERIZAÇÃO
  // ==========================================

  if (loading && periods.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando folha de pagamento...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>💰 Folha de Pagamento</Text>
        <Text style={styles.subtitle}>Gestão completa de salários e benefícios</Text>
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}
      </View>

      {/* Estatísticas */}
      {stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.active_employees}</Text>
            <Text style={styles.statLabel}>Funcionários</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(stats.total_gross_current)}</Text>
            <Text style={styles.statLabel}>Total Bruto</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(stats.total_net_current)}</Text>
            <Text style={styles.statLabel}>Total Líquido</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(stats.total_fgts)}</Text>
            <Text style={styles.statLabel}>FGTS</Text>
          </View>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'periods' && styles.activeTab]}
          onPress={() => setSelectedTab('periods')}
        >
          <Text style={[styles.tabText, selectedTab === 'periods' && styles.activeTabText]}>
            Períodos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'config' && styles.activeTab]}
          onPress={() => setSelectedTab('config')}
        >
          <Text style={[styles.tabText, selectedTab === 'config' && styles.activeTabText]}>
            Configurações
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'reports' && styles.activeTab]}
          onPress={() => setSelectedTab('reports')}
        >
          <Text style={[styles.tabText, selectedTab === 'reports' && styles.activeTabText]}>
            Relatórios
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Tab: Períodos */}
        {selectedTab === 'periods' && (
          <View style={styles.tabContent}>
            {/* Botão Criar Período */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => setShowCreateModal(true)}
            >
              <Text style={styles.createButtonText}>+ Novo Período</Text>
            </TouchableOpacity>

            {/* Lista de Períodos */}
            <View style={styles.periodsContainer}>
              {periods.map((period) => (
                <View key={period.id} style={styles.periodCard}>
                  <View style={styles.periodHeader}>
                    <View>
                      <Text style={styles.periodTitle}>
                        {formatPeriod(period.reference_month, period.reference_year)}
                      </Text>
                      <View style={styles.statusContainer}>
                        <View 
                          style={[
                            styles.statusBadge, 
                            { backgroundColor: getStatusColor(period.status) }
                          ]}
                        />
                        <Text style={styles.statusText}>
                          {getStatusLabel(period.status)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.periodValues}>
                      <Text style={styles.periodValue}>
                        {formatCurrency(period.total_net)}
                      </Text>
                      <Text style={styles.periodLabel}>Líquido</Text>
                    </View>
                  </View>

                  <View style={styles.periodDetails}>
                    <Text style={styles.periodDetail}>
                      Bruto: {formatCurrency(period.total_gross)}
                    </Text>
                    <Text style={styles.periodDetail}>
                      Descontos: {formatCurrency(period.total_discounts)}
                    </Text>
                    <Text style={styles.periodDetail}>
                      Funcionários: {period._count?.payroll_items || 0}
                    </Text>
                  </View>

                  <View style={styles.periodActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleViewDetails(period.id)}
                    >
                      <Text style={styles.actionButtonText}>Detalhes</Text>
                    </TouchableOpacity>

                    {period.status === 'draft' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.calculateButton]}
                        onPress={() => handleCalculatePeriod(period.id)}
                      >
                        <Text style={[styles.actionButtonText, styles.calculateButtonText]}>
                          Calcular
                        </Text>
                      </TouchableOpacity>
                    )}

                    {period.status === 'calculated' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => handleApprovePeriod(period.id)}
                      >
                        <Text style={[styles.actionButtonText, styles.approveButtonText]}>
                          Aprovar
                        </Text>
                      </TouchableOpacity>
                    )}

                    {period.status === 'approved' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.payslipButton]}
                        onPress={() => handleGeneratePayslips(period.id)}
                      >
                        <Text style={[styles.actionButtonText, styles.payslipButtonText]}>
                          Holerites
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {periods.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  📋 Nenhum período de folha encontrado
                </Text>
                <Text style={styles.emptySubtext}>
                  Crie um novo período para começar
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Tab: Configurações */}
        {selectedTab === 'config' && config && (
          <View style={styles.tabContent}>
            <View style={styles.configSection}>
              <Text style={styles.configTitle}>🏢 Dados da Empresa</Text>
              <Text style={styles.configValue}>
                {config.company_name}
              </Text>
              {config.company_cnpj && (
                <Text style={styles.configValue}>
                  CNPJ: {config.company_cnpj}
                </Text>
              )}
            </View>

            <View style={styles.configSection}>
              <Text style={styles.configTitle}>💰 Configurações de Cálculo</Text>
              <Text style={styles.configItem}>
                FGTS: {config.fgts_rate}%
              </Text>
              <Text style={styles.configItem}>
                Vale Transporte: {config.transport_percentage}%
              </Text>
              <Text style={styles.configItem}>
                Dia do Pagamento: {config.payment_day}
              </Text>
              <Text style={styles.configItem}>
                Dia de Fechamento: {config.cutoff_day}
              </Text>
            </View>

            <View style={styles.configSection}>
              <Text style={styles.configTitle}>📊 Tabela INSS 2025</Text>
              {config.inss_rates.map((rate, index) => (
                <Text key={index} style={styles.configItem}>
                  {formatCurrency(rate.min)} - {formatCurrency(rate.max)}: {rate.rate}%
                </Text>
              ))}
            </View>

            <View style={styles.configSection}>
              <Text style={styles.configTitle}>🧾 Tabela IRRF 2025</Text>
              {config.irrf_rates.map((rate, index) => (
                <Text key={index} style={styles.configItem}>
                  {formatCurrency(rate.min)} - {rate.max === 999999.99 ? '∞' : formatCurrency(rate.max)}: {rate.rate}%
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Tab: Relatórios */}
        {selectedTab === 'reports' && (
          <View style={styles.tabContent}>
            <View style={styles.reportSection}>
              <Text style={styles.reportTitle}>📈 Relatórios Disponíveis</Text>
              
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>📊 Resumo Anual</Text>
                <Text style={styles.reportDescription}>
                  Consolidado de todos os períodos do ano
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>💰 Análise de Custos</Text>
                <Text style={styles.reportDescription}>
                  Evolução dos custos trabalhistas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>📋 Holerites por Período</Text>
                <Text style={styles.reportDescription}>
                  Exportar holerites em PDF
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>🏦 FGTS e Encargos</Text>
                <Text style={styles.reportDescription}>
                  Relatório para órgãos oficiais
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modal Criar Período */}
      {showCreateModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Período</Text>
            
            <View style={styles.modalForm}>
              <Text style={styles.modalLabel}>Mês:</Text>
              <TextInput
                style={styles.modalInput}
                value={newPeriodMonth.toString()}
                onChangeText={(text) => setNewPeriodMonth(parseInt(text) || 1)}
                keyboardType="numeric"
                placeholder="1-12"
              />

              <Text style={styles.modalLabel}>Ano:</Text>
              <TextInput
                style={styles.modalInput}
                value={newPeriodYear.toString()}
                onChangeText={(text) => setNewPeriodYear(parseInt(text) || 2025)}
                keyboardType="numeric"
                placeholder="2025"
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleCreatePeriod}
              >
                <Text style={styles.modalConfirmText}>Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// ==========================================
// 🎨 ESTILOS
// ==========================================

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#3b82f6',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  createButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  periodsContainer: {
    gap: 16,
  },
  periodCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  periodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  periodValues: {
    alignItems: 'flex-end',
  },
  periodValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  periodLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  periodDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  periodDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  periodActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  calculateButton: {
    backgroundColor: '#dbeafe',
    borderColor: '#93c5fd',
  },
  calculateButtonText: {
    color: '#1d4ed8',
  },
  approveButton: {
    backgroundColor: '#d1fae5',
    borderColor: '#86efac',
  },
  approveButtonText: {
    color: '#047857',
  },
  payslipButton: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
  },
  payslipButtonText: {
    color: '#b45309',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  configSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  configTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  configValue: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  configItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    paddingLeft: 8,
  },
  reportSection: {
    gap: 12,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  reportButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalForm: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
    marginTop: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  modalCancelText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#3b82f6',
  },
  modalConfirmText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
};

export default PayrollScreen;
