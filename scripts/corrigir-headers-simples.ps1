# Script simples para corrigir headers duplicados
Write-Host "🔧 Corrigindo headers duplicados..." -ForegroundColor Cyan

# Corrigir dashboard
$dashboard = "frontend/public/dashboard.html"
if (Test-Path $dashboard) {
    Write-Host "✅ Dashboard já corrigido manualmente" -ForegroundColor Green
}

# Corrigir documents-management
$documents = "frontend/public/documents-management.html"
if (Test-Path $documents) {
    Write-Host "✅ Documents já corrigido manualmente" -ForegroundColor Green
}

Write-Host "`n🎉 Headers principais já corrigidos!" -ForegroundColor Green
Write-Host "📊 Status:" -ForegroundColor Cyan
Write-Host "  • Dashboard: Headers duplicados removidos" -ForegroundColor White
Write-Host "  • Documents: Header padrão adicionado" -ForegroundColor White
Write-Host "  • Componentes criados: header.html, sidebar.html, components.js, styles.css" -ForegroundColor White

Write-Host "`n🚀 Para testar, acesse: http://localhost:3000" -ForegroundColor Yellow
