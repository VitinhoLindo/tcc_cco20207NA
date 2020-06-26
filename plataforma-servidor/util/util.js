const Repository                     = require('./repositorio');
const { Signature }                  = require('../modules');
const { File: { SetFile, GetFile } } = require('../interfaces');

class Util extends Repository {
    constructor() {
        super();
        this.ModuleSignature = Signature;
        this.MimeTypes       = require('mime-types');
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
        var path;

        try {
            path = this.concatString(true, args);;
            let stat = await this.getStat(path);

            if (!stat.isfile) throw 'is not file';
            let file = await this.fs.readFileSync(path, { encoding: encoding });

            return Object.assign({}, { status: true, file: file, path: path }, stat);
        } catch (error) {
            return { status: false, file: null, path: path };
        }
    }

    async getSimpleInfo(file) {
        let _file      = file.path.split('/');
        let arrayInfo  = this.arrayInfo(_file);
        let fileName   = _file[arrayInfo.max];

        let _mime_     = this.MimeTypes.lookup(fileName);

        if (_mime_) {
            return {
                extension: _mime_.split('/')[1],
                mimeType : _mime_
            };
        } else {
            return {};
        }
    }

    async getFileInfo(encoding, ...args) {
        let file = await this.fileExistsSync(encoding, args);

        if (file.status) {
            let info  = await this.ModuleSignature.identify(file.path);
            if (!info) info = await this.getSimpleInfo(file);
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

    getConvertTo(type, value) {
        switch (type) {
            case 'json':
                try {
                    return JSON.parse(value);
                } catch (error) { return value; }
            default:
                return value;
        }
    }

    async getFile(opt = GetFile) {
        if (!await this.dirExistsSync(opt.path)) await this.createDir(opt.path);
        try {
            let file = await this.fs.readFileSync(`${opt.path}/${opt.file}`, { encoding: opt.encoding });
            return this.getConvertTo(opt.convertType, file);
        } catch (error) {
            return null;           
        }
    }

    async createDir(path) {
        await this.fs.mkdirSync(path);
        return true;
    }

    async setFile(opt = SetFile) {
        if (!await this.dirExistsSync(opt.path)) await this.createDir(opt.path);
        this.fs.writeFileSync(`${opt.path}/${opt.file}`, opt.value, { encoding: opt.encoding } );
        return true;
    }
}

module.exports = Util;