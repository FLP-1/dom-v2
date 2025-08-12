

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
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

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
import { useRegionalAdaptation, BrazilianRegion } from '../utils/regional-adaptation';

interface RegionalSelectorProps {
  visible?: boolean;
}

export const RegionalSelector: React.FC<RegionalSelectorProps> = ({ visible = true }) => {
  const { region, setRegion, messages, loading } = useRegionalAdaptation();
  
  const regions: { value: BrazilianRegion; label: string; description: string }[] = [
    { value: 'SUDESTE', label: 'Sudeste', description: 'SP, RJ, MG, ES - Profissional' },
    { value: 'SUL', label: 'Sul', description: 'RS, SC, PR - Organizado' },
    { value: 'NORTE', label: 'Norte', description: 'AM, PA, AC, etc. - Educativo' },
  ];

  if (!visible) return null;

  if (loading) {
    return (
      <View style={styles.container}>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.regionsContainer}>
        {regions.map((regionOption) => (
          <TouchableOpacity
            key={regionOption.value}
            style={[
              styles.regionButton,
              region === regionOption.value && styles.activeRegionButton
            ]}
            onPress={() => setRegion(regionOption.value)}
          >
            <Text style={[
              styles.regionText,
              region === regionOption.value && styles.activeRegionText
            ]}>
              {regionOption.label}
            </Text>
            <Text style={[
              styles.regionDescription,
              region === regionOption.value && styles.activeRegionDescription
            ]}>
              {regionOption.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {regions.find(r => r.value === region)?.label}
        </Text>
        <Text style={styles.infoSubtext}>
          {messages.welcome}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f8ff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  regionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  regionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    minWidth: 100,
  },
  activeRegionButton: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  regionText: {
    fontSize: 12,
    color: '#34495e',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeRegionText: {
    color: '#ffffff',
  },
  regionDescription: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 2,
  },
  activeRegionDescription: {
    color: '#ecf0f1',
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#3498db',
  },
  infoSubtext: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
}); 

 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */