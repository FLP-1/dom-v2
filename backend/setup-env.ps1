# Script para configurar ambiente de desenvolvimento DOM v2
# Execute este script na pasta backend/

Write-Host "🔧 Configurando ambiente de desenvolvimento DOM v2..." -ForegroundColor Green

# Verificar se estamos na pasta correta
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Execute este script na pasta backend/" -ForegroundColor Red
    exit 1
}

# Criar arquivo .env
$envContent = @"
# Configuração do Banco de Dados PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dom_v2"

# Configurações do Servidor
PORT=3001
NODE_ENV=development

# Configurações de Segurança (para desenvolvimento)
JWT_SECRET=dom_v2_development_secret_key_2024
SESSION_SECRET=dom_v2_session_secret_2024

# Configurações de Log
LOG_LEVEL=debug
"@

# Salvar arquivo .env
$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ Arquivo .env criado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "1. Instale PostgreSQL: https://www.postgresql.org/download/" -ForegroundColor White
Write-Host "2. Crie um banco chamado 'dom_v2'" -ForegroundColor White
Write-Host "3. Configure usuário 'postgres' com senha 'postgres'" -ForegroundColor White
Write-Host "4. Ou ajuste a DATABASE_URL no arquivo .env conforme sua configuração" -ForegroundColor White
Write-Host "5. Execute: npx prisma db push" -ForegroundColor White
Write-Host "6. Execute: npx prisma generate" -ForegroundColor White
Write-Host "7. Execute: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Para instalar PostgreSQL no Windows:" -ForegroundColor Cyan
Write-Host "   - Baixe em: https://www.postgresql.org/download/windows/" -ForegroundColor White
Write-Host "   - Use o instalador oficial" -ForegroundColor White
Write-Host "   - Defina senha do postgres como 'postgres'" -ForegroundColor White
Write-Host "   - Mantenha a porta padrão 5432" -ForegroundColor White 