import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de logging
const logValidationAction = (action: string, data: any) => {
  console.log(`[ESOCIAL_VALIDATION] ${action}:`, {
    timestamp: new Date().toISOString(),
    action,
    data: { ...data, password_hash: undefined }
  });
};

// Função para validar CPF
function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2;
}

// Função para validar email
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar telefone
function validatePhone(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/[^\d]/g, '');
  // Verifica se tem entre 10 e 11 dígitos (com DDD)
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

// Função para validar CEP
function validateCEP(cep: string): boolean {
  const cleanCEP = cep.replace(/[^\d]/g, '');
  return cleanCEP.length === 8;
}

// POST /api/esocial/validate-cpf - Validar CPF
router.post('/validate-cpf', async (req, res) => {
  try {
    const { cpf } = req.body;

    if (!cpf) {
      return res.status(400).json({
        success: false,
        message: 'CPF é obrigatório'
      });
    }

    const isValid = validateCPF(cpf);
    
    logValidationAction('VALIDATE_CPF', { cpf: cpf.replace(/\d(?=\d{3})/g, '*'), isValid });
    
    res.json({
      success: true,
      data: {
        cpf: cpf.replace(/\d(?=\d{3})/g, '*'), // Mascara o CPF na resposta
        isValid,
        message: isValid ? 'CPF válido' : 'CPF inválido'
      }
    });
  } catch (error) {
    console.error('Erro ao validar CPF:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/esocial/validate-email - Validar email
router.post('/validate-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email é obrigatório'
      });
    }

    const isValid = validateEmail(email);
    
    // Verificar se email já existe no sistema
    const existingUser = await prisma.users.findUnique({
      where: { email },
      select: { id: true, name: true }
    });
    
    logValidationAction('VALIDATE_EMAIL', { email, isValid, exists: !!existingUser });
    
    res.json({
      success: true,
      data: {
        email,
        isValid,
        exists: !!existingUser,
        message: !isValid ? 'Email inválido' : 
                 existingUser ? 'Email já cadastrado' : 'Email válido e disponível'
      }
    });
  } catch (error) {
    console.error('Erro ao validar email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/esocial/validate-phone - Validar telefone
router.post('/validate-phone', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Telefone é obrigatório'
      });
    }

    const isValid = validatePhone(phone);
    
    logValidationAction('VALIDATE_PHONE', { phone, isValid });
    
    res.json({
      success: true,
      data: {
        phone,
        isValid,
        message: isValid ? 'Telefone válido' : 'Telefone inválido'
      }
    });
  } catch (error) {
    console.error('Erro ao validar telefone:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/esocial/validate-cep - Validar CEP
router.post('/validate-cep', async (req, res) => {
  try {
    const { cep } = req.body;

    if (!cep) {
      return res.status(400).json({
        success: false,
        message: 'CEP é obrigatório'
      });
    }

    const isValid = validateCEP(cep);
    
    // Simular busca na API ViaCEP (em produção, fazer requisição real)
    let addressData = null;
    if (isValid) {
      const cleanCEP = cep.replace(/[^\d]/g, '');
      try {
        // Simulação de resposta da API ViaCEP
        addressData = {
          cep: cleanCEP,
          logradouro: 'Rua Exemplo',
          bairro: 'Bairro Exemplo',
          localidade: 'São Paulo',
          uf: 'SP',
          ibge: '3550308',
          gia: '1004',
          ddd: '11',
          siafi: '7107'
        };
      } catch (apiError) {
        console.warn('Erro ao consultar ViaCEP:', apiError);
      }
    }
    
    logValidationAction('VALIDATE_CEP', { cep, isValid, hasAddressData: !!addressData });
    
    res.json({
      success: true,
      data: {
        cep,
        isValid,
        addressData,
        message: !isValid ? 'CEP inválido' : 
                 addressData ? 'CEP válido e endereço encontrado' : 'CEP válido'
      }
    });
  } catch (error) {
    console.error('Erro ao validar CEP:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/esocial/send-otp - Enviar código OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { type, value, user_id } = req.body;

    if (!type || !value || !user_id) {
      return res.status(400).json({
        success: false,
        message: 'Tipo, valor e ID do usuário são obrigatórios'
      });
    }

    if (!['email', 'phone'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Tipo deve ser email ou phone'
      });
    }

    // Gerar código OTP de 6 dígitos
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    // Em produção, salvar OTP no banco e enviar via email/SMS
    logValidationAction('SEND_OTP', { 
      type, 
      value: type === 'email' ? value : value.replace(/\d(?=\d{4})/g, '*'),
      user_id,
      otp,
      expiresAt 
    });

    // Simulação de envio
    const sendResult = {
      success: true,
      message: type === 'email' ? 
        `Código OTP enviado para ${value}` : 
        `Código OTP enviado para ${value.replace(/\d(?=\d{4})/g, '*')}`,
      expiresIn: '10 minutos'
    };

    res.json({
      success: true,
      data: sendResult
    });
  } catch (error) {
    console.error('Erro ao enviar OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/esocial/verify-otp - Verificar código OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { type, value, otp, user_id } = req.body;

    if (!type || !value || !otp || !user_id) {
      return res.status(400).json({
        success: false,
        message: 'Tipo, valor, OTP e ID do usuário são obrigatórios'
      });
    }

    // Em produção, verificar OTP no banco de dados
    // Por enquanto, simular verificação (aceita qualquer código que termine em 123)
    const isValid = otp.endsWith('123');
    
    logValidationAction('VERIFY_OTP', { 
      type, 
      value: type === 'email' ? value : value.replace(/\d(?=\d{4})/g, '*'),
      user_id,
      otp,
      isValid 
    });

    if (isValid) {
      // Marcar como verificado no banco
      await prisma.users.update({
        where: { id: user_id },
        data: {
          // Em produção, atualizar campo específico baseado no tipo
          updated_at: new Date()
        }
      });
    }

    res.json({
      success: true,
      data: {
        verified: isValid,
        message: isValid ? 'Código OTP verificado com sucesso' : 'Código OTP inválido'
      }
    });
  } catch (error) {
    console.error('Erro ao verificar OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/esocial/validate-user-data - Validação completa de dados do usuário
router.post('/validate-user-data', async (req, res) => {
  try {
    const { cpf, email, phone, cep, name } = req.body;

    const validations = {
      cpf: { value: cpf, isValid: cpf ? validateCPF(cpf) : false },
      email: { value: email, isValid: email ? validateEmail(email) : false },
      phone: { value: phone, isValid: phone ? validatePhone(phone) : false },
      cep: { value: cep, isValid: cep ? validateCEP(cep) : false },
      name: { value: name, isValid: name && name.length >= 2 }
    };

    // Verificar se email já existe
    if (validations.email.isValid && email) {
      const existingUser = await prisma.users.findUnique({
        where: { email },
        select: { id: true }
      });
      validations.email.exists = !!existingUser;
    }

    const allValid = Object.values(validations).every(v => v.isValid);
    
    logValidationAction('VALIDATE_USER_DATA', { 
      validations: Object.keys(validations).map(k => ({ 
        field: k, 
        valid: validations[k].isValid 
      })),
      allValid 
    });

    res.json({
      success: true,
      data: {
        validations,
        allValid,
        message: allValid ? 'Todos os dados são válidos' : 'Alguns dados são inválidos'
      }
    });
  } catch (error) {
    console.error('Erro ao validar dados do usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/esocial/compliance-status - Status de compliance eSocial
router.get('/compliance-status/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await prisma.users.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        phone: true,
        profile: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar compliance baseado no perfil
    const complianceChecks = {
      cpf_valid: user.cpf ? validateCPF(user.cpf) : false,
      email_valid: user.email ? validateEmail(user.email) : false,
      phone_valid: user.phone ? validatePhone(user.phone) : false,
      profile_complete: !!(user.name && user.cpf && user.email),
      eSocial_ready: false // Será calculado baseado no perfil
    };

    // Determinar se está pronto para eSocial baseado no perfil
    if (user.profile === 'employer') {
      complianceChecks.eSocial_ready = complianceChecks.cpf_valid && 
                                      complianceChecks.email_valid && 
                                      complianceChecks.profile_complete;
    } else if (user.profile === 'employee') {
      complianceChecks.eSocial_ready = complianceChecks.cpf_valid && 
                                      complianceChecks.email_valid && 
                                      complianceChecks.phone_valid && 
                                      complianceChecks.profile_complete;
    }

    const overallCompliance = Object.values(complianceChecks).every(check => check);
    
    logValidationAction('COMPLIANCE_STATUS', { user_id, complianceChecks, overallCompliance });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          profile: user.profile,
          created_at: user.created_at
        },
        compliance: complianceChecks,
        overallCompliance,
        message: overallCompliance ? 
          'Usuário em conformidade com eSocial' : 
          'Usuário precisa de ajustes para conformidade eSocial'
      }
    });
  } catch (error) {
    console.error('Erro ao verificar status de compliance:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router;
