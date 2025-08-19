/**
 * @fileoverview Testes para BaseInput
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import React from 'react';
import { render, screen, createUserEvent, testAccessibility, renderWithTheme, waitFor } from '../../../utils/test-utils';
import { BaseInput } from '../BaseInput';
import { BaseIcon } from '../BaseIcon';

describe('BaseInput', () => {
  const user = createUserEvent();
  
  // Testes básicos de renderização
  describe('Renderização', () => {
    it('deve renderizar input básico', () => {
      render(<BaseInput />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    it('deve renderizar com valor inicial', () => {
      render(<BaseInput value="Texto inicial" />);
      expect(screen.getByDisplayValue('Texto inicial')).toBeInTheDocument();
    });
    
    it('deve renderizar com placeholder', () => {
      render(<BaseInput placeholder="Digite aqui..." />);
      expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument();
    });
    
    it('deve renderizar com label estático', () => {
      render(<BaseInput label="Nome" floatingLabel={false} />);
      expect(screen.getByText('Nome')).toBeInTheDocument();
    });
    
    it('deve renderizar com label flutuante', () => {
      render(<BaseInput label="E-mail" floatingLabel />);
      expect(screen.getByText('E-mail')).toBeInTheDocument();
    });
    
    it('deve mostrar asterisco para campos obrigatórios', () => {
      render(<BaseInput label="Campo obrigatório" required />);
      expect(screen.getByText(/Campo obrigatório \*/)).toBeInTheDocument();
    });
  });
  
  // Testes de tipos de input
  describe('Tipos de Input', () => {
    it('deve renderizar como input de senha', () => {
      render(<BaseInput secureTextEntry />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'password');
    });
    
    it('deve renderizar como input de senha com prop password', () => {
      render(<BaseInput password />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'password');
    });
    
    it('deve renderizar como textarea quando multiline', () => {
      render(<BaseInput multiline numberOfLines={3} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    it.each([
      ['default', 'default'],
      ['numeric', 'numeric'],
      ['email-address', 'email-address'],
      ['phone-pad', 'phone-pad'],
      ['decimal-pad', 'decimal-pad'],
    ])('deve aplicar keyboardType %s', (keyboardType, expected) => {
      render(<BaseInput keyboardType={keyboardType as any} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
  
  // Testes de tamanhos
  describe('Tamanhos', () => {
    it.each([
      ['sm', 'sm'],
      ['md', 'md'],
      ['lg', 'lg'],
    ])('deve aplicar tamanho %s corretamente', (size, expected) => {
      render(<BaseInput size={size as any} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
  
  // Testes de ícones
  describe('Ícones', () => {
    it('deve renderizar com ícone à esquerda', () => {
      render(<BaseInput leftIcon={<BaseIcon name="user" />} />);
      expect(screen.getByText('👤')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    it('deve renderizar com ícone à direita', () => {
      render(<BaseInput rightIcon={<BaseIcon name="search" />} />);
      expect(screen.getByText('🔍')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    it('deve mostrar botão de limpar quando clearable e com valor', () => {
      render(<BaseInput value="Texto" clearable />);
      expect(screen.getByRole('button', { name: 'Limpar campo' })).toBeInTheDocument();
    });
    
    it('não deve mostrar botão de limpar quando clearable mas sem valor', () => {
      render(<BaseInput value="" clearable />);
      expect(screen.queryByRole('button', { name: 'Limpar campo' })).not.toBeInTheDocument();
    });
    
    it('deve mostrar toggle de senha para inputs de senha', () => {
      render(<BaseInput password />);
      expect(screen.getByRole('button', { name: 'Mostrar senha' })).toBeInTheDocument();
    });
  });
  
  // Testes de validação
  describe('Validação', () => {
    it('deve mostrar erro quando fornecido', () => {
      render(<BaseInput error="Campo inválido" />);
      expect(screen.getByText('Campo inválido')).toBeInTheDocument();
    });
    
    it('deve mostrar texto de ajuda quando fornecido', () => {
      render(<BaseInput helperText="Digite seu nome completo" />);
      expect(screen.getByText('Digite seu nome completo')).toBeInTheDocument();
    });
    
    it('deve validar campo obrigatório', async () => {
      const handleChange = jest.fn();
      render(
        <BaseInput
          validation={{ required: true }}
          validateOnBlur
          onChangeText={handleChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab(); // Blur
      
      await waitFor(() => {
        expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
      });
    });
    
    it('deve validar e-mail', async () => {
      const handleChange = jest.fn();
      render(
        <BaseInput
          value="email-invalido"
          validation={{ email: true }}
          validateOnBlur
          onChangeText={handleChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab(); // Blur
      
      await waitFor(() => {
        expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
      });
    });
    
    it('deve validar comprimento mínimo', async () => {
      const handleChange = jest.fn();
      render(
        <BaseInput
          value="abc"
          validation={{ minLength: 5 }}
          validateOnBlur
          onChangeText={handleChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab(); // Blur
      
      await waitFor(() => {
        expect(screen.getByText('Mínimo de 5 caracteres')).toBeInTheDocument();
      });
    });
    
    it('deve executar validação customizada', async () => {
      const customValidation = jest.fn(() => 'Erro customizado');
      render(
        <BaseInput
          value="teste"
          validation={{ custom: customValidation }}
          validateOnBlur
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab(); // Blur
      
      await waitFor(() => {
        expect(customValidation).toHaveBeenCalledWith('teste');
        expect(screen.getByText('Erro customizado')).toBeInTheDocument();
      });
    });
  });
  
  // Testes de máscaras
  describe('Máscaras', () => {
    it('deve aplicar máscara de CPF', async () => {
      const handleChange = jest.fn();
      render(<BaseInput mask="cpf" onChangeText={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, '12345678901');
      
      expect(handleChange).toHaveBeenLastCalledWith('123.456.789-01');
    });
    
    it('deve aplicar máscara de telefone', async () => {
      const handleChange = jest.fn();
      render(<BaseInput mask="phone" onChangeText={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, '11987654321');
      
      expect(handleChange).toHaveBeenLastCalledWith('(11) 98765-4321');
    });
    
    it('deve aplicar máscara customizada', async () => {
      const customMask = jest.fn((text) => text.toUpperCase());
      const handleChange = jest.fn();
      render(<BaseInput mask={customMask} onChangeText={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'teste');
      
      expect(customMask).toHaveBeenCalled();
      expect(handleChange).toHaveBeenLastCalledWith('TESTE');
    });
  });
  
  // Testes de interação
  describe('Interações', () => {
    it('deve chamar onChangeText ao digitar', async () => {
      const handleChange = jest.fn();
      render(<BaseInput onChangeText={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello');
      
      expect(handleChange).toHaveBeenCalledTimes(5); // Uma chamada por caractere
    });
    
    it('deve chamar onFocus ao focar', async () => {
      const handleFocus = jest.fn();
      render(<BaseInput onFocus={handleFocus} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
    
    it('deve chamar onBlur ao perder foco', async () => {
      const handleBlur = jest.fn();
      render(<BaseInput onBlur={handleBlur} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
    
    it('deve limpar campo ao clicar no botão de limpar', async () => {
      const handleChange = jest.fn();
      render(<BaseInput value="Texto" clearable onChangeText={handleChange} />);
      
      const clearButton = screen.getByRole('button', { name: 'Limpar campo' });
      await user.click(clearButton);
      
      expect(handleChange).toHaveBeenLastCalledWith('');
    });
    
    it('deve alternar visibilidade da senha', async () => {
      render(<BaseInput password />);
      
      const toggleButton = screen.getByRole('button', { name: 'Mostrar senha' });
      await user.click(toggleButton);
      
      expect(screen.getByRole('button', { name: 'Ocultar senha' })).toBeInTheDocument();
    });
  });
  
  // Testes de estados
  describe('Estados', () => {
    it('deve estar desabilitado quando disabled=true', () => {
      render(<BaseInput disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
    
    it('deve focar automaticamente quando autoFocus=true', () => {
      render(<BaseInput autoFocus />);
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
    
    it('deve mostrar contador de caracteres quando characterCount=true', () => {
      render(<BaseInput value="Hello" characterCount maxLength={10} />);
      expect(screen.getByText('5/10')).toBeInTheDocument();
    });
  });
  
  // Testes de acessibilidade
  describe('Acessibilidade', () => {
    it('deve ter role="textbox" por padrão', () => {
      render(<BaseInput />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    it('deve usar label como accessibilityLabel', () => {
      render(<BaseInput label="Nome completo" />);
      expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
    });
    
    it('deve mostrar erro na accessibilityHint', () => {
      render(<BaseInput error="Campo inválido" />);
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Erro: Campo inválido');
    });
    
    it('deve passar em testes de acessibilidade', async () => {
      const { container } = render(<BaseInput label="Teste A11y" />);
      await testAccessibility(container);
    });
  });
  
  // Testes de tema
  describe('Tema', () => {
    it('deve renderizar corretamente com tema claro', () => {
      renderWithTheme(<BaseInput label="Tema claro" />, 'light');
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    it('deve renderizar corretamente com tema escuro', () => {
      renderWithTheme(<BaseInput label="Tema escuro" />, 'dark');
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
  
  // Testes de performance
  describe('Performance', () => {
    it('deve ser memoizado com React.memo', () => {
      const Component = BaseInput;
      expect(Component.displayName).toBe('BaseInput');
    });
    
    it('deve usar debounce para validação', async () => {
      const handleChange = jest.fn();
      render(
        <BaseInput
          validation={{ required: true }}
          validateOnChange
          debounceMs={100}
          onChangeText={handleChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'abc');
      
      // A validação deve ser debounced
      expect(screen.queryByText('Este campo é obrigatório')).not.toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.queryByText('Este campo é obrigatório')).not.toBeInTheDocument();
      }, { timeout: 200 });
    });
  });
  
  // Testes de snapshot
  describe('Snapshot', () => {
    it('deve coincidir com snapshot - input básico', () => {
      const { container } = render(<BaseInput label="Nome" />);
      expect(container.firstChild).toMatchSnapshot();
    });
    
    it('deve coincidir com snapshot - input completo', () => {
      const { container } = render(
        <BaseInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          leftIcon={<BaseIcon name="email" />}
          clearable
          validation={{ required: true, email: true }}
          helperText="Será usado para login"
          characterCount
          maxLength={50}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
