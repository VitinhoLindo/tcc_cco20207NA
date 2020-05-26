DROP TABLE IF EXISTS `Funcao`;
CREATE TABLE IF NOT EXISTS `Funcao` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(200) NOT NULL,
    `atuacao` VARCHAR(20) NOT NULL,
    `nivel_acesso` INT NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `ContratoFuncionario`;
CREATE TABLE IF NOT EXISTS `ContratoFuncionario` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `carteira_trabalho` BIGINT(14) NOT NULL,
    `data_admissao` DATE NOT NULL,
    `data_demissao` DATE,
    `valor_contrato` DECIMAL(12,6),
    `funcao` BIGINT(24) NOT NULL,
    `arquivo` BIGINT(24),
    PRIMARY KEY(`id`),
    UNIQUE KEY `carteira_trabalho`(`carteira_trabalho`),
    CONSTRAINT `funcionario_funcao_id` FOREIGN KEY(`funcao`) REFERENCES `Funcao`(`id`),
    CONSTRAINT `funcionario_arquivo_id` FOREIGN KEY(`arquivo`) REFERENCES `Arquivo`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Marca`;
CREATE TABLE IF NOT EXISTS `Marca` (
    `id` BIGINT(24) NOT NULL,
	`nome` VARCHAR(220) NOT NULL,
    `logo` BIGINT(24) NOT NULL,
	PRIMARY KEY (`id`),
    UNIQUE KEY(`logo`),
    CONSTRAINT (`marca_id`) FOREIGN KEY(`id`) REFERENCES `PessoaJuridica`(`id`)
    CONSTRAINT `marca_logo_id` FOREIGN KEY(`logo`) REFERENCES `Arquivo`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Filial`;
CREATE TABLE IF NOT EXISTS `Filial` (
	`id` BIGINT(24) NOT NULL,
    `descricao` VARCHAR(220) NOT NULL,
    `contato` BIGINT(24) NOT NULL,
    `endereco` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `filial_id` FOREIGN KEY(`id`) REFERENCES `PessoaJuridica`(`id`),
    CONSTRAINT `filial_contato_id` FOREIGN KEY(`contato`) REFERENCES `Contato`(`id`),
    CONSTRAINT `filial_endereco_id` FOREIGN KEY(`endereco`) REFERENCES `Endereco`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Terceirizada`;
CREATE TABLE IF NOT EXISTS `Terceirizada` (
	`id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `servico` VARCHAR(220) NOT NULL,
    `contato` BIGINT(24) NOT NULL,
    `endereco` BIGINT(24) NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `terceirizada_contato_id` FOREIGN KEY(`contato`) REFERENCES `Contato`(`id`),
    CONSTRAINT `terceirizada_endereco_id` FOREIGN KEY(`endereco`) REFERENCES `Endereco`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `Funcionario`;
CREATE TABLE IF NOT EXISTS `Funcionario` (
	`id` BIGINT(24) NOT NULL
    
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

/*
LOCK TABLES `PessoaFisica` WRITE;
ALTER TABLE `PessoaFisica` DISABLE KEYS;
UNLOCK TABLES;
LOCK TABLES `PessoaFisica` WRITE;
ALTER TABLE `PessoaFisica` DISABLE KEYS;
UNLOCK TABLES;

LOCK TABLES `PessoaFisica` WRITE;
ALTER TABLE `PessoaFisica` ENABLE KEYS;
UNLOCK TABLES;

LOCK TABLES `PessoaJuridica` WRITE;
ALTER TABLE `PessoaFisica` ENABLE KEYS;
UNLOCK TABLES;
*/