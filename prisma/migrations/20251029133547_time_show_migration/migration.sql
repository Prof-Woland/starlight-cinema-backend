/*
  Warnings:

  - Added the required column `time` to the `Shows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shows" ADD COLUMN     "time" TEXT NOT NULL;
