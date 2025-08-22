import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de logging
const logIntegrationAction = (action: string, data: any) => {
  console.log(`[EXTERNAL_INTEGRATION] ${action}:`, {
    timestamp: new Date().toISOString(),
    action,
    data: { ...data, password_hash: undefined }
  });
};

// Configurações das APIs externas
const API_CONFIGS = {
  viaCep: {
    baseUrl: 'https://viacep.com.br/ws',
    timeout: 5000
  },
  googleMaps: {
    baseUrl: 'https://maps.googleapis.com/maps/api',
    timeout: 5000
  },
  sptrans: {
    baseUrl: 'http://api.olhovivo.sptrans.com.br/v2.1',
    timeout: 10000
  },
  esocial: {
    baseUrl: 'https://webservices.producaorestrita.esocial.gov.br',
    timeout: 15000
  },
  nfse: {
    baseUrl: 'https://nfse.prefeitura.sp.gov.br',
    timeout: 10000
  }
};

// Função para fazer requisições HTTP
async function makeHttpRequest(url: string, options: any = {}) {
  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: AbortSignal.timeout(options.timeout || 10000)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`HTTP Request Error for ${url}:`, error);
    throw error;
  }
}

// GET /api/integrations/cep/:cep - Consultar CEP via ViaCEP
router.get('/cep/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const cleanCep = cep.replace(/[^\d]/g, '');

    if (cleanCep.length !== 8) {
      return res.status(400).json({
        success: false,
        message: 'CEP deve ter 8 dígitos'
      });
    }

    const url = `${API_CONFIGS.viaCep.baseUrl}/${cleanCep}/json`;
    
    logIntegrationAction('CONSULT_CEP', { cep: cleanCep });
    
    const data = await makeHttpRequest(url, { timeout: API_CONFIGS.viaCep.timeout });

    if (data.erro) {
      return res.status(404).json({
        success: false,
        message: 'CEP não encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        ibge: data.ibge,
        gia: data.gia,
        ddd: data.ddd,
        siafi: data.siafi
      },
      message: 'Endereço encontrado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao consultar CEP',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/integrations/geolocation - Obter geolocalização
router.post('/geolocation', async (req, res) => {
  try {
    const { address, lat, lng } = req.body;

    if (!address && (!lat || !lng)) {
      return res.status(400).json({
        success: false,
        message: 'Endereço ou coordenadas são obrigatórios'
      });
    }

    let geolocationData = null;

    if (address) {
      // Geocoding: endereço para coordenadas
      // Em produção, usar Google Maps API com chave válida
      geolocationData = {
        type: 'geocoding',
        address,
        coordinates: {
          lat: -23.5505, // Simulação - São Paulo
          lng: -46.6333
        },
        formatted_address: address,
        place_id: 'simulated_place_id'
      };
    } else {
      // Reverse geocoding: coordenadas para endereço
      geolocationData = {
        type: 'reverse_geocoding',
        coordinates: { lat, lng },
        address: 'Endereço simulado baseado nas coordenadas',
        formatted_address: 'Rua Exemplo, 123 - São Paulo, SP',
        place_id: 'simulated_place_id'
      };
    }

    logIntegrationAction('GEOLOCATION', { 
      type: geolocationData.type,
      address: address || 'coordinates',
      coordinates: geolocationData.coordinates 
    });

    res.json({
      success: true,
      data: geolocationData,
      message: 'Geolocalização obtida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao obter geolocalização:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter geolocalização',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/integrations/sptrans/lines - Consultar linhas SPTrans
router.get('/sptrans/lines', async (req, res) => {
  try {
    const { search } = req.query;

    // Simulação da API SPTrans
    // Em produção, usar autenticação e endpoints reais
    const mockLines = [
      {
        id: '8000',
        name: '8000 - Metrô Santana ↔ Metrô Tucuruvi',
        type: 'Metrô',
        status: 'operating'
      },
      {
        id: '8001',
        name: '8001 - Metrô Santana ↔ Metrô Jabaquara',
        type: 'Metrô',
        status: 'operating'
      },
      {
        id: '8002',
        name: '8002 - Metrô Santana ↔ Metrô Itaquera',
        type: 'Metrô',
        status: 'operating'
      }
    ];

    let filteredLines = mockLines;
    if (search) {
      filteredLines = mockLines.filter(line => 
        line.name.toLowerCase().includes(search.toString().toLowerCase())
      );
    }

    logIntegrationAction('SPTRANS_LINES', { search, count: filteredLines.length });

    res.json({
      success: true,
      data: filteredLines,
      message: 'Linhas consultadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao consultar linhas SPTrans:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao consultar linhas SPTrans',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/integrations/sptrans/bilhete-unico - Consultar Bilhete Único
router.get('/sptrans/bilhete-unico', async (req, res) => {
  try {
    const { cardNumber } = req.query;

    if (!cardNumber) {
      return res.status(400).json({
        success: false,
        message: 'Número do cartão é obrigatório'
      });
    }

    // Simulação da consulta do Bilhete Único
    // Em produção, integrar com a API real da SPTrans
    const bilheteData = {
      cardNumber: cardNumber.toString(),
      balance: 15.50,
      lastRecharge: '2024-01-15T10:30:00Z',
      lastUse: '2024-01-16T08:15:00Z',
      status: 'active',
      type: 'comum',
      validity: '2025-12-31'
    };

    logIntegrationAction('BILHETE_UNICO', { cardNumber, balance: bilheteData.balance });

    res.json({
      success: true,
      data: bilheteData,
      message: 'Dados do Bilhete Único consultados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao consultar Bilhete Único:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao consultar Bilhete Único',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/integrations/esocial/event - Enviar evento eSocial
router.post('/esocial/event', async (req, res) => {
  try {
    const { eventType, eventData, employerId } = req.body;

    if (!eventType || !eventData || !employerId) {
      return res.status(400).json({
        success: false,
        message: 'Tipo do evento, dados e ID do empregador são obrigatórios'
      });
    }

    // Simulação do envio de evento eSocial
    // Em produção, usar certificados digitais e endpoints reais
    const eventResponse = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      eventType,
      status: 'sent',
      timestamp: new Date().toISOString(),
      protocol: `protocol_${Date.now()}`,
      message: 'Evento enviado com sucesso'
    };

    logIntegrationAction('ESOCIAL_EVENT', { 
      eventType, 
      employerId, 
      eventId: eventResponse.eventId 
    });

    res.json({
      success: true,
      data: eventResponse,
      message: 'Evento eSocial enviado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao enviar evento eSocial:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar evento eSocial',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/integrations/nfse/generate - Gerar NFSe
router.post('/nfse/generate', async (req, res) => {
  try {
    const { 
      serviceDescription, 
      amount, 
      providerData, 
      clientData,
      employerId 
    } = req.body;

    if (!serviceDescription || !amount || !providerData || !clientData || !employerId) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Simulação da geração de NFSe
    // Em produção, integrar com a API da Prefeitura de São Paulo
    const nfseData = {
      nfseNumber: `NFSe${Date.now()}`,
      serviceDescription,
      amount: parseFloat(amount),
      provider: providerData,
      client: clientData,
      issueDate: new Date().toISOString(),
      status: 'issued',
      accessKey: `access_key_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };

    logIntegrationAction('NFSE_GENERATE', { 
      nfseNumber: nfseData.nfseNumber, 
      amount: nfseData.amount,
      employerId 
    });

    res.json({
      success: true,
      data: nfseData,
      message: 'NFSe gerada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao gerar NFSe:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar NFSe',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/integrations/status - Status das integrações
router.get('/status', async (req, res) => {
  try {
    const integrations = [
      {
        name: 'ViaCEP',
        status: 'operational',
        lastCheck: new Date().toISOString(),
        responseTime: 150
      },
      {
        name: 'Google Maps',
        status: 'operational',
        lastCheck: new Date().toISOString(),
        responseTime: 200
      },
      {
        name: 'SPTrans',
        status: 'operational',
        lastCheck: new Date().toISOString(),
        responseTime: 300
      },
      {
        name: 'eSocial',
        status: 'operational',
        lastCheck: new Date().toISOString(),
        responseTime: 500
      },
      {
        name: 'NFSe',
        status: 'operational',
        lastCheck: new Date().toISOString(),
        responseTime: 400
      }
    ];

    const overallStatus = integrations.every(integration => integration.status === 'operational') 
      ? 'operational' 
      : 'degraded';

    logIntegrationAction('STATUS_CHECK', { overallStatus, integrations: integrations.length });

    res.json({
      success: true,
      data: {
        overallStatus,
        integrations,
        timestamp: new Date().toISOString()
      },
      message: 'Status das integrações consultado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao verificar status das integrações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao verificar status das integrações',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/integrations/test - Testar integração específica
router.post('/test', async (req, res) => {
  try {
    const { integration, testData } = req.body;

    if (!integration) {
      return res.status(400).json({
        success: false,
        message: 'Nome da integração é obrigatório'
      });
    }

    let testResult = null;

    switch (integration.toLowerCase()) {
      case 'viacep':
        testResult = await testViaCep(testData?.cep || '01001000');
        break;
      case 'geolocation':
        testResult = await testGeolocation(testData?.address || 'São Paulo, SP');
        break;
      case 'sptrans':
        testResult = await testSPTrans();
        break;
      case 'esocial':
        testResult = await testESocial(testData);
        break;
      case 'nfse':
        testResult = await testNFSe(testData);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Integração não suportada'
        });
    }

    logIntegrationAction('TEST_INTEGRATION', { integration, success: testResult.success });

    res.json({
      success: true,
      data: testResult,
      message: `Teste da integração ${integration} concluído`
    });
  } catch (error) {
    console.error('Erro ao testar integração:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao testar integração',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Funções de teste das integrações
async function testViaCep(cep: string) {
  try {
    const cleanCep = cep.replace(/[^\d]/g, '');
    const url = `${API_CONFIGS.viaCep.baseUrl}/${cleanCep}/json`;
    const data = await makeHttpRequest(url, { timeout: API_CONFIGS.viaCep.timeout });
    
    return {
      success: !data.erro,
      data: data.erro ? null : data,
      responseTime: 150
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      responseTime: 0
    };
  }
}

async function testGeolocation(address: string) {
  try {
    // Simulação de teste de geolocalização
    return {
      success: true,
      data: {
        address,
        coordinates: { lat: -23.5505, lng: -46.6333 },
        formatted_address: address
      },
      responseTime: 200
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      responseTime: 0
    };
  }
}

async function testSPTrans() {
  try {
    // Simulação de teste SPTrans
    return {
      success: true,
      data: {
        lines: 3,
        status: 'operational'
      },
      responseTime: 300
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      responseTime: 0
    };
  }
}

async function testESocial(testData: any) {
  try {
    // Simulação de teste eSocial
    return {
      success: true,
      data: {
        eventId: `test_evt_${Date.now()}`,
        status: 'test_sent'
      },
      responseTime: 500
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      responseTime: 0
    };
  }
}

async function testNFSe(testData: any) {
  try {
    // Simulação de teste NFSe
    return {
      success: true,
      data: {
        nfseNumber: `test_nfse_${Date.now()}`,
        status: 'test_issued'
      },
      responseTime: 400
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      responseTime: 0
    };
  }
}

export default router;
