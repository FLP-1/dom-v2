# Script PowerShell para testar a API de documentos DOM v2

Write-Host "🧪 Testando API de documentos DOM v2" -ForegroundColor Green

# Aguardar servidor iniciar
Write-Host "⏳ Aguardando servidor iniciar..." -ForegroundColor Yellow
Start-Sleep 3

# Teste 1: Health check
Write-Host "`n📋 Teste 1: Health check" -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3002/health" -Method Get
    Write-Host "✅ Health check: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro no health check: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 2: Listar categorias
Write-Host "`n📋 Teste 2: Listar categorias" -ForegroundColor Cyan
try {
    $headers = @{
        "Authorization" = "Bearer test-user-id"
    }
    $categories = Invoke-RestMethod -Uri "http://localhost:3002/api/documents/categories/list" -Method Get -Headers $headers
    Write-Host "✅ Categorias encontradas: $($categories.data.Count)" -ForegroundColor Green
    foreach ($category in $categories.data) {
        Write-Host "  - $($category.icon) $($category.name)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Erro ao listar categorias: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 3: Listar documentos
Write-Host "`n📋 Teste 3: Listar documentos" -ForegroundColor Cyan
try {
    $documents = Invoke-RestMethod -Uri "http://localhost:3002/api/documents" -Method Get -Headers $headers
    Write-Host "✅ Documentos encontrados: $($documents.data.Count)" -ForegroundColor Green
    Write-Host "📄 Página: $($documents.pagination.page)" -ForegroundColor White
    Write-Host "📄 Total de páginas: $($documents.pagination.pages)" -ForegroundColor White
} catch {
    Write-Host "❌ Erro ao listar documentos: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 4: Estatísticas
Write-Host "`n📋 Teste 4: Estatísticas" -ForegroundColor Cyan
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:3002/api/documents/stats" -Method Get -Headers $headers
    Write-Host "✅ Estatísticas obtidas:" -ForegroundColor Green
    Write-Host "  📄 Total de documentos: $($stats.data.totalDocuments)" -ForegroundColor White
    Write-Host "  📁 Categorias: $($stats.data.totalCategories)" -ForegroundColor White
    Write-Host "  💾 Espaço usado: $($stats.data.totalSizeFormatted)" -ForegroundColor White
    Write-Host "  🔒 Documentos sensíveis: $($stats.data.sensitiveDocuments)" -ForegroundColor White
} catch {
    Write-Host "❌ Erro ao obter estatísticas: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Testes concluídos!" -ForegroundColor Green
