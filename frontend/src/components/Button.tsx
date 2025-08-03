
import React from 'react';
import './Button.css';

const Button = ({ perfil, texto, onClick, tipo = 'primario', tamanho = 'medio', icone }) => {
  const config = {
    EMPLOYER: { estilo: 'profissional', animacao: 'sutil' },
    EMPLOYEE: { estilo: 'vibrante', animacao: 'energetica' },
    FAMILY: { estilo: 'acolhedor', animacao: 'suave' }
  };

  const { estilo, animacao } = config[perfil] || config.EMPLOYER;

  return (
    <button 
      className={`button button-${estilo} button-${tipo} button-${tamanho} button-${animacao}`}
      onClick={onClick}
    >
      {icone && <span className="button-icon">{icone}</span>}
      <span className="button-text">{texto}</span>
    </button>
  );
};

export default Button;
    