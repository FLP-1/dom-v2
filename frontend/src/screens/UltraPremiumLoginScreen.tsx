







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




function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

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

export const UltraPremiumLoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
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
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const phoneScale = useRef(new Animated.Value(0.8)).current;
  const phraseOpacity = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  // Detectar biometria disponível
  useEffect(() => {
    detectBiometric();
    startAnimations();
    startPhraseCarousel();
  }, []);

  const detectBiometric = async () => {
    try {
      const hasBiometric = await checkBiometricAvailability();
      setBiometricAvailable(hasBiometric);
      setBiometricEnabled(hasBiometric);
    } catch (error) {
      console.log('Biometria não disponível:', error);
      setBiometricAvailable(false);
    }
  };

  const checkBiometricAvailability = async (): Promise<boolean> => {
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
      Animated.timing(phoneScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1500,
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

    try {
      const loginLog: LoginLog = {
        timestamp: new Date().toISOString(),
        cpf: cpf.replace(/\D/g, ''),
        success: false,
        ip: '127.0.0.1',
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
        
        if (rememberMe) {
          await saveUserPreferences(response.data.user);
        }

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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: Math.random() > 0.2 });
      }, 2000);
    });
  };

  const getSavedCredentials = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          cpf: '12345678901',
          password: '123456',
        });
      }, 500);
    });
  };

  const saveUserPreferences = async (user: User) => {
    try {
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
    const phrases = motivationalPhrases.EMPLOYER;
    return phrases[currentPhraseIndex];
  };

  const showHelpTooltip = (field: string) => {
    setShowTooltip(field);
    setTimeout(() => setShowTooltip(null), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Background Gradiente  */}
      <View style={styles.background}>
        <View style={styles.gradientOverlay} />
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Smartphone Frame  */}
        <Animated.View style={[styles.phoneFrame, { transform: [{ scale: phoneScale }] }]}>
          {/* Status Bar  */}
          <View style={styles.statusBar}>
            <Text style={styles.statusTime}>9:41</Text>
            <View style={styles.statusIcons}>
              <Text style={styles.statusIcon}>📶</Text>
              <Text style={styles.statusIcon}>📶</Text>
              <Text style={styles.statusIcon}>🔋</Text>
            </View>
          </View>

          {/* Phone Content  */}
          <View style={styles.phoneContent}>
            {/* Logo Animado  */}
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
              <View style={styles.logoWrapper}>
                <Text style={styles.logoEmoji}>🏠</Text>
                <View style={styles.logoGlow} />
              </View>
              <Text style={styles.logoText}>DOM v2</Text>
              <Text style={styles.logoSubtext}>Gestão Doméstica Premium</Text>
            </Animated.View>

            {/* Carrossel Motivacional  */}
            <View style={styles.carouselContainer}>
              <Animated.Text style={[styles.motivationalPhrase, { opacity: phraseOpacity }]}>
                "{getCurrentPhrase()}"
              </Animated.Text>
            </View>

            {/* Formulário de Login  */}
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
              <Text style={styles.welcomeSubtext}>Faça login para continuar</Text>

              {/* Campo CPF  */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                    editable={!loading}
                    maxLength={14}
                    onFocus={() => showHelpTooltip('cpf')}
                  />
                  <TouchableOpacity
                    style={styles.helpButton}
                    onPress={() => showHelpTooltip('cpf')}
                  >
                    <Text style={styles.helpIcon}>❓</Text>
                  </TouchableOpacity>
                </View>
                {showTooltip === 'cpf' && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      Digite seu CPF no formato: 000.000.000-00
                    </Text>
                  </View>
                )}
              </View>

              {/* Campo Senha  */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!loading}
                    onFocus={() => showHelpTooltip('password')}
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
                {showTooltip === 'password' && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      Use a senha: 123456 para teste
                    </Text>
                  </View>
                )}
              </View>

              {/* Opções de Login  */}
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.optionText}>Lembrar de mim</Text>
                </TouchableOpacity>

                {biometricAvailable && (
                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => setBiometricEnabled(!biometricEnabled)}
                  >
                    <View style={[styles.checkbox, biometricEnabled && styles.checkboxChecked]}>
                      {biometricEnabled && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.optionText}>Usar biometria</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Botões de Login  */}
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

              {/* Esqueci a Senha  */}
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => setShowForgotPassword(true)}
              >
                <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>

            {/* Termos e Privacidade  */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsTitle}>Termos e Privacidade</Text>
              
              <TouchableOpacity
                style={styles.termRow}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                  {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.termTextContainer}>
                  <Text style={styles.termText}>
                    Aceito os{' '}
                    <Text style={styles.linkText} onPress={openTerms}>
                      Termos de Uso
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.termRow}
                onPress={() => setPrivacyAccepted(!privacyAccepted)}
              >
                <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
                  {privacyAccepted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.termTextContainer}>
                  <Text style={styles.termText}>
                    Aceito a{' '}
                    <Text style={styles.linkText} onPress={openPrivacy}>
                      Política de Privacidade
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.termRow}
                onPress={() => setMarketingAccepted(!marketingAccepted)}
              >
                <View style={[styles.checkbox, marketingAccepted && styles.checkboxChecked]}>
                  {marketingAccepted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.termTextContainer}>
                  <Text style={styles.termText}>
                    Aceito receber comunicações de marketing (opcional)
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Credenciais de Teste  */}
            <View style={styles.testContainer}>
              <Text style={styles.testTitle}>Credenciais de Teste</Text>
              <Text style={styles.testText}>CPF: 12345678901 (EMPLOYER) | Senha: 123456</Text>
              <Text style={styles.testText}>CPF: 12345678902 (EMPLOYEE) | Senha: 123456</Text>
              <Text style={styles.testText}>CPF: 12345678903 (FAMILY) | Senha: 123456</Text>
              <Text style={styles.testText}>CPF: 12345678905 (ADMIN) | Senha: 123456</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Modal Esqueci a Senha  */}
      <Modal
        visible={showForgotPassword}
        transparent
        animationType="slide"
        onRequestClose={() => setShowForgotPassword(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
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
          </View>
        </View>
      </Modal>

      {/* Modal Termos de Uso  */}
      <Modal
        visible={showTerms}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTerms(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Termos de Uso</Text>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalText}>
                Termos de Uso do DOM v2...
              </Text>
            </ScrollView>
            <Button
              title="Fechar"
              variant="primary"
              size="md"
              onPress={() => setShowTerms(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Política de Privacidade  */}
      <Modal
        visible={showPrivacy}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPrivacy(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Política de Privacidade</Text>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalText}>
                Política de Privacidade do DOM v2...
              </Text>
            </ScrollView>
            <Button
              title="Fechar"
              variant="primary"
              size="md"
              onPress={() => setShowPrivacy(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isWeb
      ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #FF2D92 100%)'
      : undefined,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  phoneFrame: {
    width: isWeb ? 375 : screenWidth * 0.9,
    height: isWeb ? 812 : screenHeight * 0.9,
    backgroundColor: Colors.black,
    borderRadius: 40,
    padding: 8,
    ...Shadows.large,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.black,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  statusTime: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    fontFamily: Typography.families.primary,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  statusIcon: {
    fontSize: Typography.sizes.sm,
  },
  phoneContent: {
    flex: 1,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logoEmoji: {
    fontSize: 48,
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  logoText: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    fontFamily: Typography.families.primary,
  },
  logoSubtext: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    minHeight: 60,
  },
  motivationalPhrase: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  formContainer: {
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
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: Borders.radius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  inputIcon: {
    fontSize: Typography.sizes.md,
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.md,
    fontFamily: Typography.families.primary,
    color: Colors.gray[800],
  },
  helpButton: {
    padding: Spacing.xs,
  },
  helpIcon: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[500],
  },
  eyeButton: {
    padding: Spacing.xs,
  },
  eyeIcon: {
    fontSize: Typography.sizes.md,
  },
  tooltip: {
    backgroundColor: Colors.gray[800],
    padding: Spacing.sm,
    borderRadius: Borders.radius.md,
    marginTop: Spacing.xs,
  },
  tooltipText: {
    fontSize: Typography.sizes.xs,
    color: Colors.white,
    fontFamily: Typography.families.secondary,
  },
  optionsContainer: {
    marginBottom: Spacing.lg,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.gray[400],
    borderRadius: Borders.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
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
  optionText: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
  },
  buttonContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
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
  termsContainer: {
    marginBottom: Spacing.lg,
  },
  termsTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.sm,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  termTextContainer: {
    flex: 1,
  },
  termText: {
    fontSize: Typography.sizes.xs,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
    lineHeight: 16,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  testContainer: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: Borders.radius.md,
  },
  testTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.sm,
  },
  testText: {
    fontSize: Typography.sizes.xs,
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
    backgroundColor: Colors.white,
    borderRadius: Borders.radius.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...Shadows.large,
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
    backgroundColor: Colors.gray[50],
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

export default UltraPremiumLoginScreen; 

