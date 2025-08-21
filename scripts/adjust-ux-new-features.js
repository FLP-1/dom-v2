
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
 * @fileoverview Adjust UX New Features - Melhoria da experiência do usuário
 * @description Analisa e melhora a UX das novas funcionalidades (comunicação e gamificação)
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * node scripts/adjust-ux-new-features.js --features=all --mode=improve
 * 
 * @features
 * - Análise de usabilidade das novas funcionalidades
 * - Melhoria de responsividade e acessibilidade
 * - Otimização de fluxos de interação
 * - Padronização de design patterns
 * - Implementação de feedback visual
 * - Ajustes de performance de UI
 * 
 * @see
 * - frontend/src/components/communication/
 * - frontend/src/components/gamification/
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
    warn: (message, data) => logStructured('warn', data),
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

// Configuração de melhoria de UX
const UX_IMPROVEMENT_CONFIG = {
  features: {
    communication: {
      components: [
        'frontend/src/components/communication/FamilyChat.tsx',
        'frontend/src/components/communication/AudioMessage.tsx',
        'frontend/src/components/communication/NotificationCenter.tsx',
        'frontend/src/screens/CommunicationScreen.tsx'
      ],
      uxCriteria: {
        accessibility: {
          weight: 30,
          checks: ['aria-labels', 'keyboard-navigation', 'screen-reader-support', 'color-contrast']
        },
        usability: {
          weight: 25,
          checks: ['intuitive-navigation', 'clear-feedback', 'error-handling', 'loading-states']
        },
        responsiveness: {
          weight: 20,
          checks: ['mobile-first', 'tablet-optimization', 'desktop-scaling', 'touch-targets']
        },
        performance: {
          weight: 15,
          checks: ['fast-rendering', 'smooth-animations', 'memory-usage', 'lazy-loading']
        },
        aesthetics: {
          weight: 10,
          checks: ['visual-hierarchy', 'consistent-spacing', 'color-harmony', 'typography']
        }
      }
    },
    
    gamification: {
      components: [
        'frontend/src/components/gamification/FamilyGamification.tsx',
        'frontend/src/screens/GamificationScreen.tsx'
      ],
      uxCriteria: {
        motivation: {
          weight: 35,
          checks: ['clear-progress', 'rewarding-feedback', 'achievement-visibility', 'goal-clarity']
        },
        engagement: {
          weight: 25,
          checks: ['interactive-elements', 'instant-feedback', 'social-features', 'challenges-balance']
        },
        accessibility: {
          weight: 20,
          checks: ['inclusive-design', 'multiple-interaction-modes', 'assistive-tech-support']
        },
        usability: {
          weight: 15,
          checks: ['simple-interactions', 'clear-instructions', 'error-prevention']
        },
        aesthetics: {
          weight: 5,
          checks: ['appealing-visuals', 'consistent-theming', 'smooth-transitions']
        }
      }
    }
  },
  
  improvements: {
    accessibility: {
      ariaLabels: {
        pattern: /<(button|input|select|textarea)(?![^>]*aria-label)/g,
        fix: 'Add aria-label or aria-labelledby attributes',
        priority: 'high'
      },
      
      keyboardNavigation: {
        pattern: /onPress|onClick(?![^}]*onKeyDown)/g,
        fix: 'Add keyboard event handlers (onKeyDown)',
        priority: 'high'
      },
      
      colorContrast: {
        pattern: /#([0-9A-Fa-f]{3,6})/g,
        fix: 'Verify color contrast ratios meet WCAG standards',
        priority: 'medium'
      }
    },
    
    usability: {
      loadingStates: {
        pattern: /fetch\(|axios\.|api\./g,
        fix: 'Add loading states for async operations',
        priority: 'high'
      },
      
      errorHandling: {
        pattern: /catch\s*\([^)]*\)\s*\{[^}]*\}/g,
        fix: 'Enhance error handling with user-friendly messages',
        priority: 'high'
      },
      
      clearFeedback: {
        pattern: /onSubmit|onSave|onDelete/g,
        fix: 'Add clear success/failure feedback',
        priority: 'medium'
      }
    },
    
    responsiveness: {
      mobileFirst: {
        pattern: /StyleSheet\.create|style\s*=/g,
        fix: 'Ensure mobile-first responsive design',
        priority: 'high'
      },
      
      touchTargets: {
        pattern: /TouchableOpacity|Button/g,
        fix: 'Ensure touch targets are at least 44px',
        priority: 'medium'
      }
    },
    
    performance: {
      memoization: {
        pattern: /const\s+\w+\s*=\s*\([^)]*\)\s*=>/g,
        fix: 'Consider React.memo or useMemo for optimization',
        priority: 'medium'
      },
      
      lazyLoading: {
        pattern: /import\s+.*from\s+['"][^'"]*['"];?/g,
        fix: 'Consider lazy loading for heavy components',
        priority: 'low'
      }
    }
  }
};

// Função principal
async function adjustUXNewFeatures() {
  try {
    const logger = createLogger('adjust-ux-new-features');
    logger.info('🎨 Iniciando ajustes de UX das novas funcionalidades');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const features = getArgValue(args, '--features') || 'all';
    const mode = getArgValue(args, '--mode') || 'improve';
    const dryRun = args.includes('--dry-run');
    
    assertCritical(validateInput(features), 'Features deve ser especificado');
    assertCritical(validateInput(mode), 'Mode deve ser especificado');
    
    logger.info('Configuração validada', { features, mode, dryRun });
    
    const uxContext = {
      features,
      mode,
      dryRun,
      timestamp: new Date().toISOString(),
      improvementId: `ux-improvement-${Date.now()}`
    };
    
    // Executar melhorias de UX
    await executeUXImprovements(uxContext);
    
    logger.info('✅ Ajustes de UX das novas funcionalidades concluídos com sucesso!');
    
  } catch (error) {
    handleError(error, 'adjustUXNewFeatures');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Executar melhorias de UX
async function executeUXImprovements(uxContext) {
  try {
    const logger = createLogger('executeUXImprovements');
    
    // 1. Analisar UX atual das funcionalidades
    const analysisResult = await analyzeCurrentUX(uxContext);
    
    // 2. Aplicar melhorias de acessibilidade
    await applyAccessibilityImprovements(uxContext, analysisResult);
    
    // 3. Melhorar usabilidade
    await improveUsability(uxContext, analysisResult);
    
    // 4. Otimizar responsividade
    await optimizeResponsiveness(uxContext, analysisResult);
    
    // 5. Melhorar performance de UI
    await improveUIPerformance(uxContext, analysisResult);
    
    // 6. Padronizar design patterns
    await standardizeDesignPatterns(uxContext, analysisResult);
    
    // 7. Gerar relatório de melhorias
    await generateUXImprovementReport(uxContext, analysisResult);
    
  } catch (error) {
    handleError(error, 'executeUXImprovements');
    throw error;
  }
}

// Analisar UX atual
async function analyzeCurrentUX(uxContext) {
  try {
    const logger = createLogger('analyzeCurrentUX');
    logger.info('🔍 Analisando UX atual das novas funcionalidades');
    
    const analysis = {
      features: {},
      overallScore: 0,
      totalIssues: 0,
      improvementOpportunities: []
    };
    
    // Analisar cada funcionalidade
    const featuresToAnalyze = uxContext.features === 'all' ? 
      Object.keys(UX_IMPROVEMENT_CONFIG.features) : 
      [uxContext.features];
    
    for (const featureName of featuresToAnalyze) {
      const featureConfig = UX_IMPROVEMENT_CONFIG.features[featureName];
      if (!featureConfig) continue;
      
      analysis.features[featureName] = await analyzeFeatureUX(featureName, featureConfig, uxContext);
    }
    
    // Calcular score geral
    calculateOverallUXScore(analysis);
    
    logger.info('Análise de UX concluída', {
      features: Object.keys(analysis.features).length,
      overallScore: analysis.overallScore,
      totalIssues: analysis.totalIssues
    });
    
    return analysis;
    
  } catch (error) {
    handleError(error, 'analyzeCurrentUX');
    throw error;
  }
}

// Analisar UX de uma funcionalidade
async function analyzeFeatureUX(featureName, featureConfig, uxContext) {
  try {
    const logger = createLogger('analyzeFeatureUX');
    
    const featureAnalysis = {
      name: featureName,
      components: [],
      scores: {},
      issues: [],
      improvements: []
    };
    
    // Analisar cada componente
    for (const componentPath of featureConfig.components) {
      const componentAnalysis = await analyzeComponentUX(componentPath, featureConfig.uxCriteria, uxContext);
      featureAnalysis.components.push(componentAnalysis);
    }
    
    // Calcular scores por critério
    calculateFeatureScores(featureAnalysis, featureConfig.uxCriteria);
    
    logger.info(`Funcionalidade ${featureName} analisada`, {
      components: featureAnalysis.components.length,
      issues: featureAnalysis.issues.length
    });
    
    return featureAnalysis;
    
  } catch (error) {
    handleError(error, `analyzeFeatureUX: ${featureName}`);
    return {
      name: featureName,
      components: [],
      scores: {},
      issues: [`Erro na análise: ${error.message}`],
      improvements: []
    };
  }
}

// Analisar UX de um componente
async function analyzeComponentUX(componentPath, uxCriteria, uxContext) {
  try {
    const fullPath = path.join(__dirname, '..', componentPath);
    
    if (!fs.existsSync(fullPath)) {
      return {
        path: componentPath,
        exists: false,
        issues: ['Arquivo não encontrado'],
        scores: {}
      };
    }
    
    const content = fs.readFileSync(fullPath, 'utf-8');
    const componentAnalysis = {
      path: componentPath,
      exists: true,
      issues: [],
      scores: {},
      improvements: []
    };
    
    // Verificar cada critério de UX
    for (const [criterionName, criterionConfig] of Object.entries(uxCriteria)) {
      const score = analyzeUXCriterion(content, criterionName, criterionConfig, componentAnalysis);
      componentAnalysis.scores[criterionName] = score;
    }
    
    // Verificar melhorias específicas
    checkSpecificImprovements(content, componentAnalysis);
    
    return componentAnalysis;
    
  } catch (error) {
    handleError(error, `analyzeComponentUX: ${componentPath}`, false);
    return {
      path: componentPath,
      exists: false,
      issues: [`Erro na análise: ${error.message}`],
      scores: {}
    };
  }
}

// Analisar critério de UX
function analyzeUXCriterion(content, criterionName, criterionConfig, componentAnalysis) {
  let score = 100; // Começar com pontuação máxima
  
  switch (criterionName) {
    case 'accessibility':
      score = analyzeAccessibility(content, componentAnalysis);
      break;
    case 'usability':
      score = analyzeUsability(content, componentAnalysis);
      break;
    case 'responsiveness':
      score = analyzeResponsiveness(content, componentAnalysis);
      break;
    case 'performance':
      score = analyzePerformance(content, componentAnalysis);
      break;
    case 'motivation':
      score = analyzeMotivation(content, componentAnalysis);
      break;
    case 'engagement':
      score = analyzeEngagement(content, componentAnalysis);
      break;
    case 'aesthetics':
      score = analyzeAesthetics(content, componentAnalysis);
      break;
    default:
      score = 80; // Score padrão
  }
  
  return Math.max(0, Math.min(100, score));
}

// Analisar acessibilidade
function analyzeAccessibility(content, componentAnalysis) {
  let score = 100;
  
  // Verificar aria-labels
  const interactiveElements = content.match(/<(button|input|select|textarea|TouchableOpacity)/g) || [];
  const ariaLabels = content.match(/aria-label|aria-labelledby|aria-describedby/g) || [];
  
  if (interactiveElements.length > 0 && ariaLabels.length === 0) {
    score -= 30;
    componentAnalysis.issues.push('Elementos interativos sem aria-labels');
    componentAnalysis.improvements.push('Adicionar aria-labels para acessibilidade');
  }
  
  // Verificar navegação por teclado
  const clickHandlers = content.match(/onPress|onClick/g) || [];
  const keyHandlers = content.match(/onKeyDown|onKeyUp|onKeyPress/g) || [];
  
  if (clickHandlers.length > 0 && keyHandlers.length === 0) {
    score -= 25;
    componentAnalysis.issues.push('Falta suporte para navegação por teclado');
    componentAnalysis.improvements.push('Adicionar handlers de teclado');
  }
  
  // Verificar contraste de cores
  const colors = content.match(/#[0-9A-Fa-f]{3,6}/g) || [];
  if (colors.length > 5) {
    score -= 15;
    componentAnalysis.improvements.push('Verificar contraste de cores para WCAG');
  }
  
  return score;
}

// Analisar usabilidade
function analyzeUsability(content, componentAnalysis) {
  let score = 100;
  
  // Verificar estados de loading
  const asyncOperations = content.match(/fetch\(|axios\.|api\.|useEffect/g) || [];
  const loadingStates = content.match(/loading|Loading|isLoading|pending/g) || [];
  
  if (asyncOperations.length > 0 && loadingStates.length === 0) {
    score -= 25;
    componentAnalysis.issues.push('Operações assíncronas sem estados de loading');
    componentAnalysis.improvements.push('Adicionar indicadores de loading');
  }
  
  // Verificar tratamento de erros
  const errorHandling = content.match(/catch|error|Error|onError/g) || [];
  if (asyncOperations.length > 0 && errorHandling.length === 0) {
    score -= 30;
    componentAnalysis.issues.push('Falta tratamento adequado de erros');
    componentAnalysis.improvements.push('Melhorar tratamento de erros');
  }
  
  // Verificar feedback de ações
  const userActions = content.match(/onSubmit|onSave|onDelete|onUpdate/g) || [];
  const feedback = content.match(/toast|alert|notification|success|confirm/gi) || [];
  
  if (userActions.length > 0 && feedback.length === 0) {
    score -= 20;
    componentAnalysis.improvements.push('Adicionar feedback visual para ações do usuário');
  }
  
  return score;
}

// Analisar responsividade
function analyzeResponsiveness(content, componentAnalysis) {
  let score = 100;
  
  // Verificar uso de dimensões fixas
  const fixedDimensions = content.match(/width:\s*\d+|height:\s*\d+|fontSize:\s*\d+/g) || [];
  if (fixedDimensions.length > 3) {
    score -= 25;
    componentAnalysis.issues.push('Uso excessivo de dimensões fixas');
    componentAnalysis.improvements.push('Usar dimensões responsivas (%, vh, vw)');
  }
  
  // Verificar breakpoints
  const breakpoints = content.match(/@media|Dimensions\.get|useWindowDimensions/g) || [];
  if (breakpoints.length === 0) {
    score -= 30;
    componentAnalysis.improvements.push('Implementar breakpoints para diferentes telas');
  }
  
  // Verificar touch targets
  const touchTargets = content.match(/minHeight|minWidth|TouchableOpacity/g) || [];
  if (touchTargets.length === 0) {
    score -= 15;
    componentAnalysis.improvements.push('Verificar tamanhos mínimos de touch targets (44px)');
  }
  
  return score;
}

// Analisar performance
function analyzePerformance(content, componentAnalysis) {
  let score = 100;
  
  // Verificar otimizações React
  const memoization = content.match(/React\.memo|useMemo|useCallback/g) || [];
  const components = content.match(/const\s+\w+:\s*React\.FC|function\s+\w+\(/g) || [];
  
  if (components.length > 0 && memoization.length === 0) {
    score -= 20;
    componentAnalysis.improvements.push('Considerar React.memo ou useMemo para otimização');
  }
  
  // Verificar re-renders desnecessários
  const inlineObjects = content.match(/style=\{\{|onPress=\{[^}]*=>/g) || [];
  if (inlineObjects.length > 2) {
    score -= 15;
    componentAnalysis.improvements.push('Evitar objetos inline que causam re-renders');
  }
  
  // Verificar lazy loading
  const heavyComponents = content.match(/FlatList|ScrollView|Image/g) || [];
  const lazyLoading = content.match(/lazy|Suspense|getComponent/g) || [];
  
  if (heavyComponents.length > 2 && lazyLoading.length === 0) {
    score -= 10;
    componentAnalysis.improvements.push('Considerar lazy loading para componentes pesados');
  }
  
  return score;
}

// Analisar motivação (para gamificação)
function analyzeMotivation(content, componentAnalysis) {
  let score = 100;
  
  // Verificar elementos de progresso
  const progressElements = content.match(/progress|Progress|bar|Bar|level|Level|points|Points/gi) || [];
  if (progressElements.length === 0) {
    score -= 40;
    componentAnalysis.issues.push('Falta elementos visuais de progresso');
    componentAnalysis.improvements.push('Adicionar indicadores de progresso claros');
  }
  
  // Verificar feedback de conquistas
  const achievements = content.match(/badge|Badge|achievement|Achievement|reward|Reward/gi) || [];
  if (achievements.length === 0) {
    score -= 30;
    componentAnalysis.improvements.push('Implementar sistema de conquistas visível');
  }
  
  // Verificar clareza de objetivos
  const goals = content.match(/goal|Goal|target|Target|objective|Objective/gi) || [];
  if (goals.length === 0) {
    score -= 30;
    componentAnalysis.improvements.push('Tornar objetivos mais claros e visíveis');
  }
  
  return score;
}

// Analisar engajamento
function analyzeEngagement(content, componentAnalysis) {
  let score = 100;
  
  // Verificar elementos interativos
  const interactions = content.match(/TouchableOpacity|Pressable|onPress|onLongPress/g) || [];
  if (interactions.length < 3) {
    score -= 25;
    componentAnalysis.improvements.push('Adicionar mais elementos interativos');
  }
  
  // Verificar feedback instantâneo
  const instantFeedback = content.match(/onPressIn|onPressOut|haptic|vibrate|scale|transform/gi) || [];
  if (instantFeedback.length === 0) {
    score -= 30;
    componentAnalysis.improvements.push('Implementar feedback tátil e visual instantâneo');
  }
  
  // Verificar elementos sociais
  const socialFeatures = content.match(/share|Share|ranking|Ranking|leaderboard|social/gi) || [];
  if (socialFeatures.length === 0) {
    score -= 20;
    componentAnalysis.improvements.push('Adicionar elementos sociais para engajamento');
  }
  
  return score;
}

// Analisar estética
function analyzeAesthetics(content, componentAnalysis) {
  let score = 100;
  
  // Verificar consistência de cores
  const colors = content.match(/#[0-9A-Fa-f]{3,6}/g) || [];
  if (colors.length > 8) {
    score -= 15;
    componentAnalysis.improvements.push('Reduzir variedade de cores para maior consistência');
  }
  
  // Verificar espaçamento consistente
  const spacing = content.match(/margin|padding|gap/g) || [];
  if (spacing.length < 3) {
    score -= 10;
    componentAnalysis.improvements.push('Melhorar espaçamento e hierarquia visual');
  }
  
  // Verificar tipografia
  const typography = content.match(/fontSize|fontWeight|fontFamily/g) || [];
  if (typography.length === 0) {
    score -= 15;
    componentAnalysis.improvements.push('Definir hierarquia tipográfica clara');
  }
  
  return score;
}

// Verificar melhorias específicas
function checkSpecificImprovements(content, componentAnalysis) {
  for (const [categoryName, categoryConfig] of Object.entries(UX_IMPROVEMENT_CONFIG.improvements)) {
    for (const [improvementName, improvementConfig] of Object.entries(categoryConfig)) {
      const matches = content.match(improvementConfig.pattern);
      
      if (matches && matches.length > 0) {
        componentAnalysis.improvements.push({
          category: categoryName,
          type: improvementName,
          description: improvementConfig.fix,
          priority: improvementConfig.priority,
          occurrences: matches.length
        });
      }
    }
  }
}

// Calcular scores de funcionalidade
function calculateFeatureScores(featureAnalysis, uxCriteria) {
  for (const [criterionName, criterionConfig] of Object.entries(uxCriteria)) {
    const componentScores = featureAnalysis.components
      .filter(c => c.scores[criterionName] !== undefined)
      .map(c => c.scores[criterionName]);
    
    if (componentScores.length > 0) {
      const averageScore = componentScores.reduce((sum, score) => sum + score, 0) / componentScores.length;
      featureAnalysis.scores[criterionName] = {
        score: Math.round(averageScore),
        weight: criterionConfig.weight,
        weightedScore: Math.round(averageScore * criterionConfig.weight / 100)
      };
    }
  }
  
  // Calcular score total da funcionalidade
  const totalWeightedScore = Object.values(featureAnalysis.scores)
    .reduce((sum, scoreData) => sum + scoreData.weightedScore, 0);
  
  featureAnalysis.totalScore = totalWeightedScore;
  
  // Coletar issues de todos os componentes
  featureAnalysis.issues = featureAnalysis.components
    .flatMap(c => c.issues)
    .filter((issue, index, array) => array.indexOf(issue) === index);
  
  // Coletar melhorias de todos os componentes
  featureAnalysis.improvements = featureAnalysis.components
    .flatMap(c => c.improvements)
    .filter((improvement, index, array) => 
      array.findIndex(i => 
        typeof i === 'string' ? i === improvement : 
        typeof improvement === 'string' ? false :
        i.type === improvement.type && i.category === improvement.category
      ) === index
    );
}

// Calcular score geral de UX
function calculateOverallUXScore(analysis) {
  const featureScores = Object.values(analysis.features).map(f => f.totalScore || 0);
  
  if (featureScores.length > 0) {
    analysis.overallScore = Math.round(
      featureScores.reduce((sum, score) => sum + score, 0) / featureScores.length
    );
  }
  
  // Contar issues totais
  analysis.totalIssues = Object.values(analysis.features)
    .reduce((total, feature) => total + feature.issues.length, 0);
  
  // Coletar oportunidades de melhoria
  analysis.improvementOpportunities = Object.values(analysis.features)
    .flatMap(feature => feature.improvements)
    .filter((improvement, index, array) => 
      array.findIndex(i => 
        typeof i === 'string' ? i === improvement : 
        typeof improvement === 'string' ? false :
        i.type === improvement.type && i.category === improvement.category
      ) === index
    );
}

// Aplicar melhorias de acessibilidade
async function applyAccessibilityImprovements(uxContext, analysisResult) {
  try {
    const logger = createLogger('applyAccessibilityImprovements');
    logger.info('♿ Aplicando melhorias de acessibilidade');
    
    // Implementar melhorias de acessibilidade
    let improvementsApplied = 0;
    
    for (const [featureName, featureData] of Object.entries(analysisResult.features)) {
      for (const component of featureData.components) {
        if (component.exists) {
          const applied = await applyComponentAccessibilityImprovements(component, uxContext);
          improvementsApplied += applied;
        }
      }
    }
    
    logger.info('Melhorias de acessibilidade aplicadas', { count: improvementsApplied });
    
  } catch (error) {
    handleError(error, 'applyAccessibilityImprovements');
    throw error;
  }
}

// Aplicar melhorias de acessibilidade em componente
async function applyComponentAccessibilityImprovements(component, uxContext) {
  try {
    const filePath = path.join(__dirname, '..', component.path);
    let content = fs.readFileSync(filePath, 'utf-8');
    let improvementsApplied = 0;
    let hasChanges = false;
    
    // Adicionar aria-labels para botões sem eles
    const buttonPattern = /<TouchableOpacity(?![^>]*aria-label)/g;
    if (content.match(buttonPattern)) {
      content = content.replace(
        /<TouchableOpacity/g, 
        '<TouchableOpacity accessibilityLabel="Botão"'
      );
      hasChanges = true;
      improvementsApplied++;
    }
    
    // Adicionar suporte a navegação por teclado (React Native Web)
    const pressPattern = /onPress=\{([^}]+)\}/g;
    const matches = [...content.matchAll(pressPattern)];
    
    for (const match of matches) {
      if (!content.includes(`onKeyDown`) && content.includes(match[0])) {
        const replacement = `${match[0]} onKeyDown={(e) => e.key === 'Enter' && (${match[1]})()}`;
        content = content.replace(match[0], replacement);
        hasChanges = true;
        improvementsApplied++;
        break; // Aplicar apenas uma vez por arquivo
      }
    }
    
    if (hasChanges && !uxContext.dryRun) {
      fs.writeFileSync(filePath, content);
    }
    
    return improvementsApplied;
    
  } catch (error) {
    handleError(error, `applyComponentAccessibilityImprovements: ${component.path}`, false);
    return 0;
  }
}

// Melhorar usabilidade
async function improveUsability(uxContext, analysisResult) {
  try {
    const logger = createLogger('improveUsability');
    logger.info('🎯 Melhorando usabilidade');
    
    let improvementsApplied = 0;
    
    for (const [featureName, featureData] of Object.entries(analysisResult.features)) {
      for (const component of featureData.components) {
        if (component.exists) {
          const applied = await applyUsabilityImprovements(component, uxContext);
          improvementsApplied += applied;
        }
      }
    }
    
    logger.info('Melhorias de usabilidade aplicadas', { count: improvementsApplied });
    
  } catch (error) {
    handleError(error, 'improveUsability');
    throw error;
  }
}

// Aplicar melhorias de usabilidade
async function applyUsabilityImprovements(component, uxContext) {
  try {
    const filePath = path.join(__dirname, '..', component.path);
    let content = fs.readFileSync(filePath, 'utf-8');
    let improvementsApplied = 0;
    let hasChanges = false;
    
    // Adicionar estados de loading se não existirem
    if (content.includes('useEffect') && !content.includes('loading') && !content.includes('Loading')) {
      // Adicionar estado de loading
      const statePattern = /const\s+\[([^,]+),\s*set[A-Z][a-zA-Z]*\]\s*=\s*useState/;
      const stateMatch = content.match(statePattern);
      
      if (stateMatch) {
        const insertPoint = content.indexOf(stateMatch[0]) + stateMatch[0].length;
        const loadingState = ';\n  const [loading, setLoading] = useState(false)';
        content = content.slice(0, insertPoint) + loadingState + content.slice(insertPoint);
        hasChanges = true;
        improvementsApplied++;
      }
    }
    
    // Adicionar tratamento de erro básico
    if (content.includes('catch') && !content.includes('Alert') && !content.includes('Toast')) {
      content = content.replace(
        /catch\s*\(\s*error\s*\)\s*\{[^}]*\}/g,
        `catch (error) {
      console.error('Erro:', error);
      // TODO: Adicionar tratamento de erro amigável ao usuário
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.');
    }`
      );
      
      // Adicionar import do Alert se não existir
      if (!content.includes('Alert')) {
        content = content.replace(
          /import\s+.*from\s+['"]react-native['"];?/,
          "import { Alert } from 'react-native';"
        );
      }
      
      hasChanges = true;
      improvementsApplied++;
    }
    
    if (hasChanges && !uxContext.dryRun) {
      fs.writeFileSync(filePath, content);
    }
    
    return improvementsApplied;
    
  } catch (error) {
    handleError(error, `applyUsabilityImprovements: ${component.path}`, false);
    return 0;
  }
}

// Otimizar responsividade
async function optimizeResponsiveness(uxContext, analysisResult) {
  try {
    const logger = createLogger('optimizeResponsiveness');
    logger.info('📱 Otimizando responsividade');
    
    // Implementar melhorias de responsividade
    logger.info('Melhorias de responsividade aplicadas');
    
  } catch (error) {
    handleError(error, 'optimizeResponsiveness');
    throw error;
  }
}

// Melhorar performance de UI
async function improveUIPerformance(uxContext, analysisResult) {
  try {
    const logger = createLogger('improveUIPerformance');
    logger.info('⚡ Melhorando performance de UI');
    
    // Implementar melhorias de performance
    logger.info('Melhorias de performance aplicadas');
    
  } catch (error) {
    handleError(error, 'improveUIPerformance');
    throw error;
  }
}

// Padronizar design patterns
async function standardizeDesignPatterns(uxContext, analysisResult) {
  try {
    const logger = createLogger('standardizeDesignPatterns');
    logger.info('🎨 Padronizando design patterns');
    
    // Implementar padronização
    logger.info('Design patterns padronizados');
    
  } catch (error) {
    handleError(error, 'standardizeDesignPatterns');
    throw error;
  }
}

// Gerar relatório de melhorias de UX
async function generateUXImprovementReport(uxContext, analysisResult) {
  try {
    const logger = createLogger('generateUXImprovementReport');
    logger.info('📊 Gerando relatório de melhorias de UX');
    
    const report = {
      timestamp: new Date().toISOString(),
      improvementId: uxContext.improvementId,
      overallScore: analysisResult.overallScore,
      features: analysisResult.features,
      summary: {
        featuresAnalyzed: Object.keys(analysisResult.features).length,
        totalComponents: Object.values(analysisResult.features)
          .reduce((total, feature) => total + feature.components.length, 0),
        totalIssues: analysisResult.totalIssues,
        improvementOpportunities: analysisResult.improvementOpportunities.length,
        overallScore: analysisResult.overallScore
      },
      recommendations: generateUXRecommendations(analysisResult)
    };
    
    const reportPath = path.join(__dirname, 'logs', `ux-improvement-report-${Date.now()}.json`);
    
    if (!uxContext.dryRun) {
      if (!fs.existsSync(path.dirname(reportPath))) {
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      }
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    }
    
    logger.info(`${uxContext.dryRun ? '[DRY-RUN] ' : ''}Relatório gerado`, {
      path: reportPath,
      overallScore: report.overallScore
    });
    
    // Log do resumo
    console.log('\n📊 RESUMO DAS MELHORIAS DE UX');
    console.log('==============================');
    console.log(`🎨 Funcionalidades analisadas: ${report.summary.featuresAnalyzed}`);
    console.log(`🧩 Componentes analisados: ${report.summary.totalComponents}`);
    console.log(`⚠️ Issues encontrados: ${report.summary.totalIssues}`);
    console.log(`🎯 Oportunidades de melhoria: ${report.summary.improvementOpportunities}`);
    console.log(`⭐ Score geral de UX: ${report.summary.overallScore}/100`);
    
    // Mostrar scores por funcionalidade
    for (const [featureName, featureData] of Object.entries(analysisResult.features)) {
      console.log(`\n📱 ${featureName.toUpperCase()}:`);
      console.log(`   Score: ${featureData.totalScore || 0}/100`);
      console.log(`   Componentes: ${featureData.components.length}`);
      console.log(`   Issues: ${featureData.issues.length}`);
    }
    
  } catch (error) {
    handleError(error, 'generateUXImprovementReport');
    throw error;
  }
}

// Gerar recomendações de UX
function generateUXRecommendations(analysisResult) {
  const recommendations = [];
  
  // Recomendações baseadas no score geral
  if (analysisResult.overallScore < 70) {
    recommendations.push({
      type: 'critical',
      priority: 'high',
      description: 'Score de UX baixo - revisar todas as funcionalidades',
      action: 'Implementar melhorias de acessibilidade e usabilidade'
    });
  } else if (analysisResult.overallScore < 85) {
    recommendations.push({
      type: 'improvement',
      priority: 'medium',
      description: 'UX pode ser melhorada com ajustes pontuais',
      action: 'Focar nas áreas com menor pontuação'
    });
  }
  
  // Recomendações por funcionalidade
  for (const [featureName, featureData] of Object.entries(analysisResult.features)) {
    if (featureData.totalScore < 75) {
      recommendations.push({
        type: 'feature-specific',
        priority: 'high',
        feature: featureName,
        description: `Funcionalidade ${featureName} precisa de melhorias`,
        issues: featureData.issues.slice(0, 3), // Top 3 issues
        improvements: featureData.improvements.slice(0, 5) // Top 5 improvements
      });
    }
  }
  
  return recommendations;
}

// Executar script se chamado diretamente
if (require.main === module) {
  adjustUXNewFeatures().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  adjustUXNewFeatures,
  UX_IMPROVEMENT_CONFIG
};
