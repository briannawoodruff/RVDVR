<template>
  <div class="container">
    <div class="wrapper">
      <h2 class="header">{{ this.title }}</h2>
      <hr />
    </div>
    <!-- Where tasks are inserted -->
    <slot></slot>
  </div>
</template>
        
<script>
export default {
  name: "CardContainer",
  props: {
    title: {
      type: String,
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
  width: 300px;
  max-width: 500px;
  height: auto;
  margin: 30px;
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
        