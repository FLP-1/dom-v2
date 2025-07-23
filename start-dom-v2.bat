@echo off
echo ========================================
echo  DOM v2 - Script de Execucao
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
echo  INICIANDO SERVICOS DOM v2
echo ========================================

echo.
echo Iniciando Backend...
start "DOM v2 Backend" powershell -NoExit -Command "cd C:\dom-v2\backend; $env:DATABASE_URL='postgresql://postgres:FLP*2025@localhost:5432/db_dom'; node dist/server-prisma.js"

echo Aguardando 5 segundos...
timeout /t 5 /nobreak >nul

echo.
echo Iniciando Frontend...
start "DOM v2 Frontend" powershell -NoExit -Command "cd C:\dom-v2\frontend; npm start"

echo.
echo ========================================
echo  SERVICOS INICIADOS COM SUCESSO
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo Health Check: http://localhost:3001/health
echo Dashboard: http://localhost:3001/api/dashboard
echo.
echo Para testar manualmente, acesse: http://localhost:3000
echo Para parar os servicos, feche as janelas do PowerShell
echo.
pause 