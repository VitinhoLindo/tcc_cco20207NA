import CryptoUtil from './CryptoUtil'

class MyCrypto extends CryptoUtil {

  constructor() { super(); }

  async generateKeys() {
    try {
      let { publicKey, privateKey } = await window.crypto.subtle.generateKey({
        name: this.keyAlgorithm,
        modulusLength: this.modulusLength,
        publicExponent: this.publicExponent,
        hash: this.hashAlgorithm
      }, true, ['encrypt', 'decrypt']);

      this.secret.app.privateKey = privateKey;
      this.secret.app.publicKey = publicKey;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async exportPublicKey() {
    try {
      let binary = await window.crypto.subtle.exportKey('spki', this.secret.app.publicKey);
      return this.binaryToPem(binary);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async importPublicKey(pem = '') {
    return await window.crypto.subtle.importKey('spki', this.pemToBinary(pem), {
      name: this.keyAlgorithm,
      hash: this.hashAlgorithm
    }, false, ['encrypt']);
  }

  getIv() {
    return window.crypto.getRandomValues(new Uint8Array(this.ivLen));
  }

  async encrypt(value = '') {
    let encryptBuffer = await window.crypto.subtle.encrypt({
      name: this.keyAlgorithm,
      iv: this.getIv()
    }, this.secret.server.publicKey, this.textToArrayBuffer(value));

    return this.arrayBufferToBase64String(encryptBuffer);
  }

  async decrypt(value = '') {
    let decryptBuffer = await window.crypto.subtle.decrypt({
      name: this.keyAlgorithm,
      iv: this.getIv()
    }, this.secret.app.privateKey, this.base64StringToArrayBuffer(value));

    return this.arrayBufferToString(decryptBuffer);
  }

  hashType() {
    return {
      algorithm: 'sha256',
      format: 'hex'
    };
  }

  hash(value = '') {
    let hash = '';
    let hashable = null;
    let option = this.hashType();

    switch (option.algorithm) {
      case 'sha256':
      default:
        hashable = this.CryptoJs.SHA256(value);
        break;
    }

    switch (option.format) {
      case 'hex':
      default:
        hash = hashable.toString(this.CryptoJs.enc.Hex);
        break;
    }

    return hash;
  }

  async sync() {
    await this.generateKeys();
    let key = await this.exportPublicKey();

    let response = await this.request({
      url: '/sync',
      method: 'POST',
      data: { publicKey: key, date: new Date() }
    });

    this.secret.server.publicKey = await this.importPublicKey(response.result.key);
    this.secret.server.datePublic = new Date(response.result.date);
  }
}

export default MyCrypto;