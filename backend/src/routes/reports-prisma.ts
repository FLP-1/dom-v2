import express from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const prisma = new PrismaClient();

// =================== RELATÓRIOS EXECUTIVOS ===================

// GET /api/reports/executive-dashboard - Dashboard executivo
router.get('/executive-dashboard', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    // Definir período padrão (últimos 30 dias)
    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Buscar dados de todos os módulos
    const [
      users,
      employees,
      timeEntries,
      budgets,
      payments,
      tasks,
      documents
    ] = await Promise.all([
      // Usuários
      prisma.users.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      
      // Funcionários
      prisma.employees.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      
      // Registros de ponto
      prisma.timeClockEntry.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      
      // Orçamentos
      prisma.budget.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      
      // Pagamentos
      prisma.payment.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      
      // Tarefas
      prisma.tasks.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      
      // Documentos
      prisma.document.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      })
    ]);

    // Calcular métricas executivas
    const executiveMetrics = {
      // Métricas de usuários
      totalUsers: users.length,
      newUsers: users.filter(u => new Date(u.created_at) >= startDate).length,
      activeUsers: users.filter(u => u.status === 'ACTIVE').length,
      
      // Métricas de funcionários
      totalEmployees: employees.length,
      newEmployees: employees.filter(e => new Date(e.created_at) >= startDate).length,
      activeEmployees: employees.filter(e => e.status === 'active').length,
      
      // Métricas de ponto
      totalTimeEntries: timeEntries.length,
      averageWorkHours: timeEntries.length > 0 ? 
        timeEntries.reduce((sum, entry) => {
          if (entry.clock_out && entry.clock_in) {
            const duration = new Date(entry.clock_out).getTime() - new Date(entry.clock_in).getTime();
            return sum + (duration / (1000 * 60 * 60)); // Converter para horas
          }
          return sum;
        }, 0) / timeEntries.length : 0,
      
      // Métricas financeiras
      totalBudgets: budgets.length,
      totalBudgetAmount: budgets.reduce((sum, budget) => sum + (budget.amount || 0), 0),
      totalPayments: payments.length,
      totalPaymentAmount: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
      pendingPayments: payments.filter(p => p.status === 'pending').length,
      
      // Métricas de tarefas
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
      
      // Métricas de documentos
      totalDocuments: documents.length,
      totalDocumentSize: documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0),
      
      // Período do relatório
      period: {
        start_date: startDate,
        end_date: endDate
      }
    };

    res.json({
      success: true,
      data: executiveMetrics
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard executivo:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar dashboard executivo: ' + error.message
    });
  }
});

// =================== RELATÓRIOS PERSONALIZADOS ===================

// GET /api/reports/custom - Relatório personalizado
router.get('/custom', async (req, res) => {
  try {
    const { 
      module, 
      start_date, 
      end_date, 
      filters, 
      group_by, 
      sort_by, 
      limit = 100 
    } = req.query;

    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    let data = [];
    let summary = {};

    switch (module) {
      case 'users':
        data = await prisma.users.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          orderBy: sort_by ? JSON.parse(sort_by) : { created_at: 'desc' },
          take: parseInt(limit)
        });
        
        summary = {
          total: data.length,
          byStatus: data.reduce((acc, user) => {
            acc[user.status] = (acc[user.status] || 0) + 1;
            return acc;
          }, {}),
          byRole: data.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
          }, {})
        };
        break;

      case 'employees':
        data = await prisma.employees.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          orderBy: sort_by ? JSON.parse(sort_by) : { created_at: 'desc' },
          take: parseInt(limit)
        });
        
        summary = {
          total: data.length,
          byStatus: data.reduce((acc, emp) => {
            acc[emp.status] = (acc[emp.status] || 0) + 1;
            return acc;
          }, {}),
          byPosition: data.reduce((acc, emp) => {
            acc[emp.position] = (acc[emp.position] || 0) + 1;
            return acc;
          }, {}),
          totalSalary: data.reduce((sum, emp) => sum + (emp.salary || 0), 0)
        };
        break;

      case 'timeclock':
        data = await prisma.timeClockEntry.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: sort_by ? JSON.parse(sort_by) : { created_at: 'desc' },
          take: parseInt(limit)
        });
        
        summary = {
          total: data.length,
          totalHours: data.reduce((sum, entry) => {
            if (entry.clock_out && entry.clock_in) {
              const duration = new Date(entry.clock_out).getTime() - new Date(entry.clock_in).getTime();
              return sum + (duration / (1000 * 60 * 60));
            }
            return sum;
          }, 0),
                  byUser: data.reduce((acc, entry) => {
          const userName = entry.users?.name || 'Sem usuário';
          acc[userName] = (acc[userName] || 0) + 1;
          return acc;
        }, {})
        };
        break;

      case 'financial':
        const budgets = await prisma.budget.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          orderBy: sort_by ? JSON.parse(sort_by) : { created_at: 'desc' },
          take: parseInt(limit)
        });

        const payments = await prisma.payment.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          orderBy: sort_by ? JSON.parse(sort_by) : { created_at: 'desc' },
          take: parseInt(limit)
        });

        data = { budgets, payments };
        
        summary = {
          totalBudgets: budgets.length,
          totalBudgetAmount: budgets.reduce((sum, budget) => sum + (budget.amount || 0), 0),
          totalPayments: payments.length,
          totalPaymentAmount: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
          pendingPayments: payments.filter(p => p.status === 'pending').length,
          byStatus: payments.reduce((acc, payment) => {
            acc[payment.status] = (acc[payment.status] || 0) + 1;
            return acc;
          }, {})
        };
        break;

      case 'tasks':
        data = await prisma.tasks.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          include: {
            creator: {
              select: {
                id: true,
                name: true
              }
            },
            responsible: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: sort_by ? JSON.parse(sort_by) : { created_at: 'desc' },
          take: parseInt(limit)
        });
        
        summary = {
          total: data.length,
          byStatus: data.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
          }, {}),
          byPriority: data.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
          }, {}),
          byCreator: data.reduce((acc, task) => {
            const creatorName = task.creator?.name || 'Sem criador';
            acc[creatorName] = (acc[creatorName] || 0) + 1;
            return acc;
          }, {})
        };
        break;

      case 'documents':
        data = await prisma.document.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: sort_by ? JSON.parse(sort_by) : { created_at: 'desc' },
          take: parseInt(limit)
        });
        
        summary = {
          total: data.length,
          totalSize: data.reduce((sum, doc) => sum + (doc.file_size || 0), 0),
          byCategory: data.reduce((acc, doc) => {
            acc[doc.category_id] = (acc[doc.category_id] || 0) + 1;
            return acc;
          }, {}),
          byUser: data.reduce((acc, doc) => {
            const userName = doc.user?.name || 'Sem usuário';
            acc[userName] = (acc[userName] || 0) + 1;
            return acc;
          }, {})
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Módulo não suportado'
        });
    }

    // Agrupar dados se especificado
    if (group_by && data.length > 0) {
      const groupFields = JSON.parse(group_by);
      const groupedData = data.reduce((acc, item) => {
        const groupKey = groupFields.map(field => item[field]).join('_');
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
      }, {});
      
      data = groupedData;
    }

    res.json({
      success: true,
      data: {
        records: data,
        summary,
        period: {
          start_date: startDate,
          end_date: endDate
        },
        filters: filters ? JSON.parse(filters) : {},
        group_by: group_by ? JSON.parse(group_by) : null,
        sort_by: sort_by ? JSON.parse(sort_by) : null,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório personalizado:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar relatório personalizado: ' + error.message
    });
  }
});

// =================== EXPORTAÇÃO DE RELATÓRIOS ===================

// GET /api/reports/export - Exportar relatório
router.get('/export', async (req, res) => {
  try {
    const { 
      module, 
      format = 'json', 
      start_date, 
      end_date, 
      filters 
    } = req.query;

    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Buscar dados
    let data = [];
    switch (module) {
      case 'users':
        data = await prisma.users.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            created_at: true
          }
        });
        break;

      case 'employees':
        data = await prisma.employees.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          select: {
            id: true,
            name: true,
            cpf: true,
            position: true,
            salary: true,
            status: true,
            created_at: true
          }
        });
        break;

      case 'timeclock':
        data = await prisma.timeClockEntry.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        });
        break;

      case 'financial':
        const budgets = await prisma.budget.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          }
        });

        const payments = await prisma.payment.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          }
        });

        data = { budgets, payments };
        break;

      case 'tasks':
        data = await prisma.tasks.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          include: {
            creator: {
              select: {
                name: true
              }
            },
            responsible: {
              select: {
                name: true
              }
            }
          }
        });
        break;

      case 'documents':
        data = await prisma.document.findMany({
          where: {
            created_at: {
              gte: startDate,
              lte: endDate
            },
            ...(filters ? JSON.parse(filters) : {})
          },
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        });
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Módulo não suportado para exportação'
        });
    }

    // Gerar arquivo de exportação
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${module}_report_${timestamp}`;

    switch (format.toLowerCase()) {
      case 'json':
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.json"`);
        res.json({
          success: true,
          data: {
            module,
            period: { start_date: startDate, end_date: endDate },
            records: data,
            exported_at: new Date().toISOString()
          }
        });
        break;

      case 'csv':
        // Converter para CSV
        let csvContent = '';
        if (data.length > 0) {
          const headers = Object.keys(data[0]).join(',');
          csvContent = headers + '\n';
          data.forEach(record => {
            const values = Object.values(record).map(value => 
              typeof value === 'string' ? `"${value}"` : value
            ).join(',');
            csvContent += values + '\n';
          });
        }

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
        res.send(csvContent);
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Formato de exportação não suportado'
        });
    }
  } catch (error) {
    console.error('Erro ao exportar relatório:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao exportar relatório: ' + error.message
    });
  }
});

// =================== RELATÓRIOS ESPECÍFICOS ===================

// GET /api/reports/hr-summary - Resumo de RH
router.get('/hr-summary', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [employees, timeEntries] = await Promise.all([
      prisma.employees.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      prisma.timeClockEntry.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        },
        include: {
          users: {
            select: {
              name: true
            }
          }
        }
      })
    ]);

    const hrSummary = {
      employees: {
        total: employees.length,
        active: employees.filter(e => e.status === 'active').length,
        inactive: employees.filter(e => e.status !== 'active').length,
        newHires: employees.filter(e => new Date(e.created_at) >= startDate).length,
        byPosition: employees.reduce((acc, emp) => {
          acc[emp.position] = (acc[emp.position] || 0) + 1;
          return acc;
        }, {}),
        totalSalary: employees.reduce((sum, emp) => sum + (emp.salary || 0), 0),
        averageSalary: employees.length > 0 ? 
          employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.length : 0
      },
      timeclock: {
        totalEntries: timeEntries.length,
        averageWorkHours: timeEntries.length > 0 ? 
          timeEntries.reduce((sum, entry) => {
            if (entry.clock_out && entry.clock_in) {
              const duration = new Date(entry.clock_out).getTime() - new Date(entry.clock_in).getTime();
              return sum + (duration / (1000 * 60 * 60));
            }
            return sum;
          }, 0) / timeEntries.length : 0,
        byUser: timeEntries.reduce((acc, entry) => {
          const userName = entry.users?.name || 'Sem usuário';
          acc[userName] = (acc[userName] || 0) + 1;
          return acc;
        }, {})
      },
      period: {
        start_date: startDate,
        end_date: endDate
      }
    };

    res.json({
      success: true,
      data: hrSummary
    });
  } catch (error) {
    console.error('Erro ao gerar resumo de RH:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar resumo de RH: ' + error.message
    });
  }
});

// GET /api/reports/financial-summary - Resumo financeiro
router.get('/financial-summary', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [budgets, payments] = await Promise.all([
      prisma.budget.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      prisma.payment.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        }
      })
    ]);

    const financialSummary = {
      budgets: {
        total: budgets.length,
        totalAmount: budgets.reduce((sum, budget) => sum + (budget.amount || 0), 0),
        averageAmount: budgets.length > 0 ? 
          budgets.reduce((sum, budget) => sum + (budget.amount || 0), 0) / budgets.length : 0,
        byCategory: budgets.reduce((acc, budget) => {
          acc[budget.category] = (acc[budget.category] || 0) + 1;
          return acc;
        }, {})
      },
      payments: {
        total: payments.length,
        totalAmount: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
        pendingAmount: payments
          .filter(p => p.status === 'pending')
          .reduce((sum, payment) => sum + (payment.amount || 0), 0),
        paidAmount: payments
          .filter(p => p.status === 'paid')
          .reduce((sum, payment) => sum + (payment.amount || 0), 0),
        byStatus: payments.reduce((acc, payment) => {
          acc[payment.status] = (acc[payment.status] || 0) + 1;
          return acc;
        }, {}),
        byMethod: payments.reduce((acc, payment) => {
          acc[payment.payment_method] = (acc[payment.payment_method] || 0) + 1;
          return acc;
        }, {})
      },
      period: {
        start_date: startDate,
        end_date: endDate
      }
    };

    res.json({
      success: true,
      data: financialSummary
    });
  } catch (error) {
    console.error('Erro ao gerar resumo financeiro:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar resumo financeiro: ' + error.message
    });
  }
});

export default router;
