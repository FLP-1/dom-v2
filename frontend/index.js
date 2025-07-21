/**
 * @fileoverview Ponto de entrada principal do aplicativo React Native DOM v2
 * @directory frontend
 * @description Registra o componente principal do aplicativo
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
