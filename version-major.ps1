# Version Major Script
# Incrementa versão principal (1.0.0 -> 2.0.0)

Write-Host "🔄 Incrementando versão principal..." -ForegroundColor Yellow

Set-Location "frontend/src/micro-frontends/shared"

# Verificar se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Há mudanças não commitadas. Commit as mudanças primeiro." -ForegroundColor Red
    exit 1
}

# Confirmar ação
$confirmation = Read-Host "⚠️  ATENÇÃO: Esta ação irá quebrar compatibilidade. Continuar? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "❌ Operação cancelada." -ForegroundColor Red
    exit 1
}

# Incrementar versão
npm version major

Write-Host "✅ Versão principal incrementada!" -ForegroundColor Green
Write-Host "📝 Não esqueça de atualizar o CHANGELOG.md" -ForegroundColor Blue

Set-Location ../../..
