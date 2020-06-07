const MyEvent = require('./event');

class Repository extends MyEvent {
    _dirname_ = '';

    constructor() {
        super();

        this.os         = require('os');
        this.process    = require('process');
        this.fs         = require('fs');
        this.http       = require('http');
        this.https      = require('https');
        this.express    = require('express');
        this.middleware = this.express();
        this.argv       = this.process.argv;

        this.dirFiles = {
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
                dir        : '/log',
                logFileName: '@date@-@loggable@.log'
            }
        }
    }
}

module.exports = Repository;