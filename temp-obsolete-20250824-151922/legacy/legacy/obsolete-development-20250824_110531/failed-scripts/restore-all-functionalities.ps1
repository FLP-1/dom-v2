# Script para restaurar todas as funcionalidades do DOM v2
# Execução no diretório: C:\dom-v2

Write-Host "=== RESTAURAÇÃO COMPLETA DAS FUNCIONALIDADES DOM V2 ===" -ForegroundColor Yellow
Write-Host ""

$backupDir = "C:\dom-v2\frontend\public"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logFile = "restore-functionalities-$timestamp.log"

# Função para restaurar arquivo
function Restore-BackupFile {
    param(
        [string]$backupFile,
        [string]$category
    )
    
    $originalFile = $backupFile -replace '\.backup$', ''
    
    try {
        if (Test-Path $backupFile) {
            Copy-Item $backupFile $originalFile -Force
            Write-Host "✅ [$category] $originalFile restaurado com sucesso" -ForegroundColor Green
            "$timestamp - SUCCESS: [$category] $originalFile restaurado" | Add-Content $logFile
            return $true
        } else {
            Write-Host "⚠️  [$category] Backup não encontrado: $backupFile" -ForegroundColor Yellow
            "$timestamp - WARNING: [$category] Backup não encontrado: $backupFile" | Add-Content $logFile
            return $false
        }
    } catch {
        Write-Host "❌ [$category] Erro ao restaurar $originalFile : $($_.Exception.Message)" -ForegroundColor Red
        "$timestamp - ERROR: [$category] $originalFile - $($_.Exception.Message)" | Add-Content $logFile
        return $false
    }
}

Set-Location $backupDir

Write-Host "📂 Diretório de trabalho: $backupDir" -ForegroundColor Cyan
Write-Host "📝 Log será salvo em: $logFile" -ForegroundColor Cyan
Write-Host ""

# 1. FUNCIONALIDADES PRINCIPAIS
Write-Host "🎯 CATEGORIA 1: FUNCIONALIDADES PRINCIPAIS" -ForegroundColor Blue
$coreFiles = @(
    "employees-management.html.backup",
    "payments-management.html.backup",
    "esocial-validation.html.backup",
    "budget-management.html.backup",
    "timeclock.html.backup",
    "advanced-timecard.html.backup"
)

$coreSuccess = 0
foreach ($file in $coreFiles) {
    if (Restore-BackupFile $file "CORE") { $coreSuccess++ }
}

# 2. GESTÃO E ADMINISTRAÇÃO
Write-Host ""
Write-Host "👥 CATEGORIA 2: GESTÃO E ADMINISTRAÇÃO" -ForegroundColor Blue
$managementFiles = @(
    "users-management.html.backup",
    "task-management.html.backup",
    "tasks-management.html.backup",
    "hr-management.html.backup",
    "quality-management.html.backup",
    "recruitment-management.html.backup",
    "purchases-management.html.backup"
)

$managementSuccess = 0
foreach ($file in $managementFiles) {
    if (Restore-BackupFile $file "MANAGEMENT") { $managementSuccess++ }
}

# 3. RELATÓRIOS E ANÁLISES
Write-Host ""
Write-Host "📊 CATEGORIA 3: RELATÓRIOS E ANÁLISES" -ForegroundColor Blue
$reportFiles = @(
    "reports.html.backup",
    "reports-management.html.backup",
    "reports-advanced-management.html.backup",
    "screen-evaluation.html.backup",
    "screen-preview.html.backup"
)

$reportSuccess = 0
foreach ($file in $reportFiles) {
    if (Restore-BackupFile $file "REPORTS") { $reportSuccess++ }
}

# 4. INTEGRAÇÕES E PAGAMENTOS
Write-Host ""
Write-Host "🔗 CATEGORIA 4: INTEGRAÇÕES E PAGAMENTOS" -ForegroundColor Blue
$integrationFiles = @(
    "payment-integrations.html.backup",
    "external-integrations.html.backup",
    "integration-management.html.backup"
)

$integrationSuccess = 0
foreach ($file in $integrationFiles) {
    if (Restore-BackupFile $file "INTEGRATION") { $integrationSuccess++ }
}

# 5. COMUNICAÇÃO E NOTIFICAÇÕES
Write-Host ""
Write-Host "📢 CATEGORIA 5: COMUNICAÇÃO E NOTIFICAÇÕES" -ForegroundColor Blue
$communicationFiles = @(
    "communication.html.backup",
    "communication-management.html.backup",
    "notifications.html.backup",
    "notifications-management.html.backup",
    "test-messages.html.backup"
)

$communicationSuccess = 0
foreach ($file in $communicationFiles) {
    if (Restore-BackupFile $file "COMMUNICATION") { $communicationSuccess++ }
}

# 6. CONFIGURAÇÕES E PERFIL
Write-Host ""
Write-Host "⚙️ CATEGORIA 6: CONFIGURAÇÕES E PERFIL" -ForegroundColor Blue
$settingsFiles = @(
    "settings.html.backup",
    "profile.html.backup",
    "profile-selector.html.backup",
    "profile-selector-modal.html.backup",
    "plans.html.backup"
)

$settingsSuccess = 0
foreach ($file in $settingsFiles) {
    if (Restore-BackupFile $file "SETTINGS") { $settingsSuccess++ }
}

# 7. DOCUMENTOS E APROVAÇÕES
Write-Host ""
Write-Host "📋 CATEGORIA 7: DOCUMENTOS E APROVAÇÕES" -ForegroundColor Blue
$documentsFiles = @(
    "documents-management.html.backup",
    "approvals-management.html.backup",
    "privacy.html.backup",
    "privacy-policy.html.backup",
    "terms.html.backup",
    "terms-of-use.html.backup"
)

$documentsSuccess = 0
foreach ($file in $documentsFiles) {
    if (Restore-BackupFile $file "DOCUMENTS") { $documentsSuccess++ }
}

# 8. NAVEGAÇÃO E SISTEMA
Write-Host ""
Write-Host "🧭 CATEGORIA 8: NAVEGAÇÃO E SISTEMA" -ForegroundColor Blue
$systemFiles = @(
    "navigation.html.backup",
    "main.html.backup",
    "start.html.backup",
    "app.html.backup"
)

$systemSuccess = 0
foreach ($file in $systemFiles) {
    if (Restore-BackupFile $file "SYSTEM") { $systemSuccess++ }
}

# 9. SHOWCASE E DEMONSTRAÇÃO
Write-Host ""
Write-Host "🎨 CATEGORIA 9: SHOWCASE E DEMONSTRAÇÃO" -ForegroundColor Blue
$showcaseFiles = @(
    "showcase-funcional.html.backup",
    "showcase-telas.html.backup",
    "simple-app.html.backup",
    "simple-web.html.backup"
)

$showcaseSuccess = 0
foreach ($file in $showcaseFiles) {
    if (Restore-BackupFile $file "SHOWCASE") { $showcaseSuccess++ }
}

# RELATÓRIO FINAL
Write-Host ""
Write-Host "==================== RELATÓRIO FINAL ====================" -ForegroundColor Yellow
Write-Host "✅ Funcionalidades Principais: $coreSuccess/$($coreFiles.Count)" -ForegroundColor Green
Write-Host "✅ Gestão e Administração: $managementSuccess/$($managementFiles.Count)" -ForegroundColor Green
Write-Host "✅ Relatórios e Análises: $reportSuccess/$($reportFiles.Count)" -ForegroundColor Green
Write-Host "✅ Integrações e Pagamentos: $integrationSuccess/$($integrationFiles.Count)" -ForegroundColor Green
Write-Host "✅ Comunicação e Notificações: $communicationSuccess/$($communicationFiles.Count)" -ForegroundColor Green
Write-Host "✅ Configurações e Perfil: $settingsSuccess/$($settingsFiles.Count)" -ForegroundColor Green
Write-Host "✅ Documentos e Aprovações: $documentsSuccess/$($documentsFiles.Count)" -ForegroundColor Green
Write-Host "✅ Navegação e Sistema: $systemSuccess/$($systemFiles.Count)" -ForegroundColor Green
Write-Host "✅ Showcase e Demonstração: $showcaseSuccess/$($showcaseFiles.Count)" -ForegroundColor Green

$totalSuccess = $coreSuccess + $managementSuccess + $reportSuccess + $integrationSuccess + $communicationSuccess + $settingsSuccess + $documentsSuccess + $systemSuccess + $showcaseSuccess
$totalFiles = $coreFiles.Count + $managementFiles.Count + $reportFiles.Count + $integrationFiles.Count + $communicationFiles.Count + $settingsFiles.Count + $documentsFiles.Count + $systemFiles.Count + $showcaseFiles.Count

Write-Host ""
Write-Host "🎉 TOTAL RESTAURADO: $totalSuccess/$totalFiles arquivos" -ForegroundColor Cyan
Write-Host "📁 Log detalhado salvo em: $logFile" -ForegroundColor Cyan

if ($totalSuccess -eq $totalFiles) {
    Write-Host ""
    Write-Host "🚀 TODAS AS FUNCIONALIDADES FORAM RESTAURADAS COM SUCESSO!" -ForegroundColor Green
    Write-Host "🌐 Acesse http://localhost:3000 para testar o sistema completo" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️  ALGUMAS FUNCIONALIDADES NÃO FORAM RESTAURADAS" -ForegroundColor Yellow
    Write-Host "📋 Verifique o log para mais detalhes: $logFile" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================================" -ForegroundColor Yellow

