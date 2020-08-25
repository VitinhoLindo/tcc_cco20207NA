<template>
  <div class="menu">
    <div class="apps">
      <div v-for="(config, index) in apps" v-bind:key="index">
        <div class="app" v-on:click="(event) => appClick(event, config)">
          <img class="img" v-bind:src="config.src">
        </div>
      </div>
    </div>
    <div class="options">
      <div class="time">{{ time }}</div>
      <div class="system-option">
        <svg focusable="false" viewBox="0 0 24 24">
          <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBtn from './home/Btn';
import HomeSpace from './home/Space';
import HomeOptions from './home/Options';
import LoginBtn from './login/Btn';
import LoginSpace from './login/Space';
import LoginOptions from './login/Options';

export default {
  name: 'Menu',
  mounted() {
    this.randle();
    global.app.push(this.onresize);
  },
  data() {
    return {
      time: '',
      apps: [],
      elements: {
        btn: {
          division: null
        },
        space: {
          division: null
        },
        options: {
          division: null
        }
      }
    };
  },
  methods: {
    async randle() {
      this.time = this.getTime();
      setInterval(() => {
        this.time = this.getTime();
      }, 1000);
      setInterval(() => {
        this.apps = this.getApps();
      }, 500);
      let [btn, space, options] = await Promise.all([
        global.app.getDiv('menu-btn'),
        global.app.getDiv('menu-space'),
        global.app.getDiv('menu-options')
      ]);

      this.elements.btn.division = btn;
      this.elements.space.division = space;
      this.elements.options.division = options;
    },
    appClick(event = MouseEvent, config) {
      console.log(event);
      console.log(config);
    },
    onresize(event, data) { },
    getTime() {
      return (new Date()).toLocaleTimeString();
    },
    getApps() {
      return global.app.getApps();;
    }
  }
}
</script>

<style lang="scss">
.menu {
  opacity: 0.8;
  box-shadow: 0px 0px 2px 0px #ffffff;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 2px;
  height: 36px;
  background-color: #2c3e50;
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
      opacity: 1;
      -webkit-border-radius: 5px;
      background-color: #405468;
      box-shadow: 0px 0px 2px 0px #202b36;
    }
  }

  .options {
    padding-left: 2px;
    border-left: 2px solid #202b36;
    margin: 2px 4px 0px 4px;
    width: 120px;
    height: 100%;
    background-color: #2c3e50;
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
      background-color: #405468;
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
      background-color: #405468;
      box-shadow: 0px 0px 2px 0px #202b36;
    }
  }
}
</style>