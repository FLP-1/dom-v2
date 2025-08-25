

/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Componente React/React Native
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * <ComponentName prop={value} />
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import React from 'react';
import { useAuth } from '../../../../context/AuthContext.tsx';

export type MenuItem = {
  id: string;
  title: string;
  icon?: string;
  screen: string;
  description?: string;
  requiresAuth?: boolean;
  adminOnly?: boolean;
};

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  user?: {
    name: string;
    profile: string;
    cpf?: string;
  };
}

const defaultMenuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Dashboard', screen: 'dashboard' },
  { id: 'finance', title: 'Finanças', screen: 'finance' },
  { id: 'tasks', title: 'Tarefas', screen: 'tasks' },
  { id: 'employees', title: 'Funcionários', screen: 'employees' },
  { id: 'payments', title: 'Pagamentos', screen: 'payments' },
  { id: 'timeclock', title: 'Ponto', screen: 'timeclock' },
  { id: 'budget', title: 'Orçamentos', screen: 'budget' },
  { id: 'notifications', title: 'Notificações', screen: 'notifications' },
  { id: 'hr', title: 'Recursos Humanos', screen: 'hr' },
  { id: 'reports', title: 'Relatórios', screen: 'reports' },
  { id: 'advancedTimeCard', title: 'Ponto Avançado', screen: 'advancedTimeCard' },
  { id: 'paymentIntegrations', title: 'Integrações de Pagamento', screen: 'paymentIntegrations' },
  { id: 'communication', title: 'Comunicação', screen: 'communication' },
  { id: 'gamification', title: 'Gamificação', screen: 'gamification' },
  { id: 'profile', title: 'Perfil', screen: 'profile' },
  { id: 'users', title: 'Usuários', screen: 'users', adminOnly: true },
  { id: 'settings', title: 'Configurações', screen: 'settings', adminOnly: true },
];

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, onNavigate, onLogout, user }) => {
  const { user: authUser } = useAuth();
  
  console.log('SideMenu render - visible:', visible);
  
  // Mapear o usuário do AuthContext para o formato esperado pelo SideMenu
  const mappedAuthUser = authUser ? {
    name: authUser.name,
    profile: authUser.role,
    cpf: authUser.cpf
  } : undefined;
  
  const activeUser = user || mappedAuthUser || undefined;
  const profile = (activeUser?.profile || '').toLowerCase();

  function getMenuByProfile(p: string): MenuItem[] {
    const all = defaultMenuItems;
    const pick = (ids: string[]): MenuItem[] => ids
      .map(id => all.find(i => i.id === id))
      .filter((i): i is MenuItem => Boolean(i));
    
    // System owner e admin têm acesso total
    if (p === 'system_owner' || p === 'admin' || p === 'owner') return all;
    
    // Perfis específicos com acesso limitado
    if (p === 'employer') return pick([
      'dashboard', 'finance', 'tasks', 'employees', 'payments', 'timeclock', 
      'budget', 'notifications', 'hr', 'reports', 'advancedTimeCard', 
      'paymentIntegrations', 'communication', 'gamification', 'profile'
    ]);
    
    if (p === 'employee') return pick([
      'tasks', 'timeclock', 'notifications', 'profile'
    ]);
    
    if (p === 'family') return pick([
      'tasks', 'notifications', 'profile'
    ]);
    
    if (p === 'partner' || p === 'subordinate') return pick([
      'dashboard', 'finance', 'tasks', 'payments', 'budget', 'notifications', 
      'reports', 'communication', 'gamification', 'profile'
    ]);
    
    // Padrão: todas as funcionalidades exceto admin
    return all.filter(i => !i.adminOnly);
  }

  if (!visible) {
    console.log('SideMenu not visible, returning null');
    return null;
  }

  const menuItems = getMenuByProfile(profile);

  const handleMenuItemPress = (screen: string) => {
    console.log('Menu item pressed:', screen);
    onNavigate(screen);
  };

  const handleLogoutPress = () => {
    console.log('Logout pressed');
    if (window.confirm('Tem certeza que deseja sair?')) {
      onLogout();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      
      {/* Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '280px',
          height: '100vh',
          backgroundColor: '#ffffff',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          transform: visible ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-out',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: 0
            }}>
              Menu
            </h2>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: '#6b7280'
              }}
              aria-label="Fechar menu"
            >
              ×
            </button>
          </div>
          
          {activeUser && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {activeUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  {activeUser.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {activeUser.profile}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px 0'
        }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemPress(item.screen)}
              style={{
                width: '100%',
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                color: '#374151',
                transition: 'background-color 0.2s ease',
                textAlign: 'left',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{
                fontSize: '20px',
                width: '24px',
                textAlign: 'center'
              }}>
                {item.icon || '📋'}
              </span>
              <span style={{
                fontWeight: '500'
              }}>
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <button
            onClick={handleLogoutPress}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#dc3545',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              minHeight: '44px'
            }}
          >
            <span>⎋</span>
            <span>Sair</span>
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default SideMenu;