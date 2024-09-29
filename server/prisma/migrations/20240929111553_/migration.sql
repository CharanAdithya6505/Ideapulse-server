-- DropIndex
DROP INDEX `Blogs_category_idx` ON `Blogs`;

-- AlterTable
ALTER TABLE `Blogs` MODIFY `image` VARCHAR(191) NULL;
