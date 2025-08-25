# Compliance Checker - DOM v2
# Verifica conformidade com regras, diretrizes e boas práticas do projeto

param(
    [switch]$FullCheck,
    [switch]$ArchitectureOnly,
    [switch]$CriticalThinkingOnly,
    [switch]$CommandOnly,
    [switch]$StructureOnly
)

# Configurações
$ProjectRoot = Get-Location
$ComplianceScore = 0
$TotalChecks = 0
$Violations = @()

# Função para registrar violação
function Register-Violation {
    param(
        [string]$Category,
        [string]$Issue,
        [string]$File = "",
        [string]$Line = "",
        [string]$Recommendation = ""
    )
    
    $violation = @{
        Category = $Category
        Issue = $Issue
        File = $File
        Line = $Line
        Recommendation = $Recommendation
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }
    
    $Violations += $violation
    Write-Host "❌ VIOLAÇÃO: $Category - $Issue" -ForegroundColor Red
    if ($Recommendation) {
        Write-Host "   💡 Recomendação: $Recommendation" -ForegroundColor Yellow
    }
}

# Função para registrar sucesso
function Register-Success {
    param([string]$Message)
    
    $script:ComplianceScore++
    $script:TotalChecks++
    Write-Host "✅ $Message" -ForegroundColor Green
}

# Teste de Conformidade Arquitetural
function Test-Architecture-Compliance {
    Write-Host "`n🏗️  VERIFICANDO CONFORMIDADE ARQUITETURAL..." -ForegroundColor Cyan
    
    # Verificar estrutura de diretórios
    $requiredDirs = @("frontend", "backend", "docs", "scripts")
    foreach ($dir in $requiredDirs) {
        if (Test-Path $dir) {
            Register-Success "Diretório $dir existe"
        } else {
            Register-Violation "Arquitetura" "Diretório $dir não encontrado" "" "" "Criar diretório $dir"
        }
    }
    
    # Verificar arquivos base do frontend
    $frontendFiles = @("frontend/index.html", "frontend/css/main.css", "frontend/js/main.js")
    foreach ($file in $frontendFiles) {
        if (Test-Path $file) {
            Register-Success "Arquivo $file existe"
        } else {
            Register-Violation "Arquitetura" "Arquivo $file não encontrado" "" "" "Criar arquivo $file"
        }
    }
    
    # Verificar se não há frameworks proibidos
    $prohibitedFrameworks = @("react", "vue", "angular", "jquery")
    $packageJson = "package.json"
    
    if (Test-Path $packageJson) {
        $content = Get-Content $packageJson -Raw
        foreach ($framework in $prohibitedFrameworks) {
            if ($content -match $framework) {
                Register-Violation "Arquitetura" "Framework proibido detectado: $framework" $packageJson "" "Remover dependência do $framework"
            } else {
                Register-Success "Framework proibido $framework não encontrado"
            }
        }
    }
    
    # Verificar tecnologias obrigatórias
    $requiredTech = @("node", "typescript", "prisma", "postgresql")
    foreach ($tech in $requiredTech) {
        if ($content -match $tech) {
            Register-Success "Tecnologia obrigatória $tech encontrada"
        } else {
            Register-Violation "Arquitetura" "Tecnologia obrigatória não encontrada: $tech" $packageJson "" "Adicionar $tech ao projeto"
        }
    }
}

# Teste de Conformidade com Pensamento Crítico
function Test-Critical-Thinking-Compliance {
    Write-Host "`n🧠 VERIFICANDO CONFORMIDADE COM PENSAMENTO CRÍTICO..." -ForegroundColor Cyan
    
    # Verificar documentação de decisões
    $decisionDocs = @("docs/decisions", "docs/architecture")
    foreach ($doc in $decisionDocs) {
        if (Test-Path $doc) {
            $files = Get-ChildItem $doc -File -Recurse | Where-Object { $_.Extension -eq ".md" }
            if ($files.Count -gt 0) {
                Register-Success "Documentação de decisões encontrada em $doc"
            } else {
                Register-Violation "Pensamento Crítico" "Nenhuma documentação de decisões em $doc" "" "" "Criar documentação de decisões"
            }
        } else {
            Register-Violation "Pensamento Crítico" "Diretório de documentação não encontrado: $doc" "" "" "Criar diretório $doc"
        }
    }
    
    # Verificar validação e tratamento de erros
    $jsFiles = Get-ChildItem -Path "frontend" -Filter "*.js" -Recurse
    foreach ($file in $jsFiles) {
        $content = Get-Content $file.FullName -Raw
        if ($content -match "try\s*\{|catch\s*\(|throw\s+new\s+Error") {
            Register-Success "Tratamento de erros encontrado em $($file.Name)"
        } else {
            Register-Violation "Pensamento Crítico" "Tratamento de erros ausente em $($file.Name)" $file.FullName "" "Implementar try-catch e validações"
        }
    }
    
    # Verificar validação de dados
    $htmlFiles = Get-ChildItem -Path "frontend" -Filter "*.html" -Recurse
    foreach ($file in $htmlFiles) {
        $content = Get-Content $file.FullName -Raw
        if ($content -match "required|pattern|minlength|maxlength") {
            Register-Success "Validação HTML encontrada em $($file.Name)"
        } else {
            Register-Violation "Pensamento Crítico" "Validação HTML ausente em $($file.Name)" $file.FullName "" "Adicionar atributos de validação"
        }
    }
}

# Teste de Conformidade de Comandos PowerShell
function Test-Command-Compliance {
    Write-Host "`n⚙️  VERIFICANDO CONFORMIDADE DE COMANDOS POWERSHELL..." -ForegroundColor Cyan
    
    # Verificar scripts PowerShell
    $psScripts = Get-ChildItem -Path "." -Filter "*.ps1" -Recurse
    foreach ($script in $psScripts) {
        $content = Get-Content $script.FullName -Raw
        
        # Verificar se usa comandos válidos do PowerShell
        $validCommands = @("Get-", "Set-", "New-", "Remove-", "Test-", "Write-", "Read-", "Move-", "Copy-")
        $hasValidCommands = $false
        
        foreach ($cmd in $validCommands) {
            if ($content -match $cmd) {
                $hasValidCommands = $true
                break
            }
        }
        
        if ($hasValidCommands) {
            Register-Success "Comandos PowerShell válidos em $($script.Name)"
        } else {
            Register-Violation "Comando PowerShell" "Comandos inválidos em $($script.Name)" $script.FullName "" "Usar apenas cmdlets PowerShell válidos"
        }
        
        # Verificar tratamento de erros
        if ($content -match "try\s*\{|catch\s*\(|ErrorAction\s+Stop") {
            Register-Success "Tratamento de erros PowerShell em $($script.Name)"
        } else {
            Register-Violation "Comando PowerShell" "Tratamento de erros ausente em $($script.Name)" $script.FullName "" "Implementar try-catch e ErrorAction"
        }
    }
    
    # Verificar se não usa comandos bash/cmd
    $bashCommands = @("ls ", "cp ", "mv ", "rm ", "mkdir ", "cat ")
    foreach ($script in $psScripts) {
        $content = Get-Content $script.FullName -Raw
        foreach ($cmd in $bashCommands) {
            if ($content -match $cmd) {
                Register-Violation "Comando PowerShell" "Comando bash detectado: $cmd em $($script.Name)" $script.FullName "" "Substituir por equivalente PowerShell"
            }
        }
    }
}

# Teste de Conformidade de Estrutura
function Test-Structure-Compliance {
    Write-Host "`n📁 VERIFICANDO CONFORMIDADE DE ESTRUTURA..." -ForegroundColor Cyan
    
    # Verificar organização modular
    $frontendDirs = @("frontend/css", "frontend/js", "frontend/components", "frontend/assets")
    foreach ($dir in $frontendDirs) {
        if (Test-Path $dir) {
            Register-Success "Diretório modular $dir existe"
        } else {
            Register-Violation "Estrutura" "Diretório modular não encontrado: $dir" "" "" "Criar diretório $dir"
        }
    }
    
    # Verificar separação de responsabilidades
    $cssFiles = Get-ChildItem -Path "frontend" -Filter "*.css" -Recurse
    $jsFiles = Get-ChildItem -Path "frontend" -Filter "*.js" -Recurse
    $htmlFiles = Get-ChildItem -Path "frontend" -Filter "*.html" -Recurse
    
    if ($cssFiles.Count -gt 0) {
        Register-Success "Arquivos CSS separados encontrados"
    } else {
        Register-Violation "Estrutura" "Nenhum arquivo CSS separado encontrado" "" "" "Separar estilos em arquivos CSS"
    }
    
    if ($jsFiles.Count -gt 0) {
        Register-Success "Arquivos JavaScript separados encontrados"
    } else {
        Register-Violation "Estrutura" "Nenhum arquivo JavaScript separado encontrado" "" "" "Separar lógica em arquivos JS"
    }
    
    # Verificar nomenclatura consistente
    $files = Get-ChildItem -Path "frontend" -Recurse -File
    foreach ($file in $files) {
        if ($file.Name -match "^[a-z][a-z0-9-]*\.[a-z]+$") {
            Register-Success "Nomenclatura consistente: $($file.Name)"
        } else {
            Register-Violation "Estrutura" "Nomenclatura inconsistente: $($file.Name)" $file.FullName "" "Usar kebab-case para nomes de arquivos"
        }
    }
    
    # Verificar documentação
    $docs = Get-ChildItem -Path "docs" -Recurse -File | Where-Object { $_.Extension -eq ".md" }
    if ($docs.Count -gt 0) {
        Register-Success "Documentação encontrada"
    } else {
        Register-Violation "Estrutura" "Nenhuma documentação encontrada" "" "" "Criar documentação do projeto"
    }
}

# Função principal
function Start-ComplianceCheck {
    Write-Host "🔍 VERIFICADOR DE CONFORMIDADE - DOM v2" -ForegroundColor Magenta
    Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
    Write-Host "Diretório: $ProjectRoot" -ForegroundColor Gray
    Write-Host "=" * 60 -ForegroundColor Gray
    
    if ($FullCheck -or $ArchitectureOnly) {
        Test-Architecture-Compliance
    }
    
    if ($FullCheck -or $CriticalThinkingOnly) {
        Test-Critical-Thinking-Compliance
    }
    
    if ($FullCheck -or $CommandOnly) {
        Test-Command-Compliance
    }
    
    if ($FullCheck -or $StructureOnly) {
        Test-Structure-Compliance
    }
    
    # Relatório final
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "📊 RELATÓRIO FINAL DE CONFORMIDADE" -ForegroundColor Magenta
    Write-Host "=" * 60 -ForegroundColor Gray
    
    $compliancePercentage = if ($TotalChecks -gt 0) { [math]::Round(($ComplianceScore / $TotalChecks) * 100, 2) } else { 0 }
    
    Write-Host "Pontuação: $ComplianceScore/$TotalChecks" -ForegroundColor White
    Write-Host "Conformidade: $compliancePercentage%" -ForegroundColor $(if ($compliancePercentage -ge 80) { "Green" } elseif ($compliancePercentage -ge 60) { "Yellow" } else { "Red" })
    
    if ($Violations.Count -gt 0) {
        Write-Host "`n🚨 VIOLAÇÕES ENCONTRADAS ($($Violations.Count)):" -ForegroundColor Red
        
        $groupedViolations = $Violations | Group-Object Category
        foreach ($group in $groupedViolations) {
            Write-Host "`n📋 $($group.Name):" -ForegroundColor Yellow
            foreach ($violation in $group.Group) {
                Write-Host "  • $($violation.Issue)" -ForegroundColor Red
                if ($violation.File) {
                    Write-Host "    Arquivo: $($violation.File)" -ForegroundColor Gray
                }
                if ($violation.Recommendation) {
                    Write-Host "    💡 $($violation.Recommendation)" -ForegroundColor Cyan
                }
            }
        }
        
        # Gerar relatório detalhado
        $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
        $reportFile = "compliance-report-$timestamp.json"
        $report = @{
            Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            ProjectRoot = $ProjectRoot
            ComplianceScore = $ComplianceScore
            TotalChecks = $TotalChecks
            CompliancePercentage = $compliancePercentage
            Violations = $Violations
        }
        
        $report | ConvertTo-Json -Depth 10 | Out-File $reportFile -Encoding UTF8
        Write-Host "`n📄 Relatório detalhado salvo em: $reportFile" -ForegroundColor Cyan
    } else {
        Write-Host "`n🎉 NENHUMA VIOLAÇÃO ENCONTRADA!" -ForegroundColor Green
        Write-Host "O projeto está em conformidade com todas as regras e boas práticas." -ForegroundColor Green
    }
    
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "✅ Verificação de conformidade concluída" -ForegroundColor Green
}

# Executar verificação
Start-ComplianceCheck
