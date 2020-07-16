<template>
  <div id="app" v-on:contextmenu="contextMenu">
    <app-loading 
      v-if="loading.on"
      v-bind:loading="loading.type"
    />

    <app-acesso 
      v-if="!auth" 
      v-bind:functions="functions"
      v-bind:shared="shared"
    />

    <router-view
      id="router"
      v-bind:auth="auth"
      v-bind:functions="functions"
      v-bind:shared="shared"
      v-on:authentication="authentication" 
    />

    <app-menu 
      v-bind:functions="functions" 
      v-bind:shared="shared" 
      v-bind:auth="auth" 
    />
  </div>
</template>

<script>
import Axios from 'axios';

import Menu from '../menu/Menu';
import Acesso from '../../components/acesso/Acesso';
import LoadingView from '../../components/loader/LoadingView';

export default {
  name: 'App',
  components: {
    AppLoading : LoadingView,
    AppMenu    : Menu,
    AppAcesso  : Acesso
  },
  async mounted() {
    this.functions = {
      sessionSave      : this.sessionSave,
      sessionFind      : this.sessionFind,
      sessionRemove    : this.sessionRemove,
      request          : this.request,
      authentication   : this.authentication,
      sleep            : this.sleep,
      windowOffSet     : this.getOffSetMain,
      eventPromise     : this.eventPromise,
      getDivision      : this.getDivision,
      getOffSet        : this.getOffSet,
      emmiter          : this.emmiter,
      getMousePosition : this.getMousePosition,
      setPosition      : this.setPosition,
      maximize         : this.maximize,
      setOffSet        : this.setOffSet
    };

    await this.getStorage();
    this.listiner();
  },
  data: () => ({
    session      : window.sessionStorage,
    storage      : window.localStorage,
    shared       : {},
    auth         : null,
    functions    : {},
    origin       : 'http://10.0.0.108:8181',
    storageItens : ['login'],
    loading      : { on: true, type: '' },
    mouse        : { x: 0, y: 0 }
  }),
  methods: {
    contextMenu(event) {
      event.preventDefault();
    },
    async onmousemove(event) {
      this.mouse = { x: event.x, y: event.y };
    },
    getMousePosition() {
      return this.mouse;
    },
    async emmiter(event, data, callback) {
      this.$emit(event, data, callback);
    },
    async listiner() {
      window.onresize    = async () => this.emmiter('on-resize', this.getOffSetMain());
      window.onkeydown   = (event)  => this.onkeydown(event);
      window.ondrop      = (event)  => this.ondrop(event);

      this.$on('loading',         this.loadingController);
      this.loadingController({ on: true, sleep: 4 });
    },
    async getDivision(id) {
      let doc = document.getElementById(id);

      if (!doc) {
        await this.sleep(0.1);
        return await this.getDivision(id);
      }

      return doc;
    },
    async maximize(div = document.createElement('div'), parent = null, offset = null) {
      let menu = await this.getDivision('menu');

      var { innerWidth, innerHeight }   = this.getOffSetMain();
      var { offsetWidth, offsetHeight } = this.getOffSet(menu);

      if (offset) {
        this.setOffSet(
          div,
          offset.height,
          offset.width
        );

        let y = innerHeight   / 2;
        let x = innerWidth    / 2;
        y    -= offset.height / 2;
        x    -= offset.width  / 2;
        if (parent) this.setPosition(x, y, parent);
      } else {
        if (parent) this.setPosition(0, 0, parent);
        this.setOffSet(
          div,
          innerHeight - offsetHeight,
          innerWidth
        );
      }
    },
    setOffSet(division = document.createElement('div') ,height, width = 360) {
      division.style.width = `${width}px`;
      division.style.height = `${height}px`;
    },
    setPosition(x, y, division) {
      division.style.top  = `${y}px`;
      division.style.left = `${x}px`;
    },
    getOffSet(division) {
      let    { offsetWidth, offsetHeight } = division;
      return { offsetWidth, offsetHeight };
    },
    getOffSetMain() {
      let    { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    },
    onkeydown(event) {
      if (event.keyCode == 27) this.emmiter('close-all');
    },
    async loadingController(opt = { on: false, type: '', sleep: 0 }) {
      this.loading.on   = opt.on;
      this.loading.type = opt.type;
 
      if (!opt.sleep)  return true;

      await this.sleep(opt.sleep);
      this.loading.on   = false;
    },
    sleep(time) {
      time  = parseFloat(time) || 1;
      time *= 1000;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, time);
      });
    },
    eventPromise(opt = { eventName: '', data: {}, awaitResponse: false }) {
      return new Promise((resolve, reject) => {
        if (!opt.awaitResponse) {
          if (opt.data) this.emmiter(opt.eventName, opt.data);
          else          this.emmiter(opt.eventName);
          return        resolve(true);
        }

        if (opt.data)   this.emmiter(opt.eventName, opt.data, (err, result) => {
          if (err)      return reject(err);
          else          return resolve(result);
        });
        else            this.emmiter(opt.eventName, (err, result) => {
          if (err)      return reject(err);
          else          return resolve(result);
        });
      });
    },
    async getStorage() {
      this.storageItens.forEach(async (key) => {
        let value                   = await this.storageFind(key);
        if (value) this.shared[key] = value;
      });
    },
    async storageSave(key, value) {
      this.storage.setItem(key, value);
      return true;
    },
    async storageClear(key) {
      this.storage.removeItem(key);
      return true;
    },
    async storageFind(key) {
      return this.storage.getItem(key);;
    },
    async sessionSave(key, value) {
      try {
        this.session.setItem(key, value);
        return true;
      } catch (error) { throw 'Failure in save session'; }
    },
    async sessionFind(key) {
      try {
        return this.session.getItem(key);
      } catch (error) { throw 'Failure in find storage item'; }
    },
    async sessionRemove(key) {
      try {
        this.session.removeItem(key);
        return true;
      } catch (error) { throw 'Failure in remove iten session'; }
    },
    getHeader(headers) {
      let _defaultHeader = {
        'Content-type': 'application/json',
      };

      for (let key in headers) 
        _defaultHeader[key]             = headers[key];

      if (this.auth)
        _defaultHeader['Autentication'] = `Bearer ${this.auth}`;

      return _defaultHeader;
    },
    async request(
      option = {
        url     : '', 
        method  : '', 
        params  : {}, 
        body    : {}, 
        headers : {}
      }
    ) {
      try {
        let {
          statusText,
          status,
          data
        } = await Axios({
          url     : `${this.origin}${option.url.toLowerCase()}`,
          method  : option.method.toUpperCase(),
          params  : option.params,
          data    : option.body,
          headers : this.getHeader(option.headers)
        });

        switch (data.status || '') {
          case 'error':   return { 
            error   : true, 
            message : (data.result && data.result.message) ? data.result.message : data.message, 
            code    : data.code 
          };
          case 'success': return data.result || {};
          default:        throw 'error'
        }
      } catch (error) { return null; }
    },
    async authentication(auth) {
      if (auth.login) this.storageSave('login', auth.login);
      else            this.storageClear('login');

      this.auth = auth.token;
      return true;
    }
  }
}
</script>

<style>
html, body {
  padding: 0%;
  margin: 0%;
}

*::-webkit-scrollbar {
  width: 6px;
}
*::-webkit-scrollbar-button {

}
*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  border-radius: 10px;
}
*::-webkit-scrollbar-track-piece {

}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.5); 
}
*::-webkit-scrollbar-corner {

}
*::-webkit-resizer {

}

#app {
  padding: 0%;
  margin: 0%;
  width: 100%;
  height: 100%;
}

.options {
  fill: #ffffff;
  position: fixed;
  width: 30px;
  height: 30px;
}

.bottom.left {
  bottom: 5px;
  left: 5px;
}

.bottom.right {
  bottom: 5px;
  right: 5px;
}

.options:hover {
  opacity: 0.5;
}

.optbutton {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 190px;
  background-color: #a29bfe;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.cl-white {
  color: #ffffff
}

.flex {
  display: flex;
}

.no-padding {
  padding: 0%;
}

.no-margin {
  margin: 0%;
}
.margin-5-center {
  margin: 5px auto;
}
.margin-10-center {
  margin: 10px auto;
}
.margin-center {
  margin: auto;
}
.pointer {
  cursor: pointer;
}
.flex-opt {
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.ul-button {
  border: none;
  width: 170px;
  margin: 5px 10px;
  background-color: #a29bfe;
}
.ul-button:hover {
  opacity: 0.5;
}
.ul-button:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}
.flex-button {
  cursor: pointer;
  border: none;
}
.bg-default {
  background-color: #a29bfe;
}
.bg-white-button {
  background-color: #ffffff;
}
.bg-default-button {
  background-color: #8c7ae6;
}
.bg-blue-button {
  background-color: #0984e3;
}

.bg-red-button {
  background-color: #d63031;
}

.flex-button:hover {
  opacity: 0.5;
}
.flex-button:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}

.font-17 {
  font-size: 17;
}

.font-20 {
  font-size: 20;
}

.pd-tp-bt-5px {
  padding: 5px 0px;
}

.w4-4 {
  width: 100%;
}
.w4-10 {
  width: 40%;
}
.w5-10 {
  width: 50%;
}
.w8-10 {
  width: 80%;
}
.w10-10 {
  width: 100%;
}

.hp15 {
  height: 15%;
}
.hp19-5 {
  height: 19.5%;
}
.hp35 {
  height: 35%;
}
.hp20 {
  height: 20%;
}
.hp25 {
  height: 25%;
}
.h20 {
  height: 20px;
}
.h40 {
  height: 40px;
}
.h1-10 {
  height: 10%;
}
.h2-10 {
  height: 20%;
}
.default-input {
  border: 1px solid #bdc3c7;
  font-size: 15px;
}
.default-input:focus {
  box-shadow: 0 0 2px 0 #3498db;
  border: 1px solid #3498db;
  outline: 0;
}
.t-rl-10 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.b-rl-10 {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.item-center {
  align-items: center;
  justify-content: center;
}
.option-page {
  width: 100%;
  height: 20px;
  background-color: #050755;
  text-align: right;
}
.option-page .img {
  width: 18px;
  height: 19px;
  cursor: pointer;
}
.option-page .img:hover {
  opacity: 0.5;
  width: 16px;
  height: 16px;
  border: 1px solid #ffffff;
}
</style>
