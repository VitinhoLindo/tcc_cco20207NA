var supported = ['win32', 'windows', 'linux', 'android'];

class DirFiles {
  platform  = '';
  _dirname_ = '';
  dir       = '';
  config    = {
    dir: '',
    ssl: {
      dir: '',
      files: {
        key  : 'key.ssl',
        cert : 'cert.ssl'
      }
    }
  };
  public   = {
    dir   : '',
    html  : '',
    js    : '',
    css   : '',
    ico   : '',
    doc   : '',
    image : '',
    video : '' 
  };
  resourse = {
    dir: '',
    database: {
      dir: '',
      crypto: {
        dir  : '',
        file : 'crypto-@date@.json'
      },
      json: {
        dir  : '',
        file : 'db-@date@.json'
      }
    },
    log: {
      dir  : '',
      file : 'node-@date@.log'
    }
  }

  constructor(platform, _dirname_) {
    if (!platform) {}
    else {
      this.setPlataform(platform);
      this.setDirname(_dirname_);
      this.setDir();
    }
  }

  setDirname(value) {
    this._dirname_ = value;
  }

  setPlataform(value = '') {
    if (supported.indexOf(value) < 0) {
        let error = `plataform is not supported ${value}\n\nSupported plataform:`;

        for (let index in supported) {
          let plataform = supported[index];
          error += `\n  ${plataform}`;
        }

        throw error;
    }

    this.platform = value;
  }

  getNewDirFiles(_name_, _dirname_) {
    return new DirFiles(_name_, _dirname_);
  }

  winDir() {
    this.dir                          = '\\';
    this.config.dir                   = 'config\\';
    this.config.ssl.dir               = 'ssl\\';
    this.public.dir                   = 'public\\';
    this.public.html                  = 'html\\';
    this.public.js                    = 'js\\';
    this.public.css                   = 'css\\';
    this.public.ico                   = 'ico\\';
    this.public.doc                   = 'doc\\';
    this.public.image                 = 'image\\';
    this.public.video                 = 'video\\';
    this.resourse.dir                 = 'resource\\';
    this.resourse.database.dir        = 'database\\';
    this.resourse.database.crypto.dir = 'crypto\\';
    this.resourse.database.json.dir   = 'json\\';
    this.resourse.log.dir             = 'log\\';
  }

  linuxDir() {
    this.dir                          = '/';
    this.config.dir                   = 'config/';
    this.config.ssl.dir               = 'ssl/';
    this.public.dir                   = 'public/';
    this.public.html                  = 'html/';
    this.public.js                    = 'js/';
    this.public.css                   = 'css/';
    this.public.ico                   = 'ico/';
    this.public.doc                   = 'doc/';
    this.public.image                 = 'image/';
    this.public.video                 = 'video/';
    this.resourse.dir                 = 'resource/';
    this.resourse.database.dir        = 'database/';
    this.resourse.database.crypto.dir = 'crypto/';
    this.resourse.database.json.dir   = 'json/';
    this.resourse.log.dir             = 'log/';
  }

  getFuncName() {
    if      (this.platform == 'win32')   return 'winDir'  ;
    else if (this.platform == 'windows') return 'winDir'  ;
    else if (this.platform == 'android') return 'linuxDir';
    else if (this.platform == 'linux')   return 'linuxDir';
  }

  setDir() {
    let name = this.getFuncName();    
    this[name]();
  }
}

module.exports = new DirFiles();