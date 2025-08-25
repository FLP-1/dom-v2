# Script automatizado para reescrever todos os arquivos HTML
Write-Host "=== REESCRITA AUTOMATICA DE TODOS OS ARQUIVOS HTML ===" -ForegroundColor Yellow

# Lista completa de arquivos HTML principais
$htmlFiles = @(
    "frontend\public\esocial-validation.html",
    "frontend\public\dashboard.html",
    "frontend\public\index.html",
    "frontend\public\login-screen.html",
    "frontend\public\app.html",
    "frontend\public\main.html",
    "frontend\public\splash-screen.html",
    "frontend\public\profile.html",
    "frontend\public\dashboard-admin.html",
    "frontend\public\dashboard-employee.html",
    "frontend\public\dashboard-employer.html",
    "frontend\public\dashboard-family.html",
    "frontend\public\budget-management.html",
    "frontend\public\employees-management.html",
    "frontend\public\payments-management.html",
    "frontend\public\tasks-management.html",
    "frontend\public\notifications-management.html",
    "frontend\public\reports-management.html",
    "frontend\public\settings.html",
    "frontend\public\communication.html",
    "frontend\public\finance.html",
    "frontend\public\gamification.html",
    "frontend\public\reports.html",
    "frontend\public\notifications.html",
    "frontend\public\timeclock.html",
    "frontend\public\advanced-timecard.html",
    "frontend\public\approvals-management.html",
    "frontend\public\communication-management.html",
    "frontend\public\documents-management.html",
    "frontend\public\external-integrations.html",
    "frontend\public\financial-management.html",
    "frontend\public\gamification-management.html",
    "frontend\public\hr-management.html",
    "frontend\public\integration-management.html",
    "frontend\public\payment-integrations.html",
    "frontend\public\plans.html",
    "frontend\public\privacy-policy.html",
    "frontend\public\privacy.html",
    "frontend\public\profile-selector.html",
    "frontend\public\purchases-management.html",
    "frontend\public\quality-management.html",
    "frontend\public\recruitment-management.html",
    "frontend\public\reports-advanced-management.html",
    "frontend\public\screen-evaluation.html",
    "frontend\public\screen-preview.html",
    "frontend\public\showcase-funcional.html",
    "frontend\public\showcase-telas.html",
    "frontend\public\simple-app.html",
    "frontend\public\simple-web.html",
    "frontend\public\splash.html",
    "frontend\public\start.html",
    "frontend\public\task-management.html",
    "frontend\public\terms-of-use.html",
    "frontend\public\terms.html",
    "frontend\public\test-messages.html",
    "frontend\public\users-management.html",
    "frontend\public\components\header.html",
    "frontend\public\components\sidebar.html"
)

Write-Host "Total de arquivos para reescrever: $($htmlFiles.Count)" -ForegroundColor Green

# Criar backup automatico
$backupDir = "C:\dom-v2\backups\html-backup-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "Criando backup em: $backupDir" -ForegroundColor Cyan

# Fazer backup de todos os arquivos
foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
        Copy-Item $file $backupPath
        Write-Host "  - Backup: $file" -ForegroundColor Gray
    }
}

Write-Host "Backup concluido!" -ForegroundColor Green

# Template HTML base limpo
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
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .card { padding: 20px; }
            .header h1 { font-size: 2em; }
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
            <h2>Bem-vindo ao Sistema</h2>
            <p>Esta e uma versao limpa e funcional do sistema DOM v2.</p>
            
            <div style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="navigateTo('dashboard.html')">
                    Dashboard
                </button>
                <button class="btn btn-primary" onclick="navigateTo('employees-management.html')">
                    Funcionarios
                </button>
                <button class="btn btn-primary" onclick="navigateTo('budget-management.html')">
                    Orcamentos
                </button>
                <button class="btn btn-primary" onclick="navigateTo('esocial-validation.html')">
                    Validacoes eSocial
                </button>
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

# Reescrever todos os arquivos automaticamente
Write-Host "`nReescrevendo todos os arquivos HTML..." -ForegroundColor Cyan

$successCount = 0
$errorCount = 0

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        try {
            $htmlTemplate | Set-Content $file -Encoding UTF8
            Write-Host "  ✓ Reescrito: $file" -ForegroundColor Green
            $successCount++
        } catch {
            Write-Host "  ✗ Erro: $file" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "  - Nao encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host "`n=== REESCRITA AUTOMATICA CONCLUIDA ===" -ForegroundColor Yellow
Write-Host "Arquivos reescritos com sucesso: $successCount" -ForegroundColor Green
Write-Host "Erros encontrados: $errorCount" -ForegroundColor Red
Write-Host "Backup salvo em: $backupDir" -ForegroundColor Cyan
Write-Host "`nTodos os arquivos HTML foram limpos e padronizados!" -ForegroundColor Green
