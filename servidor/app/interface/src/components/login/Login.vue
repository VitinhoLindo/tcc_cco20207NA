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
      app: {
        src: `data:image/png;base64,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`,
        name: 'login',
        content: 'necessario efetuar login para utilizar dos recursos'
      }
    }
  },
  methods: {
    // change(event) {
    //   let file = event.srcElement.files[0];
    //   let fileReader = new FileReader();

    //   fileReader.onloadend = (result) => {
    //     // console.log(result.target.result);
    //     // window.localStorage.setItem('config', JSON.stringify({ 
    //     //   home: {
    //     //     image: {
    //     //       src: result.target.result
    //     //     }
    //     //   }
    //     // }));
    //   }

    //   fileReader.readAsDataURL(file);
    // },
    render() {
      this.windowId();
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
        if (shared)
          this.internal.controller.code.shared = shared;
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