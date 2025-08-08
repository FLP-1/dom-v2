# Script para iniciar o servidor de teste do dashboard
Write-Host "🚀 Iniciando servidor de teste do dashboard..." -ForegroundColor Green

# Definir variável de ambiente
$env:DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"

# Iniciar servidor
Write-Host "📡 Iniciando servidor na porta 3001..." -ForegroundColor Yellow
npx ts-node src/server-dashboard-test.ts 