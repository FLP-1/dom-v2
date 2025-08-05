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
  ActivityIndicator,
} from 'react-native';
import IntegrationService from '../services/integrations';

interface ReportsScreenProps {
  onNavigateBack: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'hr' | 'timecard' | 'export'>('overview');
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');

  const integrationService = IntegrationService.getInstance();

  // Dados mockados para relatórios
  const mockData = {
    overview: {
      totalEmployees: 12,
      activeEmployees: 10,
      totalRevenue: 45000,
      totalExpenses: 32000,
      profit: 13000,
      profitMargin: 28.9,
      averageSalary: 2800,
      totalHours: 1920,
      averageHoursPerEmployee: 160
    },
    financial: {
      revenue: {
        jan: 42000, feb: 45000, mar: 48000, apr: 46000,
        may: 47000, jun: 49000, jul: 52000, aug: 51000,
        sep: 53000, oct: 55000, nov: 54000, dec: 58000
      },
      expenses: {
        jan: 30000, feb: 32000, mar: 34000, apr: 33000,
        may: 35000, jun: 36000, jul: 38000, aug: 37000,
        sep: 39000, oct: 40000, nov: 41000, dec: 42000
      },
      categories: {
        salaries: 280000,
        supplies: 45000,
        maintenance: 32000,
        utilities: 18000,
        insurance: 15000,
        other: 12000
      }
    },
    hr: {
      departments: {
        domestic: 6,
        maintenance: 2,
        security: 2,
        gardening: 1,
        other: 1
      },
      turnover: {
        hired: 3,
        left: 1,
        rate: 8.3
      },
      satisfaction: 4.2,
      attendance: 94.5
    },
    timecard: {
      totalDays: 264,
      presentDays: 250,
      absentDays: 14,
      averageHours: 8.2,
      overtime: 156,
      lateArrivals: 8,
      earlyDepartures: 3
    }
  };

  const handleExportReport = async () => {
    setLoading(true);
    try {
      // Simular exportação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileName = `relatorio_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      Alert.alert('Sucesso', `Relatório exportado: ${fileName}`);
      setShowExportModal(false);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao exportar relatório');
    } finally {
      setLoading(false);
    }
  };

  const renderOverviewTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Resumo Geral</Text>
      
      <View style={styles.periodSelector}>
        <Text style={styles.periodLabel}>Período:</Text>
        <View style={styles.periodButtons}>
          {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
            <Pressable
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonSelected
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextSelected
              ]}>
                {period === 'week' && 'Semana'}
                {period === 'month' && 'Mês'}
                {period === 'quarter' && 'Trimestre'}
                {period === 'year' && 'Ano'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.overviewGrid}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>Funcionários</Text>
          <Text style={styles.overviewValue}>{mockData.overview.totalEmployees}</Text>
          <Text style={styles.overviewSubtext}>
            {mockData.overview.activeEmployees} ativos
          </Text>
        </View>

        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>Receita</Text>
          <Text style={styles.overviewValue}>
            R$ {mockData.overview.totalRevenue.toLocaleString('pt-BR')}
          </Text>
          <Text style={styles.overviewSubtext}>
            +12% vs mês anterior
          </Text>
        </View>

        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>Despesas</Text>
          <Text style={styles.overviewValue}>
            R$ {mockData.overview.totalExpenses.toLocaleString('pt-BR')}
          </Text>
          <Text style={styles.overviewSubtext}>
            +8% vs mês anterior
          </Text>
        </View>

        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>Lucro</Text>
          <Text style={[styles.overviewValue, { color: '#4CAF50' }]}>
            R$ {mockData.overview.profit.toLocaleString('pt-BR')}
          </Text>
          <Text style={styles.overviewSubtext}>
            {mockData.overview.profitMargin}% margem
          </Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>📊 Gráfico de Performance</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Gráfico de linha - Receita vs Despesas</Text>
          <Text style={styles.chartSubtext}>Últimos 12 meses</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Salário Médio</Text>
          <Text style={styles.metricValue}>
            R$ {mockData.overview.averageSalary.toLocaleString('pt-BR')}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Horas Trabalhadas</Text>
          <Text style={styles.metricValue}>
            {mockData.overview.totalHours}h
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Média por Funcionário</Text>
          <Text style={styles.metricValue}>
            {mockData.overview.averageHoursPerEmployee}h
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFinancialTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Relatório Financeiro</Text>

      <View style={styles.financialSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Receita Anual</Text>
          <Text style={styles.summaryValue}>
            R$ {Object.values(mockData.financial.revenue).reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Despesas Anuais</Text>
          <Text style={styles.summaryValue}>
            R$ {Object.values(mockData.financial.expenses).reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Lucro Anual</Text>
          <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
            R$ {(Object.values(mockData.financial.revenue).reduce((a, b) => a + b, 0) - 
                 Object.values(mockData.financial.expenses).reduce((a, b) => a + b, 0)).toLocaleString('pt-BR')}
          </Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>📈 Evolução Mensal</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Gráfico de barras - Receita vs Despesas</Text>
          <Text style={styles.chartSubtext}>Últimos 12 meses</Text>
        </View>
      </View>

      <View style={styles.expensesCard}>
        <Text style={styles.expensesTitle}>Despesas por Categoria</Text>
        {Object.entries(mockData.financial.categories).map(([category, amount]) => (
          <View key={category} style={styles.expenseItem}>
            <Text style={styles.expenseCategory}>
              {category === 'salaries' && '💼 Salários'}
              {category === 'supplies' && '📦 Suprimentos'}
              {category === 'maintenance' && '🔧 Manutenção'}
              {category === 'utilities' && '⚡ Serviços'}
              {category === 'insurance' && '🛡️ Seguros'}
              {category === 'other' && '📋 Outros'}
            </Text>
            <Text style={styles.expenseAmount}>
              R$ {amount.toLocaleString('pt-BR')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderHRTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Relatório de RH</Text>

      <View style={styles.hrSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Funcionários</Text>
          <Text style={styles.summaryValue}>{mockData.hr.departments.domestic + mockData.hr.departments.maintenance + mockData.hr.departments.security + mockData.hr.departments.gardening + mockData.hr.departments.other}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Taxa de Rotatividade</Text>
          <Text style={styles.summaryValue}>{mockData.hr.turnover.rate}%</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Satisfação</Text>
          <Text style={styles.summaryValue}>{mockData.hr.satisfaction}/5</Text>
        </View>
      </View>

      <View style={styles.departmentsCard}>
        <Text style={styles.departmentsTitle}>Funcionários por Departamento</Text>
        {Object.entries(mockData.hr.departments).map(([dept, count]) => (
          <View key={dept} style={styles.departmentItem}>
            <Text style={styles.departmentName}>
              {dept === 'domestic' && '🏠 Doméstico'}
              {dept === 'maintenance' && '🔧 Manutenção'}
              {dept === 'security' && '🛡️ Segurança'}
              {dept === 'gardening' && '🌱 Jardim'}
              {dept === 'other' && '📦 Outros'}
            </Text>
            <Text style={styles.departmentCount}>{count}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>👥 Distribuição por Departamento</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Gráfico de pizza - Funcionários por área</Text>
          <Text style={styles.chartSubtext}>Distribuição atual</Text>
        </View>
      </View>

      <View style={styles.turnoverCard}>
        <Text style={styles.turnoverTitle}>Movimentação de Pessoal</Text>
        <View style={styles.turnoverStats}>
          <View style={styles.turnoverStat}>
            <Text style={styles.turnoverLabel}>Contratados</Text>
            <Text style={[styles.turnoverValue, { color: '#4CAF50' }]}>
              +{mockData.hr.turnover.hired}
            </Text>
          </View>
          <View style={styles.turnoverStat}>
            <Text style={styles.turnoverLabel}>Demitidos</Text>
            <Text style={[styles.turnoverValue, { color: '#F44336' }]}>
              -{mockData.hr.turnover.left}
            </Text>
          </View>
          <View style={styles.turnoverStat}>
            <Text style={styles.turnoverLabel}>Presença</Text>
            <Text style={styles.turnoverValue}>
              {mockData.hr.attendance}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTimeCardTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Relatório de Ponto</Text>

      <View style={styles.timecardSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total de Dias</Text>
          <Text style={styles.summaryValue}>{mockData.timecard.totalDays}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Presenças</Text>
          <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
            {mockData.timecard.presentDays}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Ausências</Text>
          <Text style={[styles.summaryValue, { color: '#F44336' }]}>
            {mockData.timecard.absentDays}
          </Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>⏰ Análise de Horários</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Gráfico de barras - Horas trabalhadas</Text>
          <Text style={styles.chartSubtext}>Por funcionário</Text>
        </View>
      </View>

      <View style={styles.timecardDetails}>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Estatísticas de Ponto</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Média de Horas/Dia</Text>
            <Text style={styles.detailValue}>{mockData.timecard.averageHours}h</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Horas Extras</Text>
            <Text style={styles.detailValue}>{mockData.timecard.overtime}h</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Atrasos</Text>
            <Text style={styles.detailValue}>{mockData.timecard.lateArrivals}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Saídas Antecipadas</Text>
            <Text style={styles.detailValue}>{mockData.timecard.earlyDepartures}</Text>
          </View>
        </View>
      </View>

      <View style={styles.attendanceCard}>
        <Text style={styles.attendanceTitle}>Taxa de Presença</Text>
        <View style={styles.attendanceBar}>
          <View style={[styles.attendanceFill, { width: `${(mockData.timecard.presentDays / mockData.timecard.totalDays) * 100}%` }]} />
        </View>
        <Text style={styles.attendanceText}>
          {((mockData.timecard.presentDays / mockData.timecard.totalDays) * 100).toFixed(1)}%
        </Text>
      </View>
    </View>
  );

  const renderExportTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Exportar Relatórios</Text>

      <View style={styles.exportCard}>
        <Text style={styles.exportTitle}>📄 Relatórios Disponíveis</Text>
        
        <View style={styles.reportList}>
          <View style={styles.reportItem}>
            <Text style={styles.reportName}>📊 Relatório Geral</Text>
            <Text style={styles.reportDescription}>
              Resumo completo com métricas principais
            </Text>
            <Pressable
              style={styles.exportButton}
              onPress={() => setShowExportModal(true)}
            >
              <Text style={styles.exportButtonText}>Exportar</Text>
            </Pressable>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.reportName}>💰 Relatório Financeiro</Text>
            <Text style={styles.reportDescription}>
              Receitas, despesas e análise de lucros
            </Text>
            <Pressable
              style={styles.exportButton}
              onPress={() => setShowExportModal(true)}
            >
              <Text style={styles.exportButtonText}>Exportar</Text>
            </Pressable>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.reportName}>👥 Relatório de RH</Text>
            <Text style={styles.reportDescription}>
              Funcionários, departamentos e rotatividade
            </Text>
            <Pressable
              style={styles.exportButton}
              onPress={() => setShowExportModal(true)}
            >
              <Text style={styles.exportButtonText}>Exportar</Text>
            </Pressable>
          </View>

          <View style={styles.reportItem}>
            <Text style={styles.reportName}>⏰ Relatório de Ponto</Text>
            <Text style={styles.reportDescription}>
              Presenças, horas trabalhadas e atrasos
            </Text>
            <Pressable
              style={styles.exportButton}
              onPress={() => setShowExportModal(true)}
            >
              <Text style={styles.exportButtonText}>Exportar</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.scheduleCard}>
        <Text style={styles.scheduleTitle}>📅 Relatórios Agendados</Text>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleName}>Relatório Semanal</Text>
          <Text style={styles.scheduleTime}>Toda segunda-feira às 9h</Text>
          <Text style={styles.scheduleStatus}>✅ Ativo</Text>
        </View>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleName}>Relatório Mensal</Text>
          <Text style={styles.scheduleTime}>Primeiro dia do mês às 8h</Text>
          <Text style={styles.scheduleStatus}>✅ Ativo</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Relatórios</Text>
        <View style={styles.headerActions}>
          {loading && <ActivityIndicator size="small" color="#007AFF" />}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            📊 Geral
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'financial' && styles.activeTab]}
          onPress={() => setActiveTab('financial')}
        >
          <Text style={[styles.tabText, activeTab === 'financial' && styles.activeTabText]}>
            💰 Financeiro
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'hr' && styles.activeTab]}
          onPress={() => setActiveTab('hr')}
        >
          <Text style={[styles.tabText, activeTab === 'hr' && styles.activeTabText]}>
            👥 RH
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'timecard' && styles.activeTab]}
          onPress={() => setActiveTab('timecard')}
        >
          <Text style={[styles.tabText, activeTab === 'timecard' && styles.activeTabText]}>
            ⏰ Ponto
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'export' && styles.activeTab]}
          onPress={() => setActiveTab('export')}
        >
          <Text style={[styles.tabText, activeTab === 'export' && styles.activeTabText]}>
            📄 Exportar
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'financial' && renderFinancialTab()}
        {activeTab === 'hr' && renderHRTab()}
        {activeTab === 'timecard' && renderTimeCardTab()}
        {activeTab === 'export' && renderExportTab()}
      </ScrollView>

      {/* Modal de Exportação */}
      <Modal
        visible={showExportModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Exportar Relatório</Text>

            <Text style={styles.inputLabel}>Formato</Text>
            <View style={styles.formatSelector}>
              {(['pdf', 'excel', 'csv'] as const).map((format) => (
                <Pressable
                  key={format}
                  style={[
                    styles.formatOption,
                    exportFormat === format && styles.formatOptionSelected
                  ]}
                  onPress={() => setExportFormat(format)}
                >
                  <Text style={[
                    styles.formatOptionText,
                    exportFormat === format && styles.formatOptionTextSelected
                  ]}>
                    {format.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.inputLabel}>Período</Text>
            <View style={styles.periodSelector}>
              {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
                <Pressable
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonSelected
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[
                    styles.periodButtonText,
                    selectedPeriod === period && styles.periodButtonTextSelected
                  ]}>
                    {period === 'week' && 'Semana'}
                    {period === 'month' && 'Mês'}
                    {period === 'quarter' && 'Trimestre'}
                    {period === 'year' && 'Ano'}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowExportModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleExportReport}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? 'Exportando...' : 'Exportar'}
                </Text>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  periodSelector: {
    marginBottom: 20,
  },
  periodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  periodButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  periodButtonTextSelected: {
    color: '#fff',
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  overviewCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  overviewSubtext: {
    fontSize: 12,
    color: '#999',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  chartPlaceholder: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
  },
  chartText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  chartSubtext: {
    fontSize: 12,
    color: '#999',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  financialSummary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expensesCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expensesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  expenseCategory: {
    fontSize: 14,
    color: '#333',
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  hrSummary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  departmentsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  departmentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  departmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  departmentName: {
    fontSize: 14,
    color: '#333',
  },
  departmentCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  turnoverCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  turnoverTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  turnoverStats: {
    flexDirection: 'row',
    gap: 16,
  },
  turnoverStat: {
    flex: 1,
    alignItems: 'center',
  },
  turnoverLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  turnoverValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timecardSummary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  timecardDetails: {
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  attendanceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  attendanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  attendanceBar: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 8,
    overflow: 'hidden',
  },
  attendanceFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  attendanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  exportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  reportList: {
    gap: 12,
  },
  reportItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  exportButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  scheduleItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  scheduleTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  scheduleStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
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
  formatSelector: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  formatOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  formatOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  formatOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  formatOptionTextSelected: {
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