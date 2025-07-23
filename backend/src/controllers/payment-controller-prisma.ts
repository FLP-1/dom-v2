// Controller Payment com Prisma - Controle de Pagamentos
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class PaymentControllerPrisma {
  // Listar todos os pagamentos
  static async getAllPayments(req: Request, res: Response): Promise<void> {
    try {
      const payments = await prisma.payment.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.json({
        success: true,
        data: payments,
        message: 'Pagamentos listados com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar pagamentos',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter pagamento por ID
  static async getPaymentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id }
      });

      if (!payment) {
        res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado'
        });
        return;
      }

      res.json({
        success: true,
        data: payment,
        message: 'Pagamento encontrado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Criar novo pagamento
  static async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const paymentData = req.body;
      
      const newPayment = await prisma.payment.create({
        data: {
          amount: parseFloat(paymentData.amount),
          description: paymentData.description,
          status: paymentData.status || 'pending',
          dueDate: new Date(paymentData.dueDate)
        }
      });

      res.status(201).json({
        success: true,
        data: newPayment,
        message: 'Pagamento criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Atualizar pagamento
  static async updatePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const payment = await prisma.payment.update({
        where: { id },
        data: {
          amount: updateData.amount ? parseFloat(updateData.amount) : undefined,
          description: updateData.description,
          status: updateData.status,
          dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
          updatedAt: new Date()
        }
      });

      res.json({
        success: true,
        data: payment,
        message: 'Pagamento atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Deletar pagamento
  static async deletePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.payment.delete({
        where: { id }
      });

      res.json({
        success: true,
        message: 'Pagamento deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Processar pagamento
  static async processPayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const payment = await prisma.payment.update({
        where: { id },
        data: {
          status: 'completed',
          updatedAt: new Date()
        }
      });

      res.json({
        success: true,
        data: payment,
        message: 'Pagamento processado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao processar pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 