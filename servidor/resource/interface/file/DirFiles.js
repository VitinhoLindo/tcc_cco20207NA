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
    mailer: {
      dir: '',
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

  getRootPath() {
    return `${this._dirname_}${this.dir}`;
  }

  getConfigPath() {
    let root = this.getRootPath();
    return `${root}${this.config.dir}`;
  }

  getConfigSslPath() {
    let root = this.getConfigPath();
    return `${root}${this.config.ssl.dir}`;
  }

  getConfigSslKeyFile() {
    let root = this.getConfigSslPath();
    return `${root}${this.config.ssl.files.key}`;
  }

  getConfigSslCertFile() {
    let root = this.getConfigSslPath();
    return `${root}${this.config.ssl.files.cert}`;
  }

  getPublicPath() {
    let root = this.getRootPath();
    return `${root}${this.public.dir}`;
  }

  getPublicHtmlPath() {
    let root = this.getPublicPath();
    return `${root}${this.public.html}`;
  }

  getPublicJsPath() {
    let root = this.getPublicPath();
    return `${root}${this.public.js}`;
  }

  getPublicCssPath() {
    let root = this.getPublicPath();
    return `${root}${this.public.css}`;
  }

  getPublicIcoPath() {
    let root = this.getPublicPath();
    return `${root}${this.public.ico}`;
  }

  getPublicDocPath() {
    let root = this.getPublicPath();
    return `${root}${this.public.doc}`;
  }

  getPublicImagePath() {
    let root = this.getPublicPath();
    return `${root}${this.public.image}`;
  }

  getPublicVideoPath() {
    let root = this.getPublicPath();
    return `${root}${this.public.video}`;
  }

  getResoursePath() {
    let root = this.getRootPath();
    return `${root}${this.resourse.dir}`;
  }

  getResourseDbPath() {
    let root = this.getResoursePath();
    return `${root}${this.resourse.database.dir}`;
  }

  getResourseDbCryptPath() {
    let root = this.getResourseDbPath();
    return `${root}${this.resourse.database.crypto.dir}`;
  }

  getResourseDbCryptFile(value = new Date()) {
    let root = this.getResourseDbCryptPath();
    
    if (value.constructor.name !== 'Date') 
      value = new Date();
    
    return `${root}${this.resourse.database.crypto.file.replace(
      /\@date\@/g,
      value.getTime()
    )}`;
  }

  getResourceDbJsonPath() {
    let root = this.getResourseDbPath();
    return  `${root}${this.resourse.database.json.dir}`;
  }

  getResourceDbJsonFile(value = new Date()) {
    let root = this.getResourceDbJsonPath();

    if (value.constructor.name !== 'Date')
      value = new Date();

    return `${root}${this.resourse.database.json.file.replace(
      /\@date\@/g,
      value.getTime()
    )}`;
  }

  getResourceMailerPath() {
    let root = this.getResoursePath();
    return `${root}${this.resourse.mailer.dir}`;
  }

  getResourceMailerFile(value = '') {
    let root = this.getResourceMailerPath();
    return `${root}${value}`;
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
    this.resourse.mailer.dir          = 'mail\\';
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
    this.resourse.mailer.dir          = 'mail/';
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