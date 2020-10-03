import Axios from 'axios'
import Request from './options/Request'

class App {
  
  constructor() {
    this.path = 'http://10.0.0.109:3000';
    this.storage = window.localStorage;
  }

  defaultHeader() {}

  async request(option = Request) {
    try {
      let {
        statusText,
        status,
        data        
      } = await Axios({
        url     : `${this.path}${option.url.toLowerCase()}`,
        method  : option.method.toUpperCase(),
        params  : option.params,
        data    : option.data,
        headers: this.defaultHeader(option.headers)
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
}

export default function (Vue) {
  console.log(App);
  Vue.config.globalProperties.$app = new App;
}