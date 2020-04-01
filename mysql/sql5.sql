USE `optica`;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `PedidoArmacao`;
CREATE TABLE IF NOT EXISTS `PedidoArmacao`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `data` DATE NOT NULL,
    `quantidade` INT NOT NULL,
    `armacao` BIGINT(24) NOT NULL,
    `financeiro` BIGINT(24) NOT NULL,
    `estoque` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`armacao`) REFERENCES `Armacao`(`id`),
    FOREIGN KEY(`financeiro`) REFERENCES `Financeiro`(`id`),
    FOREIGN KEY(`estoque`) REFERENCES `Estoque`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Lote`;
CREATE TABLE IF NOT EXISTS `Lote`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `data` DATE NOT NULL,
    `quantidade` INT NOT NULL,
    `pedido` BIGINT(24) NOT NULL,
    `saida_financeira` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`pedido`) REFERENCES `PedidoArmacao`(`id`),
    FOREIGN KEY(`saida_financeira`) REFERENCES `SaidaFinanceira`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `PedidoLente`;
CREATE TABLE IF NOT EXISTS `PedidoLente`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `data` DATE NOT NULL,
    `quantidade` INT NOT NULL,
    `lente` BIGINT(24) NOT NULL,
    `financeiro` BIGINT(24) NOT NULL,
    `saida_financeira` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`lente`) REFERENCES `Lente`(`id`),
    FOREIGN KEY(`financeiro`) REFERENCES `Financeiro`(`id`),
    FOREIGN KEY(`saida_financeira`) REFERENCES `SaidaFinanceira`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Compra`;
CREATE TABLE IF NOT EXISTS `Compra`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `data` DATE NOT NULL,
    `cliente` BIGINT(24) NOT NULL,
    `funcionario` BIGINT(24) NOT NULL,
    `armacao` BIGINT(24) NOT NULL,
    `lente` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
	FOREIGN KEY(`cliente`) REFERENCES `Cliente`(`id`),
	FOREIGN KEY(`funcionario`) REFERENCES `Funcionario`(`id`),
    FOREIGN KEY(`armacao`) REFERENCES `Armacao`(`id`),
    FOREIGN KEY(`lente`) REFERENCES `Lente`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `EntradaFinanceira`;
CREATE TABLE IF NOT EXISTS `EntradaFinanceira`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(12,4) NOT NULL,
    `data` DATE NOT NULL,
    `especificacao` TEXT NOT NULL,
    `financeiro` BIGINT(24) NOT NULL,
    `compra` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
	FOREIGN KEY(`financeiro`) REFERENCES `Financeiro`(`id`),
    FOREIGN KEY(`compra`) REFERENCES `Compra`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `OrdemServico`;
CREATE TABLE IF NOT EXISTS `OrdemServico`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `data_envio` DATE NOT NULL,
    `data_recebimento` DATE,
    `saida_financeira` BIGINT(24) NOT NULL,
    `compra` BIGINT(24) NOT NULL,
    `terceirizada` BIGINT(24) NOT NULL,
    `receita` BIGINT(24) NOT NULL,
    `pedido_lente` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
	FOREIGN KEY(`saida_financeira`) REFERENCES `SaidaFinanceira`(`id`),
	FOREIGN KEY(`compra`) REFERENCES `Compra`(`id`),
    FOREIGN KEY(`terceirizada`) REFERENCES `Terceirizada`(`id`),
    FOREIGN KEY(`receita`) REFERENCES `Receita`(`id`),
    FOREIGN KEY(`pedido_lente`) REFERENCES `PedidoLente`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Entregue`;
CREATE TABLE IF NOT EXISTS `Entregue`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
	`data` DATE NOT NULL,
    `ordem_servico` BIGINT(24) NOT NULL,
    `compra` BIGINT(24) NOT NULL,
    `funcionario` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`ordem_servico`) REFERENCES `OrdemServico`(`id`),
    FOREIGN KEY(`compra`) REFERENCES `Compra`(`id`),
    FOREIGN KEY(`funcionario`) REFERENCES `Funcionario`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

SET FOREIGN_KEY_CHECKS=1;