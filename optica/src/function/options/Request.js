class Request {
  constructor() {
    this.url     = '';
    this.method  = '';
    this.params  = {};
    this.data    = {};
    this.headers = {};
  }
}

export default new Request;