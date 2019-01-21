<template>
  <ul class="nav">
    <div>
      <li class="nav-link title">MovieHub</li>
    </div>
    <div class="nav-link-wrapper">
      <template v-for="(item, index) in decideNavLinks">
        <router-link :to="item.href" :key="index" style="color: #fff">
          <li class="nav-link">{{item.name}}</li>
        </router-link>
      </template>
      <div v-if="isUserLoggedIn">
        <li class="nav-link">Logout</li>
      </div>
    </div>
  </ul>
</template>

<script>
import { keys } from "../keys";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      navItems: [
        { href: "/", name: "Movies" },
        { href: "/login", name: "Login" },
        { href: "/signup", name: "Sign Up" },
        { href: "/profile", name: "Profile" }
      ]
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    decideNavLinks() {
      const excludedItemsIfLoggedIn = ["/login", "/signup"];
      const excludedItemsIfNotLoggedIn = ["/profile"];

      const navItemsBeforeAuth = this.navItems.filter(item => {
        return !excludedItemsIfNotLoggedIn.includes(item.href);
      });

      const navItemsAferAuth = this.navItems.filter(item => {
        return !excludedItemsIfLoggedIn.includes(item.href);
      });

      return this.isLoggedIn ? navItemsAferAuth : navItemsBeforeAuth;
    },
    isUserLoggedIn() {
      return this.isLoggedIn;
    }
  }
};
</script>

<style lang="scss">
.title {
  font-size: 1.6rem;
}
.nav-link-wrapper {
  display: flex;
}
</style>
