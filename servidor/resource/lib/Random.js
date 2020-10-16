const Loggable = require('./Loggable');

const characters = {
  latter : 'abcdefghijklmnopqrstuvxywz',
  number : '0123456789',
  super  : '!@#$%*()_+£¢¬<>,.:;^~]}[{ª|§º'
};

class OptionRandomString {
  len = 0;
}

class OptionRandomNumber {
  min = 0;
  max = 0;
}

class Random extends Loggable {
  constructor() { super(); }

  getCharacter() {
    return characters;
  }

  getRandom(arg = new OptionRandomNumber()) {
    let decimalHouse = 10;
    if (arg.min > arg.max) {
      let _max = arg.max;
      arg.max = arg.min;
      arg.min = _max;
    }

    while(arg.max > decimalHouse)
      decimalHouse += 10;

    let randValue = 0;
    do {
      randValue = Math.floor(Math.random() * decimalHouse);
    } while (randValue < arg.min || randValue > arg.max);

    return randValue;
  }

  getRandomString(arg = new OptionRandomString()) {
    var string = '';

    if (arg.len < 0) arg.len = 0;
    for (let x = 0; x < arg.len; x++) {
      let keys, keyLen, key, values, valueLen, value;

      keys     = Object.keys(characters);
      keyLen   = this.getRandom({
        min: 0,
        max: keys.length - 1
      });
      key      = keys[keyLen];
      values   = characters[key];
      valueLen = this.getRandom({
        min: 0,
        max: values.length - 1
      });
      value    = values[valueLen];

      string += value;
    }

    return string;
  }
}

module.exports = Random;