# Script simples para analisar telas do projeto DOM v2
# Autor: DOM Team v2
# Data: 2025-07-26

Write-Host "ANALISE DE TELAS - DOM v2" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Função para analisar arquivo
function Analyze-File {
    param($FilePath, $Category)
    
    if (Test-Path $FilePath) {
        $file = Get-Item $FilePath
        $content = Get-Content $FilePath -Raw -ErrorAction SilentlyContinue
        
        $analysis = @{
            Name = $file.Name
            FullPath = $file.FullName
            Size = $file.Length
            Lines = if ($content) { ($content -split "`n").Count } else { 0 }
            Category = $Category
            HasComponents = $content -match "import.*from.*components"
            HasHooks = $content -match "use[A-Z]"
            HasState = $content -match "useState|useReducer"
            HasEffects = $content -match "useEffect"
            HasNavigation = $content -match "navigation|navigate"
            HasAPI = $content -match "fetch|axios|api"
            HasStyling = $content -match "StyleSheet|styles"
            HasValidation = $content -match "validation|validate"
            HasErrorHandling = $content -match "try|catch|error"
            HasLoading = $content -match "loading|spinner"
            HasModal = $content -match "Modal|modal"
            HasForm = $content -match "Form|form"
            HasTable = $content -match "Table|table"
            HasChart = $content -match "Chart|chart|graph"
            HasNotification = $content -match "notification|alert|toast"
        }
        
        return $analysis
    }
    return $null
}

# Coletar todas as telas
$allScreens = @()

Write-Host "Analisando telas do projeto atual..." -ForegroundColor Yellow

# Telas do projeto atual
$currentScreens = @(
    @{ Path = "frontend\src\screens\UltraPremiumLoginScreen.tsx"; Category = "Login" },
    @{ Path = "frontend\src\screens\PremiumLoginScreen.tsx"; Category = "Login" },
    @{ Path = "frontend\src\screens\login-screen.tsx"; Category = "Login" },
    @{ Path = "frontend\src\screens\EmployerDashboard.tsx"; Category = "Dashboard" },
    @{ Path = "frontend\src\screens\EmployeeDashboard.tsx"; Category = "Dashboard" },
    @{ Path = "frontend\src\screens\FamilyDashboard.tsx"; Category = "Dashboard" },
    @{ Path = "frontend\src\screens\AdminDashboard.tsx"; Category = "Dashboard" },
    @{ Path = "frontend\src\screens\dashboard-screen.tsx"; Category = "Dashboard" },
    @{ Path = "frontend\src\screens\simple-dashboard.tsx"; Category = "Dashboard" },
    @{ Path = "frontend\src\screens\tasks-screen.tsx"; Category = "Tasks" },
    @{ Path = "frontend\src\screens\employees-screen.tsx"; Category = "Employees" },
    @{ Path = "frontend\src\screens\purchases-screen.tsx"; Category = "Purchases" },
    @{ Path = "frontend\src\screens\payments-screen.tsx"; Category = "Payments" },
    @{ Path = "frontend\src\screens\notifications-screen.tsx"; Category = "Notifications" },
    @{ Path = "frontend\src\screens\navigation-screen.tsx"; Category = "Navigation" },
    @{ Path = "frontend\src\screens\budget\BudgetScreen.tsx"; Category = "Budget" },
    @{ Path = "frontend\src\screens\budget\BudgetDetailScreen.tsx"; Category = "Budget" },
    @{ Path = "frontend\src\screens\budget\BudgetCreateScreen.tsx"; Category = "Budget" }
)

foreach ($screen in $currentScreens) {
    $analysis = Analyze-File -FilePath $screen.Path -Category $screen.Category
    if ($analysis) {
        $allScreens += $analysis
    }
}

# Telas do backup
Write-Host "Analisando telas do backup..." -ForegroundColor Yellow

$backupScreens = @(
    @{ Path = "frontend-backup\src\screens\tasks-screen.tsx"; Category = "Tasks" },
    @{ Path = "frontend-backup\src\screens\dashboard-screen.tsx"; Category = "Dashboard" },
    @{ Path = "frontend-backup\src\screens\simple-dashboard.tsx"; Category = "Dashboard" },
    @{ Path = "frontend-backup\src\screens\login-screen.tsx"; Category = "Login" },
    @{ Path = "frontend-backup\src\screens\notifications-screen.tsx"; Category = "Notifications" },
    @{ Path = "frontend-backup\src\screens\employees-screen.tsx"; Category = "Employees" },
    @{ Path = "frontend-backup\src\screens\purchases-screen.tsx"; Category = "Purchases" },
    @{ Path = "frontend-backup\src\screens\payments-screen.tsx"; Category = "Payments" }
)

foreach ($screen in $backupScreens) {
    $analysis = Analyze-File -FilePath $screen.Path -Category $screen.Category
    if ($analysis) {
        $allScreens += $analysis
    }
}

# Telas do disco E: (se disponível)
if (Test-Path "E:\") {
    Write-Host "Analisando telas do disco E:..." -ForegroundColor Yellow
    
    $externalScreens = @(
        @{ Path = "E:\appdom\src\pages\auth\login.tsx"; Category = "Login" },
        @{ Path = "E:\appdom\src\components\alerts\AlertDashboard.tsx"; Category = "Dashboard" },
        @{ Path = "E:\git-dom\frontend\src\pages\Login.tsx"; Category = "Login" },
        @{ Path = "E:\git-dom\frontend\src\components\auth\Login.tsx"; Category = "Login" },
        @{ Path = "E:\git-dom\frontend\src\components\dashboard\DashboardCard.tsx"; Category = "Dashboard" }
    )
    
    foreach ($screen in $externalScreens) {
        $analysis = Analyze-File -FilePath $screen.Path -Category $screen.Category
        if ($analysis) {
            $allScreens += $analysis
        }
    }
}

# Calcular pontuação de complexidade
foreach ($screen in $allScreens) {
    $score = 0
    $score += if ($screen.HasComponents) { 10 } else { 0 }
    $score += if ($screen.HasHooks) { 15 } else { 0 }
    $score += if ($screen.HasState) { 10 } else { 0 }
    $score += if ($screen.HasEffects) { 10 } else { 0 }
    $score += if ($screen.HasNavigation) { 5 } else { 0 }
    $score += if ($screen.HasAPI) { 15 } else { 0 }
    $score += if ($screen.HasStyling) { 5 } else { 0 }
    $score += if ($screen.HasValidation) { 10 } else { 0 }
    $score += if ($screen.HasErrorHandling) { 10 } else { 0 }
    $score += if ($screen.HasLoading) { 5 } else { 0 }
    $score += if ($screen.HasModal) { 5 } else { 0 }
    $score += if ($screen.HasForm) { 10 } else { 0 }
    $score += if ($screen.HasTable) { 10 } else { 0 }
    $score += if ($screen.HasChart) { 15 } else { 0 }
    $score += if ($screen.HasNotification) { 5 } else { 0 }
    
    # Bônus por tamanho (normalizado)
    $sizeBonus = [math]::Min(($screen.Size / 1000) * 2, 20)
    $score += $sizeBonus
    
    $screen.ComplexityScore = $score
}

# Ordenar por pontuação
$allScreens = $allScreens | Sort-Object ComplexityScore -Descending

# Exibir resultados
Write-Host "`nRANKING DAS TELAS MAIS COMPLETAS:" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

$rank = 1
foreach ($screen in $allScreens) {
    $color = if ($rank -le 3) { "Green" } elseif ($rank -le 6) { "Yellow" } else { "Gray" }
    
    Write-Host "`n#$rank - $($screen.Name)" -ForegroundColor $color
    Write-Host "   Categoria: $($screen.Category)" -ForegroundColor White
    Write-Host "   Pontuacao: $($screen.ComplexityScore)" -ForegroundColor White
    Write-Host "   Tamanho: $($screen.Size) bytes ($($screen.Lines) linhas)" -ForegroundColor White
    Write-Host "   Local: $($screen.FullPath)" -ForegroundColor White
    
    $rank++
}

# Análise por categoria
Write-Host "`nANALISE POR CATEGORIA:" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan

$categories = $allScreens | Group-Object Category
foreach ($category in $categories) {
    $avgScore = ($category.Group | Measure-Object ComplexityScore -Average).Average
    $bestScreen = $category.Group | Sort-Object ComplexityScore -Descending | Select-Object -First 1
    
    Write-Host "`n$($category.Name):" -ForegroundColor Yellow
    Write-Host "   Media de pontuacao: $([math]::Round($avgScore, 1))" -ForegroundColor White
    Write-Host "   Melhor tela: $($bestScreen.Name) ($($bestScreen.ComplexityScore) pontos)" -ForegroundColor White
    Write-Host "   Total de telas: $($category.Count)" -ForegroundColor White
}

# Recomendações
Write-Host "`nRECOMENDACOES:" -ForegroundColor Cyan
Write-Host "==============" -ForegroundColor Cyan

$topScreen = $allScreens[0]
Write-Host "MELHOR TELA GERAL: $($topScreen.Name)" -ForegroundColor Green
Write-Host "   Local: $($topScreen.FullPath)" -ForegroundColor White
Write-Host "   Pontuacao: $($topScreen.ComplexityScore)" -ForegroundColor White

Write-Host "`nCRITERIOS DE SELECAO:" -ForegroundColor Yellow
Write-Host "1. Pontuacao de complexidade (funcionalidades implementadas)" -ForegroundColor White
Write-Host "2. Tamanho do arquivo (quantidade de codigo)" -ForegroundColor White
Write-Host "3. Categoria (relevancia para o projeto)" -ForegroundColor White
Write-Host "4. Funcionalidades avancadas (API, validacao, graficos)" -ForegroundColor White
Write-Host "5. Responsividade e UX" -ForegroundColor White

Write-Host "`nPROXIMOS PASSOS:" -ForegroundColor Green
Write-Host "1. Analisar a tela $($topScreen.Name) como referencia" -ForegroundColor White
Write-Host "2. Adaptar funcionalidades para outras telas" -ForegroundColor White
Write-Host "3. Implementar padroes de qualidade identificados" -ForegroundColor White
Write-Host "4. Criar componentes reutilizaveis baseados na melhor tela" -ForegroundColor White

# Salvar relatório
$reportPath = "logs/screen-analysis-report.json"
$reportDir = Split-Path $reportPath -Parent
if (!(Test-Path $reportDir)) {
    New-Item -Path $reportDir -ItemType Directory -Force | Out-Null
}

$report = @{
    GeneratedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    TotalScreens = $allScreens.Count
    TopScreen = @{
        Name = $topScreen.Name
        Path = $topScreen.FullPath
        Score = $topScreen.ComplexityScore
        Category = $topScreen.Category
    }
    Screens = $allScreens | Select-Object Name, FullPath, Category, Size, Lines, ComplexityScore, HasComponents, HasHooks, HasState, HasEffects, HasAPI, HasValidation, HasForm, HasTable, HasChart
    Categories = $categories | ForEach-Object {
        @{
            Name = $_.Name
            Count = $_.Count
            AverageScore = ($_.Group | Measure-Object ComplexityScore -Average).Average
            BestScreen = ($_.Group | Sort-Object ComplexityScore -Descending | Select-Object -First 1).Name
        }
    }
}

$report | ConvertTo-Json -Depth 10 | Out-File -FilePath $reportPath -Encoding UTF8
Write-Host "`nRelatorio salvo em: $reportPath" -ForegroundColor Green

Write-Host "`nAnalise concluida!" -ForegroundColor Green 