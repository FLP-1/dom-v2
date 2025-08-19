# 📱 Guia Completo para Testar DOM v2 Mobile

## 🎯 **Visão Geral**

O DOM v2 possui **duas versões distintas**:

### **🌐 Versão Web (HTML Nativo)**
- **Localização**: `frontend/public/`
- **Tecnologia**: HTML + CSS + JavaScript vanilla
- **Teste**: `scripts/testar-web.ps1`

### **📱 Versão Mobile (React Native)**
- **Localização**: `DOMv2Android/`
- **Tecnologia**: React Native + TypeScript
- **Teste**: `scripts/testar-mobile.ps1`

---

## 🚀 **Como Testar a Versão Mobile**

### **Opção 1: Teste Rápido no Navegador (Recomendado)**

```powershell
# Execute no diretório: C:\dom-v2
.\scripts\testar-mobile.ps1
```

**Escolha a opção 1** quando o script perguntar.

**Vantagens:**
- ✅ Mais rápido e fácil
- ✅ Não precisa de emulador
- ✅ Funcionalidades completas
- ✅ Debug mais simples

**Como funciona:**
1. Inicia o Metro bundler (servidor de desenvolvimento React Native)
2. Abre o navegador em `http://localhost:8081`
3. Renderiza a versão mobile no navegador

---

### **Opção 2: Teste no Emulador Android**

**Pré-requisitos:**
1. **Android Studio** instalado
2. **Android SDK** configurado
3. **Emulador** criado

**Passos:**
```powershell
# Execute no diretório: C:\dom-v2
.\scripts\testar-mobile.ps1
```

**Escolha a opção 2** quando o script perguntar.

**Vantagens:**
- ✅ Teste real do ambiente mobile
- ✅ Validação de performance
- ✅ Teste de gestos touch
- ✅ Interface nativa

---

### **Opção 3: Teste no Dispositivo Físico**

**Pré-requisitos:**
1. **Dispositivo Android** conectado via USB
2. **Modo desenvolvedor** ativado
3. **Depuração USB** ativada

**Passos:**
```powershell
# Execute no diretório: C:\dom-v2
.\scripts\testar-mobile.ps1
```

**Escolha a opção 3** quando o script perguntar.

**Vantagens:**
- ✅ Teste mais realista
- ✅ Validação de recursos nativos
- ✅ Teste de performance real

---

## 🔧 **Configuração do Ambiente Android**

### **1. Instalar Android Studio**

1. Baixe o **Android Studio** em: https://developer.android.com/studio
2. Execute o instalador
3. Siga o assistente de configuração

### **2. Configurar Android SDK**

1. Abra o **Android Studio**
2. Vá em **Tools > SDK Manager**
3. Instale:
   - **Android SDK Platform 33** (API 33)
   - **Android SDK Build-Tools 33.0.0**
   - **Android Emulator**
   - **Android SDK Platform-Tools**

### **3. Configurar Variáveis de Ambiente**

Adicione ao **Path** do Windows:
```
C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk\platform-tools
C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk\emulator
```

Configure as variáveis de ambiente:
- **ANDROID_HOME**: `C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk`
- **ANDROID_SDK_ROOT**: `C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk`

### **4. Criar Emulador**

1. No Android Studio, vá em **Tools > AVD Manager**
2. Clique em **Create Virtual Device**
3. Escolha um dispositivo (ex: Pixel 6)
4. Escolha uma imagem do sistema (API 33)
5. Configure e crie o emulador

---

## 📱 **Funcionalidades Mobile Disponíveis**

### **✅ Telas Implementadas:**

#### **1. Sistema de Autenticação**
- **Arquivo**: `DOMv2Android/src/screens/UltraPremiumLoginScreen.tsx`
- **Funcionalidades**:
  - Login com CPF/CNPJ
  - Validação de dígitos verificadores
  - Múltiplos perfis de usuário
  - Interface mobile otimizada

#### **2. Dashboards por Perfil**
- **Employer**: `DOMv2Android/src/screens/EmployerDashboard.tsx`
- **Employee**: `DOMv2Android/src/screens/EmployeeDashboard.tsx`
- **Family**: `DOMv2Android/src/screens/FamilyDashboard.tsx`
- **Admin**: `DOMv2Android/src/screens/AdminDashboard.tsx`

#### **3. Gestão Financeira**
- **Pagamentos**: `DOMv2Android/src/screens/payments-screen.tsx`
- **Compras**: `DOMv2Android/src/screens/purchases-screen.tsx`
- **Orçamentos**: `DOMv2Android/src/screens/budget/`

#### **4. Recursos Humanos**
- **Funcionários**: `DOMv2Android/src/screens/employees-screen.tsx`
- **Folha de Pagamento**: `DOMv2Android/src/screens/payroll-screen.tsx`
- **RH**: `DOMv2Android/src/screens/hr-screen.tsx`

#### **5. Sistema de Tarefas**
- **Tarefas**: `DOMv2Android/src/screens/tasks-screen.tsx`
- **Relatórios**: `DOMv2Android/src/screens/reports-screen.tsx`

#### **6. Notificações**
- **Notificações**: `DOMv2Android/src/screens/notifications-screen.tsx`

---

## 🎨 **Diferenças entre Web e Mobile**

### **🌐 Versão Web (HTML Nativo)**
```html
<!-- frontend/public/login-screen.html -->
<div class="login-container">
  <form class="login-form">
    <input type="text" placeholder="CPF/CNPJ">
    <button type="submit">Entrar</button>
  </form>
</div>
```

### **📱 Versão Mobile (React Native)**
```typescript
// DOMv2Android/src/screens/UltraPremiumLoginScreen.tsx
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = () => (
  <View style={styles.container}>
    <TextInput placeholder="CPF/CNPJ" />
    <TouchableOpacity>
      <Text>Entrar</Text>
    </TouchableOpacity>
  </View>
);
```

### **🔧 Principais Diferenças:**

| Aspecto | Web (HTML) | Mobile (React Native) |
|---------|------------|----------------------|
| **Tecnologia** | HTML + CSS + JS | React Native + TypeScript |
| **Interface** | Navegador | App nativo |
| **Gestos** | Mouse/Teclado | Touch/Swipe |
| **Performance** | Depende do navegador | Otimizada para mobile |
| **Recursos Nativos** | Limitados | GPS, Câmera, Biometria |

---

## 🚨 **Troubleshooting**

### **Problema: Metro bundler não inicia**
**Solução:**
```powershell
cd DOMv2Android
npm start --reset-cache
```

### **Problema: Emulador não inicia**
**Solução:**
1. Verifique se o Android Studio está instalado
2. Crie um emulador no AVD Manager
3. Habilite virtualização no BIOS (Intel VT-x/AMD-V)

### **Problema: Dispositivo não é reconhecido**
**Solução:**
1. Ative o modo desenvolvedor no dispositivo
2. Ative a depuração USB
3. Instale os drivers USB do fabricante

### **Problema: Erro de dependências**
**Solução:**
```powershell
cd DOMv2Android
rm -rf node_modules
npm install
```

---

## 🎯 **Comandos Úteis**

### **Desenvolvimento:**
```powershell
# Iniciar Metro bundler
cd DOMv2Android
npm start

# Executar no Android
npm run android

# Executar no iOS (apenas macOS)
npm run ios

# Executar no navegador
npm run web
```

### **Debug:**
```powershell
# Menu de desenvolvimento (Android)
Ctrl + M

# Recarregar app
R (no terminal Metro)

# Debug no navegador
F12
```

### **Build:**
```powershell
# Build de desenvolvimento
npm run build:dev

# Build de produção
npm run build
```

---

## 📊 **Comparação de Performance**

### **🌐 Web (HTML Nativo)**
- **Tempo de carregamento**: 1-2s
- **Tamanho do bundle**: ~500KB
- **Compatibilidade**: Universal
- **Recursos nativos**: Limitados

### **📱 Mobile (React Native)**
- **Tempo de carregamento**: 2-3s
- **Tamanho do bundle**: ~15MB
- **Compatibilidade**: Android/iOS
- **Recursos nativos**: Completos

---

## 🎯 **Recomendações**

### **Para Desenvolvimento Inicial:**
1. **Use a opção 1** (navegador) para testes rápidos
2. **Teste funcionalidades** básicas primeiro
3. **Valide a interface** e navegação

### **Para Testes Avançados:**
1. **Use a opção 2** (emulador) para validação completa
2. **Teste gestos touch** e performance
3. **Valide recursos nativos**

### **Para Produção:**
1. **Use a opção 3** (dispositivo físico)
2. **Teste em diferentes dispositivos**
3. **Valide performance real**

---

## 📚 **Recursos Adicionais**

- **Documentação React Native**: https://reactnative.dev/docs
- **Guia Android Studio**: https://developer.android.com/studio
- **Troubleshooting Metro**: https://reactnative.dev/docs/troubleshooting
- **Debug React Native**: https://reactnative.dev/docs/debugging

---

**🎯 Agora você pode testar tanto a versão web quanto a mobile do DOM v2!**
