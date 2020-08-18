<template>
  <div id="cadatro-cliente" v-bind:style="getDefaultOffSet()">
    <div class="option-page">
      <img v-show="false" class="img" src="../../assets/window.png"   v-on:click="(event) => onclick('minimize', event)">
      <img                class="img" src="../../assets/software.png" v-on:click="(event) => onclick('maximize', event)">
      <img                class="img" src="../../assets/close.png"    v-on:click="(event) => onclick('close', event)">
    </div>

    <div class="internal-page">
      <input type="file" v-on:change="fileInput">
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
      this.$parent.$on('on-resize', () => {
        if (this.maximize) 
          this.functions.maximize(this.division, this.parentFunction.getDivision());
      });
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
    },
    fileInput(event = new InputEvent) {
      let fileReader = new FileReader();

      fileReader.onloadend = (res) => {
        console.log(res);
      };
      fileReader.readAsBinaryString(event.srcElement.value);
    }
  },
  model: {
  }
}
</script>

<style>
.internal-page {
  background-color: #000000;
  margin: 0.5% auto;
  width: 98%;
  height: 95.5%;
}

@media only screen and (max-width: 800px) {
  .internal-page {
    background-color: #f02c2c;
    margin: 0.5% auto;
    width: 98%;
    height: 95.5%;
    display: flex;
  }
}
/* #cadatro-cliente {
  width: 400px;
  height: 450px;
} */
</style>