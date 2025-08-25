# Compliance Gatekeeper - DOM v2
# Sistema integrado que funciona automaticamente para humanos, IAs e edições manuais

param(
    [switch]$Install,
    [switch]$Uninstall,
    [switch]$Test,
    [switch]$Status
)

# Configuracoes
$ProjectRoot = Get-Location
$GatekeeperDir = "tools/gatekeeper"
$HooksDir = ".git/hooks"
$ConfigFile = "tools/gatekeeper/config.json"
$LogFile = "logs/gatekeeper.log"

# Configuracao do gatekeeper
$GatekeeperConfig = @{
    Enabled       = $true
    AutoFix       = $false
    PreCommit     = $true
    PostCommit    = $true
    FileWatcher   = $true
    Notifications = $true
    Rules         = @{
        Architecture = @{
            Frontend             = "HTML + JavaScript vanilla"
            Backend              = "React + TypeScript"
            ProhibitedFrameworks = @("vue", "angular", "jquery", "bootstrap")
        }
        Development  = @{
            PowerShellOnly = $true
            ErrorHandling  = $true
            Validation     = $true
        }
        Quality      = @{
            PreImplementationCheck = $true
            IncrementalValidation  = $true
        }
    }
}

# Funcao para instalar gatekeeper
function Install-Gatekeeper {
    Write-Host "INSTALANDO COMPLIANCE GATEKEEPER..." -ForegroundColor Magenta
    
    # Criar diretorios necessarios
    $directories = @($GatekeeperDir, "logs", "tools/gatekeeper/hooks")
    foreach ($dir in $directories) {
        if (-not (Test-Path -Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Host "Diretorio criado: $dir" -ForegroundColor Green
        }
    }
    
    # Salvar configuracao
    $GatekeeperConfig | ConvertTo-Json -Depth 10 | Out-File -FilePath $ConfigFile -Encoding UTF8
    
    # Criar hooks do Git
    Create-GitHooks
    
    # Criar file watcher
    Create-FileWatcher
    
    # Criar integracao com editores
    Create-EditorIntegration
    
    Write-Host "Gatekeeper instalado com sucesso!" -ForegroundColor Green
    Write-Host "Configuracao salva em: $ConfigFile" -ForegroundColor Cyan
}

# Funcao para criar hooks do Git
function Create-GitHooks {
    Write-Host "Criando hooks do Git..." -ForegroundColor Yellow
    
    # Pre-commit hook
    $preCommitHook = @"
#!/bin/sh
# Pre-commit hook para compliance
echo "Executando verificacao de compliance..."
powershell -ExecutionPolicy Bypass -File "tools/gatekeeper/pre-commit-check.ps1"
if [ `$? -ne 0 ]; then
    echo "Violacoes de compliance encontradas. Commit bloqueado."
    exit 1
fi
echo "Compliance verificado. Commit permitido."
"@
    
    $preCommitHook | Out-File -FilePath "$HooksDir/pre-commit" -Encoding ASCII
    Write-Host "Hook pre-commit criado" -ForegroundColor Green
    
    # Post-commit hook
    $postCommitHook = @"
#!/bin/sh
# Post-commit hook para validacao
echo "Executando validacao pos-commit..."
powershell -ExecutionPolicy Bypass -File "tools/gatekeeper/post-commit-validation.ps1"
"@
    
    $postCommitHook | Out-File -FilePath "$HooksDir/post-commit" -Encoding ASCII
    Write-Host "Hook post-commit criado" -ForegroundColor Green
}

# Funcao para criar file watcher
function Create-FileWatcher {
    Write-Host "Criando file watcher..." -ForegroundColor Yellow
    
    $fileWatcherScript = @"
# File Watcher para Compliance - DOM v2
# Monitora mudancas em arquivos e executa verificacoes automaticas

`$watcher = New-Object System.IO.FileSystemWatcher
`$watcher.Path = "."
`$watcher.Filter = "*.*"
`$watcher.IncludeSubdirectories = `$true
`$watcher.EnableRaisingEvents = `$true

`$action = {
    `$path = `$Event.SourceEventArgs.FullPath
    `$changeType = `$Event.SourceEventArgs.ChangeType
    `$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    # Ignorar diretorios especificos
    if (`$path -like "*\.git\*" -or `$path -like "*\node_modules\*" -or `$path -like "*\logs\*") {
        return
    }
    
    # Log da mudanca
    `$logEntry = "[`$timestamp] `$changeType`: `$path"
    Add-Content -Path "logs/gatekeeper.log" -Value `$logEntry
    
    # Executar verificacao se for arquivo relevante
    if (`$path -match "\.(ps1|ts|tsx|html|js|css|json|md)$") {
        Start-Sleep -Seconds 2  # Aguardar arquivo ser salvo
        & "tools/gatekeeper/quick-check.ps1" -File `$path
    }
}

# Registrar eventos
Register-ObjectEvent -InputObject `$watcher -EventName "Changed" -Action `$action
Register-ObjectEvent -InputObject `$watcher -EventName "Created" -Action `$action
Register-ObjectEvent -InputObject `$watcher -EventName "Deleted" -Action `$action

Write-Host "File watcher iniciado. Pressione Ctrl+C para parar."
try {
    while (`$true) { Start-Sleep -Seconds 1 }
} finally {
    `$watcher.EnableRaisingEvents = `$false
    `$watcher.Dispose()
}
"@
    
    $fileWatcherScript | Out-File -FilePath "$GatekeeperDir/file-watcher.ps1" -Encoding UTF8
    Write-Host "File watcher criado: $GatekeeperDir/file-watcher.ps1" -ForegroundColor Green
}

# Funcao para criar integracao com editores
function Create-EditorIntegration {
    Write-Host "Criando integracao com editores..." -ForegroundColor Yellow
    
    # VS Code settings
    $vscodeSettings = @{
        "files.autoSave"                                       = "afterDelay"
        "files.autoSaveDelay"                                  = 1000
        "emmet.includeLanguages"                               = @{
            "typescript"      = "html"
            "typescriptreact" = "html"
        }
        "editor.formatOnSave"                                  = $true
        "editor.codeActionsOnSave"                             = @{
            "source.fixAll" = $true
        }
        "typescript.preferences.includePackageJsonAutoImports" = "auto"
        "files.exclude"                                        = @{
            "**/node_modules"    = $true
            "**/temp-obsolete-*" = $true
            "**/backup-*"        = $true
            "**/legacy"          = $true
        }
    }
    
    $vscodeSettings | ConvertTo-Json -Depth 10 | Out-File -FilePath ".vscode/settings.json" -Encoding UTF8
    Write-Host "Configuracao VS Code criada" -ForegroundColor Green
    
    # Pre-commit check script
    $preCommitCheck = @"
# Pre-commit Check - DOM v2
# Executado automaticamente antes de cada commit

param([string]`$File = "")

Write-Host "Executando verificacao pre-commit..." -ForegroundColor Cyan

# Carregar configuracao
`$config = Get-Content "tools/gatekeeper/config.json" | ConvertFrom-Json

# Verificacoes rapidas
`$violations = @()

# Verificar arquivos modificados
`$modifiedFiles = git diff --cached --name-only
foreach (`$file in `$modifiedFiles) {
    if (`$file -match "\.(ps1|ts|tsx|html|js|css)$") {
        `$content = Get-Content `$file -Raw -ErrorAction SilentlyContinue
        if (`$content) {
            # Verificar frameworks proibidos no frontend
            if (`$file -like "frontend/*" -or `$file -like "*.html") {
                foreach (`$framework in `$config.Rules.Architecture.ProhibitedFrameworks) {
                    if (`$content -match `$framework) {
                        `$violations += "Framework proibido `$framework em `$file"
                    }
                }
            }
            
            # Verificar comandos bash em scripts PowerShell
            if (`$file -like "*.ps1") {
                `$bashCommands = @("ls ", "cp ", "mv ", "rm ", "mkdir ", "cat ")
                foreach (`$cmd in `$bashCommands) {
                    if (`$content -match `$cmd) {
                        `$violations += "Comando bash `$cmd em `$file"
                    }
                }
            }
        }
    }
}

# Exibir violacoes
if (`$violations.Count -gt 0) {
    Write-Host "VIOLACOES ENCONTRADAS:" -ForegroundColor Red
    foreach (`$violation in `$violations) {
        Write-Host "  - `$violation" -ForegroundColor Red
    }
    Write-Host "Commit bloqueado. Corrija as violacoes antes de continuar." -ForegroundColor Red
    exit 1
} else {
    Write-Host "Nenhuma violacao encontrada. Commit permitido." -ForegroundColor Green
}
"@
    
    $preCommitCheck | Out-File -FilePath "$GatekeeperDir/pre-commit-check.ps1" -Encoding UTF8
    Write-Host "Script pre-commit criado" -ForegroundColor Green
    
    # Quick check script
    $quickCheck = @"
# Quick Check - DOM v2
# Verificacao rapida para arquivos individuais

param([string]`$File = "")

if (-not `$File) {
    Write-Host "Arquivo nao especificado" -ForegroundColor Red
    return
}

Write-Host "Verificando: `$File" -ForegroundColor Cyan

# Carregar configuracao
`$config = Get-Content "tools/gatekeeper/config.json" | ConvertFrom-Json

try {
    `$content = Get-Content `$File -Raw -ErrorAction Stop
    
    # Verificacoes baseadas no tipo de arquivo
    if (`$File -like "*.ps1") {
        # Verificar comandos bash
        `$bashCommands = @("ls ", "cp ", "mv ", "rm ", "mkdir ", "cat ")
        foreach (`$cmd in `$bashCommands) {
            if (`$content -match `$cmd) {
                Write-Host "AVISO: Comando bash `$cmd detectado em `$File" -ForegroundColor Yellow
            }
        }
        
        # Verificar tratamento de erros
        if (`$content -notmatch "try\s*\{|catch\s*\(|ErrorAction\s+Stop") {
            Write-Host "AVISO: Tratamento de erros ausente em `$File" -ForegroundColor Yellow
        }
    }
    
    if (`$File -like "frontend/*" -or `$File -like "*.html") {
        # Verificar frameworks proibidos
        foreach (`$framework in `$config.Rules.Architecture.ProhibitedFrameworks) {
            if (`$content -match `$framework) {
                Write-Host "ERRO: Framework proibido `$framework em `$File" -ForegroundColor Red
            }
        }
    }
    
    Write-Host "Verificacao concluida para `$File" -ForegroundColor Green
    
} catch {
    Write-Host "Erro ao verificar `$File`: `$(`$_.Exception.Message)" -ForegroundColor Red
}
"@
    
    $quickCheck | Out-File -FilePath "$GatekeeperDir/quick-check.ps1" -Encoding UTF8
    Write-Host "Script quick-check criado" -ForegroundColor Green
}

# Funcao para desinstalar gatekeeper
function Uninstall-Gatekeeper {
    Write-Host "DESINSTALANDO COMPLIANCE GATEKEEPER..." -ForegroundColor Magenta
    
    # Remover hooks do Git
    if (Test-Path -Path "$HooksDir/pre-commit") {
        Remove-Item -Path "$HooksDir/pre-commit" -Force
        Write-Host "Hook pre-commit removido" -ForegroundColor Green
    }
    
    if (Test-Path -Path "$HooksDir/post-commit") {
        Remove-Item -Path "$HooksDir/post-commit" -Force
        Write-Host "Hook post-commit removido" -ForegroundColor Green
    }
    
    # Remover diretorio do gatekeeper
    if (Test-Path -Path $GatekeeperDir) {
        Remove-Item -Path $GatekeeperDir -Recurse -Force
        Write-Host "Diretorio gatekeeper removido" -ForegroundColor Green
    }
    
    Write-Host "Gatekeeper desinstalado com sucesso!" -ForegroundColor Green
}

# Funcao para testar gatekeeper
function Test-Gatekeeper {
    Write-Host "TESTANDO COMPLIANCE GATEKEEPER..." -ForegroundColor Magenta
    
    # Verificar se esta instalado
    if (-not (Test-Path -Path $ConfigFile)) {
        Write-Host "Gatekeeper nao esta instalado. Execute -Install primeiro." -ForegroundColor Red
        return
    }
    
    # Carregar configuracao
    $config = Get-Content $ConfigFile | ConvertFrom-Json
    Write-Host "Configuracao carregada: $ConfigFile" -ForegroundColor Green
    
    # Verificar hooks
    if (Test-Path -Path "$HooksDir/pre-commit") {
        Write-Host "Hook pre-commit: OK" -ForegroundColor Green
    }
    else {
        Write-Host "Hook pre-commit: AUSENTE" -ForegroundColor Red
    }
    
    if (Test-Path -Path "$HooksDir/post-commit") {
        Write-Host "Hook post-commit: OK" -ForegroundColor Green
    }
    else {
        Write-Host "Hook post-commit: AUSENTE" -ForegroundColor Red
    }
    
    # Verificar scripts
    $scripts = @("pre-commit-check.ps1", "quick-check.ps1", "file-watcher.ps1")
    foreach ($script in $scripts) {
        $scriptPath = Join-Path -Path $GatekeeperDir -ChildPath $script
        if (Test-Path -Path $scriptPath) {
            Write-Host "Script $script: OK" -ForegroundColor Green
        }
        else {
            Write-Host "Script $script: AUSENTE" -ForegroundColor Red
        }
    }
    
    # Testar verificacao rapida
    Write-Host "`nTestando verificacao rapida..." -ForegroundColor Yellow
    $quickCheckPath = Join-Path -Path $GatekeeperDir -ChildPath "quick-check.ps1"
    & $quickCheckPath -File "compliance-enforcer.ps1"
    
    Write-Host "`nTeste concluido!" -ForegroundColor Green
}

# Funcao para mostrar status
function Show-GatekeeperStatus {
    Write-Host "STATUS DO COMPLIANCE GATEKEEPER" -ForegroundColor Magenta
    Write-Host "=" * 50 -ForegroundColor Gray
    
    if (Test-Path -Path $ConfigFile) {
        $config = Get-Content $ConfigFile | ConvertFrom-Json
        Write-Host "Status: INSTALADO" -ForegroundColor Green
        Write-Host "Auto-fix: $($config.AutoFix)" -ForegroundColor Cyan
        Write-Host "Pre-commit: $($config.PreCommit)" -ForegroundColor Cyan
        Write-Host "File watcher: $($config.FileWatcher)" -ForegroundColor Cyan
    }
    else {
        Write-Host "Status: NAO INSTALADO" -ForegroundColor Red
        Write-Host "Execute -Install para instalar" -ForegroundColor Yellow
    }
    
    Write-Host "`nComo usar:" -ForegroundColor Yellow
    Write-Host "1. Instalar: .\compliance-gatekeeper.ps1 -Install" -ForegroundColor White
    Write-Host "2. Testar: .\compliance-gatekeeper.ps1 -Test" -ForegroundColor White
    Write-Host "3. Status: .\compliance-gatekeeper.ps1 -Status" -ForegroundColor White
    Write-Host "4. Desinstalar: .\compliance-gatekeeper.ps1 -Uninstall" -ForegroundColor White
}

# Funcao principal
function Start-Gatekeeper {
    Write-Host "COMPLIANCE GATEKEEPER - DOM v2" -ForegroundColor Magenta
    Write-Host "Sistema integrado para humanos, IAs e edicoes manuais" -ForegroundColor Gray
    Write-Host "=" * 60 -ForegroundColor Gray
    
    if ($Install) {
        Install-Gatekeeper
    }
    elseif ($Uninstall) {
        Uninstall-Gatekeeper
    }
    elseif ($Test) {
        Test-Gatekeeper
    }
    elseif ($Status) {
        Show-GatekeeperStatus
    }
    else {
        Show-GatekeeperStatus
    }
}

# Executar gatekeeper
Start-Gatekeeper
