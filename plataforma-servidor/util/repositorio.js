const MyEvent = require('./event');

class Repository extends MyEvent {
    _dirname_ = '';
    algorithm = 'aes-192-cbc';
    encoding  = 'sha256';
    salt      = 'salt';
    ivLen     = 16;
    saltRange = 24;
    passrange = 100;
    os         = require('os');
    process    = require('process');
    fs         = require('fs');
    http       = require('http');
    https      = require('https');
    express    = require('express');
    middleware = this.express();
    argv       = this.process.argv;
    characters = {
        latter : 'abcdefghijklmnopqrstuvxywz',
        number : '0123456789',
        super  : '!@#$%*()_+£¢¬<>,.:;^~]}[{ª|§º'
    };
    host       = this.process.env.HOST || 'localhost';
    port       = this.process.env.PORT || 3000;
    CRYPTO_TIME_INTERVAL = parseInt(this.process.env.CRYPTO_TIME) || 86400000;
    dirFiles = {};

    constructor() {
        super();
        this.setPlataform();
    }

    getAppDir() {
        return `${this._dirname_}${this.dirFiles.dir}`;
    }

    getConfigDir() {
        let _dir = this.getAppDir();
        return _dir + `${this.dirFiles.config.dir}`;
    }

    getConfigSslDir() {
        let _dir = this.getConfigDir();
        return _dir + `${this.dirFiles.config.ssl.dir}`;
    }

    getSslKeyDir() {
        let _dir = this.getConfigSslDir();
        return _dir + `${this.dirFiles.config.ssl.keyName}`;
    }

    getSslCertDir() {
        let _dir = this.getConfigSslDir();
        return _dir + `${this.dirFiles.config.ssl.certName}`;
    }

    setPlataform() {
        switch (this.os.platform()) {
            case 'android':
            case 'linux':
                this.dirFiles = {
                    dir: '/',
                    config: {
                        dir: 'config/',
                        ssl: {
                            dir: 'ssl/',
                            keyName : 'ssl.key',
                            certName: 'ssl.cert'
                        }
                    },
                    public: {
                        dir   : 'public/',
                        css   : 'css/',
                        js    : 'js/',
                        html  : 'html/',
                        doc   : 'doc/',
                        icon  : 'icon/',
                        image : 'image/',
                        video : 'video/'
                    },
                    log: {
                        dir: 'loggable/',
                        loggable: {
                            dir: 'log/',
                            logFileName: '@date@-@loggable@.log'
                        },
                        crypto: {
                            dir: 'crypto/',
                            logFileName: '@date@-crypto.json'
                        }
                    },
                    sistemMail: {
                        dir: 'sistemMail/'
                    }
                };
                break;
            case 'win32':
            case 'windows':
                this.dirFiles = {
                    dir: '\\',
                    config: {
                        dir: 'config\\',
                        ssl: {
                            dir: 'ssl\\',
                            keyName : 'ssl.key',
                            certName: 'ssl.cert'
                        }
                    },
                    public: {
                        dir   : 'public\\',
                        css   : 'css\\',
                        html  : 'html\\',
                        doc   : 'doc\\',
                        icon  : 'icon\\',
                        image : 'image\\',
                        js    : 'js\\',
                        video : 'video\\'
                    },
                    log: {
                        dir: 'loggable\\',
                        loggable: {
                            dir: 'log\\',
                            logFileName: '@date@-@loggable@.log'
                        },
                        crypto: {
                            dir: 'crypto\\',
                            logFileName: '@date@-crypto.json'
                        }
                    },
                    sistemMail: {
                        dir: 'sistemMail\\'
                    }
                };
                break;
            default:
                break;
        }
    }
}

module.exports = Repository;