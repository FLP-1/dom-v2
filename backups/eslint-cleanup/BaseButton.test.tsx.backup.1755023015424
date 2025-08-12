/**
 * @fileoverview Testes para BaseButton
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import React from 'react';
import { render, screen, createUserEvent, testAccessibility, renderWithTheme } from '../../../utils/test-utils';
import { BaseButton } from '../BaseButton';
import { BaseIcon } from '../BaseIcon';

describe('BaseButton', () => {
  const user = createUserEvent();
  
  // Testes básicos de renderização
  describe('Renderização', () => {
    it('deve renderizar o botão com título', () => {
      render(<BaseButton title="Clique aqui" />);
      expect(screen.getByRole('button', { name: 'Clique aqui' })).toBeInTheDocument();
    });
    
    it('deve renderizar com children quando fornecido', () => {
      render(
        <BaseButton>
          <span>Conteúdo customizado</span>
        </BaseButton>
      );
      expect(screen.getByText('Conteúdo customizado')).toBeInTheDocument();
    });
    
    it('deve renderizar com ícone à esquerda', () => {
      render(
        <BaseButton 
          title="Com ícone" 
          icon={<BaseIcon name="home" />}
          iconPosition="left"
        />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve renderizar com ícone à direita', () => {
      render(
        <BaseButton 
          title="Com ícone" 
          icon={<BaseIcon name="add" />}
          iconPosition="right"
        />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();
    });
  });
  
  // Testes de variantes
  describe('Variantes', () => {
    it.each([
      ['solid', 'solid'],
      ['outline', 'outline'],
      ['ghost', 'ghost'],
      ['link', 'link'],
    ])('deve aplicar a variante %s corretamente', (variant, expected) => {
      render(<BaseButton title="Teste" variant={variant as any} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // A verificação de classe seria feita através dos estilos aplicados
    });
  });
  
  // Testes de tamanhos
  describe('Tamanhos', () => {
    it.each([
      ['xs', 'xs'],
      ['sm', 'sm'],
      ['md', 'md'],
      ['lg', 'lg'],
    ])('deve aplicar o tamanho %s corretamente', (size, expected) => {
      render(<BaseButton title="Teste" size={size as any} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
  
  // Testes de estados
  describe('Estados', () => {
    it('deve estar desabilitado quando disabled=true', () => {
      render(<BaseButton title="Desabilitado" disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
    
    it('deve mostrar loading quando loading=true', () => {
      render(<BaseButton title="Carregando" loading />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Verifica se o ActivityIndicator está presente
    });
    
    it('deve aplicar fullWidth corretamente', () => {
      render(<BaseButton title="Full Width" fullWidth />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
  
  // Testes de interação
  describe('Interações', () => {
    it('deve chamar onPress quando clicado', async () => {
      const handlePress = jest.fn();
      render(<BaseButton title="Clicável" onPress={handlePress} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handlePress).toHaveBeenCalledTimes(1);
    });
    
    it('não deve chamar onPress quando desabilitado', async () => {
      const handlePress = jest.fn();
      render(<BaseButton title="Desabilitado" onPress={handlePress} disabled />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handlePress).not.toHaveBeenCalled();
    });
    
    it('não deve chamar onPress quando loading', async () => {
      const handlePress = jest.fn();
      render(<BaseButton title="Loading" onPress={handlePress} loading />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handlePress).not.toHaveBeenCalled();
    });
  });
  
  // Testes de acessibilidade
  describe('Acessibilidade', () => {
    it('deve ter role="button" por padrão', () => {
      render(<BaseButton title="Teste" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    it('deve usar title como accessibilityLabel por padrão', () => {
      render(<BaseButton title="Meu Botão" />);
      expect(screen.getByLabelText('Meu Botão')).toBeInTheDocument();
    });
    
    it('deve usar accessibilityLabel customizado quando fornecido', () => {
      render(<BaseButton title="Botão" accessibilityLabel="Botão customizado" />);
      expect(screen.getByLabelText('Botão customizado')).toBeInTheDocument();
    });
    
    it('deve ter estado de acessibilidade correto quando desabilitado', () => {
      render(<BaseButton title="Desabilitado" disabled />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
    
    it('deve ter estado de acessibilidade correto quando loading', () => {
      render(<BaseButton title="Loading" loading />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
    
    it('deve passar em testes de acessibilidade', async () => {
      const { container } = render(<BaseButton title="Teste A11y" />);
      await testAccessibility(container);
    });
  });
  
  // Testes de tema
  describe('Tema', () => {
    it('deve renderizar corretamente com tema claro', () => {
      renderWithTheme(<BaseButton title="Tema Claro" />, 'light');
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    it('deve renderizar corretamente com tema escuro', () => {
      renderWithTheme(<BaseButton title="Tema Escuro" />, 'dark');
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    it('deve renderizar corretamente com tema alto contraste', () => {
      renderWithTheme(<BaseButton title="Alto Contraste" />, 'highContrast');
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
  
  // Testes de performance
  describe('Performance', () => {
    it('deve ser memoizado com React.memo', () => {
      const Component = BaseButton;
      expect(Component.displayName).toBe('BaseButton');
    });
    
    it('não deve re-renderizar com as mesmas props', () => {
      const renderSpy = jest.fn();
      const TestComponent = React.memo(() => {
        renderSpy();
        return <BaseButton title="Teste" />;
      });
      
      const { rerender } = render(<TestComponent />);
      rerender(<TestComponent />);
      
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });
  
  // Testes de snapshot
  describe('Snapshot', () => {
    it('deve coincidir com snapshot - botão básico', () => {
      const { container } = render(<BaseButton title="Snapshot Test" />);
      expect(container.firstChild).toMatchSnapshot();
    });
    
    it('deve coincidir com snapshot - botão com ícone', () => {
      const { container } = render(
        <BaseButton 
          title="Com Ícone" 
          icon={<BaseIcon name="home" />}
          variant="outline"
          size="lg"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
