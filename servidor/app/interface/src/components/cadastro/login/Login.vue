<template>
  <div
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
        app: app,
        name: internal.name
      }"
      v-on:listiner="listiner"
    />
    <div class="content-cadastro-login" v-bind:style="element.style">
      <div class="cadastro-novo-login">
      </div>
      <div class="table">
      </div>
      <!-- <div v-bind:id="internal.content.id" class="content-cadastro-login"> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import AppWindow from '../../window/AppWindow';

export default {
  name: 'CadastroLogin',
  components: {
    AppWindow
  },
  mounted() {
    this.render();
  },
  data() {
    return {
      internal: {
        name: 'cadastro-login',
        id: '',
        content: {
          id: "",
          name: "content"
        },
        division: null,
        show: true,
        style: {
          'min-width': '450px',
          'min-height': '450px'
        },
      },
      element: {
        style: {}
      },
      app: {}
    }
  },
  methods: {
    async render() {
      this.app = global.listener.getApplications('cadastro-login');
      global.listener.on('show-app', this.showApp);
      this.windowId();
      global.listener.on('resize-window', this.internalResize);
    },
    internalResize(option) {
      this.element.style = {
        width: `${option.offset.width}px`,
        height: `${option.offset.height - 20}px`
      };
    },
    // setNewConfig() {
      // let rect = this.internal.division.getClientRects()[0],
      //   { width, height } = rect;

      // this.element.style.height = `${height - 20}px`;
    // },
    showApp(opt = { id: '' }) {
      if (opt.id != this.internal.id) return;
      this.internal.show = true;
    },
    async windowId() {
      this.internal.id = `${this.internal.name}-${global.listener.randomString({ len: 40 })}`;
      this.internal.content.id = `${this.internal.content.id}-${global.listener.randomString({ len: 40 })}`;

      let [ div1, div2 ] =  await Promise.all([
        await global.listener.getDiv(this.internal.id),
        await global.listener.getDiv(this.internal.content.id)
      ]);

      this.internal.division = div1;
      this.internal.content.division = div2;
      this.internalResize({ id: this.internal.id, offset: { width: 450, height: 450 } });
      // this.setNewConfig();
    },
    listiner(event) {
      // switch (event.trigger) {
      //   case 'maximize':
      //     // this.setNewConfig();
      //     break;
      // }
    }
  }
}
</script>

<style lang="scss">
.app-box {
  .content-cadastro-login {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    .cadastro-novo-login {
      width: 98%;
      margin: 20px 0px;
    }
  }
}


@media screen and ( max-width: 451px ) {
  .app-box {
    .content-cadastro-login {
      .cadastro-novo-login {
        height: 400px;
        background-color: red;
      }
    }
  }
}

@media screen and ( min-width: 451px ) {
  .app-box {
    .content-cadastro-login {
      .cadastro-novo-login {
        height: 200px;
        background-color: blue;
      }
    }
  }
}

// @media screen and ( max-width: 450px ) and ( max-height: 450px ) {
//   .app-box {
//     .content-cadastro-login {
//       .cadastro-novo-login {
//         height: 50%;
//       }
//     }
//   }
// }

// @media screen and (max-width: 4000px) {
//   .app-box {
//     .content-cadastro-login {
//       .cadastro-novo-login {
//       }
//     }
//   }
// }
</style>