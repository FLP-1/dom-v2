#!/usr/bin/env node

/**
 * 🎯 GERADOR AUTOMÁTICO DE TELAS - DOM v2
 * 
 * Gera telas seguindo EXATAMENTE o Framework de Decisão Arquitetural
 * 
 * Uso: npm run generate:screen -- --name MinhaScreen
 */

const fs = require('fs');
const path = require('path');

function generateScreen(screenName) {
  if (!screenName) {
    console.error('❌ Nome da tela é obrigatório!');
    console.log('Uso: npm run generate:screen -- --name MinhaScreen');
    process.exit(1);
  }

  const hookName = `use${screenName}Data`;
  const fileName = `${screenName}.tsx`;
  const hookFileName = `${hookName}.ts`;

  // Template da tela seguindo o framework
  const screenTemplate = `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ${hookName} } from '../hooks/${hookName}';

/**
 * 📱 ${screenName.toUpperCase()} SCREEN
 * 
 * Seguindo as diretrizes do Framework de Decisão Arquitetural:
 * - Separação de responsabilidades: UI apenas
 * - Hook customizado para lógica de estado
 * - Fallback robusto para dados offline
 * - UX otimista para atualizações
 */
const ${screenName}: React.FC = () => {
  const { 
    data, 
    loading, 
    error, 
    stats,
    reload 
  } = ${hookName}();

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 ${screenName}</Text>
        <Text style={styles.subtitle}>
          {error ? error : 'Gerencie seus dados de forma eficiente'}
        </Text>
        {error && (
          <TouchableOpacity style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>🔄 Tentar Novamente</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {data.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Nenhum dado encontrado</Text>
            <Text style={styles.emptyDescription}>
              Não há informações para exibir no momento.
            </Text>
          </View>
        ) : (
          data.map((item, index) => (
            <View key={item.id || index} style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.title || item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  // Header
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Content
  content: {
    padding: 20,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 200,
  },

  // Item Cards
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});

export default ${screenName};
`;

  // Template do hook seguindo o framework
  const hookTemplate = `/**
 * 🔧 HOOK PERSONALIZADO PARA ${screenName.toUpperCase()}
 * 
 * Seguindo as diretrizes do Framework de Decisão Arquitetural:
 * - Separação de responsabilidades
 * - Reutilização de lógica
 * - Estado centralizado
 * - Integração com apiService
 * - Fallback robusto para dados offline
 */

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';

// 📝 INTERFACES LOCAIS
interface ${screenName}Item {
  id: string;
  title: string;
  description: string;
  // Adicione mais campos conforme necessário
}

interface ${screenName}State {
  data: ${screenName}Item[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    // Adicione mais estatísticas conforme necessário
  };
}

// 🎯 DADOS MOCK PARA FALLBACK
const MOCK_DATA: ${screenName}Item[] = [
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
export const ${hookName} = () => {
  const [state, setState] = useState<${screenName}State>({
    data: [],
    loading: true,
    error: null,
    stats: { total: 0 }
  });

  // 📊 CÁLCULOS DE ESTATÍSTICAS
  const calculateStats = useCallback((data: ${screenName}Item[]) => {
    const total = data.length;
    // Adicione mais cálculos conforme necessário
    
    return { total };
  }, []);

  // 🔄 FUNÇÃO DE CARREGAMENTO
  const loadData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // TODO: Implementar chamada real da API
      // const apiData = await apiService.get${screenName}Data();
      
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
    addItem: useCallback((item: Omit<${screenName}Item, 'id'>) => {
      const newItem: ${screenName}Item = {
        ...item,
        id: \`temp-\${Date.now()}\`
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
`;

  // Criar diretórios se não existirem
  const screensDir = path.join('frontend', 'src', 'screens');
  const hooksDir = path.join('frontend', 'src', 'hooks');
  
  if (!fs.existsSync(screensDir)) {
    fs.mkdirSync(screensDir, { recursive: true });
  }
  
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  // Escrever arquivos
  const screenPath = path.join(screensDir, fileName);
  const hookPath = path.join(hooksDir, hookFileName);

  fs.writeFileSync(screenPath, screenTemplate);
  fs.writeFileSync(hookPath, hookTemplate);

  console.log('✅ TELA GERADA COM SUCESSO!');
  console.log('📁 Arquivos criados:');
  console.log(`   - ${screenPath}`);
  console.log(`   - ${hookPath}`);
  console.log('');
  console.log('🎯 Próximos passos:');
  console.log('1. Adicione os métodos da API ao apiService.ts');
  console.log('2. Atualize as interfaces conforme necessário');
  console.log('3. Integre a tela no App.tsx');
  console.log('4. Execute: npm run validate-architecture');
}

// Processar argumentos da linha de comando
const args = process.argv.slice(2);
const nameIndex = args.indexOf('--name');
let screenName = nameIndex !== -1 ? args[nameIndex + 1] : null;

// Fallback para argumentos sem --name (compatibilidade)
if (!screenName && args.length > 0 && !args[0].startsWith('--')) {
  screenName = args[0];
}

generateScreen(screenName);
