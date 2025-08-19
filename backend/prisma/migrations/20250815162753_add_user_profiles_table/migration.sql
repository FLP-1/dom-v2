-- CreateTable
CREATE TABLE "user_profiles" (
    "id" VARCHAR(50) NOT NULL,
    "userId" UUID NOT NULL,
    "profileType" VARCHAR(50) NOT NULL,
    "contextId" VARCHAR(50),
    "contextType" VARCHAR(50),
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "permissions" JSON DEFAULT '{}',
    "metadata" JSON DEFAULT '{}',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_user_profiles_user_id" ON "user_profiles"("userId");

-- CreateIndex
CREATE INDEX "idx_user_profiles_type" ON "user_profiles"("profileType");

-- CreateIndex
CREATE INDEX "idx_user_profiles_context" ON "user_profiles"("contextId");

-- CreateIndex
CREATE INDEX "idx_user_profiles_primary" ON "user_profiles"("isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_profileType_contextId_key" ON "user_profiles"("userId", "profileType", "contextId");

-- CreateIndex
CREATE INDEX "idx_users_profile" ON "users"("profile");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
