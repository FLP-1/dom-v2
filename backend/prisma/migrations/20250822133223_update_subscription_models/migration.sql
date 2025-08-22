/*
  Warnings:

  - Added the required column `display_name` to the `subscription_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription_plans" ADD COLUMN     "display_name" VARCHAR(200) NOT NULL,
ADD COLUMN     "duration_days" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "amount_paid" DECIMAL(10,2),
ADD COLUMN     "auto_renew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currency" VARCHAR(3) NOT NULL DEFAULT 'BRL',
ADD COLUMN     "payment_id" VARCHAR(100),
ADD COLUMN     "payment_method" VARCHAR(50),
ADD COLUMN     "payment_status" VARCHAR(20) NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE INDEX "idx_subscriptions_payment_status" ON "subscriptions"("payment_status");
