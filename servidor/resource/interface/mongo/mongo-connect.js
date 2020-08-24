class Model {
    url = '';
    port = '';
    auth = {
        user: '',
        pass: ''
    }
    connectionUrl = '';
    useNewUrlParser = true;
    useUnifiedTopology = true;

    constructor() { }
}

module.exports = new Model;