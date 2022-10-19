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
    <!-- DO BOX -->
    <draggable
      :group="{ name: 'do', pull: false, put: receive }"
      :list="grid"
      item-key="do-slot"
      class="box box-drag do"
      id="do"
    >
      <template #item="{ element, index }">
        <div v-if="index === 0">
          <p class="name">{{ element.name }}</p>
          <p class="info">{{ element.info }}</p>
        </div>
      </template>
    </draggable>
    <!-- DECIDE BOX -->
    <draggable
      :group="{ name: 'do', pull: false, put: receive }"
      :list="grid"
      item-key="decide-slot"
      class="box box-drag decide"
      id="decide"
    >
      <template #item="{ element, index }">
        <div v-if="index === 1">
          <p class="name">{{ element.name }}</p>
          <p class="info">{{ element.info }}</p>
        </div>
      </template>
    </draggable>
    <!-- BOTTOM ROW -->
    <div class="box title">
      <p class="left-column">Not Important</p>
    </div>
    <!-- DELEGATE BOX -->
    <draggable
      :group="{ name: 'do', pull: false, put: receive }"
      :list="grid"
      item-key="delegate-slot"
      class="box box-drag delegate"
      id="delegate"
    >
      <template #item="{ element, index }">
        <div v-if="index === 2">
          <p class="name">{{ element.name }}</p>
          <p class="info">{{ element.info }}</p>
        </div>
      </template>
    </draggable>
    <!-- LATER BOX -->
    <draggable
      :group="{ name: 'do', pull: false, put: receive }"
      :list="grid"
      item-key="later-slot"
      class="box box-drag later"
      id="later"
    >
      <template #item="{ element, index }">
        <div v-if="index === 3">
          <p class="name">{{ element.name }}</p>
          <p class="info">{{ element.info }}</p>
        </div>
      </template>
    </draggable>
  </div>
</template>
        
<script>
import draggable from "vuedraggable";

export default {
  name: "EisenhowerCard",
  components: {
    draggable,
  },
  emits: ["set-background-color"],
  props: {
    title: {
      type: String,
    },
    currentTask: {
      type: String,
    },
  },
  data() {
    return {
      grid: [
        { name: "Do", info: "Tasks with deadlines or consequences" },
        { name: "Decide", info: "Schedule a time do to it" },
        {
          name: "Delegate",
          info: "Tasks that must get done soon. Can someone help?",
        },
        { name: "Delay", info: "Not a priority and can be done whenever" },
      ],
      destination: "",
    };
  },
  methods: {
    receive(to) {
      // handles the pull change to only emit once on change, so there's no extraneous passing of data to be emitted to set-background-color
      let toEl = to.el.id;
      // IF there is no destination yet, set destination
      if (this.destination === "") {
        this.destination = toEl;
        // ELSE IF destination is different than a new destination
      } else if (this.destination !== toEl) {
        this.destination = toEl;
      }
      this.$emit("set-background-color", this.destination);
    },
    // drawing the borders of the eisenhower gird
    drawBoard() {
      const boxes = document.querySelectorAll(".box");
      let darkGreen = "#6B9080";
      boxes.forEach((box, i) => {
        let boxStyle = "";
        if (i < 3) {
          boxStyle += `border-bottom: 2px solid ${darkGreen};`;
        }
        if (i === 1 || i === 4 || i === 7) {
          boxStyle += `border-right: 2px solid ${darkGreen};`;
          boxStyle += `border-left: 2px solid ${darkGreen};`;
        }
        if (i > 5) {
          boxStyle += `border-top: 2px solid ${darkGreen};`;
        }
        box.style = boxStyle;
      });
    },
  },
  mounted() {
    // draws eisenhower grid once mounted
    this.drawBoard();
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
  font-size: $text-sm;
  font-family: $nunito;
  color: $black;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 10px;
  // rotating the left titles
  & .left-column {
    transform: rotate(-90deg);
    white-space: nowrap;
    word-spacing: 0.2em;
  }
  // all the boxes with titles
  &.title {
    font-weight: bold;
    padding: 0;
  }
  // info of the draggable box
  & p.info {
    font-size: $text-xs;
    background: none;
    margin: 0;
  }
  // makes the p tags in the draggable box block
  &-drag {
    display: block;
  }
  // name of the draggable box
  & .name {
    font-size: $text-md;
    font-weight: bold;
  }
  // sets color of the draggable boxes
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
          