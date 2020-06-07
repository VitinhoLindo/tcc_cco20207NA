class FileSignature {
    constructor() {
        this.signatures = require('./signatures');
        this.fs         = require('fs');
    }

    bufferIsEqual(buf1, buf2) {
        var i;
        if (buf1.length != buf2.length)
            return false;
        for (i = buf1.length -1; i >= 0; i--) 
            if (buf1[i] != buf2[i])
                return false;
        return true;
    }

    async identify(path) {
        let fd,
            buf = Buffer.from(new ArrayBuffer(256)),
            i;

        fd = this.fs.openSync(path, 'r');
        this.fs.readSync(fd, buf, 0, buf.length, 0);
        this.fs.closeSync(fd);

        for (i = this.signatures.length - 1; i >= 0; i--) {
            let _buf = this.signatures[i];
            if (this.bufferIsEqual(buf.slice(0, this.signatures[i].byteSeq.length), _buf.byteSeq)) {
                return {
                    extension   : _buf.extension,
                    description : _buf.description || '',
                    mimeType    : _buf.mimeType.mime || 'application/octet-stream'
                }
            }
        }

        return {
            extension   : 'undefined',
            description : '',
            mimeType    : 'application/octet-stream'
        };
    }
}

module.exports = new FileSignature;