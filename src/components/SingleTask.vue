<template>
  <div
    @click="setActive(this.task.id)"
    :id="this.task.id"
    class="single-task checkbox"
    :class="{ active: this.index === this.activeItem }"
    :style="{ backgroundColor: this.task.color }"
  >
    <!-- Invisible default checkbox -->
    <!-- Delete button -->
    <input
      @click="setCompleted(this.task.id)"
      type="checkbox"
      :checked="this.task.completed"
    />
    <button
      @click.prevent="deleteTask(this.task.id)"
      class="indicator-delete hide-btn"
    ></button>
    <!-- Custom checkbox -->
    <div class="indicator-checkbox"></div>
    <!-- The added task -->
    <p class="text">{{ this.task.task }}</p>
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
    activeItem: {
      type: Number,
    },
    index: {
      type: Number,
    },
    allTasks: {
      type: Array,
    },
  },
  watch: {
    activeItem: {
      // removes the previously active tasks delete button
      // when the activeItem changes, set previous activeItem deleteBtn to none
      handler(currentItem, pastItem) {
        // IF the currentItem and pastItem exist
        if (
          currentItem !== null &&
          pastItem !== undefined &&
          pastItem !== null
        ) {
          // finds the previously active task and adds hide-btn to hide it
          let findPastItem = this.allTasks.filter((item, i) => i === pastItem);
          // IF the previous item is found
          if (findPastItem.length > 0) {
            let oldItem = document.getElementById(findPastItem[0].id); //parent
            let siblingEl = oldItem.querySelector(".indicator-checkbox"); //sibling
            if (siblingEl !== null) {
              let deleteBtn = oldItem.querySelector(".indicator-delete"); //new
              oldItem.insertBefore(deleteBtn, siblingEl); //handle error
              deleteBtn.classList.add("hide-btn");
            }
          }
        }
      },
      deep: true,
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
    deleteTask(task) {
      // Find the specific task with it's id
      let foundItem = this.allTasks.find((item) => item.id === task);
      // save to a mutatable array
      let tasks = this.allTasks;
      // Remove task from array
      tasks.splice(this.allTasks.indexOf(foundItem), 1);
      // update localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
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
  position: relative;
  cursor: pointer;
  font-size: $text-sm;
  font-weight: 600;
  text-align: start;
  color: $black;
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
  // hover when checked
  .single-task:hover input:not([disabled]):checked ~ & {
    background: darken($color: $goodGreen, $amount: 10);
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
  z-index: 7;
  top: 12px;
  right: 10px;
  height: 24px;
  width: 24px;
  border: none;
  border-radius: 4px;
  background-color: $deleteRed;
  // hover over delete
  &:hover {
    background: darken($color: $deleteRed, $amount: 5);
  }
  // X
  &:after {
    content: "\D7";
    position: absolute;
    .checkbox & {
      font-size: 26px;
      font-weight: boldItem;
      font-family: $nunito;
      right: 4px;
      top: -6.5px;
      color: $white;
    }
  }
}
@media only screen and (max-width: $mobile-width) {
  .single-task {
    font-size: $text-xs;
  }
}
</style>
        