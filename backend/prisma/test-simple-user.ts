#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function testUserCreation() {
  console.log('🧪 Testando criação de usuário simples...');
  
  try {
    const password_hash = await bcrypt.hash('123456', 12);
    
    // Teste com dados mínimos
    const testUser = await prisma.users.create({
      data: {
        name: 'Teste Simples',
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
    
    // Teste com system_owner
    try {
      console.log('\n🧪 Testando com system_owner...');
      const password_hash = await bcrypt.hash('123456', 12);
      
      const systemUser = await prisma.users.create({
        data: {
          name: 'Sistema',
          nickname: 'sistema',
          cpf: '11144477735',
          email: 'sistema@teste.com',
          password_hash,
          phone: '11999999999',
          profile: 'system_owner',
          active: true
        }
      });
      
      console.log('✅ System owner criado:', systemUser.name);
      
      await prisma.users.delete({
        where: { id: systemUser.id }
      });
      
    } catch (error2) {
      console.error('❌ Erro com system_owner:', error2);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testUserCreation();
