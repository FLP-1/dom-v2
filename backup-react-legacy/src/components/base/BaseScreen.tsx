import React from 'react';

interface BaseScreenProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  style?: React.CSSProperties;
}

const BaseScreen: React.FC<BaseScreenProps> = ({ 
  children, 
  title, 
  subtitle, 
  style = {} 
}) => {
  return (
    <div style={{
      padding: '16px',
      maxWidth: '100%',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      ...style
    }}>
      {(title || subtitle) && (
        <div style={{
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          {title && (
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 8px 0'
            }}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: 0
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default BaseScreen;
