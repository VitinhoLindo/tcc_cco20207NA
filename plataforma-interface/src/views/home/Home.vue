<template>
  <div id="home" >
    <app-content 
      v-if="show" 
      v-bind:contentStyle="contentStyle" 
    />

    <app-cadastro 
      v-if="component.cadaster.on"
      v-bind:functions="functions"
      v-on:listiner="componentController"
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
    },
    component: {
      cadaster: { on: false }
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
      if (event.propertie == 'cadaster') {
        this.component.cadaster.on = true;
        await this.functions.sleep(0.5);
        this.$emit(event.name);
      } else {

      }
    },
    async componentController(propertie) {
      if (propertie == 'cadaster') {
        this.component.cadaster.on = false;
      }
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