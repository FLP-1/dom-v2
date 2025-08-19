import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTesteScreenData } from '../hooks/useTesteScreenData';

/**
 * 📱 TESTESCREEN SCREEN
 * 
 * Seguindo as diretrizes do Framework de Decisão Arquitetural:
 * - Separação de responsabilidades: UI apenas
 * - Hook customizado para lógica de estado
 * - Fallback robusto para dados offline
 * - UX otimista para atualizações
 */
const TesteScreen: React.FC = () => {
  const { 
    data, 
    loading, 
    error, 
    stats,
    reload 
  } = useTesteScreenData();
  
  // Garantir que data não seja null antes de usar
  const safeData = data || [];

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 TesteScreen</Text>
        <Text style={styles.subtitle}>
          {error ? error : 'Gerencie seus dados de forma eficiente'}
        </Text>
        {error && (
          <TouchableOpacity style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>🔄 Tentar Novamente</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {safeData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Nenhum dado encontrado</Text>
            <Text style={styles.emptyDescription}>
              Não há informações para exibir no momento.
            </Text>
          </View>
        ) : (
          safeData.map((item, index) => (
            <View key={item.id || index} style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.title || item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))
        )}
      </View>
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

  // Content
  content: {
    padding: 20,
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
    maxWidth: 200,
  },

  // Item Cards
  itemCard: {
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
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});

export default TesteScreen;
