# Script de Instalação DOM v2
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== INSTALACAO DOM v2 ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

Write-Host "`n1. Instalando dependências do Backend..." -ForegroundColor Cyan
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha na instalação do backend" -ForegroundColor Red
    exit 1
}

Write-Host "`n2. Compilando Backend..." -ForegroundColor Cyan
npx tsc
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha na compilação do backend" -ForegroundColor Red
    exit 1
}

Write-Host "`n3. Instalando dependências do Frontend..." -ForegroundColor Cyan
Set-Location ../frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha na instalação do frontend" -ForegroundColor Red
    exit 1
}

Write-Host "`n4. Verificando TypeScript do Frontend..." -ForegroundColor Cyan
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha na verificação do frontend" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "`n=== INSTALACAO CONCLUIDA ===" -ForegroundColor Green
Write-Host "Backend: npm start (pasta backend)" -ForegroundColor Yellow
Write-Host "Frontend: npm start (pasta frontend)" -ForegroundColor Yellow
Write-Host "APIs: http://localhost:3001" -ForegroundColor Yellow 