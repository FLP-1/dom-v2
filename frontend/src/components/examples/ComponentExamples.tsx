/**
 * @fileoverview Exemplos de uso dos componentes UI
 * @description Demonstração das funcionalidades dos novos componentes
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Table,
  Modal,
  CPFCNPJInput,
  Chart,
  Card,
  CardHeader,
  CardContent,
  Button
} from '../ui';

// Dados de exemplo para a tabela
const tableData = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', cargo: 'Desenvolvedor', salario: 'R$ 5.000' },
  { id: 2, nome: 'Maria Santos', email: 'maria@email.com', cargo: 'Designer', salario: 'R$ 4.500' },
  { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', cargo: 'Analista', salario: 'R$ 6.000' },
  { id: 4, nome: 'Ana Oliveira', email: 'ana@email.com', cargo: 'Gerente', salario: 'R$ 8.000' },
];

const tableColumns = [
  { key: 'nome', title: 'Nome', sortable: true },
  { key: 'email', title: 'E-mail', sortable: true },
  { key: 'cargo', title: 'Cargo', sortable: true },
  { key: 'salario', title: 'Salário', sortable: true, align: 'right' as const },
];

// Dados de exemplo para gráficos
const chartData = [
  { label: 'Vendas', value: 15000, color: '#007bff' },
  { label: 'Marketing', value: 8000, color: '#28a745' },
  { label: 'TI', value: 12000, color: '#ffc107' },
  { label: 'RH', value: 5000, color: '#dc3545' },
];

const ComponentExamples: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cpfCnpjValue, setCpfCnpjValue] = useState('');
  const [isDocumentValid, setIsDocumentValid] = useState(false);
  const [documentType, setDocumentType] = useState<'cpf' | 'cnpj' | null>(null);

  const handleRowClick = (row: any, index: number) => {
    console.log('Linha clicada:', row, 'Índice:', index);
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    console.log('Ordenar por:', column, 'Direção:', direction);
  };

  const handleValidationChange = (isValid: boolean, type: 'cpf' | 'cnpj' | null) => {
    setIsDocumentValid(isValid);
    setDocumentType(type);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exemplos de Componentes UI</Text>
      
      {/* Exemplo de Tabela */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.cardTitle}>Tabela de Funcionários</Text>
        </CardHeader>
        <CardContent>
          <Table
            data={tableData}
            columns={tableColumns}
            onRowClick={handleRowClick}
            onSort={handleSort}
            maxHeight={300}
          />
        </CardContent>
      </Card>

      {/* Exemplo de Gráfico */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.cardTitle}>Gráfico de Orçamentos</Text>
        </CardHeader>
        <CardContent>
          <Chart
            data={chartData}
            type="bar"
            title="Orçamentos por Departamento"
            height={250}
            showValues={true}
            showLabels={true}
          />
        </CardContent>
      </Card>

      {/* Exemplo de CPF/CNPJ Input */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.cardTitle}>Validação de CPF/CNPJ</Text>
        </CardHeader>
        <CardContent>
          <CPFCNPJInput
            value={cpfCnpjValue}
            onChangeText={setCpfCnpjValue}
            onValidationChange={handleValidationChange}
            label="CPF ou CNPJ"
            placeholder="Digite o CPF ou CNPJ"
            required={true}
          />
          {cpfCnpjValue && (
            <View style={styles.validationInfo}>
              <Text style={styles.validationText}>
                Tipo: {documentType ? documentType.toUpperCase() : 'Indefinido'}
              </Text>
              <Text style={[
                styles.validationText,
                { color: isDocumentValid ? '#28a745' : '#dc3545' }
              ]}>
                Status: {isDocumentValid ? 'Válido' : 'Inválido'}
              </Text>
            </View>
          )}
        </CardContent>
      </Card>

      {/* Exemplo de Modal */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.cardTitle}>Modal de Exemplo</Text>
        </CardHeader>
        <CardContent>
          <Button
            title="Abrir Modal"
            onPress={() => setModalVisible(true)}
            variant="primary"
          />
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Modal de Exemplo"
        size="medium"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Este é um exemplo de modal usando o componente Modal.
          </Text>
          <Text style={styles.modalText}>
            O modal pode conter qualquer conteúdo e é totalmente customizável.
          </Text>
          
          <View style={styles.modalActions}>
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              variant="secondary"
              style={styles.modalButton}
            />
            <Button
              title="Confirmar"
              onPress={() => setModalVisible(false)}
              variant="primary"
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>

      {/* Exemplo de Gráfico de Pizza */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.cardTitle}>Distribuição de Vendas</Text>
        </CardHeader>
        <CardContent>
          <Chart
            data={chartData}
            type="pie"
            title="Vendas por Departamento"
            height={300}
            showValues={true}
            showLegend={true}
            showPercentage={true}
          />
        </CardContent>
      </Card>
    </ScrollView>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  validationInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
  },
  validationText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  modalContent: {
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 12,
    lineHeight: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    minWidth: 100,
  },
});

export default ComponentExamples; 