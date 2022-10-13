<template>
  <button
    @click.prevent="handleClick"
    :class="this.title === 'Break' ? 'btn btn-break' : 'btn btn-prioritize'"
  >
    <!-- Icon -->
    <img
      v-if="this.title === 'Break'"
      class="icon"
      src="../assets/images/icons/RVDVR-Icons-Pause-Btn-Black.svg"
    />
    <img
      v-else
      class="icon"
      src="../assets/images/icons/RVDVR-Icons-Prioritize.svg"
    />
    <!-- Title -->
    {{ this.title }}
    <!-- Break Streak -->
    <div v-if="this.title === 'Break'" class="streak">2</div>
  </button>
</template>
  
<script>
export default {
  name: "ButtonComponent",
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
      } else {
        // ELSE Prioritize Button
        // toggles today container
        this.$emit("toggle-today-list");
        console.log("click prioritize");
      }
    },
  },
  mounted() {},
};
</script>
  
<style lang="scss" scoped>
@import "../scss/variables";

.btn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 130px;
  font-size: $text-sm;
  font-weight: bold;
  font-family: $nunito;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
  color: $black;

  &-break {
    background-color: $pastelOrange;
    border: 2px solid darken($color: $pastelOrange, $amount: 20);
  }

  &-prioritize {
    background-color: $lightBlue;
    border: 2px solid darken($color: $lightBlue, $amount: 20);
    padding-right: 10px;
  }
  .icon {
    height: 40px;
    width: 40px;
  }
  .streak {
    font-weight: bold;
    padding: 0 10px;
    font-size: $text-lg;
  }
}
</style>
  