CREATE TABLE IF NOT EXISTS `Financeiro`(
  `Id_Financeiro` INT PRIMARY KEY AUTO_INCREMENT,
  `Filial` INT NOT NULL,
  FOREIGN KEY(`Filial`) REFERENCES `Filiais`(`Id_Empresa`) 
);
#
CREATE TABLE IF NOT EXISTS `Estoque`(
  `Id_Estoque` INT PRIMARY  KEY AUTO_INCREMENT,
  `Filial` INT NOT NULL,
  FOREIGN KEY(`Filial`) REFERENCES `Filiais`(`Id_Empresa`)
);
#
CREATE TABLE IF NOT EXISTS `Receitas`(
  `Id_Receita` INT AUTO_INCREMENT PRIMARY KEY,
  `Cadastro` INT NOT NULL,
  `Olho_Direito_Longe_Esferico` DECIMAL,
  `Olho_Direito_Longe_Cilindrico` DECIMAL,
  `Olho_Direito_Longe_Eixo` DECIMAL,
  `Olho_Direito_Longe_Dp` DECIMAL,
  `Olho_Direito_Perto_Esferico` DECIMAL,
  `Olho_Direito_Perto_Cilindrico` DECIMAL,
  `Olho_Direito_Perto_Eixo` DECIMAL,
  `Olho_Direito_Perto_Dp` DECIMAL,
  `Olho_Esquerdo_Longe_Esferico` DECIMAL,
  `Olho_Esquerdo_Longe_Cilindrico` DECIMAL,
  `Olho_Esquerdo_Longe_Eixo` DECIMAL,
  `Olho_Esquerdo_Longe_Dp` DECIMAL,
  `Olho_Esquerdo_Perto_Esferico` DECIMAL,
  `Olho_Esquerdo_Perto_Cilindrico` DECIMAL,
  `Olho_Esquerdo_Perto_Eixo` DECIMAL,
  `Olho_Esquerdo_Perto_Dp`  DECIMAL,
  FOREIGN KEY(`Cadastro`) REFERENCES `Clientes`(`Id_Cliente`)
);
#
CREATE TABLE IF NOT EXISTS `Acessos`(
  `Id_Login` INT PRIMARY KEY AUTO_INCREMENT,
  `Cadastro` INT NOT NULL,
  `Login` VARCHAR(50),
  `Senha` VARCHAR(50),
  FOREIGN KEY(`Cadastro`) REFERENCES `Funcionarios`(`Id_Funcionario`)
);
#
CREATE TABLE IF NOT EXISTS `Folha_Pagamento` (
  `Id_Folha` INT PRIMARY KEY AUTO_INCREMENT,
  `Financeiro` INT NOT NULL,
  `Funcionario` INT NOT NULL,
  FOREIGN KEY(`Funcionario`) REFERENCES `Funcionarios`(`Id_Funcionario`),
  FOREIGN KEY(`Financeiro`) REFERENCES `Financeiro`(`Id_Financeiro`)
);
#
CREATE TABLE IF NOT EXISTS `Contas`(
  `Id_Conta` INT PRIMARY KEY AUTO_INCREMENT,
  `Financeiro` INT NOT NULL,
  `Codigo` BIGINT,
  `Especificacao` TEXT,
  `Valor` DECIMAL NOT NULL,
  `Data_Cadastro` DATE NOT NULL,
  `Data_Vencimento` DATE NOT NULL,
  `File` INT,
  FOREIGN KEY(`Financeiro`) REFERENCES `Financeiro`(`Id_Financeiro`),
  FOREIGN KEY(`File`) REFERENCES `Files`(`Id_File`)
);