<template>
  <div id="offset" class="offset" v-show="true">
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.offset {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
}
</style>