# 📱 Guia Completo - Emulador Android para DOM v2

## 🎯 **Visão Geral**

Este guia te ajudará a configurar e testar o projeto DOM v2 em um emulador Android. O projeto usa **React Native Web**, então você pode testar tanto no navegador quanto no emulador Android.

---

## 🛠️ **PRÉ-REQUISITOS**

### **1. Android Studio**
- **Download**: https://developer.android.com/studio
- **Versão**: 2023.1.1 ou superior
- **Instalação**: Siga o assistente de instalação

### **2. Java Development Kit (JDK)**
- **Versão**: JDK 11 ou superior
- **Download**: https://adoptium.net/
- **Configuração**: Adicione ao PATH do sistema

### **3. Node.js**
- **Versão**: 18.x ou superior
- **Download**: https://nodejs.org/
- **Verificação**: `node --version`

---

## 🔧 **CONFIGURAÇÃO INICIAL**

### **Passo 1: Verificar Ambiente**
```powershell
# Execute no diretório: C:\dom-v2
.\scripts\configurar-android.ps1
```

### **Passo 2: Configurar Android SDK**
1. Abra o **Android Studio**
2. Vá em **Tools > SDK Manager**
3. Instale:
   - **Android SDK Platform 33** (API 33)
   - **Android SDK Build-Tools 33.0.0**
   - **Android Emulator**
   - **Android SDK Platform-Tools**

### **Passo 3: Criar Emulador**
1. No Android Studio, vá em **Tools > AVD Manager**
2. Clique em **Create Virtual Device**
3. Escolha um dispositivo (ex: Pixel 6)
4. Escolha uma imagem do sistema (API 33)
5. Configure e crie o emulador

---

## 🚀 **TESTANDO O PROJETO**

### **Opção 1: Teste no Navegador (Recomendado)**
```powershell
# Execute no diretório: C:\dom-v2
.\scripts\testar-web.ps1
```

**Vantagens:**
- ✅ Mais rápido
- ✅ Não precisa de emulador
- ✅ Funcionalidades completas
- ✅ Debug mais fácil

### **Opção 2: Teste no Emulador Android**
```powershell
# Execute no diretório: C:\dom-v2
.\scripts\testar-android.ps1
```

**Vantagens:**
- ✅ Teste real do ambiente mobile
- ✅ Validação de performance
- ✅ Teste de gestos touch

---

## 📱 **FUNCIONALIDADES DISPONÍVEIS**

### **✅ Implementadas e Testáveis:**
1. **Sistema de Autenticação**
   - Login com CPF/CNPJ
   - Validação de dígitos verificadores
   - Múltiplos perfis de usuário

2. **Gestão Financeira**
   - Controle de compras
   - Gestão de pagamentos
   - Cadastro de fornecedores

3. **Recursos Humanos**
   - Cadastro de funcionários
   - Controle de documentos
   - Avaliação de performance

4. **Sistema de Temas**
   - Adaptação regional
   - Personalização por perfil
   - Modo escuro

5. **Notificações**
   - Sistema inteligente
   - Priorização automática
   - Categorização

6. **Dashboard**
   - Métricas em tempo real
   - Navegação rápida
   - Status de compliance

---

## 🔍 **TROUBLESHOOTING**

### **Problema: Emulador não inicia**
**Solução:**
1. Verifique se o Android Studio está instalado
2. Crie um emulador no AVD Manager
3. Habilite virtualização no BIOS (Intel VT-x/AMD-V)

### **Problema: Metro bundler não conecta**
**Solução:**
1. Verifique se a porta 8081 está livre
2. Execute `adb reverse tcp:8081 tcp:8081`
3. Reinicie o Metro bundler

### **Problema: Dependências não instalam**
**Solução:**
1. Limpe cache: `npm cache clean --force`
2. Delete node_modules e package-lock.json
3. Execute `npm install` novamente

### **Problema: Erro de Java**
**Solução:**
1. Verifique se o JAVA_HOME está configurado
2. Instale JDK 11 ou superior
3. Adicione ao PATH do sistema

---

## 🎯 **COMANDOS ÚTEIS**

### **Verificar Dispositivos Conectados**
```powershell
adb devices
```

### **Listar Emuladores Disponíveis**
```powershell
emulator -list-avds
```

### **Iniciar Emulador Específico**
```powershell
emulator -avd NOME_DO_EMULADOR
```

### **Reiniciar Metro Bundler**
```powershell
cd frontend
npm start -- --reset-cache
```

### **Limpar Cache do React Native**
```powershell
cd frontend
npx react-native start --reset-cache
```

---

## 📊 **COMPARAÇÃO DE PLATAFORMAS**

| Aspecto | Navegador | Emulador Android |
|---------|-----------|------------------|
| **Velocidade** | ⚡ Muito Rápido | 🐌 Mais Lento |
| **Configuração** | ✅ Simples | ⚙️ Complexa |
| **Funcionalidades** | ✅ Completas | ✅ Completas |
| **Debug** | ✅ Fácil | ⚠️ Moderado |
| **Performance** | ✅ Boa | ✅ Real |
| **Gestos Touch** | ⚠️ Limitado | ✅ Completo |

---

## 🎮 **PRÓXIMOS PASSOS**

### **1. Teste Básico (Recomendado)**
```powershell
.\scripts\testar-web.ps1
```

### **2. Teste Avançado (Opcional)**
```powershell
.\scripts\testar-android.ps1
```

### **3. Desenvolvimento**
- Use o navegador para desenvolvimento rápido
- Use o emulador para validação final
- Teste em dispositivo físico para produção

---

## 💡 **DICAS IMPORTANTES**

1. **Para desenvolvimento**: Use o navegador (mais rápido)
2. **Para validação**: Use o emulador Android
3. **Para produção**: Teste em dispositivo físico
4. **Para debug**: Use DevTools do navegador
5. **Para performance**: Monitore no emulador

---

## 🎉 **CONCLUSÃO**

O DOM v2 está **81.2% implementado** e pronto para testes! 

**Recomendação**: Comece testando no **navegador** para ver todas as funcionalidades rapidamente, depois use o emulador Android para validação completa.

**Comandos principais:**
- `.\scripts\testar-web.ps1` - Teste rápido no navegador
- `.\scripts\testar-android.ps1` - Teste completo no emulador
- `.\scripts\configurar-android.ps1` - Verificar ambiente

**Status atual**: ✅ Pronto para testes! 🚀 