# Script para restaurar funcionalidades restantes
Write-Host "=== RESTAURANDO FUNCIONALIDADES RESTANTES ===" -ForegroundColor Yellow

Set-Location "C:\dom-v2\frontend\public"

# Grupo 1: Gestão e RH
Write-Host ""
Write-Host "👥 GESTÃO E RH:" -ForegroundColor Blue
$hr_files = @(
    "hr-management.html.backup",
    "recruitment-management.html.backup",
    "quality-management.html.backup",
    "task-management.html.backup",
    "tasks-management.html.backup"
)

foreach ($file in $hr_files) {
    $original = $file -replace '\.backup$', ''
    if (Test-Path $file) {
        Copy-Item $file $original -Force
        Write-Host "✅ $original" -ForegroundColor Green
    }
}

# Grupo 2: Integrações
Write-Host ""
Write-Host "🔗 INTEGRAÇÕES:" -ForegroundColor Blue
$integration_files = @(
    "payment-integrations.html.backup",
    "external-integrations.html.backup",
    "integration-management.html.backup"
)

foreach ($file in $integration_files) {
    $original = $file -replace '\.backup$', ''
    if (Test-Path $file) {
        Copy-Item $file $original -Force
        Write-Host "✅ $original" -ForegroundColor Green
    }
}

# Grupo 3: Comunicação
Write-Host ""
Write-Host "📢 COMUNICAÇÃO:" -ForegroundColor Blue
$comm_files = @(
    "communication.html.backup",
    "communication-management.html.backup",
    "notifications.html.backup",
    "notifications-management.html.backup"
)

foreach ($file in $comm_files) {
    $original = $file -replace '\.backup$', ''
    if (Test-Path $file) {
        Copy-Item $file $original -Force
        Write-Host "✅ $original" -ForegroundColor Green
    }
}

# Grupo 4: Documentos e Compras
Write-Host ""
Write-Host "📋 DOCUMENTOS E COMPRAS:" -ForegroundColor Blue
$docs_files = @(
    "documents-management.html.backup",
    "purchases-management.html.backup",
    "approvals-management.html.backup"
)

foreach ($file in $docs_files) {
    $original = $file -replace '\.backup$', ''
    if (Test-Path $file) {
        Copy-Item $file $original -Force
        Write-Host "✅ $original" -ForegroundColor Green
    }
}

# Grupo 5: Relatórios Avançados
Write-Host ""
Write-Host "📊 RELATÓRIOS AVANÇADOS:" -ForegroundColor Blue
$report_files = @(
    "reports-management.html.backup",
    "reports-advanced-management.html.backup",
    "screen-evaluation.html.backup",
    "screen-preview.html.backup"
)

foreach ($file in $report_files) {
    $original = $file -replace '\.backup$', ''
    if (Test-Path $file) {
        Copy-Item $file $original -Force
        Write-Host "✅ $original" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🎉 TODAS AS FUNCIONALIDADES RESTANTES FORAM RESTAURADAS!" -ForegroundColor Green

