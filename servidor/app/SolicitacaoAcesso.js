const Mysql = require('../resource/lib/Mysql')

class SolicitacaoAcesso extends Mysql {
  constructor() {
    super();
    this.use({
      table: 'SolicitacaoAcesso'
    });
  }
}

module.exports = SolicitacaoAcesso;