-- CreateEnum
CREATE TYPE "TranslationDirection" AS ENUM ('JA_T0_EN', 'EN_TO_JA');

-- AlterTable
ALTER TABLE "battles" ADD COLUMN     "translation_direction" "TranslationDirection" NOT NULL DEFAULT 'JA_T0_EN';
