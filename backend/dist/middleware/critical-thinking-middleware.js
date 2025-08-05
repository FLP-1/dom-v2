"use strict";
/**
 * Consideração de alternativas e trade-offs
 *
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 *
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 *
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.criticalThinkingLogMiddleware = exports.strictCriticalThinkingMiddleware = exports.criticalThinkingMiddleware = void 0;
exports.generateValidationHeaders = generateValidationHeaders;
exports.validateResponse = validateResponse;
/**
 * Referências externas e fontes de informação
 *
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 *
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 *
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */
/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
    if (!data)
        return false;
    if (typeof data === 'string' && data.trim().length === 0)
        return false;
    if (Array.isArray(data) && data.length === 0)
        return false;
    if (typeof data === 'object' && Object.keys(data).length === 0)
        return false;
    return true;
}
// Aplicar validação
if (!validateInput(inputData)) {
    throw new Error('Dados de entrada inválidos');
}
/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 *
 * @description
 * Este arquivo implementa Middleware de processamento
 * seguindo as diretivas críticas do projeto DOM v2.
 *
 * @dependencies
 * - Dependências específicas do contexto
 *
 * @usage
 * Ver documentação específica para detalhes de uso
 *
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */
/**
 * Asserções de validação
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}
const criticalThinkingMiddleware = (req, res, next) => {
    try {
        // Extrair informações da requisição
        const action = {
            type: req.method + '_' + req.path,
            description: `Requisição ${req.method} para ${req.path}`,
            data: req.body || {},
            source: {
                verified: req.headers['x-source-verified'] === 'true',
                url: req.headers['x-source-url'] || null
            },
            assumptions: {
                identified: req.headers['x-assumptions-identified'] === 'true',
                questioned: req.headers['x-assumptions-questioned'] === 'true',
                validated: req.headers['x-assumptions-validated'] === 'true'
            },
            logic: {
                tested: req.headers['x-logic-tested'] === 'true',
                validated: req.headers['x-logic-validated'] === 'true',
                consistent: req.headers['x-logic-consistent'] === 'true'
            },
            alternatives: {
                considered: req.headers['x-alternatives-considered'] === 'true',
                perspectives: req.headers['x-alternatives-perspectives'] === 'true',
                creative: req.headers['x-alternatives-creative'] === 'true'
            },
            transparent: {
                documented: req.headers['x-transparent-documented'] === 'true',
                justified: req.headers['x-transparent-justified'] === 'true',
                clear: req.headers['x-transparent-clear'] === 'true'
            },
            honest: {
                declared: req.headers['x-honest-declared'] === 'true',
                errors: req.headers['x-honest-errors'] === 'true',
                uncertainty: req.headers['x-honest-uncertainty'] === 'true'
            }
        };
        const context = {
            user: req.user || 'anonymous',
            timestamp: new Date().toISOString(),
            ip: req.ip || 'unknown',
            userAgent: req.get('User-Agent'),
            headers: req.headers
        };
        // Validação básica de pensamento crítico
        validateCriticalThinking(action, context);
        // Adicionar informações de validação à requisição
        req.criticalThinkingValidated = true;
        req.criticalThinkingContext = context;
        next();
    }
    catch (error) {
        console.error('🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO:', error.message);
        res.status(400).json({
            error: 'VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO',
            message: 'Esta requisição não segue as diretivas de pensamento crítico obrigatórias',
            details: error.message,
            required: 'Correção obrigatória antes de prosseguir',
            timestamp: new Date().toISOString(),
            headers: {
                'x-source-verified': 'true',
                'x-assumptions-identified': 'true',
                'x-assumptions-questioned': 'true',
                'x-assumptions-validated': 'true',
                'x-logic-tested': 'true',
                'x-logic-validated': 'true',
                'x-logic-consistent': 'true',
                'x-alternatives-considered': 'true',
                'x-alternatives-perspectives': 'true',
                'x-alternatives-creative': 'true',
                'x-transparent-documented': 'true',
                'x-transparent-justified': 'true',
                'x-transparent-clear': 'true',
                'x-honest-declared': 'true'
            }
        });
    }
};
exports.criticalThinkingMiddleware = criticalThinkingMiddleware;
/**
 * MIDDLEWARE SIMPLIFICADO PARA ROTAS CRÍTICAS
 *
 * Para rotas que requerem validação mais rigorosa
 */
const strictCriticalThinkingMiddleware = (req, res, next) => {
    try {
        // Validação mais rigorosa para rotas críticas
        const requiredHeaders = [
            'x-source-verified',
            'x-assumptions-identified',
            'x-logic-tested',
            'x-transparent-documented'
        ];
        const missingHeaders = requiredHeaders.filter(header => req.headers[header] !== 'true');
        if (missingHeaders.length > 0) {
            throw new Error(`Headers obrigatórios ausentes: ${missingHeaders.join(', ')}`);
        }
        criticalThinkingMiddleware(req, res, next);
    }
    catch (error) {
        console.error('🚨 VALIDAÇÃO RIGOROSA FALHOU:', error.message);
        res.status(400).json({
            error: 'VALIDAÇÃO RIGOROSA FALHOU',
            message: 'Esta rota requer validação rigorosa de pensamento crítico',
            details: error.message,
            required: 'Todos os headers de validação são obrigatórios',
            timestamp: new Date().toISOString()
        });
    }
};
exports.strictCriticalThinkingMiddleware = strictCriticalThinkingMiddleware;
/**
 * MIDDLEWARE DE LOG PARA PENSAMENTO CRÍTICO
 *
 * Registra todas as validações para auditoria
 */
const criticalThinkingLogMiddleware = (req, res, next) => {
    const startTime = Date.now();
    // Interceptar a resposta para logging
    const originalSend = res.send;
    res.send = function (data) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        const logData = {
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            criticalThinkingValidated: req.criticalThinkingValidated || false,
            userAgent: req.get('User-Agent'),
            ip: req.ip
        };
        console.log('📊 LOG PENSAMENTO CRÍTICO:', JSON.stringify(logData, null, 2));
        return originalSend.call(this, data);
    };
    next();
};
exports.criticalThinkingLogMiddleware = criticalThinkingLogMiddleware;
/**
 * FUNÇÃO DE VALIDAÇÃO DE PENSAMENTO CRÍTICO
 */
function validateCriticalThinking(action, context) {
    const errors = [];
    // Validar fonte
    if (!action.source.verified) {
        errors.push('Fonte não verificada');
    }
    // Validar suposições
    if (!action.assumptions.identified) {
        errors.push('Suposições não identificadas');
    }
    if (!action.assumptions.questioned) {
        errors.push('Suposições não questionadas');
    }
    // Validar lógica
    if (!action.logic.tested) {
        errors.push('Lógica não testada');
    }
    if (!action.logic.validated) {
        errors.push('Lógica não validada');
    }
    // Validar alternativas
    if (!action.alternatives.considered) {
        errors.push('Alternativas não consideradas');
    }
    // Validar transparência
    if (!action.transparent.documented) {
        errors.push('Processo não documentado');
    }
    // Validar honestidade
    if (!action.honest.declared) {
        errors.push('Incertezas não declaradas');
    }
    if (errors.length > 0) {
        throw new Error(`Validação de pensamento crítico falhou: ${errors.join(', ')}`);
    }
}
/**
 * GERADOR DE HEADERS DE VALIDAÇÃO
 */
function generateValidationHeaders(options = {}) {
    const headers = {
        'x-source-verified': 'true',
        'x-assumptions-identified': 'true',
        'x-assumptions-questioned': 'true',
        'x-assumptions-validated': 'true',
        'x-logic-tested': 'true',
        'x-logic-validated': 'true',
        'x-logic-consistent': 'true',
        'x-alternatives-considered': 'true',
        'x-alternatives-perspectives': 'true',
        'x-alternatives-creative': 'true',
        'x-transparent-documented': 'true',
        'x-transparent-justified': 'true',
        'x-transparent-clear': 'true',
        'x-honest-declared': 'true',
        'x-honest-errors': 'false',
        'x-honest-uncertainty': 'false'
    };
    return headers;
}
/**
 * VALIDADOR DE RESPOSTA
 */
function validateResponse(response, context = {}) {
    try {
        // Validar se a resposta tem estrutura adequada
        if (!response || typeof response !== 'object') {
            return false;
        }
        // Validar se tem campos obrigatórios
        if (response.success === undefined) {
            return false;
        }
        // Validar se mensagens de erro são claras
        if (!response.success && !response.message) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Erro na validação de resposta:', error);
        return false;
    }
}
/**
 * Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
 */ 
