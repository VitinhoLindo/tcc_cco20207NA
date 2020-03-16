const { request, response } = require('express');
const Kernel = require('../../kernel');

class Api extends Kernel {
  constructor() {
    super();
  }

  async getUser(req = request, res = response) {
    console.log(req.url);
    console.log(req.body);
    console.log(req.query);

    res.json({
      id: 1,
      funcionario: {
        id: 1,
        carteiraTrabalho: 2546547894,
        funcao: {
          id: 1,
          funcao: 'admin',
          atuacao: {
            id: 1,
            atuacao: 'administracao'
          },
          nivelAcesso: 1
        },
        lotacao: {
          id: 1,
          classificacao: '',
          contato: {
            id: 2,
            email: "victorpsf2@hotmail.com",
            emailComplementar: "victorpsf2@gmail.com",
            telefoneFixo: '33447574',
            telefoneFixoComplementar: '33415547',
            telefoneMovel: '81999366708',
            telefoneModelComplementar: '81986186306',
          },
          endereco: {
            id: 2,
            cep: 53441570,
            pais: 'br',
            estado: 'pe',
            cidade: 'paulista',
            bairro: 'maranguape I',
            endereco: 'rua 126',
            complemento: '06 b'
          },
          logo: null
        },
        fardamento: {
          id: 1,
          camiseta: 'P',
          calca: 'P',
          sapato: '40',
          infAdicional: ""
        },
        contatos: {
          id: 1,
          email: "victorpsf2@hotmail.com",
          emailComplementar: "victorpsf2@gmail.com",
          telefoneFixo: '33447574',
          telefoneFixoComplementar: '33415547',
          telefoneMovel: '81999366708',
          telefoneModelComplementar: '81986186306',
        },
        enderecos: {
          id: 1,
          cep: 53441570,
          pais: 'br',
          estado: 'pe',
          cidade: 'paulista',
          bairro: 'maranguape I',
          endereco: 'rua 126',
          complemento: '06 b'
        }
      },
      login: 'victorpsf2',
      senha: '10189727Jv!'
    });
    res.status(500);
    res.end();
    return true;
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