/**
 * Tela de eSocial Doméstico
 * @description Interface completa para gestão de compliance eSocial
 */

import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { useESocialData } from '../hooks/useESocialData.ts';

const ESocialScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'certificates' | 'config' | 'events' | 'reports'>('certificates');
  // const [showCertificateModal] = useState(false);
  // const [showConfigModal] = useState(false);

  const {
    certificates,
    config,
    events,
    complianceReport,
    loading,
    error,
    // createCertificate,
    // updateConfig,
    sendEvent,
    retryEvents,
    getStatusLabel,
    getStatusColor,
    formatDate
  } = useESocialData();
  
  // Garantir que arrays não sejam null antes de usar
  const safeCertificates = certificates || [];
  const safeEvents = events || [];

  // Handlers
  // const handleCreateCertificate = useCallback(async () => {
  //   try {
  //     await createCertificate();
  //     setShowCertificateModal(false);
  //     Alert.alert('Sucesso', 'Certificado criado com sucesso!');
  //   } catch (err) {
  //     Alert.alert('Erro', 'Erro ao criar certificado');
  //   }
  // }, [createCertificate]);

  // const handleUpdateConfig = useCallback(async () => {
  //   try {
  //     await updateConfig();
  //     setShowConfigModal(false);
  //     Alert.alert('Sucesso', 'Configuração atualizada com sucesso!');
  //   } catch (err) {
  //     Alert.alert('Erro', 'Erro ao atualizar configuração');
  //   }
  // }, [updateConfig]);

  const handleSendEvent = useCallback(async (eventId: string) => {
    Alert.alert(
      'Confirmar Envio',
      'Deseja enviar este evento para o eSocial?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar',
          onPress: async () => {
            try {
              await sendEvent(eventId);
              Alert.alert('Sucesso', 'Evento enviado com sucesso!');
            } catch (err) {
              Alert.alert('Erro', 'Erro ao enviar evento');
            }
          }
        }
      ]
    );
  }, [sendEvent]);

  const handleRetryEvents = useCallback(async () => {
    Alert.alert(
      'Confirmar Reprocessamento',
      'Deseja reprocessar todos os eventos com erro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reprocessar',
          onPress: async () => {
            try {
              await retryEvents();
              Alert.alert('Sucesso', 'Eventos reprocessados!');
            } catch (err) {
              Alert.alert('Erro', 'Erro ao reprocessar eventos');
            }
          }
        }
      ]
    );
  }, [retryEvents]);

  if (loading && !safeCertificates.length && !config) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando eSocial...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🏛️ eSocial Doméstico</Text>
        <Text style={styles.subtitle}>Sistema de Compliance Legal</Text>
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}
      </View>

      {/* Estatísticas de Compliance */}
      {complianceReport && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{complianceReport.totalEvents}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{complianceReport.acceptedEvents}</Text>
            <Text style={styles.statLabel}>Aceitos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{complianceReport.errorEvents}</Text>
            <Text style={styles.statLabel}>Erros</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{complianceReport.complianceRate}%</Text>
            <Text style={styles.statLabel}>Compliance</Text>
          </View>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'certificates' && styles.activeTab]}
          onPress={() => setSelectedTab('certificates')}
        >
          <Text style={[styles.tabText, selectedTab === 'certificates' && styles.activeTabText]}>
            Certificados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'config' && styles.activeTab]}
          onPress={() => setSelectedTab('config')}
        >
          <Text style={[styles.tabText, selectedTab === 'config' && styles.activeTabText]}>
            Configuração
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'events' && styles.activeTab]}
          onPress={() => setSelectedTab('events')}
        >
          <Text style={[styles.tabText, selectedTab === 'events' && styles.activeTabText]}>
            Eventos
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
        {/* Tab: Certificados */}
        {selectedTab === 'certificates' && (
          <View style={styles.tabContent}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => setShowCertificateModal(true)}
            >
              <Text style={styles.createButtonText}>+ Novo Certificado</Text>
            </TouchableOpacity>

            <View style={styles.certificatesContainer}>
              {safeCertificates.map((cert) => (
                <View key={cert.id} style={styles.certificateCard}>
                  <View style={styles.certificateHeader}>
                    <Text style={styles.certificateTitle}>
                      {cert.certificate_type}
                    </Text>
                    <View style={styles.statusContainer}>
                      <View 
                        style={[
                          styles.statusBadge, 
                          { backgroundColor: getStatusColor(cert.validation_status) }
                        ]}
                      />
                      <Text style={styles.statusText}>
                        {getStatusLabel(cert.validation_status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.certificateDetails}>
                    <Text style={styles.certificateDetail}>
                      Válido até: {formatDate(cert.valid_until)}
                    </Text>
                    <Text style={styles.certificateDetail}>
                      Ativo: {cert.is_active ? 'Sim' : 'Não'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {safeCertificates.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  🔐 Nenhum certificado encontrado
                </Text>
                <Text style={styles.emptySubtext}>
                  Adicione um certificado digital para começar
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Tab: Configuração */}
        {selectedTab === 'config' && (
          <View style={styles.tabContent}>
            {config ? (
              <View style={styles.configSection}>
                <Text style={styles.configTitle}>🏢 Dados do Empregador</Text>
                <Text style={styles.configValue}>
                  {config.employer_name}
                </Text>
                <Text style={styles.configValue}>
                  {config.employer_type === 'individual' ? 'CPF' : 'CNPJ'}: {
                    config.employer_type === 'individual' 
                      ? config.employer_cpf 
                      : config.employer_cnpj
                  }
                </Text>
                <Text style={styles.configValue}>
                  {config.employer_address}
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  ⚙️ Configuração não encontrada
                </Text>
                <Text style={styles.emptySubtext}>
                  Configure os dados do empregador
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.createButton}
              onPress={() => setShowConfigModal(true)}
            >
              <Text style={styles.createButtonText}>
                {config ? 'Editar Configuração' : 'Configurar Empregador'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tab: Eventos */}
        {selectedTab === 'events' && (
          <View style={styles.tabContent}>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRetryEvents}
            >
              <Text style={styles.retryButtonText}>🔄 Reprocessar Erros</Text>
            </TouchableOpacity>

            <View style={styles.eventsContainer}>
              {safeEvents.map((event) => (
                <View key={event.id} style={styles.eventCard}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>
                      {event.event_type}
                    </Text>
                    <View style={styles.statusContainer}>
                      <View 
                        style={[
                          styles.statusBadge, 
                          { backgroundColor: getStatusColor(event.event_status) }
                        ]}
                      />
                      <Text style={styles.statusText}>
                        {getStatusLabel(event.event_status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDetail}>
                      Criado: {formatDate(event.created_at)}
                    </Text>
                    {event.protocol_number && (
                      <Text style={styles.eventDetail}>
                        Protocolo: {event.protocol_number}
                      </Text>
                    )}
                  </View>

                  {event.event_status === 'pending' && (
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={() => handleSendEvent(event.id)}
                    >
                      <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {safeEvents.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  📋 Nenhum evento encontrado
                </Text>
                <Text style={styles.emptySubtext}>
                  Os eventos aparecerão aqui automaticamente
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Tab: Relatórios */}
        {selectedTab === 'reports' && (
          <View style={styles.tabContent}>
            <View style={styles.reportSection}>
              <Text style={styles.reportTitle}>📊 Relatórios de Compliance</Text>
              
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>📈 Relatório Mensal</Text>
                <Text style={styles.reportDescription}>
                  Consolidado de eventos do mês
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>🏛️ Relatório para Receita</Text>
                <Text style={styles.reportDescription}>
                  Dados para órgãos oficiais
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>⚠️ Eventos com Erro</Text>
                <Text style={styles.reportDescription}>
                  Lista de eventos que falharam
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>✅ Certificado de Compliance</Text>
                <Text style={styles.reportDescription}>
                  Certificado de conformidade
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Estilos
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
  retryButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  certificatesContainer: {
    gap: 16,
  },
  certificateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  certificateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
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
  certificateDetails: {
    gap: 4,
  },
  certificateDetail: {
    fontSize: 14,
    color: '#6b7280',
  },
  eventsContainer: {
    gap: 16,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  eventDetails: {
    gap: 4,
    marginBottom: 12,
  },
  eventDetail: {
    fontSize: 14,
    color: '#6b7280',
  },
  sendButton: {
    backgroundColor: '#10b981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  configSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
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
};

export default ESocialScreen;
