# Script PowerShell para testar a API de documentos DOM v2

Write-Host "Testando API de documentos DOM v2" -ForegroundColor Green

# Aguardar servidor iniciar
Write-Host "Aguardando servidor iniciar..." -ForegroundColor Yellow
Start-Sleep 3

# Teste 1: Health check
Write-Host "`nTeste 1: Health check" -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3002/health" -Method Get
    Write-Host "Health check: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "Erro no health check: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 2: Listar categorias
Write-Host "`nTeste 2: Listar categorias" -ForegroundColor Cyan
try {
    $headers = @{
        "Authorization" = "Bearer test-user-id"
    }
    $categories = Invoke-RestMethod -Uri "http://localhost:3002/api/documents/categories/list" -Method Get -Headers $headers
    Write-Host "Categorias encontradas: $($categories.data.Count)" -ForegroundColor Green
    foreach ($category in $categories.data) {
        Write-Host "  - $($category.icon) $($category.name)" -ForegroundColor White
    }
} catch {
    Write-Host "Erro ao listar categorias: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 3: Listar documentos
Write-Host "`nTeste 3: Listar documentos" -ForegroundColor Cyan
try {
    $documents = Invoke-RestMethod -Uri "http://localhost:3002/api/documents" -Method Get -Headers $headers
    Write-Host "Documentos encontrados: $($documents.data.Count)" -ForegroundColor Green
    Write-Host "Pagina: $($documents.pagination.page)" -ForegroundColor White
    Write-Host "Total de paginas: $($documents.pagination.pages)" -ForegroundColor White
} catch {
    Write-Host "Erro ao listar documentos: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 4: Estatisticas
Write-Host "`nTeste 4: Estatisticas" -ForegroundColor Cyan
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:3002/api/documents/stats" -Method Get -Headers $headers
    Write-Host "Estatisticas obtidas:" -ForegroundColor Green
    Write-Host "  Total de documentos: $($stats.data.totalDocuments)" -ForegroundColor White
    Write-Host "  Categorias: $($stats.data.totalCategories)" -ForegroundColor White
    Write-Host "  Espaco usado: $($stats.data.totalSizeFormatted)" -ForegroundColor White
    Write-Host "  Documentos sensiveis: $($stats.data.sensitiveDocuments)" -ForegroundColor White
} catch {
    Write-Host "Erro ao obter estatisticas: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTestes concluidos!" -ForegroundColor Green
