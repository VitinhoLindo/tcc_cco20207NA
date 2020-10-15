<template>
  <div v-if="on" class="applications w-full h-full">
    <div class="close w-full flex-center">
      <img :src="$app.iconsBase64.close.src" :alt="$app.iconsBase64.close.alt" @click="close">
    </div>
    <div class="search w-full flex-center">
      <div class="flex-center">
        <input type="text" v-model="search" :placeholder="language.labels['search'] || ''">
        <img :src="$app.iconsBase64.search.src" :alt="$app.iconsBase64.search.alt" >
      </div>
    </div>
    <div class="apps">
      <div class="division-apps" v-for="(appList, index) in randleApps" :key="index">
        <button
          class="div-app" 
          v-for="(app, index) in appList" 
          :key="index" @click="(event) => open(event, app)" 
          @mouseenter="(event) => mouse(event, app, 'enter')"
          @mouseleave="(event) => mouse(event, app, 'leave')">
          <img class="app-image" :src="app.src">
          <div class="app-name">
            {{ app.appName }}
          </div>
        </button>
        <span-app-name v-if="span.on" :event="span.event" :app="span.app" />
      </div>
    </div>

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
      on         : false,
      apps       : [],
      randleApps : [],
      search     : '',
      divisionLen: 4,
      span       : {
        on    : false,
        event : null,
        app   : null
      } 
    }
  },
  watch: {
    search: function (_new, _last) {
    }
  },
  methods: {
    listen() {
      this.$app.on('applications', this.controller);
    },
    controller(data) {
      this.on = data.on;

      if (!data.apps) {
        data.apps = [];
      }

      this.apps = data.apps;
      this.randle(this.apps);
    },
    randle(apps = []) {
      try {
        this.randleApps = [];

        let divisionsLen = Math.floor(apps.length / 4) || 1,
            len   = apps.length,
            count = 0;

        for (let x = 0; x < divisionsLen; x++) {
          let division = [];

          for(let y = 0; y < 4; y++) {
            if (count == len) continue;
            division.push(apps[count]);

            count++;
          }

          this.randleApps.push(division);
        }
      } catch (error) {
        console.error(error);
      }
    },
    close(event) {
      this.$app.emit('close-applications', event);
    },
    open(event, app) {
      this.$app.emit('open-app', app);
      this.close(event);
    },
    async mouse(event, app, listen) {
      switch (listen) {
        case 'enter':
          this.span = {
            on    : true,
            event : event,
            app   : app
          };
          break;
        case 'leave':
          this.span = {
            on    : false,
            event : null,
            app   : null
          };
          break;
      }
    }
  }
}
</script>