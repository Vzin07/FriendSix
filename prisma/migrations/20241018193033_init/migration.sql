-- CreateTable
CREATE TABLE `categoria` (
    `CAT_CODIGO` INTEGER UNSIGNED NOT NULL,
    `CAT_TIPO` ENUM('EVENTO', 'GRUPO', 'TODOS') NOT NULL,
    `CAT_NOME` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`CAT_CODIGO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `EVE_CODIGO` INTEGER UNSIGNED NOT NULL,
    `EVE_DATA` DATETIME(0) NOT NULL,
    `EVE_LOCAL` VARCHAR(512) NOT NULL,
    `EVE_NOME` VARCHAR(45) NOT NULL,
    `EVE_QUANTIDADE_DE_PARTICIPANTES` INTEGER NOT NULL,
    `EVE_CAT_CODIGO` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `EVE_CODIGO_UNIQUE`(`EVE_CODIGO`),
    INDEX `fk_EVENTO_CATEGORIA1_idx`(`EVE_CAT_CODIGO`),
    PRIMARY KEY (`EVE_CODIGO`, `EVE_CAT_CODIGO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupo` (
    `GRU_CODIGO` INTEGER NOT NULL AUTO_INCREMENT,
    `GRU_NOME` VARCHAR(45) NOT NULL,
    `GRU_CAT_CODIGO` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `grupo_GRU_CODIGO_key`(`GRU_CODIGO`),
    INDEX `fk_GRUPO_CATEGORIA1_idx`(`GRU_CAT_CODIGO`),
    PRIMARY KEY (`GRU_CODIGO`, `GRU_CAT_CODIGO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos_dos_eventos` (
    `GDE_EVE_CODIGO` INTEGER UNSIGNED NOT NULL,
    `GDE_GRU_CODIGO` INTEGER NOT NULL,

    INDEX `fk_EVENTOS_has_GRUPO_EVENTOS1_idx`(`GDE_EVE_CODIGO`),
    INDEX `fk_EVENTOS_has_GRUPO_GRUPO1_idx`(`GDE_GRU_CODIGO`),
    PRIMARY KEY (`GDE_EVE_CODIGO`, `GDE_GRU_CODIGO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `USU_CODIGO` INTEGER NOT NULL AUTO_INCREMENT,
    `USU_TELEFONE` VARCHAR(11) NOT NULL,
    `USU_NOME` VARCHAR(60) NOT NULL,
    `USU_SENHA` VARCHAR(100) NOT NULL,
    `USU_EMAIL` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `USU_COD_UNIQUE`(`USU_CODIGO`),
    UNIQUE INDEX `USU_TELEFONE_UNIQUE`(`USU_TELEFONE`),
    UNIQUE INDEX `USU_EMAIL_UNIQUE`(`USU_EMAIL`),
    PRIMARY KEY (`USU_CODIGO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_dos_eventos` (
    `UDE_USU_CODIGO` INTEGER NOT NULL,
    `UDE_EVE_CODIGO` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_USUARIO_has_EVENTO_EVENTO1_idx`(`UDE_EVE_CODIGO`),
    INDEX `fk_USUARIO_has_EVENTO_USUARIO1_idx`(`UDE_USU_CODIGO`),
    PRIMARY KEY (`UDE_USU_CODIGO`, `UDE_EVE_CODIGO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_dos_grupos` (
    `UDG_USU_CODIGO` INTEGER NOT NULL,
    `UDG_GRU_CODIGO` INTEGER NOT NULL,

    INDEX `fk_USUARIO_has_GRUPO_GRUPO1_idx`(`UDG_GRU_CODIGO`),
    INDEX `fk_USUARIO_has_GRUPO_USUARIO_idx`(`UDG_USU_CODIGO`),
    PRIMARY KEY (`UDG_USU_CODIGO`, `UDG_GRU_CODIGO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `fk_EVENTO_CATEGORIA1` FOREIGN KEY (`EVE_CAT_CODIGO`) REFERENCES `categoria`(`CAT_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grupo` ADD CONSTRAINT `fk_GRUPO_CATEGORIA1` FOREIGN KEY (`GRU_CAT_CODIGO`) REFERENCES `categoria`(`CAT_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grupos_dos_eventos` ADD CONSTRAINT `fk_EVENTOS_has_GRUPO_EVENTOS1` FOREIGN KEY (`GDE_EVE_CODIGO`) REFERENCES `eventos`(`EVE_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grupos_dos_eventos` ADD CONSTRAINT `fk_EVENTOS_has_GRUPO_GRUPO1` FOREIGN KEY (`GDE_GRU_CODIGO`) REFERENCES `grupo`(`GRU_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_dos_eventos` ADD CONSTRAINT `fk_USUARIO_has_EVENTO_EVENTO1` FOREIGN KEY (`UDE_EVE_CODIGO`) REFERENCES `eventos`(`EVE_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_dos_eventos` ADD CONSTRAINT `fk_USUARIO_has_EVENTO_USUARIO1` FOREIGN KEY (`UDE_USU_CODIGO`) REFERENCES `usuarios`(`USU_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_dos_grupos` ADD CONSTRAINT `fk_USUARIO_has_GRUPO_GRUPO1` FOREIGN KEY (`UDG_GRU_CODIGO`) REFERENCES `grupo`(`GRU_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_dos_grupos` ADD CONSTRAINT `fk_USUARIO_has_GRUPO_USUARIO` FOREIGN KEY (`UDG_USU_CODIGO`) REFERENCES `usuarios`(`USU_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;