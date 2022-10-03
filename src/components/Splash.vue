<template>
  <div class="splash">
    <img
      class="logo"
      src="../assets/images/logos/RVDVR-logo-black.svg"
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
  transform: translateY(-75px);
  animation: transform 2s 1;
}
@keyframes transform {
  100% {
    transform: translateY(0px);
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
  