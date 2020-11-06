// import CryptoJs from 'crypto-js'
import Util from './CryptoUtil'

class Crypto extends Util {

    constructor() {
        super();
        this.keyAlgorithm   = 'RSA-OAEP';
        this.hashAlgorithm  = 'SHA-256' ;
        this.modulusLength  = 2048;
        this.publicExponent = new Uint8Array([1, 0, 1]);

        this.secret = {
            app: {
                privateKey: '',
                publicKey: ''
            },
            server: {
                publicKey: '',
                datePublic: new Date()
            },
        };
    }

    setCrypto(crypto = window.crypto) {
        this.crypto = crypto;
    }

    async generateKeys() {
        console.log('aqui');
        try {
            let { publicKey, privateKey } = await this.crypto.subtle.generateKey({
                name: this.keyAlgorithm,
                modulusLength: this.modulusLength,
                publicExponent: this.publicExponent,
                hash: this.hashAlgorithm
            }, true, ['encrypt', 'decrypt']);
    
            this.secret.app.privateKey = privateKey;
            this.secret.app.publicKey  = publicKey ;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async exportPublicKey() {
        try {
            let binary = await this.crypto.subtle.exportKey('spki', this.secret.app.publicKey);
            return this.binaryToPem(binary);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async importPublicKey() {

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
                hashable = CryptoJs.SHA256(value);
                break;
        }

        switch (option.format) {
            case 'hex':
            default:
                hash = hashable.toString(CryptoJs.enc.Hex);
                break;
        }

        return hash;
    }
}

export default Crypto;