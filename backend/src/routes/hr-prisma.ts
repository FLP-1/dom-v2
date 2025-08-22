import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// =================== ROTAS DE FUNCIONÁRIOS ===================

// GET /api/hr/employees - Listar funcionários
router.get('/employees', async (req, res) => {
  try {
    const { department, position, status, limit = 50 } = req.query;

    // Construir filtros
    const whereClause: any = {};

    if (department) {
      whereClause.department = department;
    }

    if (position) {
      whereClause.position = position;
    }

    if (status) {
      whereClause.status = status;
    }

    // Buscar funcionários
    const employees = await prisma.employees.findMany({
      where: whereClause,
      orderBy: [
        { name: 'asc' },
        { created_at: 'desc' }
      ],
      take: parseInt(limit)
    });

    // Calcular estatísticas
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'active').length;
    const inactiveEmployees = employees.filter(e => e.status !== 'active').length;

    // Agrupar por departamento (usando position como departamento temporariamente)
    const byDepartment = employees.reduce((acc, emp) => {
      const dept = emp.position || 'Não definido';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    // Agrupar por cargo
    const byPosition = employees.reduce((acc, emp) => {
      const pos = emp.position || 'Não definido';
      acc[pos] = (acc[pos] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        employees,
        statistics: {
          total: totalEmployees,
          active: activeEmployees,
          inactive: inactiveEmployees
        },
        byDepartment,
        byPosition
      }
    });
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar funcionários: ' + error.message
    });
  }
});

// GET /api/hr/employees/:id - Detalhes do funcionário
router.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employees.findUnique({
      where: { id }
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Funcionário não encontrado'
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Erro ao buscar funcionário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar funcionário: ' + error.message
    });
  }
});

// POST /api/hr/employees - Criar funcionário
router.post('/employees', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      cpf, 
      phone,
      department,
      position,
      salary,
      hire_date,
      manager_id,
      profile = 'employee'
    } = req.body;

    // Validações básicas
    if (!name || !cpf) {
      return res.status(400).json({
        success: false,
        error: 'Nome e CPF são obrigatórios'
      });
    }

    // Verificar se CPF já existe
    const existingEmployee = await prisma.employees.findFirst({
      where: { cpf }
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        error: 'CPF já cadastrado'
      });
    }



    // Criar funcionário
    const employee = await prisma.employees.create({
      data: {
        id: `emp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name,
        cpf,
        position: position || 'Funcionário',
        salary: salary ? parseFloat(salary) : 0,
        status: 'active',
        user_id: null // Pode ser vinculado a um usuário depois
      }
    });

    res.status(201).json({
      success: true,
      data: employee,
      message: 'Funcionário criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar funcionário: ' + error.message
    });
  }
});

// PUT /api/hr/employees/:id - Atualizar funcionário
router.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      email, 
      phone,
      department,
      position,
      salary,
      hire_date,
      manager_id,
      active
    } = req.body;

    // Verificar se funcionário existe
    const existingEmployee = await prisma.employees.findUnique({
      where: { id }
    });

    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        error: 'Funcionário não encontrado'
      });
    }

    // Atualizar funcionário
    const updatedEmployee = await prisma.employees.update({
      where: { id },
      data: {
        name: name || undefined,
        position: position || undefined,
        salary: salary ? parseFloat(salary) : undefined,
        status: active !== undefined ? (active ? 'active' : 'inactive') : undefined,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedEmployee,
      message: 'Funcionário atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar funcionário: ' + error.message
    });
  }
});

// DELETE /api/hr/employees/:id - Excluir funcionário
router.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se funcionário existe
    const existingEmployee = await prisma.employees.findUnique({
      where: { id }
    });

    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        error: 'Funcionário não encontrado'
      });
    }

    // Excluir funcionário
    await prisma.employees.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Funcionário excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir funcionário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao excluir funcionário: ' + error.message
    });
  }
});

// =================== GESTÃO DE DEPARTAMENTOS ===================

// GET /api/hr/departments - Listar departamentos
router.get('/departments', async (req, res) => {
  try {
    // Buscar todos os funcionários para agrupar por departamento
    const employees = await prisma.employees.findMany({
      where: { status: 'active' },
      select: { position: true }
    });

    // Agrupar por departamento (usando position como departamento)
    const departments = employees.reduce((acc, emp) => {
      const dept = emp.position || 'Não definido';
      if (!acc[dept]) {
        acc[dept] = {
          name: dept,
          employeeCount: 0,
          employees: []
        };
      }
      acc[dept].employeeCount++;
      return acc;
    }, {});

    // Buscar funcionários de cada departamento
    for (const deptName in departments) {
      const deptEmployees = await prisma.employees.findMany({
        where: { 
          position: deptName === 'Não definido' ? null : deptName,
          status: 'active'
        },
        select: {
          id: true,
          name: true,
          position: true
        }
      });
      departments[deptName].employees = deptEmployees;
    }

    res.json({
      success: true,
      data: Object.values(departments)
    });
  } catch (error) {
    console.error('Erro ao listar departamentos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar departamentos: ' + error.message
    });
  }
});

// =================== GESTÃO DE CARGOS ===================

// GET /api/hr/positions - Listar cargos
router.get('/positions', async (req, res) => {
  try {
    // Buscar todos os funcionários para agrupar por cargo
    const employees = await prisma.employees.findMany({
      where: { status: 'active' },
      select: { position: true, salary: true }
    });

    // Agrupar por cargo
    const positions = employees.reduce((acc, emp) => {
      const pos = emp.position || 'Não definido';
      if (!acc[pos]) {
        acc[pos] = {
          name: pos,
          employeeCount: 0,
          avgSalary: 0,
          totalSalary: 0,
          employees: []
        };
      }
      acc[pos].employeeCount++;
      if (emp.salary) {
        acc[pos].totalSalary += emp.salary;
      }
      return acc;
    }, {});

    // Calcular salário médio e buscar funcionários
    for (const posName in positions) {
      const posEmployees = await prisma.employees.findMany({
        where: { 
          position: posName === 'Não definido' ? null : posName,
          status: 'active'
        },
        select: {
          id: true,
          name: true,
          position: true,
          salary: true
        }
      });
      
      positions[posName].employees = posEmployees;
      positions[posName].avgSalary = positions[posName].employeeCount > 0 
        ? positions[posName].totalSalary / positions[posName].employeeCount 
        : 0;
    }

    res.json({
      success: true,
      data: Object.values(positions)
    });
  } catch (error) {
    console.error('Erro ao listar cargos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar cargos: ' + error.message
    });
  }
});

// =================== RELATÓRIOS DE RH ===================

// GET /api/hr/reports/dashboard - Dashboard de RH
router.get('/reports/dashboard', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    // Construir filtros de data
    const dateFilter: any = {};
    if (start_date && end_date) {
      dateFilter.created_at = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    // Buscar funcionários
    const employees = await prisma.employees.findMany({
      where: dateFilter
    });

    // Calcular métricas
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'active').length;
    const inactiveEmployees = employees.filter(e => e.status !== 'active').length;
    const newHires = employees.filter(e => 
      e.created_at && 
      new Date(e.created_at) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;

    // Agrupar por departamento (usando position)
    const byDepartment = employees.reduce((acc, emp) => {
      const dept = emp.position || 'Não definido';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    // Agrupar por cargo
    const byPosition = employees.reduce((acc, emp) => {
      const pos = emp.position || 'Não definido';
      acc[pos] = (acc[pos] || 0) + 1;
      return acc;
    }, {});

    // Calcular folha salarial
    const totalSalary = employees
      .filter(e => e.salary)
      .reduce((sum, emp) => sum + (emp.salary || 0), 0);

    const avgSalary = employees.filter(e => e.salary).length > 0 
      ? totalSalary / employees.filter(e => e.salary).length 
      : 0;

    res.json({
      success: true,
      data: {
        summary: {
          total: totalEmployees,
          active: activeEmployees,
          inactive: inactiveEmployees,
          newHires,
          totalSalary,
          avgSalary
        },
        byDepartment,
        byPosition
      }
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard de RH:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar dashboard de RH: ' + error.message
    });
  }
});

// GET /api/hr/reports/turnover - Relatório de turnover
router.get('/reports/turnover', async (req, res) => {
  try {
    const { period = '30' } = req.query; // dias
    const days = parseInt(period);

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Buscar funcionários ativos
    const activeEmployees = await prisma.employees.findMany({
      where: { status: 'active' }
    });

    // Buscar funcionários inativos no período
    const inactiveEmployees = await prisma.employees.findMany({
      where: { 
        status: 'inactive',
        updated_at: {
          gte: startDate
        }
      }
    });

    // Buscar novos funcionários no período
    const newEmployees = await prisma.employees.findMany({
      where: {
        created_at: {
          gte: startDate
        }
      }
    });

    const totalActive = activeEmployees.length;
    const totalInactive = inactiveEmployees.length;
    const totalNew = newEmployees.length;

    // Calcular taxas
    const turnoverRate = totalActive > 0 ? (totalInactive / totalActive) * 100 : 0;
    const hiringRate = totalActive > 0 ? (totalNew / totalActive) * 100 : 0;

    res.json({
      success: true,
      data: {
        period: `${days} dias`,
        metrics: {
          totalActive,
          totalInactive,
          totalNew,
          turnoverRate: Math.round(turnoverRate * 100) / 100,
          hiringRate: Math.round(hiringRate * 100) / 100
        },
        details: {
          newEmployees,
          inactiveEmployees
        }
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório de turnover:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar relatório de turnover: ' + error.message
    });
  }
});

// GET /api/hr/reports/salary - Relatório salarial
router.get('/reports/salary', async (req, res) => {
  try {
    const { department, position } = req.query;

    // Construir filtros
    const whereClause: any = { status: 'active' };
    if (department) whereClause.position = department; // Usando position como department
    if (position) whereClause.position = position;

    // Buscar funcionários
    const employees = await prisma.employees.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        position: true,
        salary: true,
        created_at: true
      }
    });

    const employeesWithSalary = employees.filter(e => e.salary);
    const employeesWithoutSalary = employees.filter(e => !e.salary);

    // Calcular estatísticas
    const totalSalary = employeesWithSalary.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const avgSalary = employeesWithSalary.length > 0 ? totalSalary / employeesWithSalary.length : 0;
    const minSalary = employeesWithSalary.length > 0 ? Math.min(...employeesWithSalary.map(e => e.salary || 0)) : 0;
    const maxSalary = employeesWithSalary.length > 0 ? Math.max(...employeesWithSalary.map(e => e.salary || 0)) : 0;

    // Agrupar por departamento (usando position)
    const byDepartment = employeesWithSalary.reduce((acc, emp) => {
      const dept = emp.position || 'Não definido';
      if (!acc[dept]) {
        acc[dept] = {
          department: dept,
          count: 0,
          totalSalary: 0,
          avgSalary: 0,
          employees: []
        };
      }
      acc[dept].count++;
      acc[dept].totalSalary += emp.salary || 0;
      acc[dept].employees.push(emp);
      return acc;
    }, {});

    // Calcular média por departamento
    Object.values(byDepartment).forEach((dept: any) => {
      dept.avgSalary = dept.count > 0 ? dept.totalSalary / dept.count : 0;
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalEmployees: employees.length,
          employeesWithSalary: employeesWithSalary.length,
          employeesWithoutSalary: employeesWithoutSalary.length,
          totalSalary,
          avgSalary: Math.round(avgSalary * 100) / 100,
          minSalary,
          maxSalary
        },
        byDepartment: Object.values(byDepartment),
        employeesWithoutSalary
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório salarial:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar relatório salarial: ' + error.message
    });
  }
});

// =================== GESTÃO DE HIERARQUIA ===================

// GET /api/hr/hierarchy - Estrutura hierárquica
router.get('/hierarchy', async (req, res) => {
  try {
    // Buscar funcionários (sem hierarquia por enquanto)
    const employees = await prisma.employees.findMany({
      where: { status: 'active' },
      select: {
        id: true,
        name: true,
        position: true
      }
    });

    // Construir hierarquia simples (todos no mesmo nível por enquanto)
    const hierarchy = employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      position: emp.position,
      department: emp.position, // Usando position como department
      manager_id: null,
      subordinates: []
    }));

    res.json({
      success: true,
      data: hierarchy
    });
  } catch (error) {
    console.error('Erro ao gerar hierarquia:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar hierarquia: ' + error.message
    });
  }
});

export default router;
