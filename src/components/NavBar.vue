<template>
  <div></div>
  <div class="container">
    <div class="wrapper">
      <div class="item streak">
        <img
          width="40"
          height="40"
          class="logo logo-streak"
          src="../assets/images/icons/RVDVR-Icons-Streak.svg"
          alt="RVDΛR streak icon"
        />
        <p class="streak-num">{{ this.streakCount }}</p>
      </div>
      <div class="item">
        <img
          width="250"
          height="40"
          class="logo logo-rvdvr"
          src="../assets/images/logos/RVDVR-Logo-Small-Black.svg"
          alt="RVDΛR logo navigation bar"
        />
      </div>
      <div class="item mini">
        <button @click="handleClick" class="btn">
          <img
            width="40"
            height="40"
            id="mini-logo"
            class="logo logo-simple"
            src="../assets/images/logos/RVDVR-Icons-Logo.svg"
            alt="RVDΛR simple logo"
          />
        </button>
      </div>
    </div>
  </div>
</template>
          
<script>
export default {
  name: "NavBar",
  props: {
    streakCount: {
      type: Number,
    },
  },
  methods: {
    handleClick() {
      let icon = document.getElementById("mini-logo");
      icon.classList.add("rotate");

      setTimeout(() => {
        icon.classList.remove("rotate");
      }, 1000);
    },
  },
};
</script>
        
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.rotate {
  animation: spin 500ms ease;
  -webkit-animation: spin 500ms ease;
  -moz-animation: spin 500ms ease;
  -o-animation: spin 500ms ease;
  -ms-animation: spin 500ms ease;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
  }
  75% {
    transform: rotate(190deg);
    -webkit-transform: rotate(190deg);
    -moz-transform: rotate(190deg);
    -o-transform: rotate(190deg);
    -ms-transform: rotate(190deg);
  }
  90% {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -moz-transform: rotate(150deg);
    -o-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
  }
  100% {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
  }
}
.container {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: auto;
  border-bottom: 3px solid $darkGreen;
  box-shadow: 0px 0.3px 5px $darkGrayShadow;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
}
.item {
  @extend %flex-row;
  height: auto;
  width: 250px;
}
.streak {
  justify-content: flex-start;
  padding-left: 25px;
  &-num {
    font-family: $nunito;
    font-size: $text-lg;
    font-weight: 700;
    padding: 3px 0 0 4px;
    color: $black;
  }
}
.mini {
  justify-content: flex-end;
  padding-right: 25px;
}
.btn {
  background: none;
  border: none;
  cursor: pointer;
}
.logo {
  margin: 6px 2px;
  &-simple {
    justify-content: flex-end;
  }
  &-rvdvr {
    margin-top: 4px;
  }
}
@media only screen and (max-width: $medium-width) {
  .wrapper {
    width: 90%;
  }
}
@media only screen and (max-width: $mobile-width) {
  .container {
    height: auto;
  }
  .wrapper {
    width: 100%;
  }
  .streak {
    padding-left: 15px;
  }
  .mini {
    padding-right: 15px;
  }
  .logo {
    margin: 6px 0;
    height: 35px;
    width: auto;
    &-rvdvr {
      margin-top: 4px;
    }
  }
}
</style>
          