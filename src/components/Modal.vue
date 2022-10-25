<template>
  <div class="container">
    <div class="modal-wrapper">
      <div class="info-box">
        <p>Choose up to 3 tasks to be Today's objective.</p>
        <p>
          If you need help prioritizing, click Prioritize to color-code your
          tasks with the Eisenhower Matrix.
        </p>
        <p>
          You get a break day for every 5 streak days that allows you to pause
          your streak for 1 day.
        </p>
      </div>
      <button class="delete-btn"></button>
    </div>
  </div>
</template>
            
  <script>
export default {
  name: "ModalComponent",
  methods: {},
};
</script>
          
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.container {
  position: absolute;
  z-index: 100;
  top: 65px;
  left: 46vw;
  width: 400px;
  height: 250px;
  padding: 0;
  background: $mediumGray;
  border-radius: 15px;
  border: 2px solid $mediumGray;
  box-shadow: 0px 2px 6px 1px $darkGrayShadow;
  z-index: 6;
  &:after {
    content: "";
    position: absolute;
    z-index: 0;
    right: 0;
    top: 3px;
    width: 50px;
    height: 50px;
    border-radius: 100% 0% 100% 0%;
    border-width: 2px 2px 0 0;
    background: $mediumGray;
    transform: rotate(-35deg) translate(10px, -5px);
  }
}
.modal-wrapper {
  @extend %flex-column;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.info-box {
  height: auto;
  width: 85%;
  border-radius: 5px;
  border: 2px solid $grayBG;
  background: $white;
  margin: 15px 10px 10px 10px;
  & p:first-child {
    padding-right: 35px;
  }
  & p {
    padding: 5px 8px;
    font-size: $text-xs;
    font-family: $nunito;
    text-align: start;
  }
}
// delete button
.delete-btn {
  position: absolute;
  z-index: 7;
  top: 26px;
  right: 42px;
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
    transform: translate(1px, 1px);
  }
  // X
  &:after {
    content: "\D7";
    position: absolute;
    .modal-wrapper & {
      font-size: 26px;
      font-weight: bold;
      font-family: $nunito;
      right: 4px;
      top: -6.5px;
      color: $white;
    }
  }
}
@media only screen and (max-width: $medium-width) {
}
@media only screen and (max-width: $mobile-width) {
}
</style>
            