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
import IntegrationService, { 
  TimeCardEntry, 
  TimeEntry, 
  ESocialEvent,
  ViaCEPResponse 
} from '../services/integrations';

interface AdvancedTimeCardScreenProps {
  onNavigateBack: () => void;
}

export const AdvancedTimeCardScreen: React.FC<AdvancedTimeCardScreenProps> = ({ onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'reports' | 'esocial'>('today');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showESocialModal, setShowESocialModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [address, setAddress] = useState<string>('');

  const integrationService = IntegrationService.getInstance();

  // Dados mockados
  const mockEmployees = [
    { id: '1', name: 'Maria Silva', position: 'Empregada Doméstica' },
    { id: '2', name: 'José Santos', position: 'Jardineiro' }
  ];

  const [timeCardEntries, setTimeCardEntries] = useState<TimeCardEntry[]>(
    integrationService.getMockTimeCardEntries()
  );

  const [esocialEvents, setEsocialEvents] = useState<ESocialEvent[]>(
    integrationService.getMockESocialEvents()
  );

  useEffect(() => {
    // Simular obtenção da localização atual
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Simular geolocalização
      setCurrentLocation({
        latitude: -23.5505,
        longitude: -46.6333
      });
      
      // Buscar endereço via ViaCEP (simulado)
      setAddress('Rua Harmonia, 123 - Vila Madalena, São Paulo/SP');
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  };

  const handleRegisterEntry = async (type: 'entry' | 'exit' | 'break_start' | 'break_end') => {
    if (!selectedEmployee) {
      Alert.alert('Erro', 'Selecione um funcionário');
      return;
    }

    setLoading(true);
    try {
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        type,
        timestamp: new Date().toISOString(),
        location: currentLocation ? {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          address: address
        } : undefined,
        method: 'mobile'
      };

      // Simular registro no backend
      const updatedEntry: TimeCardEntry = {
        id: Date.now().toString(),
        employeeId: selectedEmployee.id,
        employeeName: selectedEmployee.name,
        date: new Date().toISOString().split('T')[0],
        entries: [newEntry],
        totalHours: 0,
        overtime: 0,
        status: 'present'
      };

      setTimeCardEntries(prev => [...prev, updatedEntry]);
      setShowRegisterModal(false);
      Alert.alert('Sucesso', `${type === 'entry' ? 'Entrada' : type === 'exit' ? 'Saída' : 'Pausa'} registrada com sucesso!`);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao registrar entrada');
    } finally {
      setLoading(false);
    }
  };

  const handleSendESocial = async (entry: TimeCardEntry) => {
    setLoading(true);
    try {
      // Simular envio para eSocial
      const esocialEvent: ESocialEvent = {
        id: Date.now().toString(),
        type: 'S2230',
        employeeId: entry.employeeId,
        employeeName: entry.employeeName,
        eventDate: entry.date,
        status: 'sent',
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<eSocial xmlns="http://www.esocial.gov.br/schema/evt/evtExpRisco/v_S_01_00_00">
  <evtExpRisco Id="ID${Date.now()}">
    <ideEvento>
      <tpAmb>2</tpAmb>
      <procEmi>1</procEmi>
      <verProc>1.0.0</verProc>
    </ideEvento>
    <ideEmpregador>
      <tpInsc>1</tpInsc>
      <nrInsc>12345678901234</nrInsc>
    </ideEmpregador>
    <ideVinculo>
      <cpfTrab>${entry.employeeId}</cpfTrab>
      <nisTrab>12345678901</nisTrab>
    </ideVinculo>
    <infoExpRisco>
      <dtIniCondicao>${entry.date}</dtIniCondicao>
      <dtFimCondicao>${entry.date}</dtFimCondicao>
      <infoAmb>
        <codAmb>01</codAmb>
      </infoAmb>
    </infoExpRisco>
  </evtExpRisco>
</eSocial>`,
        protocol: `2024${Date.now()}`
      };

      setEsocialEvents(prev => [...prev, esocialEvent]);
      Alert.alert('Sucesso', 'Evento enviado para eSocial com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao enviar para eSocial');
    } finally {
      setLoading(false);
    }
  };

  const calculateHours = (entries: TimeEntry[]): { total: number; regular: number; overtime: number } => {
    if (entries.length < 2) return { total: 0, regular: 8, overtime: 0 };

    const entry = entries.find(e => e.type === 'entry');
    const exit = entries.find(e => e.type === 'exit');

    if (!entry || !exit) return { total: 0, regular: 8, overtime: 0 };

    const entryTime = new Date(entry.timestamp);
    const exitTime = new Date(exit.timestamp);
    const totalHours = (exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60);

    const regularHours = Math.min(totalHours, 8);
    const overtime = Math.max(0, totalHours - 8);

    return { total: totalHours, regular: regularHours, overtime };
  };

  const renderTodayTab = () => (
    <View>
      <View style={styles.locationCard}>
        <Text style={styles.locationTitle}>📍 Localização Atual</Text>
        <Text style={styles.locationText}>{address || 'Obtendo localização...'}</Text>
        {currentLocation && (
          <Text style={styles.coordinatesText}>
            Lat: {currentLocation.latitude.toFixed(6)}, Lng: {currentLocation.longitude.toFixed(6)}
          </Text>
        )}
      </View>

      <View style={styles.employeeSelector}>
        <Text style={styles.sectionTitle}>Selecionar Funcionário</Text>
        {mockEmployees.map((employee) => (
          <Pressable
            key={employee.id}
            style={[
              styles.employeeOption,
              selectedEmployee?.id === employee.id && styles.employeeOptionSelected
            ]}
            onPress={() => setSelectedEmployee(employee)}
          >
            <Text style={[
              styles.employeeOptionText,
              selectedEmployee?.id === employee.id && styles.employeeOptionTextSelected
            ]}>
              {employee.name} - {employee.position}
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedEmployee && (
        <View style={styles.registerCard}>
          <Text style={styles.sectionTitle}>Registrar Ponto - {selectedEmployee.name}</Text>
          <View style={styles.registerButtons}>
            <Pressable
              style={[styles.registerButton, styles.entryButton]}
              onPress={() => handleRegisterEntry('entry')}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>🟢 Entrada</Text>
            </Pressable>
            <Pressable
              style={[styles.registerButton, styles.breakButton]}
              onPress={() => handleRegisterEntry('break_start')}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>🟡 Início Pausa</Text>
            </Pressable>
            <Pressable
              style={[styles.registerButton, styles.breakButton]}
              onPress={() => handleRegisterEntry('break_end')}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>🟡 Fim Pausa</Text>
            </Pressable>
            <Pressable
              style={[styles.registerButton, styles.exitButton]}
              onPress={() => handleRegisterEntry('exit')}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>🔴 Saída</Text>
            </Pressable>
          </View>
        </View>
      )}

      <View style={styles.todayEntries}>
        <Text style={styles.sectionTitle}>Registros de Hoje</Text>
        {timeCardEntries
          .filter(entry => entry.date === new Date().toISOString().split('T')[0])
          .map((entry) => {
            const hours = calculateHours(entry.entries);
            return (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryEmployee}>{entry.employeeName}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(entry.status) }
                  ]}>
                    <Text style={styles.statusText}>
                      {getStatusLabel(entry.status)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.entryDetails}>
                  <Text style={styles.entryDate}>
                    {new Date(entry.date).toLocaleDateString('pt-BR')}
                  </Text>
                  <Text style={styles.entryHours}>
                    Total: {hours.total.toFixed(1)}h | Regular: {hours.regular.toFixed(1)}h | Extra: {hours.overtime.toFixed(1)}h
                  </Text>
                </View>

                <View style={styles.entryTimeline}>
                  {entry.entries.map((timeEntry) => (
                    <View key={timeEntry.id} style={styles.timelineItem}>
                      <View style={[
                        styles.timelineDot,
                        { backgroundColor: getEntryTypeColor(timeEntry.type) }
                      ]} />
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineTime}>
                          {new Date(timeEntry.timestamp).toLocaleTimeString('pt-BR')}
                        </Text>
                        <Text style={styles.timelineType}>
                          {getEntryTypeLabel(timeEntry.type)} - {getMethodLabel(timeEntry.method)}
                        </Text>
                        {timeEntry.location && (
                          <Text style={styles.timelineLocation}>
                            📍 {timeEntry.location.address}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.entryActions}>
                  <Pressable
                    style={styles.actionButton}
                    onPress={() => handleSendESocial(entry)}
                  >
                    <Text style={styles.actionButtonText}>📤 Enviar eSocial</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Histórico de Ponto</Text>
      {timeCardEntries.map((entry) => {
        const hours = calculateHours(entry.entries);
        return (
          <View key={entry.id} style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyEmployee}>{entry.employeeName}</Text>
              <Text style={styles.historyDate}>
                {new Date(entry.date).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            
            <View style={styles.historyStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={styles.statValue}>{hours.total.toFixed(1)}h</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Regular</Text>
                <Text style={styles.statValue}>{hours.regular.toFixed(1)}h</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Extra</Text>
                <Text style={styles.statValue}>{hours.overtime.toFixed(1)}h</Text>
              </View>
            </View>

            <View style={styles.historyStatus}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(entry.status) }
              ]}>
                <Text style={styles.statusText}>
                  {getStatusLabel(entry.status)}
                </Text>
              </View>
              {entry.eSocialEventId && (
                <Text style={styles.esocialStatus}>✅ eSocial Enviado</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderReportsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Relatórios</Text>
      
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>📊 Resumo Mensal</Text>
        <View style={styles.reportStats}>
          <View style={styles.reportStat}>
            <Text style={styles.reportStatLabel}>Total de Dias</Text>
            <Text style={styles.reportStatValue}>22</Text>
          </View>
          <View style={styles.reportStat}>
            <Text style={styles.reportStatLabel}>Dias Presentes</Text>
            <Text style={styles.reportStatValue}>20</Text>
          </View>
          <View style={styles.reportStat}>
            <Text style={styles.reportStatLabel}>Dias Ausentes</Text>
            <Text style={styles.reportStatValue}>2</Text>
          </View>
          <View style={styles.reportStat}>
            <Text style={styles.reportStatLabel}>Horas Totais</Text>
            <Text style={styles.reportStatValue}>160h</Text>
          </View>
          <View style={styles.reportStat}>
            <Text style={styles.reportStatLabel}>Horas Extras</Text>
            <Text style={styles.reportStatValue}>8h</Text>
          </View>
          <View style={styles.reportStat}>
            <Text style={styles.reportStatLabel}>Média Diária</Text>
            <Text style={styles.reportStatValue}>8h</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>📈 Gráfico de Frequência</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>📊 Gráfico de frequência mensal</Text>
          <Text style={styles.chartSubtext}>Visualização de presença e ausências</Text>
        </View>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>⏰ Análise de Horários</Text>
        <View style={styles.timeAnalysis}>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisLabel}>Horário Médio de Entrada</Text>
            <Text style={styles.analysisValue}>08:15</Text>
          </View>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisLabel}>Horário Médio de Saída</Text>
            <Text style={styles.analysisValue}>17:30</Text>
          </View>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisLabel}>Pausas Utilizadas</Text>
            <Text style={styles.analysisValue}>1h/dia</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderESocialTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Eventos eSocial</Text>
      
      {esocialEvents.map((event) => (
        <View key={event.id} style={styles.esocialCard}>
          <View style={styles.esocialHeader}>
            <Text style={styles.esocialType}>{event.type}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getESocialStatusColor(event.status) }
            ]}>
              <Text style={styles.statusText}>
                {getESocialStatusLabel(event.status)}
              </Text>
            </View>
          </View>
          
          <View style={styles.esocialDetails}>
            <Text style={styles.esocialEmployee}>{event.employeeName}</Text>
            <Text style={styles.esocialDate}>
              {new Date(event.eventDate).toLocaleDateString('pt-BR')}
            </Text>
            {event.protocol && (
              <Text style={styles.esocialProtocol}>
                Protocolo: {event.protocol}
              </Text>
            )}
          </View>

          <View style={styles.esocialActions}>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>📄 Ver XML</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>📥 Download</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );

  const getStatusColor = (status: string) => {
    const colors = {
      present: '#4CAF50',
      absent: '#F44336',
      late: '#FF9800',
      half_day: '#FFC107',
      vacation: '#2196F3',
      sick_leave: '#9C27B0'
    };
    return colors[status as keyof typeof colors] || '#666';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      present: 'Presente',
      absent: 'Ausente',
      late: 'Atrasado',
      half_day: 'Meio Período',
      vacation: 'Férias',
      sick_leave: 'Afastado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getEntryTypeColor = (type: string) => {
    const colors = {
      entry: '#4CAF50',
      exit: '#F44336',
      break_start: '#FF9800',
      break_end: '#FF9800'
    };
    return colors[type as keyof typeof colors] || '#666';
  };

  const getEntryTypeLabel = (type: string) => {
    const labels = {
      entry: 'Entrada',
      exit: 'Saída',
      break_start: 'Início Pausa',
      break_end: 'Fim Pausa'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getMethodLabel = (method: string) => {
    const labels = {
      manual: 'Manual',
      biometric: 'Biométrico',
      mobile: 'Mobile',
      web: 'Web'
    };
    return labels[method as keyof typeof labels] || method;
  };

  const getESocialStatusColor = (status: string) => {
    const colors = {
      pending: '#FF9800',
      sent: '#2196F3',
      accepted: '#4CAF50',
      rejected: '#F44336'
    };
    return colors[status as keyof typeof colors] || '#666';
  };

  const getESocialStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendente',
      sent: 'Enviado',
      accepted: 'Aceito',
      rejected: 'Rejeitado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Controle de Ponto Avançado</Text>
        <View style={styles.headerActions}>
          {loading && <ActivityIndicator size="small" color="#007AFF" />}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
            📱 Hoje
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            📅 Histórico
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'reports' && styles.activeTab]}
          onPress={() => setActiveTab('reports')}
        >
          <Text style={[styles.tabText, activeTab === 'reports' && styles.activeTabText]}>
            📊 Relatórios
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'esocial' && styles.activeTab]}
          onPress={() => setActiveTab('esocial')}
        >
          <Text style={[styles.tabText, activeTab === 'esocial' && styles.activeTabText]}>
            📤 eSocial
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'today' && renderTodayTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'reports' && renderReportsTab()}
        {activeTab === 'esocial' && renderESocialTab()}
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
  locationCard: {
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
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#999',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  employeeSelector: {
    marginBottom: 20,
  },
  employeeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
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
  registerCard: {
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
  registerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  registerButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  entryButton: {
    backgroundColor: '#4CAF50',
  },
  breakButton: {
    backgroundColor: '#FF9800',
  },
  exitButton: {
    backgroundColor: '#F44336',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  todayEntries: {
    marginBottom: 20,
  },
  entryCard: {
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
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryEmployee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  entryDetails: {
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  entryHours: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  entryTimeline: {
    marginBottom: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timelineType: {
    fontSize: 12,
    color: '#666',
  },
  timelineLocation: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  entryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  historyCard: {
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyEmployee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  historyStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  esocialStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  reportCard: {
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
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  reportStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  reportStat: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  reportStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  reportStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  timeAnalysis: {
    gap: 12,
  },
  analysisItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  analysisLabel: {
    fontSize: 14,
    color: '#666',
  },
  analysisValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  esocialCard: {
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
  esocialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  esocialType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  esocialDetails: {
    marginBottom: 12,
  },
  esocialEmployee: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  esocialDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  esocialProtocol: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  esocialActions: {
    flexDirection: 'row',
    gap: 8,
  },
}); 