/**
 * @fileoverview Configuração do banco de dados DOM v2 (PRISMA VERSION)
 * @description Cliente Prisma real para PostgreSQL
 * @author DOM Team v2
 * @version 2.0.0
 */

import { PrismaClient } from '@prisma/client';

// Cliente Prisma global (real)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Função para conectar ao banco
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log(`[${new Date().toISOString()}] ` + '✅ Conectado ao banco de dados PostgreSQL');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    throw error;
  }
}

// Função para desconectar do banco
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log(`[${new Date().toISOString()}] ` + '🔌 Desconectado do banco de dados PostgreSQL');
  } catch (error) {
    console.error('❌ Erro ao desconectar do banco:', error);
  }
}

// Função para verificar saúde do banco
export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', message: 'PostgreSQL operacional' };
  } catch (error) {
    return { status: 'unhealthy', message: 'Erro na conexão com PostgreSQL', error };
  }
} 