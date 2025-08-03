# Script para Testar DOM v2 no Emulador Android
# Executar no diretório: C:\dom-v2

Write-Host "📱 TESTANDO DOM v2 NO EMULADOR ANDROID" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Configurar variáveis de ambiente
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator"

# Verificar se o emulador está rodando
Write-Host "🔍 Verificando emuladores ativos..." -ForegroundColor Yellow
$activeDevices = adb devices
Write-Host "Dispositivos conectados:" -ForegroundColor White
Write-Host $activeDevices -ForegroundColor Gray

# Se não há emuladores ativos, tentar iniciar um
if ($activeDevices -notmatch "emulator") {
    Write-Host "📱 Iniciando emulador..." -ForegroundColor Yellow
    
    # Listar emuladores disponíveis
    $avds = & "$env:ANDROID_HOME\emulator\emulator.exe" -list-avds
    if ($avds) {
        Write-Host "Emuladores disponíveis:" -ForegroundColor Cyan
        $avds | ForEach-Object { Write-Host "   - $_" -ForegroundColor White }
        
        # Usar o primeiro emulador disponível
        $firstAvd = $avds[0]
        Write-Host "Iniciando emulador: $firstAvd" -ForegroundColor Green
        
        # Iniciar emulador em background
        Start-Process -FilePath "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd", $firstAvd -WindowStyle Minimized
        
        Write-Host "⏳ Aguardando emulador inicializar..." -ForegroundColor Yellow
        Start-Sleep -Seconds 30
        
        # Verificar se o emulador está pronto
        $retryCount = 0
        do {
            $devices = adb devices
            $retryCount++
            if ($retryCount -lt 10) {
                Write-Host "Tentativa $retryCount - Aguardando emulador..." -ForegroundColor Yellow
                Start-Sleep -Seconds 10
            }
        } while ($devices -notmatch "emulator" -and $retryCount -lt 10)
        
        if ($devices -match "emulator") {
            Write-Host "✅ Emulador iniciado com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "❌ Falha ao iniciar emulador!" -ForegroundColor Red
            Write-Host "💡 Abra o Android Studio e inicie um emulador manualmente" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ Nenhum emulador encontrado!" -ForegroundColor Red
        Write-Host "💡 Crie um emulador no Android Studio primeiro" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🔧 CONFIGURANDO PROJETO PARA ANDROID..." -ForegroundColor Yellow

# Navegar para o frontend
Set-Location frontend

# Instalar dependências se necessário
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Verificar se o Metro bundler está rodando
Write-Host "🚀 Iniciando Metro bundler..." -ForegroundColor Yellow
Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm start" -WindowStyle Minimized

# Aguardar Metro bundler inicializar
Write-Host "⏳ Aguardando Metro bundler..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Tentar executar no Android
Write-Host "📱 Executando no Android..." -ForegroundColor Yellow
try {
    npm run android
} catch {
    Write-Host "❌ Erro ao executar no Android!" -ForegroundColor Red
    Write-Host "💡 Verifique se:" -ForegroundColor Yellow
    Write-Host "   1. Emulador está rodando" -ForegroundColor White
    Write-Host "   2. Android SDK está configurado" -ForegroundColor White
    Write-Host "   3. Java está instalado" -ForegroundColor White
}

Write-Host ""
Write-Host "🎯 ALTERNATIVAS DE TESTE:" -ForegroundColor Magenta
Write-Host "   1. Teste no navegador: .\scripts\testar-web.ps1" -ForegroundColor White
Write-Host "   2. Teste no dispositivo físico via USB" -ForegroundColor White
Write-Host "   3. Use o React Native Web no navegador" -ForegroundColor White
Write-Host ""

Write-Host "📱 TESTE ANDROID CONCLUÍDO!" -ForegroundColor Green 