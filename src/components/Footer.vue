<template>
  <div class="footer">
    <p>&copy;2023 RVD<span class="lambda">V</span>R</p>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.footer {
  position: absolute;
  bottom: 2px;
  right: 10px;
  font-family: $blinker;
  font-size: $text-sm;
  font-weight: 400;
  padding: 0 5px;
  & .lambda {
    display: inline-block;
    transform: rotate(180deg) translateY(-2px);
    -webkit-transform: rotate(180deg) translateY(-2px);
    -moz-transform: rotate(180deg) translateY(-2px);
    -o-transform: rotate(180deg) translateY(-2px);
    -ms-transform: rotate(180deg) translateY(-2px);
  }
}

@media only screen and (max-width: $mobile-width) {
  .footer {
    right: 0;
    padding: 0 10px;
    font-size: $text-xs;
    & .lambda {
      transform: rotate(180deg) translateY(-0.75px);
      -webkit-transform: rotate(180deg) translateY(-0.75px);
      -moz-transform: rotate(180deg) translateY(-0.75px);
      -o-transform: rotate(180deg) translateY(-0.75px);
      -ms-transform: rotate(180deg) translateY(-0.75px);
    }
  }
}
</style>
    