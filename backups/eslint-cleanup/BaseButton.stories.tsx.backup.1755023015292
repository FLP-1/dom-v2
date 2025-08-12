/**
 * @fileoverview Stories do BaseButton para Storybook
 * @version 2.0.0
 * @generated 2025-01-27T11:50:00.000Z
 */

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BaseButton } from './BaseButton';
import { BaseIcon } from './BaseIcon';

const meta: Meta<typeof BaseButton> = {
  title: 'Components/Base/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# BaseButton

Componente de botão base com múltiplas variantes, tamanhos e estados.

## Características

- 🎨 **4 Variantes**: solid, outline, ghost, link
- 📏 **4 Tamanhos**: xs, sm, md, lg  
- 🎯 **Estados**: normal, disabled, loading
- ♿ **Acessível**: ARIA completo, navegação por teclado
- 📱 **Responsivo**: Adapta-se a diferentes tamanhos
- ⚡ **Performático**: Otimizado com React.memo
- 🎨 **Temas**: Suporte a temas dinâmicos

## Quando Usar

- Ações primárias e secundárias
- Navegação entre páginas
- Submissão de formulários
- Ações de confirmação/cancelamento
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o botão está desabilitado',
    },
    loading: {
      control: 'boolean',
      description: 'Se o botão está em estado de carregamento',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o botão deve ocupar toda a largura disponível',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posição do ícone em relação ao texto',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback chamado quando o botão é pressionado',
    },
  },
  args: {
    onPress: action('button-pressed'),
  },
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

// Stories básicas
export const Default: Story = {
  args: {
    title: 'Botão Padrão',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Com Ícone',
    icon: <BaseIcon name="home" />,
    iconPosition: 'left',
  },
};

export const IconOnly: Story = {
  args: {
    icon: <BaseIcon name="add" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão apenas com ícone, sem texto.',
      },
    },
  },
};

// Variantes
export const Variants: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Solid</div>
        <BaseButton title="Solid" variant="solid" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Outline</div>
        <BaseButton title="Outline" variant="outline" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Ghost</div>
        <BaseButton title="Ghost" variant="ghost" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Link</div>
        <BaseButton title="Link" variant="link" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todas as variantes disponíveis do botão.',
      },
    },
  },
};

// Tamanhos
export const Sizes: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Extra Small</div>
        <BaseButton title="XS" size="xs" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Small</div>
        <BaseButton title="Small" size="sm" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Medium</div>
        <BaseButton title="Medium" size="md" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Large</div>
        <BaseButton title="Large" size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todos os tamanhos disponíveis do botão.',
      },
    },
  },
};

// Estados
export const States: Story = {
  render: () => (
    <div className="states-showcase">
      <div className="state-item">
        <div className="variant-label">Normal</div>
        <BaseButton title="Normal" />
      </div>
      <div className="state-item">
        <div className="variant-label">Disabled</div>
        <BaseButton title="Disabled" disabled />
      </div>
      <div className="state-item">
        <div className="variant-label">Loading</div>
        <BaseButton title="Loading" loading />
      </div>
      <div className="state-item">
        <div className="variant-label">Full Width</div>
        <BaseButton title="Full Width" fullWidth />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes estados do botão.',
      },
    },
  },
};

// Com ícones
export const WithIcons: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Ícone à Esquerda</div>
        <BaseButton 
          title="Salvar" 
          icon={<BaseIcon name="save" />}
          iconPosition="left"
        />
      </div>
      <div className="variant-item">
        <div className="variant-label">Ícone à Direita</div>
        <BaseButton 
          title="Avançar" 
          icon={<BaseIcon name="arrow_right" />}
          iconPosition="right"
        />
      </div>
      <div className="variant-item">
        <div className="variant-label">Apenas Ícone</div>
        <BaseButton icon={<BaseIcon name="delete" />} />
      </div>
      <div className="variant-item">
        <div className="variant-label">Múltiplos Ícones</div>
        <BaseButton 
          title="Download" 
          icon={<BaseIcon name="download" />}
          variant="outline"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botões com diferentes configurações de ícones.',
      },
    },
  },
};

// Casos de uso comuns
export const CommonUseCases: Story = {
  render: () => (
    <div className="story-container">
      <div className="story-header">
        <h3 className="story-title">Casos de Uso Comuns</h3>
        <p className="story-description">
          Exemplos de como usar o BaseButton em situações reais.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Ações de formulário */}
        <div>
          <h4>Ações de Formulário</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BaseButton title="Salvar" variant="solid" icon={<BaseIcon name="save" />} />
            <BaseButton title="Cancelar" variant="outline" />
            <BaseButton title="Limpar" variant="ghost" icon={<BaseIcon name="refresh" />} />
          </div>
        </div>
        
        {/* Navegação */}
        <div>
          <h4>Navegação</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BaseButton title="Voltar" variant="ghost" icon={<BaseIcon name="back" />} />
            <BaseButton title="Próximo" variant="solid" icon={<BaseIcon name="forward" />} iconPosition="right" />
            <BaseButton title="Ir para Início" variant="link" icon={<BaseIcon name="home" />} />
          </div>
        </div>
        
        {/* Ações destrutivas */}
        <div>
          <h4>Ações Destrutivas</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BaseButton title="Excluir" variant="outline" icon={<BaseIcon name="delete" />} />
            <BaseButton title="Confirmar Exclusão" variant="solid" />
            <BaseButton title="Cancelar" variant="ghost" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplos de uso do BaseButton em cenários reais do aplicativo.',
      },
    },
  },
};

// Playground interativo
export const Playground: Story = {
  args: {
    title: 'Botão Interativo',
    variant: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconPosition: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use os controles abaixo para experimentar diferentes configurações do botão.',
      },
    },
  },
};
