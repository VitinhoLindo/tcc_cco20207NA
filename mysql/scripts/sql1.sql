DROP DATABASE IF EXISTS `optica`;
CREATE DATABASE IF NOT EXISTS `optica` CHAR SET 'utf8mb4';
#
USE `optica`;
#
SET FOREIGN_KEY_CHECKS=0;
#
DROP TABLE IF EXISTS `PessoaFisica`;
CREATE TABLE IF NOT EXISTS `PessoaFisica` (
    `id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `cpf` TEXT NOT NULL,
    `rg` TEXT NOT NULL,
    `nome` VARCHAR(220) NOT NULL,
    `caracteristica` VARCHAR(120) NOT NULL,
    `sexo` VARCHAR(120) NOT NULL,
    `data_nascimento` DATE,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `PessoaJuridica`;
CREATE TABLE IF NOT EXISTS `PessoaJuridica` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `cnpj` TEXT NOT NULL,
	`razao_social` VARCHAR(220) NOT NULL,
    `fantazia` VARCHAR(220) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
	PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `Endereco`;
CREATE TABLE IF NOT EXISTS `Endereco` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `cep` BIGINT(18) NOT NULL,
    `pais` VARCHAR(120) NOT NULL,
    `estado` VARCHAR(120) NOT NULL,
    `cidade` VARCHAR(120) NOT NULL,
    `bairro` VARCHAR(120) NOT NULL,
    `endereco` VARCHAR(120) NOT NULL,
    `complemento` VARCHAR(220) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `Contato`;
CREATE TABLE IF NOT EXISTS `Contato` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `email` TEXT NOT NULL,
    `email_complementar` TEXT,
    `telefone_fixo` TEXT,
    `telefone_fixo_complementar` TEXT,
    `telefone_movel` TEXT NOT NULL,
	`telefone_movel_complementar` TEXT,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `Arquivo`;
CREATE TABLE IF NOT EXISTS `Arquivo` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,
    `extensao` VARCHAR(20) NOT NULL,
    `size` BIGINT(20) NOT NULL,
    `byte` LONGBLOB NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
SET FOREIGN_KEY_CHECKS=1;