/**
 * @fileoverview Cliente API centralizado para o DOM v2
 * @description Centraliza todas as chamadas de API usando configurações dinâmicas
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import { getValue, ConfigType } from './config';

// Interface para requisições
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

  // Fazer requisição com retry
  static async request<T = any>(request: ApiRequest): Promise<ApiResponse<T>> {
    const url = this.buildUrl(request.endpoint, request.params);
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await this.makeRequest<T>(url, request);
        
        if (response.success || attempt === this.retryAttempts) {
          return response;
        }
        
        // Aguardar antes da próxima tentativa
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
      error: 'Máximo de tentativas excedido',
      status: 0
    };
  }

  // Fazer requisição individual
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

  // Delay utilitário
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Métodos HTTP específicos
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

// Exportar instância e métodos
export default ApiClient; 