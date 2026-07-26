-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "dateFormat" TEXT NOT NULL DEFAULT 'DD/MM/YYYY',
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Australia/Melbourne',
ADD COLUMN     "weekStartsOn" TEXT NOT NULL DEFAULT 'Monday';
