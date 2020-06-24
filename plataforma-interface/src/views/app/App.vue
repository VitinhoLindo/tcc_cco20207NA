<template>
  <div id="app">
    <router-view 
      v-bind:auth="auth"
      v-bind:functions="functions"
      v-bind:shared="shared"
      v-on:authentication="authentication" 
    />
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'App',
  async mounted() {
    this.functions = {
      sessionSave   : this.sessionSave,
      sessionFind   : this.sessionFind,
      sessionRemove : this.sessionRemove,
      request       : this.request,
      authentication: this.authentication
    };

    window.onresize   = () => this.$emit('on-resize', this.getOffSetMain());
    window.onkeydown = (event) => this.onkeydown(event);
    await this.getStorage();
  },
  data: () => ({
    session: window.sessionStorage,
    storage: window.localStorage,
    shared : {},
    auth: null,
    functions: {},
    origin: 'http://localhost:3000',
    storageItens: ['login']
  }),
  methods: {
    async getStorage() {
      for (let index in this.storageItens) {
        let key = this.storageItens[index];
        let value = await this.storageFind(key);

        if (value) this.shared[key] = value;
      }
    },
    onkeydown(event) {
      if (event.keyCode == 27) 
        this.$emit('close-all');
    },
    getOffSetMain() {
      let { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    },
    async storageSave(key, value) {
      try {
        this.storage.setItem(key, value)
      } catch (error) { }
      return true;
    },
    async storageClear(key) {
      try {
        this.storage.removeItem(key);
      } catch (error) {}
      return true;
    },
    async storageFind(key) {
      try {
        return this.storage.getItem(key);;
      } catch(error) { return null; }
    },
    async sessionSave(key, value) {
      try {
        this.session.setItem(key, value);
        return true;
      } catch (error) {
        throw 'Failure in save session';
      }
    },
    async sessionFind(key) {
      try {
        return this.session.getItem(key);
      } catch (error) {
        throw 'Failure in find storage item';
      }
    },
    async sessionRemove(key) {
      try {
        this.session.removeItem(key);
        return true;
      } catch (error) {
        throw 'Failure in remove iten session';
      }
    },
    getHeader(headers) {
      let _defaultHeader = {
        'Content-type': 'application/json',
      };

      for (let key in headers) 
        _defaultHeader[key] = headers[key];

      if (this.auth)
        _defaultHeader['Autentication'] = `Bearer ${this.auth}`;

      return _defaultHeader;
    },
    async request(url, method, params, data, headers) {
      try {
        let { data } = await Axios({
          url    : this.origin + url,
          method : method.toUpperCase(),
          params : params,
          data   : data,
          headers: this.getHeader(headers)
        });

        return data;
      } catch (error) { 
        return null;
      }
    },
    async authentication(auth) {
      if (auth.login) this.storageSave('login', auth.login);
      else this.storageClear('login');
      this.auth = auth.token;
      return true;
    }
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  padding: 0%;
  margin: 0%;
}

#app {
  padding: 0%;
  margin: 0%;
}

.options {
  position: fixed;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
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
</style>
