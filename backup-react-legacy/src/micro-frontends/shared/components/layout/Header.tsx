import React from 'react';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  onLogout?: () => void;
  user?: { name: string; profile: string };
  showMenu?: boolean;
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onMenuPress,
  onLogout,
  user,
  showMenu = true,
  showLogout = true,
}) => {
  const prefersLargeTouch = (user?.profile || '').toLowerCase() === 'employee' || (user?.profile || '').toLowerCase() === 'family';
  const iconSize = prefersLargeTouch ? 24 : 20;
  const titleFontSize = prefersLargeTouch ? 22 : 20;
  const subtitleFontSize = prefersLargeTouch ? 14 : 12;

  return (
    <header style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, gap: '12px' }}>
        {showMenu && (
          <button
            onClick={onMenuPress}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: `${iconSize + 4}px`,
              color: '#495057',
              minWidth: '44px', // Touch-friendly
              minHeight: '44px' // Touch-friendly
            }}
            aria-label="Abrir menu"
          >
            ≡
          </button>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            fontSize: `${titleFontSize}px`, 
            fontWeight: 'bold', 
            color: '#212529',
            margin: 0,
            lineHeight: 1.2
          }}>
            {title}
          </h1>
          {user && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ 
                fontSize: `${subtitleFontSize}px`, 
                color: '#6c757d'
              }}>
                {user.name} · {user.profile}
              </span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: '700',
                backgroundColor: (user.profile || '').toLowerCase() === 'admin' ? '#ffe3e3' : '#e9ecef',
                color: '#495057'
              }}>
                {(user.profile || '').toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {showLogout && onLogout && (
          <button
            onClick={onLogout}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#dc3545',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: `${iconSize}px`,
              color: '#ffffff',
              minWidth: '44px', // Touch-friendly
              minHeight: '44px' // Touch-friendly
            }}
            aria-label="Sair"
          >
            ⎋
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;