import React, { useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  avatar: string;
  profile: string;
  familyRole: string;
  bio: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'pt-BR' | 'en-US' | 'es-ES';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      whatsapp: boolean;
    };
    privacy: {
      profileVisible: boolean;
      activityVisible: boolean;
      financialVisible: boolean;
    };
  };
  stats: {
    tasksCompleted: number;
    daysActive: number;
    achievements: number;
    level: number;
    points: number;
  };
  createdAt: string;
  lastLogin: string;
}

const ProfileScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'profile' | 'preferences' | 'security' | 'activity'>('profile');
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    familyRole: ''
  });

  // Dados mockados do perfil
  const userProfile: UserProfile = {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    cpf: '123.456.789-00',
    phone: '+55 11 99999-9999',
    avatar: '👩',
    profile: 'admin',
    familyRole: 'Mãe',
    bio: 'Administradora da casa, sempre buscando organizar e melhorar a vida da família.',
    preferences: {
      theme: 'light',
      language: 'pt-BR',
      notifications: {
        email: true,
        sms: false,
        push: true,
        whatsapp: true
      },
      privacy: {
        profileVisible: true,
        activityVisible: true,
        financialVisible: false
      }
    },
    stats: {
      tasksCompleted: 156,
      daysActive: 45,
      achievements: 15,
      level: 8,
      points: 2840
    },
    createdAt: '2025-01-15T10:00:00Z',
    lastLogin: '2025-01-27T10:30:00Z'
  };

  const handleEditProfile = () => {
    setProfileData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      bio: userProfile.bio,
      familyRole: userProfile.familyRole
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando perfil:', profileData);
    setShowEditModal(false);
    alert('Perfil atualizado com sucesso!');
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

  const getThemeText = (theme: string) => {
    switch (theme) {
      case 'light': return 'Claro';
      case 'dark': return 'Escuro';
      case 'auto': return 'Automático';
      default: return theme;
    }
  };

  const getLanguageText = (language: string) => {
    switch (language) {
      case 'pt-BR': return 'Português (Brasil)';
      case 'en-US': return 'English (US)';
      case 'es-ES': return 'Español (España)';
      default: return language;
    }
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
          👤 Meu Perfil
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Gerencie suas informações pessoais e configurações
        </p>
      </div>

      {/* Perfil Principal */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '64px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #6366f1'
          }}>
            {userProfile.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0
              }}>
                {userProfile.name}
              </h2>
              <span style={{
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: '#6366f115',
                color: '#6366f1'
              }}>
                {getProfileText(userProfile.profile)}
              </span>
              <span style={{
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: '#f59e0b15',
                color: '#f59e0b'
              }}>
                {userProfile.familyRole}
              </span>
            </div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: '0 0 8px 0'
            }}>
              {userProfile.email}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Membro desde {new Date(userProfile.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <button
            onClick={handleEditProfile}
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
            ✏️ Editar Perfil
          </button>
        </div>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.6',
          margin: '0 0 24px 0'
        }}>
          {userProfile.bio}
        </p>

        {/* Estatísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              {userProfile.stats.tasksCompleted}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Tarefas Concluídas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              {userProfile.stats.daysActive}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Dias Ativo</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              {userProfile.stats.achievements}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Conquistas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              Nível {userProfile.stats.level}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{userProfile.stats.points} pontos</div>
          </div>
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
          onClick={() => setSelectedTab('profile')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'profile' ? '#6366f1' : 'transparent',
            color: selectedTab === 'profile' ? '#ffffff' : '#6b7280'
          }}
        >
          👤 Perfil
        </button>
        <button
          onClick={() => setSelectedTab('preferences')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'preferences' ? '#6366f1' : 'transparent',
            color: selectedTab === 'preferences' ? '#ffffff' : '#6b7280'
          }}
        >
          ⚙️ Preferências
        </button>
        <button
          onClick={() => setSelectedTab('security')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'security' ? '#6366f1' : 'transparent',
            color: selectedTab === 'security' ? '#ffffff' : '#6b7280'
          }}
        >
          🔐 Segurança
        </button>
        <button
          onClick={() => setSelectedTab('activity')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'activity' ? '#6366f1' : 'transparent',
            color: selectedTab === 'activity' ? '#ffffff' : '#6b7280'
          }}
        >
          📊 Atividade
        </button>
      </div>

      {/* Tab: Perfil */}
      {selectedTab === 'profile' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Informações Pessoais
          </h2>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {userProfile.name}
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
                    E-mail
                  </label>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {userProfile.email}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {userProfile.cpf}
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
                    Telefone
                  </label>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {userProfile.phone}
                  </div>
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
                  Papel na Família
                </label>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  {userProfile.familyRole}
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
                  Biografia
                </label>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.5'
                }}>
                  {userProfile.bio}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Preferências */}
      {selectedTab === 'preferences' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Configurações e Preferências
          </h2>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'grid', gap: '24px' }}>
              {/* Aparência */}
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 16px 0'
                }}>
                  🎨 Aparência
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#374151' }}>Tema</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {getThemeText(userProfile.preferences.theme)}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#374151' }}>Idioma</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {getLanguageText(userProfile.preferences.language)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notificações */}
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 16px 0'
                }}>
                  🔔 Notificações
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {Object.entries(userProfile.preferences.notifications).map(([key, value]) => (
                    <div key={key} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '14px', color: '#374151' }}>
                        {key === 'email' ? 'E-mail' : 
                         key === 'sms' ? 'SMS' : 
                         key === 'push' ? 'Push' : 
                         key === 'whatsapp' ? 'WhatsApp' : key}
                      </span>
                      <div style={{
                        width: '40px',
                        height: '20px',
                        backgroundColor: value ? '#10b981' : '#d1d5db',
                        borderRadius: '10px',
                        position: 'relative',
                        cursor: 'pointer'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#ffffff',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '2px',
                          left: value ? '22px' : '2px',
                          transition: 'left 0.2s'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacidade */}
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 16px 0'
                }}>
                  🔒 Privacidade
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {Object.entries(userProfile.preferences.privacy).map(([key, value]) => (
                    <div key={key} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '14px', color: '#374151' }}>
                        {key === 'profileVisible' ? 'Perfil Visível' : 
                         key === 'activityVisible' ? 'Atividade Visível' : 
                         key === 'financialVisible' ? 'Dados Financeiros Visíveis' : key}
                      </span>
                      <div style={{
                        width: '40px',
                        height: '20px',
                        backgroundColor: value ? '#10b981' : '#d1d5db',
                        borderRadius: '10px',
                        position: 'relative',
                        cursor: 'pointer'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#ffffff',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '2px',
                          left: value ? '22px' : '2px',
                          transition: 'left 0.2s'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Segurança */}
      {selectedTab === 'security' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Segurança da Conta
          </h2>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    🔑 Alterar Senha
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Atualize sua senha para manter a conta segura
                  </p>
                </div>
                <button style={{
                  backgroundColor: '#6366f1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Alterar
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    🔐 Autenticação de Dois Fatores
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Configurar
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    📱 Dispositivos Conectados
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Gerencie sessões ativas
                  </p>
                </div>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Ver Sessões
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
                border: '1px solid #fecaca'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#dc2626',
                    margin: '0 0 4px 0'
                  }}>
                    🗑️ Excluir Conta
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#ef4444',
                    margin: 0
                  }}>
                    Esta ação não pode ser desfeita
                  </p>
                </div>
                <button style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Atividade */}
      {selectedTab === 'activity' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Histórico de Atividade
          </h2>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '20px' }}>🔐</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Login realizado
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {new Date(userProfile.lastLogin).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '20px' }}>✅</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Tarefa concluída: "Organizar documentos"
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {new Date(Date.now() - 3600000).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '20px' }}>💰</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Nova despesa registrada: R$ 150,00
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {new Date(Date.now() - 7200000).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '20px' }}>🏆</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Conquista desbloqueada: "Organizador Financeiro"
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {new Date(Date.now() - 86400000).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {showEditModal && (
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
              ✏️ Editar Perfil
            </h3>

            <form onSubmit={handleSaveProfile} style={{ display: 'grid', gap: '16px' }}>
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
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
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
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
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
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
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
                    Papel na Família
                  </label>
                  <input
                    type="text"
                    value={profileData.familyRole}
                    onChange={(e) => setProfileData({ ...profileData, familyRole: e.target.value })}
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
                  Biografia
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
