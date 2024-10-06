/*
  Warnings:

  - Added the required column `authorId` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Blogs` ADD COLUMN `authorId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Blogs` ADD CONSTRAINT `Blogs_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
