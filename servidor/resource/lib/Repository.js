const Modules  = require('./Modules');
const { File: { DirFile } } = require('../interface');

class Repository extends Modules {
  dirFiles  = DirFile;

  constructor() { super(); }

  setPataform(_dirname_) {
    this.dirFiles = this.dirFiles.getNewDirFiles(
      this.os.platform(),
      _dirname_
    );
  }

  getDirPath(name = '') { }
  getDirFilePath(name = '') { }
}

module.exports = Repository;