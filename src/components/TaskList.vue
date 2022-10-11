<template>
  <!-- TASK LIST -->
  <!-- IF there are tasks in allTasks -->
  <div
    v-if="
      this.allTasks.length > 0 &&
      this.allTasks.some((item) => item.isToday === this.isToday)
    "
    class="container"
  >
    <!-- Draggable Element -->
    <draggable
      group="tasks"
      @start="drag = true"
      @end="drag = false"
      class="tasks"
      :list="this.allTasks"
      item-key="id"
    >
      <template #item="{ element, index }">
        <SingleTask
          v-if="element.isToday === this.isToday"
          :index="index"
          :activeItem="this.activeItem"
          @click="$emit('selected-task', index)"
          :task="element"
          :allTasks="this.allTasks"
          :key="element.id"
          class="task"
        />
      </template>
    </draggable>
  </div>
  <!-- IF there's no tasks -->
  <div v-else>
    <!-- Toggle if Today element -->
    <div v-if="this.isToday && this.showTodayTask" @click="toggleTodayTask" class="task">
      <p class="no-tasks">Add or drag a task</p>
    </div>
    <!-- Toggle if Master element -->
    <div v-else-if="!this.isToday && this.showMasterTask" @click="toggleMasterTask" class="task">
      <p class="no-tasks">Add a task</p>
    </div>
  </div>
  <!-- AddTask Button/Form -->
  <AddTask
    @toggle-today-task="toggleTodayTask"
    @toggle-master-task="toggleMasterTask"
    :showTodayTask="this.showTodayTask"
    :showMasterTask="this.showMasterTask"
    @add-task="$emit('add-task', newTask)"
    :isToday="this.isToday"
  />
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
  emits: ["add-task", "selected-task"],
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
      showMasterTask: true,
    };
  },
  methods: {
    async toggleTodayTask() {
      this.showTodayTask = !this.showTodayTask;
    },
    async toggleMasterTask() {
      this.showMasterTask = !this.showMasterTask;
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
.task {
  display: flex;
  flex-direction: column;
  width: 100%;
  // top: 38px;
  cursor: pointer;
}
.no-tasks {
  font-size: $text-sm;
  font-family: $nunito;
  margin: 8px 0 35px 0;
}
</style>
      