
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}



/**
 * Asserções de validação
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}/**
 * @fileoverview Tela de Login Premium - DOM v2
 * @directory frontend/src/screens
 * @description Login premium com LGPD, biometria e experiência impactante
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Dimensions,
  Animated,
  Modal,
  Switch,
  Linking,
} from 'react-native';
import { Colors, Typography, Spacing, Borders, Shadows, Icons, Animations } from '../components/ui/DesignSystem';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ApiClient from '../utils/api-client';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// Definição dos perfis de usuário
type UserProfile = 
  | 'EMPLOYER' | 'EMPLOYEE' | 'FAMILY' | 'PARTNER' | 'SUBORDINATE' | 'ADMIN' | 'OWNER';

interface User {
  id: string;
  name: string;
  email: string;
  profile: UserProfile;
  cpf: string;
}

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

interface LoginLog {
  timestamp: string;
  cpf: string;
  success: boolean;
  profile?: string;
  ip?: string;
  userAgent?: string;
  biometricUsed?: boolean;
  rememberMe?: boolean;
}

// Frases motivacionais por perfil
const motivationalPhrases = {
  EMPLOYER: [
    "Transforme sua casa em um lar extraordinário",
    "Controle total da sua gestão doméstica",
    "Eficiência e organização ao seu alcance",
    "Simplifique sua vida, maximize seus resultados"
  ],
  EMPLOYEE: [
    "Seu trabalho faz a diferença todos os dias",
    "Organize suas tarefas com excelência",
    "Cada tarefa concluída é uma conquista",
    "Você é essencial para o sucesso da casa"
  ],
  FAMILY: [
    "Juntos fazemos nossa casa melhor",
    "Participe e ajude a manter tudo organizado",
    "Cada membro da família é importante",
    "Vamos trabalhar em equipe pelo nosso lar"
  ],
  PARTNER: [
    "Gerencie suas propriedades com maestria",
    "Controle total das suas operações",
    "Cresça seu negócio com eficiência",
    "Sucesso empresarial ao seu alcance"
  ],
  ADMIN: [
    "Sistema robusto para administração eficiente",
    "Controle total da plataforma",
    "Suporte técnico de excelência",
    "Garantia de funcionamento perfeito"
  ],
  OWNER: [
    "Visão estratégica do seu negócio",
    "Crescimento sustentável e lucrativo",
    "Decisões baseadas em dados reais",
    "Liderança que inspira resultados"
  ]
};

export const PremiumLoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  // Estados de formulário
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  
  // Estados de compliance
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  
  // Estados de UI
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const phraseOpacity = useRef(new Animated.Value(1)).current;

  // Detectar biometria disponível
  useEffect(() => {
    detectBiometric();
    startAnimations();
    startPhraseCarousel();
  }, []);

  const detectBiometric = async () => {
    try {
      // Simular detecção de biometria
      const hasBiometric = await checkBiometricAvailability();
      setBiometricAvailable(hasBiometric);
      setBiometricEnabled(hasBiometric);
    } catch (error) {
      console.log('Biometria não disponível:', error);
      setBiometricAvailable(false);
    }
  };

  const checkBiometricAvailability = async (): Promise<boolean> => {
    // Simulação - em produção seria integração real
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Platform.OS !== 'web' && Math.random() > 0.3);
      }, 1000);
    });
  };

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startPhraseCarousel = () => {
    const interval = setInterval(() => {
      Animated.timing(phraseOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % 4);
        Animated.timing(phraseOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(interval);
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const startTime = Date.now();

    try {
      // Log de tentativa de login
      const loginLog: LoginLog = {
        timestamp: new Date().toISOString(),
        cpf: cpf.replace(/\D/g, ''),
        success: false,
        ip: '127.0.0.1', // Em produção seria IP real
        userAgent: navigator.userAgent,
        biometricUsed: false,
        rememberMe,
      };

      const response = await ApiClient.post('/api/auth/login', { 
        cpf, 
        password,
        rememberMe,
        biometricUsed: false,
        termsAccepted,
        privacyAccepted,
        marketingAccepted,
      });

      if (response.success) {
        loginLog.success = true;
        loginLog.profile = response.data.user.profile;
        
        // Salvar preferências se "Lembrar de mim" estiver ativo
        if (rememberMe) {
          await saveUserPreferences(response.data.user);
        }

        // Log de sucesso
        await logLoginAttempt(loginLog);

        onLogin(response.data.user);
      } else {
        loginLog.success = false;
        await logLoginAttempt(loginLog);
        
        Alert.alert('Erro', response.error || 'Erro ao fazer login. Tente novamente.');
      }
    } catch (error) {
      await logLoginAttempt({
        timestamp: new Date().toISOString(),
        cpf: cpf.replace(/\D/g, ''),
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
      
      Alert.alert('Erro', 'Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (!biometricAvailable) {
      Alert.alert('Biometria', 'Biometria não disponível neste dispositivo.');
      return;
    }

    setLoading(true);

    try {
      const biometricResult = await authenticateWithBiometric();
      
      if (biometricResult.success) {
        // Buscar credenciais salvas
        const savedCredentials = await getSavedCredentials();
        
        if (savedCredentials) {
          setCpf(savedCredentials.cpf);
          setPassword(savedCredentials.password);
          await handleLogin();
        } else {
          Alert.alert('Biometria', 'Nenhuma credencial salva encontrada.');
        }
      } else {
        Alert.alert('Biometria', 'Autenticação biométrica falhou.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro na autenticação biométrica.');
    } finally {
      setLoading(false);
    }
  };

  const authenticateWithBiometric = async (): Promise<{ success: boolean }> => {
    // Simulação - em produção seria integração real
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: Math.random() > 0.2 });
      }, 2000);
    });
  };

  const getSavedCredentials = async () => {
    // Simulação - em produção seria AsyncStorage
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    });
  };

  const saveUserPreferences = async (user: User) => {
    try {
      // Simulação - em produção seria AsyncStorage
      console.log('Preferências salvas para:', user.name);
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  };

  const logLoginAttempt = async (log: LoginLog) => {
    try {
      await ApiClient.post('/api/logs/login', log);
    } catch (error) {
      console.error('Erro ao logar tentativa de login:', error);
    }
  };

  const validateForm = (): boolean => {
    if (!cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (!termsAccepted || !privacyAccepted) {
      Alert.alert('Erro', 'Você deve aceitar os Termos de Uso e Política de Privacidade.');
      return false;
    }

    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      Alert.alert('Erro', 'CPF deve ter 11 dígitos.');
      return false;
    }

    return true;
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      Alert.alert('Erro', 'Por favor, informe seu e-mail.');
      return;
    }

    setLoading(true);

    try {
      const response = await ApiClient.post('/api/auth/forgot-password', {
        email: forgotEmail,
      });

      if (response.success) {
        Alert.alert(
          'E-mail Enviado',
          'Verifique sua caixa de entrada para instruções de recuperação.',
          [{ text: 'OK', onPress: () => setShowForgotPassword(false) }]
        );
      } else {
        Alert.alert('Erro', response.error || 'Erro ao enviar e-mail de recuperação.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const openTerms = () => {
    setShowTerms(true);
  };

  const openPrivacy = () => {
    setShowPrivacy(true);
  };

  const getCurrentPhrase = () => {
    const phrases = motivationalPhrases.EMPLOYER; // Padrão
    return phrases[currentPhraseIndex];
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Logo Animada */}
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
          <Text style={styles.logo}>🏠</Text>
          <Text style={styles.logoText}>DOM v2</Text>
          <Text style={styles.logoSubtext}>Gestão Doméstica Premium</Text>
        </Animated.View>

        {/* Carrossel Motivacional */}
        <View style={styles.carouselContainer}>
          <Animated.Text style={[styles.motivationalPhrase, { opacity: phraseOpacity }]}>
            "{getCurrentPhrase()}"
          </Animated.Text>
        </View>

        {/* Formulário de Login */}
        <Card variant="elevated" size="lg" style={styles.loginCard}>
          <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
          <Text style={styles.welcomeSubtext}>Faça login para continuar</Text>

          <View style={styles.form}>
            {/* Campo CPF */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
                editable={!loading}
                maxLength={14}
              />
            </View>

            {/* Campo Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Digite sua senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Opções de Login */}
            <View style={styles.optionsContainer}>
              <View style={styles.optionRow}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: Colors.gray[300], true: Colors.primary }}
                  thumbColor={Colors.white}
                />
                <Text style={styles.optionText}>Lembrar de mim</Text>
              </View>

              {biometricAvailable && (
                <View style={styles.optionRow}>
                  <Switch
                    value={biometricEnabled}
                    onValueChange={setBiometricEnabled}
                    trackColor={{ false: Colors.gray[300], true: Colors.primary }}
                    thumbColor={Colors.white}
                  />
                  <Text style={styles.optionText}>Usar biometria</Text>
                </View>
              )}
            </View>

            {/* Botões de Login */}
            <View style={styles.buttonContainer}>
              <Button
                title="Entrar"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onPress={handleLogin}
                style={styles.loginButton}
              />

              {biometricAvailable && biometricEnabled && (
                <Button
                  title="Entrar com Biometria"
                  variant="outline"
                  size="md"
                  fullWidth
                  loading={loading}
                  onPress={handleBiometricLogin}
                  icon="fingerprint"
                  style={styles.biometricButton}
                />
              )}
            </View>

            {/* Esqueci a Senha */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => setShowForgotPassword(true)}
            >
              <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Termos e Privacidade */}
        <Card variant="outlined" size="md" style={styles.termsCard}>
          <Text style={styles.termsTitle}>Termos e Privacidade</Text>
          
          <View style={styles.termsContainer}>
            <View style={styles.termRow}>
              <TouchableOpacity
                style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <View style={styles.termTextContainer}>
                <Text style={styles.termText}>
                  Aceito os{' '}
                  <Text style={styles.linkText} onPress={openTerms}>
                    Termos de Uso
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.termRow}>
              <TouchableOpacity
                style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}
                onPress={() => setPrivacyAccepted(!privacyAccepted)}
              >
                {privacyAccepted && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <View style={styles.termTextContainer}>
                <Text style={styles.termText}>
                  Aceito a{' '}
                  <Text style={styles.linkText} onPress={openPrivacy}>
                    Política de Privacidade
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.termRow}>
              <TouchableOpacity
                style={[styles.checkbox, marketingAccepted && styles.checkboxChecked]}
                onPress={() => setMarketingAccepted(!marketingAccepted)}
              >
                {marketingAccepted && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <View style={styles.termTextContainer}>
                <Text style={styles.termText}>
                  Aceito receber comunicações de marketing (opcional)
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Credenciais de Teste */}
        <Card variant="outlined" size="sm" style={styles.testCard}>
          <Text style={styles.testTitle}>Credenciais de Teste</Text>
          <Text style={styles.testText}>CPF: 12345678901 (EMPLOYER) | Senha: 123456</Text>
          <Text style={styles.testText}>CPF: 12345678902 (EMPLOYEE) | Senha: 123456</Text>
          <Text style={styles.testText}>CPF: 12345678903 (FAMILY) | Senha: 123456</Text>
          <Text style={styles.testText}>CPF: 12345678905 (ADMIN) | Senha: 123456</Text>
        </Card>
      </Animated.View>

      {/* Modal Esqueci a Senha */}
      <Modal
        visible={showForgotPassword}
        transparent
        animationType="slide"
        onRequestClose={() => setShowForgotPassword(false)}
      >
        <View style={styles.modalOverlay}>
          <Card variant="elevated" size="lg" style={styles.modalCard}>
            <Text style={styles.modalTitle}>Recuperar Senha</Text>
            <Text style={styles.modalSubtitle}>
              Digite seu e-mail para receber instruções de recuperação
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Seu e-mail"
              value={forgotEmail}
              onChangeText={setForgotEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                variant="outline"
                size="md"
                onPress={() => setShowForgotPassword(false)}
                style={styles.modalButton}
              />
              <Button
                title="Enviar"
                variant="primary"
                size="md"
                loading={loading}
                onPress={handleForgotPassword}
                style={styles.modalButton}
              />
            </View>
          </Card>
        </View>
      </Modal>

      {/* Modal Termos de Uso */}
      <Modal
        visible={showTerms}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTerms(false)}
      >
        <View style={styles.modalOverlay}>
          <Card variant="elevated" size="lg" style={styles.modalCard}>
            <Text style={styles.modalTitle}>Termos de Uso</Text>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalText}>
                {/* Conteúdo dos termos de uso */}
                Termos de Uso do DOM v2...
              </Text>
            </ScrollView>
            <Button
              title="Fechar"
              variant="primary"
              size="md"
              onPress={() => setShowTerms(false)}
            />
          </Card>
        </View>
      </Modal>

      {/* Modal Política de Privacidade */}
      <Modal
        visible={showPrivacy}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPrivacy(false)}
      >
        <View style={styles.modalOverlay}>
          <Card variant="elevated" size="lg" style={styles.modalCard}>
            <Text style={styles.modalTitle}>Política de Privacidade</Text>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalText}>
                {/* Conteúdo da política de privacidade */}
                Política de Privacidade do DOM v2...
              </Text>
            </ScrollView>
            <Button
              title="Fechar"
              variant="primary"
              size="md"
              onPress={() => setShowPrivacy(false)}
            />
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  content: {
    padding: Spacing.lg,
    minHeight: screenHeight,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: Spacing.sm,
  },
  logoText: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    fontFamily: Typography.families.primary,
  },
  logoSubtext: {
    fontSize: Typography.sizes.md,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    minHeight: 80,
  },
  motivationalPhrase: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loginCard: {
    marginBottom: Spacing.lg,
  },
  welcomeText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  welcomeSubtext: {
    fontSize: Typography.sizes.md,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  form: {
    gap: Spacing.md,
  },
  inputContainer: {
    gap: Spacing.xs,
  },
  inputLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: Borders.radius.md,
    padding: Spacing.md,
    fontSize: Typography.sizes.md,
    fontFamily: Typography.families.primary,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  eyeButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderLeftWidth: 0,
    borderTopRightRadius: Borders.radius.md,
    borderBottomRightRadius: Borders.radius.md,
    padding: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: Typography.sizes.md,
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  optionText: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
  },
  buttonContainer: {
    gap: Spacing.sm,
  },
  loginButton: {
    marginBottom: Spacing.sm,
  },
  biometricButton: {
    marginBottom: Spacing.sm,
  },
  forgotPassword: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontFamily: Typography.families.primary,
    textDecorationLine: 'underline',
  },
  termsCard: {
    marginBottom: Spacing.lg,
  },
  termsTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.md,
  },
  termsContainer: {
    gap: Spacing.sm,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.gray[400],
    borderRadius: Borders.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.white,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },
  termTextContainer: {
    flex: 1,
  },
  termText: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
    lineHeight: 20,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  testCard: {
    marginBottom: Spacing.xl,
  },
  testTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.sm,
  },
  testText: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    marginBottom: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.sm,
  },
  modalSubtitle: {
    fontSize: Typography.sizes.md,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    marginBottom: Spacing.lg,
  },
  modalInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: Borders.radius.md,
    padding: Spacing.md,
    fontSize: Typography.sizes.md,
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  modalButton: {
    flex: 1,
  },
  modalContent: {
    maxHeight: 300,
    marginBottom: Spacing.lg,
  },
  modalText: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
    lineHeight: 20,
  },
});

export default PremiumLoginScreen; 

/**
 * Alternativas consideradas:
 * - Alternativa A: Descrição e motivo da rejeição
 * - Alternativa B: Descrição e motivo da rejeição
 * - Solução escolhida: Justificativa da escolha atual
 */