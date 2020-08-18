const BaseModel = require('./BaseModel');

class Acesso extends BaseModel {
  constructor() {
    super();
    this.use({
      table: 'Acesso',
      timestamp: true
    });
  }
}

module.exports = Acesso;