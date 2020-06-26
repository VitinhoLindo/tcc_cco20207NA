<template>
  <div class="home">
    <app-menu  v-bind:auth="auth" v-bind:functions="functions" v-on:listen="controller" />
    <app-acesso v-if="components.login.on" v-bind:functions="functions" v-bind:shared="shared" v-on:listen="controller" />
  </div>
</template>

<script>
import Menu from '../menu/Menu';
import Acesso from '../../components/acesso/Acesso';

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
    AppAcesso: Acesso
  },
  data: () => ({
    components: {
      login: {
        on: false
      },
    }
  }),
  mounted() {
    this.$parent.$on('');
  },
  methods: {
    controller(option) {
      if (option.name == 'login') this.components.login.on = true;
      else                        this.components.login.on = false;
    }
  }
}
</script>
