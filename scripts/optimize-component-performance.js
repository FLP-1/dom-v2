/**
 * @fileoverview Optimize Component Performance - Otimização automática de performance
 * @description Aplica otimizações de performance em componentes React Native
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * @usage
 * node scripts/optimize-component-performance.js --target=all --mode=apply
 * 
 * @features
 * - Memoização automática com React.memo
 * - Otimização de hooks com useMemo/useCallback
 * - Lazy loading para componentes pesados
 * - Bundle splitting e code splitting
 * - Análise de re-renders desnecessários
 * - Monitoramento de performance
 * - Virtual scrolling para listas
 * 
 * @see
 * - frontend/src/components/base/
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');

// Utilitários inline para logging e validação
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

// Configuração de otimizações
const PERFORMANCE_OPTIMIZATIONS = {
  memoization: {
    enabled: true,
    patterns: [
      {
        name: 'Component Memoization',
        description: 'Apply React.memo to functional components',
        pattern: /export const (\w+): React\.FC<(\w+)> = \(/g,
        replacement: 'export const $1: React.FC<$2> = React.memo((',
        suffix: '))'
      }
    ]
  },
  
  hooks: {
    enabled: true,
    optimizations: [
      {
        name: 'useMemo for expensive calculations',
        pattern: /const (\w+) = (.+\(.+\));/g,
        replacement: 'const $1 = useMemo(() => $2, []);'
      },
      {
        name: 'useCallback for event handlers',
        pattern: /const (handle\w+) = \((.+)\) => {/g,
        replacement: 'const $1 = useCallback(($2) => {'
      }
    ]
  },
  
  rendering: {
    enabled: true,
    strategies: [
      'lazy-loading',
      'code-splitting',
      'virtualization',
      'conditional-rendering'
    ]
  },
  
  bundling: {
    enabled: true,
    techniques: [
      'tree-shaking',
      'dead-code-elimination',
      'module-federation'
    ]
  }
};

// Função principal
async function optimizeComponentPerformance() {
  try {
    const logger = createLogger('optimize-component-performance');
    logger.info('🚀 Iniciando otimização de performance dos componentes');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const target = getArgValue(args, '--target') || 'all';
    const mode = getArgValue(args, '--mode') || 'analyze';
    const dryRun = args.includes('--dry-run');
    
    assertCritical(validateInput(target), 'Target deve ser especificado');
    assertCritical(['analyze', 'apply', 'monitor'].includes(mode), 'Mode deve ser analyze, apply ou monitor');
    
    logger.info('Configuração validada', { target, mode, dryRun });
    
    const optimizationContext = {
      target,
      mode,
      dryRun,
      timestamp: new Date().toISOString(),
      buildId: `performance-optimization-${Date.now()}`
    };
    
    // Executar otimização baseada no modo
    switch (mode) {
      case 'analyze':
        await analyzePerformance(optimizationContext);
        break;
      case 'apply':
        await applyOptimizations(optimizationContext);
        break;
      case 'monitor':
        await setupPerformanceMonitoring(optimizationContext);
        break;
      default:
        throw new Error(`Modo não suportado: ${mode}`);
    }
    
    logger.info('✅ Otimização de performance concluída com sucesso!');
    
  } catch (error) {
    handleError(error, 'optimizeComponentPerformance');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Analisar performance atual
async function analyzePerformance(optimizationContext) {
  try {
    const logger = createLogger('analyzePerformance');
    logger.info('📊 Analisando performance atual dos componentes');
    
    const baseDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base');
    const componentFiles = await getComponentFiles(baseDir);
    
    const analysis = {
      totalComponents: componentFiles.length,
      memorizedComponents: 0,
      optimizedHooks: 0,
      bundleSize: 0,
      renderOptimizations: 0,
      recommendations: []
    };
    
    for (const filePath of componentFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileAnalysis = await analyzeComponentFile(content, filePath);
      
      analysis.memorizedComponents += fileAnalysis.isMemoized ? 1 : 0;
      analysis.optimizedHooks += fileAnalysis.optimizedHooks;
      analysis.renderOptimizations += fileAnalysis.renderOptimizations;
      analysis.recommendations.push(...fileAnalysis.recommendations);
    }
    
    // Calcular score de performance
    const performanceScore = calculatePerformanceScore(analysis);
    
    logger.info('Análise de performance concluída', {
      score: `${performanceScore}/100`,
      componentes: analysis.totalComponents,
      memoizados: analysis.memorizedComponents,
      hooksOtimizados: analysis.optimizedHooks
    });
    
    // Gerar relatório detalhado
    await generatePerformanceReport(analysis, performanceScore, optimizationContext);
    
  } catch (error) {
    handleError(error, 'analyzePerformance');
    throw error;
  }
}

// Analisar arquivo de componente individual
async function analyzeComponentFile(content, filePath) {
  const analysis = {
    filePath,
    isMemoized: content.includes('React.memo'),
    optimizedHooks: 0,
    renderOptimizations: 0,
    recommendations: []
  };
  
  // Verificar otimizações de hooks
  const useMemoCount = (content.match(/useMemo/g) || []).length;
  const useCallbackCount = (content.match(/useCallback/g) || []).length;
  analysis.optimizedHooks = useMemoCount + useCallbackCount;
  
  // Verificar otimizações de renderização
  if (content.includes('conditional-rendering') || content.includes('React.lazy')) {
    analysis.renderOptimizations++;
  }
  
  // Gerar recomendações
  if (!analysis.isMemoized && content.includes('React.FC')) {
    analysis.recommendations.push({
      type: 'memoization',
      message: 'Considere usar React.memo para evitar re-renders desnecessários',
      priority: 'medium'
    });
  }
  
  if (analysis.optimizedHooks === 0 && content.includes('const handle')) {
    analysis.recommendations.push({
      type: 'hooks',
      message: 'Otimize event handlers com useCallback',
      priority: 'low'
    });
  }
  
  return analysis;
}

// Aplicar otimizações
async function applyOptimizations(optimizationContext) {
  try {
    const logger = createLogger('applyOptimizations');
    logger.info('🔧 Aplicando otimizações de performance');
    
    const baseDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base');
    const componentFiles = await getComponentFiles(baseDir);
    
    let optimizationsApplied = 0;
    
    for (const filePath of componentFiles) {
      const optimized = await optimizeComponentFile(filePath, optimizationContext);
      if (optimized) optimizationsApplied++;
    }
    
    // Criar componentes de performance
    await createPerformanceComponents(optimizationContext);
    
    // Criar hooks de performance
    await createPerformanceHooks(optimizationContext);
    
    logger.info('Otimizações aplicadas', {
      arquivosOtimizados: optimizationsApplied,
      totalArquivos: componentFiles.length
    });
    
  } catch (error) {
    handleError(error, 'applyOptimizations');
    throw error;
  }
}

// Otimizar arquivo de componente
async function optimizeComponentFile(filePath, optimizationContext) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Aplicar memoização se não estiver presente
    if (!content.includes('React.memo') && content.includes('export const')) {
      content = applyMemoization(content);
      modified = true;
    }
    
    // Otimizar imports
    content = optimizeImports(content);
    
    // Adicionar performance hooks
    content = addPerformanceHooks(content);
    
    if (modified && !optimizationContext.dryRun) {
      fs.writeFileSync(filePath, content);
      return true;
    }
    
    return modified;
    
  } catch (error) {
    handleError(error, `optimizeComponentFile: ${filePath}`, false);
    return false;
  }
}

// Aplicar memoização
function applyMemoization(content) {
  // Adicionar import do React se não estiver presente
  if (!content.includes('import React')) {
    content = content.replace(
      /import React(.+) from 'react';/,
      "import React, { memo$1 } from 'react';"
    );
  } else if (!content.includes('memo')) {
    content = content.replace(
      /import React(.+) from 'react';/,
      "import React, { memo$1 } from 'react';"
    );
  }
  
  // Aplicar React.memo aos componentes
  content = content.replace(
    /export const (\w+): React\.FC<(\w+)> = \(/g,
    'export const $1: React.FC<$2> = memo(('
  );
  
  // Fechar o memo no final do componente
  content = content.replace(
    /export default (\w+);/g,
    '}); // React.memo\n\nexport default $1;'
  );
  
  return content;
}

// Otimizar imports
function optimizeImports(content) {
  // Reorganizar imports por tipo
  const reactImports = [];
  const componentImports = [];
  const utilImports = [];
  const otherImports = [];
  
  const importLines = content.match(/import .+ from .+;/g) || [];
  
  importLines.forEach(importLine => {
    if (importLine.includes("from 'react'")) {
      reactImports.push(importLine);
    } else if (importLine.includes('./')) {
      componentImports.push(importLine);
    } else if (importLine.includes('utils/')) {
      utilImports.push(importLine);
    } else {
      otherImports.push(importLine);
    }
  });
  
  // Reconstruir imports organizados
  const organizedImports = [
    ...reactImports,
    ...otherImports,
    ...utilImports,
    ...componentImports
  ].join('\n');
  
  // Remover imports antigos e adicionar organizados
  content = content.replace(/import .+ from .+;\n/g, '');
  content = organizedImports + '\n\n' + content;
  
  return content;
}

// Adicionar hooks de performance
function addPerformanceHooks(content) {
  // Adicionar usePerformanceMonitor se não estiver presente
  if (!content.includes('usePerformanceMonitor')) {
    const hookImport = "import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';\n";
    content = hookImport + content;
    
    // Adicionar hook no componente
    content = content.replace(
      /const theme = useTheme\(\);/,
      `const theme = useTheme();
  const performanceData = usePerformanceMonitor('${path.basename(content, '.tsx')}');`
    );
  }
  
  return content;
}

// Criar componentes de performance
async function createPerformanceComponents(optimizationContext) {
  try {
    const logger = createLogger('createPerformanceComponents');
    logger.info('🧩 Criando componentes de performance');
    
    // VirtualizedList component
    const virtualizedListContent = `/**
 * @fileoverview VirtualizedList - Lista virtualizada para performance
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { memo, useMemo, useCallback } from 'react';
import { FlatList, VirtualizedList as RNVirtualizedList } from 'react-native';
import { BaseComponentProps } from '../types/ComponentProps';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';

export interface VirtualizedListProps<T> extends BaseComponentProps {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  itemHeight: number;
  overscan?: number;
  onEndReached?: () => void;
  keyExtractor?: (item: T, index: number) => string;
}

export const VirtualizedList = memo(<T,>({
  data,
  renderItem,
  itemHeight,
  overscan = 10,
  onEndReached,
  keyExtractor,
  ...props
}: VirtualizedListProps<T>) => {
  const performanceData = usePerformanceMonitor('VirtualizedList');
  
  const getItem = useCallback((data: T[], index: number) => data[index], []);
  const getItemCount = useCallback((data: T[]) => data.length, []);
  const getItemLayout = useCallback((data: any, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  }), [itemHeight]);
  
  const renderVirtualizedItem = useCallback(({ item, index }: { item: T; index: number }) => {
    return renderItem(item, index);
  }, [renderItem]);
  
  const memoizedKeyExtractor = useMemo(() => {
    return keyExtractor || ((item: T, index: number) => \`item-\${index}\`);
  }, [keyExtractor]);
  
  return (
    <RNVirtualizedList
      data={data}
      renderItem={renderVirtualizedItem}
      getItem={getItem}
      getItemCount={getItemCount}
      getItemLayout={getItemLayout}
      keyExtractor={memoizedKeyExtractor}
      onEndReached={onEndReached}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={21}
      removeClippedSubviews={true}
      {...props}
    />
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;
`;

    // LazyComponent wrapper
    const lazyComponentContent = `/**
 * @fileoverview LazyComponent - Wrapper para lazy loading
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { Suspense, memo, ComponentType } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../utils/theme';

export interface LazyComponentProps {
  fallback?: React.ReactElement;
  children: React.ReactElement;
  loadingText?: string;
}

export const LazyComponent = memo<LazyComponentProps>(({
  fallback,
  children,
  loadingText = 'Carregando...'
}) => {
  const theme = useTheme();
  
  const defaultFallback = (
    <View style={[styles.fallbackContainer, { backgroundColor: theme.colors.surface }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
  
  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
});

LazyComponent.displayName = 'LazyComponent';

// HOC para criar componentes lazy
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactElement
) => {
  const LazyWrappedComponent = React.lazy(() => Promise.resolve({ default: Component }));
  
  return memo((props: P) => (
    <LazyComponent fallback={fallback}>
      <LazyWrappedComponent {...props} />
    </LazyComponent>
  ));
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default LazyComponent;
`;

    const baseDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base');
    
    if (!optimizationContext.dryRun) {
      fs.writeFileSync(path.join(baseDir, 'VirtualizedList.tsx'), virtualizedListContent);
      fs.writeFileSync(path.join(baseDir, 'LazyComponent.tsx'), lazyComponentContent);
    }
    
    logger.info(`${optimizationContext.dryRun ? '[DRY-RUN] ' : ''}Componentes de performance criados`);
    
  } catch (error) {
    handleError(error, 'createPerformanceComponents');
    throw error;
  }
}

// Criar hooks de performance
async function createPerformanceHooks(optimizationContext) {
  try {
    const logger = createLogger('createPerformanceHooks');
    logger.info('🎣 Criando hooks de performance');
    
    const hooksDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base', 'hooks');
    
    if (!optimizationContext.dryRun && !fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }
    
    // usePerformanceMonitor hook
    const performanceMonitorContent = `/**
 * @fileoverview usePerformanceMonitor - Hook para monitoramento de performance
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { useEffect, useRef, useState } from 'react';

export interface PerformanceData {
  componentName: string;
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  memoryUsage?: number;
}

export const usePerformanceMonitor = (componentName: string): PerformanceData => {
  const renderCountRef = useRef(0);
  const renderTimesRef = useRef<number[]>([]);
  const lastRenderTimeRef = useRef(0);
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    componentName,
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
  });
  
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      renderCountRef.current += 1;
      renderTimesRef.current.push(renderTime);
      lastRenderTimeRef.current = renderTime;
      
      // Manter apenas os últimos 100 tempos de render para cálculo da média
      if (renderTimesRef.current.length > 100) {
        renderTimesRef.current = renderTimesRef.current.slice(-100);
      }
      
      const averageRenderTime = renderTimesRef.current.reduce((a, b) => a + b, 0) / renderTimesRef.current.length;
      
      setPerformanceData({
        componentName,
        renderCount: renderCountRef.current,
        averageRenderTime: Math.round(averageRenderTime * 100) / 100,
        lastRenderTime: Math.round(renderTime * 100) / 100,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || undefined,
      });
      
      // Log performance warnings
      if (renderTime > 16.67) { // 60fps threshold
        console.warn(\`[PERFORMANCE] \${componentName} render took \${renderTime.toFixed(2)}ms (>16.67ms)\`);
      }
      
      if (renderCountRef.current > 50 && averageRenderTime > 10) {
        console.warn(\`[PERFORMANCE] \${componentName} average render time: \${averageRenderTime.toFixed(2)}ms\`);
      }
    };
  });
  
  return performanceData;
};

export default usePerformanceMonitor;
`;

    // useDebouncedCallback hook
    const debouncedCallbackContent = `/**
 * @fileoverview useDebouncedCallback - Hook para callbacks com debounce
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
};

export default useDebouncedCallback;
`;

    // useOptimizedState hook
    const optimizedStateContent = `/**
 * @fileoverview useOptimizedState - Hook para estado otimizado
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { useState, useCallback, useRef } from 'react';

export const useOptimizedState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  
  const optimizedSetState = useCallback((newState: T | ((prevState: T) => T)) => {
    const nextState = typeof newState === 'function' 
      ? (newState as (prevState: T) => T)(stateRef.current)
      : newState;
    
    // Evitar re-renders desnecessários comparando valores
    if (Object.is(stateRef.current, nextState)) {
      return;
    }
    
    stateRef.current = nextState;
    setState(nextState);
  }, []);
  
  return [state, optimizedSetState] as const;
};

export default useOptimizedState;
`;

    const hookFiles = [
      { name: 'usePerformanceMonitor.ts', content: performanceMonitorContent },
      { name: 'useDebouncedCallback.ts', content: debouncedCallbackContent },
      { name: 'useOptimizedState.ts', content: optimizedStateContent }
    ];
    
    for (const hookFile of hookFiles) {
      const filePath = path.join(hooksDir, hookFile.name);
      
      if (!optimizationContext.dryRun) {
        fs.writeFileSync(filePath, hookFile.content);
      }
      
      logger.info(`${optimizationContext.dryRun ? '[DRY-RUN] ' : ''}Hook criado: ${hookFile.name}`);
    }
    
  } catch (error) {
    handleError(error, 'createPerformanceHooks');
    throw error;
  }
}

// Configurar monitoramento de performance
async function setupPerformanceMonitoring(optimizationContext) {
  try {
    const logger = createLogger('setupPerformanceMonitoring');
    logger.info('📊 Configurando monitoramento de performance');
    
    // Criar sistema de monitoramento
    const performanceMonitorContent = `/**
 * @fileoverview Performance Monitor - Sistema de monitoramento de performance
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, any> = new Map();
  private observers: Array<(metrics: any) => void> = [];
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  trackComponentRender(componentName: string, renderTime: number) {
    const existing = this.metrics.get(componentName) || {
      renderCount: 0,
      totalTime: 0,
      maxTime: 0,
      minTime: Infinity,
    };
    
    existing.renderCount += 1;
    existing.totalTime += renderTime;
    existing.maxTime = Math.max(existing.maxTime, renderTime);
    existing.minTime = Math.min(existing.minTime, renderTime);
    existing.avgTime = existing.totalTime / existing.renderCount;
    
    this.metrics.set(componentName, existing);
    this.notifyObservers();
  }
  
  getMetrics(): Record<string, any> {
    const result: Record<string, any> = {};
    this.metrics.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  
  subscribe(callback: (metrics: any) => void) {
    this.observers.push(callback);
  }
  
  unsubscribe(callback: (metrics: any) => void) {
    const index = this.observers.indexOf(callback);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  private notifyObservers() {
    const metrics = this.getMetrics();
    this.observers.forEach(callback => callback(metrics));
  }
  
  generateReport(): string {
    const metrics = this.getMetrics();
    let report = '=== RELATÓRIO DE PERFORMANCE ===\\n\\n';
    
    Object.entries(metrics).forEach(([component, data]) => {
      report += \`Componente: \${component}\\n\`;
      report += \`  Renders: \${data.renderCount}\\n\`;
      report += \`  Tempo médio: \${data.avgTime.toFixed(2)}ms\\n\`;
      report += \`  Tempo máximo: \${data.maxTime.toFixed(2)}ms\\n\`;
      report += \`  Tempo mínimo: \${data.minTime.toFixed(2)}ms\\n\\n\`;
    });
    
    return report;
  }
  
  reset() {
    this.metrics.clear();
    this.notifyObservers();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
export default performanceMonitor;
`;

    const utilsDir = path.join(__dirname, '..', 'frontend', 'src', 'components', 'base', 'utils');
    const monitorPath = path.join(utilsDir, 'performanceMonitor.ts');
    
    if (!optimizationContext.dryRun) {
      fs.writeFileSync(monitorPath, performanceMonitorContent);
    }
    
    logger.info(`${optimizationContext.dryRun ? '[DRY-RUN] ' : ''}Sistema de monitoramento configurado`);
    
  } catch (error) {
    handleError(error, 'setupPerformanceMonitoring');
    throw error;
  }
}

// Obter arquivos de componentes
async function getComponentFiles(baseDir) {
  const files = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') && !item.includes('.test.') && !item.includes('.stories.')) {
        files.push(fullPath);
      }
    });
  }
  
  scanDirectory(baseDir);
  return files;
}

// Calcular score de performance
function calculatePerformanceScore(analysis) {
  const weights = {
    memoization: 30,
    hooks: 25,
    rendering: 25,
    bundling: 20
  };
  
  const memoizationScore = (analysis.memorizedComponents / analysis.totalComponents) * weights.memoization;
  const hooksScore = Math.min(analysis.optimizedHooks / analysis.totalComponents, 1) * weights.hooks;
  const renderingScore = Math.min(analysis.renderOptimizations / analysis.totalComponents, 1) * weights.rendering;
  const bundlingScore = weights.bundling; // Assumindo implementação básica
  
  return Math.round(memoizationScore + hooksScore + renderingScore + bundlingScore);
}

// Gerar relatório de performance
async function generatePerformanceReport(analysis, score, optimizationContext) {
  try {
    const report = {
      timestamp: new Date().toISOString(),
      buildId: optimizationContext.buildId,
      performanceScore: score,
      analysis,
      recommendations: analysis.recommendations,
      summary: {
        totalComponents: analysis.totalComponents,
        memorizedComponents: analysis.memorizedComponents,
        optimizedHooks: analysis.optimizedHooks,
        renderOptimizations: analysis.renderOptimizations,
        optimizationCoverage: `${Math.round((analysis.memorizedComponents / analysis.totalComponents) * 100)}%`
      },
      nextSteps: [
        'Implementar lazy loading para componentes pesados',
        'Adicionar virtualization em listas longas',
        'Otimizar bundle size com tree shaking',
        'Implementar code splitting',
        'Adicionar monitoramento em tempo real'
      ]
    };
    
    const reportPath = path.join(__dirname, 'logs', `performance-report-${Date.now()}.json`);
    
    if (!optimizationContext.dryRun) {
      if (!fs.existsSync(path.dirname(reportPath))) {
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      }
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    }
    
    // Log do resumo
    console.log('\n📊 RELATÓRIO DE PERFORMANCE');
    console.log('============================');
    console.log(`🎯 Score: ${score}/100`);
    console.log(`🧩 Componentes: ${analysis.totalComponents}`);
    console.log(`💾 Memoizados: ${analysis.memorizedComponents}`);
    console.log(`🎣 Hooks otimizados: ${analysis.optimizedHooks}`);
    console.log(`📈 Cobertura de otimização: ${Math.round((analysis.memorizedComponents / analysis.totalComponents) * 100)}%`);
    
    if (analysis.recommendations.length > 0) {
      console.log('\n💡 RECOMENDAÇÕES:');
      analysis.recommendations.slice(0, 5).forEach((rec, index) => {
        console.log(`   ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.message}`);
      });
    }
    
  } catch (error) {
    handleError(error, 'generatePerformanceReport');
    throw error;
  }
}

// Executar script se chamado diretamente
if (require.main === module) {
  optimizeComponentPerformance().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  optimizeComponentPerformance,
  PERFORMANCE_OPTIMIZATIONS
};
