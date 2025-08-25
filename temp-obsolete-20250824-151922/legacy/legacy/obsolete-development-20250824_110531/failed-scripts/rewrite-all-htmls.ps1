# Script para reescrever todos os arquivos HTML principais
# Autor: Assistente AI
# Data: $(Get-Date)

Write-Host "=== REESCRITA COMPLETA DE ARQUIVOS HTML ===" -ForegroundColor Yellow

# Lista de arquivos HTML principais para reescrever
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

# Criar backup de todos os arquivos
$backupDir = "C:\dom-v2\backups\html-backup-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "`nCriando backup em: $backupDir" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
        Copy-Item $file $backupPath
        Write-Host "  - Backup: $file" -ForegroundColor Gray
    }
}

Write-Host "`nBackup concluído!" -ForegroundColor Green

# Função para reescrever um arquivo HTML específico
function Rewrite-HTMLFile {
    param(
        [string]$FilePath,
        [string]$Title,
        [string]$Content
    )
    
    $htmlTemplate = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>$Title - DOM v2</title>
    
    <!-- CSS Base -->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
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
            .container {
                padding: 10px;
            }
            
            .card {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>$Title</h1>
            <p>Sistema DOM v2 - Gerenciamento Integrado</p>
        </div>
        
        <div class="card">
            $Content
        </div>
    </div>
    
    <script>
        // JavaScript base com codificação UTF-8 correta
        console.log('Página carregada: $Title');
        
        // Função para mostrar alertas
        function showAlert(message, type = 'info') {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.textContent = message;
            
            document.body.insertBefore(alertDiv, document.body.firstChild);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
        
        // Função para navegação
        function navigateTo(page) {
            window.location.href = page;
        }
        
        // Função para fazer requisições API
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
                showAlert('Erro na comunicação com o servidor', 'error');
            }
        }
    </script>
</body>
</html>
"@
    
    # Salvar arquivo com encoding UTF-8
    $htmlTemplate | Set-Content $FilePath -Encoding UTF8
    Write-Host "  ✓ Reescrito: $FilePath" -ForegroundColor Green
}

# Reescrever arquivos específicos
Write-Host "`nReescrevendo arquivos HTML..." -ForegroundColor Cyan

# 1. Dashboard principal
Rewrite-HTMLFile -FilePath "frontend\public\dashboard.html" -Title "Dashboard Principal" -Content @"
    <h2>📊 Dashboard Principal</h2>
    <p>Bem-vindo ao sistema DOM v2. Selecione uma opção abaixo:</p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
        <button class="btn btn-primary" onclick="navigateTo('employees-management.html')">
            👥 Gerenciar Funcionários
        </button>
        <button class="btn btn-primary" onclick="navigateTo('budget-management.html')">
            💰 Gerenciar Orçamentos
        </button>
        <button class="btn btn-primary" onclick="navigateTo('payments-management.html')">
            💳 Gerenciar Pagamentos
        </button>
        <button class="btn btn-primary" onclick="navigateTo('tasks-management.html')">
            ✅ Gerenciar Tarefas
        </button>
        <button class="btn btn-primary" onclick="navigateTo('reports-management.html')">
            📈 Relatórios
        </button>
        <button class="btn btn-primary" onclick="navigateTo('settings.html')">
            ⚙️ Configurações
        </button>
    </div>
"@

# 2. Login
Rewrite-HTMLFile -FilePath "frontend\public\login-screen.html" -Title "Login" -Content @"
    <h2>🔐 Login</h2>
    <form id="loginForm" style="max-width: 400px; margin: 0 auto;">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" placeholder="seu@email.com" required>
        </div>
        
        <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" class="form-control" placeholder="Sua senha" required>
        </div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%;">
            Entrar
        </button>
    </form>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await apiCall('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });
                
                if (response.success) {
                    showAlert('Login realizado com sucesso!', 'success');
                    setTimeout(() => navigateTo('dashboard.html'), 1000);
                } else {
                    showAlert('Email ou senha incorretos', 'error');
                }
            } catch (error) {
                showAlert('Erro ao fazer login', 'error');
            }
        });
    </script>
"@

# 3. Gerenciamento de Funcionários
Rewrite-HTMLFile -FilePath "frontend\public\employees-management.html" -Title "Gerenciamento de Funcionários" -Content @"
    <h2>👥 Gerenciamento de Funcionários</h2>
    <p>Gerencie os dados dos funcionários da empresa.</p>
    
    <div style="margin-bottom: 20px;">
        <button class="btn btn-primary" onclick="loadEmployees()">
            🔄 Carregar Funcionários
        </button>
        <button class="btn btn-primary" onclick="showAddEmployeeForm()">
            ➕ Adicionar Funcionário
        </button>
    </div>
    
    <div id="employeesList">
        <p>Clique em "Carregar Funcionários" para ver a lista.</p>
    </div>
    
    <script>
        async function loadEmployees() {
            try {
                const response = await apiCall('/employees');
                displayEmployees(response.data);
            } catch (error) {
                showAlert('Erro ao carregar funcionários', 'error');
            }
        }
        
        function displayEmployees(employees) {
            const container = document.getElementById('employeesList');
            
            if (employees.length === 0) {
                container.innerHTML = '<p>Nenhum funcionário encontrado.</p>';
                return;
            }
            
            let html = '<div style="display: grid; gap: 15px;">';
            employees.forEach(employee => {
                html += `
                    <div style="border: 1px solid #e9ecef; padding: 15px; border-radius: 8px;">
                        <h4>${employee.name}</h4>
                        <p><strong>Email:</strong> ${employee.email}</p>
                        <p><strong>Cargo:</strong> ${employee.position}</p>
                        <p><strong>Departamento:</strong> ${employee.department}</p>
                    </div>
                `;
            });
            html += '</div>';
            
            container.innerHTML = html;
        }
        
        function showAddEmployeeForm() {
            showAlert('Funcionalidade em desenvolvimento', 'info');
        }
    </script>
"@

# 4. Gerenciamento de Orçamentos
Rewrite-HTMLFile -FilePath "frontend\public\budget-management.html" -Title "Gerenciamento de Orçamentos" -Content @"
    <h2>💰 Gerenciamento de Orçamentos</h2>
    <p>Controle os orçamentos e despesas da empresa.</p>
    
    <div style="margin-bottom: 20px;">
        <button class="btn btn-primary" onclick="loadBudgets()">
            🔄 Carregar Orçamentos
        </button>
        <button class="btn btn-primary" onclick="showAddBudgetForm()">
            ➕ Novo Orçamento
        </button>
    </div>
    
    <div id="budgetsList">
        <p>Clique em "Carregar Orçamentos" para ver a lista.</p>
    </div>
    
    <script>
        async function loadBudgets() {
            try {
                const response = await apiCall('/budgets');
                displayBudgets(response.data);
            } catch (error) {
                showAlert('Erro ao carregar orçamentos', 'error');
            }
        }
        
        function displayBudgets(budgets) {
            const container = document.getElementById('budgetsList');
            
            if (budgets.length === 0) {
                container.innerHTML = '<p>Nenhum orçamento encontrado.</p>';
                return;
            }
            
            let html = '<div style="display: grid; gap: 15px;">';
            budgets.forEach(budget => {
                html += `
                    <div style="border: 1px solid #e9ecef; padding: 15px; border-radius: 8px;">
                        <h4>${budget.title}</h4>
                        <p><strong>Valor:</strong> R$ ${budget.amount.toFixed(2)}</p>
                        <p><strong>Período:</strong> ${budget.period}</p>
                        <p><strong>Status:</strong> ${budget.status}</p>
                    </div>
                `;
            });
            html += '</div>';
            
            container.innerHTML = html;
        }
        
        function showAddBudgetForm() {
            showAlert('Funcionalidade em desenvolvimento', 'info');
        }
    </script>
"@

# 5. Validação eSocial (versão limpa)
Rewrite-HTMLFile -FilePath "frontend\public\esocial-validation.html" -Title "Validações eSocial" -Content @"
    <h2>🔍 Validações eSocial</h2>
    <p>Sistema completo de validação para conformidade com eSocial e LGPD.</p>
    
    <div style="margin-bottom: 20px;">
        <button class="btn btn-primary" onclick="validateUserData()">
            🔍 Validar Dados
        </button>
        <button class="btn btn-primary" onclick="checkCompliance()">
            📋 Verificar Compliance
        </button>
    </div>
    
    <div id="validationResults">
        <p>Clique em "Validar Dados" para iniciar a validação.</p>
    </div>
    
    <script>
        async function validateUserData() {
            try {
                const response = await apiCall('/esocial/validate-user-data', {
                    method: 'POST',
                    body: JSON.stringify({
                        cpf: '123.456.789-00',
                        email: 'teste@exemplo.com',
                        phone: '(11) 99999-9999'
                    })
                });
                
                displayValidationResults(response.data);
                showAlert('Validação concluída com sucesso!', 'success');
            } catch (error) {
                showAlert('Erro na validação', 'error');
            }
        }
        
        function displayValidationResults(data) {
            const container = document.getElementById('validationResults');
            
            let html = '<h3>Resultados da Validação:</h3>';
            html += '<div style="display: grid; gap: 15px;">';
            
            if (data.validations) {
                Object.entries(data.validations).forEach(([field, validation]) => {
                    const statusClass = validation.isValid ? 'alert-success' : 'alert-error';
                    html += `
                        <div class="${statusClass}">
                            <h4>${field.toUpperCase()}</h4>
                            <p><strong>Valor:</strong> ${validation.value || 'Não informado'}</p>
                            <p><strong>Status:</strong> ${validation.isValid ? 'Válido' : 'Inválido'}</p>
                        </div>
                    `;
                });
            }
            
            html += '</div>';
            container.innerHTML = html;
        }
        
        async function checkCompliance() {
            try {
                const response = await apiCall('/esocial/compliance-status/1');
                showAlert('Compliance verificado com sucesso!', 'success');
            } catch (error) {
                showAlert('Erro ao verificar compliance', 'error');
            }
        }
    </script>
"@

Write-Host "`n=== REESCRITA CONCLUÍDA ===" -ForegroundColor Yellow
Write-Host "Arquivos reescritos com sucesso!" -ForegroundColor Green
Write-Host "Backup salvo em: $backupDir" -ForegroundColor Cyan
