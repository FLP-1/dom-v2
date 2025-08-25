# Script para corrigir apenas problemas de sintaxe
Write-Host "=== CORRECAO APENAS DE SINTAXE ===" -ForegroundColor Yellow

# Lista de arquivos principais
$mainFiles = @(
    "frontend\public\index.html",
    "frontend\public\splash.html",
    "frontend\public\login-screen.html",
    "frontend\public\dashboard.html"
)

Write-Host "Arquivos principais: $($mainFiles.Count)" -ForegroundColor Green

# Criar backup
$backupDir = "C:\dom-v2\backups\html-syntax-only-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "Backup criado em: $backupDir" -ForegroundColor Cyan

# Fazer backup
foreach ($file in $mainFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
        Copy-Item $file $backupPath
        Write-Host "Backup: $file" -ForegroundColor Gray
    }
}

Write-Host "Backup concluido!" -ForegroundColor Green

# Funcao para corrigir apenas sintaxe
function Fix-SyntaxOnly {
    param([string]$content)
    
    # Corrigir apenas problemas de sintaxe JavaScript
    $content = $content -replace "}\s*\.\.\.options", "},\n                    ...options"
    
    # Corrigir strings vazias problemáticas
    $content = $content -replace "console\.log\(''\);", "console.log('Pagina carregada com sucesso!');"
    $content = $content -replace "const alertDiv = document\.createElement\(''\);", "const alertDiv = document.createElement('div');"
    $content = $content -replace "showAlert\('', ''\);", "showAlert('Erro na comunicacao com o servidor', 'error');"
    $content = $content -replace "console\.error\('', error\);", "console.error('API Error:', error);"
    $content = $content -replace "'': '',", "'Content-Type': 'application/json',"
    
    # Garantir charset UTF-8
    if ($content -notmatch 'charset="UTF-8"') {
        $content = $content -replace '<head>', '<head>`n    <meta charset="UTF-8">'
    }
    
    return $content
}

# Corrigir arquivos
Write-Host "Corrigindo apenas sintaxe..." -ForegroundColor Cyan

$successCount = 0
$errorCount = 0
$fixedCount = 0

foreach ($file in $mainFiles) {
    if (Test-Path $file) {
        try {
            # Ler conteudo original
            $originalContent = Get-Content $file -Raw -Encoding UTF8
            
            # Aplicar correcoes de sintaxe
            $fixedContent = Fix-SyntaxOnly -content $originalContent
            
            # Verificar se houve mudancas
            if ($originalContent -ne $fixedContent) {
                # Salvar arquivo corrigido
                $fixedContent | Set-Content $file -Encoding UTF8
                Write-Host "Corrigido: $file" -ForegroundColor Green
                $fixedCount++
            } else {
                Write-Host "OK: $file" -ForegroundColor Gray
            }
            
            $successCount++
        } catch {
            Write-Host "Erro: $file" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "Nao encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host "=== CORRECAO DE SINTAXE CONCLUIDA ===" -ForegroundColor Yellow
Write-Host "Arquivos processados: $successCount" -ForegroundColor Green
Write-Host "Arquivos corrigidos: $fixedCount" -ForegroundColor Cyan
Write-Host "Erros: $errorCount" -ForegroundColor Red
Write-Host "Backup: $backupDir" -ForegroundColor Cyan
Write-Host "Apenas sintaxe corrigida - funcionalidade preservada!" -ForegroundColor Green
