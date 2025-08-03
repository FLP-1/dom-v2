# Script de Instalação DOM v2 - PowerShell Atualizado
# Data: 25/07/2025
# Regra: Comandos PowerShell com diretórios específicos

param(
    [switch]$Force,
    [switch]$SkipTests,
    [switch]$Verbose
)

Write-Host "=== INSTALACAO DOM v2 - POWERSHELL ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow
Write-Host "Diretório Atual: $(Get-Location)" -ForegroundColor Cyan

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2 (C:\dom-v2)" -ForegroundColor Red
    Write-Host "Comando correto: Set-Location C:\dom-v2; .\docs\commands\install-dom-v2.ps1" -ForegroundColor Yellow
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
    Write-Host "Comando: $Command" -ForegroundColor Gray
    
    if ($Directory -ne ".") {
        Push-Location $Directory
    }
    
    try {
        if ($Verbose) {
            Invoke-Expression $Command
        } else {
            Invoke-Expression $Command | Out-Null
        }
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "ERRO: Falha no comando: $Command" -ForegroundColor Red
            return $false
        }
        Write-Host "✅ $Description concluído com sucesso!" -ForegroundColor Green
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

# Limpeza forçada se solicitado
if ($Force) {
    Write-Host "`n=== LIMPEZA FORÇADA ===" -ForegroundColor Yellow
    
    # Limpar cache npm
    if (-not (Invoke-CommandWithCheck -Command "npm cache clean --force" -Description "Limpando cache npm")) {
        Write-Host "⚠️ Falha na limpeza do cache, mas continuando..." -ForegroundColor Yellow
    }
    
    # Remover node_modules
    $directories = @(".", "backend", "frontend")
    foreach ($dir in $directories) {
        $nodeModulesPath = Join-Path $dir "node_modules"
        if (Test-Path $nodeModulesPath) {
            Write-Host "Removendo node_modules de $dir..." -ForegroundColor Yellow
            Remove-Item -Recurse -Force $nodeModulesPath -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "`n=== INSTALANDO DEPENDÊNCIAS ===" -ForegroundColor Green

# 1. Instalar dependências raiz
if (-not (Invoke-CommandWithCheck -Command "npm install" -Description "Instalando dependências raiz" -Directory ".")) {
    exit 1
}

# 2. Instalar dependências backend
if (-not (Invoke-CommandWithCheck -Command "npm install" -Description "Instalando dependências backend" -Directory "backend")) {
    exit 1
}

# 3. Build backend
if (-not (Invoke-CommandWithCheck -Command "npm run build" -Description "Build backend" -Directory "backend")) {
    exit 1
}

# 4. Instalar dependências frontend
if (-not (Invoke-CommandWithCheck -Command "npm install" -Description "Instalando dependências frontend" -Directory "frontend")) {
    exit 1
}

# 5. Verificar TypeScript frontend
if (-not (Invoke-CommandWithCheck -Command "npx tsc --noEmit" -Description "Verificando TypeScript frontend" -Directory "frontend")) {
    Write-Host "⚠️ Falha na verificação TypeScript, mas continuando..." -ForegroundColor Yellow
}

# 6. Testes (se não pulados)
if (-not $SkipTests) {
    Write-Host "`n=== EXECUTANDO TESTES ===" -ForegroundColor Green
    
    # Testes backend
    if (-not (Invoke-CommandWithCheck -Command "npm test" -Description "Testes backend" -Directory "backend")) {
        Write-Host "⚠️ Testes backend falharam, mas continuando..." -ForegroundColor Yellow
    }
    
    # Testes frontend
    if (-not (Invoke-CommandWithCheck -Command "npm test" -Description "Testes frontend" -Directory "frontend")) {
        Write-Host "⚠️ Testes frontend falharam, mas continuando..." -ForegroundColor Yellow
    }
}

Write-Host "`n=== INSTALACAO CONCLUIDA COM SUCESSO! ===" -ForegroundColor Green
Write-Host "`n=== COMANDOS PARA EXECUÇÃO ===" -ForegroundColor Cyan
Write-Host "Execução completa: .\docs\commands\run-dom-v2-powershell-complete.ps1" -ForegroundColor Yellow
Write-Host "Backend: Set-Location backend; npm run dev" -ForegroundColor Yellow
Write-Host "Frontend: Set-Location frontend; npm run dev" -ForegroundColor Yellow
Write-Host "Health Check: http://localhost:3001/health" -ForegroundColor Yellow
Write-Host "Frontend Web: http://localhost:8081" -ForegroundColor Yellow

Write-Host "`nPressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 