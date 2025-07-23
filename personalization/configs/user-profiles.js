/**
 * 👤 USER PROFILES - DOM v2
 * Sistema de perfis de usuário para personalização avançada
 * Implementação: Semana 21-22 da Fase 5
 */

class UserProfiles {
    constructor() {
        this.name = 'UserProfiles';
        this.version = '1.0.0';
        this.status = 'active';
        
        // Tipos de perfil disponíveis
        this.profileTypes = {
            ADMIN: 'admin',
            MANAGER: 'manager',
            EMPLOYEE: 'employee',
            FAMILY: 'family',
            GUEST: 'guest'
        };
        
        // Configurações padrão por perfil
        this.defaultProfiles = {
            admin: {
                name: 'Administrador',
                permissions: ['full_access', 'user_management', 'system_config'],
                features: ['dashboard', 'reports', 'analytics', 'settings'],
                interface: {
                    theme: 'dark',
                    layout: 'advanced',
                    notifications: 'all'
                },
                productivity: {
                    focusTime: 45,
                    breakTime: 15,
                    priorityTasks: true
                }
            },
            manager: {
                name: 'Gerente',
                permissions: ['task_management', 'reports', 'team_view'],
                features: ['dashboard', 'tasks', 'reports', 'team'],
                interface: {
                    theme: 'light',
                    layout: 'standard',
                    notifications: 'important'
                },
                productivity: {
                    focusTime: 30,
                    breakTime: 10,
                    priorityTasks: true
                }
            },
            employee: {
                name: 'Funcionário',
                permissions: ['task_view', 'task_update'],
                features: ['tasks', 'schedule', 'notifications'],
                interface: {
                    theme: 'light',
                    layout: 'simple',
                    notifications: 'tasks_only'
                },
                productivity: {
                    focusTime: 25,
                    breakTime: 5,
                    priorityTasks: false
                }
            },
            family: {
                name: 'Família',
                permissions: ['task_view', 'basic_management'],
                features: ['tasks', 'calendar', 'shopping'],
                interface: {
                    theme: 'auto',
                    layout: 'family',
                    notifications: 'family'
                },
                productivity: {
                    focusTime: 20,
                    breakTime: 8,
                    priorityTasks: false
                }
            },
            guest: {
                name: 'Convidado',
                permissions: ['read_only'],
                features: ['view_only'],
                interface: {
                    theme: 'light',
                    layout: 'minimal',
                    notifications: 'none'
                },
                productivity: {
                    focusTime: 0,
                    breakTime: 0,
                    priorityTasks: false
                }
            }
        };
        
        // Cache de perfis ativos
        this.activeProfiles = new Map();
        
        // Configurações de personalização
        this.config = {
            autoSave: true,
            syncInterval: 300000, // 5 minutos
            maxCustomProfiles: 10,
            backupEnabled: true
        };
    }

    /**
     * Inicializa o sistema de perfis
     */
    async initialize() {
        console.log(`[${new Date().toISOString()}] 👤 Inicializando sistema de perfis de usuário...`);
        
        try {
            // Carrega perfis salvos
            await this.loadSavedProfiles();
            
            // Configura sincronização automática
            if (this.config.autoSave) {
                this.setupAutoSync();
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Sistema de perfis inicializado`);
            return { success: true, message: 'Sistema de perfis inicializado' };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao inicializar perfis:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Cria um novo perfil de usuário
     */
    createProfile(userId, profileType, customSettings = {}) {
        console.log(`[${new Date().toISOString()}] 👤 Criando perfil para usuário ${userId}...`);
        
        try {
            // Valida tipo de perfil
            if (!this.profileTypes[profileType.toUpperCase()]) {
                throw new Error(`Tipo de perfil inválido: ${profileType}`);
            }
            
            const type = profileType.toLowerCase();
            const baseProfile = this.defaultProfiles[type];
            
            if (!baseProfile) {
                throw new Error(`Perfil base não encontrado: ${type}`);
            }
            
            // Cria perfil personalizado
            const profile = {
                id: userId,
                type: type,
                name: baseProfile.name,
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                permissions: [...baseProfile.permissions],
                features: [...baseProfile.features],
                interface: { ...baseProfile.interface, ...customSettings.interface },
                productivity: { ...baseProfile.productivity, ...customSettings.productivity },
                preferences: customSettings.preferences || {},
                isActive: true
            };
            
            // Salva perfil
            this.activeProfiles.set(userId, profile);
            this.saveProfile(profile);
            
            console.log(`[${new Date().toISOString()}] ✅ Perfil criado: ${profile.name}`);
            
            return { success: true, profile };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao criar perfil:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Obtém perfil de um usuário
     */
    getProfile(userId) {
        const profile = this.activeProfiles.get(userId);
        
        if (!profile) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Perfil não encontrado para usuário: ${userId}`);
            return null;
        }
        
        return profile;
    }

    /**
     * Atualiza perfil de usuário
     */
    updateProfile(userId, updates) {
        console.log(`[${new Date().toISOString()}] 👤 Atualizando perfil do usuário ${userId}...`);
        
        try {
            const profile = this.getProfile(userId);
            
            if (!profile) {
                throw new Error(`Perfil não encontrado: ${userId}`);
            }
            
            // Aplica atualizações
            const updatedProfile = {
                ...profile,
                ...updates,
                lastModified: new Date().toISOString()
            };
            
            // Valida perfil atualizado
            this.validateProfile(updatedProfile);
            
            // Salva perfil atualizado
            this.activeProfiles.set(userId, updatedProfile);
            this.saveProfile(updatedProfile);
            
            console.log(`[${new Date().toISOString()}] ✅ Perfil atualizado`);
            
            return { success: true, profile: updatedProfile };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao atualizar perfil:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Remove perfil de usuário
     */
    removeProfile(userId) {
        console.log(`[${new Date().toISOString()}] 👤 Removendo perfil do usuário ${userId}...`);
        
        try {
            const profile = this.getProfile(userId);
            
            if (!profile) {
                throw new Error(`Perfil não encontrado: ${userId}`);
            }
            
            // Remove do cache
            this.activeProfiles.delete(userId);
            
            // Remove do armazenamento
            this.deleteProfile(userId);
            
            console.log(`[${new Date().toISOString()}] ✅ Perfil removido`);
            
            return { success: true };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao remover perfil:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Lista todos os perfis ativos
     */
    listProfiles() {
        const profiles = Array.from(this.activeProfiles.values());
        
        return {
            total: profiles.length,
            profiles: profiles.map(profile => ({
                id: profile.id,
                type: profile.type,
                name: profile.name,
                isActive: profile.isActive,
                lastModified: profile.lastModified
            }))
        };
    }

    /**
     * Obtém configurações de interface para um usuário
     */
    getInterfaceSettings(userId) {
        const profile = this.getProfile(userId);
        
        if (!profile) {
            return this.defaultProfiles.guest.interface;
        }
        
        return profile.interface;
    }

    /**
     * Obtém configurações de produtividade para um usuário
     */
    getProductivitySettings(userId) {
        const profile = this.getProfile(userId);
        
        if (!profile) {
            return this.defaultProfiles.guest.productivity;
        }
        
        return profile.productivity;
    }

    /**
     * Verifica permissões de um usuário
     */
    hasPermission(userId, permission) {
        const profile = this.getProfile(userId);
        
        if (!profile) {
            return false;
        }
        
        return profile.permissions.includes(permission);
    }

    /**
     * Obtém funcionalidades disponíveis para um usuário
     */
    getAvailableFeatures(userId) {
        const profile = this.getProfile(userId);
        
        if (!profile) {
            return this.defaultProfiles.guest.features;
        }
        
        return profile.features;
    }

    /**
     * Aplica tema baseado no perfil
     */
    applyTheme(userId) {
        const settings = this.getInterfaceSettings(userId);
        const theme = settings.theme;
        
        // Simula aplicação de tema
        const themeConfig = {
            dark: {
                backgroundColor: '#1a1a1a',
                textColor: '#ffffff',
                primaryColor: '#4a90e2',
                secondaryColor: '#666666'
            },
            light: {
                backgroundColor: '#ffffff',
                textColor: '#333333',
                primaryColor: '#007bff',
                secondaryColor: '#6c757d'
            },
            auto: {
                backgroundColor: 'auto',
                textColor: 'auto',
                primaryColor: '#4a90e2',
                secondaryColor: '#666666'
            }
        };
        
        return themeConfig[theme] || themeConfig.light;
    }

    /**
     * Gera recomendações de personalização
     */
    generateRecommendations(userId) {
        const profile = this.getProfile(userId);
        
        if (!profile) {
            return [];
        }
        
        const recommendations = [];
        
        // Recomendações baseadas no tipo de perfil
        switch (profile.type) {
            case 'admin':
                recommendations.push('Configure notificações avançadas para monitoramento completo');
                recommendations.push('Ative relatórios detalhados para análise de performance');
                break;
            case 'manager':
                recommendations.push('Configure dashboard de equipe para gestão eficiente');
                recommendations.push('Ative notificações de prioridade para tarefas importantes');
                break;
            case 'employee':
                recommendations.push('Configure foco de produtividade para melhor performance');
                recommendations.push('Ative lembretes de pausas para bem-estar');
                break;
            case 'family':
                recommendations.push('Configure calendário familiar para organização');
                recommendations.push('Ative notificações de compras para planejamento');
                break;
        }
        
        // Recomendações baseadas no uso
        if (profile.productivity.focusTime < 30) {
            recommendations.push('Considere aumentar o tempo de foco para melhor produtividade');
        }
        
        return recommendations;
    }

    /**
     * Valida perfil de usuário
     */
    validateProfile(profile) {
        const errors = [];
        
        // Validações básicas
        if (!profile.id) {
            errors.push('ID do usuário é obrigatório');
        }
        
        if (!profile.type) {
            errors.push('Tipo de perfil é obrigatório');
        }
        
        if (!this.defaultProfiles[profile.type]) {
            errors.push(`Tipo de perfil inválido: ${profile.type}`);
        }
        
        // Validações de permissões
        if (!Array.isArray(profile.permissions)) {
            errors.push('Permissões devem ser um array');
        }
        
        // Validações de interface
        if (profile.interface) {
            const validThemes = ['dark', 'light', 'auto'];
            if (!validThemes.includes(profile.interface.theme)) {
                errors.push(`Tema inválido: ${profile.interface.theme}`);
            }
        }
        
        if (errors.length > 0) {
            throw new Error(`Perfil inválido: ${errors.join(', ')}`);
        }
        
        return true;
    }

    /**
     * Carrega perfis salvos
     */
    async loadSavedProfiles() {
        try {
            // Simula carregamento de perfis salvos
            const savedProfiles = this.generateMockProfiles();
            
            savedProfiles.forEach(profile => {
                this.activeProfiles.set(profile.id, profile);
            });
            
            console.log(`[${new Date().toISOString()}] ✅ ${savedProfiles.length} perfis carregados`);
        } catch (error) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao carregar perfis:`, error);
        }
    }

    /**
     * Salva perfil
     */
    saveProfile(profile) {
        try {
            // Simula salvamento
            const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
            profiles[profile.id] = profile;
            localStorage.setItem('userProfiles', JSON.stringify(profiles));
        } catch (error) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao salvar perfil:`, error);
        }
    }

    /**
     * Remove perfil do armazenamento
     */
    deleteProfile(userId) {
        try {
            const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
            delete profiles[userId];
            localStorage.setItem('userProfiles', JSON.stringify(profiles));
        } catch (error) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao remover perfil:`, error);
        }
    }

    /**
     * Configura sincronização automática
     */
    setupAutoSync() {
        setInterval(() => {
            this.syncProfiles();
        }, this.config.syncInterval);
        
        console.log(`[${new Date().toISOString()}] ⏰ Sincronização automática configurada`);
    }

    /**
     * Sincroniza perfis
     */
    async syncProfiles() {
        try {
            const profiles = Array.from(this.activeProfiles.values());
            
            profiles.forEach(profile => {
                this.saveProfile(profile);
            });
            
            console.log(`[${new Date().toISOString()}] 🔄 ${profiles.length} perfis sincronizados`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro na sincronização:`, error);
        }
    }

    /**
     * Gera perfis mock para desenvolvimento
     */
    generateMockProfiles() {
        return [
            {
                id: 'admin_001',
                type: 'admin',
                name: 'Administrador Principal',
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                permissions: ['full_access', 'user_management', 'system_config'],
                features: ['dashboard', 'reports', 'analytics', 'settings'],
                interface: {
                    theme: 'dark',
                    layout: 'advanced',
                    notifications: 'all'
                },
                productivity: {
                    focusTime: 45,
                    breakTime: 15,
                    priorityTasks: true
                },
                preferences: {},
                isActive: true
            },
            {
                id: 'manager_001',
                type: 'manager',
                name: 'Gerente de Equipe',
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                permissions: ['task_management', 'reports', 'team_view'],
                features: ['dashboard', 'tasks', 'reports', 'team'],
                interface: {
                    theme: 'light',
                    layout: 'standard',
                    notifications: 'important'
                },
                productivity: {
                    focusTime: 30,
                    breakTime: 10,
                    priorityTasks: true
                },
                preferences: {},
                isActive: true
            },
            {
                id: 'employee_001',
                type: 'employee',
                name: 'Funcionário Padrão',
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                permissions: ['task_view', 'task_update'],
                features: ['tasks', 'schedule', 'notifications'],
                interface: {
                    theme: 'light',
                    layout: 'simple',
                    notifications: 'tasks_only'
                },
                productivity: {
                    focusTime: 25,
                    breakTime: 5,
                    priorityTasks: false
                },
                preferences: {},
                isActive: true
            }
        ];
    }

    /**
     * Obtém relatório de perfis
     */
    getProfilesReport() {
        const profiles = this.listProfiles();
        
        return {
            system: {
                name: this.name,
                version: this.version,
                status: this.status
            },
            profiles: profiles,
            statistics: {
                totalProfiles: profiles.total,
                activeProfiles: profiles.profiles.filter(p => p.isActive).length,
                profileTypes: this.getProfileTypeDistribution(),
                lastSync: new Date().toISOString()
            },
            config: this.config
        };
    }

    /**
     * Obtém distribuição de tipos de perfil
     */
    getProfileTypeDistribution() {
        const profiles = Array.from(this.activeProfiles.values());
        const distribution = {};
        
        profiles.forEach(profile => {
            distribution[profile.type] = (distribution[profile.type] || 0) + 1;
        });
        
        return distribution;
    }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserProfiles;
}

// Para uso no browser
if (typeof window !== 'undefined') {
    window.UserProfiles = UserProfiles;
} 