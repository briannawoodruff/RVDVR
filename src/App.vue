<template>
  <Splash v-if="splash" />
  <!-- <HelloWorld v-else msg="Welcome to Your Vue.js App" /> -->
  <TodayToDo v-else @add-task="addTask" :allTasks="this.allTasks"/>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import TodayToDo from "./components/TodayToDo.vue";
import Splash from "./components/Splash.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Splash,
    TodayToDo,
  },
  data() {
    return {
      splash: true,
      allTasks: [],
    };
  },
  methods: {
    async addTask(newTask) {
      this.allTasks = [...this.allTasks, newTask]
    },
  },
  async mounted() {
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
  width: 100vw;
  height: 100vh;
  color: #2c3e50;
  // margin-top: 60px;
  min-height: 100%;
}
</style>
