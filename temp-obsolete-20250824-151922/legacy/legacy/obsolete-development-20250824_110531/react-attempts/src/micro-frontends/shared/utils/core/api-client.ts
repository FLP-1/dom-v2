
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
  */


/**
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
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
  */



/**
 * @param {string} message - Mensagem de erro
  */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}

/**
 * Sistema de logging estruturado
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
  */
function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}

/**
 * @param {any} data - Dados a serem validados
  */
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}/**
 * @fileoverview Cliente API centralizado para o DOM v2
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
  */

import { getValue, ConfigType } from './config';

export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

// Interface para resposta
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

// Cliente API centralizado
export class ApiClient {
  private static baseUrl: string;
  private static timeout: number;
  private static retryAttempts: number;
  private static retryDelay: number;

  // Inicializar cliente
  static initialize(): void {
    this.baseUrl = getValue('api.baseUrl') || 'http://localhost:3001';
    this.timeout = getValue('api.timeout') || 30000;
    this.retryAttempts = getValue('api.retryAttempts') || 3;
    this.retryDelay = getValue('api.retryDelay') || 1000;
  }

  static async request<T = any>(request: ApiRequest): Promise<ApiResponse<T>> {
    const url = this.buildUrl(request.endpoint, request.params);
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await this.makeRequest<T>(url, request);
        
        if (response.success || attempt === this.retryAttempts) {
          return response;
        }
        
        if (attempt < this.retryAttempts) {
          await this.delay(this.retryDelay * attempt);
        }
      } catch (error) {
        if (attempt === this.retryAttempts) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            status: 0
          };
        }
      }
    }

    return {
      success: false,
      status: 0
    };
  }

  private static async makeRequest<T = any>(
    url: string, 
    request: ApiRequest
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
          ...request.headers
        },
        body: request.data ? JSON.stringify(request.data) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      return {
        success: response.ok,
        data: response.ok ? data : undefined,
        error: response.ok ? undefined : data?.message || `HTTP ${response.status}`,
        status: response.status
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Construir URL completa
  private static buildUrl(endpoint: string, params?: Record<string, string>): string {
    let url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    return url;
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'GET', endpoint, params });
  }

  static async post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'POST', endpoint, data });
  }

  static async put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PUT', endpoint, data });
  }

  static async patch<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PATCH', endpoint, data });
  }

  static async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'DELETE', endpoint });
  }
}

// Inicializar cliente
ApiClient.initialize();

export default ApiClient; 

/**
 * Alternativas consideradas:
  */