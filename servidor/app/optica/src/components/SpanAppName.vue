<template>
  <div class="span-app" :style="style">
    <span class="name"><strong>{{ name }}</strong></span>
    <span class="content">{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['event', 'app'],
  data() {
    return {
      name: this.app.appName,
      content: this.app.content,
      style: {
        top: `${this.event.y}px`,
        left: `${this.event.x}px`
      }
    }
  }
}
</script>