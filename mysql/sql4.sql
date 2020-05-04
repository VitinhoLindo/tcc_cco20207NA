USE `optica`;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Armacao`;
CREATE TABLE IF NOT EXISTS `Armacao`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(220) NOT NULL,
    `modelo` VARCHAR(220) NOT NULL,
    `caracteristica` VARCHAR(220) NOT NULL,
    `sexo` VARCHAR(220) NOT NULL,
    `observacao` TEXT,
	`valor_venda_unitario` DECIMAL(12,4),
    `marca` BIGINT(24),
    PRIMARY KEY(`id`),
	FOREIGN KEY(`marca`) REFERENCES `Marca`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Classificacao`;
CREATE TABLE IF NOT EXISTS `Classificacao`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(220) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Lente`;
CREATE TABLE IF NOT EXISTS `Lente`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(220) NOT NULL,
    `modelo` VARCHAR(220) NOT NULL,
    `material` VARCHAR(220) NOT NULL,
    `observacao` TEXT,
	`valor_venda_unitario` DECIMAL(12,4),
    `classificacao` INT NOT NULL,
    `marca` BIGINT(24),
    PRIMARY KEY(`id`),
 	FOREIGN KEY(`classificacao`) REFERENCES `Classificacao`(`id`),
	FOREIGN KEY(`marca`) REFERENCES `Marca`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
 
DROP TABLE IF EXISTS `SaidaFinanceira`;
CREATE TABLE IF NOT EXISTS `SaidaFinanceira`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(12,4) NOT NULL,
    `data` DATE NOT NULL,
    `especificacao` TEXT,
    `financeiro` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
 	FOREIGN KEY(`financeiro`) REFERENCES `Financeiro`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `FolhaPagamento`;
CREATE TABLE IF NOT EXISTS `FolhaPagamento`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `funcionario` BIGINT(24) NOT NULL,
    `saida_financeira` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
 	FOREIGN KEY(`funcionario`) REFERENCES `Funcionario`(`id`),
 	FOREIGN KEY(`saida_financeira`) REFERENCES `SaidaFinanceira`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

SET FOREIGN_KEY_CHECKS=1;