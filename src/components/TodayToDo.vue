<template>
  <!-- TODAY TASKS -->
  <!-- IF there is tasks -->
  <div
    v-if="
      this.allTasks.length > 0 &&
      this.allTasks.some((item) => item.isToday === true)
    "
    class="container"
  >
    <!-- Filters for TODAY only tasks -->
    <div class="tasks" v-for="(task, i) in this.allTasks" :key="task.id">
      <SingleTask
        :index="i"
        :activeItem="this.activeItem"
        @click="$emit('selected-task', i)"
        v-if="task.isToday === true"
        @delete-task="$parent.$emit('delete-task', task)"
        :task="task"
        :allTasks="this.allTasks"
      />
    </div>
  </div>
  <!-- IF there's no tasks -->
  <div v-else>
    <div v-if="this.showTodayTask" @click="toggleTodayTask" class="tasks">
      <p class="no-tasks">Add or drag a task</p>
    </div>
  </div>
  <!-- AddTask Button/Form -->
  <AddTask
    @toggle-today-task="toggleTodayTask"
    :showTodayTask="this.showTodayTask"
    @add-task="$emit('add-task', newTask)"
    :isToday="this.isToday"
  />
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
  emits: ["delete-task", "add-task", "selected-task"],
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
  },
  data() {
    return {
      showTodayTask: true,
    };
  },
  methods: {
    async toggleTodayTask() {
      this.showTodayTask = !this.showTodayTask;
    },
  },
};
</script>
      
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.active {
  border: 2px solid $darkGray;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
@media only screen and (max-width: $mobile-width) {
  .tasks {
    display: flex;
    justify-content: flex-start;
    text-align: start;
  }
}
</style>
      