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
    CRYPTO_TIME_INTERVAL = parseInt(this.process.env.CRYPTO_TIME) || 86400000;
    dirFiles = {
        config  : {
            dir : '/config',
            ssl : {
                dir     : '/ssl',
                keyName : 'ssl.key',
                certName: 'ssl.cert'
            },
        },
        public  : {
            dir  : '/public',
            css  : '/css',
            html : '/html',
            doc  : '/doc',
            icon : '/icon',
            image: '/image',
            js   : '/js',
            video: '/video'
        },
        log      : {
            dir        : '/loggable',
            loggable   : {
                dir: '/log',
                logFileName: '@date@-@loggable@.log'
            },
            crypto     : {
                dir: '/crypto',
                logFileName: '@date@-crypto.json'
            },
        }
    }

    constructor() {
        super();
    }
}

module.exports = Repository;