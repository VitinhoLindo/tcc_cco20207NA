const Crypto = require('../util/crypto');
const { Mongo: { MongoConnect } } = require('../interfaces');

class Config extends Crypto { 
    constructor() {
        super();

        this.mongoConfig  = MongoConnect;
        this.protocolName = 'http'; 
        this.protocol     = null;
    }

    /**
     * @function mongo
     * 
     * <summary>
     *   leitura da configuração
     * </summary>
     */
    mongo() {
        this.mongoConfig.url  = this.process.env.MONGO_URL;
        this.mongoConfig.port = this.process.env.MONGO_PORT;
        this.mongoConfig.user = this.process.env.MONGO_USER;
        this.mongoConfig.pass = this.process.env.MONGO_PASS;

        if (!this.mongoConfig.url)  this.mongoConfig.url  = 'mongodb://127.0.0.1';
        if (!this.mongoConfig.port) this.mongoConfig.port = 27017;
        if (!this.mongoConfig.user) this.mongoConfig.user = 'root';
        if (!this.mongoConfig.pass) this.mongoConfig.pass = '';

        this.mongoConfig.connectionUrl = `${this.mongoConfig.url}:${this.mongoConfig.port}`;
    }

    setConfig() {
        // leitura da configuração do mongodb
        this.mongo();
    }

    async setProtocol() {
        if (
            await this.dirExistsSync(
            this._dirname_, 
            this.dirFiles.config.dir,
            this.dirFiles.config.ssl.dir
            )
        ) {
            // use https;
            this.protocolName = 'http';
        }

        this.protocol = (this.protocolName == 'https') ?
                        this.https : this.http;
    }
}

module.exports = Config;