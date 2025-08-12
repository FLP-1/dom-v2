import React from 'react';
import { Text, ActivityIndicator } from 'react-native';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Carregando...', 
  size = 'large',
  color = '#007AFF'
}) => {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: 20
    }}>
      <ActivityIndicator size={size} color={color} />
      <Text style={{ 
        marginTop: 10, 
        fontSize: 16, 
        color: '#666',
        textAlign: 'center'
      }}>
        {message}
      </Text>
    </View>
  );
};

