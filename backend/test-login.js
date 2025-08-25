const bcrypt = require('bcrypt');

async function testLogin() {
    try {
        console.log('🔍 Testando login...');
        
        // Senha que deveria funcionar
        const password = 'admin123';
        
        // Hash da senha (simulando o que está no banco)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('🔑 Hash gerado:', hashedPassword.substring(0, 20) + '...');
        
        // Testar comparação
        const isValid = await bcrypt.compare(password, hashedPassword);
        console.log('✅ Senha válida:', isValid);
        
        // Testar senha incorreta
        const isInvalid = await bcrypt.compare('senhaerrada', hashedPassword);
        console.log('❌ Senha inválida:', isInvalid);
        
        console.log('✅ Teste de login concluído');
        
    } catch (error) {
        console.error('❌ Erro no teste:', error);
    }
}

testLogin();
