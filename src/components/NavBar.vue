<template>
  <div class="container">
    <div class="wrapper">
      <div class="streak">
        <img
          class="logo logo-streak"
          src="../assets/images/icons/RVDVR-Icons-Streak.svg"
          alt="RVDΛR streak icon"
        />
        <p class="streak-num">{{ this.streakCount }}</p>
      </div>
      <img
        class="logo logo-rvdvr"
        src="../assets/images/logos/RVDVR-Logo-Small-Black.svg"
        alt="RVDΛR logo navigation bar"
      />
      <button @click="handleClick('info')" class="btn">
        <img
          class="logo logo-simple"
          src="../assets/images/logos/RVDVR-Icons-Logo.svg"
          alt="RVDΛR simple logo"
        />
      </button>
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
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
}
.streak {
  @extend %flex-row;
  &-num {
    font-family: $nunito;
    font-size: $text-lg;
    font-weight: bold;
    padding: 3px 0 0 4px;
    color: $black;
  }
}
.btn {
  background: none;
  border: none;
  cursor: pointer;
}
.logo {
  margin: 6px 0;
  &-streak {
    padding-left: 25px;
  }
  &-simple {
    padding-right: 25px;
  }
  &-rvdvr {
    margin-top: 2px;
  }
}
@media only screen and (max-width: $xl-width) {
  .wrapper {
    width: 70%;
  }
}
@media only screen and (max-width: $large-width) {
  .wrapper {
    width: 80%;
  }
}
@media only screen and (max-width: $medium-width) {
  .wrapper {
    justify-content: space-around;
    width: 90%;
  }
  .logo {
    &-streak {
      padding-left: 0;
    }
    &-simple {
      padding-right: 0x;
    }
  }
}
@media only screen and (max-width: $mobile-width) {
  .container {
    height: auto;
  }
  .wrapper {
    justify-content: space-between;
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
          