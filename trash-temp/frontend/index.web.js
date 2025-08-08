import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('DOMv2', () => App);
AppRegistry.runApplication('DOMv2', {
  rootTag: document.getElementById('root'),
});