import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/timeclock/clock-in - Registrar entrada
router.post('/clock-in', async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário é obrigatório'
      });
    }

    // Verificar se usuário existe
    const user = await prisma.users.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Criar novo registro de ponto
    const timeEntry = await prisma.timeClockEntry.create({
      data: {
        user_id,
        type: 'clock_in',
        timestamp: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            cpf: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: timeEntry,
      message: 'Entrada registrada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao registrar entrada:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao registrar entrada: ' + error.message
    });
  }
});

// POST /api/timeclock/clock-out - Registrar saída
router.post('/clock-out', async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário é obrigatório'
      });
    }

    // Verificar se usuário existe
    const user = await prisma.users.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Verificar se existe registro de entrada para hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const clockInEntry = await prisma.timeClockEntry.findFirst({
      where: {
        user_id,
        type: 'clock_in',
        timestamp: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    if (!clockInEntry) {
      return res.status(400).json({
        success: false,
        error: 'Não há registro de entrada para hoje'
      });
    }

    // Verificar se já existe saída para hoje
    const existingClockOut = await prisma.timeClockEntry.findFirst({
      where: {
        user_id,
        type: 'clock_out',
        timestamp: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    if (existingClockOut) {
      return res.status(400).json({
        success: false,
        error: 'Já existe registro de saída para hoje'
      });
    }

    // Criar registro de saída
    const clockOutEntry = await prisma.timeClockEntry.create({
      data: {
        user_id,
        type: 'clock_out',
        timestamp: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            cpf: true
          }
        }
      }
    });

    // Calcular horas trabalhadas
    const clockOut = new Date(clockOutEntry.timestamp);
    const clockIn = new Date(clockInEntry.timestamp);
    const hoursWorked = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);

    res.json({
      success: true,
      data: {
        clockOut: clockOutEntry,
        clockIn: clockInEntry,
        hoursWorked: Math.round(hoursWorked * 100) / 100
      },
      message: 'Saída registrada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao registrar saída:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao registrar saída'
    });
  }
});

// GET /api/timeclock/user/:id - Histórico do usuário
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date, limit = 30 } = req.query;

    // Verificar se usuário existe
    const user = await prisma.users.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Construir filtros de data
    const whereClause = {
      user_id: id
    };

    if (start_date && end_date) {
      whereClause.timestamp = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    // Buscar registros de ponto
    const timeEntries = await prisma.timeClockEntry.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'desc'
      },
      take: parseInt(limit),
      include: {
        users: {
          select: {
            id: true,
            name: true,
            cpf: true
          }
        }
      }
    });

    // Agrupar por dia e calcular horas
    const dailyEntries = {};
    timeEntries.forEach(entry => {
      const date = new Date(entry.timestamp).toDateString();
      if (!dailyEntries[date]) {
        dailyEntries[date] = {
          date: new Date(entry.timestamp),
          clockIn: null,
          clockOut: null,
          hoursWorked: 0
        };
      }
      
      if (entry.type === 'clock_in') {
        dailyEntries[date].clockIn = entry;
      } else if (entry.type === 'clock_out') {
        dailyEntries[date].clockOut = entry;
      }
    });

    // Calcular horas trabalhadas para cada dia
    Object.values(dailyEntries).forEach(day => {
      if (day.clockIn && day.clockOut) {
        const clockOut = new Date(day.clockOut.timestamp);
        const clockIn = new Date(day.clockIn.timestamp);
        day.hoursWorked = Math.round(((clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60)) * 100) / 100;
      }
    });

    // Calcular estatísticas
    const totalHours = Object.values(dailyEntries).reduce((sum, day) => {
      return sum + day.hoursWorked;
    }, 0);

    const averageHours = Object.values(dailyEntries).length > 0 ? 
      totalHours / Object.values(dailyEntries).length : 0;

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          cpf: user.cpf
        },
        timeEntries,
        dailyEntries: Object.values(dailyEntries),
        statistics: {
          totalEntries: timeEntries.length,
          totalDays: Object.values(dailyEntries).length,
          totalHours: Math.round(totalHours * 100) / 100,
          averageHours: Math.round(averageHours * 100) / 100
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar histórico'
    });
  }
});

// GET /api/timeclock/current-status - Status atual dos usuários
router.get('/current-status', async (req, res) => {
  try {
    // Buscar usuários ativos
    const activeUsers = await prisma.users.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        cpf: true
      }
    });

    res.json({
      success: true,
      data: {
        present: 0,
        working: 0,
        absent: activeUsers.length,
        total: activeUsers.length,
        presentUsers: [],
        workingUsers: [],
        absentUsers: activeUsers.map(user => ({ user }))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar status atual:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar status atual: ' + error.message
    });
  }
});

// GET /api/timeclock/reports - Relatórios de ponto
router.get('/reports', async (req, res) => {
  try {
    const { start_date, end_date, user_id } = req.query;

    // Construir filtros
    const whereClause = {};

    if (start_date && end_date) {
      whereClause.timestamp = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    if (user_id) {
      whereClause.user_id = user_id;
    }

    // Buscar registros
    const timeEntries = await prisma.timeClockEntry.findMany({
      where: whereClause,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            cpf: true
          }
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    // Calcular estatísticas
    const totalUsers = new Set(timeEntries.map(entry => entry.user_id)).size;
    const totalEntries = timeEntries.length;

    // Agrupar por usuário
    const userStats = {};
    timeEntries.forEach(entry => {
      const userId = entry.user_id;
      if (!userStats[userId]) {
        userStats[userId] = {
          user: entry.users,
          entries: [],
          totalHours: 0,
          totalDays: 0
        };
      }
      userStats[userId].entries.push(entry);
    });

    // Calcular horas por usuário
    Object.values(userStats).forEach(stats => {
      const dailyEntries = {};
      stats.entries.forEach(entry => {
        const date = new Date(entry.timestamp).toDateString();
        if (!dailyEntries[date]) {
          dailyEntries[date] = {
            clockIn: null,
            clockOut: null
          };
        }
        
        if (entry.type === 'clock_in') {
          dailyEntries[date].clockIn = entry;
        } else if (entry.type === 'clock_out') {
          dailyEntries[date].clockOut = entry;
        }
      });

      let totalHours = 0;
      Object.values(dailyEntries).forEach(day => {
        if (day.clockIn && day.clockOut) {
          const clockOut = new Date(day.clockOut.timestamp);
          const clockIn = new Date(day.clockIn.timestamp);
          totalHours += (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
        }
      });

      stats.totalHours = Math.round(totalHours * 100) / 100;
      stats.totalDays = Object.keys(dailyEntries).length;
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalEntries,
          totalUsers,
          totalHours: Object.values(userStats).reduce((sum, stats) => sum + stats.totalHours, 0)
        },
        userStats: Object.values(userStats),
        timeEntries
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar relatório'
    });
  }
});

export default router;
