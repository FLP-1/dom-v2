/**
 * @fileoverview usePerformanceMonitor - Hook para monitoramento de performance
 * @version 2.0.0
 * @generated 2025-01-27T11:30:00.000Z
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
      
      // Log performance warnings (apenas em desenvolvimento)
      if (__DEV__ && renderTime > 16.67) { // 60fps threshold
        console.warn(`[PERFORMANCE] ${componentName} render took ${renderTime.toFixed(2)}ms (>16.67ms)`);
      }
      
      if (__DEV__ && renderCountRef.current > 50 && averageRenderTime > 10) {
        console.warn(`[PERFORMANCE] ${componentName} average render time: ${averageRenderTime.toFixed(2)}ms`);
      }
    };
  });
  
  return performanceData;
};

export default usePerformanceMonitor;
