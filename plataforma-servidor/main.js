const App = require('./app/app');

(async () => {
    // iniciando estancia do app
    let app = new App;
    app._dirname_ = __dirname;

    // leitura da configuração do app
    await app.setConfig();
    await app.setProtocol();
    await app.listen();
})();