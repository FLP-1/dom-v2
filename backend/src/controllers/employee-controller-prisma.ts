// Controller Employee com Prisma - Controle de Funcionários
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class EmployeeControllerPrisma {
  // Listar todos os funcionários
  static async getAllEmployees(req: Request, res: Response): Promise<void> {
    try {
      const employees = await prisma.employee.findMany({
        include: {
          payrolls: true
        },
        orderBy: { createdAt: 'desc' }
      });

      res.json({
        success: true,
        data: employees,
        message: 'Funcionários listados com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar funcionários',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter funcionário por ID
  static async getEmployeeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const employee = await prisma.employee.findUnique({
        where: { id },
        include: {
          payrolls: true
        }
      });

      if (!employee) {
        res.status(404).json({
          success: false,
          message: 'Funcionário não encontrado'
        });
        return;
      }

      res.json({
        success: true,
        data: employee,
        message: 'Funcionário encontrado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Criar novo funcionário
  static async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employeeData = req.body;
      
      const newEmployee = await prisma.employee.create({
        data: {
          name: employeeData.name,
          cpf: employeeData.cpf,
          position: employeeData.position,
          salary: parseFloat(employeeData.salary),
          status: employeeData.status || 'active'
        }
      });

      res.status(201).json({
        success: true,
        data: newEmployee,
        message: 'Funcionário criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Atualizar funcionário
  static async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const employee = await prisma.employee.update({
        where: { id },
        data: {
          name: updateData.name,
          cpf: updateData.cpf,
          position: updateData.position,
          salary: updateData.salary ? parseFloat(updateData.salary) : undefined,
          status: updateData.status,
          updatedAt: new Date()
        }
      });

      res.json({
        success: true,
        data: employee,
        message: 'Funcionário atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Deletar funcionário
  static async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.employee.delete({
        where: { id }
      });

      res.json({
        success: true,
        message: 'Funcionário deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Registrar entrada (clock-in)
  static async clockIn(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Aqui você pode implementar a lógica de registro de entrada
      // Por enquanto, apenas retornamos sucesso
      res.json({
        success: true,
        message: 'Entrada registrada com sucesso',
        employeeId: id,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao registrar entrada',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Registrar saída (clock-out)
  static async clockOut(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Aqui você pode implementar a lógica de registro de saída
      // Por enquanto, apenas retornamos sucesso
      res.json({
        success: true,
        message: 'Saída registrada com sucesso',
        employeeId: id,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao registrar saída',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 