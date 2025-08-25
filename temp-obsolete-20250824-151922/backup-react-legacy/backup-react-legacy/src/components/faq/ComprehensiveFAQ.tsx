/**
 * @fileoverview Comprehensive FAQ - FAQ completo
 * @description Sistema completo de perguntas frequentes
 * @version 2.0.0
 * @generated 2025-08-10T02:36:53.718Z
 */

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity} from 'react-native';

interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

interface FAQCategory {
  name: string;
  icon: string;
  questions: FAQQuestion[];
}

const faqData = {
  "categories": {
    "getting-started": {
      "name": "Primeiros Passos",
      "icon": "🚀",
      "questions": [
        {
          "id": "what-is-dom-v2",
          "question": "O que é o DOM v2?",
          "answer": "O DOM v2 é uma plataforma revolucionária para gestão doméstica que conecta famílias e empregados domésticos através de comunicação em tempo real, gamificação e organização inteligente de tarefas.",
          "tags": [
            "básico",
            "introdução"
          ]
        },
        {
          "id": "how-to-register",
          "question": "Como me cadastro no DOM v2?",
          "answer": "Para se cadastrar: 1) Baixe o app ou acesse nosso site, 2) Clique em \"Cadastrar\", 3) Escolha seu perfil (Empregador, Empregado ou Família), 4) Preencha suas informações básicas, 5) Confirme seu email. Pronto!",
          "tags": [
            "cadastro",
            "registro",
            "conta"
          ]
        },
        {
          "id": "first-steps",
          "question": "Quais são os primeiros passos após o cadastro?",
          "answer": "Após o cadastro, siga nosso onboarding: 1) Complete seu perfil, 2) Adicione membros da família ou empregados, 3) Faça o tour pelas funcionalidades, 4) Crie sua primeira tarefa, 5) Teste o chat familiar. O sistema te guiará em cada passo!",
          "tags": [
            "onboarding",
            "primeiros-passos"
          ]
        }
      ]
    },
    "communication": {
      "name": "Comunicação",
      "icon": "💬",
      "questions": [
        {
          "id": "how-chat-works",
          "question": "Como funciona o chat familiar?",
          "answer": "O chat familiar permite comunicação em tempo real entre todos os membros. Você pode enviar mensagens de texto, áudios, emojis e até mencionar pessoas específicas. Todas as mensagens ficam salvas para consulta posterior.",
          "tags": [
            "chat",
            "comunicação",
            "mensagens"
          ]
        },
        {
          "id": "audio-messages",
          "question": "Como enviar mensagens de áudio?",
          "answer": "Para enviar áudio: 1) Abra o chat, 2) Pressione e segure o botão do microfone, 3) Fale sua mensagem (máximo 60 segundos), 4) Solte o botão para enviar automaticamente. É perfeito para instruções detalhadas!",
          "tags": [
            "áudio",
            "mensagens",
            "microfone"
          ]
        },
        {
          "id": "notifications",
          "question": "Como funcionam as notificações?",
          "answer": "As notificações são inteligentes e categorizadas por prioridade: Urgentes (vermelho), Importantes (amarelo), Informativas (azul). Você pode personalizar quais tipos receber e definir horários silenciosos.",
          "tags": [
            "notificações",
            "alertas",
            "configurações"
          ]
        }
      ]
    },
    "gamification": {
      "name": "Gamificação",
      "icon": "🎮",
      "questions": [
        {
          "id": "points-system",
          "question": "Como funciona o sistema de pontos?",
          "answer": "Você ganha pontos completando tarefas. Cada tarefa tem uma pontuação base, mas você pode ganhar bônus por qualidade (+25%), consistência (+10% por dia consecutivo) e trabalho em equipe (+15%). Pontos podem ser trocados por recompensas!",
          "tags": [
            "pontos",
            "gamificação",
            "recompensas"
          ]
        },
        {
          "id": "badges",
          "question": "O que são badges e como ganhá-las?",
          "answer": "Badges são conquistas especiais por atividades únicas: Mestre da Limpeza (100 tarefas), Streak de Fogo (30 dias consecutivos), Espírito de Equipe (50 ajudas). Cada badge tem raridade: comum, rara, épica ou lendária!",
          "tags": [
            "badges",
            "conquistas",
            "gamificação"
          ]
        },
        {
          "id": "rewards-store",
          "question": "Como funciona a loja de recompensas?",
          "answer": "Use seus pontos para resgatar: Privilégios (escolher filme, passe livre), Tratamentos (sobremesa, pizza), Atividades (noite de jogos, amigo para dormir), Compras (itens até R$ 50). Cada família pode personalizar as recompensas!",
          "tags": [
            "recompensas",
            "loja",
            "pontos"
          ]
        }
      ]
    },
    "technical": {
      "name": "Suporte Técnico",
      "icon": "🔧",
      "questions": [
        {
          "id": "app-not-working",
          "question": "O app não está funcionando, o que fazer?",
          "answer": "Tente estas soluções: 1) Feche e abra o app novamente, 2) Verifique sua conexão com internet, 3) Atualize o app na loja, 4) Reinicie seu celular, 5) Se persistir, entre em contato conosco com detalhes do problema.",
          "tags": [
            "problemas",
            "app",
            "suporte"
          ]
        },
        {
          "id": "sync-issues",
          "question": "Minhas informações não estão sincronizando",
          "answer": "Para resolver problemas de sincronização: 1) Verifique se está conectado à internet, 2) Force a atualização puxando a tela para baixo, 3) Saia e entre novamente na conta, 4) Se não resolver, contate nosso suporte.",
          "tags": [
            "sincronização",
            "dados",
            "conectividade"
          ]
        },
        {
          "id": "account-recovery",
          "question": "Esqueci minha senha, como recuperar?",
          "answer": "Na tela de login, clique em \"Esqueci minha senha\", digite seu email e clique em \"Enviar\". Você receberá um link para criar uma nova senha. Verifique também a pasta de spam. O link expira em 24h.",
          "tags": [
            "senha",
            "recuperação",
            "conta"
          ]
        }
      ]
    }
  },
  "metadata": {
    "lastUpdated": "2025-08-10T02:36:53.716Z",
    "totalQuestions": 12,
    "averageRating": 4.7,
    "language": "pt-BR",
    "version": "2.0.0"
  }
};

export const ComprehensiveFAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [filteredData, setFilteredData] = useState(faqData.categories);
  
  useEffect(() => {
    filterFAQ();
  }, [searchTerm, selectedCategory]);
  
  const filterFAQ = () => {
    let filtered = { ...faqData.categories };
    
    // Filtrar por categoria
    if (selectedCategory) {
      filtered = { [selectedCategory]: filtered[selectedCategory] };
    }
    
    // Filtrar por busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      Object.keys(filtered).forEach(categoryKey => {
        filtered[categoryKey] = {
          ...filtered[categoryKey],
          questions: filtered[categoryKey].questions.filter(q =>
            q.question.toLowerCase().includes(searchLower) ||
            q.answer.toLowerCase().includes(searchLower) ||
            q.tags.some(tag => tag.toLowerCase().includes(searchLower))
          )
        };
        
        // Remover categorias vazias
        if (filtered[categoryKey].questions.length === 0) {
          delete filtered[categoryKey];
        }
      });
    }
    
    setFilteredData(filtered);
  };
  
  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setExpandedQuestions(new Set());
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>❓ Perguntas Frequentes</Text>
        <Text style={styles.subtitle}>
          {faqData.metadata.totalQuestions} perguntas • Avaliação {faqData.metadata.averageRating}⭐
        </Text>
      </View>
      
      {/* Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar perguntas..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {(searchTerm || selectedCategory) && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Categorias */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              !selectedCategory && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryButtonText,
              !selectedCategory && styles.categoryButtonTextActive
            ]}>
              📋 Todas
            </Text>
          </TouchableOpacity>
          
          {Object.entries(faqData.categories).map(([key, category]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.categoryButton,
                selectedCategory === key && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(key)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === key && styles.categoryButtonTextActive
              ]}>
                {category.icon} {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* FAQ */}
      <View style={styles.faqContainer}>
        {Object.keys(filteredData).length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              😔 Nenhuma pergunta encontrada
            </Text>
            <Text style={styles.noResultsSubtext}>
              Tente buscar por outros termos ou entre em contato conosco
            </Text>
          </View>
        ) : (
          Object.entries(filteredData).map(([categoryKey, category]) => (
            <View key={categoryKey} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>
                {category.icon} {category.name}
              </Text>
              
              {category.questions.map((question) => (
                <View key={question.id} style={styles.questionContainer}>
                  <TouchableOpacity
                    style={styles.questionHeader}
                    onPress={() => toggleQuestion(question.id)}
                  >
                    <Text style={styles.questionText}>
                      {question.question}
                    </Text>
                    <Text style={styles.expandIcon}>
                      {expandedQuestions.has(question.id) ? '−' : '+'}
                    </Text>
                  </TouchableOpacity>
                  
                  {expandedQuestions.has(question.id) && (
                    <View style={styles.answerContainer}>
                      <Text style={styles.answerText}>
                        {question.answer}
                      </Text>
                      
                      <View style={styles.tagsContainer}>
                        {question.tags.map((tag, index) => (
                          <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))
        )}
      </View>
      
      {/* Contato */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>
          💬 Não encontrou sua resposta?
        </Text>
        <Text style={styles.contactText}>
          Nossa equipe de suporte está pronta para ajudar!
        </Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>
            📞 Entrar em Contato
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    fontSize: 16,
  },
  
  clearButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6c757d',
    borderRadius: 8,
  },
  
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  categoryButton: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  
  categoryButtonActive: {
    backgroundColor: '#007bff',
  },
  
  categoryButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '600',
  },
  
  categoryButtonTextActive: {
    color: '#fff',
  },
  
  faqContainer: {
    padding: 16,
  },
  
  categorySection: {
    marginBottom: 24,
  },
  
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 12,
  },
  
  expandIcon: {
    fontSize: 20,
    color: '#007bff',
    fontWeight: 'bold',
  },
  
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  
  answerText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 12,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  tag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  tagText: {
    fontSize: 12,
    color: '#6c757d',
  },
  
  noResults: {
    alignItems: 'center',
    padding: 32,
  },
  
  noResultsText: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 8,
  },
  
  noResultsSubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  
  contactSection: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  
  contactText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 16,
  },
  
  contactButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ComprehensiveFAQ;
