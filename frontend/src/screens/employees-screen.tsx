import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  status: string;
  hireDate: string;
}

export const EmployeesScreen: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      // Implementar chamada para API
      const response = await fetch('/api/employees');
      const data = await response.json();
      
      if (data.success) {
        setEmployees(data.data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar funcionários');
    } finally {
      setLoading(false);
    }
  };

  const renderEmployee = ({ item }: { item: Employee }) => (
    <View style={styles.employeeItem}>
      <View style={styles.employeeHeader}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={[
          styles.employeeStatus,
          { color: getStatusColor(item.status) }
        ]}>
          {item.status}
        </Text>
      </View>
      
      <Text style={styles.employeePosition}>{item.position}</Text>
      <Text style={styles.employeeEmail}>{item.email}</Text>
      <Text style={styles.employeePhone}>{item.phone}</Text>
      <Text style={styles.employeeSalary}>
        R$ {item.salary.toFixed(2)}
      </Text>
      <Text style={styles.employeeDate}>
        Contratado em: {new Date(item.hireDate).toLocaleDateString()}
      </Text>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#4CAF50';
      case 'INACTIVE': return '#F44336';
      case 'ON_LEAVE': return '#FF9800';
      default: return '#000000';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando funcionários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funcionários</Text>
      
      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Novo Funcionário</Text>
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
  employeeItem: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  employeeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  employeeStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  employeePosition: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 5,
  },
  employeeEmail: {
    fontSize: 14,
    marginBottom: 5,
  },
  employeePhone: {
    fontSize: 14,
    marginBottom: 5,
  },
  employeeSalary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  employeeDate: {
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

export default EmployeesScreen;