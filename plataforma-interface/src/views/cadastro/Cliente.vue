<template>
  <div id="cadatro-cliente" v-bind:style="getDefaultOffSet()">
    <div class="option-page">
      <img v-show="false" class="img" src="/img/window.png"          v-on:click="(event) => onclick('minimize', event)">
      <img                class="img" src="/img/software.png"        v-on:click="(event) => onclick('maximize', event)">
      <img                class="img" src="/img/close.png"           v-on:click="(event) => onclick('close', event)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CadastroCliente',
  props: {
    functions: {
      type: Object,
      required: true
    },
    parentFunction: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    this.division = await this.functions.getDivision('cadatro-cliente');
    this.listen();
  },
  data: () => ({
    division: document.createElement('div'),
    defaultOffSet: {
      width: 400,
      height: 450
    },
    maximize: false
  }),
  methods: {
    async listen() {
    },
    onclick(eventListiner, event) {
      if (eventListiner == 'maximize') {
        if (this.maximize) {
          this.maximize = false;
          this.parentFunction.gragableController(true);
          this.functions.maximize(this.division, this.parentFunction.getDivision(), this.defaultOffSet);
        } else {
          this.maximize = true;
          this.parentFunction.gragableController(false);
          this.functions.maximize(this.division, this.parentFunction.getDivision());
        }
      }
      else if (eventListiner == 'close') {
        this.parentFunction.closeComponent('CadastroCliente');
      }
    },
    getDefaultOffSet() {
      let obj = {};
      for(let key in this.defaultOffSet) {
        if (key == 'width') {
          obj[key] = `${this.defaultOffSet[key]}px`;
        }
        else if (key == 'height') {
          obj[key] = `${this.defaultOffSet[key]}px`;
        } else {
          obj[key] = this.defaultOffSet[key];
        }
      }

      return obj;
    }
  },
  model: {
  }
}
</script>

<style>
/* #cadatro-cliente {
  width: 400px;
  height: 450px;
} */
</style>