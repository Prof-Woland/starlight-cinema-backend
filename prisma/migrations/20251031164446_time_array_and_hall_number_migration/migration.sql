/*
  Warnings:

  - The `time` column on the `Shows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shows" ADD COLUMN     "hall" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "time",
ADD COLUMN     "time" TEXT[] DEFAULT ARRAY[]::TEXT[];
