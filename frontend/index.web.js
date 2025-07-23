/**
 * @fileoverview Ponto de entrada para web do aplicativo React Native DOM v2
 * @directory frontend
 * @description Registra o componente principal para execução no navegador
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 * @format
 */

// Desabilitar React DevTools temporariamente para resolver conflitos
if (typeof window !== 'undefined') {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    isDisabled: true,
    supportsFiber: false,
    inject: () => {},
    onCommitFiberRoot: () => {},
    onCommitFiberUnmount: () => {},
  };
}

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Registrar o componente para web
AppRegistry.registerComponent(appName, () => App);

// Renderizar para web
if (typeof document !== 'undefined') {
  console.log('🚀 Inicializando React Native Web...');
  
  const rootTag = document.getElementById('root') || document.getElementById('main');
  if (rootTag) {
    console.log('✅ Elemento root encontrado:', rootTag);
    try {
      AppRegistry.runApplication(appName, { rootTag });
      console.log('✅ React Native Web inicializado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao inicializar React Native Web:', error);
    }
  } else {
    console.error('❌ Elemento root não encontrado!');
  }
} 