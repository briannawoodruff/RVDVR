<template>
  <label class="single-task checkbox">
      <input type="checkbox" />
      <div class="indicator"></div>
      <p class="text">Sample Text</p>
  </label>
</template>
        
<script>
export default {
  name: "SingleTask",
};
</script>
        
<style lang="scss" scoped>
@import "../scss/_variables.scss";

// Custom checkbox styling resource -> https://codepen.io/KenanYusuf/pen/PZKEKd
.single-task {
  width: 100%;
  height: auto;
  border: 2px solid $darkGreen;
  background-color: $white;
  padding: 7px 5px 7px 40px;
  margin: 0;
  border-radius: 5px;
  font-family: $nunito;
  position: relative;
  cursor: pointer;
  font-weight: 600;
  text-align: start;
  color: $black;

  // Hide default browser input
  & input {
    position: absolute;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
    top: 7px;
    left: 192px;
    height: 24px;
    width: 24px;
    transform: translate(-187px, -1px);
  }
}

.indicator {
  position: absolute;
  top: 6px;
  left: 5px;
  height: 24px;
  width: 24px;
  border: 2px solid darkgray;
  border-radius: 4px;
  background-color: $mediumGray;

  .single-task input:checked ~ & {
    + p {
      color: darken($color: $grayBG, $amount: 40);
      text-decoration: line-through;
    }
  }
  // hover
  .single-task:hover input ~ & {
    background: $grayBG;
  }
  // checked
  .single-task input:checked ~ & {
    background: $goodGreen;
    border: none;
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
      top: 2px;
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
</style>
        