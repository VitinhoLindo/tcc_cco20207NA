<template>
  <div class="home">
    <app-menu  v-bind:auth="auth" v-bind:functions="functions" v-on:listen="controller" />
    <app-login v-if="components.login.on" v-bind:functions="functions" v-bind:shared="shared" v-on:listen="controller"/>
  </div>
</template>

<script>
import Menu from '../menu/Menu';
import Login from '../login/Login';

export default {
  name: 'Home',
  props: {
    auth: {
      type: String,
      required: false
    },
    functions: {
      type: Object,
      required: true
    },
    shared: {
      type: Object,
      required: true
    }
  },
  components: {
    AppMenu: Menu,
    AppLogin: Login
  },
  data: () => ({
    components: {
      login: {
        on: false
      },
    }
  }),
  methods: {
    controller(option, obj) {
      if (option.name == 'login') {
        this.components.login.on = true;
      } else if (option.name == 'login-cancel') {
        this.components.login.on = false;
      } else if (option.name == 'login-success') {
        this.components.login.on = false;
      }
    }
  }
}
</script>
