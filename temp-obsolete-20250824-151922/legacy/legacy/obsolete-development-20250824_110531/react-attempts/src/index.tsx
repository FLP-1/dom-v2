import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

// Registrar o componente principal
AppRegistry.registerComponent('DOMv2', () => App);

// Para web, renderizar o componente
if (typeof document !== 'undefined') {
  AppRegistry.runApplication('DOMv2', {
    rootTag: document.getElementById('root') || document.getElementById('app')
  });
}

export default App;