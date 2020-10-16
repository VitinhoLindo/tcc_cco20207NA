<template>
  <div class="backgroud" v-if="src">
    <img :src="src" @click="bodyClick">
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: {
    src: String
  },
  methods: {
    bodyClick() {
      this.$app.emit('body-click');
    }
  }
}
</script>