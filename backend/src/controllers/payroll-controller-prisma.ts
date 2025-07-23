// Controller Payroll com Prisma - Controle de Folha de Pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class PayrollControllerPrisma {
  // Listar todas as folhas de pagamento
  static async getAllPayrolls(req: Request, res: Response): Promise<void> {
    try {
      const payrolls = await prisma.payroll.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.json({
        success: true,
        payrolls,
        total: payrolls.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar folhas de pagamento'
      });
    }
  }

  // Buscar folha de pagamento por ID
  static async getPayrollById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payroll = await prisma.payroll.findUnique({
        where: { id }
      });

      if (!payroll) {
        res.status(404).json({
          success: false,
          error: 'Folha de pagamento não encontrada'
        });
        return;
      }

      res.json({
        success: true,
        payroll
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar folha de pagamento'
      });
    }
  }

  // Criar nova folha de pagamento
  static async createPayroll(req: Request, res: Response): Promise<void> {
    try {
      const payrollData = req.body;

      // Calcular valores (simplificado)
      const overtimeValue = (payrollData.overtimeHours || 0) * (payrollData.overtimeRate || 1.5) * (payrollData.baseSalary / 160);
      const grossSalary = payrollData.baseSalary + overtimeValue + (payrollData.bonuses || 0);
      const inss = grossSalary * 0.11; // 11% INSS
      const irrf = Math.max(0, (grossSalary - inss) * 0.15); // 15% IRRF
      const fgts = grossSalary * 0.08; // 8% FGTS
      const netSalary = grossSalary - inss - irrf - (payrollData.deductions || 0);

      const newPayroll = await prisma.payroll.create({
        data: {
          employeeId: payrollData.employeeId,
          employeeName: payrollData.employeeName,
          baseSalary: parseFloat(payrollData.baseSalary),
          overtimeHours: parseFloat(payrollData.overtimeHours || 0),
          overtimeRate: parseFloat(payrollData.overtimeRate || 1.5),
          bonuses: parseFloat(payrollData.bonuses || 0),
          deductions: parseFloat(payrollData.deductions || 0),
          inss,
          irrf,
          fgts,
          netSalary,
          grossSalary,
          month: parseInt(payrollData.month || new Date().getMonth() + 1),
          year: parseInt(payrollData.year || new Date().getFullYear()),
          status: payrollData.status || 'pending'
        }
      });

      res.status(201).json({
        success: true,
        payroll: newPayroll,
        message: 'Folha de pagamento criada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao criar folha de pagamento'
      });
    }
  }

  // Atualizar folha de pagamento
  static async updatePayroll(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const payroll = await prisma.payroll.update({
        where: { id },
        data: {
          employeeId: updateData.employeeId,
          employeeName: updateData.employeeName,
          baseSalary: updateData.baseSalary ? parseFloat(updateData.baseSalary) : undefined,
          overtimeHours: updateData.overtimeHours ? parseFloat(updateData.overtimeHours) : undefined,
          overtimeRate: updateData.overtimeRate ? parseFloat(updateData.overtimeRate) : undefined,
          bonuses: updateData.bonuses ? parseFloat(updateData.bonuses) : undefined,
          deductions: updateData.deductions ? parseFloat(updateData.deductions) : undefined,
          status: updateData.status,
          updatedAt: new Date()
        }
      });

      res.json({
        success: true,
        payroll,
        message: 'Folha de pagamento atualizada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar folha de pagamento'
      });
    }
  }

  // Deletar folha de pagamento
  static async deletePayroll(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.payroll.delete({
        where: { id }
      });

      res.json({
        success: true,
        message: 'Folha de pagamento deletada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao deletar folha de pagamento'
      });
    }
  }

  // Obter estatísticas da folha de pagamento
  static async getPayrollStats(req: Request, res: Response): Promise<void> {
    try {
      const totalPayrolls = await prisma.payroll.count();
      const pendingPayrolls = await prisma.payroll.count({ where: { status: 'pending' } });
      const approvedPayrolls = await prisma.payroll.count({ where: { status: 'approved' } });
      const paidPayrolls = await prisma.payroll.count({ where: { status: 'paid' } });

      const result = await prisma.payroll.aggregate({
        _sum: {
          grossSalary: true,
          netSalary: true,
          inss: true,
          irrf: true,
          deductions: true
        }
      });

      const totalGrossSalary = result._sum.grossSalary || 0;
      const totalNetSalary = result._sum.netSalary || 0;
      const totalDeductions = (result._sum.inss || 0) + (result._sum.irrf || 0) + (result._sum.deductions || 0);

      res.json({
        success: true,
        stats: {
          totalPayrolls,
          pendingPayrolls,
          approvedPayrolls,
          paidPayrolls,
          totalGrossSalary,
          totalNetSalary,
          totalDeductions,
          averageGrossSalary: totalPayrolls > 0 ? totalGrossSalary / totalPayrolls : 0,
          averageNetSalary: totalPayrolls > 0 ? totalNetSalary / totalPayrolls : 0
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar estatísticas'
      });
    }
  }
} 