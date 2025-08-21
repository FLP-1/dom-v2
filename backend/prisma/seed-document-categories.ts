/**
 * @fileoverview Seed para categorias de documentos
 * @description Popula o banco de dados com categorias padrão de documentos
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const documentCategories = [
  {
    name: 'Documentos Pessoais',
    description: 'Documentos de identificação pessoal',
    icon: '👤',
    color: '#3B82F6',
    active: true
  },
  {
    name: 'Documentos Trabalhistas',
    description: 'Contratos, carteiras de trabalho, etc.',
    icon: '💼',
    color: '#10B981',
    active: true
  },
  {
    name: 'Documentos Financeiros',
    description: 'Extratos, comprovantes, recibos',
    icon: '💰',
    color: '#F59E0B',
    active: true
  },
  {
    name: 'Documentos Médicos',
    description: 'Atestados, exames, receitas',
    icon: '🏥',
    color: '#EF4444',
    active: true
  },
  {
    name: 'Documentos Escolares',
    description: 'Diplomas, certificados, boletins',
    icon: '🎓',
    color: '#8B5CF6',
    active: true
  },
  {
    name: 'Documentos Imobiliários',
    description: 'Contratos de aluguel, escrituras',
    icon: '🏠',
    color: '#06B6D4',
    active: true
  },
  {
    name: 'Documentos Veiculares',
    description: 'Documentação de veículos',
    icon: '🚗',
    color: '#84CC16',
    active: true
  },
  {
    name: 'Documentos Contratuais',
    description: 'Contratos diversos',
    icon: '📋',
    color: '#F97316',
    active: true
  },
  {
    name: 'Documentos Fiscais',
    description: 'Notas fiscais, declarações',
    icon: '📊',
    color: '#EC4899',
    active: true
  },
  {
    name: 'Outros',
    description: 'Outros tipos de documentos',
    icon: '📄',
    color: '#6B7280',
    active: true
  }
];

async function seedDocumentCategories() {
  try {
    console.log('🌱 Iniciando seed de categorias de documentos...');

    // Verificar se já existem categorias
    const existingCategories = await prisma.documentCategory.count();
    
    if (existingCategories > 0) {
      console.log('⚠️ Categorias de documentos já existem. Pulando seed...');
      return;
    }

    // Criar categorias
    for (const category of documentCategories) {
      await prisma.documentCategory.create({
        data: category
      });
      console.log(`✅ Categoria criada: ${category.name}`);
    }

    console.log('🎉 Seed de categorias de documentos concluído!');
    console.log(`📊 Total de categorias criadas: ${documentCategories.length}`);

  } catch (error) {
    console.error('❌ Erro ao executar seed de categorias:', error);
    throw error;
  }
}

// Executar seed se chamado diretamente
if (require.main === module) {
  seedDocumentCategories()
    .then(() => {
      console.log('✅ Seed concluído com sucesso');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro no seed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { seedDocumentCategories };
