<template>
  <div class="input-component">

    <div>
      <label>{{ data.shared.label }}</label>
    </div>

    <div>
      <input :type="data.shared.type" v-model="value">
    </div>

    <div v-if="error" class="value-error">
      <span>{{ error }}</span>
    </div>

  </div>
</template>

<script>
import FieldMixins from '../mixins/field'

export default {
  name: "input-component",
  mixins: [FieldMixins]
}
</script>