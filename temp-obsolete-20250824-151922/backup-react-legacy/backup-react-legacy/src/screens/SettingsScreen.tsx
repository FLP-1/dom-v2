import React, { useState } from 'react';

const SettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    darkMode: false,
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Aqui você pode implementar a lógica para salvar as configurações
    console.log('Configurações salvas:', settings);
    alert('Configurações salvas com sucesso!');
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: '⚙️' },
    { id: 'notifications', label: 'Notificações', icon: '🔔' },
    { id: 'appearance', label: 'Aparência', icon: '🎨' },
    { id: 'privacy', label: 'Privacidade', icon: '🔒' },
    { id: 'about', label: 'Sobre', icon: 'ℹ️' }
  ];

  const renderGeneralSettings = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1e293b', 
          margin: '0 0 16px 0' 
        }}>
          Configurações Regionais
        </h3>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Idioma
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                minHeight: '44px'
              }}
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Fuso Horário
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                minHeight: '44px'
              }}
            >
              <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
              <option value="America/Manaus">Manaus (UTC-4)</option>
              <option value="America/Belem">Belém (UTC-3)</option>
              <option value="America/Fortaleza">Fortaleza (UTC-3)</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Moeda
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                minHeight: '44px'
              }}
            >
              <option value="BRL">Real Brasileiro (R$)</option>
              <option value="USD">Dólar Americano ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1e293b', 
          margin: '0 0 16px 0' 
        }}>
          Formato de Data e Hora
        </h3>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Formato de Data
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                minHeight: '44px'
              }}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Formato de Hora
            </label>
            <select
              value={settings.timeFormat}
              onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                minHeight: '44px'
              }}
            >
              <option value="24h">24 horas</option>
              <option value="12h">12 horas (AM/PM)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        color: '#1e293b', 
        margin: '0 0 16px 0' 
      }}>
        Configurações de Notificações
      </h3>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Notificações Push
            </div>
            <div style={{
              fontSize: '14px',
              color: '#64748b'
            }}>
              Receber notificações no navegador
            </div>
          </div>
          <label style={{
            position: 'relative',
            display: 'inline-block',
            width: '50px',
            height: '24px'
          }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: settings.notifications ? '#6366f1' : '#d1d5db',
              borderRadius: '24px',
              transition: '0.3s'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '18px',
                width: '18px',
                left: '3px',
                bottom: '3px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                transition: '0.3s',
                transform: settings.notifications ? 'translateX(26px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Notificações por Email
            </div>
            <div style={{
              fontSize: '14px',
              color: '#64748b'
            }}>
              Receber notificações por email
            </div>
          </div>
          <label style={{
            position: 'relative',
            display: 'inline-block',
            width: '50px',
            height: '24px'
          }}>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: settings.emailNotifications ? '#6366f1' : '#d1d5db',
              borderRadius: '24px',
              transition: '0.3s'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '18px',
                width: '18px',
                left: '3px',
                bottom: '3px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                transition: '0.3s',
                transform: settings.emailNotifications ? 'translateX(26px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        color: '#1e293b', 
        margin: '0 0 16px 0' 
      }}>
        Configurações de Aparência
      </h3>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b'
          }}>
            Modo Escuro
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Ativar tema escuro
          </div>
        </div>
        <label style={{
          position: 'relative',
          display: 'inline-block',
          width: '50px',
          height: '24px'
        }}>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: settings.darkMode ? '#6366f1' : '#d1d5db',
            borderRadius: '24px',
            transition: '0.3s'
          }}>
            <span style={{
              position: 'absolute',
              content: '""',
              height: '18px',
              width: '18px',
              left: '3px',
              bottom: '3px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              transition: '0.3s',
              transform: settings.darkMode ? 'translateX(26px)' : 'translateX(0)'
            }} />
          </span>
        </label>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        color: '#1e293b', 
        margin: '0 0 16px 0' 
      }}>
        Configurações de Privacidade
      </h3>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Política de Privacidade
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '12px'
          }}>
            Leia nossa política de privacidade para entender como protegemos seus dados.
          </div>
          <button
            style={{
              backgroundColor: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              minHeight: '36px'
            }}
          >
            Ler Política
          </button>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Exportar Dados
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '12px'
          }}>
            Faça o download de todos os seus dados em formato JSON.
          </div>
          <button
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              minHeight: '36px'
            }}
          >
            Exportar Dados
          </button>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#dc2626',
            marginBottom: '8px'
          }}>
            Excluir Conta
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ef4444',
            marginBottom: '12px'
          }}>
            Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
          </div>
          <button
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              minHeight: '36px'
            }}
            onClick={() => {
              if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
                alert('Funcionalidade de exclusão de conta será implementada em breve.');
              }
            }}
          >
            Excluir Conta
          </button>
        </div>
      </div>
    </div>
  );

  const renderAboutSettings = () => (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '16px'
        }}>
          🏠
        </div>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1e293b', 
          margin: '0 0 8px 0' 
        }}>
          DOM v2
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: '0 0 8px 0'
        }}>
          Sistema de Gestão Doméstica e Empresarial
        </p>
        <p style={{
          fontSize: '14px',
          color: '#94a3b8',
          margin: 0
        }}>
          Versão 2.0.0
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Termos de Uso
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '12px'
          }}>
            Leia os termos de uso do sistema.
          </div>
          <button
            style={{
              backgroundColor: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              minHeight: '36px'
            }}
          >
            Ler Termos
          </button>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Suporte
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '12px'
          }}>
            Entre em contato com nossa equipe de suporte.
          </div>
          <button
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              minHeight: '36px'
            }}
          >
            Contatar Suporte
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'about':
        return renderAboutSettings();
      default:
        return renderGeneralSettings();
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
          ⚙️ Configurações
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Personalize suas preferências do sistema
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        overflow: 'auto',
        paddingBottom: '8px'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? '#6366f1' : '#f3f4f6',
              color: activeTab === tab.id ? '#ffffff' : '#374151',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}

      {/* Save Button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '32px' 
      }}>
        <button
          onClick={handleSaveSettings}
          style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '48px',
            minWidth: '200px'
          }}
        >
          💾 Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;
