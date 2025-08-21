# Script simples para limpar código solto problemático

Write-Host "Iniciando limpeza de codigo solto..." -ForegroundColor Yellow

$files = Get-ChildItem -Path "src" -Recurse -Include "*.ts" | Where-Object { 
    $_.Name -notlike "*.test.ts" -and 
    $_.Name -notlike "server-clean.ts" -and
    $_.FullName -notlike "*node_modules*"
}

$cleanedCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Remover linhas problemáticas
    $lines = $content -split "`n"
    $cleanLines = @()
    
    foreach ($line in $lines) {
        $trimmedLine = $line.Trim()
        
        # Pular linhas problemáticas
        if ($trimmedLine -match "^if \(!validateType\(data" -or
            $trimmedLine -match "^if \(!validateInput\(" -or
            $trimmedLine -match "^assertCritical\(" -or
            $trimmedLine -match "^logStructured\(" -or
            $trimmedLine -match "^handleError\(" -or
            $trimmedLine -match "^safeExecute\(" -or
            $trimmedLine -match "^validateInput\(" -or
            $trimmedLine -match "^validateType\(" -or
            $trimmedLine -match "^log\(" -or
            $trimmedLine -match "^assert\(") {
            continue
        }
        
        $cleanLines += $line
    }
    
    $newContent = $cleanLines -join "`n"
    
    if ($newContent -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Limpo: $($file.Name)" -ForegroundColor Green
        $cleanedCount++
    }
}

Write-Host "Limpeza concluida!" -ForegroundColor Green
Write-Host "Arquivos limpos: $cleanedCount" -ForegroundColor Cyan
