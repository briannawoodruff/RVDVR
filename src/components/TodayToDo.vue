<template>
    <!-- TODAY TASKS -->
    <!-- IF there is tasks -->
    <div v-if="this.allTasks.length">
      <!-- Filters for TODAY only tasks -->
      <div class="tasks" v-for="task in this.allTasks.filter(item => item.isToday === true)" :key="task.id">
        <SingleTask @delete-task="$parent.$emit('delete-task', task)" :task="task" />
      </div>
    </div>
    <!-- IF there's no tasks -->
    <div v-else-if="this.showAddTask" @click="toggleAddTask" class="tasks">
      <p class="no-tasks">Add or drag a task</p>
    </div>
</template>
      
<script>
import SingleTask from "./SingleTask.vue";

export default {
  name: "TodayToDo",
  components: {
    SingleTask,
  },
  emits: ["delete-task"],
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
      