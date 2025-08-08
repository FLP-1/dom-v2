# Cronograma MVP (6 semanas) – DOM v2

Atualizado em: 2025-08-08

## Semana 1 – Fundação e estabilidade
- Padronizar execução web com Webpack Dev Server (porta 3000)
- Remover servidores custom e HTML legado
- Estabilizar suíte de testes web (smoke + básicos) – CONCLUÍDO
- Feature flags criadas: `enableShowcaseScreens=false` – CONCLUÍDO

## Semana 2 – Autenticação, LGPD e RBAC inicial
- Fluxo de login com consentimentos (termos/privacidade obrigatórios; marketing opcional) – CONCLUÍDO (web)
- Persistir prova de consentimento no backend (API auth)
- RBAC simples nos menus do dashboard por perfil – CONCLUÍDO (web)
- Documentar políticas LGPD e processo de auditoria

## Semana 3 – Orçamento e Financeiro (base)
- Backend: modelos e endpoints iniciais de orçamento e financeiro
- Web: telas básicas de orçamento (lista, detalhe, criar)
- Testes de integração backend e testes de UI críticos

## Semana 4 – Ponto e Employer-Employee
- Backend: APIs de ponto (batida/registros) e vínculos employer-employee
- Web: telas simples de ponto e gestão de funcionários
- RBAC refinado por ação (permissões granulares)

## Semana 5 – Documentos e Relatórios
- Upload e visualização básica de documentos; preparar OCR/assinatura para fase seguinte
- Relatórios operacionais básicos (período, filtros essenciais)
- Exportação CSV simples

## Semana 6 – Qualidade, segurança e release
- Hardening de segurança (headers, CORS estrito em dev, revisão de dependências)
- Métricas e monitoramento (logs estruturados, captura de erros)
- Testes E2E smoke (fluxos principais)
- Plano de release e validação final com usuários

## Métricas de sucesso do MVP
- 100% testes web estáveis (suíte verde)
- Login+LGPD operando e auditável
- Orçamento/Financeiro/Ponto funcionais (escopo mínimo)
- RBAC efetivo (sem acessos indevidos)
- Documentação e comandos padronizados
