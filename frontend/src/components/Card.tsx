
import React from 'react';
import './Card.css';

const Card = ({ perfil, titulo, conteudo, acao, icone, cor }) => {
  const config = {
    EMPLOYER: { estilo: 'elegante', sombra: 'profunda' },
    EMPLOYEE: { estilo: 'colorido', sombra: 'suave' },
    FAMILY: { estilo: 'harmonioso', sombra: 'media' }
  };

  const { estilo, sombra } = config[perfil] || config.EMPLOYER;

  return (
    <div className={`card card-${estilo} card-${sombra}`} style={{ borderColor: cor }}>
      <div className="card-header">
        <span className="card-icon">{icone}</span>
        <h3 className="card-title">{titulo}</h3>
      </div>
      <div className="card-content">
        {conteudo}
      </div>
      {acao && (
        <div className="card-actions">
          <button className="card-button" onClick={acao.onClick}>
            {acao.texto}
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
    