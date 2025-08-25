# Version Patch Script
# Incrementa versão de patch (1.0.0 -> 1.0.1)

Write-Host "🔄 Incrementando versão de patch..." -ForegroundColor Yellow

Set-Location "frontend/src/micro-frontends/shared"

# Verificar se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Há mudanças não commitadas. Commit as mudanças primeiro." -ForegroundColor Red
    exit 1
}

# Incrementar versão
npm version patch

Write-Host "✅ Versão de patch incrementada!" -ForegroundColor Green
Write-Host "📝 Não esqueça de atualizar o CHANGELOG.md" -ForegroundColor Blue

Set-Location ../../..
