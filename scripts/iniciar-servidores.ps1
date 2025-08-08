# Script para iniciar servidores DOM v2
# Backend + Frontend

Write-Host "🚀 Iniciando servidores DOM v2..." -ForegroundColor Green

# Verificar se os diretórios existem
if (-not (Test-Path "backend")) {
    Write-Host "❌ Diretório backend não encontrado!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "frontend")) {
    Write-Host "❌ Diretório frontend não encontrado!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Diretórios encontrados!" -ForegroundColor Green

# Iniciar Backend
Write-Host "`n🔧 Iniciando Backend..." -ForegroundColor Yellow
Set-Location "backend"

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Cyan
    npm install
}

Write-Host "🚀 Executando: npm run dev" -ForegroundColor White
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Voltar para o diretório raiz
Set-Location ".."

# Aguardar um pouco
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "`n🎨 Iniciando Frontend..." -ForegroundColor Yellow
Set-Location "frontend"

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Cyan
    npm install
}

Write-Host "🚀 Executando: npm run web" -ForegroundColor White
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run web"

# Voltar para o diretório raiz
Set-Location ".."

Write-Host "`n⏳ Aguardando servidores iniciarem..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Verificar se estão rodando
Write-Host "`n🔍 Verificando servidores..." -ForegroundColor Yellow
$ports = @(3000, 5000, 8000, 8080)
$running = @()

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        $running += $port
        Write-Host "✅ Porta $port está ativa" -ForegroundColor Green
    }
}

if ($running.Count -gt 0) {
    Write-Host "`n🎉 Servidores iniciados com sucesso!" -ForegroundColor Green
    Write-Host "🌐 Acesse: http://localhost:3000" -ForegroundColor Cyan
} else {
    Write-Host "`n⚠️ Nenhum servidor detectado nas portas comuns" -ForegroundColor Yellow
    Write-Host "Verifique as janelas do PowerShell que foram abertas" -ForegroundColor White
}

Write-Host "`n📋 Comandos manuais:" -ForegroundColor Cyan
Write-Host "   Backend:  cd backend; npm run dev" -ForegroundColor White
Write-Host "   Frontend: cd frontend; npm run web" -ForegroundColor White
