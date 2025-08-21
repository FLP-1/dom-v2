# Script PowerShell completo para testar a API de documentos DOM v2

Write-Host "Testando API de documentos DOM v2" -ForegroundColor Green

# Token JWT válido
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci1pZCIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInByb2ZpbGUiOiJBRE1JTiIsImlhdCI6MTc1NTcwNjIyMiwiZXhwIjoxNzU1NzkyNjIyfQ.0DYK9XLe5yOaWn1nd-loRaFiNw7xW_idIDUCW2aIoWo"

$headers = @{
    "Authorization" = "Bearer $token"
}

# Teste 1: Health check
Write-Host "`nTeste 1: Health check" -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get
    Write-Host "Health check: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "Erro no health check: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 2: Verificar se a rota de documentos existe
Write-Host "`nTeste 2: Verificar rota de documentos" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/documents" -Method Get -Headers $headers
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Conteudo: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Erro ao acessar documentos: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 3: Listar categorias
Write-Host "`nTeste 3: Listar categorias" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/documents/categories/list" -Method Get -Headers $headers
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Conteudo: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Erro ao listar categorias: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 4: Estatísticas
Write-Host "`nTeste 4: Estatísticas" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/documents/stats" -Method Get -Headers $headers
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Conteudo: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Erro ao obter estatísticas: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTestes concluidos!" -ForegroundColor Green
