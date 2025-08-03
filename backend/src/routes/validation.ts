import { Router } from 'express';
import { validateCPF, validateCNPJ } from '../utils/validation';
import { PrismaClient } from '../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

/**
 * @route POST /api/validation/document
 * @description Valida CPF/CNPJ completo (dígitos verificadores + banco de dados)
 * @body { document: string, type: 'cpf' | 'cnpj' }
 * @returns { isValid: boolean, exists: boolean, message: string }
 */
router.post('/document', async (req, res) => {
  try {
    const { document, type } = req.body;
    
    if (!document || !type) {
      return res.status(400).json({
        success: false,
        message: 'Documento e tipo são obrigatórios'
      });
    }

    // Remove caracteres não numéricos
    const cleanDocument = document.replace(/\D/g, '');
    
    // Validação de dígitos verificadores
    let isValidFormat = false;
    if (type === 'cpf') {
      isValidFormat = validateCPF(cleanDocument);
    } else if (type === 'cnpj') {
      isValidFormat = validateCNPJ(cleanDocument);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Tipo deve ser "cpf" ou "cnpj"'
      });
    }

    if (!isValidFormat) {
      return res.json({
        success: true,
        data: {
          isValid: false,
          exists: false,
          message: `${type.toUpperCase()} inválido - dígitos verificadores incorretos`
        }
      });
    }

    // Verificação no banco de dados
    let exists = false;
    try {
      if (type === 'cpf') {
        const user = await prisma.user.findUnique({
          where: { cpf: cleanDocument }
        });
        exists = !!user;
      } else if (type === 'cnpj') {
        // Para CNPJ, você pode criar uma tabela específica ou usar um campo adicional
        // Por enquanto, vamos simular que não existe
        exists = false;
      }
    } catch (dbError) {
      console.error('Erro ao consultar banco:', dbError);
      // Em caso de erro no banco, retorna apenas validação de formato
      return res.json({
        success: true,
        data: {
          isValid: true,
          exists: false,
          message: `${type.toUpperCase()} válido - erro ao verificar no banco`
        }
      });
    }

    return res.json({
      success: true,
      data: {
        isValid: true,
        exists,
        message: exists 
          ? `${type.toUpperCase()} já cadastrado no sistema`
          : `${type.toUpperCase()} válido e disponível`
      }
    });

  } catch (error) {
    console.error('Erro na validação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * @route GET /api/validation/document/:type/:document
 * @description Validação rápida via GET
 * @param type - 'cpf' ou 'cnpj'
 * @param document - documento a ser validado
 */
router.get('/document/:type/:document', async (req, res) => {
  try {
    const { type, document } = req.params;
    
    if (!['cpf', 'cnpj'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Tipo deve ser "cpf" ou "cnpj"'
      });
    }

    const cleanDocument = document.replace(/\D/g, '');
    
    // Validação de formato
    const isValidFormat = type === 'cpf' 
      ? validateCPF(cleanDocument)
      : validateCNPJ(cleanDocument);

    return res.json({
      success: true,
      data: {
        isValid: isValidFormat,
        message: isValidFormat 
          ? `${type.toUpperCase()} válido`
          : `${type.toUpperCase()} inválido`
      }
    });

  } catch (error) {
    console.error('Erro na validação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router; 