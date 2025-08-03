import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
}

interface TaskCardProps {
  task: Task;
  onPress: (task: Task) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onStatusChange }) => {
  const { colors } = useTheme();

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'in_progress':
        return colors.primary;
      case 'completed':
        return colors.success;
      default:
        return colors.text.secondary;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={() => onPress(task)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={2}>
          {task.title}
        </Text>
        <View style={[styles.priority, { backgroundColor: getPriorityColor(task.priority) }]}>
          <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={[styles.description, { color: colors.text.secondary }]} numberOfLines={2}>
        {task.description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={[styles.assignedTo, { color: colors.text.secondary }]}>
          👤 {task.assignedTo}
        </Text>
        <Text style={[styles.dueDate, { color: colors.text.secondary }]}>
          📅 {task.dueDate}
        </Text>
      </View>
      
      <View style={[styles.status, { backgroundColor: getStatusColor(task.status) }]}>
        <Text style={styles.statusText}>{task.status.replace('_', ' ').toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  priority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  assignedTo: {
    fontSize: 12,
  },
  dueDate: {
    fontSize: 12,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});