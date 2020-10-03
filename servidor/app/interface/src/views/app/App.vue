<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: '',
  async mounted() {
    // global.listener = this.listener();
    // global.shared = this.readShared();
    // this.listen();
    // await this.getAppImages();
  },
  data: () => {
    return {

    };
    // return {
    //   internal: {
    //     origin: 'http://10.0.0.109:3000'
    //   },
    //   information: {
    //     menu: {
    //       width: 4,
    //       height: 44.5
    //     }
    //   },
    //   apps: {
    //     login: null,
    //     'cadastro-login': null
    //   }
    // };
  },
  methods: {
    readShared() {
      return global.listener.getStorage('shared', 'json') || {};
    },
    async getAppImages() {
      let res = await global.listener.request({
        url: '/app',
        method: 'post',
        body: { appNames: Object.keys(this.apps) }
      });

      this.apps = res.result;
    },
    async listen() {
      window.onkeydown = (event) => this.onkeydown(event);
      window.onresize = (event) => this.onresize(event);
    },
    async onkeydown (event) {
      switch(event.keyCode) {
        case 27:
          global.listener.emit('escape-press', event, { bool: false });
          break;
      }
    },
    async onresize(event) {
      global.listener.emit('resize-automaticable', event, global.listener.offSetMain());

      let start = global.listener.offSetMain();
      await global.listener.sleep(0.4);
      let end = global.listener.offSetMain();

      if (start.innerWidth != end.innerWidth || start.innerHeight != end.innerHeight)
        return; 

      global.listener.call(event, global.listener.offSetMain());
    },
    listener() {
      const characters = {
        latter : 'abcdefghijklmnopqrstuvxywz',
        number : '0123456789',
        super  : '!@#$%*()_+£¢¬<>,.:;^~]}[{ª|§º'
      };
      var functions = [];
      var windows = [];
      var listiners = {};

      const on = (listiner, func) => {
        if (typeof listiner != 'string') return;
        if (typeof func != 'function') return; 
        if (!listiners[listiner]) listiners[listiner] = [];

        listiners[listiner].push(func);
      }

      const emit = (listiner, ...args) => {
        if (listiners[listiner]) {
          listiners[listiner].forEach((func) => {
            func.apply(null, args);
          });
        }
      }

      const push = (func) => {
        if (!func) return;
        if (func.constructor.name == 'Function')
          functions.push(func);
      };

      const remove = (func) => {
        if (!func) return;
        if (func.constructor.name != 'Function') return;

        let index = functions.indexOf(func);
        functions.splice(index, 1);
      }

      const call = (event, data) => {
        functions.forEach((func) => {
          func(event,data);
        });
      }

      const sleep = (time) => {
        time = (parseFloat(time) || 1) * 1000;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, time);
        });
      };

      const getDiv = async (id) => {
        if (!id) return null;

        let division = null, count = 0;
        do {
          if (count == 10) break;

          division = document.getElementById(id);
          await sleep(0.1);
          count++;
        } while(!division);

        return division;
      }

      const getHeader = (headers) => {
        let _defaultHeader = {
          'Content-type': 'application/json',
        };

        for (let key in headers) 
          _defaultHeader[key]             = headers[key];

        if (this.auth)
          _defaultHeader['Autentication'] = `Bearer ${this.auth}`;

        return _defaultHeader;
      };

      const request = async(
        option = {
          url     : '', 
          method  : '', 
          params  : {}, 
          body    : {}, 
          headers : {}
        }
      ) => {
        try {
          let {
            statusText,
            status,
            data
          } = await Axios({
            url     : `${this.internal.origin}${option.url.toLowerCase()}`,
            method  : option.method.toUpperCase(),
            params  : option.params,
            data    : option.body,
            headers : getHeader(option.headers)
          });

          return data;
        } catch (error) {
          let err = error.toJSON();

          return {
            message: err.message,
            status: err.name,
            result: {
              stack: err.stack
            }
          }
        }
      };

      const offSetMain = () => {
        let { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
      };

      const randomNumber = (arg = { min: 0, max: 0 }) => {
        var _variable, decimalHouse = 10, rand;
        if (arg.min > arg.max) {
          _variable = arg.max;
          arg.max = arg.min;
          arg.min = _variable;
        }

        while(arg.max > decimalHouse) {
          decimalHouse += 10;
        }

        do {
          rand = Math.floor(Math.random() * decimalHouse);
        } while(rand < arg.min || rand > arg.max);

        return rand;
      };

      const randomString = (arg = { len: 0 }) => {
        var string = '';

        if (arg.len < 0) arg.len = 0;
        for (let x = 0; x < arg.len; x++) {
          let keys, keyLen, key, values, valueLen, value;

          keys     = Object.keys(characters);
          keyLen   = randomNumber({ min: 0, max: keys.length - 1 });
          key      = keys[keyLen];
          values   = characters[key];
          valueLen = randomNumber({ min: 0, max: values.length - 1 });
          value    = values[valueLen];

          string += value;
        }

        return string;
      }

      const pushWindow = (arg = document.createElement('div'), options = {}) => {
        windows.push({ division: arg, options });
      };

      const getApps = () => {
        let apps = [];

        windows.forEach((app) => {
          apps.push(app.options);
        });

        return apps;
      };

      const removeWindow = (arg = document.createElement('div'), options = {}) => {
        var index = -1;
        windows.forEach((_arg, _index) => {
          if (_arg.division == arg) {
            index = _index;
            return false;
          }
        });
        if (index < 0) return;
        windows.splice(index, 1);
      };

      const maxPositionZ = (arg = document.createElement('div')) => {
        windows.forEach((opt) => {
          if (opt.division == arg)
            arg.style.zIndex = 4;
          else
            arg.style.zIndex = 3;
        });
      }

      const dragend = (event, style = {}) => {
        let { innerWidth, innerHeight } = offSetMain();

        if (style['min-width'] && style['min-height']) {
          event.srcElement.style.width = style['min-width'];
          event.srcElement.style.height = style['min-height'];
        }

        let { x, y } = event;
        if (x < 0)
          x = 0;
        else if (x > innerWidth - 15)
          x = innerWidth - this.information.menu.width - parseInt(event.srcElement.style.width);

        if (y < 0)
          y = 0;
        else if (y > innerHeight - this.information.menu.height - 5)
          y = innerHeight - this.information.menu.height - 20;

        event.srcElement.style.top = `${y}px`;
        event.srcElement.style.left = `${x}px`;
      }

      const center = (arg = document.createElement('div'), style = {}, resizable = false) => {
        var {   width        ,    height    } = arg.getClientRects()[0],
            { innerWidth     ,  innerHeight } = offSetMain(),
              percentX = 0.7, percentY = 0.8,
              windowH = 24;

        if (!style['min-width'] || !style['min-height']) {
          width  = innerWidth  * percentX;
          height = innerHeight * percentY;
        } else {
          width  = parseInt(style['min-width']);
          height = parseInt(style['min-height']);
        }

        if (!resizable) {
          arg.style.width = `${width}px`;
          arg.style.height = `${height}px`;
        }

        emit('resize-window', { 
          id: arg.id,
          offset: {
            width,
            height
          }
        });

        var centerX = Math.floor((innerWidth / 2) - (width / 2)),
            centerY = Math.floor(((innerHeight / 2) - this.information.menu.height) - (height / 2));

        arg.style.top = `${centerY}px`;
        arg.style.left = `${centerX}px`;
      }

      const maximize = (arg = document.createElement('div'), style = {}, resizable = false) => {
        let { innerWidth, innerHeight } = offSetMain();
        let width, height;

        if (style['max-width'] && style['max-height']) {
          width  = parseInt(style['max-width']); 
          height = parseInt(style['max-height']);

          if (width > innerWidth) {
            width  = innerWidth - this.information.menu.width;
          }
          if (height > innerHeight) {
            height = innerHeight - this.information.menu.height;
          }
        } else {
          width  = innerWidth - this.information.menu.width;
          height = innerHeight - this.information.menu.height;
        }

        arg.style.width  = `${width}px`;
        arg.style.height = `${height}px`;

        if (!resizable) {
          arg.style.top = '0px';
          arg.style.left = '0px';
        }

        emit('resize-window', { 
          id: arg.id,
          offset: {
            width,
            height
          }
        });
      };

      const saveStorage = (key, value) => {
        try {
          window.localStorage.setItem(key, value);
        } catch (error) {
          console.error(error);
        }
      }

      const getStorage = (key, parse) => {
        try {
          let value = window.localStorage.getItem(key);

          if (parse == 'json')
            return JSON.parse(value);
          else
            return value;
        } catch (error) {
          console.error(error);
          return null;
        }
      }

      const deleteStorage = (key) => {
        try {
          window.localStorage.removeItem(key);
        } catch (error) {
          console.error(error);
        }
      }

      const authentication = async (auth) => {
        let shared = getStorage('shared', 'json');

        shared.auth = auth;
        saveStorage('shared', JSON.stringify(shared));
        global.shared = shared;
      };

      const getApplications = (key) => {
        let count = 0;
        if (!key) {
          if (!global.shared) {
            return {
              login: this.apps['login']
            };
          }

          delete this.apps.login;
          return this.apps;
        }


        while(!this.apps[key]) { 
          if (count == 20) break;
          count++;
        }


        return this.apps[key];
      };

      return {
        push,
        remove,
        call,
        sleep,
        getDiv,
        request,
        offSetMain,
        dragend,
        randomNumber,
        randomString,
        pushWindow,
        removeWindow,
        maxPositionZ,
        maximize,
        center,
        getApps,
        saveStorage,
        getStorage,
        deleteStorage,
        on,
        emit,
        authentication,
        getApplications
      };
    }
  }
}
</script>

<style lang="scss">
html body {
  padding: 0px;
  margin: 0px;
}
.app-box {
  -webkit-border-radius: 3px;
  border: 2px solid #2c3e50;
  background-color: #ffffff;
  z-index: 4;
  position: fixed;
      
  align-items: center;
  justify-content: center;
  text-align: center;

  .field {
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 300px;
    margin: 0px 5px;
    div {
      margin: 5px 2px;
      .input-text {
        text-align: center;
        padding: 1px 4px;
        width: 220px;
        font-size: 14px;
        height: 22px;
        cursor: text;
        -webkit-border-radius: 4px;
        border: 1px solid #3498db;
      }
      .input-text:hover {
        box-shadow: 0 0 2px 0 #3498db;
        border: 1px solid #3498db;
        outline: 0;
      }
    }
    .error {
      min-height: 5px;
      max-width: 200px;
      font-size: 12px;
      color: red;
      margin: auto;
    }
    .message {
      min-height: 5px;
      max-width: 200px;
      padding: 0px;
      text-align: center;
      font-size: 12px;
      margin: auto;
    }
  }
  .link {
    cursor: pointer;
    color: #3498db;
  }
  .link:hover {
    opacity: 0.6;
  }
  .btn-flex {
    button {
      -webkit-border-radius: 4px;
      border: 1px solid #aaaaaa;
      cursor: pointer;
      margin: 10px 0px;
      width: 100px;
      height: 35px;
      font-size: 12px;
      background-color: #eeeeee;
    }
    button:hover {
      background-color: #ffffff;
      box-shadow: 0px 0px 6px 0px #aaaaaa;
    }
  }
  .column {
    border: 1px solid #000000;
    width: 150px;
    height: 150px;
  }
}

.flex {
  display: flex;
}

*::-webkit-scrollbar-track
{
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  // border-radius: 5px;
  // background-color: #FFFFFF;
}

*::-webkit-scrollbar
{
  width: 2px;
  height: 2px;
  background-color: #FFFFFF;
}

*::-webkit-scrollbar-thumb
{
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px #aaaaaa;
  background-color: #aaaaaa;
}
</style>
