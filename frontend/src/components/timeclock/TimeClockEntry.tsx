







function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}




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
}

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Employee, TimeClockRecord, LocationValidation } from './TimeClockSystem';

interface TimeClockEntryProps {
  employee: Employee;
  currentLocation: {
    latitude: number;
    longitude: number;
    location: string;
  } | null;
  onSave: (type: TimeClockRecord['type'], notes?: string) => void;
  onCancel: () => void;
  validateLocation: (lat: number, lng: number) => LocationValidation;
}

export const TimeClockEntry: React.FC<TimeClockEntryProps> = ({
  employee,
  currentLocation,
  onSave,
  onCancel,
  validateLocation,
}) => {
  const [selectedType, setSelectedType] = useState<TimeClockRecord['type']>('entry');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!currentLocation) {
      Alert.alert('Erro', 'Localização não disponível');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(selectedType, notes.trim() || undefined);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar ponto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeLabel = (type: TimeClockRecord['type']): string => {
    switch (type) {
      case 'entry':
        return 'Entrada';
      case 'exit':
        return 'Saída';
      case 'break_start':
        return 'Início Pausa';
      case 'break_end':
        return 'Fim Pausa';
      default:
        return 'Entrada';
    }
  };

  const getTypeIcon = (type: TimeClockRecord['type']): string => {
    switch (type) {
      case 'entry':
        return '🟢';
      case 'exit':
        return '🔴';
      case 'break_start':
        return '🟡';
      case 'break_end':
        return '🟢';
      default:
        return '🟢';
    }
  };

  const locationValidation = currentLocation 
    ? validateLocation(currentLocation.latitude, currentLocation.longitude)
    : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Registrar Ponto</Text>
        <Text style={styles.employeeName}>{employee.name}</Text>
        <Text style={styles.employeePosition}>{employee.position}</Text>
      </View>

      {/* Informações de Localização  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localização</Text>
        
        {currentLocation ? (
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{currentLocation.location}</Text>
            </View>
            
            <View style={styles.coordinatesInfo}>
              <Text style={styles.coordinatesText}>
                Lat: {currentLocation.latitude.toFixed(6)}
              </Text>
              <Text style={styles.coordinatesText}>
                Lng: {currentLocation.longitude.toFixed(6)}
              </Text>
            </View>

            {locationValidation && (
              <View style={[
                styles.validationBadge,
                { backgroundColor: locationValidation.isValid ? '#d4edda' : '#f8d7da' }
              ]}>
                <Text style={[
                  styles.validationText,
                  { color: locationValidation.isValid ? '#155724' : '#721c24' }
                ]}>
                  {locationValidation.message}
                </Text>
                <Text style={[
                  styles.validationDistance,
                  { color: locationValidation.isValid ? '#155724' : '#721c24' }
                ]}>
                  Distância: {locationValidation.distance.toFixed(0)}m
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.locationCard}>
            <ActivityIndicator size="small" color="#007bff" />
            <Text style={styles.loadingText}>Obtendo localização...</Text>
          </View>
        )}
      </View>

      {/* Seleção do Tipo de Registro  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipo de Registro</Text>
        
        <View style={styles.typeOptions}>
          {(['entry', 'exit', 'break_start', 'break_end'] as const).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeOption,
                selectedType === type && styles.selectedTypeOption,
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={styles.typeIcon}>{getTypeIcon(type)}</Text>
              <Text style={[
                styles.typeLabel,
                selectedType === type && styles.selectedTypeLabel,
              ]}>
                {getTypeLabel(type)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Observações  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observações (Opcional)</Text>
        
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Adicione observações sobre o registro..."
          multiline
          numberOfLines={3}
          maxLength={200}
        />
        
        <Text style={styles.characterCount}>
          {notes.length}/200 caracteres
        </Text>
      </View>

      {/* Informações do Sistema  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data/Hora:</Text>
            <Text style={styles.infoValue}>
              {new Date().toLocaleString('pt-BR')}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dispositivo:</Text>
            <Text style={styles.infoValue}>Mobile App</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[
              styles.infoValue,
              { color: locationValidation?.isValid ? '#28a745' : '#dc3545' }
            ]}>
              {locationValidation?.isValid ? 'Válido' : 'Inválido'}
            </Text>
          </View>
        </View>
      </View>

      {/* Botões  */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.button,
            styles.saveButton,
            (!currentLocation || isSubmitting) && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={!currentLocation || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Registrar Ponto</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 2,
  },
  employeePosition: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  coordinatesInfo: {
    marginBottom: 10,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  validationBadge: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  validationText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  validationDistance: {
    fontSize: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  typeOption: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e1e5e9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedTypeOption: {
    borderColor: '#007bff',
    backgroundColor: '#e3f2fd',
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  selectedTypeLabel: {
    color: '#007bff',
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TimeClockEntry; 


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