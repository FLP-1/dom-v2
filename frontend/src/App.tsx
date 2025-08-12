
import React, { useState } from 'react';

function App() {
  console.log('App component rendering...'); // Debug log
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCpf, setUserCpf] = useState('');
  const [userProfile, setUserProfile] = useState('employer');

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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserCpf('');
  };

  if (!isLoggedIn) {
    console.log('Rendering LoginScreen...'); // Debug log
    return (
      <div style={{ 
        padding: '20px', 
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '56px', fontWeight: 'bold', color: '#6366f1' }}>DOM</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6', marginLeft: '4px' }}>v2</span>
            </div>
            <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 8px 0' }}>Sistema de Gestão Doméstica e Empresarial</p>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500', margin: '0' }}>Acesso Premium</p>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>Bem-vindo de volta!</h1>
          <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 32px 0' }}>Faça login para acessar o sistema</p>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>CPF:</label>
            <input 
              type="text" 
              placeholder="000.000.000-00"
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>Senha:</label>
            <input 
              type="password" 
              placeholder="Digite sua senha"
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button 
            onClick={() => handleLogin('346.825.064-98', 'teste123')}
            style={{
              width: '100%',
              backgroundColor: '#6366f1',
              borderRadius: '12px',
              padding: '18px',
              border: 'none',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(99, 102, 241, 0.3)'
            }}
          >
            Entrar no Sistema
          </button>

          <div style={{ marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: '0 0 12px 0' }}>Teste Rápido</p>
            <button 
              onClick={() => handleLogin('346.825.064-98', 'teste123')}
              style={{
                width: '100%',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                padding: '12px',
                border: 'none',
                color: '#6366f1',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Preencher dados de teste
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>© 2025 DOM v2 - Todos os direitos reservados</p>
          <p style={{ fontSize: '11px', color: '#cbd5e1', margin: '0' }}>Sistema de Gestão Inteligente</p>
        </div>
      </div>
    );
  }

  console.log('Rendering main app...'); // Debug log

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ margin: 0, color: '#333', fontSize: '24px' }}>DOM v2</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#666', fontSize: '14px' }}>
          <span>Perfil: {userProfile}</span>
          <span>CPF: {userCpf}</span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>Dashboard - {userProfile}</h2>
          <p style={{ color: '#666' }}>Bem-vindo ao sistema DOM v2!</p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <h3>💰 Finanças</h3>
            <p>Gerencie suas finanças</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <h3>📝 Tarefas</h3>
            <p>Organize suas tarefas</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <h3>👥 Funcionários</h3>
            <p>Gerencie sua equipe</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <h3>📊 Relatórios</h3>
            <p>Visualize relatórios</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;