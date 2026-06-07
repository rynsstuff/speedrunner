/*
  Warnings:

  - Made the column `user_id` on table `runs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `runs` MODIFY `user_id` VARCHAR(35) NOT NULL;
