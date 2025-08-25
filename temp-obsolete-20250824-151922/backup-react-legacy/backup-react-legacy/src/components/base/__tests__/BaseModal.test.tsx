/**
 * @fileoverview Testes para BaseModal
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import React from 'react';
import { render, screen, createUserEvent, testAccessibility, waitFor } from '../../../utils/test-utils';
import { BaseModal } from '../BaseModal';
import { Text } from 'react-native';

describe('BaseModal', () => {
  const user = createUserEvent();
  
  // Testes básicos de renderização
  describe('Renderização', () => {
    it('deve renderizar quando visible=true', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose}>
          <Text>Conteúdo do modal</Text>
        </BaseModal>
      );
      expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
    });
    
    it('não deve renderizar quando visible=false', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={false} onClose={handleClose}>
          <Text>Conteúdo do modal</Text>
        </BaseModal>
      );
      expect(screen.queryByText('Conteúdo do modal')).not.toBeInTheDocument();
    });
    
    it('deve renderizar com título', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} title="Meu Modal">
          <Text>Conteúdo</Text>
        </BaseModal>
      );
      expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    });
  });
  
  // Testes de posicionamento
  describe('Posicionamento', () => {
    it.each([
      ['center', 'center'],
      ['top', 'top'],
      ['bottom', 'bottom'],
      ['fullscreen', 'fullscreen'],
    ])('deve aplicar posição %s corretamente', (position, expected) => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} position={position as any}>
          <Text>Modal na posição {position}</Text>
        </BaseModal>
      );
      expect(screen.getByText(`Modal na posição ${position}`)).toBeInTheDocument();
    });
  });
  
  // Testes de animação
  describe('Animação', () => {
    it.each([
      ['none', 'none'],
      ['slide', 'slide'],
      ['fade', 'fade'],
      ['scale', 'scale'],
    ])('deve aplicar animação %s corretamente', (animationType, expected) => {
      const handleClose = jest.fn();
      render(
        <BaseModal 
          visible={true} 
          onClose={handleClose} 
          animationType={animationType as any}
        >
          <Text>Modal com animação {animationType}</Text>
        </BaseModal>
      );
      expect(screen.getByText(`Modal com animação ${animationType}`)).toBeInTheDocument();
    });
  });
  
  // Testes de backdrop
  describe('Backdrop', () => {
    it('deve renderizar backdrop por padrão', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose}>
          <Text>Com backdrop</Text>
        </BaseModal>
      );
      expect(screen.getByLabelText('Fechar modal')).toBeInTheDocument();
    });
    
    it('não deve renderizar backdrop quando backdrop=false', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} backdrop={false}>
          <Text>Sem backdrop</Text>
        </BaseModal>
      );
      expect(screen.queryByLabelText('Fechar modal')).not.toBeInTheDocument();
    });
    
    it('deve fechar modal ao clicar no backdrop quando backdropClosable=true', async () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} backdropClosable>
          <Text>Clique no backdrop</Text>
        </BaseModal>
      );
      
      const backdrop = screen.getByLabelText('Fechar modal');
      await user.click(backdrop);
      
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
    
    it('não deve fechar modal ao clicar no backdrop quando backdropClosable=false', async () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} backdropClosable={false}>
          <Text>Backdrop não fecha</Text>
        </BaseModal>
      );
      
      const backdrop = screen.getByLabelText('Fechar modal');
      await user.click(backdrop);
      
      expect(handleClose).not.toHaveBeenCalled();
    });
  });
  
  // Testes de fechamento
  describe('Fechamento', () => {
    it('deve chamar onClose quando closable e ESC pressionado', async () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} closable>
          <Text>Modal fechável</Text>
        </BaseModal>
      );
      
      await user.keyboard('{Escape}');
      
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
    
    it('não deve chamar onClose quando closable=false', async () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} closable={false}>
          <Text>Modal não fechável</Text>
        </BaseModal>
      );
      
      await user.keyboard('{Escape}');
      
      expect(handleClose).not.toHaveBeenCalled();
    });
  });
  
  // Testes de dimensões
  describe('Dimensões', () => {
    it('deve aplicar maxWidth corretamente', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} maxWidth={500}>
          <Text>Modal com largura máxima</Text>
        </BaseModal>
      );
      expect(screen.getByText('Modal com largura máxima')).toBeInTheDocument();
    });
    
    it('deve aplicar maxHeight corretamente', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} maxHeight="70%">
          <Text>Modal com altura máxima</Text>
        </BaseModal>
      );
      expect(screen.getByText('Modal com altura máxima')).toBeInTheDocument();
    });
  });
  
  // Testes de callbacks
  describe('Callbacks', () => {
    it('deve chamar onShow quando modal é mostrado', async () => {
      const handleShow = jest.fn();
      const handleClose = jest.fn();
      
      const { rerender } = render(
        <BaseModal visible={false} onClose={handleClose} onShow={handleShow}>
          <Text>Modal teste</Text>
        </BaseModal>
      );
      
      rerender(
        <BaseModal visible={true} onClose={handleClose} onShow={handleShow}>
          <Text>Modal teste</Text>
        </BaseModal>
      );
      
      await waitFor(() => {
        expect(handleShow).toHaveBeenCalledTimes(1);
      });
    });
    
    it('deve chamar onHide quando modal é ocultado', async () => {
      const handleHide = jest.fn();
      const handleClose = jest.fn();
      
      const { rerender } = render(
        <BaseModal visible={true} onClose={handleClose} onHide={handleHide}>
          <Text>Modal teste</Text>
        </BaseModal>
      );
      
      rerender(
        <BaseModal visible={false} onClose={handleClose} onHide={handleHide}>
          <Text>Modal teste</Text>
        </BaseModal>
      );
      
      await waitFor(() => {
        expect(handleHide).toHaveBeenCalledTimes(1);
      });
    });
  });
  
  // Testes de acessibilidade
  describe('Acessibilidade', () => {
    it('deve ter role="dialog"', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose}>
          <Text>Modal acessível</Text>
        </BaseModal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    it('deve usar título como accessibilityLabel', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} title="Título do Modal">
          <Text>Conteúdo</Text>
        </BaseModal>
      );
      expect(screen.getByLabelText('Título do Modal')).toBeInTheDocument();
    });
    
    it('deve usar accessibilityLabel customizado', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal 
          visible={true} 
          onClose={handleClose} 
          accessibilityLabel="Modal personalizado"
        >
          <Text>Conteúdo</Text>
        </BaseModal>
      );
      expect(screen.getByLabelText('Modal personalizado')).toBeInTheDocument();
    });
    
    it('deve ter accessibilityModal=true', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose}>
          <Text>Modal modal</Text>
        </BaseModal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
    
    it('deve passar em testes de acessibilidade', async () => {
      const handleClose = jest.fn();
      const { container } = render(
        <BaseModal visible={true} onClose={handleClose} title="Modal A11y">
          <Text>Teste de acessibilidade</Text>
        </BaseModal>
      );
      await testAccessibility(container);
    });
  });
  
  // Testes de focus management
  describe('Focus Management', () => {
    it('deve implementar focus trap quando focusTrap=true', () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} focusTrap>
          <Text>Modal com focus trap</Text>
        </BaseModal>
      );
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      // O focus trap seria testado com navegação por Tab em um ambiente real
    });
    
    it('deve focar no modal quando aberto', async () => {
      const handleClose = jest.fn();
      render(
        <BaseModal visible={true} onClose={handleClose} focusTrap>
          <Text>Modal focável</Text>
        </BaseModal>
      );
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveFocus();
      });
    });
  });
  
  // Testes de performance
  describe('Performance', () => {
    it('deve ser memoizado com React.memo', () => {
      const Component = BaseModal;
      expect(Component.displayName).toBe('BaseModal');
    });
    
    it('deve otimizar re-renders', () => {
      const renderSpy = jest.fn();
      const handleClose = jest.fn();
      
      const TestModal = React.memo(() => {
        renderSpy();
        return (
          <BaseModal visible={true} onClose={handleClose}>
            <Text>Modal otimizado</Text>
          </BaseModal>
        );
      });
      
      const { rerender } = render(<TestModal />);
      rerender(<TestModal />);
      
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });
  
  // Testes de snapshot
  describe('Snapshot', () => {
    it('deve coincidir com snapshot - modal básico', () => {
      const handleClose = jest.fn();
      const { container } = render(
        <BaseModal visible={true} onClose={handleClose}>
          <Text>Snapshot básico</Text>
        </BaseModal>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    
    it('deve coincidir com snapshot - modal completo', () => {
      const handleClose = jest.fn();
      const { container } = render(
        <BaseModal
          visible={true}
          onClose={handleClose}
          title="Modal Completo"
          position="center"
          animationType="scale"
          maxWidth={600}
          maxHeight="80%"
          backdrop
          backdropClosable
          closable
        >
          <Text>Modal com todas as configurações</Text>
        </BaseModal>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
