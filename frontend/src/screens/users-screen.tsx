import React, { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Modal,
} from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profile: 'EMPLOYER' | 'EMPLOYEE' | 'FAMILY' | 'PARTNER' | 'SUBORDINATE' | 'ADMIN' | 'OWNER';
  status: 'active' | 'inactive';
  createdAt: string;
}

interface UsersScreenProps {
  onNavigateBack: () => void;
}

export const UsersScreen: React.FC<UsersScreenProps> = ({ onNavigateBack }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    profile: 'EMPLOYER' as User['profile'],
    status: 'active' as User['status']
  });

  // Dados mockados para demonstração
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@exemplo.com',
      cpf: '12345678901',
      profile: 'EMPLOYER',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@exemplo.com',
      cpf: '98765432100',
      profile: 'EMPLOYEE',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@exemplo.com',
      cpf: '11122233344',
      profile: 'FAMILY',
      status: 'inactive',
      createdAt: '2024-02-01'
    }
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Simular carregamento de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      cpf: '',
      profile: 'EMPLOYER',
      status: 'active'
    });
    setShowAddModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      profile: user.profile,
      status: user.status
    });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir o usuário "${user.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter(u => u.id !== user.id));
            Alert.alert('Sucesso', 'Usuário excluído com sucesso');
          }
        }
      ]
    );
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.cpf) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (showEditModal && selectedUser) {
      // Editar usuário existente
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...formData }
          : user
      );
      setUsers(updatedUsers);
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso');
    } else {
      // Adicionar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      Alert.alert('Sucesso', 'Usuário criado com sucesso');
    }

    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const getProfileLabel = (profile: User['profile']) => {
    const labels = {
      EMPLOYER: '👔 Empregador',
      EMPLOYEE: '👷 Funcionário',
      FAMILY: '👨‍👩‍👧‍👦 Família',
      PARTNER: '🤝 Parceiro',
      SUBORDINATE: '👤 Subordinado',
      ADMIN: '⚙️ Administrador',
      OWNER: '👑 Proprietário'
    };
    return labels[profile];
  };

  const getStatusColor = (status: User['status']) => {
    return status === 'active' ? '#4CAF50' : '#F44336';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onNavigateBack}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Usuários</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando usuários...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Gestão de Usuários</Text>
        <Pressable style={styles.addButton} onPress={handleAddUser}>
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Resumo</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{users.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {users.filter(u => u.status === 'active').length}
              </Text>
              <Text style={styles.statLabel}>Ativos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {users.filter(u => u.status === 'inactive').length}
              </Text>
              <Text style={styles.statLabel}>Inativos</Text>
            </View>
          </View>
        </View>

        {users.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userCpf}>CPF: {user.cpf}</Text>
              </View>
              <View style={styles.userActions}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(user.status) }
                ]}>
                  <Text style={styles.statusText}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.userDetails}>
              <Text style={styles.userProfile}>
                {getProfileLabel(user.profile)}
              </Text>
              <Text style={styles.userDate}>
                Criado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <Pressable
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditUser(user)}
              >
                <Text style={styles.actionButtonText}>✏️ Editar</Text>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteUser(user)}
              >
                <Text style={styles.actionButtonText}>🗑️ Excluir</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal para Adicionar/Editar Usuário */}
      <Modal
        visible={showAddModal || showEditModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {showEditModal ? 'Editar Usuário' : 'Adicionar Usuário'}
            </Text>

            <Text style={styles.inputLabel}>Nome *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Digite o nome completo"
            />

            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Digite o email"
              keyboardType="email-address"
            />

            <Text style={styles.inputLabel}>CPF *</Text>
            <TextInput
              style={styles.input}
              value={formData.cpf}
              onChangeText={(text) => setFormData({ ...formData, cpf: text })}
              placeholder="Digite o CPF"
              keyboardType="numeric"
              maxLength={11}
            />

            <Text style={styles.inputLabel}>Perfil</Text>
            <View style={styles.profileSelector}>
              {(['EMPLOYER', 'EMPLOYEE', 'FAMILY', 'ADMIN'] as User['profile'][]).map((profile) => (
                <Pressable
                  key={profile}
                  style={[
                    styles.profileOption,
                    formData.profile === profile && styles.profileOptionSelected
                  ]}
                  onPress={() => setFormData({ ...formData, profile })}
                >
                  <Text style={[
                    styles.profileOptionText,
                    formData.profile === profile && styles.profileOptionTextSelected
                  ]}>
                    {getProfileLabel(profile)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.inputLabel}>Status</Text>
            <View style={styles.statusSelector}>
              <Pressable
                style={[
                  styles.statusOption,
                  formData.status === 'active' && styles.statusOptionSelected
                ]}
                onPress={() => setFormData({ ...formData, status: 'active' })}
              >
                <Text style={[
                  styles.statusOptionText,
                  formData.status === 'active' && styles.statusOptionTextSelected
                ]}>
                  Ativo
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.statusOption,
                  formData.status === 'inactive' && styles.statusOptionSelected
                ]}
                onPress={() => setFormData({ ...formData, status: 'inactive' })}
              >
                <Text style={[
                  styles.statusOptionText,
                  formData.status === 'inactive' && styles.statusOptionTextSelected
                ]}>
                  Inativo
                </Text>
              </Pressable>
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveUser}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </Pressable>
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
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  userCard: {
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
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userCpf: {
    fontSize: 12,
    color: '#999',
  },
  userActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  userDetails: {
    marginBottom: 12,
  },
  userProfile: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  userDate: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFA500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
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
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  profileOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  profileOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  profileOptionText: {
    fontSize: 12,
    color: '#666',
  },
  profileOptionTextSelected: {
    color: '#fff',
  },
  statusSelector: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  statusOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  statusOptionTextSelected: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 