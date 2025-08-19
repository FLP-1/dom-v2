/*
  Warnings:

  - You are about to drop the column `createdAt` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `data_atualizacao` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `categoria` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `dados_extras` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `data_atualizacao` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `data_leitura` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `destinatario_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `lida` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `mensagem` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `prioridade` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `remetente_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `baseSalary` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `employeeName` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `grossSalary` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `netSalary` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `overtimeHours` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `overtimeRate` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `anexos` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `categoria` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `comentarios` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `criador_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `data_atualizacao` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `data_conclusao` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `data_limite` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `prioridade` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `responsavel_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `celular` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `data_atualizacao` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `perfil` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `permissoes` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `plataformas` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `senha_hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ultimo_login` on the `users` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_id` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_salary` to the `payrolls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_code` to the `payrolls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_name` to the `payrolls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_payments_due_date";

-- DropIndex
DROP INDEX "idx_payrolls_employee_id";

-- DropIndex
DROP INDEX "idx_users_ativo";

-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "ativo",
DROP COLUMN "data_atualizacao",
DROP COLUMN "data_criacao",
DROP COLUMN "descricao",
DROP COLUMN "nome",
DROP COLUMN "tipo",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "type" VARCHAR(50),
ADD COLUMN     "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "ativo",
DROP COLUMN "categoria",
DROP COLUMN "dados_extras",
DROP COLUMN "data_atualizacao",
DROP COLUMN "data_criacao",
DROP COLUMN "data_leitura",
DROP COLUMN "destinatario_id",
DROP COLUMN "lida",
DROP COLUMN "mensagem",
DROP COLUMN "prioridade",
DROP COLUMN "remetente_id",
DROP COLUMN "tipo",
DROP COLUMN "titulo",
ADD COLUMN     "active" BOOLEAN,
ADD COLUMN     "category" VARCHAR(50),
ADD COLUMN     "created_at" TIMESTAMP(6),
ADD COLUMN     "extra_data" JSON,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "priority" VARCHAR(20),
ADD COLUMN     "read" BOOLEAN,
ADD COLUMN     "read_at" TIMESTAMP(6),
ADD COLUMN     "recipient_id" VARCHAR(50) NOT NULL,
ADD COLUMN     "sender_id" VARCHAR(50),
ADD COLUMN     "title" VARCHAR(200) NOT NULL,
ADD COLUMN     "type" VARCHAR(50) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "createdAt",
DROP COLUMN "dueDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "due_date" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "payrolls" DROP COLUMN "baseSalary",
DROP COLUMN "createdAt",
DROP COLUMN "employeeId",
DROP COLUMN "employeeName",
DROP COLUMN "grossSalary",
DROP COLUMN "netSalary",
DROP COLUMN "overtimeHours",
DROP COLUMN "overtimeRate",
DROP COLUMN "updatedAt",
ADD COLUMN     "base_salary" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employee_code" VARCHAR(50) NOT NULL,
ADD COLUMN     "employee_name" VARCHAR(200) NOT NULL,
ADD COLUMN     "gross_salary" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "net_salary" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "overtime_hours" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "overtime_rate" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "anexos",
DROP COLUMN "ativo",
DROP COLUMN "categoria",
DROP COLUMN "comentarios",
DROP COLUMN "criador_id",
DROP COLUMN "data_atualizacao",
DROP COLUMN "data_conclusao",
DROP COLUMN "data_criacao",
DROP COLUMN "data_limite",
DROP COLUMN "descricao",
DROP COLUMN "prioridade",
DROP COLUMN "responsavel_id",
DROP COLUMN "titulo",
ADD COLUMN     "active" BOOLEAN,
ADD COLUMN     "attachments" JSON,
ADD COLUMN     "category" VARCHAR(50),
ADD COLUMN     "comments" JSON,
ADD COLUMN     "completed_at" TIMESTAMP(6),
ADD COLUMN     "created_at" TIMESTAMP(6),
ADD COLUMN     "creator_id" UUID NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "due_date" TIMESTAMP(6),
ADD COLUMN     "priority" INTEGER,
ADD COLUMN     "responsible_id" UUID,
ADD COLUMN     "title" VARCHAR(200) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "ativo",
DROP COLUMN "celular",
DROP COLUMN "data_atualizacao",
DROP COLUMN "data_criacao",
DROP COLUMN "nome",
DROP COLUMN "perfil",
DROP COLUMN "permissoes",
DROP COLUMN "plataformas",
DROP COLUMN "senha_hash",
DROP COLUMN "ultimo_login",
ADD COLUMN     "active" BOOLEAN DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_login" TIMESTAMP(6),
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "permissions" JSON DEFAULT '[]',
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "platforms" JSON DEFAULT '[]',
ADD COLUMN     "profile" VARCHAR(20) DEFAULT 'employer',
ADD COLUMN     "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "messages" (
    "id" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "type" VARCHAR(20) NOT NULL DEFAULT 'text',
    "sender_id" UUID NOT NULL,
    "group_id" UUID,
    "reply_to_id" VARCHAR(50),
    "metadata" JSON,
    "status" VARCHAR(20) NOT NULL DEFAULT 'sent',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_reads" (
    "id" VARCHAR(50) NOT NULL,
    "message_id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "read_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_reads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "icon" VARCHAR(50),
    "category" VARCHAR(50) NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "criteria" JSON NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "rarity" VARCHAR(20) NOT NULL DEFAULT 'common',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "achievement_id" VARCHAR(50) NOT NULL,
    "unlocked_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" JSON,

    CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_points" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "points" INTEGER NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "reference_id" VARCHAR(50),
    "metadata" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "type" VARCHAR(30) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "criteria" JSON NOT NULL,
    "reward_points" INTEGER NOT NULL DEFAULT 0,
    "reward_badge" VARCHAR(50),
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_challenges" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "challenge_id" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "progress" JSON,
    "started_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),

    CONSTRAINT "user_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "theme" JSON NOT NULL DEFAULT '{}',
    "preferences" JSON NOT NULL DEFAULT '{}',
    "ui_config" JSON NOT NULL DEFAULT '{}',
    "notifications" JSON NOT NULL DEFAULT '{}',
    "privacy" JSON NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'BRL',
    "interval" VARCHAR(20) NOT NULL,
    "features" JSON NOT NULL,
    "limits" JSON NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "plan_id" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "current_period_start" TIMESTAMP(6) NOT NULL,
    "current_period_end" TIMESTAMP(6) NOT NULL,
    "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "cancelled_at" TIMESTAMP(6),
    "trial_start" TIMESTAMP(6),
    "trial_end" TIMESTAMP(6),
    "metadata" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_records" (
    "id" VARCHAR(50) NOT NULL,
    "subscription_id" VARCHAR(50) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'BRL',
    "status" VARCHAR(20) NOT NULL,
    "payment_method" VARCHAR(50) NOT NULL,
    "external_id" VARCHAR(100),
    "paid_at" TIMESTAMP(6),
    "metadata" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_profiles" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(18),
    "service_type" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "service_area" JSON NOT NULL,
    "price_range" JSON NOT NULL,
    "availability" JSON NOT NULL,
    "rating" DECIMAL(3,2),
    "total_reviews" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "white_label_enabled" BOOLEAN NOT NULL DEFAULT false,
    "brand_name" VARCHAR(255),
    "brand_logo_url" VARCHAR(500),
    "brand_colors" JSON,
    "custom_domain" VARCHAR(255),
    "custom_subdomain" VARCHAR(100),
    "brand_settings" JSON,
    "commission_enabled" BOOLEAN NOT NULL DEFAULT false,
    "commission_type" VARCHAR(20),
    "commission_rate" DECIMAL(5,2),
    "commission_tiers" JSON,
    "payment_terms" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_services" (
    "id" VARCHAR(50) NOT NULL,
    "partner_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "unit" VARCHAR(50) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_reviews" (
    "id" VARCHAR(50) NOT NULL,
    "partner_id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_bookings" (
    "id" VARCHAR(50) NOT NULL,
    "service_id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "scheduled_date" TIMESTAMP(6) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_profiles" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(18),
    "supplier_type" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "delivery_areas" JSON NOT NULL,
    "min_order" DECIMAL(10,2),
    "payment_terms" JSON NOT NULL,
    "rating" DECIMAL(3,2),
    "total_orders" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_products" (
    "id" VARCHAR(50) NOT NULL,
    "supplier_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "unit" VARCHAR(50) NOT NULL,
    "stock" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_orders" (
    "id" VARCHAR(50) NOT NULL,
    "supplier_id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "order_number" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "delivery_date" TIMESTAMP(6),
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_order_items" (
    "id" VARCHAR(50) NOT NULL,
    "order_id" VARCHAR(50) NOT NULL,
    "product_id" VARCHAR(50) NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "supplier_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_categories" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(50),
    "color" VARCHAR(7),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category_id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "employee_id" VARCHAR(50),
    "file_name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(500) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_type" VARCHAR(100) NOT NULL,
    "file_hash" VARCHAR(64) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "tags" JSON,
    "metadata" JSON,
    "expiry_date" TIMESTAMP(6),
    "is_sensitive" BOOLEAN NOT NULL DEFAULT false,
    "access_level" VARCHAR(20) NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_versions" (
    "id" VARCHAR(50) NOT NULL,
    "document_id" VARCHAR(50) NOT NULL,
    "version" INTEGER NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(500) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_hash" VARCHAR(64) NOT NULL,
    "changes" TEXT,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_shares" (
    "id" VARCHAR(50) NOT NULL,
    "document_id" VARCHAR(50) NOT NULL,
    "shared_with" UUID NOT NULL,
    "shared_by" UUID NOT NULL,
    "permissions" JSON NOT NULL,
    "expires_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_employer_links" (
    "id" VARCHAR(50) NOT NULL,
    "partner_id" VARCHAR(50) NOT NULL,
    "employer_id" UUID NOT NULL,
    "link_type" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "referral_code" VARCHAR(50),
    "commission_rate" DECIMAL(5,2),
    "white_label_config" JSON,
    "metadata" JSON,
    "linked_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activated_at" TIMESTAMP(6),

    CONSTRAINT "partner_employer_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commissions" (
    "id" VARCHAR(50) NOT NULL,
    "partner_id" VARCHAR(50) NOT NULL,
    "employer_link_id" VARCHAR(50) NOT NULL,
    "subscription_id" VARCHAR(50),
    "payment_record_id" VARCHAR(50),
    "commission_type" VARCHAR(20) NOT NULL,
    "base_amount" DECIMAL(10,2) NOT NULL,
    "commission_rate" DECIMAL(5,2) NOT NULL,
    "commission_amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'BRL',
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "earned_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(6) NOT NULL,
    "paid_at" TIMESTAMP(6),
    "payment_method" VARCHAR(50),
    "payment_reference" VARCHAR(100),
    "notes" TEXT,
    "metadata" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "white_label_configs" (
    "id" VARCHAR(50) NOT NULL,
    "partner_id" VARCHAR(50) NOT NULL,
    "employer_id" UUID,
    "brand_name" VARCHAR(255) NOT NULL,
    "logo_url" VARCHAR(500),
    "favicon_url" VARCHAR(500),
    "colors" JSON NOT NULL,
    "fonts" JSON,
    "custom_domain" VARCHAR(255),
    "subdomain" VARCHAR(100),
    "ssl_enabled" BOOLEAN NOT NULL DEFAULT false,
    "custom_css" TEXT,
    "header_config" JSON,
    "footer_config" JSON,
    "login_config" JSON,
    "features_enabled" JSON NOT NULL,
    "modules_config" JSON,
    "meta_title" VARCHAR(255),
    "meta_description" VARCHAR(500),
    "meta_keywords" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "white_label_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payroll_periods" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "reference_month" INTEGER NOT NULL,
    "reference_year" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
    "calculation_date" TIMESTAMP(6),
    "approval_date" TIMESTAMP(6),
    "payment_date" TIMESTAMP(6),
    "total_gross" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total_discounts" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total_net" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payroll_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "esocial_certificates" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "certificate_type" VARCHAR(20) NOT NULL,
    "certificate_file" TEXT NOT NULL,
    "password" VARCHAR(255),
    "valid_from" TIMESTAMP(6) NOT NULL,
    "valid_until" TIMESTAMP(6) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_validation" TIMESTAMP(6),
    "validation_status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "esocial_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "esocial_events" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "payroll_period_id" VARCHAR(50),
    "certificate_id" VARCHAR(50) NOT NULL,
    "event_type" VARCHAR(10) NOT NULL,
    "event_status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "event_data" JSONB NOT NULL,
    "event_xml" TEXT NOT NULL,
    "protocol_number" VARCHAR(50),
    "response_xml" TEXT,
    "error_message" TEXT,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "max_retries" INTEGER NOT NULL DEFAULT 3,
    "next_retry" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "esocial_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "esocial_config" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "employer_type" VARCHAR(20) NOT NULL,
    "employer_cpf" VARCHAR(14),
    "employer_cnpj" VARCHAR(18),
    "employer_name" VARCHAR(255) NOT NULL,
    "employer_address" TEXT NOT NULL,
    "employer_phone" VARCHAR(20),
    "employer_email" VARCHAR(255),
    "esocial_version" VARCHAR(10) NOT NULL DEFAULT '2.5',
    "environment" VARCHAR(20) NOT NULL DEFAULT 'production',
    "auto_send" BOOLEAN NOT NULL DEFAULT true,
    "retry_interval" INTEGER NOT NULL DEFAULT 300,
    "max_retries" INTEGER NOT NULL DEFAULT 3,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "esocial_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payroll_items" (
    "id" VARCHAR(50) NOT NULL,
    "payroll_period_id" VARCHAR(50) NOT NULL,
    "employee_id" VARCHAR(50) NOT NULL,
    "employee_name" VARCHAR(255) NOT NULL,
    "employee_cpf" VARCHAR(14) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "admission_date" TIMESTAMP(6) NOT NULL,
    "base_salary" DECIMAL(10,2) NOT NULL,
    "worked_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "extra_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "night_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "sunday_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "holiday_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "absences" INTEGER NOT NULL DEFAULT 0,
    "late_minutes" INTEGER NOT NULL DEFAULT 0,
    "base_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "extra_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "night_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "sunday_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "holiday_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "bonus_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "commission_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "other_earnings" JSON,
    "total_earnings" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "inss_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "irrf_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "transport_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "meal_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "advance_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "loan_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "other_discounts" JSON,
    "total_discounts" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "net_salary" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "fgts_base" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "fgts_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "vacation_days" INTEGER NOT NULL DEFAULT 0,
    "vacation_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "vacation_advance" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "thirteenth_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "thirteenth_advance" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payroll_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payslips" (
    "id" VARCHAR(50) NOT NULL,
    "payroll_period_id" VARCHAR(50) NOT NULL,
    "employee_id" VARCHAR(50) NOT NULL,
    "payslip_number" VARCHAR(50) NOT NULL,
    "reference_period" VARCHAR(20) NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "company_cnpj" VARCHAR(18),
    "company_address" TEXT,
    "employee_name" VARCHAR(255) NOT NULL,
    "employee_cpf" VARCHAR(14) NOT NULL,
    "employee_pis" VARCHAR(15),
    "position" VARCHAR(100) NOT NULL,
    "admission_date" TIMESTAMP(6) NOT NULL,
    "total_earnings" DECIMAL(10,2) NOT NULL,
    "total_discounts" DECIMAL(10,2) NOT NULL,
    "net_salary" DECIMAL(10,2) NOT NULL,
    "fgts_amount" DECIMAL(10,2) NOT NULL,
    "earnings_detail" JSON NOT NULL,
    "discounts_detail" JSON NOT NULL,
    "generated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sent_at" TIMESTAMP(6),
    "viewed_at" TIMESTAMP(6),

    CONSTRAINT "payslips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payroll_configurations" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "company_cnpj" VARCHAR(18),
    "company_address" TEXT,
    "inss_rates" JSON NOT NULL,
    "irrf_rates" JSON NOT NULL,
    "fgts_rate" DECIMAL(5,2) NOT NULL DEFAULT 8.0,
    "transport_percentage" DECIMAL(5,2) NOT NULL DEFAULT 6.0,
    "meal_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "payment_day" INTEGER NOT NULL DEFAULT 5,
    "cutoff_day" INTEGER NOT NULL DEFAULT 25,
    "vacation_advance_percentage" DECIMAL(5,2) NOT NULL DEFAULT 33.33,
    "vacation_bonus" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payroll_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_entries" (
    "id" VARCHAR(50) NOT NULL,
    "employee_id" VARCHAR(50) NOT NULL,
    "entry_date" DATE NOT NULL,
    "clock_in_1" TIMESTAMP(6),
    "clock_out_1" TIMESTAMP(6),
    "clock_in_2" TIMESTAMP(6),
    "clock_out_2" TIMESTAMP(6),
    "extra_start" TIMESTAMP(6),
    "extra_end" TIMESTAMP(6),
    "total_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "regular_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "extra_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "night_hours" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'normal',
    "absence_type" VARCHAR(50),
    "notes" TEXT,
    "clock_in_location" VARCHAR(255),
    "clock_out_location" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_consents" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID,
    "cpf" VARCHAR(14),
    "termsAccepted" BOOLEAN NOT NULL,
    "privacyAccepted" BOOLEAN NOT NULL,
    "marketingAccepted" BOOLEAN,
    "user_agent" VARCHAR(255),
    "ip_address" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeclock_entries" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" UUID,
    "type" VARCHAR(10) NOT NULL,
    "note" VARCHAR(255),
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeclock_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "roleType" VARCHAR(50) NOT NULL,
    "contextId" TEXT,
    "contextType" VARCHAR(50),
    "permissions" JSONB NOT NULL DEFAULT '{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domestic_contexts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "ownerId" UUID NOT NULL,
    "members" JSONB NOT NULL DEFAULT '[]',
    "settings" JSONB NOT NULL DEFAULT '{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "domestic_contexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employment_relationships" (
    "id" TEXT NOT NULL,
    "employerId" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "contextId" TEXT NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "salary" DECIMAL(10,2) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "contractType" VARCHAR(50) NOT NULL,
    "permissions" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employment_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_relationships" (
    "id" TEXT NOT NULL,
    "familyContextId" TEXT NOT NULL,
    "memberId" UUID NOT NULL,
    "relationshipType" VARCHAR(50) NOT NULL,
    "permissions" JSONB NOT NULL DEFAULT '{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_messages_sender_id" ON "messages"("sender_id");

-- CreateIndex
CREATE INDEX "idx_messages_group_id" ON "messages"("group_id");

-- CreateIndex
CREATE INDEX "idx_messages_created_at" ON "messages"("created_at");

-- CreateIndex
CREATE INDEX "idx_messages_status" ON "messages"("status");

-- CreateIndex
CREATE INDEX "idx_message_reads_user_id" ON "message_reads"("user_id");

-- CreateIndex
CREATE INDEX "idx_message_reads_message_id" ON "message_reads"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_reads_message_id_user_id_key" ON "message_reads"("message_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_achievements_category" ON "achievements"("category");

-- CreateIndex
CREATE INDEX "idx_achievements_type" ON "achievements"("type");

-- CreateIndex
CREATE INDEX "idx_achievements_active" ON "achievements"("active");

-- CreateIndex
CREATE INDEX "idx_user_achievements_user_id" ON "user_achievements"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_achievements_achievement_id" ON "user_achievements"("achievement_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_achievements_user_id_achievement_id_key" ON "user_achievements"("user_id", "achievement_id");

-- CreateIndex
CREATE INDEX "idx_user_points_user_id" ON "user_points"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_points_action" ON "user_points"("action");

-- CreateIndex
CREATE INDEX "idx_user_points_category" ON "user_points"("category");

-- CreateIndex
CREATE INDEX "idx_user_points_created_at" ON "user_points"("created_at");

-- CreateIndex
CREATE INDEX "idx_challenges_type" ON "challenges"("type");

-- CreateIndex
CREATE INDEX "idx_challenges_category" ON "challenges"("category");

-- CreateIndex
CREATE INDEX "idx_challenges_active" ON "challenges"("active");

-- CreateIndex
CREATE INDEX "idx_challenges_dates" ON "challenges"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "idx_user_challenges_user_id" ON "user_challenges"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_challenges_challenge_id" ON "user_challenges"("challenge_id");

-- CreateIndex
CREATE INDEX "idx_user_challenges_status" ON "user_challenges"("status");

-- CreateIndex
CREATE UNIQUE INDEX "user_challenges_user_id_challenge_id_key" ON "user_challenges"("user_id", "challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "user_settings"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_settings_user_id" ON "user_settings"("user_id");

-- CreateIndex
CREATE INDEX "idx_subscriptions_user_id" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "idx_subscriptions_status" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "idx_payment_records_subscription" ON "payment_records"("subscription_id");

-- CreateIndex
CREATE INDEX "idx_payment_records_status" ON "payment_records"("status");

-- CreateIndex
CREATE UNIQUE INDEX "partner_profiles_user_id_key" ON "partner_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "partner_profiles_custom_subdomain_key" ON "partner_profiles"("custom_subdomain");

-- CreateIndex
CREATE INDEX "idx_partner_profiles_service_type" ON "partner_profiles"("service_type");

-- CreateIndex
CREATE INDEX "idx_partner_profiles_verified" ON "partner_profiles"("verified");

-- CreateIndex
CREATE INDEX "idx_partner_profiles_subdomain" ON "partner_profiles"("custom_subdomain");

-- CreateIndex
CREATE INDEX "idx_partner_profiles_white_label" ON "partner_profiles"("white_label_enabled");

-- CreateIndex
CREATE INDEX "idx_partner_services_partner" ON "partner_services"("partner_id");

-- CreateIndex
CREATE INDEX "idx_partner_reviews_partner" ON "partner_reviews"("partner_id");

-- CreateIndex
CREATE INDEX "idx_service_bookings_user" ON "service_bookings"("user_id");

-- CreateIndex
CREATE INDEX "idx_service_bookings_status" ON "service_bookings"("status");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_profiles_user_id_key" ON "supplier_profiles"("user_id");

-- CreateIndex
CREATE INDEX "idx_supplier_profiles_type" ON "supplier_profiles"("supplier_type");

-- CreateIndex
CREATE INDEX "idx_supplier_profiles_verified" ON "supplier_profiles"("verified");

-- CreateIndex
CREATE INDEX "idx_supplier_products_supplier" ON "supplier_products"("supplier_id");

-- CreateIndex
CREATE INDEX "idx_supplier_products_category" ON "supplier_products"("category");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_orders_order_number_key" ON "supplier_orders"("order_number");

-- CreateIndex
CREATE INDEX "idx_supplier_orders_user" ON "supplier_orders"("user_id");

-- CreateIndex
CREATE INDEX "idx_supplier_orders_status" ON "supplier_orders"("status");

-- CreateIndex
CREATE INDEX "idx_supplier_order_items_order" ON "supplier_order_items"("order_id");

-- CreateIndex
CREATE INDEX "idx_documents_user" ON "documents"("user_id");

-- CreateIndex
CREATE INDEX "idx_documents_category" ON "documents"("category_id");

-- CreateIndex
CREATE INDEX "idx_documents_employee" ON "documents"("employee_id");

-- CreateIndex
CREATE INDEX "idx_documents_status" ON "documents"("status");

-- CreateIndex
CREATE INDEX "idx_document_versions_document" ON "document_versions"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "document_versions_document_id_version_key" ON "document_versions"("document_id", "version");

-- CreateIndex
CREATE INDEX "idx_document_shares_document" ON "document_shares"("document_id");

-- CreateIndex
CREATE INDEX "idx_document_shares_receiver" ON "document_shares"("shared_with");

-- CreateIndex
CREATE UNIQUE INDEX "partner_employer_links_referral_code_key" ON "partner_employer_links"("referral_code");

-- CreateIndex
CREATE INDEX "idx_partner_employer_links_partner" ON "partner_employer_links"("partner_id");

-- CreateIndex
CREATE INDEX "idx_partner_employer_links_employer" ON "partner_employer_links"("employer_id");

-- CreateIndex
CREATE INDEX "idx_partner_employer_links_referral" ON "partner_employer_links"("referral_code");

-- CreateIndex
CREATE INDEX "idx_partner_employer_links_status" ON "partner_employer_links"("status");

-- CreateIndex
CREATE INDEX "idx_commissions_partner" ON "commissions"("partner_id");

-- CreateIndex
CREATE INDEX "idx_commissions_employer_link" ON "commissions"("employer_link_id");

-- CreateIndex
CREATE INDEX "idx_commissions_status" ON "commissions"("status");

-- CreateIndex
CREATE INDEX "idx_commissions_earned_at" ON "commissions"("earned_at");

-- CreateIndex
CREATE INDEX "idx_commissions_due_date" ON "commissions"("due_date");

-- CreateIndex
CREATE INDEX "idx_white_label_configs_partner" ON "white_label_configs"("partner_id");

-- CreateIndex
CREATE INDEX "idx_white_label_configs_employer" ON "white_label_configs"("employer_id");

-- CreateIndex
CREATE INDEX "idx_white_label_configs_subdomain" ON "white_label_configs"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "white_label_configs_partner_id_employer_id_key" ON "white_label_configs"("partner_id", "employer_id");

-- CreateIndex
CREATE INDEX "idx_payroll_periods_user" ON "payroll_periods"("user_id");

-- CreateIndex
CREATE INDEX "idx_payroll_periods_status" ON "payroll_periods"("status");

-- CreateIndex
CREATE INDEX "idx_payroll_periods_period" ON "payroll_periods"("reference_year", "reference_month");

-- CreateIndex
CREATE UNIQUE INDEX "payroll_periods_user_id_reference_month_reference_year_key" ON "payroll_periods"("user_id", "reference_month", "reference_year");

-- CreateIndex
CREATE INDEX "idx_esocial_certificates_user" ON "esocial_certificates"("user_id");

-- CreateIndex
CREATE INDEX "idx_esocial_certificates_active" ON "esocial_certificates"("is_active");

-- CreateIndex
CREATE INDEX "idx_esocial_certificates_status" ON "esocial_certificates"("validation_status");

-- CreateIndex
CREATE INDEX "idx_esocial_events_user" ON "esocial_events"("user_id");

-- CreateIndex
CREATE INDEX "idx_esocial_events_type" ON "esocial_events"("event_type");

-- CreateIndex
CREATE INDEX "idx_esocial_events_status" ON "esocial_events"("event_status");

-- CreateIndex
CREATE INDEX "idx_esocial_events_payroll" ON "esocial_events"("payroll_period_id");

-- CreateIndex
CREATE UNIQUE INDEX "esocial_config_user_id_key" ON "esocial_config"("user_id");

-- CreateIndex
CREATE INDEX "idx_esocial_config_cpf" ON "esocial_config"("employer_cpf");

-- CreateIndex
CREATE INDEX "idx_esocial_config_cnpj" ON "esocial_config"("employer_cnpj");

-- CreateIndex
CREATE INDEX "idx_payroll_items_period" ON "payroll_items"("payroll_period_id");

-- CreateIndex
CREATE INDEX "idx_payroll_items_employee" ON "payroll_items"("employee_id");

-- CreateIndex
CREATE INDEX "idx_payslips_employee" ON "payslips"("employee_id");

-- CreateIndex
CREATE INDEX "idx_payslips_period" ON "payslips"("reference_period");

-- CreateIndex
CREATE UNIQUE INDEX "payslips_payroll_period_id_employee_id_key" ON "payslips"("payroll_period_id", "employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "payroll_configurations_user_id_key" ON "payroll_configurations"("user_id");

-- CreateIndex
CREATE INDEX "idx_payroll_config_user" ON "payroll_configurations"("user_id");

-- CreateIndex
CREATE INDEX "idx_time_entries_employee" ON "time_entries"("employee_id");

-- CreateIndex
CREATE INDEX "idx_time_entries_date" ON "time_entries"("entry_date");

-- CreateIndex
CREATE INDEX "idx_time_entries_status" ON "time_entries"("status");

-- CreateIndex
CREATE UNIQUE INDEX "time_entries_employee_id_entry_date_key" ON "time_entries"("employee_id", "entry_date");

-- CreateIndex
CREATE INDEX "idx_user_consents_user_id" ON "user_consents"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_consents_cpf" ON "user_consents"("cpf");

-- CreateIndex
CREATE INDEX "idx_timeclock_user_id" ON "timeclock_entries"("user_id");

-- CreateIndex
CREATE INDEX "idx_timeclock_timestamp" ON "timeclock_entries"("timestamp");

-- CreateIndex
CREATE INDEX "idx_user_roles_user_id" ON "user_roles"("userId");

-- CreateIndex
CREATE INDEX "idx_user_roles_role_type" ON "user_roles"("roleType");

-- CreateIndex
CREATE INDEX "idx_user_roles_context_id" ON "user_roles"("contextId");

-- CreateIndex
CREATE INDEX "idx_user_roles_active" ON "user_roles"("active");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleType_contextId_key" ON "user_roles"("userId", "roleType", "contextId");

-- CreateIndex
CREATE INDEX "idx_domestic_contexts_owner_id" ON "domestic_contexts"("ownerId");

-- CreateIndex
CREATE INDEX "idx_domestic_contexts_type" ON "domestic_contexts"("type");

-- CreateIndex
CREATE INDEX "idx_domestic_contexts_active" ON "domestic_contexts"("active");

-- CreateIndex
CREATE INDEX "idx_employment_relationships_employer_id" ON "employment_relationships"("employerId");

-- CreateIndex
CREATE INDEX "idx_employment_relationships_employee_id" ON "employment_relationships"("employeeId");

-- CreateIndex
CREATE INDEX "idx_employment_relationships_context_id" ON "employment_relationships"("contextId");

-- CreateIndex
CREATE INDEX "idx_employment_relationships_status" ON "employment_relationships"("status");

-- CreateIndex
CREATE UNIQUE INDEX "employment_relationships_employerId_employeeId_contextId_key" ON "employment_relationships"("employerId", "employeeId", "contextId");

-- CreateIndex
CREATE INDEX "idx_family_relationships_family_context_id" ON "family_relationships"("familyContextId");

-- CreateIndex
CREATE INDEX "idx_family_relationships_member_id" ON "family_relationships"("memberId");

-- CreateIndex
CREATE INDEX "idx_family_relationships_type" ON "family_relationships"("relationshipType");

-- CreateIndex
CREATE INDEX "idx_family_relationships_active" ON "family_relationships"("active");

-- CreateIndex
CREATE UNIQUE INDEX "family_relationships_familyContextId_memberId_key" ON "family_relationships"("familyContextId", "memberId");

-- CreateIndex
CREATE INDEX "idx_payments_due_date" ON "payments"("due_date");

-- CreateIndex
CREATE INDEX "idx_payrolls_employee_id" ON "payrolls"("employee_id");

-- CreateIndex
CREATE INDEX "idx_users_active" ON "users"("active");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_reads" ADD CONSTRAINT "message_reads_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_reads" ADD CONSTRAINT "message_reads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_points" ADD CONSTRAINT "user_points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_profiles" ADD CONSTRAINT "partner_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_services" ADD CONSTRAINT "partner_services_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_reviews" ADD CONSTRAINT "partner_reviews_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_reviews" ADD CONSTRAINT "partner_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_bookings" ADD CONSTRAINT "service_bookings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "partner_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_bookings" ADD CONSTRAINT "service_bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_profiles" ADD CONSTRAINT "supplier_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_orders" ADD CONSTRAINT "supplier_orders_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_orders" ADD CONSTRAINT "supplier_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_order_items" ADD CONSTRAINT "supplier_order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "supplier_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_order_items" ADD CONSTRAINT "supplier_order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "supplier_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "document_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_shared_by_fkey" FOREIGN KEY ("shared_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_shared_with_fkey" FOREIGN KEY ("shared_with") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_employer_links" ADD CONSTRAINT "partner_employer_links_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_employer_links" ADD CONSTRAINT "partner_employer_links_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_employer_link_id_fkey" FOREIGN KEY ("employer_link_id") REFERENCES "partner_employer_links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_payment_record_id_fkey" FOREIGN KEY ("payment_record_id") REFERENCES "payment_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "white_label_configs" ADD CONSTRAINT "white_label_configs_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "white_label_configs" ADD CONSTRAINT "white_label_configs_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_periods" ADD CONSTRAINT "payroll_periods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esocial_certificates" ADD CONSTRAINT "esocial_certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esocial_events" ADD CONSTRAINT "esocial_events_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "esocial_certificates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esocial_events" ADD CONSTRAINT "esocial_events_payroll_period_id_fkey" FOREIGN KEY ("payroll_period_id") REFERENCES "payroll_periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esocial_events" ADD CONSTRAINT "esocial_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esocial_config" ADD CONSTRAINT "esocial_config_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_items" ADD CONSTRAINT "payroll_items_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_items" ADD CONSTRAINT "payroll_items_payroll_period_id_fkey" FOREIGN KEY ("payroll_period_id") REFERENCES "payroll_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslips" ADD CONSTRAINT "payslips_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslips" ADD CONSTRAINT "payslips_payroll_period_id_fkey" FOREIGN KEY ("payroll_period_id") REFERENCES "payroll_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_configurations" ADD CONSTRAINT "payroll_configurations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeclock_entries" ADD CONSTRAINT "timeclock_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "domestic_contexts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domestic_contexts" ADD CONSTRAINT "domestic_contexts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employment_relationships" ADD CONSTRAINT "employment_relationships_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employment_relationships" ADD CONSTRAINT "employment_relationships_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employment_relationships" ADD CONSTRAINT "employment_relationships_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "domestic_contexts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_relationships" ADD CONSTRAINT "family_relationships_familyContextId_fkey" FOREIGN KEY ("familyContextId") REFERENCES "domestic_contexts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_relationships" ADD CONSTRAINT "family_relationships_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
