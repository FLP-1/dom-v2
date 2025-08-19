import React from 'react';

const AdvancedTimeCardScreen: React.FC = () => {
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
          Ponto Avançado
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: 0
        }}>
          Controle de ponto eletrônico
        </p>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          ⏰
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0'
        }}>
          Em Construção
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
        </p>
      </div>
    </div>
  );
};

export default AdvancedTimeCardScreen;
