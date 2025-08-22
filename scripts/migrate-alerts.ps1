# Script PowerShell para Migração de Alerts Hardcoded
# DOM v2 - Sistema de Mensagens Centralizado

Write-Host "🚀 Iniciando migração de alerts para sistema de mensagens..." -ForegroundColor Green
Write-Host ""

$frontendPath = "frontend/public"
$htmlFiles = Get-ChildItem -Path $frontendPath -Filter "*.html"

Write-Host "📁 Encontrados $($htmlFiles.Count) arquivos HTML para processar" -ForegroundColor Cyan

$totalAlerts = 0
$totalConfirms = 0
$migratedFiles = 0

foreach ($file in $htmlFiles) {
    Write-Host "📄 Processando: $($file.Name)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $modified = $false
    
    # Verificar se já tem o sistema de mensagens
    $hasMessageSystem = $content -match "messages-system\.js"
    
    # Migrar alerts
    $alerts = [regex]::Matches($content, 'alert\s*\(\s*([^)]+)\s*\)')
    foreach ($alert in $alerts) {
        $alertText = $alert.Groups[1].Value
        $cleanText = $alertText -replace '^["''`]|["''`]$', ''
        
        Write-Host "  🔍 Alert encontrado: `"$cleanText`"" -ForegroundColor Gray
        
        # Mapear para ID do sistema
        $messageId = $null
        switch -Wildcard ($cleanText) {
            "*Funcionário cadastrado com sucesso*" { $messageId = "employee.create.success" }
            "*Funcionário deletado com sucesso*" { $messageId = "employee.delete.success" }
            "*Erro ao deletar funcionário*" { $messageId = "employee.delete.error" }
            "*Erro ao carregar funcionários*" { $messageId = "employee.load.error" }
            "*Orçamento criado com sucesso*" { $messageId = "budget.create.success" }
            "*Orçamento deletado com sucesso*" { $messageId = "budget.delete.success" }
            "*Pagamento criado com sucesso*" { $messageId = "payment.create.success" }
            "*Pagamento marcado como pago*" { $messageId = "payment.process.success" }
            "*Erro ao registrar entrada*" { $messageId = "timeclock.entry.error" }
            "*Erro ao registrar saída*" { $messageId = "timeclock.exit.error" }
            "*Configurações salvas com sucesso*" { $messageId = "settings.notification.success" }
            "*Relatório gerado com sucesso*" { $messageId = "reports.financial.success" }
            "*Perfil atualizado com sucesso*" { $messageId = "profile.update.success" }
            "*Documento enviado com sucesso*" { $messageId = "documents.upload.success" }
            "*Documento excluído com sucesso*" { $messageId = "documents.delete.success" }
            "*Erro ao enviar documento*" { $messageId = "documents.upload.error" }
            "*Erro ao baixar documento*" { $messageId = "documents.download.error" }
            "*Erro ao excluir documento*" { $messageId = "documents.delete.error" }
            "*Funcionalidade será implementada*" { $messageId = "feature.coming.soon" }
            default { $messageId = "system.error" }
        }
        
        if ($messageId) {
            $replacement = "showMessage('$messageId')"
            $content = $content -replace [regex]::Escape($alert.Value), $replacement
            $modified = $true
            Write-Host "    ✅ Migrado para: $messageId" -ForegroundColor Green
        } else {
            Write-Host "    ⚠️  Não mapeado" -ForegroundColor Yellow
        }
    }
    
    # Migrar confirms
    $confirms = [regex]::Matches($content, 'confirm\s*\(\s*([^)]+)\s*\)')
    foreach ($confirm in $confirms) {
        $confirmText = $confirm.Groups[1].Value
        $cleanText = $confirmText -replace '^["''`]|["''`]$', ''
        
        Write-Host "  🔍 Confirm encontrado: `"$cleanText`"" -ForegroundColor Gray
        
        # Mapear para ID do sistema
        $messageId = $null
        switch -Wildcard ($cleanText) {
            "*Tem certeza que deseja excluir*" { $messageId = "confirm.delete" }
            "*Tem certeza que deseja deletar*" { $messageId = "confirm.delete" }
            "*Tem certeza que deseja sair*" { $messageId = "confirm.logout" }
            default { $messageId = "confirm.delete" }
        }
        
        if ($messageId) {
            $replacement = "await messageSystem.confirm('$messageId')"
            $content = $content -replace [regex]::Escape($confirm.Value), $replacement
            $modified = $true
            Write-Host "    ✅ Migrado para: $messageId" -ForegroundColor Green
        } else {
            Write-Host "    ⚠️  Não mapeado" -ForegroundColor Yellow
        }
    }
    
    # Adicionar sistema de mensagens se necessário
    if ($modified -and -not $hasMessageSystem) {
        if ($content -match '<script src="js/components\.js"></script>') {
            $content = $content -replace '<script src="js/components\.js"></script>', '<script src="js/messages-system.js"></script>`n    <script src="js/components.js"></script>'
        } elseif ($content -match '</body>') {
            $content = $content -replace '</body>', '    <script src="js/messages-system.js"></script>`n</body>'
        }
    }
    
    # Salvar arquivo se houve modificações
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        $migratedFiles++
        Write-Host "  ✅ Arquivo migrado com sucesso" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️  Nenhuma alteração necessária" -ForegroundColor Gray
    }
    
    $totalAlerts += $alerts.Count
    $totalConfirms += $confirms.Count
}

Write-Host ""
Write-Host "📊 RELATÓRIO DE MIGRAÇÃO" -ForegroundColor Cyan
Write-Host "=" * 50
Write-Host "📁 Total de arquivos: $($htmlFiles.Count)" -ForegroundColor White
Write-Host "🔍 Total de alerts: $totalAlerts" -ForegroundColor White
Write-Host "🔍 Total de confirms: $totalConfirms" -ForegroundColor White
Write-Host "📝 Arquivos migrados: $migratedFiles" -ForegroundColor White

Write-Host ""
Write-Host "✅ Migração concluída com sucesso!" -ForegroundColor Green




