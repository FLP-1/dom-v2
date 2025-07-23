/**
 * ⚙️ PERSONALIZATION RULES - DOM v2
 * Sistema de regras de personalização para adaptação automática
 * Implementação: Semana 21-22 da Fase 5
 */

class PersonalizationRules {
    constructor() {
        this.name = 'PersonalizationRules';
        this.version = '1.0.0';
        this.status = 'active';
        
        // Tipos de regras
        this.ruleTypes = {
            INTERFACE: 'interface',
            PRODUCTIVITY: 'productivity',
            NOTIFICATION: 'notification',
            FEATURE: 'feature',
            BEHAVIOR: 'behavior'
        };
        
        // Regras padrão do sistema
        this.defaultRules = {
            // Regras de interface
            interface: {
                theme_auto: {
                    name: 'Tema Automático',
                    description: 'Ajusta tema baseado na hora do dia',
                    condition: (context) => context.time.hour >= 18 || context.time.hour <= 6,
                    action: (profile) => ({ ...profile, interface: { ...profile.interface, theme: 'dark' } }),
                    priority: 1
                },
                layout_adaptive: {
                    name: 'Layout Adaptativo',
                    description: 'Ajusta layout baseado no dispositivo',
                    condition: (context) => context.device.type === 'mobile',
                    action: (profile) => ({ ...profile, interface: { ...profile.interface, layout: 'mobile' } }),
                    priority: 2
                }
            },
            
            // Regras de produtividade
            productivity: {
                focus_time_optimization: {
                    name: 'Otimização de Foco',
                    description: 'Ajusta tempo de foco baseado no histórico',
                    condition: (context) => context.productivity.averageFocus < 20,
                    action: (profile) => ({ 
                        ...profile, 
                        productivity: { 
                            ...profile.productivity, 
                            focusTime: Math.min(profile.productivity.focusTime + 5, 60) 
                        } 
                    }),
                    priority: 3
                },
                break_reminder: {
                    name: 'Lembrete de Pausa',
                    description: 'Ativa lembretes de pausa para usuários com foco longo',
                    condition: (context) => context.productivity.focusTime > 45,
                    action: (profile) => ({ 
                        ...profile, 
                        productivity: { 
                            ...profile.productivity, 
                            breakReminders: true 
                        } 
                    }),
                    priority: 4
                }
            },
            
            // Regras de notificação
            notification: {
                quiet_hours: {
                    name: 'Horário Silencioso',
                    description: 'Reduz notificações em horários específicos',
                    condition: (context) => context.time.hour >= 22 || context.time.hour <= 7,
                    action: (profile) => ({ 
                        ...profile, 
                        interface: { 
                            ...profile.interface, 
                            notifications: 'urgent_only' 
                        } 
                    }),
                    priority: 5
                },
                priority_notifications: {
                    name: 'Notificações Prioritárias',
                    description: 'Ativa notificações prioritárias para gerentes',
                    condition: (context) => context.profile.type === 'manager',
                    action: (profile) => ({ 
                        ...profile, 
                        interface: { 
                            ...profile.interface, 
                            notifications: 'priority' 
                        } 
                    }),
                    priority: 6
                }
            },
            
            // Regras de funcionalidades
            feature: {
                admin_features: {
                    name: 'Funcionalidades de Admin',
                    description: 'Ativa funcionalidades avançadas para administradores',
                    condition: (context) => context.profile.type === 'admin',
                    action: (profile) => ({ 
                        ...profile, 
                        features: [...profile.features, 'analytics', 'system_config', 'user_management'] 
                    }),
                    priority: 7
                },
                family_features: {
                    name: 'Funcionalidades Familiares',
                    description: 'Ativa funcionalidades específicas para família',
                    condition: (context) => context.profile.type === 'family',
                    action: (profile) => ({ 
                        ...profile, 
                        features: [...profile.features, 'family_calendar', 'shopping_list', 'shared_tasks'] 
                    }),
                    priority: 8
                }
            },
            
            // Regras de comportamento
            behavior: {
                learning_adaptation: {
                    name: 'Adaptação por Aprendizado',
                    description: 'Adapta baseado no comportamento do usuário',
                    condition: (context) => context.behavior.usagePattern === 'frequent',
                    action: (profile) => ({ 
                        ...profile, 
                        preferences: { 
                            ...profile.preferences, 
                            autoSuggestions: true,
                            quickActions: true 
                        } 
                    }),
                    priority: 9
                },
                efficiency_optimization: {
                    name: 'Otimização de Eficiência',
                    description: 'Otimiza para usuários eficientes',
                    condition: (context) => context.productivity.efficiency > 0.8,
                    action: (profile) => ({ 
                        ...profile, 
                        productivity: { 
                            ...profile.productivity, 
                            advancedFeatures: true,
                            shortcuts: true 
                        } 
                    }),
                    priority: 10
                }
            }
        };
        
        // Regras personalizadas do usuário
        this.customRules = new Map();
        
        // Cache de contexto
        this.contextCache = new Map();
        
        // Configurações
        this.config = {
            autoApply: true,
            learningEnabled: true,
            maxCustomRules: 20,
            evaluationInterval: 60000 // 1 minuto
        };
    }

    /**
     * Inicializa o sistema de regras
     */
    async initialize() {
        console.log(`[${new Date().toISOString()}] ⚙️ Inicializando sistema de regras de personalização...`);
        
        try {
            // Carrega regras personalizadas
            await this.loadCustomRules();
            
            // Configura avaliação automática
            if (this.config.autoApply) {
                this.setupAutoEvaluation();
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Sistema de regras inicializado`);
            return { success: true, message: 'Sistema de regras inicializado' };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao inicializar regras:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Avalia e aplica regras para um usuário
     */
    evaluateRules(userId, context = {}) {
        console.log(`[${new Date().toISOString()}] ⚙️ Avaliando regras para usuário ${userId}...`);
        
        try {
            // Obtém contexto completo
            const fullContext = this.buildContext(userId, context);
            
            // Avalia regras padrão
            const appliedRules = this.evaluateDefaultRules(fullContext);
            
            // Avalia regras personalizadas
            const customRules = this.evaluateCustomRules(userId, fullContext);
            
            // Combina resultados
            const allAppliedRules = [...appliedRules, ...customRules];
            
            // Aplica regras em ordem de prioridade
            const result = this.applyRules(userId, allAppliedRules);
            
            // Atualiza cache de contexto
            this.contextCache.set(userId, fullContext);
            
            console.log(`[${new Date().toISOString()}] ✅ ${allAppliedRules.length} regras aplicadas`);
            
            return {
                success: true,
                appliedRules: allAppliedRules,
                changes: result.changes,
                recommendations: result.recommendations
            };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao avaliar regras:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Constrói contexto completo para avaliação
     */
    buildContext(userId, additionalContext = {}) {
        const now = new Date();
        
        return {
            userId: userId,
            time: {
                hour: now.getHours(),
                day: now.getDay(),
                month: now.getMonth(),
                timestamp: now.toISOString()
            },
            device: {
                type: additionalContext.deviceType || 'desktop',
                screenSize: additionalContext.screenSize || 'large',
                platform: additionalContext.platform || 'web'
            },
            profile: additionalContext.profile || {},
            productivity: additionalContext.productivity || {
                averageFocus: 25,
                efficiency: 0.7,
                focusTime: 30
            },
            behavior: additionalContext.behavior || {
                usagePattern: 'normal',
                lastActivity: now.toISOString(),
                sessionDuration: 30
            },
            environment: additionalContext.environment || {
                location: 'home',
                network: 'stable',
                battery: 100
            }
        };
    }

    /**
     * Avalia regras padrão do sistema
     */
    evaluateDefaultRules(context) {
        const appliedRules = [];
        
        Object.keys(this.defaultRules).forEach(category => {
            const categoryRules = this.defaultRules[category];
            
            Object.keys(categoryRules).forEach(ruleId => {
                const rule = categoryRules[ruleId];
                
                try {
                    if (rule.condition(context)) {
                        appliedRules.push({
                            id: ruleId,
                            category: category,
                            name: rule.name,
                            description: rule.description,
                            priority: rule.priority,
                            action: rule.action
                        });
                    }
                } catch (error) {
                    console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao avaliar regra ${ruleId}:`, error);
                }
            });
        });
        
        // Ordena por prioridade
        return appliedRules.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Avalia regras personalizadas
     */
    evaluateCustomRules(userId, context) {
        const userRules = this.customRules.get(userId) || [];
        const appliedRules = [];
        
        userRules.forEach(rule => {
            try {
                if (rule.condition(context)) {
                    appliedRules.push({
                        id: rule.id,
                        category: rule.category,
                        name: rule.name,
                        description: rule.description,
                        priority: rule.priority,
                        action: rule.action,
                        isCustom: true
                    });
                }
            } catch (error) {
                console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao avaliar regra personalizada ${rule.id}:`, error);
            }
        });
        
        return appliedRules;
    }

    /**
     * Aplica regras a um perfil
     */
    applyRules(userId, rules) {
        const changes = [];
        const recommendations = [];
        
        // Simula aplicação das regras
        rules.forEach(rule => {
            try {
                const change = {
                    ruleId: rule.id,
                    ruleName: rule.name,
                    category: rule.category,
                    timestamp: new Date().toISOString()
                };
                
                changes.push(change);
                
                // Gera recomendação baseada na regra
                if (rule.description) {
                    recommendations.push({
                        type: 'rule_applied',
                        message: `Regra aplicada: ${rule.description}`,
                        priority: rule.priority
                    });
                }
                
            } catch (error) {
                console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao aplicar regra ${rule.id}:`, error);
            }
        });
        
        return { changes, recommendations };
    }

    /**
     * Cria uma regra personalizada
     */
    createCustomRule(userId, ruleData) {
        console.log(`[${new Date().toISOString()}] ⚙️ Criando regra personalizada para usuário ${userId}...`);
        
        try {
            // Valida dados da regra
            this.validateRuleData(ruleData);
            
            // Verifica limite de regras
            const userRules = this.customRules.get(userId) || [];
            if (userRules.length >= this.config.maxCustomRules) {
                throw new Error(`Limite de regras personalizadas atingido: ${this.config.maxCustomRules}`);
            }
            
            // Cria regra
            const rule = {
                id: `custom_${Date.now()}`,
                userId: userId,
                category: ruleData.category,
                name: ruleData.name,
                description: ruleData.description,
                condition: ruleData.condition,
                action: ruleData.action,
                priority: ruleData.priority || 100,
                createdAt: new Date().toISOString(),
                isActive: true
            };
            
            // Adiciona à lista de regras do usuário
            userRules.push(rule);
            this.customRules.set(userId, userRules);
            
            // Salva regra
            this.saveCustomRule(rule);
            
            console.log(`[${new Date().toISOString()}] ✅ Regra personalizada criada: ${rule.name}`);
            
            return { success: true, rule };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao criar regra personalizada:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Remove uma regra personalizada
     */
    removeCustomRule(userId, ruleId) {
        console.log(`[${new Date().toISOString()}] ⚙️ Removendo regra personalizada ${ruleId}...`);
        
        try {
            const userRules = this.customRules.get(userId) || [];
            const ruleIndex = userRules.findIndex(rule => rule.id === ruleId);
            
            if (ruleIndex === -1) {
                throw new Error(`Regra não encontrada: ${ruleId}`);
            }
            
            // Remove regra
            userRules.splice(ruleIndex, 1);
            this.customRules.set(userId, userRules);
            
            // Remove do armazenamento
            this.deleteCustomRule(ruleId);
            
            console.log(`[${new Date().toISOString()}] ✅ Regra personalizada removida`);
            
            return { success: true };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao remover regra:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Lista regras personalizadas de um usuário
     */
    listCustomRules(userId) {
        const userRules = this.customRules.get(userId) || [];
        
        return {
            total: userRules.length,
            rules: userRules.map(rule => ({
                id: rule.id,
                name: rule.name,
                category: rule.category,
                priority: rule.priority,
                isActive: rule.isActive,
                createdAt: rule.createdAt
            }))
        };
    }

    /**
     * Valida dados de uma regra
     */
    validateRuleData(ruleData) {
        const errors = [];
        
        if (!ruleData.name || ruleData.name.trim() === '') {
            errors.push('Nome da regra é obrigatório');
        }
        
        if (!ruleData.category || !this.ruleTypes[ruleData.category.toUpperCase()]) {
            errors.push('Categoria de regra inválida');
        }
        
        if (typeof ruleData.condition !== 'function') {
            errors.push('Condição deve ser uma função');
        }
        
        if (typeof ruleData.action !== 'function') {
            errors.push('Ação deve ser uma função');
        }
        
        if (errors.length > 0) {
            throw new Error(`Dados de regra inválidos: ${errors.join(', ')}`);
        }
        
        return true;
    }

    /**
     * Configura avaliação automática
     */
    setupAutoEvaluation() {
        setInterval(() => {
            this.evaluateAllUsers();
        }, this.config.evaluationInterval);
        
        console.log(`[${new Date().toISOString()}] ⏰ Avaliação automática configurada`);
    }

    /**
     * Avalia regras para todos os usuários ativos
     */
    async evaluateAllUsers() {
        try {
            const activeUsers = Array.from(this.contextCache.keys());
            
            for (const userId of activeUsers) {
                await this.evaluateRules(userId);
            }
            
            console.log(`[${new Date().toISOString()}] 🔄 Regras avaliadas para ${activeUsers.length} usuários`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro na avaliação automática:`, error);
        }
    }

    /**
     * Carrega regras personalizadas
     */
    async loadCustomRules() {
        try {
            // Simula carregamento de regras personalizadas
            const savedRules = this.generateMockCustomRules();
            
            savedRules.forEach(rule => {
                const userRules = this.customRules.get(rule.userId) || [];
                userRules.push(rule);
                this.customRules.set(rule.userId, userRules);
            });
            
            console.log(`[${new Date().toISOString()}] ✅ ${savedRules.length} regras personalizadas carregadas`);
        } catch (error) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao carregar regras personalizadas:`, error);
        }
    }

    /**
     * Salva regra personalizada
     */
    saveCustomRule(rule) {
        try {
            const rules = JSON.parse(localStorage.getItem('customRules') || '[]');
            rules.push(rule);
            localStorage.setItem('customRules', JSON.stringify(rules));
        } catch (error) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao salvar regra:`, error);
        }
    }

    /**
     * Remove regra personalizada do armazenamento
     */
    deleteCustomRule(ruleId) {
        try {
            const rules = JSON.parse(localStorage.getItem('customRules') || '[]');
            const filteredRules = rules.filter(rule => rule.id !== ruleId);
            localStorage.setItem('customRules', JSON.stringify(filteredRules));
        } catch (error) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Erro ao remover regra:`, error);
        }
    }

    /**
     * Gera regras personalizadas mock
     */
    generateMockCustomRules() {
        return [
            {
                id: 'custom_001',
                userId: 'admin_001',
                category: 'productivity',
                name: 'Foco Administrativo',
                description: 'Aumenta tempo de foco para administradores em horário comercial',
                condition: (context) => context.profile.type === 'admin' && context.time.hour >= 9 && context.time.hour <= 17,
                action: (profile) => ({ 
                    ...profile, 
                    productivity: { 
                        ...profile.productivity, 
                        focusTime: 60 
                    } 
                }),
                priority: 50,
                createdAt: new Date().toISOString(),
                isActive: true
            },
            {
                id: 'custom_002',
                userId: 'family_001',
                category: 'notification',
                name: 'Notificações Familiares',
                description: 'Ativa notificações especiais para família nos fins de semana',
                condition: (context) => context.profile.type === 'family' && (context.time.day === 0 || context.time.day === 6),
                action: (profile) => ({ 
                    ...profile, 
                    interface: { 
                        ...profile.interface, 
                        notifications: 'family_weekend' 
                    } 
                }),
                priority: 60,
                createdAt: new Date().toISOString(),
                isActive: true
            }
        ];
    }

    /**
     * Obtém relatório de regras
     */
    getRulesReport() {
        const totalCustomRules = Array.from(this.customRules.values()).reduce((sum, rules) => sum + rules.length, 0);
        
        return {
            system: {
                name: this.name,
                version: this.version,
                status: this.status
            },
            rules: {
                default: Object.keys(this.defaultRules).reduce((sum, category) => sum + Object.keys(this.defaultRules[category]).length, 0),
                custom: totalCustomRules,
                total: Object.keys(this.defaultRules).reduce((sum, category) => sum + Object.keys(this.defaultRules[category]).length, 0) + totalCustomRules
            },
            categories: Object.keys(this.ruleTypes),
            config: this.config,
            lastEvaluation: new Date().toISOString()
        };
    }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalizationRules;
}

// Para uso no browser
if (typeof window !== 'undefined') {
    window.PersonalizationRules = PersonalizationRules;
} 