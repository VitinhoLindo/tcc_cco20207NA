<template>
  <div
    v-if="!autenticable && internal.on"
    v-show="internal.show"
    v-bind:id="internal.id"
    class="app-box"
    v-bind:style="internal.style"
  >
    <app-window
      v-if="internal.id"
      v-bind:variables="{
        component: internal.id,
        style: internal.style,
        app: app
      }" v-on:listiner="listiner"
    />
    <div class="content-login">
      <access
        v-if="internal.controller.access.on"
        v-on:listen="controller"
        v-bind:shared="internal.controller.access.shared"
      />
      <forgotem
        v-if="internal.controller.forgotem.on"
        v-on:listen="controller"
        v-bind:shared="internal.controller.forgotem.shared"
      />
      <login-code
        v-if="internal.controller.code.on"
        v-on:listen="controller"
        v-bind:shared="internal.controller.code.shared"
      />
    </div>
  </div>
</template>

<script>
import AppWindow from '../window/AppWindow';
import Access from './Access';
import Forgotem from './Forgotem';
import LoginCode from './Code';

export default {
  name: 'Login',
  components: {
    AppWindow,
    Access,
    Forgotem,
    LoginCode
  },
  mounted() {
    this.render();
  },
  data() {
    return {
      internal: {
        id: '',
        on: true,
        show: true,
        style: {
          'min-width': '350px',
          'min-height': '350px',
          'max-width': '350px',
          'max-height': '350px'
        },
        controller: {
          access: {
            on: true,
            shared: {}
          },
          forgotem: {
            on: false,
            shared: {}
          },
          code: {
            on: false,
            shared: {}
          }
        }
      },
      app: {}
    }
  },
  methods: {
    render() {
      global.app.on('show-app', this.showApp);
      this.windowId();
    },
    showApp(opt = { id: '' }) {
      if (opt.id != this.internal.id) return;
      this.internal.show = true;
    },
    listiner(event) {
      if (event.id != this.internal.id) return;
      switch (event.trigger) {
        case 'minimize':
          this.internal.show = event.show;
          break;
        case 'close':
          this.internal.on = event.on;
          break;
      }
    },
    windowId() {
      this.internal.id = 'login-' + global.app.randomString({ len: 40 });;
    },
    showForgotem() {
      this.internal.controller.access.on = false;
      this.internal.controller.code.on = false;
      this.internal.controller.forgotem.on = true;
    },
    showAccess() {
      this.internal.controller.code.on = false;
      this.internal.controller.forgotem.on = false;
      this.internal.controller.access.on = true;
    },
    showCode() {
      this.internal.controller.access.on = false;
      this.internal.controller.forgotem.on = false;
      this.internal.controller.code.on = true;
    },
    show(opt = '', shared = null) {
      if (opt == 'access') {
        this.showAccess();
        if (shared)
          this.internal.controller.access.shared = shared;
      } else if (opt == 'forgotem') {
        this.showForgotem();
        if (shared)
          this.internal.controller.forgotem.shared = shared;
      } else if (opt == 'code') {
        this.showCode();
        if (shared) {
          this.internal.controller.code.shared = shared;
        }
      }
      return;
    },
    controller(event) {
      if (event.trigger == 'forgotem-password') {
        this.show('forgotem', event.values);
      } else if (event.trigger == 'forgotem-back') {
        this.show('access', event.values);
      } else if (event.trigger == 'forgotem-sended-code') {
        this.show('code', event.values);
      } else if (event.trigger == 'forgotem-code-validated') {
        this.show('forgotem', event.values);
      } else if (event.trigger == 'key-change') {
        this.show('access', event.values);
      } else if (event.trigger == 'sing-in') {
        this.show('code', event.values);
      } else if (event.trigger == 'failure-login') {
        this.show('access', event.values);
      } else if (event.trigger == 'authenticable') {
        global.app.emit('get-window-division', { id: this.internal.id }, (res) => {
          res.func(null, 'close');
          global.app.authentication(event.values.auth)
        });
      }
    }
  },
  computed: {
    autenticable() {
      return !!global.shared.auth;
    }
  }
}
</script>

<style lang="scss">
.app-box {
  .content-login {
    width: 350px;
    height: 330px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

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
}
</style>