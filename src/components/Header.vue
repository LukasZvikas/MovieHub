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
import { keys } from "../keys";
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
.title {
  font-size: 1.6rem;
  padding: 0;
}
.nav-link-wrapper {
  display: flex;
}

.header-log:hover {
  color: $white;
}

.navigation {
  position: fixed;
  top: 0px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: $black;
  z-index: 400;
  font-family: inherit;
  height: 6rem;
  padding: 0 2rem 0 2rem;

  &__checkbox {
    display: none;
  }

  &__logo {
    margin: 1.3rem;
    justify-items: start;

    @media only screen and (min-width: 375px) {
      margin: 2rem;
      width: 8rem;
      height: 8rem;
    }

    @media only screen and (min-width: 1200px) {
      margin: 1.3rem;
      width: 5.6rem;
      height: 5.6rem;
    }
  }

  &__button {
    display: flex;
    height: 6rem;
    justify-content: flex-end;
    border-radius: 50%;
    z-index: 2000;
    text-align: center;
    cursor: pointer;
    justify-items: center;
    align-items: center;
  }

  &__nav {
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1500;
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    width: 0;
    transition: all 0.8s;
    background-color: black;
  }

  &__list {
    position: absolute;
    list-style: none;
    padding: 0;
  }

  &__item {
    color: $white;
    display: grid;
    font-size: 1.6rem;
    font-weight: 300;
    padding: 1rem 2.2rem;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 400;
    margin: 1rem;
    background-image: linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      $white 50%
    );
    background-size: 250%;
    transition: all 0.4s;

    &:hover,
    &:active {
      color: $black;
      background-position: 100%;
      transform: translateX(1rem);
    }
  }

  &__checkbox:checked ~ &__nav {
    opacity: 1;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  &__toggle {
    display: grid;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    position: relative;
    &,
    &::before,
    &::after {
      height: 2.5px;
      background-color: $white;
      display: inline-block;
      width: 2.5rem;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      transition: all 0.2s;
    }

    &::before {
      top: -0.7rem;
    }
    &::after {
      top: 0.7rem;
    }
  }
  &__checkbox:checked + &__button &__icon {
    background-color: transparent;
  }
  &__checkbox:checked + &__button &__icon::before {
    top: 0;
    transform: rotate(135deg);
    background-color: $white;
  }
  &__checkbox:checked + &__button &__icon::after {
    top: 0;
    transform: rotate(-135deg);
    background-color: $white;
  }

  &__icon-box {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;

    @media only screen and (min-width: 375px) {
      margin-bottom: 30%;
    }
    @media only screen and (min-width: 1200px) {
      margin-bottom: 8rem;
    }
  }
}

@keyframes fadeInLoad {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
