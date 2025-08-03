
import React from 'react';
import './Header.css';

const Header = ({ perfil, titulo, usuario }) => {
  const config = {
    EMPLOYER: { estilo: 'executivo', icone: '👔' },
    EMPLOYEE: { estilo: 'acolhedor', icone: '👩‍💼' },
    FAMILY: { estilo: 'familiar', icone: '👨‍👩‍👧‍👦' }
  };

  const { estilo, icone } = config[perfil] || config.EMPLOYER;

  return (
    <header className={`header header-${estilo}`}>
      <div className="header-content">
        <div className="header-logo">
          <span className="header-icon">{icone}</span>
          <h1 className="header-title">{titulo}</h1>
        </div>
        <div className="header-user">
          <span className="user-name">{usuario}</span>
          <div className="user-avatar">
            <img src="/avatar-default.png" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
    