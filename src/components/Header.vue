<template>
  <div class="navigation">
    <div>
      <router-link to="/" class="nav-link title header-logo text-white d-flex align-items-center">
        <logo/>
        <div style="margin-left: 0.5rem">MovieHub</div>
      </router-link>
    </div>
    <input
      type="checkbox"
      class="navigation__checkbox"
      id="nav-toggle"
      :checked="headerState"
      @input="changeCheckBoxState"
    >
    <label for="nav-toggle" class="navigation__button">
      <span class="navigation__icon">&nbsp;</span>
    </label>
    <nav class="navigation__nav">
      <ul class="navigation__list">
        <template v-for="(item, index) in decideNavLinks">
          <router-link :to="item.href" :key="index" style="color: #fff">
            <li class="navigation__item" @click="changeCheckBoxState">{{item.name}}</li>
          </router-link>
        </template>
        <template v-if="isUserLoggedIn">
          <router-link to="/" style="color: #fff">
            <li class="navigation__item" @click="logoutUser">Logout</li>
          </router-link>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Logo from "./svg/Logo";
import { removeAuthToken } from "../utilities/localStorage";

export default {
  components: {
    Logo
  },
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
  },
  methods: {
    ...mapMutations(["logout"]),
    changeCheckBoxState() {
      this.headerState = !this.headerState;
    },
    logoutUser() {
      removeAuthToken();
      this.logout();
      this.changeCheckBoxState();
    }
  }
};
</script>

<style lang="scss">
</style>
