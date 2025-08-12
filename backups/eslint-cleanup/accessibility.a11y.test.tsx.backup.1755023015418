/**
 * @fileoverview Testes de acessibilidade para componentes base
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import React from 'react';
import { render, screen, createUserEvent, testAccessibility } from '../../../utils/test-utils';
import { 
  BaseButton, 
  BaseCard, 
  BaseIcon, 
  BaseInput, 
  BaseModal,
  BaseNavigation,
  BaseTabs,
  BaseTable 
} from '../index';
import { Text } from 'react-native';

describe('Testes de Acessibilidade - Componentes Base', () => {
  const user = createUserEvent();
  
  describe('BaseButton - Acessibilidade', () => {
    it('deve ter elementos ARIA adequados', async () => {
      const { container } = render(
        <BaseButton 
          title="Salvar documento"
          accessibilityLabel="Salvar o documento atual"
          accessibilityHint="Pressione para salvar as alterações"
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Salvar o documento atual');
      
      await testAccessibility(container);
    });
    
    it('deve ter estado correto quando desabilitado', async () => {
      const { container } = render(
        <BaseButton title="Botão desabilitado" disabled />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
      
      await testAccessibility(container);
    });
    
    it('deve ter estado correto durante loading', async () => {
      const { container } = render(
        <BaseButton title="Carregando" loading />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      
      await testAccessibility(container);
    });
  });
  
  describe('BaseInput - Acessibilidade', () => {
    it('deve ter labels e descrições adequadas', async () => {
      const { container } = render(
        <BaseInput
          label="Nome completo"
          placeholder="Digite seu nome"
          helperText="Este nome aparecerá no seu perfil"
          required
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Nome completo');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(input).toHaveAccessibleDescription('Este nome aparecerá no seu perfil');
      
      await testAccessibility(container);
    });
    
    it('deve indicar estados de erro corretamente', async () => {
      const { container } = render(
        <BaseInput
          label="E-mail"
          error="E-mail inválido"
          value="email-errado"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAccessibleDescription('Erro: E-mail inválido');
      
      await testAccessibility(container);
    });
    
    it('deve ter navegação por teclado funcional', async () => {
      render(
        <>
          <BaseInput label="Campo 1" />
          <BaseInput label="Campo 2" />
          <BaseInput label="Campo 3" />
        </>
      );
      
      const input1 = screen.getByLabelText('Campo 1');
      const input2 = screen.getByLabelText('Campo 2');
      const input3 = screen.getByLabelText('Campo 3');
      
      // Navegação sequencial com Tab
      input1.focus();
      expect(input1).toHaveFocus();
      
      await user.tab();
      expect(input2).toHaveFocus();
      
      await user.tab();
      expect(input3).toHaveFocus();
      
      // Navegação reversa com Shift+Tab
      await user.tab({ shift: true });
      expect(input2).toHaveFocus();
    });
  });
  
  describe('BaseModal - Acessibilidade', () => {
    it('deve implementar modal corretamente', async () => {
      const handleClose = jest.fn();
      const { container } = render(
        <BaseModal 
          visible={true} 
          onClose={handleClose}
          title="Confirmar ação"
          accessibilityLabel="Modal de confirmação"
        >
          <Text>Tem certeza que deseja excluir este item?</Text>
          <BaseButton title="Cancelar" onPress={handleClose} />
          <BaseButton title="Excluir" variant="outline" />
        </BaseModal>
      );
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-label', 'Modal de confirmação');
      
      await testAccessibility(container);
    });
    
    it('deve gerenciar foco corretamente', async () => {
      const handleClose = jest.fn();
      
      render(
        <div>
          <BaseButton title="Abrir modal" id="trigger" />
          <BaseModal 
            visible={true} 
            onClose={handleClose}
            focusTrap
          >
            <BaseInput label="Campo no modal" />
            <BaseButton title="OK" />
          </BaseModal>
        </div>
      );
      
      // O foco deve estar no modal
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveFocus();
    });
  });
  
  describe('BaseNavigation - Acessibilidade', () => {
    it('deve ter navegação por teclado adequada', async () => {
      const handleSelect = jest.fn();
      const { container } = render(
        <BaseNavigation
          items={[
            { key: 'home', label: 'Início', icon: <BaseIcon name="home" /> },
            { key: 'profile', label: 'Perfil', icon: <BaseIcon name="user" /> },
            { key: 'settings', label: 'Configurações', icon: <BaseIcon name="settings" /> }
          ]}
          onSelect={handleSelect}
        />
      );
      
      const homeButton = screen.getByRole('button', { name: 'Início' });
      const profileButton = screen.getByRole('button', { name: 'Perfil' });
      
      // Navegação com setas
      homeButton.focus();
      expect(homeButton).toHaveFocus();
      
      await user.keyboard('{ArrowRight}');
      expect(profileButton).toHaveFocus();
      
      await testAccessibility(container);
    });
    
    it('deve ter estados ARIA corretos para submenus', async () => {
      const { container } = render(
        <BaseNavigation
          items={[
            {
              key: 'menu',
              label: 'Menu Principal',
              children: [
                { key: 'item1', label: 'Item 1' },
                { key: 'item2', label: 'Item 2' }
              ]
            }
          ]}
        />
      );
      
      const menuButton = screen.getByRole('button', { name: 'Menu Principal' });
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      await testAccessibility(container);
    });
  });
  
  describe('BaseTabs - Acessibilidade', () => {
    it('deve implementar padrão de tabs corretamente', async () => {
      const { container } = render(
        <BaseTabs
          items={[
            { key: 'tab1', label: 'Aba 1', children: <Text>Conteúdo 1</Text> },
            { key: 'tab2', label: 'Aba 2', children: <Text>Conteúdo 2</Text> },
            { key: 'tab3', label: 'Aba 3', children: <Text>Conteúdo 3</Text> }
          ]}
        />
      );
      
      const tab1 = screen.getByRole('tab', { name: 'Aba 1' });
      const tab2 = screen.getByRole('tab', { name: 'Aba 2' });
      
      // Estado inicial
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      
      // Navegação com setas
      tab1.focus();
      await user.keyboard('{ArrowRight}');
      expect(tab2).toHaveFocus();
      
      await testAccessibility(container);
    });
  });
  
  describe('BaseTable - Acessibilidade', () => {
    it('deve ter estrutura de tabela acessível', async () => {
      const data = [
        { id: 1, nome: 'João', idade: 30 },
        { id: 2, nome: 'Maria', idade: 25 }
      ];
      
      const columns = [
        { key: 'nome', title: 'Nome', dataIndex: 'nome' },
        { key: 'idade', title: 'Idade', dataIndex: 'idade' }
      ];
      
      const { container } = render(
        <BaseTable data={data} columns={columns} />
      );
      
      // Headers devem ter role columnheader
      const nomeHeader = screen.getByRole('columnheader', { name: 'Nome' });
      const idadeHeader = screen.getByRole('columnheader', { name: 'Idade' });
      
      expect(nomeHeader).toBeInTheDocument();
      expect(idadeHeader).toBeInTheDocument();
      
      // Rows devem ter role row
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(0);
      
      await testAccessibility(container);
    });
    
    it('deve ter ordenação acessível', async () => {
      const data = [
        { id: 1, nome: 'João', idade: 30 },
        { id: 2, nome: 'Maria', idade: 25 }
      ];
      
      const columns = [
        { key: 'nome', title: 'Nome', dataIndex: 'nome', sortable: true },
        { key: 'idade', title: 'Idade', dataIndex: 'idade', sortable: true }
      ];
      
      const { container } = render(
        <BaseTable data={data} columns={columns} />
      );
      
      const nomeHeader = screen.getByRole('columnheader', { name: /Nome.*ordenável/ });
      expect(nomeHeader).toBeInTheDocument();
      
      await testAccessibility(container);
    });
  });
  
  describe('Testes de Contraste e Cores', () => {
    it('deve ter contraste adequado em todos os temas', async () => {
      const themes = ['light', 'dark', 'highContrast'] as const;
      
      for (const theme of themes) {
        const { container, unmount } = render(
          <div>
            <BaseButton title="Botão teste" />
            <BaseInput label="Campo teste" />
            <BaseCard>
              <Text>Card teste</Text>
            </BaseCard>
          </div>,
          { initialTheme: theme }
        );
        
        await testAccessibility(container);
        unmount();
      }
    });
  });
  
  describe('Testes de Screen Reader', () => {
    it('deve ter texto alternativo adequado para ícones', async () => {
      const { container } = render(
        <div>
          <BaseIcon name="home" accessibilityLabel="Página inicial" />
          <BaseIcon name="user" accessibilityLabel="Perfil do usuário" />
          <BaseIcon name="settings" accessibilityLabel="Configurações do sistema" />
        </div>
      );
      
      expect(screen.getByLabelText('Página inicial')).toBeInTheDocument();
      expect(screen.getByLabelText('Perfil do usuário')).toBeInTheDocument();
      expect(screen.getByLabelText('Configurações do sistema')).toBeInTheDocument();
      
      await testAccessibility(container);
    });
  });
  
  describe('Testes de Responsividade e Mobile', () => {
    it('deve manter acessibilidade em diferentes tamanhos de tela', async () => {
      const breakpoints = ['mobile', 'tablet', 'desktop'] as const;
      
      for (const breakpoint of breakpoints) {
        const { container, unmount } = render(
          <BaseNavigation
            items={[
              { key: 'home', label: 'Início' },
              { key: 'about', label: 'Sobre' },
              { key: 'contact', label: 'Contato' }
            ]}
          />,
          { wrapper: ({ children }) => <div data-testid={`${breakpoint}-view`}>{children}</div> }
        );
        
        await testAccessibility(container);
        unmount();
      }
    });
  });
  
  describe('Testes de Interação por Teclado', () => {
    it('deve suportar atalhos de teclado padrão', async () => {
      const handleSubmit = jest.fn();
      const handleCancel = jest.fn();
      
      render(
        <form onSubmit={handleSubmit}>
          <BaseInput label="Nome" />
          <BaseButton title="Salvar" type="submit" />
          <BaseButton title="Cancelar" onPress={handleCancel} />
        </form>
      );
      
      const input = screen.getByLabelText('Nome');
      input.focus();
      
      // Enter deve submeter o formulário
      await user.keyboard('{Enter}');
      expect(handleSubmit).toHaveBeenCalled();
      
      // Escape deve cancelar (se implementado)
      await user.keyboard('{Escape}');
    });
  });
});
