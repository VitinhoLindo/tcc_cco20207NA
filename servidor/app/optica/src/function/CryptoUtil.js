class Util {
  constructor() { }

  arrayBufferToBase64String(binary = new ArrayBuffer()) {
    // cria visualização do binario lido na chave
    var byteArray = new Uint8Array(binary);
    var string = '';

    for (var index = 0; index < byteArray.byteLength; index++) {
      // obtem formato de string do binario
      string += String.fromCharCode(byteArray[index]);
    }

    // btoa converte para base 64
    return btoa(string);
  }

  base64StringToArrayBuffer(base64 = '') {
    // convert base64 to string
    let byteStr = atob(base64);

    // inicializando novo ArrayBuffer com o length da string;
    let bytes = new Uint8Array(byteStr.length);

    for (var index = 0; index < byteStr.length; index++) {
      // pegando binario do character ASCII
      bytes[index] = byteStr.charCodeAt(index);
    }

    return bytes.buffer;
  }

  binaryToPem(binary = new ArrayBuffer(), label = 'RSA PUBLIC KEY') {
    let keyBase64 = this.arrayBufferToBase64String(binary);
    let nextIndex = 0;

    let pemCert = `-----BEGIN ${label}-----\r\n`;
    while (nextIndex < keyBase64.length) {

      // verifica se existe mais de 64 caracteres para serem lidos
      if (nextIndex + 64 <= keyBase64.length) {
        pemCert += `${keyBase64.substr(nextIndex, 64)}\r\n`;
      }
      // se não escreve os que tem
      else {
        pemCert += `${keyBase64.substr(nextIndex)}\r\n`;
      }
      nextIndex += 64;
    }
    pemCert += `-----END ${label}-----\r\n`;

    return pemCert;
  }

  pemToBinary(pem = '') {
    let lines = pem.split('\n')
    let encoded = ''
    for (let line = 0; line < lines.length; line++) {
      if (lines[line].trim().length > 0 &&
        lines[line].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 &&
        lines[line].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
        lines[line].indexOf('-END RSA PRIVATE KEY-') < 0 &&
        lines[line].indexOf('-END RSA PUBLIC KEY-') < 0) {
        encoded += lines[line].trim()
      }
    }

    return this.base64StringToArrayBuffer(encoded);
  }
}

export default Util;