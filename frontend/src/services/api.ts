import { API_ENDPOINTS, STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';

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
    this.baseURL = API_ENDPOINTS.BASE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
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
        message: errorData.message || ERROR_MESSAGES.SERVER_ERROR,
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
        message: ERROR_MESSAGES.NETWORK_ERROR,
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
        message: ERROR_MESSAGES.NETWORK_ERROR,
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
        message: ERROR_MESSAGES.NETWORK_ERROR,
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
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      } as ApiError;
    }
  }
}

export const apiService = new ApiService();
export default apiService;