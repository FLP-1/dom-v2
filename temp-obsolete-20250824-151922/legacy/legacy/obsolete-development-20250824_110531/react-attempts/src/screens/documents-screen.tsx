/**
 * @fileoverview Tela de gestão de documentos
 * @description Interface principal para upload, visualização e gerenciamento de documentos
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
  Modal,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDocuments, Document, DocumentCategory } from '../hooks/useDocuments';
import { useTheme } from '../hooks/useTheme';
import { IconButton, Card, Chip, Searchbar, FAB, Portal, Button } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface DocumentsScreenProps {
  navigation?: any;
}

export const DocumentsScreen: React.FC<DocumentsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const {
    documents,
    categories,
    stats,
    loading,
    uploading,
    error,
    pagination,
    fetchDocuments,
    fetchCategories,
    uploadDocument,
    deleteDocument,
    downloadDocument,
    clearError,
    refresh
  } = useDocuments();

  // Estados locais
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    isSensitive: false,
    accessLevel: 'private' as 'private' | 'shared' | 'public'
  });

  // Função para filtrar documentos
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || doc.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Função para buscar documentos
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      fetchDocuments({ search: query });
    } else {
      fetchDocuments();
    }
  }, [fetchDocuments]);

  // Função para filtrar por categoria
  const handleCategoryFilter = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      fetchDocuments({ categoryId });
    } else {
      fetchDocuments();
    }
  }, [fetchDocuments]);

  // Função para abrir documento
  const handleOpenDocument = useCallback((document: Document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  }, []);

  // Função para deletar documento
  const handleDeleteDocument = useCallback((document: Document) => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja deletar o documento "${document.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteDocument(document.id);
            if (success) {
              setShowDocumentModal(false);
              setSelectedDocument(null);
            }
          }
        }
      ]
    );
  }, [deleteDocument]);

  // Função para baixar documento
  const handleDownloadDocument = useCallback(async (document: Document) => {
    const fileUri = await downloadDocument(document.id);
    if (fileUri) {
      Alert.alert('Sucesso', `Documento ${document.name} baixado com sucesso!`);
    }
  }, [downloadDocument]);

  // Função para upload de documento
  const handleUploadDocument = useCallback(async () => {
    if (!uploadForm.name.trim() || !uploadForm.categoryId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const success = await uploadDocument({
      name: uploadForm.name,
      description: uploadForm.description,
      categoryId: uploadForm.categoryId,
      isSensitive: uploadForm.isSensitive,
      accessLevel: uploadForm.accessLevel
    });

    if (success) {
      setShowUploadModal(false);
      setUploadForm({
        name: '',
        description: '',
        categoryId: '',
        isSensitive: false,
        accessLevel: 'private'
      });
    }
  }, [uploadDocument, uploadForm]);

  // Função para limpar filtros
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    fetchDocuments();
  }, [fetchDocuments]);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Função para obter ícone da categoria
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || '📄';
  };

  // Função para obter cor da categoria
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#6B7280';
  };

  // Função para obter nome da categoria
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Categoria não encontrada';
  };

  // Renderizar item de documento
  const renderDocumentItem = (document: Document) => (
    <Card
      key={document.id}
      style={[styles.documentCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => handleOpenDocument(document)}
    >
      <Card.Content style={styles.documentCardContent}>
        <View style={styles.documentHeader}>
          <View style={styles.documentIconContainer}>
            <Text style={styles.documentIcon}>{document.file_icon || '📄'}</Text>
          </View>
          <View style={styles.documentInfo}>
            <Text style={[styles.documentName, { color: theme.colors.onSurface }]}>
              {document.name}
            </Text>
            <Text style={[styles.documentMeta, { color: theme.colors.onSurfaceVariant }]}>
              {document.file_size_formatted} • {formatDate(document.created_at)}
            </Text>
          </View>
          <View style={styles.documentActions}>
            <IconButton
              icon="download"
              size={20}
              onPress={() => handleDownloadDocument(document)}
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={() => handleDeleteDocument(document)}
            />
          </View>
        </View>
        
        {document.description && (
          <Text style={[styles.documentDescription, { color: theme.colors.onSurfaceVariant }]}>
            {document.description}
          </Text>
        )}
        
        <View style={styles.documentTags}>
          <Chip
            icon={() => <Text>{getCategoryIcon(document.category_id)}</Text>}
            style={[styles.categoryChip, { backgroundColor: getCategoryColor(document.category_id) + '20' }]}
            textStyle={{ color: getCategoryColor(document.category_id) }}
          >
            {getCategoryName(document.category_id)}
          </Chip>
          
          {document.is_sensitive && (
            <Chip icon="lock" style={styles.sensitiveChip}>
              Sensível
            </Chip>
          )}
          
          {document.is_expired && (
            <Chip icon="alert" style={styles.expiredChip}>
              Expirado
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  // Renderizar estatísticas
  const renderStats = () => (
    <View style={styles.statsContainer}>
      <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.statsTitle, { color: theme.colors.onSurface }]}>
            Estatísticas
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {stats?.totalDocuments || 0}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Documentos
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {stats?.totalSizeFormatted || '0 Bytes'}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Tamanho Total
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.error }]}>
                {stats?.expiredDocuments || 0}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Expirados
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  // Renderizar filtros de categoria
  const renderCategoryFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFiltersContainer}
      contentContainerStyle={styles.categoryFiltersContent}
    >
      <Chip
        selected={selectedCategory === null}
        onPress={() => handleCategoryFilter(null)}
        style={styles.categoryFilterChip}
      >
        Todas
      </Chip>
      {categories.map(category => (
        <Chip
          key={category.id}
          selected={selectedCategory === category.id}
          onPress={() => handleCategoryFilter(category.id)}
          icon={() => <Text>{category.icon}</Text>}
          style={[
            styles.categoryFilterChip,
            selectedCategory === category.id && { backgroundColor: category.color + '20' }
          ]}
        >
          {category.name}
        </Chip>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Busca */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar documentos..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {searchQuery || selectedCategory ? (
          <IconButton
            icon="close"
            size={20}
            onPress={handleClearFilters}
          />
        ) : null}
      </View>

      {/* Estatísticas */}
      {stats && renderStats()}

      {/* Filtros de categoria */}
      {categories.length > 0 && renderCategoryFilters()}

      {/* Lista de documentos */}
      <ScrollView
        style={styles.documentsList}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(renderDocumentItem)
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="description"
              size={64}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={[styles.emptyStateText, { color: theme.colors.onSurfaceVariant }]}>
              {loading ? 'Carregando documentos...' : 'Nenhum documento encontrado'}
            </Text>
            {!loading && (
              <Text style={[styles.emptyStateSubtext, { color: theme.colors.onSurfaceVariant }]}>
                Toque no botão + para adicionar seu primeiro documento
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* FAB para upload */}
      <Portal>
        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={() => setShowUploadModal(true)}
          disabled={uploading}
        />
      </Portal>

      {/* Modal de upload */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.onBackground }]}>
              Upload de Documento
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setShowUploadModal(false)}
            />
          </View>

          <ScrollView style={styles.modalContent}>
            <TextInput
              placeholder="Nome do documento"
              value={uploadForm.name}
              onChangeText={(text) => setUploadForm(prev => ({ ...prev, name: text }))}
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
            />

            <TextInput
              placeholder="Descrição (opcional)"
              value={uploadForm.description}
              onChangeText={(text) => setUploadForm(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={3}
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
            />

            <Text style={[styles.inputLabel, { color: theme.colors.onBackground }]}>
              Categoria *
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(category => (
                <Chip
                  key={category.id}
                  selected={uploadForm.categoryId === category.id}
                  onPress={() => setUploadForm(prev => ({ ...prev, categoryId: category.id }))}
                  icon={() => <Text>{category.icon}</Text>}
                  style={[
                    styles.categoryChip,
                    uploadForm.categoryId === category.id && { backgroundColor: category.color + '20' }
                  ]}
                >
                  {category.name}
                </Chip>
              ))}
            </ScrollView>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setUploadForm(prev => ({ ...prev, isSensitive: !prev.isSensitive }))}
              >
                <MaterialIcons
                  name={uploadForm.isSensitive ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color={theme.colors.primary}
                />
                <Text style={[styles.checkboxLabel, { color: theme.colors.onBackground }]}>
                  Documento sensível
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button
              mode="outlined"
              onPress={() => setShowUploadModal(false)}
              style={styles.modalButton}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleUploadDocument}
              loading={uploading}
              disabled={uploading || !uploadForm.name.trim() || !uploadForm.categoryId}
              style={styles.modalButton}
            >
              {uploading ? 'Enviando...' : 'Enviar'}
            </Button>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Modal de visualização de documento */}
      <Modal
        visible={showDocumentModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.onBackground }]}>
              Detalhes do Documento
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setShowDocumentModal(false)}
            />
          </View>

          {selectedDocument && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.documentDetailHeader}>
                <Text style={styles.documentDetailIcon}>{selectedDocument.file_icon}</Text>
                <View style={styles.documentDetailInfo}>
                  <Text style={[styles.documentDetailName, { color: theme.colors.onBackground }]}>
                    {selectedDocument.name}
                  </Text>
                  <Text style={[styles.documentDetailMeta, { color: theme.colors.onSurfaceVariant }]}>
                    {selectedDocument.file_size_formatted} • {formatDate(selectedDocument.created_at)}
                  </Text>
                </View>
              </View>

              {selectedDocument.description && (
                <View style={styles.documentDetailSection}>
                  <Text style={[styles.documentDetailLabel, { color: theme.colors.onBackground }]}>
                    Descrição
                  </Text>
                  <Text style={[styles.documentDetailText, { color: theme.colors.onSurfaceVariant }]}>
                    {selectedDocument.description}
                  </Text>
                </View>
              )}

              <View style={styles.documentDetailSection}>
                <Text style={[styles.documentDetailLabel, { color: theme.colors.onBackground }]}>
                  Categoria
                </Text>
                <Chip
                  icon={() => <Text>{getCategoryIcon(selectedDocument.category_id)}</Text>}
                  style={[styles.categoryChip, { backgroundColor: getCategoryColor(selectedDocument.category_id) + '20' }]}
                >
                  {getCategoryName(selectedDocument.category_id)}
                </Chip>
              </View>

              <View style={styles.documentDetailSection}>
                <Text style={[styles.documentDetailLabel, { color: theme.colors.onBackground }]}>
                  Propriedades
                </Text>
                <View style={styles.documentDetailProperties}>
                  <Text style={[styles.documentDetailProperty, { color: theme.colors.onSurfaceVariant }]}>
                    Tipo: {selectedDocument.file_type}
                  </Text>
                  <Text style={[styles.documentDetailProperty, { color: theme.colors.onSurfaceVariant }]}>
                    Versão: {selectedDocument.version}
                  </Text>
                  <Text style={[styles.documentDetailProperty, { color: theme.colors.onSurfaceVariant }]}>
                    Acesso: {selectedDocument.access_level}
                  </Text>
                  {selectedDocument.expiry_date && (
                    <Text style={[styles.documentDetailProperty, { color: theme.colors.onSurfaceVariant }]}>
                      Expira em: {formatDate(selectedDocument.expiry_date)}
                    </Text>
                  )}
                </View>
              </View>
            </ScrollView>
          )}

          <View style={styles.modalFooter}>
            <Button
              mode="outlined"
              icon="download"
              onPress={() => selectedDocument && handleDownloadDocument(selectedDocument)}
              style={styles.modalButton}
            >
              Baixar
            </Button>
            <Button
              mode="contained"
              icon="delete"
              onPress={() => selectedDocument && handleDeleteDocument(selectedDocument)}
              style={[styles.modalButton, { backgroundColor: theme.colors.error }]}
            >
              Deletar
            </Button>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Indicador de erro */}
      {error && (
        <View style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]}>
          <Text style={[styles.errorText, { color: theme.colors.onErrorContainer }]}>
            {error}
          </Text>
          <IconButton
            icon="close"
            size={20}
            onPress={clearError}
            iconColor={theme.colors.onErrorContainer}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statsCard: {
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  categoryFiltersContainer: {
    marginBottom: 16,
  },
  categoryFiltersContent: {
    paddingHorizontal: 16,
  },
  categoryFilterChip: {
    marginRight: 8,
  },
  documentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  documentCard: {
    marginBottom: 12,
    elevation: 2,
  },
  documentCardContent: {
    padding: 16,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentIcon: {
    fontSize: 24,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  documentMeta: {
    fontSize: 12,
  },
  documentActions: {
    flexDirection: 'row',
  },
  documentDescription: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
  },
  documentTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  sensitiveChip: {
    backgroundColor: '#FEF3C7',
  },
  expiredChip: {
    backgroundColor: '#FEE2E2',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  checkboxContainer: {
    marginTop: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  documentDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  documentDetailIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  documentDetailInfo: {
    flex: 1,
  },
  documentDetailName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  documentDetailMeta: {
    fontSize: 14,
  },
  documentDetailSection: {
    marginBottom: 24,
  },
  documentDetailLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  documentDetailText: {
    fontSize: 16,
    lineHeight: 24,
  },
  documentDetailProperties: {
    gap: 8,
  },
  documentDetailProperty: {
    fontSize: 14,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
  },
});

export default DocumentsScreen;
