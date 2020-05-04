CREATE TABLE IF NOT EXISTS `Terceirizada`(
  `Id_Empresa` INT NOT NULL,
  `Servico` VARCHAR(90) NOT NULL,
PRIMARY KEY(`Id_Empresa`),
FOREIGN KEY(`Id_Empresa`) REFERENCES `Pessoas_Juridicas`(`Id_Juridica`)
);
#
CREATE TABLE IF NOT EXISTS `Ordem_Servico` (
  `Id_OS` INT AUTO_INCREMENT,
  `Terceirizada` INT NOT NULL,
  `Compra` INT NOT NULL,
  `Receita` INT NOT NULL,
  `Data_Envio` DATE NOT NULL,
  `Data_Retorno` DATE,
  `Custo` INT,
PRIMARY KEY(`Id_OS`),
FOREIGN KEY(`Terceirizada`) REFERENCES `Terceirizada`(`Id_Empresa`),
FOREIGN KEY(`Compra`) REFERENCES `Compras`(`Id_Compra`),
FOREIGN KEY(`Receita`) REFERENCES `Receitas`(`Id_Receita`),
FOREIGN KEY(`Custo`) REFERENCES `Saida_Financeira`(`Id_Saida`)
);
#
CREATE TABLE IF NOT EXISTS `Entregues`(
  `Id_Entrega` INT AUTO_INCREMENT,
  `Compra` INT NOT NULL,
  `Cliente` INT NOT NULL,
  `Funcionario` INT NOT NULL,
  `OS` INT NOT NULL,
  `Receita` INT NOT NULL,
  `Data` DATE NOT NULL,
PRIMARY KEY(`Id_Entrega`),
FOREIGN KEY(`Compra`) REFERENCES `Compras`(`Id_Compra`),
FOREIGN KEY(`Cliente`) REFERENCES `Clientes`(`Id_Cliente`),
FOREIGN KEY(`Funcionario`) REFERENCES `Funcionarios`(`Id_Funcionario`),
FOREIGN KEY(`OS`) REFERENCES `Ordem_Servico`(`Id_OS`),
FOREIGN KEY(`Receita`) REFERENCES `Receitas`(`Id_Receita`)
);