CREATE TABLE IF NOT EXISTS `Produtos`(
  `Id_Produto` INT PRIMARY KEY AUTO_INCREMENT,
  `Codigo_Produto` INT NOT NULL,
  `Marca` INT NOT NULL,
  `Modelo` VARCHAR(50),
  `Caracteristica` VARCHAR(50),
  `Sexo` VARCHAR(50),
  `Observacao` TEXT,
  FOREIGN KEY(`Marca`) REFERENCES `Marcas`(`Id_Marca`)
);
#
CREATE TABLE IF NOT EXISTS `Pedidos`(
  `Id_Pedido` INT AUTO_INCREMENT PRIMARY KEY,
  `Estoque` INT NOT NULL,
  `Financeiro` INT NOT NULL,
  `Produto` INT NOT NULL,
  `Qtd` INT NOT NULL,
  `Data_Pedido` DATE NOT NULL,
  FOREIGN KEY(`Estoque`) REFERENCES `Estoque`(`Id_Estoque`),
  FOREIGN KEY(`Financeiro`) REFERENCES `Financeiro`(`Id_Financeiro`),
  FOREIGN KEY(`Produto`) REFERENCES `Produtos`(`Id_Produto`)
);
#
CREATE TABLE IF NOT EXISTS `Lotes`(
  `Id_Lote` INT PRIMARY KEY AUTO_INCREMENT,
  `Pedido` INT NOT NULL,
  `Produto` INT NOT NULL,
  `Estoque` INT NOT NULL,
  `Data_Compra` DATE NOT NULL,
  `Quantidade` INT NOT NULL,
  `Valor_Compra_Unitario` DECIMAL NOT NULL,
  `Valor_Compra_Total` DECIMAL NOT NULL,
  `Valor_Venda_Unitario` DECIMAL NOT NULL,
  `Valor_Venda_Total` DECIMAL NOT NULL,
  `File` INT,
  FOREIGN KEY(`Pedido`) REFERENCES `Pedidos`(`Id_Pedido`),
  FOREIGN KEY(`Produto`) REFERENCES `Produtos`(`Id_Produto`),
  FOREIGN KEY(`Estoque`) REFERENCES `Estoque`(`Id_Estoque`),
  FOREIGN KEY(`File`) REFERENCES `Files`(`Id_File`)
);
#
CREATE TABLE IF NOT EXISTS `Compras`(
  `Id_Compra` INT PRIMARY KEY AUTO_INCREMENT,
  `Financeiro` INT NOT NULL, 
  `Cliente` INT NOT NULL,
  `Funcionario` INT NOT NULL,
  `Produto` INT NOT NULL,
  `Data` DATE NOT NULL,
  FOREIGN KEY(`Financeiro`) REFERENCES `Financeiro`(`Id_Financeiro`),
  FOREIGN KEY(`Produto`) REFERENCES `Lotes`(`Produto`),
  FOREIGN KEY(`Cliente`) REFERENCES `Clientes`(`Id_Cliente`),
  FOREIGN KEY(`Funcionario`) REFERENCES `Funcionarios`(`Id_Funcionario`)
);
#
CREATE TABLE IF NOT EXISTS `Fluxos`(
  `Id_Fluxo` INT PRIMARY KEY AUTO_INCREMENT,
  `Financeiro` INT NOT NULL,
  `Fluxo` INT NOT NULL,
  `Data` DATE NOT NULL,
  `Especificacao` TEXT,
  `Comprovante` INT,
  FOREIGN KEY(`Financeiro`) REFERENCES `Financeiro`(`Id_Financeiro`),
  FOREIGN KEY(`Comprovante`) REFERENCES `Files`(`Id_File`)
);
#
CREATE TABLE IF NOT EXISTS `Saida_Financeira`(
  `Id_Saida` INT AUTO_INCREMENT,
  `Financeiro` INT NOT NULL,
  `Valor` DECIMAL NOT NULL,
  `Data_Pagamento` DATE NOT NULL,
  `Especificacao` TEXT,
  `Conta` BIGINT,
  `Comprovante` INT,
  PRIMARY KEY(`Id_Saida`),
  FOREIGN KEY(`Financeiro`) REFERENCES `Financeiro`(`Id_Financeiro`),
  FOREIGN KEY(`Comprovante`) REFERENCES `Files`(`Id_File`)
);
#
CREATE TABLE IF NOT EXISTS `Entrada_Financeira`(
  `Id_Entrada` INT AUTO_INCREMENT,
  `Financeiro` INT NOT NULL,
  `Valor` DECIMAL NOT NULL,
  `Data_Pagamento` DATE NOT NULL,
  `Especificacao` TEXT,
  `Conta` BIGINT,
  `Comprovante` INT,
  PRIMARY KEY(`Id_Entrada`),
  FOREIGN KEY(`Financeiro`) REFERENCES `Financeiro`(`Id_Financeiro`),
  FOREIGN KEY(`Comprovante`) REFERENCES `Files`(`Id_File`)
);