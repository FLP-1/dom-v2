import React from 'react';
import { Text } from 'react-native';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = 'Nenhum item encontrado',
  message = 'Não há dados para exibir no momento.',
  icon = '📭'
}) => {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: 40
    }}>
      <Text style={{ 
        fontSize: 48, 
        marginBottom: 16 
      }}>
        {icon}
      </Text>
      <Text style={{ 
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#374151',
        textAlign: 'center',
        marginBottom: 8
      }}>
        {title}
      </Text>
      <Text style={{ 
        fontSize: 14, 
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 20
      }}>
        {message}
      </Text>
    </View>
  );
};

