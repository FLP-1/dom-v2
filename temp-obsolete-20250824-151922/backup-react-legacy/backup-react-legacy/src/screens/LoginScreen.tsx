
/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Tela de Login Premium DOM v2
 */

import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin?: (cpf: string, password: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  console.log('LoginScreen component rendering...'); // Debug log
  
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const handleLogin = async () => {
    if (!cpf || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      alert('Consentimento obrigatório: Você precisa aceitar os Termos e a Política de Privacidade.');
      return;
    }

    setIsLoading(true);
    try {
      // Simular login - qualquer CPF/senha funciona
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onLogin) {
        onLogin(cpf, password);
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleaned;
  };

  const handleCPFChange = (text: string) => {
    const formatted = formatCPF(text);
    setCpf(formatted);
  };

  const handleQuickLogin = () => {
    setCpf('346.825.064-98');
    setPassword('teste123');
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <span style={styles.logo}>DOM</span>
            <span style={styles.version}>v2</span>
          </div>
          <p style={styles.tagline}>Sistema de Gestão Doméstica e Empresarial</p>
          <p style={styles.subtitle}>Acesso Premium</p>
        </div>

        {/* Login Card */}
        <div style={styles.card}>
          <h1 style={styles.title}>Bem-vindo de volta!</h1>
          <p style={styles.description}>Faça login para acessar o sistema</p>
          
          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>CPF</label>
              <input
                style={styles.input}
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => handleCPFChange(e.target.value)}
                maxLength={14}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Senha</label>
              <input
                style={styles.input}
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
            </button>

            {/* Consentimentos LGPD */}
            <div style={styles.consentsContainer}>
              <label style={styles.consentItem}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={styles.checkbox}
                />
                Aceito os Termos de Uso
              </label>
              <label style={styles.consentItem}>
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  style={styles.checkbox}
                />
                Aceito a Política de Privacidade
              </label>
              <label style={styles.consentItem}>
                <input
                  type="checkbox"
                  checked={marketingAccepted}
                  onChange={(e) => setMarketingAccepted(e.target.checked)}
                  style={styles.checkbox}
                />
                Aceito receber comunicações de marketing (opcional)
              </label>
            </div>
          </div>

          {/* Quick Login */}
          <div style={styles.quickLoginSection}>
            <p style={styles.quickLoginTitle}>Teste Rápido</p>
            <button
              style={styles.quickLoginButton}
              onClick={handleQuickLogin}
            >
              Preencher dados de teste
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>© 2025 DOM v2 - Todos os direitos reservados</p>
          <p style={styles.footerSubtext}>Sistema de Gestão Inteligente</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  logo: {
    fontSize: '56px',
    fontWeight: 'bold',
    color: '#6366f1',
  },
  version: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginLeft: '4px',
  },
  tagline: {
    fontSize: '16px',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    fontWeight: '500',
    margin: '0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },
  description: {
    fontSize: '16px',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '32px',
    margin: '0 0 32px 0',
  },
  form: {
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    boxSizing: 'border-box' as const,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#6366f1',
    borderRadius: '12px',
    padding: '18px',
    border: 'none',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
    boxShadow: '0 4px 8px rgba(99, 102, 241, 0.3)',
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
    cursor: 'not-allowed',
  },
  quickLoginSection: {
    borderTop: '1px solid #f1f5f9',
    paddingTop: '24px',
  },
  quickLoginTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: '12px',
    margin: '0 0 12px 0',
  },
  quickLoginButton: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    padding: '12px',
    border: 'none',
    color: '#6366f1',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  consentsContainer: {
    marginTop: '20px',
  },
  consentItem: {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '8px',
  },
  footer: {
    textAlign: 'center',
  },
  footerText: {
    fontSize: '12px',
    color: '#9ca3af',
    marginBottom: '4px',
    margin: '0 0 4px 0',
  },
  footerSubtext: {
    fontSize: '11px',
    color: '#cbd5e1',
    margin: '0',
  },
};

export default LoginScreen;

