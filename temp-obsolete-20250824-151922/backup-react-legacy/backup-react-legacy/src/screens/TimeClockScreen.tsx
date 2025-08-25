import React, { useState, useEffect } from 'react';
import { useTimeCardEntries } from '../hooks/useRealData.ts';

interface TimeCardEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  entry_time: string;
  exit_time?: string;
  total_hours?: number;
  status: string;
}

const TimeClockScreen: React.FC = () => {
  const { timeEntries, loading, error, create, refetch } = useTimeCardEntries();
  
  // Garantir que timeEntries não seja null antes de usar
  const safeTimeEntries = timeEntries || [];
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [lastEntry, setLastEntry] = useState<TimeCardEntry | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (safeTimeEntries.length > 0) {
      const latestEntry = safeTimeEntries[safeTimeEntries.length - 1];
      setLastEntry(latestEntry);
      setIsClockedIn(latestEntry.type === 'entry' && !latestEntry.exit_time);
    }
  }, [safeTimeEntries]);

  const handleClockIn = async () => {
    try {
      await create({
        type: 'entry',
        entry_time: new Date(),
        exit_time: null,
        notes: 'Entrada registrada'
      });
      refetch();
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
    }
  };

  const handleClockOut = async () => {
    try {
      if (lastEntry) {
        await create({
          type: 'exit',
          entry_time: lastEntry.entry_time,
          exit_time: new Date(),
          notes: 'Saída registrada'
        });
        refetch();
      }
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateWorkHours = (entry: TimeCardEntry) => {
    if (!entry.exit_time) return 'Em andamento';
    
    const entryTime = new Date(entry.entry_time);
    const exitTime = new Date(entry.exit_time);
    const diffMs = exitTime.getTime() - entryTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    const hours = Math.floor(diffHours);
    const minutes = Math.floor((diffHours - hours) * 60);
    
    return `${hours}h ${minutes}min`;
  };

  if (loading) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>Carregando ponto...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#ef4444' }}>Erro ao carregar ponto: {error}</div>
      </div>
    );
  }

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
          ⏰ Controle de Ponto
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Registro de entrada e saída
        </p>
      </div>

      {/* Current Time Display */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '8px',
          fontFamily: 'monospace'
        }}>
          {formatTime(currentTime)}
        </div>
        <div style={{
          fontSize: '18px',
          color: '#64748b',
          marginBottom: '24px'
        }}>
          {formatDate(currentTime)}
        </div>

        {/* Clock In/Out Button */}
        <button
          onClick={isClockedIn ? handleClockOut : handleClockIn}
          style={{
            backgroundColor: isClockedIn ? '#ef4444' : '#10b981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            minHeight: '60px',
            minWidth: '200px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
        >
          {isClockedIn ? '🕐 Registrar Saída' : '🕐 Registrar Entrada'}
        </button>

        {/* Status */}
        <div style={{
          marginTop: '16px',
          fontSize: '16px',
          color: isClockedIn ? '#10b981' : '#6b7280',
          fontWeight: '600'
        }}>
          {isClockedIn ? '🟢 Você está trabalhando' : '🔴 Você não está no trabalho'}
        </div>
      </div>

      {/* Today's Summary */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#1e293b', 
          margin: '0 0 16px 0' 
        }}>
          📊 Resumo de Hoje
        </h3>

        {safeTimeEntries.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280',
            padding: '20px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <div style={{ fontSize: '16px' }}>Nenhum registro hoje</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {safeTimeEntries
              .filter(entry => formatDate(new Date(entry.entry_time)) === formatDate(currentTime))
              .map((entry, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b'
                    }}>
                      {entry.type === 'entry' ? 'Entrada' : 'Saída'}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b'
                    }}>
                      {formatTime(new Date(entry.entry_time))}
                      {entry.exit_time && ` - ${formatTime(new Date(entry.exit_time))}`}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#6366f1'
                  }}>
                    {calculateWorkHours(entry)}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Recent Entries */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: 0 
          }}>
            📋 Registros Recentes
          </h3>
        </div>

        {safeTimeEntries.length === 0 ? (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏰</div>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>Nenhum registro encontrado</div>
            <div style={{ fontSize: '14px' }}>Faça seu primeiro registro de ponto</div>
          </div>
        ) : (
          <div style={{ overflow: 'auto' }}>
            {safeTimeEntries.slice(-10).reverse().map((entry, index) => (
              <div
                key={index}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: entry.type === 'entry' ? '#10b981' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      {entry.type === 'entry' ? '🕐' : '🕐'}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1e293b'
                      }}>
                        {entry.type === 'entry' ? 'Entrada' : 'Saída'}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        {formatDate(new Date(entry.entry_time))}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    <span>Entrada: {formatTime(new Date(entry.entry_time))}</span>
                    {entry.exit_time && (
                      <span>Saída: {formatTime(new Date(entry.exit_time))}</span>
                    )}
                    <span style={{
                      color: '#6366f1',
                      fontWeight: '600'
                    }}>
                      {calculateWorkHours(entry)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '24px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={refetch}
          style={{
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '44px'
          }}
        >
          🔄 Atualizar
        </button>
      </div>
    </div>
  );
};

export default TimeClockScreen;
