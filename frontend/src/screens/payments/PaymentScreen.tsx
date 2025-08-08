import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import usePayments from '../../hooks/usePayments';

const PaymentScreen: React.FC = () => {
  const { payments, loading, error, addPayment } = usePayments();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pagamentos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addPayment({ amount: 199.9, description: `Pagamento ${payments.length + 1}` })}
        >
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator color="#6366f1" />
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && (
        <FlatList
          data={payments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.description}</Text>
              <Text style={styles.cardSubtitle}>R$ {item.amount?.toFixed(2)}</Text>
              {!!item.status && <Text style={styles.status}>{item.status}</Text>}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  addButton: { backgroundColor: '#6366f1', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  center: { paddingVertical: 20 },
  error: { color: '#ef4444', marginBottom: 12 },
  list: { gap: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  cardSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  status: { marginTop: 8, fontSize: 12, color: '#6366f1' },
});

export default PaymentScreen;


