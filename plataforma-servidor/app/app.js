const Storage = require('./storage');
const Api     = require('../api');
require('dotenv').config();

class App extends Storage {
    server = null;

    constructor() {
        super();
    }

    maxRequestInMinute(request, response, next) {
        response.json({ code: 429, message: 'Too Many Requests', result: null, status: 'success' });
        return response.end();
    }

    requestMiddleware(request, response, next) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', '*');
        response.setHeader('Access-Control-Allow-Credentials', false);

        if (this.openToRequest())
            return this.maxRequestInMinute(request, response, next);
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
        this.server.listen({ port: 8181 }, () => {
            console.log('server on');
        });

    }
}

module.exports = App;