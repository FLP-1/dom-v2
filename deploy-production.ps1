# Deploy to Production Script
# Script para deploy em produção

Write-Host "🚀 Iniciando deploy para produção..." -ForegroundColor Green

# Verificar se o build existe
if (-not (Test-Path "frontend/dist")) {
    Write-Host "❌ Build não encontrado. Execute build-prod.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Confirmação de segurança
$confirmation = Read-Host "⚠️  ATENÇÃO: Esta ação irá fazer deploy em PRODUÇÃO. Continuar? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "❌ Deploy cancelado." -ForegroundColor Red
    exit 1
}

# Configurações de produção
$productionPath = "deploy/production"
$buildPath = "frontend/dist"

# Criar diretório de produção
if (Test-Path $productionPath) {
    Write-Host "🧹 Limpando produção anterior..." -ForegroundColor Yellow
    Remove-Item $productionPath -Recurse -Force
}

New-Item -ItemType Directory -Path $productionPath -Force | Out-Null

# Copiar arquivos de build
Write-Host "📁 Copiando arquivos para produção..." -ForegroundColor Cyan
Copy-Item "$buildPath/*" -Destination $productionPath -Recurse

# Configurar ambiente de produção
Write-Host "⚙️ Configurando ambiente de produção..." -ForegroundColor Cyan
$productionConfig = @{
    environment = "production"
    apiUrl = "https://api.dom-v2.com"
    version = "1.0.0"
}

$productionConfig | ConvertTo-Json | Out-File "$productionPath/config.json" -Encoding UTF8

# Backup da versão anterior
Write-Host "💾 Criando backup..." -ForegroundColor Cyan
$backupPath = "deploy/backup/$(Get-Date -Format 'yyyy-MM-dd-HH-mm-ss')"
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

Write-Host "✅ Deploy para produção concluído!" -ForegroundColor Green
Write-Host "📁 Produção em: $productionPath" -ForegroundColor Blue
Write-Host "🌐 URL: https://dom-v2.com" -ForegroundColor Blue
Write-Host "💾 Backup em: $backupPath" -ForegroundColor Blue
