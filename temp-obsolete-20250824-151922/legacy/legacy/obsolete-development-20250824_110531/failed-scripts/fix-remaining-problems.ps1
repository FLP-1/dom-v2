# Script para corrigir problemas restantes nos arquivos HTML
Write-Host "=== CORRECAO RAPIDA DOS PROBLEMAS RESTANTES ===" -ForegroundColor Yellow

# Lista de arquivos com problemas identificados
$problemFiles = @(
    "frontend\public\advanced-timecard.html",
    "frontend\public\app.html", 
    "frontend\public\employees-management.html",
    "frontend\public\esocial-validation.html",
    "frontend\public\external-integrations.html",
    "frontend\public\payments-management.html",
    "frontend\public\start.html",
    "frontend\public\terms.html",
    "frontend\public\test-messages.html",
    "frontend\public\timeclock.html"
)

Write-Host "Arquivos com problemas: $($problemFiles.Count)" -ForegroundColor Green

# Criar backup
$backupDir = "C:\dom-v2\backups\html-quick-fix-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "Backup criado em: $backupDir" -ForegroundColor Cyan

# Fazer backup dos arquivos problemáticos
foreach ($file in $problemFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
        Copy-Item $file $backupPath
        Write-Host "Backup: $file" -ForegroundColor Gray
    }
}

Write-Host "Backup concluido!" -ForegroundColor Green

# Corrigir arquivos
Write-Host "Corrigindo problemas rapidamente..." -ForegroundColor Cyan

$successCount = 0
$errorCount = 0
$fixedCount = 0

foreach ($file in $problemFiles) {
    if (Test-Path $file) {
        try {
            # Ler conteudo original
            $content = Get-Content $file -Raw -Encoding UTF8
            
            # Aplicar correcoes rapidas
            $content = $content -replace "font-family: '',", "font-family: 'Segoe UI',"
            $content = $content -replace "console\.log\(''\);", "console.log('Pagina carregada com sucesso!');"
            $content = $content -replace "const alertDiv = document\.createElement\(''\);", "const alertDiv = document.createElement('div');"
            $content = $content -replace "showAlert\('', ''\);", "showAlert('Erro na comunicacao com o servidor', 'error');"
            $content = $content -replace "console\.error\('', error\);", "console.error('API Error:', error);"
            $content = $content -replace "'': '',", "'Content-Type': 'application/json',"
            $content = $content -replace "}\s*\.\.\.options", "},\n                    ...options"
            
            # Corrigir onclick vazios
            $content = $content -replace 'onclick="navigateTo\(''\)"', 'onclick="navigateTo(''dashboard.html'')"'
            
            # Salvar arquivo corrigido
            $content | Set-Content $file -Encoding UTF8
            Write-Host "Corrigido: $file" -ForegroundColor Green
            $fixedCount++
            $successCount++
        } catch {
            Write-Host "Erro: $file" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "Nao encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host "=== CORRECAO RAPIDA CONCLUIDA ===" -ForegroundColor Yellow
Write-Host "Arquivos processados: $successCount" -ForegroundColor Green
Write-Host "Arquivos corrigidos: $fixedCount" -ForegroundColor Cyan
Write-Host "Erros: $errorCount" -ForegroundColor Red
Write-Host "Backup: $backupDir" -ForegroundColor Cyan
Write-Host "Problemas rapidos corrigidos!" -ForegroundColor Green
