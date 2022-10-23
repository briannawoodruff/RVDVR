<template>
  <!-- SPLASH -->
  <Splash v-if="splash" />
  <div v-else>
    <!-- NAVBAR -->
    <NavBar :streakCount="this.streakCount" />
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
          <Button
            title="Break Day"
            :streakCount="this.streakCount"
            :pauseStreak="this.pauseStreak"
            @set-pause="setPause"
          />
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
          <Button
            title="Break Day"
            :streakCount="this.streakCount"
            :pauseStreak="this.pauseStreak"
            @set-pause="setPause"
          />
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
const PASTTASKS_KEY = "rvdvr_pasttasks";
const PAUSE_KEY = "rvdvr_pause";

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
      midnight: null,
      currentTime: 0,
      pastTodaysTasks: [],
      pauseStreak: false,
    };
  },
  watch: {
    // watches the time change to evaluate updating the streak and midnight to the next day
    async currentTime(timeNow) {
      // IF the currentTime is past midnight
      if (timeNow > this.midnight) {
        // update midnight to new day midnight
        this.setMidnight();
        // IF pauseStreak is false, continue updating streak
        if (!this.pauseStreak) {
          // update streak
          this.updateStreak();
        }
      }
    },
    // watches if pauseStreak is set to true, then set a timer for 24 hours before setting it false again
    async pauseStreak(newValue) {
      if (newValue === true) {
        this.pauseTimer();
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
    setPauseLocalStorage() {
      localStorage.setItem(PAUSE_KEY, JSON.stringify(this.pauseStreak));
    },
    setMidnight() {
      // sets to next midnight
      this.midnight = new Date().setHours(24, 0, 0, 0);
    },
    setPastTodayTasks() {
      localStorage.setItem(PASTTASKS_KEY, JSON.stringify(this.pastTodaysTasks));
    },
    pauseTimer() {
      // waits 24 hours to set pauseStreak false again (86400000 ms)
      window.setInterval(() => {
        this.pauseStreak = false;
        this.setPauseLocalStorage();
      }, 86400000);
    },
    setPause() {
      this.pauseStreak = true;
      this.setPauseLocalStorage();
    },
    resetStreak() {
      // resets streak to 0
      this.streakCount = 0;
      // sets streak storage
      this.setStreakLocalStorage();
    },
    updateStreak() {
      // finds all the today tasks
      const findToday = this.allTasks.filter((item) => item.isToday === true);
      // finds all the tasks that are completed
      const completed = findToday.filter((item) => item.completed === true);
      //  IF all tasks in today are completed and not equal to 0 && the new todays tasks are different than the prior day
      if (
        completed.length === findToday.length &&
        completed.length !== 0 &&
        findToday.length !== 0 &&
        this.pastTodaysTasks !== findToday
      ) {
        // limit streak to 365 days
        if (this.streakCount <= 365) {
          // increases streak
          this.streakCount++;
          // sets streak storage
          this.setStreakLocalStorage();
          // saves today's tasks to compare to the next day
          this.pastTodaysTasks = findToday;
          this.setPastTodayTasks();
        } else {
          // resets streak
          this.resetStreak();
        }
      } else {
        // ELSE streak is broken and reset to 0
        this.resetStreak();
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

    // Groups by colors on page load
    this.groupColors();
    // Watches window width
    window.addEventListener("resize", this.handleWidth);
    // Onload sets window width
    this.handleWidth();

    // updates the time every 30 minutes (1800000 ms)
    window.setInterval(() => {
      this.currentTime = new Date().getTime();
    }, 1800000);
  },
  created() {
    // Grabs todos from localStorage when reloaded
    this.allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Grabs streak from localStorage when reloaded
    this.streakCount = JSON.parse(localStorage.getItem(STREAK_KEY) || 0);
    this.setStreakLocalStorage();
    // Grabs past today tasks from localStorage when reloaded
    this.pastTodaysTasks = JSON.parse(
      localStorage.getItem(PASTTASKS_KEY) || "[]"
    );
    // Grabs past today tasks from localStorage when reloaded
    this.pauseStreak = JSON.parse(localStorage.getItem(PAUSE_KEY) || false);
    this.setPauseLocalStorage();

    // sets next midnight
    this.setMidnight();
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
  z-index: 0;
}
.card {
  @extend %flex-column;
  justify-content: center;
  text-align: center;
  height: auto;
  z-index: 0;
  position: relative;
}
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 86%;
  height: auto;
  margin: 0;
  padding: 0;
  z-index: 0;
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
