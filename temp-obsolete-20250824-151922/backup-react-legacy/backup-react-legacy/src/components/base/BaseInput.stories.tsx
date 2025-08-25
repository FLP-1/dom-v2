/**
 * @fileoverview Stories do BaseInput para Storybook
 * @version 2.0.0
 * @generated 2025-01-27T11:50:00.000Z
 */

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BaseInput } from './BaseInput';
import { BaseIcon } from './BaseIcon';
import { useState } from 'react';

const meta: Meta<typeof BaseInput> = {
  title: 'Components/Base/BaseInput',
  component: BaseInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# BaseInput

Componente de input avançado com validação, máscaras e formatação.

## Características

- 🔍 **Validação Avançada**: E-mail, CPF, telefone, customizada
- 🎭 **Máscaras**: CPF, telefone, CEP, moeda, customizadas
- 📏 **Tamanhos**: sm, md, lg
- 🏷️ **Labels**: Estático ou flutuante
- 🎨 **Ícones**: Esquerda, direita, customizáveis
- 🔐 **Senha**: Toggle de visibilidade
- 🧹 **Limpeza**: Botão de limpar
- ♿ **Acessível**: ARIA completo, screen reader
- 📱 **Responsivo**: Mobile-first
- ⚡ **Performático**: Debounce, otimizações

## Quando Usar

- Formulários de cadastro/login
- Campos de busca
- Entrada de dados estruturados
- Campos com validação complexa
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo do campo',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do input',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o input está desabilitado',
    },
    required: {
      control: 'boolean',
      description: 'Se o campo é obrigatório',
    },
    clearable: {
      control: 'boolean',
      description: 'Se mostra botão de limpar',
    },
    password: {
      control: 'boolean',
      description: 'Se é um campo de senha',
    },
    multiline: {
      control: 'boolean',
      description: 'Se é um campo de múltiplas linhas',
    },
    floatingLabel: {
      control: 'boolean',
      description: 'Se o label é flutuante',
    },
    characterCount: {
      control: 'boolean',
      description: 'Se mostra contador de caracteres',
    },
    maxLength: {
      control: 'number',
      description: 'Número máximo de caracteres',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    onChangeText: {
      action: 'text-changed',
      description: 'Callback chamado quando o texto muda',
    },
  },
  args: {
    onChangeText: action('text-changed'),
    onFocus: action('focused'),
    onBlur: action('blurred'),
  },
};

export default meta;
type Story = StoryObj<typeof BaseInput>;

// Stories básicas
export const Default: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome',
  },
};

export const WithValue: Story = {
  args: {
    label: 'E-mail',
    value: 'usuario@exemplo.com',
    placeholder: 'Digite seu e-mail',
  },
};

export const Required: Story = {
  args: {
    label: 'Campo Obrigatório',
    placeholder: 'Este campo é obrigatório',
    required: true,
    helperText: 'Campo obrigatório para continuar',
  },
};

// Tamanhos
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <BaseInput label="Small" size="sm" placeholder="Tamanho pequeno" />
      <BaseInput label="Medium" size="md" placeholder="Tamanho médio" />
      <BaseInput label="Large" size="lg" placeholder="Tamanho grande" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamanhos disponíveis para o input.',
      },
    },
  },
};

// Com ícones
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <BaseInput 
        label="Buscar" 
        placeholder="Digite para buscar..."
        leftIcon={<BaseIcon name="search" />}
      />
      <BaseInput 
        label="E-mail" 
        placeholder="seu@email.com"
        rightIcon={<BaseIcon name="email" />}
      />
      <BaseInput 
        label="Usuário" 
        placeholder="Nome de usuário"
        leftIcon={<BaseIcon name="user" />}
        rightIcon={<BaseIcon name="check" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs com ícones nas laterais.',
      },
    },
  },
};

// Tipos especiais
export const SpecialTypes: Story = {
  render: () => {
    const [values, setValues] = useState({
      password: '',
      clearable: 'Texto que pode ser limpo',
      multiline: '',
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <BaseInput 
          label="Senha"
          value={values.password}
          onChangeText={(text) => setValues({...values, password: text})}
          password
          placeholder="Digite sua senha"
        />
        <BaseInput 
          label="Campo Limpável"
          value={values.clearable}
          onChangeText={(text) => setValues({...values, clearable: text})}
          clearable
          placeholder="Texto que pode ser limpo"
        />
        <BaseInput 
          label="Múltiplas Linhas"
          value={values.multiline}
          onChangeText={(text) => setValues({...values, multiline: text})}
          multiline
          numberOfLines={3}
          placeholder="Digite um texto longo..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tipos especiais de input: senha, limpável e múltiplas linhas.',
      },
    },
  },
};

// Com validação
export const WithValidation: Story = {
  render: () => {
    const [values, setValues] = useState({
      email: '',
      phone: '',
      required: '',
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <BaseInput 
          label="E-mail"
          value={values.email}
          onChangeText={(text) => setValues({...values, email: text})}
          validation={{ required: true, email: true }}
          validateOnBlur
          placeholder="exemplo@email.com"
          helperText="Digite um e-mail válido"
        />
        <BaseInput 
          label="Telefone"
          value={values.phone}
          onChangeText={(text) => setValues({...values, phone: text})}
          validation={{ phone: true }}
          mask="phone"
          validateOnBlur
          placeholder="(11) 99999-9999"
        />
        <BaseInput 
          label="Campo Obrigatório"
          value={values.required}
          onChangeText={(text) => setValues({...values, required: text})}
          validation={{ required: true, minLength: 3 }}
          validateOnBlur
          required
          placeholder="Mínimo 3 caracteres"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Inputs com diferentes tipos de validação.',
      },
    },
  },
};

// Com máscaras
export const WithMasks: Story = {
  render: () => {
    const [values, setValues] = useState({
      cpf: '',
      phone: '',
      cep: '',
      custom: '',
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <BaseInput 
          label="CPF"
          value={values.cpf}
          onChangeText={(text) => setValues({...values, cpf: text})}
          mask="cpf"
          placeholder="000.000.000-00"
          validation={{ cpf: true }}
        />
        <BaseInput 
          label="Telefone"
          value={values.phone}
          onChangeText={(text) => setValues({...values, phone: text})}
          mask="phone"
          placeholder="(00) 00000-0000"
        />
        <BaseInput 
          label="CEP"
          value={values.cep}
          onChangeText={(text) => setValues({...values, cep: text})}
          mask="cep"
          placeholder="00000-000"
        />
        <BaseInput 
          label="Máscara Customizada"
          value={values.custom}
          onChangeText={(text) => setValues({...values, custom: text})}
          mask={(text) => text.toUpperCase()}
          placeholder="Texto em maiúsculas"
          helperText="Converte automaticamente para maiúsculas"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Inputs com diferentes máscaras de formatação.',
      },
    },
  },
};

// Estados e feedback
export const StatesAndFeedback: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <BaseInput 
        label="Campo Normal"
        placeholder="Estado normal"
        helperText="Este é um texto de ajuda"
      />
      <BaseInput 
        label="Campo com Erro"
        value="texto-invalido"
        error="Este campo contém um erro"
        placeholder="Estado de erro"
      />
      <BaseInput 
        label="Campo Desabilitado"
        value="Campo desabilitado"
        disabled
        placeholder="Estado desabilitado"
      />
      <BaseInput 
        label="Com Contador"
        placeholder="Digite até 50 caracteres"
        characterCount
        maxLength={50}
        helperText="Contador de caracteres ativo"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes estados e tipos de feedback do input.',
      },
    },
  },
};

// Labels flutuantes vs estáticos
export const LabelTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Label Flutuante (Padrão)</h4>
        <BaseInput 
          label="Nome Completo"
          placeholder="Digite seu nome"
          floatingLabel
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Label Estático</h4>
        <BaseInput 
          label="Nome Completo"
          placeholder="Digite seu nome"
          floatingLabel={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação entre labels flutuantes e estáticos.',
      },
    },
  },
};

// Formulário completo
export const CompleteForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      bio: '',
    });

    const updateField = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="story-container">
        <div className="story-header">
          <h3 className="story-title">Formulário de Cadastro</h3>
          <p className="story-description">
            Exemplo de formulário completo usando BaseInput com diferentes configurações.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
          <BaseInput
            label="Nome Completo"
            value={formData.name}
            onChangeText={updateField('name')}
            placeholder="Digite seu nome completo"
            required
            validation={{ required: true, minLength: 2 }}
            leftIcon={<BaseIcon name="user" />}
          />
          
          <BaseInput
            label="E-mail"
            value={formData.email}
            onChangeText={updateField('email')}
            placeholder="seu@email.com"
            required
            validation={{ required: true, email: true }}
            leftIcon={<BaseIcon name="email" />}
            keyboardType="email-address"
          />
          
          <BaseInput
            label="Telefone"
            value={formData.phone}
            onChangeText={updateField('phone')}
            placeholder="(11) 99999-9999"
            mask="phone"
            validation={{ phone: true }}
            leftIcon={<BaseIcon name="phone" />}
            keyboardType="phone-pad"
          />
          
          <BaseInput
            label="Senha"
            value={formData.password}
            onChangeText={updateField('password')}
            placeholder="Digite sua senha"
            required
            password
            validation={{ required: true, minLength: 6 }}
            helperText="Mínimo 6 caracteres"
          />
          
          <BaseInput
            label="Confirmar Senha"
            value={formData.confirmPassword}
            onChangeText={updateField('confirmPassword')}
            placeholder="Confirme sua senha"
            required
            password
            validation={{ 
              required: true,
              custom: (value) => value === formData.password ? true : 'Senhas não conferem'
            }}
          />
          
          <BaseInput
            label="Biografia"
            value={formData.bio}
            onChangeText={updateField('bio')}
            placeholder="Conte um pouco sobre você..."
            multiline
            numberOfLines={3}
            characterCount
            maxLength={200}
            helperText="Opcional - descreva seus interesses"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo completo de formulário usando múltiplos BaseInputs com diferentes configurações.',
      },
    },
  },
};

// Playground interativo
export const Playground: Story = {
  args: {
    label: 'Campo Interativo',
    placeholder: 'Digite algo...',
    size: 'md',
    disabled: false,
    required: false,
    clearable: false,
    password: false,
    multiline: false,
    floatingLabel: true,
    characterCount: false,
    maxLength: 100,
    helperText: 'Texto de ajuda',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use os controles abaixo para experimentar diferentes configurações do input.',
      },
    },
  },
};
