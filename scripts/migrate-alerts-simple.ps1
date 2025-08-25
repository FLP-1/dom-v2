# Script PowerShell para Migração de Alerts Hardcoded
# DOM v2 - Sistema de Mensagens Centralizado

Write-Host "Iniciando migracao de alerts para sistema de mensagens..." -ForegroundColor Green
Write-Host ""

$frontendPath = "frontend/public"
$htmlFiles = Get-ChildItem -Path $frontendPath -Filter "*.html"

Write-Host "Encontrados $($htmlFiles.Count) arquivos HTML para processar" -ForegroundColor Cyan

$totalAlerts = 0
$totalConfirms = 0
$migratedFiles = 0

foreach ($file in $htmlFiles) {
    Write-Host "Processando: $($file.Name)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    # Verificar se já tem o sistema de mensagens
    $hasMessageSystem = $content -match "messages-system\.js"
    
    # Migrar alerts
    $alerts = [regex]::Matches($content, 'alert\s*\(\s*([^)]+)\s*\)')
    foreach ($alert in $alerts) {
        $alertText = $alert.Groups[1].Value
        $cleanText = $alertText -replace '^["''`]|["''`]$', ''
        
        Write-Host "  Alert encontrado: $cleanText" -ForegroundColor Gray
        
        # Mapear para ID do sistema
        $messageId = $null
        if ($cleanText -like "*Funcionario cadastrado com sucesso*") { $messageId = "employee.create.success" }
        elseif ($cleanText -like "*Funcionario deletado com sucesso*") { $messageId = "employee.delete.success" }
        elseif ($cleanText -like "*Erro ao deletar funcionario*") { $messageId = "employee.delete.error" }
        elseif ($cleanText -like "*Erro ao carregar funcionarios*") { $messageId = "employee.load.error" }
        elseif ($cleanText -like "*Orcamento criado com sucesso*") { $messageId = "budget.create.success" }
        elseif ($cleanText -like "*Orcamento deletado com sucesso*") { $messageId = "budget.delete.success" }
        elseif ($cleanText -like "*Pagamento criado com sucesso*") { $messageId = "payment.create.success" }
        elseif ($cleanText -like "*Pagamento marcado como pago*") { $messageId = "payment.process.success" }
        elseif ($cleanText -like "*Erro ao registrar entrada*") { $messageId = "timeclock.entry.error" }
        elseif ($cleanText -like "*Erro ao registrar saida*") { $messageId = "timeclock.exit.error" }
        elseif ($cleanText -like "*Configuracoes salvas com sucesso*") { $messageId = "settings.notification.success" }
        elseif ($cleanText -like "*Relatorio gerado com sucesso*") { $messageId = "reports.financial.success" }
        elseif ($cleanText -like "*Perfil atualizado com sucesso*") { $messageId = "profile.update.success" }
        elseif ($cleanText -like "*Documento enviado com sucesso*") { $messageId = "documents.upload.success" }
        elseif ($cleanText -like "*Documento excluido com sucesso*") { $messageId = "documents.delete.success" }
        elseif ($cleanText -like "*Erro ao enviar documento*") { $messageId = "documents.upload.error" }
        elseif ($cleanText -like "*Erro ao baixar documento*") { $messageId = "documents.download.error" }
        elseif ($cleanText -like "*Erro ao excluir documento*") { $messageId = "documents.delete.error" }
        elseif ($cleanText -like "*Funcionalidade sera implementada*") { $messageId = "feature.coming.soon" }
        else { $messageId = "system.error" }
        
        if ($messageId) {
            $replacement = "showMessage('$messageId')"
            $content = $content -replace [regex]::Escape($alert.Value), $replacement
            $modified = $true
            Write-Host "    Migrado para: $messageId" -ForegroundColor Green
        } else {
            Write-Host "    Nao mapeado" -ForegroundColor Yellow
        }
    }
    
    # Migrar confirms
    $confirms = [regex]::Matches($content, 'confirm\s*\(\s*([^)]+)\s*\)')
    foreach ($confirm in $confirms) {
        $confirmText = $confirm.Groups[1].Value
        $cleanText = $confirmText -replace '^["''`]|["''`]$', ''
        
        Write-Host "  Confirm encontrado: $cleanText" -ForegroundColor Gray
        
        # Mapear para ID do sistema
        $messageId = $null
        if ($cleanText -like "*Tem certeza que deseja excluir*") { $messageId = "confirm.delete" }
        elseif ($cleanText -like "*Tem certeza que deseja deletar*") { $messageId = "confirm.delete" }
        elseif ($cleanText -like "*Tem certeza que deseja sair*") { $messageId = "confirm.logout" }
        else { $messageId = "confirm.delete" }
        
        if ($messageId) {
            $replacement = "await messageSystem.confirm('$messageId')"
            $content = $content -replace [regex]::Escape($confirm.Value), $replacement
            $modified = $true
            Write-Host "    Migrado para: $messageId" -ForegroundColor Green
        } else {
            Write-Host "    Nao mapeado" -ForegroundColor Yellow
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
        Write-Host "  Arquivo migrado com sucesso" -ForegroundColor Green
    } else {
        Write-Host "  Nenhuma alteracao necessaria" -ForegroundColor Gray
    }
    
    $totalAlerts += $alerts.Count
    $totalConfirms += $confirms.Count
}

Write-Host ""
Write-Host "RELATORIO DE MIGRACAO" -ForegroundColor Cyan
Write-Host "=" * 50
Write-Host "Total de arquivos: $($htmlFiles.Count)" -ForegroundColor White
Write-Host "Total de alerts: $totalAlerts" -ForegroundColor White
Write-Host "Total de confirms: $totalConfirms" -ForegroundColor White
Write-Host "Arquivos migrados: $migratedFiles" -ForegroundColor White

Write-Host ""
Write-Host "Migracao concluida com sucesso!" -ForegroundColor Green





