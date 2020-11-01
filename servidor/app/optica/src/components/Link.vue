<template>
  <div class="link-component">
    <a href="#" @click="click">{{ data.shared.label }}</a>
  </div>
</template>

<script>
export default {
  name: "Link-vue",
  props: ['data'],
  methods: {
    click(event) {
      this.data.internalEvent = event;
      this.$emit(this.data.name, this.data);
    }
  }
}
</script>