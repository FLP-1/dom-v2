/**
 * @fileoverview Tela de Tarefas do DOM v2
 * @directory frontend/src/screens
 * @description Lista e gerencia tarefas do usuário
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { TASK_MESSAGES, GENERAL_MESSAGES } from '../utils/messages';

// Componente Tooltip simples
interface TooltipProps {
  visible: boolean;
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, text, children }) => {
  if (!visible) return <>{children}</>;
  
  return (
    <View style={styles.tooltipContainer}>
      {children}
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>{text}</Text>
      </View>
    </View>
  );
};

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
}

interface TasksScreenProps {
  onBack: () => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({ onBack }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
  });
  const [showTitleTooltip, setShowTitleTooltip] = useState(false);
  const [showDescriptionTooltip, setShowDescriptionTooltip] = useState(false);

  // Carregar tarefas
  const loadTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks');
      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      Alert.alert(GENERAL_MESSAGES.ERROR, TASK_MESSAGES.ERROR_LOAD_TASKS);
    } finally {
      setLoading(false);
    }
  };

  // Criar nova tarefa
  const createTask = async () => {
    if (!newTask.title.trim()) {
      Alert.alert(GENERAL_MESSAGES.ERROR, TASK_MESSAGES.ERROR_EMPTY_TITLE);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (response.ok) {
        setTasks([...tasks, data.task]);
        setShowModal(false);
        setNewTask({ title: '', description: '', priority: 'medium' });
        Alert.alert(GENERAL_MESSAGES.SUCCESS, TASK_MESSAGES.SUCCESS_CREATE_TASK);
      } else {
        Alert.alert(GENERAL_MESSAGES.ERROR, data.error || TASK_MESSAGES.ERROR_CREATE_TASK);
      }
    } catch (error) {
      Alert.alert(GENERAL_MESSAGES.ERROR, TASK_MESSAGES.ERROR_CREATE_TASK);
    }
  };

  // Atualizar status da tarefa
  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === 'active' ? 'completed' : 'active';

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setTasks(tasks.map(t =>
          t.id === task.id ? { ...t, status: newStatus } : t
        ));
      }
    } catch (error) {
      Alert.alert(GENERAL_MESSAGES.ERROR, TASK_MESSAGES.ERROR_UPDATE_TASK);
    }
  };

  // Remover tarefa
  const deleteTask = async (taskId: string) => {
    Alert.alert(
      GENERAL_MESSAGES.REMOVE_TASK,
      TASK_MESSAGES.CONFIRM_DELETE_TASK,
      [
        { text: GENERAL_MESSAGES.CANCEL, style: 'cancel' },
        {
          text: GENERAL_MESSAGES.REMOVE,
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                setTasks(tasks.filter(t => t.id !== taskId));
                Alert.alert(GENERAL_MESSAGES.SUCCESS, TASK_MESSAGES.SUCCESS_DELETE_TASK);
              }
            } catch (error) {
              Alert.alert(GENERAL_MESSAGES.ERROR, TASK_MESSAGES.ERROR_DELETE_TASK);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff3b30';
      case 'medium': return '#ff9500';
      case 'low': return '#34c759';
      default: return '#007AFF';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return GENERAL_MESSAGES.PRIORITY_HIGH;
      case 'medium': return GENERAL_MESSAGES.PRIORITY_MEDIUM;
      case 'low': return GENERAL_MESSAGES.PRIORITY_LOW;
      default: return priority;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tarefas</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{TASK_MESSAGES.LOADING_TASKS}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← {GENERAL_MESSAGES.BACK}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{GENERAL_MESSAGES.TASKS}</Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{TASK_MESSAGES.EMPTY_TASKS}</Text>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.createButton}>
              <Text style={styles.createButtonText}>{TASK_MESSAGES.CREATE_FIRST_TASK}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          tasks.map(task => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <View style={styles.taskInfo}>
                  <Text style={[
                    styles.taskTitle,
                    task.status === 'completed' && styles.completedTask
                  ]}>
                    {task.title}
                  </Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
                <View style={styles.taskActions}>
                  <View style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(task.priority) }
                  ]}>
                    <Text style={styles.priorityText}>
                      {getPriorityText(task.priority)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.taskFooter}>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    task.status === 'completed' && styles.completedButton
                  ]}
                  onPress={() => toggleTaskStatus(task)}
                >
                  <Text style={styles.statusButtonText}>
                    {task.status === 'active' ? GENERAL_MESSAGES.MARK_COMPLETED : GENERAL_MESSAGES.MARK_ACTIVE}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(task.id)}
                >
                  <Text style={styles.deleteButtonText}>{GENERAL_MESSAGES.REMOVE}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal para criar nova tarefa */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{GENERAL_MESSAGES.NEW_TASK}</Text>

            <Tooltip 
              visible={showTitleTooltip} 
              text={TASK_MESSAGES.TOOLTIP_TITLE}
            >
              <TextInput
                style={styles.modalInput}
                placeholder={GENERAL_MESSAGES.TASK_TITLE}
                value={newTask.title}
                onChangeText={(text) => setNewTask({ ...newTask, title: text })}
                onFocus={() => setShowTitleTooltip(true)}
                onBlur={() => setShowTitleTooltip(false)}
              />
            </Tooltip>

            <Tooltip 
              visible={showDescriptionTooltip} 
              text={TASK_MESSAGES.TOOLTIP_DESCRIPTION}
            >
              <TextInput
                style={[styles.modalInput, styles.textArea]}
                placeholder={GENERAL_MESSAGES.DESCRIPTION}
                value={newTask.description}
                onChangeText={(text) => setNewTask({ ...newTask, description: text })}
                multiline
                numberOfLines={3}
                onFocus={() => setShowDescriptionTooltip(true)}
                onBlur={() => setShowDescriptionTooltip(false)}
              />
            </Tooltip>

            <View style={styles.priorityContainer}>
              <Text style={styles.priorityLabel}>{GENERAL_MESSAGES.PRIORITY}</Text>
              <View style={styles.priorityButtons}>
                {(['low', 'medium', 'high'] as const).map(priority => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityOption,
                      newTask.priority === priority && styles.selectedPriority
                    ]}
                    onPress={() => setNewTask({ ...newTask, priority })}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      newTask.priority === priority && styles.selectedPriorityText
                    ]}>
                      {getPriorityText(priority)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>{GENERAL_MESSAGES.CANCEL}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={createTask}
              >
                <Text style={styles.saveButtonText}>{GENERAL_MESSAGES.CREATE}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  taskActions: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusButton: {
    backgroundColor: '#34c759',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  completedButton: {
    backgroundColor: '#ff9500',
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    marginBottom: 20,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedPriority: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  priorityOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  selectedPriorityText: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tooltipContainer: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
    zIndex: 1000,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
