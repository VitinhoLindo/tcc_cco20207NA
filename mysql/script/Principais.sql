CREATE TABLE IF NOT EXISTS `Files` (
  `Id_File` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `Nome` VARCHAR(90) NOT NULL, 
  `Extension` VARCHAR(30) NOT NULL, 
  `Length_File` BIGINT NOT NULL, 
  `Byte_File` LONGBLOB NOT NULL 
);
#
CREATE TABLE IF NOT EXISTS `Enderecos` (
  `Id_Endereco` INT AUTO_INCREMENT PRIMARY KEY,
  `Cep` BIGINT NOT NULL,
  `Pais` VARCHAR(50) NOT NULL,
  `Estado` VARCHAR(50) NOT NULL,
  `Cidade` VARCHAR(50) NOT NULL,
  `Bairro` VARCHAR(50) NOT NULL,
  `Endereco` VARCHAR(60) NOT NULL,
  `Complemento` VARCHAR(25) NOT NULL
);
#
CREATE TABLE IF NOT EXISTS `Contatos`(
  `Id_Contato` INT AUTO_INCREMENT PRIMARY KEY,
  `Email` VARCHAR(90) NOT NULL,
  `Email_Complementar` VARCHAR(90) NOT NULL,
  `Telefone_Fixo` BIGINT NOT NULL,
  `Telefone_Fixo_Complementar` BIGINT,
  `Telefone_Movel` BIGINT NOT NULL,
  `Telefone_Movel_Complementar` BIGINT NOT NULL
);
#
CREATE TABLE IF NOT EXISTS `Pessoas_Fisicas`(
  `Id_Pessoal` INT AUTO_INCREMENT PRIMARY KEY,
  `Cpf` BIGINT NOT NULL,
  `Rg` BIGINT NOT NULL,
  `Nome` VARCHAR(110) NOT NULL,
  `Caracteristica` VARCHAR(60) NOT NULL,
  `Sexo` VARCHAR(60) NOT NULL,
  `Data_Nascimento` DATE NOT NULL
);
#
CREATE TABLE IF NOT EXISTS `Pessoas_Juridicas`(
  `Id_Juridica` INT PRIMARY KEY AUTO_INCREMENT,
  `Cnpj` BIGINT NOT NULL,
  `Razao_Social` VARCHAR(90) NOT NULL,
  `Fantasia` VARCHAR(90)
);