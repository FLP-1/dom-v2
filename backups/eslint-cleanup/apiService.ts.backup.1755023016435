/**
 * 🏗️ SERVIÇO CENTRALIZADO DE API
 * 
 * Seguindo as diretrizes do projeto:
 * - Centralização de responsabilidades
 * - Reutilização de código
 * - Separação de concerns
 * - Facilidade de manutenção e teste
 */

// 🌐 CONFIGURAÇÕES CENTRALIZADAS
const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
} as const;

// 📝 INTERFACES CENTRALIZADAS
export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  remaining: number;
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: string;
  responsible_id: string;
  due_date: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  amount: number;
  description: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_overdue: boolean;
  days_until_due: number;
}

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  salary: number;
  status: string;
  created_at: string;
  updated_at: string;
  last_payroll?: {
    id: string;
    net_salary: number;
    month: number;
    year: number;
  } | null;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  read: boolean;
  created_at: string;
  read_at?: string;
  extra_data?: Record<string, unknown>;
}

// 🛠️ UTILITÁRIOS DE REQUISIÇÃO
class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// 🚀 CLASSE PRINCIPAL DO SERVIÇO
export class ApiService {
  private static instance: ApiService;
  
  // Singleton pattern para garantir uma única instância
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private constructor() { /* TODO: Implement error handling */ } /**
   * 🔄 MÉTODO GENÉRICO DE REQUISIÇÃO COM RETRY
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = { /* TODO: Implement error handling */ } ,
    retryCount = 0
  ): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      return data as T;

    } catch (error) {
      // Retry logic
      if (retryCount < API_CONFIG.RETRY_ATTEMPTS && 
          (error instanceof ApiError && error.status !== 404)) {
        
        console.warn(`🔄 Tentativa ${retryCount + 1}/${API_CONFIG.RETRY_ATTEMPTS} para ${endpoint}`);
        await sleep(API_CONFIG.RETRY_DELAY * (retryCount + 1));
        return this.request<T>(endpoint, options, retryCount + 1);
      }

      // Log estruturado do erro
      console.error('🚨 Erro na API:', {
        endpoint,
        error: error instanceof Error ? error.message : 'Unknown error',
        retryCount,
        timestamp: new Date().toISOString()
      });

      throw error;
    }
  }

  // 💰 MÉTODOS PARA BUDGETS
  async getBudgets(filters?: { status?: string; category?: string; period?: string }): Promise<Budget[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.period) params.append('period', filters.period);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/budgets?${queryString}` : '/budgets';
    
    return this.request<{ budgets: Budget[] }>(endpoint)
      .then(response => response.budgets);
  }

  async getBudgetById(id: string): Promise<Budget> {
    return this.request<{ budget: Budget }>(`/budgets/${id}`)
      .then(response => response.budget);
  }

  async createBudget(budget: {
    name: string;
    amount: number;
    category: string;
    start_date: string;
    end_date: string;
  }): Promise<Budget> {
    return this.request<{ budget: Budget }>('/budgets', {
      method: 'POST',
      body: JSON.stringify(budget),
    }).then(response => response.budget);
  }

  async updateBudget(id: string, budget: {
    name?: string;
    amount?: number;
    category?: string;
    start_date?: string;
    end_date?: string;
    spent?: number;
    status?: string;
  }): Promise<Budget> {
    return this.request<{ budget: Budget }>(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(budget),
    }).then(response => response.budget);
  }

  async deleteBudget(id: string): Promise<void> {
    return this.request<void>(`/budgets/${id}`, {
      method: 'DELETE',
    });
  }

  async addBudgetSpend(id: string, amount: number, description?: string): Promise<Budget> {
    return this.request<{ budget: Budget }>(`/budgets/${id}/spend`, {
      method: 'POST',
      body: JSON.stringify({ amount, description }),
    }).then(response => response.budget);
  }

  // 📝 MÉTODOS PARA TASKS
  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>('/tasks');
  }

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  }

  async deleteTask(id: string): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // 💳 MÉTODOS PARA PAYMENTS
  async getPayments(filters?: { status?: string; overdue?: boolean; upcoming?: boolean }): Promise<Payment[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.overdue) params.append('overdue', 'true');
    if (filters?.upcoming) params.append('upcoming', 'true');
    
    const queryString = params.toString();
    const endpoint = queryString ? `/payments?${queryString}` : '/payments';
    
    return this.request<{ payments: Payment[] }>(endpoint)
      .then(response => response.payments);
  }

  async getPaymentById(id: string): Promise<Payment> {
    return this.request<{ payment: Payment }>(`/payments/${id}`)
      .then(response => response.payment);
  }

  async createPayment(payment: {
    amount: number;
    description: string;
    due_date: string;
  }): Promise<Payment> {
    return this.request<{ payment: Payment }>('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    }).then(response => response.payment);
  }

  async updatePayment(id: string, payment: {
    amount?: number;
    description?: string;
    due_date?: string;
    status?: string;
  }): Promise<Payment> {
    return this.request<{ payment: Payment }>(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payment),
    }).then(response => response.payment);
  }

  async deletePayment(id: string): Promise<void> {
    return this.request<void>(`/payments/${id}`, {
      method: 'DELETE',
    });
  }

  async markPaymentAsPaid(id: string, paymentDate?: string, notes?: string): Promise<Payment> {
    return this.request<{ payment: Payment }>(`/payments/${id}/pay`, {
      method: 'POST',
      body: JSON.stringify({ payment_date: paymentDate, notes }),
    }).then(response => response.payment);
  }

  async getPaymentStats(): Promise<{
    total_pending: number;
    total_overdue: number;
    total_upcoming: number;
    total_paid_this_month: number;
    amount_pending: number;
    amount_overdue: number;
    amount_upcoming: number;
    amount_paid_this_month: number;
  }> {
    return this.request<{ stats: unknown }>('/payments/stats/summary')
      .then(response => response.stats);
  }

  // 👥 MÉTODOS PARA EMPLOYEES
  async getEmployees(filters?: { status?: string; search?: string }): Promise<Employee[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/employees?${queryString}` : '/employees';
    
    return this.request<{ employees: Employee[] }>(endpoint)
      .then(response => response.employees);
  }

  async createEmployee(employee: {
    name: string;
    cpf: string;
    position: string;
    salary: number;
  }): Promise<Employee> {
    return this.request<{ employee: Employee }>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    }).then(response => response.employee);
  }

  async updateEmployee(id: string, employee: {
    name?: string;
    position?: string;
    salary?: number;
    status?: string;
  }): Promise<Employee> {
    return this.request<{ employee: Employee }>(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    }).then(response => response.employee);
  }

  async deleteEmployee(id: string): Promise<void> {
    return this.request<void>(`/employees/${id}`, {
      method: 'DELETE',
    });
  }

  // 🔔 MÉTODOS PARA NOTIFICATIONS
  async getNotifications(unreadOnly?: boolean): Promise<Notification[]> {
    const params = unreadOnly ? '?unread_only=true' : '';
    return this.request<{ notifications: Notification[] }>(`/notifications${params}`)
      .then(response => response.notifications);
  }

  async markNotificationAsRead(id: string, read = true): Promise<Notification> {
    return this.request<{ notification: Notification }>(`/notifications/${id}/read`, {
      method: 'PUT',
      body: JSON.stringify({ read }),
    }).then(response => response.notification);
  }

  async deleteNotification(id: string): Promise<void> {
    return this.request<void>(`/notifications/${id}`, {
      method: 'DELETE',
    });
  }
}

// 🎯 INSTÂNCIA SINGLETON EXPORTADA
export const apiService = ApiService.getInstance();

// 📊 UTILITÁRIOS DE CONVERSÃO DE DADOS
export const DataConverters = {
  // Converter Budget + Payment para Transaction
  toTransactions: (budgets: Budget[], payments: Payment[]) => {
    const budgetTransactions = budgets.map(budget => ({
      id: `budget-${budget.id}`,
      type: 'expense' as const,
      category: budget.category || 'Orçamento',
      amount: budget.spent || 0,
      description: budget.name || 'Orçamento',
      date: budget.updated_at ? budget.updated_at.split('T')[0] : new Date().toISOString().split('T')[0]
    }));

    const paymentTransactions = payments.map(payment => ({
      id: `payment-${payment.id}`,
      type: payment.amount > 0 ? 'income' as const : 'expense' as const,
      category: payment.category || 'Pagamento',
      amount: Math.abs(payment.amount || 0),
      description: payment.description || 'Pagamento',
      date: payment.due_date ? payment.due_date.split('T')[0] : new Date().toISOString().split('T')[0]
    }));

    return [...budgetTransactions, ...paymentTransactions];
  },

  // Converter Task da API para formato UI
  taskFromApi: (apiTask: Task) => ({
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description || 'Sem descrição',
    priority: apiTask.priority >= 3 ? 'high' as const : 
              apiTask.priority >= 2 ? 'medium' as const : 'low' as const,
    status: apiTask.status.toLowerCase() === 'completed' ? 'completed' as const :
            apiTask.status.toLowerCase() === 'in_progress' ? 'in_progress' as const : 'pending' as const,
    assignee: apiTask.responsible_id || 'Não atribuído',
    dueDate: apiTask.due_date ? apiTask.due_date.split('T')[0] : 'Sem prazo',
    category: apiTask.category || 'Geral'
  })

  // ==========================================
  // 💬 COMMUNICATION METHODS
  // ==========================================

  async getMessages(groupId: string, options?: { limit?: number; offset?: number }): Promise<Message[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());
    
    const queryString = params.toString();
    const url = `/messages/${groupId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.request<{ messages: Message[] }>('GET', url);
    return response.messages;
  }

  async sendMessage(message: {
    content: string;
    type?: string;
    group_id: string;
    reply_to_id?: string;
    metadata?: Record<string, unknown>;
  }): Promise<Message> {
    const response = await this.request<{ message: Message }>('POST', '/messages', message);
    return response.message;
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    await this.request('POST', `/messages/${messageId}/read`);
  }

  async getGroups(): Promise<Group[]> {
    const response = await this.request<{ groups: Group[] }>('GET', '/groups');
    return response.groups;
  }

  async getCommunicationStats(): Promise<CommunicationStats> {
    const response = await this.request<{ stats: CommunicationStats }>('GET', '/communication/stats');
    return response.stats;
  }

  // ==========================================
  // 🎮 GAMIFICATION METHODS
  // ==========================================

  async getGamificationStats(): Promise<GamificationStats> {
    const response = await this.request<{ stats: GamificationStats }>('GET', '/gamification/stats');
    return response.stats;
  }

  async getAchievements(unlockedOnly?: boolean): Promise<Achievement[]> {
    const params = unlockedOnly ? '?unlocked_only=true' : '';
    const response = await this.request<{ achievements: Achievement[] }>('GET', `/gamification/achievements${params}`);
    return response.achievements;
  }

  async getChallenges(status: 'active' | 'completed' | 'available' = 'active'): Promise<Challenge[]> {
    const response = await this.request<{ challenges: Challenge[] }>('GET', `/gamification/challenges?status=${status}`);
    return response.challenges;
  }

  async acceptChallenge(challengeId: string): Promise<Challenge> {
    const response = await this.request<{ challenge: Challenge }>('POST', `/gamification/challenges/${challengeId}/accept`);
    return response.challenge;
  }

  async addPoints(data: {
    action: string;
    points: number;
    category: string;
    reference_id?: string;
    metadata?: Record<string, unknown>;
  }): Promise<UserPointsEntry> {
    const response = await this.request<{ points: UserPointsEntry }>('POST', '/gamification/points', data);
    return response.points;
  }

  async getLeaderboard(period: 'all_time' | 'week' | 'month' = 'all_time', limit = 10): Promise<LeaderboardEntry[]> {
    const response = await this.request<{ leaderboard: LeaderboardEntry[] }>('GET', `/gamification/leaderboard?period=${period}&limit=${limit}`);
    return response.leaderboard;
  }

  // ==========================================
  // ⚙️ SETTINGS METHODS
  // ==========================================

  async getUserSettings(): Promise<UserSettings> {
    const response = await this.request<{ settings: UserSettings }>('GET', '/settings');
    return response.settings;
  }

  async updateUserSettings(settings: Partial<UserSettingsUpdate>): Promise<UserSettings> {
    const response = await this.request<{ settings: UserSettings }>('PUT', '/settings', settings);
    return response.settings;
  }

  async updateTheme(theme: ThemeConfig): Promise<ThemeConfig> {
    const response = await this.request<{ theme: ThemeConfig }>('PUT', '/settings/theme', theme);
    return response.theme;
  }

  async resetSettings(section: 'all' | 'theme' | 'preferences' | 'ui_config' | 'notifications' | 'privacy'): Promise<UserSettings> {
    const response = await this.request<{ settings: UserSettings }>('POST', '/settings/reset', { section });
    return response.settings;
  }

  // ==========================================
  // 👥 USER MANAGEMENT METHODS
  // ==========================================

  async getUsers(filters?: {
    status?: 'active' | 'inactive';
    profile?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ users: User[]; pagination: PaginationInfo }> {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.profile) params.set('profile', filters.profile);
    if (filters?.search) params.set('search', filters.search);
    if (filters?.limit) params.set('limit', filters.limit.toString());
    if (filters?.offset) params.set('offset', filters.offset.toString());
    
    const queryString = params.toString();
    const url = `/admin/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.request<{ users: User[]; pagination: PaginationInfo }>('GET', url);
    return response;
  }

  async getUserById(userId: string): Promise<UserDetail> {
    const response = await this.request<{ user: UserDetail }>('GET', `/admin/users/${userId}`);
    return response.user;
  }

  async createUser(user: {
    name: string;
    email: string;
    cpf: string;
    phone?: string;
    profile?: string;
    permissions?: string[];
  }): Promise<User> {
    const response = await this.request<{ user: User }>('POST', '/admin/users', user);
    return response.user;
  }

  async updateUser(userId: string, updates: {
    name?: string;
    email?: string;
    phone?: string;
    profile?: string;
    permissions?: string[];
    active?: boolean;
  }): Promise<User> {
    const response = await this.request<{ user: User }>('PUT', `/admin/users/${userId}`, updates);
    return response.user;
  }

  async deactivateUser(userId: string): Promise<void> {
    await this.request('DELETE', `/admin/users/${userId}`);
  }

  async resetUserPassword(userId: string): Promise<{ temp_password: string }> {
    const response = await this.request<{ temp_password: string }>('POST', `/admin/users/${userId}/reset-password`);
    return response;
  }

  async getUserStats(): Promise<UserStats> {
    const response = await this.request<{ stats: UserStats }>('GET', '/admin/users/stats/summary');
    return response.stats;
  }

  // ==========================================
  // 🎨 WHITE-LABEL METHODS
  // ==========================================
  async getWhiteLabelConfig(partnerId: string): Promise<WhiteLabelConfig> {
    return this.request('GET', `/partners/${partnerId}/white-label`);
  }

  async updateWhiteLabelConfig(partnerId: string, config: Partial<WhiteLabelConfig>): Promise<WhiteLabelConfig> {
    return this.request('POST', `/partners/${partnerId}/white-label`, config);
  }

  async resolveWhiteLabelDomain(domain: string): Promise<WhiteLabelConfig> {
    return this.request('GET', `/white-label/resolve/${domain}`);
  }

  // ==========================================
  // 💰 COMMISSION METHODS
  // ==========================================
  async getPartnerCommissions(partnerId: string, filters?: CommissionFilters): Promise<CommissionResponse> {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.period) queryParams.append('period', filters.period);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    return this.request('GET', `/partners/${partnerId}/commissions?${queryParams.toString()}`);
  }

  async updateCommissionConfig(partnerId: string, config: CommissionConfig): Promise<PartnerProfile> {
    return this.request('POST', `/partners/${partnerId}/commission-config`, config);
  }

  async linkEmployerToPartner(partnerId: string, employerData: EmployerLinkData): Promise<EmployerLink> {
    return this.request('POST', `/partners/${partnerId}/link-employer`, employerData);
  }

  async getLinkedEmployers(partnerId: string): Promise<EmployerLink[]> {
    return this.request('GET', `/partners/${partnerId}/linked-employers`);
  }

  async markCommissionAsPaid(commissionId: string, paymentData: CommissionPaymentData): Promise<Commission> {
    return this.request('PUT', `/commissions/${commissionId}/pay`, paymentData);
  }

  // ==========================================
  // 💰 PAYROLL METHODS - FOLHA DE PAGAMENTO
  // ==========================================

  async getPayrollPeriods(filters?: { year?: number; month?: number; status?: string }): Promise<any[]> {
    const queryParams = new URLSearchParams();
    if (filters?.year) queryParams.append('year', filters.year.toString());
    if (filters?.month) queryParams.append('month', filters.month.toString());
    if (filters?.status) queryParams.append('status', filters.status);

    return this.request('GET', `/payroll/periods?${queryParams.toString()}`);
  }

  async createPayrollPeriod(month: number, year: number): Promise<any> {
    return this.request('POST', '/payroll/periods', {
      reference_month: month,
      reference_year: year
    });
  }

  async calculatePayrollPeriod(periodId: string): Promise<any> {
    return this.request('POST', `/payroll/periods/${periodId}/calculate`);
  }

  async getPayrollPeriodDetails(periodId: string): Promise<any> {
    return this.request('GET', `/payroll/periods/${periodId}`);
  }

  async approvePayrollPeriod(periodId: string): Promise<any> {
    return this.request('PUT', `/payroll/periods/${periodId}/approve`);
  }

  async generatePayslips(periodId: string): Promise<any> {
    return this.request('POST', `/payroll/periods/${periodId}/payslips`);
  }

  async getPayslip(payslipId: string): Promise<any> {
    return this.request('GET', `/payroll/payslips/${payslipId}`);
  }

  async getPayrollConfig(): Promise<any> {
    return this.request('GET', '/payroll/config');
  }

  async updatePayrollConfig(config: unknown): Promise<any> {
    return this.request('PUT', '/payroll/config', config);
  }

  // ==========================================
  // 🏛️ eSOCIAL METHODS - SISTEMA DE COMPLIANCE
  // ==========================================
  async getESocialCertificates(): Promise<any[]> {
    return this.request('GET', '/esocial/certificates');
  }

  async createESocialCertificate(certificateData: unknown): Promise<any> {
    return this.request('POST', '/esocial/certificates', certificateData);
  }

  async getESocialConfig(): Promise<any> {
    return this.request('GET', '/esocial/config');
  }

  async updateESocialConfig(configData: unknown): Promise<any> {
    return this.request('POST', '/esocial/config', configData);
  }

  async getESocialEvents(filters?: { eventType?: string; status?: string; startDate?: string; endDate?: string }): Promise<any> {
    const params = new URLSearchParams();
    if (filters?.eventType) params.append('eventType', filters.eventType);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    return this.request('GET', `/esocial/events?${params.toString()}`);
  }

  async createESocialEvent(eventData: unknown): Promise<any> {
    return this.request('POST', '/esocial/events', eventData);
  }

  async sendESocialEvent(eventId: string): Promise<any> {
    return this.request('POST', `/esocial/events/${eventId}/send`);
  }

  async retryESocialEvents(): Promise<any> {
    return this.request('POST', '/esocial/events/retry');
  }

  async getESocialComplianceReport(): Promise<any> {
    return this.request('GET', '/esocial/reports/compliance');
  }
}

// ==========================================
// 💬 COMMUNICATION INTERFACES
// ==========================================

export interface Message {
  id: string;
  content: string;
  type: string;
  status: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  sender: {
    id: string;
    name: string;
    nickname?: string;
    avatar?: string;
  };
  reply_to?: {
    id: string;
    content: string;
    sender_name: string;
  };
  reads: Array<{
    user_id: string;
    read_at: string;
  }>;
  replies_count: number;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  type?: string;
  role: string;
  messages_count: number;
  created_at: string;
}

export interface CommunicationStats {
  unread_messages: number;
  today_messages: number;
  active_groups: number;
  total_groups: number;
}

// ==========================================
// 🎮 GAMIFICATION INTERFACES
// ==========================================

export interface GamificationStats {
  total_points: number;
  level: number;
  points_to_next_level: number;
  unlocked_achievements: number;
  total_achievements: number;
  achievement_completion_rate: string;
  active_challenges: number;
  completed_challenges: number;
  points_by_category: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category: string;
  type: string;
  criteria: Record<string, unknown>;
  points: number;
  rarity: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  unlocked?: boolean;
  unlocked_at?: string;
  progress?: Record<string, unknown>;
}

export interface Challenge {
  id: string;
  name: string;
  description?: string;
  type: string;
  category: string;
  criteria: Record<string, unknown>;
  reward_points: number;
  reward_badge?: string;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  user_status?: string;
  progress?: Record<string, unknown>;
  started_at?: string;
  completed_at?: string;
}

export interface UserPointsEntry {
  id: string;
  user_id: string;
  action: string;
  points: number;
  category: string;
  reference_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  name: string;
  nickname?: string;
  avatar?: string;
  total_points: number;
}

// ==========================================
// ⚙️ SETTINGS INTERFACES
// ==========================================

export interface ThemeConfig {
  mode: 'system' | 'light' | 'dark';
  primary_color: string;
  accent_color: string;
  font_size: 'small' | 'medium' | 'large';
  font_family: string;
}

export interface PreferencesConfig {
  language: string;
  currency: string;
  date_format: string;
  time_format: '12h' | '24h';
  first_day_of_week: 'sunday' | 'monday';
}

export interface UIConfig {
  sidebar_collapsed: boolean;
  show_animations: boolean;
  compact_mode: boolean;
  high_contrast: boolean;
  reduce_motion: boolean;
}

export interface NotificationsConfig {
  email_enabled: boolean;
  push_enabled: boolean;
  task_reminders: boolean;
  payment_alerts: boolean;
  achievement_notifications: boolean;
  quiet_hours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface PrivacyConfig {
  profile_visibility: 'public' | 'family' | 'private';
  activity_tracking: boolean;
  data_sharing: boolean;
  analytics_enabled: boolean;
}

export interface UserSettings {
  id: string;
  theme: ThemeConfig;
  preferences: PreferencesConfig;
  ui_config: UIConfig;
  notifications: NotificationsConfig;
  privacy: PrivacyConfig;
  updated_at: string;
}

export interface UserSettingsUpdate {
  theme?: Partial<ThemeConfig>;
  preferences?: Partial<PreferencesConfig>;
  ui_config?: Partial<UIConfig>;
  notifications?: Partial<NotificationsConfig>;
  privacy?: Partial<PrivacyConfig>;
}

// ==========================================
// 👥 USER MANAGEMENT INTERFACES
// ==========================================

export interface User {
  id: string;
  name: string;
  nickname?: string;
  email: string;
  cpf: string;
  phone?: string;
  profile: string;
  active: boolean;
  created_at: string;
  last_login?: string;
  platforms: string[];
  permissions: string[];
  days_since_login?: number;
  temp_password?: string; // Apenas na criação
}

export interface UserDetail extends User {
  user_photo?: string;
  stats: {
    budgets: number;
    payments: number;
    tasks: number;
    messages: number;
    user_achievements: number;
  };
  last_consent?: {
    id: string;
    termsAccepted: boolean;
    privacyAccepted: boolean;
    marketingAccepted?: boolean;
    created_at: string;
  };
  settings_configured: boolean;
}

export interface UserStats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  recent_users: number;
  profile_distribution: Record<string, number>;
  activity_rate: string;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

// ==========================================
// 🎨 WHITE-LABEL INTERFACES
// ==========================================
export interface WhiteLabelConfig {
  id: string;
  white_label_enabled: boolean;
  brand_name: string | null;
  brand_logo_url: string | null;
  brand_colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  } | null;
  custom_domain: string | null;
  custom_subdomain: string | null;
  brand_settings: Record<string, unknown> | null;
}

// ==========================================
// 💰 COMMISSION INTERFACES
// ==========================================
export interface Commission {
  id: string;
  partner_id: string;
  employer_link_id: string;
  subscription_id?: string;
  payment_record_id?: string;
  commission_type: 'subscription' | 'payment' | 'signup' | 'renewal';
  base_amount: number;
  commission_rate: number;
  commission_amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  earned_at: string;
  due_date: string;
  paid_at?: string;
  payment_method?: string;
  payment_reference?: string;
  notes?: string;
}

export interface EmployerLink {
  id: string;
  partner_id: string;
  employer_id: string;
  link_type: 'referral' | 'managed' | 'white_label';
  status: 'active' | 'inactive' | 'suspended';
  referral_code?: string;
  commission_rate?: number;
  linked_at: string;
  activated_at?: string;
}

export interface CommissionConfig {
  commission_enabled: boolean;
  commission_type: 'percentage' | 'fixed' | 'tiered';
  commission_rate?: number;
  commission_tiers?: Array<{
    min_amount: number;
    max_amount: number;
    rate: number;
  }>;
  payment_terms?: {
    payment_day: number;
    payment_method: string;
    minimum_amount: number;
  };
}

export interface CommissionFilters {
  status?: string;
  period?: 'current_month' | 'last_month' | 'current_year';
  page?: number;
  limit?: number;
}

export interface CommissionResponse {
  commissions: Commission[];
  pagination: PaginationInfo;
  stats: {
    total_earned: number;
    total_commissions: number;
    pending_amount: number;
    pending_count: number;
    paid_amount: number;
    paid_count: number;
  };
}

export interface EmployerLinkData {
  employer_id: string;
  link_type?: string;
  referral_code?: string;
  commission_rate?: number;
}

export interface CommissionPaymentData {
  payment_method: string;
  payment_reference?: string;
  notes?: string;
}

export const apiService = new ApiService();
