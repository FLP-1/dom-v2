# 🎨 Script para Executar Agente de Contratação de Artista de Telas
# Diretório: /c%3A/dom-v2/scripts
# Descrição: Executa o agente especializado para encontrar e contratar artista de telas

Write-Host "🎨 Iniciando Agente de Contratação de Artista de Telas..." -ForegroundColor Cyan
Write-Host "📁 Diretório atual: $(Get-Location)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "scripts/agente-contratacao-artista-telas.js")) {
    Write-Host "❌ Erro: Arquivo do agente não encontrado!" -ForegroundColor Red
    Write-Host "📍 Certifique-se de estar no diretório raiz do projeto DOM v2" -ForegroundColor Yellow
    exit 1
}

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro: Node.js não encontrado!" -ForegroundColor Red
    Write-Host "📥 Instale o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Criar diretório de logs se não existir
$logsDir = "logs"
if (-not (Test-Path $logsDir)) {
    New-Item -ItemType Directory -Path $logsDir -Force | Out-Null
    Write-Host "📁 Diretório de logs criado: $logsDir" -ForegroundColor Green
}

# Gerar timestamp para o log
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logFile = "logs/agente-contratacao-artista-$timestamp.log"

Write-Host "🚀 Executando agente..." -ForegroundColor Green
Write-Host "📝 Log será salvo em: $logFile" -ForegroundColor Yellow

# Executar o agente
try {
    $startTime = Get-Date
    Write-Host "⏰ Início: $startTime" -ForegroundColor Cyan
    
    # Executar o agente e capturar output
    $output = node scripts/agente-contratacao-artista-telas.js 2>&1
    
    $endTime = Get-Date
    $duration = $endTime - $startTime
    
    # Salvar log
    $logContent = @"
=== AGENTE DE CONTRATAÇÃO DE ARTISTA DE TELAS - DOM V2 ===
Data: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Diretório: $(Get-Location)
Node.js: $nodeVersion
Duração: $($duration.TotalSeconds.ToString("F2")) segundos

=== OUTPUT ===
$output

=== FIM DA EXECUÇÃO ===
"@
    
    $logContent | Out-File -FilePath $logFile -Encoding UTF8
    
    # Exibir resultado
    Write-Host "`n=== RESULTADO DA EXECUÇÃO ===" -ForegroundColor Green
    Write-Host $output -ForegroundColor White
    
    Write-Host "`n✅ Agente executado com sucesso!" -ForegroundColor Green
    Write-Host "⏱️  Duração: $($duration.TotalSeconds.ToString("F2")) segundos" -ForegroundColor Cyan
    Write-Host "📝 Log salvo em: $logFile" -ForegroundColor Yellow
    
    # Verificar arquivos gerados
    Write-Host "`n📁 Arquivos gerados:" -ForegroundColor Cyan
    $recruitmentDir = "docs/recruitment"
    if (Test-Path $recruitmentDir) {
        Get-ChildItem -Path $recruitmentDir -Recurse | ForEach-Object {
            Write-Host "  📄 $($_.Name)" -ForegroundColor White
        }
    }
    
    # Próximos passos
    Write-Host "`n🎯 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
    Write-Host "1. Revisar anúncio de vaga em: docs/recruitment/anuncio-vaga-artista-telas.md" -ForegroundColor White
    Write-Host "2. Divulgar em plataformas especializadas" -ForegroundColor White
    Write-Host "3. Monitorar candidaturas recebidas" -ForegroundColor White
    Write-Host "4. Executar processo seletivo" -ForegroundColor White
    
} catch {
    Write-Host "❌ Erro na execução do agente: $($_.Exception.Message)" -ForegroundColor Red
    
    # Salvar log de erro
    $errorLog = @"
=== ERRO NA EXECUÇÃO DO AGENTE ===
Data: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Erro: $($_.Exception.Message)
Stack: $($_.Exception.StackTrace)

=== FIM DO ERRO ===
"@
    
    $errorLog | Out-File -FilePath "logs/erro-agente-contratacao-$timestamp.log" -Encoding UTF8
    Write-Host "📝 Log de erro salvo em: logs/erro-agente-contratacao-$timestamp.log" -ForegroundColor Yellow
}

Write-Host "`n🎨 Agente de Contratação de Artista de Telas finalizado!" -ForegroundColor Cyan 