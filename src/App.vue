<template>
  <Splash v-if="splash" />
  <HelloWorld v-else msg="Welcome to Your Vue.js App" />
</template>

<script>
import Splash from "./components/Splash.vue"
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Splash,
  },
  data: () => ({
    splash: true,
  }),

  mounted() {
    setTimeout(() => {
      this.splash = false;
    }, 2000);
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";

#app {
  background: url(./assets/images/backgrounds/RVDVR-gray-bg.svg) center
    no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  min-height: 100%;
}
</style>
