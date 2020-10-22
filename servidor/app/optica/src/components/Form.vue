<template>
  <div :class="className">
    <div v-for="(field, index) in fields" :key="index">
      <component v-if="fieldEvent(field)" :formName="name" :data="field" :is="field.name" @[field.name]="click" />
      <component v-else :formName="name" :data="field" :is="field.name"  />
    </div>
  </div>
</template>

<script>
import FormMixins from '../mixins/form'

export default {
  name: "form-app",
  mixins: [FormMixins]
}
</script>