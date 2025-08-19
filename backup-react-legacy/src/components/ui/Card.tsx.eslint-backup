import React from 'react';
import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[{
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    }, style]}>
      {children}
    </View>
  );
};
