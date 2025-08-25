# 🔄 SCRIPT DE RESTAURAÇÃO DE FUNCIONALIDADES - DOM v2
# Data: 25/01/2025
# Versão: 1.0.0

param(
    [switch]$BackupOnly,
    [switch]$RestoreOnly,
    [switch]$VerifyOnly,
    [switch]$TestOnly
)

# Configurações
$BackupSource = "backups/html-backup-complete-20250822_170135"
$FrontendPublic = "frontend/public"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupDir = "backups/restoration-backup-$Timestamp"

# Cores para output
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"
$Cyan = "Cyan"

# Função de backup
function Create-Backup {
    Write-Host "🔒 Criando backup de segurança..." -ForegroundColor $Yellow
    try {
        New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
        Copy-Item "$FrontendPublic/*.html" $BackupDir -Recurse -Force
        Write-Host "✅ Backup criado em: $BackupDir" -ForegroundColor $Green
        return $true
    } catch {
        Write-Host "❌ Erro ao criar backup: $($_.Exception.Message)" -ForegroundColor $Red
        return $false
    }
}

# Função de restauração
function Restore-Files {
    Write-Host "🔄 Restaurando arquivos..." -ForegroundColor $Yellow
    
    $FilesToRestore = @(
        @{Name="index.html"; Priority="CRÍTICA"},
        @{Name="app.html"; Priority="CRÍTICA"},
        @{Name="main.html"; Priority="ALTA"},
        @{Name="splash.html"; Priority="ALTA"},
        @{Name="approvals-management.html"; Priority="CRÍTICA"},
        @{Name="gamification.html"; Priority="MÉDIA"},
        @{Name="financial-management.html"; Priority="ALTA"},
        @{Name="navigation.html"; Priority="CRÍTICA"},
        @{Name="gamification-management.html"; Priority="MÉDIA"}
    )
    
    $RestoredCount = 0
    $FailedCount = 0
    
    foreach ($file in $FilesToRestore) {
        $source = "$BackupSource/$($file.Name)"
        $destination = "$FrontendPublic/$($file.Name)"
        
        if (Test-Path $source) {
            try {
                Copy-Item $source $destination -Force
                Write-Host "✅ Restaurado: $($file.Name) [$($file.Priority)]" -ForegroundColor $Green
                $RestoredCount++
            } catch {
                Write-Host "❌ Erro ao restaurar $($file.Name): $($_.Exception.Message)" -ForegroundColor $Red
                $FailedCount++
            }
        } else {
            Write-Host "❌ Arquivo não encontrado: $($file.Name)" -ForegroundColor $Red
            $FailedCount++
        }
    }
    
    Write-Host "📊 Resumo da restauração:" -ForegroundColor $Cyan
    Write-Host "   ✅ Restaurados: $RestoredCount" -ForegroundColor $Green
    Write-Host "   ❌ Falharam: $FailedCount" -ForegroundColor $Red
    
    return $FailedCount -eq 0
}

# Função de verificação
function Verify-Restoration {
    Write-Host "🔍 Verificando restauração..." -ForegroundColor $Yellow
    
    $RequiredFiles = @(
        "index.html",
        "app.html",
        "main.html", 
        "splash.html",
        "approvals-management.html",
        "gamification.html",
        "financial-management.html",
        "navigation.html"
    )
    
    $MissingFiles = @()
    $ExistingFiles = @()
    
    foreach ($file in $RequiredFiles) {
        if (Test-Path "$FrontendPublic/$file") {
            $fileSize = (Get-Item "$FrontendPublic/$file").Length
            $ExistingFiles += @{Name=$file; Size=$fileSize}
        } else {
            $MissingFiles += $file
        }
    }
    
    Write-Host "📋 Status dos arquivos:" -ForegroundColor $Cyan
    
    if ($ExistingFiles.Count -gt 0) {
        Write-Host "✅ Arquivos existentes:" -ForegroundColor $Green
        foreach ($file in $ExistingFiles) {
            $sizeKB = [math]::Round($file.Size / 1KB, 2)
            Write-Host "   - $($file.Name) ($sizeKB KB)" -ForegroundColor $Green
        }
    }
    
    if ($MissingFiles.Count -gt 0) {
        Write-Host "❌ Arquivos faltando:" -ForegroundColor $Red
        foreach ($file in $MissingFiles) {
            Write-Host "   - $file" -ForegroundColor $Red
        }
        return $false
    } else {
        Write-Host "🎉 Todos os arquivos restaurados com sucesso!" -ForegroundColor $Green
        return $true
    }
}

# Função de teste
function Test-Functionalities {
    Write-Host "🧪 Testando funcionalidades..." -ForegroundColor $Yellow
    
    # Verificar se o servidor está rodando
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
        Write-Host "✅ Servidor web respondendo na porta 3000" -ForegroundColor $Green
    } catch {
        Write-Host "⚠️ Servidor web não está rodando na porta 3000" -ForegroundColor $Yellow
        Write-Host "   Execute: node simple-server.js" -ForegroundColor $Cyan
    }
    
    # Verificar arquivos críticos
    $CriticalFiles = @("index.html", "login-screen.html", "dashboard.html")
    $CriticalStatus = $true
    
    foreach ($file in $CriticalFiles) {
        if (Test-Path "$FrontendPublic/$file") {
            Write-Host "✅ $file - OK" -ForegroundColor $Green
        } else {
            Write-Host "❌ $file - FALTANDO" -ForegroundColor $Red
            $CriticalStatus = $false
        }
    }
    
    if ($CriticalStatus) {
        Write-Host "🎉 Teste de funcionalidades concluído com sucesso!" -ForegroundColor $Green
        Write-Host "🌐 Acesse: http://localhost:3000" -ForegroundColor $Cyan
    } else {
        Write-Host "⚠️ Algumas funcionalidades críticas estão faltando" -ForegroundColor $Yellow
    }
    
    return $CriticalStatus
}

# Função de limpeza de arquivos de backup antigos
function Cleanup-OldBackups {
    Write-Host "🧹 Limpando backups antigos..." -ForegroundColor $Yellow
    
    $BackupFiles = Get-ChildItem -Path "frontend/public" -Filter "*.backup*" -Recurse
    $BackupFiles += Get-ChildItem -Path "frontend/public" -Filter "*.css-prefix-backup*" -Recurse
    $BackupFiles += Get-ChildItem -Path "frontend/public" -Filter "*.final-backup*" -Recurse
    
    if ($BackupFiles.Count -gt 0) {
        $totalSize = ($BackupFiles | Measure-Object -Property Length -Sum).Sum
        $totalSizeMB = [math]::Round($totalSize / 1MB, 2)
        
        Write-Host "📊 Encontrados $($BackupFiles.Count) arquivos de backup ($totalSizeMB MB)" -ForegroundColor $Cyan
        
        $response = Read-Host "Deseja remover arquivos de backup antigos? (s/N)"
        if ($response -eq "s" -or $response -eq "S") {
            foreach ($file in $BackupFiles) {
                Remove-Item $file.FullName -Force
                Write-Host "🗑️ Removido: $($file.Name)" -ForegroundColor $Yellow
            }
            Write-Host "✅ Limpeza concluída!" -ForegroundColor $Green
        } else {
            Write-Host "⏭️ Limpeza cancelada" -ForegroundColor $Yellow
        }
    } else {
        Write-Host "✅ Nenhum arquivo de backup antigo encontrado" -ForegroundColor $Green
    }
}

# Função principal
function Main {
    Write-Host "🚀 SCRIPT DE RESTAURAÇÃO DE FUNCIONALIDADES - DOM v2" -ForegroundColor $Cyan
    Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor $Cyan
    Write-Host ""

    # Verificar se estamos no diretório correto
    if (-not (Test-Path "frontend/public")) {
        Write-Host "❌ Erro: Execute este script na raiz do projeto DOM v2" -ForegroundColor $Red
        exit 1
    }

    # Verificar se o backup fonte existe
    if (-not (Test-Path $BackupSource)) {
        Write-Host "❌ Erro: Backup fonte não encontrado: $BackupSource" -ForegroundColor $Red
        exit 1
    }

    # Execução baseada nos parâmetros
    if ($BackupOnly) {
        Create-Backup
    } elseif ($RestoreOnly) {
        Restore-Files
    } elseif ($VerifyOnly) {
        Verify-Restoration
    } elseif ($TestOnly) {
        Test-Functionalities
    } else {
        # Execução completa
        Write-Host "🔄 Iniciando restauração completa..." -ForegroundColor $Yellow
        
        # 1. Backup
        if (-not (Create-Backup)) {
            Write-Host "❌ Falha no backup. Abortando restauração." -ForegroundColor $Red
            exit 1
        }
        
        # 2. Restauração
        if (-not (Restore-Files)) {
            Write-Host "⚠️ Alguns arquivos falharam na restauração" -ForegroundColor $Yellow
        }
        
        # 3. Verificação
        if (Verify-Restoration) {
            Write-Host "✅ Restauração verificada com sucesso!" -ForegroundColor $Green
        } else {
            Write-Host "⚠️ Verificação encontrou problemas" -ForegroundColor $Yellow
        }
        
        # 4. Teste
        Test-Functionalities
        
        # 5. Limpeza opcional
        Cleanup-OldBackups
        
        Write-Host ""
        Write-Host "🎉 RESTAURAÇÃO CONCLUÍDA!" -ForegroundColor $Green
        Write-Host "📋 Próximos passos:" -ForegroundColor $Cyan
        Write-Host "   1. Inicie o servidor: node simple-server.js" -ForegroundColor $Cyan
        Write-Host "   2. Acesse: http://localhost:3000" -ForegroundColor $Cyan
        Write-Host "   3. Teste todas as funcionalidades" -ForegroundColor $Cyan
    }
}

# Executar função principal
Main
