
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ perfil, dados }) => {
  const [metricas, setMetricas] = useState(dados.metricas || []);
  const [atividades, setAtividades] = useState(dados.atividades || []);

  const config = {
    EMPLOYER: { layout: 'grid-executivo', cards: 4 },
    EMPLOYEE: { layout: 'lista-simples', cards: 3 },
    FAMILY: { layout: 'grid-familiar', cards: 6 }
  };

  const { layout, cards } = config[perfil] || config.EMPLOYER;

  return (
    <div className={`dashboard dashboard-${layout}`}>
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-subtitle">Bem-vindo ao seu painel de controle</p>
      </div>
      
      <div className="dashboard-metricas">
        {metricas.slice(0, cards).map((metrica, index) => (
          <div key={index} className="metrica-card">
            <div className="metrica-icon">{metrica.icone}</div>
            <div className="metrica-info">
              <h3 className="metrica-valor">{metrica.valor}</h3>
              <p className="metrica-label">{metrica.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-atividades">
        <h3 className="atividades-title">Atividades Recentes</h3>
        <div className="atividades-lista">
          {atividades.map((atividade, index) => (
            <div key={index} className="atividade-item">
              <span className="atividade-icon">{atividade.icone}</span>
              <div className="atividade-info">
                <p className="atividade-texto">{atividade.texto}</p>
                <span className="atividade-tempo">{atividade.tempo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
    