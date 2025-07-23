import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface Payment {
  id: number;
  amount: number;
  currency: string;
  method: string;
  status: string;
  description: string;
  createdAt: string;
}

export const PaymentsScreen: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      // Implementar chamada para API
      const response = await fetch('/api/payments');
      const data = await response.json();
      
      if (data.success) {
        setPayments(data.data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar pagamentos');
    } finally {
      setLoading(false);
    }
  };

  const renderPayment = ({ item }: { item: Payment }) => (
    <View style={styles.paymentItem}>
      <View style={styles.paymentHeader}>
        <Text style={styles.paymentAmount}>
          R$ {item.amount.toFixed(2)}
        </Text>
        <Text style={[
          styles.paymentStatus,
          { color: getStatusColor(item.status) }
        ]}>
          {item.status}
        </Text>
      </View>
      
      <Text style={styles.paymentMethod}>{item.method}</Text>
      <Text style={styles.paymentDescription}>{item.description}</Text>
      <Text style={styles.paymentDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROCESSED': return '#4CAF50';
      case 'PENDING': return '#FF9800';
      case 'FAILED': return '#F44336';
      case 'CANCELLED': return '#9E9E9E';
      default: return '#000000';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando pagamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamentos</Text>
      
      <FlatList
        data={payments}
        renderItem={renderPayment}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Novo Pagamento</Text>
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
  paymentItem: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  paymentDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  paymentDate: {
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

export default PaymentsScreen;