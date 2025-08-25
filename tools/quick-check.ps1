# Quick Compliance Check
param([string]$File = "")

if (-not $File) { return }

$config = Get-Content "compliance-config.json" | ConvertFrom-Json
$violations = @()

try {
    $content = Get-Content $File -Raw -ErrorAction Stop
    
    # Verificar frameworks proibidos no frontend
    if ($File -like "frontend/*" -or $File -like "*.html") {
        foreach ($framework in $config.Rules.Architecture.ProhibitedFrameworks) {
            if ($content -match $framework) {
                $violations += "Framework proibido $framework em $File"
            }
        }
    }
    
    # Verificar comandos bash em scripts PowerShell
    if ($File -like "*.ps1") {
        $bashCommands = @("ls ", "cp ", "mv ", "rm ", "mkdir ", "cat ")
        foreach ($cmd in $bashCommands) {
            if ($content -match $cmd) {
                $violations += "Comando bash $cmd em $File"
            }
        }
    }
    
    if ($violations.Count -gt 0) {
        Write-Host "VIOLACOES em $File:" -ForegroundColor Red
        foreach ($violation in $violations) {
            Write-Host "  - $violation" -ForegroundColor Red
        }
    } else {
        Write-Host "OK: $File" -ForegroundColor Green
    }
    
} catch {
    Write-Host "Erro ao verificar $File: $($_.Exception.Message)" -ForegroundColor Red
}
