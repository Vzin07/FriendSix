/*
  Warnings:

  - You are about to alter the column `date` on the `events` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grupo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grupos_dos_eventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_dos_eventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_dos_grupos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `eventos` DROP FOREIGN KEY `fk_EVENTO_CATEGORIA1`;

-- DropForeignKey
ALTER TABLE `grupo` DROP FOREIGN KEY `fk_GRUPO_CATEGORIA1`;

-- DropForeignKey
ALTER TABLE `grupos_dos_eventos` DROP FOREIGN KEY `fk_EVENTOS_has_GRUPO_EVENTOS1`;

-- DropForeignKey
ALTER TABLE `grupos_dos_eventos` DROP FOREIGN KEY `fk_EVENTOS_has_GRUPO_GRUPO1`;

-- DropForeignKey
ALTER TABLE `usuarios_dos_eventos` DROP FOREIGN KEY `fk_USUARIO_has_EVENTO_EVENTO1`;

-- DropForeignKey
ALTER TABLE `usuarios_dos_eventos` DROP FOREIGN KEY `fk_USUARIO_has_EVENTO_USUARIO1`;

-- DropForeignKey
ALTER TABLE `usuarios_dos_grupos` DROP FOREIGN KEY `fk_USUARIO_has_GRUPO_GRUPO1`;

-- DropForeignKey
ALTER TABLE `usuarios_dos_grupos` DROP FOREIGN KEY `fk_USUARIO_has_GRUPO_USUARIO`;

-- AlterTable
ALTER TABLE `events` MODIFY `date` DATETIME NOT NULL;

-- DropTable
DROP TABLE `categoria`;

-- DropTable
DROP TABLE `eventos`;

-- DropTable
DROP TABLE `grupo`;

-- DropTable
DROP TABLE `grupos_dos_eventos`;

-- DropTable
DROP TABLE `usuarios`;

-- DropTable
DROP TABLE `usuarios_dos_eventos`;

-- DropTable
DROP TABLE `usuarios_dos_grupos`;
