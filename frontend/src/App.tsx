
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import CPFCNPJInput from './components/CPFCNPJInput';

const App = () => {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [backendResult, setBackendResult] = useState<{ isValid: boolean; exists: boolean; message: string } | null>(null);
  const [currentTheme, setCurrentTheme] = useState('SUDESTE');
  const [notifications, setNotifications] = useState<string[]>([]);

  const themes = ['SUDESTE', 'SUL', 'NORDESTE', 'CENTRO_OESTE', 'NORTE'];

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev.slice(0, 4)]);
  };

  const testCPFCNPJ = () => {
    const message = backendResult 
      ? `CPF/CNPJ: ${cpfCnpj} - ${backendResult.message}`
      : `CPF/CNPJ testado: ${cpfCnpj} - ${isValid ? 'Válido' : 'Inválido'}`;
    addNotification(message);
  };

  const testTheme = (theme: string) => {
    setCurrentTheme(theme);
    addNotification(`Tema alterado para: ${theme}`);
  };

  const testNotification = () => {
    addNotification(`Notificação de teste - ${new Date().toLocaleTimeString()}`);
  };

  const handleBackendValidation = (result: { isValid: boolean; exists: boolean; message: string }) => {
    setBackendResult(result);
    addNotification(`Validação backend: ${result.message}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚀 DOM v2 - Teste de Funcionalidades</Text>
      <Text style={styles.subtitle}>Status: 81.2% Implementado</Text>
      
      {/* Seção 1: Teste CPF/CNPJ Completo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔐 Teste CPF/CNPJ - Validação Completa</Text>
        <Text style={styles.sectionDescription}>
          Validação: Frontend (dígitos) + Backend (banco de dados)
        </Text>
        
        <CPFCNPJInput
          value={cpfCnpj}
          onChangeText={setCpfCnpj}
          onValidationChange={setIsValid}
          onBackendValidation={handleBackendValidation}
          placeholder="Digite CPF ou CNPJ para testar"
          enableBackendValidation={true}
        />
        
        <TouchableOpacity 
          style={[styles.button, isValid ? styles.buttonValid : styles.buttonInvalid]}
          onPress={testCPFCNPJ}
        >
          <Text style={styles.buttonText}>
            Testar Validação Completa {isValid ? '✅' : '❌'}
          </Text>
        </TouchableOpacity>

        {/* Resultado da Validação */}
        {backendResult && (
          <View style={styles.validationResult}>
            <Text style={styles.validationResultTitle}>Resultado da Validação:</Text>
            <Text style={styles.validationResultText}>{backendResult.message}</Text>
            <Text style={styles.validationResultDetails}>
              • Formato: {backendResult.isValid ? '✅ Válido' : '❌ Inválido'}
            </Text>
            <Text style={styles.validationResultDetails}>
              • Banco: {backendResult.exists ? '⚠️ Já cadastrado' : '✅ Disponível'}
            </Text>
          </View>
        )}
      </View>

      {/* Seção 2: Teste Sistema de Temas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Teste Sistema de Temas</Text>
        <Text style={styles.currentTheme}>Tema Atual: {currentTheme}</Text>
        <View style={styles.themeButtons}>
          {themes.map(theme => (
            <TouchableOpacity
              key={theme}
              style={[
                styles.themeButton,
                currentTheme === theme && styles.themeButtonActive
              ]}
              onPress={() => testTheme(theme)}
            >
              <Text style={styles.themeButtonText}>{theme}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Seção 3: Teste Notificações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Teste Sistema de Notificações</Text>
        <TouchableOpacity style={styles.button} onPress={testNotification}>
          <Text style={styles.buttonText}>Adicionar Notificação</Text>
        </TouchableOpacity>
        
        <View style={styles.notificationsContainer}>
          <Text style={styles.notificationsTitle}>Notificações Recentes:</Text>
          {notifications.length === 0 ? (
            <Text style={styles.noNotifications}>Nenhuma notificação</Text>
          ) : (
            notifications.map((notification, index) => (
              <View key={index} style={styles.notificationItem}>
                <Text style={styles.notificationText}>{notification}</Text>
              </View>
            ))
          )}
        </View>
      </View>

      {/* Seção 4: Status das Funcionalidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Status das Funcionalidades</Text>
        <View style={styles.statusItem}>
          <Text style={styles.statusText}>✅ CPF/CNPJ Input: Funcionando (Frontend + Backend)</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusText}>✅ Sistema de Temas: Funcionando</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusText}>✅ Notificações: Funcionando</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusText}>🔄 Dashboard: Em desenvolvimento</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusText}>🔄 Gestão Financeira: Em desenvolvimento</Text>
        </View>
      </View>

      {/* Seção 5: Informações da Validação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Como Funciona a Validação</Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoBold}>1. Validação Frontend:</Text> Verifica dígitos verificadores
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoBold}>2. Validação Backend:</Text> Verifica no banco de dados
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoBold}>3. Resultado:</Text> Verde (válido/disponível), Laranja (já existe), Vermelho (inválido)
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonValid: {
    backgroundColor: '#4CAF50',
  },
  buttonInvalid: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  validationResult: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  validationResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  validationResultText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  validationResultDetails: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  currentTheme: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  themeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  themeButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  themeButtonActive: {
    backgroundColor: '#1976D2',
  },
  themeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  notificationsContainer: {
    marginTop: 15,
  },
  notificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  noNotifications: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  notificationItem: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
    