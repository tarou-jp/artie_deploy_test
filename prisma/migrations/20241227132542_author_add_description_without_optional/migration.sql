/*
  Warnings:

  - Made the column `description` on table `Author` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "description" SET NOT NULL;
