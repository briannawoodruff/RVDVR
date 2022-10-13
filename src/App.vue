<template>
  <!-- SPLASH -->
  <Splash v-if="splash" />
  <div v-else class="container">
    <!-- TODAY CARD -->
    <div v-if="this.toggleToday" class="card">
      <Card title="TODAY">
        <TaskList
          :allTasks="this.allTasks"
          :isToday="true"
          :activeItem="this.activeItem"
          @add-task="addTask"
          @update-task="updateTask"
          @selected-task="selectedTask"
        />
      </Card>
      <div class="button-container">
        <Button title="Break" />
        <Button
          title="Prioritize"
          @toggle-today-list="toggleTodayList"
          :toggleToday="this.toggleToday"
        />
      </div>
    </div>
    <!-- MASTER CARD -->
    <div class="card">
      <Card title="MASTER TO DO">
        <TaskList
          :allTasks="this.allTasks"
          :isToday="false"
          :activeItem="this.activeItem"
          @add-task="addTask"
          @update-task="updateTask"
          @selected-task="selectedTask"
        />
      </Card>
    </div>
    <!-- EISENHOWER MATRIX -->
    <div v-if="!this.toggleToday" class="card">
      <!-- <Card> </Card> -->
    </div>
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";
import Splash from "./components/Splash.vue";
import Card from "./components/layout/Card.vue";
import Button from "./components/Button.vue";
const STORAGE_KEY = "rvdvr_todos";

export default {
  name: "App",
  components: {
    Splash,
    TaskList,
    Card,
    Button,
  },
  data() {
    return {
      splash: true,
      allTasks: [],
      isToday: Boolean,
      activeItem: null,
      toggleToday: true,
    };
  },
  methods: {
    addTask(newTask) {
      this.allTasks = [...this.allTasks, newTask];
      // localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
    },
    // sets the active class (adding a border to the selected task) via it's index
    selectedTask(i) {
      // this gets emitted to SingleTask.vue -> :class="{ active: this.index === this.activeItem }"
      this.activeItem = i;
    },
    updateTask(task) {
      // if a task is passed
      if (task) {
        // find task in allTasks
        let [found] = this.allTasks.filter((item) => item.id === task.id);
        // toggle isToday property
        found.isToday = !task.isToday;
      }
      // update localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
    },
    toggleTodayList() {
      this.toggleToday = !this.toggleToday;
    },
  },
  mounted() {
    // Splash timeout
    setTimeout(() => {
      this.splash = false;
    }, 2000);
  },
  created() {
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
.button-container {
  // border: 2px solid $darkGray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 82%;
  height: auto;
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: $mobile-width) {
  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
