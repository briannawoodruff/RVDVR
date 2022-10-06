<template>
  <div class="today-container">
    <div class="wrapper">
      <h2 class="header">TODAY</h2>
      <hr />
    </div>
    <div class="tasks">
      <SingleTask />
      <SingleTask />
      <SingleTask />
      <SingleTask />
      <SingleTask />
      <SingleTask />
    </div>
  </div>
</template>
      
<script>
import SingleTask from "./SingleTask.vue";

export default {
  name: "TodayToDo",
  components: {
    SingleTask,
  },
};
</script>
      
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.today-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  max-width: 500px;
  min-height: 250px;
  margin: 30px auto;
  overflow: auto;
  border: 2px solid $darkGreen;
  background-color: $white;
  padding: 0;
  border-radius: 5px;
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
  color: darkgray;
  background-color: darkgray;
}
.tasks {
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 38px;
}
</style>
      