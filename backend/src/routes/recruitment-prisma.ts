import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Função para log de ações de recrutamento
const logRecruitmentAction = (action: string, data: any) => {
  console.log(`[RECRUITMENT] ${action}:`, {
    timestamp: new Date().toISOString(),
    ...data
  });
};

// GET /api/recruitment/jobs - Listar vagas de emprego
router.get('/jobs', authenticateToken, async (req, res) => {
  try {
    const { status, created_by } = req.query;
    const user_id = (req as any).user.id;

    const where: any = {};
    if (status) where.status = status;
    if (created_by) where.created_by = created_by;

    const jobs = await prisma.recruitmentJob.findMany({
      where,
      include: {
        applications: {
          include: {
            job: true
          },
          _count: {
            select: { interviews: true }
          }
        },
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({
      success: true,
      data: jobs,
      message: 'Vagas listadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao listar vagas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/recruitment/jobs - Criar nova vaga
router.post('/jobs', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      responsibilities,
      salary_range,
      contract_type,
      work_schedule,
      location,
      remote_work,
      benefits,
      expires_at
    } = req.body;
    const created_by = (req as any).user.id;

    if (!title || !requirements || !responsibilities) {
      return res.status(400).json({
        success: false,
        message: 'Título, requisitos e responsabilidades são obrigatórios'
      });
    }

    const job = await prisma.recruitmentJob.create({
      data: {
        title,
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        salary_range: salary_range || null,
        contract_type: contract_type || 'full_time',
        work_schedule,
        location,
        remote_work: remote_work || false,
        benefits: benefits || [],
        expires_at: expires_at ? new Date(expires_at) : null,
        published_at: new Date(),
        created_by
      },
      include: {
        applications: {
          include: {
            job: true
          }
        }
      }
    });

    logRecruitmentAction('CREATE_JOB', { job_id: job.id, title });
    res.status(201).json({
      success: true,
      data: job,
      message: 'Vaga criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar vaga:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/recruitment/jobs/:id - Obter detalhes de uma vaga
router.get('/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.recruitmentJob.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            interviews: {
              include: {
                interviewer: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              }
            }
          },
          orderBy: { created_at: 'desc' }
        },
        _count: {
          select: { applications: true }
        }
      }
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Vaga não encontrada'
      });
    }

    res.json({
      success: true,
      data: job,
      message: 'Detalhes da vaga obtidos com sucesso'
    });
  } catch (error) {
    console.error('Erro ao obter vaga:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// PUT /api/recruitment/jobs/:id - Atualizar vaga
router.put('/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const job = await prisma.recruitmentJob.update({
      where: { id },
      data: updateData,
      include: {
        applications: {
          include: {
            job: true
          }
        }
      }
    });

    logRecruitmentAction('UPDATE_JOB', { job_id: id, title: job.title });
    res.json({
      success: true,
      data: job,
      message: 'Vaga atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/recruitment/applications - Listar candidaturas
router.get('/applications', authenticateToken, async (req, res) => {
  try {
    const { status, job_id } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (job_id) where.job_id = job_id;

    const applications = await prisma.recruitmentApplication.findMany({
      where,
      include: {
        job: true,
        interviews: {
          include: {
            interviewer: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: { interview_date: 'desc' }
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: { interviews: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({
      success: true,
      data: applications,
      message: 'Candidaturas listadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao listar candidaturas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/recruitment/applications - Criar candidatura
router.post('/applications', authenticateToken, async (req, res) => {
  try {
    const {
      job_id,
      candidate_name,
      candidate_email,
      candidate_phone,
      candidate_cpf,
      resume_url,
      cover_letter,
      experience_years,
      education_level,
      skills,
      availability,
      expected_salary
    } = req.body;

    if (!job_id || !candidate_name || !candidate_email) {
      return res.status(400).json({
        success: false,
        message: 'ID da vaga, nome e email do candidato são obrigatórios'
      });
    }

    // Verificar se a vaga existe e está ativa
    const job = await prisma.recruitmentJob.findUnique({
      where: { id: job_id }
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Vaga não encontrada'
      });
    }

    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Vaga não está ativa para candidaturas'
      });
    }

    const application = await prisma.recruitmentApplication.create({
      data: {
        job_id,
        candidate_name,
        candidate_email,
        candidate_phone,
        candidate_cpf,
        resume_url,
        cover_letter,
        experience_years: experience_years ? parseInt(experience_years) : null,
        education_level,
        skills: skills || [],
        availability,
        expected_salary: expected_salary ? parseFloat(expected_salary) : null
      },
      include: {
        job: true
      }
    });

    logRecruitmentAction('CREATE_APPLICATION', { 
      application_id: application.id, 
      job_id, 
      candidate_name 
    });
    
    res.status(201).json({
      success: true,
      data: application,
      message: 'Candidatura enviada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar candidatura:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// PUT /api/recruitment/applications/:id/status - Atualizar status da candidatura
router.put('/applications/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, rating } = req.body;
    const reviewed_by = (req as any).user.id;

    const application = await prisma.recruitmentApplication.update({
      where: { id },
      data: {
        status,
        notes,
        rating: rating ? parseInt(rating) : null,
        reviewed_by
      },
      include: {
        job: true,
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    logRecruitmentAction('UPDATE_APPLICATION_STATUS', { 
      application_id: id, 
      status, 
      candidate_name: application.candidate_name 
    });

    res.json({
      success: true,
      data: application,
      message: 'Status da candidatura atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar status da candidatura:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/recruitment/interviews - Agendar entrevista
router.post('/interviews', authenticateToken, async (req, res) => {
  try {
    const {
      application_id,
      interviewer_id,
      interview_date,
      interview_type,
      location,
      duration_minutes,
      notes
    } = req.body;

    if (!application_id || !interviewer_id || !interview_date || !interview_type) {
      return res.status(400).json({
        success: false,
        message: 'ID da candidatura, entrevistador, data e tipo são obrigatórios'
      });
    }

    const interview = await prisma.recruitmentInterview.create({
      data: {
        application_id,
        interviewer_id,
        interview_date: new Date(interview_date),
        interview_type,
        location,
        duration_minutes: duration_minutes ? parseInt(duration_minutes) : null,
        notes
      },
      include: {
        application: {
          include: {
            job: true
          }
        },
        interviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    logRecruitmentAction('SCHEDULE_INTERVIEW', { 
      interview_id: interview.id, 
      application_id, 
      candidate_name: interview.application.candidate_name 
    });

    res.status(201).json({
      success: true,
      data: interview,
      message: 'Entrevista agendada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao agendar entrevista:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// PUT /api/recruitment/interviews/:id - Atualizar entrevista
router.put('/interviews/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const interview = await prisma.recruitmentInterview.update({
      where: { id },
      data: updateData,
      include: {
        application: {
          include: {
            job: true
          }
        },
        interviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    logRecruitmentAction('UPDATE_INTERVIEW', { 
      interview_id: id, 
      status: interview.status 
    });

    res.json({
      success: true,
      data: interview,
      message: 'Entrevista atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar entrevista:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/recruitment/analytics - Analytics de recrutamento
router.get('/analytics', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period as string);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [
      totalJobs,
      activeJobs,
      totalApplications,
      applicationsByStatus,
      interviewsScheduled,
      interviewsCompleted,
      averageRating
    ] = await Promise.all([
      // Total de vagas
      prisma.recruitmentJob.count({
        where: {
          created_at: { gte: startDate }
        }
      }),
      // Vagas ativas
      prisma.recruitmentJob.count({
        where: {
          status: 'active',
          created_at: { gte: startDate }
        }
      }),
      // Total de candidaturas
      prisma.recruitmentApplication.count({
        where: {
          created_at: { gte: startDate }
        }
      }),
      // Candidaturas por status
      prisma.recruitmentApplication.groupBy({
        by: ['status'],
        where: {
          created_at: { gte: startDate }
        },
        _count: {
          id: true
        }
      }),
      // Entrevistas agendadas
      prisma.recruitmentInterview.count({
        where: {
          status: 'scheduled',
          created_at: { gte: startDate }
        }
      }),
      // Entrevistas concluídas
      prisma.recruitmentInterview.count({
        where: {
          status: 'completed',
          created_at: { gte: startDate }
        }
      }),
      // Avaliação média
      prisma.recruitmentApplication.aggregate({
        where: {
          rating: { not: null },
          created_at: { gte: startDate }
        },
        _avg: {
          rating: true
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        period: `${days} dias`,
        totalJobs,
        activeJobs,
        totalApplications,
        applicationsByStatus,
        interviewsScheduled,
        interviewsCompleted,
        averageRating: averageRating._avg.rating || 0,
        conversionRate: totalApplications > 0 ? Math.round((interviewsCompleted / totalApplications) * 100) : 0
      },
      message: 'Analytics de recrutamento obtidos com sucesso'
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
