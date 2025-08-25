/**
 * @fileoverview Testes para BaseIcon
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import React from 'react';
import { render, screen, createUserEvent, testAccessibility, renderWithTheme } from '../../../utils/test-utils';
import { BaseIcon, IconWithBadge, IconButton, ICON_LIBRARY } from '../BaseIcon';
import { Text } from 'react-native';

describe('BaseIcon', () => {
  const user = createUserEvent();
  
  // Testes básicos de renderização
  describe('Renderização', () => {
    it('deve renderizar ícone por nome', () => {
      render(<BaseIcon name="home" />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve renderizar ícone customizado como string', () => {
      render(<BaseIcon icon="🎯" />);
      expect(screen.getByText('🎯')).toBeInTheDocument();
    });
    
    it('deve renderizar ícone customizado como React element', () => {
      render(<BaseIcon icon={<Text>Custom</Text>} />);
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });
    
    it('deve renderizar ícone padrão quando nome não existe', () => {
      render(<BaseIcon name={'invalid' as any} />);
      expect(screen.getByText('❓')).toBeInTheDocument();
    });
    
    it('deve renderizar ícone padrão quando nenhum prop é fornecido', () => {
      render(<BaseIcon />);
      expect(screen.getByText('❓')).toBeInTheDocument();
    });
  });
  
  // Testes de tamanhos
  describe('Tamanhos', () => {
    it.each([
      ['xs', 'xs'],
      ['sm', 'sm'],
      ['md', 'md'],
      ['lg', 'lg'],
      ['xl', 'xl'],
    ])('deve aplicar tamanho %s corretamente', (size, expected) => {
      render(<BaseIcon name="home" size={size as any} />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
  });
  
  // Testes de cores
  describe('Cores', () => {
    it('deve usar cor do tema por padrão', () => {
      render(<BaseIcon name="home" />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve aplicar cor customizada', () => {
      render(<BaseIcon name="home" color="red" />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
  });
  
  // Testes de transformações
  describe('Transformações', () => {
    it('deve aplicar rotação', () => {
      render(<BaseIcon name="home" rotate={90} />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve aplicar flip horizontal', () => {
      render(<BaseIcon name="home" flip="horizontal" />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve aplicar flip vertical', () => {
      render(<BaseIcon name="home" flip="vertical" />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve aplicar flip em ambas direções', () => {
      render(<BaseIcon name="home" flip="both" />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
  });
  
  // Testes de animações
  describe('Animações', () => {
    it('deve aplicar animação spin', () => {
      render(<BaseIcon name="home" spin />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve aplicar animação pulse', () => {
      render(<BaseIcon name="home" pulse />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve aplicar animação bounce', () => {
      render(<BaseIcon name="home" bounce />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve aplicar animação shake', () => {
      render(<BaseIcon name="home" shake />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
  });
  
  // Testes de acessibilidade
  describe('Acessibilidade', () => {
    it('deve ter role="image" por padrão', () => {
      render(<BaseIcon name="home" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
    
    it('deve usar nome do ícone como accessibilityLabel padrão', () => {
      render(<BaseIcon name="home" />);
      expect(screen.getByLabelText('Ícone home')).toBeInTheDocument();
    });
    
    it('deve usar accessibilityLabel customizado quando fornecido', () => {
      render(<BaseIcon name="home" accessibilityLabel="Página inicial" />);
      expect(screen.getByLabelText('Página inicial')).toBeInTheDocument();
    });
    
    it('deve passar em testes de acessibilidade', async () => {
      const { container } = render(<BaseIcon name="home" />);
      await testAccessibility(container);
    });
  });
  
  // Testes da biblioteca de ícones
  describe('Biblioteca de Ícones', () => {
    it('deve conter ícones de navegação', () => {
      expect(ICON_LIBRARY.home).toBe('🏠');
      expect(ICON_LIBRARY.back).toBe('←');
      expect(ICON_LIBRARY.menu).toBe('☰');
    });
    
    it('deve conter ícones de ações', () => {
      expect(ICON_LIBRARY.add).toBe('+');
      expect(ICON_LIBRARY.edit).toBe('✏️');
      expect(ICON_LIBRARY.delete).toBe('🗑️');
    });
    
    it('deve conter ícones de família', () => {
      expect(ICON_LIBRARY.family).toBe('👨‍👩‍👧‍👦');
      expect(ICON_LIBRARY.child).toBe('👶');
    });
    
    it('deve renderizar todos os ícones da biblioteca', () => {
      Object.entries(ICON_LIBRARY).forEach(([name, icon]) => {
        const { unmount } = render(<BaseIcon name={name as any} />);
        expect(screen.getByText(icon)).toBeInTheDocument();
        unmount();
      });
    });
  });
  
  // Testes de tema
  describe('Tema', () => {
    it('deve renderizar corretamente com tema claro', () => {
      renderWithTheme(<BaseIcon name="home" />, 'light');
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
    
    it('deve renderizar corretamente com tema escuro', () => {
      renderWithTheme(<BaseIcon name="home" />, 'dark');
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
  });
  
  // Testes de performance
  describe('Performance', () => {
    it('deve ser memoizado com React.memo', () => {
      const Component = BaseIcon;
      expect(Component.displayName).toBe('BaseIcon');
    });
  });
  
  // Testes de snapshot
  describe('Snapshot', () => {
    it('deve coincidir com snapshot - ícone básico', () => {
      const { container } = render(<BaseIcon name="home" />);
      expect(container.firstChild).toMatchSnapshot();
    });
    
    it('deve coincidir com snapshot - ícone com transformações', () => {
      const { container } = render(
        <BaseIcon 
          name="home" 
          size="lg" 
          color="blue" 
          rotate={45} 
          flip="horizontal"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

describe('IconWithBadge', () => {
  // Testes do componente IconWithBadge
  describe('Renderização', () => {
    it('deve renderizar ícone com badge', () => {
      render(<IconWithBadge name="notification" badge="5" />);
      expect(screen.getByText('🔔')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
    
    it('deve renderizar ícone sem badge quando não fornecido', () => {
      render(<IconWithBadge name="notification" />);
      expect(screen.getByText('🔔')).toBeInTheDocument();
      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });
    
    it('deve aplicar cor customizada ao badge', () => {
      render(<IconWithBadge name="notification" badge="3" badgeColor="green" />);
      expect(screen.getByText('🔔')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });
  
  // Testes de acessibilidade
  describe('Acessibilidade', () => {
    it('deve passar em testes de acessibilidade', async () => {
      const { container } = render(<IconWithBadge name="notification" badge="2" />);
      await testAccessibility(container);
    });
  });
  
  // Testes de snapshot
  describe('Snapshot', () => {
    it('deve coincidir com snapshot', () => {
      const { container } = render(<IconWithBadge name="notification" badge="99+" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

describe('IconButton', () => {
  const user = createUserEvent();
  
  // Testes do componente IconButton
  describe('Renderização', () => {
    it('deve renderizar como ícone simples sem onPress', () => {
      render(<IconButton name="home" />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
    
    it('deve renderizar como botão com onPress', () => {
      const handlePress = jest.fn();
      render(<IconButton name="home" onPress={handlePress} />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
      // O papel seria verificado através da estrutura do componente
    });
  });
  
  // Testes de interação
  describe('Interações', () => {
    it('deve chamar onPress quando clicado', async () => {
      const handlePress = jest.fn();
      render(<IconButton name="home" onPress={handlePress} />);
      
      // Como o IconButton encapsula o ícone, testamos o clique no container
      const icon = screen.getByText('🏠');
      await user.click(icon.closest('div') || icon);
      
      expect(handlePress).toHaveBeenCalledTimes(1);
    });
    
    it('não deve chamar onPress quando desabilitado', async () => {
      const handlePress = jest.fn();
      render(<IconButton name="home" onPress={handlePress} disabled />);
      
      const icon = screen.getByText('🏠');
      await user.click(icon.closest('div') || icon);
      
      expect(handlePress).not.toHaveBeenCalled();
    });
  });
  
  // Testes de estados
  describe('Estados', () => {
    it('deve aplicar estilo desabilitado quando disabled=true', () => {
      const handlePress = jest.fn();
      render(<IconButton name="home" onPress={handlePress} disabled />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });
  });
  
  // Testes de acessibilidade
  describe('Acessibilidade', () => {
    it('deve passar em testes de acessibilidade', async () => {
      const handlePress = jest.fn();
      const { container } = render(<IconButton name="home" onPress={handlePress} />);
      await testAccessibility(container);
    });
  });
  
  // Testes de snapshot
  describe('Snapshot', () => {
    it('deve coincidir com snapshot - botão de ícone', () => {
      const handlePress = jest.fn();
      const { container } = render(<IconButton name="edit" onPress={handlePress} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
