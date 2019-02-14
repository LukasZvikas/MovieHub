<template>
  <div class="profile d-flex flex-column justify-content-center align-items-center">
    <div class="profile__circle d-flex justify-content-center align-items-center m-2">
      <div>{{getUserInitials}}</div>
    </div>
    <div class="profile__movie-stats">Watched movies: 0</div>
    <div class="profile__movie-stats m-2">Movies you might also like</div>
    <recommended-list/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecommendedList from "./RecommendedList";
export default {
  components: {
    RecommendedList
  },
  computed: {
    ...mapGetters(["getUserData"]),
    getUserInitials() {
      return this.getUserData.username.slice(0, 1).toUpperCase();
    }
  }
};
</script>

<style lang="scss">
.profile {
  color: $white;
  background-color: $primary;
  width: 100%;
  &__circle {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-image: $secondary-gradient-regular;
    font-size: 3.3rem;
  }
  &__movie-stats {
    font-size: 2rem;
  }
}
</style>
