#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Testando criação de usuário...');
  
  try {
    const password_hash = await bcrypt.hash('123456', 12);
    
    // Teste simples
    const testUser = await prisma.users.create({
      data: {
        name: 'Teste Usuário',
        nickname: 'teste',
        cpf: '12345678909',
        email: 'teste@teste.com',
        password_hash,
        phone: '11999999999',
        profile: 'employer',
        active: true
      }
    });
    
    console.log('✅ Usuário criado com sucesso:', testUser.name);
    
    // Limpar
    await prisma.users.delete({
      where: { id: testUser.id }
    });
    
    console.log('✅ Teste concluído');
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
