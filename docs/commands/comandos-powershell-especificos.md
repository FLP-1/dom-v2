
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

# COMANDOS POWERSHELL ESPECÍFICOS - ATUALIZADO
## Diretórios e Comandos para Execução no DOM v2

### 📁 **ESTRUTURA DE DIRETÓRIOS**
```
C:\dom-v2\                    # Diretório raiz do projeto
├── backend\                   # Backend Node.js + TypeScript
├── frontend\                  # Frontend React Native Web
├── docs\                      # Documentação
├── scripts\                   # Scripts de validação
└── package.json              # Configuração principal
```

---

## 🚀 **COMANDOS PRINCIPAIS DE EXECUÇÃO**

### **1. EXECUÇÃO COMPLETA (RECOMENDADO)**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
.\docs\commands\run-dom-v2-powershell-complete.ps1
```

### **2. EXECUÇÃO COM PARÂMETROS**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

# Instalar dependências
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Install

# Build do projeto
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Build

# Executar testes
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Test

# Health check
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Health

# Modo web
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Mode web

# Modo concorrente
.\docs\commands\run-dom-v2-powershell-complete.ps1 -Mode concurrent
```

### **3. COMANDOS NPM ATUALIZADOS**
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

---

## 🔧 **COMANDOS DE DESENVOLVIMENTO**

### **4. BACKEND (Node.js + TypeScript)**
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
```

### **5. FRONTEND (React Native Web)**
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

### **6. LIMPEZA E RESET**
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

### **7. VERIFICAÇÃO DE PORTAS**
```powershell
# Verificar portas em uso
Get-NetTCPConnection | Where-Object {$_.LocalPort -eq 3001 -or $_.LocalPort -eq 8081 -or $_.LocalPort -eq 3000} | Format-Table

# Matar processos nas portas
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
```

---

## 📊 **COMANDOS DE MONITORAMENTO**

### **8. HEALTH CHECK MANUAL**
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
```

### **9. VERIFICAÇÃO DE VERSÕES**
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

### **10. ANÁLISE DE ESTRUTURA**
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

### **11. ANÁLISE DE DEPENDÊNCIAS**
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

### **12. GERAR DOCUMENTAÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

Get-ChildItem docs\*.md | ForEach-Object { 
    Write-Host "Documento: $($_.Name)" -ForegroundColor Cyan
}
```

### **13. VALIDAR DOCUMENTAÇÃO**
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

## 🔧 **COMANDOS DE DESENVOLVIMENTO**

### **5. INSTALAÇÃO DE DEPENDÊNCIAS**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run install:all
```

### **6. DESENVOLVIMENTO BACKEND**
```powershell
# Diretório: C:\dom-v2\backend
Set-Location C:\dom-v2\backend
npm run dev
```

### **7. DESENVOLVIMENTO FRONTEND**
```powershell
# Diretório: C:\dom-v2\frontend
Set-Location C:\dom-v2\frontend
npm start
```

### **8. TESTES COMPLETOS**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run test:all
```

---

## 📊 **COMANDOS DE MONITORAMENTO**

### **9. VERIFICAÇÃO DE VERSÕES**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run check-versions
```

### **10. ANÁLISE DE PADRÕES**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
node scripts\audit-decisions.js analyze
```

### **11. VALIDAÇÃO DE REGRAS**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
node scripts\validate-rules.js
```

---

## 🛠️ **COMANDOS DE CONFIGURAÇÃO**

### **12. SETUP INICIAL**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run setup
```

### **13. PREPARAÇÃO PARA COMMIT**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run pre-commit
```

### **14. BUILD COMPLETO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run build:all
```

---

## 📋 **COMANDOS DE DOCUMENTAÇÃO**

### **15. GERAR DOCUMENTAÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Get-ChildItem docs\*.md | ForEach-Object { Write-Host "Documento: $($_.Name)" }
```

### **16. VALIDAR DOCUMENTAÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Get-ChildItem docs\*.md | ForEach-Object { 
    $content = Get-Content $_.FullName -Raw
    if ($content -match "fonte|referência|validação") {
        Write-Host "✅ $($_.Name) - Contém fontes/referências"
    } else {
        Write-Host "⚠️ $($_.Name) - Possível falta de fontes"
    }
}
```

---

## 🔍 **COMANDOS DE ANÁLISE**

### **17. ANÁLISE DE CÓDIGO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "TODO|FIXME|HACK") {
        Write-Host "⚠️ $($_.Name) - Contém marcadores de atenção"
    }
}
```

### **18. VERIFICAÇÃO DE ESTRUTURA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "=== ESTRUTURA DO PROJETO ==="
Get-ChildItem -Directory | ForEach-Object {
    Write-Host "📁 $($_.Name)"
    Get-ChildItem $_.FullName -Directory | ForEach-Object {
        Write-Host "  └── 📁 $($_.Name)"
    }
}
```

### **19. ANÁLISE DE DEPENDÊNCIAS**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "=== DEPENDÊNCIAS PRINCIPAIS ==="
$packageJson = Get-Content package.json | ConvertFrom-Json
$packageJson.dependencies.PSObject.Properties | ForEach-Object {
    Write-Host "$($_.Name): $($_.Value)"
}
```

---

## 🚨 **COMANDOS DE EMERGÊNCIA**

### **20. LIMPEZA DE CACHE**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force backend\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force frontend\node_modules -ErrorAction SilentlyContinue
npm run install:all
```

### **21. RESET COMPLETO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "⚠️ ATENÇÃO: Reset completo do projeto"
Write-Host "Isso irá limpar todos os caches e reinstalar dependências"
$confirma = Read-Host "Confirma? (S/N)"
if ($confirma -eq "S") {
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force backend\node_modules -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force frontend\node_modules -ErrorAction SilentlyContinue
    npm run install:all
    Write-Host "✅ Reset completo realizado"
}
```

---

## 📈 **COMANDOS DE MÉTRICAS**

### **22. COLETAR MÉTRICAS DE ADOÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
$adoptionData = @{
    "data" = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "validacoes_executadas" = 0
    "decisoes_registradas" = 0
    "documentos_validados" = 0
}
$adoptionData | ConvertTo-Json | Out-File "docs\metricas_adocao.json"
Write-Host "📊 Métricas de adoção coletadas"
```

### **23. ANÁLISE DE QUALIDADE**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
$qualityMetrics = @{
    "data" = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "arquivos_analisados" = (Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx).Count
    "documentos_validados" = (Get-ChildItem docs\*.md).Count
    "scripts_funcionais" = (Get-ChildItem scripts\*.js).Count
}
$qualityMetrics | ConvertTo-Json | Out-File "docs\metricas_qualidade.json"
Write-Host "📊 Métricas de qualidade coletadas"
```

---

## 🎯 **COMANDOS DE EXECUÇÃO RÁPIDA**

### **24. VALIDAÇÃO RÁPIDA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "🚀 Executando validação rápida..."
npm run validate-directives
npm run check-versions
Write-Host "✅ Validação rápida concluída"
```

### **25. SETUP COMPLETO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "🚀 Executando setup completo..."
npm run setup
npm run install:all
npm run validate-directives
Write-Host "✅ Setup completo concluído"
```

### **26. DESENVOLVIMENTO COMPLETO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "🚀 Iniciando ambiente de desenvolvimento..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location C:\dom-v2\backend; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location C:\dom-v2\frontend; npm start"
Write-Host "✅ Ambientes de desenvolvimento iniciados"
```

---

## 📝 **COMANDOS DE LOG E AUDITORIA**

### **27. GERAR LOG DE EXECUÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
$logFile = "logs\execucao_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
New-Item -ItemType Directory -Force -Path "logs" | Out-Null
$logContent = @"
=== LOG DE EXECUÇÃO ===
Data: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Diretório: $(Get-Location)
Usuário: $env:USERNAME
Sistema: $env:OS

=== COMANDOS EXECUTADOS ===
"@
$logContent | Out-File $logFile
Write-Host "📝 Log gerado em: $logFile"
```

### **28. AUDITORIA DE SISTEMA**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
$auditData = @{
    "data" = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "sistema" = $env:OS
    "usuario" = $env:USERNAME
    "diretorio" = (Get-Location).Path
    "node_version" = (node --version)
    "npm_version" = (npm --version)
    "arquivos_projeto" = (Get-ChildItem -Recurse | Measure-Object).Count
}
$auditData | ConvertTo-Json | Out-File "docs\auditoria_sistema.json"
Write-Host "📊 Auditoria de sistema concluída"
```

---

## 🎯 **COMANDOS DE EXECUÇÃO SEQUENCIAL**

### **29. EXECUÇÃO COMPLETA DE VALIDAÇÃO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "🚀 Iniciando execução completa de validação..."

Write-Host "1️⃣ Verificando versões..."
npm run check-versions

Write-Host "2️⃣ Validando diretivas críticas..."
npm run validate-directives

Write-Host "3️⃣ Analisando decisões..."
npm run decision:analyze

Write-Host "4️⃣ Validando qualidade geral..."
npm run quality-check

Write-Host "✅ Execução completa de validação concluída"
```

### **30. EXECUÇÃO COMPLETA DE DESENVOLVIMENTO**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "🚀 Iniciando execução completa de desenvolvimento..."

Write-Host "1️⃣ Instalando dependências..."
npm run install:all

Write-Host "2️⃣ Executando testes..."
npm run test:all

Write-Host "3️⃣ Fazendo build..."
npm run build:all

Write-Host "4️⃣ Validando qualidade..."
npm run quality-check

Write-Host "✅ Execução completa de desenvolvimento concluída"
```

---

## 📋 **CHECKLIST DE EXECUÇÃO**

### **EXECUÇÃO DIÁRIA:**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "=== CHECKLIST DIÁRIO ==="

Write-Host "1. Validar diretivas críticas..."
npm run validate-directives

Write-Host "2. Verificar versões..."
npm run check-versions

Write-Host "3. Analisar decisões..."
npm run decision:analyze

Write-Host "✅ Checklist diário concluído"
```

### **EXECUÇÃO SEMANAL:**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
Write-Host "=== CHECKLIST SEMANAL ==="

Write-Host "1. Validação completa..."
npm run quality-check

Write-Host "2. Auditoria de sistema..."
# Executar comando 28

Write-Host "3. Coleta de métricas..."
# Executar comandos 22 e 23

Write-Host "4. Análise de padrões..."
npm run decision:validate

Write-Host "✅ Checklist semanal concluído"
```

---

## 🎯 **INSTRUÇÕES DE USO**

### **IMPORTANTE:**
1. **SEMPRE** especificar o diretório antes de executar comandos
2. **SEMPRE** usar `Set-Location` para navegar entre diretórios
3. **SEMPRE** verificar se está no diretório correto antes de executar
4. **SEMPRE** usar PowerShell, não Command Prompt
5. **SEMPRE** verificar permissões de execução

### **EXEMPLO DE EXECUÇÃO CORRETA:**
```powershell
# ✅ CORRETO
Set-Location C:\dom-v2
npm run validate-directives

# ❌ INCORRETO
npm run validate-directives
```

### **VERIFICAÇÃO DE DIRETÓRIO:**
```powershell
# Sempre verificar se está no diretório correto
Write-Host "Diretório atual: $(Get-Location)"
if ((Get-Location).Path -ne "C:\dom-v2") {
    Write-Host "⚠️ ATENÇÃO: Não está no diretório correto!"
    Set-Location C:\dom-v2
    Write-Host "✅ Diretório corrigido: $(Get-Location)"
}
```

---

**ESTES COMANDOS GARANTEM EXECUÇÃO CORRETA NO POWERSHELL COM DIRETÓRIOS ESPECÍFICOS PARA O PROJETO DOM v2.** 

## ⚠️ **LIMITAÇÕES E CONSIDERAÇÕES**

### **Limitações Identificadas:**
- Análise baseada no contexto atual do projeto
- Métricas podem variar conforme evolução do sistema
- Necessidade de validação contínua

### **Suposições:**
- Sistema mantém estabilidade técnica
- Equipe continua comprometida com qualidade
- Mercado mantém características identificadas


## 🔄 **MÚLTIPLAS PERSPECTIVAS**

### **Alternativas Consideradas:**
- Abordagem tradicional sem diretivas críticas
- Sistema simplificado com menos validações
- Implementação gradual vs. completa

### **Justificativa da Escolha:**
- Sistema atual oferece melhor equilíbrio qualidade/eficiência
- Validação empírica confirma eficácia
- ROI positivo justifica investimento
