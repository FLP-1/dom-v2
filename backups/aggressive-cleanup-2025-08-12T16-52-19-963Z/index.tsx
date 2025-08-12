import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log('index.tsx loading...'); // Debug log

const container = document.getElementById('root') || document.getElementById('app');
console.log('Container found:', container); // Debug log

if (container) {
  console.log('Creating root...'); // Debug log
  const root = createRoot(container);
  console.log('Rendering App...'); // Debug log
  root.render(<App />);
} else {
  console.error('Container not found!'); // Debug log
}
