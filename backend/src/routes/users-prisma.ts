import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/users - Listar usuários
router.get('/', async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        nickname: true,
        email: true,
        cpf: true,
        profile: true,
        active: true,
        created_at: true,
        last_login: true
      },
      where: {
        active: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar usuários'
    });
  }
});

// GET /api/users/:id - Detalhes do usuário
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        nickname: true,
        email: true,
        cpf: true,
        profile: true,
        active: true,
        created_at: true,
        updated_at: true,
        last_login: true,
        phone: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar usuário'
    });
  }
});

// POST /api/users - Criar usuário
router.post('/', async (req, res) => {
  try {
    const { name, email, cpf, password, profile, phone } = req.body;

    // Validações básicas
    if (!name || !email || !cpf || !password) {
      return res.status(400).json({
        success: false,
        error: 'Nome, email, CPF e senha são obrigatórios'
      });
    }

    // Verificar se CPF já existe
    const existingCPF = await prisma.users.findUnique({
      where: { cpf }
    });

    if (existingCPF) {
      return res.status(400).json({
        success: false,
        error: 'CPF já cadastrado'
      });
    }

    // Verificar se email já existe
    const existingEmail = await prisma.users.findUnique({
      where: { email }
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: 'Email já cadastrado'
      });
    }

    // Hash da senha
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        cpf,
        password_hash: passwordHash,
        profile: profile || 'employer',
        phone,
        active: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        profile: true,
        active: true,
        created_at: true
      }
    });

    res.status(201).json({
      success: true,
      data: newUser,
      message: 'Usuário criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar usuário'
    });
  }
});

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, profile, phone, active } = req.body;

    // Verificar se usuário existe
    const existingUser = await prisma.users.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Verificar se email já existe (se foi alterado)
    if (email && email !== existingUser.email) {
      const existingEmail = await prisma.users.findUnique({
        where: { email }
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          error: 'Email já cadastrado'
        });
      }
    }

    // Atualizar usuário
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        name: name || undefined,
        email: email || undefined,
        profile: profile || undefined,
        phone: phone || undefined,
        active: active !== undefined ? active : undefined,
        updated_at: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        profile: true,
        active: true,
        updated_at: true,
        phone: true
      }
    });

    res.json({
      success: true,
      data: updatedUser,
      message: 'Usuário atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar usuário'
    });
  }
});

// DELETE /api/users/:id - Desativar usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se usuário existe
    const existingUser = await prisma.users.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Desativar usuário (soft delete)
    await prisma.users.update({
      where: { id },
      data: {
        active: false,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Usuário desativado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao desativar usuário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao desativar usuário'
    });
  }
});

// POST /api/users/:id/change-password - Alterar senha
router.post('/:id/change-password', async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Senha atual e nova senha são obrigatórias'
      });
    }

    // Buscar usuário com senha
    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        password_hash: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Senha atual incorreta'
      });
    }

    // Hash da nova senha
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Atualizar senha
    await prisma.users.update({
      where: { id },
      data: {
        password_hash: newPasswordHash,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao alterar senha'
    });
  }
});

export default router;
