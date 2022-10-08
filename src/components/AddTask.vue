<template>
  <!-- TODAY TODO FORM -->
  <div v-if="this.isToday" class="form">
    <!-- AddTask Button True -->
    <form
      v-if="this.showTodayTask"
      @submit="$emit('toggle-today-task')"
      class="add-form"
    >
      <input type="submit" value="+" class="add-task-btn" />
    </form>
    <!-- Input AddTask Form -->
    <div v-else class="add-form">
      <form @submit="onSubmit">
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
        <input type="submit" value="Done" class="add-task-btn" />
      </form>
    </div>
  </div>

  <!-- MASTER TODO FORM -->
  <div v-else class="form">
    <!-- AddTask Button True -->
    <form
      v-if="this.showMasterTask"
      @submit="$emit('toggle-master-task')"
      class="add-form"
    >
      <input type="submit" value="+" class="add-task-btn" />
    </form>
    <!-- Input AddTask Form -->
    <div v-else class="add-form">
      <form @submit="onSubmit">
        <div class="form-control">
          <input
            id="input"
            type="text"
            v-model="this.newTask.task"
            name="task"
            placeholder="Add a Task"
            class="task-input"
          />
        </div>
        <!-- Done Button -->
        <input type="submit" value="Done" class="add-task-btn" />
      </form>
    </div>
  </div>
</template>
  
<script>
import { uuid } from "vue-uuid";

export default {
  name: "AddTask",
  emits: ["toggle-today-task", "add-task"],
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
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      // IF text was added
      if (this.newTask.task !== "") {
        this.$parent.$emit("add-task", this.newTask);
        // reset newTask
        this.newTask = {
          id: uuid.v4(),
          task: "",
          isToday: this.isToday,
          completed: false,
        };
      }
      // BUTTON TOGGLE
      if (this.isToday) {
        this.$emit("toggle-today-task");
      } else {
        this.$emit("toggle-master-task");
      }
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
  margin: 5px 0 15px 0;
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
    margin: 5px 10px 10px 10px;
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