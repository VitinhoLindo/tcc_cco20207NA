const BaseModel = require('./BaseModel');

class AlterarSenha extends BaseModel {
    constructor() {
        super();
        this.use({
            table     : 'AlterarSenha'
        })
    }
}

module.exports = AlterarSenha;