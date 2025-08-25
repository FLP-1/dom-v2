# Script simples para corrigir problemas de sintaxe JavaScript
Write-Host "=== CORREÇÃO SIMPLES DE SINTAXE ===" -ForegroundColor Yellow

$filePath = "C:\dom-v2\frontend\public\esocial-validation.html"

if (-not (Test-Path $filePath)) {
    Write-Host "ERRO: Arquivo não encontrado: $filePath" -ForegroundColor Red
    exit 1
}

Write-Host "Analisando arquivo: $filePath" -ForegroundColor Green

# Ler o conteúdo do arquivo
$content = Get-Content $filePath -Raw

# Correções básicas de sintaxe
$content = $content -replace 'const const ', 'const '
$content = $content -replace 'phone;', 'phone'
$content = $content -replace 'cep;', 'cep'
$content = $content -replace 'userId;', 'userId'
$content = $content -replace 'user_id: userId;', 'user_id: userId'
$content = $content -replace 'otp, user_id: userId;', 'otp, user_id: userId'

# Correções de template literals
$content = $content -replace 'alert-\$\{type;', 'alert-${type}'
$content = $content -replace 'position \+ 1;', 'position + 1'

# Correções de regex
$content = $content -replace 'd\{3;', 'd{3}'
$content = $content -replace 'd\{5;', 'd{5}'
$content = $content -replace 'd\{1,2;', 'd{1,2}'

# Fazer backup
$backupPath = $filePath + ".backup." + (Get-Date -Format "yyyyMMdd_HHmmss")
Copy-Item $filePath $backupPath
Write-Host "Backup criado: $backupPath" -ForegroundColor Cyan

# Salvar arquivo corrigido
$content | Set-Content $filePath -Encoding UTF8
Write-Host "Arquivo corrigido salvo: $filePath" -ForegroundColor Green

Write-Host "=== CORREÇÃO CONCLUÍDA ===" -ForegroundColor Yellow
