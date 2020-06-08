const Repository = require('./repositorio');
const { Signature } = require('../modules');

class Util extends Repository {
    constructor() {
        super();
        this.ModuleSignature = Signature;
    }

    concatString(file = false, ...args) {
        let string = '';

        for (let x = 0; x < args.length; x++)
            string += args[x].toString();
        if (file)
            string = string.replace(/,/g, '');

        return string;
    }

    async getStat(path) {
        try {
            let stat = await this.fs.statSync(path);

            /**
             *  dev: ID do dispositivo que contém o arquivo
             *  mode: proteção de arquivo
             *  nlink: número de links físicos para o arquivo
             *  uid: ID do usuário do proprietário do arquivo.
             *  gid: ID do grupo do proprietário do arquivo.
             *  rdev: ID do dispositivo se o arquivo for um arquivo especial.
             *  blksize: tamanho do bloco para E / S do sistema de arquivos.
             *  ino: número do inode do arquivo. Um inode é uma estrutura de dados do sistema de arquivos que -
             *  armazena informações sobre um arquivo.
             *  size: tamanho total do arquivo em bytes.
             *  blocks: número de blocos alocados para o arquivo.
             *  atime: objeto de data que representa o último horário de acesso do arquivo.
             *  mtime: objeto de data que representa a hora da última modificação do arquivo.
             *  ctime: objeto de data que representa a última vez que o inode do arquivo foi alterado.
             */
            return {
                isfile         : stat.isFile(),
                isdir          : stat.isDirectory(),
                size           : stat.size,
                acessTime      : stat.atime,
                modifiedTime   : stat.mtime,
                inodeTime      : stat.ctime
            }
        } catch (error) {
            return {
                isfile         : false,
                isdir          : false,
                size           : 0,
                acessTime      : null,
                modifiedTime   : null,
                inodeTime      : null
            }
        }
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
            let stat = await this.getStat(path);


            if (!stat.isfile) throw 'is not file';
            let file = await this.fs.readFileSync(path, { encoding: encoding });

            return Object.assign({}, { status: true, file: file, path: path }, stat);
        } catch (error) {
            return { status: false, file: null, path: path };
        }
    }

    async getFileInfo(encoding, ...args) {
        let file = await this.fileExistsSync(encoding, args);

        if (file.status) {
            let info  = await this.ModuleSignature.identify(file.path);
            return Object.assign({}, file, info);
        } else {
            return file;
        }
    }

    getObjectKeys(object = {}) {
        return Object.keys(object);
    }

    arrayInfo(array = []) {
        return {
            min: 0,
            max: (array.length == 1) ? 0 : array.length - 1
        };
    }

    arrayValueIndex(index, array = []) {
        let arrayInfo = this.arrayInfo(array);

        if (index < arrayInfo.min) index = 0;
        if (index > arrayInfo.max) index = arrayInfo.max;

        let value = array[index] || null;

        return {
            min: arrayInfo.min,
            max: arrayInfo.max,
            value: value
        };
    }

    objectValue(key, object = {}) {
        return object[key] || null;
    }

    random(min = 0, max = 0, decimalHouse = 10) {
        while (max > decimalHouse) decimalHouse *= 10;

        let randValue = 0;
        do {
            randValue = Math.floor(Math.random() * decimalHouse);
        } while(randValue < min || randValue > max)

        return randValue;
    }

    randomText(range = 0) {
        let randText = '';
        var count    = 0 ;
        if (range == 0) return randText;

        let keys = this.getObjectKeys(this.characters);

        do {
            let _infoKeysArray  = this.arrayInfo(keys);
            let _keyIndex       = this.random(_infoKeysArray.min, _infoKeysArray.max);
            let _keyValue       = this.arrayValueIndex(_keyIndex, keys);
            let _value          = this.objectValue(_keyValue.value, this.characters);
            let _infoValue      = this.arrayInfo(_value);
            let _valueIndex     = this.random(_infoValue.min, _infoValue.max);
            randText           += this.arrayValueIndex(_valueIndex, _value).value; 
            count += 1;
        } while(range != count);

        return randText;
    }
}

module.exports = Util;