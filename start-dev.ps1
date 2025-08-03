# DOM-V2 Development Start Script
# PowerShell script para iniciar ambiente de desenvolvimento

Write-Host "🚀 Iniciando DOM-V2 em modo desenvolvimento..." -ForegroundColor Green

# Verificar se Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado. Instale o Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se npm está instalado
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm não encontrado. Instale o npm primeiro." -ForegroundColor Red
    exit 1
}

# Instalar dependências se necessário
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

# Iniciar backend
Write-Host "🔧 Iniciando backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run start-backend"

# Aguardar um pouco para o backend inicializar
Start-Sleep -Seconds 3

# Iniciar frontend
Write-Host "🎨 Iniciando frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "✅ DOM-V2 iniciado com sucesso!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "🔧 Backend: http://localhost:3001" -ForegroundColor Blue
Write-Host "📱 Mobile: Expo DevTools" -ForegroundColor Blue
