/*
  Warnings:

  - You are about to drop the column `hall` on the `Shows` table. All the data in the column will be lost.
  - The `time` column on the `Shows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shows" DROP COLUMN "hall",
DROP COLUMN "time",
ADD COLUMN     "time" JSONB[] DEFAULT ARRAY[]::JSONB[];
