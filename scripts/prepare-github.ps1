# Script para preparar o DOM v2 para upload no GitHub
# Executar: .\scripts\prepare-github.ps1

Write-Host "🚀 Preparando DOM v2 para GitHub..." -ForegroundColor Green

# 1. Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

# 2. Limpar arquivos desnecessários
Write-Host "🧹 Limpando arquivos desnecessários..." -ForegroundColor Yellow

# Remover arquivos de backup
if (Test-Path "docs-backup") {
    Remove-Item -Recurse -Force "docs-backup" -ErrorAction SilentlyContinue
    Write-Host "✅ Removido docs-backup" -ForegroundColor Green
}

if (Test-Path "docs-backup-completo") {
    Remove-Item -Recurse -Force "docs-backup-completo" -ErrorAction SilentlyContinue
    Write-Host "✅ Removido docs-backup-completo" -ForegroundColor Green
}

if (Test-Path "docs-backup-final") {
    Remove-Item -Recurse -Force "docs-backup-final" -ErrorAction SilentlyContinue
    Write-Host "✅ Removido docs-backup-final" -ForegroundColor Green
}

if (Test-Path "docs-backup-nomenclatura") {
    Remove-Item -Recurse -Force "docs-backup-nomenclatura" -ErrorAction SilentlyContinue
    Write-Host "✅ Removido docs-backup-nomenclatura" -ForegroundColor Green
}

if (Test-Path "docs-backup-raiz") {
    Remove-Item -Recurse -Force "docs-backup-raiz" -ErrorAction SilentlyContinue
    Write-Host "✅ Removido docs-backup-raiz" -ForegroundColor Green
}

if (Test-Path "frontend-backup") {
    Remove-Item -Recurse -Force "frontend-backup" -ErrorAction SilentlyContinue
    Write-Host "✅ Removido frontend-backup" -ForegroundColor Green
}

# 3. Verificar se .gitignore existe
if (-not (Test-Path ".gitignore")) {
    Write-Host "❌ Erro: Arquivo .gitignore não encontrado" -ForegroundColor Red
    exit 1
}

# 4. Verificar se LICENSE existe
if (-not (Test-Path "LICENSE")) {
    Write-Host "❌ Erro: Arquivo LICENSE não encontrado" -ForegroundColor Red
    exit 1
}

# 5. Verificar se README.md existe
if (-not (Test-Path "README.md")) {
    Write-Host "❌ Erro: Arquivo README.md não encontrado" -ForegroundColor Red
    exit 1
}

# 6. Verificar se CONTRIBUTING.md existe
if (-not (Test-Path "CONTRIBUTING.md")) {
    Write-Host "❌ Erro: Arquivo CONTRIBUTING.md não encontrado" -ForegroundColor Red
    exit 1
}

# 7. Verificar estrutura do projeto
Write-Host "📁 Verificando estrutura do projeto..." -ForegroundColor Yellow

$requiredDirs = @("frontend", "backend", "docs", "scripts")
foreach ($dir in $requiredDirs) {
    if (-not (Test-Path $dir)) {
        Write-Host "❌ Erro: Diretório $dir não encontrado" -ForegroundColor Red
        exit 1
    }
}

# 8. Verificar arquivos essenciais
Write-Host "📄 Verificando arquivos essenciais..." -ForegroundColor Yellow

$essentialFiles = @(
    "frontend/package.json",
    "backend/package.json",
    "frontend/src/App.tsx",
    "backend/src/server.ts"
)

foreach ($file in $essentialFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "❌ Erro: Arquivo $file não encontrado" -ForegroundColor Red
        exit 1
    }
}

# 9. Verificar se há arquivos .env (devem ser ignorados)
Write-Host "🔒 Verificando arquivos sensíveis..." -ForegroundColor Yellow

$envFiles = @(".env", "backend/.env", "frontend/.env")
foreach ($file in $envFiles) {
    if (Test-Path $file) {
        Write-Host "⚠️  Aviso: Arquivo $file encontrado - certifique-se de que está no .gitignore" -ForegroundColor Yellow
    }
}

# 10. Criar arquivo de versão
$version = "2.0.0"
$buildDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$versionContent = @"
# DOM v2 - Versão para GitHub

## Informações da Versão
- **Versão**: $version
- **Data de Build**: $buildDate
- **Status**: 81.2% implementado
- **Preparado para**: GitHub

## Funcionalidades Implementadas
- ✅ Sistema de Autenticação (CPF/CNPJ)
- ✅ Sistema de Temas Regional
- ✅ Sistema de Notificações
- ✅ Validação Completa (Frontend + Backend)
- ✅ Dashboard Básico
- ✅ Gestão Financeira Parcial
- ✅ Recursos Humanos Parcial

## Próximas Fases
- 🔄 Dashboard Avançado
- 🔄 Gestão Financeira Completa
- 🔄 Sistema de Relatórios
- 🔄 Integração com APIs Externas

## Instruções de Instalação
1. Clone o repositório
2. Execute: npm run install-all
3. Configure o banco de dados
4. Execute: npm run start-dev

## Contato
- Email: contato@dom-v2.com
- Issues: GitHub Issues
- Documentação: docs/

---
*Preparado automaticamente em $buildDate*
"@

$versionContent | Out-File -FilePath "VERSION.md" -Encoding UTF8
Write-Host "✅ Criado VERSION.md" -ForegroundColor Green

# 11. Verificar tamanho do projeto
Write-Host "📊 Verificando tamanho do projeto..." -ForegroundColor Yellow

$size = (Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "📁 Tamanho total: $([math]::Round($size, 2)) MB" -ForegroundColor Cyan

if ($size -gt 100) {
    Write-Host "⚠️  Aviso: Projeto muito grande ($([math]::Round($size, 2)) MB)" -ForegroundColor Yellow
    Write-Host "💡 Considere usar Git LFS para arquivos grandes" -ForegroundColor Yellow
}

# 12. Verificar se há node_modules (devem ser ignorados)
if (Test-Path "node_modules") {
    Write-Host "⚠️  Aviso: node_modules encontrado - certifique-se de que está no .gitignore" -ForegroundColor Yellow
}

if (Test-Path "frontend/node_modules") {
    Write-Host "⚠️  Aviso: frontend/node_modules encontrado - certifique-se de que está no .gitignore" -ForegroundColor Yellow
}

if (Test-Path "backend/node_modules") {
    Write-Host "⚠️  Aviso: backend/node_modules encontrado - certifique-se de que está no .gitignore" -ForegroundColor Yellow
}

# 13. Criar resumo final
Write-Host "`nRESUMO DA PREPARACAO:" -ForegroundColor Green
Write-Host "OK - Estrutura do projeto verificada" -ForegroundColor Green
Write-Host "OK - Arquivos essenciais encontrados" -ForegroundColor Green
Write-Host "OK - Arquivos de backup removidos" -ForegroundColor Green
Write-Host "OK - VERSION.md criado" -ForegroundColor Green
Write-Host "OK - Tamanho do projeto: $([math]::Round($size, 2)) MB" -ForegroundColor Green

Write-Host "`nPROJETO PRONTO PARA GITHUB!" -ForegroundColor Green
Write-Host "`nPROXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host "1. git add . (raiz do projeto)" -ForegroundColor White
Write-Host "2. git commit -m 'feat: versao 2.0.0 preparada para GitHub'" -ForegroundColor White
Write-Host "3. git push origin main" -ForegroundColor White
Write-Host "4. Crie o repositorio no GitHub" -ForegroundColor White
Write-Host "5. Adicione o remote: git remote add origin https://github.com/seu-usuario/dom-v2.git" -ForegroundColor White
Write-Host "6. git push -u origin main" -ForegroundColor White

Write-Host "`nSUCESSO! DOM v2 pronto para GitHub!" -ForegroundColor Green 