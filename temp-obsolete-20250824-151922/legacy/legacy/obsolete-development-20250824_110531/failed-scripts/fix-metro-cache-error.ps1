# Script para corrigir erro de cache do Metro Bundler
Write-Host "🔧 Corrigindo erro de cache do Metro Bundler..." -ForegroundColor Green

# 1. Parar todos os processos Node.js
Write-Host "1. Parando todos os processos Node.js..." -ForegroundColor Yellow
try {
    Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*ts-node*"} | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "   Todos os processos Node.js finalizados" -ForegroundColor Red
} catch {
    Write-Host "   Nenhum processo Node.js encontrado" -ForegroundColor Gray
}

Start-Sleep -Seconds 5

# 2. Limpar cache do Metro completamente
Write-Host "2. Limpando cache do Metro..." -ForegroundColor Yellow
cd frontend

# Remover cache do Metro
if (Test-Path "node_modules\.cache") {
    Remove-Item "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   Cache do Metro removido" -ForegroundColor Green
}

# Remover cache do metro-cache
if (Test-Path "node_modules\metro-cache") {
    Remove-Item "node_modules\metro-cache" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   metro-cache removido" -ForegroundColor Green
}

# Remover outros caches
if (Test-Path ".metro-cache") {
    Remove-Item ".metro-cache" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   .metro-cache removido" -ForegroundColor Green
}

# 3. Reinstalar metro-cache
Write-Host "3. Reinstalando metro-cache..." -ForegroundColor Yellow
npm install metro-cache --save-dev --legacy-peer-deps
Write-Host "   metro-cache reinstalado" -ForegroundColor Green

# 4. Iniciar Metro Bundler com reset completo
Write-Host "4. Iniciando Metro Bundler com reset completo..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npx react-native start --port 8081 --reset-cache --reset-metro-cache" -WindowStyle Normal

Start-Sleep -Seconds 20

# 5. Verificar Metro
Write-Host "5. Verificando Metro Bundler..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/status" -Method GET -TimeoutSec 15
    Write-Host "   ✅ Metro Bundler funcionando: $response" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Metro Bundler não respondeu ainda" -ForegroundColor Red
    Write-Host "   Aguarde mais alguns segundos..." -ForegroundColor Yellow
}

# 6. Testar bundle após mais tempo
Start-Sleep -Seconds 10
Write-Host "6. Testando bundle..." -ForegroundColor Yellow
try {
    $bundleResponse = Invoke-WebRequest -Uri "http://localhost:8081/index.bundle?platform=web&dev=true" -Method GET -TimeoutSec 15
    Write-Host "   ✅ Bundle sendo servido (tamanho: $($bundleResponse.Content.Length) bytes)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Bundle ainda não está sendo servido" -ForegroundColor Red
    Write-Host "   Aguarde mais tempo para o Metro compilar..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Correção do cache do Metro concluída!" -ForegroundColor Green
Write-Host "Metro Bundler: http://localhost:8081" -ForegroundColor Cyan
Write-Host "Bundle: http://localhost:8081/index.bundle?platform=web&dev=true" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Agora acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host "O erro 'store.get is not a function' deve estar resolvido!" -ForegroundColor Green 