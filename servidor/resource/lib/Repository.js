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

  getMaxRequest() {
    return parseInt(this.process.env.MAXREQUESTMINUTE) || 50
  }

  getDirPath(name = '') { }
  getDirFilePath(name = '') { }
}

module.exports = Repository;