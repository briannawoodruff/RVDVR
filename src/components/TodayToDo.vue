<template>
  <div class="today-container">
    <div class="wrapper">
      <h2 class="header">TODAY</h2>
      <hr />
    </div>
    <div class="tasks">
      <SingleTask />
      <SingleTask />
    </div>
    <AddTask @toggle-add-task="toggleAddTask" :showAddTask="showAddTask" />
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
  data() {
    return {
      showAddTask: true,
    };
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    async addTask(task) {
      const res = await fetch(
        "https://vue-tasktracker-backend.herokuapp.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      const data = await res.json();

      this.tasks = [...this.tasks, data];
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
  min-height: 175px;
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
}
</style>
      