<template>
  <div 
    id="cadastro"
    v-bind:draggable="draggable"
    v-on:dragend="(event) => dragend(event)" 
  >
    <div v-show="false" class='resizer top-left'></div>
    <div v-show="false" class='resizer top-right'></div>
    <div v-show="false" class='resizer bottom-left'></div>
    <div v-show="false" class='resizer bottom-right'></div>
    <app-cliente 
      v-if="component.client.on"
      v-bind:functions="functions"
      v-bind:parentFunction="parentFunction"
    />
  </div>
</template>

<script>
import Cliente from './Cliente';

export default {
  name: 'Cadastro',
  props: {
    functions: {
      type: Object,
      required: true
    }
  },
  components: {
    AppCliente: Cliente
  },
  async mounted() {
    this.division = await this.functions.getDivision('cadastro');

    this.parentFunction = {
      getDivision: this.getDivision,
      gragableController: this.gragableController,
      closeComponent: this.closeComponent
    };
  },
  data: () => ({
    division: document.createElement('div'),
    parentFunction: {},
    draggable: true,
    component : {
      client : {
        on: true
      }
    }
  }),
  methods: {
    async listen() {
      // this.$parent.$on('')
    },
    gragableController(bool) {
      this.draggable = bool;
    },
    async dragend(event) {
      this.functions.setPosition(
        event.clientX, 
        event.clientY, 
        this.division
      );
    },
    getDivision() {
      return this.division;
    },
    closeComponent(componentName) {
      if (componentName == 'CadastroCliente') {
        this.component.client.on = false;
      }
    },
    initialOffSet() {

    },
    // mousedown(event) {
    //   this.draggable = false;
    //   console.log(event);
    // .resizer{
    //   width: 10px;
    //   height: 10px;
    //   border-radius: 50%;
    //   background: white;
    //   border: 3px solid #4286f4;
    //   position: absolute;
    // }
    // .resizer.top-left {
    //   left: -5px;
    //   top: -5px;
    //   cursor: nwse-resize; /*resizer cursor*/
    // }
    // .resizer.top-right {
    //   right: -5px;
    //   top: -5px;
    //   cursor: nesw-resize;
    // }
    // .resizer.bottom-left {
    //   left: -5px;
    //   bottom: -5px;
    //   cursor: nesw-resize;
    // }
    // .resizer.bottom-right {
    //   right: -5px;
    //   bottom: -5px;
    //   cursor: nwse-resize;
    // }
    // }
  }
}
</script>

<style>
#cadastro {
  top: 5%;
  left: 4%;
  position: fixed;
  z-index: 4;
  background-color: #ffffff;
  padding: 1px;
}
</style>