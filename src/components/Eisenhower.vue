<template>
  <div class="grid">
    <!-- TOP ROW -->
    <div class="box title left-column"></div>
    <div class="box title">
      <p>Urgent</p>
    </div>
    <div class="box title">
      <p>Not Urgent</p>
    </div>
    <!-- MIDDLE ROW -->
    <div class="box title">
      <p class="left-column">Important</p>
    </div>
    <div class="box box-drag do">
      <p class="name">Do:</p>
      <p class="info">Tasks with deadlines or consequences</p>
    </div>
    <div class="box box-drag decide">
      <p class="name">Decide:</p>
      <p class="info">Schedule a time do to it</p>
    </div>
    <!-- BOTTOM ROW -->
    <div class="box title">
      <p class="left-column">Not Important</p>
    </div>
    <div class="box box-drag delegate">
      <p class="name">Delegate:</p>
      <p class="info">Tasks that must get done soon. Can someone help?</p>
    </div>
    <div class="box box-drag later">
      <p class="name">Later:</p>
      <p class="info">Not a priority and can be done whenever</p>
    </div>
  </div>
</template>
        
<script>

export default {
  name: "EisenhowerCard",
  props: {
    title: {
      type: String,
    },
  },
};
</script>
          
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.grid {
  display: grid;
  height: auto;
  width: auto;
  grid-template-rows: 36px 139px 139px;
  grid-template-columns: 36px 139px 139px;
}
.box {
  border: 1px solid $darkGray;
  font-size: $text-sm;
  font-family: $nunito;
  color: $black;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 10px;
  & .left-column {
    transform: rotate(-90deg);
    white-space: nowrap;
    word-spacing: 0.2em;
  }
  &.title {
    font-weight: bold;
    padding: 0;
  }
  & p.info {
    font-size: $text-xs;
    background: none;
  }
  &-drag {
    display: block;
  }
  & .name {
    font-size: $text-md;
    font-weight: bold;
  }
  &.do {
    background: $eRed;
  }
  &.decide {
    background: $eYellow;
  }
  &.delegate {
    background: $eOrange;
  }
  &.later {
    background: $eGreen;
  }
}
</style>
          