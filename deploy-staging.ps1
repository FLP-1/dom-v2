# Deploy to Staging Script
# Script para deploy em ambiente de staging

Write-Host "🚀 Iniciando deploy para staging..." -ForegroundColor Green

# Verificar se o build existe
if (-not (Test-Path "frontend/dist")) {
    Write-Host "❌ Build não encontrado. Execute build-prod.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Configurações de staging
$stagingPath = "deploy/staging"
$buildPath = "frontend/dist"

# Criar diretório de staging
if (Test-Path $stagingPath) {
    Write-Host "🧹 Limpando staging anterior..." -ForegroundColor Yellow
    Remove-Item $stagingPath -Recurse -Force
}

New-Item -ItemType Directory -Path $stagingPath -Force | Out-Null

# Copiar arquivos de build
Write-Host "📁 Copiando arquivos para staging..." -ForegroundColor Cyan
Copy-Item "$buildPath/*" -Destination $stagingPath -Recurse

# Configurar ambiente de staging
Write-Host "⚙️ Configurando ambiente de staging..." -ForegroundColor Cyan
$stagingConfig = @{
    environment = "staging"
    apiUrl = "https://api-staging.dom-v2.com"
    version = "1.0.0-staging"
}

$stagingConfig | ConvertTo-Json | Out-File "$stagingPath/config.json" -Encoding UTF8

Write-Host "✅ Deploy para staging concluído!" -ForegroundColor Green
Write-Host "📁 Staging em: $stagingPath" -ForegroundColor Blue
Write-Host "🌐 URL: https://staging.dom-v2.com" -ForegroundColor Blue
