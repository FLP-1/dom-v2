-- Script de configuração do banco de dados DOM v2
-- Gerado automaticamente em 2025-08-10T02:11:55.786Z

-- Criar banco de dados
CREATE DATABASE dom_v2_production 
WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TEMPLATE = template0;

-- Conectar ao banco
\c dom_v2_production;

-- Criar usuário
CREATE USER dom_v2_user WITH PASSWORD 'REPLACE_WITH_SECURE_PASSWORD';

-- Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE dom_v2_production TO dom_v2_user;
GRANT ALL ON SCHEMA public TO dom_v2_user;

-- Configurar timezone
SET timezone = 'America/Sao_Paulo';

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Configurações de performance
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;

-- Recarregar configurações
SELECT pg_reload_conf();

-- Comentário
COMMENT ON DATABASE dom_v2_production IS 'Banco de dados de produção DOM v2 - Região sudeste';
