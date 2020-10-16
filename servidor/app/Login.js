const Mysql = require('../resource/lib/Mysql')

class Acesso extends Mysql {
  constructor() {
    super();
    this.use({
      table: 'Acesso',
      timestamp: true
    });
  }
}

module.exports = Acesso;