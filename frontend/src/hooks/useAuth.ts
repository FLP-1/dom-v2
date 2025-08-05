import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      const savedToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const savedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (savedToken && savedUser) {
        const userData = JSON.parse(savedUser);
        
        // Validar token com o backend
        try {
          const response = await apiService.get<User>('/auth/validate');
          if (response.success) {
            setUser(userData);
            setToken(savedToken);
            console.log('✅ Sessão restaurada com sucesso');
          } else {
            // Token inválido, limpar dados
            await logout();
          }
        } catch (err) {
          console.log('❌ Token inválido, fazendo logout');
          await logout();
        }
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

      const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, loginData);

      if (response.success) {
        const { user: userData, token: authToken } = response.data;
        
        // Salvar dados no estado
        setUser(userData);
        setToken(authToken);

        // Salvar no AsyncStorage se "lembrar de mim" estiver ativado
        if (loginData.rememberMe) {
          await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
          await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        }

        console.log('✅ Login realizado com sucesso:', userData.name);
        return true;
      } else {
        setError(response.message || 'Erro ao fazer login');
        return false;
      }
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

      // Chamar endpoint de logout no backend
      if (token) {
        try {
          await apiService.post(API_ENDPOINTS.AUTH.LOGOUT, {});
        } catch (err) {
          console.log('⚠️ Erro ao chamar logout no backend:', err);
        }
      }

      // Limpar dados locais
      setUser(null);
      setToken(null);
      setError(null);

      // Limpar AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);

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

      const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);

      if (response.success) {
        const { user: newUser, token: authToken } = response.data;
        
        // Salvar dados no estado
        setUser(newUser);
        setToken(authToken);

        // Salvar no AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));

        console.log('✅ Registro realizado com sucesso:', newUser.name);
        return true;
      } else {
        setError(response.message || 'Erro ao fazer registro');
        return false;
      }
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

      const response = await apiService.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH, {});
      
      if (response.success) {
        const newToken = response.data.token;
        setToken(newToken);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
        console.log('✅ Token renovado com sucesso');
        return true;
      }
      return false;
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