# Script de Restauração Simples - DOM v2
Write-Host "🚀 Iniciando restauração de funcionalidades..." -ForegroundColor Green

# Backup source
$BackupSource = "backups/html-backup-complete-20250822_170135"
$FrontendPublic = "frontend/public"

# Criar backup de segurança
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupDir = "backups/restoration-backup-$Timestamp"
New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
Copy-Item "$FrontendPublic/*.html" $BackupDir -Recurse -Force
Write-Host "✅ Backup criado em: $BackupDir" -ForegroundColor Green

# Arquivos para restaurar
$FilesToRestore = @(
    "index.html",
    "app.html", 
    "main.html",
    "splash.html",
    "approvals-management.html",
    "gamification.html",
    "financial-management.html",
    "navigation.html"
)

# Restaurar arquivos
foreach ($file in $FilesToRestore) {
    $source = "$BackupSource/$file"
    $destination = "$FrontendPublic/$file"
    
    if (Test-Path $source) {
        Copy-Item $source $destination -Force
        Write-Host "✅ Restaurado: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Arquivo não encontrado: $file" -ForegroundColor Red
    }
}

Write-Host "🎉 Restauração concluída!" -ForegroundColor Green
