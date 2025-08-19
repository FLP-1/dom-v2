const fs = require('fs');
const path = require('path');

// Função para limpar headers duplicados
function limparHeadersDuplicados() {
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

    console.log('🔧 Iniciando limpeza de headers duplicados...');

    htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modificado = false;
            
            console.log(`Processando: ${file}`);
            
            // Remover múltiplos botões de menu hamburguer
            const menuButtonRegex = /<button class="menu-button" onclick="toggleSidebar\(\)">☰<\/button>/g;
            const menuMatches = content.match(menuButtonRegex);
            if (menuMatches && menuMatches.length > 1) {
                content = content.replace(menuButtonRegex, '');
                content = content.replace('<body>', '<body>\n    <!-- Botão do menu hamburguer -->\n    <button class="menu-button" onclick="toggleSidebar()">☰</button>');
                modificado = true;
                console.log(`  - Removidos ${menuMatches.length} botões de menu duplicados`);
            }
            
            // Remover múltiplos headers
            const headerRegex = /<header class="header">[\s\S]*?<\/header>/g;
            const headerMatches = content.match(headerRegex);
            if (headerMatches && headerMatches.length > 1) {
                content = content.replace(headerRegex, '');
                content = content.replace('<body>', `<body>\n    ${headerMatches[0]}`);
                modificado = true;
                console.log(`  - Removidos ${headerMatches.length} headers duplicados`);
            }
            
            // Remover múltiplos scripts de header
            const scriptRegex = /\/\/ Função para voltar[\s\S]*?document\.addEventListener\('DOMContentLoaded', initHeader\);/g;
            const scriptMatches = content.match(scriptRegex);
            if (scriptMatches && scriptMatches.length > 1) {
                content = content.replace(scriptRegex, '');
                content = content.replace('</body>', `    <script>\n        ${scriptMatches[0]}\n    </script>\n</body>`);
                modificado = true;
                console.log(`  - Removidos ${scriptMatches.length} scripts duplicados`);
            }
            
            // Remover múltiplos CSS de header
            const cssRegex = /\/\* Header com botão voltar e seletor condicional \*\/[\s\S]*?\.logout-button:hover \{[\s\S]*?transform: translateY\(-1px\);\s*\}/g;
            const cssMatches = content.match(cssRegex);
            if (cssMatches && cssMatches.length > 1) {
                content = content.replace(cssRegex, '');
                content = content.replace('</style>', `${cssMatches[0]}\n    </style>`);
                modificado = true;
                console.log(`  - Removidos ${cssMatches.length} CSS duplicados`);
            }
            
            if (modificado) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`  ✅ ${file} limpo com sucesso`);
            } else {
                console.log(`  ✅ ${file} já está correto`);
            }
        } else {
            console.log(`  ⚠️ Arquivo não encontrado: ${file}`);
        }
    });
}

// Função para corrigir o problema do nickname
function corrigirNickname() {
    console.log('\n🔧 Corrigindo problema do nickname...');
    
    // Atualizar o script de header para garantir que o nickname seja carregado corretamente
    const headerScript = `
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
    
    return headerScript;
}

// Executar limpeza
limparHeadersDuplicados();

// Corrigir nickname
const scriptCorrigido = corrigirNickname();
console.log('\n📝 Script de header corrigido para nickname:');
console.log(scriptCorrigido);

console.log('\n🎉 Limpeza concluída!');
console.log('📋 Próximos passos:');
console.log('1. Execute o script de atualização novamente com o script corrigido');
console.log('2. Verifique se o nickname está sendo carregado corretamente');
console.log('3. Teste a navegação entre as telas');
