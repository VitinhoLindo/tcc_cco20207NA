const App = require('./app/app');

(async () => {
    /**
     * iniciando estancia do app
     * e informa o diretorio de inicialização 
     * do servidor
     */
    let app = new App;
    app._dirname_ = __dirname;

    /**
     * leitura da configuração do app
     * set a biblioteca de protocolo a ser utilizado [http, https]
     * adiciona a secret e o iv da cryptografia a ser utilizada no dia
     * e inicia o ouvinte de requisições.
     */
    await app.setPrConfigotocol();
    await app.reset();
    await app.listen();
})();