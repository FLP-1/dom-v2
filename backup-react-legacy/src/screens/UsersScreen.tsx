import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profile: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
  familyRole?: string;
  phone?: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'finance' | 'tasks' | 'family' | 'admin' | 'reports';
}

const UsersScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'users' | 'permissions' | 'roles'>('users');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '',
    profile: 'family',
    phone: '',
    familyRole: '',
    permissions: [] as string[]
  });

  // Dados mockados
  const users: User[] = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      cpf: '123.456.789-00',
      profile: 'admin',
      status: 'active',
      avatar: '👩',
      lastLogin: '2025-01-27T10:30:00Z',
      createdAt: '2025-01-15T10:00:00Z',
      permissions: ['finance:read', 'finance:write', 'tasks:read', 'tasks:write', 'family:read', 'admin:all'],
      familyRole: 'Mãe'
    },
    {
      id: '2',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      cpf: '987.654.321-00',
      profile: 'family',
      status: 'active',
      avatar: '👨',
      lastLogin: '2025-01-27T09:15:00Z',
      createdAt: '2025-01-16T14:30:00Z',
      permissions: ['tasks:read', 'tasks:write', 'family:read'],
      familyRole: 'Pai',
      phone: '+55 11 99999-9999'
    },
    {
      id: '3',
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      cpf: '456.789.123-00',
      profile: 'family',
      status: 'active',
      avatar: '👧',
      lastLogin: '2025-01-26T16:45:00Z',
      createdAt: '2025-01-17T09:15:00Z',
      permissions: ['tasks:read'],
      familyRole: 'Filha',
      phone: '+55 11 88888-8888'
    },
    {
      id: '4',
      name: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      cpf: '789.123.456-00',
      profile: 'employee',
      status: 'pending',
      avatar: '👨',
      createdAt: '2025-01-20T11:00:00Z',
      permissions: ['tasks:read'],
      familyRole: 'Funcionário'
    },
    {
      id: '5',
      name: 'Carla Ferreira',
      email: 'carla.ferreira@email.com',
      cpf: '321.654.987-00',
      profile: 'family',
      status: 'inactive',
      avatar: '👩',
      lastLogin: '2025-01-10T14:20:00Z',
      createdAt: '2025-01-05T08:30:00Z',
      permissions: ['family:read'],
      familyRole: 'Avó'
    }
  ];

  const permissions: Permission[] = [
    {
      id: 'finance:read',
      name: 'Visualizar Finanças',
      description: 'Pode visualizar relatórios e dados financeiros',
      category: 'finance'
    },
    {
      id: 'finance:write',
      name: 'Gerenciar Finanças',
      description: 'Pode criar, editar e excluir dados financeiros',
      category: 'finance'
    },
    {
      id: 'tasks:read',
      name: 'Visualizar Tarefas',
      description: 'Pode visualizar tarefas e atividades',
      category: 'tasks'
    },
    {
      id: 'tasks:write',
      name: 'Gerenciar Tarefas',
      description: 'Pode criar, editar e excluir tarefas',
      category: 'tasks'
    },
    {
      id: 'family:read',
      name: 'Visualizar Família',
      description: 'Pode visualizar informações da família',
      category: 'family'
    },
    {
      id: 'family:write',
      name: 'Gerenciar Família',
      description: 'Pode gerenciar membros da família',
      category: 'family'
    },
    {
      id: 'admin:all',
      name: 'Administrador',
      description: 'Acesso completo ao sistema',
      category: 'admin'
    },
    {
      id: 'reports:read',
      name: 'Visualizar Relatórios',
      description: 'Pode acessar relatórios do sistema',
      category: 'reports'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const getProfileText = (profile: string) => {
    switch (profile) {
      case 'admin': return 'Administrador';
      case 'family': return 'Família';
      case 'employee': return 'Funcionário';
      case 'partner': return 'Parceiro';
      default: return profile;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'finance': return '#f59e0b';
      case 'tasks': return '#10b981';
      case 'family': return '#3b82f6';
      case 'admin': return '#ef4444';
      case 'reports': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'finance': return 'Finanças';
      case 'tasks': return 'Tarefas';
      case 'family': return 'Família';
      case 'admin': return 'Administração';
      case 'reports': return 'Relatórios';
      default: return category;
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Criando usuário:', userData);
    setShowUserModal(false);
    setUserData({ name: '', email: '', cpf: '', profile: 'family', phone: '', familyRole: '', permissions: [] });
    alert('Usuário criado com sucesso!');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserData({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      profile: user.profile,
      phone: user.phone || '',
      familyRole: user.familyRole || '',
      permissions: user.permissions
    });
    setShowUserModal(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Atualizando usuário:', userData);
    setShowUserModal(false);
    setEditingUser(null);
    setUserData({ name: '', email: '', cpf: '', profile: 'family', phone: '', familyRole: '', permissions: [] });
    alert('Usuário atualizado com sucesso!');
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    adminUsers: users.filter(u => u.profile === 'admin').length
  };

  return (
    <div style={{ padding: '16px', maxWidth: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1e293b', 
          margin: '0 0 8px 0' 
        }}>
          👥 Gestão de Usuários
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Gerencie usuários, permissões e perfis de acesso
        </p>
      </div>

      {/* Estatísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.totalUsers}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Total de Usuários</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.activeUsers}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Usuários Ativos</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.pendingUsers}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Pendentes</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>👑</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.adminUsers}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Administradores</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <button
          onClick={() => setSelectedTab('users')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'users' ? '#6366f1' : 'transparent',
            color: selectedTab === 'users' ? '#ffffff' : '#6b7280'
          }}
        >
          👥 Usuários
        </button>
        <button
          onClick={() => setSelectedTab('permissions')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'permissions' ? '#6366f1' : 'transparent',
            color: selectedTab === 'permissions' ? '#ffffff' : '#6b7280'
          }}
        >
          🔐 Permissões
        </button>
        <button
          onClick={() => setSelectedTab('roles')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'roles' ? '#6366f1' : 'transparent',
            color: selectedTab === 'roles' ? '#ffffff' : '#6b7280'
          }}
        >
          🎭 Perfis
        </button>
      </div>

      {/* Tab: Usuários */}
      {selectedTab === 'users' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#1e293b', 
              margin: 0 
            }}>
              Lista de Usuários
            </h2>
            <button
              onClick={() => setShowUserModal(true)}
              style={{
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              ➕ Novo Usuário
            </button>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {user.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: 0
                      }}>
                        {user.name}
                      </h3>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: `${getStatusColor(user.status)}15`,
                        color: getStatusColor(user.status)
                      }}>
                        {getStatusText(user.status)}
                      </span>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: '#f3f4f6',
                        color: '#374151'
                      }}>
                        {getProfileText(user.profile)}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>
                      {user.email}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      CPF: {user.cpf} • {user.familyRole && `${user.familyRole} • `}Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '8px'
                    }}>
                      {user.lastLogin ? `Último login: ${new Date(user.lastLogin).toLocaleDateString('pt-BR')}` : 'Nunca logou'}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditUser(user)}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        style={{
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>

                {/* Permissões do usuário */}
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 8px 0'
                  }}>
                    Permissões:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {user.permissions.map((permission) => {
                      const perm = permissions.find(p => p.id === permission);
                      return perm ? (
                        <span
                          key={permission}
                          style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '600',
                            backgroundColor: `${getCategoryColor(perm.category)}15`,
                            color: getCategoryColor(perm.category)
                          }}
                        >
                          {perm.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Permissões */}
      {selectedTab === 'permissions' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            🔐 Permissões do Sistema
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {permissions.map((permission) => (
              <div
                key={permission.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: getCategoryColor(permission.category)
                    }} />
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0'
                      }}>
                        {permission.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: '0 0 8px 0'
                      }}>
                        {permission.description}
                      </p>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: `${getCategoryColor(permission.category)}15`,
                        color: getCategoryColor(permission.category)
                      }}>
                        {getCategoryText(permission.category)}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontFamily: 'monospace'
                  }}>
                    {permission.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Perfis */}
      {selectedTab === 'roles' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            🎭 Perfis de Acesso
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Administrador */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '32px' }}>👑</div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Administrador
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Acesso completo ao sistema
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {permissions.filter(p => p.category === 'admin' || p.category === 'finance' || p.category === 'reports').map(permission => (
                  <div key={permission.id} style={{
                    fontSize: '12px',
                    color: '#374151',
                    padding: '4px 8px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '4px'
                  }}>
                    ✓ {permission.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Família */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '32px' }}>👨‍👩‍👧‍👦</div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Família
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Acesso às funcionalidades familiares
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {permissions.filter(p => p.category === 'family' || p.category === 'tasks').map(permission => (
                  <div key={permission.id} style={{
                    fontSize: '12px',
                    color: '#374151',
                    padding: '4px 8px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '4px'
                  }}>
                    ✓ {permission.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Funcionário */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '32px' }}>👷</div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Funcionário
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Acesso limitado às tarefas
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {permissions.filter(p => p.category === 'tasks').map(permission => (
                  <div key={permission.id} style={{
                    fontSize: '12px',
                    color: '#374151',
                    padding: '4px 8px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '4px'
                  }}>
                    ✓ {permission.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Usuário */}
      {showUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 16px 0'
            }}>
              {editingUser ? '✏️ Editar Usuário' : '➕ Novo Usuário'}
            </h3>

            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    placeholder="Nome completo"
                    style={{
                      width: '100%',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                    style={{
                      width: '100%',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    CPF
                  </label>
                  <input
                    type="text"
                    value={userData.cpf}
                    onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    style={{
                      width: '100%',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    placeholder="+55 11 99999-9999"
                    style={{
                      width: '100%',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Perfil
                  </label>
                  <select
                    value={userData.profile}
                    onChange={(e) => setUserData({ ...userData, profile: e.target.value })}
                    style={{
                      width: '100%',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                    aria-label="Perfil do usuário"
                  >
                    <option value="family">Família</option>
                    <option value="admin">Administrador</option>
                    <option value="employee">Funcionário</option>
                    <option value="partner">Parceiro</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Papel na Família
                  </label>
                  <input
                    type="text"
                    value={userData.familyRole}
                    onChange={(e) => setUserData({ ...userData, familyRole: e.target.value })}
                    placeholder="Ex: Pai, Mãe, Filho"
                    style={{
                      width: '100%',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Permissões
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '8px',
                  maxHeight: '200px',
                  overflow: 'auto',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px'
                }}>
                  {permissions.map((permission) => (
                    <label key={permission.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={userData.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserData({
                              ...userData,
                              permissions: [...userData.permissions, permission.id]
                            });
                          } else {
                            setUserData({
                              ...userData,
                              permissions: userData.permissions.filter(p => p !== permission.id)
                            });
                          }
                        }}
                        style={{ margin: 0 }}
                      />
                      <span style={{ color: '#374151' }}>{permission.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                    setUserData({ name: '', email: '', cpf: '', profile: 'family', phone: '', familyRole: '', permissions: [] });
                  }}
                  style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {editingUser ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersScreen;
