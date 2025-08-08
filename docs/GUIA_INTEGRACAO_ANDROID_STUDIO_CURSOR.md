# Guia de Integração: Android Studio + Cursor AI

## 🎯 Objetivo
Integrar o Android Studio com o Cursor AI para desenvolvimento eficiente do projeto DOM v2.

---

## 🔧 Configuração Básica

### 1. **Verificar Instalação**
```powershell
# Verificar se Android Studio está instalado
Get-ChildItem "C:\Program Files\Android\Android Studio" -ErrorAction SilentlyContinue
```

### 2. **Adicionar ao PATH**
```powershell
# Adicionar Android Studio ao PATH do sistema
$env:PATH += ";C:\Program Files\Android\Android Studio\bin"
```

---

## 🚀 Comandos de Integração

### **Abrir Android Studio**
```powershell
# Abrir Android Studio
& "C:\Program Files\Android\Android Studio\bin\studio64.exe"

# Ou usar o script criado
powershell -ExecutionPolicy Bypass -File "scripts/abrir-android-studio.ps1"
```

### **Abrir Projeto Específico**
```powershell
# Abrir projeto Android no Android Studio
& "C:\Program Files\Android\Android Studio\bin\studio64.exe" frontend/android
```

### **Verificar Emuladores**
```powershell
# Listar dispositivos conectados
adb devices

# Verificar emuladores rodando
emulator -list-avds
```

---

## 📱 Desenvolvimento Android

### **Build e Execução**
```powershell
# Navegar para o frontend
cd frontend

# Build para Android
npx react-native run-android

# Build para Android (modo release)
npx react-native run-android --variant=release
```

### **Debug e Logs**
```powershell
# Ver logs do Android
adb logcat

# Filtrar logs do React Native
adb logcat | grep "ReactNativeJS"

# Limpar logs
adb logcat -c
```

---

## 🔗 Integração com Cursor AI

### **1. Terminal Integrado**
- Use o terminal integrado do Cursor para executar comandos Android
- Mantenha o Android Studio aberto para visualização do projeto

### **2. Sincronização de Arquivos**
- Edite arquivos no Cursor AI
- O Android Studio detectará mudanças automaticamente
- Use "File > Sync Project with Gradle Files" no Android Studio

### **3. Debugging**
- Configure breakpoints no Cursor AI
- Use o debugger do Android Studio para debugging nativo
- Use React Native Debugger para debugging JavaScript

---

## 🛠️ Configurações Avançadas

### **Variáveis de Ambiente**
```powershell
# Configurar variáveis do Android
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools"
$env:PATH += ";$env:ANDROID_HOME\tools"
```

### **Aliases Úteis**
```powershell
# Criar aliases para comandos frequentes
Set-Alias -Name astudio -Value "C:\Program Files\Android\Android Studio\bin\studio64.exe"
Set-Alias -Name adevices -Value "adb devices"
Set-Alias -Name alogcat -Value "adb logcat"
```

---

## 📋 Workflow Recomendado

### **1. Desenvolvimento Diário**
1. Abra o Cursor AI para edição de código
2. Abra o Android Studio para visualização do projeto
3. Use o terminal do Cursor para comandos
4. Sincronize mudanças no Android Studio

### **2. Debugging**
1. Configure breakpoints no Cursor AI
2. Use React Native Debugger
3. Monitore logs no terminal do Cursor
4. Use Android Studio para debugging nativo

### **3. Build e Deploy**
1. Teste no emulador via Cursor AI
2. Build final no Android Studio
3. Assinatura e release no Android Studio

---

## ⚠️ Solução de Problemas

### **Android Studio não abre**
```powershell
# Verificar se o processo está rodando
Get-Process | Where-Object {$_.ProcessName -like "*studio*"}

# Matar processo se necessário
Stop-Process -Name "studio64" -Force
```

### **Emulador não inicia**
```powershell
# Verificar AVDs disponíveis
emulator -list-avds

# Iniciar emulador específico
emulator -avd [nome_do_avd]
```

### **Problemas de PATH**
```powershell
# Verificar PATH atual
$env:PATH -split ';'

# Adicionar Android Studio ao PATH permanentemente
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\Program Files\Android\Android Studio\bin", "User")
```

---

## 🎉 Benefícios da Integração

### ✅ **Produtividade**
- Edição rápida no Cursor AI
- Visualização em tempo real no Android Studio
- Terminal integrado para comandos

### ✅ **Debugging Eficiente**
- Breakpoints no Cursor AI
- Debugging nativo no Android Studio
- Logs centralizados

### ✅ **Workflow Otimizado**
- Sincronização automática
- Build e deploy simplificados
- Desenvolvimento ágil

---

## 📞 Suporte

Para problemas específicos:
1. Verifique os logs do Android Studio
2. Consulte a documentação do React Native
3. Use o terminal integrado para debugging
4. Reinicie ambos os aplicativos se necessário

---

**Status:** ✅ Configuração Completa  
**Próximo Passo:** Testar a integração com o projeto DOM v2
