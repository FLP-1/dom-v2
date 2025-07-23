# Script de Teste Metro Bundler Apenas
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== TESTE METRO BUNDLER APENAS ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

Write-Host "`n1. Verificando dependências..." -ForegroundColor Cyan
Set-Location frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host "`n2. Verificando arquivos críticos..." -ForegroundColor Cyan
$criticalFiles = @("index.web.js", "App.tsx", "app.json", "metro.config.js")
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file encontrado" -ForegroundColor Green
    } else {
        Write-Host "❌ $file NÃO encontrado" -ForegroundColor Red
    }
}

Write-Host "`n3. Iniciando Metro Bundler..." -ForegroundColor Cyan
Write-Host "Aguardando Metro inicializar..." -ForegroundColor Yellow
Write-Host "Teste: http://localhost:8081/index.bundle?platform=web&dev=true" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para parar" -ForegroundColor Gray

# Usar npx para garantir que usa a versão correta
npx react-native start 