<template>
  <div id="menu">
    <img class="options bottom left logo pointer" src="../../assets/optica.png" v-on:click="onclick" >

    <menu-home 
      v-if="auth"
      v-bind:functions="functions"
    />

    <menu-login
      v-else
      v-bind:functions="functions"
    />

    <div v-bind:style="timer.style"> 
      {{ timer.time }}
    </div>
    <div class="system-option" v-if="auth && option.on" v-bind:style="option.div.style">
      <svg v-bind:style="option.svg.style" focusable="false" viewBox="0 0 24 24">
        <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
import MenuHome from '../../components/menu/Menu';
import MenuLogin from '../../components/menu-login/Menu';

export default {
  name: 'Menu',
  components: {
    MenuHome : MenuHome,
    MenuLogin: MenuLogin
  },
  props: {
    auth: {
      type: String,
      required: false
    },
    functions: {
      type: Object,
      required: true
    },
    shared: {
      type: Object,
      required: true
    }
  },
  mounted() {
    setInterval(() => {
      this.timer.time = (new Date).toLocaleTimeString();
    }, 1000);
    this.menuListiner();
    this.authWatch = async function () {
      try {
        this.modifiedMenu();
      } catch (error) { console.error(error); }
    };
  },
  data: () => ({
    timer: {
      time: (new Date).toLocaleTimeString(),
      style: {
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        color: '#ffffff'
      }
    },
    option: {
      on: false,
      div: {
        style: {
          position: 'fixed',
          bottom: '7px',
          right: '10px',
          width: '25px',
          height: '25px'
        }
      },
      svg: {
        style: {
          margin: '2.25px',
          width: '20px',
          height: '20px',
          fill: '#ffffff'
        }
      }
    }
  }),
  watch: {
    auth: function() {
      this.authWatch();
    }
  },
  methods: {
    modifiedMenu() {
      if (this.auth) {
        this.timer.style.right = '40px';
        this.option.on = true;
      }
    },
    async menuListiner() {
    },
    onclick() {
      this.$emit('menu-click');
    }
  }
}
</script>

<style>
#menu {
    position: fixed;
    width: 100%;
    background-color: #050755;
    height: 40px;
    bottom: 0;
}

.timer {
  fill: #ffffff;
  position: fixed;
  color: #ffffff;
  height: 23px;
  width: 60px;
}

.system-option {
  cursor: pointer;
}

.system-option:hover {
  -webkit-border-radius: 5px;
  background-color: #2d2e7e;
}
</style>