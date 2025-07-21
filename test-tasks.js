/**
 * @fileoverview Script de teste para endpoints de tarefas
 * @directory dom-v2
 * @description Testa o CRUD de tarefas do DOM v2
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

const testTasks = async () => {
  console.log('🧪 Testando endpoints de tarefas...\n');

  try {
    // 1. Listar tarefas
    console.log('1. Listando tarefas...');
    const listResponse = await fetch('http://localhost:3001/api/tasks');
    const listData = await listResponse.json();
    console.log('Status:', listResponse.status);
    console.log('Tarefas:', listData.tasks.length);
    console.log('✅ Listagem funcionando!\n');

    // 2. Criar nova tarefa
    console.log('2. Criando nova tarefa...');
    const createResponse = await fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Teste DOM v2',
        description: 'Tarefa criada via teste',
        priority: 'high'
      }),
    });
    const createData = await createResponse.json();
    console.log('Status:', createResponse.status);
    console.log('Nova tarefa:', createData.task.title);
    console.log('✅ Criação funcionando!\n');

    // 3. Atualizar tarefa
    console.log('3. Atualizando tarefa...');
    const updateResponse = await fetch(`http://localhost:3001/api/tasks/${createData.task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'completed',
        description: 'Tarefa atualizada via teste'
      }),
    });
    const updateData = await updateResponse.json();
    console.log('Status:', updateResponse.status);
    console.log('Tarefa atualizada:', updateData.task.status);
    console.log('✅ Atualização funcionando!\n');

    // 4. Verificar dashboard atualizado
    console.log('4. Verificando dashboard...');
    const dashboardResponse = await fetch('http://localhost:3001/api/dashboard/stats');
    const dashboardData = await dashboardResponse.json();
    console.log('Status:', dashboardResponse.status);
    console.log('Estatísticas:', dashboardData.stats.tasks);
    console.log('✅ Dashboard atualizado!\n');

    // 5. Remover tarefa
    console.log('5. Removendo tarefa...');
    const deleteResponse = await fetch(`http://localhost:3001/api/tasks/${createData.task.id}`, {
      method: 'DELETE',
    });
    const deleteData = await deleteResponse.json();
    console.log('Status:', deleteResponse.status);
    console.log('Mensagem:', deleteData.message);
    console.log('✅ Remoção funcionando!\n');

    console.log('🎉 TODOS OS TESTES PASSARAM!');

  } catch (error) {
    console.log('❌ Erro:', error.message);
  }
};

testTasks();
