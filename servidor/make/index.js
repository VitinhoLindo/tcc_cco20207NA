const { File: { DirFile } } = require('../resource/interface')

class Make {
  dirFiles = DirFile;
  process = require('process');
  fs = require('fs');
  os = require('os');

  readCommands() {
    let args = this.process.argv.slice(2);
    console.log(args);

    switch (args[0]) {
      case '--file':
        
        break;
    
      default:
        break;
    }
  }

  async build() {
    this.dirFiles = this.dirFiles.getNewDirFiles(
      this.os.platform(),
      __dirname.replace(/\\make|\/make/g, 'g')
    );

    this.readCommands();
  }
}

(new Make).build();