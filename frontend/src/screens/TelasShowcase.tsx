import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Card from '../components/Card';
import Icon from '../components/shared/Icon';

interface TelaInfo {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  icone: string;
  cor: string;
  status: 'implementada' | 'em-desenvolvimento' | 'planejada';
  funcionalidades: string[];
  complexidade: 'baixa' | 'media' | 'alta';
}

const telas: TelaInfo[] = [
  {
    id: 'ultra-premium-login',
    nome: 'Login Ultra Premium',
    descricao: 'Tela de autenticação sofisticada com seleção de perfil e validações avançadas',
    categoria: 'Autenticação',
    icone: 'shield',
    cor: '#1976D2',
    status: 'implementada',
    funcionalidades: ['Seleção de perfil', 'Validação CPF/CNPJ', 'Feedback visual', 'Compliance PLD'],
    complexidade: 'alta'
  },
  {
    id: 'dashboard',
    nome: 'Dashboard Principal',
    descricao: 'Painel central com resumos, métricas e acesso rápido às funcionalidades',
    categoria: 'Navegação',
    icone: 'home',
    cor: '#4CAF50',
    status: 'implementada',
    funcionalidades: ['Cards de resumo', 'Métricas em tempo real', 'Navegação rápida', 'Status de compliance'],
    complexidade: 'media'
  },
  {
    id: 'tarefas',
    nome: 'Gestão de Tarefas',
    descricao: 'Sistema completo de criação, acompanhamento e conclusão de tarefas domésticas',
    categoria: 'Produtividade',
    icone: 'check-square',
    cor: '#FF9800',
    status: 'implementada',
    funcionalidades: ['Criação de tarefas', 'Filtros por categoria', 'Acompanhamento de progresso', 'Notificações'],
    complexidade: 'media'
  },
  {
    id: 'funcionarios',
    nome: 'Gestão de Funcionários',
    descricao: 'Controle completo da equipe doméstica com compliance e performance',
    categoria: 'Recursos Humanos',
    icone: 'users',
    cor: '#9C27B0',
    status: 'implementada',
    funcionalidades: ['Cadastro de funcionários', 'Controle de documentos', 'Avaliação de performance', 'Compliance PLD'],
    complexidade: 'alta'
  },
  {
    id: 'compras',
    nome: 'Controle de Compras',
    descricao: 'Sistema de gestão de compras e fornecedores com controle de orçamento',
    categoria: 'Financeiro',
    icone: 'shopping-cart',
    cor: '#2196F3',
    status: 'implementada',
    funcionalidades: ['Cadastro de fornecedores', 'Controle de orçamento', 'Aprovação de compras', 'Relatórios'],
    complexidade: 'media'
  },
  {
    id: 'pagamentos',
    nome: 'Gestão de Pagamentos',
    descricao: 'Sistema completo de pagamentos com compliance e fluxo de caixa',
    categoria: 'Financeiro',
    icone: 'credit-card',
    cor: '#F44336',
    status: 'implementada',
    funcionalidades: ['Pagamento de salários', 'Contas a pagar', 'Compliance PLD', 'Fluxo de caixa'],
    complexidade: 'alta'
  },
  {
    id: 'notificacoes',
    nome: 'Sistema de Notificações',
    descricao: 'Central de notificações com priorização e categorização inteligente',
    categoria: 'Comunicação',
    icone: 'bell',
    cor: '#FF5722',
    status: 'implementada',
    funcionalidades: ['Notificações em tempo real', 'Priorização automática', 'Filtros por categoria', 'Modo silencioso'],
    complexidade: 'baixa'
  },
  {
    id: 'navegacao',
    nome: 'Navegação Principal',
    descricao: 'Menu de navegação adaptativo com acesso rápido às funcionalidades',
    categoria: 'Navegação',
    icone: 'menu',
    cor: '#607D8B',
    status: 'implementada',
    funcionalidades: ['Menu adaptativo', 'Acesso rápido', 'Perfil de usuário', 'Configurações'],
    complexidade: 'baixa'
  },
  {
    id: 'orcamento',
    nome: 'Controle de Orçamento',
    descricao: 'Sistema de planejamento e controle financeiro doméstico',
    categoria: 'Financeiro',
    icone: 'pie-chart',
    cor: '#795548',
    status: 'em-desenvolvimento',
    funcionalidades: ['Planejamento mensal', 'Controle de gastos', 'Relatórios', 'Alertas'],
    complexidade: 'media'
  },
  {
    id: 'documentos',
    nome: 'Gestão de Documentos',
    descricao: 'Sistema de armazenamento e controle de documentos com compliance',
    categoria: 'Compliance',
    icone: 'file-text',
    cor: '#3F51B5',
    status: 'planejada',
    funcionalidades: ['Upload de documentos', 'Controle de versões', 'Compliance PLD', 'Busca avançada'],
    complexidade: 'alta'
  }
];

const categorias = ['Todas', 'Autenticação', 'Navegação', 'Produtividade', 'Recursos Humanos', 'Financeiro', 'Comunicação', 'Compliance'];

export default function TelasShowcase() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [telaSelecionada, setTelaSelecionada] = useState<TelaInfo | null>(null);

  const telasFiltradas = categoriaSelecionada === 'Todas' 
    ? telas 
    : telas.filter(tela => tela.categoria === categoriaSelecionada);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implementada': return '#4CAF50';
      case 'em-desenvolvimento': return '#FF9800';
      case 'planejada': return '#757575';
      default: return '#757575';
    }
  };

  const getComplexidadeColor = (complexidade: string) => {
    switch (complexidade) {
      case 'baixa': return '#4CAF50';
      case 'media': return '#FF9800';
      case 'alta': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="layers" size={48} color="#1976D2" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Showcase de Telas</Text>
            <Text style={styles.subtitle}>DOM v2 - Sistema de Gestão Doméstica</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <Card icon="check-circle" title="Implementadas" value={telas.filter(t => t.status === 'implementada').length.toString()} color="#4CAF50" small />
          <Card icon="clock" title="Em Desenvolvimento" value={telas.filter(t => t.status === 'em-desenvolvimento').length.toString()} color="#FF9800" small />
          <Card icon="calendar" title="Planejadas" value={telas.filter(t => t.status === 'planejada').length.toString()} color="#757575" small />
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filtrar por Categoria:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {categorias.map(categoria => (
            <TouchableOpacity
              key={categoria}
              style={[
                styles.filterCard,
                categoriaSelecionada === categoria && styles.filterCardActive
              ]}
              onPress={() => setCategoriaSelecionada(categoria)}
            >
              <Text style={[
                styles.filterText,
                categoriaSelecionada === categoria && styles.filterTextActive
              ]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid de Telas */}
      <View style={styles.telasGrid}>
        {telasFiltradas.map(tela => (
          <TouchableOpacity
            key={tela.id}
            style={styles.telaCard}
            onPress={() => setTelaSelecionada(tela)}
          >
            <View style={[styles.telaIcon, { backgroundColor: tela.cor }]}>
              <Icon name={tela.icone} size={32} color="#FFF" />
            </View>
            <View style={styles.telaInfo}>
              <Text style={styles.telaNome}>{tela.nome}</Text>
              <Text style={styles.telaCategoria}>{tela.categoria}</Text>
              <View style={styles.telaStatus}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(tela.status) }]} />
                <Text style={styles.statusText}>
                  {tela.status === 'implementada' ? 'Implementada' :
                   tela.status === 'em-desenvolvimento' ? 'Em Desenvolvimento' : 'Planejada'}
                </Text>
              </View>
            </View>
            <View style={styles.telaComplexidade}>
              <Text style={[styles.complexidadeText, { color: getComplexidadeColor(tela.complexidade) }]}>
                {tela.complexidade.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal de Detalhes */}
      {telaSelecionada && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={[styles.modalIcon, { backgroundColor: telaSelecionada.cor }]}>
                <Icon name={telaSelecionada.icone} size={40} color="#FFF" />
              </View>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>{telaSelecionada.nome}</Text>
                <Text style={styles.modalCategoria}>{telaSelecionada.categoria}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setTelaSelecionada(null)}
              >
                <Icon name="x" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalDescription}>{telaSelecionada.descricao}</Text>
              
              <View style={styles.modalStats}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Status</Text>
                  <View style={styles.statValue}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(telaSelecionada.status) }]} />
                    <Text style={styles.statText}>
                      {telaSelecionada.status === 'implementada' ? 'Implementada' :
                       telaSelecionada.status === 'em-desenvolvimento' ? 'Em Desenvolvimento' : 'Planejada'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Complexidade</Text>
                  <Text style={[styles.statText, { color: getComplexidadeColor(telaSelecionada.complexidade) }]}>
                    {telaSelecionada.complexidade.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.funcionalidadesContainer}>
                <Text style={styles.funcionalidadesTitle}>Funcionalidades Principais:</Text>
                {telaSelecionada.funcionalidades.map((funcionalidade, index) => (
                  <View key={index} style={styles.funcionalidadeItem}>
                    <Icon name="check" size={16} color="#4CAF50" />
                    <Text style={styles.funcionalidadeText}>{funcionalidade}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1976D2' }]}>
                  <Icon name="eye" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>Visualizar Tela</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}>
                  <Icon name="code" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>Ver Código</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          DOM v2 - Sistema de Gestão Doméstica Inteligente
        </Text>
        <Text style={styles.footerSubtext}>
          Desenvolvido com Material Design 3 e foco em acessibilidade
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filtersContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginTop: 8,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  filtersScroll: {
    flexDirection: 'row',
  },
  filterCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterCardActive: {
    backgroundColor: '#1976D2',
  },
  filterText: {
    color: '#757575',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFF',
  },
  telasGrid: {
    padding: 16,
  },
  telaCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  telaIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  telaInfo: {
    flex: 1,
  },
  telaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  telaCategoria: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  telaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#757575',
  },
  telaComplexidade: {
    alignItems: 'flex-end',
  },
  complexidadeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    width: '90%',
    maxHeight: '80%',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  modalCategoria: {
    fontSize: 16,
    color: '#757575',
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    padding: 24,
  },
  modalDescription: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalStats: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  funcionalidadesContainer: {
    marginBottom: 24,
  },
  funcionalidadesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  funcionalidadeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  funcionalidadeText: {
    fontSize: 16,
    color: '#424242',
    marginLeft: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    backgroundColor: '#FFF',
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
}); 