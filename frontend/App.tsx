/**
 * @fileoverview App principal do DOM v2 - SISTEMA COMPLETO DE NAVEGAÇÃO
 * @directory frontend
 * @description App principal com sistema completo de navegação, login e menu lateral
 * @created 2024-12-19
 * @lastModified 2025-07-23
 * @author DOM Team v2
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ConfigSystem, Environment } from './src/utils/config';
import { ApiClient } from './src/utils/api-client';
import { ThemeProvider } from './src/utils/theme-provider';
import SplashScreen from './src/components/SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  console.log('🎉 App.tsx renderizando - Sistema de Navegação Completo');

  useEffect(() => {
    // Inicializar sistema de configuração
    console.log('⚙️ Inicializando sistema de configuração...');
    ConfigSystem.initialize(Environment.DEVELOPMENT);
    
    // Inicializar cliente API
    console.log('Inicializando cliente API...');
    ApiClient.initialize();
    
    // Log das configurações carregadas
    console.log('Configurações carregadas:');
    console.log('- API Base URL:', ConfigSystem.getValue('api.baseUrl'));
    console.log('- App Name:', ConfigSystem.getValue('app.name'));
    console.log('- App Version:', ConfigSystem.getValue('app.version'));
    
    console.log('✔ Sistema inicializado com sucesso!');
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ThemeProvider initialProfileType="EMPLOYER">
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default App;
