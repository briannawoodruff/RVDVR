<template>
  <button
    v-if="this.title !== 'Done'"
    @click.prevent="handleClick"
    :class="this.title === 'Break Day' ? 'btn btn-break' : 'btn btn-prioritize'"
  >
    <div class="wrapper">
      <!-- Icon -->
      <img
        v-if="this.title === 'Break Day'"
        class="icon"
        src="../assets/images/icons/RVDVR-Icons-Pause-Btn-Black.svg"
      />
      <img
        v-else
        class="icon"
        src="../assets/images/icons/RVDVR-Icons-Scan.svg"
      />
      <!-- Break Streak -->
      <div v-if="this.title === 'Break Day'" class="streak">2</div>
    </div>
    <!-- Title -->
    <p class="title">{{ this.title }}</p>
  </button>
  <!-- DONE BTN -->
  <button v-else @click.prevent="handleClick" class="btn btn-done">
    <!-- Title -->
    {{ this.title }}
  </button>
</template>
  
<script>
export default {
  name: "ButtonComponent",
  emits: ["group-colors", "toggle-today-list", "show-mission"],
  props: {
    title: {
      type: String,
    },
    toggleToday: {
      type: Boolean,
    },
  },
  methods: {
    handleClick() {
      // IF Break Button
      if (this.title === "Break") {
        // ---BREAK BTN FUNCTIONALITY WILL BE HERE---
      }
      if (this.title === "Done") {
        // ELSE IF Done Button
        // groups colors
        this.$emit("group-colors");
        // toggles today container
        this.$emit("toggle-today-list");
      }
      if (this.title === "Prioritize") {
        // ELSE Prioritize Button
        // shows mission panel
        this.$emit("show-mission", this.title);
        // toggles today container
        this.$emit("toggle-today-list");
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
@import "../scss/variables";

.btn {
  display: flex;
  // flex-direction: row;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  // width: 130px;
  width: 100px;
  height: auto;
  font-size: 14px;
  // font-weight: bold;
  font-family: $nunito;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
  color: $black;
  position: relative;
  & .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 12px;
  }
  & .title {
    position: absolute;
    bottom: 0;
    margin: 1px;
  }
  &-break {
    background-color: $pastelOrange;
    border: 2px solid darken($color: $pastelOrange, $amount: 20);
  }
  &-prioritize {
    background-color: $lightBlue;
    border: 2px solid darken($color: $lightBlue, $amount: 20);
  }
  &-done {
    color: white;
    border: 2px solid darken($color: $teal, $amount: 10);
    border-radius: 5px;
    background-color: $teal;
    width: 67%;
    font-size: $text-sm;
  }
  .streak {
    font-weight: bold;
    padding: 0 5px;
    font-size: $text-lg;
  }
}
@media only screen and (max-width: $mobile-width) {
  .btn {
    margin: 15px 0 40px 0;
  }
}
</style>
