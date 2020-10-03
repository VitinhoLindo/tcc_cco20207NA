<template>
  <router-view/>
</template>

<style lang="scss">
html, body, #app {
  padding: 0px;
  margin: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.home {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;

  .backgroud {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
    }
  }

  .menu {
    height: 40px;
    width: 100%;
    position: absolute;
    z-index: 5;
    bottom: 0;
    left: 0;
    background-color: rgba($color: #2c3e50, $alpha: 0.8);
  }

  .super-bar {
    height: 25px;
    width: 100%;
    position: absolute;
    z-index: 5;
    background-color: #222222;
    color: #ffffff;

    .activitie {
      width: 80px;
      height: 22px;
      margin: 0px 1px;
      text-align: center;
      vertical-align: middle;
      line-height: 22px;
      color: #ffffff;
      cursor: pointer
    }
    .activitie:hover {
      height: 20px;
      line-height: 20px;
      border-bottom: 2px solid orange;
    }
  }
}


// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
