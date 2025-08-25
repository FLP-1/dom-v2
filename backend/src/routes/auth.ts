import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Configuração JWT
const JWT_SECRET = process.env.JWT_SECRET || 'dom-v2-secret-key';

// Interface para usuário
interface User {
    id: string;
    name: string;
    cpf: string;
    email?: string;
    role: string;
    avatar?: string;
    profiles: Profile[];
}

interface Profile {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

// Rota de login
router.post('/login', async (req, res) => {
    try {
        console.log('🔐 Tentativa de login:', { cpf: req.body.cpf, hasPassword: !!req.body.password });
        
        const { cpf, password } = req.body;

        if (!cpf || !password) {
            console.log('❌ CPF ou senha não fornecidos');
            return res.status(400).json({
                success: false,
                message: 'CPF e senha são obrigatórios'
            });
        }

        // Buscar usuário
        console.log('🔍 Buscando usuário com CPF:', cpf);
        const user = await prisma.users.findUnique({
            where: { cpf: cpf },
            include: {
                user_profiles: true
            }
        });

        console.log('👤 Usuário encontrado:', !!user);
        if (user) {
            console.log('📋 Dados do usuário:', {
                id: user.id,
                name: user.name,
                active: user.active,
                hasProfiles: user.user_profiles.length
            });
        }

        if (!user) {
            console.log('❌ Usuário não encontrado');
            return res.status(401).json({
                success: false,
                message: 'CPF ou senha incorretos'
            });
        }

        // Verificar senha
        console.log('🔑 Verificando senha...');
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        console.log('✅ Senha válida:', isValidPassword);

        if (!isValidPassword) {
            console.log('❌ Senha inválida');
            return res.status(401).json({
                success: false,
                message: 'CPF ou senha incorretos'
            });
        }

        // Verificar se usuário está ativo
        console.log('✅ Usuário ativo:', user.active);
        if (!user.active) {
            console.log('❌ Usuário inativo');
            return res.status(401).json({
                success: false,
                message: 'Usuário inativo. Entre em contato com o administrador.'
            });
        }

        // Mapear perfis para o formato esperado pelo frontend
        const profiles = user.user_profiles.map(profile => ({
            id: `${profile.userId}-${profile.profileType}-${profile.contextId}`,
            name: profile.metadata.name,
            role: profile.metadata.role,
            avatar: profile.metadata.avatar,
            description: profile.metadata.description
        }));

        console.log('👥 Perfis mapeados:', profiles.length);

        // Criar payload do token
        const tokenPayload = {
            userId: user.id,
            cpf: user.cpf,
            email: user.email,
            profile: user.profile
        };

        // Gerar token JWT
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });

        // Preparar dados do usuário para resposta
        const userData = {
            id: user.id,
            name: user.name,
            nickname: user.nickname,
            cpf: user.cpf,
            email: user.email,
            profile: user.profile,
            avatar: user.avatar,
            profiles: profiles
        };

        console.log('🎉 Login bem-sucedido para:', user.name);

        res.json({
            success: true,
            message: 'Login realizado com sucesso!',
            token: token,
            user: userData
        });

    } catch (error) {
        console.error('💥 Erro no login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Rota de logout
router.post('/logout', async (req, res) => {
    try {
        // Em uma implementação mais robusta, você poderia invalidar o token
        // Por enquanto, apenas retornamos sucesso
        res.json({
            success: true,
            message: 'Logout realizado com sucesso'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Middleware para verificar token
export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token de acesso necessário'
        });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Token inválido'
            });
        }
        req.user = user;
        next();
    });
};

// Rota para verificar token
router.get('/verify', authenticateToken, async (req: any, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: req.user.userId },
            include: {
                user_profiles: {
                    where: {
                        isActive: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                cpf: user.cpf,
                email: user.email,
                role: user.profile,
                profiles: user.user_profiles.map(profile => ({
                    id: profile.id,
                    name: profile.metadata?.name || profile.profileType,
                    role: profile.metadata?.role || profile.profileType,
                    avatar: profile.metadata?.avatar
                }))
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

export default router;
