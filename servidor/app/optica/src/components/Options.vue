<template>
  <div class="app-options">
    <div class="option-border">
      <div v-if="option" class="arrow-up pointer" @click="optionClick"></div>
      <div v-else class="arrow-down pointer" @click="optionClick"></div>
    </div>

    <div class="customer-options m4" v-if="option">
      <div class="card">
        <div class="fields">
          <label>{{ language.labels['language'] || '' }}</label>
          <component 
            :is="field" 
            :name="field" 
            :data="getLanguageTranslate()" 
            :default="getCurrentLang()" 
            @[field]="change" 
          />
        </div>
        <div class="fields">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageMixin from '../mixins/language'

export default {
  name: '',
  mixins: [LanguageMixin],
  data() {
    return {
      field: 'select-field',
      option: false
    };
  },
  methods: {
    change(value) {
      let originalLang = this.getOriginalLang(value);

      if (!originalLang) return;
      this.option = false;

      this.newLang = originalLang;
      this.$app.setlanguage(originalLang);
    },
    async optionClick() {
      await this.getLanguages();
      this.option = !this.option;
    }
  }
}
</script>