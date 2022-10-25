<template>
  <div class="container">
    <div class="wrapper">
      <div class="item streak">
        <img
          class="logo logo-streak"
          src="../assets/images/icons/RVDVR-Icons-Streak.svg"
          alt="RVDΛR streak icon"
        />
        <p class="streak-num">{{ this.streakCount }}</p>
      </div>
      <div class="item">
        <img
          class="logo logo-rvdvr"
          src="../assets/images/logos/RVDVR-Logo-Small-Black.svg"
          alt="RVDΛR logo navigation bar"
        />
      </div>
      <div class="item mini">
        <button @click="handleClick('info')" class="btn">
          <img
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
    handleClick(name) {
      if (name === "info") {
        console.log(name);
      }
    },
  },
};
</script>
        
<style lang="scss" scoped>
@import "../scss/_variables.scss";
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
  &-num {
    font-family: $nunito;
    font-size: $text-lg;
    font-weight: bold;
    padding: 3px 0 0 4px;
    color: $black;
  }
}
.mini {
  justify-content: flex-end;
}
.btn {
  background: none;
  border: none;
  cursor: pointer;
}
.logo {
  margin: 6px 2px;
  &-streak {
    padding-left: 25px;
  }
  &-simple {
    padding-right: 25px;
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
  .logo {
    margin: 6px 0;
    height: 35px;
    width: auto;
    &-streak {
      padding-left: 15px;
    }
    &-simple {
      padding-right: 15px;
    }
    &-rvdvr {
      margin-top: 4px;
    }
  }
}
</style>
          