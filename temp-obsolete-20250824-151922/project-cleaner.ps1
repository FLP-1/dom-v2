# Project Cleaner - DOM v2
# Sistema de limpeza inteligente que remove arquivos obsoletos

param(
    [switch]$DryRun,
    [switch]$Force,
    [switch]$Backup,
    [switch]$AnalyzeOnly
)

# Configuracoes
$ProjectRoot = Get-Location
$BackupDir = "backups/cleanup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$AnalysisReport = "logs/cleanup-analysis.json"

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

# Diretorios e arquivos obsoletos para remocao
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
    Write-Host "🔍 ANALISANDO ARQUIVOS DO PROJETO..." -ForegroundColor Cyan
    
    $analysis = @{
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        TotalFiles = 0
        RequiredFiles = @()
        ObsoleteFiles = @()
        ObsoleteDirectories = @()
        LargeFiles = @()
        DuplicateFiles = @()
        Recommendations = @()
    }
    
    # Encontrar todos os arquivos
    $allFiles = Get-ChildItem -Path "." -Recurse -File | Where-Object { 
        $_.FullName -notlike "*\.git\*" -and 
        $_.FullName -notlike "*\node_modules\*" 
    }
    
    $analysis.TotalFiles = $allFiles.Count
    
    foreach ($file in $allFiles) {
        $relativePath = $file.FullName.Replace($ProjectRoot, "").TrimStart("\")
        
        # Verificar se é arquivo obrigatorio
        $isRequired = $false
        foreach ($category in $RequiredStructure.Keys) {
            if ($RequiredStructure[$category].Files -contains $relativePath) {
                $isRequired = $true
                $analysis.RequiredFiles += $relativePath
                break
            }
        }
        
        # Verificar se é obsoleto
        $isObsolete = $false
        foreach ($pattern in $ObsoletePatterns.Files) {
            if ($file.Name -like $pattern) {
                $isObsolete = $true
                $analysis.ObsoleteFiles += @{
                    Path = $relativePath
                    Reason = "Padrao obsoleto: $pattern"
                    Size = $file.Length
                }
                break
            }
        }
        
        # Verificar conteudo obsoleto
        if (-not $isObsolete) {
            try {
                $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
                if ($content) {
                    foreach ($pattern in $ObsoletePatterns.ContentPatterns) {
                        if ($content -match $pattern) {
                            $isObsolete = $true
                            $analysis.ObsoleteFiles += @{
                                Path = $relativePath
                                Reason = "Conteudo obsoleto: $pattern"
                                Size = $file.Length
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
    $allDirectories = Get-ChildItem -Path "." -Directory -Recurse | Where-Object { 
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
        $analysis.Recommendations += "Remover $($analysis.ObsoleteFiles.Count) arquivos obsoletos"
    }
    
    if ($analysis.ObsoleteDirectories.Count -gt 0) {
        $analysis.Recommendations += "Remover $($analysis.ObsoleteDirectories.Count) diretorios obsoletos"
    }
    
    if ($analysis.LargeFiles.Count -gt 0) {
        $analysis.Recommendations += "Revisar $($analysis.LargeFiles.Count) arquivos grandes"
    }
    
    return $analysis
}

# Funcao para criar backup
function Create-Backup {
    param([array]$FilesToBackup)
    
    Write-Host "📦 CRIANDO BACKUP..." -ForegroundColor Yellow
    
    if (-not (Test-Path $BackupDir)) {
        New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    }
    
    foreach ($file in $FilesToBackup) {
        $sourcePath = Join-Path $ProjectRoot $file.Path
        $backupPath = Join-Path $BackupDir $file.Path
        
        if (Test-Path $sourcePath) {
            $backupDirPath = Split-Path $backupPath -Parent
            if (-not (Test-Path $backupDirPath)) {
                New-Item -ItemType Directory -Path $backupDirPath -Force | Out-Null
            }
            
            Copy-Item -Path $sourcePath -Destination $backupPath -Force
        }
    }
    
    Write-Host "✅ Backup criado em: $BackupDir" -ForegroundColor Green
}

# Funcao para remover arquivos obsoletos
function Remove-ObsoleteFiles {
    param([array]$ObsoleteFiles, [array]$ObsoleteDirectories)
    
    Write-Host "🗑️ REMOVENDO ARQUIVOS OBSOLETOS..." -ForegroundColor Red
    
    $removedCount = 0
    
    # Remover arquivos obsoletos
    foreach ($file in $ObsoleteFiles) {
        $filePath = Join-Path $ProjectRoot $file.Path
        if (Test-Path $filePath) {
            try {
                Remove-Item -Path $filePath -Force
                Write-Host "   ✅ Removido: $($file.Path) - $($file.Reason)" -ForegroundColor Green
                $removedCount++
            } catch {
                Write-Host "   ❌ Erro ao remover: $($file.Path) - $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
    
    # Remover diretorios obsoletos
    foreach ($dir in $ObsoleteDirectories) {
        $dirPath = Join-Path $ProjectRoot $dir.Path
        if (Test-Path $dirPath) {
            try {
                Remove-Item -Path $dirPath -Recurse -Force
                Write-Host "   ✅ Removido diretorio: $($dir.Path) - $($dir.Reason)" -ForegroundColor Green
                $removedCount++
            } catch {
                Write-Host "   ❌ Erro ao remover diretorio: $($dir.Path) - $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
    
    return $removedCount
}

# Funcao principal
function Start-ProjectCleanup {
    Write-Host "🧹 LIMPEZA DO PROJETO - DOM v2" -ForegroundColor Magenta
    Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
    Write-Host "Modo: $(if ($DryRun) { 'Simulacao' } elseif ($AnalyzeOnly) { 'Apenas analise' } else { 'Execucao real' })" -ForegroundColor Gray
    Write-Host "=" * 60 -ForegroundColor Gray
    
    # Criar diretorio de logs se nao existir
    if (-not (Test-Path "logs")) {
        New-Item -ItemType Directory -Path "logs" -Force | Out-Null
    }
    
    # Analisar projeto
    $analysis = Analyze-ProjectFiles
    
    # Salvar relatorio de analise
    $analysis | ConvertTo-Json -Depth 10 | Out-File $AnalysisReport -Encoding UTF8
    
    # Exibir resultados
    Write-Host "`n📊 RESULTADOS DA ANALISE:" -ForegroundColor Cyan
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
    
    # Exibir arquivos obsoletos
    if ($analysis.ObsoleteFiles.Count -gt 0) {
        Write-Host "`nARQUIVOS OBSOLETOS ENCONTRADOS:" -ForegroundColor Red
        foreach ($file in $analysis.ObsoleteFiles) {
            $sizeMB = [math]::Round($file.Size / 1MB, 2)
            Write-Host "   - $($file.Path) ($sizeMB MB) - $($file.Reason)" -ForegroundColor Gray
        }
    }
    
    # Exibir diretorios obsoletos
    if ($analysis.ObsoleteDirectories.Count -gt 0) {
        Write-Host "`nDIRETORIOS OBSOLETOS ENCONTRADOS:" -ForegroundColor Red
        foreach ($dir in $analysis.ObsoleteDirectories) {
            Write-Host "   - $($dir.Path) - $($dir.Reason)" -ForegroundColor Gray
        }
    }
    
    # Executar limpeza se solicitado
    if (-not $AnalyzeOnly -and -not $DryRun) {
        if ($analysis.ObsoleteFiles.Count -gt 0 -or $analysis.ObsoleteDirectories.Count -gt 0) {
            Write-Host "`n⚠️ ATENCAO: Esta operacao ira remover arquivos permanentemente!" -ForegroundColor Red
            
            if ($Backup) {
                Create-Backup -FilesToBackup $analysis.ObsoleteFiles
            }
            
            if ($Force -or (Read-Host "`nDeseja continuar? (s/N)") -eq "s") {
                $removedCount = Remove-ObsoleteFiles -ObsoleteFiles $analysis.ObsoleteFiles -ObsoleteDirectories $analysis.ObsoleteDirectories
                Write-Host "`n✅ Limpeza concluida! $removedCount itens removidos." -ForegroundColor Green
            } else {
                Write-Host "`n❌ Operacao cancelada pelo usuario." -ForegroundColor Yellow
            }
        } else {
            Write-Host "`n✅ Nenhum arquivo obsoleto encontrado para remocao." -ForegroundColor Green
        }
    }
    
    Write-Host "`n📄 Relatorio detalhado salvo em: $AnalysisReport" -ForegroundColor Cyan
    Write-Host "=" * 60 -ForegroundColor Gray
    Write-Host "Limpeza do projeto concluida" -ForegroundColor Green
}

# Executar limpeza
Start-ProjectCleanup
