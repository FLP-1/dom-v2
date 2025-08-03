# Script para iniciar DOM v2 usando Webpack (evita problemas do Metro)
Write-Host "🚀 Iniciando DOM v2 com Webpack..." -ForegroundColor Green

# 1. Parar processos existentes
Write-Host "1. Parando processos existentes..." -ForegroundColor Yellow
$ports = @(3000, 3001, 8080)
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

# 4. Iniciar Webpack Dev Server
Write-Host "4. Iniciando Webpack Dev Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 15

# 5. Verificar Webpack
Write-Host "5. Verificando Webpack..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Webpack funcionando (status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️ Webpack pode estar inicializando..." -ForegroundColor Yellow
}

# 6. Iniciar frontend web
Write-Host "6. Iniciando frontend web..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; node server-web-webpack.js" -WindowStyle Normal
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
Write-Host "🎯 Inicialização com Webpack completa!" -ForegroundColor Green
Write-Host "Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Webpack Dev Server: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Agora usando Webpack em vez do Metro - sem problemas de cache!" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 Se houver problemas:" -ForegroundColor Yellow
Write-Host "1. Aguarde alguns segundos para o Webpack carregar" -ForegroundColor Gray
Write-Host "2. Recarregue a página" -ForegroundColor Gray
Write-Host "3. Verifique os terminais para logs" -ForegroundColor Gray 