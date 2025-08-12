/**
 * @fileoverview LazyComponent - Wrapper para lazy loading
 * @version 2.0.0
 * @generated 2025-01-27T11:30:00.000Z
 */

import React, { Suspense, memo, ComponentType, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from './utils/theme';

export interface LazyComponentProps {
  fallback?: React.ReactElement;
  children: React.ReactElement;
  loadingText?: string;
  delay?: number;
}

export const LazyComponent = memo<LazyComponentProps>(({
  fallback,
  children,
  loadingText = 'Carregando...',
  delay = 0
}) => {
  const theme = useTheme();
  const [isReady, setIsReady] = useState(delay === 0);
  
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setIsReady(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  const defaultFallback = (
    <View style={[styles.fallbackContainer, { backgroundColor: theme.colors.surface }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
  
  if (!isReady) {
    return fallback || defaultFallback;
  }
  
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
  options?: {
    fallback?: React.ReactElement;
    delay?: number;
    preload?: boolean;
  }
) => {
  const { fallback, delay = 0, preload = false } = options || {};
  
  // Preload component se especificado
  const LazyWrappedComponent = preload 
    ? Component 
    : React.lazy(() => Promise.resolve({ default: Component }));
  
  return memo((props: P) => (
    <LazyComponent fallback={fallback} delay={delay}>
      <LazyWrappedComponent {...props} />
    </LazyComponent>
  ));
};

// Hook para lazy loading dinâmico
export const useLazyComponent = <P extends object>(
  componentFactory: () => Promise<{ default: ComponentType<P> }>,
  deps: any[] = []
) => {
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const loadComponent = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const module = await componentFactory();
      setComponent(() => module.default);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load component'));
    } finally {
      setLoading(false);
    }
  }, deps);
  
  return {
    Component,
    loading,
    error,
    loadComponent
  };
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
});

export default LazyComponent;
