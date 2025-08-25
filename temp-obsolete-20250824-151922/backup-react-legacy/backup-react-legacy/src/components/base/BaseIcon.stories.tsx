/**
 * @fileoverview Stories do BaseIcon para Storybook
 * @version 2.0.0
 * @generated 2025-01-27T11:50:00.000Z
 */

import type { Meta, StoryObj } from '@storybook/react';
import { BaseIcon, IconWithBadge, IconButton, ICON_LIBRARY, type IconName } from './BaseIcon';

const meta: Meta<typeof BaseIcon> = {
  title: 'Components/Base/BaseIcon',
  component: BaseIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# BaseIcon

Sistema de ícones padronizado com 60+ ícones incluídos.

## Características

- 🎨 **60+ Ícones**: Navegação, ações, família, comunicação
- 📏 **5 Tamanhos**: xs, sm, md, lg, xl
- 🎯 **Transformações**: Rotação, flip, animações
- 🔄 **Animações**: Spin, pulse, bounce, shake
- 🎭 **Componentes**: Icon, IconWithBadge, IconButton
- ♿ **Acessível**: Labels, roles corretos
- 🎨 **Customizável**: Cores, ícones customizados
- ⚡ **Performático**: Otimizado com React.memo

## Biblioteca de Ícones

Inclui ícones para navegação, ações, comunicação, família, tarefas domésticas, gamificação e muito mais.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(ICON_LIBRARY),
      description: 'Nome do ícone da biblioteca',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do ícone',
    },
    color: {
      control: 'color',
      description: 'Cor do ícone',
    },
    rotate: {
      control: { type: 'range', min: 0, max: 360, step: 15 },
      description: 'Rotação em graus',
    },
    flip: {
      control: 'select',
      options: [undefined, 'horizontal', 'vertical', 'both'],
      description: 'Tipo de espelhamento',
    },
    spin: {
      control: 'boolean',
      description: 'Animação de rotação contínua',
    },
    pulse: {
      control: 'boolean',
      description: 'Animação de pulso',
    },
    bounce: {
      control: 'boolean',
      description: 'Animação de salto',
    },
    shake: {
      control: 'boolean',
      description: 'Animação de tremor',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseIcon>;

// Stories básicas
export const Default: Story = {
  args: {
    name: 'home',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '🎯',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ícone customizado usando emoji ou string.',
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
        <BaseIcon name="home" size="xs" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Small</div>
        <BaseIcon name="home" size="sm" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Medium</div>
        <BaseIcon name="home" size="md" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Large</div>
        <BaseIcon name="home" size="lg" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Extra Large</div>
        <BaseIcon name="home" size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todos os tamanhos disponíveis para ícones.',
      },
    },
  },
};

// Cores
export const Colors: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Padrão</div>
        <BaseIcon name="heart" size="lg" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Vermelho</div>
        <BaseIcon name="heart" size="lg" color="red" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Azul</div>
        <BaseIcon name="heart" size="lg" color="blue" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Verde</div>
        <BaseIcon name="heart" size="lg" color="green" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Roxo</div>
        <BaseIcon name="heart" size="lg" color="purple" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ícones com diferentes cores.',
      },
    },
  },
};

// Transformações
export const Transformations: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Normal</div>
        <BaseIcon name="arrow_right" size="lg" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Rotação 90°</div>
        <BaseIcon name="arrow_right" size="lg" rotate={90} />
      </div>
      <div className="variant-item">
        <div className="variant-label">Flip Horizontal</div>
        <BaseIcon name="arrow_right" size="lg" flip="horizontal" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Flip Vertical</div>
        <BaseIcon name="arrow_right" size="lg" flip="vertical" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Flip Ambos</div>
        <BaseIcon name="arrow_right" size="lg" flip="both" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes transformações aplicadas aos ícones.',
      },
    },
  },
};

// Animações
export const Animations: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Spin</div>
        <BaseIcon name="refresh" size="lg" spin />
      </div>
      <div className="variant-item">
        <div className="variant-label">Pulse</div>
        <BaseIcon name="notification" size="lg" pulse />
      </div>
      <div className="variant-item">
        <div className="variant-label">Bounce</div>
        <BaseIcon name="arrow_up" size="lg" bounce />
      </div>
      <div className="variant-item">
        <div className="variant-label">Shake</div>
        <BaseIcon name="warning" size="lg" shake />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ícones com diferentes animações.',
      },
    },
  },
};

// Biblioteca completa
export const IconLibrary: Story = {
  render: () => {
    const categories = {
      'Navegação': ['home', 'back', 'forward', 'up', 'down', 'menu', 'close'],
      'Ações': ['add', 'remove', 'edit', 'delete', 'save', 'copy', 'paste', 'cut'],
      'Status': ['check', 'error', 'warning', 'info', 'success'],
      'Comunicação': ['message', 'email', 'phone', 'notification', 'chat'],
      'Usuário': ['user', 'users', 'profile', 'settings', 'logout'],
      'Família': ['family', 'child', 'adult', 'elderly'],
      'Tarefas': ['cleaning', 'cooking', 'laundry', 'dishes', 'shopping', 'garden'],
      'Gamificação': ['star', 'trophy', 'medal', 'crown', 'fire', 'diamond'],
      'Tempo': ['clock', 'calendar', 'timer', 'alarm'],
      'Sistema': ['search', 'filter', 'sort', 'refresh', 'sync', 'download', 'upload'],
    };

    return (
      <div className="story-container">
        <div className="story-header">
          <h3 className="story-title">Biblioteca de Ícones Completa</h3>
          <p className="story-description">
            Todos os {Object.keys(ICON_LIBRARY).length} ícones disponíveis organizados por categoria.
          </p>
        </div>
        
        {Object.entries(categories).map(([category, icons]) => (
          <div key={category} style={{ marginBottom: '32px' }}>
            <h4 style={{ 
              marginBottom: '16px', 
              color: '#333',
              borderBottom: '1px solid #eee',
              paddingBottom: '8px'
            }}>
              {category}
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
              gap: '16px' 
            }}>
              {icons.map((iconName) => (
                <div key={iconName} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '12px',
                  border: '1px solid #e1e5e9',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                }}>
                  <BaseIcon name={iconName as IconName} size="lg" />
                  <span style={{ 
                    fontSize: '11px', 
                    color: '#666', 
                    marginTop: '8px',
                    textAlign: 'center'
                  }}>
                    {iconName}
                  </span>
                  <span style={{ 
                    fontSize: '10px', 
                    color: '#999', 
                    marginTop: '2px'
                  }}>
                    {ICON_LIBRARY[iconName as IconName]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Catálogo completo de todos os ícones disponíveis na biblioteca, organizados por categoria.',
      },
    },
  },
};

// IconWithBadge
export const WithBadge: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Notificação com Badge</div>
        <IconWithBadge name="notification" badge="3" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Mensagem com Badge</div>
        <IconWithBadge name="message" badge="12" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Badge Customizado</div>
        <IconWithBadge name="email" badge="99+" badgeColor="green" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Sem Badge</div>
        <IconWithBadge name="user" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ícones com badges para indicar contadores ou status.',
      },
    },
  },
};

// IconButton
export const IconButtons: Story = {
  render: () => (
    <div className="variants-grid">
      <div className="variant-item">
        <div className="variant-label">Botão Normal</div>
        <IconButton name="edit" onPress={() => alert('Clicou!')} />
      </div>
      <div className="variant-item">
        <div className="variant-label">Botão Desabilitado</div>
        <IconButton name="delete" onPress={() => alert('Clicou!')} disabled />
      </div>
      <div className="variant-item">
        <div className="variant-label">Apenas Ícone</div>
        <IconButton name="settings" />
      </div>
      <div className="variant-item">
        <div className="variant-label">Com Hover</div>
        <IconButton name="heart" onPress={() => alert('❤️')} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ícones que funcionam como botões clicáveis.',
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
          Exemplos de como usar ícones em diferentes contextos do aplicativo.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Navegação */}
        <div>
          <h4>Navegação</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <IconButton name="back" />
            <IconButton name="home" />
            <IconButton name="menu" />
            <IconWithBadge name="notification" badge="5" />
            <IconButton name="settings" />
          </div>
        </div>
        
        {/* Status e Feedback */}
        <div>
          <h4>Status e Feedback</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <BaseIcon name="success" color="green" size="lg" />
            <BaseIcon name="warning" color="orange" size="lg" />
            <BaseIcon name="error" color="red" size="lg" />
            <BaseIcon name="info" color="blue" size="lg" />
            <BaseIcon name="loading" spin size="lg" />
          </div>
        </div>
        
        {/* Ações Rápidas */}
        <div>
          <h4>Ações Rápidas</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <IconButton name="add" />
            <IconButton name="edit" />
            <IconButton name="delete" />
            <IconButton name="copy" />
            <IconButton name="share" />
          </div>
        </div>
        
        {/* Família e Tarefas */}
        <div>
          <h4>Família e Tarefas Domésticas</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <BaseIcon name="family" size="lg" />
            <BaseIcon name="cleaning" size="lg" />
            <BaseIcon name="cooking" size="lg" />
            <BaseIcon name="laundry" size="lg" />
            <BaseIcon name="garden" size="lg" />
          </div>
        </div>
        
        {/* Gamificação */}
        <div>
          <h4>Gamificação</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <BaseIcon name="trophy" color="gold" size="lg" />
            <BaseIcon name="medal" color="silver" size="lg" />
            <BaseIcon name="star" color="orange" size="lg" />
            <BaseIcon name="crown" color="purple" size="lg" />
            <BaseIcon name="fire" color="red" size="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplos práticos de uso dos ícones em diferentes contextos do aplicativo DOM v2.',
      },
    },
  },
};

// Playground interativo
export const Playground: Story = {
  args: {
    name: 'home',
    size: 'md',
    rotate: 0,
    spin: false,
    pulse: false,
    bounce: false,
    shake: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use os controles abaixo para experimentar diferentes configurações do ícone.',
      },
    },
  },
};
