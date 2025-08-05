








function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}

import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { getMessage } from '../utils/messages';

// Componente Tooltip simples
interface TooltipProps {
  visible: boolean;
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, text, children }) => {
  if (!visible) return <>{children}</>;
  
  return (
    <View style={styles.tooltipContainer}>
      {children}
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>{text}</Text>
      </View>
    </View>
  );
};

// Definição dos 7 perfis de usuário do DOM v2
type UserProfile = 
  | 'EMPLOYER'    // Empregadores (mulheres 35-50 anos)
  | 'EMPLOYEE'    // Empregados Domésticos (mulheres 30-60 anos)
  | 'FAMILY'      // Familiares (15-70 anos)
  | 'PARTNER'     // Parceiros (donos de negócios)
  | 'SUBORDINATE' // Subordinados (funcionários dos parceiros)
  | 'ADMIN'       // Administradores (suporte técnico)
  | 'OWNER';      // Donos (fundadores)

interface User {
  id: string;
  name: string;
  email: string;
  profile: UserProfile;
  cpf: string;
}

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { login, loading, error } = useAuth();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showCpfTooltip, setShowCpfTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Erro', 'Você deve aceitar os termos e políticas para continuar');
      return;
    }

    // Preparar dados de login
    const loginData = {
      cpf,
      password,
      termsAccepted: acceptedTerms,
      privacyAccepted: acceptedTerms,
      marketingAccepted: false,
      rememberMe,
      biometricUsed: false
    };

    // Tentar login usando o hook
    const success = await login(loginData);
    
    if (success) {
      // Login bem-sucedido, chamar callback
      onLogin({
        id: '1', // Será substituído pelos dados reais do backend
        name: 'Usuário',
        email: 'usuario@exemplo.com',
        profile: 'EMPLOYER',
        cpf: cpf
      });
    } else {
      // Erro já está sendo tratado pelo hook
      Alert.alert('Erro', error || 'Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DOM v2</Text>
        <Text style={styles.subtitle}>Sistema de Gestão Doméstica</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>CPF</Text>
        <Tooltip visible={showCpfTooltip} text="Digite seu CPF com 11 dígitos">
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            value={cpf}
            onChangeText={setCpf}
            inputMode="numeric"
            maxLength={14}
            onFocus={() => setShowCpfTooltip(true)}
            onBlur={() => setShowCpfTooltip(false)}
            editable={!loading}
          />
        </Tooltip>

        <Text style={styles.label}>Senha</Text>
        <Tooltip visible={showPasswordTooltip} text="Digite sua senha com pelo menos 6 caracteres">
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setShowPasswordTooltip(true)}
            onBlur={() => setShowPasswordTooltip(false)}
            editable={!loading}
          />
        </Tooltip>

        {/* Checkbox de Termos  */}
        <Pressable 
          style={styles.termsContainer}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          disabled={loading}
        >
          <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
            {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            Aceito os termos de uso e política de privacidade
          </Text>
        </Pressable>

        {/* Checkbox Lembrar de Mim */}
        <Pressable 
          style={styles.termsContainer}
          onPress={() => setRememberMe(!rememberMe)}
          disabled={loading}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            Lembrar de mim
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.credentials}>
          CPF: 12345678901 | Senha: 123456
        </Text>
        <Text style={styles.version}>Versão 2.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tooltipContainer: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
    zIndex: 10,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  credentials: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  version: {
    fontSize: 12,
    color: '#999',
  },
});


