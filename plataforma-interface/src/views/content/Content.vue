<template>
  <div id="content-page-component">
    <img 
      src="/img/mountain-lake-nature-forest-landscape-scenery-4K-157.jpg" 
      v-bind:style="getStyle()"
    >
  </div>
</template>

<script>
export default {
  name: 'ContentPageComponent',
  props: {
    contentStyle: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStyle() {
      return {
        width: `${this.contentStyle.width}px`,
        height: `${this.contentStyle.height}px`
      }
    }
  }
}
</script>