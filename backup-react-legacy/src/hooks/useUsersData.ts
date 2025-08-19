import { useState, useEffect, useMemo} from 'react';
import { apiService } from '../services/api.ts';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'admin' | 'employer' | 'employee' | 'family' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
  profile?: {
    phone?: string;
    address?: string;
    avatar?: string;
  };
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  byRole: Record<string, number>;
}

export const useUsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getUsers();
      
      const convertedUsers: User[] = response.data?.users?.map((user: unknown) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        role: user.role || 'guest',
        status: user.status || 'active',
        createdAt: user.created_at,
        lastLogin: user.last_login,
        profile: {
          phone: user.phone,
          address: user.address,
          avatar: user.avatar
        }
      })) || [];

      setUsers(convertedUsers);
      setPagination(prev => ({
        ...prev,
        total: response.data?.total || convertedUsers.length
      }));
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error('Erro no useUsersData:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      const response = await apiService.createUser(userData);
      const newUser: User = {
        id: response.data.id,
        ...userData,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      throw err;
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      const response = await apiService.updateUser(userId, userData);
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, ...userData } : user
      ));
      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      throw err;
    }
  };

  const deactivateUser = async (userId: string) => {
    try {
      await apiService.deactivateUser(userId);
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: 'inactive' } : user
      ));
    } catch (err) {
      console.error('Erro ao desativar usuário:', err);
      throw err;
    }
  };

  const resetUserPassword = async (userId: string) => {
    try {
      const response = await apiService.resetUserPassword(userId);
      return response.data;
    } catch (err) {
      console.error('Erro ao resetar senha:', err);
      throw err;
    }
  };

  const getUserStats = async () => {
    try {
      const response = await apiService.getUserStats();
      return response.data;
    } catch (err) {
      console.error('Erro ao obter estatísticas:', err);
      throw err;
    }
  };

  const filterUsers = useCallback((role: string, status: string, search: string) => {
    setFilters({ role, status, search });
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesStatus = filters.status === 'all' || user.status === filters.status;
      const matchesSearch = !filters.search || 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.cpf.includes(filters.search);
      
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, filters]);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter(u => u.status === 'active').length;
    const inactive = users.filter(u => u.status === 'inactive').length;
    const pending = users.filter(u => u.status === 'pending').length;
    
    const byRole = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, { /* TODO: Implement error handling */ } as Record<string, number>);

    return { total, active, inactive, pending, byRole };
  }, [users]);

  const reload = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    users: filteredUsers,
    loading,
    error,
    stats,
    filters,
    pagination,
    reload,
    createUser,
    updateUser,
    deactivateUser,
    resetUserPassword,
    getUserStats,
    filterUsers
  };
};
