# Script simples para restaurar funcionalidades principais
Write-Host "=== RESTAURANDO FUNCIONALIDADES PRINCIPAIS ===" -ForegroundColor Yellow

Set-Location "C:\dom-v2\frontend\public"

# Funcionalidades essenciais
$files = @(
    "employees-management.html.backup",
    "payments-management.html.backup", 
    "esocial-validation.html.backup",
    "budget-management.html.backup",
    "users-management.html.backup",
    "reports.html.backup",
    "settings.html.backup",
    "navigation.html.backup",
    "app.html.backup"
)

$restored = 0
foreach ($file in $files) {
    $original = $file -replace '\.backup$', ''
    
    if (Test-Path $file) {
        Copy-Item $file $original -Force
        Write-Host "✅ Restaurado: $original" -ForegroundColor Green
        $restored++
    } else {
        Write-Host "❌ Não encontrado: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Restauradas $restored/$($files.Count) funcionalidades principais" -ForegroundColor Cyan
Write-Host "🌐 Teste em: http://localhost:3000" -ForegroundColor Green

