# Script de Execução DOM v2 - PowerShell Completo
# Data: 25/07/2025
# Regra: Comandos PowerShell com diretórios específicos

param(
    [string]$Mode = "dev",
    [switch]$Install,
    [switch]$Build,
    [switch]$Test,
    [switch]$Health
)

Write-Host "=== EXECUCAO DOM v2 - POWERSHELL ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow
Write-Host "Diretório Atual: $(Get-Location)" -ForegroundColor Cyan

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2 (C:\dom-v2)" -ForegroundColor Red
    Write-Host "Comando correto: Set-Location C:\dom-v2; .\docs\commands\run-dom-v2-powershell-complete.ps1" -ForegroundColor Yellow
    exit 1
}

# Função para executar comandos com verificação de erro
function Invoke-CommandWithCheck {
    param(
        [string]$Command,
        [string]$Description,
        [string]$Directory = "."
    )
    
    Write-Host "`n$Description..." -ForegroundColor Cyan
    Write-Host "Diretório: $Directory" -ForegroundColor Gray
    
    if ($Directory -ne ".") {
        Push-Location $Directory
    }
    
    try {
        Invoke-Expression $Command
        if ($LASTEXITCODE -ne 0) {
            Write-Host "ERRO: Falha no comando: $Command" -ForegroundColor Red
            return $false
        }
        return $true
    }
    catch {
        Write-Host "ERRO: Exceção no comando: $Command" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        return $false
    }
    finally {
        if ($Directory -ne ".") {
            Pop-Location
        }
    }
}

# Instalação de dependências
if ($Install) {
    Write-Host "`n=== INSTALANDO DEPENDÊNCIAS ===" -ForegroundColor Green
    
    # Instalar dependências raiz
    if (-not (Invoke-CommandWithCheck -Command "npm install" -Description "Instalando dependências raiz" -Directory ".")) {
        exit 1
    }
    
    # Instalar dependências backend
    if (-not (Invoke-CommandWithCheck -Command "npm install" -Description "Instalando dependências backend" -Directory "backend")) {
        exit 1
    }
    
    # Instalar dependências frontend
    if (-not (Invoke-CommandWithCheck -Command "npm install" -Description "Instalando dependências frontend" -Directory "frontend")) {
        exit 1
    }
    
    Write-Host "`n✅ Instalação concluída com sucesso!" -ForegroundColor Green
}

# Build do projeto
if ($Build) {
    Write-Host "`n=== BUILD DO PROJETO ===" -ForegroundColor Green
    
    # Build backend
    if (-not (Invoke-CommandWithCheck -Command "npm run build" -Description "Build backend" -Directory "backend")) {
        exit 1
    }
    
    # Build frontend
    if (-not (Invoke-CommandWithCheck -Command "npm run build" -Description "Build frontend" -Directory "frontend")) {
        exit 1
    }
    
    Write-Host "`n✅ Build concluído com sucesso!" -ForegroundColor Green
}

# Testes
if ($Test) {
    Write-Host "`n=== EXECUTANDO TESTES ===" -ForegroundColor Green
    
    # Testes backend
    if (-not (Invoke-CommandWithCheck -Command "npm test" -Description "Testes backend" -Directory "backend")) {
        Write-Host "⚠️ Testes backend falharam, mas continuando..." -ForegroundColor Yellow
    }
    
    # Testes frontend
    if (-not (Invoke-CommandWithCheck -Command "npm test" -Description "Testes frontend" -Directory "frontend")) {
        Write-Host "⚠️ Testes frontend falharam, mas continuando..." -ForegroundColor Yellow
    }
    
    Write-Host "`n✅ Testes concluídos!" -ForegroundColor Green
}

# Health Check
if ($Health) {
    Write-Host "`n=== HEALTH CHECK ===" -ForegroundColor Green
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 5
        Write-Host "✅ Backend Health: $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Backend Health: Indisponível" -ForegroundColor Red
    }
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8081" -Method GET -TimeoutSec 5
        Write-Host "✅ Frontend Health: $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Frontend Health: Indisponível" -ForegroundColor Red
    }
}

# Modo de execução
switch ($Mode.ToLower()) {
    "dev" {
        Write-Host "`n=== INICIANDO MODO DESENVOLVIMENTO ===" -ForegroundColor Green
        
        # Iniciar backend em nova janela
        Write-Host "Iniciando Backend..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$(Get-Location)\backend'; npm run dev"
        
        Start-Sleep -Seconds 3
        
        # Iniciar frontend em nova janela
        Write-Host "Iniciando Frontend..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$(Get-Location)\frontend'; npm run dev"
        
        Write-Host "`n=== SERVIÇOS INICIADOS ===" -ForegroundColor Green
        Write-Host "Backend: http://localhost:3001" -ForegroundColor Yellow
        Write-Host "Frontend: http://localhost:8081" -ForegroundColor Yellow
        Write-Host "Health Check: http://localhost:3001/health" -ForegroundColor Yellow
    }
    
    "web" {
        Write-Host "`n=== INICIANDO MODO WEB ===" -ForegroundColor Green
        
        # Iniciar backend
        Write-Host "Iniciando Backend..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$(Get-Location)\backend'; npm run dev"
        
        Start-Sleep -Seconds 3
        
        # Iniciar frontend web
        Write-Host "Iniciando Frontend Web..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$(Get-Location)\frontend'; npm run web"
        
        Write-Host "`n=== SERVIÇOS WEB INICIADOS ===" -ForegroundColor Green
        Write-Host "Backend: http://localhost:3001" -ForegroundColor Yellow
        Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Yellow
    }
    
    "concurrent" {
        Write-Host "`n=== INICIANDO MODO CONCORRENTE ===" -ForegroundColor Green
        
        # Verificar se concurrently está instalado
        if (-not (Get-Command "concurrently" -ErrorAction SilentlyContinue)) {
            Write-Host "Instalando concurrently..." -ForegroundColor Yellow
            npm install --save-dev concurrently
        }
        
        # Executar ambos os serviços concorrentemente
        Write-Host "Iniciando Backend e Frontend concorrentemente..." -ForegroundColor Cyan
        concurrently "Set-Location backend; npm run dev" "Set-Location frontend; npm run dev"
    }
    
    default {
        Write-Host "Modo '$Mode' não reconhecido. Modos disponíveis: dev, web, concurrent" -ForegroundColor Red
        Write-Host "Uso: .\run-dom-v2-powershell-complete.ps1 -Mode dev" -ForegroundColor Yellow
    }
}

Write-Host "`n=== COMANDOS ÚTEIS ===" -ForegroundColor Green
Write-Host "Health Check: .\run-dom-v2-powershell-complete.ps1 -Health" -ForegroundColor Cyan
Write-Host "Instalar: .\run-dom-v2-powershell-complete.ps1 -Install" -ForegroundColor Cyan
Write-Host "Build: .\run-dom-v2-powershell-complete.ps1 -Build" -ForegroundColor Cyan
Write-Host "Testes: .\run-dom-v2-powershell-complete.ps1 -Test" -ForegroundColor Cyan
Write-Host "Web: .\run-dom-v2-powershell-complete.ps1 -Mode web" -ForegroundColor Cyan
Write-Host "Concurrent: .\run-dom-v2-powershell-complete.ps1 -Mode concurrent" -ForegroundColor Cyan

Write-Host "`nPressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 