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
    z-index: 4;
    bottom: 0;
    left: 0;
    background-color: rgba($color: #2c3e50, $alpha: 0.8);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow-x: auto;

    .menu-app {
      overflow-x: auto;
      display: flex;
      align-content: flex-start;
      justify-content: flex-start;
      overflow-x: auto;

      .app {
        border: none;
        -webkit-border-radius: 5px;
        background-color: rgba($color: #000000, $alpha: 0);
        width: 40px;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        img {
          width: 25px;
          height: 25px;
        }
      }

      .app:hover {
        background-color: rgba($color: #4b5d6f, $alpha: 0.8);
      }

      .app:focus {
        outline: 0;
      }
    }

    .internal-system-apps {
      width: 40px;
      padding: 4px 0px 0px 0px;

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

  .applications {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 5;
    background-color: rgba($color: #000000, $alpha: 0.6);

    .close {
      height: 8%;

      img {
        widows: 28px;
        height: 28px;
        cursor: pointer;
      }

      img:hover {
        -webkit-border-radius: 20px;
        background-color: rgba($color: #405468, $alpha: 0.8);
      }
    }

    .search {
      height: 8%;

      div {
        width: 70%;
        border-bottom: 1px solid #ffffff;
        padding-bottom: 10px;

        input {
          border: none;
          text-align: center;
          font-size: 18px;
          -webkit-border-radius: 5px;
          padding: 5px;
          width: 300px;
          height: 20px;
        }

        input:focus {
          outline: 0;
        }

        img {
          margin-left: -34px;
          width: 30px;
          height: 20px;
          cursor: pointer;
        }

        img:hover {
          opacity: 0.6;
        }
      }
    }

    .apps {
      width: 100%;
      height: 84%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .division-apps {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow-y: auto;

        .span-app {
          -webkit-border-radius: 5px;
          position: absolute;
          z-index: 5;
          max-width: 280px;
          padding: 5px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .name {
            margin-bottom: 10px;
          }

          .content {
            text-align: center;
          }
        }

        .div-app {
          border: none;
          -webkit-border-radius: 5px;
          width: 60px;
          height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba($color: #ffffff, $alpha: 0);
          cursor: pointer;

          .app-image {
            width: 25px;
            height: 25px;
          }

          .app-name {
            color: #ffffff;
          }
        }

        .div-app:hover {
          background-color: rgba($color: #405468, $alpha: 0.8);
        }

        .div-app:focus {
          outline: 0;
          border-bottom: 2px solid orange;
        }
      }
    }
  }

  .super-bar {
    height: 22px;
    width: 100%;
    position: absolute;
    z-index: 4;
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
      align-items: flex;

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

                .month {
                  width: 80%;
                  color: #000000;
                  text-align: center;
                }
              }

              .days {
                padding: 10px;
                color: #000000;
                display: flex;
                flex-direction: row;
                align-items: center;

                .day-list {
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
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      .app-options {
        width: 120px;
        top: 0px;
        right: 0px;
        display: flex;
        position: absolute;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;

        .option-border {
          width: 38px;
          height: 20px;
          padding: 2px 0px 0px 0px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

        .option-border:hover {
          width: 38px;
          padding: 4px 0px 0px 0px;
          height: 18px;
          border-bottom: 2px solid rgba($color: orange, $alpha: 1);
        }

        .customer-options {
          width: 240px;
          height: 50px;
        }
      }
    }
  }
}

.card {
  -webkit-border-radius: 5px;
  background-color: #ffffff;
}

select:root {
  --select-border: #777;
  --select-focus: blue;
  --select-arrow: var(--select-border);
}

.h-full {
  height: 100%;
}

.w24px {
  width: 24px;
}

.fields {
  display: flex;
  flex-direction: row;
  text-align: center;
  padding: 4px 10px;

  label {
    width: 40%;
    color: #000000;
    vertical-align: middle;
    font-size: 16px;
    line-height: 30px;
  }

  div {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .select-field {
    width: 90%;
    border: none;
    background-color: transparent;
    box-shadow: 0px 0px 3px 0px #4289e7;
    text-align: center;
    height: 22px;
    outline: 0;
    -webkit-border-radius: 5px;
    cursor: pointer
  }
  .select-field::-ms-expand {
    display: none;
  }
  .select-field:focus {
    box-shadow: 0px 0px 5px 0px #4289e7;
  }

  .button-field {
    width: 90%;
    padding: 5px;
    border: none;
    background-color: #237df3;
    color: #ffffff;
    -webkit-border-radius: 5px;
    cursor: pointer;
  }
  .button-field:hover {
    background-color: #68a4f1;
  }
  .button-field:focus {
    outline: 0;
    background-color: #68a4f1;
    box-shadow: 0px 0px 3px 0px #237df3;
  }
}

.pointer {
  cursor: pointer;
}

.m4 {
  margin: 4px;
}

.w-full {
  width: 100%;
}

.w1-10 {
  width: 10%;
}

.w5 {
  width: 5%;  
}

.w95 {
  width: 95%;
}

.w9-10 {
  width: 92.5%;
}

.flex {
  display: flex;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-right {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-up {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #ffffff transparent;
}

.arrow-left {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 5px 0;
  border-color: transparent rgba($color: #000000, $alpha: 1) transparent  transparent ;
  cursor: pointer;
}
.arrow-left:hover {
  border-color: transparent rgba($color: #000000, $alpha: 0.6) transparent  transparent ;
}

.arrow-right {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0px 5px 5px;
  border-color: transparent transparent transparent rgba($color: #000000, $alpha: 1);
  cursor: pointer
}
.arrow-right:hover {
  border-color: transparent transparent transparent rgba($color: #000000, $alpha: 0.6);
}

.arrow-down {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: #ffffff transparent transparent transparent;
}

*::-webkit-scrollbar-track
{
}

*::-webkit-scrollbar
{
  width: 2px;
  height: 2px;
  background-color: #FFFFFF;
}

*::-webkit-scrollbar-thumb
{
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px #aaaaaa;
  background-color: #aaaaaa;
}
</style>
