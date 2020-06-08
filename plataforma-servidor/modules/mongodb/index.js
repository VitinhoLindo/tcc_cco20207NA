const { MongoClient } = require('mongodb');
const { Mongo: { MongoConnect } } = require('../../interfaces');

class Mongo extends MongoClient {
    
    constructor(opt = MongoConnect) {
        super(opt.connectionUrl, {
            useNewUrlParser    : true,
            useUnifiedTopology : true,
            auth: {
                user     : opt.user,
                password : opt.pass
            }
        });

        this.dbName  = opt.database;
        this.colName = opt.collection;
        this.client  = null;
        this.dbConn  = null;
        this.colConn = null;
    }

    async _connect() {
        this.client = await this.connect();
    }

    async DBconnect() {
        this.dbConn  = this.client.db(this.dbName);
        this.colConn = this.dbConn.collection(this.colName);
    }

    async _disconnect() {
        await this.client.logout();
        await this.client.close();
    }
}

module.exports = Mongo;