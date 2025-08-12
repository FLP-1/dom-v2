

/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Componente React/React Native
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * <ComponentName prop={value} />
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import React from 'react';

function console.error('Error in context: string:', error: Error);: void {
  console.error(`[ERROR] ${context}

function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}

function log(level: string, message: string, data?: unknown): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}

function typeof value: unknown === expectedType: string: boolean {
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
}
import { Text, StyleSheet} from 'react-native';

// Tipos para o componente
export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartData[];
  type?: 'bar' | 'pie' | 'line' | 'donut';
  title?: string;
  height?: number;
  width?: number;
  showValues?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  colors?: string[];
  style?: unknown;
}

export interface BarChartProps extends ChartProps {
  orientation?: 'horizontal' | 'vertical';
  barSpacing?: number;
}

export interface PieChartProps extends ChartProps {
  showPercentage?: boolean;
  innerRadius?: number;
}

const DEFAULT_COLORS = [
  '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1',
  '#fd7e14', '#20c997', '#e83e8c', '#6c757d', '#17a2b8'
];

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  height = 300,
  width,
  showValues = true,
  showLabels = true,
  orientation = 'vertical',
  barSpacing = 8,
  colors = DEFAULT_COLORS,
  style
}) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const chartWidth = width || Dimensions.get('window').width - 40;
  const chartHeight = height;
  const barWidth = orientation === 'vertical' 
    ? (chartWidth - (data.length - 1) * barSpacing) / data.length
    : 30;
  const barMaxHeight = orientation === 'vertical' 
    ? chartHeight - 60 
    : chartWidth - 80;

  return (
    <View style={[styles.container, { width: chartWidth, height: chartHeight }, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <View style={[
        styles.chartContainer,
        orientation === 'horizontal' && styles.horizontalChart
      ]}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * barMaxHeight;
          const color = item.color || colors[index % colors.length];
          
          return (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  orientation === 'vertical' ? {
                    width: barWidth,
                    height: barHeight,
                    backgroundColor: color,
                    marginRight: barSpacing,
                  } : {
                    width: barHeight,
                    height: barWidth,
                    backgroundColor: color,
                    marginBottom: barSpacing,
                  }
                ]}
              />
              {showValues && (
                <Text style={[
                  styles.valueText,
                  orientation === 'vertical' ? styles.verticalValue : styles.horizontalValue
                ]}>
                  {item.value}
                </Text>
              )}
              {showLabels && (
                <Text style={[
                  styles.labelText,
                  orientation === 'vertical' ? styles.verticalLabel : styles.horizontalLabel
                ]} numberOfLines={2}>
                  {item.label}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  height = 300,
  width,
  showValues = true,
  showLabels = true,
  showLegend = true,
  showPercentage = true,
  innerRadius = 0,
  colors = DEFAULT_COLORS,
  style
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const chartSize = Math.min(height, width || Dimensions.get('window').width - 40);
  const radius = (chartSize - 80) / 2;
  const center = chartSize / 2;

  return (
    <View style={[styles.container, { width: chartSize, height: chartSize }, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <View style={styles.pieContainer}>
        <View style={[styles.pieChart, { width: chartSize, height: chartSize }]}>
          {/* Por simplicidade, vamos mostrar um placeholder  */}
          <View style={styles.piePlaceholder}>
            <Text style={styles.piePlaceholderSubtext}>
            </Text>
          </View>
        </View>
      </View>
      
      {showLegend && (
        <View style={styles.legend}>
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            const color = item.color || colors[index % colors.length];
            
            return (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: color }]} />
                <View style={styles.legendText}>
                  <Text style={styles.legendLabel} numberOfLines={1}>
                    {item.label}
                  </Text>
                  {showValues && (
                    <Text style={styles.legendValue}>
                      {item.value} {showPercentage && `(${percentage}%)`}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const Chart: React.FC<ChartProps> = ({
  data,
  type = 'bar',
  ...props
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
      </View>
    );
  }

  switch (type) {
    case 'pie':
    case 'donut':
      return <PieChart data={data} {...props} />;
    case 'bar':
    default:
      return <BarChart data={data} {...props} />;
  }
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  horizontalChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    borderRadius: 4,
  },
  valueText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#495057',
    marginTop: 4,
  },
  verticalValue: {
    textAlign: 'center',
  },
  horizontalValue: {
    position: 'absolute',
    right: -20,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  labelText: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 4,
  },
  verticalLabel: {
    width: '100%',
  },
  horizontalLabel: {
    position: 'absolute',
    left: -20,
    bottom: -20,
    width: 40,
    textAlign: 'center',
  },
  pieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  piePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
  },
  piePlaceholderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6c757d',
  },
  piePlaceholderSubtext: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  legend: {
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 14,
    color: '#212529',
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 12,
    color: '#6c757d',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export { BarChart, PieChart };
export default Chart; 

 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */