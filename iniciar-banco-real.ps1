# Script para iniciar o DOM v2 com banco PostgreSQL real
Write-Host "=== DOM V2 - BANCO POSTGRESQL REAL ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se PostgreSQL está rodando
Write-Host "=== VERIFICANDO POSTGRESQL ===" -ForegroundColor Yellow
try {
    $env:DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"
    $testConnection = Invoke-RestMethod -Uri "http://localhost:5432" -TimeoutSec 3 -ErrorAction SilentlyContinue
    Write-Host "✅ PostgreSQL rodando!" -ForegroundColor Green
} catch {
    Write-Host "❌ PostgreSQL não responde" -ForegroundColor Red
    Write-Host "💡 Verifique se o PostgreSQL está instalado e rodando" -ForegroundColor Yellow
    Write-Host "   Download: https://www.postgresql.org/download/windows/" -ForegroundColor White
    exit 1
}

# Parar processos existentes
Write-Host ""
Write-Host "=== PARANDO PROCESSOS EXISTENTES ===" -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "✅ Processos parados" -ForegroundColor Green

# Iniciar Backend com banco real
Write-Host ""
Write-Host "=== INICIANDO BACKEND COM BANCO REAL ===" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\backend'; `$env:DATABASE_URL = 'postgresql://postgres:FLP*2025@localhost:5432/db_dom'; npx ts-node src/server-real-database.ts" -WindowStyle Normal
Write-Host "✅ Backend iniciado em nova janela" -ForegroundColor Green

# Aguardar backend inicializar
Write-Host ""
Write-Host "=== AGUARDANDO BACKEND ===" -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Testar backend
Write-Host ""
Write-Host "=== TESTANDO BACKEND ===" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -TimeoutSec 10
    Write-Host "✅ Backend funcionando!" -ForegroundColor Green
    Write-Host "🗄️  Database: $($response.database)" -ForegroundColor Cyan
    Write-Host "💬 Message: $($response.message)" -ForegroundColor White
} catch {
    Write-Host "❌ Backend não responde: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Verifique a janela do backend" -ForegroundColor Yellow
}

# Iniciar Frontend
Write-Host ""
Write-Host "=== INICIANDO FRONTEND ===" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npm run web" -WindowStyle Normal
Write-Host "✅ Frontend iniciado em nova janela" -ForegroundColor Green

# Aguardar frontend inicializar
Write-Host ""
Write-Host "=== AGUARDANDO FRONTEND ===" -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Testar frontend
Write-Host ""
Write-Host "=== TESTANDO FRONTEND ===" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000" -TimeoutSec 10
    Write-Host "✅ Frontend funcionando!" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend não responde: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Verifique a janela do frontend" -ForegroundColor Yellow
}

# Resumo final
Write-Host ""
Write-Host "=== 🎉 DOM V2 COM BANCO REAL INICIADO! ===" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de acesso:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "   Health:   http://localhost:3001/health" -ForegroundColor White
Write-Host ""
Write-Host "🗄️  Banco de dados: PostgreSQL" -ForegroundColor Cyan
Write-Host "📊 Dados: Reais e persistentes" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Para parar os serviços, feche as janelas do PowerShell" -ForegroundColor Yellow
Write-Host "" 