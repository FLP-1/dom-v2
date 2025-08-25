# Script para reescrever TODOS os arquivos HTML
Write-Host "=== REESCRITA COMPLETA DE TODOS OS ARQUIVOS HTML ===" -ForegroundColor Yellow

# Encontrar todos os arquivos HTML
Write-Host "Buscando arquivos HTML..." -ForegroundColor Cyan
$allHtmlFiles = Get-ChildItem -Path "frontend\public" -Include "*.html" -Recurse

Write-Host "Total encontrado: $($allHtmlFiles.Count)" -ForegroundColor Green

# Criar backup
$backupDir = "C:\dom-v2\backups\html-backup-complete-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "Backup criado em: $backupDir" -ForegroundColor Cyan

# Fazer backup
$backupCount = 0
foreach ($file in $allHtmlFiles) {
    $backupPath = Join-Path $backupDir $file.Name
    Copy-Item $file.FullName $backupPath
    $backupCount++
}

Write-Host "Backup concluido! $backupCount arquivos salvos." -ForegroundColor Green

# Template HTML limpo
$htmlTemplate = @'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM v2 - Sistema Integrado</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 30px;
            margin-bottom: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 2.5em;
            color: white;
            margin-bottom: 10px;
            font-weight: 300;
        }
        .header p {
            font-size: 1.1em;
            color: rgba(255,255,255,0.9);
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            transition: all 0.3s ease;
            margin: 5px;
        }
        .btn-primary {
            color: white;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            color: #555;
            margin-bottom: 8px;
            font-weight: 600;
        }
        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1em;
            transition: border-color 0.3s ease;
        }
        .form-control:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .alert {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid;
        }
        .alert-success {
            color: #155724;
            background: #d4edda;
            border-color: #28a745;
        }
        .alert-error {
            color: #721c24;
            background: #f8d7da;
            border-color: #dc3545;
        }
        .alert-info {
            color: #0c5460;
            background: #d1ecf1;
            border-color: #17a2b8;
        }
        .grid {
            display: grid;
            gap: 20px;
            margin: 20px 0;
        }
        .grid-3 {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .card-small {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            text-align: center;
        }
        .card-small h3 {
            color: #667eea;
            margin-bottom: 10px;
        }
        .card-small p {
            color: #666;
            margin-bottom: 15px;
        }
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .card { padding: 20px; }
            .header h1 { font-size: 2em; }
            .grid-3 { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>DOM v2</h1>
            <p>Sistema Integrado de Gerenciamento</p>
        </div>
        
        <div class="card">
            <h2>Bem-vindo ao Sistema DOM v2</h2>
            <p>Esta e uma versao limpa e funcional do sistema de gerenciamento integrado.</p>
            
            <div class="grid grid-3">
                <div class="card-small">
                    <h3>Dashboard</h3>
                    <p>Acesse o painel principal do sistema</p>
                    <button class="btn btn-primary" onclick="navigateTo('dashboard.html')">
                        Acessar Dashboard
                    </button>
                </div>
                
                <div class="card-small">
                    <h3>Funcionarios</h3>
                    <p>Gerencie dados dos funcionarios</p>
                    <button class="btn btn-primary" onclick="navigateTo('employees-management.html')">
                        Gerenciar Funcionarios
                    </button>
                </div>
                
                <div class="card-small">
                    <h3>Orcamentos</h3>
                    <p>Controle financeiro e orcamentario</p>
                    <button class="btn btn-primary" onclick="navigateTo('budget-management.html')">
                        Gerenciar Orcamentos
                    </button>
                </div>
                
                <div class="card-small">
                    <h3>Pagamentos</h3>
                    <p>Sistema de pagamentos e folha</p>
                    <button class="btn btn-primary" onclick="navigateTo('payments-management.html')">
                        Gerenciar Pagamentos
                    </button>
                </div>
                
                <div class="card-small">
                    <h3>Tarefas</h3>
                    <p>Controle de tarefas e projetos</p>
                    <button class="btn btn-primary" onclick="navigateTo('tasks-management.html')">
                        Gerenciar Tarefas
                    </button>
                </div>
                
                <div class="card-small">
                    <h3>Relatorios</h3>
                    <p>Relatorios e analises</p>
                    <button class="btn btn-primary" onclick="navigateTo('reports-management.html')">
                        Ver Relatorios
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        console.log('Pagina carregada com sucesso!');
        
        function showAlert(message, type = 'info') {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.textContent = message;
            document.body.insertBefore(alertDiv, document.body.firstChild);
            setTimeout(() => alertDiv.remove(), 5000);
        }
        
        function navigateTo(page) {
            window.location.href = page;
        }
        
        async function apiCall(endpoint, options = {}) {
            try {
                const response = await fetch(`http://localhost:3001/api${endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('API Error:', error);
                showAlert('Erro na comunicacao com o servidor', 'error');
            }
        }
    </script>
</body>
</html>
'@

# Reescrever arquivos
Write-Host "Reescrevendo arquivos..." -ForegroundColor Cyan

$successCount = 0
$errorCount = 0

foreach ($file in $allHtmlFiles) {
    try {
        $htmlTemplate | Set-Content $file.FullName -Encoding UTF8
        Write-Host "Reescrito: $($file.Name)" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "Erro: $($file.Name)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "=== REESCRITA COMPLETA CONCLUIDA ===" -ForegroundColor Yellow
Write-Host "Sucessos: $successCount" -ForegroundColor Green
Write-Host "Erros: $errorCount" -ForegroundColor Red
Write-Host "Backup: $backupDir" -ForegroundColor Cyan
Write-Host "TODOS os arquivos HTML foram limpos!" -ForegroundColor Green
