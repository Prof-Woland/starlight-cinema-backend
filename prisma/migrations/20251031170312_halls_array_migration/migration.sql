/*
  Warnings:

  - The `hall` column on the `Shows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shows" DROP COLUMN "hall",
ADD COLUMN     "hall" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
