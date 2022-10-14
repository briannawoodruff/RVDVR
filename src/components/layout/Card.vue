<template>
  <div :class="this.title === 'Eisenhower' ? 'container eisenhower' : 'container'">
    <div v-if="this.title !== 'Eisenhower'" class="wrapper">
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
  width: 320px;
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
.eisenhower {
  width: 320px;
  height: 320px;
  margin-top: 10px;
  margin-bottom: 15px;
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
        