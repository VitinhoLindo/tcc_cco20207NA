import IconsBase64 from './lib/base64.json'
import Collection from './lib/Collection'
import RequestOption from './lib/options/Request'

import CryptoJs from 'crypto-js'
import Axios from 'axios'

class Variables {
    constructor() {
        this.window = window
        this.storage = this.window.localStorage;
        this.body = this.window.document.body;

        this.apps = {};
        this.formData = {};

        //
        this.Axios = Axios;
        this.requestOptions = RequestOption;

        //
        this.CryptoJs = CryptoJs;

        this.Collection = Collection;

        //
        this.storageDefault = ['shared'];

        //
        this.language = null;
        this.languages = null;

        //
        this.iconsBase64 = IconsBase64;

        this.listiners = {};
        this.rules = {};

        //
        this.validateRSATimeMinutes = 1;
        this.timeInterval = 1000;

        //
        this.keyAlgorithm = 'RSA-OAEP';
        this.hashAlgorithm = 'SHA-256';
        this.modulusLength = 2048;
        this.publicExponent = new Uint8Array([1, 0, 1]);
        this.ivLen = 16;

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
}

export default Variables;