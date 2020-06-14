USE `optica`;

SET FOREIGN_KEY_CHECKS=0;
#
DROP TABLE IF EXISTS `Acesso`;
CREATE TABLE IF NOT EXISTS `Acesso`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(220) NOT NULL,
    `senha` VARCHAR(220) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY(`login`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Fardamento`;
CREATE TABLE IF NOT EXISTS `Fardamento`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `camiseta` VARCHAR(20) NOT NULL,
    `calca` VARCHAR(20) NOT NULL,
    `sapato` VARCHAR(20) NOT NULL,
    `informacao_adicional` TEXT,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Funcionario`;
CREATE TABLE IF NOT EXISTS `Funcionario`(
	`id` BIGINT(24) NOT NULL,
	`contrato` BIGINT(24) NOT NULL,
    `lotacao` BIGINT(24) NOT NULL,
    `contato` BIGINT(24) NOT NULL,
    `endereco` BIGINT(24) NOT NULL,
    `acesso` BIGINT(24) NOT NULL,
    `fardamento` BIGINT(24),
    PRIMARY KEY(`id`),
    UNIQUE KEY(`id`),
    UNIQUE KEY(`contrato`),
    UNIQUE KEY(`acesso`),
    FOREIGN KEY(`id`) REFERENCES `PessoaFisica`(`id`),
    FOREIGN KEY(`contrato`) REFERENCES `ContratoFuncionario`(`id`),
    FOREIGN KEY(`lotacao`) REFERENCES `Filial`(`id`),
    FOREIGN KEY(`contato`) REFERENCES `Contato`(`id`),
    FOREIGN KEY(`endereco`) REFERENCES `Endereco`(`id`),
    FOREIGN KEY(`acesso`) REFERENCES `Acesso`(`id`),
    FOREIGN KEY(`fardamento`) REFERENCES `Fardamento`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Financeiro`;
CREATE TABLE IF NOT EXISTS `Financeiro`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `filial` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`filial`) REFERENCES `Filial`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Estoque`;
CREATE TABLE IF NOT EXISTS `Estoque`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `filial` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`filial`) REFERENCES `Filial`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Cliente`;
CREATE TABLE IF NOT EXISTS `Cliente`(
	`id` BIGINT(24) NOT NULL,
    `contato` BIGINT(24) NOT NULL,
    `endereco` BIGINT(24) NOT NULL,
    `perfil` BIGINT(24),
    PRIMARY KEY(`id`),
    UNIQUE KEY(`id`),
    FOREIGN KEY(`id`) REFERENCES `PessoaFisica`(`id`),
    FOREIGN KEY(`contato`) REFERENCES `Contato`(`id`),
    FOREIGN KEY(`endereco`) REFERENCES `Endereco`(`id`),
    FOREIGN KEY(`perfil`) REFERENCES `Arquivo`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
DROP TABLE IF EXISTS `Receita`;
CREATE TABLE IF NOT EXISTS `Receita`(
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `cadastro` BIGINT(24) NOT NULL,
    `receita` BIGINT(24) NOT NULL,
    `data` DATE,
	`olho_direito_longe_esferico` DECIMAL(5,4),
   	`olho_direito_longe_cilindrido` DECIMAL(5,4),
	`olho_direito_longe_eixo` DECIMAL(5,4),
  	`olho_direito_longe_dp` DECIMAL(5,4),
	`olho_direito_perto_esferico` DECIMAL(5,4),
   	`olho_direito_perto_cilindrido` DECIMAL(5,4),
	`olho_direito_perto_eixo` DECIMAL(5,4),
  	`olho_direito_perto_dp` DECIMAL(5,4),
	`olho_esquerdo_longe_esferico` DECIMAL(5,4),
   	`olho_esquerdo_longe_cilindrido` DECIMAL(5,4),
	`olho_esquerdo_longe_eixo` DECIMAL(5,4),
  	`olho_esquerdo_longe_dp` DECIMAL(5,4),
	`olho_esquerdo_perto_esferico` DECIMAL(5,4),
   	`olho_esquerdo_perto_cilindrido` DECIMAL(5,4),
	`olho_esquerdo_perto_eixo` DECIMAL(5,4),
  	`olho_esquerdo_perto_dp` DECIMAL(5,4),
    PRIMARY KEY(`id`),
    UNIQUE KEY(`cadastro`),
    UNIQUE KEY(`receita`),
    FOREIGN KEY(`cadastro`) REFERENCES `PessoaFisica`(`id`),
    FOREIGN KEY(`receita`) REFERENCES `Arquivo`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
#
SET FOREIGN_KEY_CHECKS=1;