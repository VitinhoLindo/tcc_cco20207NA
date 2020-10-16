class Model {
    url = '';
    port = '';
    auth = {
        user: '',
        password: ''
    }
    connectionUrl = '';
    useNewUrlParser = true;
    useUnifiedTopology = true;
    authMechanism = 'DEFAULT';

    constructor() { }
}

module.exports = new Model;