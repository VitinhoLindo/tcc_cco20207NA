<template>
  <div id="home" >
    <app-content 
      v-if="show" 
      v-bind:contentStyle="contentStyle" 
    />

    <app-cadastro 
      v-bind:functions="functions"
    />
  </div>
</template>

<script>
import Content  from '../content/Content';
import Cadastro from '../cadastro/Cadastro'; 

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
    AppContent  : Content,
    AppCadastro : Cadastro
  },
  data: () => ({
    show: false,
    home: null,
    menu: null,
    contentStyle: {
      width: 0,
      height: 0
    }
  }),
  mounted() {
    this.homeListiner();
    this.renderContent();
  },
  methods: {
    async homeListiner() {      
      this.$parent.$on('on-resize', () => this.renderContent());
      this.$parent.$on('menu-option', this.menuOption);
    },
    async renderContent() {
      if (!this.home && !this.menu) {
        let [ home, menu ] = await Promise.all([
          this.functions.getDivision('router'),
          this.functions.getDivision('menu')
        ]);

        this.home = home;
        this.menu = menu;
      }

      let { innerWidth, innerHeight }   = this.functions.windowOffSet();
      let { offsetWidth, offsetHeight } = this.functions.getOffSet(this.menu);

      this.contentStyle.width = innerWidth;
      this.contentStyle.height = innerHeight - offsetHeight;

      if (!this.show) this.show = true;
    },
    async menuOption(event) {
      this.$emit(event.name);
    }
  }
}
</script>

<style>
#acesso-plataform {
  position: fixed;
  background-color: #ffffff;
}
#links {
  position: fixed;
}
</style>