<template>
  <div class="splash">
    <img
      class="logo"
      src="../assets/images/logos/RVDVR-Logo-Black-Splash.svg"
      width="375"
      height="175"
      alt="RVDΛR logo black"
    />
  </div>
</template>
  
<script>
export default {
  name: "SplashLoader",
};
</script>
  
<style lang="scss" scoped>
@import "../scss/_variables.scss";

.splash {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: scale(1.3);
  -webkit-transform: scale(1.3);
  -moz-transform: scale(1.3);
  -o-transform: scale(1.3);
  -ms-transform: scale(1.3);
}
.logo {
  transform: translateY(-100px);
  -webkit-transform: translateY(-100px);
  -moz-transform: translateY(-100px);
  -o-transform: translateY(-100px);
  -ms-transform: translateY(-100px);
  animation: transform 2s 1;
}
@keyframes transform {
  100% {
    transform: translateY(-25px);
    -webkit-transform: translateY(-25px);
    -moz-transform: translateY(-25px);
    -o-transform: translateY(-25px);
    -ms-transform: translateY(-25px);
  }
}

@media only screen and (max-width: $mobile-width) {
  .splash {
    transform: scale(0.7);
    -webkit-transform: scale(0.7);
    -moz-transform: scale(0.7);
    -o-transform: scale(0.7);
    -ms-transform: scale(0.7);
  }
  .logo {
    transform: translateY(-150px);
    -webkit-transform: translateY(-150px);
    -moz-transform: translateY(-150px);
    -o-transform: translateY(-150px);
    -ms-transform: translateY(-150px);

    animation: mobileTransform 2s 1;
    -webkit-animation: mobileTransform 2s 1;
    -moz-animation: mobileTransform 2s 1;
    -o-animation: mobileTransform 2s 1;
    -ms-animation: mobileTransform 2s 1;
  }
  @keyframes mobileTransform {
    100% {
      transform: translateY(-50px);
      -webkit-transform: translateY(-50px);
      -moz-transform: translateY(-50px);
      -o-transform: translateY(-50px);
      -ms-transform: translateY(-50px);
    }
  }
}
</style>
  