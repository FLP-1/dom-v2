# Script para integrar Android Studio com Cursor AI
# DOM v2 - Integração de Ferramentas

Write-Host "🔧 Configurando integração Android Studio + Cursor AI..." -ForegroundColor Green

# Verificar se o Android Studio está instalado
$androidStudioPath = "C:\Program Files\Android\Android Studio\bin\studio64.exe"

if (Test-Path $androidStudioPath) {
    Write-Host "✅ Android Studio encontrado em: $androidStudioPath" -ForegroundColor Green
    
    # Adicionar ao PATH se não estiver
    $currentPath = $env:PATH
    $androidStudioBinPath = "C:\Program Files\Android\Android Studio\bin"
    
    if ($currentPath -notlike "*$androidStudioBinPath*") {
        Write-Host "📝 Adicionando Android Studio ao PATH..." -ForegroundColor Yellow
        $env:PATH += ";$androidStudioBinPath"
        Write-Host "✅ Android Studio adicionado ao PATH" -ForegroundColor Green
    } else {
        Write-Host "✅ Android Studio já está no PATH" -ForegroundColor Green
    }
    
    # Verificar se o projeto tem configuração Android
    if (Test-Path "frontend/android") {
        Write-Host "📱 Projeto Android encontrado em frontend/android" -ForegroundColor Green
        
        # Criar alias para abrir o projeto no Android Studio
        Write-Host "🚀 Criando comando para abrir no Android Studio..." -ForegroundColor Yellow
        
        # Comando para abrir o projeto atual no Android Studio
        Write-Host "`n📋 Comandos disponíveis:" -ForegroundColor Cyan
        Write-Host "   Para abrir o projeto no Android Studio:" -ForegroundColor White
        Write-Host "   & '$androidStudioPath' frontend/android" -ForegroundColor Yellow
        
        Write-Host "`n   Para abrir apenas o Android Studio:" -ForegroundColor White
        Write-Host "   & '$androidStudioPath'" -ForegroundColor Yellow
        
        Write-Host "`n   Para verificar se o emulador está rodando:" -ForegroundColor White
        Write-Host "   adb devices" -ForegroundColor Yellow
        
        Write-Host "`n   Para buildar o projeto Android:" -ForegroundColor White
        Write-Host "   cd frontend; npx react-native run-android" -ForegroundColor Yellow
        
    } else {
        Write-Host "⚠️  Projeto Android não encontrado" -ForegroundColor Yellow
        Write-Host "   Para criar um projeto Android, execute:" -ForegroundColor White
        Write-Host "   cd frontend; npx react-native init AndroidProject" -ForegroundColor Yellow
    }
    
} else {
    Write-Host "❌ Android Studio não encontrado" -ForegroundColor Red
    Write-Host "   Instale o Android Studio em: https://developer.android.com/studio" -ForegroundColor White
}

Write-Host "`n🎯 Integração configurada!" -ForegroundColor Green
Write-Host "   Use os comandos acima para trabalhar com Android Studio" -ForegroundColor White
