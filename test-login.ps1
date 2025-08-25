# Teste de Login - DOM v2
Write-Host "🧪 Testando endpoint de login..." -ForegroundColor Yellow

# Testar se o backend está rodando
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method POST -ContentType "application/json" -Body '{"cpf":"11144477735","password":"admin123"}' -ErrorAction Stop
    Write-Host "✅ Login bem-sucedido!" -ForegroundColor Green
    if ($response.token) {
        Write-Host "Token: Presente" -ForegroundColor Cyan
    }
    else {
        Write-Host "Token: Ausente" -ForegroundColor Red
    }
    if ($response.user) {
        Write-Host "User: Presente" -ForegroundColor Cyan
    }
    else {
        Write-Host "User: Ausente" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Erro no login: $($_.Exception.Message)" -ForegroundColor Red
    
    # Verificar se o servidor está rodando
    try {
        $healthCheck = Invoke-WebRequest -Uri "http://localhost:3001/health" -Method GET -ErrorAction Stop
        Write-Host "✅ Servidor está rodando" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Servidor não está rodando na porta 3001" -ForegroundColor Red
    }
}
