const Repository = require('./repositorio');

class Crypto extends Repository {
    constructor() {
        super();

        this.crypto = require('crypto');
    }
}

module.exports = Crypto;