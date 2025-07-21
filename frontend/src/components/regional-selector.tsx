/**
 * @fileoverview Seletor de região brasileira para testes
 * @directory frontend/src/components
 * @description Componente para testar diferentes adaptações regionais
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRegionalAdaptation, BrazilianRegion } from '../utils/regional-adaptation';

interface RegionalSelectorProps {
  visible?: boolean;
}

export const RegionalSelector: React.FC<RegionalSelectorProps> = ({ visible = true }) => {
  const { region, setRegion, messages, loading } = useRegionalAdaptation();
  
  const regions: { value: BrazilianRegion; label: string; description: string }[] = [
    { value: 'SUDESTE', label: 'Sudeste', description: 'SP, RJ, MG, ES - Profissional' },
    { value: 'SUL', label: 'Sul', description: 'RS, SC, PR - Organizado' },
    { value: 'NORDESTE', label: 'Nordeste', description: 'BA, PE, CE, etc. - Amigável' },
    { value: 'CENTRO_OESTE', label: 'Centro-Oeste', description: 'GO, MT, MS, DF - Prático' },
    { value: 'NORTE', label: 'Norte', description: 'AM, PA, AC, etc. - Educativo' },
  ];

  if (!visible) return null;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detectando sua região...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua Região:</Text>
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
        <Text style={styles.infoTitle}>Região Atual:</Text>
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