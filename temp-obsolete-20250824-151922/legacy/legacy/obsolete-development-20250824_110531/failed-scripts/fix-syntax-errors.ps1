# Script para corrigir problemas de sintaxe JavaScript no arquivo esocial-validation.html
# Autor: Assistente AI
# Data: $(Get-Date)

Write-Host "=== ANÁLISE DE PROBLEMAS DE SINTAXE JAVASCRIPT ===" -ForegroundColor Yellow

$filePath = "C:\dom-v2\frontend\public\esocial-validation.html"

if (-not (Test-Path $filePath)) {
    Write-Host "ERRO: Arquivo não encontrado: $filePath" -ForegroundColor Red
    exit 1
}

Write-Host "Analisando arquivo: $filePath" -ForegroundColor Green

# Ler o conteúdo do arquivo
$content = Get-Content $filePath -Raw

# Padrões de problemas identificados
$problems = @(
    @{
        Pattern = 'phone;'
        Replacement = 'phone'
        Description = 'Ponto e vírgula desnecessário após phone'
    },
    @{
        Pattern = 'cep;'
        Replacement = 'cep'
        Description = 'Ponto e vírgula desnecessário após cep'
    },
    @{
        Pattern = 'user_id: userId;'
        Replacement = 'user_id: userId'
        Description = 'Ponto e vírgula desnecessário após userId'
    },
    @{
        Pattern = 'otp, user_id: userId;'
        Replacement = 'otp, user_id: userId'
        Description = 'Ponto e vírgula desnecessário após userId'
    },
    @{
        Pattern = 'userId;'
        Replacement = 'userId'
        Description = 'Ponto e vírgula desnecessário após userId'
    },
    @{
        Pattern = 'statusClass = status \? ''status-valid'' : ''status-invalid'';'
        Replacement = 'const statusClass = data.compliance[item.key] ? ''status-valid'' : ''status-invalid'';'
        Description = 'Correção da lógica de status'
    },
    @{
        Pattern = 'statusText = status \? ''Válido'' : ''Inválido'';'
        Replacement = 'const statusText = data.compliance[item.key] ? ''Válido'' : ''Inválido'';'
        Description = 'Correção da lógica de status'
    },
    @{
        Pattern = 'icon = status \? ''✅'' : ''❌'';'
        Replacement = 'const icon = data.compliance[item.key] ? ''✅'' : ''❌'';'
        Description = 'Correção da lógica de status'
    },
    @{
        Pattern = 'alert-${type;'
        Replacement = 'alert-${type}'
        Description = 'Ponto e vírgula desnecessário em template literal'
    },
    @{
        Pattern = 'position \+ 1;'
        Replacement = 'position + 1'
        Description = 'Ponto e vírgula desnecessário em template literal'
    },
    @{
        Pattern = 'd{3;'
        Replacement = 'd{3}'
        Description = 'Correção de regex'
    },
    @{
        Pattern = 'd{5;'
        Replacement = 'd{5}'
        Description = 'Correção de regex'
    },
    @{
        Pattern = 'd{1,2;'
        Replacement = 'd{1,2}'
        Description = 'Correção de regex'
    }
)

Write-Host "`nProblemas identificados:" -ForegroundColor Cyan

$totalProblems = 0
$fixedProblems = 0

foreach ($problem in $problems) {
    $matches = [regex]::Matches($content, $problem.Pattern)
    if ($matches.Count -gt 0) {
        Write-Host "  - $($problem.Description): $($matches.Count) ocorrência(s)" -ForegroundColor Yellow
        $totalProblems += $matches.Count
        
        # Aplicar correção
        $content = $content -replace $problem.Pattern, $problem.Replacement
        $fixedProblems += $matches.Count
    }
}

# Correções específicas para template literals quebrados
$content = $content -replace '`\$\{([^}]+);\s*\}', '`$${$1}`'
$content = $content -replace '`\$\{([^}]+);\s*\}\s*`', '`$${$1}`'

# Correções para objetos JavaScript
$content = $content -replace '(\w+):\s*(\w+);\s*\}', '$1: $2}'
$content = $content -replace '(\w+):\s*(\w+);\s*,', '$1: $2,'

Write-Host "`nResumo:" -ForegroundColor Green
Write-Host "  - Total de problemas encontrados: $totalProblems" -ForegroundColor White
Write-Host "  - Problemas corrigidos: $fixedProblems" -ForegroundColor White

# Fazer backup do arquivo original
$backupPath = $filePath + ".backup." + (Get-Date -Format "yyyyMMdd_HHmmss")
Copy-Item $filePath $backupPath
Write-Host "  - Backup criado: $backupPath" -ForegroundColor Cyan

# Salvar arquivo corrigido
$content | Set-Content $filePath -Encoding UTF8
Write-Host "  - Arquivo corrigido salvo: $filePath" -ForegroundColor Green

Write-Host "`n=== ANÁLISE CONCLUÍDA ===" -ForegroundColor Yellow
