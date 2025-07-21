/**
 * @fileoverview Sistema de mensagens centralizadas DOM v2
 * @directory frontend/src/utils
 * @description Centraliza todas as mensagens do aplicativo
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

// Mensagens de Login
export const LOGIN_MESSAGES = {
  ERROR_EMPTY_FIELDS: 'Preencha CPF e senha',
  ERROR_CONNECTION: 'Não foi possível conectar ao servidor',
  ERROR_LOGIN: 'Erro no login',
  SUCCESS_LOGIN: 'Login realizado com sucesso',
  TOOLTIP_CPF: 'Digite seu CPF sem pontos ou traços (apenas números)',
  TOOLTIP_PASSWORD: 'Digite sua senha de acesso ao sistema',
} as const;

// Mensagens de Tarefas
export const TASK_MESSAGES = {
  ERROR_LOAD_TASKS: 'Não foi possível carregar as tarefas',
  ERROR_EMPTY_TITLE: 'Título é obrigatório',
  ERROR_CREATE_TASK: 'Erro ao criar tarefa',
  ERROR_UPDATE_TASK: 'Não foi possível atualizar a tarefa',
  ERROR_DELETE_TASK: 'Não foi possível remover a tarefa',
  SUCCESS_CREATE_TASK: 'Tarefa criada com sucesso',
  SUCCESS_DELETE_TASK: 'Tarefa removida com sucesso',
  CONFIRM_DELETE_TASK: 'Deseja realmente remover esta tarefa?',
  TOOLTIP_TITLE: 'Digite um título claro e objetivo para a tarefa',
  TOOLTIP_DESCRIPTION: 'Adicione detalhes sobre a tarefa (opcional)',
  EMPTY_TASKS: 'Nenhuma tarefa encontrada',
  CREATE_FIRST_TASK: 'Criar Primeira Tarefa',
  LOADING_TASKS: 'Carregando tarefas...',
} as const;

// Mensagens Gerais
export const GENERAL_MESSAGES = {
  ERROR: 'Erro',
  SUCCESS: 'Sucesso',
  CANCEL: 'Cancelar',
  REMOVE: 'Remover',
  SAVE: 'Salvar',
  CREATE: 'Criar',
  BACK: 'Voltar',
  TASKS: 'Tarefas',
  NEW_TASK: 'Nova Tarefa',
  TASK_TITLE: 'Título da tarefa',
  DESCRIPTION: 'Descrição (opcional)',
  PRIORITY: 'Prioridade:',
  PRIORITY_LOW: 'Baixa',
  PRIORITY_MEDIUM: 'Média',
  PRIORITY_HIGH: 'Alta',
  MARK_COMPLETED: 'Marcar Concluída',
  MARK_ACTIVE: 'Marcar Ativa',
  REMOVE_TASK: 'Remover',
} as const;

// Mensagens de Perfis de Usuário
export const USER_PROFILE_MESSAGES = {
  EMPLOYER: 'Empregador',
  EMPLOYEE: 'Empregado Doméstico',
  FAMILY: 'Familiar',
  PARTNER: 'Parceiro',
  SUBORDINATE: 'Subordinado',
  ADMIN: 'Administrador',
  OWNER: 'Dono',
} as const;

// Mensagens adaptadas por perfil
export const PROFILE_ADAPTED_MESSAGES = {
  EMPLOYER: {
    welcome: 'Bem-vinda! Gerencie sua casa de forma eficiente',
    dashboard: 'Visão Geral da Casa',
    tasks: 'Tarefas Pendentes',
    reports: 'Relatórios de Produtividade',
    quickActions: 'Ações Rápidas',
  },
  EMPLOYEE: {
    welcome: 'Olá! Aqui estão suas tarefas do dia',
    dashboard: 'Minhas Tarefas',
    tasks: 'Tarefas para Fazer',
    reports: 'Meu Trabalho',
    quickActions: 'Marcar Concluída',
  },
  FAMILY: {
    welcome: 'Bem-vindo à gestão familiar!',
    dashboard: 'Casa da Família',
    tasks: 'Tarefas da Família',
    reports: 'Atividades Familiares',
    quickActions: 'Participar',
  },
  PARTNER: {
    welcome: 'Painel de Gestão Empresarial',
    dashboard: 'Visão Executiva',
    tasks: 'Gestão de Tarefas',
    reports: 'Relatórios de Negócio',
    quickActions: 'Ações Estratégicas',
  },
  SUBORDINATE: {
    welcome: 'Bem-vindo ao sistema de gestão',
    dashboard: 'Painel de Controle',
    tasks: 'Tarefas Atribuídas',
    reports: 'Relatórios de Progresso',
    quickActions: 'Atualizar Status',
  },
  ADMIN: {
    welcome: 'Painel Administrativo',
    dashboard: 'Monitoramento do Sistema',
    tasks: 'Gestão de Usuários',
    reports: 'Relatórios Técnicos',
    quickActions: 'Ações Administrativas',
  },
  OWNER: {
    welcome: 'Painel Executivo',
    dashboard: 'Visão Geral do Negócio',
    tasks: 'Gestão Estratégica',
    reports: 'Relatórios Executivos',
    quickActions: 'Decisões Estratégicas',
  },
} as const;

// Mensagens de Validação
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Campo obrigatório',
  INVALID_CPF: 'CPF inválido',
  INVALID_EMAIL: 'E-mail inválido',
  PASSWORD_TOO_SHORT: 'Senha deve ter pelo menos 6 caracteres',
  PASSWORDS_DONT_MATCH: 'Senhas não coincidem',
} as const;

// Exportar todas as mensagens
export const MESSAGES = {
  LOGIN: LOGIN_MESSAGES,
  TASK: TASK_MESSAGES,
  GENERAL: GENERAL_MESSAGES,
  USER_PROFILE: USER_PROFILE_MESSAGES,
  PROFILE_ADAPTED: PROFILE_ADAPTED_MESSAGES,
  VALIDATION: VALIDATION_MESSAGES,
} as const; 