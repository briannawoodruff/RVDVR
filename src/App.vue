<template>
  <div id="background"></div>
  <!-- SPLASH -->
  <Splash v-if="this.splash" />
  <div class="content-container" v-else>
    <!-- NAVBAR -->
    <NavBar :streakCount="this.streakCount" />
    <!-- <Modal v-if="this.modal" /> -->
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
            @click.passive="selectedTask(-1)"
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
          @click.passive="selectedTask(-1)"
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
            @click.passive="selectedTask(-1)"
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
  <Footer v-if="!this.splash" />
</template>

<script>
import TaskList from "./components/TaskList.vue";
import Splash from "./components/Splash.vue";
import Card from "./components/layout/Card.vue";
import Button from "./components/Button.vue";
import Eisenhower from "./components/Eisenhower.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
// import Modal from "./components/Modal.vue";
import { uuid } from "vue-uuid";
const STORAGE_KEY = "rvdvr_todos";
const STREAK_KEY = "rvdvr_streak";
const PASTTASKS_KEY = "rvdvr_pasttasks";
const PAUSE_KEY = "rvdvr_pause";
const PAUSECOUNTER_KEY = "rvdvr_pauseCounter";
const MIDNIGHT_KEY = "rvdvr_midnightUTC";
const TIMELEFT_KEY = "rvdvr_timeLeft";
const TIMERETURNED_KEY = "rvdvr_timeReturned";
const PAUSEINACTIVE_KEY = "rvdvr_timeInactive";
const TOTALINACTIVE_KEY = "rvdvr_totalInactive";

export default {
  name: "App",
  components: {
    Splash,
    TaskList,
    Card,
    Button,
    Eisenhower,
    NavBar,
    Footer,
    // Modal,
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
      pauseCounter: 0,
      pauseInactiveDuration: null,
      totalInactiveDuration: 0,
      timeLeft: null,
      timeReturned: null,
      streakTimeout: null,
      pauseTimeout: null,
      isVisible: true, // internal flag, defaults to true
      hiddenPropertyName: "",
      reloaded: null,
    };
  },
  watch: {
    // watches the time change to evaluate updating the streak and midnight to the next day
    async currentTime(timeNow) {
      // IF the currentTime is past midnight
      if (timeNow > this.midnight) {
        // IF pauseStreak is false, continue updating streak
        if (!this.pauseStreak) {
          // update streak
          this.updateStreak();
        }
      }
    },
    // watches if pauseStreak is set to true, then set a timer for 24 hours before setting it false again
    async pauseStreak(newValue, oldValue) {
      if (newValue) {
        // Prevents execution when page is reloaded (is only called on click of Pause Btn)
        if (!this.reloaded) {
          this.pauseTimer();
        }
      } else {
        // clears this.pauseTimeout
        clearTimeout(this.pauseTimeout);
        this.pauseTimeout = null;
      }
      // after a streak pause (when newValue changes to false and oldValue was true), update midnight so streak isn't updated
      if (!newValue && oldValue) {
        // if currentTime is past midnight, to prevent setting midnight every refresh
        if (this.currentTime > this.midnight) {
          this.setMidnight();
        }
      }
    },
    // watches whether page is active or inactive 
    async isVisible(newValue) {
      // PAGE INACTIVE
      if (!newValue) {
        // saves when user left tab or page went inactive
        this.timeLeft = new Date().getTime();
        localStorage.setItem(TIMELEFT_KEY, JSON.stringify(this.timeLeft));

        // clears timeout if it exists
        this.clearStreakTimeout();
        // clears pauseTimeout
        this.clearPauseTimeout();
        // PAGE ACTIVE
      } else {
        // restarts streak timer
        this.currentTime = new Date().getTime();
        this.timeoutHandler();

        // starts pauseBtn and finds how long inactive since away
        if (this.pauseStreak) {
          this.startPauseBtn();
        }
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
    setPauseCounterLocalStorage() {
      localStorage.setItem(PAUSECOUNTER_KEY, JSON.stringify(this.pauseCounter));
    },
    setMidnight() {
      // sets to next midnight
      this.midnight = new Date().setHours(24, 0, 0, 0);
      localStorage.setItem(MIDNIGHT_KEY, JSON.stringify(this.midnight));
    },
    setPastTodayTasks(findToday) {
      this.pastTodaysTasks = findToday;
      localStorage.setItem(PASTTASKS_KEY, JSON.stringify(this.pastTodaysTasks));
    },
    pauseTimer() {
      // waits 24 hours to set pauseStreak false again
      // increment counter by 1 every 15 minutes (900000 ms)
      if (this.pauseStreak) {
        this.pauseTimeout = setTimeout(() => {
          // IF counter is 96 or over (24 hours) (96 * 900000ms(15 mins) = 86400000ms)
          if (this.pauseCounter > 95) {
            // set pauseStreak to false and set pauseCount back to 0
            this.resetPause();
            // stop counter from running
            clearTimeout(this.pauseTimeout);
          } else {
            // increase pauseCounter
            this.pauseCounter++;
            this.setPauseCounterLocalStorage();
            // recall the settimeout again
            this.pauseTimer();
          }
        }, 900000);
      }
    },
    setPause() {
      // IF pauseStreak is false, make it true
      if (!this.pauseStreak) {
        this.pauseStreak = true;
        this.setPauseLocalStorage();

        // update pastTasks
        const findToday = this.allTasks.filter((item) => item.isToday === true);
        // saves today's tasks to compare to the next day
        this.setPastTodayTasks(findToday);
      }
    },
    resetPause() {
      // set pauseStreak to false and set pauseCount back to 0
      this.pauseStreak = false;
      this.setPauseLocalStorage();
      // reset pause counter to 0
      this.pauseCounter = 0;
      this.setPauseCounterLocalStorage();
    },
    startPauseBtn() {
      // saves time returned
      this.timeReturned = new Date().getTime();
      localStorage.setItem(TIMERETURNED_KEY, JSON.stringify(this.timeReturned));

      // sets how long a user was inactive for by subtracting when they return and when the left in UTC (milliseconds)
      if (this.timeLeft !== undefined && this.timeReturned !== undefined) {
        this.pauseInactiveDuration = this.timeReturned - this.timeLeft;
        localStorage.setItem(
          PAUSEINACTIVE_KEY,
          JSON.stringify(this.pauseInactiveDuration)
        );
      }

      // handles update of pauseCounter based on how long the user was away, and the restarts the pauseTimer
      this.restartPauseTimer();
    },
    restartPauseTimer() {
      // IF inactive for less than 15 mins
      if (this.pauseInactiveDuration < 900000) {
        // If total time away is more than 15 mins, add 1 to pauseCounter and reset total count away to 0
        if (this.totalInactiveDuration > 900000) {
          this.pauseCounter++;
          this.setPauseCounterLocalStorage();
          console.log(this.pauseCounter);

          this.totalInactiveDuration = 0;
          localStorage.setItem(
            TOTALINACTIVE_KEY,
            JSON.stringify(this.totalInactiveDuration)
          );
          // Else total time away is less than 15 mins, continue total time away count
        } else {
          this.totalInactiveDuration += this.pauseInactiveDuration;
          localStorage.setItem(
            TOTALINACTIVE_KEY,
            JSON.stringify(this.totalInactiveDuration)
          );
        }

        this.pauseTimer();
      }
      // If greater than 15 mins
      else {
        // finds how many times the inactive time is divisible by 15 mins and rounds it to the nearest integer to add to the pauseCounter
        let pauseCounterInactiveTime = Math.round(
          this.pauseInactiveDuration / 900000
        );
        const totalPauseCount = this.pauseCounter + pauseCounterInactiveTime;
        // IF totalPauseCount is under 24 hours (96 * 900000ms(15 mins) = 86400000ms), continue counter
        if (totalPauseCount < 95) {
          this.pauseCounter += pauseCounterInactiveTime;
          this.setPauseCounterLocalStorage();
          this.pauseTimer();
        } else {
          // ELSE reset pause
          this.resetPause();
        }
      }
    },
    resetStreak() {
      // resets streak to 0
      this.streakCount = 0;
      // sets streak storage
      this.setStreakLocalStorage();
      // update midnight to new day midnight
      if (this.currentTime > this.midnight) {
        this.setMidnight();
      }
    },
    updateStreak() {
      // finds all the today tasks
      const findToday = this.allTasks.filter((item) => item.isToday === true);
      // finds all the tasks that are completed
      const completed = findToday.filter((item) => item.completed === true);
      let pastTasks = this.pastTodaysTasks;

      // 1. Verifies that all tasks in today are completed
      const isCompleted = () => {
        if (
          findToday.length === completed.length &&
          findToday.length > 0 &&
          completed.length > 0
        ) {
          return true;
        } else {
          return false;
        }
      };

      // IF they are completed, find if they are different than yesterday
      if (isCompleted()) {
        // when findIfChanged returns, then call increaseStreak with result
        new Promise(findIfChanged).then(this.increaseStreak);
      } else {
        // ELSE tasks are not different than yesterday, reset streak
        this.resetStreak();
        // saves today's tasks to compare to the next day
        this.setPastTodayTasks(findToday);
      }

      // 2. Verify that those completed tasks are not the same as the day before
      function findIfChanged(resolve) {
        let count = 0;
        let tasksChanged = null;

        if (pastTasks.length > 0) {
          findToday.forEach((item) => {
            pastTasks.forEach((past) => {
              // if the ids match and the past was completed, add to a count
              if (item.id === past.id && past.completed === true) {
                count++;
              }
            });
          });
          // if the count is the same length as findToday, tasks did not change
          if (count === findToday.length) {
            tasksChanged = false;
            resolve({ tasksChanged, findToday });
          } else {
            // else if the count is not the same length, tasks did change
            tasksChanged = true;
            resolve({ tasksChanged, findToday });
          }
        } else {
          // ELSE there are no past tasks, tasksChanged
          tasksChanged = true;
          resolve({ tasksChanged, findToday });
        }
      }
    },
    increaseStreak({ tasksChanged, findToday }) {
      // IF the new todays tasks are different than the prior day
      if (tasksChanged) {
        // increases streak
        this.streakCount++;
        this.setStreakLocalStorage();
        // saves today's tasks to compare to the next day
        this.setPastTodayTasks(findToday);
        // update midnight to new day midnight
        this.setMidnight();
      } else {
        // ELSE todays tasks did not change, streak is broken and reset to 0
        this.resetStreak();
      }
    },
    clearPauseTimeout() {
      // IF streak is paused
      if (this.pauseStreak) {
        // clear this.pauseTimeout
        if (this.pauseTimeout) {
          clearTimeout(this.pauseTimeout);
          this.pauseTimeout = null;
        }
      }
    },
    clearStreakTimeout() {
      // resets timeout if it exists
      if (this.streakTimeout) {
        clearTimeout(this.streakTimeout);
        this.streakTimeout = null;
      }
    },
    // handles setTimeout violation warning
    watchTime(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    timeoutHandler() {
      // updates the time every 10 minutes (600000 ms)
      this.streakTimeout = setTimeout(async () => {
        await this.watchTime(1);
        this.currentTime = new Date().getTime();
        this.timeoutHandler();
      }, 600000);
    },
    // handles visibility
    onVisible() {
      this.reloaded = false;
      // prevent double execution
      if (this.isVisible) {
        return;
      }
      // change flag value
      this.isVisible = true;
    },
    onHidden() {
      this.reloaded = false;
      // prevent double execution
      if (!this.isVisible) {
        return;
      }
      // change flag value
      this.isVisible = false;
    },
    // visibility event
    handleVisibilityChange(forcedFlag) {
      // Resource: Stack Overflow -> https://stackoverflow.com/a/29425789
      // focus or blur eventotherwise it's an Event object
      if (typeof forcedFlag === "boolean") {
        if (forcedFlag) {
          return this.onVisible();
        }

        return this.onHidden();
      }

      if (document[this.hiddenPropertyName]) {
        return this.onHidden();
      }

      return this.onVisible();
    },
  },
  mounted() {
    // Splash timeout
    const splashTimeout = setTimeout(() => {
      this.splash = false;
      clearTimeout(splashTimeout);
    }, 1750);

    // Groups by colors on page load
    this.groupColors();
    // Watches window width
    window.addEventListener("resize", this.handleWidth);
    // Onload sets window width
    this.handleWidth();

    // clears timeout if it exists
    this.clearStreakTimeout();
    // updates the time every 10 minutes (600000 ms)
    this.currentTime = new Date().getTime();
    // restarts this.streakTimeout
    this.timeoutHandler();

    // clears pauseTimeout if it exists
    this.clearPauseTimeout();
    // restarts pauseTimer if pauseStreak is true
    if (this.pauseStreak) {
      if (this.timeLeft !== null) {
        // starts pauseBtn and finds how long inactive since away
        this.startPauseBtn();
      } else {
        this.pauseTimer();
      }
    }

    // HANDLE VISIBILITY CHANGE INCLUDING SWITCHING PROGRAM/WINDOW
    // Resource: Stack Overflow -> https://stackoverflow.com/a/29425789
    const browserPrefixes = ["moz", "ms", "o", "webkit"];
    // get the correct attribute name
    function getHiddenPropertyName(prefix) {
      return prefix ? prefix + "Hidden" : "hidden";
    }

    // get the correct event name
    function getVisibilityEvent(prefix) {
      return (prefix ? prefix : "") + "visibilitychange";
    }

    // get current browser vendor prefix
    function getBrowserPrefix() {
      for (var i = 0; i < browserPrefixes.length; i++) {
        if (getHiddenPropertyName(browserPrefixes[i]) in document) {
          // return vendor prefix
          return browserPrefixes[i];
        }
      }
      // no vendor prefix needed
      return null;
    }

    // bind and handle events
    let browserPrefix = getBrowserPrefix(),
      visibilityEventName = getVisibilityEvent(browserPrefix);
    this.hiddenPropertyName = getHiddenPropertyName(browserPrefix);

    document.addEventListener(
      visibilityEventName,
      () => {
        this.handleVisibilityChange();
      },
      false
    );

    // extra event listeners for better behaviour
    document.addEventListener(
      "focus",
      () => {
        this.handleVisibilityChange(true);
      },
      false
    );

    document.addEventListener(
      "blur",
      () => {
        this.handleVisibilityChange(false);
      },
      false
    );

    window.addEventListener(
      "focus",
      () => {
        this.handleVisibilityChange(true);
      },
      false
    );

    window.addEventListener(
      "blur",
      () => {
        this.handleVisibilityChange(false);
      },
      false
    );
  },
  created() {
    // Grabs todos from localStorage when reloaded
    this.allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Grabs streak from localStorage when reloaded
    this.streakCount = JSON.parse(localStorage.getItem(STREAK_KEY) || 0);
    // Grabs past today tasks from localStorage when reloaded
    this.pastTodaysTasks = JSON.parse(
      localStorage.getItem(PASTTASKS_KEY) || "[]"
    );
    // Grabs pauseStreak from localStorage when reloaded
    this.pauseStreak = JSON.parse(localStorage.getItem(PAUSE_KEY) || false);
    // Grabs how long its been since paused from localStorage when reloaded
    this.pauseCounter = JSON.parse(localStorage.getItem(PAUSECOUNTER_KEY) || 0);
    // Grabs midnight from localStorage
    this.midnight = JSON.parse(
      localStorage.getItem(MIDNIGHT_KEY) || new Date().setHours(24, 0, 0, 0)
    );
    // Grabs timeLeft incase page refreshes when user returns
    this.timeLeft = JSON.parse(localStorage.getItem(TIMELEFT_KEY) || null);
    // Grabs timeReturned incase page refreshes when user return
    this.timeReturned = JSON.parse(
      localStorage.getItem(TIMERETURNED_KEY) || null
    );
    // Grabs pauseInactiveDuration incase page refreshes when user return
    this.pauseInactiveDuration = JSON.parse(
      localStorage.getItem(PAUSEINACTIVE_KEY) || null
    );
    // Grabs totalInactiveDuration incase page refreshes when user return
    this.totalInactiveDuration = JSON.parse(
      localStorage.getItem(TOTALINACTIVE_KEY) || 0
    );

    // Watches if page is reloaded to prevent mulitple execution of visibility change
    let data = window.performance.getEntriesByType("navigation")[0].type;
    data === "reload" ? (this.reloaded = true) : (this.reloaded = false);
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
#background {
  background: url(./assets/images/backgrounds/RVDVR-gray-bg.svg) center
    no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  position: fixed;
  top: 0;
  overflow: hidden;
}
.content-container {
  width: 100vw;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.card {
  @extend %flex-column;
  justify-content: center;
  text-align: center;
  height: auto;
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
