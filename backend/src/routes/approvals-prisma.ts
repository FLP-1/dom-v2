import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Função para log de ações de aprovação
const logApprovalAction = (action: string, data: any) => {
  console.log(`[APPROVAL] ${action}:`, {
    timestamp: new Date().toISOString(),
    ...data
  });
};

// GET /api/approvals/workflows - Listar workflows de aprovação
router.get('/workflows', authenticateToken, async (req, res) => {
  try {
    const workflows = await prisma.approvalWorkflow.findMany({
      where: { isActive: true },
      include: {
        steps: {
          orderBy: { step_order: 'asc' }
        },
        _count: {
          select: { requests: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({
      success: true,
      data: workflows,
      message: 'Workflows de aprovação listados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao listar workflows:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/approvals/workflows - Criar workflow de aprovação
router.post('/workflows', authenticateToken, async (req, res) => {
  try {
    const { name, description, type, steps } = req.body;

    if (!name || !type || !steps || !Array.isArray(steps)) {
      return res.status(400).json({
        success: false,
        message: 'Nome, tipo e passos são obrigatórios'
      });
    }

    const workflow = await prisma.approvalWorkflow.create({
      data: {
        name,
        description,
        type,
        steps: {
          create: steps.map((step: any, index: number) => ({
            step_order: index + 1,
            name: step.name,
            description: step.description,
            approver_type: step.approver_type,
            approver_id: step.approver_id,
            is_required: step.is_required ?? true,
            timeout_days: step.timeout_days
          }))
        }
      },
      include: {
        steps: {
          orderBy: { step_order: 'asc' }
        }
      }
    });

    logApprovalAction('CREATE_WORKFLOW', { workflow_id: workflow.id, name });
    res.status(201).json({
      success: true,
      data: workflow,
      message: 'Workflow de aprovação criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar workflow:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/approvals/requests - Listar solicitações de aprovação
router.get('/requests', authenticateToken, async (req, res) => {
  try {
    const { status, workflow_id, requester_id } = req.query;
    const user_id = (req as any).user.id;

    const where: any = {};
    if (status) where.status = status;
    if (workflow_id) where.workflow_id = workflow_id;
    if (requester_id) where.requester_id = requester_id;

    const requests = await prisma.approvalRequest.findMany({
      where,
      include: {
        workflow: true,
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true
          }
        },
        histories: {
          include: {
            step: true,
            approver: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: { created_at: 'desc' }
        },
        _count: {
          select: { histories: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({
      success: true,
      data: requests,
      message: 'Solicitações de aprovação listadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao listar solicitações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/approvals/requests - Criar solicitação de aprovação
router.post('/requests', authenticateToken, async (req, res) => {
  try {
    const { workflow_id, title, description, data, priority, expires_at } = req.body;
    const requester_id = (req as any).user.id;

    if (!workflow_id || !title) {
      return res.status(400).json({
        success: false,
        message: 'Workflow e título são obrigatórios'
      });
    }

    // Verificar se o workflow existe e contar os passos
    const workflow = await prisma.approvalWorkflow.findUnique({
      where: { id: workflow_id },
      include: {
        steps: {
          orderBy: { step_order: 'asc' }
        }
      }
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow não encontrado'
      });
    }

    const request = await prisma.approvalRequest.create({
      data: {
        workflow_id,
        requester_id,
        title,
        description,
        data: data || {},
        priority: priority || 'medium',
        total_steps: workflow.steps.length,
        expires_at: expires_at ? new Date(expires_at) : null
      },
      include: {
        workflow: {
          include: {
            steps: {
              orderBy: { step_order: 'asc' }
            }
          }
        },
        requester: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    logApprovalAction('CREATE_REQUEST', { request_id: request.id, title });
    res.status(201).json({
      success: true,
      data: request,
      message: 'Solicitação de aprovação criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar solicitação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/approvals/requests/:id/approve - Aprovar solicitação
router.post('/requests/:id/approve', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, data } = req.body;
    const approver_id = (req as any).user.id;

    const request = await prisma.approvalRequest.findUnique({
      where: { id },
      include: {
        workflow: {
          include: {
            steps: {
              orderBy: { step_order: 'asc' }
            }
          }
        },
        histories: {
          include: {
            step: true
          },
          orderBy: { created_at: 'desc' }
        }
      }
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Solicitação não encontrada'
      });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Solicitação não está pendente'
      });
    }

    const currentStep = request.workflow.steps.find(step => step.step_order === request.current_step);
    if (!currentStep) {
      return res.status(400).json({
        success: false,
        message: 'Passo atual não encontrado'
      });
    }

    // Verificar se o usuário pode aprovar este passo
    if (currentStep.approver_id !== approver_id) {
      return res.status(403).json({
        success: false,
        message: 'Usuário não tem permissão para aprovar este passo'
      });
    }

    // Registrar a aprovação
    await prisma.approvalHistory.create({
      data: {
        request_id: id,
        step_id: currentStep.id,
        approver_id,
        action: 'approve',
        comment,
        data: data || {}
      }
    });

    // Verificar se é o último passo
    const isLastStep = request.current_step >= request.total_steps;
    
    if (isLastStep) {
      // Finalizar aprovação
      await prisma.approvalRequest.update({
        where: { id },
        data: {
          status: 'approved',
          approved_at: new Date()
        }
      });
    } else {
      // Avançar para o próximo passo
      await prisma.approvalRequest.update({
        where: { id },
        data: {
          current_step: request.current_step + 1
        }
      });
    }

    logApprovalAction('APPROVE_REQUEST', { request_id: id, step: request.current_step });
    res.json({
      success: true,
      message: isLastStep ? 'Solicitação aprovada com sucesso' : 'Passo aprovado, avançando para próximo passo'
    });
  } catch (error) {
    console.error('Erro ao aprovar solicitação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/approvals/requests/:id/reject - Rejeitar solicitação
router.post('/requests/:id/reject', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, data } = req.body;
    const approver_id = (req as any).user.id;

    const request = await prisma.approvalRequest.findUnique({
      where: { id },
      include: {
        workflow: {
          include: {
            steps: {
              orderBy: { step_order: 'asc' }
            }
          }
        }
      }
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Solicitação não encontrada'
      });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Solicitação não está pendente'
      });
    }

    const currentStep = request.workflow.steps.find(step => step.step_order === request.current_step);
    if (!currentStep) {
      return res.status(400).json({
        success: false,
        message: 'Passo atual não encontrado'
      });
    }

    // Verificar se o usuário pode rejeitar este passo
    if (currentStep.approver_id !== approver_id) {
      return res.status(403).json({
        success: false,
        message: 'Usuário não tem permissão para rejeitar este passo'
      });
    }

    // Registrar a rejeição
    await prisma.approvalHistory.create({
      data: {
        request_id: id,
        step_id: currentStep.id,
        approver_id,
        action: 'reject',
        comment,
        data: data || {}
      }
    });

    // Finalizar rejeição
    await prisma.approvalRequest.update({
      where: { id },
      data: {
        status: 'rejected',
        rejected_at: new Date()
      }
    });

    logApprovalAction('REJECT_REQUEST', { request_id: id, step: request.current_step });
    res.json({
      success: true,
      message: 'Solicitação rejeitada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao rejeitar solicitação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/approvals/requests/:id - Obter detalhes da solicitação
router.get('/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const request = await prisma.approvalRequest.findUnique({
      where: { id },
      include: {
        workflow: {
          include: {
            steps: {
              orderBy: { step_order: 'asc' }
            }
          }
        },
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true
          }
        },
        histories: {
          include: {
            step: true,
            approver: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: { created_at: 'desc' }
        }
      }
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Solicitação não encontrada'
      });
    }

    res.json({
      success: true,
      data: request,
      message: 'Detalhes da solicitação obtidos com sucesso'
    });
  } catch (error) {
    console.error('Erro ao obter solicitação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/approvals/pending - Listar solicitações pendentes do usuário
router.get('/pending', authenticateToken, async (req, res) => {
  try {
    const user_id = (req as any).user.id;

    // Buscar workflows onde o usuário é aprovador
    const workflows = await prisma.approvalWorkflow.findMany({
      where: {
        isActive: true,
        steps: {
          some: {
            approver_id: user_id
          }
        }
      },
      include: {
        steps: {
          where: {
            approver_id: user_id
          },
          orderBy: { step_order: 'asc' }
        }
      }
    });

    const workflowIds = workflows.map(w => w.id);
    const stepOrders = workflows.flatMap(w => w.steps.map(s => s.step_order));

    // Buscar solicitações pendentes onde o usuário é o aprovador atual
    const pendingRequests = await prisma.approvalRequest.findMany({
      where: {
        workflow_id: { in: workflowIds },
        status: 'pending',
        current_step: { in: stepOrders }
      },
      include: {
        workflow: {
          include: {
            steps: {
              orderBy: { step_order: 'asc' }
            }
          }
        },
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true
          }
        },
        histories: {
          include: {
            step: true,
            approver: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: { created_at: 'desc' }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({
      success: true,
      data: pendingRequests,
      message: 'Solicitações pendentes listadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao listar solicitações pendentes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/approvals/analytics - Analytics de aprovações
router.get('/analytics', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period as string);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      avgApprovalTime,
      requestsByType,
      requestsByPriority
    ] = await Promise.all([
      // Total de solicitações
      prisma.approvalRequest.count({
        where: {
          created_at: { gte: startDate }
        }
      }),
      // Solicitações pendentes
      prisma.approvalRequest.count({
        where: {
          status: 'pending',
          created_at: { gte: startDate }
        }
      }),
      // Solicitações aprovadas
      prisma.approvalRequest.count({
        where: {
          status: 'approved',
          created_at: { gte: startDate }
        }
      }),
      // Solicitações rejeitadas
      prisma.approvalRequest.count({
        where: {
          status: 'rejected',
          created_at: { gte: startDate }
        }
      }),
      // Tempo médio de aprovação
      prisma.approvalRequest.aggregate({
        where: {
          status: 'approved',
          approved_at: { not: null },
          created_at: { gte: startDate }
        },
        _avg: {
          approved_at: true
        }
      }),
      // Solicitações por tipo
      prisma.approvalRequest.groupBy({
        by: ['workflow_id'],
        where: {
          created_at: { gte: startDate }
        },
        _count: {
          id: true
        }
      }),
      // Solicitações por prioridade
      prisma.approvalRequest.groupBy({
        by: ['priority'],
        where: {
          created_at: { gte: startDate }
        },
        _count: {
          id: true
        }
      })
    ]);

    // Calcular tempo médio de aprovação em horas
    let avgTimeHours = 0;
    if (approvedRequests > 0) {
      const approvedRequestsData = await prisma.approvalRequest.findMany({
        where: {
          status: 'approved',
          approved_at: { not: null },
          created_at: { gte: startDate }
        },
        select: {
          created_at: true,
          approved_at: true
        }
      });

      const totalHours = approvedRequestsData.reduce((sum, req) => {
        const hours = (req.approved_at!.getTime() - req.created_at.getTime()) / (1000 * 60 * 60);
        return sum + hours;
      }, 0);

      avgTimeHours = totalHours / approvedRequests;
    }

    res.json({
      success: true,
      data: {
        period: `${days} dias`,
        totalRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
        avgApprovalTimeHours: Math.round(avgTimeHours * 100) / 100,
        requestsByType,
        requestsByPriority,
        approvalRate: totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0
      },
      message: 'Analytics de aprovações obtidos com sucesso'
    });
  } catch (error) {
    console.error('Erro ao obter analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router;
