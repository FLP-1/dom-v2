import React, { useState } from 'react';

interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  lastGenerated?: string;
  status: 'available' | 'generating' | 'error';
  format: 'pdf' | 'excel' | 'csv';
  data?: Record<string, unknown>;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

const ReportsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'reports' | 'analytics' | 'exports'>('reports');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: '2025-01-31'
  });

  // Dados mockados
  const reports: Report[] = [
    {
      id: '1',
      name: 'Relatório Financeiro Mensal',
      description: 'Resumo completo de receitas, despesas e saldo',
      category: 'finance',
      icon: '💰',
      lastGenerated: '2025-01-27T10:30:00Z',
      status: 'available',
      format: 'pdf'
    },
    {
      id: '2',
      name: 'Análise de Tarefas',
      description: 'Produtividade e conclusão de tarefas por período',
      category: 'tasks',
      icon: '📋',
      lastGenerated: '2025-01-26T16:45:00Z',
      status: 'available',
      format: 'excel'
    },
    {
      id: '3',
      name: 'Relatório Familiar',
      description: 'Atividades e participação dos membros da família',
      category: 'family',
      icon: '👨‍👩‍👧‍👦',
      lastGenerated: '2025-01-25T14:20:00Z',
      status: 'available',
      format: 'pdf'
    },
    {
      id: '4',
      name: 'Dashboard de Analytics',
      description: 'Métricas e indicadores de performance',
      category: 'analytics',
      icon: '📊',
      status: 'generating',
      format: 'pdf'
    },
    {
      id: '5',
      name: 'Relatório de Compliance',
      description: 'Conformidade com obrigações legais e fiscais',
      category: 'compliance',
      icon: '🏛️',
      status: 'error',
      format: 'pdf'
    }
  ];

  // Dados mockados para gráficos
  const financialData: ChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receitas',
        data: [12000, 15000, 14000, 16000, 18000, 17000],
        backgroundColor: '#10b981',
        borderColor: '#059669'
      },
      {
        label: 'Despesas',
        data: [8000, 9000, 8500, 10000, 11000, 9500],
        backgroundColor: '#ef4444',
        borderColor: '#dc2626'
      }
    ]
  };

  const taskData: ChartData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Tarefas Concluídas',
        data: [12, 15, 8, 20, 18, 10, 5],
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb'
      }
    ]
  };

  const familyData: ChartData = {
    labels: ['Maria', 'João', 'Ana', 'Pedro', 'Carla'],
    datasets: [
      {
        label: 'Tarefas Realizadas',
        data: [45, 38, 52, 29, 41],
        backgroundColor: '#8b5cf6',
        borderColor: '#7c3aed'
      }
    ]
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'finance': return '#10b981';
      case 'tasks': return '#6366f1';
      case 'family': return '#f59e0b';
      case 'analytics': return '#8b5cf6';
      case 'compliance': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'generating': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'generating': return 'Gerando...';
      case 'error': return 'Erro';
      default: return 'Desconhecido';
    }
  };

  const getFormatText = (format: string) => {
    switch (format) {
      case 'pdf': return 'PDF';
      case 'excel': return 'Excel';
      case 'csv': return 'CSV';
      default: return format;
    }
  };

  const handleGenerateReport = (reportId: string) => {
    setSelectedReport(reportId);
    setShowReportModal(true);
  };

  const handleConfirmGenerate = () => {
    console.log('Gerando relatório:', selectedReport, 'para período:', dateRange);
    setShowReportModal(false);
    setSelectedReport(null);
    alert('Relatório sendo gerado! Você receberá uma notificação quando estiver pronto.');
  };

  const stats = {
    totalReports: reports.length,
    availableReports: reports.filter(r => r.status === 'available').length,
    generatingReports: reports.filter(r => r.status === 'generating').length,
    errorReports: reports.filter(r => r.status === 'error').length
  };

  return (
    <div style={{ padding: '16px', maxWidth: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1e293b', 
          margin: '0 0 8px 0' 
        }}>
          📊 Relatórios e Analytics
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Gere relatórios, visualize analytics e exporte dados
        </p>
      </div>

      {/* Estatísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.totalReports}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Total de Relatórios</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.availableReports}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Disponíveis</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.generatingReports}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Gerando</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>❌</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.errorReports}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Com Erro</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <button
          onClick={() => setSelectedTab('reports')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'reports' ? '#6366f1' : 'transparent',
            color: selectedTab === 'reports' ? '#ffffff' : '#6b7280'
          }}
        >
          📄 Relatórios
        </button>
        <button
          onClick={() => setSelectedTab('analytics')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'analytics' ? '#6366f1' : 'transparent',
            color: selectedTab === 'analytics' ? '#ffffff' : '#6b7280'
          }}
        >
          📊 Analytics
        </button>
        <button
          onClick={() => setSelectedTab('exports')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'exports' ? '#6366f1' : 'transparent',
            color: selectedTab === 'exports' ? '#ffffff' : '#6b7280'
          }}
        >
          📤 Exportações
        </button>
      </div>

      {/* Tab: Relatórios */}
      {selectedTab === 'reports' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Relatórios Disponíveis
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {reports.map((report) => (
              <div
                key={report.id}
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
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: `${getCategoryColor(report.category)}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {report.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: 0
                      }}>
                        {report.name}
                      </h3>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: `${getStatusColor(report.status)}15`,
                        color: getStatusColor(report.status)
                      }}>
                        {getStatusText(report.status)}
                      </span>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: '#f3f4f6',
                        color: '#374151'
                      }}>
                        {getFormatText(report.format)}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748b',
                      margin: '0 0 8px 0'
                    }}>
                      {report.description}
                    </p>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {report.lastGenerated ? `Última geração: ${new Date(report.lastGenerated).toLocaleString('pt-BR')}` : 'Nunca gerado'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={report.status === 'generating'}
                      style={{
                        backgroundColor: report.status === 'generating' ? '#f3f4f6' : '#6366f1',
                        color: report.status === 'generating' ? '#9ca3af' : '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: report.status === 'generating' ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {report.status === 'generating' ? '⏳ Gerando...' : '📊 Gerar'}
                    </button>
                    <button
                      style={{
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      📖 Visualizar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {selectedTab === 'analytics' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            📊 Analytics em Tempo Real
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px'
          }}>
            {/* Gráfico Financeiro */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 16px 0'
              }}>
                💰 Evolução Financeira (6 meses)
              </h3>
              <div style={{
                height: '200px',
                display: 'flex',
                alignItems: 'end',
                gap: '8px',
                padding: '20px 0'
              }}>
                {financialData.datasets[0].data.map((value, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${(value / 20000) * 100}%`,
                      backgroundColor: financialData.datasets[0].backgroundColor,
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '4px'
                    }} />
                    <div style={{
                      width: '100%',
                      height: `${(financialData.datasets[1].data[index] / 20000) * 100}%`,
                      backgroundColor: financialData.datasets[1].backgroundColor,
                      borderRadius: '4px 4px 0 0'
                    }} />
                    <div style={{
                      fontSize: '10px',
                      color: '#6b7280',
                      marginTop: '8px'
                    }}>
                      {financialData.labels[index]}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: financialData.datasets[0].backgroundColor
                  }} />
                  <span style={{ fontSize: '12px', color: '#374151' }}>Receitas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: financialData.datasets[1].backgroundColor
                  }} />
                  <span style={{ fontSize: '12px', color: '#374151' }}>Despesas</span>
                </div>
              </div>
            </div>

            {/* Gráfico de Tarefas */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 16px 0'
              }}>
                📋 Produtividade Semanal
              </h3>
              <div style={{
                height: '200px',
                display: 'flex',
                alignItems: 'end',
                gap: '8px',
                padding: '20px 0'
              }}>
                {taskData.datasets[0].data.map((value, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${(value / 25) * 100}%`,
                      backgroundColor: taskData.datasets[0].backgroundColor,
                      borderRadius: '4px 4px 0 0'
                    }} />
                    <div style={{
                      fontSize: '10px',
                      color: '#6b7280',
                      marginTop: '8px'
                    }}>
                      {taskData.labels[index]}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  Total: {taskData.datasets[0].data.reduce((sum, val) => sum + val, 0)} tarefas concluídas
                </div>
              </div>
            </div>

            {/* Gráfico Familiar */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 16px 0'
              }}>
                👨‍👩‍👧‍👦 Participação Familiar
              </h3>
              <div style={{
                height: '200px',
                display: 'flex',
                alignItems: 'end',
                gap: '8px',
                padding: '20px 0'
              }}>
                {familyData.datasets[0].data.map((value, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${(value / 60) * 100}%`,
                      backgroundColor: familyData.datasets[0].backgroundColor,
                      borderRadius: '4px 4px 0 0'
                    }} />
                    <div style={{
                      fontSize: '10px',
                      color: '#6b7280',
                      marginTop: '8px',
                      textAlign: 'center'
                    }}>
                      {familyData.labels[index]}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  Média: {Math.round(familyData.datasets[0].data.reduce((sum, val) => sum + val, 0) / familyData.datasets[0].data.length)} tarefas/membro
                </div>
              </div>
            </div>

            {/* Métricas Rápidas */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 16px 0'
              }}>
                📈 Métricas Rápidas
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Saldo Atual</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>R$ 15.420,00</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Tarefas Pendentes</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#f59e0b' }}>23</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Taxa de Conclusão</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#3b82f6' }}>87%</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Membros Ativos</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#8b5cf6' }}>5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Exportações */}
      {selectedTab === 'exports' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            📤 Exportação de Dados
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Exportação Financeira */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '32px' }}>💰</div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Dados Financeiros
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Exporte transações, orçamentos e relatórios
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  📊 Exportar como Excel
                </button>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  📄 Exportar como PDF
                </button>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  📋 Exportar como CSV
                </button>
              </div>
            </div>

            {/* Exportação de Tarefas */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '32px' }}>📋</div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Dados de Tarefas
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Exporte histórico e performance de tarefas
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  📊 Exportar como Excel
                </button>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  📄 Exportar como PDF
                </button>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  📋 Exportar como CSV
                </button>
              </div>
            </div>

            {/* Exportação Completa */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '32px' }}>📦</div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Backup Completo
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Exporte todos os dados do sistema
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <button style={{
                  backgroundColor: '#6366f1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  📦 Gerar Backup Completo
                </button>
                <button style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  🔄 Agendar Backup Automático
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Geração de Relatório */}
      {showReportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 16px 0'
            }}>
              📊 Gerar Relatório
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Período de Início
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Período de Fim
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowReportModal(false)}
                  style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmGenerate}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsScreen;
