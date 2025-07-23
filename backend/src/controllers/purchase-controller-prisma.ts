// Controller Purchase com Prisma - Controle de Compras
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class PurchaseControllerPrisma {
  // Listar todas as compras
  static async getAllPurchases(req: Request, res: Response): Promise<void> {
    try {
      const purchases = await prisma.purchase.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.json({
        success: true,
        data: purchases,
        message: 'Compras listadas com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar compras',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter compra por ID
  static async getPurchaseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const purchase = await prisma.purchase.findUnique({
        where: { id }
      });

      if (!purchase) {
        res.status(404).json({
          success: false,
          message: 'Compra não encontrada'
        });
        return;
      }

      res.json({
        success: true,
        data: purchase,
        message: 'Compra encontrada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar compra',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Criar nova compra
  static async createPurchase(req: Request, res: Response): Promise<void> {
    try {
      const purchaseData = req.body;
      
      const newPurchase = await prisma.purchase.create({
        data: {
          title: purchaseData.title,
          description: purchaseData.description,
          amount: parseFloat(purchaseData.amount),
          status: purchaseData.status || 'pending',
          category: purchaseData.category
        }
      });

      res.status(201).json({
        success: true,
        data: newPurchase,
        message: 'Compra criada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar compra',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Atualizar compra
  static async updatePurchase(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const purchase = await prisma.purchase.update({
        where: { id },
        data: {
          title: updateData.title,
          description: updateData.description,
          amount: updateData.amount ? parseFloat(updateData.amount) : undefined,
          status: updateData.status,
          category: updateData.category,
          updatedAt: new Date()
        }
      });

      res.json({
        success: true,
        data: purchase,
        message: 'Compra atualizada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar compra',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Deletar compra
  static async deletePurchase(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.purchase.delete({
        where: { id }
      });

      res.json({
        success: true,
        message: 'Compra deletada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar compra',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Aprovar compra
  static async approvePurchase(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const purchase = await prisma.purchase.update({
        where: { id },
        data: {
          status: 'approved',
          updatedAt: new Date()
        }
      });

      res.json({
        success: true,
        data: purchase,
        message: 'Compra aprovada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao aprovar compra',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 