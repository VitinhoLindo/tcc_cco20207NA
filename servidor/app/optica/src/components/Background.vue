<template>
  <div class="backgroud" v-if="src">
    <img :src="src">
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: {
    src: String
  }
}
</script>