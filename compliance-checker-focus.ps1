# Compliance Checker Focus - DOM v2
# Verifica conformidade focando apenas nos arquivos do projeto

param(
    [switch]$FullCheck,
    [switch]$ArchitectureOnly,
    [switch]$CriticalThinkingOnly,
    [switch]$CommandOnly,
    [switch]$StructureOnly
)

# Configuracoes
$ProjectRoot = Get-Location
$ComplianceScore = 0
$TotalChecks = 0
$Violations = @()

# Diretorios e arquivos a ignorar
$IgnorePaths = @(
    "node_modules",
    "legacy",
    "backups",
    "cache",
    "trash-temp",
    ".git",
    "DOMv2Android",
    "backup-react-legacy"
)

# Funcao para verificar se deve ignorar o arquivo
function Should-IgnoreFile {
    param([string]$FilePath)
    
    foreach ($ignorePath in $IgnorePaths) {
        if ($FilePath -like "*\$ignorePath\*") {
            return $true
        }
    }
    return $false
}

# Funcao para registrar violacao
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
    Write-Host "VIOLACAO: $Category - $Issue" -ForegroundColor Red
    if ($Recommendation) {
        Write-Host "   Recomendacao: $Recommendation" -ForegroundColor Yellow
    }
}

# Funcao para registrar sucesso
function Register-Success {
    param([string]$Message)
    
    $script:ComplianceScore++
    $script:TotalChecks++
    Write-Host "SUCESSO: $Message" -ForegroundColor Green
}

# Teste de Conformidade Arquitetural
function Test-Architecture-Compliance {
    Write-Host "`nVERIFICANDO CONFORMIDADE ARQUITETURAL..." -ForegroundColor Cyan
    
    # Verificar estrutura de diretorios
    $requiredDirs = @("frontend", "backend", "docs", "scripts")
    foreach ($dir in $requiredDirs) {
        if (Test-Path $dir) {
            Register-Success "Diretorio $dir existe"
        } else {
            Register-Violation "Arquitetura" "Diretorio $dir nao encontrado" "" "" "Criar diretorio $dir"
        }
    }
    
    # Verificar arquivos base do frontend (HTML + JS vanilla)
    $frontendFiles = @("frontend/index.html", "frontend/css/main.css", "frontend/js/main.js")
    foreach ($file in $frontendFiles) {
        if (Test-Path $file) {
            Register-Success "Arquivo $file existe"
        } else {
            Register-Violation "Arquitetura" "Arquivo $file nao encontrado" "" "" "Criar arquivo $file"
        }
    }
    
    # Verificar se nao ha frameworks proibidos no frontend
    $prohibitedFrontendFrameworks = @("vue", "angular", "jquery")
    $frontendFiles = Get-ChildItem -Path "frontend" -Filter "*.html" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    
    foreach ($file in $frontendFiles) {
        $content = Get-Content $file.FullName -Raw
        foreach ($framework in $prohibitedFrontendFrameworks) {
            if ($content -match $framework) {
                Register-Violation "Arquitetura" "Framework proibido no frontend: $framework em $($file.Name)" $file.FullName "" "Remover dependencia do $framework do frontend"
            }
        }
    }
    
    # Verificar tecnologias obrigatorias no backend (React + TypeScript)
    $backendPackageJson = "backend/package.json"
    if (Test-Path $backendPackageJson) {
        $content = Get-Content $backendPackageJson -Raw
        $requiredBackendTech = @("react", "typescript", "node", "express", "prisma", "postgresql")
        foreach ($tech in $requiredBackendTech) {
            if ($content -match $tech) {
                Register-Success "Tecnologia backend obrigatoria $tech encontrada"
            } else {
                Register-Violation "Arquitetura" "Tecnologia backend obrigatoria nao encontrada: $tech" $backendPackageJson "" "Adicionar $tech ao backend"
            }
        }
        
        # Verificar se React está presente no backend
        if ($content -match "react") {
            Register-Success "React encontrado no backend (correto)"
        } else {
            Register-Violation "Arquitetura" "React nao encontrado no backend" $backendPackageJson "" "Adicionar React ao backend"
        }
    } else {
        Register-Violation "Arquitetura" "package.json do backend nao encontrado" "" "" "Criar package.json no backend com React + TypeScript"
    }
}

# Teste de Conformidade com Pensamento Critico
function Test-Critical-Thinking-Compliance {
    Write-Host "`nVERIFICANDO CONFORMIDADE COM PENSAMENTO CRITICO..." -ForegroundColor Cyan
    
    # Verificar documentacao de decisoes
    $decisionDocs = @("docs/decisions", "docs/architecture")
    foreach ($doc in $decisionDocs) {
        if (Test-Path $doc) {
            $files = Get-ChildItem $doc -File -Recurse | Where-Object { $_.Extension -eq ".md" }
            if ($files.Count -gt 0) {
                Register-Success "Documentacao de decisoes encontrada em $doc"
            } else {
                Register-Violation "Pensamento Critico" "Nenhuma documentacao de decisoes em $doc" "" "" "Criar documentacao de decisoes"
            }
        } else {
            Register-Violation "Pensamento Critico" "Diretorio de documentacao nao encontrado: $doc" "" "" "Criar diretorio $doc"
        }
    }
    
    # Verificar validacao e tratamento de erros no frontend (JavaScript vanilla)
    $jsFiles = Get-ChildItem -Path "frontend" -Filter "*.js" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $jsCount = 0
    $jsWithErrors = 0
    
    foreach ($file in $jsFiles) {
        $jsCount++
        $content = Get-Content $file.FullName -Raw
        if ($content -match "try\s*\{|catch\s*\(|throw\s+new\s+Error") {
            $jsWithErrors++
        }
    }
    
    if ($jsCount -gt 0) {
        if ($jsWithErrors -gt 0) {
            Register-Success "Tratamento de erros encontrado em $jsWithErrors de $jsCount arquivos JS do frontend"
        } else {
            Register-Violation "Pensamento Critico" "Tratamento de erros ausente em todos os $jsCount arquivos JS do frontend" "" "" "Implementar try-catch e validacoes"
        }
    } else {
        Register-Success "Nenhum arquivo JS do frontend encontrado para analise"
    }
    
    # Verificar validacao de dados no frontend (HTML)
    $htmlFiles = Get-ChildItem -Path "frontend" -Filter "*.html" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $htmlCount = 0
    $htmlWithValidation = 0
    
    foreach ($file in $htmlFiles) {
        $htmlCount++
        $content = Get-Content $file.FullName -Raw
        if ($content -match "required|pattern|minlength|maxlength") {
            $htmlWithValidation++
        }
    }
    
    if ($htmlCount -gt 0) {
        if ($htmlWithValidation -gt 0) {
            Register-Success "Validacao HTML encontrada em $htmlWithValidation de $htmlCount arquivos HTML do frontend"
        } else {
            Register-Violation "Pensamento Critico" "Validacao HTML ausente em todos os $htmlCount arquivos HTML do frontend" "" "" "Adicionar atributos de validacao"
        }
    } else {
        Register-Success "Nenhum arquivo HTML do frontend encontrado para analise"
    }
    
    # Verificar tratamento de erros no backend (TypeScript/React)
    $tsFiles = Get-ChildItem -Path "backend" -Filter "*.ts" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $tsxFiles = Get-ChildItem -Path "backend" -Filter "*.tsx" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $backendFiles = @($tsFiles) + @($tsxFiles)
    
    $backendCount = 0
    $backendWithErrors = 0
    
    foreach ($file in $backendFiles) {
        $backendCount++
        $content = Get-Content $file.FullName -Raw
        if ($content -match "try\s*\{|catch\s*\(|throw\s+new\s+Error|ErrorBoundary") {
            $backendWithErrors++
        }
    }
    
    if ($backendCount -gt 0) {
        if ($backendWithErrors -gt 0) {
            Register-Success "Tratamento de erros encontrado em $backendWithErrors de $backendCount arquivos do backend"
        } else {
            Register-Violation "Pensamento Critico" "Tratamento de erros ausente em todos os $backendCount arquivos do backend" "" "" "Implementar try-catch e ErrorBoundary"
        }
    } else {
        Register-Success "Nenhum arquivo TypeScript/React do backend encontrado para analise"
    }
}

# Teste de Conformidade de Comandos PowerShell
function Test-Command-Compliance {
    Write-Host "`nVERIFICANDO CONFORMIDADE DE COMANDOS POWERSHELL..." -ForegroundColor Cyan
    
    # Verificar scripts PowerShell apenas na raiz e scripts/
    $psScripts = @()
    $psScripts += Get-ChildItem -Path "." -Filter "*.ps1" | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $psScripts += Get-ChildItem -Path "scripts" -Filter "*.ps1" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    
    foreach ($script in $psScripts) {
        $content = Get-Content $script.FullName -Raw
        
        # Verificar se usa comandos validos do PowerShell
        $validCommands = @("Get-", "Set-", "New-", "Remove-", "Test-", "Write-", "Read-", "Move-", "Copy-")
        $hasValidCommands = $false
        
        foreach ($cmd in $validCommands) {
            if ($content -match $cmd) {
                $hasValidCommands = $true
                break
            }
        }
        
        if ($hasValidCommands) {
            Register-Success "Comandos PowerShell validos em $($script.Name)"
        } else {
            Register-Violation "Comando PowerShell" "Comandos invalidos em $($script.Name)" $script.FullName "" "Usar apenas cmdlets PowerShell validos"
        }
        
        # Verificar tratamento de erros
        if ($content -match "try\s*\{|catch\s*\(|ErrorAction\s+Stop") {
            Register-Success "Tratamento de erros PowerShell em $($script.Name)"
        } else {
            Register-Violation "Comando PowerShell" "Tratamento de erros ausente em $($script.Name)" $script.FullName "" "Implementar try-catch e ErrorAction"
        }
    }
    
    # Verificar se nao usa comandos bash/cmd
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
    Write-Host "`nVERIFICANDO CONFORMIDADE DE ESTRUTURA..." -ForegroundColor Cyan
    
    # Verificar organizacao modular do frontend
    $frontendDirs = @("frontend/css", "frontend/js", "frontend/components", "frontend/assets")
    foreach ($dir in $frontendDirs) {
        if (Test-Path $dir) {
            Register-Success "Diretorio modular frontend $dir existe"
        } else {
            Register-Violation "Estrutura" "Diretorio modular frontend nao encontrado: $dir" "" "" "Criar diretorio $dir"
        }
    }
    
    # Verificar organizacao modular do backend
    $backendDirs = @("backend/src", "backend/components", "backend/services", "backend/types")
    foreach ($dir in $backendDirs) {
        if (Test-Path $dir) {
            Register-Success "Diretorio modular backend $dir existe"
        } else {
            Register-Violation "Estrutura" "Diretorio modular backend nao encontrado: $dir" "" "" "Criar diretorio $dir"
        }
    }
    
    # Verificar separacao de responsabilidades no frontend
    $cssFiles = Get-ChildItem -Path "frontend" -Filter "*.css" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $jsFiles = Get-ChildItem -Path "frontend" -Filter "*.js" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $htmlFiles = Get-ChildItem -Path "frontend" -Filter "*.html" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    
    if ($cssFiles.Count -gt 0) {
        Register-Success "Arquivos CSS separados encontrados no frontend ($($cssFiles.Count) arquivos)"
    } else {
        Register-Violation "Estrutura" "Nenhum arquivo CSS separado encontrado no frontend" "" "" "Separar estilos em arquivos CSS"
    }
    
    if ($jsFiles.Count -gt 0) {
        Register-Success "Arquivos JavaScript separados encontrados no frontend ($($jsFiles.Count) arquivos)"
    } else {
        Register-Violation "Estrutura" "Nenhum arquivo JavaScript separado encontrado no frontend" "" "" "Separar logica em arquivos JS"
    }
    
    # Verificar separacao de responsabilidades no backend
    $tsFiles = Get-ChildItem -Path "backend" -Filter "*.ts" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $tsxFiles = Get-ChildItem -Path "backend" -Filter "*.tsx" -Recurse | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    
    if ($tsFiles.Count -gt 0 -or $tsxFiles.Count -gt 0) {
        Register-Success "Arquivos TypeScript/React encontrados no backend ($(($tsFiles.Count + $tsxFiles.Count)) arquivos)"
    } else {
        Register-Violation "Estrutura" "Nenhum arquivo TypeScript/React encontrado no backend" "" "" "Criar arquivos TypeScript/React no backend"
    }
    
    # Verificar nomenclatura consistente
    $files = Get-ChildItem -Path "frontend" -Recurse -File | Where-Object { -not (Should-IgnoreFile $_.FullName) }
    $consistentFiles = 0
    $totalFiles = $files.Count
    
    foreach ($file in $files) {
        if ($file.Name -match "^[a-z][a-z0-9-]*\.[a-z]+$") {
            $consistentFiles++
        }
    }
    
    if ($totalFiles -gt 0) {
        if ($consistentFiles -eq $totalFiles) {
            Register-Success "Nomenclatura consistente em todos os $totalFiles arquivos do frontend"
        } else {
            Register-Violation "Estrutura" "Nomenclatura inconsistente em $($totalFiles - $consistentFiles) de $totalFiles arquivos do frontend" "" "" "Usar kebab-case para nomes de arquivos"
        }
    }
    
    # Verificar documentacao
    $docs = Get-ChildItem -Path "docs" -Recurse -File | Where-Object { $_.Extension -eq ".md" }
    if ($docs.Count -gt 0) {
        Register-Success "Documentacao encontrada ($($docs.Count) arquivos)"
    } else {
        Register-Violation "Estrutura" "Nenhuma documentacao encontrada" "" "" "Criar documentacao do projeto"
    }
}

# Funcao principal
function Start-ComplianceCheck {
    Write-Host "VERIFICADOR DE CONFORMIDADE FOCADO - DOM v2" -ForegroundColor Magenta
    Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
    Write-Host "Diretorio: $ProjectRoot" -ForegroundColor Gray
    Write-Host "Arquitetura: Frontend (HTML+JS) + Backend (React+TypeScript)" -ForegroundColor Gray
    Write-Host "Ignorando: $($IgnorePaths -join ', ')" -ForegroundColor Gray
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
    
    # Relatorio final
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "RELATORIO FINAL DE CONFORMIDADE" -ForegroundColor Magenta
    Write-Host "=" * 60 -ForegroundColor Gray
    
    $compliancePercentage = if ($TotalChecks -gt 0) { [math]::Round(($ComplianceScore / $TotalChecks) * 100, 2) } else { 0 }
    
    Write-Host "Pontuacao: $ComplianceScore/$TotalChecks" -ForegroundColor White
    Write-Host "Conformidade: $compliancePercentage%" -ForegroundColor $(if ($compliancePercentage -ge 80) { "Green" } elseif ($compliancePercentage -ge 60) { "Yellow" } else { "Red" })
    
    if ($Violations.Count -gt 0) {
        Write-Host "`nVIOLACOES ENCONTRADAS ($($Violations.Count)):" -ForegroundColor Red
        
        $groupedViolations = $Violations | Group-Object Category
        foreach ($group in $groupedViolations) {
            Write-Host "`n$($group.Name):" -ForegroundColor Yellow
            foreach ($violation in $group.Group) {
                Write-Host "  • $($violation.Issue)" -ForegroundColor Red
                if ($violation.File) {
                    Write-Host "    Arquivo: $($violation.File)" -ForegroundColor Gray
                }
                if ($violation.Recommendation) {
                    Write-Host "    Recomendacao: $($violation.Recommendation)" -ForegroundColor Cyan
                }
            }
        }
        
        # Gerar relatorio detalhado
        $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
        $reportFile = "compliance-report-focus-$timestamp.json"
        $report = @{
            Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            ProjectRoot = $ProjectRoot
            ComplianceScore = $ComplianceScore
            TotalChecks = $TotalChecks
            CompliancePercentage = $compliancePercentage
            Violations = $Violations
            IgnoredPaths = $IgnorePaths
            Architecture = "Frontend (HTML+JS) + Backend (React+TypeScript)"
        }
        
        $report | ConvertTo-Json -Depth 10 | Out-File $reportFile -Encoding UTF8
        Write-Host "`nRelatorio detalhado salvo em: $reportFile" -ForegroundColor Cyan
    } else {
        Write-Host "`nNENHUMA VIOLACAO ENCONTRADA!" -ForegroundColor Green
        Write-Host "O projeto esta em conformidade com todas as regras e boas praticas." -ForegroundColor Green
    }
    
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "Verificacao de conformidade focada concluida" -ForegroundColor Green
}

# Executar verificacao
Start-ComplianceCheck
