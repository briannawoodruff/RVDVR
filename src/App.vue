<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import "./scss/_variables.scss";

#app {
  background-color: $white;

  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
