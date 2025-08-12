import { useState, useEffect, useCallback, useMemo } from 'react';
import { apiService, Message, Group, CommunicationStats } from '../services/apiService';

export const useCommunicationData = () => {
  // Estados principais
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<CommunicationStats>({
    unread_messages: 0,
    today_messages: 0,
    active_groups: 0,
    total_groups: 0
  });
  
  // Estados de controle
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar grupos e estatísticas
  const loadGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [groupsData, statsData] = await Promise.all([
        apiService.getGroups(),
        apiService.getCommunicationStats()
      ]);

      setGroups(groupsData);
      setStats(statsData);

      // Se não há grupo atual, selecionar o primeiro
      if (!currentGroup && groupsData.length > 0) {
        setCurrentGroup(groupsData[0]);
      }
    } catch (err) {
      console.error('Erro ao carregar grupos:', err);
      setError('Erro ao carregar dados de comunicação');
      
      // Fallback para dados mock
      const mockGroups: Group[] = [
        {
          id: 'family-main',
          name: 'Família Principal',
          description: 'Grupo principal da família',
          type: 'family',
          role: 'admin',
          messages_count: 25,
          created_at: new Date().toISOString()
        },
        {
          id: 'household-staff',
          name: 'Funcionários',
          description: 'Comunicação com funcionários',
          type: 'staff',
          role: 'owner',
          messages_count: 12,
          created_at: new Date().toISOString()
        }
      ];

      const mockStats: CommunicationStats = {
        unread_messages: 5,
        today_messages: 8,
        active_groups: 2,
        total_groups: 2
      };

      setGroups(mockGroups);
      setStats(mockStats);
      if (!currentGroup) setCurrentGroup(mockGroups[0]);
    } finally {
      setLoading(false);
    }
  }, [currentGroup]);

  // Carregar mensagens do grupo atual
  const loadMessages = useCallback(async (groupId?: string, options?: { limit?: number; offset?: number }) => {
    const targetGroupId = groupId || currentGroup?.id;
    if (!targetGroupId) return;

    try {
      setMessagesLoading(true);
      setError(null);

      const messagesData = await apiService.getMessages(targetGroupId, options);
      
      if (options?.offset && options.offset > 0) {
        // Carregar mais mensagens (append)
        setMessages(prev => [...prev, ...messagesData]);
      } else {
        // Carregar mensagens iniciais
        setMessages(messagesData);
      }
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
      setError('Erro ao carregar mensagens');
      
      // Fallback para mensagens mock
      const mockMessages: Message[] = [
        {
          id: 'msg-1',
          content: 'Olá família! Como estão todos hoje?',
          type: 'text',
          status: 'read',
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          sender: {
            id: 'user-1',
            name: 'Maria Silva',
            nickname: 'Maria',
            avatar: null
          },
          reads: [],
          replies_count: 2
        },
        {
          id: 'msg-2',
          content: 'Tudo bem por aqui! E você?',
          type: 'text',
          status: 'read',
          created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          sender: {
            id: 'user-2',
            name: 'João Silva',
            nickname: 'João',
            avatar: null
          },
          reply_to: {
            id: 'msg-1',
            content: 'Olá família! Como estão todos hoje?',
            sender_name: 'Maria Silva'
          },
          reads: [],
          replies_count: 0
        },
        {
          id: 'msg-3',
          content: 'Preciso lembrar que amanhã a Ana vem limpar a casa às 9h',
          type: 'text',
          status: 'sent',
          created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
          sender: {
            id: 'user-1',
            name: 'Maria Silva',
            nickname: 'Maria',
            avatar: null
          },
          reads: [],
          replies_count: 0
        }
      ];

      setMessages(mockMessages);
    } finally {
      setMessagesLoading(false);
    }
  }, [currentGroup?.id]);

  // Enviar mensagem
  const sendMessage = useCallback(async (content: string, options?: {
    type?: string;
    reply_to_id?: string;
    metadata?: Record<string, unknown>;
  }) => {
    if (!currentGroup || !content.trim()) return null;

    try {
      setSending(true);
      setError(null);

      // Otimistic UI update
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        content: content.trim(),
        type: options?.type || 'text',
        status: 'sending',
        metadata: options?.metadata,
        created_at: new Date().toISOString(),
        sender: {
          id: 'current-user',
          name: 'Você',
          nickname: 'Você',
          avatar: null
        },
        reply_to: options?.reply_to_id ? messages.find(m => m.id === options.reply_to_id) : undefined,
        reads: [],
        replies_count: 0
      };

      setMessages(prev => [tempMessage, ...prev]);

      const newMessage = await apiService.sendMessage({
        content: content.trim(),
        type: options?.type || 'text',
        group_id: currentGroup.id,
        reply_to_id: options?.reply_to_id,
        metadata: options?.metadata
      });

      // Substituir mensagem temporária pela real
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id ? newMessage : msg
      ));

      // Atualizar estatísticas
      setStats(prev => ({
        ...prev,
        today_messages: prev.today_messages + 1
      }));

      return newMessage;
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError('Erro ao enviar mensagem');
      
      // Remover mensagem temporária em caso de erro
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('temp-')));
      return null;
    } finally {
      setSending(false);
    }
  }, [currentGroup, messages]);

  // Marcar mensagem como lida
  const markAsRead = useCallback(async (messageId: string) => {
    try {
      await apiService.markMessageAsRead(messageId);
      
      // Atualizar estado local
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'read' }
          : msg
      ));

      // Atualizar estatísticas
      setStats(prev => ({
        ...prev,
        unread_messages: Math.max(0, prev.unread_messages - 1)
      }));
    } catch (err) {
      console.error('Erro ao marcar como lida:', err);
    }
  }, []);

  // Trocar grupo ativo
  const selectGroup = useCallback((group: Group) => {
    setCurrentGroup(group);
    setMessages([]); // Limpar mensagens do grupo anterior
  }, []);

  // Recarregar dados
  const reload = useCallback(() => {
    loadGroups();
    if (currentGroup) {
      loadMessages(currentGroup.id);
    }
  }, [loadGroups, loadMessages, currentGroup]);

  // Carregar mais mensagens (paginação)
  const loadMore = useCallback((offset: number) => {
    if (currentGroup) {
      loadMessages(currentGroup.id, { limit: 20, offset });
    }
  }, [loadMessages, currentGroup]);

  // Estatísticas computadas
  const computedStats = useMemo(() => ({
    ...stats,
    current_group_messages: messages.length,
    unread_in_current: messages.filter(m => m.status !== 'read').length,
    today_in_current: messages.filter(m => {
      const today = new Date().toDateString();
      return new Date(m.created_at).toDateString() === today;
    }).length
  }), [stats, messages]);

  // Efeitos
  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  useEffect(() => {
    if (currentGroup) {
      loadMessages(currentGroup.id);
    }
  }, [currentGroup, loadMessages]);

  return {
    // Dados
    groups,
    currentGroup,
    messages,
    stats: computedStats,
    
    // Estados de controle
    loading,
    messagesLoading,
    sending,
    error,
    
    // Ações
    sendMessage,
    markAsRead,
    selectGroup,
    reload,
    loadMore,
    
    // Helpers
    hasUnreadMessages: computedStats.unread_messages > 0,
    canSendMessage: currentGroup !== null && !sending,
    isCurrentUserMessage: (message: Message) => message.sender.id === 'current-user'
  };
};
