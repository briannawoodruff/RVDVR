<template>
  <div
    :class="this.title === 'Eisenhower' ? 'container eisenhower' : 'container'"
  >
    <div v-if="this.title !== 'Eisenhower'" class="wrapper">
      <h2 class="header">
        {{ this.title }}
        <button
          @click="$emit('show-mission')"
          v-if="this.title === 'MISSION PANEL'"
          class="icon-btn"
        >
          <img
            v-if="this.showMission"
            class="icon"
            src="../../assets/images/icons/RVDVR-Icons-Eye.svg"
          />
          <img
            v-else
            class="icon"
            src="../../assets/images/icons/RVDVR-Icons-EyeHidden.svg"
          />
        </button>
      </h2>
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
    showMission: {
      type: Boolean,
    },
  },
  emits: ["show-mission"],
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
.header {
  position: relative;
  & .icon-btn {
    position: absolute;
    top: 3px;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
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

@media only screen and (max-width: $mobile-width) {
  .container {
    margin: 10px 30px;
  }
}
</style>
        