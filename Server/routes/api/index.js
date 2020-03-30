const { request, response } = require('express');
const Kernel = require('../../kernel');

class Api extends Kernel {
  constructor() {
    super();
  }

  async getUser(req = request, res = response) {
    try {
      console.log(req.body);

      let atuacao = {
        Id: 1,
        Atuacao: 'administracao'
      };

      let funcao = {
        Id: 1,
        Funcao: 'admin',
        Atuacao: atuacao,
        NivelAcesso: 1
      };

      let lotacao_contato = {
        Id: 2,
        Email: "victorpsf2@hotmail.com",
        EmailComplementar: "victorpsf2@gmail.com",
        TelefoneFixo: '33447574',
        TelefoneFixoComplementar: '33415547',
        TelefoneMovel: '81999366708',
        TelefoneModelComplementar: '81986186306',
      };

      let lotacao_endereco = {
        Id: 2,
        Cep: 53441570,
        Pais: 'br',
        Estado: 'pe',
        Cidade: 'paulista',
        Bairro: 'maranguape I',
        Endereco: 'rua 126',
        Complemento: '06 b'
      };

      let lotacao = {
        Id: 1,
        Classificacao: '',
        Contato: lotacao_contato,
        Endereco: lotacao_endereco,
        Logo: null
      };

      let fardamento = {
        Id: 1,
        Camiseta: 'P',
        Calca: 'P',
        Sapato: '40',
        InfAdicional: ""
      };

      let contato = {
        Id: 1,
        Email: "victorpsf2@hotmail.com",
        EmailComplementar: "victorpsf2@gmail.com",
        TelefoneFixo: '33447574',
        TelefoneFixoComplementar: '33415547',
        TelefoneMovel: '81999366708',
        TelefoneModelComplementar: '81986186306',
      };

      let endereco = {
        Id: 1,
        Cep: 53441570,
        Pais: 'br',
        Estado: 'pe',
        Cidade: 'paulista',
        Bairro: 'maranguape I',
        Endereco: 'rua 126',
        Complemento: '06 b'
      };

      res.json({
        Id: 1,
        Cadastro: {
          Id: 1,
          CarteiraTrabalho: 2546547894,
          Funcao: funcao,
          Lotacao: lotacao,
          Fardamento: fardamento,
          Contatos: contato,
          Enderecos: endereco
        },
        Login: 'victorpsf2',
        Senha: '10189727Jv!'
      });

      res.status(200);
      res.end();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  }

  setHeader(req = request, res = response, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }

  // async Get(request = this.request, response = this.response) {
  //   //
  // }

  // async Post(request = this.request, response = this.response) {
  //   //
  // }

  // async Put(request = this.request, response = this.response) {
  //   //
  // }

  // async Delete(request = this.request, response = this.response) {
  //   //
  // }
}

module.exports = Api;