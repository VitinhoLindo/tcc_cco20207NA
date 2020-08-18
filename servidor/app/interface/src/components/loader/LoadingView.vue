<template>
  <div v-if="open" class="loading">
    <loading-ball     v-if="type == 'ball'" />
    <loading-default  v-if="type == 'default'" />
    <loading-enginer  v-if="type == 'enginer'" />
    <loading-search   v-if="type == 'search'" />
  </div>
</template>

<script>
import Ball from './Ball';
import Default from './Default';
import Enginer from './Enginer';
import Search from './Search';

export default {
  name: 'loading',
  props: {
    loading: {
      type: String
    }
  },
  components: {
    LoadingBall: Ball,
    LoadingDefault: Default,
    LoadingEnginer: Enginer,
    LoadingSearch: Search
  },
  data: () => ({
    open: false,
    type: ''
  }),
  mounted() {
    this.type = this.loading || 'ball';
    this.open = true;
  }
}
</script>

<style>
.loading {
  position: absolute;
  background: rgb(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>