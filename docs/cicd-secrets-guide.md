# Guia de Configuração de Secrets - CI/CD Pipeline

## Secrets Necessários

Para que o pipeline CI/CD funcione corretamente, configure os seguintes secrets no GitHub:

### 1. Staging Environment
- `STAGING_DB_URL`: URL da base de dados de staging
- `STAGING_API_KEY`: Chave da API de staging

### 2. Production Environment  
- `PRODUCTION_DB_URL`: URL da base de dados de produção
- `PRODUCTION_API_KEY`: Chave da API de produção

### 3. Notifications
- `SLACK_WEBHOOK`: Webhook do Slack para notificações

### 4. Code Coverage
- `CODECOV_TOKEN`: Token do Codecov para relatórios de cobertura

## Como Configurar

1. Vá para **Settings > Secrets and variables > Actions**
2. Clique em **"New repository secret"**
3. Adicione cada secret com o nome e valor correspondente
4. Os secrets ficarão disponíveis como `${{ secrets.SECRET_NAME }}`

## Exemplo de Valores

```bash
# Staging
STAGING_DB_URL=postgresql://user:password@staging-db:5432/staging_db
STAGING_API_KEY=staging_api_key_here

# Production  
PRODUCTION_DB_URL=postgresql://user:password@production-db:5432/production_db
PRODUCTION_API_KEY=production_api_key_here

# Notifications
SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Code Coverage
CODECOV_TOKEN=your_codecov_token_here
```

## Notas Importantes

- **Nunca** commite valores reais de secrets no código
- Use valores padrão no pipeline quando secrets não estão configurados
- O pipeline continuará funcionando mesmo sem todos os secrets
- Configure apenas os secrets que você realmente precisa

## Troubleshooting

Se o pipeline falhar por causa de secrets:

1. Verifique se todos os secrets necessários estão configurados
2. Confirme que os valores estão corretos
3. Verifique as permissões do repositório
4. Consulte os logs do GitHub Actions para mais detalhes 