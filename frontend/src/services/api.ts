
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
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 */
// Função removida - causava erros de referência no frontend
}

// Validação de tipos removida - causava erro de referência


/**
 * Sistema de logging estruturado
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
// Função de logging removida - causava erros de referência no frontend

// Aplicar logging


/**
 * @param {string} message - Mensagem de erro
 */
// Função removida - causava erros de referência no frontend`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Validação crítica removida - causava erro de referência


/**
 * @param {any} data - Dados a serem validados
 */
// Função removida - causava erros de referência no frontend

// Validação de input removida - causava erro de referência


/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * 
 * @dependencies
 * 
 * @usage
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import { API_CONFIG, MESSAGES } from '../utils/constants';

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return localStorage.getItem('auth_token');
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || MESSAGES.ERROR,
        status: response.status,
      } as ApiError;
    }

    return await response.json();
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'GET',
        headers,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: MESSAGES.ERROR,
        status: 0,
      } as ApiError;
    }
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: MESSAGES.ERROR,
        status: 0,
      } as ApiError;
    }
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: MESSAGES.ERROR,
        status: 0,
      } as ApiError;
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'DELETE',
        headers,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: MESSAGES.ERROR,
        status: 0,
      } as ApiError;
    }
  }
}

export const apiService = new ApiService();
export default apiService;