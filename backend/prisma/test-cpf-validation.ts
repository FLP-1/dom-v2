#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { validateCPF, formatCPF } from '../src/utils/cpfValidation';

const prisma = new PrismaClient();

async function testCPFValidation() {
  console.log('🧪 Testando validação de CPF...');
  
  try {
    const password_hash = await bcrypt.hash('123456', 12);
    
    // Teste com CPF direto (sem validação)
    console.log('📝 Testando com CPF direto...');
    const testUser1 = await prisma.users.create({
      data: {
        name: 'Teste CPF Direto',
        nickname: 'teste1',
        cpf: '12345678909',
        email: 'teste1@teste.com',
        password_hash,
        phone: '11999999999',
        profile: 'employer',
        active: true
      }
    });
    
    console.log('✅ Usuário criado com CPF direto:', testUser1.name);
    
    // Limpar
    await prisma.users.delete({
      where: { id: testUser1.id }
    });
    
    // Teste com validação de CPF
    console.log('\n📝 Testando com validação de CPF...');
    const cpf = validateAndFormatUserCPF('59876913700', 'Teste Validação');
    console.log('CPF formatado:', cpf);
    
    const testUser2 = await prisma.users.create({
      data: {
        name: 'Teste CPF Validado',
        nickname: 'teste2',
        cpf: cpf,
        email: 'teste2@teste.com',
        password_hash,
        phone: '11999999999',
        profile: 'employer',
        active: true
      }
    });
    
    console.log('✅ Usuário criado com CPF validado:', testUser2.name);
    
    // Limpar
    await prisma.users.delete({
      where: { id: testUser2.id }
    });
    
    console.log('✅ Teste concluído');
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function validateAndFormatUserCPF(cpf: string, name: string): string {
  if (!validateCPF(cpf)) {
    throw new Error(`CPF inválido para ${name}: ${cpf}`);
  }
  // Retornar apenas os dígitos, sem formatação
  return cpf.replace(/\D/g, '');
}

testCPFValidation();
