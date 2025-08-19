const http = require('http');

function testarLogin() {
    console.log('🧪 Testando login para verificar nickname...');
    
    const postData = JSON.stringify({
        cpf: '59876913700',
        password: '123456',
        termsAccepted: true,
        privacyAccepted: true
    });
    
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const responseData = JSON.parse(data);
                
                console.log('📊 Resposta do login:');
                console.log(JSON.stringify(responseData, null, 2));
                
                if (responseData.success && responseData.user) {
                    console.log('\n✅ Login bem-sucedido!');
                    console.log('👤 Dados do usuário:');
                    console.log(`  - ID: ${responseData.user.id}`);
                    console.log(`  - Nome: ${responseData.user.name}`);
                    console.log(`  - Nickname: ${responseData.user.nickname || 'NÃO ENCONTRADO'}`);
                    console.log(`  - Email: ${responseData.user.email}`);
                    console.log(`  - Perfil: ${responseData.user.profile}`);
                    console.log(`  - CPF: ${responseData.user.cpf}`);
                    
                    if (responseData.user.nickname) {
                        console.log('\n🎉 Nickname está sendo retornado pelo backend!');
                    } else {
                        console.log('\n❌ Nickname NÃO está sendo retornado pelo backend!');
                    }
                } else {
                    console.log('\n❌ Login falhou:', responseData.error);
                }
            } catch (error) {
                console.error('❌ Erro ao processar resposta:', error.message);
            }
        });
    });
    
    req.on('error', (error) => {
        console.error('❌ Erro ao fazer requisição:', error.message);
    });
    
    req.write(postData);
    req.end();
}

testarLogin();
