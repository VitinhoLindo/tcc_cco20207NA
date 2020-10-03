<template>
  <div class="menu">

    <apps v-if="controllers.apps.on" />

    <!-- <calendar 
        v-if="controllers.calendar.on"
        v-bind:variables="{
          time: time
        }"
        v-bind:configs="controllers.calendar.configs"
    /> -->
    <calendar v-bind:variables="{ time: time }" />

    <div class="apps">
      <div v-for="(config, index) in apps" v-bind:key="index">
        <div class="app" v-on:click="(event) => appClick(event, config)">
          <img class="img" v-bind:src="config.src">
        </div>
      </div>
    </div>

    <div class="options">
      <div class="time" v-on:click="onCalendar">{{ time.toLocaleTimeString() }}</div>
      <div class="system-option" v-on:click="(event) => showApps(event, { bool: true })">
        <svg focusable="false" viewBox="0 0 24 24">
          <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
// import Calendar from '../calendar/Calendar';
import Apps from '../apps/Apps';

export default {
  name: 'Menu',
  components: {
    // Calendar,
    Apps
  },
  mounted() {
    this.randle();
  },
  data() {
    return {
      time: new Date(),
      apps: [],
      controllers: {
        calendar: {
          on: false,
          configs: {},
          element: document.createElement('div')
        },
        apps: {
          on: false
        }
      }
    };
  },
  methods: {
    async randle() {
      global.listener.on('resize-automaticable', this.onresize);
      global.listener.on('close-apps-show', this.showApps);
      global.listener.on('escape-press', this.showApps);

      setInterval(() => { this.time = new Date(); }, 1000);
      setInterval(() => { this.apps = this.getApps(); }, 500);
    },
    onCalendar(event = MouseEvent) {
      if (this.controllers.calendar.on)
        this.controllers.calendar.on = false;
      else {
        this.controllers.calendar.configs = event.srcElement.getClientRects()[0];
        this.controllers.calendar.element = event.srcElement;
        this.controllers.calendar.on = true;
      }
    },
    showApps(event, arg = { bool: false }) {
      this.controllers.apps.on = arg.bool;
    },
    appClick(event = MouseEvent, config) {
      global.listener.emit('show-app', { id: config.id });
    },
    onresize(event, data) {
      if (this.controllers.calendar.on) {
        this.controllers.calendar.on = false;
      }
    },
    getApps() {
      return global.listener.getApps();;
    }
  }
}
</script>

<style lang="scss">
.menu {
  box-shadow: 0px 0px 2px 0px #ffffff;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 2px;
  height: 36px;
  background-color: rgba($color: #2c3e50, $alpha: 0.8);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 5;

  .apps {
    display: flex;
    width: 100%;
    height: 32px;
    padding: 2px;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;

    .app {
      margin: 0px 3px;
      display: flex;
      width: 32px;
      height: 32px;
      cursor: pointer;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .img {
        width: 26px;
        height: 26px;
      }
    }
    .app:hover {
      -webkit-border-radius: 5px;
      background-color: rgba($color: #405468, $alpha: 1);
      box-shadow: 0px 0px 2px 0px #202b36;
    }
  }

  .options {
    padding-left: 2px;
    border-left: 2px solid #202b36;
    margin: 2px 4px 0px 4px;
    width: 120px;
    height: 100%;
    right: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .time {
      color: #ffffff;
      width: 98px;
      font-size: 15px;
      text-align: center;
      vertical-align: middle;
      line-height: 28px;
      cursor: pointer;
    }

    .time:hover {
      -webkit-border-radius: 5px;
      background-color: rgba($color: #405468, $alpha: 0.8);
      box-shadow: 0px 0px 2px 0px #202b36;
    }

    .system-option {
      cursor: pointer;
      padding: 2px;
      padding: 6px;
      width: 22px;
      height: 22px;
      fill: #ffffff;
    }

    .system-option:hover {
      -webkit-border-radius: 5px;
      background-color: rgba($color: #405468, $alpha: 0.8);
      box-shadow: 0px 0px 2px 0px #202b36;
    }
  }
}
</style>