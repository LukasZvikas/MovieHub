<template>
  <div class="profile d-flex flex-column justify-content-center align-items-center">
    <div class="profile__circle d-flex justify-content-center align-items-center mt-2">
      <template v-if="!getUserData">
        <div></div>
      </template>
      <template v-else>{{getUserInitials}}</template>
    </div>
    <div class="text-center font-weight-bold heading-1">Update your account</div>
    <user-details-form/>
    <div class="text-center font-weight-bold heading-1">
      Total movies watched:
      <template v-if="!getUserData">
        <div></div>
      </template>
      <template v-else>{{getUserWatchedCount}}</template>
    </div>
    <div class="heading-2 m-2">Movies you might also like</div>
    <recommended-list/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecommendedList from "./RecommendedList";
import UserDetailsForm from "./UserDetailsForm";

export default {
  components: {
    RecommendedList,
    UserDetailsForm
  },
  computed: {
    ...mapGetters(["getUserData"]),
    getUserInitials() {
      return this.getUserData.email.slice(0, 1).toUpperCase();
    },
    getUserWatchedCount() {
      return this.getUserData.watched.length;
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
