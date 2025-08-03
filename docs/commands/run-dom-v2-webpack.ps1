# 🚀 DOM v2 - Script de Execução com Webpack
# Sistema de Gestão Doméstica - Versão 2.0.0

Write-Host "🏠 DOM v2 - Sistema de Gestão Doméstica" -ForegroundColor Cyan
Write-Host "🚀 Iniciando com Webpack/Babel..." -ForegroundColor Green
Write-Host ""

# Função para verificar se um processo está rodando
function Test-ProcessRunning {
    param([string]$ProcessName)
    return Get-Process -Name $ProcessName -ErrorAction SilentlyContinue
}

# Função para matar processos
function Stop-ProcessByName {
    param([string]$ProcessName)
    $processes = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue
    if ($processes) {
        Write-Host "🛑 Parando processos $ProcessName..." -ForegroundColor Yellow
        Stop-Process -Name $ProcessName -Force
        Start-Sleep -Seconds 2
    }
}

# Função para verificar se uma porta está em uso
function Test-PortInUse {
    param([int]$Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $connection -ne $null
}

# Função para aguardar serviço ficar disponível
function Wait-ForService {
    param([string]$Url, [int]$Timeout = 30)
    $startTime = Get-Date
    Write-Host "⏳ Aguardando serviço em $Url..." -ForegroundColor Yellow
    
    while ((Get-Date) -lt $startTime.AddSeconds($Timeout)) {
        try {
            $response = Invoke-WebRequest -Uri $Url -TimeoutSec 5 -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Serviço disponível em $Url" -ForegroundColor Green
                return $true
            }
        }
        catch {
            Start-Sleep -Seconds 1
        }
    }
    
    Write-Host "❌ Timeout aguardando serviço em $Url" -ForegroundColor Red
    return $false
}

# Limpar processos existentes
Write-Host "🧹 Limpando processos existentes..." -ForegroundColor Yellow
Stop-ProcessByName "node"
Stop-ProcessByName "npm"
Start-Sleep -Seconds 3

# Verificar se as portas estão livres
Write-Host "🔍 Verificando portas..." -ForegroundColor Yellow
$ports = @(3000, 3001, 8081, 5432)

foreach ($port in $ports) {
    if (Test-PortInUse $port) {
        Write-Host "⚠️ Porta $port está em uso" -ForegroundColor Yellow
        $process = Get-NetTCPConnection -LocalPort $port | Select-Object -First 1
        if ($process) {
            Write-Host "   Processo: $($process.OwningProcess)" -ForegroundColor Gray
        }
    }
}

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend")) {
    Write-Host "❌ Diretório frontend não encontrado!" -ForegroundColor Red
    Write-Host "💡 Execute este script do diretório raiz do projeto" -ForegroundColor Yellow
    exit 1
}

# Verificar se as dependências estão instaladas
Write-Host "📦 Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

# Verificar se o backend está rodando
Write-Host "🔧 Verificando backend..." -ForegroundColor Yellow
if (-not (Test-ProcessRunning "node")) {
    Write-Host "🚀 Iniciando backend..." -ForegroundColor Green
    Start-Process -FilePath "node" -ArgumentList "backend/server-dev.ts" -WorkingDirectory "." -WindowStyle Minimized
    Start-Sleep -Seconds 5
}

# Aguardar backend ficar disponível
if (Wait-ForService "http://localhost:3001" 30) {
    Write-Host "✅ Backend iniciado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao iniciar backend" -ForegroundColor Red
    exit 1
}

# Iniciar frontend com Webpack
Write-Host "🌐 Iniciando frontend com Webpack..." -ForegroundColor Green
Set-Location frontend

# Verificar se o Webpack está configurado
if (-not (Test-Path "webpack.config.js")) {
    Write-Host "❌ webpack.config.js não encontrado!" -ForegroundColor Red
    exit 1
}

# Instalar dependências se necessário
if (-not (Test-Path "node_modules/webpack")) {
    Write-Host "📦 Instalando dependências do Webpack..." -ForegroundColor Yellow
    npm install
}

# Iniciar servidor de desenvolvimento
Write-Host "🚀 Iniciando servidor de desenvolvimento..." -ForegroundColor Green
Write-Host "🌐 Acesse: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📱 React Native Web com Webpack" -ForegroundColor Cyan
Write-Host ""

try {
    npm run web
} catch {
    Write-Host "❌ Erro ao iniciar servidor Webpack" -ForegroundColor Red
    Write-Host "💡 Tentando com script customizado..." -ForegroundColor Yellow
    try {
        npm run dev:custom
    } catch {
        Write-Host "❌ Erro ao iniciar servidor customizado" -ForegroundColor Red
        Write-Host "🔧 Verifique as dependências e configurações" -ForegroundColor Yellow
        exit 1
    }
}

Set-Location ..

Write-Host ""
Write-Host "🎉 DOM v2 iniciado com sucesso!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Comandos úteis:" -ForegroundColor Yellow
Write-Host "   Build produção: Set-Location frontend; npm run build" -ForegroundColor Gray
Write-Host "   Servir produção: Set-Location frontend; npm run serve:prod" -ForegroundColor Gray
Write-Host "   Parar todos: taskkill /f /im node.exe" -ForegroundColor Gray
Write-Host ""
Write-Host "🔄 Para reiniciar, execute este script novamente" -ForegroundColor Yellow 