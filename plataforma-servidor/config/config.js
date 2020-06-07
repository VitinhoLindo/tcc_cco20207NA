const Util = require('../util/util');
const { Mongo: { MongoConnect }, Mysql: { MysqlConnection } } = require('../interfaces');

class Config extends Util { 
    constructor() {
        super();

        this.mongoConfig  = MongoConnect;
        this.mysqlConfig  = MysqlConnection;
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
    async mongo() {
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

    /** 
     * @function mysql
     * 
     * <summary>
     *   leitura da configuração
     * </summary>
     */
    async mysql() {
        this.mysqlConfig.host = this.process.env.MYSQL_HOST;
        this.mysqlConfig.port = this.process.env.MYSQL_PORT;
        this.mysqlConfig.user = this.process.env.MYSQL_USER;
        this.mysqlConfig.pass = this.process.env.MYSQL_PASS;
        this.mysqlConfig.schema = this.process.env.MYSQL_SCHEMA;

        if (!this.mysqlConfig.host)   this.mysqlConfig.host = '127.0.0.1';
        if (!this.mysqlConfig.port)   this.mysqlConfig.port = '3306';
        if (!this.mysqlConfig.user)   this.mysqlConfig.user = 'root';
        if (!this.mysqlConfig.pass)   this.mysqlConfig.pass = '';
        if (!this.mysqlConfig.schema) this.mysqlConfig.schema = 'mysql';
    }

    async setConfig() {
        // leitura da configuração do mongodb
        await this.mongo();
        // leitura da configuração do mysql
        await this.mysql();
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