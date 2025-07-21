/**
 * @fileoverview Tela de Login do DOM v2
 * @directory frontend/src/screens
 * @description Tela de login básica e funcional
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { LOGIN_MESSAGES, GENERAL_MESSAGES } from '../utils/messages';

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
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCpfTooltip, setShowCpfTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const handleLogin = async () => {
    if (!cpf || !password) {
      Alert.alert(GENERAL_MESSAGES.ERROR, LOGIN_MESSAGES.ERROR_EMPTY_FIELDS);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
      } else {
        Alert.alert(GENERAL_MESSAGES.ERROR, data.error || LOGIN_MESSAGES.ERROR_LOGIN);
      }
    } catch (error) {
      Alert.alert(GENERAL_MESSAGES.ERROR, LOGIN_MESSAGES.ERROR_CONNECTION);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>DOM v2</Text>
        <Text style={styles.subtitle}>Sistema de Gestão Doméstica</Text>

        <View style={styles.form}>
          <Tooltip 
            visible={showCpfTooltip} 
            text={LOGIN_MESSAGES.TOOLTIP_CPF}
          >
            <TextInput
              style={styles.input}
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              editable={!loading}
              onFocus={() => setShowCpfTooltip(true)}
              onBlur={() => setShowCpfTooltip(false)}
            />
          </Tooltip>

          <Tooltip 
            visible={showPasswordTooltip} 
            text={LOGIN_MESSAGES.TOOLTIP_PASSWORD}
          >
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              onFocus={() => setShowPasswordTooltip(true)}
              onBlur={() => setShowPasswordTooltip(false)}
            />
          </Tooltip>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.credentials}>
          CPF: 59876913700 | Senha: 123456
        </Text>

        <Text style={styles.footer}>
          Versão 2.0.0 - Regras rigorosas aplicadas
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  credentials: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
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
    zIndex: 1000,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
