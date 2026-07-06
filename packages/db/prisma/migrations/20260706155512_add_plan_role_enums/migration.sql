/*
  Warnings:

  - The `role` column on the `memberships` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plan` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('basic', 'pro');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'operator');

-- AlterTable
ALTER TABLE "memberships" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'operator';

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "plan",
ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'basic';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL;
