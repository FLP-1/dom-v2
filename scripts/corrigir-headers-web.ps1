# Script para corrigir headers duplicados nas telas web HTML
# Autor: DOM v2 Team
# Data: 2025-08-20

Write-Host "🔧 Iniciando correção de headers duplicados nas telas web..." -ForegroundColor Cyan

# Diretório das telas web
$webDir = "frontend/public"

# Verificar se os diretórios existem
if (-not (Test-Path $webDir)) {
    Write-Host "❌ Diretório $webDir não encontrado!" -ForegroundColor Red
    exit 1
}

# Lista de telas para corrigir (excluindo login e splash)
$telasParaCorrigir = @(
    "dashboard.html",
    "profile.html", 
    "settings.html",
    "reports.html",
    "notifications.html",
    "finance.html",
    "budget-management.html",
    "payments-management.html",
    "employees-management.html",
    "tasks-management.html",
    "hr-management.html",
    "timeclock.html",
    "advanced-timecard.html",
    "payment-integrations.html",
    "communication.html",
    "gamification.html",
    "dashboard-admin.html",
    "dashboard-family.html",
    "dashboard-employee.html",
    "dashboard-employer.html"
)

# Função para corrigir uma tela
function Corrigir-Tela {
    param($arquivo)
    
    $caminho = Join-Path $webDir $arquivo
    if (-not (Test-Path $caminho)) {
        Write-Host "⚠️  Arquivo $arquivo não encontrado" -ForegroundColor Yellow
        return
    }
    
    Write-Host "🔧 Corrigindo $arquivo..." -ForegroundColor Green
    
    # Ler conteúdo do arquivo
    $conteudo = Get-Content $caminho -Raw -Encoding UTF8
    
    # 1. Adicionar link para CSS compartilhado
    if ($conteudo -notmatch "components/styles\.css") {
        $conteudo = $conteudo -replace "</head>", "    <link rel=`"stylesheet`" href=`"components/styles.css`">`n</head>"
    }
    
    # 2. Remover headers duplicados e botões de menu duplicados
    # Padrão para encontrar headers duplicados
    $padraoHeader = '<header class="header">.*?</header>'
    $matches = [regex]::Matches($conteudo, $padraoHeader, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    
    if ($matches.Count -gt 1) {
        Write-Host "  🗑️  Removendo headers duplicados..." -ForegroundColor Yellow
        # Manter apenas o primeiro header
        $conteudo = $conteudo -replace $padraoHeader, '', 1
        $conteudo = $conteudo -replace $padraoHeader, ''
    }
    
    # 3. Remover botões de menu duplicados
    $padraoMenu = '<button class="menu-button".*?</button>'
    $matches = [regex]::Matches($conteudo, $padraoMenu, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    
    if ($matches.Count -gt 1) {
        Write-Host "  🗑️  Removendo botões de menu duplicados..." -ForegroundColor Yellow
        # Manter apenas o primeiro botão
        $conteudo = $conteudo -replace $padraoMenu, '', 1
        $conteudo = $conteudo -replace $padraoMenu, ''
    }
    
    # 4. Substituir header e sidebar por containers
    $conteudo = $conteudo -replace '<header class="header">.*?</header>', '<!-- Containers para componentes --><div id="header-container"></div><div id="sidebar-container"></div>', [System.Text.RegularExpressions.RegexOptions]::Singleline
    $conteudo = $conteudo -replace '<button class="menu-button".*?</button>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline
    
    # 5. Adicionar wrapper main-content
    if ($conteudo -notmatch 'class="main-content"') {
        $conteudo = $conteudo -replace '<body>', '<body>`n    <div class="main-content">'
        $conteudo = $conteudo -replace '</body>', '    </div>`n</body>'
    }
    
    # 6. Adicionar script de componentes
    if ($conteudo -notmatch "js/components\.js") {
        $titulo = $arquivo -replace '\.html$', ''
        $scriptTag = "<script src=`"js/components.js`"></script>`n<script>`n    // Inicializar componentes`n    document.addEventListener(`"DOMContentLoaded`", function() {`n        initPage(`"$titulo`");`n    });`n</script>"
        $conteudo = $conteudo -replace '</head>', "$scriptTag`n</head>"
    }
    
    # Salvar arquivo corrigido
    $conteudo | Set-Content $caminho -Encoding UTF8
    
    Write-Host "  ✅ $arquivo corrigido com sucesso!" -ForegroundColor Green
}

# Função para corrigir tela de documentos (adicionar header)
function Corrigir-TelaDocumentos {
    $arquivo = "documents-management.html"
    $caminho = Join-Path $webDir $arquivo
    
    if (-not (Test-Path $caminho)) {
        Write-Host "⚠️  Arquivo $arquivo não encontrado" -ForegroundColor Yellow
        return
    }
    
    Write-Host "🔧 Corrigindo $arquivo (adicionando header)..." -ForegroundColor Green
    
    # Ler conteúdo do arquivo
    $conteudo = Get-Content $caminho -Raw -Encoding UTF8
    
    # Verificar se já tem os containers
    if ($conteudo -match 'id="header-container"') {
        Write-Host "  ✅ $arquivo já está corrigido!" -ForegroundColor Green
        return
    }
    
    # 1. Adicionar link para CSS compartilhado
    if ($conteudo -notmatch "components/styles\.css") {
        $conteudo = $conteudo -replace "</head>", "    <link rel=`"stylesheet`" href=`"components/styles.css`">`n</head>"
    }
    
    # 2. Adicionar containers para componentes
    $conteudo = $conteudo -replace '<body>', '<body>`n    <!-- Containers para componentes -->`n    <div id="header-container"></div>`n    <div id="sidebar-container"></div>`n    `n    <div class="main-content">'
    
    # 3. Fechar main-content antes do </body>
    $conteudo = $conteudo -replace '</body>', '    </div>`n</body>'
    
    # 4. Adicionar script de componentes
    if ($conteudo -notmatch "js/components\.js") {
        $scriptTag = "<script src=`"js/components.js`"></script>`n<script>`n    // Inicializar componentes`n    document.addEventListener(`"DOMContentLoaded`", function() {`n        initPage(`"Gestão de Documentos`");`n    });`n</script>"
        $conteudo = $conteudo -replace '</head>', "$scriptTag`n</head>"
    }
    
    # Salvar arquivo corrigido
    $conteudo | Set-Content $caminho -Encoding UTF8
    
    Write-Host "  ✅ $arquivo corrigido com sucesso!" -ForegroundColor Green
}

# Executar correções
Write-Host "`n📋 Iniciando correção de $($telasParaCorrigir.Count) telas..." -ForegroundColor Cyan

foreach ($tela in $telasParaCorrigir) {
    Corrigir-Tela $tela
}

# Corrigir tela de documentos separadamente
Corrigir-TelaDocumentos

Write-Host "`n🎉 Correção concluída!" -ForegroundColor Green
Write-Host "📊 Resumo:" -ForegroundColor Cyan
Write-Host "  • Headers duplicados removidos" -ForegroundColor White
Write-Host "  • Botões de menu duplicados removidos" -ForegroundColor White
Write-Host "  • CSS compartilhado adicionado" -ForegroundColor White
Write-Host "  • Script de componentes adicionado" -ForegroundColor White
Write-Host "  • Tela de documentos com header padrão" -ForegroundColor White

Write-Host "`n🚀 Para testar, acesse: http://localhost:3000" -ForegroundColor Yellow
