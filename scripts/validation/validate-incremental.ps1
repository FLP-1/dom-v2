# 🧪 SCRIPT DE VALIDAÇÃO INCREMENTAL - DOM v2
# Data: 25/01/2025
# Versão: 1.0.0

param(
    [Parameter(Mandatory=$true)]
    [string]$ScreenName,
    [switch]$FullTest,
    [switch]$SkipBackend,
    [switch]$GenerateReport
)

Write-Host "🧪 VALIDAÇÃO INCREMENTAL - DOM v2" -ForegroundColor Cyan
Write-Host "Tela: $ScreenName" -ForegroundColor Cyan
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend/public")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

# Função de teste de carregamento
function Test-Screen-Loading {
    param([string]$screen)
    
    Write-Host "📄 Testando carregamento da tela: $screen" -ForegroundColor Yellow
    
    $screenFile = "frontend/public/$screen.html"
    
    if (-not (Test-Path $screenFile)) {
        Write-Host "   ❌ Arquivo não encontrado: $screenFile" -ForegroundColor Red
        return @{Status=$false; Message="Arquivo não encontrado"}
    }
    
    try {
        $content = Get-Content $screenFile -Raw -ErrorAction Stop
        $fileSize = (Get-Item $screenFile).Length
        
        if ($fileSize -eq 0) {
            Write-Host "   ❌ Arquivo vazio: $screenFile" -ForegroundColor Red
            return @{Status=$false; Message="Arquivo vazio"}
        }
        
        if (-not ($content -match "<!DOCTYPE html")) {
            Write-Host "   ⚠️ Estrutura HTML inválida" -ForegroundColor Yellow
            return @{Status=$false; Message="Estrutura HTML inválida"}
        }
        
        Write-Host "   ✅ Carregamento OK ($([math]::Round($fileSize / 1KB, 2)) KB)" -ForegroundColor Green
        return @{Status=$true; Message="Carregamento OK"; Size=$fileSize}
        
    } catch {
        Write-Host "   ❌ Erro ao carregar: $($_.Exception.Message)" -ForegroundColor Red
        return @{Status=$false; Message=$_.Exception.Message}
    }
}

# Função de teste de navegação
function Test-Navigation-From-Screen {
    param([string]$screen)
    
    Write-Host "🧭 Testando navegação da tela: $screen" -ForegroundColor Yellow
    
    $screenFile = "frontend/public/$screen.html"
    
    if (-not (Test-Path $screenFile)) {
        Write-Host "   ❌ Arquivo não encontrado" -ForegroundColor Red
        return @{Status=$false; Message="Arquivo não encontrado"}
    }
    
    try {
        $content = Get-Content $screenFile -Raw -ErrorAction Stop
        
        # Verificar links de navegação
        $links = [regex]::Matches($content, 'href="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
        $validLinks = @()
        $invalidLinks = @()
        
        foreach ($link in $links) {
            if ($link.StartsWith("#") -or $link.StartsWith("http")) {
                $validLinks += $link
            } elseif ($link.EndsWith(".html")) {
                $targetFile = "frontend/public/$link"
                if (Test-Path $targetFile) {
                    $validLinks += $link
                } else {
                    $invalidLinks += $link
                }
            } else {
                $validLinks += $link
            }
        }
        
        if ($invalidLinks.Count -gt 0) {
            Write-Host "   ⚠️ Links inválidos encontrados:" -ForegroundColor Yellow
            foreach ($link in $invalidLinks) {
                Write-Host "      - $link" -ForegroundColor Yellow
            }
            return @{Status=$false; Message="Links inválidos"; InvalidLinks=$invalidLinks}
        }
        
        Write-Host "   ✅ Navegação OK ($($validLinks.Count) links válidos)" -ForegroundColor Green
        return @{Status=$true; Message="Navegação OK"; ValidLinks=$validLinks.Count}
        
    } catch {
        Write-Host "   ❌ Erro ao testar navegação: $($_.Exception.Message)" -ForegroundColor Red
        return @{Status=$false; Message=$_.Exception.Message}
    }
}

# Função de teste de backend
function Test-Backend-Integration {
    param([string]$screen)
    
    if ($SkipBackend) {
        Write-Host "⏭️ Teste de backend pulado" -ForegroundColor Yellow
        return @{Status=$true; Message="Teste pulado"}
    }
    
    Write-Host "🔗 Testando integração com backend: $screen" -ForegroundColor Yellow
    
    try {
        # Testar se o backend está rodando
        $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "   ✅ Backend respondendo" -ForegroundColor Green
            
            # Verificar se a tela tem integração com API
            $screenFile = "frontend/public/$screen.html"
            if (Test-Path $screenFile) {
                $content = Get-Content $screenFile -Raw -ErrorAction Stop
                
                if ($content -match "fetch|XMLHttpRequest|axios") {
                    Write-Host "   ✅ Integração API detectada" -ForegroundColor Green
                    return @{Status=$true; Message="Backend OK + API detectada"}
                } else {
                    Write-Host "   ⚠️ Nenhuma integração API detectada" -ForegroundColor Yellow
                    return @{Status=$true; Message="Backend OK, sem API"}
                }
            }
            
            return @{Status=$true; Message="Backend OK"}
        } else {
            Write-Host "   ❌ Backend com erro: $($response.StatusCode)" -ForegroundColor Red
            return @{Status=$false; Message="Backend com erro"}
        }
        
    } catch {
        Write-Host "   ❌ Backend não respondendo: $($_.Exception.Message)" -ForegroundColor Red
        return @{Status=$false; Message="Backend não respondendo"}
    }
}

# Função de teste de responsividade
function Test-Responsiveness {
    param([string]$screen)
    
    Write-Host "📱 Testando responsividade da tela: $screen" -ForegroundColor Yellow
    
    $screenFile = "frontend/public/$screen.html"
    
    if (-not (Test-Path $screenFile)) {
        Write-Host "   ❌ Arquivo não encontrado" -ForegroundColor Red
        return @{Status=$false; Message="Arquivo não encontrado"}
    }
    
    try {
        $content = Get-Content $screenFile -Raw -ErrorAction Stop
        
        $responsiveFeatures = @{
            Viewport = $content -match 'viewport.*width.*initial-scale'
            MediaQueries = $content -match '@media'
            Flexbox = $content -match 'display.*flex'
            Grid = $content -match 'display.*grid'
            ResponsiveImages = $content -match 'max-width.*100%'
        }
        
        $passedFeatures = ($responsiveFeatures.Values | Where-Object {$_ -eq $true}).Count
        $totalFeatures = $responsiveFeatures.Count
        
        if ($passedFeatures -ge 3) {
            Write-Host "   ✅ Responsividade OK ($passedFeatures/$totalFeatures features)" -ForegroundColor Green
            return @{Status=$true; Message="Responsividade OK"; Score="$passedFeatures/$totalFeatures"}
        } else {
            Write-Host "   ⚠️ Responsividade limitada ($passedFeatures/$totalFeatures features)" -ForegroundColor Yellow
            return @{Status=$false; Message="Responsividade limitada"; Score="$passedFeatures/$totalFeatures"}
        }
        
    } catch {
        Write-Host "   ❌ Erro ao testar responsividade: $($_.Exception.Message)" -ForegroundColor Red
        return @{Status=$false; Message=$_.Exception.Message}
    }
}

# Função de teste de acessibilidade
function Test-Accessibility {
    param([string]$screen)
    
    Write-Host "♿ Testando acessibilidade da tela: $screen" -ForegroundColor Yellow
    
    $screenFile = "frontend/public/$screen.html"
    
    if (-not (Test-Path $screenFile)) {
        Write-Host "   ❌ Arquivo não encontrado" -ForegroundColor Red
        return @{Status=$false; Message="Arquivo não encontrado"}
    }
    
    try {
        $content = Get-Content $screenFile -Raw -ErrorAction Stop
        
        $accessibilityFeatures = @{
            LangAttribute = $content -match 'lang="pt-BR"'
            AltAttributes = $content -match 'alt="'
            ARIA = $content -match 'aria-'
            SemanticHTML = $content -match '<(header|nav|main|section|article|aside|footer)'
            FormLabels = $content -match '<label'
            ButtonTypes = $content -match 'type="(button|submit|reset)"'
        }
        
        $passedFeatures = ($accessibilityFeatures.Values | Where-Object {$_ -eq $true}).Count
        $totalFeatures = $accessibilityFeatures.Count
        
        if ($passedFeatures -ge 4) {
            Write-Host "   ✅ Acessibilidade OK ($passedFeatures/$totalFeatures features)" -ForegroundColor Green
            return @{Status=$true; Message="Acessibilidade OK"; Score="$passedFeatures/$totalFeatures"}
        } else {
            Write-Host "   ⚠️ Acessibilidade limitada ($passedFeatures/$totalFeatures features)" -ForegroundColor Yellow
            return @{Status=$false; Message="Acessibilidade limitada"; Score="$passedFeatures/$totalFeatures"}
        }
        
    } catch {
        Write-Host "   ❌ Erro ao testar acessibilidade: $($_.Exception.Message)" -ForegroundColor Red
        return @{Status=$false; Message=$_.Exception.Message}
    }
}

# Função de teste de performance
function Test-Performance {
    param([string]$screen)
    
    Write-Host "⚡ Testando performance da tela: $screen" -ForegroundColor Yellow
    
    $screenFile = "frontend/public/$screen.html"
    
    if (-not (Test-Path $screenFile)) {
        Write-Host "   ❌ Arquivo não encontrado" -ForegroundColor Red
        return @{Status=$false; Message="Arquivo não encontrado"}
    }
    
    try {
        $content = Get-Content $screenFile -Raw -ErrorAction Stop
        $fileSize = (Get-Item $screenFile).Length
        
        # Verificar otimizações
        $performanceFeatures = @{
            MinifiedCSS = $content -match '\.min\.css'
            MinifiedJS = $content -match '\.min\.js'
            AsyncScripts = $content -match 'async'
            DeferScripts = $content -match 'defer'
            OptimizedImages = $content -match '\.(webp|avif)'
        }
        
        $passedFeatures = ($performanceFeatures.Values | Where-Object {$_ -eq $true}).Count
        $totalFeatures = $performanceFeatures.Count
        
        # Verificar tamanho do arquivo
        $sizeOK = $fileSize -lt 100KB  # Menos de 100KB
        
        if ($sizeOK -and $passedFeatures -ge 2) {
            Write-Host "   ✅ Performance OK ($([math]::Round($fileSize / 1KB, 2)) KB, $passedFeatures/$totalFeatures features)" -ForegroundColor Green
            return @{Status=$true; Message="Performance OK"; Size="$([math]::Round($fileSize / 1KB, 2)) KB"; Score="$passedFeatures/$totalFeatures"}
        } else {
            Write-Host "   ⚠️ Performance limitada ($([math]::Round($fileSize / 1KB, 2)) KB, $passedFeatures/$totalFeatures features)" -ForegroundColor Yellow
            return @{Status=$false; Message="Performance limitada"; Size="$([math]::Round($fileSize / 1KB, 2)) KB"; Score="$passedFeatures/$totalFeatures"}
        }
        
    } catch {
        Write-Host "   ❌ Erro ao testar performance: $($_.Exception.Message)" -ForegroundColor Red
        return @{Status=$false; Message=$_.Exception.Message}
    }
}

# Executar testes
$TestResults = @{}

Write-Host "🧪 EXECUTANDO TESTES..." -ForegroundColor Yellow
Write-Host ""

# 1. Teste de carregamento
$TestResults.Loading = Test-Screen-Loading $ScreenName
Write-Host ""

# 2. Teste de navegação
$TestResults.Navigation = Test-Navigation-From-Screen $ScreenName
Write-Host ""

# 3. Teste de backend
$TestResults.Backend = Test-Backend-Integration $ScreenName
Write-Host ""

# 4. Teste de responsividade
$TestResults.Responsive = Test-Responsiveness $ScreenName
Write-Host ""

# 5. Teste de acessibilidade
$TestResults.Accessibility = Test-Accessibility $ScreenName
Write-Host ""

# 6. Teste de performance
$TestResults.Performance = Test-Performance $ScreenName
Write-Host ""

# Análise dos resultados
$PassedTests = ($TestResults.Values | Where-Object {$_.Status -eq $true}).Count
$TotalTests = $TestResults.Count
$SuccessRate = [math]::Round(($PassedTests / $TotalTests) * 100, 1)

Write-Host "📊 RESULTADO DOS TESTES" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

foreach ($test in $TestResults.Keys) {
    $result = $TestResults[$test]
    $status = if ($result.Status) { "✅" } else { "❌" }
    $color = if ($result.Status) { "Green" } else { "Red" }
    
    Write-Host "$status $test`: $($result.Message)" -ForegroundColor $color
}

Write-Host ""
Write-Host "Taxa de sucesso: $PassedTests/$TotalTests ($SuccessRate%)" -ForegroundColor Cyan

# Determinar aprovação
$ApprovalThreshold = 0.8  # 80%
$Approved = $SuccessRate -ge ($ApprovalThreshold * 100)

# Resultado final
Write-Host ""
if ($Approved) {
    Write-Host "🎉 VALIDAÇÃO: APROVADA!" -ForegroundColor Green
    Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
    Write-Host "   1. Continuar desenvolvimento" -ForegroundColor Cyan
    Write-Host "   2. Implementar próxima funcionalidade" -ForegroundColor Cyan
    Write-Host "   3. Manter qualidade" -ForegroundColor Cyan
    
    # Gerar relatório se solicitado
    if ($GenerateReport) {
        Generate-Validation-Report
    }
    
    exit 0
} else {
    Write-Host "❌ VALIDAÇÃO: REPROVADA!" -ForegroundColor Red
    Write-Host "📋 Ações necessárias:" -ForegroundColor Cyan
    
    foreach ($test in $TestResults.Keys) {
        $result = $TestResults[$test]
        if (-not $result.Status) {
            Write-Host "   - Corrigir $test`: $($result.Message)" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    Write-Host "🔄 Execute novamente após corrigir os problemas" -ForegroundColor Cyan
    
    exit 1
}

# Função para gerar relatório de validação
function Generate-Validation-Report {
    $ReportFile = "docs/validation/validation-$ScreenName-$(Get-Date -Format 'yyyyMMdd_HHmmss').md"
    
    $ReportContent = @"
# 🧪 Relatório de Validação - $ScreenName

**Data:** $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')  
**Tela:** $ScreenName  
**Status:** $(if ($Approved) { "✅ APROVADA" } else { "❌ REPROVADA" })  
**Taxa de Sucesso:** $SuccessRate%

## 📊 Resultados dos Testes

"@

    foreach ($test in $TestResults.Keys) {
        $result = $TestResults[$test]
        $status = if ($result.Status) { "✅" } else { "❌" }
        
        $ReportContent += @"

### $test
- **Status:** $status
- **Mensagem:** $($result.Message)
"@
        
        if ($result.Score) {
            $ReportContent += @"
- **Score:** $($result.Score)
"@
        }
        
        if ($result.Size) {
            $ReportContent += @"
- **Tamanho:** $($result.Size)
"@
        }
    }

    $ReportContent += @"

## 📈 Análise

### Pontos Positivos
"@

    $PositiveTests = $TestResults.Values | Where-Object {$_.Status -eq $true}
    foreach ($test in $PositiveTests) {
        $ReportContent += @"
- ✅ $($test.Message)
"@
    }

    $ReportContent += @"

### Pontos de Melhoria
"@

    $NegativeTests = $TestResults.Values | Where-Object {$_.Status -eq $false}
    if ($NegativeTests.Count -eq 0) {
        $ReportContent += @"
- Nenhum ponto de melhoria identificado
"@
    } else {
        foreach ($test in $NegativeTests) {
            $ReportContent += @"
- ❌ $($test.Message)
"@
        }
    }

    $ReportContent += @"

## 🎯 Recomendações

"@

    if ($Approved) {
        $ReportContent += @"
- ✅ Tela aprovada para produção
- 📋 Continuar desenvolvimento incremental
- 🔄 Manter padrões de qualidade
"@
    } else {
        $ReportContent += @"
- 🔧 Corrigir problemas identificados
- 🧪 Re-executar validação após correções
- 📋 Revisar padrões de implementação
"@
    }

    $ReportContent += @"

## 📋 Próximos Passos

1. **Implementar correções** (se necessário)
2. **Re-validar** após correções
3. **Prosseguir** para próxima funcionalidade
4. **Manter** padrões de qualidade

---
*Relatório gerado automaticamente pelo sistema de validação DOM v2*
"@

    Set-Content -Path $ReportFile -Value $ReportContent -Encoding UTF8
    Write-Host "📄 Relatório gerado: $ReportFile" -ForegroundColor Green
}
