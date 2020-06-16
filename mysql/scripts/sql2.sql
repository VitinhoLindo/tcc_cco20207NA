USE `optica`;
#
SET FOREIGN_KEY_CHECKS=0;
#
DROP TABLE IF EXISTS `Funcao`;
CREATE TABLE IF NOT EXISTS `Funcao` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(200) NOT NULL,
    `atuacao` VARCHAR(20) NOT NULL,
    `nivel_acesso` INT NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `ContratoFuncionario`;
CREATE TABLE IF NOT EXISTS `ContratoFuncionario` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `carteira_trabalho` TEXT NOT NULL,
    `data_admissao` DATE NOT NULL,
    `data_demissao` DATE,
    `valor_contrato` DECIMAL(12,6),
    `funcao` BIGINT(24) NOT NULL,
    `arquivo` BIGINT(24) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`funcao`) REFERENCES `Funcao`(`id`),
    FOREIGN KEY(`arquivo`) REFERENCES `Arquivo`(`id`) ON DELETE SET NULL
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `Marca`;
CREATE TABLE IF NOT EXISTS `Marca` (
    `id` BIGINT(24) NOT NULL,
	`nome` VARCHAR(220) NOT NULL,
    `logo` BIGINT(24) NOT NULL,
	PRIMARY KEY (`id`),
    UNIQUE KEY(`logo`),
    FOREIGN KEY(`id`) REFERENCES `PessoaJuridica`(`id`),
    FOREIGN KEY(`logo`) REFERENCES `Arquivo`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `Filial`;
CREATE TABLE IF NOT EXISTS `Filial` (
	`id` BIGINT(24) NOT NULL,
    `descricao` VARCHAR(220) NOT NULL,
    `contato` BIGINT(24) NOT NULL,
    `endereco` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`id`) REFERENCES `PessoaJuridica`(`id`),
    FOREIGN KEY(`contato`) REFERENCES `Contato`(`id`),
    FOREIGN KEY(`endereco`) REFERENCES `Endereco`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
DROP TABLE IF EXISTS `Terceirizada`;
CREATE TABLE IF NOT EXISTS `Terceirizada` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `servico` VARCHAR(220) NOT NULL,
    `contato` BIGINT(24) NOT NULL,
    `endereco` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`id`) REFERENCES `PessoaJuridica`(`id`),
    FOREIGN KEY(`contato`) REFERENCES `Contato`(`id`),
    FOREIGN KEY(`endereco`) REFERENCES `Endereco`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
#
SET FOREIGN_KEY_CHECKS=1;