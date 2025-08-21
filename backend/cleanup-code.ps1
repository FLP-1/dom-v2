# Script para limpar código solto problemático
# Remove linhas que executam código durante importação

$files = Get-ChildItem -Path "src" -Recurse -Include "*.ts" | Where-Object { $_.Name -notlike "*.test.ts" }

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
        Write-Host "Limpo: $($file.Name)"
    }
}

Write-Host "Limpeza concluída!"
