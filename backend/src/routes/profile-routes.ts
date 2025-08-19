import { Router } from 'express';
import {
  getUserProfiles,
  getPrimaryProfile,
  getProfilesByType,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  setPrimaryProfile,
  getProfileStats
} from '../controllers/profile-controller';
import { authenticateToken } from '../controllers/authController';

const router = Router();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// Rotas de perfis de usuário
router.get('/users/:userId/profiles', getUserProfiles);
router.get('/users/:userId/profiles/primary', getPrimaryProfile);
router.post('/users/:userId/profiles', createUserProfile);

// Rotas de perfis por tipo
router.get('/profiles/type/:profileType', getProfilesByType);

// Rotas de gerenciamento de perfis
router.get('/profiles/:profileId', (req, res) => {
  // TODO: Implementar busca de perfil específico
  res.status(501).json({ message: 'Não implementado' });
});

router.put('/profiles/:profileId', updateUserProfile);
router.delete('/profiles/:profileId', deleteUserProfile);
router.patch('/profiles/:profileId/primary', setPrimaryProfile);

// Rotas de estatísticas
router.get('/profiles/stats/overview', getProfileStats);

export default router;
