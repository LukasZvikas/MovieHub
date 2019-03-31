<template>
  <div class="w-100 mb-3" style="height: 30rem">
    <div class="position-absolute w-100" style="height: 30rem;background-color: rgba(0,0,0,0.7);"></div>
    <img class="h-100 w-100" style="object-fit: cover;" src="../../assets/images/guardians.jpg">
    <div
      class="position-absolute w-100"
      style="top: 40%; left: 50%; transform: translate(-50%, -50%);"
    >
      <div class="text-light text-center mb-1" style="font-size: 3rem; padding-top: 1.6rem;">
        Welcome to
        <span class="font-weight-bold heading-1" style="font-size: 3rem;">MovieHub</span>
      </div>
      <div class="w-100 d-flex justify-content-center">
        <div class="d-flex justify-content-around align-item-center row w-50">
          <template v-for="(item, index) in decideNavLinks">
            <router-link
              :to="item.href"
              :key="index"
              class="heading-button d-flex text-center align-items-center justify-content-center font-weight-bold col-8 col-md-3 mx-1 mb-1"
              style="padding: 1rem!important;"
            >{{item.name}}</router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      navItems: [
        { href: "/favorites", name: "Favorites" },
        { href: "/search", name: "Search" },
        { href: "/login", name: "Login" },
        { href: "/signup", name: "Sign Up" },
        { href: "/profile", name: "Profile" },
        { href: "/watchlist", name: "Watchlist" }
      ],
      headerState: false
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    decideNavLinks() {
      const excludedItemsIfLoggedIn = ["/login", "/signup"];
      const excludedItemsIfNotLoggedIn = [
        "/profile",
        "/favorites",
        "/watchlist"
      ];

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
.heading-button {
  background-color: rgba(220, 20, 60, 0.7);
  color: $white;
  border-radius: 5px;
}
</style>
