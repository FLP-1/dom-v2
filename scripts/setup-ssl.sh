#!/bin/bash
# Script de configuração SSL para DOM v2
# Gerado automaticamente em 2025-08-10T02:11:55.753Z

set -e

echo "🔐 Configurando SSL/TLS para dom-v2.com.br"

# Instalar certbot se necessário
if ! command -v certbot &> /dev/null; then
    echo "Instalando certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot
fi

# Obter certificados SSL
echo "Obtendo certificados SSL..."
sudo certbot certonly \
    --dns-route53 \
    --email admin@dom-v2.com.br \
    --agree-tos \
    --no-eff-email \
    -d dom-v2.com.br \
    -d *.dom-v2.com.br

# Configurar renovação automática
echo "Configurando renovação automática..."
echo "0 2 * * * root certbot renew --quiet" | sudo tee -a /etc/crontab

echo "✅ SSL/TLS configurado com sucesso!"
