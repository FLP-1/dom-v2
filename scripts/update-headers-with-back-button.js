const fs = require('fs');
const path = require('path');

// Função para atualizar headers das telas
function updateHeaders() {
    const publicDir = path.join(__dirname, '../frontend/public');
    const htmlFiles = [
        'dashboard.html',
        'dashboard-employer.html',
        'dashboard-employee.html',
        'dashboard-family.html',
        'dashboard-admin.html',
        'tasks-management.html',
        'employees-management.html',
        'payments-management.html',
        'budget-management.html',
        'finance.html',
        'hr-management.html',
        'timeclock.html',
        'advanced-timecard.html',
        'notifications.html',
        'reports.html',
        'settings.html',
        'profile.html',
        'payment-integrations.html',
        'communication.html',
        'gamification.html'
    ];

    const headerCSS = `
        /* Header com botão voltar e seletor condicional */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .back-button {
            background: #007AFF;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .back-button:hover {
            background: #0056CC;
            transform: translateY(-1px);
        }

        .header-title {
            font-size: 20px;
            font-weight: bold;
            color: #1e293b;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .profile-selector {
            position: relative;
            display: none; /* Inicialmente oculto */
        }

        .profile-selector.show {
            display: block;
        }

        .profile-selector-button {
            background: rgba(0, 122, 255, 0.1);
            color: #007AFF;
            border: 1px solid #007AFF;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .profile-selector-button:hover {
            background: rgba(0, 122, 255, 0.2);
        }

        .profile-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            min-width: 150px;
            z-index: 1000;
            display: none;
        }

        .profile-dropdown.show {
            display: block;
        }

        .profile-option {
            padding: 10px 15px;
            cursor: pointer;
            transition: background 0.2s ease;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .profile-option:last-child {
            border-bottom: none;
        }

        .profile-option:hover {
            background: rgba(0, 122, 255, 0.1);
        }

        .profile-option.active {
            background: rgba(0, 122, 255, 0.15);
            color: #007AFF;
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
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
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
    `;

    const headerHTML = 
        '<!-- Botão do menu hamburguer -->' +
        '<button class="menu-button" onclick="toggleSidebar()">☰</button>' +
        '' +
        '<!-- Header -->' +
        '<header class="header">' +
            '<div class="header-left">' +
                '<button class="back-button" onclick="goBack()">' +
                    '← Voltar' +
                '</button>' +
                '<h1 class="header-title" id="pageTitle">Dashboard</h1>' +
            '</div>' +
            '<div class="header-right">' +
                '<div class="profile-selector" id="profileSelector">' +
                    '<button class="profile-selector-button" onclick="toggleProfileDropdown()">' +
                        '<span id="currentProfile">Perfil</span>' +
                        '<span>▼</span>' +
                    '</button>' +
                    '<div class="profile-dropdown" id="profileDropdown">' +
                        '<!-- Opções de perfil serão carregadas dinamicamente -->' +
                    '</div>' +
                '</div>' +
                '<button class="logout-button" onclick="logout()">Sair</button>' +
            '</div>' +
        '</header>';

    const headerJavaScript = `
        // Função para carregar dados do usuário
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

        // Função para atualizar header com dados do usuário
        function updateHeader(user) {
            const currentProfile = document.getElementById('currentProfile');
            const profileSelector = document.getElementById('profileSelector');
            
            if (currentProfile) {
                // Usar nickname se disponível, senão nome
                const displayName = user.nickname || user.name || 'Usuário';
                currentProfile.textContent = displayName;
                console.log('Nickname atualizado:', displayName);
            }
            
            // Mostrar seletor apenas se usuário tem múltiplos perfis
            if (profileSelector) {
                const userProfiles = user.profiles || [user.profile];
                if (userProfiles.length > 1) {
                    profileSelector.classList.add('show');
                    loadProfileOptions(userProfiles, user.profile);
                } else {
                    profileSelector.classList.remove('show');
                }
            }
        }

        // Função para carregar opções de perfil
        function loadProfileOptions(profiles, currentProfile) {
            const dropdown = document.getElementById('profileDropdown');
            if (!dropdown) return;
            
            const profileNames = {
                'EMPLOYER': 'Empregador',
                'EMPLOYEE': 'Funcionário',
                'FAMILY': 'Familiar',
                'ADMIN': 'Administrador'
            };
            
            dropdown.innerHTML = profiles.map(profile => 
                '<div class="profile-option ' + (profile === currentProfile ? 'active' : '') + '" ' +
                'onclick="switchProfile(\'' + profile + '\')">' +
                (profileNames[profile] || profile) +
                '</div>'
            ).join('');
        }

        // Função para trocar perfil
        function switchProfile(profile) {
            const profileRoutes = {
                'EMPLOYER': 'dashboard-employer.html',
                'EMPLOYEE': 'dashboard-employee.html',
                'FAMILY': 'dashboard-family.html',
                'ADMIN': 'dashboard-admin.html'
            };
            
            const route = profileRoutes[profile] || 'dashboard.html';
            window.location.href = route;
        }

        // Função para voltar
        function goBack() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'dashboard.html';
            }
        }

        // Função para alternar dropdown de perfil
        function toggleProfileDropdown() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.classList.toggle('show');
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

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            const profileSelector = document.getElementById('profileSelector');
            const dropdown = document.getElementById('profileDropdown');
            
            if (profileSelector && !profileSelector.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Inicialização do header
        function initHeader() {
            const user = loadUserData();
            if (user) {
                updateHeader(user);
            }
        }

        // Executar quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', initHeader);
    `;

    console.log('Iniciando atualização dos headers...');
    console.log('Diretório:', publicDir);
    
    htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        console.log('Processando:', file);
        
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            console.log('Arquivo lido:', file);
            
            // Adicionar CSS do header
            if (content.includes('</style>')) {
                content = content.replace('</style>', headerCSS + '\n    </style>');
                console.log('CSS adicionado:', file);
            }
            
            // Adicionar HTML do header após o body
            if (content.includes('<body>')) {
                content = content.replace('<body>', '<body>\n    ' + headerHTML);
                console.log('HTML adicionado:', file);
            }
            
            // Adicionar JavaScript do header antes do </body>
            if (content.includes('</body>')) {
                content = content.replace('</body>', '    <script>\n        ' + headerJavaScript + '\n    </script>\n</body>');
                console.log('JavaScript adicionado:', file);
            }
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Header atualizado: ${file}`);
        } else {
            console.log(`⚠️ Arquivo não encontrado: ${file}`);
        }
    });
}

// Executar o script
updateHeaders();
console.log('🎉 Headers atualizados com sucesso!');
