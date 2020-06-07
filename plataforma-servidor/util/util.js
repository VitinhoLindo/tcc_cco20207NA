const Crypto = require('./crypto');

class Util extends Crypto {
    constructor() {
        super();
        this.ModuleSignature = require('../modules/signature');
    }

    concatString(file = false, ...args) {
        let string = '';

        for (let x = 0; x < args.length; x++)
            string += args[x].toString();
        if (file)
            string = string.replace(/,/g, '');

        return string;
    }

    async dirExistsSync(...args) {
        try {
            let path = this.concatString(true, args);

            await this.fs.readdirSync(path);
            return true;
        } catch (error) {
            return false;
        }
    }

    async fileExistsSync(encoding, ...args) {
        if (!encoding) encoding = 'utf8';

        try {
            let path = this.concatString(true, args);
            let file = await this.fs.readFileSync(path, { encoding: encoding });

            return { bool: true, file: file, path: path };
        } catch (error) {
            return { bool: false, file: null, path: path };
        }
    }

    async getFileInfo(encoding, ...args) {
        let file = await this.fileExistsSync(encoding, args);

        if (file.bool) {
            let info  = await this.ModuleSignature.identify(file.path);
            return Object.assign({}, file, info);
        } else {
            return file;
        }
    }
}

module.exports = Util;