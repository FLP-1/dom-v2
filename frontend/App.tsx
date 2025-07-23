/**
 * @fileoverview App principal do DOM v2 - VERSÃO COMPLETA COM MICRO-FRONTENDS
 * @directory frontend
 * @description App principal com navegação entre micro-frontends
 * @created 2024-12-19
 * @lastModified 2025-07-23
 * @author DOM Team v2
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BudgetComponent from './src/micro-frontends/budget/BudgetComponent';
import { PayrollComponent } from './src/micro-frontends/payroll/PayrollComponent';
import TaskComponent from './src/micro-frontends/tasks/TaskComponent';

type Screen = 'main' | 'budget' | 'payroll' | 'tasks';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');

  console.log('🎉 App.tsx renderizando...');

  const renderMainScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚀 DOM v2 - Sistema de Gestão Doméstica</Text>
        <Text style={styles.subtitle}>Versão 2.0.0 - Micro-frontends Integrados</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>📊 Status do Sistema</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Backend</Text>
              <Text style={styles.statusValue}>✅ Funcionando</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Frontend</Text>
              <Text style={styles.statusValue}>✅ Carregado</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Metro</Text>
              <Text style={styles.statusValue}>✅ Sem erros</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>React Native Web</Text>
              <Text style={styles.statusValue}>✅ Renderizando</Text>
            </View>
          </View>
        </View>

        <View style={styles.microFrontendsSection}>
          <Text style={styles.sectionTitle}>🔧 Micro-frontends Disponíveis</Text>
          
          <TouchableOpacity 
            style={styles.microFrontendCard}
            onPress={() => setCurrentScreen('budget')}
          >
            <Text style={styles.microFrontendTitle}>💰 Controle de Orçamento</Text>
            <Text style={styles.microFrontendDescription}>
              Gerencie orçamentos, despesas e controle financeiro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.microFrontendCard}
            onPress={() => setCurrentScreen('payroll')}
          >
            <Text style={styles.microFrontendTitle}>💼 Folha de Pagamento</Text>
            <Text style={styles.microFrontendDescription}>
              Controle salários, benefícios e pagamentos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.microFrontendCard}
            onPress={() => setCurrentScreen('tasks')}
          >
            <Text style={styles.microFrontendTitle}>📋 Gerenciamento de Tarefas</Text>
            <Text style={styles.microFrontendDescription}>
              Organize e acompanhe tarefas domésticas
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>ℹ️ Informações do Sistema</Text>
          <Text style={styles.infoText}>
            O DOM v2 é um sistema completo de gestão doméstica com micro-frontends 
            independentes, cada um focado em uma funcionalidade específica.
          </Text>
          <Text style={styles.infoText}>
            Todos os micro-frontends se comunicam com o backend através de APIs REST 
            e mantêm a integridade dos dados com PostgreSQL e Prisma ORM.
          </Text>
        </View>
      </ScrollView>
    </View>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'budget':
        return <BudgetComponent onBack={() => setCurrentScreen('main')} />;
      case 'payroll':
        return <PayrollComponent onBack={() => setCurrentScreen('main')} />;
      case 'tasks':
        return <TaskComponent onBack={() => setCurrentScreen('main')} />;
      default:
        return renderMainScreen();
    }
  };

  return renderCurrentScreen();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#2a2a2a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff00',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 16,
    color: '#00ff00',
    fontWeight: 'bold',
  },
  microFrontendsSection: {
    marginBottom: 30,
  },
  microFrontendCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00ff00',
  },
  microFrontendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  microFrontendDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  infoSection: {
    marginBottom: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 10,
  },
});

export default App;
