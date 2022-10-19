<template>
  <!-- ADDTASK FORM -->
  <div class="form">
    <!-- IF AddTask Button True, show + button -->
    <form
      v-if="this.isToday ? this.showTodayTask : this.showMasterTask"
      @submit.prevent="onSubmit"
      class="add-form"
    >
      <button
        @click="
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
        <button @click.prevent="onSubmit" type="button" class="add-task-btn">
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
  emits: ["toggle-today-task", "toggle-master-task", "add-task"],
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
  },
  data() {
    return {
      newTask: {
        id: uuid.v4(),
        task: "",
        isToday: this.isToday,
        completed: false,
        color: "#fff",
      },
    };
  },
  watch: {
    // watches toggle to put the input in focus
    showTodayTask(currentItem) {
      if (!currentItem) {
        this.setFocus();
      }
    },
    showMasterTask(currentItem) {
      if (!currentItem) {
        this.setFocus();
      }
    },
  },
  methods: {
    onSubmit() {
      // IF text was added
      if (this.newTask.task !== "") {
        this.$parent.$emit("add-task", this.newTask);
        // reset newTask
        this.newTask = {
          id: uuid.v4(),
          task: "",
          isToday: this.isToday,
          completed: false,
          color: "#fff",
        };
      }
      // BUTTON TOGGLE
      if (this.isToday === true) {
        this.$emit("toggle-today-task");
      } else {
        this.$emit("toggle-master-task");
      }
    },
    async setFocus() {
      // waits until mounts
      setTimeout(() => {
        let input = document.getElementById("input");
        // puts input in focus
        if (input !== null) {
          input.select();
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
  font-weight: bold;
  font-family: $nunito;
  color: white;
  border: 2px solid darken($color: $darkGreen, $amount: 10);
  border-radius: 5px;
  background-color: $darkGreen;
  padding: 3px;
  cursor: pointer;
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
</style>