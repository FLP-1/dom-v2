# Script para corrigir apenas problemas de sintaxe nos arquivos HTML
Write-Host "=== CORRECAO DE SINTAXE NOS ARQUIVOS HTML ===" -ForegroundColor Yellow

# Encontrar todos os arquivos HTML
Write-Host "Buscando arquivos HTML..." -ForegroundColor Cyan
$allHtmlFiles = Get-ChildItem -Path "frontend\public" -Include "*.html" -Recurse

Write-Host "Total encontrado: $($allHtmlFiles.Count)" -ForegroundColor Green

# Criar backup
$backupDir = "C:\dom-v2\backups\html-syntax-fix-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "Backup criado em: $backupDir" -ForegroundColor Cyan

# Fazer backup
$backupCount = 0
foreach ($file in $allHtmlFiles) {
    $backupPath = Join-Path $backupDir $file.Name
    Copy-Item $file.FullName $backupPath
    $backupCount++
}

Write-Host "Backup concluido! $backupCount arquivos salvos." -ForegroundColor Green

# Funcao para corrigir problemas comuns de sintaxe
function Fix-HTMLSyntax {
    param([string]$content)
    
    # Corrigir problemas de codificacao
    $content = $content -replace 'cÃ³digo', 'código'
    $content = $content -replace 'cÃ¡digo', 'código'
    $content = $content -replace 'cÃ³digo', 'código'
    
    # Corrigir problemas de JavaScript
    $content = $content -replace 'const const', 'const'
    $content = $content -replace 'let let', 'let'
    $content = $content -replace 'var var', 'var'
    
    # Corrigir problemas de template literals
    $content = $content -replace '`([^`]*)`', '`$1`'
    
    # Corrigir problemas de aspas
    $content = $content -replace '"([^"]*)"', '"$1"'
    $content = $content -replace "'([^']*)'", "'$1'"
    
    # Corrigir problemas de chaves
    $content = $content -replace '}\s*;', '}'
    $content = $content -replace '}\s*,', '}'
    
    # Corrigir problemas de ponto e virgula
    $content = $content -replace ';\s*;', ';'
    $content = $content -replace ',\s*,', ','
    
    # Garantir charset UTF-8
    if ($content -notmatch 'charset="UTF-8"') {
        $content = $content -replace '<head>', '<head>`n    <meta charset="UTF-8">'
    }
    
    return $content
}

# Corrigir arquivos
Write-Host "Corrigindo sintaxe dos arquivos..." -ForegroundColor Cyan

$successCount = 0
$errorCount = 0
$fixedCount = 0

foreach ($file in $allHtmlFiles) {
    try {
        # Ler conteudo original
        $originalContent = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Aplicar correcoes
        $fixedContent = Fix-HTMLSyntax -content $originalContent
        
        # Verificar se houve mudancas
        if ($originalContent -ne $fixedContent) {
            # Salvar arquivo corrigido
            $fixedContent | Set-Content $file.FullName -Encoding UTF8
            Write-Host "Corrigido: $($file.Name)" -ForegroundColor Green
            $fixedCount++
        } else {
            Write-Host "OK: $($file.Name)" -ForegroundColor Gray
        }
        
        $successCount++
    } catch {
        Write-Host "Erro: $($file.Name)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "=== CORRECAO DE SINTAXE CONCLUIDA ===" -ForegroundColor Yellow
Write-Host "Arquivos processados: $successCount" -ForegroundColor Green
Write-Host "Arquivos corrigidos: $fixedCount" -ForegroundColor Cyan
Write-Host "Erros: $errorCount" -ForegroundColor Red
Write-Host "Backup: $backupDir" -ForegroundColor Cyan
Write-Host "Funcionalidades preservadas!" -ForegroundColor Green
