/*
  Warnings:

  - The values [JA_T0_EN] on the enum `TranslationDirection` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TranslationDirection_new" AS ENUM ('JA_TO_EN', 'EN_TO_JA');
ALTER TABLE "public"."battles" ALTER COLUMN "translation_direction" DROP DEFAULT;
ALTER TABLE "battles" ALTER COLUMN "translation_direction" TYPE "TranslationDirection_new" USING ("translation_direction"::text::"TranslationDirection_new");
ALTER TYPE "TranslationDirection" RENAME TO "TranslationDirection_old";
ALTER TYPE "TranslationDirection_new" RENAME TO "TranslationDirection";
DROP TYPE "public"."TranslationDirection_old";
ALTER TABLE "battles" ALTER COLUMN "translation_direction" SET DEFAULT 'JA_TO_EN';
COMMIT;

-- AlterTable
ALTER TABLE "battles" ALTER COLUMN "translation_direction" SET DEFAULT 'JA_TO_EN';
