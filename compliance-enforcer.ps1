# Compliance Enforcer - DOM v2
# Sistema automatizado que força o cumprimento das regras do projeto

param(
    [switch]$AutoFix,
    [switch]$PreCommit,
    [switch]$Continuous,
    [switch]$ReportOnly
)

# Configuracoes
$ProjectRoot = Get-Location
$RulesFile = "docs/project-rules.json"
$ViolationsLog = "logs/compliance-violations.log"

# Regras do projeto
$ProjectRules = @{
    Architecture = @{
        Frontend = @{
            Technology = "HTML + JavaScript vanilla"
            ProhibitedFrameworks = @("vue", "angular", "jquery", "react", "bootstrap")
            RequiredStructure = @("frontend/css", "frontend/js", "frontend/components", "frontend/assets")
        }
        Backend = @{
            Technology = "React + TypeScript"
            RequiredDependencies = @("react", "typescript", "node", "express", "prisma", "postgresql")
            RequiredStructure = @("backend/src", "backend/components", "backend/services", "backend/types")
        }
    }
    Development = @{
        PowerShellOnly = $true
        ErrorHandling = $true
        Validation = $true
        Documentation = $true
        NamingConvention = "kebab-case"
    }
    Quality = @{
        PreImplementationCheck = $true
        IncrementalValidation = $true
        CodeReview = $true
        Testing = $true
    }
}

# Funcao para registrar violacao
function Register-Violation {
    param(
        [string]$Category,
        [string]$Issue,
        [string]$File = "",
        [string]$Severity = "WARNING",
        [string]$AutoFixAction = ""
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $violation = @{
        Timestamp = $timestamp
        Category = $Category
        Issue = $Issue
        File = $File
        Severity = $Severity
        AutoFixAction = $AutoFixAction
    }
    
    # Log da violacao
    $logEntry = "[$timestamp] $Severity - $Category`: $Issue"
    if ($File) { $logEntry += " (Arquivo: $File)" }
    Add-Content -Path $ViolationsLog -Value $logEntry
    
    # Exibir violacao
    $color = if ($Severity -eq "ERROR") { "Red" } else { "Yellow" }
    Write-Host "VIOLACAO [$Severity]: $Category - $Issue" -ForegroundColor $color
    if ($File) { Write-Host "   Arquivo: $File" -ForegroundColor Gray }
    if ($AutoFixAction) { Write-Host "   Auto-fix: $AutoFixAction" -ForegroundColor Cyan }
}

# Funcao para aplicar correcao automatica
function Apply-AutoFix {
    param(
        [string]$Category,
        [string]$Issue,
        [string]$File,
        [string]$Action
    )
    
    try {
        switch ($Action) {
            "RemoveBashCommands" {
                $content = Get-Content $File -Raw
                $content = $content -replace "ls ", "Get-ChildItem "
                $content = $content -replace "cp ", "Copy-Item "
                $content = $content -replace "mv ", "Move-Item "
                $content = $content -replace "rm ", "Remove-Item "
                $content = $content -replace "mkdir ", "New-Item -ItemType Directory "
                $content = $content -replace "cat ", "Get-Content "
                Set-Content -Path $File -Value $content -Encoding UTF8
                Write-Host "   ✅ Comandos bash substituidos por PowerShell em $File" -ForegroundColor Green
            }
            "AddErrorHandling" {
                $content = Get-Content $File -Raw
                if ($content -notmatch "try\s*\{") {
                    $newContent = @"
try {
    $content
} catch {
    Write-Error "Erro em $File`: `$(`$_.Exception.Message)"
    exit 1
}
"@
                    Set-Content -Path $File -Value $newContent -Encoding UTF8
                    Write-Host "   ✅ Tratamento de erros adicionado em $File" -ForegroundColor Green
                }
            }
            "RemoveProhibitedFramework" {
                $content = Get-Content $File -Raw
                foreach ($framework in $ProjectRules.Architecture.Frontend.ProhibitedFrameworks) {
                    $content = $content -replace $framework, ""
                }
                Set-Content -Path $File -Value $content -Encoding UTF8
                Write-Host "   ✅ Frameworks proibidos removidos de $File" -ForegroundColor Green
            }
            "CreateRequiredDirectory" {
                if (-not (Test-Path $File)) {
                    New-Item -ItemType Directory -Path $File -Force | Out-Null
                    Write-Host "   ✅ Diretorio criado: $File" -ForegroundColor Green
                }
            }
        }
    } catch {
        Register-Violation -Category "AutoFix" -Issue "Falha ao aplicar correcao: $Action" -File $File -Severity "ERROR"
    }
}

# Verificar arquitetura
function Test-Architecture-Compliance {
    Write-Host "`n🔍 VERIFICANDO CONFORMIDADE ARQUITETURAL..." -ForegroundColor Cyan
    
    # Verificar frontend
    foreach ($dir in $ProjectRules.Architecture.Frontend.RequiredStructure) {
        if (-not (Test-Path $dir)) {
            Register-Violation -Category "Arquitetura" -Issue "Diretorio frontend ausente: $dir" -Severity "ERROR" -AutoFixAction "CreateRequiredDirectory"
            if ($AutoFix) { Apply-AutoFix -Category "Arquitetura" -Issue "Diretorio ausente" -File $dir -Action "CreateRequiredDirectory" }
        }
    }
    
    # Verificar backend
    foreach ($dir in $ProjectRules.Architecture.Backend.RequiredStructure) {
        if (-not (Test-Path $dir)) {
            Register-Violation -Category "Arquitetura" -Issue "Diretorio backend ausente: $dir" -Severity "ERROR" -AutoFixAction "CreateRequiredDirectory"
            if ($AutoFix) { Apply-AutoFix -Category "Arquitetura" -Issue "Diretorio ausente" -File $dir -Action "CreateRequiredDirectory" }
        }
    }
    
    # Verificar package.json do backend
    $backendPackageJson = "backend/package.json"
    if (Test-Path $backendPackageJson) {
        $content = Get-Content $backendPackageJson -Raw
        foreach ($dep in $ProjectRules.Architecture.Backend.RequiredDependencies) {
            if ($content -notmatch $dep) {
                Register-Violation -Category "Arquitetura" -Issue "Dependencia backend ausente: $dep" -File $backendPackageJson -Severity "ERROR"
            }
        }
    }
}

# Verificar comandos PowerShell
function Test-PowerShell-Compliance {
    Write-Host "`n🔍 VERIFICANDO CONFORMIDADE POWERSHELL..." -ForegroundColor Cyan
    
    $psScripts = Get-ChildItem -Path "." -Filter "*.ps1" -Recurse | Where-Object { 
        $_.FullName -notlike "*node_modules*" -and 
        $_.FullName -notlike "*backups*" -and 
        $_.FullName -notlike "*legacy*" 
    }
    
    foreach ($script in $psScripts) {
        $content = Get-Content $script.FullName -Raw
        
        # Verificar comandos bash
        $bashCommands = @("ls ", "cp ", "mv ", "rm ", "mkdir ", "cat ")
        foreach ($cmd in $bashCommands) {
            if ($content -match $cmd) {
                Register-Violation -Category "PowerShell" -Issue "Comando bash detectado: $cmd" -File $script.FullName -Severity "ERROR" -AutoFixAction "RemoveBashCommands"
                if ($AutoFix) { Apply-AutoFix -Category "PowerShell" -Issue "Comando bash" -File $script.FullName -Action "RemoveBashCommands" }
            }
        }
        
        # Verificar tratamento de erros
        if ($content -notmatch "try\s*\{|catch\s*\(|ErrorAction\s+Stop") {
            Register-Violation -Category "PowerShell" -Issue "Tratamento de erros ausente" -File $script.FullName -Severity "WARNING" -AutoFixAction "AddErrorHandling"
            if ($AutoFix) { Apply-AutoFix -Category "PowerShell" -Issue "Sem tratamento de erros" -File $script.FullName -Action "AddErrorHandling" }
        }
    }
}

# Verificar frameworks proibidos no frontend
function Test-Frontend-Compliance {
    Write-Host "`n🔍 VERIFICANDO CONFORMIDADE FRONTEND..." -ForegroundColor Cyan
    
    $htmlFiles = Get-ChildItem -Path "frontend" -Filter "*.html" -Recurse | Where-Object { 
        $_.FullName -notlike "*backups*" -and 
        $_.FullName -notlike "*legacy*" 
    }
    
    foreach ($file in $htmlFiles) {
        $content = Get-Content $file.FullName -Raw
        foreach ($framework in $ProjectRules.Architecture.Frontend.ProhibitedFrameworks) {
            if ($content -match $framework) {
                Register-Violation -Category "Frontend" -Issue "Framework proibido: $framework" -File $file.FullName -Severity "ERROR" -AutoFixAction "RemoveProhibitedFramework"
                if ($AutoFix) { Apply-AutoFix -Category "Frontend" -Issue "Framework proibido" -File $file.FullName -Action "RemoveProhibitedFramework" }
            }
        }
    }
}

# Funcao principal
function Start-ComplianceEnforcement {
    Write-Host "🚀 ENFORCER DE CONFORMIDADE - DOM v2" -ForegroundColor Magenta
    Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
    Write-Host "Modo: $(if ($AutoFix) { 'Auto-correcao' } else { 'Apenas relatorio' })" -ForegroundColor Gray
    Write-Host "=" * 60 -ForegroundColor Gray
    
    # Criar diretorio de logs se nao existir
    if (-not (Test-Path "logs")) {
        New-Item -ItemType Directory -Path "logs" -Force | Out-Null
    }
    
    # Limpar log anterior
    if (Test-Path $ViolationsLog) {
        Clear-Content $ViolationsLog
    }
    
    # Executar verificacoes
    Test-Architecture-Compliance
    Test-PowerShell-Compliance
    Test-Frontend-Compliance
    
    # Relatorio final
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "RELATORIO DE CONFORMIDADE" -ForegroundColor Magenta
    Write-Host "=" * 60 -ForegroundColor Gray
    
    if (Test-Path $ViolationsLog) {
        $violations = Get-Content $ViolationsLog
        if ($violations.Count -gt 0) {
            Write-Host "❌ VIOLACOES ENCONTRADAS: $($violations.Count)" -ForegroundColor Red
            Write-Host "Log detalhado: $ViolationsLog" -ForegroundColor Cyan
            
            if (-not $AutoFix) {
                Write-Host "`n💡 Execute com -AutoFix para corrigir automaticamente" -ForegroundColor Yellow
            }
        } else {
            Write-Host "✅ NENHUMA VIOLACAO ENCONTRADA!" -ForegroundColor Green
        }
    } else {
        Write-Host "✅ NENHUMA VIOLACAO ENCONTRADA!" -ForegroundColor Green
    }
    
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "Enforcement de conformidade concluido" -ForegroundColor Green
}

# Executar enforcement
Start-ComplianceEnforcement
