# 🔍 SCRIPT DE VERIFICAÇÃO DE COMPLIANCE - DOM v2
# Data: 25/01/2025
# Versão: 1.0.0

param(
    [switch]$ArchitectureOnly,
    [switch]$CriticalThinkingOnly,
    [switch]$FullCheck
)

Write-Host "🔍 VERIFICAÇÃO DE COMPLIANCE - DOM v2" -ForegroundColor Cyan
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend/public")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

# Função de verificação arquitetural
function Test-Architecture-Compliance {
    Write-Host "🏗️ Verificando compliance arquitetural..." -ForegroundColor Yellow
    
    $Violations = @()
    $CompliantFiles = @()
    
    # Verificar arquivos HTML
    $HtmlFiles = Get-ChildItem "frontend/public/*.html" -Recurse -ErrorAction SilentlyContinue
    $HtmlFiles += Get-ChildItem "frontend/components/*.html" -Recurse -ErrorAction SilentlyContinue
    
    foreach ($file in $HtmlFiles) {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        
        if ($content) {
            $fileViolations = @()
            
            # Verificar violações arquiteturais
            if ($content -match "React|react") {
                $fileViolations += "React detectado"
            }
            
            if ($content -match "Vue|vue") {
                $fileViolations += "Vue detectado"
            }
            
            if ($content -match "Angular|angular") {
                $fileViolations += "Angular detectado"
            }
            
            if ($content -match "useState|useEffect|useContext") {
                $fileViolations += "Hooks React detectados"
            }
            
            if ($content -match "import.*from.*react") {
                $fileViolations += "Import React detectado"
            }
            
            if ($fileViolations.Count -gt 0) {
                $Violations += @{
                    File = $file.Name
                    Path = $file.FullName
                    Violations = $fileViolations
                    Type = "Arquitetural"
                }
            } else {
                $CompliantFiles += $file.Name
            }
        }
    }
    
    # Verificar arquivos JavaScript
    $JsFiles = Get-ChildItem "frontend/js/*.js" -Recurse -ErrorAction SilentlyContinue
    
    foreach ($file in $JsFiles) {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        
        if ($content) {
            $fileViolations = @()
            
            # Verificar violações JavaScript
            if ($content -match "import.*from.*react") {
                $fileViolations += "Import React detectado"
            }
            
            if ($content -match "React\.") {
                $fileViolations += "React API detectada"
            }
            
            if ($content -match "createElement|createRoot") {
                $fileViolations += "React DOM detectado"
            }
            
            if ($fileViolations.Count -gt 0) {
                $Violations += @{
                    File = $file.Name
                    Path = $file.FullName
                    Violations = $fileViolations
                    Type = "JavaScript"
                }
            } else {
                $CompliantFiles += $file.Name
            }
        }
    }
    
    # Verificar arquivos CSS
    $CssFiles = Get-ChildItem "frontend/css/*.css" -Recurse -ErrorAction SilentlyContinue
    
    foreach ($file in $CssFiles) {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        
        if ($content) {
            $fileViolations = @()
            
            # Verificar violações CSS
            if ($content -match "styled-components|emotion|@emotion") {
                $fileViolations += "CSS-in-JS detectado"
            }
            
            if ($content -match "\.jsx|\.tsx") {
                $fileViolations += "Referência JSX/TSX detectada"
            }
            
            if ($fileViolations.Count -gt 0) {
                $Violations += @{
                    File = $file.Name
                    Path = $file.FullName
                    Violations = $fileViolations
                    Type = "CSS"
                }
            } else {
                $CompliantFiles += $file.Name
            }
        }
    }
    
    # Resultado da verificação arquitetural
    if ($Violations.Count -gt 0) {
        Write-Host "❌ VIOLAÇÕES ARQUITETURAIS DETECTADAS:" -ForegroundColor Red
        foreach ($violation in $Violations) {
            Write-Host "   📁 $($violation.File) ($($violation.Type))" -ForegroundColor Red
            foreach ($v in $violation.Violations) {
                Write-Host "      - $v" -ForegroundColor Red
            }
        }
        return $false
    } else {
        Write-Host "✅ Compliance arquitetural OK" -ForegroundColor Green
        Write-Host "   📊 Arquivos verificados: $($CompliantFiles.Count)" -ForegroundColor Green
        return $true
    }
}

# Função de verificação de pensamento crítico
function Test-Critical-Thinking-Compliance {
    Write-Host "🧠 Verificando compliance de pensamento crítico..." -ForegroundColor Yellow
    
    $MissingItems = @()
    $CompliantItems = @()
    
    # Verificar documentação de decisões
    $DecisionFiles = Get-ChildItem "docs/decisions/*.md" -ErrorAction SilentlyContinue
    
    if ($DecisionFiles.Count -eq 0) {
        $MissingItems += "Nenhuma decisão documentada encontrada"
    } else {
        $CompliantItems += "Decisões documentadas: $($DecisionFiles.Count) arquivos"
    }
    
    # Verificar arquivos de implementação
    $ImplementationFiles = Get-ChildItem "frontend/public/*.html" -Recurse -ErrorAction SilentlyContinue
    $ImplementationFiles += Get-ChildItem "frontend/js/*.js" -Recurse -ErrorAction SilentlyContinue
    
    $FilesWithoutDoc = 0
    $FilesWithDoc = 0
    
    foreach ($file in $ImplementationFiles) {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        
        if ($content) {
            # Verificar se tem documentação
            if ($content -match "@fileoverview|@description|@author") {
                $FilesWithDoc++
            } else {
                $FilesWithoutDoc++
                $MissingItems += "Arquivo sem documentação: $($file.Name)"
            }
        }
    }
    
    # Verificar checklist de implementação
    $ChecklistFiles = Get-ChildItem "docs/decisions/*checklist*" -ErrorAction SilentlyContinue
    
    if ($ChecklistFiles.Count -eq 0) {
        $MissingItems += "Nenhum checklist de implementação encontrado"
    } else {
        $CompliantItems += "Checklists de implementação: $($ChecklistFiles.Count) arquivos"
    }
    
    # Verificar análise de alternativas
    $AlternativeFiles = Get-ChildItem "docs/decisions/*alternativa*" -ErrorAction SilentlyContinue
    $AlternativeFiles += Get-ChildItem "docs/decisions/*alternative*" -ErrorAction SilentlyContinue
    
    if ($AlternativeFiles.Count -eq 0) {
        $MissingItems += "Nenhuma análise de alternativas documentada"
    } else {
        $CompliantItems += "Análises de alternativas: $($AlternativeFiles.Count) arquivos"
    }
    
    # Resultado da verificação de pensamento crítico
    if ($MissingItems.Count -gt 0) {
        Write-Host "⚠️ ITENS DE PENSAMENTO CRÍTICO FALTANDO:" -ForegroundColor Yellow
        foreach ($item in $MissingItems) {
            Write-Host "   - $item" -ForegroundColor Yellow
        }
        
        if ($CompliantItems.Count -gt 0) {
            Write-Host "✅ Itens em compliance:" -ForegroundColor Green
            foreach ($item in $CompliantItems) {
                Write-Host "   - $item" -ForegroundColor Green
            }
        }
        
        return $false
    } else {
        Write-Host "✅ Compliance de pensamento crítico OK" -ForegroundColor Green
        foreach ($item in $CompliantItems) {
            Write-Host "   - $item" -ForegroundColor Green
        }
        return $true
    }
}

# Função de verificação de comandos PowerShell
function Test-Command-Compliance {
    Write-Host "⚡ Verificando compliance de comandos PowerShell..." -ForegroundColor Yellow
    
    $Violations = @()
    $CompliantCommands = @()
    
    # Verificar scripts PowerShell
    $PsScripts = Get-ChildItem "*.ps1" -Recurse -ErrorAction SilentlyContinue
    $PsScripts += Get-ChildItem "scripts/*.ps1" -Recurse -ErrorAction SilentlyContinue
    
    foreach ($script in $PsScripts) {
        $content = Get-Content $script.FullName -Raw -ErrorAction SilentlyContinue
        
        if ($content) {
            $scriptViolations = @()
            
            # Verificar comandos problemáticos
            if ($content -match "npm install" -and $content -notmatch "Set-Location") {
                $scriptViolations += "Comando npm sem diretório especificado"
            }
            
            if ($content -match "cd " -and $content -notmatch "Set-Location") {
                $scriptViolations += "Comando cd em vez de Set-Location"
            }
            
            if ($content -match "git " -and $content -notmatch "WorkingDirectory") {
                $scriptViolations += "Comando git sem diretório especificado"
            }
            
            if ($scriptViolations.Count -gt 0) {
                $Violations += @{
                    File = $script.Name
                    Path = $script.FullName
                    Violations = $scriptViolations
                }
            } else {
                $CompliantCommands += $script.Name
            }
        }
    }
    
    # Resultado da verificação de comandos
    if ($Violations.Count -gt 0) {
        Write-Host "❌ VIOLAÇÕES DE COMANDOS DETECTADAS:" -ForegroundColor Red
        foreach ($violation in $Violations) {
            Write-Host "   📁 $($violation.File)" -ForegroundColor Red
            foreach ($v in $violation.Violations) {
                Write-Host "      - $v" -ForegroundColor Red
            }
        }
        return $false
    } else {
        Write-Host "✅ Compliance de comandos OK" -ForegroundColor Green
        Write-Host "   📊 Scripts verificados: $($CompliantCommands.Count)" -ForegroundColor Green
        return $true
    }
}

# Função de verificação de estrutura
function Test-Structure-Compliance {
    Write-Host "📁 Verificando compliance de estrutura..." -ForegroundColor Yellow
    
    $RequiredDirs = @(
        "frontend/public",
        "frontend/css", 
        "frontend/js",
        "frontend/components",
        "docs/decisions",
        "docs/architecture",
        "scripts/quality"
    )
    
    $MissingDirs = @()
    $ExistingDirs = @()
    
    foreach ($dir in $RequiredDirs) {
        if (Test-Path $dir) {
            $ExistingDirs += $dir
        } else {
            $MissingDirs += $dir
        }
    }
    
    # Resultado da verificação de estrutura
    if ($MissingDirs.Count -gt 0) {
        Write-Host "❌ DIRETÓRIOS OBRIGATÓRIOS FALTANDO:" -ForegroundColor Red
        foreach ($dir in $MissingDirs) {
            Write-Host "   - $dir" -ForegroundColor Red
        }
        return $false
    } else {
        Write-Host "✅ Compliance de estrutura OK" -ForegroundColor Green
        Write-Host "   📊 Diretórios verificados: $($ExistingDirs.Count)" -ForegroundColor Green
        return $true
    }
}

# Execução principal
$ArchitectureResult = $true
$CriticalThinkingResult = $true
$CommandResult = $true
$StructureResult = $true

if ($ArchitectureOnly) {
    $ArchitectureResult = Test-Architecture-Compliance
} elseif ($CriticalThinkingOnly) {
    $CriticalThinkingResult = Test-Critical-Thinking-Compliance
} elseif ($FullCheck) {
    $ArchitectureResult = Test-Architecture-Compliance
    $CriticalThinkingResult = Test-Critical-Thinking-Compliance
    $CommandResult = Test-Command-Compliance
    $StructureResult = Test-Structure-Compliance
} else {
    # Verificação padrão
    $ArchitectureResult = Test-Architecture-Compliance
    $CriticalThinkingResult = Test-Critical-Thinking-Compliance
    $CommandResult = Test-Command-Compliance
    $StructureResult = Test-Structure-Compliance
}

# Resumo final
Write-Host ""
Write-Host "📊 RESUMO DA VERIFICAÇÃO DE COMPLIANCE" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$AllPassed = $ArchitectureResult -and $CriticalThinkingResult -and $CommandResult -and $StructureResult

if ($ArchitectureResult) {
    Write-Host "✅ Arquitetura: COMPLIANT" -ForegroundColor Green
} else {
    Write-Host "❌ Arquitetura: VIOLAÇÕES DETECTADAS" -ForegroundColor Red
}

if ($CriticalThinkingResult) {
    Write-Host "✅ Pensamento Crítico: COMPLIANT" -ForegroundColor Green
} else {
    Write-Host "⚠️ Pensamento Crítico: ITENS FALTANDO" -ForegroundColor Yellow
}

if ($CommandResult) {
    Write-Host "✅ Comandos PowerShell: COMPLIANT" -ForegroundColor Green
} else {
    Write-Host "❌ Comandos PowerShell: VIOLAÇÕES DETECTADAS" -ForegroundColor Red
}

if ($StructureResult) {
    Write-Host "✅ Estrutura: COMPLIANT" -ForegroundColor Green
} else {
    Write-Host "❌ Estrutura: DIRETÓRIOS FALTANDO" -ForegroundColor Red
}

Write-Host ""
if ($AllPassed) {
    Write-Host "🎉 VERIFICAÇÃO DE COMPLIANCE: APROVADA!" -ForegroundColor Green
    Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
    Write-Host "   1. Continuar desenvolvimento" -ForegroundColor Cyan
    Write-Host "   2. Manter compliance" -ForegroundColor Cyan
    Write-Host "   3. Documentar decisões" -ForegroundColor Cyan
} else {
    Write-Host "❌ VERIFICAÇÃO DE COMPLIANCE: REPROVADA!" -ForegroundColor Red
    Write-Host "📋 Ações necessárias:" -ForegroundColor Cyan
    Write-Host "   1. Corrigir violações arquiteturais" -ForegroundColor Cyan
    Write-Host "   2. Documentar decisões faltantes" -ForegroundColor Cyan
    Write-Host "   3. Corrigir comandos PowerShell" -ForegroundColor Cyan
    Write-Host "   4. Criar estrutura faltante" -ForegroundColor Cyan
    exit 1
}
