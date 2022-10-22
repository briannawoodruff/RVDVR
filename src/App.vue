<template>
  <!-- SPLASH -->
  <Splash v-if="splash" />
  <div v-else>
    <!-- NAVBAR -->
    <NavBar :streakCount="this.streakCount" :currentTime="this.currentTime" />
    <div class="container">
      <!-- TODAY CARD -->
      <div v-if="this.toggleToday" id="today" class="card today">
        <Card title="TODAY">
          <TaskList
            :allTasks="this.allTasks"
            :isToday="true"
            :activeItem="this.activeItem"
            @add-task="addTask"
            @update-task="updateTask"
            @delete-task="deleteTask"
            @selected-task="selectedTask"
          />
        </Card>
        <!-- IF Desktop, show buttons -->
        <div v-if="!this.mobileWidth" class="button-container">
          <Button title="Break Day" />
          <Button
            title="Prioritize"
            @toggle-today-list="toggleTodayList"
            @show-mission="hideMission"
            :toggleToday="this.toggleToday"
          />
        </div>
      </div>
      <!-- EISENHOWER MATRIX -->
      <div v-else-if="!this.toggleToday" id="matrix" class="card">
        <p class="info">Drag a task to the box that describes it best</p>
        <Card title="Eisenhower">
          <Eisenhower
            :currentTaskId="this.currentTaskId"
            @set-background-color="setBackgroundColor"
          />
        </Card>
        <!-- IF Desktop, show done button -->
        <Button
          v-if="!this.mobileWidth"
          title="Done"
          @group-colors="groupColors"
          @toggle-today-list="toggleTodayList"
          :toggleToday="this.toggleToday"
        />
      </div>
      <!-- MASTER CARD -->
      <div id="master" class="card">
        <Card
          title="MISSION PANEL"
          @show-mission="hideMission"
          :showMission="this.showMission"
          :allTasks="this.allTasks"
          :mobileWidth="this.mobileWidth"
          :toggleToday="this.toggleToday"
        >
          <TaskList
            :allTasks="this.allTasks"
            :isToday="false"
            :activeItem="this.activeItem"
            :showMission="this.showMission"
            @add-task="addTask"
            @update-task="updateTask"
            @delete-task="deleteTask"
            @selected-task="selectedTask"
            @set-current-task="setCurrentTask"
            @show-mission="hideMission"
          />
        </Card>
        <!-- IF Mobile, show buttons -->
        <div
          v-if="this.mobileWidth && this.toggleToday"
          class="button-container"
        >
          <Button title="Break Day" />
          <Button
            title="Prioritize"
            @toggle-today-list="toggleTodayList"
            @show-mission="hideMission"
            :toggleToday="this.toggleToday"
          />
        </div>
        <!-- IF showing Eisenhower Matrix AND Mobile, show done button -->
        <Button
          v-if="!this.toggleToday && this.mobileWidth"
          title="Done"
          @group-colors="groupColors"
          @toggle-today-list="toggleTodayList"
          :toggleToday="this.toggleToday"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";
import Splash from "./components/Splash.vue";
import Card from "./components/layout/Card.vue";
import Button from "./components/Button.vue";
import Eisenhower from "./components/Eisenhower.vue";
import NavBar from "./components/NavBar.vue";
import { uuid } from "vue-uuid";
const STORAGE_KEY = "rvdvr_todos";
const STREAK_KEY = "rvdvr_streak";
// import moment from "moment";
// moment().format();

export default {
  name: "App",
  components: {
    Splash,
    TaskList,
    Card,
    Button,
    Eisenhower,
    NavBar,
  },
  data() {
    return {
      splash: true,
      allTasks: [],
      isToday: Boolean,
      activeItem: null,
      toggleToday: true,
      currentTaskId: "",
      mobileWidth: Boolean,
      showMission: true,
      streakCount: 0,
      midnight: new Date().setUTCHours(24, 0, 0, 0),
      currentTime: 0,
    };
  },
  watch: {
    // watches the time change to evaluate updating the streak and midnight to the next day
    async currentTime(newValue) {
      // console.log(newValue, this.midnight)
      // IF the currentTime is past midnight
      if (newValue > this.midnight) {
        // update streak
        this.updateStreak();
        // reset midnight
        this.setMidnight();
        return;
      }
    },
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
    updateTask(tasks) {
      // if a task is passed
      if (tasks) {
        // find task in allTasks
        let [found] = this.allTasks.filter((item) => item.id === tasks.id);
        // IF the task is found
        if (found !== null || found !== undefined || found.length !== 0) {
          // UPDATE the id
          found.id = uuid.v4();
          // toggle isToday property
          found.isToday = !tasks.isToday;
        }
      }
      // updates localStorage
      this.updateLocalStorage();
    },
    deleteTask(taskId) {
      // finds task to delete
      let [found] = this.allTasks.filter((item) => item.id === taskId);
      // IF the task is found
      if (found !== null || found !== undefined || found.length !== 0) {
        // delete task from allTasks
        this.allTasks.splice(this.allTasks.indexOf(found), 1);
      }
      // then update localStorage
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      // updates localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
      // updates this.allTasks after updating localStorage
      this.allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
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
        this.updateTask();
      }
    },
    // Watches width of screen and sets mobileWidth if mobile
    handleWidth() {
      if (window.innerWidth <= 768) {
        this.mobileWidth = true;
      } else {
        this.mobileWidth = false;
      }
    },
    // Hides the mission panel to help focus on todays tasks
    hideMission(title) {
      // IF prioritize is passed, set true (regardless of toggle)
      if (title === "Prioritize") {
        this.showMission = true;
        // ELSE toggle on and off on click
      } else {
        this.showMission = !this.showMission;
      }
    },
    setStreakLocalStorage() {
      localStorage.setItem(STREAK_KEY, JSON.stringify(this.streakCount));
    },
    setMidnight() {
      // sets to next midnight
      this.midnight = new Date().setUTCHours(24, 0, 0, 0);
      console.log("future", this.midnight);
    },
    updateStreak() {
      // finds all the today tasks
      const findToday = this.allTasks.filter((item) => item.isToday === true);
      // finds all the tasks that are completed
      const completed = findToday.filter((item) => item.completed === true);
      console.log(findToday, completed);

      //  IF all tasks in today are completed
      if (completed.length === findToday.length) {
        // increases streak
        this.streakCount++;
        // resets streak storage
        this.setStreakLocalStorage();
        console.log("streak continue", this.streakCount);
      } else {
        // ELSE streak is broken and reset to 0
        this.streakCount = 0;
        // resets streak storage
        this.setStreakLocalStorage();
        console.log("broke streak", this.streakCount);
      }
    },
  },
  mounted() {
    // resets interval
    clearInterval();

    // Splash timeout
    setTimeout(() => {
      this.splash = false;
    }, 2000);

    // gGoups by colors on page load
    this.groupColors();
    // Watches window width
    window.addEventListener("resize", this.handleWidth);
    // Onload sets window width
    this.handleWidth();

    // sets midnight
    this.setMidnight();

    // updates the time
    window.setInterval(() => {
      this.currentTime = Date.now();
    }, 5000);
  },
  created() {
    // Grabs todos from localStorage when reloaded
    this.allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Grabs streak from localStorage when reloaded
    this.streakCount = JSON.parse(localStorage.getItem(STREAK_KEY) || 0);
    this.setStreakLocalStorage();
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
  width: 100%;
  height: auto;
  color: #2c3e50;
  min-height: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}
.card {
  @extend %flex-column;
  justify-content: center;
  text-align: center;
  height: auto;
}
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 86%;
  height: auto;
  margin: 0;
  padding: 0;
}
.info {
  background: $white;
  margin-top: 20px;
}

@media only screen and (max-width: $mobile-width) {
  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .today {
      margin-top: 60px;
    }
  }
  #matrix {
    margin-top: 50px;
  }
}
</style>
