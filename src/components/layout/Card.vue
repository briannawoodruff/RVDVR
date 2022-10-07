<template>
    <div class="container">
      <div class="wrapper">
        <h2 class="header">{{ this.title }}</h2>
        <hr />
      </div>
      <!-- Where tasks are inserted -->
      <slot></slot>
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
  import AddTask from "../AddTask.vue";
  
  export default {
    name: "CardContainer",
    components: {
      AddTask,
    },
    emits: ["add-task", "toggle-add-task"],
    props: {
      title: {
        type: String,
      }
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
  @import "../../scss/_variables.scss";
  
  .container {
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
  </style>
        