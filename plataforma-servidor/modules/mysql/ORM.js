const { Mysql: { MysqlConnection } }    = require('../../interfaces');
require('dotenv').config();

class MySqlModule {
    process = require('process');
    mysql   = require('mysql');
    mysqlConfig = MysqlConnection;
    query   = '';

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
        this.connection = this.mysql.createConnection(this.mysqlConfig);
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
        var data;
        var error = '';
        var count = 0;

        try {
            this.setConnection();
            await this.connect();
        } catch (_error) { data = []; _error.moduleError = 'failure in open connection'; error = this.getMessageError(_error); }

        this.query = query;
        try {
            data = await this.sendQuery();
        } catch (_error) { data = []; _error.moduleError = 'failure send query'; error = this.getMessageError(_error); }
        this.query = '';

        do {
            try {
                await this.disconnect();
                break;

            } catch (_error) { data = []; _error.moduleError = 'failure in close connection'; error = this.getMessageError(_error); }

            if (count == 10) break;
            count++;
        } while (true);

        if (error) throw error;
        return data;
    }
}

module.exports = MySqlModule;