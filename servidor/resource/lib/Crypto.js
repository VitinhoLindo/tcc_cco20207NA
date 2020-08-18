const Mailer = require('./Mailer');
const { Crypto: { Encrypt, Decrypt, EncryptDecrypt } } = require('../interface');

class Crypto extends Mailer {
  constructor() { super(); }

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
    // let ObjectDate = this.getDateObject(date); // obtem um objeto de data
    // let value = this.keys[ObjectDate.locale];  // verifica se já existe uma chave criada nestá data
    // if (value) {  // caso haja não ocorre nada, espera a proxima analise.
    //   return { reset: false, date : date };
    // }
    // // caso não tenha verifica se já existe algum arquivo criado para está data
    // let file = await this.getFile({
    //   path: `${this._dirname_}${this.dirFiles.log.dir}${this.dirFiles.log.crypto.dir}`,
    //   file: this.dirFiles.log.crypto.logFileName.replace(/@date@/g, ObjectDate.locale),
    //   encoding: 'utf8',
    //   convertType: 'json'
    // });
    // // caso exista converte os dados lidos para a memoria
    // if (file) {
    //   ObjectDate = this.getDateObject(new Date(file.date));
    //   this.keys[ObjectDate.locale] = {
    //     pass: file.pass,
    //     key : await this.getKey(file.pass),
    //     date: ObjectDate.date,
    //     iv  : Buffer.from(file.iv)
    //   }
    // }
    // // caso não exista, usa a pass gerada e cria uma key, e cria um iv.
    // else {
    //   var iv = this.getIv();
    //   this.keys[ObjectDate.locale] = {
    //     pass: pass,
    //     key : await this.getKey(pass),
    //     iv  : iv,
    //     date: ObjectDate.date
    //   };
    //   // salva as informações em um arquivo no log de cryptografia.
    //   await this.setFile({
    //     value: JSON.stringify({ date: ObjectDate.date, pass: pass, iv: iv }),
    //     path: `${this._dirname_}${this.dirFiles.log.dir}${this.dirFiles.log.crypto.dir}`,
    //     file: this.dirFiles.log.crypto.logFileName.replace(/@date@/g, ObjectDate.locale),
    //     encoding: 'utf8'
    //   });
    // }
    // return { reset: true, date: date };
  }
}

module.exports = Crypto;