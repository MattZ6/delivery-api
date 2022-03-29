/*
  Warnings:

  - You are about to drop the column `password` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `deliverymans` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `deliverymans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "deliverymans" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;
