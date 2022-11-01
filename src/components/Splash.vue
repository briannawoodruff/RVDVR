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
}
.logo {
  transform: translateY(-100px);
  animation: transform 2s 1;
}
@keyframes transform {
  100% {
    transform: translateY(-25px);
  }
}

@media only screen and (max-width: $mobile-width) {
  .splash {
    transform: scale(0.7);
  }
  .logo {
    transform: translateY(-150px);
    animation: mobileTransform 2s 1;
  }
  @keyframes mobileTransform {
    100% {
      transform: translateY(-50px);
    }
  }
}
</style>
  