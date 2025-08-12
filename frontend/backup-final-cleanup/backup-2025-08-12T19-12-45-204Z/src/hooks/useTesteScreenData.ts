/**
 * 🔧 HOOK PERSONALIZADO PARA TESTESCREEN
 * 
 * Seguindo as diretrizes do Framework de Decisão Arquitetural:
 * - Separação de responsabilidades
 * - Reutilização de lógica
 * - Estado centralizado
 * - Integração com apiService
 * - Fallback robusto para dados offline
 */

import { useState, useEffect} from 'react';
import { apiService } from '../services/apiService';

// 📝 INTERFACES LOCAIS
interface TesteScreenItem {
  id: string;
  title: string;
  description: string;
  // Adicione mais campos conforme necessário
}

interface TesteScreenState {
  data: TesteScreenItem[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    // Adicione mais estatísticas conforme necessário
  };
}

// 🎯 DADOS MOCK PARA FALLBACK
const MOCK_DATA: TesteScreenItem[] = [
  {
    id: '1',
    title: 'Item de Exemplo 1',
    description: 'Esta é uma descrição de exemplo para demonstração'
  },
  {
    id: '2',
    title: 'Item de Exemplo 2',
    description: 'Outro item de exemplo com dados fictícios'
  }
];

/**
 * 🚀 HOOK PRINCIPAL
 */
export const useTesteScreenData = () => {
  const [state, setState] = useState<TesteScreenState>({
    data: [],
    loading: true,
    error: null,
    stats: { total: 0 }
  });

  // 📊 CÁLCULOS DE ESTATÍSTICAS
  const calculateStats = useCallback((data: TesteScreenItem[]) => {
    const total = data.length;
    // Adicione mais cálculos conforme necessário
    
    return { total };
  }, []);

  // 🔄 FUNÇÃO DE CARREGAMENTO
  const loadData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // TODO: Implementar chamada real da API
      // const apiData = await apiService.getTesteScreenData();
      
      // Por enquanto, usar dados mock
      const data = MOCK_DATA;
      const stats = calculateStats(data);

      setState({
        data,
        loading: false,
        error: data.length === 0 ? 'Usando dados de exemplo - backend offline' : null,
        stats
      });

    } catch (error) {
      console.error('🚨 Erro ao carregar dados:', error);
      
      // Fallback para dados mock
      const stats = calculateStats(MOCK_DATA);
      
      setState({
        data: MOCK_DATA,
        loading: false,
        error: 'Erro ao conectar com servidor. Usando dados de exemplo.',
        stats
      });
    }
  }, [calculateStats]);

  // 🎯 EFEITO INICIAL
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 📤 RETORNO DO HOOK
  return {
    ...state,
    reload: loadData,
    
    // Funções utilitárias (adicione conforme necessário)
    addItem: useCallback((item: Omit<TesteScreenItem, 'id'>) => {
      const newItem: TesteScreenItem = {
        ...item,
        id: `temp-${Date.now()}`
      };
      
      setState(prev => {
        const newData = [...prev.data, newItem];
        const stats = calculateStats(newData);
        return {
          ...prev,
          data: newData,
          stats
        };
      });
    }, [calculateStats]),

    removeItem: useCallback((id: string) => {
      setState(prev => {
        const newData = prev.data.filter(item => item.id !== id);
        const stats = calculateStats(newData);
        return {
          ...prev,
          data: newData,
          stats
        };
      });
    }, [calculateStats])
  };
};
