# Script robusto para iniciar e monitorar serviços DOM v2
# Com reinicialização automática e health checks

param(
    [switch]$MonitorOnly = $false
)

# Configurações
$BackendPort = 3001
$FrontendPort = 3000
$MetroPort = 8081
$BackendDir = "C:\dom-v2\backend"
$FrontendDir = "C:\dom-v2\frontend"

# Função para verificar se uma porta está em uso
function Test-Port {
    param($Port)
    try {
        $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    }
    catch {
        return $false
    }
}

# Função para matar processos em uma porta
function Stop-ProcessOnPort {
    param($Port)
    try {
        $processes = netstat -ano | Select-String ":$Port\s" | ForEach-Object {
            ($_ -split '\s+')[-1]
        }
        foreach ($processId in $processes) {
            if ($processId -and $processId -ne "0") {
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "Processo $processId na porta $Port finalizado"
            }
        }
    }
    catch {
        Write-Host "Erro ao finalizar processos na porta $Port"
    }
}

# Função para iniciar backend
function Start-Backend {
    Write-Host "Iniciando Backend..."
    $env:DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BackendDir'; npx ts-node src/server-dev.ts" -WindowStyle Normal
    Start-Sleep -Seconds 5
}

# Função para iniciar Metro bundler
function Start-Metro {
    Write-Host "Iniciando Metro Bundler..."
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FrontendDir'; npx react-native start --port $MetroPort" -WindowStyle Normal
    Start-Sleep -Seconds 10
}

# Função para iniciar frontend web
function Start-FrontendWeb {
    Write-Host "Iniciando Frontend Web..."
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FrontendDir'; node server-web-robust.js" -WindowStyle Normal
    Start-Sleep -Seconds 5
}

# Função para health check
function Test-ServiceHealth {
    param($ServiceName, $Url, $Port)
    
    try {
        $response = Invoke-RestMethod -Uri $Url -Method GET -TimeoutSec 5
        Write-Host "OK ${ServiceName}: OK" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "ERRO ${ServiceName}: FALHOU (porta ${Port})" -ForegroundColor Red
        return $false
    }
}

# Função para monitorar serviços
function Monitor-Services {
    Write-Host "Monitorando serviços..."
    
    while ($true) {
        $backendOk = Test-ServiceHealth "Backend" "http://localhost:$BackendPort/health" $BackendPort
        $frontendOk = Test-ServiceHealth "Frontend Web" "http://localhost:$FrontendPort/health" $FrontendPort
        $metroOk = Test-ServiceHealth "Metro Bundler" "http://localhost:$MetroPort/status" $MetroPort
        
        if (-not $backendOk) {
            Write-Host "Reiniciando Backend..." -ForegroundColor Yellow
            Stop-ProcessOnPort $BackendPort
            Start-Sleep -Seconds 2
            Start-Backend
        }
        
        if (-not $metroOk) {
            Write-Host "Reiniciando Metro Bundler..." -ForegroundColor Yellow
            Stop-ProcessOnPort $MetroPort
            Start-Sleep -Seconds 2
            Start-Metro
        }
        
        if (-not $frontendOk) {
            Write-Host "Reiniciando Frontend Web..." -ForegroundColor Yellow
            Stop-ProcessOnPort $FrontendPort
            Start-Sleep -Seconds 2
            Start-FrontendWeb
        }
        
        Write-Host "Proximo check em 30 segundos..." -ForegroundColor Cyan
        Start-Sleep -Seconds 30
    }
}

# Função principal
function Start-DOMv2Services {
    Write-Host "DOM v2 - Iniciando Servicos Estaveis" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    
    # Limpar processos existentes
    Write-Host "Limpando processos existentes..."
    Stop-ProcessOnPort $BackendPort
    Stop-ProcessOnPort $FrontendPort
    Stop-ProcessOnPort $MetroPort
    Start-Sleep -Seconds 3
    
    # Iniciar serviços
    Start-Backend
    Start-Metro
    Start-FrontendWeb
    
    # Aguardar inicialização
    Write-Host "Aguardando inicializacao dos servicos..."
    Start-Sleep -Seconds 15
    
    # Verificar status inicial
    Write-Host "Verificando status inicial..."
    Test-ServiceHealth "Backend" "http://localhost:$BackendPort/health" $BackendPort
    Test-ServiceHealth "Frontend Web" "http://localhost:$FrontendPort/health" $FrontendPort
    Test-ServiceHealth "Metro Bundler" "http://localhost:$MetroPort/status" $MetroPort
    
    Write-Host ""
    Write-Host "Servicos iniciados!" -ForegroundColor Green
    Write-Host "Frontend Web: http://localhost:$FrontendPort" -ForegroundColor Cyan
    Write-Host "Backend API: http://localhost:$BackendPort" -ForegroundColor Cyan
    Write-Host "Metro Bundler: http://localhost:$MetroPort" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para parar todos os servicos: Ctrl+C" -ForegroundColor Yellow
    Write-Host "Para monitoramento continuo: .\run-dom-v2-stable.ps1 -MonitorOnly" -ForegroundColor Yellow
}

# Execução principal
if ($MonitorOnly) {
    Write-Host "Modo monitoramento ativo..." -ForegroundColor Yellow
    Monitor-Services
} else {
    Start-DOMv2Services
    
    # Perguntar se quer monitoramento contínuo
    Write-Host ""
    $response = Read-Host "Deseja ativar monitoramento continuo? (s/n)"
    if ($response -eq "s" -or $response -eq "S") {
        Write-Host "Ativando monitoramento continuo..." -ForegroundColor Yellow
        Monitor-Services
    } else {
        Write-Host "Servicos iniciados sem monitoramento" -ForegroundColor Green
        Write-Host "Execute novamente com -MonitorOnly para monitoramento" -ForegroundColor Yellow
    }
} 