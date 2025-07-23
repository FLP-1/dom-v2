/**
 * 🎨 PERSONALIZATION SYSTEM - DOM v2
 * Sistema principal de personalização avançada
 * Integra UserProfiles e PersonalizationRules
 * Implementação: Semana 21-22 da Fase 5
 */

const UserProfiles = require('./configs/user-profiles.js');
const PersonalizationRules = require('./rules/personalization-rules.js');

class PersonalizationSystem {
    constructor() {
        this.name = 'PersonalizationSystem';
        this.version = '1.0.0';
        this.status = 'active';
        
        // Inicializa componentes
        this.userProfiles = new UserProfiles();
        this.personalizationRules = new PersonalizationRules();
        
        // Configurações do sistema
        this.config = {
            autoPersonalization: true,
            learningEnabled: true,
            adaptationInterval: 300000, // 5 minutos
            maxHistorySize: 1000,
            backupEnabled: true
        };
        
        // Cache de personalizações
        this.personalizationCache = new Map();
        
        // Histórico de adaptações
        this.adaptationHistory = [];
        
        // Métricas de performance
        this.metrics = {
            totalAdaptations: 0,
            successfulAdaptations: 0,
            averageAdaptationTime: 0,
            lastAdaptation: null
        };
    }

    /**
     * Inicializa o sistema de personalização
     */
    async initialize() {
        console.log(`[${new Date().toISOString()}] 🎨 Inicializando sistema de personalização...`);
        
        try {
            // Inicializa componentes
            await Promise.all([
                this.userProfiles.initialize(),
                this.personalizationRules.initialize()
            ]);
            
            // Configura adaptação automática
            if (this.config.autoPersonalization) {
                this.setupAutoAdaptation();
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Sistema de personalização inicializado`);
            
            return { success: true, message: 'Sistema inicializado com sucesso' };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao inicializar personalização:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Aplica personalização para um usuário
     */
    async applyPersonalization(userId, context = {}) {
        console.log(`[${new Date().toISOString()}] 🎨 Aplicando personalização para usuário ${userId}...`);
        
        const startTime = Date.now();
        
        try {
            // Obtém perfil do usuário
            let profile = this.userProfiles.getProfile(userId);
            
            if (!profile) {
                // Cria perfil padrão se não existir
                const createResult = this.userProfiles.createProfile(userId, 'employee');
                if (!createResult.success) {
                    throw new Error('Falha ao criar perfil padrão');
                }
                profile = createResult.profile;
            }
            
            // Avalia e aplica regras de personalização
            const rulesResult = this.personalizationRules.evaluateRules(userId, {
                ...context,
                profile: profile
            });
            
            if (!rulesResult.success) {
                throw new Error(rulesResult.error);
            }
            
            // Aplica mudanças baseadas nas regras
            const adaptedProfile = this.applyAdaptations(profile, rulesResult.appliedRules);
            
            // Atualiza perfil se houver mudanças
            if (this.hasChanges(profile, adaptedProfile)) {
                const updateResult = this.userProfiles.updateProfile(userId, adaptedProfile);
                if (!updateResult.success) {
                    throw new Error('Falha ao atualizar perfil');
                }
                profile = updateResult.profile;
            }
            
            // Gera personalização final
            const personalization = this.generatePersonalization(profile, context);
            
            // Atualiza cache
            this.personalizationCache.set(userId, personalization);
            
            // Registra adaptação
            this.recordAdaptation(userId, rulesResult, startTime);
            
            console.log(`[${new Date().toISOString()}] ✅ Personalização aplicada em ${Date.now() - startTime}ms`);
            
            return {
                success: true,
                personalization: personalization,
                profile: profile,
                appliedRules: rulesResult.appliedRules,
                changes: rulesResult.changes,
                recommendations: rulesResult.recommendations
            };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao aplicar personalização:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Aplica adaptações baseadas nas regras
     */
    applyAdaptations(profile, appliedRules) {
        let adaptedProfile = { ...profile };
        
        appliedRules.forEach(rule => {
            try {
                adaptedProfile = rule.action(adaptedProfile);
            } catch (error) {
                console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao aplicar regra ${rule.id}:`, error);
            }
        });
        
        return adaptedProfile;
    }

    /**
     * Verifica se houve mudanças no perfil
     */
    hasChanges(originalProfile, adaptedProfile) {
        return JSON.stringify(originalProfile) !== JSON.stringify(adaptedProfile);
    }

    /**
     * Gera personalização final
     */
    generatePersonalization(profile, context) {
        const interfaceSettings = this.userProfiles.getInterfaceSettings(profile.id);
        const productivitySettings = this.userProfiles.getProductivitySettings(profile.id);
        const theme = this.userProfiles.applyTheme(profile.id);
        
        return {
            userId: profile.id,
            profile: {
                type: profile.type,
                name: profile.name,
                permissions: profile.permissions,
                features: profile.features
            },
            interface: {
                theme: theme,
                settings: interfaceSettings,
                layout: this.generateLayout(profile, context),
                notifications: this.generateNotificationSettings(profile, context)
            },
            productivity: {
                settings: productivitySettings,
                recommendations: this.generateProductivityRecommendations(profile, context),
                shortcuts: this.generateShortcuts(profile)
            },
            preferences: profile.preferences || {},
            lastUpdate: new Date().toISOString()
        };
    }

    /**
     * Gera configuração de layout
     */
    generateLayout(profile, context) {
        const baseLayout = profile.interface?.layout || 'standard';
        
        // Adapta layout baseado no contexto
        if (context.device?.type === 'mobile') {
            return 'mobile';
        }
        
        if (profile.type === 'admin') {
            return 'advanced';
        }
        
        if (profile.type === 'family') {
            return 'family';
        }
        
        return baseLayout;
    }

    /**
     * Gera configurações de notificação
     */
    generateNotificationSettings(profile, context) {
        const baseNotifications = profile.interface?.notifications || 'standard';
        
        // Adapta notificações baseado no contexto
        if (context.time?.hour >= 22 || context.time?.hour <= 7) {
            return 'quiet';
        }
        
        if (profile.type === 'admin') {
            return 'all';
        }
        
        if (profile.type === 'employee') {
            return 'tasks_only';
        }
        
        return baseNotifications;
    }

    /**
     * Gera recomendações de produtividade
     */
    generateProductivityRecommendations(profile, context) {
        const recommendations = [];
        
        // Recomendações baseadas no tipo de perfil
        switch (profile.type) {
            case 'admin':
                recommendations.push('Configure dashboard avançado para monitoramento completo');
                recommendations.push('Ative relatórios automáticos para análise de performance');
                break;
            case 'manager':
                recommendations.push('Configure gestão de equipe para liderança eficiente');
                recommendations.push('Ative notificações de prioridade para tarefas críticas');
                break;
            case 'employee':
                recommendations.push('Configure foco de produtividade para melhor performance');
                recommendations.push('Ative lembretes de pausas para bem-estar');
                break;
            case 'family':
                recommendations.push('Configure calendário familiar para organização');
                recommendations.push('Ative lista de compras compartilhada');
                break;
        }
        
        // Recomendações baseadas no contexto
        if (context.time?.hour >= 9 && context.time?.hour <= 11) {
            recommendations.push('Horário ideal para tarefas complexas - aproveite o pico de produtividade');
        }
        
        return recommendations;
    }

    /**
     * Gera atalhos personalizados
     */
    generateShortcuts(profile) {
        const shortcuts = [];
        
        // Atalhos baseados no tipo de perfil
        switch (profile.type) {
            case 'admin':
                shortcuts.push({ name: 'Dashboard', action: 'open_dashboard', icon: 'dashboard' });
                shortcuts.push({ name: 'Relatórios', action: 'open_reports', icon: 'analytics' });
                shortcuts.push({ name: 'Configurações', action: 'open_settings', icon: 'settings' });
                break;
            case 'manager':
                shortcuts.push({ name: 'Tarefas', action: 'open_tasks', icon: 'tasks' });
                shortcuts.push({ name: 'Equipe', action: 'open_team', icon: 'group' });
                shortcuts.push({ name: 'Relatórios', action: 'open_reports', icon: 'analytics' });
                break;
            case 'employee':
                shortcuts.push({ name: 'Minhas Tarefas', action: 'open_my_tasks', icon: 'tasks' });
                shortcuts.push({ name: 'Cronograma', action: 'open_schedule', icon: 'calendar' });
                shortcuts.push({ name: 'Notificações', action: 'open_notifications', icon: 'notifications' });
                break;
            case 'family':
                shortcuts.push({ name: 'Calendário', action: 'open_calendar', icon: 'calendar' });
                shortcuts.push({ name: 'Compras', action: 'open_shopping', icon: 'shopping' });
                shortcuts.push({ name: 'Tarefas', action: 'open_tasks', icon: 'tasks' });
                break;
        }
        
        return shortcuts;
    }

    /**
     * Registra adaptação no histórico
     */
    recordAdaptation(userId, rulesResult, startTime) {
        const adaptation = {
            userId: userId,
            timestamp: new Date().toISOString(),
            appliedRules: rulesResult.appliedRules.length,
            changes: rulesResult.changes.length,
            processingTime: Date.now() - startTime,
            success: true
        };
        
        this.adaptationHistory.push(adaptation);
        
        // Limita tamanho do histórico
        if (this.adaptationHistory.length > this.config.maxHistorySize) {
            this.adaptationHistory = this.adaptationHistory.slice(-this.config.maxHistorySize);
        }
        
        // Atualiza métricas
        this.metrics.totalAdaptations++;
        this.metrics.successfulAdaptations++;
        this.metrics.averageAdaptationTime = 
            (this.metrics.averageAdaptationTime * (this.metrics.totalAdaptations - 1) + adaptation.processingTime) / this.metrics.totalAdaptations;
        this.metrics.lastAdaptation = new Date().toISOString();
    }

    /**
     * Configura adaptação automática
     */
    setupAutoAdaptation() {
        setInterval(() => {
            this.adaptAllActiveUsers();
        }, this.config.adaptationInterval);
        
        console.log(`[${new Date().toISOString()}] ⏰ Adaptação automática configurada`);
    }

    /**
     * Adapta todos os usuários ativos
     */
    async adaptAllActiveUsers() {
        try {
            const activeUsers = Array.from(this.personalizationCache.keys());
            
            for (const userId of activeUsers) {
                await this.applyPersonalization(userId);
            }
            
            console.log(`[${new Date().toISOString()}] 🔄 Adaptação aplicada para ${activeUsers.length} usuários`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro na adaptação automática:`, error);
        }
    }

    /**
     * Obtém personalização atual de um usuário
     */
    getPersonalization(userId) {
        return this.personalizationCache.get(userId) || null;
    }

    /**
     * Lista todas as personalizações ativas
     */
    listPersonalizations() {
        const personalizations = Array.from(this.personalizationCache.entries());
        
        return {
            total: personalizations.length,
            personalizations: personalizations.map(([userId, personalization]) => ({
                userId: userId,
                profileType: personalization.profile.type,
                lastUpdate: personalization.lastUpdate
            }))
        };
    }

    /**
     * Cria perfil personalizado
     */
    createCustomProfile(userId, profileType, customSettings) {
        return this.userProfiles.createProfile(userId, profileType, customSettings);
    }

    /**
     * Cria regra personalizada
     */
    createCustomRule(userId, ruleData) {
        return this.personalizationRules.createCustomRule(userId, ruleData);
    }

    /**
     * Obtém recomendações de personalização
     */
    getPersonalizationRecommendations(userId) {
        const profile = this.userProfiles.getProfile(userId);
        
        if (!profile) {
            return [];
        }
        
        return this.userProfiles.generateRecommendations(userId);
    }

    /**
     * Valida qualidade da personalização
     */
    validatePersonalization(userId) {
        const personalization = this.getPersonalization(userId);
        const profile = this.userProfiles.getProfile(userId);
        
        if (!personalization || !profile) {
            return { valid: false, errors: ['Perfil ou personalização não encontrados'] };
        }
        
        const errors = [];
        
        // Validações básicas
        if (!personalization.interface) {
            errors.push('Configurações de interface ausentes');
        }
        
        if (!personalization.productivity) {
            errors.push('Configurações de produtividade ausentes');
        }
        
        if (!personalization.profile) {
            errors.push('Informações de perfil ausentes');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors,
            quality: errors.length === 0 ? 'excellent' : 'needs_improvement'
        };
    }

    /**
     * Obtém relatório completo do sistema
     */
    getSystemReport() {
        const profilesReport = this.userProfiles.getProfilesReport();
        const rulesReport = this.personalizationRules.getRulesReport();
        
        return {
            system: {
                name: this.name,
                version: this.version,
                status: this.status
            },
            components: {
                userProfiles: profilesReport,
                personalizationRules: rulesReport
            },
            personalizations: this.listPersonalizations(),
            metrics: this.metrics,
            history: {
                totalAdaptations: this.adaptationHistory.length,
                recentAdaptations: this.adaptationHistory.slice(-10),
                successRate: this.metrics.totalAdaptations > 0 ? 
                    (this.metrics.successfulAdaptations / this.metrics.totalAdaptations) * 100 : 0
            },
            config: this.config,
            lastUpdate: new Date().toISOString()
        };
    }

    /**
     * Obtém dados para dashboard
     */
    getDashboardData() {
        const profiles = this.userProfiles.listProfiles();
        const personalizations = this.listPersonalizations();
        
        return {
            profiles: {
                total: profiles.total,
                byType: this.userProfiles.getProfileTypeDistribution(),
                active: profiles.profiles.filter(p => p.isActive).length
            },
            personalizations: {
                total: personalizations.total,
                recent: personalizations.personalizations.slice(-5)
            },
            metrics: {
                successRate: this.metrics.totalAdaptations > 0 ? 
                    (this.metrics.successfulAdaptations / this.metrics.totalAdaptations) * 100 : 0,
                averageTime: this.metrics.averageAdaptationTime,
                lastAdaptation: this.metrics.lastAdaptation
            },
            recommendations: this.generateSystemRecommendations()
        };
    }

    /**
     * Gera recomendações do sistema
     */
    generateSystemRecommendations() {
        const recommendations = [];
        
        // Recomendações baseadas em métricas
        if (this.metrics.successRate < 90) {
            recommendations.push('Taxa de sucesso baixa - revise regras de personalização');
        }
        
        if (this.metrics.averageAdaptationTime > 1000) {
            recommendations.push('Tempo de adaptação alto - otimize performance');
        }
        
        // Recomendações baseadas em uso
        const profiles = this.userProfiles.listProfiles();
        if (profiles.total < 5) {
            recommendations.push('Poucos perfis ativos - considere criar mais perfis personalizados');
        }
        
        return recommendations;
    }
}

// Função principal para execução
async function main() {
    console.log(`[${new Date().toISOString()}] 🚀 Iniciando sistema de personalização DOM v2...`);
    
    const system = new PersonalizationSystem();
    
    try {
        // Inicializa sistema
        const initResult = await system.initialize();
        if (!initResult.success) {
            throw new Error(initResult.error);
        }
        
        // Testa personalização
        const testResult = await system.applyPersonalization('test_user');
        if (!testResult.success) {
            throw new Error(testResult.error);
        }
        
        // Exibe resultados
        console.log(`[${new Date().toISOString()}] 🎨 SISTEMA DE PERSONALIZAÇÃO CONCLUÍDO`);
        console.log(`[${new Date().toISOString()}] ======================================`);
        console.log(`[${new Date().toISOString()}] ✅ Perfis criados: ${testResult.profile ? 1 : 0}`);
        console.log(`[${new Date().toISOString()}] ✅ Regras aplicadas: ${testResult.appliedRules.length}`);
        console.log(`[${new Date().toISOString()}] ✅ Personalização gerada`);
        
        return {
            success: true,
            system: system,
            testResult: testResult
        };
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Erro no sistema de personalização:`, error);
        return { success: false, error: error.message };
    }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalizationSystem;
    module.exports.main = main;
}

// Para uso no browser
if (typeof window !== 'undefined') {
    window.PersonalizationSystem = PersonalizationSystem;
    window.runPersonalizationSystem = main;
}

// Executa se for o arquivo principal
if (require.main === module) {
    main().then(result => {
        if (result.success) {
            console.log(`[${new Date().toISOString()}] 🎉 Sistema de personalização executado com sucesso!`);
            process.exit(0);
        } else {
            console.error(`[${new Date().toISOString()}] ❌ Falha no sistema de personalização:`, result.error);
            process.exit(1);
        }
    }).catch(error => {
        console.error(`[${new Date().toISOString()}] ❌ Erro inesperado:`, error);
        process.exit(1);
    });
} 