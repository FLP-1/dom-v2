# Script para configurar ambiente de desenvolvimento DOM v2
# Execute este script na pasta backend/

Write-Host "Configurando ambiente de desenvolvimento DOM v2..." -ForegroundColor Green

# Verificar se estamos na pasta correta
if (-not (Test-Path "package.json")) {
    Write-Host "Execute este script na pasta backend/" -ForegroundColor Red
    exit 1
}

# Criar arquivo .env
$envContent = @"
# Configuracao do Banco de Dados PostgreSQL
DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"

# Configuracoes do Servidor
PORT=3001
NODE_ENV=development

# Configuracoes de Seguranca (para desenvolvimento)
JWT_SECRET=dom_v2_development_secret_key_2024
SESSION_SECRET=dom_v2_session_secret_2024

# Configuracoes de Log
LOG_LEVEL=debug
"@

# Salvar arquivo .env
$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "Arquivo .env criado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "PROXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "1. PostgreSQL ja configurado" -ForegroundColor White
Write-Host "2. Banco 'db_dom' ja criado" -ForegroundColor White
Write-Host "3. Execute: npx prisma db push" -ForegroundColor White
Write-Host "4. Execute: npx prisma generate" -ForegroundColor White
Write-Host "5. Execute: npm run dev" -ForegroundColor White 