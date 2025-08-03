# DOM-V2 Web Deployment Script
# PowerShell script para deploy da versão web

Write-Host "🚀 Iniciando deploy da versão web..." -ForegroundColor Green

# Verificar se o build existe
if (-not (Test-Path "frontend/dist")) {
    Write-Host "❌ Build não encontrado. Execute build-prod.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Configurações de deploy
$deployPath = "deploy/web"
$buildPath = "frontend/dist"

# Criar diretório de deploy
if (Test-Path $deployPath) {
    Write-Host "🧹 Limpando deploy anterior..." -ForegroundColor Yellow
    Remove-Item $deployPath -Recurse -Force
}

New-Item -ItemType Directory -Path $deployPath -Force | Out-Null

# Copiar arquivos de build
Write-Host "📁 Copiando arquivos de build..." -ForegroundColor Cyan
Copy-Item "$buildPath/*" -Destination $deployPath -Recurse

# Copiar configurações de servidor
Write-Host "⚙️ Copiando configurações..." -ForegroundColor Cyan
Copy-Item "frontend/scripts/serve-prod.js" -Destination $deployPath

# Criar package.json para deploy
$deployPackage = @{
    name = "dom-v2-web-deploy"
    version = "1.0.0"
    scripts = @{
        start = "node serve-prod.js"
    }
    dependencies = @{
        express = "^4.18.2"
    }
}

$deployPackage | ConvertTo-Json -Depth 10 | Out-File "$deployPath/package.json" -Encoding UTF8

Write-Host "✅ Deploy web concluído!" -ForegroundColor Green
Write-Host "📁 Deploy em: $deployPath" -ForegroundColor Blue
Write-Host "🚀 Para iniciar: cd $deployPath; npm install; npm start" -ForegroundColor Blue
