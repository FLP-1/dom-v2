# 📋 SCRIPT DE CHECKLIST PRÉ-IMPLEMENTAÇÃO - DOM v2
# Data: 25/01/2025
# Versão: 1.0.0

param(
    [Parameter(Mandatory=$true)]
    [string]$FeatureName,
    [switch]$SkipInteractive,
    [switch]$GenerateReport
)

Write-Host "📋 CHECKLIST PRÉ-IMPLEMENTAÇÃO - DOM v2" -ForegroundColor Cyan
Write-Host "Funcionalidade: $FeatureName" -ForegroundColor Cyan
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend/public")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

# Checklist obrigatório
$Checklist = @(
    @{Item="Arquitetura HTML nativo"; Status=$false; Category="Arquitetural"},
    @{Item="Simplicidade da solução"; Status=$false; Category="Arquitetural"},
    @{Item="MVP essencial"; Status=$false; Category="Arquitetural"},
    @{Item="Padrões estabelecidos"; Status=$false; Category="Arquitetural"},
    @{Item="Suposições identificadas"; Status=$false; Category="Crítico"},
    @{Item="Alternativas consideradas"; Status=$false; Category="Crítico"},
    @{Item="Evidências documentadas"; Status=$false; Category="Crítico"},
    @{Item="Viéses identificados"; Status=$false; Category="Crítico"},
    @{Item="Performance validada"; Status=$false; Category="Técnico"},
    @{Item="Manutenibilidade garantida"; Status=$false; Category="Técnico"},
    @{Item="Escalabilidade considerada"; Status=$false; Category="Técnico"},
    @{Item="Segurança implementada"; Status=$false; Category="Técnico"},
    @{Item="Decisões documentadas"; Status=$false; Category="Documentação"},
    @{Item="Justificativas explicadas"; Status=$false; Category="Documentação"},
    @{Item="Riscos identificados"; Status=$false; Category="Documentação"}
)

# Função para exibir item do checklist
function Show-ChecklistItem {
    param([hashtable]$item, [int]$index, [int]$total)
    
    $categoryColor = switch ($item.Category) {
        "Arquitetural" { "Blue" }
        "Crítico" { "Red" }
        "Técnico" { "Yellow" }
        "Documentação" { "Green" }
        default { "White" }
    }
    
    Write-Host "   [$index/$total] [$($item.Category)] $($item.Item)" -ForegroundColor $categoryColor
}

# Função para validar resposta
function Test-Response {
    param([string]$response)
    
    $validResponses = @("s", "S", "y", "Y", "sim", "SIM", "yes", "YES", "1", "true", "TRUE")
    return $validResponses -contains $response
}

# Função para obter resposta do usuário
function Get-UserResponse {
    param([string]$question)
    
    if ($SkipInteractive) {
        return "s"  # Default para modo não interativo
    }
    
    $response = Read-Host $question
    return $response
}

# Executar checklist
Write-Host "🧠 APLICANDO PENSAMENTO CRÍTICO..." -ForegroundColor Yellow
Write-Host ""

$PassedChecks = 0
$TotalChecks = $Checklist.Count

for ($i = 0; $i -lt $Checklist.Count; $i++) {
    $item = $Checklist[$i]
    
    Show-ChecklistItem $item ($i + 1) $TotalChecks
    
    $question = "✅ $($item.Item)? (s/N)"
    $response = Get-UserResponse $question
    
    if (Test-Response $response) {
        $item.Status = $true
        $PassedChecks++
        Write-Host "      ✅ Confirmado" -ForegroundColor Green
    } else {
        $item.Status = $false
        Write-Host "      ❌ Negado" -ForegroundColor Red
        
        # Solicitar justificativa para itens negados
        if (-not $SkipInteractive) {
            $justification = Read-Host "      📝 Justificativa (opcional)"
            if ($justification) {
                $item.Justification = $justification
            }
        }
    }
    
    Write-Host ""
}

# Análise por categoria
$CategoryAnalysis = @{}
foreach ($item in $Checklist) {
    if (-not $CategoryAnalysis.ContainsKey($item.Category)) {
        $CategoryAnalysis[$item.Category] = @{Total=0; Passed=0}
    }
    $CategoryAnalysis[$item.Category].Total++
    if ($item.Status) {
        $CategoryAnalysis[$item.Category].Passed++
    }
}

# Resultado final
Write-Host "📊 RESULTADO DO CHECKLIST" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Análise por categoria
foreach ($category in $CategoryAnalysis.Keys) {
    $stats = $CategoryAnalysis[$category]
    $percentage = [math]::Round(($stats.Passed / $stats.Total) * 100, 1)
    
    $color = if ($percentage -eq 100) { "Green" } elseif ($percentage -ge 80) { "Yellow" } else { "Red" }
    
    Write-Host "$category`: $($stats.Passed)/$($stats.Total) ($percentage%)" -ForegroundColor $color
}

Write-Host ""
Write-Host "Total: $PassedChecks/$TotalChecks ([math]::Round(($PassedChecks / $TotalChecks) * 100, 1)%)" -ForegroundColor Cyan

# Determinar aprovação
$ApprovalThreshold = 0.8  # 80%
$ApprovalScore = $PassedChecks / $TotalChecks

# Verificar itens críticos
$CriticalItems = $Checklist | Where-Object {$_.Category -eq "Crítico"}
$CriticalPassed = ($CriticalItems | Where-Object {$_.Status -eq $true}).Count
$CriticalTotal = $CriticalItems.Count

$CriticalApproved = $CriticalPassed -eq $CriticalTotal

# Resultado final
Write-Host ""
if ($ApprovalScore -ge $ApprovalThreshold -and $CriticalApproved) {
    Write-Host "🎉 CHECKLIST: APROVADO!" -ForegroundColor Green
    Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
    Write-Host "   1. Implementar funcionalidade" -ForegroundColor Cyan
    Write-Host "   2. Seguir padrões estabelecidos" -ForegroundColor Cyan
    Write-Host "   3. Documentar implementação" -ForegroundColor Cyan
    
    # Gerar relatório se solicitado
    if ($GenerateReport) {
        Generate-Implementation-Report
    }
    
    exit 0
} else {
    Write-Host "❌ CHECKLIST: REPROVADO!" -ForegroundColor Red
    
    if ($ApprovalScore -lt $ApprovalThreshold) {
        Write-Host "   ❌ Score insuficiente: $([math]::Round($ApprovalScore * 100, 1))% < 80%" -ForegroundColor Red
    }
    
    if (-not $CriticalApproved) {
        Write-Host "   ❌ Itens críticos não aprovados: $CriticalPassed/$CriticalTotal" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "📋 Ações necessárias:" -ForegroundColor Cyan
    
    # Listar itens negados
    $FailedItems = $Checklist | Where-Object {$_.Status -eq $false}
    foreach ($item in $FailedItems) {
        Write-Host "   - $($item.Item)" -ForegroundColor Yellow
        if ($item.Justification) {
            Write-Host "     Justificativa: $($item.Justification)" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "🔄 Execute novamente após corrigir os itens negados" -ForegroundColor Cyan
    
    exit 1
}

# Função para gerar relatório de implementação
function Generate-Implementation-Report {
    $ReportFile = "docs/decisions/implementation-$FeatureName-$(Get-Date -Format 'yyyyMMdd_HHmmss').md"
    
    $ReportContent = @"
# 📋 Relatório de Implementação - $FeatureName

**Data:** $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')  
**Funcionalidade:** $FeatureName  
**Status:** ✅ APROVADA  
**Score:** $([math]::Round($ApprovalScore * 100, 1))%

## 📊 Resultado do Checklist

### Análise por Categoria

"@

    foreach ($category in $CategoryAnalysis.Keys) {
        $stats = $CategoryAnalysis[$category]
        $percentage = [math]::Round(($stats.Passed / $stats.Total) * 100, 1)
        $ReportContent += @"

#### $category
- **Aprovados:** $($stats.Passed)/$($stats.Total) ($percentage%)
"@
    }

    $ReportContent += @"

### Itens Aprovados
"@

    $ApprovedItems = $Checklist | Where-Object {$_.Status -eq $true}
    foreach ($item in $ApprovedItems) {
        $ReportContent += @"
- ✅ $($item.Item) [$($item.Category)]
"@
    }

    $ReportContent += @"

### Itens Negados
"@

    $FailedItems = $Checklist | Where-Object {$_.Status -eq $false}
    if ($FailedItems.Count -eq 0) {
        $ReportContent += @"
- Nenhum item negado
"@
    } else {
        foreach ($item in $FailedItems) {
            $ReportContent += @"
- ❌ $($item.Item) [$($item.Category)]
"@
            if ($item.Justification) {
                $ReportContent += @"
  - Justificativa: $($item.Justification)
"@
            }
        }
    }

    $ReportContent += @"

## 🎯 Decisão de Implementação

**APROVADA** - Checklist atende aos critérios mínimos de qualidade.

### Critérios Atendidos
- ✅ Score geral: $([math]::Round($ApprovalScore * 100, 1))% ≥ 80%
- ✅ Itens críticos: $CriticalPassed/$CriticalTotal aprovados

## 📋 Próximos Passos

1. **Implementar funcionalidade** seguindo padrões estabelecidos
2. **Documentar código** com comentários apropriados
3. **Testar implementação** antes de prosseguir
4. **Validar integração** com sistema existente

## 🔄 Revisão

Este relatório será revisado após a implementação da funcionalidade.

---
*Relatório gerado automaticamente pelo sistema de qualidade DOM v2*
"@

    Set-Content -Path $ReportFile -Value $ReportContent -Encoding UTF8
    Write-Host "📄 Relatório gerado: $ReportFile" -ForegroundColor Green
}
