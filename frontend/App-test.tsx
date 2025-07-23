import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 DOM v2 - TESTE FUNCIONANDO!</Text>
      <Text style={styles.subtitle}>Backend: Porta 3001 ✅</Text>
      <Text style={styles.subtitle}>Frontend: Porta 8081 ✅</Text>
      <Text style={styles.subtitle}>Micro-frontend Folha de Pagamento ✅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
}); 