/**
 * @fileoverview Sistema de adaptação regional para DOM v2
 * @directory frontend/src/utils
 * @description Adaptação de interface E conteúdo por região brasileira
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

// Tipos de região brasileira
export type BrazilianRegion = 
  | 'SUDESTE'    // SP, RJ, MG, ES
  | 'SUL'        // RS, SC, PR
  | 'NORDESTE'   // BA, PE, CE, etc.
  | 'CENTRO_OESTE' // GO, MT, MS, DF
  | 'NORTE';     // AM, PA, AC, etc.

// Configuração regional
export interface RegionalConfig {
  region: BrazilianRegion;
  language: 'STANDARD' | 'REGIONAL' | 'FORMAL';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    fontSize: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    style: 'PROFESSIONAL' | 'FRIENDLY' | 'FORMAL';
  };
  navigation: 'FAST' | 'COMFORTABLE' | 'GUIDED';
  content: {
    detail: 'MINIMAL' | 'STANDARD' | 'DETAILED';
    help: 'NONE' | 'BASIC' | 'EXTENSIVE';
  };
}

// Mapeamento de estados para regiões
const STATE_REGION_MAP: Record<string, BrazilianRegion> = {
  // Sudeste
  'SP': 'SUDESTE', 'RJ': 'SUDESTE', 'MG': 'SUDESTE', 'ES': 'SUDESTE',
  // Sul
  'RS': 'SUL', 'SC': 'SUL', 'PR': 'SUL',
  // Nordeste
  'BA': 'NORDESTE', 'PE': 'NORDESTE', 'CE': 'NORDESTE', 'MA': 'NORDESTE',
  'PB': 'NORDESTE', 'RN': 'NORDESTE', 'AL': 'NORDESTE', 'SE': 'NORDESTE',
  'PI': 'NORDESTE',
  // Centro-Oeste
  'GO': 'CENTRO_OESTE', 'MT': 'CENTRO_OESTE', 'MS': 'CENTRO_OESTE', 'DF': 'CENTRO_OESTE',
  // Norte
  'AM': 'NORTE', 'PA': 'NORTE', 'AC': 'NORTE', 'RO': 'NORTE',
  'RR': 'NORTE', 'AP': 'NORTE', 'TO': 'NORTE'
};

// Configurações por região
const REGIONAL_CONFIGS: Record<BrazilianRegion, RegionalConfig> = {
  SUDESTE: {
    region: 'SUDESTE',
    language: 'STANDARD',
    colors: {
      primary: '#1976D2',      // Azul profissional
      secondary: '#4CAF50',    // Verde sucesso
      accent: '#FF9800',       // Laranja destaque
    },
    typography: {
      fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 },
      style: 'PROFESSIONAL',
    },
    navigation: 'FAST',
    content: {
      detail: 'MINIMAL',
      help: 'BASIC',
    },
  },

  SUL: {
    region: 'SUL',
    language: 'STANDARD',
    colors: {
      primary: '#2196F3',      // Azul organizado
      secondary: '#4CAF50',    // Verde limpo
      accent: '#9C27B0',       // Roxo elegante
    },
    typography: {
      fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 },
      style: 'PROFESSIONAL',
    },
    navigation: 'COMFORTABLE',
    content: {
      detail: 'STANDARD',
      help: 'BASIC',
    },
  },

  NORDESTE: {
    region: 'NORDESTE',
    language: 'REGIONAL',
    colors: {
      primary: '#FF5722',      // Laranja vibrante
      secondary: '#9C27B0',    // Roxo amigável
      accent: '#FFC107',       // Amarelo quente
    },
    typography: {
      fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 },
      style: 'FRIENDLY',
    },
    navigation: 'COMFORTABLE',
    content: {
      detail: 'STANDARD',
      help: 'EXTENSIVE',
    },
  },

  CENTRO_OESTE: {
    region: 'CENTRO_OESTE',
    language: 'STANDARD',
    colors: {
      primary: '#607D8B',      // Azul acinzentado
      secondary: '#795548',    // Marrom prático
      accent: '#FF9800',       // Laranja direto
    },
    typography: {
      fontSize: { small: 13, medium: 15, large: 17, xlarge: 19 },
      style: 'PROFESSIONAL',
    },
    navigation: 'FAST',
    content: {
      detail: 'STANDARD',
      help: 'BASIC',
    },
  },

  NORTE: {
    region: 'NORTE',
    language: 'REGIONAL',
    colors: {
      primary: '#4CAF50',      // Verde educativo
      secondary: '#2196F3',    // Azul simples
      accent: '#FF9800',       // Laranja amigável
    },
    typography: {
      fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 },
      style: 'FRIENDLY',
    },
    navigation: 'GUIDED',
    content: {
      detail: 'DETAILED',
      help: 'EXTENSIVE',
    },
  },
};

// Mensagens regionais
export const REGIONAL_MESSAGES = {
  SUDESTE: {
    welcome: 'Bem-vindo ao DOM v2!',
    dashboard: 'Painel de Controle',
    quickActions: 'Ações Rápidas',
    help: 'Precisa de ajuda?',
    success: 'Operação realizada com sucesso!',
    error: 'Ocorreu um erro. Tente novamente.',
  },

  SUL: {
    welcome: 'Bem-vindo ao DOM v2!',
    dashboard: 'Painel de Controle',
    quickActions: 'Ações Rápidas',
    help: 'Precisa de ajuda?',
    success: 'Operação realizada com sucesso!',
    error: 'Ocorreu um erro. Tente novamente.',
  },

  NORDESTE: {
    welcome: 'Oi! Bem-vindo ao DOM v2!',
    dashboard: 'Seu Painel',
    quickActions: 'Coisas Rápidas',
    help: 'Tá precisando de uma mãozinha?',
    success: 'Deu tudo certo!',
    error: 'Ops! Deu ruim. Tenta de novo.',
  },

  CENTRO_OESTE: {
    welcome: 'Bem-vindo ao DOM v2!',
    dashboard: 'Painel de Controle',
    quickActions: 'Ações Rápidas',
    help: 'Precisa de ajuda?',
    success: 'Operação realizada com sucesso!',
    error: 'Ocorreu um erro. Tente novamente.',
  },

  NORTE: {
    welcome: 'Oi! Bem-vindo ao DOM v2!',
    dashboard: 'Seu Painel',
    quickActions: 'Coisas Rápidas',
    help: 'Tá precisando de uma mãozinha?',
    success: 'Deu tudo certo!',
    error: 'Ops! Deu ruim. Tenta de novo.',
  },
};

// Função para detectar região por estado
export function detectRegionByState(state: string): BrazilianRegion {
  const normalizedState = state.toUpperCase().trim();
  return STATE_REGION_MAP[normalizedState] || 'SUDESTE'; // Padrão Sudeste
}

// Função para obter configuração regional
export function getRegionalConfig(region: BrazilianRegion): RegionalConfig {
  return REGIONAL_CONFIGS[region];
}

// Função para obter mensagens regionais
export function getRegionalMessages(region: BrazilianRegion) {
  return REGIONAL_MESSAGES[region];
}

// Função para detectar região automaticamente (simulada)
export function detectUserRegion(): Promise<BrazilianRegion> {
  return new Promise((resolve) => {
    // Simulação de detecção automática
    // Em produção, isso seria baseado em:
    // - Geolocalização do dispositivo
    // - Configuração do usuário
    // - IP do usuário
    // - Preferências salvas
    
    const regions: BrazilianRegion[] = ['SUDESTE', 'SUL', 'NORDESTE', 'CENTRO_OESTE', 'NORTE'];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    
    // Simular delay de rede
    setTimeout(() => {
      resolve(randomRegion);
    }, 500);
  });
}

import React from 'react';

// Hook para usar adaptação regional
export function useRegionalAdaptation() {
  const [region, setRegion] = React.useState<BrazilianRegion>('SUDESTE');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    detectUserRegion().then((detectedRegion) => {
      setRegion(detectedRegion);
      setLoading(false);
    });
  }, []);

  const config = React.useMemo(() => getRegionalConfig(region), [region]);
  const messages = React.useMemo(() => getRegionalMessages(region), [region]);

  return {
    region,
    config,
    messages,
    loading,
    setRegion,
  };
} 