// Componente Task - Micro-frontend de Controle de Tarefas
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import ApiClient from '../../utils/api-client';

interface Task {
  id: string;
  titulo: string;
  descricao?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  prioridade: number;
  criador_id: string;
  responsavel_id?: string;
  categoria?: string;
  data_criacao: string;
  data_limite?: string;
  ativo: boolean;
}

interface TaskComponentProps {
  onBack?: () => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ onBack }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({
    titulo: '',
    descricao: '',
    status: 'pending' as const,
    prioridade: 1,
    categoria: '',
    criador_id: '550e8400-e29b-41d4-a716-446655440000', // UUID fixo para teste
    responsavel_id: '550e8400-e29b-41d4-a716-446655440001' // UUID fixo para teste
  });

  // Carregar tarefas
  const loadTasks = async () => {
    try {
      const response = await ApiClient.get('/api/tasks');
      
      if (response.success) {
        setTasks(response.data.data);
      } else {
        Alert.alert('Erro', response.error || 'Não foi possível carregar as tarefas');
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as tarefas');
    } finally {
      setLoading(false);
    }
  };

  // Criar nova tarefa
  const createTask = async () => {
    try {
      const response = await ApiClient.post('/api/tasks', newTask);
      
      if (response.success) {
        Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
        setShowCreateForm(false);
        setNewTask({
          titulo: '',
          descricao: '',
          status: 'pending',
          prioridade: 1,
          categoria: '',
          criador_id: '550e8400-e29b-41d4-a716-446655440000',
          responsavel_id: '550e8400-e29b-41d4-a716-446655440001'
        });
        loadTasks();
      } else {
        Alert.alert('Erro', response.error || 'Não foi possível criar a tarefa');
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível criar a tarefa');
    }
  };

  // Marcar tarefa como concluída
  const completeTask = async (taskId: string) => {
    try {
      const response = await ApiClient.put(`/api/tasks/${taskId}/complete`);
      
      if (response.success) {
        Alert.alert('Sucesso', 'Tarefa marcada como concluída!');
        loadTasks();
      } else {
        Alert.alert('Erro', response.error || 'Não foi possível completar a tarefa');
      }
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível completar a tarefa');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'in_progress':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Progresso';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1:
        return 'Baixa';
      case 2:
        return 'Média';
      case 3:
        return 'Alta';
      case 4:
        return 'Urgente';
      default:
        return 'Baixa';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Gerenciamento de Tarefas</Text>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => setShowCreateForm(true)}
        >
          <Text style={styles.createButtonText}>+ Nova Tarefa</Text>
        </TouchableOpacity>
      </View>

      {showCreateForm && (
        <View style={styles.createForm}>
          <Text style={styles.formTitle}>Criar Nova Tarefa</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Título da tarefa"
            value={newTask.titulo}
            onChangeText={(text) => setNewTask({...newTask, titulo: text})}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição (opcional)"
            value={newTask.descricao}
            onChangeText={(text) => setNewTask({...newTask, descricao: text})}
            multiline
            numberOfLines={3}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Categoria (opcional)"
            value={newTask.categoria}
            onChangeText={(text) => setNewTask({...newTask, categoria: text})}
          />
          
          <View style={styles.formActions}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setShowCreateForm(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={createTask}
            >
              <Text style={styles.saveButtonText}>Criar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={styles.taskList}>
        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{task.titulo}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(task.status)}</Text>
                </View>
              </View>
              
              {task.descricao && (
                <Text style={styles.taskDescription}>{task.descricao}</Text>
              )}
              
              <View style={styles.taskDetails}>
                <Text style={styles.taskDetail}>
                  📅 Criada em: {new Date(task.data_criacao).toLocaleDateString('pt-BR')}
                </Text>
                <Text style={styles.taskDetail}>
                  ⚡ Prioridade: {getPriorityText(task.prioridade)}
                </Text>
                {task.categoria && (
                  <Text style={styles.taskDetail}>
                    🏷️ Categoria: {task.categoria}
                  </Text>
                )}
              </View>
              
              {task.status === 'pending' && (
                <TouchableOpacity 
                  style={styles.completeButton}
                  onPress={() => completeTask(task.id)}
                >
                  <Text style={styles.completeButtonText}>✓ Marcar como Concluída</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
  actions: {
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createForm: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 4,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  taskDetails: {
    marginBottom: 10,
  },
  taskDetail: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});

export default TaskComponent; 