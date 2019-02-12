<template>
  <div class="navigation">
    <div>
      <router-link to="/" class="nav-link title header-logo text-white d-flex align-items-center">
        <logo/>
        <div style="margin-left: 0.5rem">MovieHub</div>
      </router-link>
    </div>
    <input type="checkbox" class="navigation__checkbox" id="nav-toggle">
    
    <label for="nav-toggle" class="navigation__button">
      <span class="navigation__icon">&nbsp;</span>
    </label>
    <nav class="navigation__nav">
      <ul class="navigation__list">
        <template v-for="(item, index) in decideNavLinks">
          <router-link :to="item.href" :key="index" style="color: #fff">
            <li class="navigation__item">{{item.name}}</li>
          </router-link>
        </template>
        <div v-if="isUserLoggedIn">
          <li class="navigation__item">Logout</li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
import { keys } from "../keys";
import { mapGetters } from "vuex";
import Logo from "./svg/Logo";
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
      ]
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
.title {
  font-size: 1.6rem;
}
.nav-link-wrapper {
  display: flex;
}

.header-log:hover {
  color: $white;
}

a {
  text-decoration: none !important;
}

.navigation {
  position: fixed;
  top: 0px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-items: end;
  background-color: $black;
  z-index: 400;
  font-family: inherit; 
  height: 6rem;

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

  ///safari navigation __button
  //   display: grid;
  // /* height: 7rem; */
  // width: 100%;
  // /* top: 6rem; */
  // /* right: 3rem; */
  // border-radius: 50%;
  // z-index: 2000;
  // text-align: center;
  // cursor: pointer;
  // justify-items: end;
  // margin: 0 2rem 0 0;
  // align-items: center;

  &__button {
    display: flex;
    height: 7rem;
    width: 100%;
    justify-content: flex-end;
    margin: 0 3rem 0 0;
    border-radius: 50%;
    z-index: 2000;
    text-align: center;
    cursor: pointer;
    justify-items: center;
    align-items: center;
  }

  // &__background {
  //   height: 6rem;
  //   width: 6rem;
  //   border-radius: 50%;

  //   top: 6.5rem;
  //   right: 6.5rem;
  //   background-color: #000;
  //   z-index: 1000;
  // }

  &__nav {
    height: 100vh;
    width: 100%;
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
    transition: all 0.6s;
    background-color: black;

    // cubic-bezier(0.68, -0.55, 0.265, 1.55)
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
    text-decoration: none !important;
    // border: 1px solid #d3d3d3;
    background-image: linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      $white 50%
    );
    background-size: 220%;
    transition: all 0.4s;

    &:hover,
    &:active {
      color: $black;
      background-position: 100%;
      transform: translateX(1rem);
    }
  }

  // &__checkbox:checked ~ &__background {

  // }

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

.feather {
  @media only screen and (min-width: 375px) {
    width: 7.5rem;
    height: 4.5rem;
  }
  @media only screen and (min-width: 1200px) {
    width: 6rem;
    height: 3rem;
  }
}
</style>
