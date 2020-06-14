const { Mysql: { MysqlConnection } }    = require('../../interfaces');

const Option = { multipleStatements: true };

class MySqlModule {
    constructor(config = MysqlConnection) {
        this.NativeModuleMysql = require('mysql');
        this.config = Object.assign({}, Option, config);
    }

    getConnection() {
        return this.NativeModuleMysql.createConnection(this.config); 
    }

    queryAsync(query) {
        let connection = this.getConnection();
        return new Promise((resolve, reject) => {
            try {
                connection.connect();

                connection.query(query, (err, result) => {
                    if (err) {
                        connection.end();
                        reject(err);
                    }
                    else {
                        connection.end();
                        resolve(result);
                    }
                });
            } catch (error) { return reject(error); }
        });
    }
}

module.exports = MySqlModule;