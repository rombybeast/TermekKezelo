-- CreateTable
CREATE TABLE `Termek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(255) NOT NULL,
    `ar` INTEGER NOT NULL,
    `raktariDarabszam` INTEGER NOT NULL DEFAULT 0,
    `szin` VARCHAR(50) NOT NULL,
    `ertekeles` INTEGER NOT NULL DEFAULT 0,
    `kiadasEve` INTEGER NOT NULL,
    `publikalt` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
