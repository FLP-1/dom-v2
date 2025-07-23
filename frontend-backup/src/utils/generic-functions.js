/**
 * @fileoverview Repositório de funções genéricas reutilizáveis
 * @description Funções utilitárias que podem ser usadas em múltiplas funcionalidades
 * @author DOM Team v2
 * @version 2.0.0
 */

/**
 * Função genérica para criar notificações do sistema
 * @param {string} type - Tipo da notificação (TASK_REMINDER, PAYMENT_DUE, etc.)
 * @param {string} customMessage - Mensagem personalizada (opcional)
 * @param {Object} options - Opções adicionais (opcional)
 * @returns {Object} Objeto da notificação criada
 */
export function createSystemNotification(type, customMessage = null, options = {}) {
    // Validação de entrada
    if (!type || typeof type !== 'string') {
        console.error('Tipo de notificação inválido:', type);
        return null;
    }

    const messages = {
        'TASK_REMINDER': 'Lembrete: Você tem tarefas pendentes para hoje',
        'PAYMENT_DUE': 'Pagamento vencendo: Há pagamentos que vencem em breve',
        'SYSTEM_UPDATE': 'Sistema atualizado: Novas funcionalidades disponíveis',
        'HELP_TIP': 'Dica: Use o botão + para criar novas tarefas rapidamente',
        'PURCHASE_REMINDER': 'Lembrete: Há compras pendentes para hoje',
        'TASK_COMPLETED': 'Tarefa concluída com sucesso',
        'PAYMENT_RECEIVED': 'Pagamento recebido com sucesso',
        'PURCHASE_COMPLETED': 'Compra realizada com sucesso',
        'EMPLOYEE_ASSIGNED': 'Funcionário designado para tarefa',
        'DEADLINE_APPROACHING': 'Prazo se aproximando',
        // ALERTAS CRÍTICOS - PENSAMENTO CRÍTICO
        'CRITICAL_ERROR': 'ERRO CRÍTICO: Problema identificado que requer correção imediata',
        'VALIDATION_NEEDED': 'VALIDAÇÃO NECESSÁRIA: Informação precisa ser verificada',
        'ASSUMPTION_ALERT': 'ALERTA DE SUPOSIÇÃO: Suposição identificada que precisa ser questionada',
        'LOGIC_ERROR': 'ERRO LÓGICO: Possível falha lógica identificada',
        'SOURCE_MISSING': 'FONTE AUSENTE: Informação sem fonte confiável documentada',
        'ALTERNATIVE_MISSING': 'ALTERNATIVA AUSENTE: Outras opções não foram consideradas'
    };

    const priorities = {
        'TASK_REMINDER': 'medium',
        'PAYMENT_DUE': 'high',
        'SYSTEM_UPDATE': 'low',
        'HELP_TIP': 'low',
        'PURCHASE_REMINDER': 'medium',
        'TASK_COMPLETED': 'low',
        'PAYMENT_RECEIVED': 'low',
        'PURCHASE_COMPLETED': 'low',
        'EMPLOYEE_ASSIGNED': 'medium',
        'DEADLINE_APPROACHING': 'high',
        // ALERTAS CRÍTICOS - PRIORIDADE MÁXIMA
        'CRITICAL_ERROR': 'critical',
        'VALIDATION_NEEDED': 'high',
        'ASSUMPTION_ALERT': 'high',
        'LOGIC_ERROR': 'critical',
        'SOURCE_MISSING': 'high',
        'ALTERNATIVE_MISSING': 'medium'
    };

    // Verificar se o tipo é válido
    if (!messages[type]) {
        console.error('Tipo de notificação não reconhecido:', type);
        return null;
    }

    try {
        // Gerar ID único com timestamp + random para evitar duplicatas
        const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const notification = {
            id: uniqueId,
            type: type,
            title: type.replace(/_/g, ' '),
            message: customMessage || messages[type],
            priority: priorities[type] || 'low',
            createdAt: new Date().toISOString(),
            read: false,
            ...options // Permite adicionar campos extras
        };

        console.log(`[${new Date().toISOString()}] ` + 'Notificação criada com sucesso:', notification.title);
        return notification;
    } catch (error) {
        console.error('Erro ao criar notificação:', error);
        return null;
    }
}

/**
 * Função genérica para validar entrada de dados
 * @param {Object} data - Dados a serem validados
 * @param {Object} rules - Regras de validação
 * @returns {Object} Resultado da validação
 */
export function validateInput(data, rules) {
    const errors = [];
    const warnings = [];

    for (const [field, rule] of Object.entries(rules)) {
        const value = data[field];

        // Verificar se é obrigatório
        if (rule.required && (!value || value.trim() === '')) {
            errors.push(`${field} é obrigatório`);
            continue;
        }

        // Verificar comprimento mínimo
        if (rule.minLength && value && value.length < rule.minLength) {
            errors.push(`${field} deve ter pelo menos ${rule.minLength} caracteres`);
        }

        // Verificar comprimento máximo
        if (rule.maxLength && value && value.length > rule.maxLength) {
            errors.push(`${field} deve ter no máximo ${rule.maxLength} caracteres`);
        }

        // Verificar formato (regex)
        if (rule.pattern && value && !rule.pattern.test(value)) {
            errors.push(`${field} tem formato inválido`);
        }

        // Verificar tipo
        if (rule.type && value && typeof value !== rule.type) {
            errors.push(`${field} deve ser do tipo ${rule.type}`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Função genérica para formatar datas
 * @param {string|Date} date - Data a ser formatada
 * @param {string} format - Formato desejado ('short', 'long', 'time', 'custom')
 * @param {string} customFormat - Formato customizado (quando format = 'custom')
 * @returns {string} Data formatada
 */
export function formatDate(date, format = 'short', customFormat = null) {
    try {
        const dateObj = new Date(date);
        
        if (isNaN(dateObj.getTime())) {
            throw new Error('Data inválida');
        }

        switch (format) {
            case 'short':
                return dateObj.toLocaleDateString('pt-BR');
            case 'long':
                return dateObj.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            case 'time':
                return dateObj.toLocaleTimeString('pt-BR');
            case 'datetime':
                return dateObj.toLocaleString('pt-BR');
            case 'custom':
                return customFormat ? dateObj.toLocaleDateString('pt-BR', customFormat) : dateObj.toLocaleDateString('pt-BR');
            default:
                return dateObj.toLocaleDateString('pt-BR');
        }
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Data inválida';
    }
}

/**
 * Função genérica para debounce
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em milissegundos
 * @returns {Function} Função com debounce
 */
export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Função genérica para throttle
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite em milissegundos
 * @returns {Function} Função com throttle
 */
export function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Função genérica para gerar IDs únicos
 * @param {string} prefix - Prefixo do ID (opcional)
 * @returns {string} ID único
 */
export function generateUniqueId(prefix = '') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * Função genérica para verificar se um valor existe em um array
 * @param {Array} array - Array a ser verificado
 * @param {*} value - Valor a ser procurado
 * @param {string} field - Campo específico (opcional)
 * @returns {boolean} True se encontrado
 */
export function existsInArray(array, value, field = null) {
    if (!Array.isArray(array)) return false;
    
    if (field) {
        return array.some(item => item[field] === value);
    }
    
    return array.includes(value);
}

/**
 * Função genérica para remover duplicatas de array
 * @param {Array} array - Array com possíveis duplicatas
 * @param {string} field - Campo para comparação (opcional)
 * @returns {Array} Array sem duplicatas
 */
export function removeDuplicates(array, field = null) {
    if (!Array.isArray(array)) return [];
    
    if (field) {
        const seen = new Set();
        return array.filter(item => {
            const value = item[field];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    }
    
    return [...new Set(array)];
}

/**
 * SISTEMA DE VALIDAÇÃO DE PENSAMENTO CRÍTICO
 * Funções para garantir honestidade intelectual e pensamento crítico
 */

/**
 * Valida se uma informação tem fonte confiável documentada
 * @param {string} information - Informação a ser validada
 * @param {string} source - Fonte da informação
 * @param {string} sourceType - Tipo da fonte ('official', 'academic', 'community', 'expert', 'standard')
 * @returns {Object} Resultado da validação
 */
export function validateInformationSource(information, source, sourceType) {
    const validSourceTypes = ['official', 'academic', 'community', 'expert', 'standard'];
    
    if (!information || !source) {
        return {
            isValid: false,
            alert: createSystemNotification('SOURCE_MISSING', 'Informação sem fonte confiável documentada'),
            reason: 'Informação ou fonte não fornecida'
        };
    }

    if (!validSourceTypes.includes(sourceType)) {
        return {
            isValid: false,
            alert: createSystemNotification('VALIDATION_NEEDED', 'Tipo de fonte não reconhecido'),
            reason: 'Tipo de fonte deve ser: official, academic, community, expert, standard'
        };
    }

    return {
        isValid: true,
        source: { information, source, sourceType },
        timestamp: new Date().toISOString()
    };
}

/**
 * Valida se alternativas foram consideradas
 * @param {Array} alternatives - Lista de alternativas consideradas
 * @param {string} selectedOption - Opção selecionada
 * @param {string} reason - Motivo da seleção
 * @returns {Object} Resultado da validação
 */
export function validateAlternatives(alternatives, selectedOption, reason) {
    if (!Array.isArray(alternatives) || alternatives.length < 2) {
        return {
            isValid: false,
            alert: createSystemNotification('ALTERNATIVE_MISSING', 'Outras opções não foram consideradas'),
            reason: 'Pelo menos 2 alternativas devem ser consideradas'
        };
    }

    if (!selectedOption || !reason) {
        return {
            isValid: false,
            alert: createSystemNotification('VALIDATION_NEEDED', 'Opção selecionada ou motivo não documentado'),
            reason: 'Opção selecionada e motivo devem ser documentados'
        };
    }

    if (!alternatives.includes(selectedOption)) {
        return {
            isValid: false,
            alert: createSystemNotification('LOGIC_ERROR', 'Opção selecionada não está na lista de alternativas'),
            reason: 'Opção selecionada deve estar na lista de alternativas'
        };
    }

    return {
        isValid: true,
        alternatives,
        selectedOption,
        reason,
        timestamp: new Date().toISOString()
    };
}

/**
 * Valida se suposições foram identificadas e questionadas
 * @param {Array} assumptions - Lista de suposições identificadas
 * @param {Array} validations - Validações realizadas para cada suposição
 * @returns {Object} Resultado da validação
 */
export function validateAssumptions(assumptions, validations) {
    if (!Array.isArray(assumptions) || assumptions.length === 0) {
        return {
            isValid: false,
            alert: createSystemNotification('ASSUMPTION_ALERT', 'Suposições não foram identificadas'),
            reason: 'Suposições devem ser explicitamente identificadas'
        };
    }

    if (!Array.isArray(validations) || validations.length !== assumptions.length) {
        return {
            isValid: false,
            alert: createSystemNotification('VALIDATION_NEEDED', 'Validações não correspondem às suposições'),
            reason: 'Cada suposição deve ter uma validação correspondente'
        };
    }

    const unvalidatedAssumptions = assumptions.filter((_, index) => !validations[index]);
    if (unvalidatedAssumptions.length > 0) {
        return {
            isValid: false,
            alert: createSystemNotification('ASSUMPTION_ALERT', 'Algumas suposições não foram validadas'),
            reason: 'Todas as suposições devem ser validadas'
        };
    }

    return {
        isValid: true,
        assumptions,
        validations,
        timestamp: new Date().toISOString()
    };
}

/**
 * Valida se a lógica foi testada adequadamente
 * @param {string} logic - Lógica a ser testada
 * @param {Array} testCases - Casos de teste aplicados
 * @param {Array} results - Resultados dos testes
 * @returns {Object} Resultado da validação
 */
export function validateLogic(logic, testCases, results) {
    if (!logic || !Array.isArray(testCases) || testCases.length === 0) {
        return {
            isValid: false,
            alert: createSystemNotification('LOGIC_ERROR', 'Lógica ou casos de teste não fornecidos'),
            reason: 'Lógica e casos de teste são obrigatórios'
        };
    }

    if (!Array.isArray(results) || results.length !== testCases.length) {
        return {
            isValid: false,
            alert: createSystemNotification('LOGIC_ERROR', 'Resultados não correspondem aos casos de teste'),
            reason: 'Cada caso de teste deve ter um resultado correspondente'
        };
    }

    const failedTests = results.filter(result => !result.passed);
    if (failedTests.length > 0) {
        return {
            isValid: false,
            alert: createSystemNotification('LOGIC_ERROR', 'Alguns testes de lógica falharam'),
            reason: 'Todos os testes de lógica devem passar',
            failedTests
        };
    }

    return {
        isValid: true,
        logic,
        testCases,
        results,
        timestamp: new Date().toISOString()
    };
}

/**
 * Checklist obrigatório de pensamento crítico
 * @param {Object} decision - Decisão a ser validada
 * @returns {Object} Resultado do checklist
 */
export function criticalThinkingChecklist(decision) {
    const checklist = {
        sourceVerified: false,
        alternativesConsidered: false,
        assumptionsQuestioned: false,
        logicTested: false,
        contrapointsPresented: false
    };

    const alerts = [];

    // Verificar se fonte foi verificada
    if (!decision.source || !decision.source.information) {
        alerts.push(createSystemNotification('SOURCE_MISSING', 'Fonte da informação não documentada'));
    } else {
        checklist.sourceVerified = true;
    }

    // Verificar se alternativas foram consideradas
    if (!decision.alternatives || decision.alternatives.length < 2) {
        alerts.push(createSystemNotification('ALTERNATIVE_MISSING', 'Alternativas não foram consideradas'));
    } else {
        checklist.alternativesConsidered = true;
    }

    // Verificar se suposições foram questionadas
    if (!decision.assumptions || decision.assumptions.length === 0) {
        alerts.push(createSystemNotification('ASSUMPTION_ALERT', 'Suposições não foram identificadas'));
    } else {
        checklist.assumptionsQuestioned = true;
    }

    // Verificar se lógica foi testada
    if (!decision.logic || !decision.testCases) {
        alerts.push(createSystemNotification('LOGIC_ERROR', 'Lógica não foi testada adequadamente'));
    } else {
        checklist.logicTested = true;
    }

    // Verificar se contrapontos foram apresentados
    if (!decision.contrapoints || decision.contrapoints.length === 0) {
        alerts.push(createSystemNotification('VALIDATION_NEEDED', 'Contrapontos não foram apresentados'));
    } else {
        checklist.contrapointsPresented = true;
    }

    const allPassed = Object.values(checklist).every(item => item === true);

    return {
        passed: allPassed,
        checklist,
        alerts,
        timestamp: new Date().toISOString()
    };
} 