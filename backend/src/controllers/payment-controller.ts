import { Request, Response } from 'express';
import { prisma } from '../database';

export class PaymentController {
  async createPayment(req: Request, res: Response) {
    try {
      const paymentData = req.body;
      const newPayment = await prisma.payment.create({
        data: paymentData
      });
      
      res.status(201).json({
        success: true,
        data: newPayment,
        message: 'Pagamento criado com sucesso'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Erro ao criar pagamento'
      });
    }
  }

  async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await prisma.payment.findMany();
      
      res.status(200).json({
        success: true,
        data: payments,
        message: 'Pagamentos recuperados com sucesso'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Erro ao recuperar pagamentos'
      });
    }
  }

  async getPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id }
      });
      
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        data: payment,
        message: 'Pagamento recuperado com sucesso'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Erro ao recuperar pagamento'
      });
    }
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const payment = await prisma.payment.update({
        where: { id },
        data: updateData
      });
      
      res.status(200).json({
        success: true,
        data: payment,
        message: 'Pagamento atualizado com sucesso'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Erro ao atualizar pagamento'
      });
    }
  }

  async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      await prisma.payment.delete({
        where: { id }
      });
      
      res.status(200).json({
        success: true,
        message: 'Pagamento excluído com sucesso'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Erro ao excluir pagamento'
      });
    }
  }

  async processPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const payment = await prisma.payment.update({
        where: { id },
        data: {
          status: 'PROCESSED',
          processedAt: new Date()
        }
      });
      
      res.status(200).json({
        success: true,
        data: payment,
        message: 'Pagamento processado com sucesso'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Erro ao processar pagamento'
      });
    }
  }
}