
import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext.tsx';
import Header from './micro-frontends/shared/components/layout/Header.tsx';
import SideMenu from './micro-frontends/shared/components/layout/SideMenu.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

// Importar as telas existentes
import DashboardScreen from './screens/DashboardScreen.tsx';
import TasksScreen from './screens/TasksScreen.tsx';
import FinanceScreen from './screens/FinanceScreen.tsx';
import NotificationsScreen from './screens/NotificationsScreen.tsx';
import HRScreen from './screens/HRScreen.tsx';
import ReportsScreen from './screens/ReportsScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import UsersScreen from './screens/UsersScreen.tsx';
import PaymentIntegrationsScreen from './screens/PaymentIntegrationsScreen.tsx';
import AdvancedTimeCardScreen from './screens/AdvancedTimeCardScreen.tsx';
import CommunicationScreen from './screens/CommunicationScreen.tsx';
import GamificationScreen from './screens/GamificationScreen.tsx';
import EmployeesScreen from './screens/EmployeesScreen.tsx';
import PaymentsScreen from './screens/PaymentsScreen.tsx';
import TimeClockScreen from './screens/TimeClockScreen.tsx';
import BudgetScreen from './screens/BudgetScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';

// Mapeamento de telas
const screenComponents: Record<string, React.ComponentType> = {
  dashboard: DashboardScreen,
  tasks: TasksScreen,
  finance: FinanceScreen,
  notifications: NotificationsScreen,
  hr: HRScreen,
  reports: ReportsScreen,
  profile: ProfileScreen,
  users: UsersScreen,
  paymentIntegrations: PaymentIntegrationsScreen,
  advancedTimeCard: AdvancedTimeCardScreen,
  communication: CommunicationScreen,
  gamification: GamificationScreen,
  employees: EmployeesScreen,
  payments: PaymentsScreen,
  timeclock: TimeClockScreen,
  budget: BudgetScreen,
  settings: SettingsScreen,
};

function App() {
  console.log('App component rendering...'); // Debug log
  
  // ✅ USANDO AUTH CONTEXT REAL
  const { isAuthenticated, user, login, logout, loading: authLoading, error: authError } = useAuth();
  const userCpf = user?.cpf;
  const userProfile = user?.role;
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Sistema de frases motivacionais personalizadas por perfil
  const getPersonalizedPhrases = (profile?: string) => {
    // Frases específicas por perfil - Filosofia: "Falar com o coração das pessoas"
    const profilePhrases = {
      employer: [
        {
          text: "Liberte-se das tarefas domésticas chatas",
          subtitle: "Tenha mais tempo para sua carreira e momentos especiais com a família"
        },
        {
          text: "Transforme sua casa em um refúgio de paz",
          subtitle: "Menos estresse, mais organização e tempo para o que realmente importa"
        },
        {
          text: "Comande sua vida com tranquilidade",
          subtitle: "Organize tudo em 5 minutos e aproveite o resto do seu dia"
        },
        {
          text: "Tenha controle total sem perder tempo",
          subtitle: "Gestão inteligente que te dá mais liberdade e menos preocupações"
        }
      ],
      employee: [
        {
          text: "Transforme seu trabalho em conquistas diárias",
          subtitle: "Sinta-se valorizada e orgulhosa de cada tarefa concluída"
        },
        {
          text: "Organize sua rotina e sinta-se no controle",
          subtitle: "Menos confusão, mais satisfação e reconhecimento pelo seu trabalho"
        },
        {
          text: "Faça seu trabalho com mais alegria",
          subtitle: "Listas claras, progresso visível e sensação de dever cumprido"
        },
        {
          text: "Sinta-se parte importante da família",
          subtitle: "Comunicação fácil e reconhecimento pelo seu esforço diário"
        }
      ],
      family: [
        {
          text: "Una sua família através da organização",
          subtitle: "Compartilhem responsabilidades e criem memórias especiais juntos"
        },
        {
          text: "Transformem tarefas em momentos divertidos",
          subtitle: "Organização familiar que fortalece laços e cria harmonia"
        },
        {
          text: "Conectem-se através da rotina doméstica",
          subtitle: "Menos brigas, mais colaboração e tempo de qualidade juntos"
        },
        {
          text: "Criem uma casa organizada e acolhedora",
          subtitle: "Cada um faz sua parte e todos se beneficiam da harmonia"
        }
      ],
      partner: [
        {
          text: "Escale seu negócio sem perder qualidade de vida",
          subtitle: "Gerencie múltiplas casas e tenha mais tempo para sua família"
        },
        {
          text: "Transforme gestão doméstica em lucro real",
          subtitle: "Menos estresse, mais eficiência e resultados financeiros"
        },
        {
          text: "Tenha controle total do seu império doméstico",
          subtitle: "Dados reais, decisões inteligentes e crescimento sustentável"
        },
        {
          text: "Maximize resultados sem perder a humanidade",
          subtitle: "Tecnologia que amplifica seu sucesso e preserva seus valores"
        }
      ]
    };

    // Frases genéricas para todos os perfis - Filosofia do coração
    const genericPhrases = [
      {
        text: "Tenha mais tempo para o que realmente importa",
        subtitle: "Menos estresse, menos aborrecimentos e mais momentos com quem você ama"
      },
      {
        text: "Transforme tarefas chatas em conquistas diárias",
        subtitle: "Organize sua rotina e sinta-se no controle da sua vida"
      },
      {
        text: "Conecte sua família através da organização",
        subtitle: "Compartilhe responsabilidades e crie memórias especiais juntos"
      },
      {
        text: "Simplifique sua vida doméstica com inteligência",
        subtitle: "Menos complicação, mais tranquilidade e tempo livre"
      }
    ];

    // Retorna frases específicas do perfil ou genéricas
    return profilePhrases[profile as keyof typeof profilePhrases] || genericPhrases;
  };

  // Obter frases baseadas no perfil do usuário (se disponível)
  const motivationalPhrases = getPersonalizedPhrases(userProfile);

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % motivationalPhrases.length);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [motivationalPhrases.length]);

  // Função para validar CPF
  const validateCPF = (cpf: string): boolean => {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  const handleLogin = async (cpf: string, password: string, acceptTerms?: boolean) => {
    console.log('Login attempt:', cpf); // Debug log
    
    // Validar CPF antes de fazer a requisição
    if (!validateCPF(cpf)) {
      alert('CPF inválido. Verifique o número e tente novamente.');
      return;
    }
    
    if (!acceptTerms) {
      alert('Você deve aceitar os termos e políticas para continuar.');
      return;
    }
    
    try {
      const result = await login(cpf, password);
      if (!result.success) {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro no login. Verifique suas credenciais.');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    console.log('Navigating to:', screen);
    try {
      setCurrentScreen(screen);
      setMenuOpen(false);
      console.log('Navigation successful to:', screen);
    } catch (error) {
      console.error('Navigation error:', error);
      alert(`Erro ao navegar para ${screen}. Tente novamente.`);
    }
  };

  const handleMenuPress = () => {
    console.log('Menu button pressed, current menuOpen:', menuOpen);
    setMenuOpen((v) => !v);
    console.log('Menu state changed to:', !menuOpen);
  };

  // Componente para Termos de Uso
  const TermsModal = () => (
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
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        width: '100%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Termos de Uso</h2>
          <button 
            onClick={() => setShowTerms(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ lineHeight: '1.6', color: '#374151' }}>
          <h3>1. Aceitação dos Termos</h3>
          <p>Ao acessar e usar o sistema DOM v2, você concorda em cumprir e estar vinculado a estes Termos de Uso.</p>
          
          <h3>2. Descrição do Serviço</h3>
          <p>O DOM v2 é um sistema de gestão doméstica e empresarial que oferece funcionalidades de controle financeiro, gestão de funcionários, tarefas e relatórios.</p>
          
          <h3>3. Uso Aceitável</h3>
          <p>Você concorda em usar o sistema apenas para fins legais e de acordo com estes termos. É proibido:</p>
          <ul>
            <li>Usar o sistema para atividades ilegais</li>
            <li>Tentar acessar contas de outros usuários</li>
            <li>Interferir no funcionamento do sistema</li>
            <li>Compartilhar credenciais de acesso</li>
          </ul>
          
          <h3>4. Privacidade e Segurança</h3>
          <p>Suas informações pessoais são tratadas de acordo com nossa Política de Privacidade. Você é responsável por manter suas credenciais seguras.</p>
          
          <h3>5. Limitação de Responsabilidade</h3>
          <p>O DOM v2 é fornecido "como está" e não garantimos que o serviço será ininterrupto ou livre de erros.</p>
          
          <h3>6. Modificações</h3>
          <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As mudanças entrarão em vigor imediatamente após a publicação.</p>
          
          <h3>7. Contato</h3>
          <p>Para dúvidas sobre estes termos, entre em contato conosco através dos canais oficiais do sistema.</p>
        </div>
        
        <button 
          onClick={() => setShowTerms(false)}
          style={{
            width: '100%',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );

  // Componente para Política de Privacidade
  const PrivacyModal = () => (
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
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        width: '100%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Política de Privacidade</h2>
          <button 
            onClick={() => setShowPrivacy(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ lineHeight: '1.6', color: '#374151' }}>
          <h3>1. Informações Coletadas</h3>
          <p>Coletamos informações que você nos fornece diretamente, como:</p>
          <ul>
            <li>Dados de identificação (CPF, nome)</li>
            <li>Informações de contato (email)</li>
            <li>Dados de uso do sistema</li>
            <li>Informações financeiras e de funcionários</li>
          </ul>
          
          <h3>2. Como Usamos Suas Informações</h3>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Fornecer e manter o sistema DOM v2</li>
            <li>Processar transações e pagamentos</li>
            <li>Enviar notificações importantes</li>
            <li>Melhorar nossos serviços</li>
            <li>Cumprir obrigações legais</li>
          </ul>
          
          <h3>3. Compartilhamento de Informações</h3>
          <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:</p>
          <ul>
            <li>Com seu consentimento explícito</li>
            <li>Para cumprir obrigações legais</li>
            <li>Com prestadores de serviços essenciais</li>
          </ul>
          
          <h3>4. Segurança dos Dados</h3>
          <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>
          
          <h3>5. Seus Direitos</h3>
          <p>Você tem o direito de:</p>
          <ul>
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir dados imprecisos</li>
            <li>Solicitar a exclusão de dados</li>
            <li>Revogar consentimento</li>
            <li>Portabilidade dos dados</li>
          </ul>
          
          <h3>6. Retenção de Dados</h3>
          <p>Mantemos suas informações pelo tempo necessário para fornecer nossos serviços e cumprir obrigações legais.</p>
          
          <h3>7. Alterações na Política</h3>
          <p>Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas.</p>
          
          <h3>8. Contato</h3>
          <p>Para questões sobre privacidade, entre em contato através dos canais oficiais do sistema DOM v2.</p>
        </div>
        
        <button 
          onClick={() => setShowPrivacy(false)}
          style={{
            width: '100%',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    console.log('Rendering LoginScreen...'); // Debug log
    return (
      <div style={{ 
        padding: '16px', 
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
          padding: '24px', 
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          textAlign: 'center',
          maxWidth: '100%',
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* Logo */}
          <div style={{ marginBottom: '32px' }}>
            <img 
              src="/Logo.png" 
              alt="DOM v2 Logo" 
              style={{ 
                width: '120px', 
                height: 'auto',
                marginBottom: '16px'
              }} 
            />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#6366f1' }}>DOM</span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#8b5cf6', marginLeft: '4px' }}>v2</span>
            </div>
            <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 8px 0' }}>Sistema de Gestão Doméstica e Empresarial</p>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500', margin: '0' }}>Acesso Premium</p>
          </div>

          {/* Carrossel de Frases Motivacionais */}
          <div style={{ 
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ 
              transition: 'opacity 0.5s ease-in-out',
              opacity: 1
            }}>
              <p style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: '#1e293b', 
                margin: '0 0 8px 0',
                lineHeight: '1.4'
              }}>
                {motivationalPhrases[currentPhraseIndex].text}
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: '#64748b', 
                margin: '0',
                lineHeight: '1.4'
              }}>
                {motivationalPhrases[currentPhraseIndex].subtitle}
              </p>
            </div>
            
            {/* Indicadores do carrossel */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px', 
              marginTop: '16px' 
            }}>
              {motivationalPhrases.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: index === currentPhraseIndex ? '#6366f1' : '#cbd5e1',
                    transition: 'background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>Bem-vindo de volta!</h1>
          <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 24px 0' }}>Faça login para acessar o sistema</p>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>CPF:</label>
            <input 
              type="text" 
              placeholder="000.000.000-00"
              id="cpf-input"
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                boxSizing: 'border-box',
                minHeight: '48px' // Touch-friendly
              }}
            />
          </div>
           
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>Senha:</label>
            <input 
              type="password" 
              placeholder="Digite sua senha"
              id="password-input"
              style={{
                width: '100%',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                boxSizing: 'border-box',
                minHeight: '48px' // Touch-friendly
              }}
            />
          </div>
           
          {/* Termos e Políticas */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <input
                type="checkbox"
                id="accept-terms"
                style={{
                  marginTop: '2px',
                  width: '16px',
                  height: '16px',
                  accentColor: '#6366f1'
                }}
              />
              <label htmlFor="accept-terms" style={{
                fontSize: '13px',
                color: '#475569',
                lineHeight: '1.4',
                cursor: 'pointer',
                margin: 0
              }}>
                Li e aceito os{' '}
                <button 
                  onClick={() => setShowTerms(true)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#6366f1', 
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit'
                  }}
                >
                  Termos de Uso
                </button>
                {' '}e{' '}
                <button 
                  onClick={() => setShowPrivacy(true)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#6366f1', 
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit'
                  }}
                >
                  Política de Privacidade
                </button>
                {' '}do sistema DOM v2.
              </label>
            </div>
          </div>
           
          {/* Mensagem de Erro */}
          {authError && (
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '14px',
              textAlign: 'left'
            }}>
              ⚠️ {authError}
            </div>
          )}
          
          <button 
            onClick={() => {
              const cpfInput = document.getElementById('cpf-input') as HTMLInputElement;
              const passwordInput = document.getElementById('password-input') as HTMLInputElement;
              const acceptTermsInput = document.getElementById('accept-terms') as HTMLInputElement;
              
              const cpf = cpfInput?.value || '12345678901';
              const password = passwordInput?.value || '123456';
              const acceptTerms = acceptTermsInput?.checked || false;
              
              handleLogin(cpf, password, acceptTerms);
            }}
            disabled={authLoading}
            style={{
              width: '100%',
              backgroundColor: authLoading ? '#9ca3af' : '#6366f1',
              borderRadius: '12px',
              padding: '16px',
              border: 'none',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: authLoading ? 'not-allowed' : 'pointer',
              boxShadow: authLoading ? 'none' : '0 4px 8px rgba(99, 102, 241, 0.3)',
              minHeight: '48px', // Touch-friendly
              opacity: authLoading ? 0.7 : 1
            }}
          >
            {authLoading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>© 2025 DOM v2 - Todos os direitos reservados</p>
          <p style={{ fontSize: '11px', color: '#cbd5e1', margin: '0' }}>Sistema de Gestão Inteligente</p>
        </div>

        {/* Modais para Termos e Privacidade */}
        {showTerms && <TermsModal />}
        {showPrivacy && <PrivacyModal />}
      </div>
    );
  }

  console.log('Rendering main app...'); // Debug log

  // Obter o componente da tela atual com tratamento de erro
  const CurrentScreenComponent = screenComponents[currentScreen];
  
  // Componente de fallback para telas não encontradas
  const FallbackScreen = () => (
    <div style={{ 
      padding: '16px',
      textAlign: 'center',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          🚧
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          Tela não encontrada
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: '0 0 16px 0'
        }}>
          A tela "{currentScreen}" não foi implementada ainda.
        </p>
        <button
          onClick={() => handleNavigate('dashboard')}
          style={{
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Voltar ao Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <Header
        title="DOM v2"
        onMenuPress={handleMenuPress}
        onLogout={handleLogout}
        user={{ name: userCpf || 'Usuário', profile: userProfile }}
      />

      {/* Main Content - Mobile-First */}
      <main style={{ 
        padding: '0', 
        maxWidth: '100%', 
        margin: '0 auto',
        minHeight: 'calc(100vh - 64px)' // Ajustado para header mobile
      }}>
        {currentScreen === 'dashboard' ? (
          <ErrorBoundary>
            <DashboardScreen onNavigate={handleNavigate} />
          </ErrorBoundary>
        ) : CurrentScreenComponent ? (
          <ErrorBoundary>
            <CurrentScreenComponent />
          </ErrorBoundary>
        ) : (
          <FallbackScreen />
        )}
      </main>
      
      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        user={{ name: userCpf || 'Usuário', profile: userProfile, cpf: userCpf }}
      />
    </div>
  );
}

export default App;