/**
 * @fileoverview Performance Monitor - Sistema de monitoramento de performance
 * @version 2.0.0
 * @generated 2025-01-27T11:30:00.000Z
 */

export interface ComponentMetrics {
  renderCount: number;
  totalTime: number;
  maxTime: number;
  minTime: number;
  avgTime: number;
  lastRenderTime: number;
  memoryUsage?: number;
}

export interface PerformanceAlert {
  componentName: string;
  type: 'slow-render' | 'frequent-renders' | 'memory-leak';
  message: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high';
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, ComponentMetrics> = new Map();
  private observers: Array<(metrics: Record<string, ComponentMetrics>) => void> = [];
  private alertObservers: Array<(alert: PerformanceAlert) => void> = [];
  private isEnabled: boolean = __DEV__;
  
  // Thresholds para alertas
  private readonly SLOW_RENDER_THRESHOLD = 16.67; // 60fps
  private readonly FREQUENT_RENDER_THRESHOLD = 100;
  private readonly MEMORY_LEAK_THRESHOLD = 50 * 1024 * 1024; // 50MB
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  enable() {
    this.isEnabled = true;
  }
  
  disable() {
    this.isEnabled = false;
  }
  
  trackComponentRender(componentName: string, renderTime: number, memoryUsage?: number) {
    if (!this.isEnabled) return;
    
    const existing = this.metrics.get(componentName) || {
      renderCount: 0,
      totalTime: 0,
      maxTime: 0,
      minTime: Infinity,
      avgTime: 0,
      lastRenderTime: 0
    };
    
    existing.renderCount += 1;
    existing.totalTime += renderTime;
    existing.maxTime = Math.max(existing.maxTime, renderTime);
    existing.minTime = Math.min(existing.minTime, renderTime);
    existing.avgTime = existing.totalTime / existing.renderCount;
    existing.lastRenderTime = renderTime;
    
    if (memoryUsage) {
      existing.memoryUsage = memoryUsage;
    }
    
    this.metrics.set(componentName, existing);
    
    // Verificar se é necessário gerar alertas
    this.checkForAlerts(componentName, existing);
    
    this.notifyObservers();
  }
  
  private checkForAlerts(componentName: string, metrics: ComponentMetrics) {
    const alerts: PerformanceAlert[] = [];
    
    // Alerta para renders lentos
    if (metrics.lastRenderTime > this.SLOW_RENDER_THRESHOLD) {
      alerts.push({
        componentName,
        type: 'slow-render',
        message: `Render demorou ${metrics.lastRenderTime.toFixed(2)}ms (ideal: <16.67ms)`,
        timestamp: Date.now(),
        severity: metrics.lastRenderTime > 50 ? 'high' : 'medium'
      });
    }
    
    // Alerta para muitos renders
    if (metrics.renderCount > this.FREQUENT_RENDER_THRESHOLD && 
        metrics.renderCount % 50 === 0) {
      alerts.push({
        componentName,
        type: 'frequent-renders',
        message: `Componente foi renderizado ${metrics.renderCount} vezes`,
        timestamp: Date.now(),
        severity: 'medium'
      });
    }
    
    // Alerta para possível vazamento de memória
    if (metrics.memoryUsage && metrics.memoryUsage > this.MEMORY_LEAK_THRESHOLD) {
      alerts.push({
        componentName,
        type: 'memory-leak',
        message: `Alto uso de memória: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`,
        timestamp: Date.now(),
        severity: 'high'
      });
    }
    
    // Notificar observadores de alertas
    alerts.forEach(alert => {
      this.alertObservers.forEach(observer => observer(alert));
    });
  }
  
  getMetrics(): Record<string, ComponentMetrics> {
    const result: Record<string, ComponentMetrics> = {};
    this.metrics.forEach((value, key) => {
      result[key] = { ...value };
    });
    return result;
  }
  
  getComponentMetrics(componentName: string): ComponentMetrics | null {
    return this.metrics.get(componentName) || null;
  }
  
  getTopSlowComponents(limit: number = 5): Array<{ name: string; metrics: ComponentMetrics }> {
    return Array.from(this.metrics.entries())
      .map(([name, metrics]) => ({ name, metrics }))
      .sort((a, b) => b.metrics.avgTime - a.metrics.avgTime)
      .slice(0, limit);
  }
  
  getTopFrequentComponents(limit: number = 5): Array<{ name: string; metrics: ComponentMetrics }> {
    return Array.from(this.metrics.entries())
      .map(([name, metrics]) => ({ name, metrics }))
      .sort((a, b) => b.metrics.renderCount - a.metrics.renderCount)
      .slice(0, limit);
  }
  
  subscribe(callback: (metrics: Record<string, ComponentMetrics>) => void) {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }
  
  subscribeToAlerts(callback: (alert: PerformanceAlert) => void) {
    this.alertObservers.push(callback);
    return () => {
      const index = this.alertObservers.indexOf(callback);
      if (index > -1) {
        this.alertObservers.splice(index, 1);
      }
    };
  }
  
  private notifyObservers() {
    const metrics = this.getMetrics();
    this.observers.forEach(callback => callback(metrics));
  }
  
  generateReport(): string {
    const metrics = this.getMetrics();
    const totalComponents = Object.keys(metrics).length;
    const totalRenders = Object.values(metrics).reduce((sum, m) => sum + m.renderCount, 0);
    const avgRenderTime = Object.values(metrics).reduce((sum, m) => sum + m.avgTime, 0) / totalComponents;
    
    let report = '=== RELATÓRIO DE PERFORMANCE ===\n\n';
    report += `📊 Resumo Geral:\n`;
    report += `   Componentes monitorados: ${totalComponents}\n`;
    report += `   Total de renders: ${totalRenders}\n`;
    report += `   Tempo médio de render: ${avgRenderTime.toFixed(2)}ms\n\n`;
    
    report += `🐌 Top 5 Componentes Mais Lentos:\n`;
    this.getTopSlowComponents().forEach((item, index) => {
      report += `   ${index + 1}. ${item.name}: ${item.metrics.avgTime.toFixed(2)}ms (${item.metrics.renderCount} renders)\n`;
    });
    
    report += `\n🔄 Top 5 Componentes Mais Renderizados:\n`;
    this.getTopFrequentComponents().forEach((item, index) => {
      report += `   ${index + 1}. ${item.name}: ${item.metrics.renderCount} renders (${item.metrics.avgTime.toFixed(2)}ms avg)\n`;
    });
    
    const slowComponents = Object.entries(metrics).filter(([_, m]) => m.avgTime > this.SLOW_RENDER_THRESHOLD);
    if (slowComponents.length > 0) {
      report += `\n⚠️  Componentes que precisam de otimização:\n`;
      slowComponents.forEach(([name, metric]) => {
        report += `   • ${name}: ${metric.avgTime.toFixed(2)}ms (${metric.renderCount} renders)\n`;
      });
    }
    
    return report;
  }
  
  exportMetrics(): string {
    return JSON.stringify({
      timestamp: Date.now(),
      metrics: this.getMetrics(),
      summary: {
        totalComponents: this.metrics.size,
        totalRenders: Array.from(this.metrics.values()).reduce((sum, m) => sum + m.renderCount, 0),
        averageRenderTime: Array.from(this.metrics.values()).reduce((sum, m) => sum + m.avgTime, 0) / this.metrics.size
      }
    }, null, 2);
  }
  
  reset() {
    this.metrics.clear();
    this.notifyObservers();
  }
  
  // Método para benchmark de componentes
  async benchmarkComponent<T>(
    componentName: string,
    testFunction: () => T,
    iterations: number = 100
  ): Promise<{ result: T; averageTime: number; minTime: number; maxTime: number }> {
    const times: number[] = [];
    let result: T;
    
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      result = testFunction();
      const end = performance.now();
      times.push(end - start);
    }
    
    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    
    console.log(`[BENCHMARK] ${componentName}: avg=${averageTime.toFixed(2)}ms, min=${minTime.toFixed(2)}ms, max=${maxTime.toFixed(2)}ms`);
    
    return {
      result: result!,
      averageTime,
      minTime,
      maxTime
    };
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Hook para acessar métricas em tempo real
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = React.useState<Record<string, ComponentMetrics>>({});
  
  React.useEffect(() => {
    return performanceMonitor.subscribe(setMetrics);
  }, []);
  
  return metrics;
};

export default performanceMonitor;
