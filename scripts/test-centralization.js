/**
 * @fileoverview Script de Teste das Centralizações - DOM v2
 * @description Testa as funcionalidades de centralização implementadas
 * @created 2025-01-23
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

class CentralizationTester {
  constructor() {
    this.results = {
      messages: false,
      designTokens: false,
      baseComponents: false,
      hooks: false,
      migration: false
    };
  }

  async testAll() {
    console.log('🧪 Testando centralizações implementadas...\n');

    await this.testMessages();
    await this.testDesignTokens();
    await this.testBaseComponents();
    await this.testHooks();
    await this.testMigration();

    this.generateReport();
  }

  async testMessages() {
    try {
      const messagesPath = path.join(__dirname, '../frontend/src/utils/messages-centralized.ts');
      const exists = fs.existsSync(messagesPath);
      
      if (exists) {
        const content = fs.readFileSync(messagesPath, 'utf8');
        const hasMessages = content.includes('auth.login.success');
        const hasClass = content.includes('class MessagesCentralized');
        const hasExports = content.includes('export { getMessage, Messages }');
        
        this.results.messages = hasMessages && hasClass && hasExports;
        
        if (this.results.messages) {
          console.log('✅ Sistema de mensagens centralizado: OK');
        } else {
          console.log('❌ Sistema de mensagens centralizado: FALHOU');
        }
      } else {
        console.log('❌ Arquivo de mensagens centralizado não encontrado');
      }
    } catch (error) {
      console.log('❌ Erro ao testar mensagens:', error.message);
    }
  }

  async testDesignTokens() {
    try {
      const tokensPath = path.join(__dirname, '../frontend/src/styles/design-tokens.ts');
      const exists = fs.existsSync(tokensPath);
      
      if (exists) {
        const content = fs.readFileSync(tokensPath, 'utf8');
        const hasColors = content.includes('export const Colors');
        const hasSpacing = content.includes('export const Spacing');
        const hasTypography = content.includes('export const Typography');
        
        this.results.designTokens = hasColors && hasSpacing && hasTypography;
        
        if (this.results.designTokens) {
          console.log('✅ Design tokens centralizados: OK');
        } else {
          console.log('❌ Design tokens centralizados: FALHOU');
        }
      } else {
        console.log('❌ Arquivo de design tokens não encontrado');
      }
    } catch (error) {
      console.log('❌ Erro ao testar design tokens:', error.message);
    }
  }

  async testBaseComponents() {
    try {
      const baseScreenPath = path.join(__dirname, '../frontend/src/components/base/BaseScreen.tsx');
      const baseFormPath = path.join(__dirname, '../frontend/src/components/base/BaseForm.tsx');
      
      const screenExists = fs.existsSync(baseScreenPath);
      const formExists = fs.existsSync(baseFormPath);
      
      if (screenExists && formExists) {
        const screenContent = fs.readFileSync(baseScreenPath, 'utf8');
        const formContent = fs.readFileSync(baseFormPath, 'utf8');
        
        const screenHasProps = screenContent.includes('interface BaseScreenProps');
        const formHasProps = formContent.includes('interface BaseFormProps');
        const screenUsesTokens = screenContent.includes('from \'../../styles/design-tokens\'');
        const formUsesMessages = formContent.includes('from \'../../utils/messages-centralized\'');
        
        this.results.baseComponents = screenHasProps && formHasProps && screenUsesTokens && formUsesMessages;
        
        if (this.results.baseComponents) {
          console.log('✅ Componentes base: OK');
        } else {
          console.log('❌ Componentes base: FALHOU');
        }
      } else {
        console.log('❌ Componentes base não encontrados');
      }
    } catch (error) {
      console.log('❌ Erro ao testar componentes base:', error.message);
    }
  }

  async testHooks() {
    try {
      const useApiPath = path.join(__dirname, '../frontend/src/hooks/useApi.ts');
      const useFormPath = path.join(__dirname, '../frontend/src/hooks/useForm.ts');
      
      const apiExists = fs.existsSync(useApiPath);
      const formExists = fs.existsSync(useFormPath);
      
      if (apiExists && formExists) {
        const apiContent = fs.readFileSync(useApiPath, 'utf8');
        const formContent = fs.readFileSync(useFormPath, 'utf8');
        
        const apiHasHook = apiContent.includes('export function useApi');
        const formHasHook = formContent.includes('export function useForm');
        const apiUsesMessages = apiContent.includes('from \'../utils/messages-centralized\'');
        const formUsesMessages = formContent.includes('from \'../utils/messages-centralized\'');
        
        this.results.hooks = apiHasHook && formHasHook && apiUsesMessages && formUsesMessages;
        
        if (this.results.hooks) {
          console.log('✅ Hooks centralizados: OK');
        } else {
          console.log('❌ Hooks centralizados: FALHOU');
        }
      } else {
        console.log('❌ Hooks não encontrados');
      }
    } catch (error) {
      console.log('❌ Erro ao testar hooks:', error.message);
    }
  }

  async testMigration() {
    try {
      const oldMessagesPath = path.join(__dirname, '../frontend/src/utils/messages.ts');
      const oldSystemPath = path.join(__dirname, '../frontend/src/utils/messages-system.ts');
      
      const oldMessagesExists = fs.existsSync(oldMessagesPath);
      const oldSystemExists = fs.existsSync(oldSystemPath);
      
      if (oldMessagesExists && oldSystemExists) {
        const oldMessagesContent = fs.readFileSync(oldMessagesPath, 'utf8');
        const oldSystemContent = fs.readFileSync(oldSystemPath, 'utf8');
        
        const messagesMigrated = oldMessagesContent.includes('DEPRECATED') && oldMessagesContent.includes('messages-centralized');
        const systemMigrated = oldSystemContent.includes('DEPRECATED') && oldSystemContent.includes('messages-centralized');
        
        this.results.migration = messagesMigrated && systemMigrated;
        
        if (this.results.migration) {
          console.log('✅ Migração de arquivos: OK');
        } else {
          console.log('❌ Migração de arquivos: FALHOU');
        }
      } else {
        console.log('❌ Arquivos de migração não encontrados');
      }
    } catch (error) {
      console.log('❌ Erro ao testar migração:', error.message);
    }
  }

  generateReport() {
    console.log('\n📊 RELATÓRIO DE TESTES');
    console.log('========================');
    
    const totalTests = Object.keys(this.results).length;
    const passedTests = Object.values(this.results).filter(Boolean).length;
    const successRate = ((passedTests / totalTests) * 100).toFixed(1);
    
    console.log(`✅ Testes aprovados: ${passedTests}/${totalTests} (${successRate}%)`);
    
    Object.entries(this.results).forEach(([test, result]) => {
      const status = result ? '✅' : '❌';
      const testName = test.charAt(0).toUpperCase() + test.slice(1);
      console.log(`  ${status} ${testName}`);
    });
    
    if (passedTests === totalTests) {
      console.log('\n🎉 TODOS OS TESTES APROVADOS!');
      console.log('As centralizações estão funcionando corretamente.');
    } else {
      console.log('\n⚠️ ALGUNS TESTES FALHARAM');
      console.log('Verifique os arquivos mencionados acima.');
    }
  }
}

if (require.main === module) {
  const tester = new CentralizationTester();
  tester.testAll().catch(console.error);
}

module.exports = CentralizationTester;
