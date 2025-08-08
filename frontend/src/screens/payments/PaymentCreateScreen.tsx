import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import usePayments from '../../hooks/usePayments';

const PaymentCreateScreen: React.FC = () => {
  const { addPayment, loading } = usePayments();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleCreate = async () => {
    const parsed = Number(amount);
    if (!description || !amount || Number.isNaN(parsed)) {
      Alert.alert('Validação', 'Informe descrição e valor numérico.');
      return;
    }
    const created = await addPayment({ description, amount: parsed });
    if (created) {
      Alert.alert('Sucesso', 'Pagamento criado.');
      setDescription('');
      setAmount('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Pagamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor (R$)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Criar</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  button: { backgroundColor: '#10b981', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default PaymentCreateScreen;


