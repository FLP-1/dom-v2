-- CreateTable
CREATE TABLE "quality_checks" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "priority" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "score" INTEGER,
    "notes" TEXT,
    "before_photo" VARCHAR(500),
    "after_photo" VARCHAR(500),
    "completed_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "assigned_to" UUID,

    CONSTRAINT "quality_checks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_templates" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "items" JSON NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "quality_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_reports" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "period" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "total_checks" INTEGER NOT NULL DEFAULT 0,
    "completed_checks" INTEGER NOT NULL DEFAULT 0,
    "failed_checks" INTEGER NOT NULL DEFAULT 0,
    "average_score" DECIMAL(5,2),
    "summary" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "quality_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_quality_checks_user_id" ON "quality_checks"("user_id");

-- CreateIndex
CREATE INDEX "idx_quality_checks_assigned_to" ON "quality_checks"("assigned_to");

-- CreateIndex
CREATE INDEX "idx_quality_checks_category" ON "quality_checks"("category");

-- CreateIndex
CREATE INDEX "idx_quality_checks_status" ON "quality_checks"("status");

-- CreateIndex
CREATE INDEX "idx_quality_checks_priority" ON "quality_checks"("priority");

-- CreateIndex
CREATE INDEX "idx_quality_templates_user_id" ON "quality_templates"("user_id");

-- CreateIndex
CREATE INDEX "idx_quality_templates_category" ON "quality_templates"("category");

-- CreateIndex
CREATE INDEX "idx_quality_templates_active" ON "quality_templates"("is_active");

-- CreateIndex
CREATE INDEX "idx_quality_reports_user_id" ON "quality_reports"("user_id");

-- CreateIndex
CREATE INDEX "idx_quality_reports_period" ON "quality_reports"("period");

-- CreateIndex
CREATE INDEX "idx_quality_reports_start_date" ON "quality_reports"("start_date");

-- AddForeignKey
ALTER TABLE "quality_checks" ADD CONSTRAINT "quality_checks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality_checks" ADD CONSTRAINT "quality_checks_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality_templates" ADD CONSTRAINT "quality_templates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality_reports" ADD CONSTRAINT "quality_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
