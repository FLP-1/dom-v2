
/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Tela de Login Premium DOM v2
 */

import React, { useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';

interface LoginScreenProps {
  onLogin?: (cpf: string, password: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  console.log('LoginScreen component rendering...'); // Debug log
  
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const handleLogin = async () => {
    if (!cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      Alert.alert('Consentimento obrigatório', 'Você precisa aceitar os Termos e a Política de Privacidade.');
      return;
    }

    setIsLoading(true);
    try {
      // Simular login - qualquer CPF/senha funciona
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onLogin) {
        onLogin(cpf, password);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleaned;
  };

  const handleCPFChange = (text: string) => {
    const formatted = formatCPF(text);
    setCpf(formatted);
  };

  const handleQuickLogin = () => {
    setCpf('346.825.064-98');
    setPassword('teste123');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>DOM</Text>
              <Text style={styles.version}>v2</Text>
            </View>
            <Text style={styles.tagline}>Sistema de Gestão Doméstica e Empresarial</Text>
            <Text style={styles.subtitle}>Acesso Premium</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.description}>Faça login para acessar o sistema</Text>
            
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChangeText={handleCPFChange}
                  keyboardType="numeric"
                  maxLength={14}
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
              
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
                </Text>
              </TouchableOpacity>

              {/* Consentimentos LGPD */}
              <View style={styles.consentsContainer}>
                <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                  <Text style={styles.consentItem}>
                    {termsAccepted ? '☑' : '☐'} Aceito os Termos de Uso
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPrivacyAccepted(!privacyAccepted)}>
                  <Text style={styles.consentItem}>
                    {privacyAccepted ? '☑' : '☐'} Aceito a Política de Privacidade
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMarketingAccepted(!marketingAccepted)}>
                  <Text style={styles.consentItem}>
                    {marketingAccepted ? '☑' : '☐'} Aceito receber comunicações de marketing (opcional)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Login */}
            <View style={styles.quickLoginSection}>
              <Text style={styles.quickLoginTitle}>Teste Rápido</Text>
              <TouchableOpacity
                style={styles.quickLoginButton}
                onPress={handleQuickLogin}
              >
                <Text style={styles.quickLoginText}>Preencher dados de teste</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 DOM v2 - Todos os direitos reservados</Text>
            <Text style={styles.footerSubtext}>Sistema de Gestão Inteligente</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  logo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  version: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginLeft: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1e293b',
  },
  loginButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickLoginSection: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 24,
  },
  quickLoginTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
  },
  quickLoginButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  quickLoginText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  consentsContainer: {
    marginTop: 20,
  },
  consentItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#cbd5e1',
  },
});

export default LoginScreen;

