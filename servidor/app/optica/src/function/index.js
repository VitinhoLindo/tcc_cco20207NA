import Axios from 'axios'

import Calendar from './Calendar'
import Storage from './Storage'
import Cache from './Cache'
import Request from './options/Request'
import Application from '../applications'
import IconsBase64 from './base64.json'

class App extends Cache {

  constructor(Vue) {
    super();
    this.vue          = Vue;
    this.ip           = '10.0.0.109';
    this.path         = `http://${this.ip}:3000`;
    this.storage      = Storage;
    this.calendar     = Calendar;
    this.applications = Application;
    this.languages    = null;
    this.timeInterval = 1000;
    this.iconsBase64  = IconsBase64;
  }

  defaultHeader(headers = {}) { 
    let defaultHeader = {
      'Content-type': 'application/json',
    };

    for (let key in defaultHeader) 
      if (headers[key]) continue;
      else headers[key] = defaultHeader[key];

    headers['Authorization'] = (this.storage.shared && this.storage.shared.auth) ? `Bearer ${this.storage.shared.auth}` : '';

    return headers;
  }

  async request(option = Request) {
    try {
      let { data } = await Axios({
        url     : `${this.path}${option.url.toLowerCase()}`,
        method: (option.method || 'get').toUpperCase(),
        headers : this.defaultHeader(option.headers),
        params  : option.params || {} ,
        data    : option.data || {}
      });

      return data;
    } catch (error) {
      let err = error.toJSON();

      return {
        status: 'error',
        message: err.message,
        result: {
          stack: err.stack
        }
      };
    }
  }

  sleep(time) {
    time = (parseFloat(time) || 1) * 1000;
    return new Promise((resolve) => {
      setTimeout(() => { resolve(true); }, time); 
    });
  }

  random(min, max) {
    let _max, decimalHouse = 10, rand;

    if (min > max) {
      _max = max; max = min; min = _max;
    }

    while(max > decimalHouse) {
      decimalHouse += 10;
    }

    do {
      rand = Math.floor(Math.random() * decimalHouse);
    } while(rand < min || rand > max);

    return rand;
  }

  characters(_super = false) {
    let object = {
      latter: 'abcdefghijklmnopqrstuvxywz',
      number: '0123456789'
    };

    if (_super) object.super = '!@#$%*()_+£¢¬<>,.:;^~]}[{ª|§º';

    return object;
  }

  randomString(len, _super = false) {
    let characters = this.characters(_super),
        rand = '';

    if (len < 0) len = len * (-1);
    for (let x = 0; x < len; x++) {
      let keys, keyLen, key, values, valueLen, value;

      keys     = Object.keys(characters);
      keyLen   = this.random(0, keys.length - 1);
      key      = keys[keyLen];
      values   = characters[key];
      valueLen = this.random(0, values.length - 1);
      value    = values[valueLen];

      rand += value;
    }

    return rand;
  }

  async getDiv(id, trying = 1000) {
    let count = 0, division = null;

    if (!id) return division;
    do {
      if (count == trying) break;

      division = document.getElementById(id);
      await this.sleep(0.01);
      count++;
    } while(!division);

    return division;
  }

  async setlanguage(language) {
    let res = await this.request({
      url: '/translate',
      method: 'GET',
      params: {
        lang: language
      }
    });

    this.data.language = {
      lang: language,
      labels: res.result
    };

    this.emit('language-change');
    this.getLanguages();
  }

  async getLanguages() {
    let res = await this.request({
      url: '/translate/languages',
      method: 'get'
    });

    this.languages = res.result.languages || null;
  }

  $Language() {
    return this.data.language;
  }

  $Languages() {
    return this.languages;
  }

  readStorage() {
    for (let key of this.storage.default) {
      this.storage.data[key] = this.storage.get(key, 'json') || {};
    }
  }

  async build() {
    this.readStorage();
    await this.setlanguage(navigator.language);
  }
}

export default async function (Vue) {
  Vue.config.globalProperties.$app = new App(Vue);
  await Vue.config.globalProperties.$app.build();
}