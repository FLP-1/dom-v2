# Script para Configurar Ambiente Android - DOM v2
# Executar no diretório: C:\dom-v2

Write-Host "📱 CONFIGURANDO AMBIENTE ANDROID - DOM v2" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o Android Studio está instalado
Write-Host "🔍 Verificando Android Studio..." -ForegroundColor Yellow
$androidStudioPath = "C:\Program Files\Android\Android Studio\bin\studio64.exe"
if (Test-Path $androidStudioPath) {
    Write-Host "✅ Android Studio encontrado!" -ForegroundColor Green
} else {
    Write-Host "❌ Android Studio não encontrado!" -ForegroundColor Red
    Write-Host "📥 Baixe em: https://developer.android.com/studio" -ForegroundColor Yellow
    Write-Host ""
}

# Verificar se o Android SDK está configurado
Write-Host "🔍 Verificando Android SDK..." -ForegroundColor Yellow
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
if (Test-Path $env:ANDROID_HOME) {
    Write-Host "✅ Android SDK encontrado em: $env:ANDROID_HOME" -ForegroundColor Green
} else {
    Write-Host "❌ Android SDK não encontrado!" -ForegroundColor Red
    Write-Host "📥 Configure o Android SDK no Android Studio" -ForegroundColor Yellow
    Write-Host ""
}

# Verificar se o emulador está disponível
Write-Host "🔍 Verificando emuladores disponíveis..." -ForegroundColor Yellow
$emulatorPath = "$env:ANDROID_HOME\emulator\emulator.exe"
if (Test-Path $emulatorPath) {
    Write-Host "✅ Emulador Android encontrado!" -ForegroundColor Green
    
    # Listar emuladores disponíveis
    Write-Host "📱 Emuladores disponíveis:" -ForegroundColor Cyan
    & "$env:ANDROID_HOME\emulator\emulator.exe" -list-avds
    Write-Host ""
} else {
    Write-Host "❌ Emulador Android não encontrado!" -ForegroundColor Red
    Write-Host "📥 Crie um emulador no Android Studio" -ForegroundColor Yellow
    Write-Host ""
}

# Verificar se o ADB está disponível
Write-Host "🔍 Verificando ADB..." -ForegroundColor Yellow
$adbPath = "$env:ANDROID_HOME\platform-tools\adb.exe"
if (Test-Path $adbPath) {
    Write-Host "✅ ADB encontrado!" -ForegroundColor Green
} else {
    Write-Host "❌ ADB não encontrado!" -ForegroundColor Red
    Write-Host ""
}

# Verificar se o Java está configurado
Write-Host "🔍 Verificando Java..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1
    Write-Host "✅ Java encontrado!" -ForegroundColor Green
    Write-Host "   Versão: $($javaVersion[0])" -ForegroundColor White
} catch {
    Write-Host "❌ Java não encontrado!" -ForegroundColor Red
    Write-Host "📥 Instale o JDK 11 ou superior" -ForegroundColor Yellow
    Write-Host ""
}

# Verificar se o Node.js está configurado
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado! Versão: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "📥 Instale o Node.js" -ForegroundColor Yellow
    Write-Host ""
}

# Verificar se o React Native CLI está instalado
Write-Host "🔍 Verificando React Native CLI..." -ForegroundColor Yellow
try {
    $rnVersion = npx react-native --version
    Write-Host "✅ React Native CLI encontrado! Versão: $rnVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ React Native CLI não encontrado!" -ForegroundColor Red
    Write-Host "📥 Instalando React Native CLI..." -ForegroundColor Yellow
    npm install -g @react-native-community/cli
    Write-Host ""
}

Write-Host ""
Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Magenta
Write-Host "   1. Abra o Android Studio" -ForegroundColor White
Write-Host "   2. Crie um emulador Android (API 30+)" -ForegroundColor White
Write-Host "   3. Execute: .\scripts\testar-android.ps1" -ForegroundColor White
Write-Host "   4. Ou execute: .\scripts\testar-web.ps1" -ForegroundColor White
Write-Host ""

Write-Host "📱 CONFIGURAÇÃO ANDROID CONCLUÍDA!" -ForegroundColor Green 