# Script completo para iniciar DOM v2 com Metro bundler
Write-Host "🚀 Iniciando DOM v2 completo com Metro bundler..." -ForegroundColor Green

# 1. Parar processos existentes
Write-Host "1. Parando processos existentes..." -ForegroundColor Yellow
$ports = @(3000, 3001, 8081)
foreach ($port in $ports) {
    try {
        $processes = netstat -ano | Select-String ":$port\s" | ForEach-Object {
            ($_ -split '\s+')[-1]
        }
        foreach ($processId in $processes) {
            if ($processId -and $processId -ne "0") {
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "   Processo $processId na porta $port finalizado" -ForegroundColor Red
            }
        }
    }
    catch {
        Write-Host "   Nenhum processo encontrado na porta $port" -ForegroundColor Gray
    }
}

Start-Sleep -Seconds 3

# 2. Iniciar backend
Write-Host "2. Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\backend'; `$env:DATABASE_URL = 'postgresql://postgres:FLP*2025@localhost:5432/db_dom'; npx ts-node src/server-dev.ts" -WindowStyle Normal
Start-Sleep -Seconds 8

# 3. Verificar backend
Write-Host "3. Verificando backend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Backend funcionando: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend não respondeu" -ForegroundColor Red
}

# 4. Iniciar Metro bundler
Write-Host "4. Iniciando Metro bundler..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npx react-native start --port 8081" -WindowStyle Normal
Start-Sleep -Seconds 10

# 5. Verificar Metro bundler
Write-Host "5. Verificando Metro bundler..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/status" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Metro bundler funcionando" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️ Metro bundler pode estar inicializando..." -ForegroundColor Yellow
}

# 6. Iniciar frontend web
Write-Host "6. Iniciando frontend web..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; node server-web-robust.js" -WindowStyle Normal
Start-Sleep -Seconds 5

# 7. Verificar frontend
Write-Host "7. Verificando frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Frontend funcionando: $($response.service)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Frontend não respondeu" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Inicialização completa!" -ForegroundColor Green
Write-Host "Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Metro Bundler: http://localhost:8081" -ForegroundColor Cyan
Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Agora você verá a aplicação React Native Web real!" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 Se houver problemas:" -ForegroundColor Yellow
Write-Host "1. Aguarde alguns segundos para o Metro carregar" -ForegroundColor Gray
Write-Host "2. Recarregue a página" -ForegroundColor Gray
Write-Host "3. Verifique os terminais para logs" -ForegroundColor Gray 