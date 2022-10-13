<template>
  <!-- TASK LIST -->
  <!-- IF there are tasks in allTasks -->
  <div class="container">
    <!-- Draggable Element -->
    <draggable
      :group="{ name: 'tasks', put: true }"
      :move="move"
      @start="drag = true"
      @end="end"
      :list="this.allTasks.length > 0 ? this.allTasks : ['Add or drag a task']"
      class="tasks"
      ghost-class="ghost"
      :id="this.isToday ? 'today' : 'master'"
      item-key="id"
    >
      <template #item="{ element, index }">
        <SingleTask
          v-if="this.allTasks.length > 0 && this.isToday === element.isToday"
          class="task"
          @click="$emit('selected-task', index)"
          :key="element.id"
          :index="index"
          :task="element"
          :activeItem="this.activeItem"
          :allTasks="this.allTasks"
        />
        <!-- IF there's no tasks -->
        <!-- TODAY element AND index < 1 to only show once -->
        <div
          v-else-if="this.isToday === true && index < 1"
          @click="toggleTodayTask"
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
            <p class="no-tasks">Add or drag a task</p>
          </div>
        </div>
        <!-- MASTER element AND index < 1 to only show once -->
        <div
          v-else-if="this.isToday === false && index < 1"
          @click="toggleMasterTask"
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
            <p class="no-tasks">Add a task</p>
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <!-- AddTask Button/Form -->
  <AddTask
    @add-task="$emit('add-task', newTask)"
    @toggle-today-task="toggleTodayTask"
    @toggle-master-task="toggleMasterTask"
    :showTodayTask="this.showTodayTask"
    :showMasterTask="this.showMasterTask"
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
  emits: ["add-task", "selected-task", "update-task"],
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
      task: [],
    };
  },
  methods: {
    toggleTodayTask() {
      this.showTodayTask = !this.showTodayTask;
    },
    toggleMasterTask() {
      this.showMasterTask = !this.showMasterTask;
    },
    move(evt) {
      // set the moved task
      let task = evt.draggedContext.element;
      this.task = task;
    },
    end({ from, to }) {
      // IF a task is moved to a different list, update the task and JSON
      if (from.id !== to.id) {
        this.$emit("update-task", this.task);

      } else {
        // If a task is reordered in it's same list, update the JSON
        this.$emit("update-task");
      }
    },
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  margin: 8px 0 20.66px 0;
}
</style>
      