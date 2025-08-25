# Script simples para corrigir caracteres invalidos nos arquivos TypeScript

Write-Host "Corrigindo caracteres invalidos nos arquivos TypeScript..." -ForegroundColor Cyan

# Lista de arquivos para corrigir
$files = @(
    "src/routes/employees-prisma.ts",
    "src/routes/payments-prisma.ts", 
    "src/routes/budgets-prisma.ts",
    "src/routes/documents-prisma.ts",
    "src/routes/notifications-prisma.ts",
    "src/routes/profiles-prisma.ts",
    "src/routes/settings-prisma.ts",
    "src/routes/dashboard-prisma.ts",
    "src/routes/tasks-prisma.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Corrigindo: $file" -ForegroundColor Yellow
        
        # Ler o arquivo
        $content = Get-Content $file -Raw
        
        # Corrigir caracteres invalidos - abordagem mais simples
        $content = $content -replace '\\n', "`n"
        
        # Salvar o arquivo
        Set-Content -Path $file -Value $content -Encoding UTF8
        
        Write-Host "Arquivo corrigido: $file" -ForegroundColor Green
    }
}

Write-Host "Todos os arquivos foram corrigidos!" -ForegroundColor Green
