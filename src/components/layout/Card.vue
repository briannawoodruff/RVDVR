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
            alt="Show Mission Panel Open Eye Icon"
            width="24"
            height="24"
          />
          <img
            v-else
            class="icon"
            src="../../assets/images/icons/RVDVR-Icons-EyeHidden.svg"
            alt="Hide Mission Panel Closed Eye Icon"
            width="24"
            height="24"
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
  emits: ["show-mission"],
  props: {
    title: {
      type: String,
    },
    showMission: {
      type: Boolean,
    },
    allTasks: {
      type: Array,
    },
    mobileWidth: {
      type: Boolean,
    },
    toggleToday: {
      type: Boolean,
    },
  },
  data() {
    return {
      masterLimit: null,
    };
  },
  watch: {
    // When allTasks change, check if number of master tasks change to set limit and dynamic change styling
    allTasks: {
      handler(currentItem, pastItem) {
        // IF the currentItem and pastItem exist
        if (
          currentItem !== null &&
          pastItem !== undefined &&
          pastItem !== null
        ) {
          this.checkNumberOfMaster();
          this.setMasterStyling();
        }
      },
    },
    // watches mobile width and resets it when toggled
    mobileWidth(newValue) {
      if (newValue) {
        this.setMasterStyling();
      }
    },
  },
  methods: {
    // Checks if there are more than 1 tasks in Master
    checkNumberOfMaster() {
      if (this.allTasks !== undefined) {
        // finds all the master tasks
        const findMaster = this.allTasks.filter(
          (item) => item.isToday === false
        );
        // IF there are less than or = 2, limit master
        if (findMaster.length <= 2) {
          this.masterLimit = true;
          // ELSE there are more than 2 tasks
        } else {
          this.masterLimit = false;
        }
      }
    },
    setMasterStyling() {
      let elMaster = document.getElementById("MISSION");
      if (this.toggleToday) {
        // IF Desktop
        if (!this.mobileWidth) {
          // IF less than three, translate up
          if (this.masterLimit) {
            elMaster.style.marginBottom = "120px";
          } else {
            elMaster.style.marginBottom = "30px";
          }
        } else {
          // elMaster.style.marginBottom = "10px"
        }
      }
    },
  },
  mounted() {
    // onload checks number of master tasks and sets masterLimit
    this.checkNumberOfMaster();
    // sets classes
    this.setMasterStyling();
  },
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
  margin: 50px 30px 30px 30px;
  overflow: auto;
  border: 3px solid $darkGreen;
  background-color: $white;
  padding: 0;
  border-radius: 5px;
  top: 0;
  box-shadow: 2px 4px 6px $darkGrayShadow;
  &#MISSION {
    margin-top: 95px;
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
@media only screen and (max-width: 900px) {
  .container {
    &#MISSION {
      margin-bottom: 50px;
    }
  }
}
@media only screen and (max-width: $mobile-width) {
  .container {
    margin: 10px 30px;
    &#MISSION {
      margin-top: 10px;
      margin-bottom: 10px !important;
    }
  }
}
</style>
        