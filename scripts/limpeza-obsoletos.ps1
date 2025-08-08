# Script PowerShell para limpeza de arquivos obsoletos - DOM V2
# Diretório: C:\dom-v2

Write-Host "🗑️  INICIANDO ANÁLISE DE ARQUIVOS OBSOLETOS..." -ForegroundColor Green
Write-Host ""

# Configurações
$TrashDir = "C:\dom-v2\trash-temp"
$ExcludeDirs = @("node_modules", ".git", "trash-temp", "dist", "build", "out", "target", "logs")
$ExcludeFiles = @("package.json", "package-lock.json", "README.md", ".gitignore")

# Padrões de arquivos obsoletos
$ObsoletePatterns = @(
    "*.tmp", "*.temp", "*.bak", "*.backup", "*.old", "*.orig", 
    "*.rej", "*.swp", "*.swo", "*~", ".DS_Store", "Thumbs.db"
)

# Criar diretório de lixo
if (!(Test-Path $TrashDir)) {
    New-Item -ItemType Directory -Path $TrashDir -Force | Out-Null
    Write-Host "📁 Diretório de lixo criado: $TrashDir" -ForegroundColor Yellow
}

# Função para verificar se arquivo é obsoleto
function Test-ObsoleteFile {
    param([string]$FilePath)
    
    $FileName = Split-Path $FilePath -Leaf
    $Ext = [System.IO.Path]::GetExtension($FilePath)
    
    # Verificar padrões
    foreach ($pattern in $ObsoletePatterns) {
        $patternName = $pattern.Replace("*", "")
        if ($FileName -like "*$patternName*") {
            return $true
        }
    }
    
    # Verificar arquivos muito pequenos (exceto .md e .txt)
    try {
        $FileInfo = Get-Item $FilePath
        if ($FileInfo.Length -lt 1024 -and $Ext -ne ".md" -and $Ext -ne ".txt") {
            return $true
        }
    }
    catch {
        return $false
    }
    
    return $false
}

# Função para mover arquivo para lixo
function Move-ToTrash {
    param([string]$FilePath)
    
    try {
        $RelativePath = $FilePath.Replace("C:\dom-v2\", "")
        $TrashPath = Join-Path $TrashDir $RelativePath
        $TrashDirPath = Split-Path $TrashPath -Parent
        
        # Criar diretório se não existir
        if (!(Test-Path $TrashDirPath)) {
            New-Item -ItemType Directory -Path $TrashDirPath -Force | Out-Null
        }
        
        # Mover arquivo
        Move-Item $FilePath $TrashPath -Force
        Write-Host "  ✅ Movido: $RelativePath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  ❌ Erro ao mover: $FilePath" -ForegroundColor Red
        Write-Host "     Erro: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Coletar todos os arquivos
Write-Host "🔍 Analisando arquivos..." -ForegroundColor Cyan

$AllFiles = @()
$ExcludeDirsParam = $ExcludeDirs | ForEach-Object { "-exclude", $_ }

try {
    $AllFiles = Get-ChildItem -Path "C:\dom-v2" -Recurse -File | 
                Where-Object { 
                    $ExcludeDirs -notcontains $_.Directory.Name -and
                    $ExcludeFiles -notcontains $_.Name
                } | 
                Select-Object -ExpandProperty FullName
}
catch {
    Write-Host "⚠️  Erro ao coletar arquivos: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "📊 Total de arquivos encontrados: $($AllFiles.Count)" -ForegroundColor Cyan

# Identificar arquivos obsoletos
Write-Host ""
Write-Host "🔍 Identificando arquivos obsoletos..." -ForegroundColor Cyan

$ObsoleteFiles = @()
$MovedFiles = @()

foreach ($file in $AllFiles) {
    if (Test-ObsoleteFile $file) {
        $ObsoleteFiles += $file
    }
}

Write-Host "🗑️  Arquivos obsoletos encontrados: $($ObsoleteFiles.Count)" -ForegroundColor Yellow

if ($ObsoleteFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "📋 ARQUIVOS OBSOLETOS IDENTIFICADOS:" -ForegroundColor Yellow
    
    foreach ($file in $ObsoleteFiles) {
        $RelativePath = $file.Replace("C:\dom-v2\", "")
        Write-Host "  - $RelativePath" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "🚀 Movendo arquivos para lixo..." -ForegroundColor Green
    
    foreach ($file in $ObsoleteFiles) {
        if (Move-ToTrash $file) {
            $MovedFiles += $file
        }
    }
    
    Write-Host ""
    Write-Host "✅ $($MovedFiles.Count) arquivos movidos para $TrashDir" -ForegroundColor Green
    Write-Host "📋 Verifique o diretório de lixo antes de descartar definitivamente." -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "✅ Nenhum arquivo obsoleto encontrado!" -ForegroundColor Green
}

# Salvar relatório
$Report = @{
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    totalFiles = $AllFiles.Count
    obsoleteFiles = $ObsoleteFiles.Count
    movedFiles = $MovedFiles.Count
    files = $MovedFiles | ForEach-Object { $_.Replace("C:\dom-v2\", "") }
}

$ReportPath = Join-Path $TrashDir "limpeza-report.json"
$Report | ConvertTo-Json -Depth 3 | Out-File -FilePath $ReportPath -Encoding UTF8

Write-Host ""
Write-Host "📄 Relatório salvo em: $ReportPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Análise concluída!" -ForegroundColor Green
