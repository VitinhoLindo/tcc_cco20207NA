<template>
  <div class="field-button">
    <button class="button-field" @click="click">{{ data.label }}</button>
  </div>
</template>

<script>
export default {
  name: "Button-vue",
  props: ['name', 'data'],
  methods: {
    click(event) {
      this.$emit(this.name, event);
    }
  }
}
</script>