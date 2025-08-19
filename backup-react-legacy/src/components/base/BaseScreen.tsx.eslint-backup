/**
 * @fileoverview BaseScreen - Componente base para todas as telas
 * @description Componente base que centraliza funcionalidades comuns
 * @version 2.0.0
 * @generated 2025-08-10T11:02:06.585Z
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useUserProfile } from '../../hooks/useUserProfile.ts';

interface BaseScreenProps {
  screenName?: string;
  title?: string;
  children: React.ReactNode;
  style?: object;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({ 
  title, 
  children, 
  style 
}) => {
  const { currentTheme } = useUserProfile();

  const backgroundColor = currentTheme === 'dark' ? '#000000' : '#f5f5f5';
  const headerBackgroundColor = currentTheme === 'dark' ? '#1C1C1E' : '#fff';
  const borderColor = currentTheme === 'dark' ? '#38383A' : '#e0e0e0';
  const textColor = currentTheme === 'dark' ? '#FFFFFF' : '#333';

  return (
    <View style={[{ flex: 1, backgroundColor }, style]}>
      {title && (
        <View style={{ 
          padding: 16, 
          backgroundColor: headerBackgroundColor, 
          borderBottomWidth: 1, 
          borderBottomColor: borderColor 
        }}>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: textColor 
          }}>
            {title}
          </Text>
        </View>
      )}
      <ScrollView style={{ flex: 1 }}>
        {children}
      </ScrollView>
    </View>
  );
};
