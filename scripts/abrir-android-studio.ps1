# Script simples para abrir Android Studio
# DOM v2 - Integração Android Studio

Write-Host "🔧 Abrindo Android Studio..." -ForegroundColor Green

$androidStudioPath = "C:\Program Files\Android\Android Studio\bin\studio64.exe"

if (Test-Path $androidStudioPath) {
    Write-Host "✅ Android Studio encontrado!" -ForegroundColor Green
    
    # Abrir Android Studio
    Start-Process $androidStudioPath
    
    Write-Host "🚀 Android Studio aberto!" -ForegroundColor Green
    Write-Host "`n📋 Comandos úteis:" -ForegroundColor Cyan
    Write-Host "   Para abrir projeto específico:" -ForegroundColor White
    Write-Host "   & '$androidStudioPath' frontend/android" -ForegroundColor Yellow
    Write-Host "`n   Para verificar emuladores:" -ForegroundColor White
    Write-Host "   adb devices" -ForegroundColor Yellow
} else {
    Write-Host "❌ Android Studio não encontrado" -ForegroundColor Red
    Write-Host "   Instale em: https://developer.android.com/studio" -ForegroundColor White
}
