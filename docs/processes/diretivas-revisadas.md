# Diretrizes e Regras Revisadas (DOM v2)

Última atualização: 2025-08-08

## Arquitetura e Stack
- **Web**: React Native Web + TypeScript + Webpack Dev Server (porta 3000). Sem telas HTML legadas.
- **Mobile**: React Native (diretório `DOMv2Android`) com TypeScript.
- **Backend (dev)**: Node/Express (porta 3001 para APIs locais de autenticação e mocks).
- **Compartilhamento**: Utilitários, mensagens e design system compartilhados sempre que possível.
- **TypeScript obrigatório**: Não criar variantes JS.

## UX/UI e Conteúdo
- **LGPD by default**: coleta de consentimentos no login (termos e privacidade obrigatórios; marketing opcional) e prova de consentimento no backend.
- **Mensagens centralizadas**: arquivos `messages*.ts` como fonte de verdade.
- **Preferir ícones e cards**; priorizar desktop, respeitando acessibilidade básica.
- **Perfis**: adaptar experiência aos perfis (Employer/Employee/Family) consultando `perfis-usuarios-detalhados.md` e `perfis-enriquecidos.md`.

## Qualidade e Segurança
- **Testes**: suíte sempre verde antes de merge; smoke + casos críticos (Auth/RBAC, Orçamento, Ponto, Financeiro).
- **RBAC**: menus e rotas filtrados por perfil; negar acesso por padrão.
- **Auditoria**: registrar consentimentos, logins e alterações críticas (planejado).
- **Hardening**: sem segredos no repositório, CORS estrito em dev, dependências atualizadas.

## Operação e Ferramentas
- **Padronização de execução**:
  - Web: `cd C:\\dom-v2\\frontend; npm run dev`
  - Testes web: `cd C:\\dom-v2\\frontend; npm test --silent`
- **Feature flags**: `src/config/featureFlags.ts` controla telas de showcase (desativadas por padrão).
- **PowerShell**: exemplos e scripts sempre com diretório explícito; em encadeamentos usar `;`.

## Decisões e Pensamento Crítico
- **Não presumir**: toda decisão baseada em docs oficiais e testes.
- **Questionar suposições**: listar alternativas e trade-offs.
- **Verdade primeiro**: documentar limitações e riscos.
- **Exceção técnica**: mudanças fora do stack exigem justificativa escrita e validação prévia.

## Critérios de Aceite (por PR)
- Testes passam localmente (web) e não quebram cobertura mínima acordada.
- Sem HTML legado novo; TypeScript e padrões de nomenclatura.
- LGPD respeitada no fluxo afetado (quando aplicável).
- Documentação atualizada (quando aplicável).
