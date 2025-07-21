const CriticalThinkingEnforcement = require('../../../scripts/validate-critical-thinking-enforcement');

/**
 * 🛡️ MIDDLEWARE DE VALIDAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO
 * 
 * Este middleware garante que todas as requisições ao backend
 * sigam as diretivas de pensamento crítico antes de serem processadas.
 */

const criticalThinkingMiddleware = (req, res, next) => {
  const enforcement = new CriticalThinkingEnforcement();
  
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
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      headers: req.headers
    };

    // Validar antes de processar requisição
    enforcement.validateBeforeAction(action, context);
    
    // Adicionar informações de validação à requisição
    req.criticalThinkingValidated = true;
    req.criticalThinkingContext = context;
    
    next();
  } catch (error) {
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

/**
 * MIDDLEWARE SIMPLIFICADO PARA ROTAS CRÍTICAS
 * 
 * Para rotas que requerem validação mais rigorosa
 */
const strictCriticalThinkingMiddleware = (req, res, next) => {
  const enforcement = new CriticalThinkingEnforcement();
  
  try {
    // Validação mais rigorosa para rotas críticas
    const action = {
      type: 'CRITICAL_' + req.method + '_' + req.path,
      description: `Requisição crítica ${req.method} para ${req.path}`,
      data: req.body || {},
      source: {
        verified: req.headers['x-source-verified'] === 'true',
        url: req.headers['x-source-url'] || null,
        academic: req.headers['x-source-academic'] === 'true'
      },
      assumptions: {
        identified: req.headers['x-assumptions-identified'] === 'true',
        questioned: req.headers['x-assumptions-questioned'] === 'true',
        validated: req.headers['x-assumptions-validated'] === 'true',
        documented: req.headers['x-assumptions-documented'] === 'true'
      },
      logic: {
        tested: req.headers['x-logic-tested'] === 'true',
        validated: req.headers['x-logic-validated'] === 'true',
        consistent: req.headers['x-logic-consistent'] === 'true',
        peerReviewed: req.headers['x-logic-peer-reviewed'] === 'true'
      },
      alternatives: {
        considered: req.headers['x-alternatives-considered'] === 'true',
        perspectives: req.headers['x-alternatives-perspectives'] === 'true',
        creative: req.headers['x-alternatives-creative'] === 'true',
        documented: req.headers['x-alternatives-documented'] === 'true'
      },
      transparent: {
        documented: req.headers['x-transparent-documented'] === 'true',
        justified: req.headers['x-transparent-justified'] === 'true',
        clear: req.headers['x-transparent-clear'] === 'true',
        public: req.headers['x-transparent-public'] === 'true'
      },
      honest: {
        declared: req.headers['x-honest-declared'] === 'true',
        errors: req.headers['x-honest-errors'] === 'true',
        uncertainty: req.headers['x-honest-uncertainty'] === 'true',
        limitations: req.headers['x-honest-limitations'] === 'true'
      }
    };

    const context = {
      user: req.user || 'anonymous',
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      headers: req.headers,
      critical: true
    };

    enforcement.validateBeforeAction(action, context);
    
    req.criticalThinkingValidated = true;
    req.criticalThinkingContext = context;
    req.criticalThinkingStrict = true;
    
    next();
  } catch (error) {
    console.error('🚨 VIOLAÇÃO CRÍTICA DAS DIRETIVAS:', error.message);
    
    res.status(400).json({
      error: 'VIOLAÇÃO CRÍTICA DAS DIRETIVAS DE PENSAMENTO CRÍTICO',
      message: 'Esta requisição crítica não segue as diretivas obrigatórias',
      details: error.message,
      required: 'Correção obrigatória antes de prosseguir',
      severity: 'CRITICAL',
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * MIDDLEWARE DE LOG PARA MONITORAMENTO
 */
const criticalThinkingLogMiddleware = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Log da resposta
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      criticalThinkingValidated: req.criticalThinkingValidated || false,
      criticalThinkingStrict: req.criticalThinkingStrict || false,
      user: req.user || 'anonymous',
      ip: req.ip
    };

    // Salvar log
    const fs = require('fs');
    const path = require('path');
    const logFile = path.join(__dirname, '../../../logs/critical-thinking-requests.json');
    
    try {
      const logs = fs.existsSync(logFile) 
        ? JSON.parse(fs.readFileSync(logFile, 'utf8'))
        : [];
      
      logs.push(logEntry);
      fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error('Erro ao salvar log:', error);
    }

    originalSend.call(this, data);
  };

  next();
};

/**
 * FUNÇÃO PARA GERAR HEADERS DE VALIDAÇÃO
 * 
 * Útil para clientes que precisam incluir headers de validação
 */
const generateValidationHeaders = (options = {}) => {
  const defaultHeaders = {
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
  };

  return { ...defaultHeaders, ...options };
};

/**
 * FUNÇÃO PARA VALIDAR RESPOSTA
 * 
 * Valida se a resposta do servidor segue as diretivas
 */
const validateResponse = (response, context = {}) => {
  const enforcement = new CriticalThinkingEnforcement();
  
  const action = {
    type: 'RESPONSE',
    description: 'Resposta do servidor',
    data: response,
    source: {
      verified: true,
      url: context.url || null
    },
    assumptions: {
      identified: true,
      questioned: true,
      validated: true
    },
    logic: {
      tested: true,
      validated: true,
      consistent: true
    },
    alternatives: {
      considered: true,
      perspectives: true,
      creative: true
    },
    transparent: {
      documented: true,
      justified: true,
      clear: true
    },
    honest: {
      declared: true,
      errors: false,
      uncertainty: false
    }
  };

  return enforcement.validateBeforeAction(action, context);
};

module.exports = {
  criticalThinkingMiddleware,
  strictCriticalThinkingMiddleware,
  criticalThinkingLogMiddleware,
  generateValidationHeaders,
  validateResponse
}; 