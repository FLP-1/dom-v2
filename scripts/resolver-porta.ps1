# Script para Resolver Problemas de Porta - DOM v2
# Executar no diretório: C:\dom-v2

Write-Host "🔧 RESOLVENDO PROBLEMAS DE PORTA - DOM v2" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Função para verificar e liberar porta
function Resolver-Porta {
    param(
        [int]$Porta
    )
    
    Write-Host "🔍 Verificando porta $Porta..." -ForegroundColor Yellow
    
    # Verificar se a porta está em uso
    $processos = netstat -ano | findstr ":$Porta"
    
    if ($processos) {
        Write-Host "⚠️ Porta $Porta está em uso!" -ForegroundColor Red
        Write-Host "Processos encontrados:" -ForegroundColor Yellow
        $processos | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
        
        # Extrair PIDs
        $pids = $processos | ForEach-Object {
            $partes = $_ -split '\s+'
            $partes[-1]
        } | Sort-Object -Unique
        
        Write-Host ""
        Write-Host "🔄 Finalizando processos..." -ForegroundColor Yellow
        
        foreach ($pid in $pids) {
            try {
                $processo = Get-Process -Id $pid -ErrorAction Stop
                Write-Host "   Finalizando: $($processo.ProcessName) (PID: $pid)" -ForegroundColor White
                Stop-Process -Id $pid -Force -ErrorAction Stop
                Write-Host "   ✅ Processo finalizado!" -ForegroundColor Green
            } catch {
                Write-Host "   ❌ Erro ao finalizar PID $pid" -ForegroundColor Red
            }
        }
        
        Start-Sleep -Seconds 2
        
        # Verificar se a porta foi liberada
        $processosApos = netstat -ano | findstr ":$Porta"
        if (-not $processosApos) {
            Write-Host "✅ Porta $Porta liberada com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "❌ Porta $Porta ainda está em uso!" -ForegroundColor Red
        }
    } else {
        Write-Host "✅ Porta $Porta está livre!" -ForegroundColor Green
    }
    
    Write-Host ""
}

# Resolver portas comuns
Resolver-Porta -Porta 3000  # React Native Web
Resolver-Porta -Porta 8081  # Metro Bundler
Resolver-Porta -Porta 3001  # Backend (se estiver rodando)

Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Magenta
Write-Host "   1. Execute: cd frontend && npm run web" -ForegroundColor White
Write-Host "   2. Ou execute: .\scripts\testar-web.ps1" -ForegroundColor White
Write-Host "   3. Para Android: .\scripts\testar-android.ps1" -ForegroundColor White
Write-Host ""

Write-Host "🔧 PROBLEMAS DE PORTA RESOLVIDOS!" -ForegroundColor Green 