# Teste simples de compliance
Write-Host "Teste de Compliance - DOM v2" -ForegroundColor Green
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Yellow
Write-Host "Diretorio: $(Get-Location)" -ForegroundColor Cyan

# Verificar estrutura basica
$requiredDirs = @("frontend", "backend", "docs", "scripts")
$score = 0
$total = $requiredDirs.Count

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "SUCESSO: Diretorio $dir existe" -ForegroundColor Green
        $score++
    } else {
        Write-Host "ERRO: Diretorio $dir nao encontrado" -ForegroundColor Red
    }
}

Write-Host "`nPontuacao: $score/$total" -ForegroundColor White
$percentage = [math]::Round(($score / $total) * 100, 2)
Write-Host "Conformidade: $percentage%" -ForegroundColor $(if ($percentage -ge 80) { "Green" } elseif ($percentage -ge 60) { "Yellow" } else { "Red" })

Write-Host "`nTeste concluido!" -ForegroundColor Green
