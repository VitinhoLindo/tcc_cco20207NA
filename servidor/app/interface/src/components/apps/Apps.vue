<template>
  <div v-bind:id="elements.id" class="apps-system">
    <div class="internal">
      <div class="apps-system-menu">
        <div class="close"><img v-on:click="close" v-bind:src="elements.src"></div>
        <div class="find"><input type="text" v-model="input.search" v-bind:placeholder="labels.search"></div>
      </div>

      <div v-if="apps.on" class="apps-system-apps">
        <div class="apps-system-app" v-for="(division, index) in apps.values" v-bind:key="index">
          <div class="app-system" v-for="(app, _index) in division" v-bind:key="_index" v-on:click="appClick(app.name)">
            <img class="app-system-image" v-bind:src="app.src" v-bind:alt="app.content">
            <div class="app-system-name">{{ app.appName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'apps-system',
  mounted() {
    this.randle();
    global.listener.on('resize-automaticable', () => { this.apps.on = false; });
    global.listener.push(this.onriseze);
  },
  data() {
    return {
      elements: {
        id: "",
        division: null,
        src: "data:image/png;base64,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"
      },
      labels: {
        search: 'busca'
      },
      input: {
        search: ''
      },
      apps: {
        on: false,
        values: []
      }
    };
  },
  methods: {
    async onriseze(event = Event, arg = { innerWidth: 0, innerHeight: 0 }) {
      this.setApps();
    },
    appClick(name) {
      global.listener.emit('app-click', { name: name, bool: true });
      this.close(null);
    },
    async setApps() {
      let rect = this.elements.divison.getClientRects()[0],
          apps = global.listener.getApplications(),
          { width, height } = rect;
      let appsMax = 2;

      if (!apps) {
        await global.listener.sleep(0.5);
        this.setApps();
      }

      if (Object.keys(apps).length > 2) {
        appsMax = (Math.floor(width * 0.8) / Object.keys(apps).length);
      }

      let values = [], _apps = [], count = 0, keys = Object.keys(apps);
      
      while(true) {
        let value = apps[keys[count]];
        
        if (!value) {
          if (_apps.length) {
            values.push(_apps);
            _apps = []
          }
          break;
        }

        if (count % appsMax == 0) {
          _apps.push(value);
          values.push(_apps);
          _apps = []
        } else {
          _apps.push(value);
        }

        count++;
      }

      this.apps.values = values;

      this.apps.on = true;
    },
    async randle() {
      this.elements.id = `apps-menu-${global.listener.randomString({ len: 40 })}`;
      this.elements.divison = await global.listener.getDiv(this.elements.id);
      this.setApps();
    },
    close(event) {
      global.listener.emit('close-apps-show', event, { bool: false });
    }
  }
}
</script>

<style lang="scss" scoped>
.apps-system {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba( $color: #000000, $alpha: 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .internal {
    width: 80%;
    height: 80%;

    .apps-system-menu {
      width: 100%;
      height: 10%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .find {
        width: 100%;
        text-align: center;

        input {
          margin: auto;
          width: 300px;
          height: 30px;
          -webkit-border-radius: 10px;
          text-align: center;
          font-size: 14px;
          cursor: text;
          -webkit-border-radius: 10px;
          border: 1px solid #3498db;
        }

        input:focus {
          box-shadow: 0 0 2px 0 #3498db;
          border: 1px solid #3498db;
          outline: 0;
        }
      }

      .close {
        width: 100%;
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        line-height: 30px;
        color: #125acf;

        img {
          width: 35px;
          height: 35px;
          -webkit-border-radius: 25px;
          cursor: pointer;
        }
        img:hover {
          background: rgba( $color: #ffffff, $alpha: 0.2);
        }
      }
    }

    .apps-system-apps {
      width: 100%;
      height: 90%;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .apps-system-app {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 10px auto;

        .app-system {
          cursor: pointer;
          -webkit-border-radius: 10px;
          padding: 5px;
          width: 100px;
          height: 110px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 10px auto;
          text-align: center;

          .app-system-image {
            width: 50px;
            height: 50px;
          }

          .app-system-name {
            font-size: 18px;
            color: #ffffff;
          }
        }

        .app-system:hover {
          background: rgba( $color: #ffffff, $alpha: 0.2);

          .app-system-image {
            width: 52px;
            height: 52px;
          }
        }
      }
    }
  }
}
</style>