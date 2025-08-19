#!/usr/bin/env ts-node

/**
 * @fileoverview Script de migração para estrutura de perfis robusta
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-13
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Migra a estrutura de perfis atual para a nova estrutura robusta
 */
async function migrateProfiles() {
  console.log('🚀 INICIANDO MIGRAÇÃO DE PERFIS');
  console.log('================================');
  console.log(`📅 Data: ${new Date().toLocaleString('pt-BR')}\n`);

  try {
    // 1. Buscar todos os usuários existentes
    console.log('📋 Buscando usuários existentes...');
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        profile: true,
        permissions: true,
        active: true
      }
    });

    console.log(`✅ Encontrados ${users.length} usuários\n`);

    // 2. Migrar cada usuário para a nova estrutura
    console.log('🔄 Migrando perfis...');
    
    for (const user of users) {
      console.log(`\n👤 Migrando usuário: ${user.name} (${user.cpf})`);
      
      // Criar perfil principal baseado no campo 'profile' atual
      const primaryProfile = await prisma.userProfile.create({
        data: {
          userId: user.id,
          profileType: user.profile || 'employer',
          contextId: null, // Perfil principal não tem contexto específico
          contextType: 'system',
          isPrimary: true,
          isActive: user.active || true,
          permissions: user.permissions || {},
          metadata: {
            migratedFrom: 'legacy_profile_field',
            originalProfile: user.profile,
            migrationDate: new Date().toISOString()
          }
        }
      });

      console.log(`✅ Perfil principal criado: ${primaryProfile.profileType}`);

      // 3. Buscar roles existentes para este usuário
      const existingRoles = await prisma.userRole.findMany({
        where: { userId: user.id },
        include: { context: true }
      });

      // 4. Criar perfis adicionais baseados nos roles existentes
      for (const role of existingRoles) {
        // Não criar duplicata do perfil principal
        if (role.roleType === user.profile && !role.contextId) {
          console.log(`⏭️  Pulando role principal já migrado`);
          continue;
        }

        const additionalProfile = await prisma.userProfile.create({
          data: {
            userId: user.id,
            profileType: role.roleType,
            contextId: role.contextId,
            contextType: role.contextType,
            isPrimary: false,
            isActive: role.active,
            permissions: role.permissions || {},
            metadata: {
              migratedFrom: 'user_roles',
              originalRoleId: role.id,
              contextName: role.context?.name,
              migrationDate: new Date().toISOString()
            }
          }
        });

        console.log(`✅ Perfil adicional criado: ${additionalProfile.profileType} (${role.context?.name || 'sem contexto'})`);
      }
    }

    console.log('\n🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('====================================');
    
    // 5. Estatísticas finais
    const totalProfiles = await prisma.userProfile.count();
    const primaryProfiles = await prisma.userProfile.count({ where: { isPrimary: true } });
    const additionalProfiles = await prisma.userProfile.count({ where: { isPrimary: false } });

    console.log('\n📊 ESTATÍSTICAS DA MIGRAÇÃO:');
    console.log(`👥 Usuários migrados: ${users.length}`);
    console.log(`📋 Total de perfis: ${totalProfiles}`);
    console.log(`👑 Perfis principais: ${primaryProfiles}`);
    console.log(`➕ Perfis adicionais: ${additionalProfiles}`);

    // 6. Verificar integridade
    console.log('\n🔍 VERIFICAÇÃO DE INTEGRIDADE:');
    
    const usersWithoutPrimary = await prisma.users.findMany({
      where: {
        user_profiles: {
          none: {
            isPrimary: true
          }
        }
      }
    });

    if (usersWithoutPrimary.length > 0) {
      console.log(`⚠️  ATENÇÃO: ${usersWithoutPrimary.length} usuários sem perfil principal`);
      for (const user of usersWithoutPrimary) {
        console.log(`   - ${user.name} (${user.cpf})`);
      }
    } else {
      console.log('✅ Todos os usuários têm perfil principal');
    }

    // 7. Exemplos de uso da nova estrutura
    console.log('\n📚 EXEMPLOS DE USO DA NOVA ESTRUTURA:');
    
    // Exemplo 1: Buscar todos os perfis de um usuário
    const exampleUser = users[0];
    if (exampleUser) {
      const userProfiles = await prisma.userProfile.findMany({
        where: { userId: exampleUser.id },
        include: { user: { select: { name: true, cpf: true } } }
      });

      console.log(`\n👤 Perfis de ${exampleUser.name}:`);
      for (const profile of userProfiles) {
        console.log(`   - ${profile.profileType} ${profile.isPrimary ? '(PRINCIPAL)' : ''} ${profile.contextId ? `(${profile.contextType})` : ''}`);
      }
    }

    // Exemplo 2: Buscar todos os empregadores
    const employers = await prisma.userProfile.findMany({
      where: { 
        profileType: 'employer',
        isActive: true
      },
      include: { user: { select: { name: true, cpf: true } } }
    });

    console.log(`\n👑 Total de empregadores ativos: ${employers.length}`);

  } catch (error) {
    console.error('❌ ERRO NA MIGRAÇÃO:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Função para reverter a migração (se necessário)
 */
async function rollbackMigration() {
  console.log('🔄 REVERTENDO MIGRAÇÃO DE PERFIS...');
  
  try {
    await prisma.userProfile.deleteMany();
    console.log('✅ Migração revertida com sucesso');
  } catch (error) {
    console.error('❌ Erro ao reverter migração:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar migração
if (process.argv.includes('--rollback')) {
  rollbackMigration()
    .then(() => {
      console.log('✅ Rollback concluído');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro no rollback:', error);
      process.exit(1);
    });
} else {
  migrateProfiles()
    .then(() => {
      console.log('\n✅ Migração concluída com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Erro na migração:', error);
      process.exit(1);
    });
}
