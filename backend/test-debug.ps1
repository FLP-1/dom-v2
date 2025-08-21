# Script para testar API com debug

Write-Host "Testando API de documentos com debug..." -ForegroundColor Green

$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci1pZCIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInByb2ZpbGUiOiJBRE1JTiIsImlhdCI6MTc1NTcwNjIyMiwiZXhwIjoxNzU1NzkyNjIyfQ.0DYK9XLe5yOaWn1nd-loRaFiNw7xW_idIDUCW2aIoWo"

$headers = @{
    "Authorization" = "Bearer $token"
}

Write-Host "Fazendo requisição para categorias..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/documents/categories/list" -Method Get -Headers $headers
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Conteudo: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}
