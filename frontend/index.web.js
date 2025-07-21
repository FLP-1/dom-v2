/**
 * @fileoverview Ponto de entrada para web do aplicativo React Native DOM v2
 * @directory frontend
 * @description Registra o componente principal para execução no navegador
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 * @format
 */

// Importar React e ReactDOM para web
const React = require('react');
const ReactDOM = require('react-dom');

// Componente simples do DOM v2
const DOMv2App = () => {
  const [currentScreen, setCurrentScreen] = React.useState('login');
  const [user, setUser] = React.useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const renderLogin = () => React.createElement('div', {
    style: { 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }
  }, 
    React.createElement('h1', { style: { color: '#333', marginBottom: '20px' } }, '🚀 DOM v2'),
    React.createElement('h2', { style: { color: '#666', marginBottom: '30px' } }, 'Sistema de Gestão Doméstica'),
    React.createElement('button', {
      onClick: () => handleLogin({ id: '1', name: 'Usuário Teste', email: 'teste@dom.com', profile: 'EMPLOYER' }),
      style: {
        padding: '15px 30px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }
    }, 'Entrar no Sistema')
  );

  const renderDashboard = () => React.createElement('div', {
    style: { 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }
  },
    React.createElement('div', {
      style: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }
    },
      React.createElement('h1', { style: { color: '#333', margin: 0 } }, '🏠 Dashboard DOM v2'),
      React.createElement('button', {
        onClick: handleLogout,
        style: {
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }
      }, 'Sair')
    ),
    React.createElement('div', {
      style: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }
    },
      React.createElement('div', {
        style: { 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }
      },
        React.createElement('h3', { style: { color: '#333', marginTop: 0 } }, '👤 Perfil do Usuário'),
        React.createElement('p', null, React.createElement('strong', null, 'Nome:'), ' ', user?.name),
        React.createElement('p', null, React.createElement('strong', null, 'Email:'), ' ', user?.email),
        React.createElement('p', null, React.createElement('strong', null, 'Perfil:'), ' ', user?.profile)
      ),
      React.createElement('div', {
        style: { 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }
      },
        React.createElement('h3', { style: { color: '#333', marginTop: 0 } }, '📊 Estatísticas'),
        React.createElement('p', null, '✅ Sistema funcionando'),
        React.createElement('p', null, '🎯 Perfis implementados'),
        React.createElement('p', null, '🌍 Adaptação regional')
      ),
      React.createElement('div', {
        style: { 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }
      },
        React.createElement('h3', { style: { color: '#333', marginTop: 0 } }, '🔧 Funcionalidades'),
        React.createElement('p', null, '📱 Responsivo'),
        React.createElement('p', null, '🎨 Temas adaptativos'),
        React.createElement('p', null, '🔔 Notificações inteligentes')
      )
    )
  );

  return currentScreen === 'login' ? renderLogin() : renderDashboard();
};

// Renderizar a aplicação
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement && typeof ReactDOM !== 'undefined' && ReactDOM.render) {
    console.log('Renderizando aplicação DOM v2...');
    ReactDOM.render(React.createElement(DOMv2App), rootElement);
  } else {
    console.error('Erro: ReactDOM não está disponível ou root element não encontrado');
  }
} 