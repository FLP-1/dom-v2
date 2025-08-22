const fs = require('fs');
const path = require('path');

// Função para restaurar backup de um arquivo
function restoreBackup(filePath) {
    const backupPath = filePath + '.backup';
    if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, filePath);
        console.log(`🔄 Backup restaurado: ${filePath}`);
        return true;
    } else {
        console.log(`⚠️  Backup não encontrado: ${backupPath}`);
        return false;
    }
}

// Função para processar todos os arquivos HTML e restaurar backups
function restoreAllBackups(directory) {
    const files = fs.readdirSync(directory);
    let totalRestored = 0;
    let totalSkipped = 0;

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const result = restoreAllBackups(filePath);
            totalRestored += result.restored;
            totalSkipped += result.skipped;
        } else if (file.endsWith('.html')) {
            if (restoreBackup(filePath)) {
                totalRestored++;
            } else {
                totalSkipped++;
            }
        }
    });

    return { restored: totalRestored, skipped: totalSkipped };
}

// Função para listar todos os backups disponíveis
function listBackups(directory) {
    const files = fs.readdirSync(directory);
    let backups = [];

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            backups = backups.concat(listBackups(filePath));
        } else if (file.endsWith('.html.backup')) {
            backups.push(filePath);
        }
    });

    return backups;
}

// Função para limpar backups (remover arquivos .backup)
function cleanBackups(directory) {
    const files = fs.readdirSync(directory);
    let totalCleaned = 0;

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            totalCleaned += cleanBackups(filePath);
        } else if (file.endsWith('.backup')) {
            fs.unlinkSync(filePath);
            console.log(`🗑️  Backup removido: ${filePath}`);
            totalCleaned++;
        }
    });

    return totalCleaned;
}

// Verificar argumentos da linha de comando
const args = process.argv.slice(2);
const command = args[0];

const frontendDir = path.join(__dirname, '..', 'frontend', 'public');

if (command === 'list') {
    console.log('📋 Listando backups disponíveis...');
    const backups = listBackups(frontendDir);
    if (backups.length > 0) {
        backups.forEach(backup => {
            console.log(`   📄 ${backup}`);
        });
        console.log(`\n📊 Total de backups: ${backups.length}`);
    } else {
        console.log('❌ Nenhum backup encontrado');
    }
} else if (command === 'clean') {
    console.log('🗑️  Removendo todos os backups...');
    const cleaned = cleanBackups(frontendDir);
    console.log(`\n✅ ${cleaned} backups removidos`);
} else {
    console.log('🔄 Iniciando restauração de backups...');
    const result = restoreAllBackups(frontendDir);
    
    console.log(`\n🎉 Restauração concluída!`);
    console.log(`   ✅ ${result.restored} arquivos restaurados`);
    console.log(`   ⚠️  ${result.skipped} arquivos sem backup`);
    
    if (result.restored > 0) {
        console.log('\n📋 Uso:');
        console.log('   node scripts/restore-backups.js          - Restaurar todos os backups');
        console.log('   node scripts/restore-backups.js list      - Listar backups disponíveis');
        console.log('   node scripts/restore-backups.js clean     - Remover todos os backups');
    }
}
