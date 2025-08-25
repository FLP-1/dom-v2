# Script para iniciar servidor HTTP simples
Write-Host "=== INICIANDO SERVIDOR HTTP SIMPLES ===" -ForegroundColor Yellow

# Verificar se a porta 3000 está em uso
$portInUse = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue

if ($portInUse) {
    Write-Host "Porta 3000 já está em uso. Tentando matar o processo..." -ForegroundColor Red
    $processId = $portInUse.OwningProcess
    Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Navegar para o diretório frontend/public
Set-Location "C:\dom-v2\frontend\public"

Write-Host "Iniciando servidor HTTP na porta 3000..." -ForegroundColor Green
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow

# Iniciar servidor HTTP simples usando Python (se disponível) ou PowerShell
try {
    # Tentar usar Python primeiro
    python -m http.server 3000
} catch {
    try {
        # Tentar usar Python3
        python3 -m http.server 3000
    } catch {
        # Usar PowerShell como fallback
        Write-Host "Python não encontrado. Usando PowerShell..." -ForegroundColor Yellow
        
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://localhost:3000/")
        $listener.Start()
        
        Write-Host "Servidor iniciado em http://localhost:3000/" -ForegroundColor Green
        
        while ($listener.IsListening) {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $localPath = $request.Url.LocalPath
            $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')
            
            if ($localPath -eq "/") {
                $filePath = Join-Path (Get-Location) "index.html"
            }
            
            if (Test-Path $filePath -PathType Leaf) {
                $content = Get-Content $filePath -Raw -Encoding UTF8
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $response.StatusCode = 404
                $notFound = "Arquivo não encontrado: $localPath"
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
            
            $response.Close()
        }
    }
}
