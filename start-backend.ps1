# Start Backend Script
# Script para iniciar o backend

Write-Host "🔧 Iniciando backend..." -ForegroundColor Green

# Verificar se Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado." -ForegroundColor Red
    exit 1
}

# Verificar se backend existe
if (-not (Test-Path "backend")) {
    Write-Host "❌ Diretório backend não encontrado." -ForegroundColor Red
    exit 1
}

# Instalar dependências se necessário
if (-not (Test-Path "backend/node_modules")) {
    Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

# Verificar se banco de dados está configurado
Write-Host "🗄️  Verificando banco de dados..." -ForegroundColor Cyan
Set-Location backend

if (Test-Path "prisma") {
    Write-Host "📊 Executando migrações do banco..." -ForegroundColor Cyan
    npx prisma migrate dev
}

Set-Location ..

# Iniciar backend
Write-Host "🚀 Iniciando servidor backend..." -ForegroundColor Cyan
Set-Location backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "✅ Backend iniciado!" -ForegroundColor Green
Write-Host "🌐 Backend: http://localhost:3001" -ForegroundColor Blue
Write-Host "📊 API Docs: http://localhost:3001/api/docs" -ForegroundColor Blue

Set-Location ..
