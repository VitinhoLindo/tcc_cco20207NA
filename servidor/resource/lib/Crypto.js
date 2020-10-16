const Mailer = require('./Mailer');
const { Crypto: { Encrypt, Decrypt, EncryptDecrypt } } = require('../interface');

class Crypto extends Mailer {

  keys = {};

  constructor() { 
    super();
  }

  async getKey(pass) {
    return await this.crypto.scryptSync(
      pass,
      this.salt,
      this.saltRange
    );
  }

  getIv() {
    return Buffer.from(this.crypto.randomBytes(this.ivLen));
  }

  async getKeyDate(date = new Date()) {
    let objectDate = this.getDateObject(date);
    let value      = this.keys[objectDate.locale];

    if (!value) {
      value = await this.getFileInfo(this.dirFiles.getResourseDbCryptFile(date));

      if (value) throw 'encrypt date is not exists';
    }

    return {
      key  : await this.getKey(value.pass),
      date : value.date,
      iv   : Buffer.from(value.iv)
    };
  }

  async getEncrypt(opt = EncryptDecrypt) {
    let KeyDate = await this.getKeyDate(opt.date);
    return await this.crypto.createCipheriv(
      this.algorithm,
      KeyDate.key,
      KeyDate.iv
    );
  }

  async getDecrypt(opt = EncryptDecrypt) {
    let KeyDate = await this.getKeyDate(opt.date);
    return await this.crypto.createDecipheriv(
      this.algorithm,
      KeyDate.key,
      KeyDate.iv
    );
  }

  async getHash() {
    return this.crypto.createHash('sha256');
  }

  getEncryptOption() {
    return new Encrypt();
  }

  getDecryptOption() {
    return new Decrypt();
  }

  async encrypt(option = this.getEncryptOption()) {
    let toRules = Decrypt.getRules();
    let validator = this.Validator.make(option, toRules.rules);

    if (validator.fails()) throw validator.message;

    let encrypt = await this.getEncrypt();

    let encrypted = encrypt.update(option.value, option.encoding, option._encoding);
    encrypted += encrypt.final(option._encoding);

    return encrypted;
  }

  async decrypt(option = this.getDecryptOption()) {
    let toRules = Decrypt.getRules();
    let validator = this.Validator.make(option, toRules.rules);

    if (validator.fails()) throw validator.message;


    let decrypt = await this.getDecrypt();
    let decrypted = decrypt.update(option.value, option._encoding, option.encoding);
    decrypted += decrypt.final(option.encoding);

    return decrypted;
  }

  async hashable(value) {
    let hashable = await this.getHash();

    hashable.update(value);
    return hashable.digest('hex');
  }

  async setCrypto(date = new Date(), pass = '') {
    let ObjectDate = this.getDateObject(date); // obtem um objeto de data
    let value = this.keys[ObjectDate.locale];  // verifica se já existe uma chave criada nestá data
    
    if (value) {  // caso haja não ocorre nada, espera a proxima analise.
      return { reset: false, date : date };
    }

    // caso não tenha verifica se já existe algum arquivo criado para está data
    let file = await this.getFileInfo('utf8', this.dirFiles.getResourseDbCryptFile(date), 'json');

    // caso exista converte os dados lidos para a memoria
    if (file.exists) {
      ObjectDate = this.getDateObject(new Date(file.fileContent.date));
      this.keys[ObjectDate.locale] = {
        pass: file.fileContent.pass,
        key : await this.getKey(file.fileContent.pass),
        date: ObjectDate.date,
        iv  : Buffer.from(file.fileContent.iv)
      }

      return { reset: false, date: date };
    }

    // caso não exista, usa a pass gerada e cria uma key, e cria um iv.
    else {
      if (!pass) {
        pass = this.getRandomString({ len: this.passrange });
      }

      var iv = this.getIv();
      this.keys[ObjectDate.locale] = {
        pass: pass,
        key : await this.getKey(pass),
        iv  : iv,
        date: ObjectDate.date
      };

      // salva as informações em um arquivo no log de cryptografia.
      await this.saveFile({
        value: JSON.stringify({ date: ObjectDate.date, pass: pass, iv: iv }),
        path: this.dirFiles.getResourseDbCryptPath(),
        file: this.dirFiles.getResourseDbCryptFile(ObjectDate.date, false),
        encoding: 'utf8'
      });
    }
    return { reset: true, date: date };
  }

  cryptoListen() {
    setInterval(async () => {
      try {
        let res = await this.setCrypto(new Date);
        let objectdate = this.getDateObject(res.date);
  
        if (res.reset) this.print([{ message: `New cipher create in ${objectdate.locale}`, color: 'blue' }])
      } catch (error) {
        this.print([{ message: error, color: 'red' }]);
      }
    }, 1000);
  }
}

module.exports = Crypto;