# Script Limpo - DOM v2 com Webpack Dev Server
Write-Host "Iniciando DOM v2 - Solucao Limpa..." -ForegroundColor Green

# 1. Parar todos os processos Node.js
Write-Host "1. Parando processos existentes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

# 2. Verificar se as portas estao livres
Write-Host "2. Verificando portas..." -ForegroundColor Yellow
$port3000 = netstat -ano | findstr ":3000"
$port3001 = netstat -ano | findstr ":3001"

if ($port3000) {
    Write-Host "   Porta 3000 ainda em uso, aguardando..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

if ($port3001) {
    Write-Host "   Porta 3001 ainda em uso, aguardando..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

# 3. Iniciar Backend
Write-Host "3. Iniciando Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\backend'; `$env:DATABASE_URL = 'postgresql://postgres:FLP*2025@localhost:5432/db_dom'; npx ts-node src/server-dev.ts" -WindowStyle Normal

# 4. Aguardar backend inicializar
Write-Host "4. Aguardando backend inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# 5. Verificar backend
Write-Host "5. Verificando backend..." -ForegroundColor Yellow
try {
    $backendHealth = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 10
    Write-Host "   Backend funcionando: $($backendHealth.message)" -ForegroundColor Green
} catch {
    Write-Host "   Backend nao responde" -ForegroundColor Red
    Write-Host "   Aguardando mais 10 segundos..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

# 6. Iniciar Frontend (Webpack Dev Server)
Write-Host "6. Iniciando Frontend (Webpack Dev Server)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npm run dev" -WindowStyle Normal

# 7. Aguardar webpack inicializar
Write-Host "7. Aguardando Webpack inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# 8. Verificar frontend
Write-Host "8. Verificando frontend..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 10
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "   Frontend funcionando (status: $($frontendResponse.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "   Frontend respondeu com status: $($frontendResponse.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   Frontend nao responde" -ForegroundColor Red
    Write-Host "   Aguardando mais 10 segundos..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

# 9. Status final
Write-Host ""
Write-Host "INICIALIZACAO COMPLETA!" -ForegroundColor Green
Write-Host ""
Write-Host "Status dos Servicos:" -ForegroundColor Cyan
Write-Host "   Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Solucao Limpa Implementada:" -ForegroundColor Green
Write-Host "   - Webpack Dev Server na porta 3000" -ForegroundColor White
Write-Host "   - Proxy automatico para API (/api -> 3001)" -ForegroundColor White
Write-Host "   - Sem servidor web adicional" -ForegroundColor White
Write-Host "   - Sem referencias a porta 8080" -ForegroundColor White
Write-Host ""
Write-Host "Login de Teste:" -ForegroundColor Cyan
Write-Host "   CPF: 12345678901" -ForegroundColor White
Write-Host "   Senha: 123456" -ForegroundColor White
Write-Host ""
Write-Host "Se houver problemas:" -ForegroundColor Yellow
Write-Host "   1. Aguarde alguns segundos para o Webpack carregar" -ForegroundColor White
Write-Host "   2. Recarregue a pagina (F5)" -ForegroundColor White
Write-Host "   3. Verifique os terminais para logs" -ForegroundColor White
Write-Host ""
Write-Host "Aplicacao React Native Web funcionando!" -ForegroundColor Green 