# PROBLEMA IDENTIFICADO - PARA DESENVOLVEDOR EXPERIENTE

## RESUMO EXECUTIVO

**Problema:** HTML + JavaScript tentando acessar porta 8080 (Metro) quando deveria usar apenas porta 3000 (Webpack)

**Causa Raiz:** Servidor web adicional (`server-web-webpack.js`) ainda referenciando porta 8080

**Status:** Webpack compilando corretamente, mas HTML/JS ainda tentando carregar recursos do Metro

## CONTEXTO TÉCNICO

### Arquitetura Atual:
```
Frontend Web (3000) <- Webpack Dev Server
    | (proxy automatico)
Backend API (3001) <- Node.js + TypeScript
```

### Configuração Webpack (Funcionando):
- **Porta:** 3000
- **Bundle:** main.js (2.59 MiB) - compilando corretamente
- **Proxy:** /api -> http://localhost:3001
- **CORS:** Configurado
- **Hot Reload:** Funcionando

### Configuração Babel (Corrigida):
```javascript
// babel.config.js
module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
};
```

## ERROS ESPECÍFICOS NO CONSOLE

### 1. Erro CORS Crítico:
```
Access to fetch at 'http://localhost:8080/' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

### 2. JavaScript Tentando Porta 8080:
```
❌ Webpack não está disponível: TypeError: Failed to fetch at checkWebpackStatus
```

### 3. Erros de Renderização:
```
Unexpected text node: . A text node cannot be a child of a <View>
Cannot read properties of null (reading 'style')
```

### 4. Erros de API:
```
Failed to load resource: the server responded with a status of 400 (Bad Request)
POST http://localhost:3001/api/auth/login
```

## ANÁLISE TÉCNICA

### O que está funcionando:
- ✅ Webpack Dev Server na porta 3000
- ✅ Backend API na porta 3001
- ✅ Bundle compilando (2.59 MiB)
- ✅ Proxy configurado
- ✅ Babel configurado corretamente

### O que está quebrado:
- ❌ Código JavaScript ainda referenciando porta 8080
- ❌ Servidor web adicional interferindo
- ❌ Erros de renderização HTML + JavaScript
- ❌ Validação de login (400 Bad Request)

## CÓDIGO PROBLEMÁTICO IDENTIFICADO

### Arquivo: `frontend/server-web-webpack.js` (linha 95)
```javascript
const checkWebpack = http.get('http://localhost:8080', (webpackRes) => {
  res.json({ webpack: 'running', status: webpackRes.statusCode });
});
```

**Problema:** Este servidor não deveria estar rodando quando usamos Webpack Dev Server diretamente.

## SOLUÇÃO IMPLEMENTADA

### 1. Script Limpo Criado:
```powershell
.\start-dom-v2-clean.ps1
```

### 2. Arquitetura Simplificada:
- **Backend:** `npx ts-node src/server-dev.ts` (porta 3001)
- **Frontend:** `npm run dev` (Webpack Dev Server porta 3000)
- **Sem servidor web adicional**

### 3. Configuração Webpack Final:
```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.web.js',
  output: {
    filename: 'main.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Web: HTML + JavaScript
// Mobile: React Native + TypeScript
    },
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer")
    }
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
};
```

## PARA O DESENVOLVEDOR EXPERIENTE

### O que você precisa saber:

1. **Problema Principal:** Mistura de configurações Metro/Webpack
2. **Solução:** Usar apenas Webpack Dev Server (porta 3000)
3. **Configuração:** Babel + Webpack + HTML + JavaScript
4. **Dependências:** crypto-browserify, stream-browserify, buffer

### Comandos para testar:
```bash
# Backend
cd backend
$env:DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"
npx ts-node src/server-dev.ts

# Frontend (novo terminal)
cd frontend
npm run dev
```

### Verificações:
- **Backend:** http://localhost:3001/health
- **Frontend:** http://localhost:3000
- **Bundle:** http://localhost:3000/main.js
- **Proxy:** http://localhost:3000/api/health

### Login de teste:
- **CPF:** 12345678901
- **Senha:** 123456

## PRÓXIMOS PASSOS

1. **Testar a solução limpa** com `.\start-dom-v2-clean.ps1`
2. **Verificar se não há mais referências à porta 8080**
3. **Resolver erros de renderização HTML + JavaScript**
4. **Corrigir validação de login (400 Bad Request)**

## ARQUIVOS CRÍTICOS

- `frontend/webpack.config.js` - Configuração Webpack
- `frontend/babel.config.js` - Configuração Babel
- `frontend/src/index.web.js` - Ponto de entrada
- `frontend/public/index.html` - Template HTML
- `start-dom-v2-clean.ps1` - Script de inicialização

---

**Status:** Problema identificado e solução implementada  
**Próximo:** Testar solução limpa e verificar console do navegador 