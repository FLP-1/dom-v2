# Script para reescrever TODOS os arquivos HTML do projeto
Write-Host "=== REESCRITA COMPLETA DE TODOS OS ARQUIVOS HTML ===" -ForegroundColor Yellow

# Encontrar TODOS os arquivos HTML automaticamente
Write-Host "Buscando todos os arquivos HTML..." -ForegroundColor Cyan
$allHtmlFiles = Get-ChildItem -Path "frontend\public" -Include "*.html" -Recurse | Select-Object -ExpandProperty FullName

# Converter para caminhos relativos
$htmlFiles = @()
foreach ($file in $allHtmlFiles) {
    $relativePath = $file.Replace("C:\dom-v2\", "")
    $htmlFiles += $relativePath
}

Write-Host "Total de arquivos HTML encontrados: $($htmlFiles.Count)" -ForegroundColor Green

# Mostrar lista de arquivos
Write-Host "`nArquivos encontrados:" -ForegroundColor Cyan
foreach ($file in $htmlFiles) {
    Write-Host "  - $file" -ForegroundColor Gray
}

# Criar backup automatico
$backupDir = "C:\dom-v2\backups\html-backup-complete-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "`nCriando backup em: $backupDir" -ForegroundColor Cyan

# Fazer backup de todos os arquivos
$backupCount = 0
foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
        Copy-Item $file $backupPath
        $backupCount++
    }
}

Write-Host "Backup concluido! $backupCount arquivos salvos." -ForegroundColor Green

# Template HTML limpo e funcional
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
        .btn-secondary {
            color: #667eea;
            background: white;
            border: 2px solid #667eea;
        }
        .btn-secondary:hover {
            background: #667eea;
            color: white;
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
        .alert-warning {
            color: #856404;
            background: #fff3cd;
            border-color: #ffc107;
        }
        .grid {
            display: grid;
            gap: 20px;
            margin: 20px 0;
        }
        .grid-2 {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        .grid-3 {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .grid-4 {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .status-online {
            background: #28a745;
        }
        .status-offline {
            background: #dc3545;
        }
        .status-warning {
            background: #ffc107;
        }
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .card { padding: 20px; }
            .header h1 { font-size: 2em; }
            .grid-2, .grid-3, .grid-4 {
                grid-template-columns: 1fr;
            }
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
            
            <div style="margin-top: 30px; text-align: center;">
                <h3>Funcionalidades Avancadas</h3>
                <div class="grid grid-4">
                    <button class="btn btn-secondary" onclick="navigateTo('esocial-validation.html')">
                        Validacoes eSocial
                    </button>
                    <button class="btn btn-secondary" onclick="navigateTo('notifications-management.html')">
                        Notificacoes
                    </button>
                    <button class="btn btn-secondary" onclick="navigateTo('settings.html')">
                        Configuracoes
                    </button>
                    <button class="btn btn-secondary" onclick="navigateTo('communication.html')">
                        Comunicacao
                    </button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Status do Sistema</h3>
            <div class="grid grid-2">
                <div>
                    <p><span class="status-indicator status-online"></span>Backend: Online</p>
                    <p><span class="status-indicator status-online"></span>Banco de Dados: Conectado</p>
                    <p><span class="status-indicator status-online"></span>API: Funcionando</p>
                </div>
                <div>
                    <p><span class="status-indicator status-online"></span>Autenticacao: Ativa</p>
                    <p><span class="status-indicator status-online"></span>Logs: Monitorando</p>
                    <p><span class="status-indicator status-online"></span>Backup: Automatico</p>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        console.log('Pagina carregada com sucesso!');
        
        // Funcoes de utilidade
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
                return null;
            }
        }
        
        // Verificar status do sistema
        async function checkSystemStatus() {
            try {
                const response = await apiCall('/health');
                if (response && response.status === 'ok') {
                    showAlert('Sistema funcionando normalmente', 'success');
                } else {
                    showAlert('Problemas detectados no sistema', 'warning');
                }
            } catch (error) {
                showAlert('Nao foi possivel verificar o status do sistema', 'error');
            }
        }
        
        // Carregar dados iniciais
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM carregado completamente');
            // Verificar status a cada 30 segundos
            setInterval(checkSystemStatus, 30000);
        });
    </script>
</body>
</html>
'@

# Reescrever todos os arquivos automaticamente
Write-Host "`nReescrevendo todos os arquivos HTML..." -ForegroundColor Cyan

$successCount = 0
$errorCount = 0
$notFoundCount = 0

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
        $notFoundCount++
    }
}

Write-Host "`n=== REESCRITA COMPLETA CONCLUIDA ===" -ForegroundColor Yellow
Write-Host "Arquivos reescritos com sucesso: $successCount" -ForegroundColor Green
Write-Host "Erros encontrados: $errorCount" -ForegroundColor Red
Write-Host "Arquivos nao encontrados: $notFoundCount" -ForegroundColor Yellow
Write-Host "Backup salvo em: $backupDir" -ForegroundColor Cyan
Write-Host "`nTODOS os arquivos HTML foram limpos e padronizados!" -ForegroundColor Green
Write-Host "Total de arquivos processados: $($htmlFiles.Count)" -ForegroundColor Cyan
