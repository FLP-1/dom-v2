import React, { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import IntegrationService, { 
  StripePayment,
  ViaCEPResponse 
} from '../services/integrations';

interface PaymentIntegrationsScreenProps {
  onNavigateBack: () => void;
}

export const PaymentIntegrationsScreen: React.FC<PaymentIntegrationsScreenProps> = ({ onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState<'payments' | 'history' | 'pix' | 'boleto'>('payments');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'boleto' | 'card' | 'transfer'>('pix');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<ViaCEPResponse | null>(null);

  const integrationService = IntegrationService.getInstance();

  // Dados mockados
  const mockEmployees = [
    { id: '1', name: 'Maria Silva', position: 'Empregada Doméstica', salary: 2500 },
    { id: '2', name: 'José Santos', position: 'Jardineiro', salary: 1800 }
  ];

  const [payments, setPayments] = useState<StripePayment[]>(
    integrationService.getMockStripePayments()
  );

  const [pixCode, setPixCode] = useState<string>('');
  const [boletoCode, setBoletoCode] = useState<string>('');

  const handleCreatePayment = async () => {
    if (!selectedEmployee || !paymentAmount) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const amount = parseFloat(paymentAmount) * 100; // Converter para centavos
      const description = paymentDescription || `Pagamento salário ${selectedEmployee.name}`;

      // Simular criação de payment intent
      const payment: StripePayment = {
        id: Date.now().toString(),
        amount,
        currency: 'brl',
        status: 'pending',
        paymentMethod,
        description,
        paymentIntentId: `pi_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setPayments(prev => [...prev, payment]);
      setShowPaymentModal(false);
      
      // Gerar códigos de pagamento
      if (paymentMethod === 'pix') {
        setPixCode(`00020126580014br.gov.bcb.pix0136${Date.now()}520400005303986540${(amount/100).toFixed(2)}5802BR5913Pagamento DOM6008Sao Paulo62070503***6304${Date.now().toString().slice(-4)}`);
        setShowPixModal(true);
      } else if (paymentMethod === 'boleto') {
        setBoletoCode(`23793.38128 60047.017804 99000.063305 9 844100260000${amount}`);
        Alert.alert('Boleto Gerado', `Código: ${boletoCode}\nVencimento: ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}`);
      }

      Alert.alert('Sucesso', 'Pagamento criado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = async (paymentId: string) => {
    setLoading(true);
    try {
      // Simular processamento de pagamento
      setPayments(prev => prev.map(p => 
        p.id === paymentId 
          ? { ...p, status: 'succeeded', updatedAt: new Date().toISOString() }
          : p
      ));
      Alert.alert('Sucesso', 'Pagamento processado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCEP = async () => {
    if (!cep || cep.length < 8) return;

    setLoading(true);
    try {
      const addressData = await integrationService.getAddressByCEP(cep);
      setAddress(addressData);
    } catch (error) {
      Alert.alert('Erro', 'CEP não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentsTab = () => (
    <View>
      <View style={styles.employeeSelector}>
        <Text style={styles.sectionTitle}>Selecionar Funcionário</Text>
        {mockEmployees.map((employee) => (
          <Pressable
            key={employee.id}
            style={[
              styles.employeeOption,
              selectedEmployee?.id === employee.id && styles.employeeOptionSelected
            ]}
            onPress={() => setSelectedEmployee(employee)}
          >
            <Text style={[
              styles.employeeOptionText,
              selectedEmployee?.id === employee.id && styles.employeeOptionTextSelected
            ]}>
              {employee.name} - {employee.position} (R$ {employee.salary.toLocaleString('pt-BR')})
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedEmployee && (
        <View style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Criar Pagamento - {selectedEmployee.name}</Text>
          <Pressable
            style={styles.createPaymentButton}
            onPress={() => setShowPaymentModal(true)}
          >
            <Text style={styles.createPaymentButtonText}>💳 Criar Pagamento</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.paymentsList}>
        <Text style={styles.sectionTitle}>Pagamentos Recentes</Text>
        {payments.map((payment) => (
          <View key={payment.id} style={styles.paymentItem}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentDescription}>{payment.description}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getPaymentStatusColor(payment.status) }
              ]}>
                <Text style={styles.statusText}>
                  {getPaymentStatusLabel(payment.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentAmount}>
                R$ {(payment.amount / 100).toLocaleString('pt-BR')}
              </Text>
              <Text style={styles.paymentMethod}>
                {getPaymentMethodLabel(payment.paymentMethod)}
              </Text>
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentDate}>
                {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
              </Text>
              <Text style={styles.paymentId}>
                ID: {payment.paymentIntentId}
              </Text>
            </View>

            {payment.status === 'pending' && (
              <View style={styles.paymentActions}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleProcessPayment(payment.id)}
                >
                  <Text style={styles.actionButtonText}>✅ Processar</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, styles.cancelButton]}
                >
                  <Text style={styles.actionButtonText}>❌ Cancelar</Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Histórico de Pagamentos</Text>
      
      <View style={styles.historyStats}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Pago</Text>
          <Text style={styles.statValue}>
            R$ {payments
              .filter(p => p.status === 'succeeded')
              .reduce((sum, p) => sum + p.amount, 0) / 100
              .toLocaleString('pt-BR')}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pagamentos</Text>
          <Text style={styles.statValue}>
            {payments.filter(p => p.status === 'succeeded').length}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pendentes</Text>
          <Text style={styles.statValue}>
            {payments.filter(p => p.status === 'pending').length}
          </Text>
        </View>
      </View>

      {payments.map((payment) => (
        <View key={payment.id} style={styles.historyItem}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyDescription}>{payment.description}</Text>
            <Text style={styles.historyAmount}>
              R$ {(payment.amount / 100).toLocaleString('pt-BR')}
            </Text>
          </View>
          
          <View style={styles.historyDetails}>
            <Text style={styles.historyDate}>
              {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={styles.historyMethod}>
              {getPaymentMethodLabel(payment.paymentMethod)}
            </Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getPaymentStatusColor(payment.status) }
            ]}>
              <Text style={styles.statusText}>
                {getPaymentStatusLabel(payment.status)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPixTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Pagamentos PIX</Text>
      
      <View style={styles.pixCard}>
        <Text style={styles.pixTitle}>📱 PIX Instantâneo</Text>
        <Text style={styles.pixDescription}>
          Receba pagamentos instantaneamente via PIX
        </Text>
        
        <View style={styles.pixStats}>
          <View style={styles.pixStat}>
            <Text style={styles.pixStatLabel}>Processados</Text>
            <Text style={styles.pixStatValue}>
              {payments.filter(p => p.paymentMethod === 'pix' && p.status === 'succeeded').length}
            </Text>
          </View>
          <View style={styles.pixStat}>
            <Text style={styles.pixStatLabel}>Total</Text>
            <Text style={styles.pixStatValue}>
              R$ {payments
                .filter(p => p.paymentMethod === 'pix' && p.status === 'succeeded')
                .reduce((sum, p) => sum + p.amount, 0) / 100
                .toLocaleString('pt-BR')}
            </Text>
          </View>
        </View>
      </View>

      {pixCode && (
        <View style={styles.qrCodeCard}>
          <Text style={styles.qrCodeTitle}>🔍 Código PIX Gerado</Text>
          <View style={styles.qrCodePlaceholder}>
            <Text style={styles.qrCodeText}>📱 QR Code PIX</Text>
            <Text style={styles.qrCodeSubtext}>Escaneie com seu app bancário</Text>
          </View>
          <Text style={styles.pixCodeText}>{pixCode}</Text>
          <Pressable style={styles.copyButton}>
            <Text style={styles.copyButtonText}>📋 Copiar Código</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  const renderBoletoTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Boletos Bancários</Text>
      
      <View style={styles.boletoCard}>
        <Text style={styles.boletoTitle}>🏦 Boleto Bancário</Text>
        <Text style={styles.boletoDescription}>
          Gere boletos para pagamentos com vencimento
        </Text>
        
        <View style={styles.boletoStats}>
          <View style={styles.boletoStat}>
            <Text style={styles.boletoStatLabel}>Gerados</Text>
            <Text style={styles.boletoStatValue}>
              {payments.filter(p => p.paymentMethod === 'boleto').length}
            </Text>
          </View>
          <View style={styles.boletoStat}>
            <Text style={styles.boletoStatLabel}>Pagos</Text>
            <Text style={styles.boletoStatValue}>
              {payments.filter(p => p.paymentMethod === 'boleto' && p.status === 'succeeded').length}
            </Text>
          </View>
        </View>
      </View>

      {boletoCode && (
        <View style={styles.boletoCodeCard}>
          <Text style={styles.boletoCodeTitle}>📄 Código do Boleto</Text>
          <View style={styles.boletoCodePlaceholder}>
            <Text style={styles.boletoCodeText}>🏦 Código de Barras</Text>
            <Text style={styles.boletoCodeSubtext}>Copie e cole no seu app bancário</Text>
          </View>
          <Text style={styles.boletoCodeValue}>{boletoCode}</Text>
          <Pressable style={styles.copyButton}>
            <Text style={styles.copyButtonText}>📋 Copiar Código</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.cepCard}>
        <Text style={styles.cepTitle}>📍 Buscar Endereço</Text>
        <View style={styles.cepInput}>
          <TextInput
            style={styles.input}
            value={cep}
            onChangeText={setCep}
            placeholder="Digite o CEP"
            keyboardType="numeric"
            maxLength={9}
          />
          <Pressable
            style={styles.searchButton}
            onPress={handleSearchCEP}
            disabled={loading}
          >
            <Text style={styles.searchButtonText}>🔍</Text>
          </Pressable>
        </View>
        {address && (
          <View style={styles.addressResult}>
            <Text style={styles.addressText}>
              {address.logradouro}, {address.bairro}
            </Text>
            <Text style={styles.addressText}>
              {address.localidade} - {address.uf}
            </Text>
            <Text style={styles.addressText}>
              CEP: {address.cep}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      pending: '#FF9800',
      processing: '#2196F3',
      succeeded: '#4CAF50',
      failed: '#F44336',
      canceled: '#9E9E9E'
    };
    return colors[status as keyof typeof colors] || '#666';
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendente',
      processing: 'Processando',
      succeeded: 'Pago',
      failed: 'Falhou',
      canceled: 'Cancelado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      pix: 'PIX',
      boleto: 'Boleto',
      card: 'Cartão',
      transfer: 'Transferência'
    };
    return labels[method as keyof typeof labels] || method;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Integrações de Pagamento</Text>
        <View style={styles.headerActions}>
          {loading && <ActivityIndicator size="small" color="#007AFF" />}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'payments' && styles.activeTab]}
          onPress={() => setActiveTab('payments')}
        >
          <Text style={[styles.tabText, activeTab === 'payments' && styles.activeTabText]}>
            💳 Pagamentos
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            📊 Histórico
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'pix' && styles.activeTab]}
          onPress={() => setActiveTab('pix')}
        >
          <Text style={[styles.tabText, activeTab === 'pix' && styles.activeTabText]}>
            📱 PIX
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'boleto' && styles.activeTab]}
          onPress={() => setActiveTab('boleto')}
        >
          <Text style={[styles.tabText, activeTab === 'boleto' && styles.activeTabText]}>
            🏦 Boleto
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'payments' && renderPaymentsTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'pix' && renderPixTab()}
        {activeTab === 'boleto' && renderBoletoTab()}
      </ScrollView>

      {/* Modal de Criação de Pagamento */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Pagamento</Text>

            <Text style={styles.inputLabel}>Valor (R$)</Text>
            <TextInput
              style={styles.input}
              value={paymentAmount}
              onChangeText={setPaymentAmount}
              placeholder="0,00"
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={styles.input}
              value={paymentDescription}
              onChangeText={setPaymentDescription}
              placeholder="Descrição do pagamento"
            />

            <Text style={styles.inputLabel}>Método de Pagamento</Text>
            <View style={styles.paymentMethodSelector}>
              {(['pix', 'boleto', 'card', 'transfer'] as const).map((method) => (
                <Pressable
                  key={method}
                  style={[
                    styles.paymentMethodOption,
                    paymentMethod === method && styles.paymentMethodOptionSelected
                  ]}
                  onPress={() => setPaymentMethod(method)}
                >
                  <Text style={[
                    styles.paymentMethodOptionText,
                    paymentMethod === method && styles.paymentMethodOptionTextSelected
                  ]}>
                    {getPaymentMethodLabel(method)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowPaymentModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleCreatePayment}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>Criar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal PIX */}
      <Modal
        visible={showPixModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pagamento PIX</Text>
            
            <View style={styles.qrCodePlaceholder}>
              <Text style={styles.qrCodeText}>📱 QR Code PIX</Text>
              <Text style={styles.qrCodeSubtext}>Escaneie com seu app bancário</Text>
            </View>
            
            <Text style={styles.pixCodeText}>{pixCode}</Text>
            
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => setShowPixModal(false)}
              >
                <Text style={styles.saveButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  employeeSelector: {
    marginBottom: 20,
  },
  employeeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
  },
  employeeOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  employeeOptionText: {
    fontSize: 14,
    color: '#666',
  },
  employeeOptionTextSelected: {
    color: '#fff',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createPaymentButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createPaymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentsList: {
    marginBottom: 20,
  },
  paymentItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#666',
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentDate: {
    fontSize: 12,
    color: '#999',
  },
  paymentId: {
    fontSize: 12,
    color: '#999',
  },
  paymentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  historyStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyMethod: {
    fontSize: 12,
    color: '#666',
  },
  pixCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pixTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  pixDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  pixStats: {
    flexDirection: 'row',
    gap: 16,
  },
  pixStat: {
    flex: 1,
    alignItems: 'center',
  },
  pixStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  pixStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qrCodeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrCodeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  qrCodePlaceholder: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    marginBottom: 12,
  },
  qrCodeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  qrCodeSubtext: {
    fontSize: 12,
    color: '#999',
  },
  pixCodeText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  boletoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boletoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  boletoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  boletoStats: {
    flexDirection: 'row',
    gap: 16,
  },
  boletoStat: {
    flex: 1,
    alignItems: 'center',
  },
  boletoStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  boletoStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  boletoCodeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boletoCodeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  boletoCodePlaceholder: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    marginBottom: 12,
  },
  boletoCodeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  boletoCodeSubtext: {
    fontSize: 12,
    color: '#999',
  },
  boletoCodeValue: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  cepCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  cepInput: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addressResult: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  paymentMethodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  paymentMethodOption: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  paymentMethodOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  paymentMethodOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  paymentMethodOptionTextSelected: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 