







import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from '../../shared/components/ui/Button';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


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
}:`, error.message);
  // Implementar logging, notificação, etc.
}
import { Input } from '../../shared/components/ui/Input';

interface BudgetFormData {
  name: string;
  amount: string;
  category: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

interface BudgetFormProps {
  data: BudgetFormData;
  onChange: (data: BudgetFormData) => void;
  onSubmit: () => void;
  loading?: boolean;
}

const categories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Vestuário',
  'Outros'
];

export const BudgetForm: React.FC<BudgetFormProps> = ({ 
  data, 
  onChange, 
  onSubmit, 
  loading = false 
}) => {
  const handleChange = (field: keyof BudgetFormData, value: string | Date) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nome do Orçamento</Text>
          <Input
            value={data.name}
            onChangeText={(value) => handleChange('name', value)}
            placeholder="Ex: Orçamento Mensal"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Valor Total</Text>
          <Input
            value={data.amount}
            onChangeText={(value) => handleChange('amount', value)}
            placeholder="0,00"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <Button
                key={category}
                title={category}
                onPress={() => handleChange('category', category)}
                style={[
                  styles.categoryButton,
                  data.category === category && styles.selectedCategory
                ]}
                textStyle={[
                  styles.categoryButtonText,
                  data.category === category && styles.selectedCategoryText
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Data de Início</Text>
          <Input
            value={data.startDate.toLocaleDateString()}
            onChangeText={(value) => handleChange('startDate', new Date(value))}
            placeholder="DD/MM/AAAA"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Data de Fim</Text>
          <Input
            value={data.endDate.toLocaleDateString()}
            onChangeText={(value) => handleChange('endDate', new Date(value))}
            placeholder="DD/MM/AAAA"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Descrição (opcional)</Text>
          <TextInput
            value={data.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Descreva o orçamento..."
            style={styles.textArea}
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          title={loading ? 'Criando...' : 'Criar Orçamento'}
          onPress={onSubmit}
          disabled={loading || !data.name || !data.amount || !data.category}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
  },
});



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