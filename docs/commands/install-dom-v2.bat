@echo off
echo ========================================
echo  DOM v2 - Script de Instalacao
echo  Versao: 2.0.0
echo  Data: 23 de Julho de 2025
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado. Instale Node.js 18+ primeiro.
    pause
    exit /b 1
)
echo SUCCESS: Node.js encontrado

echo.
echo Verificando diretorio do projeto...
if not exist "C:\dom-v2" (
    echo ERRO: Diretorio C:\dom-v2 nao encontrado
    pause
    exit /b 1
)
echo SUCCESS: Diretorio do projeto encontrado

echo.
echo ========================================
echo  INSTALANDO BACKEND
echo ========================================

echo.
echo Navegando para diretorio do backend...
cd /d C:\dom-v2\backend

echo Instalando dependencias do backend...
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend
    pause
    exit /b 1
)
echo SUCCESS: Dependencias do backend instaladas

echo.
echo Gerando cliente Prisma...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERRO: Falha ao gerar cliente Prisma
    pause
    exit /b 1
)
echo SUCCESS: Cliente Prisma gerado

echo.
echo Compilando TypeScript...
set DATABASE_URL=postgresql://postgres:FLP*2025@localhost:5432/db_dom
call npx tsc
if %errorlevel% neq 0 (
    echo ERRO: Falha ao compilar TypeScript
    pause
    exit /b 1
)
echo SUCCESS: Backend compilado com sucesso

echo.
echo Executando testes do backend...
call npm test
if %errorlevel% neq 0 (
    echo ERRO: Testes do backend falharam
    pause
    exit /b 1
)
echo SUCCESS: Testes do backend passaram

echo.
echo ========================================
echo  INSTALANDO FRONTEND
echo ========================================

echo.
echo Navegando para diretorio do frontend...
cd /d C:\dom-v2\frontend

echo Instalando dependencias do frontend...
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do frontend
    pause
    exit /b 1
)
echo SUCCESS: Dependencias do frontend instaladas

echo.
echo Verificando tipos TypeScript...
call npx tsc --noEmit
if %errorlevel% neq 0 (
    echo ERRO: Falha na verificacao de tipos
    pause
    exit /b 1
)
echo SUCCESS: Verificacao de tipos passou

echo.
echo ========================================
echo  INSTALACAO CONCLUIDA COM SUCESSO
echo ========================================
echo.
echo Backend: Compilado e testado
echo Frontend: Dependencias instaladas
echo.
echo Para executar o sistema, use: start-dom-v2.bat
echo.
pause 