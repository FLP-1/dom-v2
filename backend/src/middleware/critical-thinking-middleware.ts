import { Request, Response, NextFunction } from 'express';

/**
 * 🛡️ MIDDLEWARE DE VALIDAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO
 * 
 * Este middleware garante que todas as requisições ao backend
 * sigam as diretivas de pensamento crítico antes de serem processadas.
 */

interface CriticalThinkingAction {
  type: string;
  description: string;
  data: any;
  source: {
    verified: boolean;
    url: string | null;
  };
  assumptions: {
    identified: boolean;
    questioned: boolean;
    validated: boolean;
  };
  logic: {
    tested: boolean;
    validated: boolean;
    consistent: boolean;
  };
  alternatives: {
    considered: boolean;
    perspectives: boolean;
    creative: boolean;
  };
  transparent: {
    documented: boolean;
    justified: boolean;
    clear: boolean;
  };
  honest: {
    declared: boolean;
    errors: boolean;
    uncertainty: boolean;
  };
}

interface CriticalThinkingContext {
  user: string;
  timestamp: string;
  ip: string;
  userAgent: string | undefined;
  headers: any;
}

interface ValidationOptions {
  strict?: boolean;
  logLevel?: 'info' | 'warning' | 'error';
  requireHeaders?: boolean;
}

const criticalThinkingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Extrair informações da requisição
    const action: CriticalThinkingAction = {
      type: req.method + '_' + req.path,
      description: `Requisição ${req.method} para ${req.path}`,
      data: req.body || {},
      source: {
        verified: req.headers['x-source-verified'] === 'true',
        url: req.headers['x-source-url'] as string || null
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

    const context: CriticalThinkingContext = {
      user: (req as any).user || 'anonymous',
      timestamp: new Date().toISOString(),
      ip: req.ip || 'unknown',
      userAgent: req.get('User-Agent'),
      headers: req.headers
    };

    // Validação básica de pensamento crítico
    validateCriticalThinking(action, context);
    
    // Adicionar informações de validação à requisição
    (req as any).criticalThinkingValidated = true;
    (req as any).criticalThinkingContext = context;
    
    next();
  } catch (error) {
    console.error('🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO:', (error as Error).message);
    
    res.status(400).json({
      error: 'VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO',
      message: 'Esta requisição não segue as diretivas de pensamento crítico obrigatórias',
      details: (error as Error).message,
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
const strictCriticalThinkingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
  } catch (error) {
    console.error('🚨 VALIDAÇÃO RIGOROSA FALHOU:', (error as Error).message);
    
    res.status(400).json({
      error: 'VALIDAÇÃO RIGOROSA FALHOU',
      message: 'Esta rota requer validação rigorosa de pensamento crítico',
      details: (error as Error).message,
      required: 'Todos os headers de validação são obrigatórios',
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * MIDDLEWARE DE LOG PARA PENSAMENTO CRÍTICO
 * 
 * Registra todas as validações para auditoria
 */
const criticalThinkingLogMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  
  // Interceptar a resposta para logging
  const originalSend = res.send;
  res.send = function(data: any) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      criticalThinkingValidated: (req as any).criticalThinkingValidated || false,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    };
    
    console.log('📊 LOG PENSAMENTO CRÍTICO:', JSON.stringify(logData, null, 2));
    
    return originalSend.call(this, data);
  };
  
  next();
};

/**
 * FUNÇÃO DE VALIDAÇÃO DE PENSAMENTO CRÍTICO
 */
function validateCriticalThinking(action: CriticalThinkingAction, context: CriticalThinkingContext): void {
  const errors: string[] = [];
  
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
export function generateValidationHeaders(options: ValidationOptions = {}): Record<string, string> {
  const headers: Record<string, string> = {
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
export function validateResponse(response: any, context: any = {}): boolean {
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
  } catch (error) {
    console.error('Erro na validação de resposta:', error);
    return false;
  }
}

export {
  criticalThinkingMiddleware,
  strictCriticalThinkingMiddleware,
  criticalThinkingLogMiddleware
}; 