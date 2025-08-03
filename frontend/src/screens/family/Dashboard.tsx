
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Dashboard from '../../components/Dashboard';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Form from '../../components/Form';
import './Dashboard.css';

const Dashboard = () => {
  const [usuario, setUsuario] = useState('Usuário DOM');
  const [dados, setDados] = useState({
    metricas: [
      { icone: '📊', valor: '15', label: 'Tarefas Ativas' },
      { icone: '✅', valor: '8', label: 'Concluídas Hoje' },
      { icone: '⏰', valor: '2h', label: 'Tempo Economizado' },
      { icone: '💰', valor: 'R$ 150', label: 'Economia Mensal' }
    ],
    atividades: [
      { icone: '🧹', texto: 'Limpeza concluída', tempo: '2 min atrás' },
      { icone: '🛒', texto: 'Compras realizadas', tempo: '1 hora atrás' },
      { icone: '👶', texto: 'Cuidado com crianças', tempo: '3 horas atrás' }
    ]
  });

  const itensNavegacao = [
    { id: 'dashboard', icone: '🏠', texto: 'Início', onClick: () => {} },
    { id: 'tarefas', icone: '📋', texto: 'Tarefas', onClick: () => {} },
    { id: 'relatorios', icone: '📊', texto: 'Relatórios', onClick: () => {} },
    { id: 'configuracoes', icone: '⚙️', texto: 'Config', onClick: () => {} }
  ];

  const handleSubmitForm = (formData) => {
    console.log('Dados do formulário:', formData);
    // Implementar lógica de envio
  };

  return (
    <div className="dashboard-screen">
      <Header 
        perfil="FAMILY" 
        titulo="DOM v2 - Família" 
        usuario={usuario} 
      />
      
      <div className="screen-content">
        <Navigation 
          perfil="FAMILY" 
          itens={itensNavegacao} 
          ativo="dashboard" 
        />
        
        <main className="main-content">
          <Dashboard perfil="FAMILY" dados={dados} />
          
          <div className="cards-section">
            <Card
              perfil="FAMILY"
              titulo="Nova Tarefa"
              icone="➕"
              cor={config.cores.primaria}
              conteudo={
                <Form
                  perfil="FAMILY"
                  titulo="Criar Nova Tarefa"
                  campos={[
                    { nome: 'titulo', label: 'Título', tipo: 'text', placeholder: 'Digite o título', obrigatorio: true },
                    { nome: 'descricao', label: 'Descrição', tipo: 'textarea', placeholder: 'Descreva a tarefa', obrigatorio: false },
                    { nome: 'prioridade', label: 'Prioridade', tipo: 'select', placeholder: 'Selecione a prioridade', obrigatorio: true }
                  ]}
                  onSubmit={handleSubmitForm}
                />
              }
            />
            
            <Card
              perfil="FAMILY"
              titulo="Ações Rápidas"
              icone="⚡"
              cor={config.cores.secundaria}
              conteudo={
                <div className="acoes-rapidas">
                  <Button
                    perfil="FAMILY"
                    texto="Nova Tarefa"
                    icone="➕"
                    tipo="primario"
                    onClick={() => console.log('Nova tarefa')}
                  />
                  <Button
                    perfil="FAMILY"
                    texto="Ver Relatórios"
                    icone="📊"
                    tipo="secundario"
                    onClick={() => console.log('Ver relatórios')}
                  />
                </div>
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
    