-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(20),
    "cpf" VARCHAR(11) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user_photo" BYTEA,
    "senha_hash" VARCHAR(255) NOT NULL,
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "celular" VARCHAR(20),
    "perfil" VARCHAR(20) DEFAULT 'empregador',
    "ativo" BOOLEAN DEFAULT true,
    "ultimo_login" TIMESTAMP(6),
    "plataformas" JSON DEFAULT '[]',
    "permissoes" JSON DEFAULT '[]',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" VARCHAR(50) NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "mensagem" TEXT NOT NULL,
    "destinatario_id" VARCHAR(50) NOT NULL,
    "remetente_id" VARCHAR(50),
    "lida" BOOLEAN,
    "data_criacao" TIMESTAMP(6),
    "data_leitura" TIMESTAMP(6),
    "dados_extras" JSON,
    "prioridade" VARCHAR(20),
    "categoria" VARCHAR(50),
    "ativo" BOOLEAN,
    "data_atualizacao" TIMESTAMP(6),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" VARCHAR(50) NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "descricao" TEXT,
    "status" VARCHAR(20) NOT NULL,
    "prioridade" INTEGER,
    "data_criacao" TIMESTAMP(6),
    "data_limite" TIMESTAMP(6),
    "data_conclusao" TIMESTAMP(6),
    "criador_id" UUID NOT NULL,
    "responsavel_id" UUID,
    "categoria" VARCHAR(50),
    "tags" JSON,
    "anexos" JSON,
    "comentarios" JSON,
    "ativo" BOOLEAN,
    "data_atualizacao" TIMESTAMP(6),

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT,
    "tipo" VARCHAR(50),
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_group_roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_group_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "session_token" VARCHAR(255) NOT NULL,
    "active_group_id" UUID,
    "active_role" VARCHAR(50),
    "expires_at" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "active_context_group_id" UUID,
    "active_context_role" VARCHAR(50),
    "user_agent" VARCHAR(255),
    "ip_address" VARCHAR(50),

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "spent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "category" VARCHAR(100) NOT NULL,
    "startDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payrolls" (
    "id" VARCHAR(50) NOT NULL,
    "employeeId" VARCHAR(50) NOT NULL,
    "employeeName" VARCHAR(200) NOT NULL,
    "baseSalary" DOUBLE PRECISION NOT NULL,
    "overtimeHours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "overtimeRate" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "bonuses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deductions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "inss" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "irrf" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fgts" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netSalary" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grossSalary" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID,

    CONSTRAINT "payrolls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_ativo" ON "users"("ativo");

-- CreateIndex
CREATE INDEX "idx_users_cpf" ON "users"("cpf");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "ix_notifications_id" ON "notifications"("id");

-- CreateIndex
CREATE INDEX "ix_tasks_id" ON "tasks"("id");

-- CreateIndex
CREATE INDEX "idx_user_group_roles_group_id" ON "user_group_roles"("group_id");

-- CreateIndex
CREATE INDEX "idx_user_group_roles_user_id" ON "user_group_roles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_group_roles_user_id_group_id_key" ON "user_group_roles"("user_id", "group_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_session_token_key" ON "user_sessions"("session_token");

-- CreateIndex
CREATE INDEX "idx_user_sessions_token" ON "user_sessions"("session_token");

-- CreateIndex
CREATE INDEX "idx_user_sessions_user_id" ON "user_sessions"("user_id");

-- CreateIndex
CREATE INDEX "idx_budgets_user_id" ON "budgets"("user_id");

-- CreateIndex
CREATE INDEX "idx_budgets_status" ON "budgets"("status");

-- CreateIndex
CREATE INDEX "idx_budgets_category" ON "budgets"("category");

-- CreateIndex
CREATE INDEX "idx_payrolls_user_id" ON "payrolls"("user_id");

-- CreateIndex
CREATE INDEX "idx_payrolls_status" ON "payrolls"("status");

-- CreateIndex
CREATE INDEX "idx_payrolls_employee_id" ON "payrolls"("employeeId");

-- CreateIndex
CREATE INDEX "idx_payrolls_month_year" ON "payrolls"("month", "year");

-- AddForeignKey
ALTER TABLE "user_group_roles" ADD CONSTRAINT "user_group_roles_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_group_roles" ADD CONSTRAINT "user_group_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_active_group_id_fkey" FOREIGN KEY ("active_group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payrolls" ADD CONSTRAINT "payrolls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
