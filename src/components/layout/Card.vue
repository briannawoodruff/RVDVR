<template>
  <div
    :class="this.title === 'Eisenhower' ? 'container eisenhower' : 'container'"
    :id="this.title === 'MISSION PANEL' ? this.title.split(' ')[0] : this.title"
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
            alt="Show Mission Panel Open Eye"
          />
          <img
            v-else
            class="icon"
            src="../../assets/images/icons/RVDVR-Icons-EyeHidden.svg"
            alt="Hide Mission Panel Closed Eye"
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
  @extend %flex-column;
  position: relative;
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
  box-shadow: 2px 4px 6px $darkGrayShadow;
  &#MISSION {
  margin-top: 75px;
}
}
.header {
  position: relative;
  letter-spacing: 0.05rem;
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
    &#MISSION {
      margin-top: 10px;
    }
  }
}
</style>
        