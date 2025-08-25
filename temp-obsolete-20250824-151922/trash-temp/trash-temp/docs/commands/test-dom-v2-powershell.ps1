# Script de Teste DOM v2 - PowerShell Atualizado
# Data: 25/07/2025
# Regra: Comandos PowerShell com diretórios específicos

param(
    [string]$Type = "all",
    [switch]$Verbose,
    [switch]$Coverage,
    [switch]$Watch
)

Write-Host "=== TESTE DOM v2 - POWERSHELL ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow
Write-Host "Diretório Atual: $(Get-Location)" -ForegroundColor Cyan
Write-Host "Tipo de Teste: $Type" -ForegroundColor Cyan

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2 (C:\dom-v2)" -ForegroundColor Red
    Write-Host "Comando correto: Set-Location C:\dom-v2; .\docs\commands\test-dom-v2-powershell.ps1" -ForegroundColor Yellow
    exit 1
}

# Função para executar testes com verificação
function Invoke-TestWithCheck {
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
            Write-Host "❌ $Description falhou!" -ForegroundColor Red
            return $false
        }
        Write-Host "✅ $Description passou!" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ $Description falhou com exceção!" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        return $false
    }
    finally {
        if ($Directory -ne ".") {
            Pop-Location
        }
    }
}

# Função para verificar se os serviços estão rodando
function Test-ServicesHealth {
    Write-Host "`n=== VERIFICANDO SAÚDE DOS SERVIÇOS ===" -ForegroundColor Green
    
    # Testar backend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 5
        Write-Host "✅ Backend: $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Backend: Indisponível (porta 3001)" -ForegroundColor Red
    }
    
    # Testar frontend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8081" -Method GET -TimeoutSec 5
        Write-Host "✅ Frontend: $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Frontend: Indisponível (porta 8081)" -ForegroundColor Red
    }
    
    # Testar frontend web
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
        Write-Host "✅ Frontend Web: $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Frontend Web: Indisponível (porta 3000)" -ForegroundColor Red
    }
}

# Executar testes baseado no tipo
switch ($Type.ToLower()) {
    "all" {
        Write-Host "`n=== EXECUTANDO TODOS OS TESTES ===" -ForegroundColor Green
        
        # Testes backend
        $backendCommand = if ($Coverage) { "npm run test:coverage" } elseif ($Watch) { "npm run test:watch" } else { "npm test" }
        $backendSuccess = Invoke-TestWithCheck -Command $backendCommand -Description "Testes Backend" -Directory "backend"
        
        # Testes frontend
        $frontendCommand = if ($Coverage) { "npm run test:coverage" } elseif ($Watch) { "npm run test:watch" } else { "npm test" }
        $frontendSuccess = Invoke-TestWithCheck -Command $frontendCommand -Description "Testes Frontend" -Directory "frontend"
        
        # Testes de integração (se existirem)
        if (Test-Path "backend\src\__tests__\integration") {
            $integrationSuccess = Invoke-TestWithCheck -Command "npm run test:integration" -Description "Testes de Integração" -Directory "backend"
        }
        
        # Verificar saúde dos serviços
        Test-ServicesHealth
        
        # Resumo
        Write-Host "`n=== RESUMO DOS TESTES ===" -ForegroundColor Green
        Write-Host "Backend: $(if ($backendSuccess) { '✅ PASSOU' } else { '❌ FALHOU' })" -ForegroundColor $(if ($backendSuccess) { 'Green' } else { 'Red' })
        Write-Host "Frontend: $(if ($frontendSuccess) { '✅ PASSOU' } else { '❌ FALHOU' })" -ForegroundColor $(if ($frontendSuccess) { 'Green' } else { 'Red' })
    }
    
    "backend" {
        Write-Host "`n=== TESTES BACKEND ===" -ForegroundColor Green
        
        $command = if ($Coverage) { "npm run test:coverage" } elseif ($Watch) { "npm run test:watch" } else { "npm test" }
        $success = Invoke-TestWithCheck -Command $command -Description "Testes Backend" -Directory "backend"
        
        if ($success) {
            Write-Host "`n✅ Todos os testes backend passaram!" -ForegroundColor Green
        } else {
            Write-Host "`n❌ Alguns testes backend falharam!" -ForegroundColor Red
        }
    }
    
    "frontend" {
        Write-Host "`n=== TESTES FRONTEND ===" -ForegroundColor Green
        
        $command = if ($Coverage) { "npm run test:coverage" } elseif ($Watch) { "npm run test:watch" } else { "npm test" }
        $success = Invoke-TestWithCheck -Command $command -Description "Testes Frontend" -Directory "frontend"
        
        if ($success) {
            Write-Host "`n✅ Todos os testes frontend passaram!" -ForegroundColor Green
        } else {
            Write-Host "`n❌ Alguns testes frontend falharam!" -ForegroundColor Red
        }
    }
    
    "integration" {
        Write-Host "`n=== TESTES DE INTEGRAÇÃO ===" -ForegroundColor Green
        
        if (Test-Path "backend\src\__tests__\integration") {
            $command = if ($Coverage) { "npm run test:integration:coverage" } else { "npm run test:integration" }
            $success = Invoke-TestWithCheck -Command $command -Description "Testes de Integração" -Directory "backend"
            
            if ($success) {
                Write-Host "`n✅ Todos os testes de integração passaram!" -ForegroundColor Green
            } else {
                Write-Host "`n❌ Alguns testes de integração falharam!" -ForegroundColor Red
            }
        } else {
            Write-Host "⚠️ Testes de integração não encontrados" -ForegroundColor Yellow
        }
    }
    
    "health" {
        Test-ServicesHealth
    }
    
    "api" {
        Write-Host "`n=== TESTES DE API ===" -ForegroundColor Green
        
        # Verificar se o backend está rodando
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 5
            Write-Host "✅ Backend está rodando" -ForegroundColor Green
            
            # Testar endpoints principais
            $endpoints = @(
                "http://localhost:3001/api/budgets",
                "http://localhost:3001/api/dashboard",
                "http://localhost:3001/api/employees"
            )
            
            foreach ($endpoint in $endpoints) {
                try {
                    $response = Invoke-WebRequest -Uri $endpoint -Method GET -TimeoutSec 5
                    Write-Host "✅ $endpoint : $($response.StatusCode)" -ForegroundColor Green
                }
                catch {
                    Write-Host "❌ $endpoint : Indisponível" -ForegroundColor Red
                }
            }
        }
        catch {
            Write-Host "❌ Backend não está rodando. Inicie primeiro: Set-Location backend; npm run dev" -ForegroundColor Red
        }
    }
    
    default {
        Write-Host "Tipo de teste '$Type' não reconhecido!" -ForegroundColor Red
        Write-Host "Tipos disponíveis: all, backend, frontend, integration, health, api" -ForegroundColor Yellow
        Write-Host "Uso: .\test-dom-v2-powershell.ps1 -Type backend" -ForegroundColor Yellow
    }
}

Write-Host "`n=== COMANDOS ÚTEIS ===" -ForegroundColor Green
Write-Host "Todos os testes: .\test-dom-v2-powershell.ps1 -Type all" -ForegroundColor Cyan
Write-Host "Backend: .\test-dom-v2-powershell.ps1 -Type backend" -ForegroundColor Cyan
Write-Host "Frontend: .\test-dom-v2-powershell.ps1 -Type frontend" -ForegroundColor Cyan
Write-Host "Integração: .\test-dom-v2-powershell.ps1 -Type integration" -ForegroundColor Cyan
Write-Host "Health: .\test-dom-v2-powershell.ps1 -Type health" -ForegroundColor Cyan
Write-Host "API: .\test-dom-v2-powershell.ps1 -Type api" -ForegroundColor Cyan
Write-Host "Com cobertura: .\test-dom-v2-powershell.ps1 -Type all -Coverage" -ForegroundColor Cyan
Write-Host "Modo watch: .\test-dom-v2-powershell.ps1 -Type backend -Watch" -ForegroundColor Cyan

Write-Host "`nPressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 