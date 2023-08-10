-- AlterTable
ALTER TABLE "Entry" ADD COLUMN "scheduled_at" DATETIME;
UPDATE "Entry" SET "scheduled_at" = CURRENT_TIMESTAMP;
