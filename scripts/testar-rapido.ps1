# Script Rápido para Testar DOM v2
# Executar no diretório: C:\dom-v2

Write-Host "🚀 TESTE RÁPIDO - DOM v2" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Resolver problemas de porta primeiro
Write-Host "🔧 Resolvendo problemas de porta..." -ForegroundColor Yellow
$processos = netstat -ano | findstr ":3000"
if ($processos) {
    Write-Host "⚠️ Porta 3000 em uso, finalizando processos..." -ForegroundColor Yellow
    $pids = $processos | ForEach-Object {
        $partes = $_ -split '\s+'
        $partes[-1]
    } | Sort-Object -Unique
    
    foreach ($pid in $pids) {
        try {
            Stop-Process -Id $pid -Force -ErrorAction Stop
            Write-Host "   ✅ Processo $pid finalizado" -ForegroundColor Green
        } catch {
            Write-Host "   ❌ Erro ao finalizar $pid" -ForegroundColor Red
        }
    }
    Start-Sleep -Seconds 3
}

# Navegar para frontend
Set-Location frontend

# Verificar dependências
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Iniciar servidor
Write-Host "🚀 Iniciando servidor de desenvolvimento..." -ForegroundColor Green
Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm run web" -WindowStyle Minimized

# Aguardar servidor inicializar
Write-Host "⏳ Aguardando servidor inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Tentar abrir no navegador
Write-Host "🌐 Abrindo no navegador..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "📱 FUNCIONALIDADES DISPONÍVEIS:" -ForegroundColor Magenta
Write-Host "   ✅ Sistema de Autenticação (CPF/CNPJ)" -ForegroundColor Green
Write-Host "   ✅ Gestão Financeira" -ForegroundColor Green
Write-Host "   ✅ Recursos Humanos" -ForegroundColor Green
Write-Host "   ✅ Sistema de Temas" -ForegroundColor Green
Write-Host "   ✅ Notificações" -ForegroundColor Green
Write-Host "   ✅ Dashboard" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 COMANDOS ÚTEIS:" -ForegroundColor Cyan
Write-Host "   • Parar servidor: Ctrl+C no terminal" -ForegroundColor White
Write-Host "   • Recarregar: F5 no navegador" -ForegroundColor White
Write-Host "   • DevTools: F12 no navegador" -ForegroundColor White
Write-Host ""

Write-Host "🌐 DOM v2 está rodando em: http://localhost:3000" -ForegroundColor Green
Write-Host "💡 Teste as funcionalidades implementadas!" -ForegroundColor Cyan 