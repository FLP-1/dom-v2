# Guia Completo: Teste no Emulador Android

## 🎯 Objetivo
Configurar e testar o aplicativo DOM v2 no emulador Android para visualizar as telas e navegações.

---

## 📋 Pré-requisitos

### 1. **Android Studio Instalado**
- ✅ Já confirmado no sistema
- Caminho: `C:\Program Files\Android\Android Studio\bin\studio64.exe`

### 2. **Configuração Android do Projeto**
- ⚠️ Precisa ser criada
- O projeto atual é React Native Web

---

## 🔧 Passo a Passo

### **Passo 1: Abrir Android Studio**
```powershell
# Abrir Android Studio
& "C:\Program Files\Android\Android Studio\bin\studio64.exe"
```

### **Passo 2: Criar Emulador (AVD)**

1. **No Android Studio:**
   - Vá em `Tools` → `AVD Manager`
   - Clique em `Create Virtual Device`

2. **Escolher Dispositivo:**
   - Categoria: `Phone`
   - Dispositivo: `Pixel 4` (recomendado)
   - Clique em `Next`

3. **Escolher Imagem do Sistema:**
   - API Level: `33` (Android 13)
   - Target: `Android 13.0 (API 33)`
   - Clique em `Next`

4. **Configurar AVD:**
   - Nome: `DOM_v2_Test`
   - Clique em `Finish`

### **Passo 3: Iniciar Emulador**

1. **No AVD Manager:**
   - Clique no botão ▶️ (play) ao lado do emulador criado
   - Aguarde o emulador inicializar (pode demorar alguns minutos)

### **Passo 4: Configurar Projeto Android**

Como o projeto atual é React Native Web, precisamos criar a configuração Android:

```powershell
# Navegar para o frontend
cd frontend

# Criar configuração Android
npx react-native init . --template react-native-template-typescript --skip-install

# Ou se preferir criar um novo projeto
npx react-native init DOMv2Android --template react-native-template-typescript
```

### **Passo 5: Executar Aplicativo**

```powershell
# Verificar se o emulador está rodando
adb devices

# Executar aplicativo
npx react-native run-android
```

---

## 🚀 Comandos Úteis

### **Verificar Dispositivos**
```powershell
# Listar dispositivos conectados
adb devices

# Verificar emuladores rodando
emulator -list-avds
```

### **Logs e Debug**
```powershell
# Ver logs em tempo real
adb logcat | grep ReactNativeJS

# Ver logs específicos do app
adb logcat | grep "DOMv2"

# Limpar logs
adb logcat -c
```

### **Recarregar Aplicativo**
```powershell
# No terminal onde o Metro está rodando:
# Pressione 'R' para recarregar
# Pressione 'D' para abrir menu de desenvolvimento
# Pressione 'M' para abrir menu no dispositivo
```

### **Limpar Cache**
```powershell
# Limpar cache do Metro
npx react-native start --reset-cache

# Limpar cache do Android
cd android
./gradlew clean
cd ..
```

---

## 📱 Testando Navegação

### **1. Telas Principais**
- ✅ Dashboard
- ✅ Login
- ✅ Usuários
- ✅ Financeiro
- ✅ RH
- ✅ Tarefas
- ✅ Notificações
- ✅ Relatórios

### **2. Navegação**
- ✅ Menu lateral
- ✅ Navegação entre telas
- ✅ Botões e ações
- ✅ Formulários

### **3. Funcionalidades**
- ✅ Autenticação
- ✅ CRUD de dados
- ✅ Gráficos e relatórios
- ✅ Notificações

---

## ⚠️ Solução de Problemas

### **Emulador não inicia**
```powershell
# Verificar se há espaço suficiente
# Verificar se a virtualização está habilitada na BIOS
# Reiniciar Android Studio
```

### **App não instala**
```powershell
# Desinstalar app anterior
adb uninstall com.domv2

# Limpar cache
npx react-native start --reset-cache
```

### **Erros de Metro**
```powershell
# Parar Metro (Ctrl+C)
# Limpar cache
npx react-native start --reset-cache

# Reinstalar dependências
npm install
```

### **Problemas de Performance**
```powershell
# Reduzir memória do emulador
# Usar API level mais baixo
# Desabilitar animações do sistema
```

---

## 🎯 Workflow de Teste

### **1. Preparação**
```powershell
# Abrir Android Studio
& "C:\Program Files\Android\Android Studio\bin\studio64.exe"

# Iniciar emulador
# (via AVD Manager)
```

### **2. Execução**
```powershell
# Terminal 1: Metro bundler
cd frontend
npx react-native start

# Terminal 2: Executar app
cd frontend
npx react-native run-android
```

### **3. Teste**
```powershell
# Terminal 3: Logs
adb logcat | grep ReactNativeJS
```

### **4. Debug**
- Use React Native Debugger
- Configure breakpoints no Cursor AI
- Monitore logs em tempo real

---

## 📊 Métricas de Teste

### **Performance**
- ⏱️ Tempo de inicialização
- 📱 Uso de memória
- 🔄 Velocidade de navegação

### **Funcionalidade**
- ✅ Todas as telas carregam
- ✅ Navegação funciona
- ✅ Formulários funcionam
- ✅ Dados são salvos

### **UX/UI**
- 🎨 Layout responsivo
- 📱 Elementos clicáveis
- 🔄 Animações suaves
- 📱 Feedback visual

---

## 🎉 Resultado Esperado

Após seguir este guia, você terá:

1. ✅ **Emulador Android funcionando**
2. ✅ **Aplicativo DOM v2 instalado**
3. ✅ **Todas as telas acessíveis**
4. ✅ **Navegação funcionando**
5. ✅ **Logs em tempo real**
6. ✅ **Debug configurado**

---

**Status:** 🔧 Configuração em Andamento  
**Próximo Passo:** Criar configuração Android e testar no emulador
