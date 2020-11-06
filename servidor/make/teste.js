const crypto = require('crypto');
const fs = require('fs');

// console.log(crypto.webcrypto);

// TLS_RSA_WITH_AES_128_CBC_SHA
// console.log(crypto.webcrypto);
let { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: ''
  }
});

fs.writeFile('./rsa-priv.pem', privateKey, () => {});
fs.writeFile('./rsa-pub.pem', publicKey, () => {});


// let ciphers = crypto.getCiphers();

// console.log(ciphers.forEach((a) => console.log(a)));
// let _crypto = {
//   "privateKey":"-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIC3TBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIuNLImEF2BKsCAggA\nMAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBCplyDoQSmhXHT9NQ+cpBZ+BIIC\ngDO+4FoMbNHpHuFXsReBqI2NlnDQcvpqxgqjfNRRaZEVpd56ErLuBLUodVutYfHc\nAHbQwOdSP4FKWg5lZcYNWueVHqEilZL8XSulaAQy6UyzxzkkD9woz4j8tHPJMAEr\n+10xYwpS+SCAFZ5KpjuJmXPr3r9Yv9TFMiQiFCjyUn7bK0pg3yqPDu56kFmTACk6\nht/Jsl77X73GZ8cUL6hHCMmh/vXP3n0l9WK6Iq1VXHXOqdfbgh/DhN7nagaJzlHM\nhtTIDdBtX3vzIZKht/tbPVsDGSs0US1g9QzblXtvXoE5ym8O5KjaMWYj2B5VkpHC\nGGiWgBU7WLkGmJCz9VYC2Mq8Q1AakDU9o2+DqMzckrq2lDxYKIK1Bx+yOLQGu803\nCbdX+lgdPtayI2Etwg/0ED/O+00i0y/QHZP2peRdHIDthrF7cP2iCtVKMMRP1a0P\nv4UkrVzL31c3RISXqXOI7a0yvgyeqVSrwiVDEwqpRrsdf4LnNjA2R9yXxDy3obuQ\nUXLgiCcfx6bndB9T6qPJu04c5QG9Ckf7Rv4tR/TObSHREv+MMP2yID+l4j0l5oHh\nDqwKtGvn2vItuJoJZwEaATcC+vq9M44JCZWAiIjH2bAY6GFXvYZb8rJcXBcmUoTt\n7cDJCnW1eDk0DEoJJ3TR5IHR1pOnVXoSg9oxJHgC6YRk271gFuEic0VK9Tbn3sOt\ntVHjmkkK3OW3qOKfApV9cOD3XQWN2PvYuYk+ZPnJVHTfpVT+tjb3XxFIpIzMJl9L\nWz57l5A10EyJwyuZjxGPOwljf7uprSmCvxGdIloBqt6+hK2YqbPY+APktE7HjFbZ\nzeGBMDie4L1M0BB37hp5A50=\n-----END ENCRYPTED PRIVATE KEY-----\n",
//   "publicKey":"-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+wrQoWNy8n8diRXTfXuZC6bc3\nOiE6PEiD9d8tjL2fTaMAi64XyGR/DykrJ5YAQSKF5M1q8WL5mWPEQvk6OfV1jZ/2\n2SLetP7H+F0oOKQG1jZ1qLxIYz6nTAMxxXTXPG6i1kk1HAHdQDZooZg3Ou1xfZni\nZKJ6mq9XR1Z1uGqVNQIDAQAB\n-----END PUBLIC KEY-----\n",
//   "pass":{"type":"Buffer","data":[125,107,194,186,111,57,119,116,194,172,115,125,54,48,110,114,64,121,113,111,115,41,101,50,52,123,91,102,50,55,194,162,95,58,46,52,40,109,126,41,123,194,186,94,194,167,124,40,107,51,194,163,115,94,116,41,40,103,58,94,119,117,54,194,186,94,117,194,170,57,35,55,55,40,57,122,48,54,54,35,40,62,55,48,48,117,46,113,40,50,117,110,99,56,104,100,52,59,50,124,49,48,49,54,112,53,54,54]},
//   "date":"2020-11-05T03:47:50.074Z"};

// function encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
//   const buffer = Buffer.from(toEncrypt, 'utf8')

//   const encrypted = crypto.publicEncrypt(_crypto.publicKey, buffer)
//   return encrypted.toString('base64')
// }

// function decrypt(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
//   const buffer = Buffer.from(toDecrypt, 'base64')

//   const decrypted = crypto.privateDecrypt(
//     {
//       key: _crypto.privateKey,
//       passphrase: (Buffer.from(_crypto.pass)).toString('utf8'),
//     },
//     buffer,
//   )

//   return decrypted.toString('utf8')
// }

// const enc = encrypt('teste', `public.pem`)
// console.log('enc', enc)

// const dec = decrypt(enc, `private.pem`)
// console.log('dec', "bzOCNxhBy/l6UwitOCF6bXX+4EE22r4/Irp+M4XQIbKqW/7zGIJZXGdrXXg6LR0/QfMC2i6QnQtaei3LOO8W/BQfho14+Sn/kzwfSV8T35uGSId2aNpfkIE0okHJJEkHGwUe7NkvjR8CDaQrmXX0ugwJ1xod4F/H/CreY0vPV5c=")