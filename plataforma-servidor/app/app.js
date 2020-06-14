const Config = require('../config/config');
const Api     = require('../api');
require('dotenv').config();

class App extends Config {
    server = null;

    constructor() {
        super();
    }

    requestMiddleware(request, response, next) {
        // Website you wish to allow to connect
        response.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        response.setHeader('Access-Control-Allow-Headers', '*');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        response.setHeader('Access-Control-Allow-Credentials', false);

        request._dirname_ = this._dirname_; 

        var body = '';
        request.on('data', (chunk) => {
            if (chunk) body += chunk.toString('utf8');
        });

        request.on('end', () => {
            try {
                request.body = JSON.parse(body);
            } catch (error) {
                request.body = {};
            }

            try {
                for (let key in request.headers)
                    if (key == 'autorization')
                        request.body.authorization = request.headers[key].replace(/Bearer\s/g, '');
            } catch (error) {}
            next();
        });
    }

    async listen() {
        setInterval(() => {
            this.reset();
        }, this.CRYPTO_TIME_INTERVAL);

        this.middleware.use((rq, rs, n) => this.requestMiddleware(rq, rs, n));
        this.middleware.use(Api);
        this.server = this.protocol.createServer(this.middleware);
        this.server.listen({ port: 3000 }, () => {
            console.log('server on');
        });

    }
}

module.exports = App;