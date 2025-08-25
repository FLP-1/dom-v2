# Project Cleaner Safe - DOM v2
# Sistema de limpeza seguro que move arquivos obsoletos para diretorio temporario

param(
    [switch]$AnalyzeOnly,
    [switch]$MoveToTemp,
    [switch]$ListObsolete,
    [switch]$CreateReport
)

# Configuracoes
$ProjectRoot = Get-Location
$TempDir = "temp-obsolete-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$AnalysisReport = "logs/cleanup-analysis-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"

# Diretorios e arquivos que devem ser mantidos
$RequiredStructure = @{
    Frontend = @{
        Directories = @("frontend/css", "frontend/js", "frontend/components", "frontend/assets")
        Files = @("frontend/index.html", "frontend/css/main.css", "frontend/js/main.js")
        Extensions = @("html", "css", "js")
    }
    Backend = @{
        Directories = @("backend/src", "backend/components", "backend/services", "backend/types", "backend/prisma")
        Files = @("backend/package.json", "backend/tsconfig.json", "backend/prisma/schema.prisma")
        Extensions = @("ts", "tsx", "json", "prisma")
    }
    Docs = @{
        Directories = @("docs", "docs/decisions", "docs/architecture")
        Extensions = @("md", "json")
    }
    Scripts = @{
        Directories = @("scripts")
        Extensions = @("ps1")
    }
    Config = @{
        Files = @("package.json", "README.md", ".gitignore", "tsconfig.json")
    }
}

# Diretorios e arquivos obsoletos para movimentacao
$ObsoletePatterns = @{
    Directories = @(
        "backup-*",
        "legacy",
        "trash-temp",
        "cache",
        "node_modules",
        "DOMv2Android",
        "backup-react-legacy",
        "backups/old-*",
        "backups/temp-*"
    )
    Files = @(
        "*.backup",
        "*.bak",
        "*.old",
        "*.tmp",
        "*.temp",
        "*~",
        "Thumbs.db",
        ".DS_Store"
    )
    ContentPatterns = @(
        "TODO: REMOVE",
        "OBSOLETE:",
        "DEPRECATED:",
        "LEGACY:"
    )
}

# Funcao para analisar arquivos
function Analyze-ProjectFiles {
    Write-Host "ANALISANDO ARQUIVOS DO PROJETO..." -ForegroundColor Cyan
    
    $analysis = @{
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        TotalFiles = 0
        RequiredFiles = @()
        ObsoleteFiles = @()
        ObsoleteDirectories = @()
        LargeFiles = @()
        Recommendations = @()
    }
    
    # Encontrar todos os arquivos
    $allFiles = Get-ChildItem -Path "." -Recurse -File -ErrorAction SilentlyContinue | Where-Object { 
        $_.FullName -notlike "*\.git\*" -and 
        $_.FullName -notlike "*\node_modules\*" 
    }
    
    $analysis.TotalFiles = $allFiles.Count
    
    foreach ($file in $allFiles) {
        $relativePath = $file.FullName.Replace($ProjectRoot, "").TrimStart("\")
        
        # Verificar se e arquivo obrigatorio
        $isRequired = $false
        foreach ($category in $RequiredStructure.Keys) {
            if ($RequiredStructure[$category].Files -contains $relativePath) {
                $isRequired = $true
                $analysis.RequiredFiles += $relativePath
                break
            }
        }
        
        # Verificar se e obsoleto
        $isObsolete = $false
        foreach ($pattern in $ObsoletePatterns.Files) {
            if ($file.Name -like $pattern) {
                $isObsolete = $true
                $analysis.ObsoleteFiles += @{
                    Path = $relativePath
                    Reason = "Padrao obsoleto: $pattern"
                    Size = $file.Length
                    SizeMB = [math]::Round($file.Length / 1MB, 2)
                }
                break
            }
        }
        
        # Verificar conteudo obsoleto
        if (-not $isObsolete) {
            try {
                $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
                if ($content) {
                    foreach ($pattern in $ObsoletePatterns.ContentPatterns) {
                        if ($content -match $pattern) {
                            $isObsolete = $true
                            $analysis.ObsoleteFiles += @{
                                Path = $relativePath
                                Reason = "Conteudo obsoleto: $pattern"
                                Size = $file.Length
                                SizeMB = [math]::Round($file.Length / 1MB, 2)
                            }
                            break
                        }
                    }
                }
            } catch {
                # Arquivo nao pode ser lido, ignorar
            }
        }
        
        # Verificar arquivos grandes
        if ($file.Length -gt 10MB) {
            $analysis.LargeFiles += @{
                Path = $relativePath
                Size = $file.Length
                SizeMB = [math]::Round($file.Length / 1MB, 2)
            }
        }
    }
    
    # Encontrar diretorios obsoletos
    $allDirectories = Get-ChildItem -Path "." -Directory -Recurse -ErrorAction SilentlyContinue | Where-Object { 
        $_.FullName -notlike "*\.git\*" -and 
        $_.FullName -notlike "*\node_modules\*" 
    }
    
    foreach ($dir in $allDirectories) {
        $relativePath = $dir.FullName.Replace($ProjectRoot, "").TrimStart("\")
        
        foreach ($pattern in $ObsoletePatterns.Directories) {
            if ($dir.Name -like $pattern) {
                $analysis.ObsoleteDirectories += @{
                    Path = $relativePath
                    Reason = "Padrao obsoleto: $pattern"
                }
                break
            }
        }
    }
    
    # Gerar recomendacoes
    if ($analysis.ObsoleteFiles.Count -gt 0) {
        $analysis.Recommendations += "Mover $($analysis.ObsoleteFiles.Count) arquivos obsoletos para $TempDir"
    }
    
    if ($analysis.ObsoleteDirectories.Count -gt 0) {
        $analysis.Recommendations += "Mover $($analysis.ObsoleteDirectories.Count) diretorios obsoletos para $TempDir"
    }
    
    if ($analysis.LargeFiles.Count -gt 0) {
        $analysis.Recommendations += "Revisar $($analysis.LargeFiles.Count) arquivos grandes"
    }
    
    return $analysis
}

# Funcao para mover arquivos obsoletos
function Move-ObsoleteFiles {
    param([array]$ObsoleteFiles, [array]$ObsoleteDirectories)
    
    Write-Host "MOVENDO ARQUIVOS OBSOLETOS PARA $TempDir..." -ForegroundColor Yellow
    
    # Criar diretorio temporario
    if (-not (Test-Path -Path $TempDir)) {
        New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
        Write-Host "Diretorio temporario criado: $TempDir" -ForegroundColor Green
    }
    
    $movedCount = 0
    
    # Mover arquivos obsoletos
    foreach ($file in $ObsoleteFiles) {
        $sourcePath = Join-Path -Path $ProjectRoot -ChildPath $file.Path
        $destPath = Join-Path -Path $TempDir -ChildPath $file.Path
        
        if (Test-Path -Path $sourcePath) {
            try {
                # Criar diretorio de destino se nao existir
                $destDir = Split-Path -Path $destPath -Parent
                if (-not (Test-Path -Path $destDir)) {
                    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
                }
                
                Move-Item -Path $sourcePath -Destination $destPath -Force
                Write-Host "   Movido: $($file.Path) - $($file.Reason)" -ForegroundColor Green
                $movedCount++
            } catch {
                Write-Host "   Erro ao mover: $($file.Path) - $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
    
    # Mover diretorios obsoletos
    foreach ($dir in $ObsoleteDirectories) {
        $sourcePath = Join-Path -Path $ProjectRoot -ChildPath $dir.Path
        $destPath = Join-Path -Path $TempDir -ChildPath $dir.Path
        
        if (Test-Path -Path $sourcePath) {
            try {
                Move-Item -Path $sourcePath -Destination $destPath -Force
                Write-Host "   Movido diretorio: $($dir.Path) - $($dir.Reason)" -ForegroundColor Green
                $movedCount++
            } catch {
                Write-Host "   Erro ao mover diretorio: $($dir.Path) - $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
    
    return $movedCount
}

# Funcao para listar arquivos obsoletos
function Show-ObsoleteFiles {
    param([array]$ObsoleteFiles, [array]$ObsoleteDirectories)
    
    if ($ObsoleteFiles.Count -gt 0) {
        Write-Host "`nARQUIVOS OBSOLETOS ENCONTRADOS:" -ForegroundColor Red
        foreach ($file in $ObsoleteFiles) {
            Write-Host "   - $($file.Path) ($($file.SizeMB) MB) - $($file.Reason)" -ForegroundColor Gray
        }
    }
    
    if ($ObsoleteDirectories.Count -gt 0) {
        Write-Host "`nDIRETORIOS OBSOLETOS ENCONTRADOS:" -ForegroundColor Red
        foreach ($dir in $ObsoleteDirectories) {
            Write-Host "   - $($dir.Path) - $($dir.Reason)" -ForegroundColor Gray
        }
    }
}

# Funcao principal
function Start-ProjectCleanup {
    Write-Host "LIMPEZA SEGURA DO PROJETO - DOM v2" -ForegroundColor Magenta
    Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
    Write-Host "Diretorio temporario: $TempDir" -ForegroundColor Gray
    Write-Host "=" * 60 -ForegroundColor Gray
    
    # Criar diretorio de logs se nao existir
    if (-not (Test-Path -Path "logs")) {
        New-Item -ItemType Directory -Path "logs" -Force | Out-Null
    }
    
    # Analisar projeto
    $analysis = Analyze-ProjectFiles
    
    # Salvar relatorio de analise
    if ($CreateReport) {
        $analysis | ConvertTo-Json -Depth 10 | Out-File -FilePath $AnalysisReport -Encoding UTF8
        Write-Host "Relatorio salvo em: $AnalysisReport" -ForegroundColor Cyan
    }
    
    # Exibir resultados
    Write-Host "`nRESULTADOS DA ANALISE:" -ForegroundColor Cyan
    Write-Host "   Total de arquivos: $($analysis.TotalFiles)" -ForegroundColor White
    Write-Host "   Arquivos obrigatorios: $($analysis.RequiredFiles.Count)" -ForegroundColor Green
    Write-Host "   Arquivos obsoletos: $($analysis.ObsoleteFiles.Count)" -ForegroundColor Red
    Write-Host "   Diretorios obsoletos: $($analysis.ObsoleteDirectories.Count)" -ForegroundColor Red
    Write-Host "   Arquivos grandes: $($analysis.LargeFiles.Count)" -ForegroundColor Yellow
    
    if ($analysis.Recommendations.Count -gt 0) {
        Write-Host "`nRECOMENDACOES:" -ForegroundColor Yellow
        foreach ($rec in $analysis.Recommendations) {
            Write-Host "   - $rec" -ForegroundColor Cyan
        }
    }
    
    # Listar arquivos obsoletos se solicitado
    if ($ListObsolete) {
        Show-ObsoleteFiles -ObsoleteFiles $analysis.ObsoleteFiles -ObsoleteDirectories $analysis.ObsoleteDirectories
    }
    
    # Executar movimentacao se solicitado
    if ($MoveToTemp -and -not $AnalyzeOnly) {
        if ($analysis.ObsoleteFiles.Count -gt 0 -or $analysis.ObsoleteDirectories.Count -gt 0) {
            Write-Host "`nATENCAO: Esta operacao ira mover arquivos para $TempDir!" -ForegroundColor Red
            
            $confirm = Read-Host "`nDeseja continuar? (s/N)"
            if ($confirm -eq "s") {
                $movedCount = Move-ObsoleteFiles -ObsoleteFiles $analysis.ObsoleteFiles -ObsoleteDirectories $analysis.ObsoleteDirectories
                Write-Host "`nLimpeza concluida! $movedCount itens movidos para $TempDir" -ForegroundColor Green
                Write-Host "IMPORTANTE: Revise o conteudo de $TempDir antes de apagar!" -ForegroundColor Yellow
            } else {
                Write-Host "`nOperacao cancelada pelo usuario." -ForegroundColor Yellow
            }
        } else {
            Write-Host "`nNenhum arquivo obsoleto encontrado para movimentacao." -ForegroundColor Green
        }
    }
    
    Write-Host "`n" + "=" * 60 -ForegroundColor Gray
    Write-Host "Analise de limpeza concluida" -ForegroundColor Green
}

# Executar limpeza
Start-ProjectCleanup
