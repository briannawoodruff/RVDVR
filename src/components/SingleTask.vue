<template>
  <div
    @mousedown="setActive(this.task.id)"
    @touchstart.passive="setActive(this.task.id)"
    :id="this.task.id"
    class="single-task checkbox"
    :style="{ backgroundColor: this.task.color }"
  >
    <!-- Invisible default checkbox -->
    <!-- Delete button -->
    <label for="checkbox">
      <input
        @click.passive="setCompleted(this.task.id)"
        type="checkbox"
        aria-label="Task Checkbox"
        :checked="this.task.completed"
      />
      <button
        @click.passive="deleteTask(this.task.id)"
        class="indicator-delete hide-btn"
      ></button>
      <!-- Custom checkbox -->
      <div class="indicator-checkbox"></div>
      <!-- The added task -->
      <p class="text">{{ this.task.task }}</p>
    </label>
  </div>
</template>
        
<script>
const STORAGE_KEY = "rvdvr_todos";

export default {
  name: "SingleTask",
  props: {
    task: {
      type: Object,
    },
    allTasks: {
      type: Array,
    },
    watchDelete: {
      type: Function,
    },
  },
  methods: {
    setActive(id) {
      // makes the delete button visible when active by removing hide-btn
      if (id !== undefined || id !== null) {
        let current = document.getElementById(id);
        if (current !== null) {
          let btn = current.querySelector(".indicator-delete");
          btn.classList.remove("hide-btn");
        }
        // removes delete button from all buttons except the current active button
        let tasks = document.querySelectorAll(".single-task");
        let [findCurrent] = this.allTasks.filter((item) => item.id === id);
        tasks.forEach((task) => {
          if (task.id !== findCurrent.id) {
            let div = document.getElementById(task.id);
            let deleteBtn = div.querySelector(".indicator-delete");
            deleteBtn.classList.add("hide-btn");
          }
        });
      }
    },
    setCompleted(id) {
      // find task in allTasks
      let [found] = this.allTasks.filter((task) => task.id === id);
      // toggle completed property
      found.completed = !this.task.completed;
      // update localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allTasks));
    },
    deleteTask(taskId) {
      // bypass vue draggable emit function limitation to delete a task
      this.watchDelete(taskId);
    },
  },
};
</script>
        
<style lang="scss" scoped>
@import "../scss/_variables.scss";

// Custom checkbox styling resource -> https://codepen.io/KenanYusuf/pen/PZKEKd
.single-task {
  width: 100%;
  height: auto;
  overflow: hidden;
  border: 2px solid $white;
  background-color: $white;
  padding: 12.33px 35px 12.33px 45px;
  margin: 0;
  border-radius: 5px;
  font-family: $nunito;
  font-size: $text-sm;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  text-align: start;
  color: $black;
  user-select: none;
  // Hide default browser input
  & input {
    position: absolute;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
    top: 10px;
    left: 196px;
    height: 36px;
    width: 36px;
    transform: translate(-192px, -3px);
    -webkit-transform: translate(-192px, -3px);
    -moz-transform: translate(-192px, -3px);
    -o-transform: translate(-192px, -3px);
    -ms-transform: translate(-192px, -3px);
  }
  &:hover {
    border: 2px solid $darkGray;
  }
  &:active {
    cursor: move;
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
}
.text {
  cursor: pointer;
  user-select: none;
}
.active {
  border: 2px solid $darkGray;
}
// checkbox
.indicator-checkbox {
  position: absolute;
  top: 12px;
  left: 9px;
  height: 24px;
  width: 24px;
  border: 2px solid $darkGray;
  border-radius: 4px;
  background-color: $mediumGray;
  // hover
  .single-task:hover input ~ & {
    background: $grayBG;
  }
  // checked
  .single-task input:checked ~ & {
    background: $goodGreen;
    border: none;
    // checked color change and strikethrough
    + p {
      color: darken($color: $grayBG, $amount: 40);
      text-decoration: line-through;
    }
  }
  // if checkbox not checked yet, inset shadow
  input:not([enabled]):active ~ & {
    box-shadow: inset 1px 2px 3px $darkGreenShadow;
  }
  // hover when checked
  .single-task:hover input:not([disabled]):checked ~ & {
    background: darken($color: $goodGreen, $amount: 5);
  }
  // if checkbox is checked, translate
  .single-task:active input:not([disabled]):checked ~ & {
    @extend %translate-btn-click-1px-1px;
  }
  // hide default browser input
  .single-task input:disabled ~ & {
    background: $grayBG;
    opacity: 0.6;
    pointer-events: none;
  }
  // tick
  &:after {
    content: "";
    position: absolute;
    display: none;
    .single-task input:checked ~ & {
      display: block;
    }
    // checkbox tick
    .checkbox & {
      left: 8px;
      top: 3px;
      width: 5px;
      height: 12px;
      border: solid $white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
    }
    // disabled tick color
    .checkbox input:disabled ~ & {
      border-color: $grayBG;
    }
  }
}
// delete button
.hide-btn {
  display: none;
  // hover over task show delete button
  .single-task:hover & {
    display: block;
  }
}
.indicator-delete {
  // display: block;
  position: absolute;
  z-index: 100;
  top: 12px;
  right: 10px;
  height: 24px;
  width: 24px;
  border: none;
  border-radius: 4px;
  background-color: $deleteRed;
  cursor: pointer;
  // hover over delete
  &:hover {
    background: darken($color: $deleteRed, $amount: 5);
  }
  &:active {
    @extend %translate-btn-click-1px-1px;
  }
  // X
  &:after {
    content: "\D7";
    position: absolute;
    .checkbox & {
      font-size: 26px;
      font-weight: 700;
      font-family: $nunito;
      right: 4.15px;
      top: -6.4px;
      color: $white;
    }
  }
}
@media only screen and (max-width: $mobile-width) {
  .single-task {
    font-size: $text-xs;
    &.text {
      cursor: pointer;
      user-select: none;
    }
  }
  .text {
    cursor: none;
    user-select: none;
  }
}
</style>
        