#!/bin/bash
# Script de backup DOM v2
# Gerado automaticamente em 2025-08-10T02:11:55.902Z

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/tmp/dom_v2_backup_$TIMESTAMP"
S3_BUCKET="dom-v2-backups-sudeste"

echo "🔄 Iniciando backup DOM v2 - $TIMESTAMP"

# Criar diretório temporário
mkdir -p $BACKUP_DIR

# Backup do banco de dados
echo "📊 Fazendo backup do banco de dados..."
pg_dump $DATABASE_URL | gzip > $BACKUP_DIR/database_$TIMESTAMP.sql.gz

# Backup de arquivos
echo "📁 Fazendo backup de arquivos..."
tar -czf $BACKUP_DIR/files_$TIMESTAMP.tar.gz /app/uploads /app/logs

# Backup de configurações
echo "⚙️ Fazendo backup de configurações..."
tar -czf $BACKUP_DIR/config_$TIMESTAMP.tar.gz /app/config

# Upload para S3
echo "☁️ Enviando para S3..."
aws s3 sync $BACKUP_DIR s3://$S3_BUCKET/daily/$(date +%Y/%m/%d)/ --sse AES256

# Limpeza
echo "🧹 Limpando arquivos temporários..."
rm -rf $BACKUP_DIR

# Verificar retenção
echo "📅 Aplicando política de retenção..."
aws s3 ls s3://$S3_BUCKET/daily/ --recursive | awk '{print $4}' | sort | head -n -7 | xargs -I {} aws s3 rm s3://$S3_BUCKET/{} 2>/dev/null || true

echo "✅ Backup concluído com sucesso!"
