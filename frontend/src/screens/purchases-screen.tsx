








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

import React, { useState, useEffect } from 'react';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface Purchase {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
}

export const PurchasesScreen: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      setLoading(true);
      // Implementar chamada para API
      const response = await fetch('/api/purchases');
      const data = await response.json();
      
      if (data.success) {
        setPurchases(data.data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar compras');
    } finally {
      setLoading(false);
    }
  };

  const renderPurchase = ({ item }: { item: Purchase }) => (
    <View style={styles.purchaseItem}>
      <View style={styles.purchaseHeader}>
        <Text style={styles.purchaseTitle}>{item.title}</Text>
        <Text style={[
          styles.purchaseStatus,
          { color: getStatusColor(item.status) }
        ]}>
          {item.status}
        </Text>
      </View>
      
      <Text style={styles.purchaseAmount}>
        R$ {item.amount.toFixed(2)}
      </Text>
      <Text style={styles.purchaseCategory}>{item.category}</Text>
      <Text style={styles.purchaseDescription}>{item.description}</Text>
      <Text style={styles.purchaseDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return '#4CAF50';
      case 'PENDING': return '#FF9800';
      case 'REJECTED': return '#F44336';
      case 'COMPLETED': return '#2196F3';
      default: return '#000000';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando compras...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compras</Text>
      
      <FlatList
        data={purchases}
        renderItem={renderPurchase}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Nova Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  purchaseItem: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  purchaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  purchaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  purchaseStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  purchaseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  purchaseCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  purchaseDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  purchaseDate: {
    fontSize: 12,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PurchasesScreen;


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