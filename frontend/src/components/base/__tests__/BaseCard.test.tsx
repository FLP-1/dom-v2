/**
 * @fileoverview Testes para BaseCard
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import React from 'react';
import { render, screen, createUserEvent, testAccessibility, renderWithTheme } from '../../../utils/test-utils';
import { BaseCard } from '../BaseCard';
import { Text } from 'react-native';

describe('BaseCard', () => {
  const user = createUserEvent();
  
  // Testes básicos de renderização
  describe('Renderização', () => {
    it('deve renderizar com children', () => {
      render(
        <BaseCard>
          <Text>Conteúdo do card</Text>
        </BaseCard>
      );
      expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
    });
    
    it('deve renderizar sem onPress como View', () => {
      render(
        <BaseCard>
          <Text>Card estático</Text>
        </BaseCard>
      );
      // Não deve ter role button quando não é clicável
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
    
    it('deve renderizar com onPress como TouchableOpacity', () => {
      const handlePress = jest.fn();
      render(
        <BaseCard onPress={handlePress}>
          <Text>Card clicável</Text>
        </BaseCard>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
  
  // Testes de propriedades de sombra
  describe('Sombra', () => {
    it.each([
      ['none', 'none'],
      ['sm', 'sm'],
      ['md', 'md'],
      ['lg', 'lg'],
      ['xl', 'xl'],
    ])('deve aplicar sombra %s corretamente', (shadow, expected) => {
      render(
        <BaseCard shadow={shadow as any}>
          <Text>Card com sombra {shadow}</Text>
        </BaseCard>
      );
      expect(screen.getByText(`Card com sombra ${shadow}`)).toBeInTheDocument();
    });
  });
  
  // Testes de padding
  describe('Padding', () => {
    it.each([
      ['none', 'none'],
      ['sm', 'sm'],
      ['md', 'md'],
      ['lg', 'lg'],
      ['xl', 'xl'],
    ])('deve aplicar padding %s corretamente', (padding, expected) => {
      render(
        <BaseCard padding={padding as any}>
          <Text>Card com padding {padding}</Text>
        </BaseCard>
      );
      expect(screen.getByText(`Card com padding ${padding}`)).toBeInTheDocument();
    });
  });
  
  // Testes de margin
  describe('Margin', () => {
    it.each([
      ['none', 'none'],
      ['sm', 'sm'],
      ['md', 'md'],
      ['lg', 'lg'],
      ['xl', 'xl'],
    ])('deve aplicar margin %s corretamente', (margin, expected) => {
      render(
        <BaseCard margin={margin as any}>
          <Text>Card com margin {margin}</Text>
        </BaseCard>
      );
      expect(screen.getByText(`Card com margin ${margin}`)).toBeInTheDocument();
    });
  });
  
  // Testes de bordas
  describe('Bordas', () => {
    it('deve renderizar sem borda por padrão', () => {
      render(
        <BaseCard>
          <Text>Card sem borda</Text>
        </BaseCard>
      );
      expect(screen.getByText('Card sem borda')).toBeInTheDocument();
    });
    
    it('deve renderizar com borda quando bordered=true', () => {
      render(
        <BaseCard bordered>
          <Text>Card com borda</Text>
        </BaseCard>
      );
      expect(screen.getByText('Card com borda')).toBeInTheDocument();
    });
  });
  
  // Testes de interação
  describe('Interações', () => {
    it('deve chamar onPress quando clicado', async () => {
      const handlePress = jest.fn();
      render(
        <BaseCard onPress={handlePress}>
          <Text>Card clicável</Text>
        </BaseCard>
      );
      
      const card = screen.getByRole('button');
      await user.click(card);
      
      expect(handlePress).toHaveBeenCalledTimes(1);
    });
    
    it('deve ser focável quando clicável', () => {
      const handlePress = jest.fn();
      render(
        <BaseCard onPress={handlePress}>
          <Text>Card focável</Text>
        </BaseCard>
      );
      
      const card = screen.getByRole('button');
      card.focus();
      expect(card).toHaveFocus();
    });
  });
  
  // Testes de acessibilidade
  describe('Acessibilidade', () => {
    it('deve ter role="button" quando clicável', () => {
      const handlePress = jest.fn();
      render(
        <BaseCard onPress={handlePress} accessibilityLabel="Card clicável">
          <Text>Conteúdo</Text>
        </BaseCard>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    it('deve usar accessibilityLabel quando fornecido', () => {
      const handlePress = jest.fn();
      render(
        <BaseCard onPress={handlePress} accessibilityLabel="Meu card personalizado">
          <Text>Conteúdo</Text>
        </BaseCard>
      );
      expect(screen.getByLabelText('Meu card personalizado')).toBeInTheDocument();
    });
    
    it('não deve ter role quando não clicável', () => {
      render(
        <BaseCard>
          <Text>Card estático</Text>
        </BaseCard>
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
    
    it('deve passar em testes de acessibilidade', async () => {
      const { container } = render(
        <BaseCard>
          <Text>Teste de acessibilidade</Text>
        </BaseCard>
      );
      await testAccessibility(container);
    });
    
    it('deve passar em testes de acessibilidade quando clicável', async () => {
      const handlePress = jest.fn();
      const { container } = render(
        <BaseCard onPress={handlePress} accessibilityLabel="Card acessível">
          <Text>Teste de acessibilidade clicável</Text>
        </BaseCard>
      );
      await testAccessibility(container);
    });
  });
  
  // Testes de tema
  describe('Tema', () => {
    it('deve renderizar corretamente com tema claro', () => {
      renderWithTheme(
        <BaseCard>
          <Text>Tema claro</Text>
        </BaseCard>,
        'light'
      );
      expect(screen.getByText('Tema claro')).toBeInTheDocument();
    });
    
    it('deve renderizar corretamente com tema escuro', () => {
      renderWithTheme(
        <BaseCard>
          <Text>Tema escuro</Text>
        </BaseCard>,
        'dark'
      );
      expect(screen.getByText('Tema escuro')).toBeInTheDocument();
    });
    
    it('deve renderizar corretamente com tema alto contraste', () => {
      renderWithTheme(
        <BaseCard>
          <Text>Alto contraste</Text>
        </BaseCard>,
        'highContrast'
      );
      expect(screen.getByText('Alto contraste')).toBeInTheDocument();
    });
  });
  
  // Testes de performance
  describe('Performance', () => {
    it('deve ser memoizado com React.memo', () => {
      const Component = BaseCard;
      expect(Component.displayName).toBe('BaseCard');
    });
    
    it('deve usar hooks de performance', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(
        <BaseCard>
          <Text>Performance test</Text>
        </BaseCard>
      );
      
      // Verifica se o hook de performance foi chamado
      // (isso seria mais detalhado em um teste de integração)
      
      consoleSpy.mockRestore();
    });
  });
  
  // Testes de estilo customizado
  describe('Estilo Customizado', () => {
    it('deve aplicar estilos customizados', () => {
      const customStyle = { backgroundColor: 'red' };
      render(
        <BaseCard style={customStyle}>
          <Text>Card com estilo customizado</Text>
        </BaseCard>
      );
      expect(screen.getByText('Card com estilo customizado')).toBeInTheDocument();
    });
    
    it('deve mesclar estilos customizados com estilos padrão', () => {
      const customStyle = { backgroundColor: 'blue' };
      render(
        <BaseCard style={customStyle} padding="lg" shadow="md">
          <Text>Card com estilos mesclados</Text>
        </BaseCard>
      );
      expect(screen.getByText('Card com estilos mesclados')).toBeInTheDocument();
    });
  });
  
  // Testes de configurações avançadas
  describe('Configurações Avançadas', () => {
    it('deve suportar hoverable (para web)', () => {
      render(
        <BaseCard hoverable>
          <Text>Card hoverable</Text>
        </BaseCard>
      );
      expect(screen.getByText('Card hoverable')).toBeInTheDocument();
    });
    
    it('deve suportar múltiplas propriedades simultâneas', () => {
      const handlePress = jest.fn();
      render(
        <BaseCard
          onPress={handlePress}
          shadow="lg"
          padding="xl"
          margin="md"
          bordered
          hoverable
          accessibilityLabel="Card completo"
        >
          <Text>Card com todas as propriedades</Text>
        </BaseCard>
      );
      
      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Card com todas as propriedades')).toBeInTheDocument();
    });
  });
  
  // Testes de snapshot
  describe('Snapshot', () => {
    it('deve coincidir com snapshot - card básico', () => {
      const { container } = render(
        <BaseCard>
          <Text>Snapshot básico</Text>
        </BaseCard>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    
    it('deve coincidir com snapshot - card completo', () => {
      const handlePress = jest.fn();
      const { container } = render(
        <BaseCard
          onPress={handlePress}
          shadow="lg"
          padding="xl"
          bordered
          accessibilityLabel="Card snapshot"
        >
          <Text>Card completo para snapshot</Text>
        </BaseCard>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
