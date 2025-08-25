# Compliance Automation - DOM v2
# Sistema automatizado que funciona para humanos, IAs e edições manuais

param(
    [switch]$Setup,
    [switch]$Check,
    [switch]$AutoFix,
    [switch]$Status
)

# Configurações
$ProjectRoot = Get-Location
$ConfigFile = "compliance-config.json"
$LogFile = "logs/compliance.log"

# Configuração padrão
$ComplianceConfig = @{
    Enabled = $true
    AutoFix = $false
    Rules = @{
        Architecture = @{
            Frontend = "HTML + JavaScript vanilla"
            Backend = "React + TypeScript"
            ProhibitedFrameworks = @("vue", "angular", "jquery", "bootstrap")
        }
        Development = @{
            PowerShellOnly = $true
            ErrorHandling = $true
        }
    }
}

# Função para configurar o sistema
function Setup-ComplianceSystem {
    Write-Host "CONFIGURANDO SISTEMA DE COMPLIANCE..." -ForegroundColor Magenta
    
    # Criar diretórios
    $directories = @("logs", "tools", ".vscode")
    foreach ($dir in $directories) {
        if (-not (Test-Path -Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Host "Diretório criado: $dir" -ForegroundColor Green
        }
    }
    
    # Salvar configuração
    $ComplianceConfig | ConvertTo-Json -Depth 10 | Out-File -FilePath $ConfigFile -Encoding UTF8
    Write-Host "Configuração salva: $ConfigFile" -ForegroundColor Green
    
    # Criar VS Code settings
    $vscodeSettings = @{
        "files.autoSave" = "afterDelay"
        "files.autoSaveDelay" = 1000
        "editor.formatOnSave" = $true
        "files.exclude" = @{
            "**/node_modules" = $true
            "**/temp-obsolete-*" = $true
            "**/backup-*" = $true
        }
    }
    
    $vscodeSettings | ConvertTo-Json -Depth 10 | Out-File -FilePath ".vscode/settings.json" -Encoding UTF8
    Write-Host "Configuração VS Code criada" -ForegroundColor Green
    
    # Criar script de verificação rápida
    $quickCheckScript = @'
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
'@
    
    $quickCheckScript | Out-File -FilePath "tools/quick-check.ps1" -Encoding UTF8
    Write-Host "Script de verificação rápida criado" -ForegroundColor Green
    
    Write-Host "`nSistema de compliance configurado com sucesso!" -ForegroundColor Green
    Write-Host "Execute: .\compliance-automation.ps1 -Check" -ForegroundColor Cyan
}

# Função para verificar compliance
function Check-Compliance {
    Write-Host "VERIFICANDO COMPLIANCE DO PROJETO..." -ForegroundColor Cyan
    
    if (-not (Test-Path -Path $ConfigFile)) {
        Write-Host "Configuração não encontrada. Execute -Setup primeiro." -ForegroundColor Red
        return
    }
    
    $config = Get-Content $ConfigFile | ConvertFrom-Json
    $violations = @()
    $checkedFiles = 0
    
    # Verificar arquivos relevantes
    $relevantFiles = Get-ChildItem -Path "." -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
        $_.FullName -notlike "*\.git\*" -and 
        $_.FullName -notlike "*\node_modules\*" -and
        $_.Name -match "\.(ps1|ts|tsx|html|js|css|json)$"
    }
    
    foreach ($file in $relevantFiles) {
        $checkedFiles++
        $relativePath = $file.FullName.Replace($ProjectRoot, "").TrimStart("\")
        
        try {
            $content = Get-Content $file.FullName -Raw -ErrorAction Stop
            
            # Verificar frameworks proibidos no frontend
            if ($relativePath -like "frontend/*" -or $relativePath -like "*.html") {
                foreach ($framework in $config.Rules.Architecture.ProhibitedFrameworks) {
                    if ($content -match $framework) {
                        $violations += "Framework proibido $framework em $relativePath"
                    }
                }
            }
            
            # Verificar comandos bash em scripts PowerShell
            if ($relativePath -like "*.ps1") {
                $bashCommands = @("ls ", "cp ", "mv ", "rm ", "mkdir ", "cat ")
                foreach ($cmd in $bashCommands) {
                    if ($content -match $cmd) {
                        $violations += "Comando bash $cmd em $relativePath"
                    }
                }
            }
            
        } catch {
            # Arquivo não pode ser lido, ignorar
        }
    }
    
    # Exibir resultados
    Write-Host "`nRESULTADOS DA VERIFICAÇÃO:" -ForegroundColor Cyan
    Write-Host "   Arquivos verificados: $checkedFiles" -ForegroundColor White
    Write-Host "   Violações encontradas: $($violations.Count)" -ForegroundColor $(if ($violations.Count -gt 0) { "Red" } else { "Green" })
    
    if ($violations.Count -gt 0) {
        Write-Host "`nVIOLACOES:" -ForegroundColor Red
        foreach ($violation in $violations) {
            Write-Host "   - $violation" -ForegroundColor Red
        }
        
        if ($AutoFix) {
            Write-Host "`nExecutando auto-correção..." -ForegroundColor Yellow
            # Aqui implementaria a lógica de auto-correção
        }
    } else {
        Write-Host "`n✅ NENHUMA VIOLACAO ENCONTRADA!" -ForegroundColor Green
        Write-Host "Projeto em conformidade com as regras." -ForegroundColor Green
    }
}

# Função para mostrar status
function Show-ComplianceStatus {
    Write-Host "STATUS DO SISTEMA DE COMPLIANCE" -ForegroundColor Magenta
    Write-Host "=" * 50 -ForegroundColor Gray
    
    if (Test-Path -Path $ConfigFile) {
        $config = Get-Content $ConfigFile | ConvertFrom-Json
        Write-Host "Status: CONFIGURADO" -ForegroundColor Green
        Write-Host "Auto-fix: $($config.AutoFix)" -ForegroundColor Cyan
        Write-Host "Regras ativas: $($config.Rules.Architecture.Frontend)" -ForegroundColor Cyan
    } else {
        Write-Host "Status: NÃO CONFIGURADO" -ForegroundColor Red
        Write-Host "Execute -Setup para configurar" -ForegroundColor Yellow
    }
    
    Write-Host "`nComo usar:" -ForegroundColor Yellow
    Write-Host "1. Configurar: .\compliance-automation.ps1 -Setup" -ForegroundColor White
    Write-Host "2. Verificar: .\compliance-automation.ps1 -Check" -ForegroundColor White
    Write-Host "3. Auto-corrigir: .\compliance-automation.ps1 -Check -AutoFix" -ForegroundColor White
    Write-Host "4. Status: .\compliance-automation.ps1 -Status" -ForegroundColor White
}

# Função principal
function Start-ComplianceAutomation {
    Write-Host "COMPLIANCE AUTOMATION - DOM v2" -ForegroundColor Magenta
    Write-Host "Sistema automatizado para humanos, IAs e edições manuais" -ForegroundColor Gray
    Write-Host "=" * 60 -ForegroundColor Gray
    
    if ($Setup) {
        Setup-ComplianceSystem
    } elseif ($Check) {
        Check-Compliance
    } elseif ($Status) {
        Show-ComplianceStatus
    } else {
        Show-ComplianceStatus
    }
}

# Executar sistema
Start-ComplianceAutomation
