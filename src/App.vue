<template>
  <Splash v-if="splash" />
  <!-- <HelloWorld v-else msg="Welcome to Your Vue.js App" /> -->
  <div v-else class="container">
    <div class="card">
      <Card title="TODAY">
        <TodayToDo
          :isToday="true"
          @add-task="addTask"
          @delete-task="deleteTask"
          :allTasks="this.allTasks"
        />
      </Card>
    </div>
    <div class="card">
      <Card title="MASTER TO DO">
        <MasterToDo
          :isToday="false"
          @add-task="addTask"
          @delete-task="deleteTask"
          :allTasks="this.allTasks"
        />
      </Card>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import TodayToDo from "./components/TodayToDo.vue";
import MasterToDo from "./components/MasterToDo.vue";
import Splash from "./components/Splash.vue";
import Card from "./components/layout/Card.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Splash,
    TodayToDo,
    MasterToDo,
    Card,
  },
  data() {
    return {
      splash: true,
      allTasks: [],
      isToday: Boolean,
    };
  },
  methods: {
    async addTask(newTask) {
      this.allTasks = [...this.allTasks, newTask];
    },
    async deleteTask(task) {
      // Find the specific task with it's id
      let foundItem = this.allTasks.find(item => item.id === task)
      // Remove task from array
      this.allTasks.splice(this.allTasks.indexOf(foundItem), 1);
    },
  },
  async mounted() {
    // Splash timeout
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
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: auto;
}

@media only screen and (max-width: $mobile-width) {
  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
