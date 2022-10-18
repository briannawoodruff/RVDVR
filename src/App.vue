<template>
  <!-- SPLASH -->
  <Splash v-if="splash" />
  <div v-else class="container">
    <!-- TODAY CARD -->
    <div v-if="this.toggleToday" id="today" class="card">
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
    <!-- EISENHOWER MATRIX -->
    <div v-else-if="!this.toggleToday" class="card">
      <p class="info">Drag a task to the box that describes it best</p>
      <Card title="Eisenhower">
        <Eisenhower
          :currentTaskId="this.currentTaskId"
          @set-background-color="setBackgroundColor"
        />
      </Card>
      <Button
        title="Done"
        @group-colors="groupColors"
        @toggle-today-list="toggleTodayList"
        :toggleToday="this.toggleToday"
      />
    </div>
    <!-- MASTER CARD -->
    <div
      id="master"
      :class="this.allTasks.length <= 1 ? 'card master' : 'card'"
    >
      <Card title="MASTER TO DO">
        <TaskList
          :allTasks="this.allTasks"
          :isToday="false"
          :activeItem="this.activeItem"
          @add-task="addTask"
          @update-task="updateTask"
          @selected-task="selectedTask"
          @set-current-task="setCurrentTask"
        />
      </Card>
    </div>
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";
import Splash from "./components/Splash.vue";
import Card from "./components/layout/Card.vue";
import Button from "./components/Button.vue";
import Eisenhower from "./components/Eisenhower.vue";
import { uuid } from "vue-uuid";
const STORAGE_KEY = "rvdvr_todos";

export default {
  name: "App",
  components: {
    Splash,
    TaskList,
    Card,
    Button,
    Eisenhower,
  },
  data() {
    return {
      splash: true,
      allTasks: [],
      isToday: Boolean,
      activeItem: null,
      toggleToday: true,
      currentTaskId: "",
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
        // IF the task is found
        if (found !== null || found !== undefined || found.length !== 0) {
          // UPDATE the id
          found.id = uuid.v4();
          // toggle isToday property
          found.isToday = !task.isToday;
        }
        // then update localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
      } else {
        // ELSE no task is passed (in the case of a reorder), update localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
      }
    },
    toggleTodayList() {
      this.toggleToday = !this.toggleToday;
    },
    setCurrentTask(id) {
      this.currentTaskId = id;
    },
    setBackgroundColor(destination) {
      // sets background color of each task
      let fromEl = document.getElementById(this.currentTaskId);
      let [found] = this.allTasks.filter(
        (item) => item.id === this.currentTaskId
      );

      if (fromEl !== null) {
        let colors = {
          eRed: "#FFC7C2",
          eYellow: "#FBE8A3",
          eOrange: "#FCD19C",
          eGreen: "#AFF4C6",
        };
        if (destination === "do") {
          found.color = colors.eRed;
        }
        if (destination === "decide") {
          found.color = colors.eYellow;
        }
        if (destination === "delegate") {
          found.color = colors.eOrange;
        }
        if (destination === "later") {
          found.color = colors.eGreen;
        }
        // updates localStorage once color is set
        this.updateTask();
      }
    },
    groupColors() {
      if (this.allTasks.length > 0) {
        // orders colors alphabetically
        const group = this.allTasks.sort((a, b) =>
          b.color.localeCompare(a.color)
        );
        // array with categorized
        let categorized = group.filter((item) => {
          return item.color !== "#fff";
        });
        // array with uncategorized
        let uncategorized = group.filter((item) => {
          return item.color === "#fff";
        });
        // create new array with the correct order
        let reordered = [...categorized, ...uncategorized];
        // resets allTasks
        this.allTasks = reordered;
        // sets localStorage
        this.updateTask()
      }
    },
  },
  mounted() {
    // Splash timeout
    setTimeout(() => {
      this.splash = false;
    }, 2000);
    // groups by colors on page load
    this.groupColors();
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

  &.master {
    padding-bottom: 50px;
  }
}
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 81%;
  height: auto;
  margin: 0;
  padding: 0;
}
.info {
  background: $white;
}

@media only screen and (max-width: $mobile-width) {
  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
