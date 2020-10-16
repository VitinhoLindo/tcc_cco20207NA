const Mysql = require('../resource/lib/Mysql')

class AlterarSenha extends Mysql {
  constructor() {
    super();
    this.use({
      table: 'AlterarSenha'
    });
  }
}

module.exports = AlterarSenha;