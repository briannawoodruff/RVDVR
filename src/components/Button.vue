<template>
  <button
    @click.prevent="handleClick"
    class="btn"
    :id="this.title === 'Break Day' ? this.title.split(' ')[0] : this.title"
  >
    <!-- Icon -->
    <div
      v-if="this.title !== 'Done'"
      class="wrapper"
      :id="
        this.title === 'Break Day'
          ? `wrapper-${this.title.split(' ')[0]}`
          : `wrapper-${this.title}`
      "
    >
      <!-- Break Icon -->
      <img
        v-if="this.title === 'Break Day'"
        class="icon"
        src="../assets/images/icons/RVDVR-Icons-Pause-Btn-Black.svg"
        alt="Break Icon"
      />
      <!-- Prioritize Icon -->
      <img
        v-else-if="this.title === 'Prioritize'"
        class="icon"
        src="../assets/images/icons/RVDVR-Icons-Scan.svg"
        alt="Prioritize Icon"
      />

      <!-- Break Streak -->
      <div v-if="this.title === 'Break Day'" class="streak">
        {{ this.breakStreakAmount }}
      </div>
    </div>
    <!-- Title -->
    <p class="title">{{ this.title }}</p>
  </button>
</template>
  
<script>
const BREAKSTREAK_KEY = "rvdvr_breakstreak";

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
    streakCount: {
      type: Number,
    },
  },
  data() {
    return {
      breakStreakAmount: 0,
    };
  },
  methods: {
    handleClick() {
      // IF Break Button
      if (this.title === "Break Day") {
        console.log("click break btn");
        // ---BREAK BTN FUNCTIONALITY WILL BE HERE---
        if (this.breakStreakAmount === 0) {
          return;
        } else {
          this.breakStreakAmount--;
        }
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
    buttonStyling() {
      // grabs first part of "Break Day"
      const breakId = this.title.split(" ")[0];
      // IF Break Btn
      if (this.title === "Break Day") {
        // add Break classs
        let btn = document.getElementById(breakId);
        btn.classList.add("btn-break");
        let wrapper = document.getElementById(`wrapper-${breakId}`);
        wrapper.classList.add("break");
        // ELSE IF Prioritize Btn
      } else if (this.title === "Prioritize") {
        // add Prioritize classes
        let btn = document.getElementById(this.title);
        btn.classList.add("btn-prioritize");
        let wrapper = document.getElementById(`wrapper-${this.title}`);
        wrapper.classList.add("prioritize");
        // ELSE Done Btn
      } else {
        // add Done class
        let btn = document.getElementById(this.title);
        btn.classList.add("btn-done");
      }
    },
    setBreakStreakLocalStorage() {
      localStorage.setItem(
        BREAKSTREAK_KEY,
        JSON.stringify(this.breakStreakAmount)
      );
    },
    breakStreak() {
      // IF the streakCount is divisible by 5 (every 5 days you get a break day), increase # of break days
      if (this.streakCount % 5 === 0 && this.streakCount > 0) {
        if (this.streakCount <= 25) {
          this.breakStreakAmount++;
          this.setBreakStreakLocalStorage();
          // ELSE IF streakCount is more than 25 && breakStreakAmount is less than 5, increace # of break days (to limit the amount of streaks you can have [total of 5 at most])
        } else if (this.streakCount > 25 && this.breakStreakAmount < 5) {
          this.breakStreakAmount++;
          this.setBreakStreakLocalStorage();
        }
      }
    },
  },
  mounted() {
    this.buttonStyling(this.title);

    if (this.title === "Break Day") {
      this.breakStreak();

      // Grabs break streak from localStorage when reloaded
      this.breakStreakCount = JSON.parse(
        localStorage.getItem(BREAKSTREAK_KEY) || 0
      );
      this.setBreakStreakLocalStorage();
    }
  },
};
</script>
  
<style lang="scss" scoped>
@import "../scss/variables";

.btn {
  @extend %flex-row;
  justify-content: flex-start;
  width: 150px;
  height: 45px;
  font-size: $text-xs;
  font-weight: bold;
  font-family: $blinker;
  border-radius: 5px;
  cursor: pointer;
  color: $black;
  letter-spacing: 0.05rem;
  & .wrapper {
    @extend %flex-row;
    justify-content: space-around;
    height: 100%;
    width: 52px;
    margin-right: 10px;
    border-radius: 5px;
    &.break {
      justify-content: center;
      background-color: lighten($color: $orange, $amount: 20);
    }
    &.prioritize {
      background-color: lighten($color: $blue, $amount: 18);
    }
  }
  @mixin btn($name: "", $col: white, $boxSdw: #444) {
    &#{$name} {
      background: $col;
      border: 2px solid $col;
      box-shadow: 2px 4px 6px $boxSdw;
      &:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 3px 5px $boxSdw;
      }
    }
  }
  @include btn("-break", $orange, $orangeShadow);
  @include btn("-prioritize", $blue, $blueShadow);
  @include btn("-done", $teal, $tealShadow);
  &-done {
    justify-content: center;
    color: white;
    text-align: center;
    font-size: $text-sm;
    width: 65%;
    height: auto;
    padding: 5px;
    & p {
      text-shadow: 2px 2px 3px $blackShadow;
    }
  }
  .streak {
    font-family: $nunito;
    font-weight: bold;
    padding: 1px 2px 0 2px;
    font-size: $text-md;
  }
}
@media only screen and (max-width: $mobile-width) {
  .btn {
    margin: 15px 0 40px 0;
  }
  #Done {
    margin-top: 10px;
  }
}
</style>
