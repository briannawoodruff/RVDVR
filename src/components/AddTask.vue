<template>
  <!-- ADDTASK FORM -->
  <div class="form">
    <!-- IF AddTask Button True, show + button -->
    <form
      v-if="this.isToday ? this.showTodayTask : this.showMasterTask"
      @submit.passive="onSubmit"
      class="add-form"
    >
      <button
        @click.passive="
          this.isToday
            ? $emit('toggle-today-task')
            : $emit('toggle-master-task')
        "
        type="button"
        class="add-task-btn"
      >
        +
      </button>
    </form>
    <!-- ELSE show Input AddTask Form and "Add a Task" Button -->
    <div v-else class="add-form">
      <form @submit.prevent="onSubmit">
        <div class="form-control">
          <input
            id="input"
            type="text"
            v-model="this.newTask.task"
            name="task"
            autofocus
            placeholder="Add a Task"
            class="task-input"
          />
        </div>
        <!-- Done Button -->
        <button @click.passive="onSubmit" type="button" class="add-task-btn">
          Done
        </button>
      </form>
    </div>
  </div>
</template>
  
<script>
import { uuid } from "vue-uuid";

export default {
  name: "AddTask",
  emits: [
    "toggle-today-task",
    "toggle-master-task",
    "add-task",
    "clear-edit-task",
    "update-single-task",
    "set-today-limit",
  ],
  props: {
    showTodayTask: {
      type: Boolean,
    },
    showMasterTask: {
      type: Boolean,
    },
    allTasks: {
      type: Array,
    },
    isToday: {
      type: Boolean,
    },
    editTask: {
      type: Object,
    },
    todayLimit: {
      type: Boolean,
    },
  },
  data() {
    return {
      newTask: {
        id: uuid.v4(),
        task: "",
        isToday: this.isToday,
        completed: false,
        color: "#fff",
        date: new Date().getTime(),
      },
      savedTask: "",
      timeout: null,
    };
  },
  watch: {
    // watches toggle to put the input in focus
    showTodayTask: {
      handler(currentItem) {
        if (!currentItem) {
          this.setFocus();
        }
      },
      immediate: true,
    },
    showMasterTask: {
      handler(currentItem) {
        if (!currentItem) {
          this.setFocus();
        }
      },
      immediate: true,
    },
    editTask: {
      handler(newValue) {
        // IF a task is being edited
        if (newValue) {
          // saves the editTask.task
          this.savedTask = this.editTask.task;
          // points the edit task to be the newTask
          this.newTask = this.editTask;
        } else {
          // ELSE a task is not being updated
          // If today's limit is false
          if (!this.todayLimit && this.isToday) {
            // reset todayLimit back to true
            this.$emit("set-today-limit");
          }
          // reset saved task and set newTask.task back to nothing
          if (this.savedTask !== "") {
            this.savedTask = "";
          }
          // reset newTask
          this.resetNewTask();
        }
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit() {
      // IF text was added
      if (this.newTask.task !== "" && this.newTask.task !== " ") {
        // If a task being edited
        if (this.editTask) {
          // update that single task
          this.$parent.$emit("update-single-task", this.newTask);
        } else {
          // ELSE a task is not being edit, add a new task
          this.$parent.$emit("add-task", this.newTask);
        }
      } else {
        // ELSE no text was added but it's being edited
        if (this.editTask) {
          // reset the newTask.task to what it was
          this.newTask.task = this.savedTask;
        }
      }
      // reset newTask
      this.resetNewTask();
      // reset editTask back to null
      this.$emit("clear-edit-task");
      // BUTTON TOGGLE
      this.isToday
        ? this.$emit("toggle-today-task")
        : this.$emit("toggle-master-task");
    },
    resetNewTask() {
      return (this.newTask = {
        id: uuid.v4(),
        task: "",
        isToday: this.isToday,
        completed: false,
        color: "#fff",
        date: new Date().getTime(),
      });
    },
    async setFocus() {
      clearTimeout(this.timeout);
      // waits until mounts
      this.timeout = setTimeout(() => {
        let input = document.getElementById("input");
        // puts input in focus
        if (input !== null) {
          input.focus();
          input.click();
        }
      }, 50);
    },
  },
};
</script>
  
<style lang="scss" scoped>
@import "../scss/_variables.scss";
// form container
.form {
  width: 100%;
}
.add-form {
  margin: 5px 0 10px 0;
  height: auto;
  width: 100%;
}
// form buttons
.add-task-btn {
  width: 80%;
  font-size: $text-sm;
  font-weight: 700;
  font-family: $nunito;
  color: white;
  box-shadow: 2px 4px 5px $darkGreenShadow;
  border: none;
  border-radius: 5px;
  background-color: $darkGreen;
  padding: 5px;
  cursor: pointer;
  text-shadow: 2px 2px 3px $blackShadow;
  &:active {
    @extend %translate-btn-click-1px-1px;
    box-shadow: 1px 3px 5px $blackShadow;
  }
}
// form text input
.form-control {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8.33px 0;

  & input {
    width: auto;
    height: auto;
    margin: 0 10px 0 10px;
    padding: 8px 7px;
    font-size: $text-sm;
  }
}
.task-input:focus,
.task-input:active {
  outline: none;
  border: 2px solid $navy;
  border-radius: 3px;
}
@media only screen and (max-width: $mobile-width) {
  .add-task-btn {
    font-size: $text-xs;
  }
  .form-control input {
    font-size: $text-xs;
  }
}
</style>