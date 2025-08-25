# Script para corrigir problemas de codificação e sintaxe JavaScript
# Autor: Assistente AI
# Data: $(Get-Date)

Write-Host "=== CORREÇÃO DE CODIFICAÇÃO E SINTAXE ===" -ForegroundColor Yellow

$filePath = "C:\dom-v2\frontend\public\esocial-validation.html"

if (-not (Test-Path $filePath)) {
    Write-Host "ERRO: Arquivo não encontrado: $filePath" -ForegroundColor Red
    exit 1
}

Write-Host "Analisando arquivo: $filePath" -ForegroundColor Green

# Ler o conteúdo do arquivo com encoding correto
$content = Get-Content $filePath -Raw -Encoding UTF8

# Correções de codificação
$encodingFixes = @(
    @{ From = "cÃ³digo"; To = "código" },
    @{ From = "invÃ¡lido"; To = "inválido" },
    @{ From = "usuÃ¡rio"; To = "usuário" },
    @{ From = "VÃ¡lido"; To = "Válido" },
    @{ From = "InvÃ¡lido"; To = "Inválido" },
    @{ From = "FunÃ§Ãµes"; To = "Funções" },
    @{ From = "FunÃ§Ã£o"; To = "Função" },
    @{ From = "MÃ¡scaras"; To = "Máscaras" },
    @{ From = "âœ…"; To = "✅" },
    @{ From = "âŒ"; To = "❌" },
    @{ From = "ðŸ'¤"; To = "👤" },
    @{ From = "ðŸ‹"; To = "📋" },
    @{ From = "ðŸŽ¯"; To = "🎯" }
)

Write-Host "`nCorrigindo problemas de codificação:" -ForegroundColor Cyan

foreach ($fix in $encodingFixes) {
    $count = ([regex]::Matches($content, [regex]::Escape($fix.From))).Count
    if ($count -gt 0) {
        Write-Host "  - '$($fix.From)' -> '$($fix.To)': $count ocorrência(s)" -ForegroundColor Yellow
        $content = $content -replace [regex]::Escape($fix.From), $fix.To
    }
}

# Correções de sintaxe JavaScript
$syntaxFixes = @(
    @{ Pattern = 'const const '; Replacement = 'const '; Description = 'Duplicação de const' },
    @{ Pattern = 'phone;'; Replacement = 'phone'; Description = 'Ponto e vírgula desnecessário' },
    @{ Pattern = 'cep;'; Replacement = 'cep'; Description = 'Ponto e vírgula desnecessário' },
    @{ Pattern = 'userId;'; Replacement = 'userId'; Description = 'Ponto e vírgula desnecessário' },
    @{ Pattern = 'user_id: userId;'; Replacement = 'user_id: userId'; Description = 'Ponto e vírgula desnecessário' },
    @{ Pattern = 'otp, user_id: userId;'; Replacement = 'otp, user_id: userId'; Description = 'Ponto e vírgula desnecessário' },
    @{ Pattern = 'alert-${type;'; Replacement = 'alert-${type}'; Description = 'Template literal quebrado' },
    @{ Pattern = 'position \+ 1;'; Replacement = 'position + 1'; Description = 'Template literal quebrado' },
    @{ Pattern = 'd{3;'; Replacement = 'd{3}'; Description = 'Regex quebrado' },
    @{ Pattern = 'd{5;'; Replacement = 'd{5}'; Description = 'Regex quebrado' },
    @{ Pattern = 'd{1,2;'; Replacement = 'd{1,2}'; Description = 'Regex quebrado' }
)

Write-Host "`nCorrigindo problemas de sintaxe JavaScript:" -ForegroundColor Cyan

foreach ($fix in $syntaxFixes) {
    $count = ([regex]::Matches($content, [regex]::Escape($fix.Pattern))).Count
    if ($count -gt 0) {
        Write-Host "  - $($fix.Description): $count ocorrência(s)" -ForegroundColor Yellow
        $content = $content -replace [regex]::Escape($fix.Pattern), $fix.Replacement
    }
}

# Correções específicas para template literals quebrados
$content = $content -replace '`\$\{([^}]+);\s*\}', '`$${$1}`'
$content = $content -replace '`\$\{([^}]+);\s*\}\s*`', '`$${$1}`'

# Correções para objetos JavaScript
$content = $content -replace '(\w+):\s*(\w+);\s*\}', '$1: $2}'
$content = $content -replace '(\w+):\s*(\w+);\s*,', '$1: $2,'

# Fazer backup do arquivo original
$backupPath = $filePath + ".backup." + (Get-Date -Format "yyyyMMdd_HHmmss")
Copy-Item $filePath $backupPath
Write-Host "`nBackup criado: $backupPath" -ForegroundColor Cyan

# Salvar arquivo corrigido com encoding UTF-8
$content | Set-Content $filePath -Encoding UTF8
Write-Host "Arquivo corrigido salvo: $filePath" -ForegroundColor Green

Write-Host "`n=== CORREÇÃO CONCLUÍDA ===" -ForegroundColor Yellow
