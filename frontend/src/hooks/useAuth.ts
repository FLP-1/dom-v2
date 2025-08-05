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

// Função para localStorage (compatível com web)
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

  // Verificar se há sessão salva ao inicializar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se há token salvo
      const savedToken = storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const savedUser = storage.getItem(STORAGE_KEYS.USER_DATA);

      if (savedToken && savedUser) {
        const userData = JSON.parse(savedUser);
        
        // Para simplificar, vamos apenas restaurar os dados sem validar com o backend
        setUser(userData);
        setToken(savedToken);
        console.log('✅ Sessão restaurada com sucesso');
      }
    } catch (err) {
      console.error('❌ Erro ao verificar status de autenticação:', err);
      setError('Erro ao verificar autenticação');
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔐 Tentando login...', { cpf: loginData.cpf });

      // Simular resposta do backend para teste
      const mockUser: User = {
        id: '1',
        name: 'Usuário Teste',
        email: 'usuario@teste.com',
        profile: 'EMPLOYER',
        cpf: loginData.cpf
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salvar dados no estado
      setUser(mockUser);
      setToken(mockToken);

      // Salvar no localStorage se "lembrar de mim" estiver ativado
      if (loginData.rememberMe) {
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
        storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
      }

      console.log('✅ Login realizado com sucesso:', mockUser.name);
      return true;
    } catch (err) {
      console.error('❌ Erro no login:', err);
      setError('Erro de conexão. Verifique sua internet.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Fazendo logout...');

      // Limpar dados locais
      setUser(null);
      setToken(null);
      setError(null);

      // Limpar localStorage
      storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      storage.removeItem(STORAGE_KEYS.USER_DATA);

      console.log('✅ Logout realizado com sucesso');
    } catch (err) {
      console.error('❌ Erro no logout:', err);
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

      console.log('📝 Tentando registro...', { name: userData.name });

      // Simular resposta do backend para teste
      const mockUser: User = {
        id: '2',
        name: userData.name,
        email: userData.email,
        profile: userData.profile,
        cpf: userData.cpf
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salvar dados no estado
      setUser(mockUser);
      setToken(mockToken);

      // Salvar no localStorage
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

      console.log('✅ Registro realizado com sucesso:', mockUser.name);
      return true;
    } catch (err) {
      console.error('❌ Erro no registro:', err);
      setError('Erro de conexão. Verifique sua internet.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!token) return false;

      // Simular renovação de token
      const newToken = 'mock-jwt-token-' + Date.now();
      setToken(newToken);
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
      console.log('✅ Token renovado com sucesso');
      return true;
    } catch (err) {
      console.error('❌ Erro ao renovar token:', err);
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