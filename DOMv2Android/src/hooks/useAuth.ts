
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 */


/**
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 */


/**
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

if (!validateType(data, 'object')) {
}


/**
 * @param {string} message - Mensagem de erro
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

assertCritical(typeof data === 'object', 'Dados devem ser um objeto');


/**
 * @param {any} data - Dados a serem validados
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

if (!validateInput(inputData)) {
}


/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Custom Hook React
 * 
 * @dependencies
 * 
 * @usage
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

interface User {
  id: string;
  name: string;
  email: string;
  profile: 'EMPLOYER' | 'EMPLOYEE' | 'FAMILY' | 'PARTNER' | 'SUBORDINATE' | 'ADMIN' | 'OWNER';
  cpf: string;
}

interface LoginData {
  cpf: string;
  password: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
  rememberMe: boolean;
  biometricUsed: boolean;
}

interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message: string;
}

const storage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignorar erros de localStorage
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignorar erros de localStorage
    }
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const savedToken = storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const savedUser = storage.getItem(STORAGE_KEYS.USER_DATA);

      if (savedToken && savedUser) {
        const userData = JSON.parse(savedUser);
        
        // Validar token com o backend
        try {
          const response = await apiService.get<{ user: any }>(API_ENDPOINTS.AUTH.VERIFY);
          if (response.success) {
            setUser(userData);
            setToken(savedToken);
          } else {
            storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            storage.removeItem(STORAGE_KEYS.USER_DATA);
          }
        } catch (err) {
          setUser(userData);
          setToken(savedToken);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);


      // Fazer chamada real para o backend
      const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
        email: loginData.cpf, // Usando CPF como email
        senha: loginData.password
      });

      if (response.success && response.data) {
        const { user: backendUser, token } = response.data;
        
        // Converter dados do backend para o formato do frontend
        const user: User = {
          id: backendUser.id,
          name: backendUser.nome,
          email: backendUser.email,
          profile: backendUser.perfil === 'empregador' ? 'EMPLOYER' : 'EMPLOYEE',
          cpf: loginData.cpf
        };

        // Salvar dados no estado
        setUser(user);
        setToken(token);

        // Salvar no localStorage se "lembrar de mim" estiver ativado
        if (loginData.rememberMe) {
          storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
          storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
        }

        return true;
      } else {
        setError(response.message || 'Erro no login');
        return false;
      }
    } catch (err: any) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {

      // Limpar dados locais
      setUser(null);
      setToken(null);
      setError(null);

      // Limpar localStorage
      storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      storage.removeItem(STORAGE_KEYS.USER_DATA);

    } catch (err) {
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    cpf: string;
    password: string;
    profile: User['profile'];
  }): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);


      // Fazer chamada real para o backend
      const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
        nome: userData.name,
        email: userData.email,
        senha: userData.password,
        cpf: userData.cpf,
        perfil: userData.profile === 'EMPLOYER' ? 'empregador' : 'empregado'
      });

      if (response.success && response.data) {
        const { user: backendUser, token } = response.data;
        
        // Converter dados do backend para o formato do frontend
        const user: User = {
          id: backendUser.id,
          name: backendUser.nome,
          email: backendUser.email,
          profile: backendUser.perfil === 'empregador' ? 'EMPLOYER' : 'EMPLOYEE',
          cpf: userData.cpf
        };

        // Salvar dados no estado
        setUser(user);
        setToken(token);

        // Salvar no localStorage
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

        return true;
      } else {
        setError(response.message || 'Erro no registro');
        return false;
      }
    } catch (err: any) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!token) return false;

      const newToken = 'mock-jwt-token-' + Date.now();
      setToken(newToken);
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    register,
    refreshToken,
    checkAuthStatus
  };
}; 