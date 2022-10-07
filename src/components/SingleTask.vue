<template>
  <label class="single-task checkbox">
    <input type="checkbox" />
    <button
      @click="$parent.$emit('delete-task', task.id)"
      class="indicator-delete"
    ></button>
    <div class="indicator-checkbox"></div>
    <p class="text">{{ this.task.task }}</p>
  </label>
</template>
        
<script>
export default {
  name: "SingleTask",
  props: {
    task: {
      type: Object,
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
  // border: 2px solid $darkGreen;
  background-color: $white;
  padding: 10px 35px 10px 45px;
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
    top: 8px;
    left: 196px;
    height: 24px;
    width: 24px;
    transform: translate(-187px, -1px);
  }
}
// checkbox
.indicator-checkbox {
  position: absolute;
  top: 7px;
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
  }
  // checked color change and strikethrough
  .single-task input:checked ~ & {
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
// delete
.indicator-delete {
  display: none;
  position: absolute;
  z-index: 7;
  top: 7px;
  right: 10px;
  height: 24px;
  width: 24px;
  border: none;
  border-radius: 4px;
  background-color: $deleteRed;
  // hover over task show delete button
  .single-task:hover & {
    display: block;
  }
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
      font-weight: bold;
      font-family: $nunito;
      right: 4px;
      top: -6.5px;
      color: $white;
    }
  }
}
</style>
        