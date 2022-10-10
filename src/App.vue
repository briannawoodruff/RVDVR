<template>
  <Splash v-if="splash" />
  <div v-else class="container">
    <div class="card">
      <Card title="TODAY">
        <TodayToDo
          :isToday="true"
          :activeItem="this.activeItem"
          @selected-task="selectedTask"
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
          :activeItem="this.activeItem"
          @selected-task="selectedTask"
          @add-task="addTask"
          @delete-task="deleteTask"
          :allTasks="this.allTasks"
        />
      </Card>
    </div>
  </div>
</template>

<script>
import TodayToDo from "./components/TodayToDo.vue";
import MasterToDo from "./components/MasterToDo.vue";
import Splash from "./components/Splash.vue";
import Card from "./components/layout/Card.vue";
const STORAGE_KEY = "rvdvr_todos";

export default {
  name: "App",
  components: {
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
      activeItem: null,
    };
  },
  methods: {
    async addTask(newTask) {
      this.allTasks = [...this.allTasks, newTask];
      // localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
    },
    async deleteTask(task) {
      // Find the specific task with it's id
      let foundItem = this.allTasks.find((item) => item.id === task);
      // Remove task from array
      this.allTasks.splice(this.allTasks.indexOf(foundItem), 1);
      // localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
    },
    // sets the active class (adding a border to the selected task) via it's index
    async selectedTask(i) {
      // this gets emitted to SingleTask.vue -> :class="{ active: this.index === this.activeItem }"
      this.activeItem = i;
    },
  },
  async mounted() {
    // Splash timeout
    setTimeout(() => {
      this.splash = false;
    }, 2000);
  },
  async created() {
    // Grabs todos from localStorage with refreshed
    this.allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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
