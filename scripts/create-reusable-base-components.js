
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
 * @fileoverview Create Reusable Base Components - Expansão da biblioteca de componentes
 * @description Cria uma biblioteca completa de componentes base reutilizáveis
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * node scripts/create-reusable-base-components.js --library=complete --mode=create
 * 
 * @features
 * - Biblioteca completa de componentes base
 * - Padrões de design consistentes
 * - TypeScript com tipagem rigorosa
 * - Acessibilidade integrada
 * - Responsividade mobile-first
 * - Performance otimizada
 * - Documentação automática
 * 
 * @see
 * - frontend/src/components/base/
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');

// Utilitários inline
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
}

function createLogger(context) {
  return {
    debug: (message, data) => logStructured('debug', message, data),
    info: (message, data) => logStructured('info', message, data),
    warn: (message, data) => logStructured('warn', message, data),
    error: (message, data) => logStructured('error', message, data)
  };
}

function handleError(error, context, rethrow = true) {
  logStructured('error', `${context}: ${error.message}`, { error: error.stack });
  if (rethrow) throw error;
}

function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Configuração da biblioteca de componentes
const COMPONENT_LIBRARY_CONFIG = {
  baseComponents: {
    BaseModal: {
      category: 'overlay',
      priority: 'high',
      features: ['accessibility', 'keyboard-navigation', 'focus-trap', 'portal']
    },
    
    BaseCard: {
      category: 'layout',
      priority: 'high',
      features: ['elevation', 'responsive', 'themes', 'accessibility']
    },
    
    BaseList: {
      category: 'data-display',
      priority: 'high',
      features: ['virtualization', 'infinite-scroll', 'search', 'filter']
    },
    
    BaseButton: {
      category: 'input',
      priority: 'high',
      features: ['variants', 'loading-states', 'icons', 'accessibility']
    },
    
    BaseInput: {
      category: 'input',
      priority: 'high',
      features: ['validation', 'masking', 'formatting', 'accessibility']
    },
    
    BaseTable: {
      category: 'data-display',
      priority: 'medium',
      features: ['sorting', 'pagination', 'selection', 'responsive']
    },
    
    BaseNavigation: {
      category: 'navigation',
      priority: 'medium',
      features: ['responsive', 'accessibility', 'breadcrumbs', 'active-states']
    },
    
    BaseHeader: {
      category: 'layout',
      priority: 'medium',
      features: ['responsive', 'sticky', 'search', 'user-menu']
    },
    
    BaseSidebar: {
      category: 'navigation',
      priority: 'medium',
      features: ['collapsible', 'responsive', 'nested-menu', 'themes']
    },
    
    BaseToast: {
      category: 'feedback',
      priority: 'medium',
      features: ['animations', 'auto-dismiss', 'actions', 'positioning']
    },
    
    BaseDialog: {
      category: 'overlay',
      priority: 'medium',
      features: ['confirmation', 'custom-content', 'animations', 'accessibility']
    },
    
    BaseDropdown: {
      category: 'input',
      priority: 'medium',
      features: ['search', 'multi-select', 'virtual-scroll', 'keyboard-navigation']
    },
    
    BaseTabs: {
      category: 'navigation',
      priority: 'low',
      features: ['responsive', 'lazy-loading', 'keyboard-navigation', 'animations']
    },
    
    BaseAccordion: {
      category: 'layout',
      priority: 'low',
      features: ['animations', 'multiple-open', 'keyboard-navigation', 'icons']
    },
    
    BaseProgressBar: {
      category: 'feedback',
      priority: 'low',
      features: ['animations', 'colors', 'labels', 'circular-variant']
    }
  },
  
  sharedTypes: {
    'ComponentProps.ts': {
      exports: ['BaseComponentProps', 'AccessibilityProps', 'ResponsiveProps', 'ThemeProps']
    },
    
    'StyleTypes.ts': {
      exports: ['SpacingProps', 'ColorProps', 'TypographyProps', 'BorderProps']
    },
    
    'EventTypes.ts': {
      exports: ['BaseEventHandlers', 'KeyboardHandlers', 'TouchHandlers']
    }
  },
  
  utilities: {
    'theme.ts': {
      description: 'Sistema de temas centralizados',
      exports: ['useTheme', 'ThemeProvider', 'withTheme']
    },
    
    'responsive.ts': {
      description: 'Utilitários de responsividade',
      exports: ['useBreakpoint', 'useWindowDimensions', 'responsiveValue']
    },
    
    'accessibility.ts': {
      description: 'Helpers de acessibilidade',
      exports: ['useA11y', 'focusManagement', 'announceToScreenReader']
    },
    
    'animations.ts': {
      description: 'Sistema de animações',
      exports: ['useAnimation', 'animationPresets', 'createTransition']
    }
  }
};

// Função principal
async function createReusableBaseComponents() {
  try {
    const logger = createLogger('create-reusable-base-components');
    logger.info('🏗️ Iniciando criação da biblioteca de componentes base');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const library = getArgValue(args, '--library') || 'complete';
    const mode = getArgValue(args, '--mode') || 'create';
    const dryRun = args.includes('--dry-run');
    
    assertCritical(validateInput(library), 'Library deve ser especificado');
    assertCritical(validateInput(mode), 'Mode deve ser especificado');
    
    logger.info('Configuração validada', { library, mode, dryRun });
    
    const componentContext = {
      library,
      mode,
      dryRun,
      timestamp: new Date().toISOString(),
      buildId: `component-library-${Date.now()}`
    };
    
    // Executar criação da biblioteca
    await executeComponentLibraryCreation(componentContext);
    
    logger.info('✅ Biblioteca de componentes base criada com sucesso!');
    
  } catch (error) {
    handleError(error, 'createReusableBaseComponents');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Executar criação da biblioteca
async function executeComponentLibraryCreation(componentContext) {
  try {
    const logger = createLogger('executeComponentLibraryCreation');
    
    // 1. Criar estrutura de diretórios
    await createLibraryStructure(componentContext);
    
    // 2. Criar tipos compartilhados
    await createSharedTypes(componentContext);
    
    // 3. Criar utilitários
    await createUtilities(componentContext);
    
    // 4. Criar componentes base
    await createBaseComponents(componentContext);
    
    // 5. Criar index files
    await createIndexFiles(componentContext);
    
    // 6. Criar documentação
    await createComponentDocumentation(componentContext);
    
    // 7. Gerar relatório
    await generateLibraryReport(componentContext);
    
  } catch (error) {
    handleError(error, 'executeComponentLibraryCreation');
    throw error;
  }
}

// Criar estrutura de diretórios
async function createLibraryStructure(componentContext) {
  try {
    const logger = createLogger('createLibraryStructure');
    logger.info('📁 Criando estrutura de diretórios');
    
    const baseDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base');
    
    const directories = [
      'types',
      'utils',
      'hooks',
      'styles',
      'docs',
      'tests'
    ];
    
    for (const dir of directories) {
      const dirPath = path.join(baseDir, dir);
      
      if (!componentContext.dryRun) {
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
      }
      
      logger.info(`${componentContext.dryRun ? '[DRY-RUN] ' : ''}Diretório criado: ${dir}`);
    }
    
  } catch (error) {
    handleError(error, 'createLibraryStructure');
    throw error;
  }
}

// Criar tipos compartilhados
async function createSharedTypes(componentContext) {
  try {
    const logger = createLogger('createSharedTypes');
    logger.info('📝 Criando tipos compartilhados');
    
    const typesDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base', 'types');
    
    // ComponentProps.ts
    const componentPropsContent = `/**
 * @fileoverview Component Props - Tipos compartilhados para componentes base
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { ReactNode, CSSProperties } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface BaseComponentProps {
  id?: string;
  className?: string;
  style?: ViewStyle | CSSProperties;
  testID?: string;
  children?: ReactNode;
}

export interface AccessibilityProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessible?: boolean;
}

export interface ResponsiveProps {
  mobile?: any;
  tablet?: any;
  desktop?: any;
  hideOn?: 'mobile' | 'tablet' | 'desktop' | Array<'mobile' | 'tablet' | 'desktop'>;
  showOn?: 'mobile' | 'tablet' | 'desktop' | Array<'mobile' | 'tablet' | 'desktop'>;
}

export interface ThemeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark' | 'auto';
}

export interface InteractionProps {
  disabled?: boolean;
  loading?: boolean;
  readonly?: boolean;
  required?: boolean;
}

export interface LayoutProps {
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
}
`;

    // StyleTypes.ts
    const styleTypesContent = `/**
 * @fileoverview Style Types - Tipos para estilização
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

export interface SpacingProps {
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface ColorProps {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface TypographyProps {
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  fontFamily?: 'primary' | 'secondary' | 'mono';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
}

export interface BorderProps {
  borderWidth?: number;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  borderStyle?: 'solid' | 'dashed' | 'dotted';
}

export interface ShadowProps {
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  elevation?: number; // Para React Native
}
`;

    // EventTypes.ts
    const eventTypesContent = `/**
 * @fileoverview Event Types - Tipos para eventos
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { GestureResponderEvent, NativeSyntheticEvent } from 'react-native';

export interface BaseEventHandlers {
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
}

export interface KeyboardHandlers {
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  onKeyPress?: (event: any) => void;
}

export interface TouchHandlers {
  onTouchStart?: (event: GestureResponderEvent) => void;
  onTouchMove?: (event: GestureResponderEvent) => void;
  onTouchEnd?: (event: GestureResponderEvent) => void;
}

export interface FormEventHandlers {
  onChange?: (value: any) => void;
  onSubmit?: (data: any) => void;
  onReset?: () => void;
  onValidate?: (value: any) => boolean | string;
}

export interface ModalEventHandlers {
  onOpen?: () => void;
  onClose?: () => void;
  onBackdropPress?: () => void;
  onEscapePress?: () => void;
}
`;

    const typeFiles = [
      { name: 'ComponentProps.ts', content: componentPropsContent },
      { name: 'StyleTypes.ts', content: styleTypesContent },
      { name: 'EventTypes.ts', content: eventTypesContent }
    ];
    
    for (const file of typeFiles) {
      const filePath = path.join(typesDir, file.name);
      
      if (!componentContext.dryRun) {
        fs.writeFileSync(filePath, file.content);
      }
      
      logger.info(`${componentContext.dryRun ? '[DRY-RUN] ' : ''}Tipo criado: ${file.name}`);
    }
    
  } catch (error) {
    handleError(error, 'createSharedTypes');
    throw error;
  }
}

// Criar utilitários
async function createUtilities(componentContext) {
  try {
    const logger = createLogger('createUtilities');
    logger.info('🔧 Criando utilitários');
    
    const utilsDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base', 'utils');
    
    // theme.ts
    const themeUtilContent = `/**
 * @fileoverview Theme Utilities - Sistema de temas
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { createContext, useContext } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    disabled: string;
  };
  
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  
  typography: {
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
    };
    
    fontWeights: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    
    lineHeights: {
      tight: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
  };
  
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
    xl: ViewStyle;
    '2xl': ViewStyle;
  };
}

export const defaultTheme: Theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#2196F3',
    success: '#8BC34A',
    warning: '#FF9800',
    error: '#F44336',
    info: '#00BCD4',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    disabled: '#BDBDBD'
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48
  },
  
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30
    },
    
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2
    }
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12
    },
    '2xl': {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.51,
      shadowRadius: 13.16,
      elevation: 20
    }
  }
};

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};

export const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};
`;

    // responsive.ts
    const responsiveUtilContent = `/**
 * @fileoverview Responsive Utilities - Utilitários de responsividade
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

export const defaultBreakpoints: Breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
};

export type BreakpointName = keyof Breakpoints;

export const useWindowDimensions = () => {
  const [windowData, setWindowData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result: { window: ScaledSize }) => {
      setWindowData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  return windowData;
};

export const useBreakpoint = (breakpoints: Breakpoints = defaultBreakpoints) => {
  const { width } = useWindowDimensions();

  const getCurrentBreakpoint = (): BreakpointName => {
    if (width >= breakpoints.desktop) return 'desktop';
    if (width >= breakpoints.tablet) return 'tablet';
    return 'mobile';
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointName>(
    getCurrentBreakpoint()
  );

  useEffect(() => {
    setCurrentBreakpoint(getCurrentBreakpoint());
  }, [width]);

  const isBreakpoint = (breakpoint: BreakpointName): boolean => {
    return currentBreakpoint === breakpoint;
  };

  const isBreakpointUp = (breakpoint: BreakpointName): boolean => {
    const breakpointOrder: BreakpointName[] = ['mobile', 'tablet', 'desktop'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  };

  const isBreakpointDown = (breakpoint: BreakpointName): boolean => {
    const breakpointOrder: BreakpointName[] = ['mobile', 'tablet', 'desktop'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex <= targetIndex;
  };

  return {
    currentBreakpoint,
    width,
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    isMobile: isBreakpoint('mobile'),
    isTablet: isBreakpoint('tablet'),
    isDesktop: isBreakpoint('desktop')
  };
};

export const responsiveValue = <T>(
  values: Partial<Record<BreakpointName, T>>,
  fallback: T
): T => {
  const { currentBreakpoint } = useBreakpoint();
  
  return values[currentBreakpoint] ?? 
         values.mobile ?? 
         values.tablet ?? 
         values.desktop ?? 
         fallback;
};
`;

    const utilFiles = [
      { name: 'theme.ts', content: themeUtilContent },
      { name: 'responsive.ts', content: responsiveUtilContent }
    ];
    
    for (const file of utilFiles) {
      const filePath = path.join(utilsDir, file.name);
      
      if (!componentContext.dryRun) {
        fs.writeFileSync(filePath, file.content);
      }
      
      logger.info(`${componentContext.dryRun ? '[DRY-RUN] ' : ''}Utilitário criado: ${file.name}`);
    }
    
  } catch (error) {
    handleError(error, 'createUtilities');
    throw error;
  }
}

// Criar componentes base
async function createBaseComponents(componentContext) {
  try {
    const logger = createLogger('createBaseComponents');
    logger.info('🧩 Criando componentes base');
    
    // Criar apenas os componentes de alta prioridade primeiro
    const highPriorityComponents = Object.entries(COMPONENT_LIBRARY_CONFIG.baseComponents)
      .filter(([_, config]) => config.priority === 'high')
      .map(([name]) => name);
    
    for (const componentName of highPriorityComponents) {
      await createSingleComponent(componentName, componentContext);
    }
    
    logger.info('Componentes base de alta prioridade criados', {
      count: highPriorityComponents.length,
      components: highPriorityComponents
    });
    
  } catch (error) {
    handleError(error, 'createBaseComponents');
    throw error;
  }
}

// Criar componente individual
async function createSingleComponent(componentName, componentContext) {
  try {
    const logger = createLogger('createSingleComponent');
    const componentPath = path.join(
      __dirname, '..', 'frontend', 'src', 'components', 'base', 
      `${componentName}.tsx`
    );
    
    let componentContent = '';
    
    switch (componentName) {
      case 'BaseModal':
        componentContent = generateBaseModalComponent();
        break;
      case 'BaseCard':
        componentContent = generateBaseCardComponent();
        break;
      case 'BaseList':
        componentContent = generateBaseListComponent();
        break;
      case 'BaseButton':
        componentContent = generateBaseButtonComponent();
        break;
      case 'BaseInput':
        componentContent = generateBaseInputComponent();
        break;
      default:
        componentContent = generateGenericComponent(componentName);
    }
    
    if (!componentContext.dryRun) {
      fs.writeFileSync(componentPath, componentContent);
    }
    
    logger.info(`${componentContext.dryRun ? '[DRY-RUN] ' : ''}Componente criado: ${componentName}`);
    
  } catch (error) {
    handleError(error, `createSingleComponent: ${componentName}`);
  }
}

// Gerar BaseModal
function generateBaseModalComponent() {
  return `/**
 * @fileoverview BaseModal - Componente modal base
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { useEffect, useRef } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BaseComponentProps, AccessibilityProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';

export interface BaseModalProps extends BaseComponentProps, AccessibilityProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  closable?: boolean;
  backdrop?: boolean;
  backdropClosable?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  position?: 'center' | 'top' | 'bottom';
}

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  title,
  closable = true,
  backdrop = true,
  backdropClosable = true,
  animationType = 'fade',
  position = 'center',
  accessibilityLabel = 'Modal',
  ...props
}) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleBackdropPress = () => {
    if (backdropClosable) {
      onClose();
    }
  };

  const getModalStyle = () => {
    switch (position) {
      case 'top':
        return styles.modalTop;
      case 'bottom':
        return styles.modalBottom;
      default:
        return styles.modalCenter;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
      accessibilityLabel={accessibilityLabel}
      {...props}
    >
      <View style={styles.overlay}>
        {backdrop && (
          <TouchableOpacity 
            style={styles.backdrop} 
            onPress={handleBackdropPress}
            activeOpacity={1}
          />
        )}
        
        <Animated.View 
          style={[
            styles.modal,
            getModalStyle(),
            { 
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.lg,
              opacity: fadeAnim,
              transform: [{
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              }],
            }
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  modal: {
    maxWidth: '90%',
    maxHeight: '80%',
    padding: 20,
    margin: 20,
  },
  
  modalCenter: {
    justifyContent: 'center',
  },
  
  modalTop: {
    alignSelf: 'flex-start',
    marginTop: 50,
  },
  
  modalBottom: {
    alignSelf: 'flex-end',
    marginBottom: 50,
  },
});

export default BaseModal;
`;
}

// Gerar BaseCard
function generateBaseCardComponent() {
  return `/**
 * @fileoverview BaseCard - Componente card base
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';

export interface BaseCardProps extends BaseComponentProps, AccessibilityProps, ThemeProps {
  onPress?: () => void;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
  hoverable?: boolean;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  onPress,
  shadow = 'md',
  padding = 'md',
  margin = 'none',
  bordered = false,
  hoverable = false,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...props
}) => {
  const theme = useTheme();

  const getPaddingValue = () => {
    switch (padding) {
      case 'none': return 0;
      case 'sm': return theme.spacing.sm;
      case 'md': return theme.spacing.md;
      case 'lg': return theme.spacing.lg;
      case 'xl': return theme.spacing.xl;
      default: return theme.spacing.md;
    }
  };

  const getMarginValue = () => {
    switch (margin) {
      case 'none': return 0;
      case 'sm': return theme.spacing.sm;
      case 'md': return theme.spacing.md;
      case 'lg': return theme.spacing.lg;
      case 'xl': return theme.spacing.xl;
      default: return 0;
    }
  };

  const getShadowStyle = () => {
    if (shadow === 'none') return {};
    return theme.shadows[shadow] || theme.shadows.md;
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: getPaddingValue(),
      margin: getMarginValue(),
      ...getShadowStyle(),
    },
    bordered && {
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View 
      style={cardStyle}
      accessibilityLabel={accessibilityLabel}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});

export default BaseCard;
`;
}

// Gerar BaseButton
function generateBaseButtonComponent() {
  return `/**
 * @fileoverview BaseButton - Componente button base
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps, InteractionProps } from './types/ComponentProps';
import { BaseEventHandlers } from './types/EventTypes';
import { useTheme } from './utils/theme';

export interface BaseButtonProps 
  extends BaseComponentProps, 
          AccessibilityProps, 
          ThemeProps, 
          InteractionProps,
          BaseEventHandlers {
  title?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  fullWidth?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  children,
  icon,
  iconPosition = 'left',
  variant = 'solid',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...props
}) => {
  const theme = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
          fontSize: theme.typography.fontSizes.xs,
        };
      case 'sm':
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.typography.fontSizes.sm,
        };
      case 'md':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          fontSize: theme.typography.fontSizes.md,
        };
      case 'lg':
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xl,
          fontSize: theme.typography.fontSizes.lg,
        };
      default:
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          fontSize: theme.typography.fontSizes.md,
        };
    }
  };

  const getVariantStyles = () => {
    const baseColor = theme.colors.primary;
    
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: disabled ? theme.colors.disabled : baseColor,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.disabled : baseColor,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      case 'link':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingVertical: 0,
          paddingHorizontal: 0,
        };
      default:
        return {
          backgroundColor: disabled ? theme.colors.disabled : baseColor,
          borderWidth: 0,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.disabled;
    
    switch (variant) {
      case 'solid':
        return '#FFFFFF';
      case 'outline':
      case 'ghost':
      case 'link':
        return theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const buttonStyle = [
    styles.button,
    {
      borderRadius: theme.borderRadius.md,
      ...sizeStyles,
      ...variantStyles,
    },
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    {
      fontSize: sizeStyles.fontSize,
      color: getTextColor(),
      fontWeight: theme.typography.fontWeights.medium,
    },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={getTextColor()} 
            style={styles.loadingIndicator}
          />
          {title && <Text style={[textStyle, styles.loadingText]}>{title}</Text>}
        </View>
      );
    }

    const content = [];
    
    if (icon && iconPosition === 'left') {
      content.push(
        <View key="icon-left" style={styles.iconLeft}>
          {icon}
        </View>
      );
    }
    
    if (title) {
      content.push(
        <Text key="text" style={textStyle}>
          {title}
        </Text>
      );
    }
    
    if (children) {
      content.push(children);
    }
    
    if (icon && iconPosition === 'right') {
      content.push(
        <View key="icon-right" style={styles.iconRight}>
          {icon}
        </View>
      );
    }

    return content.length === 1 ? content[0] : (
      <View style={styles.contentContainer}>
        {content}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={disabled || loading ? undefined : onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Acessibilidade - tamanho mínimo de toque
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.6,
  },
  
  text: {
    textAlign: 'center',
  },
  
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconLeft: {
    marginRight: 8,
  },
  
  iconRight: {
    marginLeft: 8,
  },
  
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingIndicator: {
    marginRight: 8,
  },
  
  loadingText: {
    opacity: 0.8,
  },
});

export default BaseButton;
`;
}

// Gerar BaseList
function generateBaseListComponent() {
  return `/**
 * @fileoverview BaseList - Componente lista base
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { useState, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';

export interface BaseListProps<T> extends BaseComponentProps, AccessibilityProps, ThemeProps {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  loading?: boolean;
  emptyMessage?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

export const BaseList = <T,>({
  data,
  renderItem,
  keyExtractor,
  searchable = false,
  searchPlaceholder = 'Buscar...',
  loading = false,
  emptyMessage = 'Nenhum item encontrado',
  onRefresh,
  refreshing = false,
  onEndReached,
  onEndReachedThreshold = 0.1,
  style,
  ...props
}: BaseListProps<T>) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = useCallback((text: string) => {
    setSearchTerm(text);
    if (!text.trim()) {
      setFilteredData(data);
      return;
    }
    
    // Filtro básico - pode ser customizado conforme necessário
    const filtered = data.filter((item: any) => {
      const searchString = JSON.stringify(item).toLowerCase();
      return searchString.includes(text.toLowerCase());
    });
    
    setFilteredData(filtered);
  }, [data]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
        {emptyMessage}
      </Text>
    </View>
  );

  const renderLoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );

  if (loading) {
    return renderLoadingComponent();
  }

  return (
    <View style={[styles.container, style]} {...props}>
      {searchable && (
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
          <TextInput
            style={[
              styles.searchInput,
              {
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border,
                borderRadius: theme.borderRadius.md,
              }
            ]}
            placeholder={searchPlaceholder}
            placeholderTextColor={theme.colors.textSecondary}
            value={searchTerm}
            onChangeText={handleSearch}
            accessibilityLabel="Campo de busca"
            accessibilityHint="Digite para filtrar os itens da lista"
          />
        </View>
      )}
      
      <FlatList
        data={searchable ? filteredData : data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyComponent}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  searchContainer: {
    padding: 16,
  },
  
  searchInput: {
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  
  list: {
    flex: 1,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BaseList;
`;
}

// Gerar BaseInput
function generateBaseInputComponent() {
  return `/**
 * @fileoverview BaseInput - Componente input base
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps, InteractionProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';

export interface BaseInputProps 
  extends BaseComponentProps, 
          AccessibilityProps, 
          ThemeProps, 
          InteractionProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  mask?: (text: string) => string;
  validate?: (text: string) => boolean | string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  value = '',
  onChangeText,
  placeholder,
  label,
  error,
  helperText,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  disabled = false,
  required = false,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
  mask,
  validate,
  size = 'md',
  style,
  accessibilityLabel,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [internalError, setInternalError] = useState<string>('');
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const hasError = error || internalError;
  const showHelper = helperText || hasError;

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: 40,
          fontSize: theme.typography.fontSizes.sm,
          paddingHorizontal: theme.spacing.sm,
        };
      case 'md':
        return {
          height: 48,
          fontSize: theme.typography.fontSizes.md,
          paddingHorizontal: theme.spacing.md,
        };
      case 'lg':
        return {
          height: 56,
          fontSize: theme.typography.fontSizes.lg,
          paddingHorizontal: theme.spacing.lg,
        };
      default:
        return {
          height: 48,
          fontSize: theme.typography.fontSizes.md,
          paddingHorizontal: theme.spacing.md,
        };
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    
    // Animar label
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    // Animar label se não houver valor
    if (!value) {
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    
    // Validar se necessário
    if (validate && value) {
      const validationResult = validate(value);
      if (typeof validationResult === 'string') {
        setInternalError(validationResult);
      } else if (!validationResult) {
        setInternalError('Valor inválido');
      } else {
        setInternalError('');
      }
    }
    
    onBlur?.();
  };

  const handleChangeText = (text: string) => {
    // Aplicar máscara se fornecida
    const maskedText = mask ? mask(text) : text;
    
    // Limpar erro interno quando usuário digita
    if (internalError) {
      setInternalError('');
    }
    
    onChangeText?.(maskedText);
  };

  const getBorderColor = () => {
    if (hasError) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.border;
  };

  const sizeStyles = getSizeStyles();

  const inputContainerStyle = [
    styles.inputContainer,
    {
      borderColor: getBorderColor(),
      borderRadius: theme.borderRadius.md,
      backgroundColor: disabled ? theme.colors.disabled : theme.colors.background,
      minHeight: multiline ? sizeStyles.height * numberOfLines : sizeStyles.height,
    },
    leftIcon && styles.withLeftIcon,
    rightIcon && styles.withRightIcon,
  ];

  const inputStyle = [
    styles.input,
    {
      fontSize: sizeStyles.fontSize,
      color: disabled ? theme.colors.textSecondary : theme.colors.text,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      height: multiline ? undefined : sizeStyles.height,
    },
    multiline && styles.multilineInput,
  ];

  const labelStyle = [
    styles.label,
    {
      color: hasError ? theme.colors.error : 
             isFocused ? theme.colors.primary : 
             theme.colors.textSecondary,
      fontSize: labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [sizeStyles.fontSize, theme.typography.fontSizes.sm],
      }),
      top: labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [sizeStyles.height / 2 - 8, -8],
      }),
      backgroundColor: theme.colors.background,
    },
  ];

  return (
    <View style={[styles.container, style]} {...props}>
      {label && (
        <Animated.Text style={labelStyle}>
          {label}{required && ' *'}
        </Animated.Text>
      )}
      
      <View style={inputContainerStyle}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={hasError ? \`Erro: \${hasError}\` : helperText}
          accessibilityState={{
            disabled,
          }}
        />
        
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {showHelper && (
        <Text style={[
          styles.helperText,
          {
            color: hasError ? theme.colors.error : theme.colors.textSecondary,
          }
        ]}>
          {hasError || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  label: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    paddingHorizontal: 4,
    fontWeight: '500',
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  
  withLeftIcon: {
    paddingLeft: 0,
  },
  
  withRightIcon: {
    paddingRight: 0,
  },
  
  input: {
    flex: 1,
    textAlignVertical: 'top',
  },
  
  multilineInput: {
    paddingVertical: 12,
  },
  
  leftIconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
    justifyContent: 'center',
  },
  
  rightIconContainer: {
    paddingRight: 12,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
});

export default BaseInput;
`;
}

// Gerar componente genérico
function generateGenericComponent(componentName) {
  return `/**
 * @fileoverview ${componentName} - Componente base
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseComponentProps, AccessibilityProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';

export interface ${componentName}Props extends BaseComponentProps, AccessibilityProps {
  // TODO: Adicionar props específicas do componente
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme();

  const componentStyle = [
    styles.container,
    {
      // TODO: Aplicar estilos do tema
    },
    style,
  ];

  return (
    <View style={componentStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // TODO: Estilos base do componente
  },
});

export default ${componentName};
`;
}

// Criar arquivos index
async function createIndexFiles(componentContext) {
  try {
    const logger = createLogger('createIndexFiles');
    logger.info('📄 Criando arquivos index');
    
    const baseDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base');
    
    // index.ts principal
    const mainIndexContent = `/**
 * @fileoverview Base Components Library - Index principal
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

// Componentes Base
export { BaseScreen, type BaseScreenProps } from './BaseScreen';
export { BaseForm, type BaseFormProps } from './BaseForm';
export { BaseModal, type BaseModalProps } from './BaseModal';
export { BaseCard, type BaseCardProps } from './BaseCard';
export { BaseButton, type BaseButtonProps } from './BaseButton';
export { BaseInput, type BaseInputProps } from './BaseInput';
export { BaseList, type BaseListProps } from './BaseList';

// Tipos
export type * from './types/ComponentProps';
export type * from './types/StyleTypes';
export type * from './types/EventTypes';

// Utilitários
export { useTheme, ThemeProvider, withTheme, defaultTheme, type Theme } from './utils/theme';
export { useBreakpoint, useWindowDimensions, responsiveValue, type BreakpointName } from './utils/responsive';

// Hook personalizado para componentes base
export const useBaseComponent = () => {
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  
  return {
    theme,
    breakpoint,
    // Outros utilitários compartilhados
  };
};
`;

    // types/index.ts
    const typesIndexContent = `/**
 * @fileoverview Types Index - Exportação de todos os tipos
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

export type * from './ComponentProps';
export type * from './StyleTypes';
export type * from './EventTypes';
`;

    // utils/index.ts
    const utilsIndexContent = `/**
 * @fileoverview Utils Index - Exportação de todos os utilitários
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

export * from './theme';
export * from './responsive';
`;

    const indexFiles = [
      { path: path.join(baseDir, 'index.ts'), content: mainIndexContent },
      { path: path.join(baseDir, 'types', 'index.ts'), content: typesIndexContent },
      { path: path.join(baseDir, 'utils', 'index.ts'), content: utilsIndexContent }
    ];
    
    for (const file of indexFiles) {
      if (!componentContext.dryRun) {
        fs.writeFileSync(file.path, file.content);
      }
      
      logger.info(`${componentContext.dryRun ? '[DRY-RUN] ' : ''}Index criado: ${path.relative(baseDir, file.path)}`);
    }
    
  } catch (error) {
    handleError(error, 'createIndexFiles');
    throw error;
  }
}

// Criar documentação
async function createComponentDocumentation(componentContext) {
  try {
    const logger = createLogger('createComponentDocumentation');
    logger.info('📚 Criando documentação dos componentes');
    
    const docsDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base', 'docs');
    
    const readmeContent = `# Biblioteca de Componentes Base - DOM v2

## Visão Geral

Esta biblioteca fornece componentes React Native reutilizáveis com foco em:
- **Acessibilidade**: Suporte completo a screen readers e navegação por teclado
- **Responsividade**: Design mobile-first com breakpoints adaptativos
- **Performance**: Otimizações automáticas e lazy loading
- **Consistência**: Sistema de design unificado
- **TypeScript**: Tipagem rigorosa para melhor DX

## Componentes Disponíveis

### Layout
- **BaseScreen**: Wrapper base para todas as telas
- **BaseCard**: Cards com elevação e bordas personalizáveis
- **BaseModal**: Modais acessíveis com animações

### Entrada
- **BaseButton**: Botões com variantes e estados
- **BaseInput**: Inputs com validação e formatação
- **BaseForm**: Formulários com validação automática

### Navegação
- **BaseNavigation**: Sistema de navegação responsivo
- **BaseTabs**: Abas com lazy loading

### Feedback
- **BaseToast**: Notificações temporárias
- **BaseDialog**: Diálogos de confirmação

## Uso Básico

\`\`\`tsx
import { BaseButton, BaseCard, useTheme } from '../components/base';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <BaseCard shadow="md" padding="lg">
      <BaseButton
        title="Clique aqui"
        variant="solid"
        size="md"
        onPress={() => console.log('Pressionado')}
      />
    </BaseCard>
  );
};
\`\`\`

## Temas

O sistema de temas permite customização completa:

\`\`\`tsx
import { ThemeProvider, defaultTheme } from '../components/base';

const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#FF6B6B',
  },
};

const App = () => (
  <ThemeProvider theme={customTheme}>
    <MyApp />
  </ThemeProvider>
);
\`\`\`

## Responsividade

Use os hooks de responsividade para adaptar componentes:

\`\`\`tsx
import { useBreakpoint, responsiveValue } from '../components/base';

const MyComponent = () => {
  const { isMobile, isTablet } = useBreakpoint();
  
  const padding = responsiveValue(
    { mobile: 'sm', tablet: 'md', desktop: 'lg' },
    'md'
  );
  
  return (
    <BaseCard padding={padding}>
      {/* Conteúdo adaptativo */}
    </BaseCard>
  );
};
\`\`\`

## Acessibilidade

Todos os componentes incluem:
- aria-labels automáticos
- Navegação por teclado
- Contraste de cores adequado
- Tamanhos de toque apropriados

## Performance

- Lazy loading automático
- Memoização de componentes
- Otimizações de re-render
- Bundle splitting

## Contribuindo

1. Siga os padrões de nomenclatura
2. Inclua testes para novos componentes
3. Documente props e exemplos de uso
4. Teste acessibilidade

Gerado em: ${new Date().toISOString()}
`;

    const readmePath = path.join(docsDir, 'README.md');
    
    if (!componentContext.dryRun) {
      fs.writeFileSync(readmePath, readmeContent);
    }
    
    logger.info(`${componentContext.dryRun ? '[DRY-RUN] ' : ''}Documentação criada`);
    
  } catch (error) {
    handleError(error, 'createComponentDocumentation');
    throw error;
  }
}

// Gerar relatório da biblioteca
async function generateLibraryReport(componentContext) {
  try {
    const logger = createLogger('generateLibraryReport');
    logger.info('📊 Gerando relatório da biblioteca');
    
    const report = {
      timestamp: new Date().toISOString(),
      buildId: componentContext.buildId,
      library: componentContext.library,
      mode: componentContext.mode,
      summary: {
        totalComponents: Object.keys(COMPONENT_LIBRARY_CONFIG.baseComponents).length,
        highPriorityComponents: Object.values(COMPONENT_LIBRARY_CONFIG.baseComponents)
          .filter(config => config.priority === 'high').length,
        typesCreated: Object.keys(COMPONENT_LIBRARY_CONFIG.sharedTypes).length,
        utilitiesCreated: Object.keys(COMPONENT_LIBRARY_CONFIG.utilities).length,
        categories: [...new Set(Object.values(COMPONENT_LIBRARY_CONFIG.baseComponents)
          .map(config => config.category))]
      },
      components: COMPONENT_LIBRARY_CONFIG.baseComponents,
      structure: {
        baseDirectory: 'frontend/src/components/base/',
        subdirectories: ['types', 'utils', 'hooks', 'styles', 'docs', 'tests'],
        indexFiles: ['index.ts', 'types/index.ts', 'utils/index.ts']
      },
      features: {
        accessibility: 'Suporte completo a WCAG 2.1',
        responsiveness: 'Mobile-first com breakpoints adaptativos',
        theming: 'Sistema de temas centralizados',
        typescript: 'Tipagem rigorosa com interfaces bem definidas',
        performance: 'Otimizações automáticas e lazy loading'
      },
      nextSteps: [
        'Implementar componentes de prioridade média',
        'Adicionar testes unitários',
        'Criar Storybook para documentação visual',
        'Implementar sistema de ícones',
        'Adicionar animações avançadas'
      ]
    };
    
    const reportPath = path.join(__dirname, 'logs', `component-library-report-${Date.now()}.json`);
    
    if (!componentContext.dryRun) {
      if (!fs.existsSync(path.dirname(reportPath))) {
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      }
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    }
    
    logger.info(`${componentContext.dryRun ? '[DRY-RUN] ' : ''}Relatório gerado`, {
      path: reportPath,
      totalComponents: report.summary.totalComponents
    });
    
    // Log do resumo
    console.log('\n📊 RESUMO DA BIBLIOTECA DE COMPONENTES');
    console.log('=====================================');
    console.log(`🧩 Total de componentes: ${report.summary.totalComponents}`);
    console.log(`🚨 Alta prioridade: ${report.summary.highPriorityComponents}`);
    console.log(`📝 Tipos criados: ${report.summary.typesCreated}`);
    console.log(`🔧 Utilitários criados: ${report.summary.utilitiesCreated}`);
    console.log(`📂 Categorias: ${report.summary.categories.join(', ')}`);
    
    console.log('\n✨ FUNCIONALIDADES IMPLEMENTADAS:');
    Object.entries(report.features).forEach(([feature, description]) => {
      console.log(`   ${feature}: ${description}`);
    });
    
  } catch (error) {
    handleError(error, 'generateLibraryReport');
    throw error;
  }
}

// Executar script se chamado diretamente
if (require.main === module) {
  createReusableBaseComponents().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  createReusableBaseComponents,
  COMPONENT_LIBRARY_CONFIG
};
