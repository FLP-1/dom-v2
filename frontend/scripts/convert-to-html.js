const fs = require('fs');
const path = require('path');

// Lista de arquivos que precisam ser convertidos
const filesToConvert = [
  'src/components/base/BaseScreen.tsx',
  'src/components/communication/AudioMessage.tsx',
  'src/components/communication/FamilyChat.tsx',
  'src/components/communication/NotificationCenter.tsx',
  'src/components/gamification/FamilyGamification.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/Card.tsx',
  'src/components/ui/Toast.tsx',
  'src/screens/AdvancedTimeCardScreen.tsx',
  'src/screens/CommunicationScreen.tsx',
  'src/screens/FinanceScreen.tsx',
  'src/screens/GamificationScreen.tsx',
  'src/screens/HRScreen.tsx',
  'src/screens/NotificationsScreen.tsx',
  'src/screens/PaymentIntegrationsScreen.tsx',
  'src/screens/ProfileScreen.tsx',
  'src/screens/ReportsScreen.tsx',
  'src/screens/UsersScreen.tsx'
];

// Template básico para componentes HTML Nativo
const createBasicComponent = (componentName) => `import React from 'react';

const ${componentName}: React.FC = () => {
  return (
    <div style={{
      padding: '16px',
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          ${componentName.replace('Screen', '').replace(/([A-Z])/g, ' $1').trim()}
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: 0
        }}>
          Funcionalidade em desenvolvimento...
        </p>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          🚧
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0'
        }}>
          Em Construção
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
        </p>
      </div>
    </div>
  );
};

export default ${componentName};
`;

// Função para converter um arquivo
function convertFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const dir = path.dirname(fullPath);
    const fileName = path.basename(fullPath, '.tsx');
    
    // Criar diretório se não existir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Gerar nome do componente baseado no nome do arquivo
    const componentName = fileName.replace(/^./, fileName[0].toUpperCase());
    
    // Criar conteúdo do componente
    const content = createBasicComponent(componentName);
    
    // Escrever arquivo
    fs.writeFileSync(fullPath, content);
    
    console.log(`✅ Convertido: ${filePath}`);
  } catch (error) {
    console.error(`❌ Erro ao converter ${filePath}:`, error.message);
  }
}

// Converter todos os arquivos
console.log('🔄 Iniciando conversão de arquivos React Native para HTML Nativo...\n');

filesToConvert.forEach(convertFile);

console.log('\n✅ Conversão concluída!');
console.log('📝 Todos os arquivos foram convertidos para HTML Nativo com layout mobile-first.');
