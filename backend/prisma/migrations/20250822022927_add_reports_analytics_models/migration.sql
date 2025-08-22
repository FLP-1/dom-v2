-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(14);

-- CreateTable
CREATE TABLE "reports" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "type" VARCHAR(50) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "template" JSON,
    "filters" JSON,
    "parameters" JSON,
    "schedule" JSON,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_executions" (
    "id" VARCHAR(50) NOT NULL,
    "report_id" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "started_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),
    "duration" INTEGER,
    "result" JSON,
    "error" TEXT,
    "parameters" JSON,
    "user_id" UUID NOT NULL,

    CONSTRAINT "report_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" VARCHAR(50) NOT NULL,
    "event_type" VARCHAR(100) NOT NULL,
    "event_name" VARCHAR(200) NOT NULL,
    "user_id" UUID NOT NULL,
    "session_id" VARCHAR(100),
    "page_url" VARCHAR(500),
    "user_agent" TEXT,
    "ip_address" VARCHAR(45),
    "metadata" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dashboard_widgets" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "position" JSON NOT NULL,
    "config" JSON NOT NULL,
    "data_source" VARCHAR(200),
    "refresh_interval" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "dashboard_widgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_reports_user_id" ON "reports"("user_id");

-- CreateIndex
CREATE INDEX "idx_reports_type" ON "reports"("type");

-- CreateIndex
CREATE INDEX "idx_reports_category" ON "reports"("category");

-- CreateIndex
CREATE INDEX "idx_reports_active" ON "reports"("is_active");

-- CreateIndex
CREATE INDEX "idx_report_executions_report_id" ON "report_executions"("report_id");

-- CreateIndex
CREATE INDEX "idx_report_executions_status" ON "report_executions"("status");

-- CreateIndex
CREATE INDEX "idx_report_executions_user_id" ON "report_executions"("user_id");

-- CreateIndex
CREATE INDEX "idx_report_executions_started_at" ON "report_executions"("started_at");

-- CreateIndex
CREATE INDEX "idx_analytics_events_user_id" ON "analytics_events"("user_id");

-- CreateIndex
CREATE INDEX "idx_analytics_events_type" ON "analytics_events"("event_type");

-- CreateIndex
CREATE INDEX "idx_analytics_events_name" ON "analytics_events"("event_name");

-- CreateIndex
CREATE INDEX "idx_analytics_events_created_at" ON "analytics_events"("created_at");

-- CreateIndex
CREATE INDEX "idx_dashboard_widgets_user_id" ON "dashboard_widgets"("user_id");

-- CreateIndex
CREATE INDEX "idx_dashboard_widgets_type" ON "dashboard_widgets"("type");

-- CreateIndex
CREATE INDEX "idx_dashboard_widgets_active" ON "dashboard_widgets"("is_active");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_executions" ADD CONSTRAINT "report_executions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_executions" ADD CONSTRAINT "report_executions_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dashboard_widgets" ADD CONSTRAINT "dashboard_widgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
