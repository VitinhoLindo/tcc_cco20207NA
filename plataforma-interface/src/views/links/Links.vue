<template>
  <div id="links">
    <div class="btn-link" v-for="(button, index) in buttons" v-bind:key="index">
      <button class="pointer" v-on:click="(event) => onclick(event,button.event)">{{ button.label }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Links',
  props: {
    shared: {
      type: Object,
      required: true
    },
    functions: {
      type: Object,
      required: true
    },
  },
  mounted() {
  },
  data: () => ({
    
  }),
  methods: {
    onclick(event, eventName) {
    }
  }
}
</script>

<style>
.btn-link {
  width: 90%;
  margin: 5px auto;
}
.btn-link button {
  width: 100%;
  height: 50px;
  color: #ffffff;
  border: none;
  background-color: #9c88ff;
  box-shadow: 0px 0px 5px 0px #9c88ff;
}
.btn-link button:hover {
  background-color: #ab9cfa;
}
.btn-link button:focus {
  border: 2px solid #ab9cfa;
  box-shadow: 0px 0px 5px 0px #ab9cfa;
  outline: 0;
}
</style>