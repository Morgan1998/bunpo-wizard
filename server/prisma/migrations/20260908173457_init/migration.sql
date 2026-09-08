-- CreateEnum
CREATE TYPE "BattleStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'EVALUATING', 'COMPLETED', 'DECLINED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battles" (
    "id" TEXT NOT NULL,
    "grammar_topic" TEXT NOT NULL,
    "prompt_sentence" TEXT NOT NULL,
    "status" "BattleStatus" NOT NULL DEFAULT 'PENDING',
    "llm_feedback" TEXT,
    "challenger_id" TEXT NOT NULL,
    "opponent_id" TEXT NOT NULL,
    "winner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "battles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "translation_text" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "battle_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "submissions_battle_id_user_id_key" ON "submissions"("battle_id", "user_id");

-- AddForeignKey
ALTER TABLE "battles" ADD CONSTRAINT "battles_challenger_id_fkey" FOREIGN KEY ("challenger_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battles" ADD CONSTRAINT "battles_opponent_id_fkey" FOREIGN KEY ("opponent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battles" ADD CONSTRAINT "battles_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_battle_id_fkey" FOREIGN KEY ("battle_id") REFERENCES "battles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
