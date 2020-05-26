######################################################################################
INSERT INTO `Enderecos` VALUES
(null, 53441570, 'Brasil', 'Pernambuco', 'Paulista', 'Maranguape I','Rua 126','06b');
#
INSERT INTO `Contatos` VALUES
(null, 'victorpsf2@hotmail.com', 'victorpsf9@hotmail.com', 33721913, null, 81986186306, 81988605786);
#
INSERT INTO `Pessoas_Fisicas` VALUES
(null, 12691381463, 9110276, 'João Victor Palmeira da Silva Ferreira', 'Jovem', 'Masculino', '1997-10-06' );
#
INSERT INTO `Pessoas_Juridicas` VALUES
(null, 76972573465946593, 'Optica Focalli', null);
#####################################################################################
INSERT INTO `Enderecos` VALUES
(null, 53441570, 'Brasil', 'Pernambuco', 'Paulista', 'Maranguape I', 'Rua 127', '155a');
INSERT INTO `Contatos` VALUES
(null, 'optica_focalli@hotmail.com', 'optica_focalli@gmail.com', 33769914, null, 8199763115, 8198667433);
INSERT INTO `Filiais` (`Id_Empresa`,`Classificacao`,`Contato`,`Endereco`,`Logo`) VALUES
((SELECT `Pessoas_Juridicas`.`Id_Juridica` FROM `Pessoas_Juridicas` WHERE (`Cnpj`=76972573465946593)), 
'Optica',
(SELECT `Contatos`.`Id_Contato` FROM `Contatos` WHERE (`Email`='optica_focalli@hotmail.com')),
(SELECT `Enderecos`.`Id_Endereco` FROM `Enderecos` WHERE (`Cep`=53441570 && `Endereco`='Rua 127' && `Complemento`='155a')), null);
#####################################################################################
INSERT INTO `Atuacoes` VALUES
(null, 'Geral');
INSERT INTO `Funcao` VALUES
(null, 'Admin', (SELECT `Atuacoes`.`Id_Atuacao` FROM `Atuacoes` WHERE (`Atuacao`='Geral')), 0);
INSERT INTO `Funcionarios` (`Id_Funcionario`,`Carteira_Trabalho`,`Funcao`,`Lotacao`,`Fardamento`,`Contato`,`Endereco`,`Profile`) 
VALUES
((SELECT `Pessoas_Fisicas`.`Id_Pessoal` FROM `Pessoas_Fisicas` WHERE (`Cpf`=12691381463)),
1274639278562,
(SELECT `Funcao`.`Id_Funcao` FROM `Funcao` WHERE (`Funcao`='Admin')),
(SELECT `Filiais`.`Id_Empresa` FROM `Filiais` WHERE (`Classificacao`='Optica')),
null,
(SELECT `Contatos`.`Id_Contato` FROM `Contatos` WHERE (`Email`='victorpsf2@hotmail.com')),
(SELECT `Enderecos`.`Id_Endereco` FROM `Enderecos` WHERE (`Cep`=53441570 && `Endereco`='Rua 126' && `Complemento`='06b')),
null);
####################################################################################
INSERT INTO `Acessos` VALUES
(null, 
(SELECT `Funcionarios`.`Id_Funcionario` FROM `Funcionarios` WHERE (`Carteira_Trabalho`=1274639278562)),
'victorpsf2','10189727Jv!'
);