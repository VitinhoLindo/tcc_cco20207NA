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
    global.app = this.app();
    global.shared = this.readShared();
    this.listen();
  },
  data: () => {
    return {
      internal: {
        origin: 'http://localhost:3000'
      },
      information: {
        menu: {
          width: 4,
          height: 44.5
        }
      }
    };
  },
  methods: {
    readShared() {
      return global.app.getStorage('shared', 'json') || {};
    },
    async listen() {
      window.onresize = (event) => this.onresize(event);
    },
    app() {
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
        if (style['min-width'] && style['min-height']) {
          let { innerWidth, innerHeight } = offSetMain();

          let [screenCenterWidth, screenCenterHeight] = [
            innerWidth / 2, (innerHeight / 2) - this.information.menu.height
          ];
          let [width, height] = [
            parseInt(style['min-width']),
            parseInt(style['min-height'])
          ];

          if (!resizable) {
            arg.style.width = `${width}px`;
            arg.style.height = `${height}px`;
          }

          let [positionX,positionY] = [
            Math.floor(screenCenterWidth - width / 2),
            Math.floor(screenCenterHeight - height / 2)
          ];

          arg.style.top = `${positionY}px`;
          arg.style.left = `${positionX}px`;
        }
      };

      const maximize = (arg = document.createElement('div'), style = {}, resizable = false) => {
        let { innerWidth, innerHeight } = offSetMain();

        if (style['max-width'] && style['max-height']) {
          let [width, height] = [
            parseInt(style['max-width']),
            parseInt(style['max-height'])
          ];

          if (width > innerWidth) {
            style['max-width'] = `${innerWidth - this.information.menu.width}px`;
          }
          if (height > innerHeight) {
            style['max-height'] = `${innerHeight - this.information.menu.height}px`;
          }

          arg.style.width = style['max-width'];
          arg.style.height = style['max-height'];
        } else {
          arg.style.width = `${innerWidth - this.information.menu.width}px`;
          arg.style.height = `${innerHeight - this.information.menu.height}px`;
        }

        if (!resizable) {
          arg.style.top = '0px';
          arg.style.left = '0px';
        }
      };

      const getApps = () => {
        let apps = [];

        windows.forEach((app) => {
          let _app = Object.assign({}, app.options);
          _app.division = app.division;
          apps.push(_app);
        });

        return apps;
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
        console.log(auth);
        let shared = getStorage('shared', 'json');

        if (!shared) shared = {};
        shared.auth = auth;
        saveStorage('shared', JSON.stringify(shared));
        global.shared = shared;
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
        authentication
      };
    },
    async onresize(event) {
      let start = global.app.offSetMain();
      await global.app.sleep(0.4);
      let end = global.app.offSetMain();

      if (start.innerWidth != end.innerWidth || start.innerHeight != end.innerHeight)
        return; 

      global.app.call(event, global.app.offSetMain());
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
  z-index: 4;
  position: fixed;
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
