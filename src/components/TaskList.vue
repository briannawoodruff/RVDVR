<template>
  <!-- TASK LIST -->
  <!-- IF there are tasks in allTasks -->
  <div class="container">
    <!-- Draggable Element -->
    <draggable
      :group="{ name: 'tasks', pull: 'clone', put: pullFunction }"
      :delay="90"
      :delayOnTouchOnly="true"
      :touchStartThreshold="50"
      :emptyInsertThreshold="35"
      :clone="handleClone"
      @start="drag = true"
      @end="end"
      :list="this.allTasks.length > 0 ? this.allTasks : ['Add or drag a task']"
      class="tasks"
      ghost-class="ghost"
      :id="this.isToday ? 'today' : 'master'"
      item-key="id"
    >
      <template #item="{ element, index }">
        <div
          v-if="this.isToday ? this.isToday : !this.isToday && this.showMission"
        >
          <SingleTask
            v-if="this.allTasks.length > 0 && this.isToday === element.isToday"
            :key="element.id"
            class="task"
            :class="{ active: index === this.activeItem }"
            @click.passive="handleClick(index, element.id)"
            :index="index"
            :activeItem="this.activeItem"
            :watchDelete="this.watchDelete"
            :task="element"
            :allTasks="this.allTasks"
          />
          <!-- IF there's no tasks -->
          <!-- TODAY element AND index < 1 to only show once -->
          <div
            v-else-if="this.isToday === true && index < 1"
            @click.passive="toggleTodayTask"
            class="task"
          >
            <!-- IF there are no tasks OR there are no Today tasks AND toggles on and off -->
            <div
              v-if="
                (this.allTasks.length === 0 ||
                  !this.allTasks.some((item) => item.isToday === true)) &&
                this.showTodayTask
              "
            >
              <p class="no-tasks">Add or drag up to 3 tasks to do today</p>
            </div>
          </div>
          <!-- MASTER element AND index < 1 to only show once -->
          <div
            v-else-if="this.isToday === false && index < 1"
            @click.passive="toggleMasterTask"
            class="task"
          >
            <!-- IF there are no tasks OR there are no Master tasks AND toggles on and off -->
            <div
              v-if="
                (this.allTasks.length === 0 ||
                  !this.allTasks.some((item) => item.isToday === false)) &&
                this.showMasterTask
              "
            >
              <p class="no-tasks">Add tasks to make a to do list</p>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <!-- AddTask Button/Form -->
  <AddTask
    v-if="
      this.isToday
        ? this.isToday && !this.todayLimit
        : !this.isToday && this.showMission
    "
    @add-task="$emit('add-task', newTask)"
    @update-single-task="$emit('update-single-task', singleTask)"
    @toggle-today-task="toggleTodayTask"
    @toggle-master-task="toggleMasterTask"
    @clear-edit-task="clearEditTask"
    @set-today-limit="setTodayLimit"
    :editTask="this.editTask"
    :showTodayTask="this.showTodayTask"
    :showMasterTask="this.showMasterTask"
    :isToday="this.isToday"
    :todayLimit="this.todayLimit"
  />
  <div
    v-else-if="!this.isToday && !this.showMission"
    @click="$emit('show-mission')"
    class="show"
  >
    <button class="show-btn">
      <p class="arrow-down">v v v</p>
    </button>
  </div>
</template>
      
<script>
import SingleTask from "./SingleTask.vue";
import AddTask from "./AddTask.vue";
import draggable from "vuedraggable";

export default {
  name: "TaskList",
  components: {
    SingleTask,
    AddTask,
    draggable,
  },
  emits: [
    "add-task",
    "selected-task",
    "update-task",
    "delete-task",
    "set-current-task",
    "show-mission",
    "handle-active-item",
    "update-single-task",
  ],
  props: {
    allTasks: {
      type: Array,
    },
    isToday: {
      type: Boolean,
    },
    activeItem: {
      type: Number,
    },
    showMission: {
      type: Boolean,
    },
  },
  data() {
    return {
      showTodayTask: true,
      showMasterTask: true,
      task: null,
      selectedTaskId: null,
      todayLimit: null,
      editTask: null,
      clicks: 0,
    };
  },
  watch: {
    // When allTasks change, check if number of today tasks change to set limit
    allTasks: {
      handler(currentItem) {
        // IF the currentItem exist
        if (currentItem !== null && currentItem !== undefined) {
          this.checkNumberOfToday();
        }
      },
    },
  },
  methods: {
    toggleTodayTask() {
      this.showTodayTask = !this.showTodayTask;
    },
    toggleMasterTask() {
      this.showMasterTask = !this.showMasterTask;
    },
    handleClone(item) {
      // clones the moved item
      let cloned = JSON.parse(JSON.stringify(item));
      // set the moved task
      // only sets this.task if it's null or different
      if (this.task === null || this.task !== cloned) {
        // sets selected task
        this.task = cloned;
        // sets the selected tasks id
        this.selectedTaskId = this.task.id;
        this.$emit("set-current-task", this.selectedTaskId);
      }
    },
    end({ from, to }) {
      // IF a task is moved to a different list, update task and localStorage
      if (from.id !== to.id) {
        this.$emit("update-task", this.task);
      } else if (from.id === to.id) {
        // ELSE IF a task is moved in the same list, update localStorage
        this.$emit("update-task");
      }
      // updates activeItem on move
      if (this.task !== null) {
        let index = this.allTasks.map((task) => task.id).indexOf(this.task.id);
        this.$emit("selected-task", index);
      }
    },
    // Checks if there are more than 1 tasks in Today
    checkNumberOfToday() {
      // finds all the today tasks
      const findToday = this.allTasks.filter((item) => item.isToday === true);
      // IF there are more than 1 today tasks, limit today and hide the addTask btn
      if (findToday.length > 2) {
        this.todayLimit = true;
        // ELSE there are less than 2 tasks, show the addTask btn
      } else {
        this.todayLimit = false;
      }
    },
    // Sets the pull function depending on whether its the Today card and today tasks are limited
    pullFunction() {
      // IF it's today card and limited, set false to stop pulling more elements to today card
      if (this.isToday && this.todayLimit) {
        return false;
        // ELSE allow tasks to be pulled into card
      } else {
        return true;
      }
    },
    // emits to parent to delete a task
    watchDelete(taskId) {
      this.$emit("delete-task", taskId);
      if (this.editTask) {
        if (this.editTask.id === taskId) {
          this.clearEditTask();
          // toggle adding a task
          this.isToday ? this.toggleTodayTask() : this.toggleMasterTask();
        }
      }
    },
    updateTask(id) {
      // find task in allTasks
      let [found] = this.allTasks.filter((task) => task.id === id);

      // TOGGLING when double clicked
      // If there is no task being edited
      if (this.editTask === null) {
        // set editTask
        this.editTask = found;
      } else {
        // ELSE if there already is a task being edited, set it back to null
        this.clearEditTask();
      }
      // IF it's Todays list and todays limit is true when double clicked to edit
      if (this.isToday) {
        if (this.todayLimit) {
          // toggle off the limit and show the addTask to edit a singleTask
          this.todayLimit = false;
        } else {
          // set it back to true
          this.checkNumberOfToday();
        }
      }
      // toggle adding a task
      this.isToday ? this.toggleTodayTask() : this.toggleMasterTask();
    },
    // resets the editTask to null
    clearEditTask() {
      this.editTask = null;
    },
    setTodayLimit() {
      // recheck number of today
      this.checkNumberOfToday();
    },
    handleClick(index, id) {
      // increase click count
      this.clicks++;
      // set selected task
      this.$emit("selected-task", index);

      // Resource for handling the double click: https://stackoverflow.com/a/41309853
      // If only one click within time, set click to 0
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.clicks = 0;
        }, 350);
        // ELSE if we do get 2 clicks, update task
      } else {
        clearTimeout(this.timer);
        this.updateTask(id);
        this.clicks = 0;
      }
    },
  },
  mounted() {
    // onload checks number of todays tasks and sets todayLimit
    this.checkNumberOfToday();
  },
};
</script>
      
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.active {
  border: 2px solid $darkGray;
}
.ghost {
  opacity: 0.5;
}
.container {
  @extend %flex-column;
  // overflow: hidden;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
}
.tasks {
  width: 100%;
}
.task {
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
}
.no-tasks {
  font-size: $text-sm;
  font-family: $nunito;
  font-weight: 400;
  margin: 8px 2px 20.66px 2px;
  letter-spacing: -0.015rem;
}
.show {
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 100%;

  &-btn {
    cursor: pointer;
    width: 100%;
    font-size: $text-sm;
    font-weight: 700;
    font-stretch: 200%;
    font-family: $nunito;
    color: darken($color: $darkGray, $amount: 20);
    border: none;
    background-color: $mediumGray;
    padding: 3px;
    letter-spacing: 0.5rem;
    &:hover {
      background-color: $grayBG;
      color: darken($color: $darkGray, $amount: 30);
    }
  }
}
.arrow-down:hover {
  animation: wobble 1s infinite;
  -webkit-animation: wobble 1s infinite;
  -moz-animation: wobble 1s infinite;
  -o-animation: wobble 1s infinite;
  -ms-animation: wobble 1s infinite;
}
@keyframes wobble {
  0% {
    transform: translateY(-0.1rem);
    -webkit-transform: translateY(-0.1rem);
    -moz-transform: translateY(-0.1rem);
    -o-transform: translateY(-0.1rem);
    -ms-transform: translateY(-0.1rem);
  }
  50% {
    transform: translateY(0.2rem);
    -webkit-transform: translateY(0.2rem);
    -moz-transform: translateY(0.2rem);
    -o-transform: translateY(0.2rem);
    -ms-transform: translateY(0.2rem);
  }
  100% {
    transform: translateY(-0.1rem);
    -webkit-transform: translateY(-0.1rem);
    -moz-transform: translateY(-0.1rem);
    -o-transform: translateY(-0.1rem);
    -ms-transform: translateY(-0.1rem);
  }
}
</style>
      