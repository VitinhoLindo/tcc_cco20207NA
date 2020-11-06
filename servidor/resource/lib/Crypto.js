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

  getCryptoKeys(pass = '') {
    return this.crypto.generateKeyPairSync('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: pass
      }
    });
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

  getServerPublicKey(date = new Date()) {
    let ObjectDate = this.getDateObject(date);
    let value = this.keys[ObjectDate.locale];
    return (value) ? value.publicKey : null;
  }

  async setCrypto(date = new Date(), pass = '') {
    let ObjectDate = this.getDateObject(date);     // obtem um objeto de data
    let value      = this.keys[ObjectDate.locale]; // verifica se já existe uma chave criada nestá data

    if (value) { // caso haja não ocorre nada, espera a proxima analise.
      return { reset: false, date: date };
    }
    

    // caso não tenha verifica se já existe algum arquivo criado para está data
    let file = await this.getFileInfo('utf8', this.dirFiles.getResourseDbCryptFile(date), 'json');

    // caso exista converte os dados lidos para a memoria
    if (file.exists) {
      ObjectDate = this.getDateObject(new Date(file.fileContent.date));

      this.keys[ObjectDate.locale] = {
        pass: Buffer.from(file.fileContent.pass),
        date: ObjectDate.date,
        privateKey: file.fileContent.privateKey,
        publicKey: file.fileContent.publicKey
      };

      return { reset: false, date: date };
    }

    // caso não exista, usa a pass gerada e cria uma key, e cria um iv.
    else {
      if (!pass) {
        pass = this.getRandomString({ len: this.passrange });
      }

      let { privateKey, publicKey } = this.getCryptoKeys(pass);

      this.keys[ObjectDate.locale] = {
        privateKey: privateKey,
        publicKey: publicKey,
        pass: Buffer.from(pass),
        date: ObjectDate.date
      };

      // salva as informações em um arquivo no log de cryptografia.
      await this.saveFile({
        value: JSON.stringify({ 
          privateKey: privateKey,
          publicKey: publicKey,
          pass: Buffer.from(pass),
          date: ObjectDate.date
        }),
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
        console.log(error);
        this.print([{ message: error, color: 'red' }]);
      }
    }, 1000);
  }

  convertHex(value = '') {
    if (!value) return value;
    let hex = [];

    for(let _value of value) {
      let type = /^\d+$/.test(_value) ? 'int': 'string';

      switch (type) {
        case 'int':
          hex.push(_value.toString(16));
          break;
        default:
          hex.push(_value.charCodeAt(0).toString(16));
          break;
      }
    }

    return hex;
  }
}

module.exports = Crypto;