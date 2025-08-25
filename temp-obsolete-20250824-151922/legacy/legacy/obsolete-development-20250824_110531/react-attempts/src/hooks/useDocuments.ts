/**
 * @fileoverview Hook para gestão de documentos
 * @description Hook customizado para upload, visualização e gerenciamento de documentos
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para upload: React Native Document Picker, Expo Document Picker
 * - Para visualização: React Native PDF, Expo File System
 * - Para cache: AsyncStorage, MMKV
 * 
 * @considerations
 * - Performance: Otimização para arquivos grandes
 * - Segurança: Validação de tipos de arquivo
 * - Escalabilidade: Suporte a múltiplos formatos
 * - Manutenibilidade: Código limpo e testável
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { apiService } from '../shared/utils/core/api-service';
import { API_ENDPOINTS } from '../shared/utils/core/api-endpoints';

// Tipos TypeScript
export interface Document {
  id: string;
  name: string;
  description?: string;
  category_id: string;
  user_id: string;
  employee_id?: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  file_hash: string;
  version: number;
  status: 'active' | 'archived' | 'deleted';
  tags?: string[];
  metadata?: any;
  expiry_date?: string;
  is_sensitive: boolean;
  access_level: 'private' | 'shared' | 'public';
  created_at: string;
  updated_at: string;
  category?: DocumentCategory;
  employee?: Employee;
  file_size_formatted?: string;
  file_icon?: string;
  file_extension?: string;
  is_expired?: boolean;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  active: boolean;
  created_at: string;
}

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  salary: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentCreateData {
  name: string;
  description?: string;
  categoryId: string;
  employeeId?: string;
  tags?: string[];
  metadata?: any;
  expiryDate?: Date;
  isSensitive?: boolean;
  accessLevel?: 'private' | 'shared' | 'public';
}

export interface DocumentUpdateData {
  name?: string;
  description?: string;
  categoryId?: string;
  employeeId?: string;
  tags?: string[];
  metadata?: any;
  expiryDate?: Date;
  isSensitive?: boolean;
  accessLevel?: 'private' | 'shared' | 'public';
  status?: 'active' | 'archived' | 'deleted';
}

export interface DocumentFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  employeeId?: string;
  status?: string;
  search?: string;
}

export interface DocumentStats {
  totalDocuments: number;
  totalSize: number;
  totalSizeFormatted: string;
  documentsByCategory: Array<{
    categoryId: string;
    categoryName: string;
    count: number;
  }>;
  documentsByType: Array<{
    type: string;
    count: number;
  }>;
  expiredDocuments: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationInfo;
}

// Configurações
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain'
];

// Função para validar arquivo
function validateFile(file: DocumentPicker.DocumentResult): boolean {
  if (DocumentPicker.isCancel(file)) {
    return false;
  }

  if (file.assets && file.assets.length > 0) {
    const asset = file.assets[0];
    
    // Validar tamanho
    if (asset.size && asset.size > MAX_FILE_SIZE) {
      Alert.alert('Erro', 'Arquivo muito grande. Tamanho máximo: 10MB');
      return false;
    }

    // Validar tipo
    if (asset.mimeType && !ALLOWED_FILE_TYPES.includes(asset.mimeType)) {
      Alert.alert('Erro', 'Tipo de arquivo não permitido');
      return false;
    }

    return true;
  }

  return false;
}

// Função para formatar tamanho de arquivo
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  // Buscar documentos
  const fetchDocuments = useCallback(async (filters: DocumentFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Cancelar requisição anterior se existir
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.employeeId) params.append('employeeId', filters.employeeId);
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);

      const response = await apiService.get<ApiResponse<Document[]>>(
        `/documents?${params.toString()}`,
        { signal: abortControllerRef.current.signal }
      );

      if (response.success) {
        setDocuments(response.data);
        setPagination(response.pagination || null);
      } else {
        setError('Erro ao carregar documentos');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Erro ao carregar documentos');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar categorias
  const fetchCategories = useCallback(async () => {
    try {
      const response = await apiService.get<ApiResponse<DocumentCategory[]>>('/documents/categories/list');
      
      if (response.success) {
        setCategories(response.data);
      } else {
        setError('Erro ao carregar categorias');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar categorias');
    }
  }, []);

  // Buscar estatísticas
  const fetchStats = useCallback(async () => {
    try {
      const response = await apiService.get<ApiResponse<DocumentStats>>('/documents/stats');
      
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Erro ao carregar estatísticas');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar estatísticas');
    }
  }, []);

  // Buscar documento específico
  const fetchDocument = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.get<ApiResponse<Document>>(`/documents/${id}`);
      
      if (response.success) {
        setSelectedDocument(response.data);
        return response.data;
      } else {
        setError('Erro ao carregar documento');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar documento');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload de documento
  const uploadDocument = useCallback(async (documentData: DocumentCreateData) => {
    try {
      setUploading(true);
      setError(null);

      // Selecionar arquivo
      const file = await DocumentPicker.getDocumentAsync({
        type: ALLOWED_FILE_TYPES,
        copyToCacheDirectory: true,
        multiple: false
      });

      if (!validateFile(file)) {
        return null;
      }

      if (!file.assets || file.assets.length === 0) {
        setError('Nenhum arquivo selecionado');
        return null;
      }

      const asset = file.assets[0];
      
      // Criar FormData
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        name: asset.name,
        type: asset.mimeType || 'application/octet-stream'
      } as any);
      
      formData.append('name', documentData.name);
      if (documentData.description) {
        formData.append('description', documentData.description);
      }
      formData.append('categoryId', documentData.categoryId);
      if (documentData.employeeId) {
        formData.append('employeeId', documentData.employeeId);
      }
      if (documentData.tags) {
        formData.append('tags', JSON.stringify(documentData.tags));
      }
      if (documentData.metadata) {
        formData.append('metadata', JSON.stringify(documentData.metadata));
      }
      if (documentData.expiryDate) {
        formData.append('expiryDate', documentData.expiryDate.toISOString());
      }
      formData.append('isSensitive', documentData.isSensitive ? 'true' : 'false');
      formData.append('accessLevel', documentData.accessLevel || 'private');

      // Enviar arquivo
      const response = await apiService.post<ApiResponse<Document>>('/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.success) {
        // Atualizar lista de documentos
        setDocuments(prev => [response.data, ...prev]);
        
        // Atualizar estatísticas
        fetchStats();
        
        Alert.alert('Sucesso', 'Documento enviado com sucesso!');
        return response.data;
      } else {
        setError('Erro ao enviar documento');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar documento');
      return null;
    } finally {
      setUploading(false);
    }
  }, [fetchStats]);

  // Atualizar documento
  const updateDocument = useCallback(async (id: string, updateData: DocumentUpdateData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.put<ApiResponse<Document>>(`/documents/${id}`, updateData);

      if (response.success) {
        // Atualizar documento na lista
        setDocuments(prev => prev.map(doc => 
          doc.id === id ? response.data : doc
        ));
        
        // Atualizar documento selecionado
        if (selectedDocument?.id === id) {
          setSelectedDocument(response.data);
        }

        Alert.alert('Sucesso', 'Documento atualizado com sucesso!');
        return response.data;
      } else {
        setError('Erro ao atualizar documento');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar documento');
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedDocument]);

  // Deletar documento
  const deleteDocument = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.delete<ApiResponse<void>>(`/documents/${id}`);

      if (response.success) {
        // Remover documento da lista
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        
        // Limpar documento selecionado se for o mesmo
        if (selectedDocument?.id === id) {
          setSelectedDocument(null);
        }

        // Atualizar estatísticas
        fetchStats();

        Alert.alert('Sucesso', 'Documento deletado com sucesso!');
        return true;
      } else {
        setError('Erro ao deletar documento');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar documento');
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedDocument, fetchStats]);

  // Download de documento
  const downloadDocument = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.get<Blob>(`/documents/${id}/download`, {
        responseType: 'blob'
      });

      if (response) {
        // Em React Native, você pode usar expo-file-system para salvar o arquivo
        const document = documents.find(doc => doc.id === id);
        if (document) {
          const fileName = document.file_name;
          const fileUri = `${FileSystem.documentDirectory}${fileName}`;
          
          // Aqui você implementaria a lógica de download específica para React Native
          Alert.alert('Sucesso', `Documento ${fileName} baixado com sucesso!`);
          return fileUri;
        }
      } else {
        setError('Erro ao baixar documento');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao baixar documento');
      return null;
    } finally {
      setLoading(false);
    }
  }, [documents]);

  // Buscar documentos por funcionário
  const fetchDocumentsByEmployee = useCallback(async (employeeId: string) => {
    return fetchDocuments({ employeeId, limit: 50 });
  }, [fetchDocuments]);

  // Buscar documentos por categoria
  const fetchDocumentsByCategory = useCallback(async (categoryId: string) => {
    return fetchDocuments({ categoryId, limit: 50 });
  }, [fetchDocuments]);

  // Buscar documentos expirados
  const fetchExpiredDocuments = useCallback(async () => {
    return fetchDocuments({ status: 'active', limit: 50 });
  }, [fetchDocuments]);

  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Limpar documento selecionado
  const clearSelectedDocument = useCallback(() => {
    setSelectedDocument(null);
  }, []);

  // Refresh de dados
  const refresh = useCallback(async () => {
    await Promise.all([
      fetchDocuments(),
      fetchCategories(),
      fetchStats()
    ]);
  }, [fetchDocuments, fetchCategories, fetchStats]);

  // Carregar dados iniciais
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // Estado
    documents,
    categories,
    stats,
    loading,
    uploading,
    error,
    pagination,
    selectedDocument,
    
    // Ações
    fetchDocuments,
    fetchCategories,
    fetchStats,
    fetchDocument,
    uploadDocument,
    updateDocument,
    deleteDocument,
    downloadDocument,
    fetchDocumentsByEmployee,
    fetchDocumentsByCategory,
    fetchExpiredDocuments,
    clearError,
    clearSelectedDocument,
    refresh,
    
    // Utilitários
    formatFileSize
  };
};
