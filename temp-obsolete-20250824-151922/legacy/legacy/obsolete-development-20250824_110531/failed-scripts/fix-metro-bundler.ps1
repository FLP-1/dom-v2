# Script para corrigir problemas do Metro Bundler
Write-Host "🔧 Corrigindo Metro Bundler..." -ForegroundColor Green

# 1. Parar processos na porta 8081
Write-Host "1. Parando processos na porta 8081..." -ForegroundColor Yellow
try {
    $processes = netstat -ano | Select-String ":8081\s" | ForEach-Object {
        ($_ -split '\s+')[-1]
    }
    foreach ($processId in $processes) {
        if ($processId -and $processId -ne "0") {
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            Write-Host "   Processo $processId finalizado" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "   Nenhum processo encontrado na porta 8081" -ForegroundColor Gray
}

Start-Sleep -Seconds 3

# 2. Limpar cache do Metro
Write-Host "2. Limpando cache do Metro..." -ForegroundColor Yellow
cd frontend
if (Test-Path "node_modules\.cache") {
    Remove-Item "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   Cache do Metro limpo" -ForegroundColor Green
}

# 3. Iniciar Metro Bundler
Write-Host "3. Iniciando Metro Bundler..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npx react-native start --port 8081 --reset-cache" -WindowStyle Normal

Start-Sleep -Seconds 15

# 4. Verificar Metro
Write-Host "4. Verificando Metro Bundler..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/status" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Metro Bundler funcionando: $response" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Metro Bundler não respondeu" -ForegroundColor Red
}

# 5. Testar bundle
Write-Host "5. Testando bundle..." -ForegroundColor Yellow
try {
    $bundleResponse = Invoke-WebRequest -Uri "http://localhost:8081/index.bundle?platform=web&dev=true" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Bundle sendo servido (tamanho: $($bundleResponse.Content.Length) bytes)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Bundle não está sendo servido" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Metro Bundler corrigido!" -ForegroundColor Green
Write-Host "Metro Bundler: http://localhost:8081" -ForegroundColor Cyan
Write-Host "Bundle: http://localhost:8081/index.bundle?platform=web&dev=true" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Agora acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host "A aplicação React Native Web deve carregar corretamente!" -ForegroundColor Green 