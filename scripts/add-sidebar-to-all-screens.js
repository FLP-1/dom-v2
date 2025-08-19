const fs = require('fs');
const path = require('path');

// Lista de telas que precisam do sidebar (excluindo login e index)
const screens = [
    'dashboard.html',
    'payments-management.html',
    'tasks-management.html',
    'employees-management.html',
    'budget-management.html',
    'settings.html',
    'finance.html',
    'reports.html',
    'hr-management.html',
    'timeclock.html',
    'notifications.html',
    'profile.html',
    'payment-integrations.html',
    'advanced-timecard.html',
    'communication.html',
    'gamification.html',
    'dashboard-employer.html',
    'dashboard-employee.html',
    'dashboard-family.html',
    'dashboard-admin.html',
    'profile-selector.html'
];

// CSS do Sidebar
const sidebarCSS = `
        /* Sidebar Styles */
        .sidebar {
            position: fixed;
            top: 0;
            left: -280px;
            width: 280px;
            height: 100vh;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            transition: left 0.3s ease;
            z-index: 1000;
            overflow-y: auto;
        }

        .sidebar.open {
            left: 0;
        }

        .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .sidebar-logo {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .sidebar-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e293b;
        }

        .sidebar-user {
            padding: 15px 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            background: rgba(0, 122, 255, 0.1);
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #007AFF;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .user-details h4 {
            font-size: 14px;
            color: #1e293b;
            margin-bottom: 2px;
        }

        .user-details p {
            font-size: 12px;
            color: #64748b;
        }

        .sidebar-nav {
            padding: 20px 0;
        }

        .nav-section {
            margin-bottom: 20px;
        }

        .nav-section-title {
            padding: 0 20px 10px;
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: #1e293b;
            text-decoration: none;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
        }

        .nav-item:hover {
            background: rgba(0, 122, 255, 0.1);
            border-left-color: #007AFF;
        }

        .nav-item.active {
            background: rgba(0, 122, 255, 0.15);
            border-left-color: #007AFF;
            color: #007AFF;
        }

        .nav-icon {
            font-size: 18px;
            margin-right: 12px;
            width: 20px;
            text-align: center;
        }

        .nav-text {
            font-size: 14px;
            font-weight: 500;
        }

        .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .sidebar-overlay.open {
            opacity: 1;
            visibility: visible;
        }

        .main-content {
            margin-left: 0;
            transition: margin-left 0.3s ease;
        }

        .main-content.sidebar-open {
            margin-left: 280px;
        }

        .header-actions {
            display: flex;
            gap: 10px;
        }

        .menu-button {
            background: #007AFF;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .menu-button:hover {
            background: #0056CC;
            transform: translateY(-1px);
        }

        .logout-button {
            background: #ef4444;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .logout-button:hover {
            background: #dc2626;
            transform: translateY(-1px);
        }

        /* Responsividade */
        @media (max-width: 768px) {
            .sidebar {
                left: -100%;
                width: 100%;
            }

            .main-content.sidebar-open {
                margin-left: 0;
            }

            .header-actions {
                position: static;
                justify-content: center;
                margin-top: 15px;
            }
        }
`;

// HTML do Sidebar
function getSidebarHTML(currentPage) {
    const isActive = (page) => currentPage === page ? ' active' : '';
    
    return `    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">🏠</div>
            <div class="sidebar-title">DOM v2</div>
        </div>
        
        <div class="sidebar-user" id="sidebarUser">
            <div class="user-info">
                <div class="user-avatar" id="userAvatar">U</div>
                <div class="user-details">
                    <h4 id="userName">Usuário</h4>
                    <p id="userProfile">Perfil</p>
                </div>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="nav-section-title">Principal</div>
                <a href="dashboard.html" class="nav-item${isActive('dashboard.html')}" id="nav-dashboard">
                    <span class="nav-icon">📊</span>
                    <span class="nav-text">Dashboard</span>
                </a>
                <a href="tasks-management.html" class="nav-item${isActive('tasks-management.html')}" id="nav-tasks">
                    <span class="nav-icon">📝</span>
                    <span class="nav-text">Tarefas</span>
                </a>
                <a href="employees-management.html" class="nav-item${isActive('employees-management.html')}" id="nav-employees">
                    <span class="nav-icon">👥</span>
                    <span class="nav-text">Funcionários</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Financeiro</div>
                <a href="finance.html" class="nav-item${isActive('finance.html')}" id="nav-finance">
                    <span class="nav-icon">💰</span>
                    <span class="nav-text">Finanças</span>
                </a>
                <a href="payments-management.html" class="nav-item${isActive('payments-management.html')}" id="nav-payments">
                    <span class="nav-icon">💳</span>
                    <span class="nav-text">Pagamentos</span>
                </a>
                <a href="budget-management.html" class="nav-item${isActive('budget-management.html')}" id="nav-budget">
                    <span class="nav-icon">📋</span>
                    <span class="nav-text">Orçamentos</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Recursos Humanos</div>
                <a href="hr-management.html" class="nav-item${isActive('hr-management.html')}" id="nav-hr">
                    <span class="nav-icon">👨‍💼</span>
                    <span class="nav-text">RH</span>
                </a>
                <a href="timeclock.html" class="nav-item${isActive('timeclock.html')}" id="nav-timeclock">
                    <span class="nav-icon">⏰</span>
                    <span class="nav-text">Ponto</span>
                </a>
                <a href="advanced-timecard.html" class="nav-item${isActive('advanced-timecard.html')}" id="nav-advanced-timecard">
                    <span class="nav-icon">⏱️</span>
                    <span class="nav-text">Ponto Avançado</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Sistema</div>
                <a href="notifications.html" class="nav-item${isActive('notifications.html')}" id="nav-notifications">
                    <span class="nav-icon">🔔</span>
                    <span class="nav-text">Notificações</span>
                </a>
                <a href="reports.html" class="nav-item${isActive('reports.html')}" id="nav-reports">
                    <span class="nav-icon">📊</span>
                    <span class="nav-text">Relatórios</span>
                </a>
                <a href="settings.html" class="nav-item${isActive('settings.html')}" id="nav-settings">
                    <span class="nav-icon">⚙️</span>
                    <span class="nav-text">Configurações</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Avançado</div>
                <a href="payment-integrations.html" class="nav-item${isActive('payment-integrations.html')}" id="nav-payment-integrations">
                    <span class="nav-icon">🔗</span>
                    <span class="nav-text">Integrações</span>
                </a>
                <a href="communication.html" class="nav-item${isActive('communication.html')}" id="nav-communication">
                    <span class="nav-icon">💬</span>
                    <span class="nav-text">Comunicação</span>
                </a>
                <a href="gamification.html" class="nav-item${isActive('gamification.html')}" id="nav-gamification">
                    <span class="nav-icon">🏆</span>
                    <span class="nav-text">Gamificação</span>
                </a>
            </div>
        </nav>
    </div>

    <!-- Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Main Content -->
    <div class="main-content" id="mainContent">
        <div class="container">`;
}

// JavaScript do Sidebar
const sidebarJS = `
    <!-- Sidebar JavaScript -->
    <script>
        // Função para carregar dados do usuário logado
        function loadUserData() {
            const userData = localStorage.getItem('dom_v2_user');
            const token = localStorage.getItem('dom_v2_token');
            
            if (!userData || !token) {
                console.log('Usuário não logado, redirecionando para login');
                window.location.href = 'login-screen.html';
                return null;
            }
            
            try {
                const user = JSON.parse(userData);
                console.log('Usuário logado:', user);
                return user;
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                window.location.href = 'login-screen.html';
                return null;
            }
        }

        // Função para atualizar sidebar com dados do usuário
        function updateSidebar(user) {
            const userAvatar = document.getElementById('userAvatar');
            const userName = document.getElementById('userName');
            const userProfile = document.getElementById('userProfile');
            
            if (userAvatar) {
                userAvatar.textContent = user.name.charAt(0).toUpperCase();
            }
            
            if (userName) {
                userName.textContent = user.name;
            }
            
            if (userProfile) {
                const profileNames = {
                    'EMPLOYER': 'Empregador',
                    'EMPLOYEE': 'Funcionário',
                    'FAMILY': 'Familiar',
                    'ADMIN': 'Administrador',
                    'user': 'Usuário'
                };
                userProfile.textContent = profileNames[user.profile] || 'Usuário';
            }
        }

        // Função para alternar sidebar
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const mainContent = document.getElementById('mainContent');
            
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
            mainContent.classList.toggle('sidebar-open');
        }

        // Função para fechar sidebar
        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const mainContent = document.getElementById('mainContent');
            
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
        }

        // Função de logout
        function logout() {
            if (confirm('Tem certeza que deseja sair?')) {
                localStorage.removeItem('dom_v2_user');
                localStorage.removeItem('dom_v2_token');
                localStorage.removeItem('dom_v2_login_time');
                window.location.href = 'login-screen.html';
            }
        }

        // Inicialização do sidebar
        function initSidebar() {
            const user = loadUserData();
            if (user) {
                updateSidebar(user);
            }
            
            // Fechar sidebar ao clicar no overlay
            const overlay = document.getElementById('sidebarOverlay');
            if (overlay) {
                overlay.addEventListener('click', closeSidebar);
            }
            
            // Fechar sidebar ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeSidebar();
                }
            });
        }

        // Executar quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', function() {
            initSidebar();
            // Chamar função de inicialização específica da página se existir
            if (typeof initPage === 'function') {
                initPage();
            }
        });
    </script>`;

function addSidebarToFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar se já tem sidebar
        if (content.includes('id="sidebar"')) {
            console.log(`⚠️  ${filePath} já possui sidebar`);
            return;
        }

        let newContent = content;
        const currentPage = path.basename(filePath);

        // 1. Adicionar CSS do sidebar antes do </style>
        const styleEndIndex = newContent.lastIndexOf('</style>');
        if (styleEndIndex !== -1) {
            newContent = newContent.slice(0, styleEndIndex) + sidebarCSS + newContent.slice(styleEndIndex);
        }

        // 2. Adicionar HTML do sidebar e wrapper do main content
        const bodyStartIndex = newContent.indexOf('<body>') + 6;
        const sidebarHTML = getSidebarHTML(currentPage);
        newContent = newContent.slice(0, bodyStartIndex) + '\n' + sidebarHTML + '\n' + newContent.slice(bodyStartIndex);

        // 3. Adicionar botões de menu e logout no header
        const headerPattern = /<div class="header[^>]*>/;
        const headerMatch = newContent.match(headerPattern);
        if (headerMatch) {
            const headerHTML = headerMatch[0];
            const newHeaderHTML = headerHTML.replace('>', ' style="position: relative;">\n            <div class="header-actions">\n                <button class="menu-button" onclick="toggleSidebar()">☰</button>\n                <button class="logout-button" onclick="logout()">🚪 Sair</button>\n            </div>');
            newContent = newContent.replace(headerPattern, newHeaderHTML);
        }

        // 4. Fechar o wrapper do main content antes do </body>
        const bodyEndIndex = newContent.lastIndexOf('</body>');
        if (bodyEndIndex !== -1) {
            newContent = newContent.slice(0, bodyEndIndex) + '        </div>\n    </div>\n' + newContent.slice(bodyEndIndex);
        }

        // 5. Adicionar JavaScript do sidebar antes do </body>
        const scriptEndIndex = newContent.lastIndexOf('</script>');
        if (scriptEndIndex !== -1) {
            newContent = newContent.slice(0, scriptEndIndex + 8) + sidebarJS + newContent.slice(scriptEndIndex + 8);
        } else {
            // Se não há script, adicionar antes do </body>
            const bodyEndIndex2 = newContent.lastIndexOf('</body>');
            if (bodyEndIndex2 !== -1) {
                newContent = newContent.slice(0, bodyEndIndex2) + sidebarJS + newContent.slice(bodyEndIndex2);
            }
        }

        // Salvar arquivo
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Sidebar adicionado em ${filePath}`);

    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    }
}

// Executar o script
console.log('🚀 Iniciando adição de sidebar em todas as telas...\n');

const publicDir = path.join(__dirname, '..', 'frontend', 'public');

screens.forEach(screen => {
    const filePath = path.join(publicDir, screen);
    if (fs.existsSync(filePath)) {
        addSidebarToFile(filePath);
    } else {
        console.log(`⚠️  Arquivo não encontrado: ${filePath}`);
    }
});

console.log('\n🎉 Processo concluído!');
