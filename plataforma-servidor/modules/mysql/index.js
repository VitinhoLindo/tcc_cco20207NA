const { Mysql: { MysqlConnection } }    = require('../../interfaces');

class MySqlModule {
    mysql = require('mysql');
    mysqlConfig = new MysqlConnection;
    query = '';

    constructor() { this.readConfig(); } // leitura da configuração do mysql

    /** 
     * @function mysql
     * 
     * <summary>
     *   leitura da configuração
     * </summary>
     */
    readConfig() {
        this.mysqlConfig.host     = this.process.env.MYSQL_HOST;
        this.mysqlConfig.port     = this.process.env.MYSQL_PORT;
        this.mysqlConfig.user     = this.process.env.MYSQL_USER;
        this.mysqlConfig.pass     = this.process.env.MYSQL_PASS;
        this.mysqlConfig.database = this.process.env.MYSQL_SCHEMA;

        if (!this.mysqlConfig.host)     this.mysqlConfig.host = '127.0.0.1';
        if (!this.mysqlConfig.port)     this.mysqlConfig.port = '3306';
        if (!this.mysqlConfig.user)     this.mysqlConfig.user = 'root';
        if (!this.mysqlConfig.pass)     this.mysqlConfig.pass = '';
        if (!this.mysqlConfig.database) this.mysqlConfig.database = 'mysql';
    }

    setConnection() {
        this.connection = this.mysql.createConnection(this.configs);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) return reject(err);
                else return resolve(true);
            });
        });
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) return reject(err);
                else return resolve(true);
            });
        });
    }

    sendQuery() {
        return new Promise((resolve, reject) => {
            this.connection.query(this.query, (err, result) => {
                if (err) return reject(err);
                else return resolve(result);
            });
        });
    }

    getMessageError(error) {
        if (error.constructor.name == 'Error') {
            var _error = '';
            Object.keys(error).forEach((key) => {
                let value = error[key];
                if (typeof value != 'string' || typeof value != 'number') _error += `${key}: ${value}\n`;
                else _error += `${key}: ${JSON.stringify(value)}\n`;
            });

            return _error;
        } else return error;
    }

    async executeQuery(query) {
        this.query = query;
        this.setConnection();
        await this.connect();
        var data;
        var error;
        try {
            data = await this.sendQuery();
        } catch (_error) { data = []; error = this.getMessageError(_error); }
        await this.disconnect();

        if (error) throw error;
        return data;
    }
}

module.exports = MySqlModule;