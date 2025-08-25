# API Health Check Script
# Script para verificar saúde da API

Write-Host "🏥 Verificando saúde da API..." -ForegroundColor Green

$apiUrl = "http://localhost:3001"
$endpoints = @(
    "/api/health",
    "/api/auth",
    "/api/users",
    "/api/budgets",
    "/api/payroll"
)

foreach ($endpoint in $endpoints) {
    $url = "$apiUrl$endpoint"
    Write-Host "🔍 Testando: $url" -ForegroundColor Cyan
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 10
        $status = $response.StatusCode
        
        if ($status -eq 200) {
            Write-Host "✅ $endpoint - OK ($status)" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $endpoint - Status: $status" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ $endpoint - Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "🏁 Verificação de saúde concluída!" -ForegroundColor Green
