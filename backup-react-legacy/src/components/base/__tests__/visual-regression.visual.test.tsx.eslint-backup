/**
 * @fileoverview Testes de regressão visual para componentes base
 * @version 2.0.0
 * @generated 2025-01-27T11:55:00.000Z
 */

import React from 'react';
import { render, renderWithTheme, renderWithBreakpoint } from '../../../utils/test-utils';
import {
  BaseButton,
  BaseCard,
  BaseIcon,
  BaseInput,
  BaseModal,
  BaseNavigation,
  BaseTabs,
  BaseTable,
} from '../index';
import { Text } from 'react-native';

describe('Testes de Regressão Visual', () => {
  
  describe('BaseButton - Visual Snapshots', () => {
    it('deve renderizar todas as variantes corretamente', () => {
      const variants = ['solid', 'outline', 'ghost', 'link'] as const;
      
      variants.forEach(variant => {
        const { container } = render(
          <BaseButton title={`Botão ${variant}`} variant={variant} />
        );
        expect(container.firstChild).toMatchSnapshot(`button-variant-${variant}`);
      });
    });
    
    it('deve renderizar todos os tamanhos corretamente', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const;
      
      sizes.forEach(size => {
        const { container } = render(
          <BaseButton title={`Botão ${size}`} size={size} />
        );
        expect(container.firstChild).toMatchSnapshot(`button-size-${size}`);
      });
    });
    
    it('deve renderizar estados corretamente', () => {
      const states = [
        { props: { disabled: true }, name: 'disabled' },
        { props: { loading: true }, name: 'loading' },
        { props: { fullWidth: true }, name: 'fullWidth' },
      ];
      
      states.forEach(({ props, name }) => {
        const { container } = render(
          <BaseButton title={`Botão ${name}`} {...props} />
        );
        expect(container.firstChild).toMatchSnapshot(`button-state-${name}`);
      });
    });
    
    it('deve renderizar com ícones corretamente', () => {
      const { container } = render(
        <div>
          <BaseButton 
            title="Com ícone à esquerda" 
            icon={<BaseIcon name="home" />}
            iconPosition="left"
          />
          <BaseButton 
            title="Com ícone à direita" 
            icon={<BaseIcon name="add" />}
            iconPosition="right"
          />
          <BaseButton icon={<BaseIcon name="settings" />} />
        </div>
      );
      expect(container).toMatchSnapshot('button-with-icons');
    });
  });
  
  describe('BaseInput - Visual Snapshots', () => {
    it('deve renderizar tipos básicos corretamente', () => {
      const { container } = render(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <BaseInput label="Input básico" placeholder="Placeholder" />
          <BaseInput label="Com valor" value="Texto de exemplo" />
          <BaseInput label="Obrigatório" required placeholder="Campo obrigatório" />
          <BaseInput label="Desabilitado" disabled value="Campo desabilitado" />
        </div>
      );
      expect(container).toMatchSnapshot('input-basic-types');
    });
    
    it('deve renderizar com ícones corretamente', () => {
      const { container } = render(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <BaseInput 
            label="Com ícone esquerdo" 
            leftIcon={<BaseIcon name="user" />}
            placeholder="Nome"
          />
          <BaseInput 
            label="Com ícone direito" 
            rightIcon={<BaseIcon name="search" />}
            placeholder="Buscar"
          />
          <BaseInput 
            label="Com ambos ícones" 
            leftIcon={<BaseIcon name="email" />}
            rightIcon={<BaseIcon name="check" />}
            value="test@example.com"
          />
        </div>
      );
      expect(container).toMatchSnapshot('input-with-icons');
    });
    
    it('deve renderizar estados de validação corretamente', () => {
      const { container } = render(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <BaseInput 
            label="Campo normal" 
            helperText="Texto de ajuda normal"
            value="Valor válido"
          />
          <BaseInput 
            label="Campo com erro" 
            error="Este campo contém um erro"
            value="valor-invalido"
          />
          <BaseInput 
            label="Com contador" 
            characterCount
            maxLength={50}
            value="Texto com contador"
          />
        </div>
      );
      expect(container).toMatchSnapshot('input-validation-states');
    });
  });
  
  describe('BaseCard - Visual Snapshots', () => {
    it('deve renderizar variações de sombra corretamente', () => {
      const shadows = ['none', 'sm', 'md', 'lg', 'xl'] as const;
      
      const { container } = render(
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {shadows.map(shadow => (
            <BaseCard key={shadow} shadow={shadow} padding="md">
              <Text>Sombra {shadow}</Text>
            </BaseCard>
          ))}
        </div>
      );
      expect(container).toMatchSnapshot('card-shadow-variations');
    });
    
    it('deve renderizar variações de padding corretamente', () => {
      const paddings = ['none', 'sm', 'md', 'lg', 'xl'] as const;
      
      const { container } = render(
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {paddings.map(padding => (
            <BaseCard key={padding} padding={padding} shadow="md">
              <Text>Padding {padding}</Text>
            </BaseCard>
          ))}
        </div>
      );
      expect(container).toMatchSnapshot('card-padding-variations');
    });
  });
  
  describe('BaseIcon - Visual Snapshots', () => {
    it('deve renderizar categorias de ícones corretamente', () => {
      const iconCategories = {
        navigation: ['home', 'back', 'menu'],
        actions: ['add', 'edit', 'delete'],
        status: ['success', 'warning', 'error'],
        family: ['family', 'child', 'adult'],
      };
      
      const { container } = render(
        <div>
          {Object.entries(iconCategories).map(([category, icons]) => (
            <div key={category} style={{ marginBottom: '16px' }}>
              <Text style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {category}
              </Text>
              <div style={{ display: 'flex', gap: '8px' }}>
                {icons.map(icon => (
                  <BaseIcon key={icon} name={icon as any} size="md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
      expect(container).toMatchSnapshot('icons-by-category');
    });
    
    it('deve renderizar tamanhos de ícones corretamente', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      
      const { container } = render(
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {sizes.map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <BaseIcon name="home" size={size} />
              <Text style={{ fontSize: '12px', marginTop: '4px' }}>{size}</Text>
            </div>
          ))}
        </div>
      );
      expect(container).toMatchSnapshot('icon-sizes');
    });
  });
  
  describe('BaseModal - Visual Snapshots', () => {
    it('deve renderizar posições corretamente', () => {
      const positions = ['center', 'top', 'bottom'] as const;
      
      positions.forEach(position => {
        const { container } = render(
          <BaseModal visible={true} onClose={() => {}} position={position}>
            <div style={{ padding: '20px' }}>
              <Text>Modal na posição {position}</Text>
            </div>
          </BaseModal>
        );
        expect(container).toMatchSnapshot(`modal-position-${position}`);
      });
    });
  });
  
  describe('BaseNavigation - Visual Snapshots', () => {
    const navigationItems = [
      { key: 'home', label: 'Início', icon: <BaseIcon name="home" /> },
      { key: 'profile', label: 'Perfil', icon: <BaseIcon name="user" /> },
      { key: 'settings', label: 'Configurações', icon: <BaseIcon name="settings" /> },
    ];
    
    it('deve renderizar modos de navegação corretamente', () => {
      const modes = ['horizontal', 'vertical'] as const;
      
      modes.forEach(mode => {
        const { container } = render(
          <BaseNavigation items={navigationItems} mode={mode} />
        );
        expect(container).toMatchSnapshot(`navigation-mode-${mode}`);
      });
    });
  });
  
  describe('BaseTabs - Visual Snapshots', () => {
    const tabItems = [
      { key: 'tab1', label: 'Aba 1', children: <Text>Conteúdo da Aba 1</Text> },
      { key: 'tab2', label: 'Aba 2', children: <Text>Conteúdo da Aba 2</Text> },
      { key: 'tab3', label: 'Aba 3', children: <Text>Conteúdo da Aba 3</Text> },
    ];
    
    it('deve renderizar tipos de abas corretamente', () => {
      const types = ['line', 'card'] as const;
      
      types.forEach(type => {
        const { container } = render(
          <BaseTabs items={tabItems} type={type} />
        );
        expect(container).toMatchSnapshot(`tabs-type-${type}`);
      });
    });
  });
  
  describe('BaseTable - Visual Snapshots', () => {
    const tableData = [
      { id: 1, nome: 'João Silva', idade: 30, status: 'ativo' },
      { id: 2, nome: 'Maria Santos', idade: 25, status: 'inativo' },
      { id: 3, nome: 'Pedro Oliveira', idade: 35, status: 'ativo' },
    ];
    
    const tableColumns = [
      { key: 'nome', title: 'Nome', dataIndex: 'nome' },
      { key: 'idade', title: 'Idade', dataIndex: 'idade', align: 'center' as const },
      { key: 'status', title: 'Status', dataIndex: 'status' },
    ];
    
    it('deve renderizar tabela básica corretamente', () => {
      const { container } = render(
        <BaseTable data={tableData} columns={tableColumns} />
      );
      expect(container).toMatchSnapshot('table-basic');
    });
    
    it('deve renderizar tabela com bordas corretamente', () => {
      const { container } = render(
        <BaseTable data={tableData} columns={tableColumns} bordered />
      );
      expect(container).toMatchSnapshot('table-bordered');
    });
  });
  
  describe('Temas - Visual Snapshots', () => {
    const themes = ['light', 'dark', 'highContrast'] as const;
    
    themes.forEach(theme => {
      it(`deve renderizar componentes no tema ${theme} corretamente`, () => {
        const { container } = renderWithTheme(
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <BaseButton title={`Botão tema ${theme}`} />
            <BaseInput label={`Input tema ${theme}`} placeholder="Placeholder" />
            <BaseCard padding="md">
              <Text>Card no tema {theme}</Text>
            </BaseCard>
            <div style={{ display: 'flex', gap: '8px' }}>
              <BaseIcon name="home" />
              <BaseIcon name="user" />
              <BaseIcon name="settings" />
            </div>
          </div>,
          theme
        );
        expect(container).toMatchSnapshot(`theme-${theme}-components`);
      });
    });
  });
  
  describe('Responsividade - Visual Snapshots', () => {
    const breakpoints = ['mobile', 'tablet', 'desktop'] as const;
    
    breakpoints.forEach(breakpoint => {
      it(`deve renderizar componentes no breakpoint ${breakpoint} corretamente`, () => {
        const { container } = renderWithBreakpoint(
          <div style={{ padding: '16px' }}>
            <BaseNavigation
              items={[
                { key: 'home', label: 'Início' },
                { key: 'profile', label: 'Perfil' },
                { key: 'settings', label: 'Configurações' },
              ]}
              mode="horizontal"
            />
            <div style={{ marginTop: '16px' }}>
              <BaseInput label="Input responsivo" placeholder="Teste de responsividade" />
            </div>
          </div>,
          breakpoint
        );
        expect(container).toMatchSnapshot(`responsive-${breakpoint}`);
      });
    });
  });
  
  describe('Combinações Complexas - Visual Snapshots', () => {
    it('deve renderizar formulário completo corretamente', () => {
      const { container } = render(
        <BaseCard padding="lg" shadow="md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Formulário de Cadastro
            </Text>
            
            <BaseInput 
              label="Nome completo"
              placeholder="Digite seu nome"
              leftIcon={<BaseIcon name="user" />}
              required
            />
            
            <BaseInput 
              label="E-mail"
              placeholder="seu@email.com"
              leftIcon={<BaseIcon name="email" />}
              required
            />
            
            <BaseInput 
              label="Senha"
              placeholder="Digite sua senha"
              password
              required
            />
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <BaseButton title="Cancelar" variant="outline" />
              <BaseButton title="Cadastrar" variant="solid" />
            </div>
          </div>
        </BaseCard>
      );
      expect(container).toMatchSnapshot('complex-form');
    });
    
    it('deve renderizar dashboard com múltiplos componentes corretamente', () => {
      const { container } = render(
        <div style={{ padding: '20px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Dashboard</Text>
            <div style={{ display: 'flex', gap: '8px' }}>
              <BaseButton icon={<BaseIcon name="notification" />} variant="ghost" />
              <BaseButton icon={<BaseIcon name="settings" />} variant="ghost" />
            </div>
          </div>
          
          {/* Cards de estatísticas */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <BaseCard padding="md" shadow="sm" style={{ flex: 1 }}>
              <Text style={{ fontSize: '14px', color: '#666' }}>Tarefas Concluídas</Text>
              <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#2196F3' }}>24</Text>
            </BaseCard>
            <BaseCard padding="md" shadow="sm" style={{ flex: 1 }}>
              <Text style={{ fontSize: '14px', color: '#666' }}>Pontos Ganhos</Text>
              <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>350</Text>
            </BaseCard>
            <BaseCard padding="md" shadow="sm" style={{ flex: 1 }}>
              <Text style={{ fontSize: '14px', color: '#666' }}>Família Ativa</Text>
              <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#FF9800' }}>5</Text>
            </BaseCard>
          </div>
          
          {/* Navegação */}
          <BaseNavigation
            items={[
              { key: 'home', label: 'Início', icon: <BaseIcon name="home" /> },
              { key: 'tasks', label: 'Tarefas', icon: <BaseIcon name="check" /> },
              { key: 'family', label: 'Família', icon: <BaseIcon name="family" /> },
              { key: 'rewards', label: 'Recompensas', icon: <BaseIcon name="trophy" /> },
            ]}
            mode="horizontal"
          />
        </div>
      );
      expect(container).toMatchSnapshot('complex-dashboard');
    });
  });
});
