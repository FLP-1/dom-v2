
import React from 'react';
import './Navigation.css';

const Navigation = ({ perfil, itens, ativo }) => {
  const config = {
    EMPLOYER: { tipo: 'lateral', estilo: 'executivo' },
    EMPLOYEE: { tipo: 'inferior', estilo: 'simples' },
    FAMILY: { tipo: 'circular', estilo: 'familiar' }
  };

  const { tipo, estilo } = config[perfil] || config.EMPLOYER;

  return (
    <nav className={`navigation navigation-${tipo} navigation-${estilo}`}>
      {itens.map((item, index) => (
        <div 
          key={index}
          className={`nav-item ${ativo === item.id ? 'ativo' : ''}`}
          onClick={() => item.onClick(item.id)}
        >
          <span className="nav-icon">{item.icone}</span>
          <span className="nav-text">{item.texto}</span>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
    