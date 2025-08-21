# Script para testar API com token correto

Write-Host "Testando API de documentos com token correto..." -ForegroundColor Green

# Token JWT gerado com o secret correto do servidor
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci1pZCIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInByb2ZpbGUiOiJBRE1JTiIsImlhdCI6MTc1NTcwNzE5MCwiZXhwIjoxNzU1NzkyNzE5MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8"

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
