import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'admin' | 'employer' | 'employee' | 'family' | 'guest';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (cpf: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (cpf: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ INTEGRAÇÃO REAL COM POSTGRESQL
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
      });

      if (!response.ok) {
        let errorMessage = 'Erro no login';
        
        if (response.status === 429) {
          // Rate limiting - aguardar antes de permitir nova tentativa
          errorMessage = 'Muitas tentativas de login. Aguarde 30 segundos antes de tentar novamente.';
          // Limpar qualquer token anterior que possa estar causando conflito
          localStorage.removeItem('dom_token');
          localStorage.removeItem('dom_user');
        } else if (response.status === 401) {
          errorMessage = 'CPF ou senha incorretos.';
        } else if (response.status === 404) {
          errorMessage = 'Serviço de autenticação não disponível.';
        } else {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch {
            errorMessage = `Erro ${response.status}: ${response.statusText}`;
          }
        }
        
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }

      const data = await response.json();
      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        cpf: data.user.cpf,
        role: data.user.profile || data.user.role // Backend retorna 'profile', mas mantemos compatibilidade
      };
      
      setUser(userData);
      localStorage.setItem('dom_user', JSON.stringify(userData));
      localStorage.setItem('dom_token', data.token);
      
      return { success: true, message: 'Login realizado com sucesso!' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro de conexão. Verifique sua internet.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // ✅ LOGOUT REAL - INVALIDAR TOKEN NO BACKEND
      const token = localStorage.getItem('dom_token');
      if (token) {
        await fetch('http://localhost:3001/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('dom_user');
      localStorage.removeItem('dom_token');
    }
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/validate', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        cpf: data.user.cpf,
        role: data.user.profile || data.user.role // Backend retorna 'profile', mas mantemos compatibilidade
      };
      
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Erro na validação do token:', error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('dom_token');
        const savedUser = localStorage.getItem('dom_user');
        
        if (token && savedUser) {
          const isValid = await validateToken(token);
          if (!isValid) {
            // Token inválido, limpar dados
            localStorage.removeItem('dom_user');
            localStorage.removeItem('dom_token');
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        localStorage.removeItem('dom_user');
        localStorage.removeItem('dom_token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

