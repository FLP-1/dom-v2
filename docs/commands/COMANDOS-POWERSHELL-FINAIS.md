
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: arguments.callee.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });


/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}


/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Documentação
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

# 🚀 COMANDOS POWERSHELL FINAIS - DOM v2
## Todos os comandos atualizados com diretórios específicos

### 📁 **ESTRUTURA DE DIRETÓRIOS**
```
C:\dom-v2\                    # Diretório raiz do projeto
├── backend\                   # Backend Node.js + TypeScript
├── frontend\                  # Frontend React Native Web
├── docs\commands\            # Scripts PowerShell
└── package.json              # Configuração principal
```

---

## 🎯 **COMANDOS PRINCIPAIS (RECOMENDADOS)**

### **1. EXECUÇÃO COMPLETA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
.\docs\commands\run-dom-v2-powershell-complete.ps1
```

### **2. INSTALAÇÃO COMPLETA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
.\docs\commands\install-dom-v2.ps1
```

### **3. TESTES COMPLETOS**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
.\docs\commands\test-dom-v2-powershell.ps1
```

---

## 🔧 **COMANDOS NPM ATUALIZADOS**

### **4. COMANDOS RAIZ**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

# Instalar todas as dependências
npm run install-all

# Build completo
npm run build-all

# Testes completos
npm run test-all

# Iniciar desenvolvimento
npm run start-dev

# Iniciar backend
npm run start-backend

# Iniciar frontend
npm run start-frontend

# Health check
npm run health-check
```

### **5. BACKEND**
```powershell
# Diretório: C:\dom-v2\backend
Set-Location C:\dom-v2\backend

# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Testes
npm test

# Testes com watch
npm run test:watch

# Testes com cobertura
npm run test:coverage
```

### **6. FRONTEND**
```powershell
# Diretório: C:\dom-v2\frontend
Set-Location C:\dom-v2\frontend

# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Modo web
npm run web

# Build
npm run build

# Testes
npm test
```

---

## 🚨 **COMANDOS DE EMERGÊNCIA**

### **7. LIMPEZA COMPLETA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

# Limpar cache npm
npm cache clean --force

# Remover node_modules
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force backend\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force frontend\node_modules -ErrorAction SilentlyContinue

# Reinstalar tudo
npm run install-all
```

### **8. VERIFICAÇÃO DE PORTAS**
```powershell
# Verificar portas em uso
Get-NetTCPConnection | Where-Object {$_.LocalPort -eq 3001 -or $_.LocalPort -eq 8081 -or $_.LocalPort -eq 3000} | Format-Table

# Matar processos Node.js
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
```

---

## 📊 **COMANDOS DE MONITORAMENTO**

### **9. HEALTH CHECK MANUAL**
```powershell
# Backend Health
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend: Indisponível" -ForegroundColor Red
}

# Frontend Health
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8081" -Method GET -TimeoutSec 5
    Write-Host "✅ Frontend: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend: Indisponível" -ForegroundColor Red
}

# Frontend Web Health
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    Write-Host "✅ Frontend Web: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend Web: Indisponível" -ForegroundColor Red
}
```

### **10. VERIFICAÇÃO DE VERSÕES**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

Write-Host "=== VERSÕES DO PROJETO ===" -ForegroundColor Green
Write-Host "Node.js: $(node --version)" -ForegroundColor Cyan
Write-Host "npm: $(npm --version)" -ForegroundColor Cyan
Write-Host "TypeScript: $(npx tsc --version)" -ForegroundColor Cyan
```

---

## 🔍 **COMANDOS DE ANÁLISE**

### **11. ANÁLISE DE ESTRUTURA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

Write-Host "=== ESTRUTURA DO PROJETO ===" -ForegroundColor Green
Get-ChildItem -Directory | ForEach-Object {
    Write-Host "📁 $($_.Name)" -ForegroundColor Cyan
    Get-ChildItem $_.FullName -Directory | ForEach-Object {
        Write-Host "  └── 📁 $($_.Name)" -ForegroundColor Gray
    }
}
```

### **12. ANÁLISE DE DEPENDÊNCIAS**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

Write-Host "=== DEPENDÊNCIAS PRINCIPAIS ===" -ForegroundColor Green
$packageJson = Get-Content package.json | ConvertFrom-Json
$packageJson.dependencies.PSObject.Properties | ForEach-Object {
    Write-Host "$($_.Name): $($_.Value)" -ForegroundColor Cyan
}
```

---

## 📋 **COMANDOS DE DOCUMENTAÇÃO**

### **13. GERAR DOCUMENTAÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

Get-ChildItem docs\*.md | ForEach-Object { 
    Write-Host "Documento: $($_.Name)" -ForegroundColor Cyan
}
```

### **14. VALIDAR DOCUMENTAÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

Get-ChildItem docs\*.md | ForEach-Object { 
    $content = Get-Content $_.FullName -Raw
    if ($content -match "fonte|referência|validação") {
        Write-Host "✅ $($_.Name) - Contém fontes/referências" -ForegroundColor Green
    } else {
        Write-Host "⚠️ $($_.Name) - Possível falta de fontes" -ForegroundColor Yellow
    }
}
```

---

## 🎮 **COMANDOS ESPECÍFICOS POR FUNCIONALIDADE**

### **15. TESTES DE ORÇAMENTO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

# Testes específicos de orçamento
.\docs\commands\test-dom-v2-powershell.ps1 -Type api

# Testes com cobertura
.\docs\commands\test-dom-v2-powershell.ps1 -Type all -Coverage
```

### **16. DESENVOLVIMENTO RÁPIDO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

# Modo web (mais rápido)
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Mode web

# Modo concorrente
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Mode concurrent
```

### **17. INSTALAÇÃO RÁPIDA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

# Instalação forçada (limpa tudo)
.\docs\commands\install-dom-v2.ps1 -Force

# Instalação sem testes
.\docs\commands\install-dom-v2.ps1 -SkipTests

# Instalação verbosa
.\docs\commands\install-dom-v2.ps1 -Verbose
```

---

## 📝 **EXEMPLOS DE USO PRÁTICO**

### **18. PRIMEIRA EXECUÇÃO**
```powershell
# 1. Navegar para o projeto
Set-Location C:\dom-v2

# 2. Instalar dependências
.\docs\commands\install-dom-v2.ps1

# 3. Executar o projeto
.\docs\commands\run-dom-v2-powershell-complete.ps1

# 4. Verificar se está funcionando
.\docs\commands\test-dom-v2-powershell.ps1 -Type health
```

### **19. DESENVOLVIMENTO DIÁRIO**
```powershell
# 1. Iniciar desenvolvimento
Set-Location C:\dom-v2
.\docs\commands\run-dom-v2-powershell-complete.ps1

# 2. Em outro terminal, executar testes
Set-Location C:\dom-v2
.\docs\commands\test-dom-v2-powershell.ps1 -Type all

# 3. Verificar saúde dos serviços
.\docs\commands\test-dom-v2-powershell.ps1 -Type health
```

### **20. RESOLUÇÃO DE PROBLEMAS**
```powershell
# 1. Verificar portas
Get-NetTCPConnection | Where-Object {$_.LocalPort -eq 3001 -or $_.LocalPort -eq 8081 -or $_.LocalPort -eq 3000}

# 2. Matar processos se necessário
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# 3. Limpeza completa
.\docs\commands\install-dom-v2.ps1 -Force

# 4. Reinstalar e executar
.\docs\commands\run-dom-v2-powershell-complete.ps1
```

---

## ✅ **CHECKLIST DE VERIFICAÇÃO**

### **21. VERIFICAÇÃO COMPLETA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

Write-Host "=== VERIFICAÇÃO COMPLETA DO PROJETO ===" -ForegroundColor Green

# 1. Verificar estrutura
Write-Host "1. Verificando estrutura..." -ForegroundColor Cyan
if (Test-Path "backend" -and Test-Path "frontend") {
    Write-Host "✅ Estrutura OK" -ForegroundColor Green
} else {
    Write-Host "❌ Estrutura incorreta" -ForegroundColor Red
}

# 2. Verificar dependências
Write-Host "2. Verificando dependências..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
    Write-Host "✅ Dependências raiz OK" -ForegroundColor Green
} else {
    Write-Host "❌ Dependências raiz faltando" -ForegroundColor Red
}

# 3. Verificar serviços
Write-Host "3. Verificando serviços..." -ForegroundColor Cyan
.\docs\commands\test-dom-v2-powershell.ps1 -Type health

Write-Host "`n=== VERIFICAÇÃO CONCLUÍDA ===" -ForegroundColor Green
```

---

## 🎯 **RESUMO DOS COMANDOS MAIS IMPORTANTES**

| Comando | Descrição | Diretório |
|---------|-----------|-----------|
| `.\docs\commands\run-dom-v2-powershell-complete.ps1` | Execução completa | `C:\dom-v2` |
| `.\docs\commands\install-dom-v2.ps1` | Instalação completa | `C:\dom-v2` |
| `.\docs\commands\test-dom-v2-powershell.ps1` | Testes completos | `C:\dom-v2` |
| `npm run start-dev` | Desenvolvimento | `C:\dom-v2` |
| `npm run dev` | Backend | `C:\dom-v2\backend` |
| `npm run dev` | Frontend | `C:\dom-v2\frontend` |

---

## 📞 **SUPORTE**

Se encontrar problemas:

1. **Verificar diretório:** Sempre execute no diretório correto (`C:\dom-v2`)
2. **Verificar portas:** Use os comandos de verificação de portas
3. **Limpeza:** Use `-Force` para limpeza completa
4. **Logs:** Use `-Verbose` para logs detalhados
5. **Health Check:** Sempre verifique a saúde dos serviços

**Comandos de emergência:**
```powershell
# Limpeza completa
.\docs\commands\install-dom-v2.ps1 -Force

# Verificação de saúde
.\docs\commands\test-dom-v2-powershell.ps1 -Type health

# Matar processos
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
``` 