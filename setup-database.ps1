# Script de Configuração do Banco DOM v2
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== CONFIGURACAO BANCO DOM v2 ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

Write-Host "`n1. Configurando variável de ambiente..." -ForegroundColor Cyan
$env:DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"

Write-Host "`n2. Gerando cliente Prisma..." -ForegroundColor Cyan
Set-Location backend
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha na geração do cliente Prisma" -ForegroundColor Red
    exit 1
}

Write-Host "`n3. Executando migrações..." -ForegroundColor Cyan
npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha nas migrações" -ForegroundColor Red
    exit 1
}

Write-Host "`n4. Executando seed..." -ForegroundColor Cyan
node dist/seed-integrated.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha no seed" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "`n=== BANCO CONFIGURADO ===" -ForegroundColor Green
Write-Host "Banco: db_dom" -ForegroundColor Yellow
Write-Host "URL: postgresql://postgres:FLP*2025@localhost:5432/db_dom" -ForegroundColor Yellow 