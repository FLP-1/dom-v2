# Script para testar aplicativo DOM v2 no emulador Android
# DOM v2 - Teste no Emulador

Write-Host "🚀 Testando aplicativo DOM v2 no emulador Android..." -ForegroundColor Green

# Verificar se o projeto Android existe
if (Test-Path "DOMv2Android") {
    Write-Host "✅ Projeto Android encontrado!" -ForegroundColor Green
    
    # Navegar para o projeto
    Set-Location "DOMv2Android"
    
    Write-Host "`n📱 Opções de teste:" -ForegroundColor Cyan
    
    Write-Host "`n1️⃣ Teste no navegador (mais rápido):" -ForegroundColor Yellow
    Write-Host "   npx expo start --web" -ForegroundColor White
    
    Write-Host "`n2️⃣ Teste no emulador Android:" -ForegroundColor Yellow
    Write-Host "   npx expo start" -ForegroundColor White
    Write-Host "   Depois pressione 'a' para abrir no Android" -ForegroundColor White
    
    Write-Host "`n3️⃣ Teste no dispositivo físico:" -ForegroundColor Yellow
    Write-Host "   - Instale o app Expo Go no seu celular" -ForegroundColor White
    Write-Host "   - Escaneie o QR code que aparecerá" -ForegroundColor White
    
    Write-Host "`n4️⃣ Teste com Android Studio:" -ForegroundColor Yellow
    Write-Host "   - Abra o Android Studio" -ForegroundColor White
    Write-Host "   - Crie um emulador via AVD Manager" -ForegroundColor White
    Write-Host "   - Execute: npx expo run:android" -ForegroundColor White
    
    Write-Host "`n🔧 Comandos úteis:" -ForegroundColor Cyan
    Write-Host "   Verificar dispositivos:" -ForegroundColor White
    Write-Host "   adb devices" -ForegroundColor Yellow
    
    Write-Host "`n   Ver logs:" -ForegroundColor White
    Write-Host "   adb logcat | grep Expo" -ForegroundColor Yellow
    
    Write-Host "`n   Limpar cache:" -ForegroundColor White
    Write-Host "   npx expo start --clear" -ForegroundColor Yellow
    
} else {
    Write-Host "❌ Projeto Android não encontrado!" -ForegroundColor Red
    Write-Host "   Execute primeiro: npx create-expo-app@latest DOMv2Android --template blank-typescript" -ForegroundColor White
}

Write-Host "`n🎯 Para começar o teste, execute:" -ForegroundColor Green
Write-Host "   cd DOMv2Android" -ForegroundColor White
Write-Host "   npx expo start" -ForegroundColor White
