const Mailer = require('./Mailer');
const { Crypto: { Encrypt, Decrypt, EncryptDecrypt } } = require('../interface');

class Crypto extends Mailer {

  keys = {};
  serverKeys = { publicKey: null, privateKey: null, date: new Date(), changeDate: new Date() };

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
      modulusLength: this.modulusLength,
      publicKeyEncoding: {
        type: this.publicKeyExportType,
        format: this.publicKeyExportFormat
      },
      privateKeyEncoding: {
        type: this.privateKeyExportType,
        format: this.privateKeyExportFormat,
        cipher: this.privateKeyCipherServer,
        passphrase: pass
      }
    });
  }

  async getCryptoKeysWeb() {
    return await this.crypto.webcrypto.subtle.generateKey({
      name: this.serverKeysAlgorithm,
      modulusLength: this.modulusLength,
      publicExponent: this.publicExponent,
      hash: this.serverKeyHash
    }, true, ['encrypt', 'decrypt']);
  }

  getIv() {
    return Buffer.from(this.crypto.randomBytes(this.ivLen));
  }

  async getKeyDate(date = new Date()) {
    let objectDate = this.getDateObject(date);
    let value = this.keys[objectDate.locale];

    if (!value) {
      value = await this.getFileInfo(this.dirFiles.getResourseDbCryptFile(date));

      if (value) throw 'encrypt date is not exists';
    }

    return {
      key: await this.getKey(value.pass),
      date: value.date,
      iv: Buffer.from(value.iv)
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
    let value = this.keys[ObjectDate.locale]; // verifica se já existe uma chave criada nestá data

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
        date: ObjectDate.date,
        lastUse: ObjectDate.date
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

  async setServerCrypto(date = new Date()) {
    let ObjectDate = this.getDateObject(date);     // obtem um objeto de data

    let { publicKey, privateKey } = await this.getCryptoKeysWeb();

    this.serverKeys.publicKey = publicKey;
    this.serverKeys.privateKey = privateKey;
    this.serverKeys.date = new Date();
    return true;
  }

  arrayBufferToBase64String(binary = new Uint8Array([])) {
    return Buffer.from(binary).toString('base64');
  }

  base64StringToArrayBuffer(base64 = '') {
    return Buffer.from(base64, 'base64');
  }

  exportBinaryToPem(binary = new Uint8Array([]), label = 'RSA PUBLIC KEY') {
    let base64Export = this.arrayBufferToBase64String(binary);
    let pemExport = `-----BEGIN ${label}-----\r\n`;
    let nextIndex = 0;

    while (nextIndex < base64Export.length) {
      if ((nextIndex + 64) < base64Export.length) {
        pemExport += base64Export.substr(nextIndex, 64) + '\r\n';
      } else {
        pemExport += base64Export.substr(nextIndex) + '\r\n';
      }
      nextIndex += 64;
    }

    pemExport += `-----END ${label}-----\r\n`;
    return pemExport;
  }

  getServerIv() {
    return this.crypto.webcrypto.getRandomValues(new Uint8Array(this.ivLen));
  }

  async serverExportPublicKey() {
    let exportedKey = await this.crypto.webcrypto.subtle.exportKey(
      this.publicKeyExportWebType,
      this.serverKeys.publicKey
    );

    return { key: this.exportBinaryToPem(exportedKey, 'RSA PUBLIC KEY'), date: this.serverKeys.date }
  }

  convertPemToBinary(pem = '') {
    let lines = pem.split('\n');
    var encoded = '';

    for (let line = 0; line < lines.length; line++) {
      if (lines[line].trim().length > 0 &&
        lines[line].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 &&
        lines[line].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
        lines[line].indexOf('-END RSA PRIVATE KEY-') < 0 &&
        lines[line].indexOf('-END RSA PUBLIC KEY-') < 0
      ) {
        encoded += lines[line].trim();
      }
    }

    return this.base64StringToArrayBuffer(encoded);
  }

  async serverImportPublicKey(pem = '') {
    let keyBuffer = this.convertPemToBinary(pem);
    return await this.crypto.webcrypto.subtle.importKey(
      this.publicKeyExportWebType,
      keyBuffer,
      {
        name: this.serverKeysAlgorithm,
        hash: this.serverKeyHash
      },
      false, ['encrypt']
    );
  }

  cryptoListen() {
    Promise.all([
      this.setCrypto(new Date),
      this.setServerCrypto(new Date)
    ]).then(() => { this.print([{ message: `Initialization crypografy server RSA and RSA WEB Crypto API started`, color: 'blue' }]) })
      .catch(() => { this.print([{ message: `Initialization crypografy server RSA and RSA WEB Crypto API error occured`, color: 'red' }]) });

    setInterval(async () => {
      try {
        let res = await this.setCrypto(new Date);
        await this.setServerCrypto(new Date);
        let objectdate = this.getDateObject(res.date);

        if (res.reset) this.print([{ message: `New cipher create in ${objectdate.locale}`, color: 'blue' }]);
      } catch (error) {
        console.log(error);
        this.print([{ message: error, color: 'red' }]);
      }
    }, 60000);
  }
}

module.exports = Crypto;