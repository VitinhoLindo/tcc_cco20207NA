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
    `cpf` BIGINT(24) NOT NULL,
    `rg` BIGINT(20) NOT NULL,
    `nome` VARCHAR(220) NOT NULL,
    `caracteristica` VARCHAR(120) NOT NULL,
    `sexo` VARCHAR(120) NOT NULL,
    `data_nascimento` DATE,
    PRIMARY KEY (`id`),
    UNIQUE KEY `cpf` (`cpf`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `PessoaJuridica`;
CREATE TABLE IF NOT EXISTS `PessoaJuridica` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `cnpj` BIGINT(20) NOT NULL,
	`razao_social` VARCHAR(220) NOT NULL,
    `fantazia` VARCHAR(220) NOT NULL,
	PRIMARY KEY (`id`),
    UNIQUE KEY `cnpj`(`cnpj`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
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
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Contato`;
CREATE TABLE IF NOT EXISTS `Contato` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(220) NOT NULL,
    `email_complementar` VARCHAR(220) NOT NULL,
    `telefone_fixo` BIGINT(16),
    `telefone_fixo_complementar` BIGINT(16),
    `telefone_movel` BIGINT(20) NOT NULL,
	`telefone_movel_complementar` BIGINT(20) NOT NULL,
    PRIMARY KEY(`id`),
    UNIQUE KEY `email`(`email`),
    UNIQUE KEY `email_complementar`(`email_complementar`),
    UNIQUE KEY `telefone_movel`(`telefone_movel`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Arquivo`;
CREATE TABLE IF NOT EXISTS `Arquivo` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,
    `extensao` VARCHAR(20) NOT NULL,
    `size` BIGINT(20) NOT NULL,
    `byte` LONGBLOB NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
SET FOREIGN_KEY_CHECKS=1;