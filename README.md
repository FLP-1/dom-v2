# DOM v2 - Sistema de Gestao Empresarial

## Sobre o Projeto

DOM v2 e um sistema de gestao empresarial moderno desenvolvido com tecnologias web nativas, focado em simplicidade, performance e manutenibilidade.

## Arquitetura

### Frontend
- **HTML5** - Estrutura semantica
- **CSS3** - Estilizacao moderna e responsiva
- **JavaScript Vanilla** - Interatividade e logica

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estatica
- **Express.js** - Framework web
- **Prisma ORM** - Banco de dados
- **PostgreSQL** - Banco de dados

## Inicio Rapido

### Pre-requisitos
- Node.js 18+
- PostgreSQL 12+
- PowerShell (Windows)

### Instalacao

1. **Clone o repositorio**
`powershell
git clone <repository-url>
cd dom-v2
`

2. **Configure o backend**
`powershell
cd backend
npm install
npx prisma migrate dev
npx prisma generate
`

3. **Configure variaveis de ambiente**
`powershell
Copy-Item .env.example .env
# Edite o arquivo .env com suas configuracoes
`

4. **Inicie o desenvolvimento**
`powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (servidor simples)
cd frontend/public
python -m http.server 3000
# ou
node ../../simple-server.js
`

5. **Acesse a aplicacao**
`
http://localhost:3000
`

## Estrutura do Projeto

`
dom-v2/
â”œâ”€â”€ frontend/           # Frontend HTML nativo
â”‚   â”œâ”€â”€ public/        # Paginas HTML
â”‚   â”œâ”€â”€ css/          # Estilos CSS
â”‚   â”œâ”€â”€ js/           # JavaScript
â”‚   â””â”€â”€ components/   # Componentes
â”œâ”€â”€ backend/           # Backend Node.js
â”œâ”€â”€ docs/             # Documentacao
â”œâ”€â”€ scripts/          # Scripts de automacao
â””â”€â”€ legacy/           # Desenvolvimentos obsoletos
`

## Testes

### Frontend
`powershell
# Teste de responsividade
.\scripts\testing\test-responsive.ps1

# Teste de acessibilidade
.\scripts\testing\test-accessibility.ps1
`

### Backend
`powershell
cd backend
npm test
`

## Documentacao

- [Arquitetura](docs/architecture/)
- [Decisoes](docs/decisions/)
- [Desenvolvimento](docs/development/)
- [Boas Praticas](BOAS_PRATICAS_DESENVOLVIMENTO_DOM_V2.md)

## Contribuicao

1. Leia as [boas praticas](BOAS_PRATICAS_DESENVOLVIMENTO_DOM_V2.md)
2. Siga as [diretrizes de pensamento critico](docs/directives/)
3. Execute os testes antes de contribuir
4. Documente suas decisoes

## Licenca

Este projeto esta sob a licenca MIT.

---

**Versao:** 2.0.0  
**Data:** 25/01/2025  
**Status:** Em desenvolvimento
