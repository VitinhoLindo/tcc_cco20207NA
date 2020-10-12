<template>
  <div v-if="on" class="applications w-full h-full">
    <div class="close w-full flex-center">
      <img :src="$app.iconsBase64.close.src" :alt="$app.iconsBase64.close.alt" @click="close">
    </div>
    <div class="search w-full flex-center">
      <!-- <input type="file" @change="change">
      <img v-if="src" :src="src"> -->

      <div class="flex-center">
        <input type="text" :placeholder="language.labels['search'] || ''">
        <img :src="$app.iconsBase64.search.src" :alt="$app.iconsBase64.search.alt" >
      </div>
    </div>
    <div class="apps"></div>
  </div>
</template>

<script>
import LanguageMixins from '../mixins/language'

export default {
  name: 'Applications',
  mixins: [LanguageMixins],
  mounted() {
    this.listen();
  },
  data() {
    return {
      on   : false,
      apps : [],
      src  : "" 
    }
  },
  methods: {
    listen() {
      this.$app.on('applications', this.controller);
    },
    change(event) {
      let file = event.srcElement.files[0];

      let fileReader = new FileReader();

      fileReader.onloadend = (res) => {
        this.src = res.target.result;
        console.log(res.target.result);
      };

      fileReader.readAsDataURL(file);
      // console.log(file);
    },
    controller(data) {
      this.on = data.on;

      if (data.apps) {
        data.apps = [];
      } else {
        this.on   = false;
        this.apps = [];
      }
    },
    close(event) {
      this.$app.emit('close-applications', event);
    }
  }
}
</script>