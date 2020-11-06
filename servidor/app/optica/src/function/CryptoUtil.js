class Util {  
  constructor() { }

  arrayBufferToBase64String(binary = new ArrayBuffer()) {
    // cria visualização do binario lido na chave
    var byteArray = new Uint8Array(binary);
    var string    = '';

    for(var index = 0; index < byteArray.byteLength; index++) {
      // obtem formato de string do binario
      string += String.fromCharCode(byteArray[index]);
    }

    // btoa converte para base 64
    return btoa(string);
  }

  binaryToPem(binary = new ArrayBuffer(), label = 'RSA PUBLIC KEY') {
    let keyBase64 = this.arrayBufferToBase64String(binary);
    let nextIndex = 0;

    let pemCert = `-----BEGIN ${label}-----\r\n`;
    while(nextIndex < keyBase64.length) {

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
    pemCert    += `-----END ${label}-----\r\n`;

    return pemCert;
  }
}

export default Util;