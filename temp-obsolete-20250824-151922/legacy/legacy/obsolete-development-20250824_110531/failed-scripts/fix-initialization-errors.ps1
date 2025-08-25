# Script de correção de erros de inicialização DOM v2
# Resolve problemas identificados na imagem de erro

Write-Host "🔧 DOM v2 - Correção de Erros de Inicialização" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# 1. Verificar e matar processos existentes
Write-Host "1. Limpando processos existentes..." -ForegroundColor Yellow
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

# 2. Verificar dependências
Write-Host "2. Verificando dependências..." -ForegroundColor Yellow

# Backend
Write-Host "   Verificando backend..." -ForegroundColor Cyan
if (Test-Path "backend\node_modules") {
    Write-Host "   ✅ Backend node_modules encontrado" -ForegroundColor Green
} else {
    Write-Host "   ❌ Backend node_modules não encontrado - instalando..." -ForegroundColor Red
    Set-Location backend
    npm install
    Set-Location ..
}

# Frontend
Write-Host "   Verificando frontend..." -ForegroundColor Cyan
if (Test-Path "frontend\node_modules") {
    Write-Host "   ✅ Frontend node_modules encontrado" -ForegroundColor Green
} else {
    Write-Host "   ❌ Frontend node_modules não encontrado - instalando..." -ForegroundColor Red
    Set-Location frontend
    npm install
    Set-Location ..
}

# 3. Configurar variáveis de ambiente
Write-Host "3. Configurando variáveis de ambiente..." -ForegroundColor Yellow
$env:DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"
$env:NODE_ENV = "development"
$env:PORT = "3001"

# 4. Iniciar backend primeiro
Write-Host "4. Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\backend'; npx ts-node src/server-dev.ts" -WindowStyle Normal
Start-Sleep -Seconds 8

# 5. Verificar se backend está rodando
Write-Host "5. Verificando backend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Backend funcionando: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend não respondeu - tentando novamente..." -ForegroundColor Red
    Start-Sleep -Seconds 5
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 10
        Write-Host "   ✅ Backend funcionando na segunda tentativa" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ Backend ainda não responde - verifique manualmente" -ForegroundColor Red
    }
}

# 6. Iniciar frontend web
Write-Host "6. Iniciando frontend web..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 5

# 7. Verificar frontend
Write-Host "7. Verificando frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Frontend funcionando: $($response.service)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Frontend não respondeu - tentando novamente..." -ForegroundColor Red
    Start-Sleep -Seconds 5
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET -TimeoutSec 10
        Write-Host "   ✅ Frontend funcionando na segunda tentativa" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ Frontend ainda não responde - verifique manualmente" -ForegroundColor Red
    }
}

# 8. Status final
Write-Host "8. Status final dos serviços:" -ForegroundColor Yellow
$services = @(
    @{Name="Backend API"; Port=3001; Url="http://localhost:3001/health"},
    @{Name="Frontend Web"; Port=3000; Url="http://localhost:3000/health"}
)

foreach ($service in $services) {
    try {
        $response = Invoke-RestMethod -Uri $service.Url -Method GET -TimeoutSec 5
        Write-Host "   ✅ $($service.Name): OK (porta $($service.Port))" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ $($service.Name): FALHOU (porta $($service.Port))" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎯 Correção concluída!" -ForegroundColor Green
Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Se ainda houver problemas:" -ForegroundColor Yellow
Write-Host "1. Verifique se PostgreSQL está rodando" -ForegroundColor Gray
Write-Host "2. Execute: .\docs\commands\run-dom-v2-stable.ps1" -ForegroundColor Gray
Write-Host "3. Verifique logs nos terminais abertos" -ForegroundColor Gray 