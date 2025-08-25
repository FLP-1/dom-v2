# 🔄 SCRIPT DE ISOLAMENTO DE DESENVOLVIMENTOS OBSOLETOS - DOM v2
# Data: 25/01/2025
# Versão: 1.0.0

Write-Host "🚀 ISOLAMENTO DE DESENVOLVIMENTOS OBSOLETOS - DOM v2" -ForegroundColor Cyan
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend/public")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

# Criar estrutura de isolamento
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$LegacyDir = "legacy/obsolete-development-$Timestamp"

Write-Host "📁 Criando diretório de isolamento: $LegacyDir" -ForegroundColor Yellow
New-Item -ItemType Directory -Path $LegacyDir -Force | Out-Null

# Estrutura de subdiretórios
$SubDirs = @(
    "react-attempts",
    "corrupted-frontend", 
    "failed-scripts",
    "backup-archives",
    "metro-bundler-attempts",
    "webpack-attempts",
    "fix-scripts"
)

foreach ($dir in $SubDirs) {
    New-Item -ItemType Directory -Path "$LegacyDir/$dir" -Force | Out-Null
    Write-Host "✅ Criado: $dir" -ForegroundColor Green
}

# Itens para isolar
$ObsoleteItems = @(
    @{Source="DOMv2Android"; Target="react-attempts"; Description="Tentativas React Native"},
    @{Source="frontend/public/*.backup*"; Target="backup-archives"; Description="Arquivos de backup"},
    @{Source="frontend/public/*.css-prefix-backup*"; Target="backup-archives"; Description="Backups CSS"},
    @{Source="frontend/public/*.final-backup*"; Target="backup-archives"; Description="Backups finais"},
    @{Source="frontend/public/*.targeted-backup*"; Target="backup-archives"; Description="Backups direcionados"},
    @{Source="frontend/public/*.specific-backup*"; Target="backup-archives"; Description="Backups específicos"},
    @{Source="fix-*.ps1"; Target="failed-scripts"; Description="Scripts de correção"},
    @{Source="restore-*.ps1"; Target="failed-scripts"; Description="Scripts de restauração"},
    @{Source="rewrite-*.ps1"; Target="failed-scripts"; Description="Scripts de reescrita"},
    @{Source="start-dom-v2-*.ps1"; Target="failed-scripts"; Description="Scripts de inicialização"},
    @{Source="*.webpack.*"; Target="webpack-attempts"; Description="Configurações Webpack"},
    @{Source="*.metro.*"; Target="metro-bundler-attempts"; Description="Configurações Metro"},
    @{Source="server-web*.js"; Target="failed-scripts"; Description="Servidores web extras"}
)

$IsolatedCount = 0
$FailedCount = 0

Write-Host ""
Write-Host "🔄 Isolando itens obsoletos..." -ForegroundColor Yellow

foreach ($item in $ObsoleteItems) {
    $source = $item.Source
    $target = "$LegacyDir/$($item.Target)"
    $description = $item.Description
    
    # Encontrar arquivos que correspondem ao padrão
    $matchingItems = Get-ChildItem -Path $source -ErrorAction SilentlyContinue
    
    if ($matchingItems) {
        foreach ($match in $matchingItems) {
            try {
                $targetPath = Join-Path $target $match.Name
                Move-Item $match.FullName $targetPath -Force
                Write-Host "✅ Isolado: $($match.Name) -> $($item.Target)" -ForegroundColor Green
                $IsolatedCount++
            } catch {
                Write-Host "❌ Erro ao isolar $($match.Name): $($_.Exception.Message)" -ForegroundColor Red
                $FailedCount++
            }
        }
    } else {
        Write-Host "⚠️ Nenhum item encontrado para: $source" -ForegroundColor Yellow
    }
}

# Mover diretórios específicos
$DirectoriesToMove = @(
    @{Source="backups"; Target="backup-archives"; Description="Diretório de backups"},
    @{Source="trash-temp"; Target="backup-archives"; Description="Lixeira temporária"}
)

foreach ($dir in $DirectoriesToMove) {
    if (Test-Path $dir.Source) {
        try {
            $targetPath = Join-Path $LegacyDir $dir.Target $dir.Source
            Move-Item $dir.Source $targetPath -Force
            Write-Host "✅ Isolado: $($dir.Source) -> $($dir.Target)" -ForegroundColor Green
            $IsolatedCount++
        } catch {
            Write-Host "❌ Erro ao isolar $($dir.Source): $($_.Exception.Message)" -ForegroundColor Red
            $FailedCount++
        }
    }
}

# Criar arquivo de inventário
$InventoryFile = "$LegacyDir/inventory.md"
$InventoryContent = @"
# Inventario de Itens Isolados - DOM v2

**Data de Isolamento:** $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')
**Diretorio:** $LegacyDir

## Estatisticas
- **Itens isolados:** $IsolatedCount
- **Falhas:** $FailedCount
- **Total processado:** $($IsolatedCount + $FailedCount)

## Estrutura de Isolamento

### React Attempts
- Tentativas de implementacao React/React Native
- Codigo nao utilizado

### Corrupted Frontend  
- Frontend com problemas de encoding
- Arquivos corrompidos por scripts automaticos

### Failed Scripts
- Scripts de correcao que falharam
- Scripts de restauracao problematicos

### Backup Archives
- Backups automaticos gerados
- Versoes antigas do projeto

### Metro Bundler Attempts
- Configuracoes Metro Bundler
- Tentativas de bundling

### Webpack Attempts  
- Configuracoes Webpack
- Tentativas de bundling

## Justificativa do Isolamento

Estes itens foram isolados para:
1. **Limpar o projeto ativo**
2. **Preservar historico para analise**
3. **Evitar interferencia no novo desenvolvimento**
4. **Manter backup de seguranca**

## Proximos Passos

1. **Verificar isolamento completo**
2. **Iniciar novo desenvolvimento limpo**
3. **Implementar sistema de qualidade**
4. **Desenvolver frontend HTML nativo**

---
*Inventario gerado automaticamente*
"@

Set-Content -Path $InventoryFile -Value $InventoryContent -Encoding UTF8

# Criar script de limpeza futura
$CleanupScript = "$LegacyDir/cleanup-legacy.ps1"
$CleanupContent = @"
# Script de Limpeza de Legacy - DOM v2
# ATENCAO: Este script remove permanentemente os itens isolados

param([switch]`$Confirm)

if (-not `$Confirm) {
    Write-Host "ATENCAO: Este script remove permanentemente os itens isolados!" -ForegroundColor Red
    Write-Host "Execute com -Confirm para prosseguir" -ForegroundColor Yellow
    exit 1
}

Write-Host "Removendo itens legacy..." -ForegroundColor Yellow

# Remover diretorio legacy
`$LegacyDir = Split-Path `$PSScriptRoot -Parent
Remove-Item `$LegacyDir -Recurse -Force

Write-Host "Limpeza concluida!" -ForegroundColor Green
"@

Set-Content -Path $CleanupScript -Value $CleanupContent -Encoding UTF8

# Resumo final
Write-Host ""
Write-Host "📊 RESUMO DO ISOLAMENTO" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host "✅ Itens isolados: $IsolatedCount" -ForegroundColor Green
Write-Host "❌ Falhas: $FailedCount" -ForegroundColor Red
Write-Host "📁 Diretório: $LegacyDir" -ForegroundColor Cyan
Write-Host "📋 Inventário: $InventoryFile" -ForegroundColor Cyan
Write-Host "🗑️ Script de limpeza: $CleanupScript" -ForegroundColor Cyan

Write-Host ""
Write-Host "🎉 ISOLAMENTO CONCLUÍDO!" -ForegroundColor Green
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Verificar estrutura limpa" -ForegroundColor Cyan
Write-Host "   2. Executar setup-clean-environment.ps1" -ForegroundColor Cyan
Write-Host "   3. Iniciar novo desenvolvimento" -ForegroundColor Cyan
