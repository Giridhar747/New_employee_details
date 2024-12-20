/*
  Warnings:

  - You are about to drop the column `doj` on the `employee_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee_details" DROP COLUMN "doj",
ALTER COLUMN "dob" SET DATA TYPE TEXT;
