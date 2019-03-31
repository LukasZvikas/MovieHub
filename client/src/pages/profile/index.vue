<template>
  <div>
    <template v-if="!userDataCheck">
      <spinner/>
    </template>
    <template v-else>
      <div class="profile d-flex flex-column justify-content-center align-items-center">
        <div
          class="profile__circle d-flex justify-content-center align-items-center mt-2"
        >{{getUserInitials}}</div>
        <div class="text-center font-weight-bold heading-1">Update your account</div>
        <user-details-form/>
        <div class="text-center font-weight-bold heading-1">
          Total movies watched:
          <template>{{getUserWatchedCount}}</template>
        </div>
        <div class="heading-2 m-2">Movies you might also like</div>
        <recommended-list/>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecommendedList from "./RecommendedList";
import UserDetailsForm from "./UserDetailsForm";
import Spinner from "../../components/Spinner";

export default {
  components: {
    RecommendedList,
    UserDetailsForm,
    Spinner
  },
  computed: {
    ...mapGetters(["getUserData"]),
    userDataCheck() {
      return this.getUserData;
    },
    getUserInitials() {
      console.log(this.getUserData);
      return this.getUserData.email.slice(0, 1).toUpperCase();
    },
    getUserWatchedCount() {
      console.log("getss", this.getUserData);
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
