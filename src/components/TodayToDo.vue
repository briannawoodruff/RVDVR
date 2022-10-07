<template>
  <div class="today-container">
    <div class="wrapper">
      <h2 class="header">TODAY</h2>
      <hr />
    </div>
    <!-- TASKS -->
    <!-- IF there is tasks -->
    <div v-if="this.allTasks.length">
      <!-- Filters for TODAY only tasks -->
      <div class="tasks" v-for="task in this.allTasks.filter(item => item.isToday === true)" :key="task.id">
        <SingleTask @delete-task="$emit('delete-task', task)" :task="task" />
      </div>
    </div>
    <!-- IF there's no tasks -->
    <div v-else-if="this.showAddTask" @click="toggleAddTask" class="tasks">
      <p class="no-tasks">Add or drag a task</p>
    </div>

    <!-- ADDTASK BUTTON/FORM -->
    <AddTask
      @toggle-add-task="toggleAddTask"
      @add-task="$emit('add-task', newTask)"
      :showAddTask="showAddTask"
      :isToday="isToday"
    />
  </div>
</template>
      
<script>
import SingleTask from "./SingleTask.vue";
import AddTask from "./AddTask.vue";

export default {
  name: "TodayToDo",
  components: {
    SingleTask,
    AddTask,
  },
  emits: ["add-task", "delete-task"],
  props: {
    allTasks: {
      type: Array,
    },
  },
  data() {
    return {
      showAddTask: true,
      isToday: true,
    };
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
  },
};
</script>
      
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.today-container {
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  width: 300px;
  max-width: 500px;
  min-height: 150px;
  margin: 30px auto;
  overflow: auto;
  border: 3px solid $darkGreen;
  background-color: $white;
  padding: 0;
  border-radius: 5px;
  top: 0;
}
.wrapper {
  width: 98%;
  top: 0;
}
.header {
  font-family: $blinker;
  font-size: $text-lg;
  color: $black;
  margin: 5px;
}
hr {
  margin: 5px;
  height: 2px;
  border-width: 0;
  color: $darkGray;
  background-color: $darkGray;
}
.tasks {
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 38px;
  cursor: pointer;
}
.no-tasks {
  font-size: $text-sm;
  font-family: $nunito;
  margin: 8px 0 35px 0;
}
</style>
      