# 🛠️ INSTRUÇÕES PRÁTICAS DE IMPLEMENTAÇÃO - DOM v2

**Data:** 22/07/2025  
**Responsável:** IA Assistant  
**Status:** PRONTO PARA IMPLEMENTAÇÃO

## 🎯 OBJETIVO

Fornecer **INSTRUÇÕES PASSO A PASSO** para implementar cada funcionalidade, incluindo:
- **COMANDOS EXATOS** a serem executados
- **ARQUIVOS** a serem criados/modificados
- **VALIDAÇÕES** a serem realizadas
- **SOLUÇÃO DE PROBLEMAS** comuns

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### **SEMANA 1 - DIA 1-2: FUNDAÇÃO CRÍTICA**

---

## 🏗️ PASSO 1: CONFIGURAR ESLINT FRONTEND

### **COMANDOS A EXECUTAR:**

```powershell
# 1. Navegar para frontend
cd C:\dom-v2\frontend

# 2. Instalar dependências ESLint
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier

# 3. Verificar instalação
npm list eslint
```

### **ARQUIVOS A CRIAR:**

#### **1. frontend/.eslintrc.js**
```javascript
module.exports = {
  extends: [
    '@react-native',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'error',
    'prettier/prettier': 'error'
  },
  env: {
    'react-native/react-native': true
  }
};
```

#### **2. frontend/.prettierrc.js**
```javascript
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false
};
```

### **VALIDAÇÕES:**

```powershell
# 1. Testar ESLint
npm run lint

# 2. Verificar se não há erros
# Deve retornar: "0 errors, 0 warnings"

# 3. Testar Prettier
npx prettier --check src/
```

### **SOLUÇÃO DE PROBLEMAS:**

**Problema:** "ESLint couldn't find a configuration file"
**Solução:** Verificar se `.eslintrc.js` foi criado no diretório correto

**Problema:** "TypeScript errors"
**Solução:** Executar `npx tsc --noEmit` para verificar erros TypeScript

---

## 🏗️ PASSO 2: CONFIGURAR ESLINT BACKEND

### **COMANDOS A EXECUTAR:**

```powershell
# 1. Navegar para backend
cd C:\dom-v2\backend

# 2. Instalar dependências ESLint
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier

# 3. Verificar instalação
npm list eslint
```

### **ARQUIVOS A CRIAR:**

#### **1. backend/.eslintrc.js**
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'error',
    'prettier/prettier': 'error'
  },
  env: {
    node: true,
    es2021: true
  }
};
```

#### **2. backend/.prettierrc.js**
```javascript
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false
};
```

### **VALIDAÇÕES:**

```powershell
# 1. Testar ESLint
npm run lint

# 2. Verificar se não há erros
# Deve retornar: "0 errors, 0 warnings"

# 3. Testar Prettier
npx prettier --check src/
```

---

## 🧪 PASSO 3: CONFIGURAR TESTES FRONTEND

### **COMANDOS A EXECUTAR:**

```powershell
# 1. Navegar para frontend
cd C:\dom-v2\frontend

# 2. Instalar dependências de teste
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest-environment-jsdom

# 3. Verificar instalação
npm list jest
```

### **ARQUIVOS A CRIAR:**

#### **1. frontend/jest.config.js**
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
};
```

#### **2. frontend/src/setupTests.ts**
```typescript
import '@testing-library/jest-native/extend-expect';

// Mock do React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: {
      alert: jest.fn(),
    },
  };
});
```

#### **3. frontend/src/__tests__/components/Button.test.tsx**
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../components/ui/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

### **VALIDAÇÕES:**

```powershell
# 1. Executar testes
npm test

# 2. Verificar cobertura
npm test -- --coverage

# 3. Verificar se todos os testes passam
# Deve retornar: "All tests passed"
```

---

## 🧪 PASSO 4: CONFIGURAR TESTES BACKEND

### **COMANDOS A EXECUTAR:**

```powershell
# 1. Navegar para backend
cd C:\dom-v2\backend

# 2. Instalar dependências de teste
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest

# 3. Verificar instalação
npm list jest
```

### **ARQUIVOS A CRIAR:**

#### **1. backend/jest.config.js**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

#### **2. backend/src/setupTests.ts**
```typescript
import { PrismaClient } from '@prisma/client';

// Mock do Prisma para testes
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    // Mock dos métodos do Prisma
  }))
}));
```

#### **3. backend/src/__tests__/controllers/payment-controller.test.ts**
```typescript
import request from 'supertest';
import { app } from '../../server';
import { PaymentController } from '../../controllers/payment-controller';

describe('Payment Controller', () => {
  describe('GET /api/payments', () => {
    it('should return list of payments', async () => {
      const response = await request(app)
        .get('/api/payments')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/payments', () => {
    it('should create a new payment', async () => {
      const paymentData = {
        amount: 100,
        currency: 'BRL',
        method: 'PIX',
        description: 'Test payment'
      };

      const response = await request(app)
        .post('/api/payments')
        .send(paymentData)
        .expect(201);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.amount).toBe(100);
    });
  });
});
```

### **VALIDAÇÕES:**

```powershell
# 1. Executar testes
npm test

# 2. Verificar cobertura
npm test -- --coverage

# 3. Verificar se todos os testes passam
# Deve retornar: "All tests passed"
```

---

## 🔧 PASSO 5: CONFIGURAR TYPESCRIPT STRICT

### **COMANDOS A EXECUTAR:**

```powershell
# 1. Navegar para frontend
cd C:\dom-v2\frontend

# 2. Verificar configuração atual
cat tsconfig.json

# 3. Navegar para backend
cd C:\dom-v2\backend

# 4. Verificar configuração atual
cat tsconfig.json
```

### **ARQUIVOS A MODIFICAR:**

#### **1. frontend/tsconfig.json**
```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  },
  "include": [
    "src/**/*",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

#### **2. backend/tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### **VALIDAÇÕES:**

```powershell
# 1. Verificar TypeScript frontend
cd C:\dom-v2\frontend
npx tsc --noEmit

# 2. Verificar TypeScript backend
cd C:\dom-v2\backend
npx tsc --noEmit

# 3. Verificar se não há erros
# Deve retornar sem erros
```

---

## 🎣 PASSO 6: IMPLEMENTAR PRE-COMMIT HOOKS

### **COMANDOS A EXECUTAR:**

```powershell
# 1. Navegar para diretório raiz
cd C:\dom-v2

# 2. Instalar Husky e lint-staged
npm install --save-dev husky lint-staged

# 3. Inicializar Husky
npx husky install

# 4. Adicionar pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

### **ARQUIVOS A CRIAR:**

#### **1. package.json (modificar)**
```json
{
  "scripts": {
    "prepare": "husky install",
    "lint": "npm run lint:frontend && npm run lint:backend",
    "lint:frontend": "cd frontend && npm run lint",
    "lint:backend": "cd backend && npm run lint",
    "test": "npm run test:frontend && npm run test:backend",
    "test:frontend": "cd frontend && npm test",
    "test:backend": "cd backend && npm test",
    "type-check": "npm run type-check:frontend && npm run type-check:backend",
    "type-check:frontend": "cd frontend && npx tsc --noEmit",
    "type-check:backend": "cd backend && npx tsc --noEmit"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{js,jsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{json,md}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

#### **2. .husky/pre-commit**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### **VALIDAÇÕES:**

```powershell
# 1. Fazer commit de teste
git add .
git commit -m "test: testing pre-commit hooks"

# 2. Verificar se hooks foram executados
# Deve executar ESLint, Prettier e testes

# 3. Verificar se commit foi criado
git log --oneline -1
```

---

## 🏗️ PASSO 7: IMPLEMENTAR CONTROLE DE ORÇAMENTO

### **COMANDOS A EXECUTAR:**

```powershell
# 1. Navegar para backend
cd C:\dom-v2\backend

# 2. Gerar Prisma client
npx prisma generate

# 3. Executar migração
npx prisma migrate dev --name add-budget-model
```

### **ARQUIVOS A CRIAR:**

#### **1. backend/prisma/schema.prisma (adicionar)**
```prisma
model Budget {
  id              String        @id @default(cuid())
  name            String
  description     String?
  amount          Float
  currency        String        @default("BRL")
  category        BudgetCategory
  period          BudgetPeriod
  startDate       DateTime
  endDate         DateTime
  status          BudgetStatus  @default(ACTIVE)
  spentAmount     Float         @default(0)
  remainingAmount Float         @default(0)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@map("budgets")
}

enum BudgetCategory {
  HOUSEHOLD
  FOOD
  TRANSPORT
  ENTERTAINMENT
  HEALTH
  EDUCATION
  OTHER
}

enum BudgetPeriod {
  DAILY
  WEEKLY
  MONTHLY
  YEARLY
}

enum BudgetStatus {
  ACTIVE
  INACTIVE
  EXCEEDED
  COMPLETED
}
```

#### **2. backend/src/models/Budget.ts**
```typescript
import { Prisma } from '@prisma/client';

export interface Budget {
  id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  category: BudgetCategory;
  period: BudgetPeriod;
  startDate: Date;
  endDate: Date;
  status: BudgetStatus;
  spentAmount: number;
  remainingAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum BudgetCategory {
  HOUSEHOLD = 'HOUSEHOLD',
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  ENTERTAINMENT = 'ENTERTAINMENT',
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  OTHER = 'OTHER'
}

export enum BudgetPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export enum BudgetStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXCEEDED = 'EXCEEDED',
  COMPLETED = 'COMPLETED'
}

export type CreateBudgetDto = Omit<Budget, 'id' | 'createdAt' | 'updatedAt' | 'spentAmount' | 'remainingAmount'>;
export type UpdateBudgetDto = Partial<CreateBudgetDto>;
```

#### **3. backend/src/controllers/budget-controller.ts**
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateBudgetDto, UpdateBudgetDto, Budget } from '../models/Budget';

const prisma = new PrismaClient();

export class BudgetController {
  static async createBudget(req: Request, res: Response): Promise<void> {
    try {
      const budgetData: CreateBudgetDto = req.body;
      
      // Validação básica
      if (!budgetData.name || !budgetData.amount) {
        res.status(400).json({
          success: false,
          message: 'Nome e valor são obrigatórios'
        });
        return;
      }

      // Calcular valores
      const remainingAmount = budgetData.amount;

      const budget = await prisma.budget.create({
        data: {
          ...budgetData,
          remainingAmount
        }
      });

      res.status(201).json({
        success: true,
        data: budget
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  static async listBudgets(req: Request, res: Response): Promise<void> {
    try {
      const budgets = await prisma.budget.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({
        success: true,
        data: budgets
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar orçamentos',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  static async getBudgetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const budget = await prisma.budget.findUnique({
        where: { id }
      });

      if (!budget) {
        res.status(404).json({
          success: false,
          message: 'Orçamento não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: budget
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  static async updateBudget(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateBudgetDto = req.body;

      const budget = await prisma.budget.update({
        where: { id },
        data: updates
      });

      res.status(200).json({
        success: true,
        data: budget
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  static async deleteBudget(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await prisma.budget.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}
```

#### **4. backend/src/routes/budgets.ts**
```typescript
import { Router } from 'express';
import { BudgetController } from '../controllers/budget-controller';

const router = Router();

// CRUD básico
router.post('/', BudgetController.createBudget);
router.get('/', BudgetController.listBudgets);
router.get('/:id', BudgetController.getBudgetById);
router.put('/:id', BudgetController.updateBudget);
router.delete('/:id', BudgetController.deleteBudget);

export default router;
```

#### **5. backend/src/server.ts (modificar)**
```typescript
// ... código existente ...

import budgetsRouter from './routes/budgets';

// ... código existente ...

app.use('/api/budgets', budgetsRouter);

// ... código existente ...
```

### **VALIDAÇÕES:**

```powershell
# 1. Testar API
cd C:\dom-v2\backend
npm run dev

# 2. Em outro terminal, testar endpoints
curl -X POST http://localhost:3000/api/budgets \
  -H "Content-Type: application/json" \
  -d '{"name":"Orçamento Teste","amount":1000,"category":"HOUSEHOLD","period":"MONTHLY","startDate":"2025-07-22","endDate":"2025-08-22"}'

# 3. Verificar se foi criado
curl http://localhost:3000/api/budgets

# 4. Executar testes
npm test
```

---

## 🎯 VALIDAÇÃO FINAL

### **COMANDOS DE VALIDAÇÃO:**

```powershell
# 1. Navegar para diretório raiz
cd C:\dom-v2

# 2. Executar todas as validações
npm run lint
npm run test
npm run type-check

# 3. Verificar se tudo passou
# Deve retornar sucesso em todos os comandos

# 4. Fazer commit de teste
git add .
git commit -m "feat: implement foundation critical features"

# 5. Verificar se pre-commit hooks funcionaram
git log --oneline -1
```

### **CRITÉRIOS DE SUCESSO:**

- [ ] ESLint passa sem erros em frontend e backend
- [ ] Testes passam com 80%+ de cobertura
- [ ] TypeScript strict mode sem erros
- [ ] Pre-commit hooks funcionando
- [ ] API de orçamento funcionando
- [ ] Todos os comandos de validação passam

---

## 🚨 SOLUÇÃO DE PROBLEMAS COMUNS

### **PROBLEMA: ESLint não encontra configuração**
**SOLUÇÃO:** Verificar se `.eslintrc.js` está no diretório correto

### **PROBLEMA: Testes falham**
**SOLUÇÃO:** Verificar se dependências foram instaladas corretamente

### **PROBLEMA: TypeScript erros**
**SOLUÇÃO:** Corrigir tipos e usar `any` apenas quando necessário

### **PROBLEMA: Pre-commit hooks não executam**
**SOLUÇÃO:** Verificar se Husky foi instalado e configurado

### **PROBLEMA: API não responde**
**SOLUÇÃO:** Verificar se servidor está rodando e rotas estão configuradas

---

**STATUS:** ✅ INSTRUÇÕES PRÁTICAS CRIADAS  
**PRÓXIMA AÇÃO:** Implementar PASSO 1 - Configurar ESLint Frontend  
**RESPONSÁVEL:** IA Assistant  
**DATA:** 22/07/2025 