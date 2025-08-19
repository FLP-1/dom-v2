const fs = require('fs');
const path = require('path');

// Lista de telas que precisam do seletor de perfil
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
    'dashboard-admin.html'
];

// CSS do Seletor de Perfil
const profileSelectorCSS = `
        /* Profile Selector Styles */
        .profile-selector {
            position: relative;
            display: inline-block;
        }

        .profile-selector-button {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            transition: all 0.2s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .profile-selector-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-1px);
        }

        .profile-selector-button .profile-icon {
            font-size: 16px;
        }

        .profile-selector-button .profile-name {
            font-weight: 500;
        }

        .profile-selector-button .dropdown-arrow {
            font-size: 12px;
            transition: transform 0.2s ease;
        }

        .profile-selector-button.open .dropdown-arrow {
            transform: rotate(180deg);
        }

        .profile-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            min-width: 200px;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
            margin-top: 8px;
        }

        .profile-dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .profile-dropdown-header {
            padding: 16px;
            border-bottom: 1px solid #e1e5e9;
            text-align: center;
        }

        .profile-dropdown-header h4 {
            margin: 0;
            color: #1e293b;
            font-size: 14px;
            font-weight: 600;
        }

        .profile-dropdown-header p {
            margin: 4px 0 0 0;
            color: #64748b;
            font-size: 12px;
        }

        .profile-options {
            padding: 8px 0;
        }

        .profile-option {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            cursor: pointer;
            transition: background 0.2s ease;
            color: #1e293b;
            text-decoration: none;
        }

        .profile-option:hover {
            background: #f8fafc;
        }

        .profile-option.active {
            background: rgba(0, 122, 255, 0.1);
            color: #007AFF;
        }

        .profile-option .option-icon {
            font-size: 18px;
            margin-right: 12px;
            width: 20px;
            text-align: center;
        }

        .profile-option .option-info {
            flex: 1;
        }

        .profile-option .option-name {
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 2px;
        }

        .profile-option .option-description {
            font-size: 12px;
            color: #64748b;
        }

        .profile-option .option-check {
            font-size: 16px;
            color: #007AFF;
            opacity: 0;
        }

        .profile-option.active .option-check {
            opacity: 1;
        }

        .profile-dropdown-footer {
            padding: 12px 16px;
            border-top: 1px solid #e1e5e9;
            text-align: center;
        }

        .profile-dropdown-footer button {
            background: #007AFF;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        .profile-dropdown-footer button:hover {
            background: #0056CC;
        }

        /* Responsividade */
        @media (max-width: 768px) {
            .profile-selector-button .profile-name {
                display: none;
            }
            
            .profile-dropdown {
                right: -50px;
                min-width: 180px;
            }
        }
`;

// HTML do Seletor de Perfil
const profileSelectorHTML = `
            <div class="profile-selector">
                <button class="profile-selector-button" onclick="toggleProfileDropdown()">
                    <span class="profile-icon" id="currentProfileIcon">👤</span>
                    <span class="profile-name" id="currentProfileName">Perfil</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                
                <div class="profile-dropdown" id="profileDropdown">
                    <div class="profile-dropdown-header">
                        <h4>Trocar Perfil</h4>
                        <p>Selecione um perfil diferente</p>
                    </div>
                    
                    <div class="profile-options" id="profileOptions">
                        <!-- Opções serão carregadas dinamicamente -->
                    </div>
                    
                    <div class="profile-dropdown-footer">
                        <button onclick="confirmProfileChange()">Confirmar</button>
                    </div>
                </div>
            </div>`;

// JavaScript do Seletor de Perfil
const profileSelectorJS = `
    // Função para alternar dropdown de perfil
    function toggleProfileDropdown() {
        const dropdown = document.getElementById('profileDropdown');
        const button = document.querySelector('.profile-selector-button');
        
        dropdown.classList.toggle('open');
        button.classList.toggle('open');
        
        if (dropdown.classList.contains('open')) {
            loadProfileOptions();
        }
    }

    // Função para carregar opções de perfil
    function loadProfileOptions() {
        const userData = JSON.parse(localStorage.getItem('dom_v2_user') || '{}');
        const currentProfile = userData.selectedProfile || userData.profile || 'user';
        
        // Simular múltiplos perfis disponíveis (em produção, viria da API)
        const availableProfiles = [
            { id: 'EMPLOYER', name: 'Empregador', icon: '👨‍💼', description: 'Controle total' },
            { id: 'EMPLOYEE', name: 'Funcionário', icon: '👷', description: 'Acesso limitado' },
            { id: 'FAMILY', name: 'Familiar', icon: '👨‍👩‍👧‍👦', description: 'Visualização' },
            { id: 'ADMIN', name: 'Administrador', icon: '🔧', description: 'Configurações' }
        ];
        
        const optionsContainer = document.getElementById('profileOptions');
        optionsContainer.innerHTML = '';
        
        availableProfiles.forEach(profile => {
            const option = document.createElement('div');
            option.className = 'profile-option';
            if (profile.id === currentProfile) {
                option.classList.add('active');
            }
            
            option.innerHTML = \`
                <span class="option-icon">\${profile.icon}</span>
                <div class="option-info">
                    <div class="option-name">\${profile.name}</div>
                    <div class="option-description">\${profile.description}</div>
                </div>
                <span class="option-check">✓</span>
            \`;
            
            option.onclick = () => selectProfileOption(profile.id);
            optionsContainer.appendChild(option);
        });
    }

    // Função para selecionar opção de perfil
    function selectProfileOption(profileId) {
        // Remover seleção anterior
        document.querySelectorAll('.profile-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Selecionar nova opção
        event.target.closest('.profile-option').classList.add('active');
        
        // Armazenar seleção temporária
        window.tempSelectedProfile = profileId;
    }

    // Função para confirmar mudança de perfil
    function confirmProfileChange() {
        if (window.tempSelectedProfile) {
            const userData = JSON.parse(localStorage.getItem('dom_v2_user') || '{}');
            userData.selectedProfile = window.tempSelectedProfile;
            localStorage.setItem('dom_v2_user', JSON.stringify(userData));
            
            // Atualizar interface
            updateProfileSelector();
            
            // Fechar dropdown
            toggleProfileDropdown();
            
            // Recarregar página para aplicar mudanças
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    // Função para atualizar seletor de perfil
    function updateProfileSelector() {
        const userData = JSON.parse(localStorage.getItem('dom_v2_user') || '{}');
        const currentProfile = userData.selectedProfile || userData.profile || 'user';
        
        const profileInfo = getProfileInfo(currentProfile);
        
        const iconElement = document.getElementById('currentProfileIcon');
        const nameElement = document.getElementById('currentProfileName');
        
        if (iconElement) iconElement.textContent = profileInfo.icon;
        if (nameElement) nameElement.textContent = profileInfo.name;
    }

    // Função para obter informações do perfil
    function getProfileInfo(profile) {
        const profiles = {
            'EMPLOYER': { icon: '👨‍💼', name: 'Empregador' },
            'EMPLOYEE': { icon: '👷', name: 'Funcionário' },
            'FAMILY': { icon: '👨‍👩‍👧‍👦', name: 'Familiar' },
            'ADMIN': { icon: '🔧', name: 'Administrador' }
        };
        
        return profiles[profile] || { icon: '👤', name: 'Usuário' };
    }

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        const selector = document.querySelector('.profile-selector');
        const dropdown = document.getElementById('profileDropdown');
        
        if (selector && !selector.contains(e.target) && dropdown.classList.contains('open')) {
            toggleProfileDropdown();
        }
    });

    // Atualizar seletor na inicialização
    document.addEventListener('DOMContentLoaded', function() {
        updateProfileSelector();
    });
`;

function addProfileSelectorToFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar se já tem seletor de perfil
        if (content.includes('profile-selector-button')) {
            console.log(`⚠️  ${filePath} já possui seletor de perfil`);
            return;
        }

        let newContent = content;

        // 1. Adicionar CSS do seletor de perfil antes do </style>
        const styleEndIndex = newContent.lastIndexOf('</style>');
        if (styleEndIndex !== -1) {
            newContent = newContent.slice(0, styleEndIndex) + profileSelectorCSS + newContent.slice(styleEndIndex);
        }

        // 2. Adicionar HTML do seletor de perfil no header-actions
        const headerActionsPattern = /<div class="header-actions">/;
        const headerActionsMatch = newContent.match(headerActionsPattern);
        if (headerActionsMatch) {
            newContent = newContent.replace(headerActionsPattern, 
                '<div class="header-actions">\n                ' + profileSelectorHTML.trim());
        } else {
            console.log(`⚠️  Header actions não encontrado em ${filePath}`);
        }

        // 3. Adicionar JavaScript do seletor de perfil antes do </script>
        const scriptEndIndex = newContent.lastIndexOf('</script>');
        if (scriptEndIndex !== -1) {
            newContent = newContent.slice(0, scriptEndIndex) + profileSelectorJS + newContent.slice(scriptEndIndex);
        } else {
            console.log(`⚠️  Script tag não encontrada em ${filePath}`);
        }

        // Salvar arquivo
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Seletor de perfil adicionado em ${filePath}`);

    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    }
}

// Executar o script
console.log('🚀 Iniciando adição de seletor de perfil nos headers...\n');

const publicDir = path.join(__dirname, '..', 'frontend', 'public');

screens.forEach(screen => {
    const filePath = path.join(publicDir, screen);
    if (fs.existsSync(filePath)) {
        addProfileSelectorToFile(filePath);
    } else {
        console.log(`⚠️  Arquivo não encontrado: ${filePath}`);
    }
});

console.log('\n🎉 Processo concluído!');
