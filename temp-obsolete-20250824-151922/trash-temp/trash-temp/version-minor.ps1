# Version Minor Script
# Incrementa versão menor (1.0.0 -> 1.1.0)

Write-Host "🔄 Incrementando versão menor..." -ForegroundColor Yellow

Set-Location "frontend/src/micro-frontends/shared"

# Verificar se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Há mudanças não commitadas. Commit as mudanças primeiro." -ForegroundColor Red
    exit 1
}

# Incrementar versão
npm version minor

Write-Host "✅ Versão menor incrementada!" -ForegroundColor Green
Write-Host "📝 Não esqueça de atualizar o CHANGELOG.md" -ForegroundColor Blue

Set-Location ../../..
