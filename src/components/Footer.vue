<template>
  <div class="footer">
    <div class="text-light d-flex justify-content-center align-items-center flex-column h-100">
      <logo/>
      <div class="font-weight-bold footer__heading mb-1 mt-1">MovieHub Inc.</div>
      <div class="mb-1">All rights reserved</div>
      <div class="footer__social">
        <twitter/>
        <facebook/>
        <instagram/>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./svg/Logo";
import Instagram from "./svg/Instagram";
import Facebook from "./svg/Facebook";
import Twitter from "./svg/Twitter";
export default {
  components: {
    Logo,
    Instagram,
    Facebook,
    Twitter
  }
};
</script>

<style lang="scss">
.footer {
  background-color: $black;
  height: 18rem;

  &__heading {
    font-size: 1.6rem;
  }
}
</style>
