const DataType = require('./DataType');
const { file } = require('../interface/file/setFile');

class File extends DataType {
  moduleSignature = require('./ReadSignature');
  constructor() { super(); }

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
        isfile: stat.isFile(),
        isdir: stat.isDirectory(),
        size: stat.size,
        acessTime: stat.atime,
        modifiedTime: stat.mtime,
        inodeTime: stat.ctime
      }
    } catch (error) {
      return {
        isfile: false,
        isdir: false,
        size: 0,
        acessTime: null,
        modifiedTime: null,
        inodeTime: null
      }
    }
  }

  async fileExists(encoding, path) {
    if (!encoding) encoding = 'utf8';
    if (!path) throw 'please inform path';

    var stat = await this.getStat(path);
    if (!stat.isfile) throw `is not file ${path}`;
    try {
      let file = await this.fs.readFileSync(path, { encoding: encoding });

      return {
        isfile: stat.isfile,
        isdir: stat.isdir,
        size: stat.size,
        acessTime: stat.acessTime,
        modifiedTime: stat.modifiedTime,
        inodeTime: stat.inodeTime,
        exists: true,
        fileContent: file
      };
    } catch (error) {
      return Object.assign({}, { exists: false, fileContent: undefined }, stat);
    }
  }

  getSimpleInfo(path) {
    let _file = path.split(this.dirFiles.dir);
    _file = _file[_file.length - 1];

    let _mime_ = this.mimeTypes.lookup(_file);

    if (_mime_) {
      return { 
        extension: _mime_.split('/')[1],
        mime: _mime_
      };
    } else {
      return {};
    }
  }

  async getFileInfo(encoding, path) {
    let fileExists = await this.fileExists(encoding, path);

    if (fileExists.exists) {
      let info = await this.moduleSignature.identify(path);
      if (!info) info = await this.getSimpleInfo(path);

      return {
        isfile: fileExists.isfile,
        isdir: fileExists.isdir,
        size: fileExists.size,
        acessTime: fileExists.acessTime,
        modifiedTime: fileExists.modifiedTime,
        inodeTime: fileExists.inodeTime,
        exists: fileExists.exists,
        fileContent: fileExists.fileContent,
        extension: info.extension,
        mime: info.mime,
        description: info.description || 'don\'t have description'
      };
    } else {
      return fileExists;
    }
  };

  async listDir(path) {
    let dirFiles = [];
    try {
      let files = await this.fs.readdirSync(path)

      for (let possibleFile of files) {
        let stat = await this.getStat(`${path}${possibleFile}`);

        if (!stat.isfile) continue;

        let [name, extension] = possibleFile.split('.');
        dirFiles.push(name);
      }

      return dirFiles;
    } catch (error) {
      return dirFiles;
    }
  }
}

module.exports = File;