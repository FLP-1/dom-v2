import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

/**
 * ⏰ PONTO ELETRÔNICO SCREEN
 * 
 * Seguindo as diretrizes do Framework de Decisão Arquitetural:
 * - Aproveitamento de implementação existente
 * - Backend já funcional com endpoints completos
 * - Integração simples no menu principal
 */
const TimeClockScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizar horário a cada segundo
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClockIn = () => {
    // TODO: Implementar registro de entrada usando API existente
    alert('Entrada registrada! (Funcionalidade será conectada ao backend)');
  };

  const handleClockOut = () => {
    // TODO: Implementar registro de saída usando API existente
    alert('Saída registrada! (Funcionalidade será conectada ao backend)');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>⏰ Ponto Eletrônico</Text>
        <Text style={styles.subtitle}>Sistema de controle de ponto DOM v2</Text>
      </View>

      {/* Relógio Digital */}
      <View style={styles.clockContainer}>
        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.clockInButton]} onPress={handleClockIn}>
          <Text style={styles.actionButtonText}>🟢 Registrar Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.clockOutButton]} onPress={handleClockOut}>
          <Text style={styles.actionButtonText}>🔴 Registrar Saída</Text>
        </TouchableOpacity>
      </View>

      {/* Status Atual */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>📊 Status Atual</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Status:</Text>
            <Text style={styles.statusValue}>Fora do expediente</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Último registro:</Text>
            <Text style={styles.statusValue}>Não há registros hoje</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Horas trabalhadas hoje:</Text>
            <Text style={styles.statusValue}>00:00:00</Text>
          </View>
        </View>
      </View>

      {/* Informações */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ℹ️ Informações</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • O sistema já possui backend completo com endpoints funcionais
          </Text>
          <Text style={styles.infoText}>
            • Registros são armazenados no PostgreSQL via Prisma
          </Text>
          <Text style={styles.infoText}>
            • Suporte a filtros por usuário e período
          </Text>
          <Text style={styles.infoText}>
            • Integração com sistema de funcionários
          </Text>
        </View>
      </View>

      {/* Registros Recentes (Placeholder) */}
      <View style={styles.recentContainer}>
        <Text style={styles.recentTitle}>📋 Registros Recentes</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⏰</Text>
          <Text style={styles.emptyTitle}>Nenhum registro encontrado</Text>
          <Text style={styles.emptyDescription}>
            Os registros de ponto aparecerão aqui quando conectados ao backend
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  
  // Header
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
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
  },

  // Clock Display
  clockContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 16,
    alignItems: 'center',
  },
  timeDisplay: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3b82f6',
    minWidth: 280,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3b82f6',
    fontFamily: 'monospace',
  },
  dateText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  // Actions
  actionsContainer: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clockInButton: {
    backgroundColor: '#10b981',
  },
  clockOutButton: {
    backgroundColor: '#ef4444',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Status
  statusContainer: {
    padding: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },

  // Info
  infoContainer: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 4,
    lineHeight: 20,
  },

  // Recent Records
  recentContainer: {
    padding: 20,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
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
});

export default TimeClockScreen;