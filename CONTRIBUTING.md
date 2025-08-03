# 🤝 Guia de Contribuição - DOM v2

Obrigado por considerar contribuir com o **DOM v2**! Este documento fornece diretrizes para contribuições.

## 📋 Índice

- [🎯 Como Contribuir](#-como-contribuir)
- [🔧 Configuração do Ambiente](#-configuração-do-ambiente)
- [📝 Padrões de Código](#-padrões-de-código)
- [🧪 Testes](#-testes)
- [📤 Processo de Pull Request](#-processo-de-pull-request)
- [🐛 Reportando Bugs](#-reportando-bugs)
- [💡 Sugerindo Features](#-sugerindo-features)

## 🎯 Como Contribuir

### 1. **Fork e Clone**
```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/dom-v2.git
cd dom-v2

# Adicione o repositório original como upstream
git remote add upstream https://github.com/original/dom-v2.git
```

### 2. **Crie uma Branch**
```bash
# Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# Ou para correção de bug
git checkout -b fix/correcao-bug
```

### 3. **Desenvolva**
- Siga os [padrões de código](#-padrões-de-código)
- Escreva [testes](#-testes) para suas mudanças
- Mantenha commits pequenos e focados

### 4. **Teste**
```bash
# Execute todos os testes
npm run test-all

# Verifique a qualidade do código
npm run validate-directives
```

### 5. **Commit e Push**
```powershell
# Adicione suas mudanças (raiz do projeto)
git add .

# Faça commit seguindo o padrão
git commit -m "feat: adiciona nova funcionalidade de validação"

# Push para sua branch
git push origin feature/nova-funcionalidade
```

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Node.js 18+
- PostgreSQL 12+
- Git

### Instalação
```powershell
# Clone o repositório
git clone https://github.com/seu-usuario/dom-v2.git
cd dom-v2

# Instale dependências (raiz do projeto)
npm run install-all

# Configure o banco de dados (diretório backend)
cd backend
npx prisma migrate dev
npx prisma generate
cd ..

# Configure variáveis de ambiente (diretório backend)
cd backend
Copy-Item .env.example .env
# Edite o arquivo .env
cd ..

# Inicie o desenvolvimento (raiz do projeto)
npm run start-dev
```

## 📝 Padrões de Código

### TypeScript
- Use **TypeScript** para todo código novo
- Defina interfaces para props e estados
- Evite `any` - use tipos específicos

### React/React Native
- Use **componentes funcionais** com hooks
- Mantenha componentes pequenos e focados
- Use **custom hooks** para lógica reutilizável

### Estrutura de Arquivos
```
src/
├── components/          # Componentes reutilizáveis
├── screens/            # Telas da aplicação
├── hooks/              # Custom hooks
├── utils/              # Utilitários
├── services/           # Serviços de API
└── types/              # Definições TypeScript
```

### Nomenclatura
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`)
- **Utilitários**: camelCase (`validationUtils.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

### Documentação
```typescript
/**
 * @fileoverview Descrição do arquivo
 * @author Seu Nome
 * @created 2024-01-01
 */

/**
 * Componente para exibir perfil do usuário
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  // Implementação
};
```

## 🧪 Testes

### Executar Testes
```powershell
# Todos os testes (raiz do projeto)
npm run test-all

# Testes específicos (diretórios específicos)
cd backend
npm run test:all
cd ..

cd frontend
npm run test
cd ..

# Cobertura (diretório backend)
cd backend
npm run test:coverage
cd ..
```

### Escrever Testes
```typescript
// Exemplo de teste para componente
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('should render user name', () => {
    const user = { name: 'João Silva', email: 'joao@example.com' };
    render(<UserProfile user={user} />);
    
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });
});
```

### Padrões de Teste
- **Nome descritivo**: `should validate CPF correctly`
- **Arrange-Act-Assert**: Organize o teste em 3 partes
- **Teste uma coisa**: Cada teste deve verificar um comportamento
- **Mocks apropriados**: Use mocks para dependências externas

## 📤 Processo de Pull Request

### 1. **Prepare sua PR**
- Certifique-se de que todos os testes passam
- Atualize a documentação se necessário
- Verifique se não há conflitos

### 2. **Template da PR**
```markdown
## 📝 Descrição
Breve descrição das mudanças

## 🎯 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## 🧪 Testes
- [ ] Testes unitários passam
- [ ] Testes de integração passam
- [ ] Testes manuais realizados

## 📸 Screenshots (se aplicável)
Adicione screenshots das mudanças visuais

## ✅ Checklist
- [ ] Código segue os padrões do projeto
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Build passa sem erros
```

### 3. **Review Process**
- Um mantenedor revisará sua PR
- Pode solicitar mudanças
- Após aprovação, será mergeado

## 🐛 Reportando Bugs

### Template de Bug Report
```markdown
## 🐛 Descrição do Bug
Descrição clara e concisa do bug

## 🔄 Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado
O que deveria acontecer

## 📱 Informações do Sistema
- OS: [ex: Windows 10]
- Browser: [ex: Chrome 120]
- Versão: [ex: 2.0.0]

## 📸 Screenshots
Adicione screenshots se aplicável

## 📋 Contexto Adicional
Qualquer informação adicional
```

## 💡 Sugerindo Features

### Template de Feature Request
```markdown
## 💡 Descrição da Feature
Descrição clara da funcionalidade desejada

## 🎯 Problema que Resolve
Qual problema esta feature resolveria?

## 💭 Solução Proposta
Como você imagina que deveria funcionar?

## 🔄 Alternativas Consideradas
Outras soluções que você considerou

## 📋 Contexto Adicional
Qualquer informação adicional
```

## 🎯 Diretrizes Importantes

### Pensamento Crítico
- Siga as [diretivas de pensamento crítico](docs/directives/diretivas-pensamento-critico.md)
- Avalie o impacto das mudanças
- Considere alternativas antes de implementar

### Qualidade do Código
- Mantenha alta qualidade
- Siga os padrões estabelecidos
- Documente mudanças importantes

### Comunicação
- Seja respeitoso e construtivo
- Use português brasileiro
- Mantenha discussões focadas

## 📞 Contato

- **Issues**: [GitHub Issues](https://github.com/original/dom-v2/issues)
- **Discussions**: [GitHub Discussions](https://github.com/original/dom-v2/discussions)
- **Email**: contato@dom-v2.com

---

**Obrigado por contribuir com o DOM v2! 🚀** 