<template>
  <div>
    <select v-model="value">
      <option 
        v-for="(_data, index) in data" 
        :key="index"
        :value="_data"
      >
      {{ _data }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'default', 'name'],
  data() {
    return {
      value: this.default
    }
  },
  watch: {
    value: function (_n, _l) {
      this.$emit(this.name, _n);
    }
  }
}
</script>

<style>

</style>