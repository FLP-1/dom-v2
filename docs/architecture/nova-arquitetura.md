# Arquitetura do Novo Desenvolvimento - DOM v2

## Visao Geral

### Frontend (HTML Nativo)
`
frontend/
â”œâ”€â”€ public/           # Paginas HTML
â”œâ”€â”€ css/             # Estilos CSS
â”œâ”€â”€ js/              # JavaScript vanilla
â”œâ”€â”€ components/      # Componentes reutilizaveis
â””â”€â”€ assets/          # Imagens, icones, etc.
`

### Backend (Mantido)
`
backend/             # Node.js + TypeScript + Prisma
â”œâ”€â”€ src/
â”œâ”€â”€ prisma/
â””â”€â”€ package.json
`

## Padroes de Desenvolvimento

### HTML
- HTML5 semantico
- Estrutura limpa e acessivel
- Mobile-first
- LGPD compliance

### CSS
- CSS3 puro
- Mobile-first responsive
- Variaveis CSS para temas
- Organizacao modular

### JavaScript
- Vanilla JavaScript ES6+
- Modulos organizados
- Validacao robusta
- Tratamento de erros

## Integracao

### API REST
- Backend mantido intacto
- Endpoints documentados
- Autenticacao JWT
- Validacao de dados

### Banco de Dados
- PostgreSQL mantido
- Prisma ORM
- Migrations preservadas
- Dados existentes mantidos

## Responsividade

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large: >= 1440px

### Adaptacao
- Layout flexivel
- Imagens responsivas
- Touch-friendly
- Performance otimizada

## Seguranca

### Frontend
- Validacao client-side
- Sanitizacao de entrada
- HTTPS obrigatorio
- Headers de seguranca

### Backend (Mantido)
- JWT authentication
- Rate limiting
- Input validation
- SQL injection protection

## Performance

### Otimizacoes
- CSS/JS minificado
- Imagens otimizadas
- Lazy loading
- Cache estrategico

### Metricas
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

---
*Arquitetura definida em 25/01/2025*
