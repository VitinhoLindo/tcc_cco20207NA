CREATE TABLE IF NOT EXISTS `Clientes`(
  `Id_Cliente` INT PRIMARY KEY NOT NULL,
  `Contato` INT NOT NULL,
  `Endereco` INT NOT NULL,
  `Profile` INT,
  FOREIGN KEY(`Id_Cliente`) REFERENCES `Pessoas_Fisicas`(`Id_Pessoal`),
  FOREIGN KEY(`Contato`) REFERENCES `Contatos`(`Id_Contato`),
  FOREIGN KEY(`Endereco`) REFERENCES `Enderecos`(`Id_Endereco`),
  FOREIGN KEY(`Profile`) REFERENCES `Files`(`Id_File`)
);
#
CREATE TABLE IF NOT EXISTS `Filiais`(
  `Id_Empresa` INT PRIMARY KEY,
  `Classificacao` VARCHAR(90) NOT NULL,
  `Contato` INT NOT NULL,
  `Endereco` INT NOT NULL,
  `Logo` INT,
  FOREIGN KEY(`Id_Empresa`) REFERENCES `Pessoas_Juridicas`(`Id_Juridica`),
  FOREIGN KEY(`Contato`) REFERENCES `Contatos`(`Id_Contato`),
  FOREIGN KEY(`Endereco`) REFERENCES `Enderecos`(`Id_Endereco`),
  FOREIGN KEY(`Logo`) REFERENCES `Files`(`Id_File`)
);
#
CREATE TABLE IF NOT EXISTS `Marcas`(
  `Id_Marca` INT PRIMARY KEY AUTO_INCREMENT,
  `Nome` VARCHAR(90) NOT NULL,
  `Fornecedor` INT NOT NULL,
  `Logo` INT,
  FOREIGN KEY(`Fornecedor`) REFERENCES `Pessoas_Juridicas`(`Id_Juridica`),
  FOREIGN KEY(`Logo`) REFERENCES `Files`(`Id_File`)
);
#
CREATE TABLE IF NOT EXISTS `Fardamentos`(
  `Id_Fardamento` INT AUTO_INCREMENT PRIMARY KEY,
  `Camiseta` VARCHAR(20),
  `Calca` VARCHAR(20),
  `Sapato` VARCHAR(20),
  `Inf_Adicinal` TEXT
);
#
CREATE TABLE IF NOT EXISTS `Atuacoes`(
  `Id_Atuacao` INT AUTO_INCREMENT PRIMARY KEY,
  `Atuacao` VARCHAR(50) NOT NULL
);
#
CREATE TABLE IF NOT EXISTS `Funcao`(
  `Id_Funcao` INT PRIMARY KEY AUTO_INCREMENT,
  `Funcao` VARCHAR(90) NOT NULL,
  `Atuacao` INT NOT NULL,
  `Nivel_Acesso` INT NOT NULL,
  FOREIGN KEY(`Atuacao`) REFERENCES `Atuacoes`(`Id_Atuacao`)
);
#
CREATE TABLE IF NOT EXISTS `Funcionarios`(
  `Id_Funcionario` INT PRIMARY KEY,
  `Carteira_Trabalho` BIGINT NOT NULL,
  `Funcao` INT NOT NULL,
  `Lotacao` INT NOT NULL,
  `Fardamento` INT,
  `Contato` INT NOT NULL,
  `Endereco` INT NOT NULL,
  `Profile` INT,
  FOREIGN KEY(`Id_Funcionario`) REFERENCES `Pessoas_Fisicas`(`Id_Pessoal`),
  FOREIGN KEY(`Funcao`) REFERENCES `Funcao`(`Id_Funcao`),
  FOREIGN KEY(`Lotacao`) REFERENCES `Filiais`(`Id_Empresa`),
  FOREIGN KEY(`Fardamento`) REFERENCES `Fardamentos`(`Id_Fardamento`),
  FOREIGN KEY(`Contato`) REFERENCES `Contatos`(`Id_Contato`),
  FOREIGN KEY(`Endereco`) REFERENCES `Enderecos`(`Id_Endereco`),
  FOREIGN KEY(`Profile`) REFERENCES `Files`(`Id_File`)
);