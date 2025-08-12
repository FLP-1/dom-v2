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
  login: (cpf: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
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

  const login = async (cpf: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulação de login - substituir por chamada real de API
      if (cpf === '12345678901' && password === 'senha123') {
        const mockUser: User = {
          id: '1',
          name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          cpf: '12345678901',
          role: 'employer'
        };
        
        setUser(mockUser);
        localStorage.setItem('dom_user', JSON.stringify(mockUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dom_user');
  };

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('dom_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('dom_user');
      }
    }
    setLoading(false);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

