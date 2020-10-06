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
    height: 22px;
    width: 100%;
    position: absolute;
    z-index: 5;
    background-color: #222222;
    color: #ffffff;
    display: flex;

    .activitie {
      display: flex;
      width: 33.3%;
      height: 24px;
      margin: 0px 1px;

      span {
        margin: 0px 4px;
        vertical-align: middle;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
        cursor: pointer;
        text-align: center;
      }
      span:hover {
        border-bottom: 2px solid orange;
        z-index: 5;
      }
    }

    .options {
      width: 33.4%;
      height: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .content {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
          margin: 0px 4px;
          vertical-align: middle;
          font-size: 16px;
          line-height: 24px;
          color: #ffffff;
          cursor: pointer;
          text-align: center;
        }

        span:hover {
          border-bottom: 2px solid orange;
          z-index: 5;
        }

        .calendar {
          .show {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 10px 10px 10px;
            border-color: transparent transparent #ffffff transparent;
            margin: auto;
          }

          .dates {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 350px;
            height: 250px;
            padding: 10px 0px;
            background-color: #ffffff;
            -webkit-border-radius: 5px;

            .apresentation {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 85%;

              .ds {
                font-size: 12px;
                margin: 0px;

                color: #000000;
              }

              .fy {
                font-size: 15px;
                margin: 0px;
                color: #000000;
              }
            }

            .internal-calendar {
              width: 90%;
              height: 85%;
              margin-top: 5px;
              display: flex;
              flex-direction: column;
              align-items: center;
              -webkit-border-radius: 5px;
              border: 1px solid #555555;

              .next-after {
                margin: 10px 0px;
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                height: 10px;

                .after {
                  width: 0;
                  height: 0;
                  border-style: solid;
                  border-width: 5px 5px 5px 0;
                  border-color: transparent rgba($color: #000000, $alpha: 1) transparent  transparent ;
                  margin: auto;
                  cursor: pointer;
                }
                .after:hover {
                  border-color: transparent rgba($color: #000000, $alpha: 0.6) transparent  transparent ;
                }

                .month {
                  width: 80%;
                  color: #000000;
                  text-align: center;
                }

                .next {
                  width: 0;
                  height: 0;
                  border-style: solid;
                  border-width: 5px 0px 5px 5px;
                  border-color: transparent transparent transparent rgba($color: #000000, $alpha: 1);
                  margin: auto;
                  cursor: pointer
                }
                .next:hover {
                  border-color: transparent transparent transparent rgba($color: #000000, $alpha: 0.6);
                }
              }

              .days {
                padding: 10px;
                // border: 1px solid #000000;
                color: #000000;
                display: flex;
                flex-direction: row;
                align-items: center;

                .day-list {
                  // border: 1px solid #000000;
                  text-align: center;
                  display: flex;
                  flex-direction: column;
                  align-items: center;

                  .label {
                    border-bottom: 1px solid #555555;
                    margin-bottom: 10px;
                    width: 40px;
                    height: 22px;
                  }
                  .day {
                    cursor: pointer;
                    -webkit-border-radius: 20px;
                    width: 40px;
                    height: 22px;
                    border: none;
                    background-color: #ffffff;
                  }
                  .day:hover {
                    vertical-align: middle;
                    line-height: 22px;
                    background-color: rgba($color: #555555, $alpha: 0.2);
                  }
                  .day:focus {
                    outline: 0;
                    background-color: rgba($color: orange, $alpha: 1);
                  }
                }
              }
            }
          }
        }
      }
    }

    .super-menu {
      width: 33.3%;
      height: 24px;
    }

    // .options {
    //   border: 1px solid #ffffff;
    //   display: flex;
    //   width: 33.3%;
    //   height: 24px;
    //   right: 0px;
    //   position: absolute;
    //   flex-direction: center;

    //   .date {
    //     width: 80%;
    //     height: 23px;

    //     .content {
    //       width: 70%;

    //       div {
    //         height: 22px;
    //         margin: 0px 1px;
    //         font-size: 16px;
    //         text-align: center;
    //         vertical-align: middle;
    //         line-height: 22px;
    //         margin: auto;
    //         width: 130px;
    //         text-align: center;
    //         cursor: pointer;
    //       }
    //       div:hover {
    //         height: 20px;
    //         line-height: 20px;
    //         border-bottom: 2px solid orange;
    //       }
    //     }

    //     .calendar {
    //       width: 70%;

    //       .show {
    //         width: 0;
    //         height: 0;
    //         border-style: solid;
    //         border-width: 0 10px 10px 10px;
    //         border-color: transparent transparent #ffffff transparent;
    //         margin: auto;
    //       }

    //       .content {
    //         width: 340px;
    //         height: 280px;
    //         background-color: #ffffff;
    //         margin: auto;
    //       }
    //     }
    //   }

    //   .content {
    //     width: 20%;
    //     height: 23px;
    //   }
    // }
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
