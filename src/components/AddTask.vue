<template>
  <form v-if="showAddTask" @submit="$emit('toggle-add-task')" class="add-form">
    <input type="submit" value="+" class="add-task-btn" />
  </form>

  <form v-else @submit="$emit('toggle-add-task')" class="add-form">
    <div class="form-control">
      <!-- <label for="task">Task</label> -->
      <input
        type="text"
        v-model="text"
        name="text"
        placeholder="Add Task"
        class="task-input"
      />
    </div>

    <input type="submit" value="Done" class="add-task-btn" />
  </form>
</template>
  
  <script>
export default {
  name: "AddTask",
  props: {
    showAddTask: Boolean,
  },
  emits: ["toggle-add-task"],
  data() {
    return {
      text: "",
      day: "",
      reminder: false,
    };
  },
  methods: {},
};
</script>
  
<style lang="scss" scoped>
@import "../scss/_variables.scss";
.add-form {
  margin: 5px 0 15px 0;
  height: 100%;
  width: 100%;
}

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
}

.form-control {
  display: flex;
  flex-direction: column;
  width: 100%;

  & input {
    width: auto;
    height: auto;
    margin: 5px 5px 10px 5px;
    padding: 8px 7px;
    font-size: $text-sm;
  }
}
</style>