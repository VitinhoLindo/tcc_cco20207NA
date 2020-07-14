<template>
  <div 
    id="cadastro"
    draggable="true" 
    v-on:dragend="(event) => dragend(event)" 
  >
    <app-cliente v-bind:functions="functions" />
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
  mounted() {

  },
  data: () => ({
  }),
  methods: {
    async listen() {
      this.$parent.$on('')
    },
    async dragend(event) {
      this.functions.setPosition(
        event.clientX, 
        event.clientY, 
        await this.functions.getDivision('cadastro')
      );
    },
    initialOffSet() {

    }
  }
}
</script>

<style>
#cadastro {
  top: 5%;
  left: 4%;
  position: fixed;
  z-index: 4;
  width: 300px;
  height: 300px;
  background-color: #ffffff;
}
</style>