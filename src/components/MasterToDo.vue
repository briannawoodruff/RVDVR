<template>
  <!-- MASTER TASKS -->
  <!-- IF there is tasks -->
  <div
    v-if="
      this.allTasks.length > 0 &&
      this.allTasks.some((item) => item.isToday === false)
    "
    class="container"
  >
    <!-- Filters for NOT TODAY only tasks -->
    <div class="tasks" v-for="(task, i) in this.allTasks" :key="task.id">
      <SingleTask
        :index="i"
        :activeItem="this.activeItem"
        @click="$emit('selected-task', i)"
        v-if="task.isToday === false"
        @delete-task="$parent.$emit('delete-task', task)"
        :task="task"
        :allTasks="this.allTasks"
      />
    </div>
  </div>
  <!-- IF there's no tasks -->
  <div v-else>
    <div v-if="this.showMasterTask" @click="toggleMasterTask" class="tasks">
      <p class="no-tasks">Add a task</p>
    </div>
  </div>
  <!-- AddTask Button/Form -->
  <AddTask
    @toggle-master-task="toggleMasterTask"
    :showMasterTask="this.showMasterTask"
    @add-task="$emit('add-task', newTask)"
    :isToday="this.isToday"
  />
</template>
      
<script>
import SingleTask from "./SingleTask.vue";
import AddTask from "./AddTask.vue";

export default {
  name: "MasterToDo",
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
      showMasterTask: true,
    };
  },
  methods: {
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
      