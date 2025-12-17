-- CreateTable
CREATE TABLE `hosts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,
    `prenom` VARCHAR(100) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `telephone` VARCHAR(30) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uq_hosts_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biens` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `host_id` INTEGER UNSIGNED NOT NULL,
    `titre` VARCHAR(200) NOT NULL,
    `imagePath` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `ecozone_id` INTEGER UNSIGNED NOT NULL,
    `type_id` INTEGER UNSIGNED NOT NULL,
    `prix_par_nuit` DECIMAL(10, 2) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_biens_ecozone`(`ecozone_id`),
    INDEX `idx_biens_host`(`host_id`),
    INDEX `idx_biens_type`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biens_chambre` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `biens_id` INTEGER UNSIGNED NOT NULL,
    `label` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `nombre` INTEGER NULL DEFAULT 1,

    INDEX `idx_chambre_biens`(`biens_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biens_ecozone` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(120) NOT NULL,
    `description` VARCHAR(255) NULL,

    UNIQUE INDEX `uq_biens_ecozone_label`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biens_type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `uq_biens_type_label`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demande` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `biens_id` INTEGER UNSIGNED NOT NULL,
    `guest_nom` VARCHAR(100) NOT NULL,
    `guest_prenom` VARCHAR(100) NOT NULL,
    `guest_email` VARCHAR(255) NOT NULL,
    `guest_phone` VARCHAR(50) NULL,
    `message` TEXT NULL,
    `date_debut` DATE NULL,
    `date_fin` DATE NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `email_status` ENUM('queued', 'sent', 'failed') NULL DEFAULT 'queued',

    INDEX `idx_demande_biens`(`biens_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `biens` ADD CONSTRAINT `fk_biens_ecozone` FOREIGN KEY (`ecozone_id`) REFERENCES `biens_ecozone`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `biens` ADD CONSTRAINT `fk_biens_host` FOREIGN KEY (`host_id`) REFERENCES `hosts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `biens` ADD CONSTRAINT `fk_biens_type` FOREIGN KEY (`type_id`) REFERENCES `biens_type`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `biens_chambre` ADD CONSTRAINT `fk_chambre_biens` FOREIGN KEY (`biens_id`) REFERENCES `biens`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `demande` ADD CONSTRAINT `fk_demande_biens` FOREIGN KEY (`biens_id`) REFERENCES `biens`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
