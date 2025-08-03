# 🎨 Script para Usar Assistente IA - Artista de Telas
# Diretório: /c%3A/dom-v2/scripts
# Descrição: Interface interativa para usar o assistente de design

Write-Host "🎨 ASSISTENTE IA - ARTISTA DE TELAS" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o arquivo do assistente existe
if (-not (Test-Path "scripts/assistente-ia-artista-telas.js")) {
    Write-Host "❌ Erro: Arquivo do assistente não encontrado!" -ForegroundColor Red
    Write-Host "📍 Certifique-se de estar no diretório raiz do projeto DOM v2" -ForegroundColor Yellow
    exit 1
}

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro: Node.js não encontrado!" -ForegroundColor Red
    Write-Host "📍 Instale o Node.js para usar o assistente" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎯 COMO USAR O ASSISTENTE:" -ForegroundColor Yellow
Write-Host "• Digite sua pergunta sobre design de interfaces" -ForegroundColor White
Write-Host "• Mencione o perfil de usuário (empregador, empregado, família)" -ForegroundColor White
Write-Host "• Pergunte sobre cores, layout, tipografia, animações" -ForegroundColor White
Write-Host "• Digite 'sair' para encerrar" -ForegroundColor White
Write-Host ""

# Função para executar o assistente
function ExecutarAssistente {
    param([string]$pergunta)
    
    # Criar arquivo temporário com a pergunta
    $arquivoTemp = "temp_pergunta.txt"
    $pergunta | Out-File -FilePath $arquivoTemp -Encoding UTF8
    
    # Executar o assistente
    try {
        $resultado = node -e "
            const { AssistenteIAArtistaTelas } = require('./scripts/assistente-ia-artista-telas.js');
            const fs = require('fs');
            
            async function responder() {
                const assistente = new AssistenteIAArtistaTelas();
                const pergunta = fs.readFileSync('temp_pergunta.txt', 'utf8').trim();
                const resposta = await assistente.interagir(pergunta);
                
                console.log('🎨 RESPOSTA:');
                console.log(resposta.titulo);
                console.log(resposta.conteudo);
                console.log('');
                console.log('💭 Emoção: ' + resposta.emocao);
                console.log('🎯 Ação: ' + resposta.acao);
            }
            
            responder().catch(console.error);
        "
        
        Write-Host $resultado -ForegroundColor Green
        
    } catch {
        Write-Host "❌ Erro ao executar assistente: $_" -ForegroundColor Red
    } finally {
        # Limpar arquivo temporário
        if (Test-Path $arquivoTemp) {
            Remove-Item $arquivoTemp
        }
    }
}

# Loop principal de interação
do {
    Write-Host "👤 Digite sua pergunta (ou 'sair'):" -ForegroundColor Cyan
    $pergunta = Read-Host
    
    if ($pergunta -eq 'sair') {
        Write-Host "👋 Obrigado por usar o Assistente IA - Artista de Telas!" -ForegroundColor Green
        break
    }
    
    if ($pergunta.Trim() -ne '') {
        Write-Host ""
        ExecutarAssistente $pergunta
        Write-Host ""
        Write-Host "---" -ForegroundColor Gray
        Write-Host ""
    }
    
} while ($true)

Write-Host ""
Write-Host "📊 Relatório de uso salvo em: docs/recruitment/relatorio-assistente-ia-artista-telas.json" -ForegroundColor Yellow
Write-Host "🎨 Até a próxima!" -ForegroundColor Cyan 