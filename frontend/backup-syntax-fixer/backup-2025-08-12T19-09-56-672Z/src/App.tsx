
import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen.tsx';
import { useUserProfile } from './hooks/useUserProfile.ts';
import ProfileSwitcher from './components/ProfileSwitcher.tsx';
import FinanceScreen from './screens/FinanceScreen.tsx';
import TasksScreen from './screens/TasksScreen.tsx';
import HRScreen from './screens/HRScreen.tsx';
import ReportsScreen from './screens/ReportsScreen.tsx';
import NotificationsScreen from './screens/NotificationsScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import BudgetScreen from './screens/budget/BudgetScreen.tsx';
import PaymentScreen from './screens/payments/PaymentScreen.tsx';
import TimeClockScreen from './screens/timeclock/TimeClockScreen.tsx';
import CommunicationScreen from './screens/CommunicationScreen.tsx';
import GamificationScreen from './screens/GamificationScreen.tsx';
import ThemeSettingsScreen from './screens/ThemeSettingsScreen.tsx';
import UsersScreen from './screens/UsersScreen.tsx';
import PayrollScreen from './screens/PayrollScreen.tsx';
import ESocialScreen from './screens/ESocialScreen.tsx';

function App() {
  console.log('App component rendering...'); // Debug log
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCpf, setUserCpf] = useState('');
  const [userProfile, setUserProfile] = useState<'employer' | 'employee' | 'family' | 'admin'>('employer');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  // Hook de perfil do usuário
  const {
    navigationSections,
    profileDisplay,
    changeProfile
  } = useUserProfile(userProfile);

  const handleLogin = (cpf: string, password: string) => {
    console.log('Login attempt:', cpf); // Debug log
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = password; // Acknowledge password parameter but don't use it
    setIsLoggedIn(true);
    setUserCpf(cpf);
    
    // Determinar perfil baseado no CPF (simulação)
    const profile = cpf.startsWith('000') ? 'admin' :
                   cpf.startsWith('111') ? 'employee' :
                   cpf.startsWith('222') ? 'family' : 'employer';
    setUserProfile(profile);
    changeProfile(profile);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserCpf('');
    setCurrentScreen('dashboard');
  };

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
    setMenuOpen(false);
  };

  console.log('isLoggedIn:', isLoggedIn); // Debug log

  if (!isLoggedIn) {
    console.log('Rendering LoginScreen...'); // Debug log
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button style={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <h1 style={styles.headerTitle}>DOM v2</h1>
        <div style={styles.userInfo}>
          <ProfileSwitcher 
            currentProfile={userProfile}
            onProfileChange={(newProfile) => {
              setUserProfile(newProfile);
              changeProfile(newProfile);
            }}
          />
          <span style={styles.userCpf}>CPF: {userCpf}</span>
        </div>
      </header>

      {/* Sidebar */}
      {menuOpen && (
        <div style={styles.overlay} onClick={() => setMenuOpen(false)}>
          <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.sidebarHeader}>
              <h2>Menu</h2>
              <button style={styles.closeButton} onClick={() => setMenuOpen(false)}>
                ✕
              </button>
            </div>
            
            <nav style={styles.nav}>
              <div style={styles.profileInfo}>
                <div style={styles.profileIcon}>{profileDisplay.icon}</div>
                <div>
                  <div style={styles.profileName}>{profileDisplay.name}</div>
                  <div style={styles.profileDescription}>{profileDisplay.description}</div>
                </div>
              </div>
              
              <ul style={styles.navList}>
                {navigationSections.map((section) => (
                  <li 
                    key={section.id}
                    style={{
                      ...styles.navItem, 
                      ...(currentScreen === section.id ? styles.navItemActive : { /* TODO: Implement error handling */ } ),
                      ...(section.id === 'dashboard' ? { marginBottom: '12px', borderBottom: '1px solid #e5e7eb' } : { /* TODO: Implement error handling */ } )
                    }} 
                    onClick={() => navigateToScreen(section.id)}
                  >
                    {section.icon} {section.title}
                  </li>
                ))}
                
                {/* Separador para ações do sistema */}
                <li style={styles.navSeparator}></li>
                
                {/* Perfil sempre visível */}
                <li 
                  style={{...styles.navItem, ...(currentScreen === 'profile' ? styles.navItemActive : { /* TODO: Implement error handling */ } )}} 
                  onClick={() => navigateToScreen('profile')}
                >
                  👤 Perfil
                </li>
              </ul>
            </nav>
            
            <div style={styles.sidebarFooter}>
              <button style={styles.logoutButton} onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={styles.main}>
        {currentScreen === 'dashboard' && (
          <>
            <div style={styles.dashboardHeader}>
              <h2>Dashboard - {profileDisplay.name}</h2>
              <p>{profileDisplay.description}</p>
              <div style={styles.profileBadge}>
                <span style={styles.profileIcon}>{profileDisplay.icon}</span>
                <span>Perfil: {profileDisplay.name}</span>
              </div>
            </div>
            
            <div style={styles.cards}>
              {dashboardCards.map((card) => (
                <div 
                  key={card.id}
                  style={styles.card} 
                  onClick={() => navigateToScreen(card.id)}
                >
                  <h3>{card.icon} {card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            
            {dashboardCards.length === 0 && (
              <div style={styles.emptyDashboard}>
                <p>Nenhuma funcionalidade disponível para este perfil.</p>
              </div>
            )}
          </>
        )}
        
        {currentScreen === 'finance' && <FinanceScreen />}
        {currentScreen === 'tasks' && <TasksScreen />}
        {currentScreen === 'hr' && <HRScreen />}
        {currentScreen === 'reports' && <ReportsScreen />}
        {currentScreen === 'notifications' && <NotificationsScreen />}
        {currentScreen === 'budget' && <BudgetScreen />}
        {currentScreen === 'payments' && <PaymentScreen />}
                  {currentScreen === 'timeclock' && <TimeClockScreen />}
          {currentScreen === 'communication' && <CommunicationScreen />}
          {currentScreen === 'gamification' && <GamificationScreen />}
          {currentScreen === 'settings' && <ThemeSettingsScreen />}
        {currentScreen === 'users' && <UsersScreen />}
        {currentScreen === 'payroll' && <PayrollScreen />}
        {currentScreen === 'esocial' && <ESocialScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: 'white',
    padding: '15px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '5px',
  },
  headerTitle: {
    margin: 0,
    color: '#333',
    fontSize: '24px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: '#666',
    fontSize: '14px',
  },
  userCpf: {
    fontSize: '14px',
    color: '#666',
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  sidebarHeader: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
  nav: {
    flex: 1,
    padding: '20px 0',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    padding: '12px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    margin: '0 10px',
    marginBottom: '10px',
    transition: 'background-color 0.2s',
  },
  navItemActive: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    fontWeight: 'bold',
  },
  sidebarFooter: {
    padding: '20px',
    borderTop: '1px solid #eee',
  },
  logoutButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  profileInfo: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  profileIcon: {
    fontSize: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
  },
  profileName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px',
  },
  profileDescription: {
    fontSize: '12px',
    color: '#6b7280',
    lineHeight: '1.4',
  },
  navSeparator: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '12px 0',
    listStyle: 'none',
  },
  dashboardHeader: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  profileBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#374151',
    marginTop: '8px',
  },
  emptyDashboard: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
    fontSize: '16px',
  },
  main: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
};

export default App;