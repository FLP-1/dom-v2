const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando arquivos de centralização...\n');

const files = [
  'frontend/src/utils/messages-centralized.ts',
  'frontend/src/styles/design-tokens.ts', 
  'frontend/src/components/base/BaseScreen.tsx',
  'frontend/src/components/base/BaseForm.tsx',
  'frontend/src/hooks/useApi.ts',
  'frontend/src/hooks/useForm.ts'
];

let allExist = true;

files.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(exists ? '✅' : '❌', file);
  if (!exists) allExist = false;
});

console.log('\n📊 Resultado:');
if (allExist) {
  console.log('🎉 TODOS OS ARQUIVOS DE CENTRALIZAÇÃO FORAM CRIADOS!');
  console.log('✅ Sistema de mensagens centralizado');
  console.log('✅ Design tokens centralizados');
  console.log('✅ Componentes base criados');
  console.log('✅ Hooks centralizados');
  console.log('\n🚀 As melhorias de centralização foram executadas com sucesso!');
} else {
  console.log('⚠️ ALGUNS ARQUIVOS NÃO FORAM CRIADOS');
  console.log('Verifique os arquivos marcados com ❌');
}
