<template>
  <div
    v-if="!autenticable"
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
        name: 'login',
        id: '',
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
      global.listener.on('show-app', this.showApp);
      this.app = global.listener.getApplications('login');
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
          global.listener.emit('app-click', { name: 'login', bool: false });
          break;
      }
    },
    windowId() {
      this.internal.id = `${this.internal.name}-${global.listener.randomString({ len: 40 })}`;
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
        global.listener.emit('get-window-division', { id: this.internal.id }, (res) => {
          res.func(null, 'close');
          global.listener.authentication(event.values.auth)
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
  }
}
</style>