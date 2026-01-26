/*
  Warnings:

  - Added the required column `image` to the `Court` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "image" TEXT NOT NULL;
