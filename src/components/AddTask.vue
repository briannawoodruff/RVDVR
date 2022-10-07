<template>
  <!-- ADDTASK BUTTON TRUE -->
  <form v-if="showAddTask" @submit="$emit('toggle-add-task')" class="add-form">
    <input type="submit" value="+" class="add-task-btn" />
  </form>
  <!-- INPUT ADDTASK FORM -->
  <form v-else @submit="onSubmit" class="add-form">
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
</template>
  
<script>
import { uuid } from "vue-uuid";

export default {
  name: "AddTask",
  emits: ["toggle-add-task"],
  props: {
    showAddTask: Boolean,
    isToday: Boolean,
    allTasks: {
      type: Array,
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
        this.newTask = {
          id: uuid.v4(),
          task: "",
          isToday: this.isToday,
          completed: false,
        };
      }
      // BUTTON TOGGLE
      this.$emit("toggle-add-task");
    },
  },
};
</script>
  
<style lang="scss" scoped>
@import "../scss/_variables.scss";
// form container
.add-form {
  margin: 5px 0 15px 0;
  height: 100%;
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

  & input {
    width: auto;
    height: auto;
    margin: 5px 10px 10px 10px;
    padding: 8px 7px;
    font-size: $text-sm;
  }
}
.task-input:focus, .task-input:active {
  outline: none;
  border: 2px solid $navy;
  border-radius: 3px;
}
</style>