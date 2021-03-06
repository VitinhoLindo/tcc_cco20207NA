USE `optica`;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `AlterarSenha`;
CREATE TABLE IF NOT EXISTS `AlterarSenha`(
    `id` BIGINT(24) NOT NULL AUTO_INCREMENT,
    `acesso` BIGINT(24) NOT NULL,
    `code` BIGINT(6) NOT NULL,
    `usaged_at` DATETIME,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`acesso`) REFERENCES `Acesso`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS=1;