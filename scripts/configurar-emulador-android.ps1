# Script para configurar emulador Android e testar aplicativo DOM v2
# DOM v2 - Configuração de Emulador

Write-Host "🔧 Configurando emulador Android para DOM v2..." -ForegroundColor Green

# Verificar se Android Studio está instalado
$androidStudioPath = "C:\Program Files\Android\Android Studio\bin\studio64.exe"

if (Test-Path $androidStudioPath) {
    Write-Host "✅ Android Studio encontrado!" -ForegroundColor Green
    
    # Verificar se o projeto tem configuração Android
    if (Test-Path "frontend/android") {
        Write-Host "📱 Projeto Android encontrado!" -ForegroundColor Green
        
        Write-Host "`n🚀 Para testar o aplicativo no emulador:" -ForegroundColor Cyan
        Write-Host "`n1️⃣ Abra o Android Studio:" -ForegroundColor Yellow
        Write-Host "   & '$androidStudioPath'" -ForegroundColor White
        
        Write-Host "`n2️⃣ No Android Studio:" -ForegroundColor Yellow
        Write-Host "   - Vá em Tools > AVD Manager" -ForegroundColor White
        Write-Host "   - Clique em 'Create Virtual Device'" -ForegroundColor White
        Write-Host "   - Escolha um dispositivo (ex: Pixel 4)" -ForegroundColor White
        Write-Host "   - Escolha uma imagem do sistema (ex: API 33)" -ForegroundColor White
        Write-Host "   - Clique em 'Finish'" -ForegroundColor White
        
        Write-Host "`n3️⃣ Inicie o emulador:" -ForegroundColor Yellow
        Write-Host "   - No AVD Manager, clique no play button" -ForegroundColor White
        
        Write-Host "`n4️⃣ Execute o aplicativo:" -ForegroundColor Yellow
        Write-Host "   cd frontend" -ForegroundColor White
        Write-Host "   npx react-native run-android" -ForegroundColor White
        
        Write-Host "`n5️⃣ Para ver logs em tempo real:" -ForegroundColor Yellow
        Write-Host "   adb logcat | grep ReactNativeJS" -ForegroundColor White
        
        Write-Host "`n6️⃣ Para recarregar o app:" -ForegroundColor Yellow
        Write-Host "   - Pressione R no terminal" -ForegroundColor White
        Write-Host "   - Ou agite o dispositivo virtual" -ForegroundColor White
        
    } else {
        Write-Host "⚠️  Projeto Android não encontrado" -ForegroundColor Yellow
        Write-Host "`n🔧 Para criar configuração Android:" -ForegroundColor Cyan
        Write-Host "   cd frontend" -ForegroundColor White
        Write-Host "   npx react-native init . --template react-native-template-typescript" -ForegroundColor White
        Write-Host "   npx react-native eject" -ForegroundColor White
    }
    
} else {
    Write-Host "❌ Android Studio não encontrado" -ForegroundColor Red
    Write-Host "   Instale o Android Studio primeiro:" -ForegroundColor White
    Write-Host "   https://developer.android.com/studio" -ForegroundColor Yellow
}

Write-Host "`n📋 Comandos úteis:" -ForegroundColor Cyan
Write-Host "   Verificar dispositivos conectados:" -ForegroundColor White
Write-Host "   adb devices" -ForegroundColor Yellow
Write-Host "`n   Ver logs do aplicativo:" -ForegroundColor White
Write-Host "   adb logcat | grep ReactNativeJS" -ForegroundColor Yellow
Write-Host "`n   Limpar cache do Metro:" -ForegroundColor White
Write-Host "   npx react-native start --reset-cache" -ForegroundColor Yellow

Write-Host "`n🎯 Configuração concluída!" -ForegroundColor Green
