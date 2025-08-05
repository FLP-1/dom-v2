







import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, Image } from 'react-native';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
  // Implementar logging, notificação, etc.
}
import { Colors, Typography, Spacing, Borders, Shadows } from './ui/DesignSystem';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const carouselOpacity = useRef(new Animated.Value(0)).current;
  
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Mensagens motivacionais para o carrossel
  const motivationalMessages = [
    "Transformando a gestão doméstica",
    "Conectando famílias e empregados",
    "Simplificando o dia a dia",
    "Organizando sua casa de forma inteligente",
    "Criando harmonia no lar"
  ];

  useEffect(() => {
    startAnimations();
    startCarousel();
    
    // Auto-navegação após 5 segundos
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const startAnimations = () => {
    // Sequência de animações
    Animated.sequence([
      // Fade in do background
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Logo aparece com escala
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Texto aparece
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Carrossel aparece
      Animated.timing(carouselOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Iniciar loading circular
      startLoadingSpinner();
    });
  };

  const startLoadingSpinner = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  const startCarousel = () => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % motivationalMessages.length
      );
    }, 3000);

    // Limpar intervalo quando componente desmontar
    return () => clearInterval(interval);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: backgroundOpacity }]}>
      {/* Background com celular sem borda  */}
      <View style={styles.background}>
        <View style={styles.phoneMockup} />
        <View style={styles.gradientOverlay} />
      </View>

      {/* Conteúdo Central  */}
      <View style={styles.content}>
        {/* Logo Animado  */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <Image 
              source={require('../../public/Logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View style={styles.logoGlow} />
          </View>
        </Animated.View>

        {/* Texto do App  */}
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
          <Text style={styles.appName}>DOM v2</Text>
          <Text style={styles.appSubtitle}>Gestão Doméstica Premium</Text>
          <Text style={styles.appVersion}>v2.0.0</Text>
        </Animated.View>

        {/* Carrossel Motivacional  */}
        <Animated.View style={[styles.carouselContainer, { opacity: carouselOpacity }]}>
          <Text style={styles.carouselText}>
            {motivationalMessages[currentMessageIndex]}
          </Text>
        </Animated.View>

        {/* Loading Circular  */}
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingSpinner, { transform: [{ rotate: spin }] }]}>
            <View style={styles.spinnerCircle} />
          </Animated.View>
          <Text style={styles.loadingText}>Preparando sua experiência...</Text>
        </View>
      </View>

      {/* Footer  */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 DOM v2 - Transformando a gestão doméstica
        </Text>
      </View>
    </Animated.View>
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
  phoneMockup: {
    position: 'absolute',
    top: '10%',
    right: '-15%',
    width: 300,
    height: 600,
    backgroundColor: '#333',
    borderRadius: 40,
    opacity: 0.1,
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
    backgroundColor: isWeb ? undefined : Colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logoContainer: {
    marginBottom: Spacing.xl,
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  logoGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  appName: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  appSubtitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.xs,
  },
  appVersion: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.normal,
    color: Colors.white,
    opacity: 0.7,
  },
  carouselContainer: {
    marginBottom: Spacing.xl,
    minHeight: 60,
    justifyContent: 'center',
  },
  carouselText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    marginBottom: Spacing.md,
  },
  spinnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: Colors.white,
  },
  loadingText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.white,
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.normal,
    color: Colors.white,
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default SplashScreen; 


Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */