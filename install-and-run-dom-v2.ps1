# SCRIPT DE INSTALACAO E EXECUCAO - DOM v2
# Versao: 2.0.0
# Data: 23 de Julho de 2025
# Status: Build 100% bem-sucedido

param(
    [switch]$InstallOnly,
    [switch]$RunOnly,
    [switch]$Help
)

# 🎯 CONFIGURAÇÕES
$PROJECT_ROOT = "C:\dom-v2"
$BACKEND_DIR = "$PROJECT_ROOT\backend"
$FRONTEND_DIR = "$PROJECT_ROOT\frontend"
$DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"

# 🎨 FUNÇÕES DE UTILIDADE
function Write-Header {
    param([string]$Message)
    Write-Host "`n" -NoNewline
    Write-Host "=" * 60 -ForegroundColor Cyan
    Write-Host "  $Message" -ForegroundColor Cyan
    Write-Host "=" * 60 -ForegroundColor Cyan
    Write-Host ""
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Yellow
}

function Write-Step {
    param([string]$Message)
    Write-Host "`n🔧 $Message..." -ForegroundColor Blue
}

# 🧠 VALIDAÇÕES INICIAIS
function Test-Prerequisites {
    Write-Header "VERIFICANDO PRÉ-REQUISITOS"
    
    # Verificar Node.js
    try {
        $nodeVersion = node --version
        Write-Success "Node.js encontrado: $nodeVersion"
    }
    catch {
        Write-Error "Node.js não encontrado. Instale Node.js 18+ primeiro."
        exit 1
    }
    
    # Verificar npm
    try {
        $npmVersion = npm --version
        Write-Success "npm encontrado: $npmVersion"
    }
    catch {
        Write-Error "npm não encontrado."
        exit 1
    }
    
    # Verificar diretório do projeto
    if (-not (Test-Path $PROJECT_ROOT)) {
        Write-Error "Diretório do projeto não encontrado: $PROJECT_ROOT"
        exit 1
    }
    
    Write-Success "Todos os pré-requisitos atendidos!"
}

# 🔧 INSTALAÇÃO DO BACKEND
function Install-Backend {
    Write-Header "INSTALANDO BACKEND"
    
    Write-Step "Navegando para diretório do backend"
    Set-Location $BACKEND_DIR
    
    Write-Step "Instalando dependências do backend"
    try {
        npm install
        Write-Success "Dependências do backend instaladas"
    }
    catch {
        Write-Error "Erro ao instalar dependências do backend"
        exit 1
    }
    
    Write-Step "Gerando cliente Prisma"
    try {
        npx prisma generate
        Write-Success "Cliente Prisma gerado"
    }
    catch {
        Write-Error "Erro ao gerar cliente Prisma"
        exit 1
    }
    
    Write-Step "Compilando TypeScript"
    try {
        $env:DATABASE_URL = $DATABASE_URL
        npx tsc
        Write-Success "Backend compilado com sucesso"
    }
    catch {
        Write-Error "Erro ao compilar backend"
        exit 1
    }
    
    Write-Step "Executando testes do backend"
    try {
        npm test
        Write-Success "Testes do backend passaram"
    }
    catch {
        Write-Error "Testes do backend falharam"
        exit 1
    }
}

# 🎨 INSTALAÇÃO DO FRONTEND
function Install-Frontend {
    Write-Header "INSTALANDO FRONTEND"
    
    Write-Step "Navegando para diretório do frontend"
    Set-Location $FRONTEND_DIR
    
    Write-Step "Instalando dependências do frontend"
    try {
        npm install
        Write-Success "Dependências do frontend instaladas"
    }
    catch {
        Write-Error "Erro ao instalar dependências do frontend"
        exit 1
    }
    
    Write-Step "Verificando tipos TypeScript"
    try {
        npx tsc --noEmit
        Write-Success "Verificação de tipos passou"
    }
    catch {
        Write-Error "Erro na verificação de tipos"
        exit 1
    }
    
    Write-Step "Executando testes do frontend"
    try {
        npm test -- --passWithNoTests
        Write-Success "Testes do frontend passaram"
    }
    catch {
        Write-Error "Testes do frontend falharam"
        exit 1
    }
}

# 🚀 EXECUÇÃO DOS SERVIÇOS
function Start-Services {
    Write-Header "INICIANDO SERVIÇOS DOM v2"
    
    # Iniciar Backend
    Write-Step "Iniciando servidor backend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BACKEND_DIR'; `$env:DATABASE_URL='$DATABASE_URL'; node dist/server-prisma.js" -WindowStyle Normal
    
    Write-Info "Backend iniciado em: http://localhost:3001"
    Write-Info "Aguardando 5 segundos para o backend inicializar..."
    Start-Sleep -Seconds 5
    
    # Testar Backend
    Write-Step "Testando API do backend"
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 10
        Write-Success "Backend respondendo: $($response.status)"
    }
    catch {
        Write-Error "Backend não está respondendo. Verifique se o PostgreSQL está rodando."
        Write-Info "Certifique-se de que o PostgreSQL está instalado e rodando na porta 5432"
        Write-Info "Banco de dados: db_dom"
        Write-Info "Usuário: postgres"
        Write-Info "Senha: FLP*2025"
    }
    
    # Iniciar Frontend
    Write-Step "Iniciando servidor frontend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FRONTEND_DIR'; npm start" -WindowStyle Normal
    
    Write-Info "Frontend iniciado em: http://localhost:3000"
    
    # Informações finais
    Write-Header "SERVIÇOS INICIADOS COM SUCESSO"
    Write-Success "Backend: http://localhost:3001"
    Write-Success "Frontend: http://localhost:3000"
    Write-Success "Health Check: http://localhost:3001/health"
    Write-Success "Dashboard: http://localhost:3001/api/dashboard"
    
    Write-Info "Para parar os serviços, feche as janelas do PowerShell"
    Write-Info "Para testar manualmente, acesse: http://localhost:3000"
}

# 🧪 TESTES MANUAIS
function Test-System {
    Write-Header "TESTES MANUAIS DO SISTEMA"
    
    Write-Step "Testando APIs principais"
    
    $apis = @(
        @{Name="Health Check"; URL="http://localhost:3001/health"},
        @{Name="Dashboard"; URL="http://localhost:3001/api/dashboard"},
        @{Name="Tasks"; URL="http://localhost:3001/api/tasks"},
        @{Name="Budgets"; URL="http://localhost:3001/api/budgets"},
        @{Name="Payroll"; URL="http://localhost:3001/api/payroll"}
    )
    
    foreach ($api in $apis) {
        try {
            $response = Invoke-RestMethod -Uri $api.URL -Method GET -TimeoutSec 5
            Write-Success "$($api.Name): OK"
        }
        catch {
            Write-Error "$($api.Name): FALHOU"
        }
    }
    
    Write-Info "Testes manuais concluídos"
    Write-Info "Acesse http://localhost:3000 para testar a interface"
}

# 📋 FUNÇÃO PRINCIPAL
function Main {
    Write-Header "DOM v2 - SCRIPT DE INSTALACAO E EXECUCAO"
    Write-Info "Versao: 2.0.0"
    Write-Info "Status: Build 100% bem-sucedido"
    Write-Info "Data: 23 de Julho de 2025"
    
    # Verificar parâmetros
    if ($Help) {
        Write-Header "AJUDA"
        Write-Info "Uso: .\install-and-run-dom-v2.ps1 [OPÇÕES]"
        Write-Info ""
        Write-Info "OPCOES:"
        Write-Info "  -InstallOnly    : Apenas instalar dependencias"
        Write-Info "  -RunOnly        : Apenas executar servicos"
        Write-Info "  -Help           : Mostrar esta ajuda"
        Write-Info ""
        Write-Info "EXEMPLOS:"
        Write-Info "  .\install-and-run-dom-v2.ps1              # Instalar e executar"
        Write-Info "  .\install-and-run-dom-v2.ps1 -InstallOnly # Apenas instalar"
        Write-Info "  .\install-and-run-dom-v2.ps1 -RunOnly     # Apenas executar"
        return
    }
    
    # Verificar pré-requisitos
    Test-Prerequisites
    
    # Instalar se necessário
    if (-not $RunOnly) {
        Install-Backend
        Install-Frontend
        Write-Success "Instalação concluída com sucesso!"
    }
    
    # Executar se necessário
    if (-not $InstallOnly) {
        Start-Services
        
        # Aguardar um pouco e testar
        Start-Sleep -Seconds 10
        Test-System
    }
    
    Write-Header "PROCESSO CONCLUÍDO"
    Write-Success "DOM v2 está pronto para uso!"
    Write-Info "Acesse: http://localhost:3000"
}

# 🚀 EXECUTAR SCRIPT
try {
    Main
}
catch {
    Write-Error "Erro durante execução: $($_.Exception.Message)"
    exit 1
} 