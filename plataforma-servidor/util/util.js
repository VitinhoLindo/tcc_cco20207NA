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
}

module.exports = Util;