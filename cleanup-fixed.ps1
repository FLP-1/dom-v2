# Cleanup Fixed - DOM v2
# Sistema de limpeza seguro com tratamento de erros melhorado

param(
    [switch]$AnalyzeOnly,
    [switch]$MoveToTemp,
    [switch]$ListObsolete
)

# Configuracoes
$ProjectRoot = Get-Location
$TempDir = "temp-obsolete-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Host "LIMPEZA SEGURA DO PROJETO - DOM v2" -ForegroundColor Magenta
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
Write-Host "Diretorio temporario: $TempDir" -ForegroundColor Gray
Write-Host "=" * 60 -ForegroundColor Gray

# Criar diretorio temporario
if (-not (Test-Path -Path $TempDir)) {
    New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
    Write-Host "Diretorio temporario criado: $TempDir" -ForegroundColor Green
}

# Lista de diretorios obsoletos para mover
$obsoleteDirs = @(
    "backup-react-legacy",
    "legacy", 
    "trash-temp",
    "cache",
    "DOMv2Android"
)

$movedCount = 0
$errorCount = 0

foreach ($dir in $obsoleteDirs) {
    $sourcePath = Join-Path -Path $ProjectRoot -ChildPath $dir
    $destPath = Join-Path -Path $TempDir -ChildPath $dir
    
    if (Test-Path -Path $sourcePath) {
        try {
            Write-Host "Movendo: $dir" -ForegroundColor Yellow
            Move-Item -Path $sourcePath -Destination $destPath -Force
            Write-Host "   Movido com sucesso: $dir" -ForegroundColor Green
            $movedCount++
        }
        catch {
            Write-Host "   Erro ao mover: $dir - $($_.Exception.Message)" -ForegroundColor Red
            $errorCount++
        }
    }
    else {
        Write-Host "   Diretorio nao encontrado: $dir" -ForegroundColor Gray
    }
}

Write-Host "`nRESUMO DA LIMPEZA:" -ForegroundColor Cyan
Write-Host "   Diretorios movidos: $movedCount" -ForegroundColor Green
Write-Host "   Erros: $errorCount" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Green" })
Write-Host "   Diretorio temporario: $TempDir" -ForegroundColor Yellow

if ($movedCount -gt 0) {
    Write-Host "`nIMPORTANTE: Revise o conteudo de $TempDir antes de apagar!" -ForegroundColor Yellow
}

Write-Host "`n" + "=" * 60 -ForegroundColor Gray
Write-Host "Limpeza concluida" -ForegroundColor Green
