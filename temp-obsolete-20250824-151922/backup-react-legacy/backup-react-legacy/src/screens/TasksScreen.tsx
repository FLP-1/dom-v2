import React, { useState } from 'react';
import { useTasks } from '../hooks/useRealData.ts';

const TasksScreen: React.FC = () => {
  // ✅ USANDO DADOS REAIS DO POSTGRESQL
  const { data: tasks, loading, update: updateTask, refetch } = useTasks();
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  // Garantir que tasks não seja null antes de usar filter
  const safeTasks = tasks || [];
  const filteredTasks = safeTasks.filter(task => 
    filter === 'all' ? true : task.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    try {
      await updateTask(taskId, { status: newStatus });
      refetch(); // Recarregar dados do banco
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro ao atualizar tarefa. Tente novamente.');
    }
  };

  return (
    <div style={{
      padding: '16px',
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          Tarefas
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: 0
        }}>
          Gerencie suas tarefas domésticas
        </p>
      </div>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: filter === status ? '#6366f1' : '#f1f5f9',
              color: filter === status ? '#ffffff' : '#374151',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              minHeight: '44px'
            }}
          >
            {status === 'all' ? 'Todas' :
             status === 'pending' ? 'Pendentes' :
             status === 'in-progress' ? 'Em Andamento' : 'Concluídas'}
          </button>
        ))}
      </div>

      {/* Lista de Tarefas */}
      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6b7280'
        }}>
          Carregando tarefas...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '12px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: '0 0 8px 0'
              }}>
                {task.title}
              </h3>
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: `${getPriorityColor(task.priority)}15`,
                  color: getPriorityColor(task.priority)
                }}>
                  {task.priority === 'high' ? 'Alta' :
                   task.priority === 'medium' ? 'Média' : 'Baixa'}
                </span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: `${getStatusColor(task.status)}15`,
                  color: getStatusColor(task.status)
                }}>
                  {task.status === 'pending' ? 'Pendente' :
                   task.status === 'in-progress' ? 'Em Andamento' : 'Concluída'}
                </span>
              </div>
            </div>

            <p style={{
              fontSize: '14px',
              color: '#64748b',
              margin: '0 0 16px 0',
              lineHeight: '1.5'
            }}>
              {task.description}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  Responsável:
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {task.assignedTo}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  Prazo:
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>

            {/* Controles de Status */}
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              {(['pending', 'in-progress', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(task.id, status)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: task.status === status ? getStatusColor(status) : '#f1f5f9',
                    color: task.status === status ? '#ffffff' : '#374151',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    minHeight: '36px'
                  }}
                >
                  {status === 'pending' ? 'Pendente' :
                   status === 'in-progress' ? 'Em Andamento' : 'Concluída'}
                </button>
              ))}
            </div>
          </div>
        ))}
        </div>
      )}

      {!loading && filteredTasks.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6b7280'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            📝
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 8px 0'
          }}>
            Nenhuma tarefa encontrada
          </h3>
          <p style={{
            fontSize: '14px',
            margin: 0
          }}>
            {filter === 'all' ? 'Crie sua primeira tarefa!' : 'Não há tarefas com este status.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksScreen;

