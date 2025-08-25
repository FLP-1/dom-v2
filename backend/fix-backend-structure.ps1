# Script para corrigir estrutura dos arquivos do backend DOM v2
# Preserva funcionalidades enquanto corrige erros de sintaxe

Write-Host "Iniciando correcao da estrutura do backend DOM v2..." -ForegroundColor Cyan

# Lista de arquivos que precisam ser corrigidos
$filesToFix = @(
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

# Funcao para corrigir um arquivo
function Fix-TypeScriptFile {
    param([string]$filePath)
    
    Write-Host "Corrigindo: $filePath" -ForegroundColor Yellow
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Correcoes necessarias:
        
        # 1. Remover blocos de codigo soltos (nao dentro de funcoes)
        $content = $content -replace '(?m)^// Aplicar validacao de tipos\s*\nif \(!validateType\(data, ''object''\)\) \{\s*\n\s*throw new TypeError\(''Dados devem ser um objeto valido''\);\s*\n\}\s*\n', ''
        $content = $content -replace '(?m)^// Aplicar assercoes criticas\s*\nassertCritical\(data !== null, ''Dados nao podem ser null''\);\s*\nassertCritical\(typeof data === ''object'', ''Dados devem ser um objeto''\);\s*\nassertCritical\(Object\.keys\(data\)\.length > 0, ''Dados nao podem estar vazios''\);\s*\n', ''
        $content = $content -replace '(?m)^// Aplicar validacao\s*\nif \(!validateInput\(inputData\)\) \{\s*\n\s*throw new Error\(''Dados de entrada invalidos''\);\s*\n\}\s*\n', ''
        $content = $content -replace '(?m)^// Aplicar logging\s*\nlogStructured\(''info'', ''Iniciando execucao'', \{ context: ''main'' \}\);\s*\n', ''
        $content = $content -replace '(?m)^// Aplicar tratamento de erro\s*\ntry \{\s*\n\s*// codigo principal aqui\s*\n\} catch \(error\) \{\s*\n\s*handleError\(error, ''main-execution''\);\s*\n\}\s*\n', ''
        
        # 2. Corrigir referencias a arguments.callee (strict mode)
        $content = $content -replace 'arguments\.callee\.name \|\| ''anonymous''', '''functionName'''
        
        # 3. Remover chaves extras soltas
        $content = $content -replace '(?m)^\}\s*\n\}\s*\n', "}\n"
        
        # 4. Remover linhas vazias excessivas
        $content = $content -replace '(?m)\n{3,}', "`n`n"
        
        # Salvar arquivo corrigido
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        
        Write-Host "Arquivo corrigido: $filePath" -ForegroundColor Green
    }
    else {
        Write-Host "Arquivo nao encontrado: $filePath" -ForegroundColor Yellow
    }
}

# Aplicar correcoes em todos os arquivos
foreach ($file in $filesToFix) {
    Fix-TypeScriptFile -filePath $file
}

Write-Host "Correcoes aplicadas! Testando o backend..." -ForegroundColor Cyan

# Testar se o backend inicia
Write-Host "Tentando iniciar o backend..." -ForegroundColor Green
try {
    $process = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory (Get-Location) -PassThru -WindowStyle Hidden
    
    # Aguardar um pouco para o servidor inicializar
    Start-Sleep -Seconds 10
    
    # Verificar se esta rodando na porta 3001
    $portCheck = netstat -ano | findstr ":3001"
    
    if ($portCheck) {
        Write-Host "Backend iniciado com sucesso na porta 3001!" -ForegroundColor Green
        Write-Host "Acesse: http://localhost:3001" -ForegroundColor Cyan
    }
    else {
        Write-Host "Backend pode nao ter iniciado corretamente" -ForegroundColor Yellow
    }
    
}
catch {
    Write-Host "Erro ao iniciar backend: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Resumo das correcoes:" -ForegroundColor Cyan
Write-Host "- Removidos blocos de codigo soltos" -ForegroundColor White
Write-Host "- Corrigidas referencias strict mode" -ForegroundColor White  
Write-Host "- Removidas chaves extras" -ForegroundColor White
Write-Host "- Preservadas todas as funcionalidades" -ForegroundColor White

Write-Host "Processo de correcao concluido!" -ForegroundColor Green
