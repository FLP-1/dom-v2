const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'frontend', 'public');

// Mapeamento de tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    let filePath = req.url;
    
    // Se a URL for "/", servir index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Construir o caminho completo do arquivo
    const fullPath = path.join(PUBLIC_DIR, filePath);
    
    // Obter a extensão do arquivo
    const extname = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Ler o arquivo
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Arquivo não encontrado
                console.log(`Arquivo não encontrado: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <html>
                        <head><title>404 - Arquivo não encontrado</title></head>
                        <body>
                            <h1>404 - Arquivo não encontrado</h1>
                            <p>O arquivo <strong>${filePath}</strong> não foi encontrado.</p>
                            <p><a href="/">Voltar para a página inicial</a></p>
                        </body>
                    </html>
                `);
            } else {
                // Erro do servidor
                console.error(`Erro ao ler arquivo: ${err.code}`);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <html>
                        <head><title>500 - Erro interno do servidor</title></head>
                        <body>
                            <h1>500 - Erro interno do servidor</h1>
                            <p>Ocorreu um erro ao processar sua requisição.</p>
                            <p><a href="/">Voltar para a página inicial</a></p>
                        </body>
                    </html>
                `);
            }
        } else {
            // Arquivo encontrado
            res.writeHead(200, { 
                'Content-Type': `${contentType}; charset=utf-8`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor HTTP iniciado em http://localhost:${PORT}`);
    console.log(`📁 Servindo arquivos de: ${PUBLIC_DIR}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log(`⏹️  Pressione Ctrl+C para parar o servidor`);
});

// Tratamento de erros
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Porta ${PORT} já está em uso!`);
        console.log(`💡 Tente usar uma porta diferente ou mate o processo que está usando a porta ${PORT}`);
    } else {
        console.error('❌ Erro no servidor:', err);
    }
});

// Tratamento de encerramento gracioso
process.on('SIGINT', () => {
    console.log('\n🛑 Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso!');
        process.exit(0);
    });
});
