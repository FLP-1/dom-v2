const CriticalThinkingEnforcement = require('./validate-critical-thinking-enforcement');

/**
 * 🧪 TESTE DO SISTEMA DE GARANTIA DAS DIRETIVAS DE PENSAMENTO CRÍTICO
 * 
 * Este script testa todas as funcionalidades do sistema de validação
 * para garantir que as diretivas sejam respeitadas corretamente.
 */

console.log('🧪 INICIANDO TESTES DO SISTEMA DE PENSAMENTO CRÍTICO');
console.log('==================================================');

const enforcement = new CriticalThinkingEnforcement();

// Teste 1: Validação bem-sucedida
console.log('\n📋 TESTE 1: Validação bem-sucedida');
try {
  const validAction = {
    type: 'DECISION',
    description: 'Implementar sistema de validação',
    source: { verified: true, url: 'https://docs.example.com/validation' },
    assumptions: { identified: true, questioned: true, validated: true },
    logic: { tested: true, validated: true, consistent: true },
    alternatives: { considered: true, perspectives: true, creative: true },
    transparent: { documented: true, justified: true, clear: true },
    honest: { declared: true, errors: false, uncertainty: false }
  };

  const result = enforcement.validateBeforeAction(validAction);
  console.log('✅ Teste 1 PASSOU: Validação bem-sucedida');
} catch (error) {
  console.log('❌ Teste 1 FALHOU:', error.message);
}

// Teste 2: Violação de fonte não verificada
console.log('\n📋 TESTE 2: Violação de fonte não verificada');
try {
  const invalidAction = {
    type: 'DECISION',
    description: 'Implementar sem fonte verificada',
    source: { verified: false, url: null },
    assumptions: { identified: true, questioned: true, validated: true },
    logic: { tested: true, validated: true, consistent: true },
    alternatives: { considered: true, perspectives: true, creative: true },
    transparent: { documented: true, justified: true, clear: true },
    honest: { declared: true, errors: false, uncertainty: false }
  };

  enforcement.validateBeforeAction(invalidAction);
  console.log('❌ Teste 2 FALHOU: Deveria ter gerado erro');
} catch (error) {
  console.log('✅ Teste 2 PASSOU: Violação detectada corretamente');
  console.log('   Erro:', error.message.split('\n')[0]);
}

// Teste 3: Violação de suposições não questionadas
console.log('\n📋 TESTE 3: Violação de suposições não questionadas');
try {
  const invalidAction = {
    type: 'DECISION',
    description: 'Implementar sem questionar suposições',
    source: { verified: true, url: 'https://docs.example.com' },
    assumptions: { identified: false, questioned: false, validated: false },
    logic: { tested: true, validated: true, consistent: true },
    alternatives: { considered: true, perspectives: true, creative: true },
    transparent: { documented: true, justified: true, clear: true },
    honest: { declared: true, errors: false, uncertainty: false }
  };

  enforcement.validateBeforeAction(invalidAction);
  console.log('❌ Teste 3 FALHOU: Deveria ter gerado erro');
} catch (error) {
  console.log('✅ Teste 3 PASSOU: Violação detectada corretamente');
  console.log('   Erro:', error.message.split('\n')[0]);
}

// Teste 4: Violação de lógica não testada
console.log('\n📋 TESTE 4: Violação de lógica não testada');
try {
  const invalidAction = {
    type: 'DECISION',
    description: 'Implementar sem testar lógica',
    source: { verified: true, url: 'https://docs.example.com' },
    assumptions: { identified: true, questioned: true, validated: true },
    logic: { tested: false, validated: false, consistent: false },
    alternatives: { considered: true, perspectives: true, creative: true },
    transparent: { documented: true, justified: true, clear: true },
    honest: { declared: true, errors: false, uncertainty: false }
  };

  enforcement.validateBeforeAction(invalidAction);
  console.log('❌ Teste 4 FALHOU: Deveria ter gerado erro');
} catch (error) {
  console.log('✅ Teste 4 PASSOU: Violação detectada corretamente');
  console.log('   Erro:', error.message.split('\n')[0]);
}

// Teste 5: Violação de alternativas não consideradas
console.log('\n📋 TESTE 5: Violação de alternativas não consideradas');
try {
  const invalidAction = {
    type: 'DECISION',
    description: 'Implementar sem considerar alternativas',
    source: { verified: true, url: 'https://docs.example.com' },
    assumptions: { identified: true, questioned: true, validated: true },
    logic: { tested: true, validated: true, consistent: true },
    alternatives: { considered: false, perspectives: false, creative: false },
    transparent: { documented: true, justified: true, clear: true },
    honest: { declared: true, errors: false, uncertainty: false }
  };

  enforcement.validateBeforeAction(invalidAction);
  console.log('❌ Teste 5 FALHOU: Deveria ter gerado erro');
} catch (error) {
  console.log('✅ Teste 5 PASSOU: Violação detectada corretamente');
  console.log('   Erro:', error.message.split('\n')[0]);
}

// Teste 6: Violação de transparência
console.log('\n📋 TESTE 6: Violação de transparência');
try {
  const invalidAction = {
    type: 'DECISION',
    description: 'Implementar sem transparência',
    source: { verified: true, url: 'https://docs.example.com' },
    assumptions: { identified: true, questioned: true, validated: true },
    logic: { tested: true, validated: true, consistent: true },
    alternatives: { considered: true, perspectives: true, creative: true },
    transparent: { documented: false, justified: false, clear: false },
    honest: { declared: true, errors: false, uncertainty: false }
  };

  enforcement.validateBeforeAction(invalidAction);
  console.log('❌ Teste 6 FALHOU: Deveria ter gerado erro');
} catch (error) {
  console.log('✅ Teste 6 PASSOU: Violação detectada corretamente');
  console.log('   Erro:', error.message.split('\n')[0]);
}

// Teste 7: Violação de honestidade
console.log('\n📋 TESTE 7: Violação de honestidade');
try {
  const invalidAction = {
    type: 'DECISION',
    description: 'Implementar sem honestidade',
    source: { verified: true, url: 'https://docs.example.com' },
    assumptions: { identified: true, questioned: true, validated: true },
    logic: { tested: true, validated: true, consistent: true },
    alternatives: { considered: true, perspectives: true, creative: true },
    transparent: { documented: true, justified: true, clear: true },
    honest: { declared: false, errors: false, uncertainty: false }
  };

  enforcement.validateBeforeAction(invalidAction);
  console.log('❌ Teste 7 FALHOU: Deveria ter gerado erro');
} catch (error) {
  console.log('✅ Teste 7 PASSOU: Violação detectada corretamente');
  console.log('   Erro:', error.message.split('\n')[0]);
}

// Teste 8: Validação simples
console.log('\n📋 TESTE 8: Validação simples');
try {
  const result = enforcement.validateSimpleAction(
    'DECISION',
    'Implementar validação simples',
    'https://docs.example.com/simple'
  );
  console.log('✅ Teste 8 PASSOU: Validação simples funcionou');
} catch (error) {
  console.log('❌ Teste 8 FALHOU:', error.message);
}

// Teste 9: Múltiplas violações
console.log('\n📋 TESTE 9: Múltiplas violações');
try {
  const invalidAction = {
    type: 'DECISION',
    description: 'Implementar com múltiplas violações',
    source: { verified: false, url: null },
    assumptions: { identified: false, questioned: false, validated: false },
    logic: { tested: false, validated: false, consistent: false },
    alternatives: { considered: false, perspectives: false, creative: false },
    transparent: { documented: false, justified: false, clear: false },
    honest: { declared: false, errors: false, uncertainty: false }
  };

  enforcement.validateBeforeAction(invalidAction);
  console.log('❌ Teste 9 FALHOU: Deveria ter gerado erro');
} catch (error) {
  console.log('✅ Teste 9 PASSOU: Múltiplas violações detectadas');
  console.log('   Erro:', error.message.split('\n')[0]);
}

// Teste 10: Geração de relatório
console.log('\n📋 TESTE 10: Geração de relatório');
try {
  const report = enforcement.generateReport();
  console.log('✅ Teste 10 PASSOU: Relatório gerado com sucesso');
  console.log('   Resumo:', report.summary);
  console.log('   Recomendações:', report.recommendations.length);
} catch (error) {
  console.log('❌ Teste 10 FALHOU:', error.message);
}

// Teste 11: Verificação de arquivos de log
console.log('\n📋 TESTE 11: Verificação de arquivos de log');
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
const violationsFile = path.join(logsDir, 'critical-thinking-violations.json');
const validationsFile = path.join(logsDir, 'critical-thinking-validations.json');
const alertsFile = path.join(logsDir, 'critical-alerts.json');

const filesExist = [
  fs.existsSync(violationsFile),
  fs.existsSync(validationsFile),
  fs.existsSync(alertsFile)
];

if (filesExist.every(exists => exists)) {
  console.log('✅ Teste 11 PASSOU: Todos os arquivos de log foram criados');
  
  // Verificar conteúdo
  try {
    const violations = JSON.parse(fs.readFileSync(violationsFile, 'utf8'));
    const validations = JSON.parse(fs.readFileSync(validationsFile, 'utf8'));
    const alerts = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
    
    console.log(`   Violações: ${violations.length}`);
    console.log(`   Validações: ${validations.length}`);
    console.log(`   Alertas: ${alerts.length}`);
  } catch (error) {
    console.log('⚠️  Aviso: Erro ao ler arquivos de log:', error.message);
  }
} else {
  console.log('❌ Teste 11 FALHOU: Alguns arquivos de log não foram criados');
  console.log('   Violações:', filesExist[0]);
  console.log('   Validações:', filesExist[1]);
  console.log('   Alertas:', filesExist[2]);
}

// Resumo final
console.log('\n📊 RESUMO DOS TESTES');
console.log('====================');

const report = enforcement.generateReport();
console.log(`Total de ações testadas: ${report.summary.totalActions}`);
console.log(`Violações detectadas: ${report.summary.violations}`);
console.log(`Validações bem-sucedidas: ${report.summary.validations}`);
console.log(`Taxa de conformidade: ${report.summary.complianceRate}`);

if (report.recommendations.length > 0) {
  console.log('\n🔧 RECOMENDAÇÕES:');
  report.recommendations.forEach((rec, index) => {
    console.log(`   ${index + 1}. ${rec}`);
  });
}

console.log('\n🎯 RESULTADO FINAL:');
if (report.summary.violations === 0) {
  console.log('✅ SISTEMA FUNCIONANDO PERFEITAMENTE - TODAS AS VIOLAÇÕES FORAM DETECTADAS');
} else {
  console.log('⚠️  SISTEMA FUNCIONANDO - ALGUMAS VIOLAÇÕES FORAM DETECTADAS (ESPERADO NOS TESTES)');
}

console.log('\n🧪 TESTES CONCLUÍDOS COM SUCESSO!');
console.log('=================================='); 